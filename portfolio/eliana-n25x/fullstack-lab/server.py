# © 2026 Natalie Ragulina (Netaniya). All rights reserved.
"""Loopback-only full-stack training service; not a production multi-user server."""
import argparse
import json
import sqlite3
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit
import re
import dashboard_reference

ROOT = Path(__file__).resolve().parent
MAX_BODY = 4096

class LabError(Exception):
    def __init__(self, status, code):
        self.status, self.code = status, code

class Store:
    def __init__(self, path, dashboard=dashboard_reference):
        self.path = str(path)
        self.dashboard = dashboard
        with self.connect() as db:
            db.execute("CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL CHECK(length(title) BETWEEN 1 AND 100), done INTEGER NOT NULL DEFAULT 0 CHECK(done IN (0,1)))")
    def connect(self):
        db = sqlite3.connect(self.path, timeout=5)
        db.row_factory = sqlite3.Row
        return db
    @staticmethod
    def row(r):
        return {"id": r["id"], "title": r["title"], "done": bool(r["done"])}
    @staticmethod
    def validate(value, create=False):
        if not isinstance(value, dict) or not value or set(value) - {"title", "done"}:
            raise LabError(400, "invalid_fields")
        if create and "title" not in value:
            raise LabError(400, "title_required")
        if "title" in value and (not isinstance(value["title"], str) or not value["title"].strip() or len(value["title"]) > 100):
            raise LabError(400, "invalid_title")
        if "done" in value and type(value["done"]) is not bool:
            raise LabError(400, "invalid_done")
        return value
    def list(self):
        with self.connect() as db:
            return [self.row(r) for r in db.execute("SELECT id,title,done FROM projects ORDER BY id")]
    def get(self, ident):
        with self.connect() as db:
            r = db.execute("SELECT id,title,done FROM projects WHERE id=?", (ident,)).fetchone()
            if r is None:
                raise LabError(404, "not_found")
            return self.row(r)
    def create(self, data):
        data = self.validate(data, True)
        with self.connect() as db:
            db.execute("BEGIN IMMEDIATE")
            if db.execute("SELECT COUNT(*) FROM projects").fetchone()[0] >= 100:
                raise LabError(409, "capacity")
            title, done = data["title"].strip(), data.get("done", False)
            cur = db.execute("INSERT INTO projects(title,done) VALUES (?,?)", (title, int(done)))
            return {"id": cur.lastrowid, "title": title, "done": done}
    def update(self, ident, data):
        data = self.validate(data)
        with self.connect() as db:
            db.execute("BEGIN IMMEDIATE")
            row = db.execute("SELECT id,title,done FROM projects WHERE id=?", (ident,)).fetchone()
            if row is None:
                raise LabError(404, "not_found")
            if data == {"done": True}:
                if self.dashboard.complete(db, ident) is not True:
                    raise LabError(500, "dashboard_complete_failed")
                updated = db.execute("SELECT id,title,done FROM projects WHERE id=?", (ident,)).fetchone()
                if updated is None or not updated["done"]:
                    raise LabError(500, "dashboard_complete_failed")
                return self.row(updated)
            title = data.get("title", row["title"]).strip()
            done = data.get("done", bool(row["done"]))
            db.execute("UPDATE projects SET title=?,done=? WHERE id=?", (title, int(done), ident))
            return {"id": ident, "title": title, "done": done}
    def delete(self, ident):
        with self.connect() as db:
            if db.execute("DELETE FROM projects WHERE id=?", (ident,)).rowcount != 1:
                raise LabError(404, "not_found")
    def stats(self):
        with self.connect() as db:
            result = self.dashboard.summary(db)
            if not isinstance(result, dict) or set(result) != {"total", "done", "open"} or any(type(v) is not int or v < 0 for v in result.values()) or result["total"] != result["done"] + result["open"]:
                raise LabError(500, "invalid_dashboard_summary")
            return result
    def open_projects(self):
        with self.connect() as db:
            result = self.dashboard.open_projects(db)
            if not isinstance(result, list) or any(not isinstance(row, (tuple, list, sqlite3.Row)) or len(row) != 2 or type(row[0]) is not int or not isinstance(row[1], str) for row in result):
                raise LabError(500, "invalid_dashboard_rows")
            return [{"id": row[0], "title": row[1]} for row in result]

