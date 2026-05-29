# Export

Download the page, a region, or a data source as a file.

---

## Overview

The `x-export` directive turns its host element into a download action. The whole page, a target section, or an `$x` data source can be exported. Supported formats are **PDF**, **PNG**, **JPEG**, **WebP**, **CSV**, and **JSON**.

PDFs go through the browser's native print pipeline, so users get the familiar "Save as PDF" dialog with proper multi-page layout, vector text (selectable and copy-pasteable), and the page's own `@media print` rules. Whole-page PDFs print the whole page; targeted PDFs scope the print to the chosen subtree via a temporary print stylesheet. Raster image formats (PNG, JPEG, WebP) use <a href="https://github.com/yorickshen/html2canvas-pro" target="_blank">html2canvas-pro</a>, lazy-loaded from the jsDelivr CDN on first use.

---

## Setup

Export is included in `manifest.js` with all core plugins, or can be selectively loaded.

<div x-code-group copy>

```html "All Plugins (default)"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Selective"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="export"></script>
```

</div>

---

## Triggers

### Buttons

Add `x-export` to any clickable element. With no options it snaps the whole page as a PDF. Other formats are defined by a modifier.

<div x-code-group>

```html copy

<!-- PDF -->
<button x-export>PDF</button>

<!-- Image formats -->
<button x-export.png>PNG</button>
<button x-export.jpg>JPG</button>
<button x-export.webp>WEBP</button>

<!-- Data formats -->
<div x-data="{ rows: [
    { id: 1, name: 'Acme Co.', plan: 'Pro', mrr: 240 },
    { id: 2, name: 'Globex', plan: 'Starter', mrr: 49 }
    ] }">
    <button x-export="{ format: 'csv', data: rows, filename: 'rows.csv' }">CSV</button>
    <button x-export="{ format: 'json', data: rows, filename: 'rows.json' }">JSON</button>
</div>
```

::: frame row-wrap gap-2
<button x-export>PDF</button>
<button x-export.png>PNG</button>
<button x-export.jpg>JPG</button>
<button x-export.webp>WEBP</button>
<div x-data="{ rows: [
{ id: 1, name: 'Acme Co.', plan: 'Pro', mrr: 240 },
{ id: 2, name: 'Globex', plan: 'Starter', mrr: 49 }
] }" class="row gap-2 flex-wrap">
    <button x-export="{ format: 'csv', data: rows, filename: 'rows.csv' }">CSV</button>
    <button x-export="{ format: 'json', data: rows, filename: 'rows.json' }">JSON</button>
</div>
:::

</div>

