# © 2026 Natalie Ragulina (Netaniya). All rights reserved.
import http.client
import json
import tempfile
import threading
import unittest
from pathlib import Path
from server import make_server

class FullStackTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.db = Path(self.temp.name)/"lab.sqlite"
        self.start()
    def start(self):
        self.server = make_server(self.db)
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
    def stop(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join()
    def tearDown(self):
        self.stop()
        self.temp.cleanup()
    def req(self, method, path, data=None, headers=None, raw=None):
        connection = http.client.HTTPConnection("127.0.0.1", self.server.server_port, timeout=5)
        h = {"X-N25X-Lab":"1", **(headers or {})}
        if data is not None:
            raw = json.dumps(data)
        if raw is not None:
            h.setdefault("Content-Type","application/json")
        try:
            connection.request(method,path,body=raw,headers=h)
            response = connection.getresponse()
            payload = response.read()
            body = json.loads(payload) if payload and response.getheader("Content-Type").startswith("application/json") else payload
            return response.status,body
        finally:
            connection.close()
    def create(self,title="Example"):
        status,row=self.req("POST","/api/projects",{"title":title})
        self.assertEqual(status,201)
        return row
    def test_crud_and_stats(self):
        row=self.create()
        p="/api/projects/"+str(row["id"])
        self.assertEqual(self.req("GET",p),(200,row))
        self.assertEqual(self.req("PATCH",p,{"done":True})[1]["done"],True)
        self.assertEqual(self.req("GET","/api/stats"),(200,{"total":1,"done":1,"open":0}))
        self.assertEqual(self.req("DELETE",p),(204,b""))
        self.assertEqual(self.req("GET",p)[0],404)
    def test_no_content_wire_contract(self):
        row = self.create("HTTP contract")
        connection = http.client.HTTPConnection("127.0.0.1", self.server.server_port, timeout=5)
        try:
            connection.request("DELETE", "/api/projects/"+str(row["id"]), headers={"X-N25X-Lab":"1"})
            response = connection.getresponse()
            self.assertEqual(response.status, 204)
            self.assertIsNone(response.getheader("Content-Length"))
            self.assertIsNone(response.getheader("Transfer-Encoding"))
            self.assertEqual(response.read(), b"")
        finally:
            connection.close()
        self.assertEqual(self.req("GET","/api/projects"), (200, []))
    def test_persistence(self):
        row=self.create("Persistent")
        self.stop()
        self.start()
        self.assertEqual(self.req("GET","/api/projects")[1],[row])
    def test_validation(self):
        for value in ({},{'title':''},{'title':'x'*101},{'title':'x','done':1},{'title':'x','id':5},[],{'title':7}):
            self.assertEqual(self.req("POST","/api/projects",value)[0],400)
        self.assertEqual(self.req("POST","/api/projects",raw="{")[0],400)
        self.assertEqual(self.req("POST","/api/projects",raw="x"*4097)[0],413)
        self.assertEqual(self.req("GET","/api/projects")[1],[])
    def test_sql_injection_is_data(self):
        title="x'); DROP TABLE projects; --"
        self.assertEqual(self.create(title)["title"],title)
        self.assertEqual(self.create("Still exists")["title"],"Still exists")
        self.assertEqual(len(self.req("GET","/api/projects")[1]),2)
    def test_origin_and_mutation_guard(self):
        for headers in ({"Host":"evil.test"},{"Origin":"https://evil.test"},{"Sec-Fetch-Site":"cross-site"}):
            self.assertEqual(self.req("GET","/api/projects",headers=headers)[0],403)
        self.assertEqual(self.req("POST","/api/projects",{"title":"x"},headers={"X-N25X-Lab":"0"})[0],403)
        self.assertEqual(self.req("POST","/api/projects",raw="x",headers={"Content-Type":"text/plain"})[0],415)
    def test_static_and_methods(self):
        self.assertIn(b"Full-stack lab",self.req("GET","/")[1])
        self.assertIn(b"fetch",self.req("GET","/app.js")[1])
        self.assertEqual(self.req("GET","/style.css")[0],200)
        self.assertEqual(self.req("GET","/server.py")[0],404)
        self.assertEqual(self.req("GET","/../server.py")[0],404)
        self.assertEqual(self.req("PUT","/api/projects")[0],405)
        self.assertEqual(self.req("GET","/api/projects?x=1")[0],404)
    def test_capacity(self):
        for i in range(100):
            self.create(str(i))
        self.assertEqual(self.req("POST","/api/projects",{"title":"overflow"})[0],409)
        self.assertEqual(self.req("GET","/api/stats")[1]["total"],100)

if __name__=="__main__":
    unittest.main()
