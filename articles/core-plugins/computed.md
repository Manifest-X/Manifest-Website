# Computed Values

Derived data that recalculates only when what it depends on changes.

---

## Overview

A computed value is built from other state — a filtered list, a sorted table, a total — and is recalculated only when something it reads changes, instead of on every render of every place that uses it. A getter that filters a thousand rows runs again each time any part of the component updates; a computed over the same rows runs once per change and hands the same result to everyone who reads it.

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

Declare a computed as a property of `x-data`, passing `$computed` a function that returns the value. Read it like any other property.

<div x-code-group>

```html copy
<div x-data="{ q: '', hits: $computed(function () { return $x.people.filter(p => p.name.includes(this.q)) }) }">
    <input type="text" placeholder="Filter people..." x-model="q">
    <template x-for="person in hits" :key="person.id">
        <p x-text="person.name"></p>
    </template>
</div>
```

::: frame
<div x-data="{ q: '', hits: $computed(function () { return ($x.example.products || []).filter(p => p.name.toLowerCase().includes(this.q.toLowerCase())) }) }" class="col gap-3 w-full">
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

Type in the field: the list is recalculated when `q` changes and when the data source updates, and at no other time.

The same works in an `Alpine.data` factory, where `$computed` is available as a global:

```js copy
Alpine.data('inbox', () => ({
  rows: $computed(function () { return this.$x.chats.filter(c => c.open) }),
}))
```

---

## Rules

- Read it like a plain property: `hits`, not `hits()`.
- Use `function () {}` rather than an arrow function, so `this` is the component.
- Return a new array or object rather than mutating the previous result.
- The result keeps the same identity until a dependency changes, so `x-for` and `x-virtual` reuse rows instead of rebuilding them.
- A computed that throws keeps its last value and logs a warning.

Recalculation happens once per change, at property grain: changing a field on a row in place re-runs the computeds that read that field.

---

## When Not To Use It

Trivial expressions like `a + b` don't need a computed — a plain getter, or the expression written inline, is fine. Reach for `$computed` when the work grows with your data: filtering, sorting, grouping and totals.

See [performance](/docs/getting-started/performance) for where computed values fit alongside the rest of Manifest's rendering behaviour.
