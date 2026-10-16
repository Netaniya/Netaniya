# Eliana & N25x


## New version: Robot Studio

The new phone-first workshop with a personal robot, learning tasks, creative tools and points is documented in **[Robot Studio](workshop/README.en.md)**. The illustrated quest documented below and the **[3D adventure](3d/README.en.md)** remain available.

**A shared future · [Deutsch](README.md)**

[Play](https://netaniya.github.io/Netaniya/eliana-n25x/) · [Download offline edition](https://netaniya.github.io/Netaniya/eliana-n25x/download/eliana-n25x-offline.html)

A cinematic point-and-click adventure across six distinct locations: a future city, an abandoned district, a school, a rooftop garden, a home and a relay station. Eliana interprets clues; N25x operates equipment. Six working puzzles connect a complete journey with an ending.

## Features

- Six puzzle systems: electrical paths, symbol sequences, energy allocation, irrigation valves, startup ordering and signal tuning.
- Explorer and timed challenge modes, discovery and accuracy points, speed bonuses, local personal records and optional collectibles.
- German by default, with complete English, Russian and Ukrainian interfaces and mission text.
- Mouse, touch and keyboard controls, responsive layouts and a larger scene view. Images retain their full aspect ratio.
- Local progress, validated JSON import/export, confirmation before reset, and reload recovery.
- Installable PWA where supported, with all six locations cached for offline use. Readiness is announced only after every required file is present.
- A separate self-contained HTML download with embedded images, font and game logic; no account, analytics, runtime CDN or paid API.
- Distinct procedural game effects, scene ambience, volume controls and reduced-motion support.

## Install and play

Use the browser’s **Install app** or **Add to Home Screen** option where available. On iPhone, use Safari’s Share menu. In game settings, prepare all locations offline and wait for confirmation. The standalone HTML download is an additional desktop option; some mobile file viewers do not execute JavaScript. This is a web app, not a native APK or app-store release.

Press **E / N** to switch characters, **1–4** to interact and **Space** to pause. Puzzles have labeled buttons and sliders. Progress is local to a browser and device; export it before moving devices.

## Authorship and scope

**Natalie Ragulina** defined the concept, character names, references, art direction and requested mechanics. Implementation, generated artwork, translations and automated checks were developed with AI assistance. The project owner reviews the playable result and directs subsequent development. This is a fictional portfolio project with no claimed commercial deployment.

The scenes are generated raster images with interactive hotspots. This edition does not have free-roaming 3D movement, physical robot simulation or live AI dialogue. Puzzles, scores and progress run locally in JavaScript. Original personal reference photographs are not distributed. See [asset credits](assets/credits.json).

## Development and verification

```sh
npm ci --ignore-scripts
npm run build
npm run check
npm test
```

Framework-free ES modules, Web Audio, a Web App Manifest and a service worker scoped to this game. The build generates a content-versioned cache and a standalone offline HTML bundle. Generated files and dependencies are excluded from source control; the shared Pages workflow builds and publishes the allowlisted runtime files.

Tests cover both modes, complete six-chapter DOM walkthroughs in all four languages, scoring, role and progression gates, save recovery, import/export, pause and page return, the standalone bundle, and service-worker cache success/failure. These are logic and DOM tests, not real-browser rendering or mobile-device certification. Visual checks on actual desktop and mobile browsers remain open for this release.

## Copyright

**© 2026 Natalie Ragulina. All rights reserved.** [Copyright notice and third-party licenses](LICENSE.md).

