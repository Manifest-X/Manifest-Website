# Websites
Publish Manifest projects live to the web.

---

## Overview

Once your project is ready, you have two choices for how it runs in users' browsers:

- **Single-page app (SPA)** is the default. Your `index.html` loads once, and JavaScript swaps content as users navigate. Fast, lightweight, and great for app-like experiences. The catch is that search engines and AI crawlers see only the empty shell on first load, since they don't always run the JavaScript that fills it in.
- **Multi-page app (MPA)** is the prerendered version. A build step generates one `index.html` per route in advance, so every page is a complete, crawlable HTML document. Best for marketing sites, blogs, and documentation that need to rank in search.

Both deploy as static files to any web host.

---

## SPA (default)

Manifest projects work as a single-page app by default. No build step required. To deploy:

- Deploy the project root directory
- Set the root to `./` if applicable
- Set the fallback file to `./index.html` if applicable

The [starter project](/docs/getting-started/starter-project) includes a `_redirects` file to assist the host with SPA routing.

---

## MPA (prerendered)

Search engines and AI crawlers run little to no JavaScript when indexing websites, leaving SPAs largely invisible to them. The render solves this by visiting every route in your project with a real browser and saving the resulting HTML to disk, so each page exists as a complete static file that crawlers can read directly.

To render an MPA, from the project root run:

```bash copy
npx mnfst-render
```

Routes with sub-pages driven by data (e.g. a page template component for blog articles) need a wildcard `*` to be discovered by the rendering process. Use comma-separated conditions to match both the route and its dynamic paths:

```html "index.html" copy
<x-blog x-route="/blog, /blog/*"></x-blog>
```

By default, output is generated in a `/website` folder which includes:

- Copies of all folders and assets from the project, preserving path references.
- Folders for each route containing its compiled `index.html` page.
- Folders for each locale (e.g. `/fr`, `/zh`), and page sub-folder as applicable.
- Translated text content on locale pages (from CSV or YAML/JSON data sources).
- Locale-prefixed navigation links on locale pages (e.g. `/fr/pricing`).
- Canonical and hreflang links added to each page.
- `og:locale`/`og:locale:alternate` for localized builds when Open Graph tags exist.
- Compiled Tailwind CSS (when `data-tailwind` is used).
- `sitemap.xml`, `robots.txt`, `llms.txt`, and `llms-full.txt` files for crawler discovery.
- Per-route `og:image` PNG snapshots under `/og/`, plus injected OpenGraph, Twitter Card, and JSON-LD meta tags for rich social previews and structured-data search results.
- `.prettierignore`, `.gitattributes`, `.editorconfig`, and `.vscode/settings.json` to help preserve whitespace in code blocks.

---

### SEO & AEO

The render automatically generates page titles, descriptions, social-share images, structured data, `sitemap.xml`, `robots.txt`, and the `llms.txt` family for AI crawlers. No configuration is needed for most sites. See [SEO & AEO](/docs/publishing/seo-aeo) for what's generated, when to customize it, and how.

---

### Configuration

Render settings can be configured in `manifest.json`. Most projects don't need to set anything here, with defaults supporting the majority of sites. Customize the MPA build by adding a `render` block to `manifest.json`. Additionally, the top-level `live_url` property sets the domain used in `sitemap.xml`, `robots.txt`, and canonical link tags.

