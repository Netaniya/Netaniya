# Eliana & N25x · third-person 3D adventure

**© 2026 Natalie Ragulina. All rights reserved.**

Concept and art direction: **Natalie Ragulina**. Development, translation, original artwork and modelling with AI assistance. No invented employment experience or contribution percentages are claimed.

The standalone 3D game lives at `/Netaniya/eliana-n25x/3d/`. The previous picture quest and its `eliana-n25x.save.v1` save remain intact. The new save key is `eliana-n25x.3d.v1`.

Controls: WASD/arrows to move relative to the camera; Shift to run; drag the mouse to orbit, wheel to zoom; E to interact; Esc/P to pause. Touch devices use a left joystick, camera gestures on the unobstructed image, and right-side run/action buttons. Independent pointer IDs and pointer capture support simultaneous input.

Read the message, collect or activate three components, bring N25x to the terminal, scan and restore the connection. The robot must physically arrive. The gate rises, and walking through it completes the mission and awards points. Six compact districts lead to the final signal. Emergency relays require a sequence; other districts use archives, valves, distribution panels and beacons. Exploration has no time pressure; challenge mode adds up to 120 points to a 350-point award. Best results cannot be multiplied by replaying. Menus, hidden tabs and pauses do not count as active time.

The original articulated characters are actual 3D meshes with joints and procedural idle/walk/run/work animation. **They are provisional stylized models, not photorealistic scans or exact portrait matches.** An accurate likeness needs an appropriately licensed full-body GLB/glTF asset, face textures, skeleton and compatible animation clips. Portrait pictures alone do not supply that asset. The six districts currently share a compact traversable layout, with different materials, lighting, architecture details and mission objects. This is an initial playable 3D version, not six large bespoke finished worlds.

Three.js r160 is vendored locally under MIT (`vendor/LICENSE.three.txt`); Manrope retains its SIL OFL notice. Original code, designs and project materials retain the author's copyright notice. No third-party models, animation clips or recorded sounds are redistributed. Audio is synthesized locally and begins on user input. No paid service, CDN, account, telemetry or backend is required.

Build from the repository root with `node portfolio/eliana-n25x/3d/build.mjs`, then `node scripts/build-pages.mjs`. Run `npm test --prefix portfolio/eliana-n25x` and `node --test tests/pages.test.mjs` after the existing project development dependencies are installed. Generated `3d/dist/` output is ignored. The shared Pages builder copies only production output. `?qa=1` displays position and animation telemetry; it does not provide teleport or mission-completion controls.

Automated tests cover collision-checked routes through all six mission rule sequences, navigation around obstacles, progression, scoring, save validation, all translation keys, articulated animation, emitted dependencies and service-worker cache integrity. Offline tests disable the test network and request every dependency plus a cold navigation. **These are not physical-device or real-browser playthrough claims.** See the verification record for completed browser checks.

Installation uses a separate manifest and service-worker scope under `3d/`. All 15 required local files are read from cache and checked against build SHA-256 hashes before the UI announces offline readiness. Geometry and procedural material textures are generated from these cached modules. Only older `en25x3d-` caches are removed. Actual Android/iOS installation and offline restart require separate device checks; no such test is claimed without evidence.
