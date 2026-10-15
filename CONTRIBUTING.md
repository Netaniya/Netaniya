# Contributing and reproducing a bug

These are learning projects with fictional data. The hosted demos use transparent rules and saved examples; they do not make live model calls. Please do not submit credentials, personal customer data, or real invoices.

## Reproduce the checks

AI Request Desk, from `portfolio/ai-request-desk`:

```sh
node --test test-engine.cjs test-ui.cjs
```

AI Quality Lab, from `portfolio/ai-quality-lab`:

```sh
npm test
npm run validate
npm run build
```

The optional React/FastAPI implementation has separate setup instructions in `portfolio/ai-quality-lab/fullstack/README.md`.

## Describe an issue

Include the project URL or commit, interface language, browser/device, exact steps, expected result and actual result. Use fictional examples. For calculation issues, include the inputs and the score or amount shown. For persistence issues, say whether multiple tabs were open.

DOM-double tests verify behavior, not browser rendering. A change to layout or interaction should also be checked in a real browser at desktop and mobile widths, including keyboard focus and reduced-motion preferences. Document any check that could not be completed.

Keep changes scoped, add a regression test for a reproducible logic bug, and update the relevant German or English documentation when behavior changes.
