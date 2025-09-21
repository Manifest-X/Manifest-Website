# Tabs

---

## Setup

Tabs are supported by an Alpine plugin, available on its own or as part of Indux bundles.

<x-code-group copy>

```html "Standalone"
<!-- Alpine -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Indux tabs plugin only -->
<script src="https://cdn.jsdelivr.net/npm/indux/dist/indux.tabs.js"></script>
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

---

## Default

Create tabs with `x-tab` buttons and `x-tabpanel` content using any HTML elements. Panels are targeted by matching the `x-tab` value with either the panel's `id` or `class` name.

::: frame items-center
<button x-tab="first">First</button>
<button x-tab="second">Second</button>
<div id="first" x-tabpanel>First content</div>
<div id="second" x-tabpanel>Second content</div>
:::

```html copy
<button x-tab="first">First</button>
<button x-tab="second">Second</button>

<div id="first" x-tabpanel>First content</div>
<div id="second" x-tabpanel>Second content</div>
```

The plugin works by automatically created an Alpine `x-data` value called `tabs`, which uses the `x-tab` values to show the selected panel and hide the others.

---

## Shared Buttons

A tab button can show multiple panels simultaneously by using class names instead of IDs.

::: frame items-center
<button x-tab="shared">Show All</button>
<button x-tab="specific">Show Specific</button>

<div class="shared" x-tabpanel="classy">Shared content 1</div>
<div class="shared" x-tabpanel="classy">Shared content 2</div>
<div id="specific" x-tabpanel="classy">Specific content</div>
:::

```html copy
<button x-tab="shared">Show All</button>
<button x-tab="specific">Show Specific</button>

<!-- Multiple panels with same class -->
<div class="shared" x-tabpanel="classy">Shared content 1</div>
<div class="shared" x-tabpanel="classy">Shared content 2</div>

<!-- Single panel with ID -->
<div id="specific" x-tabpanel="classy">Specific content</div>
```

---

## Multiple Tab Groups

`x-tabpanel` content will be part of the same tab group on the page. For additional independent groups, give each group's content a shared value, e.g. `x-tabpanel="settings"`. This works the same as the `name` attribute for radio buttons.

::: frame !gap-12 items-center
<div class="col gap-2">
    <small>Tab group A</small>
    <div class="row gap-2">
        <button x-tab="first">First</button>
        <button x-tab="second">Second</button>
    </div>
    <div class="first" x-tabpanel="a">First content</div>
    <div class="second" x-tabpanel="a">Second content</div>
</div>

<div class="col gap-2">
    <small>Tab group B</small>
    <div class="row gap-2">
        <button x-tab="first">First</button>
        <button x-tab="second">Second</button>
    </div>
    <div class="first" x-tabpanel="b">First content</div>
    <div class="second" x-tabpanel="b">Second content</div>
</div>
:::

```html copy
<div class="col !gap-12">
    <small>1st tab group</small>
    <div class="row gap-2">
        <button x-tab="overview">Overview</button>
        <button x-tab="details">Details</button>
    </div>
    <div id="overview" x-tabpanel="a">Overview content</div>
    <div id="details" x-tabpanel="a">Details content</div>
</div>

<div class="col gap-2">
    <small>2nd tab group</small>
    <div class="row gap-2">
        <button x-tab="settings">Settings</button>
        <button x-tab="profile">Profile</button>
    </div>
    <div id="settings" x-tabpanel="b">Settings content</div>
    <div id="profile" x-tabpanel="b">Profile content</div>
</div>
```