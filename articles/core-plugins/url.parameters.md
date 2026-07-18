# URL Parameters

Display content with modified URL strings.

---

## Overview

URL parameters provide a reactive `$url` magic method for storing application state in the URL with common URL characters like `?` and `&`. This preserves user interactions like search queries, filters, and view preferences, and the generated URLs can be further shared or bookmarked.

Parameters are fully reactive: any binding that reads a parameter (`x-text`, `x-show`, `x-for`, etc) re-renders when it changes — whether from `.set()`, `.add()`, `.remove()`, browser back/forward, or [router](/docs/core-plugins/router) navigation. Mutations apply instantly; only the address bar update is debounced to prevent excessive history entries during rapid input. Parameters persist across page reloads.

---

## Setup

URL parameters are included in `manifest.js` with all core plugins, or can be selectively loaded.

<div x-code-group copy>

```html "All Plugins (default)"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Selective"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="url-parameters"></script>
```

</div>

---

## Basic Usage

URL parameters use the `$url` magic method with a simple dot notation pattern:

- **Set/overwrite value**: `$url.paramName.set('value')`
- **Add another value**: `$url.paramName.add('value')`
- **Remove specific value**: `$url.paramName.remove('value')`
- **Clear all values**: `$url.paramName.remove()` or `$url.paramName.clear()`

Parameter names can be anything (`search`, `filter`, `view`, `user`, etc).

Reading a parameter offers three shapes:

- **`.value`** — a string for single values, an array for comma-separated multiples
- **`.first`** — always a single value, or `null` when unset
- **`.all`** — always an array, empty when unset

`.value` mirrors what's in the URL and is settable (for `x-model`), while `.first` and `.all` guarantee a stable shape regardless of how many values the parameter holds.

Alpine's <a href="https://alpinejs.dev/directives/model" target="_blank">x-model</a> directive is used to bind with form elements, e.g. `x-model="$url.paramName.value"`.

---

## Operations

The `$url` magic method provides several operations for managing parameters.

### Set

Replace or set a parameter value.

<div x-code-group>

```html copy
<div x-data>
    <p>Color: <span x-text="$url.color.value || 'None'"></span></p>
    <button @click="$url.color.set('red')">Red</button>
    <button @click="$url.color.set('blue')">Blue</button>
    <button @click="$url.color.set('green')">Green</button>
</div>
```

::: frame
<div x-data class="col gap-4 text-base">
    <div class="row gap-2">
        <button @click="$url.color.set('red')">Red</button>
        <button @click="$url.color.set('blue')">Blue</button>
        <button @click="$url.color.set('green')">Green</button>
    </div>
    <p>Color: <strong x-text="$url.color.value || 'None'"></strong></p>
</div>
:::

</div>

---

### Add

Handle multiple values stored as comma-separated parameters in the URL.

<div x-code-group>

```html copy
<p>Tags: <span x-text="$url.tags.value ? $url.tags.value.join(', ') : 'None'"></span></p>
<button @click="$url.tags.add('javascript')">Add JavaScript</button>
<button @click="$url.tags.remove('javascript')">Remove JavaScript</button>
<button @click="$url.tags.clear()">Clear All</button>
```

::: frame col gap-4 text-base
<div class="row gap-2">
    <button @click="$url.tags.add('javascript')">Add JavaScript</button>
    <button @click="$url.tags.add('css')">Add CSS</button>
    <button @click="$url.tags.add('html')">Add HTML</button>
    <button @click="$url.tags.remove('javascript')">Remove JS</button>
    <button @click="$url.tags.clear()">Clear All</button>
</div>
<p>Tags: <strong x-text="$url.tags.value && Array.isArray($url.tags.value) ? $url.tags.value.join(', ') : ($url.tags.value || 'None')"></strong></p>
:::

</div>

---

### Remove

Remove specific values from parameters. Calling `.remove()` with no argument removes the parameter entirely, same as `.clear()`.

<div x-code-group>

```html copy
<p>Categories: <span x-text="$url.categories.value ? $url.categories.value.join(', ') : 'None'"></span></p>
<button @click="$url.categories.add('frontend')">Add Frontend</button>
<button @click="$url.categories.remove('frontend')">Remove Frontend</button>
```

::: frame col gap-4 text-base
<div class="row gap-2">
    <button @click="$url.categories.add('frontend')">Add Frontend</button>
    <button @click="$url.categories.add('backend')">Add Backend</button>
    <button @click="$url.categories.remove('frontend')">Remove Frontend</button>
    <button @click="$url.categories.remove('backend')">Remove Backend</button>
</div>
<p>Categories: <strong x-text="$url.categories.value && Array.isArray($url.categories.value) ? $url.categories.value.join(', ') : ($url.categories.value || 'None')"></strong></p>
:::

</div>

---

### Clear

Remove a parameter entirely from the URL with `.clear()` or a no-argument `.remove()`.

<div x-code-group>

```html copy
<p>Faction: <span x-text="$url.faction.value || 'Default'"></span></p>
<button @click="$url.faction.set('elves')">Elves</button>
<button @click="$url.faction.set('orcs')">Orcs</button>
<button @click="$url.faction.clear()">Clear</button>
```

