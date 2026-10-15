# Motion Atelier

An original multi-page automotive learning project by **Natalie Ragulina (Netaniya)**, developed with AI assistance.

[Live demo](https://netaniya.github.io/Netaniya/motion-atelier) · [Deutsch](README.md)

Ten separate HTML pages: home, collection, rule-based vehicle finder, configurator, journey planner, local garage, project information and three model pages. German is the first-visit language, with full English, Russian and Ukrainian interfaces. A short, skippable film of a real Tesla Model S driving opens the site and respects reduced-motion preferences.

## Appearance

Dark on first visit, with a persistent light/dark toggle across every page. Main headings are centered without sentence dots. Paired titles use separate lines without a leading dash. Real photographs are fitted in full inside their frames; mobile layouts stack text and photo. The intro uses an approximately five-second slowed excerpt of real driving footage. It starts on every fresh home-page load; a replay control is visible in the hero. Mobile viewport resizing no longer closes it prematurely. The film plays inline. Accompanying music is attempted automatically when the film starts and can be muted. If the browser blocks audible autoplay, the film remains usable with an enable-music control, with an explicit play control if autoplay is blocked. Reduced-motion preferences skip the film. Manrope, including Cyrillic glyphs, is self-hosted.

## Project credit, clock and map

Every page and the intro show **Natalie (Netaniya) Ragulina** with a live **Europe/Berlin** date/time. Clock updates do not rerender the page and account for daylight-saving time.

After calculating a route, locally hosted **Leaflet 1.9.4** displays validated OSRM road geometry over OpenStreetMap tiles. Start/end markers, zoom and a full-route view are available. Approximate connections remain dashed and labelled. If the library or tiles fail, a labelled schematic route stays available with a retry control. No geolocation and no simulated live charging stations. Tile requests go directly from the browser to OpenStreetMap after route calculation, with no tile prefetch/offline packages.

## Motion and interaction

- Progressive cross-document page transitions, with a short exit fade for older browsers. Real multi-page navigation is preserved.
- Headings, text and photographs reveal once as they enter the viewport. UI updates retain already-revealed content.
- The mobile menu changes in place, with `aria-expanded`, focus handling and inert links while closed.
- Selected cards and a floating comparison tray, with persisted model selection.
- Remembered configuration, reset and clear save feedback; explicit configuration URLs override stored preferences.
- Reduced-motion preferences bypass animations. Content remains visible if IntersectionObserver is unavailable.

## Working features

Filtering, sorting, model comparison, explained matching, configurable pricing in integer eurocents, range estimates, shareable configuration URLs, JSON export and browser-local garage persistence. Public OSRM routing and user-requested Open-Meteo weather are validated and clearly distinguished from an explicit offline estimate.

Tesla Model S, Model Y and Cybertruck are shown in real photographs. All technical numbers, options and prices are illustrative application fixtures. Range is battery capacity divided by model consumption, not WLTP. Wheel and interior selections update the summary and demo price while the original photo remains unchanged. Paint selection is not offered; older saved paint options do not add a surcharge. There is no dealer, reservation, payment, live LLM or manufacturer affiliation.

Charging estimates assume constant consumption and average charging power, with charging up to 80% and a selected arrival reserve. No live chargers, availability, traffic, charging curves or weather-based consumption model. Energy prices are user assumptions. Offline estimates use great-circle distance × 1.25 and 80 km/h, explicitly labelled as non-road-route estimates.

## Development

```sh
npm ci
npm run build
npm run check
npm test
```

Static output: `dist/`. Runtime: HTML/CSS and JavaScript ES modules, no framework dependency. `linkedom` is used only for automated DOM tests. **62 automated checks passed.** Tests cover calculations, all four languages, all pages, actions, storage, video controls and race conditions. These do not verify browser rendering or actual YouTube playback; final desktop and mobile visual QA is still outstanding.

## External services and sources

- Map: [Leaflet](https://leafletjs.com/) 1.9.4, [BSD-2-Clause](dist/assets/vendor/leaflet/LICENSE), served locally with official SRI checksums. [OpenStreetMap](https://www.openstreetmap.org/copyright) tiles follow the [usage policy](https://operations.osmfoundation.org/policies/tiles/); best-effort availability.
- [OSRM](https://project-osrm.org/) / [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), ODbL. The built-in graphic is a schematic route trace; a link opens a full external map.
- [Open-Meteo](https://open-meteo.com/), CC BY 4.0, free non-commercial API. Both services can fail and have no guaranteed uptime.
- Services are called only on user action. Selected city coordinates are sent; no device-location permission, accounts, tracking or API keys.
- Vehicle photographs: Dllu (Model S), Kevauto (Model Y), Mr.choppers (Cybertruck), via Wikimedia Commons, CC BY-SA 4.0 or 3.0. Road photograph: Mirko Fabian, Unsplash License. Authors, original pages and licenses are shown on the [about page](https://netaniya.github.io/Netaniya/motion-atelier/about/) and in [photo-credits.json](dist/assets/photo-credits.json). Resizing and format conversion only; no AI image editing.
- Film: [Tesla Loveday: “Energy”](https://commons.wikimedia.org/wiki/File:Tesla_Loveday-_%22Energy%22.webm), Atellani LLC, [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). Excerpt 40.6–43.3 s, slowed to 50% with frame interpolation, audio removed, resized and re-encoded. No manufacturer commission or sponsorship.
- Music: [“Dream Culture”](https://www.incompetech.com/music/royalty-free/index.html?isrc=USUAN1300046), Kevin MacLeod (incompetech.com), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Excerpt 12.0–17.3 s, reduced level with fade-in/out; [full credits](dist/assets/intro-music-credits.json). Requested when the intro starts; the browser controls audible autoplay permission. A mute/enable control remains available.
- [Manrope](https://github.com/google/fonts/tree/main/ofl/manrope) by Mikhail Sharanda and Mirko Velimirovic, [SIL Open Font License 1.1](dist/assets/fonts/OFL.txt).

Natalie defined the product, languages, page structure, centered type, blue visual direction and flowing arrival. Implementation and automated checks were produced with AI assistance; photographs are by the credited authors. This demonstrates learning practice, not commercial deployment experience.

## Authorship and public files

[NOTICE.md](NOTICE.md) records human product direction, AI assistance and separate media licences. No additional open-source licence is granted for this project. A public repository and browser code remain technically copyable; the notice is not copy prevention. The published application does not require API keys or credentials. A scan for common credential patterns found no matches; this is not a complete security audit.


## Original Tesla films

Each model page has an official Tesla YouTube film, a local photographic cover, an accessible play button, fullscreen controls and a permanent link to the original. The privacy-enhanced player loads only after the visitor starts the film; closing it removes the player. Interface labels are available in all four languages. The footage may show a different model year or trim from the photograph and illustrative data. No YouTube video files are downloaded or relicensed. Source links and metadata are in `dist/assets/tesla-video-credits.json`. Metadata and embed codes were checked through YouTube oEmbed on 15 October 2026; actual playback remains dependent on YouTube and the visitor’s browser/network.
