# Export

Download the page, a region, or a data source as a file.

---

## Overview

The `x-export` directive turns its host element into a download action. The whole page, a target section, or an `$x` data source can be exported. Supported formats are **PDF**, **PNG**, **JPEG**, **WebP**, **CSV**, and **JSON**.

Whole-page PDFs go through the browser's native print pipeline, so users get the familiar "Save as PDF" dialog with proper multi-page layout and vector text. Targeted snapshots and raster image formats use <a href="https://github.com/yorickshen/html2canvas-pro" target="_blank">html2canvas-pro</a> and <a href="https://github.com/parallax/jsPDF" target="_blank">jsPDF</a>, lazy-loaded from the jsDelivr CDN on first use.

---

## Setup

Export is included in `manifest.js` with all core plugins, or can be selectively loaded.

<x-code-group copy>

```html "All Plugins (default)"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Selective"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="export"></script>
```

</x-code-group>

---

## Triggers

### Button

Add `x-export` to any clickable element. With no options it snaps the whole page as a PDF. Pick a format with a modifier.

::: frame
<div class="row gap-2">
    <button x-export>Download page (PDF)</button>
    <button x-export.png>Save as PNG</button>
</div>
:::

```html copy
<button x-export>Download page (PDF)</button>
<button x-export.png>Save as PNG</button>
<button x-export.csv>Download CSV</button>
```

Site chrome that shouldn't appear in the snapshot (headers, sidebars, navigation, the export button itself) can be marked with `data-no-export`. The filter applies to every visual export on the page.

The downloaded filename is configurable without switching to the object form. A `data-filename` attribute works on any element. On an anchor host, the standard HTML `download` attribute is honored as well.

```html copy
<button x-export.png data-filename="report.png">Download report</button>
<a x-export.pdf href="#chart" download="chart.pdf">Save chart</a>
```

For more control, pass an object expression. The `target` property is a CSS selector pointing at the element to snapshot. Anything outside it is ignored.

::: frame col gap-4 p-10
<div id="quarterly-report" class="col gap-2 p-4 border border-line rounded">
    <span class="h3">Quarterly Report</span>
    <p class="text-muted">Revenue grew 14% year-over-year. New customers accounted for 38% of bookings.</p>
</div>
<button x-export="{ format: 'pdf', target: '#quarterly-report', filename: 'q3-report.pdf' }">
    Download report
</button>
:::

```html copy
<div id="report">
    <h2>Quarterly Report</h2>
    <p>...</p>
</div>

<button x-export="{ format: 'pdf', target: '#report', filename: 'q3-report.pdf' }">
    Download report
</button>
```

### Anchor Link

When `x-export` is on an `<a>` whose `href` starts with `#`, the directive treats the fragment as the target. Clicking downloads the matched element instead of scrolling.

::: frame col gap-4 p-10
<div id="chart-region" class="col gap-2 p-4 border border-line rounded">
    <span class="h3">Sales Chart</span>
    <p class="text-muted">Q1 · Q2 · Q3 · Q4</p>
</div>
<a x-export.png href="#chart-region">Save chart as PNG</a>
:::

```html copy
<a x-export.pdf href="#report">Download report</a>
<a x-export.png href="#chart">Save chart</a>
```

This pairs well with a normal in-page anchor as a "download this section" companion.

### Cross-Page Link

When `x-export` is on an `<a>` whose `href` points to another page, the directive rewrites the href to append `?export=<format>`. The browser navigates normally. The destination page picks up the URL signal and exports itself after loading.

```html "Link page" copy
<a x-export.pdf href="/reports/q3">Download Q3 report</a>
<!-- The href becomes /reports/q3?export=pdf on render -->
```

```html "Destination page" copy
<div x-export="{ trigger: 'url', target: '#report' }"></div>
<!-- On page load, checks ?export=<format>; if present, exports the target -->
```

The pattern keeps the *intent* on the link that expresses it, and the *capability* on the page that knows what's exportable. Random visitors never trigger downloads. Only those arriving via an export link, or a pasted URL with the param, will.

