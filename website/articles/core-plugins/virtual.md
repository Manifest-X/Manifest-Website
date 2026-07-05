# Virtual

Render long lists, tables, grids, and galleries efficiently with windowed scrolling.

---

## Overview

When a list, table, or gallery grows past a few hundred items, rendering them all up front becomes slow — with initial paint stalls, scrolling stutters, and climbing memory. The Virtual plugin solves this by only mounting the items currently visible in the scroll viewport, plus a small overscan buffer for smooth scrolling. A collection of ten thousand items can keep just twenty or so in the DOM at any time while the user scrolls through smoothly.

Items render with the layout you already use — a stacked list, a native `<table>`, a CSS grid, a flex-wrap gallery, or a masonry wall — so virtualizing doesn't change your markup or break column alignment, sticky headers, or shared cell styling.

Each item is measured as it renders, so tall items (multi-line text, embedded media, expanded details) coexist with short ones without configuration. There's no fixed-size requirement.

Virtualization is a *rendering* optimization, not a data-fetching one. The full data array stays in memory, and only its DOM representation is windowed. For server-side pagination see [databases](/docs/appwrite-plugins/databases#pagination-methods).

::: brand icon="lucide:info"
**SEO & AEO** (Answer Engine Optimization): virtualized content is rendered client-side at scroll time, so it isn't visible to search engines or AI crawlers by default. Virtualization is best applied to interactive data like dashboard content, where discoverability isn't the goal.
:::

---

## Setup

Virtual is included in `manifest.js` with all core plugins, or can be selectively loaded.

<div x-code-group copy>

```html "All Plugins (default)"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Selective"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="virtual"></script>
```

</div>

---

## Basic Usage

Wrap an `x-for` template in a scrolling container marked with `x-virtual`. The container needs a bounded height like a pixel value, percentage, viewport unit, or flex layout in order to support a scroll viewport.

<div x-code-group>

```html copy
<div x-data="{ team: /* 500 entries */ }">
    <div x-virtual class="h-[300px] overflow-auto">
        <template x-for="member in team" :key="member.id">
            <div>
                <p x-text="member.name"></p>
                <small x-text="member.role"></small>
            </div>
        </template>
    </div>
</div>
```

::: frame
<div x-data="{ team: Array.from({length: 500}, (_, i) => ({ id: i, name: ['Sirius','Vega','Polaris','Betelgeuse','Rigel','Arcturus'][i % 6] + ' ' + (i + 1), role: ['Senior Engineer','Product Manager','Designer','Researcher','QA Lead','Tech Writer'][i % 6] })) }" class="w-full">
    <div x-virtual class="border border-line rounded h-[300px] overflow-auto">
        <template x-for="member in team" :key="member.id">
            <div class="p-3 border-b border-line">
                <p class="font-semibold" x-text="member.name"></p>
                <small class="text-muted" x-text="member.role"></small>
            </div>
        </template>
    </div>
</div>
:::

</div>

Five hundred items are in the array, but only the visible window is rendered as you scroll. The plugin sets `overflow: auto` on the container automatically if it isn't already scrollable.

A single `<template>` child is supported per `x-virtual` container, and the template's `x-for` and `:key` are consumed by the plugin (Alpine doesn't double-render them). The template may be nested — for example inside `<table><tbody>` — and the plugin will still find it.

---

## Layout

The same `x-virtual` adapts to whatever markup fits your data — a native [table](/docs/elements/tables), a CSS grid, a wrapping gallery, or a masonry wall. The plugin detects the layout automatically; masonry is the one mode you set explicitly.

### Table

Put `x-virtual` on the scroll container and let the `x-for` template live inside `<tbody>`. Columns align across rows and `<thead>` can be sticky, exactly as in a normal [table](/docs/elements/tables).

<div x-code-group>

```html copy
<div x-virtual class="h-[300px] overflow-auto">
    <table class="table-fixed w-full">
        <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th></tr>
        </thead>
        <tbody>
            <template x-for="user in $x.users" :key="user.id">
                <tr :class="user.id % 2 ? 'bg-surface-1' : ''">
                    <td x-text="user.name"></td>
                    <td x-text="user.email"></td>
                    <td x-text="user.role"></td>
                </tr>
            </template>
        </tbody>
    </table>
</div>
```

