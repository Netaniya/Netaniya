# N25x · technical notes

**Creator, original idea, concept and art direction: Natalie Ragulina.**
**© 2026 Natalie Ragulina. All rights reserved.** Development and learning materials use AI assistance.

[Current feature list and installation](../README.en.md) · [Actual learning scope](LEARNING-PLAN.ru.md) · [Verification](../../../docs/eliana-n25x-workshop/README.ru.md)

## Runtime

Browser-local JavaScript ES modules and bundled Three.js r160 (MIT). An original articulated humanoid has human proportions, selectable body build and finish, fingers and animations. The current app contains only N25x; the human portrait is not copied into the build. Sound effects and musical instruments are synthesized locally. Manrope is bundled under SIL OFL; both third-party license texts remain available.

- `model.mjs`: additive profile validation, points, purchases and projects. The legacy save key is retained; older games have independent keys.
- `math-course.mjs` / `math-classroom.mjs`: 48 families, 256 variants each, worked examples, review and resumable assessments.
- `language-data.mjs`: 12 original lesson topics, 120 meanings translated into ten languages. `language-course.mjs` validates progress and provides phrase checking/tokenization; `language-classroom.mjs` handles reading, writing, ordering and optional local speech voices.
- `program.mjs`, `curriculum.mjs`, `program-lessons.mjs`: restricted interpreter and 20 executable missions with 95 checking inputs. No eval, host-property access, network or DOM execution.
- `piano-score.mjs`: bounded four-track score, actual SMF format-1 MIDI and PCM WAV. `piano-audio.mjs`: Web Audio synthesis and compression. `piano.mjs`: keyboard/pointer input, chord recording, note editing, undo, projects and file exchange. WAV renders in a local worker to keep controls responsive.
- `creations.mjs` / `academy.mjs`: validated quiz, branching story, other creative tools, sandboxed previews and standalone exports.

## Build and offline

From the game directory: `npm ci --ignore-scripts`, `npm run build`, `npm run check`, `npm test`. Node.js 24 is used in CI. From the repository root: `node scripts/build-pages.mjs` and `node --test tests/pages.test.mjs`.

The Studio build contains 30 SHA-256-verified required resources and 20 embedded modules in `download/N25x-Studio.html`. The previous shared download filename remains an online compatibility alias. No runtime CDN is required. Offline readiness is reported only after verification. Device speech voices are optional and are not bundled; the app only selects local voices. Reading, writing and word order work without speech.

The standalone HTML embeds the robot portrait, font, icons, licenses and module graph; it does not register its own service worker. Website/file origins may use different local storage. Export/import a profile to transfer work. Generated `dist` and `_site` files are not committed.

## Honest verification

88 automated project tests include 46 earlier-game tests, 16 core Studio tests, 17 Academy tests and 9 expanded-learning/music tests. One test exercises all 12,288 mathematical variants; this is not 12,288 separate test cases. Portfolio checks are separate.

`.github/workflows/eliana-workshop-browser.yml` runs actual Chromium with SwiftShader on desktop and emulated phone dimensions. It uses real input for lessons, tests, MIDI/WAV downloads, two simultaneous touch contacts, offline reload and a real local standalone file. Results are only claimed after successful jobs. Current publication evidence is [recorded separately](../../../docs/eliana-n25x-workshop/publication.json).

Physical Android/iOS testing and actual installation are separate. The ten-language material is introductory, AI-assisted and awaiting native-speaker review. The complete C1 path is not implemented. There is no unrestricted cloud AI conversation, live messaging, account system, cloud sync or payment service.

## Academy candidate: spaced practice
`language-course.mjs` adds a validated per-language/per-skill review schedule. UTC-day intervals 1/3/7/14/30, early practice does not promote, mistakes/assisted answers reset, legacy completions remain intact. Local only. [Provenance](CONTRIBUTIONS.md). Full browser regression pending.

Grammar candidate: 16 DE/EN lessons, 64 original questions, separate practice/checkpoint examples, local passed-topic state, rules in four UI languages. Not a certified curriculum. Full browser acceptance pending.

Grammar expansion candidate: 40 lessons total, 20 per DE/EN, 160 tasks, five thematic groups, progress bar and next unfinished lesson. Legacy lesson IDs preserved. Controller checks passed; browser/teacher acceptance pending.

Grammar candidate update: 80 topics across all ten target languages, 320 exercises; 20 topics each DE/EN and five each for KA/UK/RU/ZH/ES/FR/IT/JA. Separate practice and checkpoints. Browser and native-speaker acceptance pending.

Piano learning candidate: twelve original note-order patterns with local saved completion, optional synthesized example playback, no score changes from practice input, no rhythm/fingering assessment. Deterministic note and MIDI/WAV buffer checks passed. Browser regression added but not run.

