# Acknowledgements

Manifest is built on a generation of open-source work. Special thanks goes to the maintainers and contributors of each resource below.

---

## Runtime

Manifest is modular: the loader script includes a set of core plugins by default, and each plugin pulls in only what it needs. You can opt any plugin out of the loader, and several libraries below load only when the feature that needs them first runs.

- <a href="https://alpinejs.dev" target="_blank"><strong>Alpine JS</strong></a> — the reactive frontend framework Manifest's plugins extend. Auto-loaded from CDN if the project hasn't already loaded its own copy (most don't).
- <a href="https://tailwindcss.com" target="_blank"><strong>Tailwind CSS</strong></a> — Manifest's style system is designed to be fully compatible with Tailwind v4+. A modified version of the Tailwind Play CDN loads only when the loader script carries the `data-tailwind` attribute.
- <a href="https://iconify.design" target="_blank"><strong>Iconify</strong></a> — the icon library aggregator behind `x-icon`, with access to 200,000+ icons across hundreds of icon sets. Bundled with the icons plugin, which is included in the default loader and can be excluded.
- <a href="https://highlightjs.org" target="_blank"><strong>highlight.js</strong></a> — syntax highlighting. Loaded by the code plugin the first time it runs.
- <a href="https://medv.io/codejar" target="_blank"><strong>CodeJar</strong></a> — lightweight contenteditable code editor. Loaded by the code plugin in editable mode.
- <a href="https://marked.js.org" target="_blank"><strong>Marked</strong></a> — markdown parser. Loaded by the markdown plugin and for `.md` data sources.
- <a href="https://github.com/cure53/DOMPurify" target="_blank"><strong>DOMPurify</strong></a> — HTML sanitizer. Loaded by the markdown plugin (for parsed output) and the SVG plugin (for injected markup).
- <a href="https://nodeca.github.io/js-yaml" target="_blank"><strong>js-yaml</strong></a> — YAML parser for `.yaml` / `.yml` data sources.
- <a href="https://www.papaparse.com" target="_blank"><strong>PapaParse</strong></a> — CSV parser for `.csv` data sources.

---

## Cloud backend

Optional — used only when you opt in to Manifest's cloud features.

- <a href="https://appwrite.io" target="_blank"><strong>Appwrite</strong></a> — the backend-as-a-service powering Manifest's auth and cloud data plugins.

---

## Prerender & testing

Pulled in as peer dependencies when a project installs `mnfst-render` (for static-site generation) or `mnfst-test` (for component testing and project linting).

- <a href="https://pptr.dev" target="_blank"><strong>Puppeteer</strong></a> — headless Chromium driver behind `mnfst-render` (static-site generation) and `mnfst-test` (linting and visual checks).
- <a href="https://github.com/Sparticuz/chromium" target="_blank"><strong>@sparticuz/chromium</strong></a> — serverless-friendly Chromium binary for prerendering in Lambda and Cloudflare environments.
- <a href="https://vitest.dev" target="_blank"><strong>Vitest</strong></a> — the test runner used by `mnfst-test`'s component-level testing API.
- <a href="https://github.com/capricorn86/happy-dom" target="_blank"><strong>happy-dom</strong></a> — DOM implementation that lets `mountManifest()` run components in Node for unit tests.

---

## A note from the author

Manifest was created by <a href="https://andrewmatlock.com" target="_blank">Andrew Matlock</a> to simplify website and app development for developers and AI — with gratitude to the maintainers of the resources above.

---

::: brand icon="lucide:info"
Spotted something missing? Open a pull request or file an issue on <a href="https://github.com/Manifest-X/Manifest" target="_blank">GitHub</a>.
:::
