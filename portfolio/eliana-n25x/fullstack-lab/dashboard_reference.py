# © 2026 Natalie Ragulina (Netaniya). All rights reserved.
"""Reference solution: real SQLite, no network, caller-owned transactions."""

def summary(db):
    total, done = db.execute(
        "SELECT COUNT(*), COALESCE(SUM(done), 0) FROM projects"
    ).fetchone()
    return {"total": total, "done": done, "open": total - done}

def open_projects(db):
    return db.execute(
        "SELECT id, title FROM projects WHERE done = 0 ORDER BY id"
    ).fetchall()

def complete(db, ident):
    if type(ident) is not int or ident <= 0 or ident > 9223372036854775807:
        return False
    return db.execute(
        "UPDATE projects SET done = 1 WHERE id = ?", (ident,)
    ).rowcount == 1