```json "manifest.json" copy
{
  "live_url": "https://example.com",
  "render": {
    "output": "website",
    "routerBase": "",
    "locales": ["en", "fr", "zh"],
    "paths": ["legal/privacy", "legal/terms"],
    "localeRouteExclude": ["legal"],
    "redirects": [
      { "from": "/old", "to": "/new", "status": 301 }
    ],
    "wait": 15000,
    "concurrency": 2,
    "retries": 2,
    "browserRecycleEvery": 40,
    "tailwindInput": "styles/tailwind.css"
  }
}
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `output`{copy} | `string` | `"website"` | Output folder name relative to the project root. |
| `routerBase`{copy} | `string` | `""` | Base path baked into asset references in prerendered HTML. Leave empty when the output is deployed as the site root. |
| `locales`{copy} | `string[]` | auto-discovered | Locale codes to build (e.g. `["en", "fr", "zh"]`). When omitted, locales are inferred from your data source keys or CSV column headers. |
| `paths`{copy} | `string[]` | `[]` | Additional paths to render beyond those auto-discovered from `x-route` attributes (e.g. `["legal/privacy"]`). Each entry is expanded to all locale variants. |
| `localeRouteExclude`{copy} | `string[]` | `[]` | Route prefixes that should not receive locale variants (e.g. `["legal"]` keeps `/legal/terms` as-is without generating `/fr/legal/terms`). |
| `redirects`{copy} | `object[]` | `[]` | Redirect rules written to the output. Each entry is `{ "from": "/old", "to": "/new", "status": 301 }` |
| `wait`{copy} | `number` | auto | Milliseconds to wait for a page to finish rendering before snapshot. When omitted the renderer waits for a `manifest:render-ready` signal from the data plugin. |
| `concurrency`{copy} | `number` | `2` | Number of pages rendered in parallel. Increase for faster builds on high-core machines; decrease if memory is constrained. |
| `retries`{copy} | `number` | `2` | Number of retry attempts for pages that fail to render. |
| `browserRecycleEvery`{copy} | `number` | `50` | Recycle the browser after this many pages to prevent memory buildup on large sites. |
| `tailwindInput`{copy} | `string` | — | Path to a custom Tailwind CSS entry file relative to the project root. Tailwind compilation is otherwise auto-detected via the `data-tailwind` attribute on the manifest script tag. |

---

### Hydration

"Hydration" means restoring dynamic behavior to a page that started out as static HTML. The prerender bakes Alpine's rendered output into HTML, which is great for crawlers but loses the JavaScript-driven interactivity. To keep specific elements interactive after prerender, apply the `data-hydrate` attribute. The prerender will preserve that element's source code at runtime so Alpine can re-initialize it normally.

<div x-code-group>

```html "Hydrated (source preserved)"
<!-- data-hydrate keeps the source as-is so Alpine binds it at runtime -->
<div x-data="{ counter: 0 }" data-hydrate>
  <button @click="counter++" x-text="counter"></button>
</div>
```

```html "Default (prerendered snapshot)"
<!-- Without data-hydrate, the prerender bakes the rendered DOM into HTML.
     The x-text value is inlined and Alpine doesn't re-bind at runtime. -->
<div x-data="{ counter: 0 }">
  <button @click="counter++">0</button>
</div>
```

</div>

Interactive directives like `x-color`, `x-model`, `@click`, and `:class` are automatically handled by the hydration system and generally do not need `data-hydrate`.

---

### Publishing

To deploy an MPA on a host environment, set the root directory to the prerendered output directory (i.e. `./website`).

---

## Page Transitions

Manifest enables <a href="https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API" target="_blank">view transitions</a> for both SPA route changes and prerendered MPA navigations. Pages crossfade automatically in supporting browsers; browsers without support fall back to instant navigation.

- For **MPA** (prerendered) navigations, transitions are always on and the browser handles them natively in parallel with page load.
- For **SPA** route changes, the framework picks a default based on page size, with explicit override:

| Mode | When |
|---|---|
| `<html data-view-transitions>` | Force on, regardless of page size |
| `<html data-no-view-transitions>` | Force off |
| (neither) | Auto: on under ~3,000 DOM elements, off above |

The auto threshold exists because the View Transitions API rasterizes the full viewport for both the "before" and "after" snapshots; on heavy pages this can add 500ms+ of perceived navigation latency. Use force-on if the visual transition is worth the cost on a busy page; use force-off to keep things instant on a light one.

Tune the default duration and easing via CSS custom properties:

```css copy
:root {
    --view-transition-duration: 200ms;
    --view-transition-easing: cubic-bezier(0.4, 0, 0.2, 1);
}
```

Opt specific elements out of the transition by adding `data-no-view-transition` (singular) or setting `view-transition-name: none` in CSS. Live/embedded content like `<iframe>`, `<video>`, and `<canvas>` are excluded by default to prevent flicker mid-transition.

```html copy
<div data-no-view-transition>
    <!-- Excluded from page transition snapshot -->
</div>
```

Authors who want elements to morph between pages (e.g. a hero image shared between list and detail views) can give matching elements the same `view-transition-name`:

```css copy
.hero-image {
    view-transition-name: hero;
}
```

::: brand icon="lucide:info"
Respects `prefers-reduced-motion` automatically through Manifest's existing reduced-motion reset.
:::