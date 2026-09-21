# Import/Export

Move files out of the page and back in — downloads and uploads of documents and data.

---

## Overview

One plugin covers both directions of file transfer, and everything happens in the visitor's browser — no server involved:

- **[Export](#export)** — `x-export` turns any element into a download button. The whole page, a chosen section, or an `$x` data source can be saved as **PDF**, **PNG**, **JPEG**, **WebP**, **CSV**, or **JSON**.
- **[Import](#import)** — `x-import` turns any element into an "open file" button. A **JSON** or **CSV** file from the visitor's device is read and handed back as usable data.

Together they close the loop: whatever a visitor exports, they (or anyone else) can import back. Save files, backups, and user-made content packs all work without a single line of server code.

---

## Setup

Import/Export is included in `manifest.js` with all core plugins, or can be selectively loaded. The plugin name is `export`; `import` also works and loads the same file.

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

## Export

The `x-export` directive and `$export` magic save the page, a section of it, or a data source as a file. PDFs go through the browser's own print dialog — the familiar "Save as PDF" flow — so text stays selectable and copy-pasteable, long content flows across pages properly, and the page's own `@media print` styles apply. Exporting the whole page prints the whole page; exporting a target section temporarily narrows the print to just that section. Image formats (PNG, JPEG, WebP) use <a href="https://github.com/yorickshen/html2canvas-pro" target="_blank">html2canvas-pro</a>, fetched from the jsDelivr CDN only when someone first clicks.

### Triggers

#### Buttons

Add `x-export` to anything clickable. With no options it saves the whole page as a PDF; a modifier picks another format.

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

The visual formats (PDF, PNG, JPEG, WebP) take a picture of the page or a chosen element. The data formats (CSV, JSON) write out a `$x` source or an inline value — covered in [Data Sources](#data-sources) below.

Anything that shouldn't appear in the saved file (headers, sidebars, navigation, the export button itself) can be marked with `data-no-export`{copy}. The filter applies to every visual export on the page.

The downloaded filename can be set without any other options: a `data-filename`{copy} attribute works on any element, and on a link the standard HTML `download`{copy} attribute works too.

```html copy
<button x-export.png data-filename="report.png">Download report</button>
<a x-export.pdf href="#chart" download="chart.pdf">Save chart</a>
```

To control the sharpness or size of a saved image, use the options form. `resolution` multiplies the pixel density — it defaults to the visitor's screen density, so the saved image looks like what they see; set it to `2` or `3` for a consistently sharp result on any hardware. `width` and `height` set exact output dimensions.

```html copy
<button x-export="{ format: 'png', resolution: 2 }">Retina PNG</button>
<button x-export="{ format: 'jpeg', width: 1200 }">1200 px wide JPG</button>
<button x-export="{ format: 'webp', width: 1200, height: 800 }">Sized WEBP</button>
```

For more control, pass an options object. `target`{copy} is a CSS selector pointing at the element to save; everything outside it is left out.

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

#### Anchor Links

When `x-export` sits on a link whose `href` starts with `#`, that fragment becomes the target. Clicking downloads the matched element instead of scrolling to it.

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

#### Cross-Page Links

When `x-export` sits on a link to another page, the link quietly gains `?export=<format>`. The browser navigates as usual, and the destination page notices the signal in its URL and exports itself once it has loaded.

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

The link says what the visitor wants; the destination page knows what it can hand over. Ordinary visitors never trigger downloads — only someone arriving through an export link, or a pasted URL carrying the parameter, will.

::: brand icon="lucide:info"
**Prerendered pages and crawlers**: exports run in the visitor's browser at click time, so they do nothing in prerendered HTML or search-engine views. The button itself ships with the page, but no library loads until someone clicks. For exports with no person clicking at all, see [Batch and CI Exports](#batch-and-ci-exports) below.
:::

---

### Data Sources

For tables and structured data, point at a `$x` source by name. The plugin writes the source out as CSV or JSON and downloads it.

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

CSV quoting is handled automatically to the standard rules (RFC 4180): values containing commas, quotes, or line breaks come out intact. The header row collects every column that appears in any row, so rows don't all need the same fields.

---

### Export Magic

`$export` does everything `x-export` does, from inside an expression — useful when the download should happen on your own conditions: after validation, behind a sign-in check, or partway through a multi-step flow.

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

### Export Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **`format`{copy}** | String | `'pdf'` | One of `pdf`, `png`, `jpeg`, `webp`, `csv`, `json` |
| **`target`{copy}** | String / Element | `<body>` | CSS selector or element to save. Visual formats only. |
| **`source`{copy}** | String | — | Name of a `$x` data source to export. `csv` / `json` only. |
| **`data`{copy}** | Array / Object | — | Inline data to export instead of a `$x` source. `csv` / `json` only. |
| **`filename`{copy}** | String | `export-<timestamp>.<ext>` | Suggested download name. Falls back to a `download` attribute on links, then a `data-filename` attribute, then a timestamped default. |
| **`resolution`{copy}** | Number | screen density | Sharpness multiplier for saved images. The default matches the visitor's screen — `1` on standard monitors, `2` on retina — so the file looks like what they see. Set it explicitly (e.g. `2` or `3`) for the same sharpness on any hardware. |
| **`width`{copy}** | Number | natural width | Output width in pixels for saved images. Overrides the element's natural width. |
| **`height`{copy}** | Number | natural height | Output height in pixels for saved images. Overrides the element's natural height. |
| **`quality`{copy}** | Number (0–1) | `0.95` | JPEG / WebP compression quality |
| **`backgroundColor`{copy}** | String | page background | Solid background for saved images (PNG, JPEG, WebP). Defaults to the page's own background. Pass `'transparent'` for no fill (useful for icon / logo exports). PDFs use the page's CSS directly and ignore this option. |
| **`pageSize`{copy}** | String | `'a4'` | PDF page size — `a4`, `a3`, `letter`, `legal`, etc. Visitors can still change it in the browser's print dialog. |
| **`trigger`{copy}** | String | `'click'` | `'click'` (default) or `'url'`. With `'url'` the export runs on page load if the URL carries the export parameter. |
| **`urlParam`{copy}** | String | `'export'` | Name of the URL parameter to watch when `trigger: 'url'` |
| **`delay`{copy}** | Number | `0` | Milliseconds to wait after a `url` trigger before saving. Useful when charts or animations need a moment to settle. |

::: brand icon="lucide:info"
**Images from other sites**: saving a section that contains images hosted on another domain needs those images served with permissive CORS headers (`Access-Control-Allow-Origin: *`), or they'll come out blank. Images hosted with the site itself work without any configuration.
:::

---

### Batch and CI Exports

The `mnfst-export` command-line tool runs the same exports with nobody clicking — the right tool for build pipelines, scheduled jobs, and bulk runs. It supports the same six formats, plus an `rss` format for blog feeds.

```bash copy
# Snapshot a single route as PDF
npx mnfst-export --pdf --path /reports/q3 --target "#report"

# Whole project at once (reads manifest.export.routes from manifest.json)
npx mnfst-export

# Data source as CSV
npx mnfst-export --csv --path /admin/customers --source customers
```

Routes can be listed in `manifest.json` so the same `npx mnfst-export`{copy} runs anywhere.

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
| **`routes`{copy}** | `object[]` | `[]` | Per-route export entries. Each takes the same fields as the directive's options (`path`, `format`, `target`, `source`, `filename`, `pageSize`, etc.) |
| **`rss`{copy}** | `object` | inherited | Channel defaults: `{ title, link, description }`. Falls back to `manifest.name`, `manifest.live_url`, and `manifest.description`. |

The tool starts a temporary local server, opens each page in an invisible browser, waits for the page to finish rendering (the `manifest:render-ready` signal), then saves whatever that page exposes. PDFs and images use the browser engine's own capture, which is more reliable there than the in-page libraries.

Run `npx mnfst-export --help`{copy} for the full list of flags. Puppeteer (the invisible browser) is required — install it once in the project.

```bash copy
npm i -D puppeteer
```

---

## Import

The `x-import` directive and `$import` magic bring files back in. The visitor picks a **JSON** or **CSV** file, the plugin reads it right there in the browser (the file never leaves their device), and the content arrives as an event, a promise, or straight into an `$x` data source. Restoring an exported backup, loading a saved document, or accepting user-made content packs is one attribute.

With no options the picker accepts JSON or CSV and tells them apart by the file's extension; a modifier pins one format.

```html copy
<button x-import>Open file</button>
<button x-import.json>Open JSON</button>
<button x-import.csv>Open CSV</button>
```

The result arrives as a `manifest:import` event on the trigger element, so it can be handled right where the button is. The event's `detail` carries `data` (the parsed content), `format`, `source` (when one was targeted), and `file` (`name`, `size`, `type`). A file that can't be read fires `manifest:import-error` instead, with `format` and `error`.

Here's the whole loop in one place — download the table below as a CSV, open it in any spreadsheet app and change a name or a number, then import the same file back. The table shows whatever the file says.

<div x-code-group>

```html copy
<div x-data="{ team: [
    { name: 'June',  role: 'Design',      hours: 12 },
    { name: 'Marco', role: 'Engineering', hours: 9 },
    { name: 'Priya', role: 'Research',    hours: 14 }
] }">
    <table>
        <thead><tr><th>Name</th><th>Role</th><th>Hours</th></tr></thead>
        <tbody>
            <template x-for="(m, i) in team" :key="i">
                <tr>
                    <td x-text="m.name"></td>
                    <td x-text="m.role"></td>
                    <td x-text="m.hours"></td>
                </tr>
            </template>
        </tbody>
    </table>
    <button x-export="{ format: 'csv', data: team, filename: 'team.csv' }">Download CSV</button>
    <button x-import.csv @manifest:import="team = $event.detail.data">Import it back</button>
</div>
```

::: frame col gap-4 p-10
<div x-data="{ team: [
    { name: 'June',  role: 'Design',      hours: 12 },
    { name: 'Marco', role: 'Engineering', hours: 9 },
    { name: 'Priya', role: 'Research',    hours: 14 }
] }" class="col gap-3 w-full">
    <table class="w-full text-sm">
        <thead><tr class="text-muted text-left"><th>Name</th><th>Role</th><th>Hours</th></tr></thead>
        <tbody>
            <template x-for="(m, i) in team" :key="i">
                <tr class="border-t border-line">
                    <td x-text="m.name"></td>
                    <td x-text="m.role"></td>
                    <td x-text="m.hours"></td>
                </tr>
            </template>
        </tbody>
    </table>
    <div class="row gap-2">
        <button x-export="{ format: 'csv', data: team, filename: 'team.csv' }">Download CSV</button>
        <button x-import.csv @manifest:import="team = $event.detail.data" class="outlined">Import it back</button>
    </div>
</div>
:::

</div>

### Replacing a Data Source

Pass a `source` to pour the file's content into a `$x` data source, replacing what's there. Anything on the page bound to that source updates on its own. A bare string value is shorthand for the same thing.

```html copy
<button x-import="{ source: 'products' }">Load products</button>
<button x-import="'products'">Load products</button>
```

Together with export, backup and restore is a few lines — no server, no account:

```html copy
<button x-export="{ format: 'json', source: 'saves', filename: 'backup.json' }">Back up</button>
<button x-import="{ format: 'json', source: 'saves' }">Restore</button>
```

### Import Magic

`$import(opts)` opens the picker from inside an expression and hands back the parsed data — or `null` when the visitor closes the dialog without choosing. Same options as the directive.

```html copy
<button @click="save = await $import({ format: 'json' })">Load save</button>
```

### CSV Parsing

A CSV file comes back as a list of objects, one per row, named by the header row. Quotes, and commas or line breaks inside values, follow the standard CSV rules, and the separator — comma, semicolon, or tab — is detected automatically from the first line. Values arrive typed: numbers become numbers, `true`/`false`/`null` become real values, cells that look like JSON (`{…}` or `[…]`) are parsed, and everything else stays text. A file produced by the CSV export imports back exactly.

### Import Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **`format`{copy}** | String | inferred | `'json'` or `'csv'`. Left out, it's inferred from the file extension, defaulting to JSON. |
| **`source`{copy}** | String | — | `$x` data source to replace with the file's content. |
| **`accept`{copy}** | String | by format | Override which file types the picker dialog offers. |
