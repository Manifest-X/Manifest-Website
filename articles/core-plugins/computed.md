# Computed Values

Named values built from other data, recalculated only when that data changes.

---

## Overview

A computed value is anything worked out from other state, such as a filtered list, a sorted table, or a total. It is recalculated once when something it reads changes, and every place that shows it gets the same result in between. Without it, a filter written straight into the page runs again every time anything in the component updates, which adds up over a large list.

Use it for filtered or sorted lists and anything built from a data source.

---

## Setup

Computed values are included in `manifest.js` with all core plugins, or can be selectively loaded.

<div x-code-group copy>

```html "All Plugins (default)"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Selective"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="computed"></script>
```

</div>

---

## Usage

Add `x-computed:name="expression"`{copy} to an element. The name becomes a value that everything inside the element can read, like any other property.

<div x-code-group>

```html copy
<div x-data="{ q: '' }" x-computed:hits="$x.people.filter(p => p.name.includes(q))">
    <input type="text" placeholder="Filter people..." x-model="q">
    <p x-text="hits.length + ' people'"></p>
</div>
```

::: frame
<div x-data="{ q: '' }" x-computed:hits="($x.example.products || []).filter(p => p.name.toLowerCase().includes(q.toLowerCase()))" class="col gap-3 w-full">
    <input type="text" placeholder="Filter products..." aria-label="Filter products" x-model="q">
    <div class="col">
        <template x-for="product in hits" :key="product.name">
            <div class="row gap-4 justify-between p-2 border-b border-line">
                <span x-text="product.name"></span>
                <small class="text-content-subtle" x-text="product.category"></small>
            </div>
        </template>
        <small x-show="!hits.length" class="text-content-subtle p-2">No matches</small>
    </div>
</div>
:::

</div>

Type in the field: `hits` is recalculated when `q` changes or the data source updates, and at no other time.

In JavaScript, `$computed` takes a function that receives the scope:

```js copy
Alpine.data('inbox', () => ({
    rows: $computed(s => s.$x.chats.filter(c => c.open)),
}))
```

---

## Rules

- Name it, then read it like a plain property: `hits`, not `hits()`.
- Return a new array or object rather than changing the previous result in place.
- Trivial expressions don't need it: `a + b` can stay inline.

The value keeps the same identity until something it reads changes, so `x-for` and `x-virtual` reuse their rows instead of rebuilding them. If the expression throws, the value keeps its last result.

---

## When Not To Use It

Simple expressions and plain getters are fine on their own. Reach for a computed value when the work grows with your data: filtering, sorting, grouping and totals.

Data operators are already cached. `$search`, `$query` and `$route` on a data source remember their result until that source changes, so a search bound in many places is computed once. Use `x-computed` for derivations you write yourself, such as a `filter` or `reduce` over the rows.

See [performance](/docs/getting-started/performance) for where computed values fit alongside the rest of Manifest's rendering behavior.