::: frame
<div x-data="{ users: Array.from({length: 1000}, (_, i) => ({ id: i, name: ['Sirius','Vega','Polaris','Rigel','Arcturus','Lyra'][i % 6] + ' ' + (i + 1), email: 'user' + (i + 1) + '@acme.io', role: ['Engineer','Designer','PM','Researcher','QA','Writer'][i % 6] })) }" class="w-full">
    <div x-virtual class="border border-line rounded h-[300px] overflow-auto">
        <table class="table-fixed w-full">
            <thead>
                <tr><th class="w-32">Name</th><th>Email</th><th class="w-28">Role</th></tr>
            </thead>
            <tbody>
                <template x-for="user in users" :key="user.id">
                    <tr :class="user.id % 2 ? 'bg-surface-1' : ''">
                        <td x-text="user.name"></td>
                        <td x-text="user.email"></td>
                        <td x-text="user.role"></td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</div>
:::

</div>

Stripe by a value from your data — here `user.id` — rather than `:nth-child`, which counts only the rows currently rendered and so flickers as you scroll. Give columns explicit widths (`table-fixed`) so they don't shift either.

---

### Grid

Manifest's [`.grid-table`](/docs/elements/tables) is a `display: grid` container with `display: contents` rows, so every cell shares one grid. Set the columns on the container and mark each row `.grid-row`.

<div x-code-group>

```html copy
<div x-virtual class="grid-table grid-cols-[8rem_1fr_7rem] h-[300px] overflow-auto">
    <div class="grid-header">
        <div>Name</div><div>Email</div><div>Role</div>
    </div>
    <template x-for="user in $x.users" :key="user.id">
        <div class="grid-row">
            <div x-text="user.name"></div>
            <div x-text="user.email"></div>
            <div x-text="user.role"></div>
        </div>
    </template>
</div>
```

::: frame
<div x-data="{ users: Array.from({length: 1000}, (_, i) => ({ id: i, name: ['Sirius','Vega','Polaris','Rigel','Arcturus','Lyra'][i % 6] + ' ' + (i + 1), email: 'user' + (i + 1) + '@acme.io', role: ['Engineer','Designer','PM','Researcher','QA','Writer'][i % 6] })) }" class="w-full">
    <div x-virtual class="grid-table border border-line rounded grid-cols-[8rem_1fr_7rem] h-[300px] overflow-auto">
        <div class="grid-header">
            <div>Name</div><div>Email</div><div>Role</div>
        </div>
        <template x-for="user in users" :key="user.id">
            <div class="grid-row">
                <div x-text="user.name"></div>
                <div x-text="user.email"></div>
                <div x-text="user.role"></div>
            </div>
        </template>
    </div>
</div>
:::

</div>

`.grid-table` is itself the grid, so you only set the columns. Keep those tracks content-independent (`px`, `%`, or `minmax(0, 1fr)`) so columns hold steady as the window changes.

---

### Gallery

A gallery packs many items per line. The plugin auto-detects a `flex-wrap` container; for a CSS grid, add `mode: 'gallery'` so it isn't read as a table. Either way only the visible items mount — ragged widths and heights are fine. Seed `estimate` with an approximate item size for a steadier first paint.

<div x-code-group>

```html copy
<div x-virtual="{ estimate: { width: 160, height: 120 } }"
     class="flex flex-wrap content-start gap-2 h-80 overflow-auto">
    <template x-for="tile in $x.tiles" :key="tile.id">
        <div class="center rounded text-white text-sm font-semibold"
             :style="`width: ${tile.w}px; height: ${tile.h}px; background: ${tile.color}`"
             x-text="'#' + tile.id"></div>
    </template>
</div>
```

