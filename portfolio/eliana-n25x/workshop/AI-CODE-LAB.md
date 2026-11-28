# AI Code Lab
Creator direction: Natalie Ragulina (Netaniya), 28 November 2026. Learners understand, test and verify AI-assisted code rather than blindly accept it.

- Deterministic review executes existing mission cases in the restricted interpreter without modifying source or granting points.
- Export a text prompt with exercise, source and diagnostics. No profile data is appended. Do not export secrets or personal data. No automatic transfer to third parties.
- Optional generative inference through an already-available browser LanguageModel (English/German). No automatic download, key, backend or payment. Unsupported devices receive a fallback. Output is escaped advisory text, never executed or applied. Cancellation and stale-result protection.
- AI lessons: classification threshold and precision with defined zero-denominator convention. Numeric exercises, not training a model.
- Chrome references: https://developer.chrome.com/docs/ai/prompt-api and https://developer.chrome.com/docs/ai/get-started . Desktop hardware and language restrictions apply.
- Direct interpreter and mock adapter checks passed; real inference and browser acceptance pending. Future secure opt-in mobile backend and expanded AI curriculum. Not a complete IDE.

28 November: Recall, F1, Accuracy and simplified error cost exercises. Custom tests accept only bounded JSON number/boolean arguments and expected results, execute the existing restricted interpreter, and never alter rewards or mission completion. 5194 direct formula comparisons passed. Previous bfa2e57 passed all three CI jobs, including unavailable-model fallback; real generative inference remains unverified. New UI CI pending.

28 November: REST API Lab implements an isolated in-memory simulated HTTP service for project records. Supports GET, POST, PATCH, DELETE, JSON validation, status codes 200/201/204/400/404/405/409, reset and capacity limits. No real network or database, no rewards; user practices a six-request workflow. 896 direct response checks passed; new browser CI pending.

28 November: SQL Lab — six result-checked exercises and read-only querying of the REST sandbox records, SELECT/WHERE/ORDER BY/LIMIT/COUNT(*) on a single table. Custom limited interpreter, no actual database engine or network. 439 direct comparisons passed. Browser verification pending.

28 November: Python Studio includes six numeric lessons and a dedicated bounded parser/interpreter, four-space indentation, one function, if/else, assignment, return, range loops, floor division and modulo, numbers and booleans. No imports, packages, file/network access, full CPython semantics or durable drafts. 28 lesson tests and 6764 independent numeric comparisons passed. Browser acceptance pending. Prior SQL/REST/custom test CI all passed.

28 November: Web Studio adds six HTML/CSS exercises, structural rule checks and actual sandboxed static HTML preview. Strict reconstructed subset, CSP, no scripts, URLs, links, event attributes, forms or network. No full HTML/CSS coverage or persistent drafts. 126 direct checks passed; Chromium acceptance pending.

28 November: Agent Lab — three goals, editable allowlisted JSON tool plans, atomic dry run, explicit human approval, stale/repeated approval rejection, isolated synthetic records, optional ready browser LanguageModel proposes JSON only. 1056 direct workflow assertions passed; adapter checked with mock, real inference and browser CI pending. No external actions, accounts or general-purpose autonomous agent.

28 November: Review Lab adds three code-review exercises and current-revision test/approval gating with simulated merge. 1536 direct assertions passed. Browser CI pending; no external GitHub actions.
