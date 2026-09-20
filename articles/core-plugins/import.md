# Import

Pick a local file and parse it back into data.

---

## Overview

The `x-import` directive turns its host element into a file-open action — the mirror of [Export](/docs/core-plugins/export). The visitor picks a **JSON** or **CSV** file, the plugin parses it, and the result is delivered as an event, a promise, or straight into an `$x` data source. Restoring an exported backup, loading a saved document, or accepting user-made content packs is one attribute.

Files never leave the browser: parsing is entirely client-side, and nothing is uploaded anywhere unless your own code sends it on.

---

## Setup

Import is included in `manifest.js` with all core plugins, or can be selectively loaded.

<div x-code-group copy>

```html "All Plugins (default)"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Selective"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="import"></script>
```

</div>

---

## Triggers

Add `x-import` to any clickable element. With no options it accepts JSON or CSV and infers the format from the picked file's extension. A modifier pins the format.

```html copy
<button x-import>Open file</button>
<button x-import.json>Open JSON</button>
<button x-import.csv>Open CSV</button>
```

The parsed result arrives as a `manifest:import` event that bubbles from the trigger, so it can be handled right on the element:

```html copy
<button x-import.json @manifest:import="restore($event.detail.data)">
    Restore backup
</button>
```

The event detail carries `data` (the parsed value), `format`, `source` (when one was targeted), and `file` (`name`, `size`, `type`). A file that fails to parse fires `manifest:import-error` instead, with `format` and `error`.

### Replacing a data source

Pass a `source` to write the parsed content into a `$x` data source, replacing what's there. Anything bound to that source updates reactively.

```html copy
<button x-import="{ source: 'products' }">Load products</button>
```

A bare string value is shorthand for the same thing:

```html copy
<button x-import="'products'">Load products</button>
```

### Options

For full control, pass an object expression:

```html copy
<button x-import="{ format: 'csv', source: 'rows', accept: '.csv' }">Load rows</button>
```

| Option | Effect |
|---|---|
| `format` | `'json'` or `'csv'`. Omitted: inferred from the file extension, defaulting to JSON. |
| `source` | `$x` data source to replace with the parsed content. |
| `accept` | Override the file dialog's accept list. |

---

## $import Magic

`$import(opts)` opens the picker programmatically and resolves the parsed data — `null` when the dialog is dismissed. Same options as the directive.

```html copy
<button @click="save = await $import({ format: 'json' })">Load save</button>
```

---

## CSV Parsing

CSV comes back as an array of objects keyed by the header row. Quoted fields, embedded delimiters and newlines follow the usual CSV rules, and the delimiter (comma, semicolon, or tab) is detected from the header line. Cell values are typed: numbers, `true`/`false`/`null`, and JSON-looking cells (`{…}` or `[…]`) parse to real values; everything else stays a string. A file produced by `x-export`'s CSV serializer round-trips.

---

## Pairing with Export

Together the two plugins make client-side backup and restore a few lines:

```html copy
<button x-export="{ format: 'json', source: 'saves', filename: 'backup.json' }">Back up</button>
<button x-import="{ format: 'json', source: 'saves' }">Restore</button>
```
