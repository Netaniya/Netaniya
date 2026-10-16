# Eliana & N25x · Robot Studio

**Creator, original idea, concept and art direction: Natalie Ragulina.**
**© 2026 Natalie Ragulina. All rights reserved.**

[Deutsch](README.md) · [Русский](README.ru.md) · **[Open the app](https://netaniya.github.io/Netaniya/eliana-n25x/workshop/)** · [Open standalone HTML](https://netaniya.github.io/Netaniya/eliana-n25x/workshop/download/Eliana-N25x-Studio.html)

An interactive learning and creation workshop for phones and computers. Users customize a personal humanoid 3D robot, practice skills and make small projects. Eliana and N25x remain the named mentor characters. Implementation, translations, generated portraits and technical checks were developed with AI assistance, following Natalie Ragulina's creative decisions and requirements.

## Try it in three minutes

1. Use the visible **App language** selector at the top: Deutsch, English, Русский or Українська. German is the default; the choice stays on this device.
2. Customize the robot's name, body, panels and finish. Tap the actual 3D robot to wave.
3. Open **Learn → Programming & practice**. Change a block or edit JavaScript, run an example and check all test cases.
4. Open **Create → My quiz game**, write your questions and answers, check the scoring function and play the result.
5. Save it, download playable HTML or send an editable project file yourself.

## What is implemented

- Original articulated 3D humanoid with joints and fingers, configurable materials and a dark, lit studio.
- Five executable programming missions: variables, conditions, loops, functions and debugging. A bounded JavaScript interpreter runs learner code and reports real values and test cases.
- Quiz editor with 1–8 questions, an editable scoring function, sandbox preview, standalone HTML and validated project JSON.
- Eleven mathematics difficulty levels, daily exercises, a local expression helper and three executable grid-route programs.
- Ten introductory learning languages: German, English, Georgian, Ukrainian, Russian, Mandarin Chinese, Spanish, French, Italian and Japanese. Six vocabulary entries each, with cards, choice and typing practice. Learning language is separate from the four UI languages.
- Short original exercises in logic, physics, biology, geography and digital skills.
- Twenty creation choices, including branching stories, writing, comic-scene cards, a webpage, checklists, timer, flashcards, badge, animated sticker, idea map, day plan, melody and robot movements. Some share a writing editor. Users write their own content; there is no generative writing service.
- One-time achievement points, unlockable parts, autosaved per-tool drafts, local profiles and validated profile import/export. No cash rewards, payments or real-money marketplace.
- Four complete interface languages, large controls, original synthesized audio, volume/mute, installable web app and a standalone HTML edition.

## Install, download or share

**Android / Chrome:** Open the app link and choose **Install app** in Chrome's menu. Depending on the version, it appears under “Install and create shortcut.”
**iPhone / Safari:** Open the link, select **Share → Add to Home Screen**, then enable “Open as Web App” if offered.
**Desktop:** Use the installation icon or “Install app” in a supported browser.

Visit online first and wait for the verified offline confirmation in **⚙ Settings**. That confirmation applies to the files present in this browser. Browsers may evict storage; export important profiles. Messaging and cloud synchronization are not connected.

**⚙ → Download app as HTML** saves a complete file you can pass to someone else. It embeds the runtime modules, images, font and licence notices. Open it in a modern browser; basic mobile file viewers may not execute JavaScript. This is a web app plus an optional offline file, not an APK or app-store release. Web and file origins can use separate storage; profile export/import transfers progress.

## Technical review

A personal portfolio project using JavaScript ES modules, HTML/CSS, Three.js, Web Audio, a Web App Manifest, scoped service worker, Node tests and GitHub Actions. No runtime CDNs, accounts, tracking SDKs or paid AI API. The math helper and prepared N25x explanations run locally. Open-ended AI chat, live social features and complete certified school/language curricula are not implemented.

```sh
cd portfolio/eliana-n25x
npm ci --ignore-scripts
npm run build
npm run check
npm test
python3 -m http.server 8080 --bind 127.0.0.1 --directory workshop/dist
```

Open `http://localhost:8080/`. CI uses Node.js 24; Python is only an optional local HTTP server. The shared portfolio build is `node scripts/build-pages.mjs` from the repository root. See [Studio technical documentation](workshop/README.en.md), [verification evidence](../../docs/eliana-n25x-workshop/README.ru.md) and the [browser workflow](../../.github/workflows/eliana-workshop-browser.yml).

Logic/DOM/cache tests, real Chromium and physical-device checks are recorded separately. Current release and version: [publication.json](../../docs/eliana-n25x-workshop/publication.json). An emulated mobile viewport is not a physical Android/iOS test.

## Earlier games

[Illustrated quest](https://netaniya.github.io/Netaniya/eliana-n25x/) · [Controllable 3D adventure](https://netaniya.github.io/Netaniya/eliana-n25x/3d/) · [3D documentation](3d/README.en.md). Both editions and their independent save keys remain available.

## Authorship and licences

Natalie Ragulina's human creative contribution includes the original idea, concept, character choices and art direction. AI assistance is disclosed. Private source photographs are not distributed; no exact animated face reconstruction is claimed.

**© 2026 Natalie Ragulina. All rights reserved.** Public availability grants no general reuse licence for original project materials. See the [copyright notice](LICENSE.md). Bundled Three.js retains MIT, Manrope retains SIL OFL, and [image credits](assets/credits.json) and licence files are preserved.

[Chrome installation help](https://support.google.com/chrome/answer/9658361?co=GENIE.Platform%3DAndroid) · [Safari installation help](https://support.apple.com/guide/iphone/iphea86e5236/ios)
