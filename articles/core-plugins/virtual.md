# Virtual

Render long lists efficiently with windowed scrolling.

---

## Overview

When a list grows past a few hundred rows, rendering every row up front becomes slow with initial paint stalls, scrolling stutters, and climbing memory. The Virtual plugin solves this by only mounting the rows currently visible in the scroll viewport, plus a small overscan buffer for smooth scrolling. A list of ten thousand items can keep just twenty or so rows in the DOM at any time while the user scrolls through smoothly.

Each row is measured as it renders, so taller rows (multi-line text, embedded media, expanded details) coexist with shorter ones without configuration. There's no fixed row-height requirement.

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
    <div x-virtual style="height: 300px; overflow: auto">
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
    <div x-virtual class="border border-line rounded" style="height: 300px; overflow: auto">
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

Five hundred rows are in the array, but only the visible window is rendered as you scroll. The plugin sets `overflow: auto` and `position: relative` on the container automatically if they aren't already set.

A single `<template>` child is supported per `x-virtual` container, and the template's `x-for` and `:key` are consumed by the plugin (Alpine doesn't double-render them).

::: brand icon="lucide:info"
**Tables**: native `<table>` layouts rely on row heights propagating across cells for column alignment. Virtualized rows are absolutely positioned, which doesn't play well with table layout. For tabular data, build rows with CSS Grid or flexbox inside the virtual container so column widths stay predictable.
:::

---

## Customization

Pass options as an object expression on the directive.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **`estimate`** | Number | `50` | Initial per-row height in pixels, used for unmeasured rows. A closer estimate produces less scroll-position drift on first paint. |
| **`overscan`** | Number | `3` | Rows to render above and below the visible window. Higher values smooth out fast scrolling at the cost of more DOM. |

```html copy
<div x-virtual="{ estimate: 80, overscan: 5 }" style="height: 600px; overflow: auto">
    <template x-for="item in $x.products" :key="item.id">
        <div>...</div>
    </template>
</div>
```

Without these options the defaults will work for most uniform lists. Tune `estimate` higher when rows are tall (cards, images), and raise `overscan` if you see brief blank flashes during fast wheel-scrolling.

---

## With Data Sources

The plugin subscribes to the source expression through Alpine, so any reactive change to a [local](/docs/core-plugins/local-data) or [cloud](/docs/appwrite-plugins/cloud-data) data source (adds, deletes, sorts, filters) automatically updates the rendered window.

This makes virtualization a natural pair with `$search` and `$query`. Combine a search input with `$x.<source>.$search()` and the virtual list re-renders against the filtered results without rebuilding the whole DOM:

<div x-code-group>

```html copy
<div x-data="{ term: '' }">
    <input type="text" placeholder="Filter products..." aria-label="Filter products" x-model="term">
    <div x-virtual style="height: 600px; overflow: auto">
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
    <div x-virtual class="border border-line rounded" style="height: 300px; overflow: auto">
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

---

## Mixed-Height Rows

Rows with variable content like multi-line descriptions, embedded images, or expanded details will work without any extra configuration. Each row is measured on first render and the scroll offsets adjust to its actual height. There is no fixed-height requirement.

<div x-code-group>

```html copy
<div x-virtual style="height: 600px; overflow: auto">
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
        ? 'Detail entry — this row includes additional context that wraps onto a second line so it ends up taller than its neighbours and demonstrates per-row height measurement.'
        : 'Standard log line.'
})) }" class="w-full">
    <div x-virtual class="border border-line rounded font-mono text-sm" style="height: 300px; overflow: auto">
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

In this example, short and tall log lines coexist correctly. The scroll position stays accurate, the scrollbar reflects real total height, and rows snap to their measured offsets the first time each one becomes visible.
