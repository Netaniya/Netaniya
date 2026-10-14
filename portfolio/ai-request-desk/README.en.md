# AI Request Desk

**Independent learning and portfolio project by Natalie Ragulina (Netaniya), jointly developed with AI assistance.**

[Open live demo — no sign-in](https://ai-request-desk-neta26.wellolm4.chatgpt.site) · [Deutsch](README.md)

## Try it in a minute

1. Select **DEMO-104** and analyze the request.
2. Compare **€179** in the message with **€149** in the fictional invoice directory.
3. Edit and save the response draft; confirm that you reviewed the evidence.
4. Approve the draft and inspect the history and persisted status.
5. Open another request, test an analysis failure and retry.

The first visit defaults to German. English, Russian and Ukrainian are also available. Interface and response languages are independent.

## Demonstrated skills

- Input validation and structured request processing.
- Invoice comparison using integer cents; missing or ambiguous evidence is not treated as a match.
- Neutral, editable drafts and mandatory human approval.
- Explicit state transitions, action history and versioned browser persistence.
- Failure recovery without losing the original request.
- Responsive UI, safe text rendering and automated checks.

## Actual implementation

Vanilla JavaScript, HTML and CSS; a separate workflow engine, versioned localStorage and `node:test`. No external packages or build step.

**Current scope:** the hosted demo uses clearly labeled deterministic rules, not a connected LLM. It demonstrates the review workflow. It sends no messages, changes no invoices and issues no refunds. All fixtures are fictional; each visitor's data remains on their device. The local audit history is not authenticated or tamper-proof.

This is a learning project, not commercial client experience. React/TypeScript, FastAPI, n8n and live LLM inference are not implemented in this published version.

## My contribution and AI assistance

I defined the portfolio goal, reviewed and approved eight workflow rules, required four languages and a learning-project label, and reviewed the UI on a phone. I tested the core flow, including editing, approval and persistence, and requested specific layout corrections. The AI assistant implemented the code, automated tests and documentation. An independent code review by me is not claimed.

## Run and test

From `portfolio/ai-request-desk`:

```sh
python3 -m http.server 8080 --directory dist
# http://localhost:8080
node --test test-engine.cjs test-ui.cjs
```

**17 local automated checks passed:** comparison, approval gating, failure/retry, languages, persistence, stale-state protection and DOM interactions. DOM tests use a test double and do not replace comprehensive browser QA. The owner tested the core workflow on a phone.

© 2026 Natalie Ragulina (Netaniya)
