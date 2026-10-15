# Motion Atelier

An original multi-page automotive learning project by **Natalie Ragulina (Netaniya)**, developed with AI assistance.

[Live demo](https://motion-atelier-neta26.wellolm4.chatgpt.site) · [Deutsch](README.md)

Ten separate HTML pages: home, collection, rule-based vehicle finder, configurator, journey planner, local garage, project information and three model pages. German is the first-visit language, with full English, Russian and Ukrainian interfaces. The slow, skippable photographic arrival respects reduced-motion preferences.

## Appearance

Dark on first visit, with a persistent light/dark toggle across every page. Main headings are centered without sentence dots. Paired titles use separate lines without a leading dash. Real photographs are fitted in full inside their frames; mobile layouts stack text and photo. The arrival animates a real photograph, not a film clip. Manrope, including Cyrillic glyphs, is self-hosted.

## Working features

Filtering, sorting, model comparison, explained matching, configurable pricing in integer eurocents, range estimates, shareable configuration URLs, JSON export and browser-local garage persistence. Public OSRM routing and user-requested Open-Meteo weather are validated and clearly distinguished from an explicit offline estimate.

Tesla Model S, Model Y and Cybertruck are shown in real photographs. All technical numbers, options and prices are illustrative application fixtures. Range is battery capacity divided by model consumption, not WLTP. Paint, wheels and interior selections update the summary and demo price while the original photo remains unchanged. There is no dealer, reservation, payment, live LLM or manufacturer affiliation.

Charging estimates assume constant consumption and average charging power, with charging up to 80% and a selected arrival reserve. No live chargers, availability, traffic, charging curves or weather-based consumption model. Energy prices are user assumptions. Offline estimates use great-circle distance × 1.25 and 80 km/h, explicitly labelled as non-road-route estimates.

## Development

```sh
npm ci
npm run build
npm run check
npm test
```

Static output: `dist/`. Runtime: HTML/CSS and JavaScript ES modules, no framework dependency. `linkedom` is used only for automated DOM tests. **37 automated checks passed.** Tests cover calculations, all four languages, all pages, actions, storage and race conditions. These do not verify browser rendering; final desktop and mobile visual QA is still outstanding.

## External services and sources

- [OSRM](https://project-osrm.org/) / [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), ODbL. The built-in graphic is a schematic route trace; a link opens a full external map.
- [Open-Meteo](https://open-meteo.com/), CC BY 4.0, free non-commercial API. Both services can fail and have no guaranteed uptime.
- Services are called only on user action. Selected city coordinates are sent; no device-location permission, accounts, tracking or API keys.
- Vehicle photographs: Dllu (Model S), Kevauto (Model Y), Mr.choppers (Cybertruck), via Wikimedia Commons, CC BY-SA 4.0 or 3.0. Road photograph: Mirko Fabian, Unsplash License. Authors, original pages and licenses are shown on the [about page](https://motion-atelier-neta26.wellolm4.chatgpt.site/about/) and in [photo-credits.json](dist/assets/photo-credits.json). Resizing and format conversion only; no AI image editing.
- [Manrope](https://github.com/google/fonts/tree/main/ofl/manrope) by Mikhail Sharanda and Mirko Velimirovic, [SIL Open Font License 1.1](dist/assets/fonts/OFL.txt).

Natalie defined the product, languages, page structure, centered type, blue visual direction and flowing arrival. Implementation and automated checks were produced with AI assistance; photographs are by the credited authors. This demonstrates learning practice, not commercial deployment experience.
