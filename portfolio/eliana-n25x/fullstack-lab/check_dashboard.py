# © 2026 Natalie Ragulina (Netaniya). All rights reserved.
"""Run with --learner to check your own code; default checks reference."""
import argparse
import importlib
import sqlite3
import unittest

class DashboardTests(unittest.TestCase):
    def setUp(self):
        self.db = sqlite3.connect(":memory:")
        self.addCleanup(self.db.close)
        self.db.execute("CREATE TABLE projects(id INTEGER PRIMARY KEY, title TEXT NOT NULL, done INTEGER NOT NULL CHECK(done IN (0,1)))")
        self.db.commit()

    def seed(self, rows):
        self.db.executemany("INSERT INTO projects VALUES (?, ?, ?)", rows)
        self.db.commit()

    def rows(self):
        return self.db.execute("SELECT id,title,done FROM projects ORDER BY id").fetchall()

    def test_empty(self):
        self.assertEqual(implementation.summary(self.db), {"total":0,"done":0,"open":0})
        self.assertEqual(implementation.open_projects(self.db), [])
        self.assertFalse(implementation.complete(self.db, 1))

    def test_mixed_and_sorted(self):
        self.seed([(12,"C",0),(2,"A",1),(7,"B",0)])
        before = self.rows()
        self.assertEqual(implementation.summary(self.db), {"total":3,"done":1,"open":2})
        self.assertEqual(implementation.open_projects(self.db), [(7,"B"),(12,"C")])
        self.assertEqual(self.rows(), before)

    def test_complete_and_idempotence(self):
        self.seed([(1,"Website",0),(9,"Music",0)])
        self.assertIs(implementation.complete(self.db, 1), True)
        self.assertIs(implementation.complete(self.db, 1), True)
        self.assertEqual(self.rows(), [(1,"Website",1),(9,"Music",0)])
        self.assertEqual(implementation.summary(self.db), {"total":2,"done":1,"open":1})

    def test_invalid_ids_leave_data_unchanged(self):
        self.seed([(1,"A",0),(2,"B",0)])
        before = self.rows()
        for ident in (0,-1,True,False,1.0,"1","1 OR 1=1",None,10**30,99):
            with self.subTest(ident=ident):
                self.assertIs(implementation.complete(self.db, ident), False)
                self.assertEqual(self.rows(), before)

    def test_caller_controls_transaction(self):
        self.seed([(5,"A",0)])
        self.assertTrue(implementation.complete(self.db, 5))
        self.db.rollback()
        self.assertEqual(self.rows(), [(5,"A",0)])

    def test_unicode_and_sql_punctuation_are_data(self):
        title = "Éliана '); DROP TABLE projects; --"
        self.seed([(17,title,0)])
        self.assertEqual(implementation.open_projects(self.db), [(17,title)])
        self.assertTrue(implementation.complete(self.db, 17))
        self.assertEqual(self.rows(), [(17,title,1)])

    def test_varied_distributions(self):
        for total in (1,2,5,12):
            for done in range(total+1):
                with self.subTest(total=total,done=done):
                    self.db.execute("DELETE FROM projects")
                    self.seed([(i+10,str(i),int(i<done)) for i in range(total)])
                    self.assertEqual(implementation.summary(self.db), {"total":total,"done":done,"open":total-done})
                    self.assertEqual(len(implementation.open_projects(self.db)), total-done)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--learner", action="store_true", help="test learner_dashboard.py instead of reference")
    args = parser.parse_args()
    implementation = importlib.import_module("learner_dashboard" if args.learner else "dashboard_reference")
    print("Testing:", implementation.__name__, flush=True)
    result = unittest.TextTestRunner(verbosity=2).run(unittest.defaultTestLoader.loadTestsFromTestCase(DashboardTests))
    raise SystemExit(0 if result.wasSuccessful() else 1)