def make_server(path, port=0, dashboard=dashboard_reference):
    store = Store(path, dashboard)
    class Handler(BaseHTTPRequestHandler):
        server_version = "N25X-Lab"
        def log_message(self, *_):
            pass
        def send(self, status, data=None, media="application/json; charset=utf-8"):
            raw = b"" if data is None else (json.dumps(data, ensure_ascii=True).encode("utf-8") if media.startswith("application/json") else data)
            self.send_response(status)
            # RFC 9110 sections 8.6 and 15.3.5: 204 has no content or Content-Length.
            if status != 204:
                self.send_header("Content-Type", media)
                self.send_header("Content-Length", str(len(raw)))
            else:
                raw = b""
            self.send_header("Cache-Control", "no-store")
            self.send_header("X-Content-Type-Options", "nosniff")
            self.send_header("Referrer-Policy", "no-referrer")
            self.send_header("Content-Security-Policy", "default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'")
            self.end_headers()
            if raw:
                self.wfile.write(raw)
        def guard(self):
            expected = f"127.0.0.1:{self.server.server_port}"
            if self.headers.get("Host") != expected or self.headers.get("Origin") not in (None, "http://"+expected) or self.headers.get("Sec-Fetch-Site") in ("cross-site", "same-site"):
                raise LabError(403, "local_origin_only")
        def body(self):
            if self.headers.get("X-N25X-Lab") != "1":
                raise LabError(403, "lab_header_required")
            if self.headers.get_content_type() != "application/json" or self.headers.get("Transfer-Encoding"):
                raise LabError(415, "json_required")
            try:
                size = int(self.headers.get("Content-Length", ""))
            except ValueError:
                raise LabError(400, "invalid_length")
            if not 0 < size <= MAX_BODY:
                raise LabError(413, "body_limit")
            try:
                return json.loads(self.rfile.read(size).decode("utf-8"))
            except (ValueError, UnicodeError, RecursionError):
                raise LabError(400, "invalid_json")
        def dispatch(self):
            try:
                self.guard()
                url = urlsplit(self.path)
                if url.scheme or url.netloc or url.query or url.fragment:
                    raise LabError(404, "not_found")
                path, method = url.path, self.command
                static = {"/": ("index.html", "text/html; charset=utf-8"), "/app.js": ("app.js", "text/javascript; charset=utf-8"), "/style.css": ("style.css", "text/css; charset=utf-8")}
                if method == "GET" and path in static:
                    file, mime = static[path]
                    return self.send(200, (ROOT/file).read_bytes(), mime)
                if path == "/api/dashboard/open" and method == "GET":
                    return self.send(200, store.open_projects())
                if path == "/api/stats" and method == "GET":
                    return self.send(200, store.stats())
                match = re.fullmatch(r"/api/projects(?:/([1-9]\d{0,8}))?", path)
                if not match:
                    raise LabError(404, "not_found")
                ident = int(match[1]) if match[1] else None
                if method == "GET":
                    return self.send(200, store.list() if ident is None else store.get(ident))
                if method == "POST" and ident is None:
                    return self.send(201, store.create(self.body()))
                if method == "PATCH" and ident is not None:
                    return self.send(200, store.update(ident, self.body()))
                if method == "DELETE" and ident is not None:
                    if self.headers.get("X-N25X-Lab") != "1":
                        raise LabError(403, "lab_header_required")
                    store.delete(ident)
                    return self.send(204)
                raise LabError(405, "method_not_allowed")
            except LabError as e:
                self.send(e.status, {"error": e.code})
            except (sqlite3.Error, OSError, ValueError, NotImplementedError, TypeError):
                self.send(500, {"error": "local_service_error"})
        do_GET = do_POST = do_PATCH = do_DELETE = do_PUT = do_OPTIONS = dispatch
    return ThreadingHTTPServer(("127.0.0.1", port), Handler)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="N25X local full-stack lab")
    parser.add_argument("--port", type=int, default=8765)
    parser.add_argument("--db", type=Path, required=True, help="Local SQLite database path; use synthetic training data only")
    parser.add_argument('--learner', action='store_true', help='Use your trusted local learner_dashboard.py after passing tests; never use untrusted Python')
    args = parser.parse_args()
    if args.learner:
        import learner_dashboard as dashboard
    else:
        dashboard = dashboard_reference
    server = make_server(args.db, args.port, dashboard=dashboard)
    print(f"N25X local lab: http://127.0.0.1:{server.server_port}", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
