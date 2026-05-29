# Dividers

Horizontal and vertical lines for visual separation.

---

## Setup

Divider styles are included in Manifest CSS or a standalone stylesheet, both referencing [theme](/docs/styles/theme) variables.

<div x-code-group copy>

```html "Manifest CSS"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.css" />
```

```html "Standalone"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.divider.css" />
```

</div>

---

## Default

Dividers in Manifest are horizontal or vertical dividing lines, which can optionally display inline text or icons.

### Horizontal Rule

For a basic horizontal line, use the `<hr>` element.

<div x-code-group>

```html copy
<hr>
```

::: frame
<hr class="w-full">
:::

</div>

---

### With Content

All other divider configurations use the `divider` class, which automatically creates lines around content. This is best suited for a `<div>` or `<span>`, but will work with any text-supporting element.

<div x-code-group>

```html copy
<div class="divider">Default Divider</div>
```

::: frame text-base
<div class="divider">Default Divider</div>
:::

</div>

Dividers can include [icons](/docs/elements/icons) for enhanced visual separation.

<div x-code-group>

```html copy
<!-- Icon only -->
<div class="divider"><span x-icon="lucide:star"></span></div>

<!-- Icon with text -->
<div class="divider"><span x-icon="lucide:shopping-basket"></span>Shopping List</div>
```

::: frame col gap-4 text-base
<div class="divider"><span x-icon="lucide:star"></span></div>
<div class="divider"><span x-icon="lucide:shopping-basket"></span>Shopping List</div>
:::

</div>

---

## Utilities

Dividers accept utility classes for different layouts and positioning.

### Alignment

The `start` and `end` classes will align content to one side or the other depending on text direction.

<div x-code-group>

```html copy
<!-- Start aligned (no line before) -->
<div class="divider start">Start Aligned</div>

<!-- Center aligned (default) -->
<div class="divider">Center Aligned</div>

<!-- End aligned (no line after) -->
<div class="divider end">End Aligned</div>
```

::: frame col gap-4 text-base
<div class="divider start">Start Aligned</div>
<div class="divider">Center Aligned</div>
<div class="divider end">End Aligned</div>
:::

</div>

---

### Vertical

The `vertical` class changes the axis, and can be stacked with alignment classes. The divider requires a taller parent container for its lines to be visible.

<div x-code-group>

```html copy
<div class="row gap-3 h-40">
    <div class="divider vertical"></div>
    <div class="divider vertical" x-icon="lucide:star"></div>
    <div class="divider vertical start">Start</div>
    <div class="divider vertical">Center</div>
    <div class="divider vertical end">End</div>
</div>
```

::: frame text-base
<div class="row gap-3 h-40">
    <div class="divider vertical"></div>
    <div class="divider vertical" x-icon="lucide:star"></div>
    <div class="divider vertical start">Start</div>
    <div class="divider vertical">Center</div>
    <div class="divider vertical end">End</div>
</div>
:::

</div>

---

## Styles

### Theme

Default dividers use the following [theme](/docs/styles/theme) variables:

| Variable | Purpose |
|----------|----------|
| `--color-line`{copy} | Line color (fallback: semi-transparent gray) |
| `--color-content-neutral`{copy} | Text color for divider labels |
| `--spacing-field-padding`{copy} | Spacing between lines and content |

---

### Customization

Modify base divider styles with custom CSS for the `.divider` selector.

<div x-code-group>

```css copy
.divider {
    color: #ff6b6b;

    /* Lines */
    &::before,
    &::after {
        background-color: #ff6b6b;
        height: 2px;
    }

    &.vertical {
        &::before,
        &::after {
            width: 2px;
        }
    }
}
```

::: frame text-base
<style>
.divider.custom {
    color: #ff6b6b;

    &::before,
    &::after {
        background-color: #ff6b6b;
        height: 2px;
    }

    &.vertical {
        &::before,
        &::after {
            width: 2px;
        }
    }
}
</style>

<div class="divider custom">Custom Divider</div>
:::

</div>