::: brand icon="lucide:info"
**Headless / SSR**: visual exports run in the user's browser at click time, so they're inert in prerendered HTML and crawler views. The export button itself ships, but no library is loaded until the user clicks. For automated headless exports, see [Batch and CI Exports](#batch-and-ci-exports) below.
:::

---

## Programmatic Use

The `$export` magic runs an export from any Alpine expression and returns a promise. Useful for custom trigger conditions, multi-step workflows, or non-clickable triggers.

::: frame col gap-4 p-10
<form x-data="{ agreed: false }" @submit.prevent="$export({ format: 'pdf', target: '#terms-doc', filename: 'terms.pdf' })" class="col gap-3">
    <div id="terms-doc" class="col gap-2 p-4 border border-line rounded">
        <span class="h3">Terms of Service</span>
        <p class="text-muted">By proceeding you agree to the terms outlined herein.</p>
    </div>
    <label class="row gap-2 items-center">
        <input type="checkbox" x-model="agreed">
        <span>I agree to the terms</span>
    </label>
    <button type="submit" :disabled="!agreed">Download signed copy</button>
</form>
:::

```html copy
<!-- Validate, then export -->
<form @submit.prevent="$refs.form.checkValidity() && await $export({ format: 'csv', data: rows })">
    ...
</form>

<!-- Require sign-in before export -->
<button @click="$auth.isAuthenticated && $export({ format: 'pdf', target: '#dashboard' })">
    Download (signed-in only)
</button>
```

Options are identical to the directive's object form.

---

## Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **`format`** | String | `'pdf'` | One of `pdf`, `png`, `jpeg`, `webp`, `csv`, `json` |
| **`target`** | String / Element | `<body>` | CSS selector or element to snapshot. Visual formats only. |
| **`source`** | String | — | Name of a `$x` data source to export. `csv` / `json` only. |
| **`data`** | Array / Object | — | Inline data to export instead of a `$x` source. `csv` / `json` only. |
| **`filename`** | String | `export-<timestamp>.<ext>` | Suggested download name. Falls back to a `download` attribute on anchor hosts, then a `data-filename` attribute, then a timestamped default. |
| **`resolution`** | Number | `2` | Pixel-density multiplier for raster images and PDF |
| **`quality`** | Number (0–1) | `0.95` | JPEG / WebP compression quality |
| **`backgroundColor`** | String | inherited | Solid background for JPEG / PDF. PNG stays transparent by default. |
| **`pageSize`** | String | `'a4'` | PDF page size: `a4`, `a3`, `letter`, `legal`, etc. |
| **`trigger`** | String | `'click'` | `'click'` (default) or `'url'`. With `'url'` the export fires on page load if the URL has the export param. |
| **`urlParam`** | String | `'export'` | URL query-param name to watch when `trigger: 'url'` |
| **`delay`** | Number | `0` | Milliseconds to wait after a `url` trigger fires before snapshotting. Useful when charts or animations need to settle. |

::: brand icon="lucide:info"
**Cross-origin assets**: snapshots of regions containing images from other domains need those images served with permissive CORS headers (`Access-Control-Allow-Origin: *`), or they'll appear blank in the exported file. Self-hosted assets work without configuration.
:::

---

## Exporting Data Sources

For tabular and structured data, point at a `$x` source by name. The directive serializes the source as CSV or JSON and triggers a download.

::: frame col gap-4 p-10
<div x-data="{ customers: [
    { id: 1, name: 'Acme Co.',     plan: 'Pro',   mrr: 240 },
    { id: 2, name: 'Globex',       plan: 'Starter', mrr: 49 },
    { id: 3, name: 'Initech',      plan: 'Pro',   mrr: 240 },
    { id: 4, name: 'Umbrella Inc', plan: 'Enterprise', mrr: 1200 }
] }" class="col gap-3 w-full">
    <table class="w-full text-sm">
        <thead><tr class="text-muted text-left"><th>Name</th><th>Plan</th><th>MRR</th></tr></thead>
        <tbody>
            <template x-for="c in customers" :key="c.id">
                <tr class="border-t border-line">
                    <td x-text="c.name"></td>
                    <td x-text="c.plan"></td>
                    <td>$<span x-text="c.mrr"></span></td>
                </tr>
            </template>
        </tbody>
    </table>
    <div class="row gap-2">
        <button x-export="{ format: 'csv', data: customers, filename: 'customers.csv' }">Export CSV</button>
        <button x-export="{ format: 'json', data: customers, filename: 'customers.json' }">Export JSON</button>
    </div>
</div>
:::

```html copy
<!-- Full source as CSV -->
<button x-export="{ format: 'csv', source: 'customers', filename: 'customers.csv' }">
    Export customers
</button>

<!-- Filtered subset using existing query helpers -->
<button x-export="{ format: 'csv', data: $x.customers.$search(term, 'name') }">
    Export search results
</button>

<!-- Full JSON tree -->
<button x-export="{ format: 'json', source: 'settings' }">
    Export settings
</button>
```

CSV output handles RFC-4180 quoting automatically. Values containing commas, quotes, or newlines are properly escaped. The header row is the union of keys across all rows, so heterogeneous arrays export faithfully.

---

## Batch and CI Exports

The `mnfst-export` CLI runs the same exports from Node. It's the right tool for build pipelines, scheduled jobs, and any case where no human is around to click. The CLI supports the same six formats as the directive, plus an `rss` format for blog feeds.

```bash copy
# Snapshot a single route as PDF
npx mnfst-export --pdf --path /reports/q3 --target "#report"

# Whole project at once (reads manifest.export.routes from manifest.json)
npx mnfst-export

# Data source as CSV
npx mnfst-export --csv --path /admin/customers --source customers
```

Configure routes in `manifest.json` so the same `npx mnfst-export` runs in any environment.

```json "manifest.json" copy
{
  "export": {
    "output": "exports",
    "routes": [
      { "path": "/reports/q3", "format": "pdf", "target": "#report" },
      { "path": "/customers",  "format": "csv", "source": "customers" },
      { "path": "/blog",       "format": "rss", "source": "posts", "map": { "link": "slug" } }
    ]
  }
}
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| **`output`** | `string` | `"exports"` | Output folder relative to the project root |
| **`routes`** | `object[]` | `[]` | Per-route export entries. Each takes the same fields as the directive's object form (`path`, `format`, `target`, `source`, `filename`, `pageSize`, etc.) |
| **`rss`** | `object` | inherited | Channel defaults: `{ title, link, description }`. Falls back to `manifest.name`, `manifest.live_url`, and `manifest.description`. |

The CLI spins up a static server, opens each route in headless Chromium, waits for the `manifest:render-ready` signal, then snapshots or serializes whatever the route exposes. Visual formats use Puppeteer's native `page.pdf()` and `page.screenshot()`, which are more reliable in headless than the in-browser libraries.

Run `npx mnfst-export --help` for the full list of flags. Puppeteer is a peer dependency. Install it once in the project.

```bash copy
npm i -D puppeteer
```