::: frame
<div x-data="{ tiles: Array.from({length: 1000}, (_, i) => ({ id: i, w: 90 + ((i * 47) % 140), h: 70 + ((i * 71) % 120), color: `hsl(${(i * 53) % 360} 65% 58%)` })) }" class="w-full">
    <div x-virtual="{ estimate: { width: 160, height: 120 } }" class="border border-line rounded flex flex-wrap content-start gap-2 h-80 overflow-auto p-2">
        <template x-for="tile in tiles" :key="tile.id">
            <div class="center rounded text-white text-sm font-semibold" :style="`width: ${tile.w}px; height: ${tile.h}px; background: ${tile.color}`" x-text="'#' + tile.id"></div>
        </template>
    </div>
</div>
:::

</div>

For a CSS grid instead, set `mode: 'gallery'` so the columns come from `grid-template-columns`:

```html copy
<div x-virtual="{ mode: 'gallery', estimate: { height: 120 } }"
     class="grid grid-cols-4 gap-2 h-80 overflow-auto">
    <template x-for="tile in $x.tiles" :key="tile.id">
        <div class="center rounded text-white" :style="`height: 120px; background: ${tile.color}`"
             x-text="'#' + tile.id"></div>
    </template>
</div>
```

---

### Masonry

Masonry packs items of independent sizes into the shortest column — the layout where the occasional showcase item spans extra width or height. Set `mode: 'masonry'` and either a `columnWidth` or a fixed `columns` count.

<div x-code-group>

```html copy
<div x-virtual="{ mode: 'masonry', columnWidth: 220, gap: 12, span: block => block.span, height: block => block.height }"
     class="relative h-96 overflow-auto">
    <template x-for="block in $x.blocks" :key="block.id">
        <div class="center rounded text-white text-sm font-semibold"
             :style="`height: ${block.height}px; background: ${block.color}`"
             x-text="'#' + block.id"></div>
    </template>
</div>
```

::: frame
<div x-data="{ blocks: Array.from({length: 1000}, (_, i) => ({ id: i, span: i % 11 === 0 ? 2 : 1, height: 80 + ((i * 61) % 160) + (i % 23 === 0 ? 140 : 0), color: `hsl(${(i * 53) % 360} 65% 58%)` })) }" class="w-full">
    <div x-virtual="{ mode: 'masonry', columnWidth: 140, gap: 8, span: block => block.span, height: block => block.height }" class="border border-line rounded relative h-96 overflow-auto p-2">
        <template x-for="block in blocks" :key="block.id">
            <div class="center rounded text-white text-sm font-semibold" :style="`height: ${block.height}px; background: ${block.color}`" x-text="'#' + block.id"></div>
        </template>
    </div>
</div>
:::

</div>

