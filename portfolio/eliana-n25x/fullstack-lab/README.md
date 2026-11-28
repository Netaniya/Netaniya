# N25X Full-stack Lab

© 2026 Natalie Ragulina (Netaniya). All rights reserved for protected original project materials.

First local full-stack engineering project. Real Python standard-library HTTP service, real persistent SQLite database, parameterized queries, HTML/CSS/JavaScript client and JSON API. English reference interface. Independent of the offline Workshop; no remote deployment, login, AI provider, or billing.

Run from this directory:

```sh
python3 -m unittest -v test_server.py
python3 server.py --db ./practice.sqlite --port 8765
```

Open http://127.0.0.1:8765/ on the same computer. Create a fictional project, mark it completed, refresh, delete. Stop the server with Ctrl+C and restart using the same database to see persistence. Keep practice.sqlite out of Git. The service binds only to loopback, accepts only its exact Host/origin, requires a custom mutation header and validates JSON. This is a single-user educational lab, not a secure production hosting solution. No real user data, public network binding or shared credentials. Future work: authenticated multi-user deployment, stronger production security, real AI integration and browser UI acceptance.

The student can inspect actual SQL schema and parameterized CRUD statements in server.py, and actual fetch calls in app.js. The offline REST and SQL lessons remain separate and continue working without a server.

Browser acceptance now includes actual client POST/PATCH/DELETE, safe text rendering, aggregates, persistence across server restart, HTTP response display and viewport checks using Playwright desktop and touch contexts. See `../3d/browser-tests/run-fullstack.mjs`; results pending for this revision.
