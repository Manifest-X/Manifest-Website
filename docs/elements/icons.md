# Icons

Add icons to elements with a simple HTML attribute.

---

## Overview

Indux makes icons easy, letting you add over 200,000 open source icons from every major library, courtesy [Iconify](https://iconify.design/).

---

## Setup

Add an [Indux script](/getting-started/setup) to your project, or use the standalone icons plugin:

```html "<head> or <body>" copy
<!-- Alpine -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Indux icons plugin -->
<script src="https://cdn.jsdelivr.net/npm/indux/dist/indux.icons.js"></script>
```

---

## Usage

Icons are inserted into any HTML element with the `x-icon` attributes.

::: frame
<i class="h1" x-data x-icon="lucide:house"></i>
:::

```html copy
<i x-icon="lucide:house"></i>
```


Browse [Iconify](https://icon-sets.iconify.design/) for available icon values like the `lucide:house` example above. The letters before the colon are the icon library code (e.g. `lucide`), and the string after is the individual icon name (e.g. `house`). If an icon doesn't render, double check the value.

---

### Inline Icons

When an icon renders, a child SVG is generated at runtime within the parent element. This overwrites any other children of the parent element. To preserve children, place the `x-icon` attribute in its own child element like a `<span>` or `<i>` tag.

::: frame col !gap-6
<div class="h3"><span x-icon="lucide:house"></span> Lorem ipsum</div>
<button><span x-icon="lucide:house"></span> Home</button>
:::

```html copy
<h3><i x-icon="lucide:house"></i> Lorem ipsum.</h3>
<button><span x-icon="lucide:house"></span> Home</button>
```

---

### Dynamic Icons

Icons can be switched dynamically with Alpine.js expressions.

::: frame
<div x-data="{ icon: 'lucide:house' }">
    <button @click="icon = icon === 'lucide:house' ? 'lucide:building' : 'lucide:house'" aria-label="Toggle" x-icon="icon"></button>
</div>
:::

```html copy
<div x-data="{ icon: 'lucide:house' }">
    <button @click="icon = icon === 'lucide:house' ? 'lucide:building' : 'lucide:house'" aria-label="Toggle" x-icon="icon"></button>
</div>
```

---

### Collection Icons

`x-icon` can get its value from a [data source](/plugins/data-sources).

::: frame
<span class="h1" x-icon="$x.example.icon"></span>
:::

<x-code-group copy>

```html "HTML"
<span x-icon="$x.example.icon"></span>
```

```json "example.json"
{
    "icon": "lucide:aperture"
}
```

</x-code-group>

---

## Styles

Icons are treated like text and inherit parent text properties like `font-size` and `color`.

Certain elements like [buttons](/elements/buttons) have unique styles to ensure icons always appear nicely inline, on their own, or alongside text.