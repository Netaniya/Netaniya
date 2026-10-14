# AI Quality Lab

An interactive **learning and portfolio project by Natalie Ragulina (Netaniya)** for reproducible evaluation of saved answer variants.

[Live demo](https://ai-quality-lab-neta26.wellolm4.chatgpt.site) · [Deutsch](README.md)

Select eight German business test cases, edit two sample answer variants, run server-side checks, inspect each rule and export a reproducible JSON report. The UI supports German (first visit), English, Russian and Ukrainian. It includes responsive layouts, a Berlin clock, a real elapsed timer, request-completion progress and reduced-motion support.

The samples are **handwritten illustrative outputs**, not results from named AI models. No model API is connected. Model latency and cost remain unavailable. Validation duration measures the rule engine; elapsed duration includes network requests. Rules check a limited fixture suite, not general intelligence, full semantic correctness or comprehensive security.

Every check is binary. A case receives partial credit for its passed checks; total score is the weighted mean of case scores. A case passes only when every check passes. Default A passes 4/8 cases (51.28%); B passes 7/8 (84.62%). B intentionally fails the embedded-instruction case.

The hosted app uses a **JavaScript Worker**. A separate **Python evaluator** reproduces the same checks locally using only the standard library. Cross-language parity within floating-point precision, invalid inputs, HTTP handling, report invalidation, translation coverage and UI interactions are tested. DOM-double tests do not constitute browser rendering or visual QA.

```bash
npm run build
npm test
npm run validate
python3 python/evaluator.py --output report.json
python3 python/evaluator.py --input exported-report.json --output replay.json
```

Requires Node.js 22+ and Python 3.10+. No npm dependencies are required. You may also download `evaluator.py` and `fixtures.json` into the same folder and run `python3 evaluator.py`. Replay recalculates results from exported answers and case selections.

Inputs are stored on the device and sent to the Worker for evaluation; the app does not persist them server-side or load analytics. Do not use confidential data. Natalie specified the project direction, languages, visual requirements, animation and time features. Implementation and technical verification were AI-assisted; owner review is recorded only after it actually occurs.


## Interface

The revised interface uses a compact workspace, readable labels and mobile test cards. Animation is limited to running checks and result bars. Self-hosted Quality Sans is a renamed Noto Sans subset covering Latin and Cyrillic. The font is stored as Base64 text for the standalone Worker; source copyright and the SIL Open Font License are included in `assets/fonts/OFL.txt`.
