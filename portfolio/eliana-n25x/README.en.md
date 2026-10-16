# N25x · Learning and Creative Studio

**Creator, original idea, concept and art direction: Natalie Ragulina.**
**© 2026 Natalie Ragulina. All rights reserved.**

[Open app](https://netaniya.github.io/Netaniya/eliana-n25x/workshop/) · [Русский](README.ru.md) · [Deutsch](README.md)

A phone-first learning workshop with an original articulated humanoid, practical exercises, user creations and motivational points. Development, translations and technical checks use AI assistance under the creator's direction. The current Studio uses only N25x. Earlier games remain separately archived.

## Try it

Choose Deutsch, English, Русский or Українська in the visible header selector; German is the first-visit default. Customize the robot, then open **Learn → Mathematics classroom**, **Language lessons** or **Programming**. In **Create → Piano and composition**, record notes with multiple fingers or A W S E D F T G Y H U J K, add parts, edit notes and download the composition.

## Actual scope

- **48 mathematics task families / 12,288 numeric variants**: explanations, examples, worked solutions, review queue and resumable ten-task assessments. Grade labels are difficulty guides, not a validated national syllabus.
- **12 topics / 120 source sentences per language / 10 languages**: 1,200 translated texts, with reading, writing and word-order exercises. Introductory AI-assisted material awaiting native-speaker review. **The complete path to C1 is not finished.**
- German, English, Georgian, Ukrainian, Russian, Mandarin Chinese, Spanish, French, Italian and Japanese. Listening uses an installed local device voice when available; no native-speaker audio recordings are bundled.
- **20 runnable programming missions**, 95 normal/edge-case inputs, editable code, predictions, repairs and local explanations. The restricted JavaScript interpreter supports numbers, logic, conditions, loops and functions.
- **A0–C8 piano**, chord recording, up to four tracks, 64 bars, 2,048 notes and 32 simultaneous voices. Edit pitch, beat and duration. Original synthesized piano/bass/bell sounds; actual MIDI, PCM WAV and editable JSON export.
- Quiz and branching-story builders, writing tools, earlier creative projects, points and validated file exchange remain available.

[Learning scope and roadmap](workshop/LEARNING-PLAN.ru.md) · [Technical notes](workshop/README.en.md) · [Evidence](../../docs/eliana-n25x-workshop/README.ru.md)

## Install, download and save

The interface uses a medium 16 px main reading size, 14 px secondary text and vivid accents on the dark background. Phone navigation labels are 13 px.

Use Install App in Android/Chrome or Share → Add to Home Screen in iPhone/Safari. Desktop installation depends on browser support. This is an installable web app; no app-store release is claimed. Visit online and wait for the verified offline status under ⚙: 30 required resources are checked with SHA-256. Optional local speech voices depend on the device.

Under ⚙ choose **Download app as HTML** for the complete standalone copy with embedded modules, robot assets, font and licenses. [Open standalone copy](https://netaniya.github.io/Netaniya/eliana-n25x/workshop/download/N25x-Studio.html). A phone's file viewer may not run JavaScript. Browser/file storage can differ; transfer profiles with export/import. Keep backups because browsers may evict local storage.

To update the installed web version, open it online, then close it fully and reopen. A downloaded HTML file does not update itself: download a fresh copy from the same link. Export the old local profile before switching files so the robot, points and projects can be imported if needed.

## Employer review and local build

JavaScript ES modules, Three.js, Web Audio, bounded interpreters, responsive HTML/CSS, PWA, Node/linkedom/VM checks and real Chromium Actions. No accounts, live messaging, unrestricted cloud AI, cloud sync, tracking SDK or paid API is connected.

```sh
cd portfolio/eliana-n25x
npm ci --ignore-scripts
npm run build
npm run check
npm test
python3 -m http.server 8080 --bind 127.0.0.1 --directory workshop/dist
```

Open `http://localhost:8080/`. CI uses Node.js 24. From repository root: `node scripts/build-pages.mjs`, then `node --test tests/pages.test.mjs`. Automated tests, real desktop/emulated-touch Chromium and physical-device installation are separate claims. [Current publication record](../../docs/eliana-n25x-workshop/publication.json).

The save key `eliana-n25x.workshop.v1` is retained for compatibility. New fields preserve existing robots, points and projects. [Original quest](https://netaniya.github.io/Netaniya/eliana-n25x/) and [3D adventure](https://netaniya.github.io/Netaniya/eliana-n25x/3d/) retain independent saves.

## Ownership

Natalie Ragulina controls the original idea, concept, characters and art direction. AI assistance is disclosed, with no invented commercial experience or contribution percentages. Personal source photos are not used in the new Studio. [Copyright notice](LICENSE.md). Three.js remains under MIT, Manrope under SIL OFL; [image credits](assets/credits.json) are retained.
