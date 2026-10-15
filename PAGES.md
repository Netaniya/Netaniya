# Public portfolio · GitHub Pages

The three portfolio applications are published together through `.github/workflows/portfolio-pages.yml`.

| Project | Public URL |
| --- | --- |
| Portfolio overview | https://netaniya.github.io/Netaniya/ |
| Motion Atelier | https://netaniya.github.io/Netaniya/motion-atelier/ |
| AI Request Desk | https://netaniya.github.io/Netaniya/ai-request-desk/ |
| AI Quality Lab | https://netaniya.github.io/Netaniya/ai-quality-lab/ |

No account, password, API key or paid domain is needed to visit the demos. The former hosting addresses remain separate deployments; these links serve the applications directly from GitHub Pages.

## Build and deploy

```sh
npm ci --ignore-scripts --prefix portfolio/motion-atelier
node scripts/build-pages.mjs
node --test tests/pages.test.mjs
```

The workflow publishes only `_site/`, generated from the three allowlisted public portfolio projects. It does not publish backend code, hosting configuration, repository metadata or private projects. GitHub Pages is configured to use GitHub Actions with HTTPS enforced. Deployment requires only `pages: write` and `id-token: write`; no personal access token is stored.

The build adapts absolute links, static assets, canonical URLs, route parsing and configuration-sharing links to the project base `/Netaniya`. Original project source remains usable on its previous hosting. Motion Atelier's Leaflet vendor files are copied byte for byte to preserve their integrity hashes and licenses.

## AI Quality Lab hosting variants

GitHub Pages serves static files. This deployment uses the existing JavaScript evaluator directly in the browser, with the same fixture data, scoring rules and editable answers. Reports identify the runtime as `javascript_browser`. A completed browser comparison makes zero API or model calls; answers stay on the device. Four translated datasets and the Python evaluator are available as actual downloadable files.

The original Worker implementation and its server endpoint remain in `portfolio/ai-quality-lab/`; the separate FastAPI/React example is unchanged and is not part of this deployment. Descriptions referring to a Worker or server API describe those source variants, not the GitHub Pages runtime.

## Verification

Seven deployment-contract tests cover 40 Motion page/language combinations, internal links and assets, vehicle detail pages, configuration calculations, garage saving, shared URLs, media paths, unchanged Leaflet files, browser-only Quality Lab scoring in all four languages, edited answers, report exports, translated downloads and the output allowlist. They use DOM doubles and do not claim real-browser rendering or visual QA.

Motion Atelier retains its original 59 checks. Request Desk and the Worker Quality Lab retain their existing test suites. Vehicle prices/specifications are illustrative; live routing, mapping and weather depend on their external providers. Browser autoplay restrictions still apply to intro music.
