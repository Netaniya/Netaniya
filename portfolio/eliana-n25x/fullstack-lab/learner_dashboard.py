# © 2026 Natalie Ragulina (Netaniya). All rights reserved.
"""Independent student exercise. Work only on synthetic local data."""

def summary(db):
    """Return {"total": int, "done": int, "open": int} using a SQL aggregate."""
    raise NotImplementedError("Write the aggregate query")

def open_projects(db):
    """Return [(id, title), ...] for open projects, sorted by id."""
    raise NotImplementedError("Write a filtered, ordered SELECT")

def complete(db, ident):
    """Set done to 1 for the given integer id; return True if the row exists.
    Reject bool, non-int and nonpositive ids without changing data.
    The caller owns the transaction; do not commit or close the connection.
    """
    raise NotImplementedError("Write a parameterized UPDATE")