Masonry positions items absolutely and sizes the container for you. Pass a `height` function (matching the item's own height) for the smoothest first paint, since the layout can then be computed before anything is measured.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **`columnWidth`** | Number | — | Target column width in px; the column count is derived from the container width. |
| **`columns`** | Number | — | A fixed number of columns. Use this *or* `columnWidth`. |
| **`gap`** | Number | CSS `gap` | Pixel gap between items. |
| **`span`** | Function | `() => 1` | Maps an item to how many columns it spans, for wide showcase items. |
| **`height`** | Function | — | Maps an item to its height in px. Supplying it skips measurement; otherwise heights are measured on first render. |

---

## Customization

Pass options as an object expression on the directive.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **`estimate`** | Number or `{ width, height }` | `50` | Initial size for unmeasured items. A closer estimate produces less scroll-position drift on first paint. Galleries and masonry accept an object to seed both axes. |
| **`overscan`** | Number | `3` | Items (or lines) to render above and below the visible window. Higher values smooth out fast scrolling at the cost of more DOM. |
| **`mode`** | String | auto | How items fill lines: `rows` (one per line — lists, tables, grids), `gallery` (many per line — flex-wrap or CSS grid), or `masonry`. Auto-detected from the container for all but `masonry`, which is always explicit. |

```html copy
<div x-virtual="{ estimate: 80, overscan: 5 }" class="h-[600px] overflow-auto">
    <template x-for="item in $x.products" :key="item.id">
        <div>...</div>
    </template>
</div>
```

Without these options the defaults will work for most uniform collections. Tune `estimate` higher when items are tall (cards, images), and raise `overscan` if you see brief blank flashes during fast wheel-scrolling.

---

## Mixed Sizes

Items with variable content like multi-line descriptions, embedded images, or expanded details work without any extra configuration. Each item is measured on first render and the scroll offsets adjust to its actual size. There is no fixed-size requirement.

<div x-code-group>

```html copy
<div x-virtual class="h-[600px] overflow-auto">
    <template x-for="log in $x.logs" :key="log.id">
        <div>
            <span x-text="log.time"></span>
            <span x-text="log.level"></span>
            <span x-text="log.message"></span>
        </div>
    </template>
</div>
```

::: frame
<div x-data="{ logs: Array.from({length: 1000}, (_, i) => ({
    id: i,
    time: new Date(Date.now() - (1000 - i) * 60000).toISOString().slice(11, 19),
    level: ['info','info','info','warn','error'][i % 5],
    message: i % 4 === 0
        ? 'Detail entry — this line includes additional context that wraps onto a second line so it ends up taller than its neighbours and demonstrates per-item height measurement.'
        : 'Standard log line.'
})) }" class="w-full">
    <div x-virtual class="border border-line rounded font-mono text-sm h-[300px] overflow-auto">
        <template x-for="log in logs" :key="log.id">
            <div class="row gap-3 p-2 border-b border-line">
                <span class="text-muted shrink-0" x-text="log.time"></span>
                <span class="shrink-0 uppercase text-xs font-bold" :class="log.level === 'error' ? 'text-error' : log.level === 'warn' ? 'text-warning' : 'text-muted'" x-text="log.level"></span>
                <span class="flex-1" x-text="log.message"></span>
            </div>
        </template>
    </div>
</div>
:::

</div>

In this example, short and tall log lines coexist correctly. The scroll position stays accurate, the scrollbar reflects real total height, and items snap to their measured offsets the first time each one becomes visible.

---

## Dynamic Data

Point the template's `x-for` at any reactive source — a [local](/docs/core-plugins/local-data) or [cloud](/docs/appwrite-plugins/cloud-data) data source through `$x`, or plain Alpine state — and the window stays in sync. Adds, deletes, sorts, and filters update the visible items automatically, and items re-bind by key, so reordering the data never scrambles their content.

That makes virtualization a natural pair with `$search` and `$query`: wire a search input to `$x.<source>.$search()` and the list re-renders against the filtered results without rebuilding the whole DOM.

<div x-code-group>

```html copy
<div x-data="{ term: '' }">
    <input type="text" placeholder="Filter products..." aria-label="Filter products" x-model="term">
    <div x-virtual class="h-[600px] overflow-auto">
        <template x-for="product in $x.products.$search(term, 'name')" :key="product.id">
            <div>
                <p x-text="product.name"></p>
                <small x-text="'$' + product.price"></small>
            </div>
        </template>
    </div>
</div>
```

::: frame
<div x-data="{
    term: '',
    products: Array.from({length: 2000}, (_, i) => ({
        id: i,
        name: ['Telescope','Star Chart','Sextant','Astrolabe','Chronometer','Spectrometer'][i % 6] + ' Mk-' + (i + 1),
        price: ((i * 13) % 500) + 10
    })),
    get filtered() {
        if (!this.term) return this.products;
        const t = this.term.toLowerCase();
        return this.products.filter(p => p.name.toLowerCase().includes(t));
    }
}" class="col gap-3 w-full">
    <input type="text" placeholder="Filter products..." aria-label="Filter products" x-model="term">
    <div x-virtual class="border border-line rounded h-[300px] overflow-auto">
        <template x-for="product in filtered" :key="product.id">
            <div class="row gap-4 p-3 border-b border-line">
                <p class="flex-1" x-text="product.name"></p>
                <small>$<span x-text="product.price"></span></small>
            </div>
        </template>
    </div>
    <small class="text-muted">Showing <span x-text="filtered.length"></span> of 2000</small>
</div>
:::

</div>
