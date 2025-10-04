# Tabs

---

## Setup

Tabs are supported by a plugin for Alpine JS, available on its own or as part of Indux bundles.

<x-code-group copy>

```html "Standalone"
<!-- Alpine -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Indux tabs plugin only -->
<script src="https://cdn.jsdelivr.net/npm/@indux/indux@latest/dist/indux.tabs.min.js"></script>
```

```html "Indux JS"
<!-- Alpine -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Indux JS -->
<script src="https://cdn.jsdelivr.net/npm/@indux/indux@latest/dist/indux.min.js"></script>
```

```html "Quickstart"
<!-- Indux JS, Alpine, and Tailwind combined -->
<script src="https://cdn.jsdelivr.net/npm/@indux/indux@latest/dist/indux.quickstart.min.js"></script>
```

</x-code-group>

Tabs draw their styles from any respective elements used, like [buttons](/elements/buttons).

---

## Default

Create tab menus with `x-tab` selectable targets and `x-tabpanel` content areas, using any HTML elements. Panels are targeted by matching the `x-tab` value with either the panel's `id` or `class` name.

::: frame items-center
<button x-tab="first">First</button>
<button x-tab="second">Second</button>
<div id="first" x-tabpanel>First content</div>
<div class="second" x-tabpanel>Second content</div>
:::

```html copy
<button x-tab="first">First</button>
<button x-tab="second">Second</button>

<div id="first" x-tabpanel>First content</div>
<div class="second" x-tabpanel>Second content</div>
```

The plugin works by automatically created an Alpine `x-data` value called `tabs`, which uses the `x-tab` values to show the selected panel and hide the others.

---

## Shared Buttons

A tab button can show multiple panels simultaneously by using class names instead of IDs.

::: frame items-center
<button x-tab="shared">Show All</button>
<button x-tab="specific">Show Specific</button>

<div class="shared" x-tabpanel="sharedExample">Shared content 1</div>
<div class="shared" x-tabpanel="sharedExample">Shared content 2</div>
<div id="specific" x-tabpanel="sharedExample">Specific content</div>
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

by default, `x-tabpanel` content is part of the same tab group on the page. For additional independent groups, give each group's content a shared value, e.g. `x-tabpanel="settings"`. This works the same as the `name` attribute for radio buttons.

::: frame !gap-12 items-center
<div class="col gap-2">
    <small>Tab group A</small>
    <div class="row gap-2">
        <button x-tab="first">First</button>
        <button x-tab="second">Second</button>
    </div>
    <div class="first" x-tabpanel="a">A. First content</div>
    <div class="second" x-tabpanel="a">A. Second content</div>
</div>

<div class="col gap-2">
    <small>Tab group B</small>
    <div class="row gap-2">
        <button x-tab="first">First</button>
        <button x-tab="second">Second</button>
    </div>
    <div class="first" x-tabpanel="b">B. First content</div>
    <div class="second" x-tabpanel="b">B. Second content</div>
</div>
:::

```html copy
<div class="col gap-2">
    <small>Tab group A</small>
    <div class="row gap-2">
        <button x-tab="first">First</button>
        <button x-tab="second">Second</button>
    </div>
    <div class="first" x-tabpanel="a">A. First content</div>
    <div class="second" x-tabpanel="a">A. Second content</div>
</div>

<div class="col gap-2">
    <small>Tab group B</small>
    <div class="row gap-2">
        <button x-tab="first">First</button>
        <button x-tab="second">Second</button>
    </div>
    <div class="first" x-tabpanel="b">B. First content</div>
    <div class="second" x-tabpanel="b">B. Second content</div>
</div>
```