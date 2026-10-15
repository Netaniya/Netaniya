# Motion Atelier

An original multi-page automotive learning project by **Natalie Ragulina (Netaniya)**, developed with AI assistance.

[Live demo](https://motion-atelier-neta26.wellolm4.chatgpt.site) · [Deutsch](README.md)

Ten separate HTML pages: home, collection, rule-based vehicle finder, configurator, journey planner, local garage, project information and three model pages. German is the first-visit language, with full English, Russian and Ukrainian interfaces. The slow, skippable vehicle arrival respects reduced-motion preferences.

## Appearance

Dark on first visit, with a persistent light/dark toggle across every page. Main headings are centered without sentence dots. The hero car uses an inset mobile frame. The arrival animates a generated still image, not a film clip.

## Working features

Filtering, sorting, model comparison, explained matching, configurable pricing in integer eurocents, range estimates, shareable configuration URLs, JSON export and browser-local garage persistence. Public OSRM routing and user-requested Open-Meteo weather are validated and clearly distinguished from an explicit offline estimate.

The vehicles, images, specifications and prices are fictional. Range is battery capacity divided by model consumption, not WLTP. Paint previews are illustrative; wheels and interior are summarized in text. There is no dealer, reservation, payment, live LLM or manufacturer affiliation.

Charging estimates assume constant consumption and average charging power, with charging up to 80% and a selected arrival reserve. No live chargers, availability, traffic, charging curves or weather-based consumption model. Energy prices are user assumptions. Offline estimates use great-circle distance × 1.25 and 80 km/h, explicitly labelled as non-road-route estimates.

## Development

```sh
npm ci
npm run build
npm run check
npm test
```

Static output: `dist/`. Runtime: HTML/CSS and JavaScript ES modules, no framework dependency. `linkedom` is used only for automated DOM tests. **35 automated checks passed.** Tests cover calculations, all four languages, all pages, actions, storage and race conditions. These do not verify browser rendering; final desktop and mobile visual QA is still outstanding.

## External services and sources

- [OSRM](https://project-osrm.org/) / [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), ODbL. The built-in graphic is a schematic route trace; a link opens a full external map.
- [Open-Meteo](https://open-meteo.com/), CC BY 4.0, free non-commercial API. Both services can fail and have no guaranteed uptime.
- Services are called only on user action. Selected city coordinates are sent; no device-location permission, accounts, tracking or API keys.
- Original vehicle and architecture images generated with ImageGen.

Natalie defined the product, languages, page structure, centered type, blue visual direction and flowing arrival. Implementation, imagery and automated checks were produced with AI assistance. This demonstrates learning practice, not commercial deployment experience.
