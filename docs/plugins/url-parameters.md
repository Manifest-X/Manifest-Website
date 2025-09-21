# URL Parameters

---

## Setup

URL parameters are supported by an Alpine plugin, available on its own or as part of Indux bundles.

<x-code-group copy>

```html "Standalone"
<!-- Alpine -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Indux URL parameters plugin only -->
<script src="https://cdn.jsdelivr.net/npm/indux/dist/indux.url.params.js"></script>
```

```html "Indux JS"
<!-- Alpine -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Indux JS -->
<script src="https://cdn.jsdelivr.net/npm/indux/dist/indux.js"></script>
```

```html "Quickstart"
<!-- Indux JS, Alpine, and Tailwind combined -->
<script src="https://cdn.jsdelivr.net/npm/indux/dist/indux.quickstart.js"></script>
```

</x-code-group>

The URL parameters plugin provides a reactive `$url` magic method for storing application state in the URL with common chain characters like `?`, `#`, and `&`. This preserves user interactions like search queries, filters, and view preferences, and the generated URLs can be further shared or bookmarked.

Parameter updates are debounced by 300ms to prevent excessive URL changes during rapid user input. They persist across page reloads and are reactive to browser back/forward navigation.

::: brand icon="lucide:info"
URL parameters work seamlessly with the Indux [router](/plugins/router) for complete navigation and state management.
:::

---

## Basic Usage

URL parameters use the `$url` magic method with a simple dot notation pattern:

- **Set/overwrite value**: `$url.paramName.set('value')`
- **Add another value**: `$url.paramName.add('value')`
- **Remove specific value**: `$url.paramName.remove('value')`
- **Clear all values**: `$url.paramName.clear()`

Parameter names can be anything (`search`, `filter`, `view`, `user`, etc).

Alpine's <a href="https://alpinejs.dev/directives/model" target="_blank">x-model</a> directive is used to bind with buttons, inputs, etc, e.g. `x-model="$url.paramName.value"`

---

## Operations

The `$url` magic method provides several operations for managing parameters.

### Set

Replace or set a parameter value.

::: frame
<div x-data class="col gap-4">
    <p>Color: <strong x-text="$url.color.value || 'None'"></strong></p>
    <div class="row gap-2">
        <button @click="$url.color.set('red')">Red</button>
        <button @click="$url.color.set('blue')">Blue</button>
        <button @click="$url.color.set('green')">Green</button>
    </div>
</div>
:::

```html copy
<div x-data>
    <p>Color: <span x-text="$url.color.value || 'None'"></span></p>
    <button @click="$url.color.set('red')">Red</button>
    <button @click="$url.color.set('blue')">Blue</button>
    <button @click="$url.color.set('green')">Green</button>
</div>
```

---

### Add

Handle multiple values stored as comma-separated parameters in the URL.

::: frame col
<p>Tags: <strong x-text="$url.tags.value && Array.isArray($url.tags.value) ? $url.tags.value.join(', ') : ($url.tags.value || 'None')"></strong></p>
<div class="row gap-2">
    <button @click="$url.tags.add('javascript')">Add JavaScript</button>
    <button @click="$url.tags.add('css')">Add CSS</button>
    <button @click="$url.tags.add('html')">Add HTML</button>
    <button @click="$url.tags.remove('javascript')">Remove JS</button>
    <button @click="$url.tags.clear()">Clear All</button>
</div>
:::

```html copy
<p>Tags: <span x-text="$url.tags.value ? $url.tags.value.join(', ') : 'None'"></span></p>
<button @click="$url.tags.add('javascript')">Add JavaScript</button>
<button @click="$url.tags.remove('javascript')">Remove JavaScript</button>
<button @click="$url.tags.clear()">Clear All</button>
```

---

### Remove

Remove specific values from parameters.

::: frame col gap-4!
<p>Categories: <strong x-text="$url.categories.value && Array.isArray($url.categories.value) ? $url.categories.value.join(', ') : ($url.categories.value || 'None')"></strong></p>
<div class="row gap-2">
    <button @click="$url.categories.add('frontend')">Add Frontend</button>
    <button @click="$url.categories.add('backend')">Add Backend</button>
    <button @click="$url.categories.remove('frontend')">Remove Frontend</button>
    <button @click="$url.categories.remove('backend')">Remove Backend</button>
</div>
:::

```html copy
<p>Categories: <span x-text="$url.categories.value ? $url.categories.value.join(', ') : 'None'"></span></p>
<button @click="$url.categories.add('frontend')">Add Frontend</button>
<button @click="$url.categories.remove('frontend')">Remove Frontend</button>
```

---

### Clear

Remove a parameter entirely from the URL.

::: frame col
<p>Faction: <strong x-text="$url.faction.value || 'Default'"></strong></p>
<div class="row gap-2">
    <button @click="$url.faction.set('elves')">Elves</button>
    <button @click="$url.faction.set('orcs')">Orcs</button>
    <button @click="$url.faction.clear()">Clear</button>
</div>
:::

```html copy
<p>Faction: <span x-text="$url.faction.value || 'Default'"></span></p>
<button @click="$url.faction.set('elves')">Elves</button>
<button @click="$url.faction.set('orcs')">Orcs</button>
<button @click="$url.faction.clear()">Clear</button>
```

---

## Data Sources

Content from a [collection](/plugins/content-collections) can be the subject of a URL parameter.

::: frame col
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

<x-code-group copy>

```html
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

</x-code-group>

---

## Search Example

This example includes a realtime search field with additional parameters:

::: frame col !gap-0
<!-- Filters -->
<div class="row gap-4 items-center">
    <input type="text" placeholder="Search products..." x-model="$url.search.value">
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
<small class="ml-auto mt-4 mb-2"><span x-text="($x.example.products || []).filter(p => 
    (!$url.search.value || p.name.toLowerCase().includes($url.search.value.toLowerCase())) &&
    (!$url.category.value || p.category === $url.category.value)
).length"></span> results</small>

<!-- Results -->
<template x-for="product in ($x.example.products || []).filter(p => 
    (!$url.search.value || p.name.toLowerCase().includes($url.search.value.toLowerCase())) &&
    (!$url.category.value || p.category === $url.category.value)
)" :key="product.name">
    <span class="row justify-between py-2 border-t border-line" x-text="product.name"></span>
</template>
:::

<x-code-group copy>

```html "HTML"
<!-- Filters -->
<input type="text" placeholder="Search products..." x-model="$url.search.value">
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
<small><span x-text="($x.example.products || []).filter(p => 
    (!$url.search.value || p.name.toLowerCase().includes($url.search.value.toLowerCase())) &&
    (!$url.category.value || p.category === $url.category.value)
).length"></span> products found</small>

<!-- Results -->
<template x-for="product in ($x.example.products || []).filter(p => 
    (!$url.search.value || p.name.toLowerCase().includes($url.search.value.toLowerCase())) &&
    (!$url.category.value || p.category === $url.category.value)
)" :key="product.name">
    <span x-text="product.name"></span>
</template>
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

</x-code-group>