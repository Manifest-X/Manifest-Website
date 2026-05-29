# Badges

Compact labels for status, counts, and tags.

---

## Setup

Badge styles are included in Manifest CSS or the standalone [typography](/docs/elements/typography) stylesheet. Both reference [theme](/docs/styles/theme) variables.

<div x-code-group copy>

```html "Manifest CSS"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.css" />
```

```html "Standalone"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.typography.css" />
```

</div>

---

## Default

Apply the `badge` class to any text element.

<div x-code-group>

```html copy
<span class="badge">Badge</span>
```

::: frame text-base
<span class="badge">Badge</span>
:::

</div>

---

## Utilities

Badges accept Manifest [utility](/docs/styles/utilities) classes, which can be stacked in any combination.

### Colors
<div x-code-group>

```html copy
<!-- Brand variant -->
<span class="badge brand">Brand</span>

<!-- Accent variant -->
<span class="badge accent">Accent</span>

<!-- Positive variant -->
<span class="badge positive">Positive</span>

<!-- Negative variant -->
<span class="badge negative">Negative</span>
```

::: frame text-base
<span class="badge brand">Brand</span>
<span class="badge accent">Accent</span>
<span class="badge positive">Positive</span>
<span class="badge negative">Negative</span>
:::

</div>

---

### Size

<div x-code-group>

```html copy
<!-- Small variant -->
<span class="badge sm">Small</span>

<!-- Large variant -->
<span class="badge lg">Large</span>
```

::: frame text-base
<span class="badge sm">Small</span>
<span class="badge lg">Large</span>
:::

</div>

---

### Appearance

<div x-code-group>

```html copy
<!-- No background until hover -->
<span class="badge ghost">Ghost</span>

<!-- Border included -->
<span class="badge outlined">Outlined</span>

<!-- No background at all -->
<span class="badge transparent">Transparent</span>

<!-- No padding for minimal target area, best paired with transparency -->
<span class="badge hug transparent">Hug</span>
```

::: frame items-center text-base
<span class="badge ghost">Ghost</span>
<span class="badge outlined">Outlined</span>
<span class="badge transparent">Transparent</span>
<span class="badge hug transparent">Hug</span>
:::

</div>

---

## Icons

### Solo Icon

Badges containing a single [icon](/docs/elements/icons) are automatically squared.

<div x-code-group>

```html copy
<span class="badge" x-icon="lucide:heart"></span>
```

::: frame
<span class="badge" x-icon="lucide:heart"></span>
:::

</div>

---

### Icon & Text

Any number of icons and text can be nested in any order. Place icons in `<span>` tags, and any sibling elements will auto-space.

<div x-code-group>

```html copy
<span class="badge"><span x-icon="lucide:heart"></span> 79</span>
<span class="badge"><span x-icon="lucide:thumbs-down"></span><span>21</span></span>
```

::: frame text-base
<span class="badge"><span x-icon="lucide:heart"></span> 79</span>
<span class="badge"><span x-icon="lucide:thumbs-down"></span><span>21</span></span>
:::

</div>

---

## Styles

### Theme

Default badges use the following [theme](/docs/styles/theme) variables:

| Variable | Purpose |
|----------|---------|
| `--color-content-stark`{copy} | High contrast text color |
| `--spacing`{copy} | Padding and margin factor in various elements |
| `--radius`{copy} | Border radius for badge corners |

---

### Customization

Modify base styles with custom CSS for the `badge` class.

<div x-code-group>

```css copy
.badge {
    color: blue;
    background: lightblue;
}
```

::: frame text-base
<style>
.badge.custom {
    color: blue;
    background: lightblue;
}
</style>

<span class="badge custom">Custom Badge</span>
:::

</div>