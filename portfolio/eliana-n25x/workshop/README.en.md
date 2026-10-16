# Eliana & N25x · Robot Studio

[Deutsch](README.md) · [Open studio](https://netaniya.github.io/Netaniya/eliana-n25x/workshop/)

**© 2026 Natalie Ragulina. All rights reserved.**

Concept, characters and art direction: **Natalie Ragulina**. Development, translations and technical checks with AI assistance. No invented commercial experience or contribution percentages.

A phone-first web app: personalize a robot, practice useful skills and make things. Eliana and N25x remain the named mentors. Points are motivational only. There are no payments, cash rewards or real-money trades.

## What works

- A real articulated 3D robot with configurable name, shell color, head, hands, feet/wheels/hover base and visible extra modules. Tap to wave; rotation is optional. No walking joystick is needed.
- Calm, cheerful and focused speaking styles; favorite interests change the accent lights. The example-based explanation style reveals the worked step; other styles keep hints optional.
- Eleven mathematics difficulty levels: 33 fixed original exercises plus three locally generated exercises per day and level. Correct answers earn points once. Completing the daily set awards a one-time bonus; missed days have no penalty.
- A local math helper for arithmetic, fractions, percentages, polynomials in `x`, linear and quadratic equations and polynomial derivatives (`d/dx x^3`). The bounded parser never executes input as code.
- Twelve English word exercises and three executable arrow-program puzzles with real grid movement and walls.
- An eight-step melody editor, actual Web Audio playback and PCM WAV export. Build and play a robot movement sequence; save and reopen projects. Download a PNG card containing your own rendered robot.
- Unlock shell colors and projector, music or orbital modules with earned points. Duplicate achievements and repeat purchases cannot duplicate rewards or debit twice.
- Separate desktop and mobile layouts, large touch targets, four complete interface languages (German first, then English/Russian/Ukrainian), adjustable sound, installable PWA and verified offline inventory.

This is a bounded first learning collection, **not a complete certified grades 1–11 curriculum**. Grade numbers are guides; national curricula differ. It does not contain an unrestricted AI conversation, a general word-problem tutor, trigonometry or expressions with variables in denominators. No cloud AI service, account, tracking SDK, paid API or messaging system is connected.

## Your progress

The robot, points, solved tasks and saved projects remain on this browser under `eliana-n25x.workshop.v1`. Export the JSON profile in ⚙ for backup or transfer, then import it on the other device. There is no cloud sync. Reset requires confirmation and affects only this profile.

Both older games remain independently available, along with their original save keys:

- [Original illustrated quest](https://netaniya.github.io/Netaniya/eliana-n25x/) — `eliana-n25x.save.v1`
- [Controllable 3D adventure](https://netaniya.github.io/Netaniya/eliana-n25x/3d/) — `eliana-n25x.3d.v1`

Use the browser's Install App/Add to Home Screen option where supported (Share menu on iPhone). This is a web app, not a native APK or store release. Visit online first and wait for the offline confirmation in ⚙. The scoped worker verifies all 22 runtime, portrait, font, icon and license files by SHA-256 before reporting ready. Cleanup is limited to older `en25xstudio-` caches. Browsers can evict local data, so keep an exported profile for important work.

## Ownership and dependencies

Original procedural robot geometry, materials, studio lighting, animations and synthesized sounds. Existing AI-generated mentor portraits reuse the approved project references; the private source photo is not published. Portraits are illustrations, and no exact animated reconstruction of the person's face is claimed. [Image credits](../assets/credits.json).

Locally bundled Three.js r160: [MIT](../3d/vendor/LICENSE.three.txt). Manrope, Copyright 2018 The Manrope Project Authors: [SIL OFL](../assets/OFL.txt). No additional third-party models, animations, textures or sound recordings. Sound starts after a user gesture; mute and volume are under ⚙.

## Verification

From `portfolio/eliana-n25x`: `npm ci --ignore-scripts`, `npm run build`, `npm run check`, `npm test`. From the repository root: `node scripts/build-pages.mjs`, then `node --test tests/pages.test.mjs`.

Fifteen core Studio automated tests cover reward/purchase invariants, validated profile round-trips, arithmetic/equations/derivatives, 1,980 generated daily exercises, all translations, real mesh/joint changes, actual WAV bytes, hashed offline inventory, cold offline navigation and corrupt-cache failure. These are not physical-device tests.

The `eliana-workshop-browser.yml` workflow runs real Chromium with SwiftShader for desktop and an emulated phone. Actual clicks, keys and touches exercise the app without injecting rewards or completed progress. Artifacts include screenshots, downloaded user creations and a machine-readable report. See [PROGRESS.ru.md](PROGRESS.ru.md) for confirmed results. Physical Android/iOS usage and actual installation require separate checks.


## Practical-learning edition

Creator, original idea, concept and art direction: **Natalie Ragulina**. **© 2026 Natalie Ragulina. All rights reserved.** Development with AI assistance.

The current feature list, ten introductory languages, twenty creation choices, visible four-language UI selector and installation/download instructions are in the [project overview](../README.en.md). It includes executable programming practice, a quiz editor, per-tool drafts and validated project exchange. No live chat, accounts, cloud AI or cash rewards are connected.

The build generates a standalone `download/Eliana-N25x-Studio.html` and includes it among 22 SHA-256-verified offline resources. The HTML contains 11 embedded modules and requires no runtime network. Its save storage may differ from the website; use profile import/export. Generated files are not committed; GitHub Pages builds them from source.

Current browser and release evidence is recorded separately in [publication.json](../../../docs/eliana-n25x-workshop/publication.json). Physical-device installation remains a separate check. The project tests cover models, interpreter, actual export-player code, UI in a DOM, save migration and cache integrity; DOM tests are not a real browser.
