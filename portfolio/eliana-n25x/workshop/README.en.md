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
