# Reference

Manifest's CLI commands, directives, magic properties, data-source operators, and state-management patterns.

---

## CLI Commands

| Command | Purpose | Reference |
|---------|---------|-----------|
| `npx mnfst-starter <name>`{copy} | Scaffold a new Manifest project | [Starter Project](/docs/getting-started/starter-project) |
| `npx mnfst-run`{copy} | Zero-dep dev server with live reload | [Setup](/docs/getting-started/setup#run-a-project) |
| `npx mnfst-render`{copy} | Prerender the SPA into a static MPA | [Websites](/docs/publishing/websites) |
| `npx mnfst-export`{copy} | Batch / CI exports — PDF, image, CSV, JSON, RSS | [Export](/docs/core-plugins/export#batch-and-ci-exports) |
| `npx mnfst-types`{copy} | Generate TypeScript ambient types from `manifest.json` | [TypeScript](/docs/resources/typescript) |
| `npx mnfst-test`{copy} | Project linter + component-test harness | [Testing](/docs/publishing/testing) |

Common conventions:

| Convention | Description |
|---|---|
| `<path>` (positional) | First non-flag arg is the project root, relative or absolute |
| `--manifest <path>` | Override `manifest.json` location |
| `--json` | Machine-readable output (where applicable) |
| `-h`, `--help` | Show usage |

---

## Data-* Attributes

### Plugin Loading

The `manifest.js` script tag accepts `data-*` attributes to control plugin loading:

| Attribute | Default | Description |
|---|---|---|
| `data-plugins`{copy} | (auto) | Comma-separated list of plugins to load |
| `data-omit`{copy} | — | Comma-separated list to exclude from auto-loaded set |
| `data-version`{copy} | `latest` | Plugin version to fetch from CDN |
| `data-alpine`{copy} | `3` | Alpine version, or a full URL |
| `data-tailwind`{copy} | (off) | Boolean — load Manifest's Tailwind v4 build |
| `data-plugin-base`{copy} | CDN | Base URL/path for plugin scripts (for self-hosted deployments) |
| `data-defer`{copy} | (on) | `off` turns off automatic deferral of closed containers — see [performance](/docs/getting-started/performance#x-defer-reference) |
| `data-defer-routes`{copy} | (off) | Boolean — experimental; defer inactive `x-route` pages until first shown |

---

### Routing & View Transitions

Attributes for managing crossfades between routes:

| Attribute | On | Description |
|---|---|---|
| `data-no-prefetch`{copy} | `<a>` element | Opt this link out of hover-based component prefetching |
| `data-view-transitions`{copy} | `<html>` | Force-on SPA view transitions, regardless of page size |
| `data-no-view-transitions`{copy} | `<html>` | Force-off SPA view transitions |
| `data-no-view-transition`{copy} | any element | Exclude this element from SPA/MPA view transition snapshots (sets `view-transition-name: none`) |

---

### Rendering

The `npx mnfst-render` command compiles MPA websites optimized for SEO/AEO, and scans for these attributes:

| Attribute | On | Description |
|---|---|---|
| `data-hydrate`{copy} | any element | Preserve dynamic functionality so Alpine can re-initialize the subtree at runtime |
| `data-static`{copy} | any element | Bakes the subtree to its rendered output, which Alpine ignores at runtime |

---

## Directives

Directives are custom HTML attributes from Alpine that provide reactive functionality. Manifest extends these to cover a wide variety of application use cases.

### Alpine

See <a href="https://alpinejs.dev/start-here" target="_blank">alpinejs.dev</a> for details.

| Directive | Description |
|---|---|
| `x-data` | Initialize a component scope with a JS object literal or factory call |
| `x-init` | Run a statement once when the element initializes |
| `x-show` | Toggle `display` based on a boolean expression |
| `x-if` | Render a `<template>` based on a boolean expression |
| `x-for` | Loop a `<template>` over an iterable. Syntax: `item in items` |
| `x-text` | Set the element's text content from an expression |
| `x-html` | Set the element's `innerHTML` from an expression (use carefully) |
| `x-model` | Two-way bind a form input to state |
| `x-bind:<attr>` (`:<attr>`) | Bind any attribute to an expression |
| `x-on:<event>` (`@<event>`) | Listen for an event and run a statement |
| `x-effect` | Re-run a statement whenever its reactive dependencies change |
| `x-cloak` | Hide an element until Alpine has initialized |
| `x-ignore` | Skip Alpine processing inside this element |
| `x-ref` | Name an element for `$refs.<name>` access |
| `x-transition` | Apply CSS classes during enter/leave |
| `x-teleport` | Move the rendered element to another DOM location |
| `x-id` | Generate stable IDs for a11y (paired with `$id`) |
| `x-modelable` | Expose an Alpine state value via `x-model` from outside |

---

### Manifest

| Directive | Plugin | Description |
|---|---|---|
| `x-anchors`{copy} | [router](/docs/core-plugins/router) | Anchor links list |
| `x-chart`{copy} | [charts](/docs/elements/charts) | SVG chart from a config object or `<data>` series |
| `x-code`{copy}, `<div x-code-group>` | [code](/docs/elements/code) | Code blocks with syntax highlights |
| `x-colorpicker`{copy} | [color pickers](/docs/elements/color-pickers) | Colorpicker menu element |
| `x-color`{copy} | [color modes](/docs/styles/color-modes) | Switches color mode on click |
| `x-date`{copy} | [date pickers](/docs/elements/date-pickers) | Date, range, and time picker field or calendar |
| `x-defer`{copy} | [defer](/docs/getting-started/performance#x-defer-reference) | Defer a container's contents until it is shown. Modifiers: `.lazy`, `.discard`, `.priority="n"`, `.off` |
| `x-dropdown`{copy} | [dropdowns](/docs/elements/dropdowns) | Dropdown menu element |
| `x-export`{copy} | [export](/docs/core-plugins/export) | Download page / region / data source as PDF, image, CSV, or JSON |
| `x-files`, `x-data-files`, `x-files-field` | [local data](/docs/core-plugins/local-data) | Bind file uploads |
| `x-icon`{copy} | [icons](/docs/elements/icons) | Render an icon by name |
| `x-markdown`{copy} | [markdown](/docs/core-plugins/markdown) | Render markdown content from a source |
| `x-resize`{copy} | [resize](/docs/core-plugins/resize) | Makes an element resizable |
| `x-route`{copy} | [router](/docs/core-plugins/router) | Applies element to specific routes |
| `x-svg`{copy} | [svgs](/docs/elements/svgs) | Inlines an SVG file |
| `x-tab`{copy}, `x-tabpanel`{copy} | [tabs](/docs/elements/tabs) | Tab elements |
| `x-toast`{copy} | [toasts](/docs/elements/toasts) | Dispatches toast popover |
| `x-tooltip`{copy} | [tooltips](/docs/elements/tooltips) | Applies tooltip to element |
| `x-virtual`{copy} | [virtual](/docs/core-plugins/virtual) | Render only visible rows of a long list (wraps an `x-for` template) |

#### Route Patterns

Values for `x-route` are:

| Pattern | Matches |
|---|---|
| `=path` | Exact match only |
| `path` | Prefix match (also matches sub-paths) |
| `path/*` | Wildcard (catches `/path/anything`) |
| `path1, path2` | Multi (any of the listed) |
| `!path` | Negation (matches anything except path) |
| `!*` | Catch-all (404) — matches when no other route did |

---

## Magic Properties

Available inside Alpine expressions (`x-data`, `x-text`, `@click`, etc.).

### Alpine

| Magic | Description |
|---|---|
| `$el` | The current element |
| `$refs` | Map of `x-ref` named elements |
| `$store` | Access an Alpine store |
| `$watch` | Subscribe to changes on a property |
| `$dispatch` | Dispatch a custom DOM event |
| `$nextTick` | Run a callback after Alpine flushes pending updates |
| `$root` | The closest ancestor with `x-data` |
| `$id` | Generate a stable ID (paired with `x-id`) |
| `$data` | Reach across `x-data` boundaries to access data |

---

### Manifest

| Magic | Plugin | Description |
|---|---|---|
| `$auth`{copy} | appwrite-auth | Current user, login methods, team management |
| `$chart(id)`{copy} | charts | Read a chart's type/series, `update(cfg)`, `redraw()` |
| `$chat`{copy} | chat | Open conversations: `$chat.open(id, { adapter })` returns a reactive handle with `messages`, `send()`, and more |
| `$colorpicker`{copy} | colorpicker | Open and configure a color picker UI |
| `$color`{copy} | color modes | Read/write the current color mode. `$color.current` returns `'light'`, `'dark'`, or `'system'`; assign to switch |
| `$computed(fn)`{copy} | computed | Derived value recalculated only when its dependencies change; read as a plain property. Also `window.$computed` in `Alpine.data` factories |
| `$date(id)`{copy} | datepicker | Read or set a picker's value, time, range, and open state |
| `$locale`{copy} | localization | Current locale, available locales, `set(code)` |
| `$route`{copy} | router | Reactive string of the current logical route (e.g. `$route === '/'`); not a function |
| `$status`{copy} | status | Health of named services (e.g. `$status.api.state`, `$status.overall`) |
| `$toast`{copy} | toasts | Show a toast |
| `$try(fn, errorVar?)`{copy} | data | `await` an async callback; on error returns `undefined` instead of throwing. If `errorVar` names a property on the current `x-data` scope, the error message is written there on failure and cleared to `null` on success |
| `$url`{copy} | url-parameters | Read/write URL query parameters reactively |
| `$x`{copy} | data | Project data sources by name (e.g. `$x.products`) |

---

## Data Source Operators

Each `$x.<source>` returns an object or array. Standard JS array methods apply when the source is an array. Manifest also exposes:

### State

| Property | Type | Description |
|---|---|---|
| `$loading`{copy} | boolean | True during fetch / mutation |
| `$error`{copy} | `Error \| string \| null` | Last error, or null |
| `$ready`{copy} | boolean | True after initial load completes |
| `$stale`{copy} | boolean | True while cached rows show and fresh data is still loading |
| `$fresh`{copy} | `Promise` | Resolves once fresh data has landed |

---

### Filtering

| Method | Description |
|---|---|
| `$search(term, ...fields)`{copy} | Substring match across the listed fields |
| `$search(term, { field: weight })`{copy} | Ranked search — every term must match; higher-weight fields rank first |
| `$x.$register(name, data)`{copy} | Install or replace a runtime data source (array or object) |
| `$query([...exprs])`{copy} | Filter using query expressions. Local sources: synchronous filter. Appwrite sources: server-side, returns `Promise` |
| `$route(path?)`{copy} | Look up a single row whose `id` matches the current route param |

---

### Mutations

Available on cloud data sources (Appwrite tables) and bucket sources where applicable.

| Method | Description |
|---|---|
| `$create(data, rowId?)`{copy} | Create a new entry. For buckets: `$create(file, fileId?, permissions?, onProgress?)` uploads a file. Returns the created entry / file |
| `$update(idOrArray, data)`{copy} | Update one or many entries by id. Returns the updated entry / entries |
| `$delete(idOrArray)`{copy} | Delete one or many entries by id. Returns the deleted entry / entries |
| `$duplicate(id, options?)`{copy} | Copy an entry / file. Table options: `newRowId`, `files` (`'duplicate'` \| `'same'` \| `'none'`), plus field overrides. Bucket options: `newName`, `newFileId` |

---

### Pagination

Available on cloud data sources.

| Method | Description |
|---|---|
| `$firstPage(limit)`{copy} | Cursor-based first page. Returns `{ items, cursor, total, hasMore }` |
| `$nextPage(cursor, limit)`{copy} | Cursor-based next page. Same shape as `$firstPage` |
| `$page(pageNumber, limit)`{copy} | Offset-based specific page. Returns `{ items, page, total, totalPages, hasMore }` |

---

### Files

Available on bucket (storage) sources.

| Method | Description |
|---|---|
| `$url(fileId, token?)`{copy} | View URL for a file |
| `$download(fileId, token?)`{copy} | Download URL for a file |
| `$preview(fileId, options?, token?)`{copy} | Preview URL with image transforms (images only) |
| `$openUrl(fileId, token?)`{copy} | Open the view URL in a new tab |
| `$openDownload(fileId, filename?, token?)`{copy} | Open the download URL in a new tab |
| `$openPreview(fileId, options?, token?)`{copy} | Open the preview URL in a new tab |

`$preview` options include `width`, `height`, `quality`, `output`, `gravity`, `borderWidth`, `borderColor`, `borderRadius`, `opacity`, `rotation`, and `background`.

---

### Row Properties

Manifest-added properties exposed on every row returned by `$x.<source>`. Coexist with the source's own column values.

| Property | Type | On | Description |
|---|---|---|---|
| `$id`{copy} | string | any | Unique identifier (Appwrite system field) |
| `$createdAt`{copy} | string | any | Creation timestamp, ISO format |
| `$updatedAt`{copy} | string | any | Last update timestamp, ISO format |
| `$files`{copy} | array | table rows | Files linked to the entry when storage is configured |
| `$formattedSize`{copy} | string | file rows | Human-readable file size (e.g. `"2.5 MB"`) |
| `$url`{copy} | string | file rows | View URL for the file |
| `$isImage`{copy} | boolean | file rows | `true` if the file is an image |
| `$thumbnailUrl`{copy} | string | file rows | Thumbnail URL (images only) |

---

### Queries

`$query` accepts an array of `[method, attribute, value]` query expressions. The same syntax works for local and cloud sources — local runs synchronously in the browser, cloud runs server-side and returns a `Promise`.

| Method | Form | Notes |
|---|---|---|
| `equal` | `['equal', 'attr', value]` | Exact match |
| `notEqual` | `['notEqual', 'attr', value]` | Inverse of equal |
| `greaterThan` | `['greaterThan', 'attr', value]` | `>` |
| `greaterThanOrEqual` | `['greaterThanOrEqual', 'attr', value]` | `≥` |
| `lessThan` | `['lessThan', 'attr', value]` | `<` |
| `lessThanOrEqual` | `['lessThanOrEqual', 'attr', value]` | `≤` |
| `between` | `['between', 'attr', min, max]` | Inclusive range |
| `isNull` | `['isNull', 'attr']` | Null check |
| `isNotNull` | `['isNotNull', 'attr']` | Non-null check |
| `contains` | `['contains', 'attr', 'value']` | Substring match (case-insensitive) |
| `startsWith` | `['startsWith', 'attr', 'value']` | Prefix match |
| `endsWith` | `['endsWith', 'attr', 'value']` | Suffix match |
| `search` | `['search', 'attr', 'value']` | Full-text search (cloud sources require a fulltext index) |
| `orderAsc` | `['orderAsc', 'attr']` | Sort ascending |
| `orderDesc` | `['orderDesc', 'attr']` | Sort descending |
| `orderRandom` | `['orderRandom']` | Random order |
| `limit` | `['limit', n]` | Cap result count |
| `offset` | `['offset', n]` | Skip results |

---

## State Management

Manifest projects have three options to manage state, distinguished by lifetime and audience.

| Layer | Tool | Use for |
|---|---|---|
| Component-local | `x-data` | UI toggles, form inputs, ephemeral interaction state |
| Cross-component (global) | `Alpine.store(name, ...)` | Shopping cart, state shared across views |
| Server / persistent | `$x.<source>` | Anything backed by a file, HTTP endpoint, or cloud database collection |

### Component-Local

Inline state per component. Resets when the element is destroyed. Most common.

```html copy
<div x-data="{ open: false }">
    <button @click="open = !open">Toggle</button>
    <p x-show="open">Hello</p>
</div>
```

For non-trivial logic, extract to an `Alpine.data()` factory (still local, but easier to test):

```html copy
<script>
document.addEventListener('alpine:init', () => {
    Alpine.data('cart', () => ({
        items: [],
        add(p) { this.items.push(p); },
        get total() { return this.items.reduce((s, i) => s + i.price, 0); }
    }));
});
</script>

<div x-data="cart()">
    <button @click="add({ id: 1, price: 10 })">Add</button>
    <span x-text="total"></span>
</div>
```

---

### Global (Alpine Stores)

Shared across all components. Define once, read anywhere via `$store.name`.

```html copy
<script>
document.addEventListener('alpine:init', () => {
    Alpine.store('cart', {
        items: [],
        add(p) { this.items.push(p); },
        get total() { return this.items.reduce((s, i) => s + i.price, 0); }
    });
});
</script>

<button @click="$store.cart.add({ id: 1, price: 10 })">Add</button>
<span x-text="$store.cart.total"></span>
```

Stores live for the page's lifetime. They reset on full reload — no built-in persistence; pair with `localStorage` or Alpine's `persist` plugin if you need it.

---

### Server / Persistent

Use `$x.<source>` for anything that lives in a file or backend. The data layer handles loading state, querying, and (for Appwrite) mutations.

```html copy
<div x-data>
    <template x-for="p in $x.products.$query([Manifest.query.greaterThan('stock', 0)])">
        <div x-text="p.name"></div>
    </template>
</div>
```

---

### Derived State

Three options, in increasing decoupling:

| Pattern | When |
|---|---|
| Inline expression | `<span x-text="count * 2">` — re-evaluates automatically. Best for trivial cases. |
| Computed getter | `get doubled() { return this.count * 2 }` on `x-data` or store. Best for component- or store-level computeds. |
| `$watch('prop', cb)` | Side-effects on change (e.g. write to localStorage, call API). |
| `$computed(fn)` | Data-sized work (filtered or sorted lists, totals) recalculated only when its inputs change. See [computed values](/docs/core-plugins/computed). |

```html copy
<div x-data="{ count: 0 }"
     x-init="$watch('count', v => localStorage.setItem('count', v))">
    <button @click="count++" x-text="count"></button>
    <span x-text="count * 2"></span>
</div>
```

Avoid `x-effect` unless you need imperative side-effects with reactive deps that can't be expressed inline.

---

### Cross-Component Communication

| Pattern | Description |
|---|---|
| Shared `x-data` on a common parent | Children read/write parent state directly. Tight coupling. |
| `Alpine.store('name', ...)` | All components access the same store. Loose coupling. |
| `$dispatch('event-name', detail)` + `@event-name.window` | Pub/sub across the DOM. Loosest coupling. |

---

## CSS Variables

Theme tokens live in `manifest.theme.css` and can be customized per project. Common families:

| Variable family | Purpose |
|---|---|
| `--color-*` | Theme colors (background, content, brand, accent variants — light/dark) |
| `--font-*` | Font families |
| `--radius-*` | Border radii |
| `--shadow-*` | Box shadows |
| `--spacing`{copy} | Base spacing unit |
| `--transition`{copy} | Default transition timing |
| `--view-transition-*` | View transition tuning for SPA and MPA crossfades |

See [page transitions](/docs/publishing/websites#page-transitions) for the SPA on/off mechanism (`<html data-view-transitions>` / `<html data-no-view-transitions>`).

---

## Manifest Events

Custom events dispatched on `window` that any component can subscribe to via `@event-name.window`.

| Event | When fired | `event.detail` |
|---|---|---|
| `manifest:route-change`{copy} | After SPA route change (and inside the view transition when active) | `{ from, to, normalizedPath }` |
| `manifest:components-processed`{copy} | After components and templates have been registered | — |
| `manifest:render-ready`{copy} | Signal from the data plugin that prerender can snapshot the page | — |
| `manifest:dev-reload`{copy} | Dev-server hot-update of CSV / JSON / YAML data | `{ source, path }` |
| `manifest:defer-render`{copy} | On a deferred container (not `window`), after its contents initialise | — |
| `alpine:init` | Alpine initialization (standard Alpine event) | — |

Listen example:

```html copy
<div x-data @manifest:route-change.window="console.log('route:', $event.detail.to)"></div>
```

---

## Globals

Window-level objects for diagnostics and configuration. See [performance](/docs/getting-started/performance#x-defer-reference).

| Global | Description |
|---|---|
| `ManifestDefer.stats()`{copy} | Deferral counters: `{ pending, warm, cap, ready, armed, head, routes: { enabled, stashed, rendered } }` |
| `ManifestDeferConfig.prewarmCap`{copy} | Maximum containers warming may prepare (default `48`) |
| `ManifestDeferConfig.routes`{copy} | Experimental — `true` defers inactive `x-route` pages, same as `data-defer-routes` |