::: frame col gap-4 text-base
<div class="row gap-2">
    <button @click="$url.faction.set('elves')">Elves</button>
    <button @click="$url.faction.set('orcs')">Orcs</button>
    <button @click="$url.faction.clear()">Clear</button>
</div>
<p>Faction: <strong x-text="$url.faction.value || 'Default'"></strong></p>
:::

</div>

---

## Data Sources

Content from a [data source](/docs/core-plugins/local-data) can be the subject of a URL parameter.

<div x-code-group copy>

```html "HTML"
<!-- Filter -->
<select x-model="$url.category.value">
    <option value="">All Categories</option>
    <option value="laptops">Laptops</option>
    <option value="phones">Phones</option>
</select>

<!-- Results -->
<template x-for="product in ($x.example.products || []).filter(p => !$url.category.value || p.category === $url.category.value )" :key="product.name">
    <small x-text="product.name"></small>
</template>
```

```json "example.json"
{
    "products": [
        {"name": "MacBook Pro", "category": "laptops"},
        {"name": "Dell XPS", "category": "laptops"},
        {"name": "iPhone 15", "category": "phones"},
        {"name": "Samsung Galaxy", "category": "phones"},
        {"name": "iPad Air", "category": "tablets"},
        {"name": "Surface Pro", "category": "tablets"}
    ]
}
```

::: frame col gap-4
<!-- Filter -->
<select x-model="$url.category.value" class="flex-shrink-0">
    <option value="">All Categories</option>
    <option value="laptops">Laptops</option>
    <option value="phones">Phones</option>
    <option value="tablets">Tablets</option>
</select>

<!-- Results -->
<div class="row-wrap gap-4">
<template x-for="product in ($x.example.products || []).filter(p => !$url.category.value || p.category === $url.category.value )" :key="product.name">
    <small x-text="product.name" class="flex-shrink-0"></small>
</template>
</div>
:::

</div>

---

## Search & Query

This example demonstrates unified search using `$search` for key searches and `$query` for filtering. Both methods work together:

<div x-code-group copy>

```html "HTML" collapse="10"
<div x-data="{
    get filteredProducts() {
        return ($x.example.products || []).$search($url.search.value, 'name').$query([
            ...($url.category.value ? [['equal', 'category', $url.category.value]] : []),
            ...($url.brand.value ? [['equal', 'brand', $url.brand.value]] : [])
        ]);
    }
}">

    <!-- Filters -->
    <input type="text" placeholder="Search products..." aria-label="Search products" x-model="$url.search.value">
    <select x-model="$url.category.value">
        <option value="">All Categories</option>
        <option value="laptops">Laptops</option>
        <option value="phones">Phones</option>
        <option value="tablets">Tablets</option>
    </select>
    <select x-model="$url.brand.value">
        <option value="">All Brands</option>
        <option value="apple">Apple</option>
        <option value="dell">Dell</option>
        <option value="samsung">Samsung</option>
        <option value="microsoft">Microsoft</option>
    </select>
    <button @click="$url.search.clear(); $url.category.clear(); $url.brand.clear()">Clear All</button>

    <!-- Count -->
    <small><span x-text="filteredProducts.length"></span> results</small>

    <!-- Listed Results -->
    <template x-for="product in filteredProducts" :key="product.name">
        <span x-text="product.name"></span>
    </template>

</div>
```

```json "example.json"
{
    "products": [
        {"name": "MacBook Pro", "category": "laptops", "brand": "apple"},
        {"name": "Dell XPS", "category": "laptops", "brand": "dell"},
        {"name": "iPhone 15", "category": "phones", "brand": "apple"},
        {"name": "Samsung Galaxy", "category": "phones", "brand": "samsung"},
        {"name": "iPad Air", "category": "tablets", "brand": "apple"},
        {"name": "Surface Pro", "category": "tablets", "brand": "microsoft"}
    ]
}
```

::: frame
<div class="col" x-data="{
    get filteredProducts() {
        return ($x.example.products || []).$search($url.search.value, 'name').$query([
            ...($url.category.value ? [['equal', 'category', $url.category.value]] : []),
            ...($url.brand.value ? [['equal', 'brand', $url.brand.value]] : [])
        ]);
    }
}">
    <!-- Filters -->
    <div class="row gap-2 items-center">
        <input type="text" placeholder="Search products..." aria-label="Search products" x-model="$url.search.value">
        <select x-model="$url.category.value" class="flex-shrink-0">
            <option value="">All Categories</option>
            <option value="laptops">Laptops</option>
            <option value="phones">Phones</option>
            <option value="tablets">Tablets</option>
        </select>
        <select x-model="$url.brand.value" class="flex-shrink-0">
            <option value="">All Brands</option>
            <option value="apple">Apple</option>
            <option value="dell">Dell</option>
            <option value="samsung">Samsung</option>
            <option value="microsoft">Microsoft</option>
        </select>
        <button @click="$url.search.clear(); $url.category.clear(); $url.brand.clear()" class="flex-shrink-0">Clear All</button>
    </div>

    <!-- Count -->
    <small class="ml-auto my-4"><span x-text="filteredProducts.length"></span> results</small>

    <!-- Results -->
    <template x-for="product in filteredProducts" :key="product.name">
        <span class="row justify-between py-2 border-t border-line" x-text="product.name"></span>
    </template>
</div>
:::

</div>