Visual formats (PDF, PNG, JPEG, WebP) snapshot the page or a target element. Data formats (CSV, JSON) serialize an `$x` source or inline value — covered in detail in [Data Sources](#data-sources) below.

UI elements that shouldn't appear in the snapshot (headers, sidebars, navigation, the export button itself) can be marked with `data-no-export`{copy}. The filter applies to every visual export on the page.

The downloaded filename is configurable without switching to the object form. A `data-filename`{copy} attribute works on any element. On an anchor link trigger, the standard HTML `download`{copy} attribute is honored as well.

```html copy
<button x-export.png data-filename="report.png">Download report</button>
<a x-export.pdf href="#chart" download="chart.pdf">Save chart</a>
```

To control resolution or dimensions of a raster image, use the object form. `resolution` is the pixel-density multiplier (defaults to the device pixel ratio so the exported image matches what's on screen); `width` and `height` set explicit output dimensions.

```html copy
<button x-export="{ format: 'png', resolution: 2 }">Retina PNG</button>
<button x-export="{ format: 'jpeg', width: 1200 }">1200 px wide JPG</button>
<button x-export="{ format: 'webp', width: 1200, height: 800 }">Sized WEBP</button>
```

For more control, pass an object expression. The `target`{copy} property is a CSS selector pointing at the element to snapshot. Anything outside it is ignored.

<div x-code-group>

```html copy
<div id="report">
    <h2>Quarterly Report</h2>
    <p>...</p>
</div>

<button x-export="{ format: 'pdf', target: '#report', filename: 'q3-report.pdf' }">Download PDF report</button>
```

::: frame col gap-4 p-10 font-sans
<div id="quarterly-report" class="col gap-2 p-4 border border-line rounded">
    <span class="h3">Quarterly Report</span>
    <p class="text-muted">Revenue grew 14% year-over-year. New customers accounted for 38% of bookings.</p>
</div>
<button x-export="{ format: 'pdf', target: '#quarterly-report', filename: 'q3-report.pdf' }">Download PDF report</button>
:::

</div>

---

### Anchor Links

When `x-export` is on an `<a>` whose `href` starts with `#`, the directive treats the fragment as the target. Clicking downloads the matched element instead of scrolling.

<div x-code-group>

```html copy
<a x-export.png href="#chart">Save chart as PNG</a>
```

::: frame col gap-4 p-10
<div id="chart-region" class="col gap-2 p-4 border border-line rounded">
    <span class="h3">Sales Chart</span>
    <p class="text-muted">Q1 · Q2 · Q3 · Q4</p>
</div>
<a x-export.png href="#chart-region" class="underline">Save chart as PNG</a>
:::

</div>

This pairs well with a normal in-page anchor as a "download this section" companion.

---

### Cross-Page Links

When `x-export` is on an `<a>` whose `href` points to another page, the directive rewrites the href to append `?export=<format>`. The browser navigates normally. The destination page picks up the URL signal and exports itself after loading.

<div x-code-group copy>

```html "Trigger page"

<!-- The link becomes /reports/q3?export=pdf -->
<a x-export.pdf href="/reports/q3">Download Q3 report</a>

```

```html "Export page"

<!-- On page load, checks ?export=<format>; if present, exports the target -->
<div x-export="{ trigger: 'url', target: '#report' }"></div>

```

</div>

The pattern keeps the *intent* on the link that expresses it, and the *capability* on the page that knows what's exportable. Random visitors never trigger downloads. Only those arriving via an export link, or a pasted URL with the param, will.

::: brand icon="lucide:info"
**Headless / SSR**: visual exports run in the user's browser at click time, so they're inert in prerendered HTML and crawler views. The export button itself ships, but no library is loaded until the user clicks. For automated headless exports, see [Batch and CI Exports](#batch-and-ci-exports) below.
:::

---

## Data Sources

For tabular and structured data, point at a `$x` source by name. The directive serializes the source as CSV or JSON and triggers a download.

<div x-code-group>

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

</div>

CSV output handles RFC-4180 quoting automatically. Values containing commas, quotes, or newlines are properly escaped. The header row is the union of keys across all rows, so heterogeneous arrays export faithfully.

---

## Magic Property

The `$export` magic provides the same functionality as `x-export`, and is useful for custom trigger conditions, multi-step workflows, or non-clickable triggers.

<div x-code-group>

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

::: frame col gap-4 p-10 text-base
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

</div>

All of `$export`'s options are identical to those of `x-export`.

---

## Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **`format`{copy}** | String | `'pdf'` | One of `pdf`, `png`, `jpeg`, `webp`, `csv`, `json` |
| **`target`{copy}** | String / Element | `<body>` | CSS selector or element to snapshot. Visual formats only. |
| **`source`{copy}** | String | — | Name of a `$x` data source to export. `csv` / `json` only. |
| **`data`{copy}** | Array / Object | — | Inline data to export instead of a `$x` source. `csv` / `json` only. |
| **`filename`{copy}** | String | `export-<timestamp>.<ext>` | Suggested download name. Falls back to a `download` attribute on anchor hosts, then a `data-filename` attribute, then a timestamped default. |
| **`resolution`{copy}** | Number | device pixel ratio | Pixel-density multiplier for raster image exports. Default matches the host display — `1` on standard monitors, `2` on retina — so the exported image looks like what you see on screen. Set explicitly (e.g. `2` or `3`) for hardware-independent renders. |
| **`width`{copy}** | Number | natural width | Output canvas width in pixels for raster image exports. Overrides the target's natural width. |
| **`height`{copy}** | Number | natural height | Output canvas height in pixels for raster image exports. Overrides the target's natural height. |
| **`quality`{copy}** | Number (0–1) | `0.95` | JPEG / WebP compression quality |
| **`backgroundColor`{copy}** | String | page background | Solid background for raster exports (PNG, JPEG, WebP). Defaults to the page's effective background. Pass `'transparent'` to disable the fill (useful for icon / logo exports). PDFs render the page CSS directly and ignore this option. |
| **`pageSize`{copy}** | String | `'a4'` | PDF page size — `a4`, `a3`, `letter`, `legal`, etc. Passed through to the print pipeline's `@page` rule. Users can still override in the browser's print dialog. |
| **`trigger`{copy}** | String | `'click'` | `'click'` (default) or `'url'`. With `'url'` the export fires on page load if the URL has the export param. |
| **`urlParam`{copy}** | String | `'export'` | URL query-param name to watch when `trigger: 'url'` |
| **`delay`{copy}** | Number | `0` | Milliseconds to wait after a `url` trigger fires before snapshotting. Useful when charts or animations need to settle. |

::: brand icon="lucide:info"
**Cross-origin assets**: snapshots of regions containing images from other domains need those images served with permissive CORS headers (`Access-Control-Allow-Origin: *`), or they'll appear blank in the exported file. Self-hosted assets work without configuration.
:::

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

Routes can be configured in `manifest.json` so the same `npx mnfst-export`{copy} runs in any environment.

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
| **`output`{copy}** | `string` | `"exports"` | Output folder relative to the project root |
| **`routes`{copy}** | `object[]` | `[]` | Per-route export entries. Each takes the same fields as the directive's object form (`path`, `format`, `target`, `source`, `filename`, `pageSize`, etc.) |
| **`rss`{copy}** | `object` | inherited | Channel defaults: `{ title, link, description }`. Falls back to `manifest.name`, `manifest.live_url`, and `manifest.description`. |

The CLI spins up a static server, opens each route in headless Chromium, waits for the `manifest:render-ready` signal, then snapshots or serializes whatever the route exposes. Visual formats use Puppeteer's native `page.pdf()` and `page.screenshot()`, which are more reliable in headless than the in-browser libraries.

Run `npx mnfst-export --help`{copy} for the full list of flags. Puppeteer is a peer dependency. Install it once in the project.

```bash copy
npm i -D puppeteer
```