Rhythm candidate: eight original patterns, first-tap-relative onset assessment, bounded tolerance, signed timing deviations and independent local completion. Deterministic checks passed; real-device latency and browser acceptance pending.

## Current development snapshot — 28 November 2026
The review branch now has 16 language topics, 152 shared meanings per language (1,520 translations, 4,560 core exercise forms), 80 grammar topics/320 questions, 32 programming missions/seven stages, 61 subject tasks/23 stages, 24 piano patterns/six stages and eight rhythm patterns. Earlier figures above describe historical releases. Source-only verification passed; Chromium and publication remain pending. See [curriculum](LEARNING-PLAN.ru.md), [development history](PROGRESS.ru.md) and [contributions](CONTRIBUTIONS.md). The public release is still separately tracked in publication.json.

Music candidate update: five ascending melodic interval-recognition stages covering 13 semitone distances, 39 questions per full five-stage cycle, independent saved completion and four UI localizations. Web Audio scheduling is not proof of audibility; real listening and browser review pending.

Staff-reading candidate: five stages, 40 written single-note exercises, treble and bass clefs, ledger lines and accidentals, validated local progress and four interface languages. Not a score editor. Browser and font rendering acceptance pending.

Chord candidate: four root-position chord recognition stages, nine qualities, 27 questions per cycle, playable reference examples and local progress. Inversions and voice-leading are not assessed. Browser/audio acceptance pending.

Practical harmony candidate: six guided stages and 24 chord-construction tasks including inversions and ii7–V7–Imaj7. Exact MIDI pitch-set checking, sequential keyboard selection and independent progress. No voice-leading or simultaneous performance assessment. Browser acceptance pending.

Current grammar candidate: 88 topics / 352 questions, 20 each in German and English, six in each of the other eight languages. Native-speaker review and this commit's CI pending. Workflow #18 applies to the earlier commit `30e8f57`.

Unified study dashboard: six separate counters (mathematics, active-language skills, active-language grammar, programming, school subjects, music practice stages) plus saved creative projects. Counts do not award points. Review-branch CI uses the open PR trigger and manual dispatch instead of duplicate push and PR triggers.

Mathematics/subject extension: 52 task families × 256 variants = 13,312 variants; 73 localized questions across 29 stages in six subjects. Existing task IDs remain stable. Earlier revision dd965e9 passed desktop, touch and source checks; this candidate awaits CI.

Programming now has 36 missions, eight stages and 182 test cases, including four cross-disciplinary projects. Restricted educational interpreter; not a complete JavaScript runtime. Latest CI pending.

ELIANA visual direction: initial procedural silver-titanium humanoid with restrained blue optics and reversible exploded view. Original logo and existing saved profiles preserved. Film-quality reference art is not yet a rigged model; new CI pending. See DESIGN-ELIANA.md.

AI Code Lab: 38 missions, nine stages, 194 test cases. Read-only diagnostics, prompt export, optional ready browser LanguageModel (EN/DE). Real-model and browser verification pending; see AI-CODE-LAB.md.

Sentence classroom: all ten study languages can now serve as translation sources (90 distinct directed pairs), with automatic interface-language mode, safe same-language fallback and saved source selection. Four UI localizations remain unchanged; native-speaker review and CI pending.

Personal study plan: up to three local recommendations based on saved progress, with unfinished math self-tests and mistakes prioritized, guided language review and rotating unfinished supplementary courses. Not a placement test or AI-generated assessment. All courses remain selectable; CI pending.

Math self-test evidence: latest/best score and completed round count by topic, with validated profile migration. After unresolved mistakes are reviewed, a low latest score can prompt a new ten-question round at the chosen difficulty. Not a standardized proficiency diagnosis; CI pending.

Grammar evidence: latest/best completed checkpoint, missed question indices, corrections and targeted review across all ten languages/88 topics. Historical passes remain valid; two-question repeated checkpoints do not establish proficiency. CI and linguistic review pending.

Extended grammar checkpoints: 80 additional authored questions in 20 existing topics across ten languages (432 total grammar exercises). Separate results and review priority preserve previous basic checkpoints. The remaining 68 topics retain their original checkpoints; native review and CI pending.

Extended checkpoint coverage now spans 52/88 topics: all six topics of eight languages plus two each in German and English. 128 additional prompts bring the total grammar exercise count to 560. Remaining: 36 German/English topics. Native review pending.

All 88 existing grammar topics now include four independent extended checkpoint prompts, in addition to two practice and two basic checkpoint prompts (704 total questions). The final 144 prompts cover 36 German/English topics; independent linguistic review and CI pending.
