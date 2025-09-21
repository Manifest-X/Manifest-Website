# Buttons

---

## Setup

Buttons styles are included in Indux CSS, or a standalone stylesheet.

<x-code-group copy>

```html "Indux CSS"
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.css" />
</head>
```

```html "Standalone"
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.theme.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.button.css" />
</head>
```

</x-code-group>

---

## Default

::: frame
<button>Button</button>
:::

```html copy
<button>Button</button>
```

Buttons are `inline-flex` with centered content by default. Use flexbox properties like Tailwind's `justify-start` to change content alignment. Overflow content is truncated, and internal text spans will show an ellipsis when truncated. Buttons will be squared if their content does not require more width.

::: frame
<button class="flex-1">Centered</button>
<button class="flex-1 justify-start">
    <span> Truncated lorem ipsum dolar sit amet</span>
</button>
<button>!</button>
:::

```html copy
<button class="flex-1">Centered</button>
<button class="flex-1 justify-start">
    <span> Truncated lorem ipsum dolar sit amet</span>
</button>
<button>!</button>
```

---

### Theme

Default buttons use the following [theme](/styles/theme) variables:

| Variable | Purpose |
|----------|---------|
| `--color-field-surface` | Button background color |
| `--color-field-surface-hover` | Button hover/active background color |
| `--color-field-inverse` | Button text color |
| `--spacing-field-height` | Button height and min-width |
| `--spacing-field-padding` | Horizontal padding for button content |
| `--radius` | Border radius for button corners |
| `--transition` | Transition for interactive states |

---

## Utilities

Buttons accept Indux [utility](/styles/utilities) classes, which can be stacked in any combination.

### Colors
::: frame
<button class="brand">Brand</button>
<button class="accent">Accent</button>
<button class="positive">Positive</button>
<button class="negative">Negative</button>
:::

```html copy
<!-- Brand variant -->
<button class="brand">Brand</button>

<!-- Accent variant -->
<button class="accent">Accent</button>

<!-- Positive variant -->
<button class="positive">Positive</button>

<!-- Negative variant -->
<button class="negative">Negative</button>
```

---

### Size

::: frame
<button class="sm">Small</button>
<button class="lg">Large</button>
:::

```html copy
<!-- Small variant -->
<button class="sm">Small</button>

<!-- Large variant -->
<button class="lg">Large</button>
```

---

### Appearance

::: frame items-center
<button class="ghost">Ghost</button>
<button class="outlined">Outlined</button>
<button class="selected">Selected</button>
<button class="transparent">Transparent</button>
<button class="hug transparent">Hug</button>
:::

```html copy
<!-- No background until hover -->
<button class="ghost">Ghost</button>

<!-- Border included -->
<button class="outlined">Outlined</button>

<!-- Currently selected state -->
<button class="selected">Selected</button>

<!-- No background at all -->
<button class="transparent">Transparent</button>

<!-- No padding for minimal target area, best paired with transparency -->
<button class="hug transparent">Hug</button>
```

---

## Icons

### Solo Icon

Buttons containing a single icon are automatically squared.

::: frame
<button x-icon="ph:house"></button>
:::

```html copy
<button x-icon="ph:house"></button>
```

---

### Icon & Text

Any number of icons and text can be nested in any order. Place icons in `<span>` tags, and any sibling elements will auto-space.

::: frame
<button><span x-icon="ph:house"></span> Home</button>
<button><span x-icon="ph:house"></span><span>Home</span></button>
:::

```html copy
<button><span x-icon="ph:house"></span> Home</button>
<button><span x-icon="ph:house"></span><span>Home</span></button>
```

---

## Links

For button links, use `<a role="button">`. Modifier classes above can also be applied.

::: frame
<a role="button" href="#">Learn more</a>
<a role="button" href="#" class="brand">Try now</a>
:::

```html copy
<a role="button" href="#">Learn more</a>
<a role="button" href="#" class="brand">Try now</a>
```

---

## File Uploads

Indux hides the `type="file"` input since its lack modern style control. To visualize it as a button, place it inside a label with `role="button"` alongside any icons or text.

::: frame justify-start
<label role="button">
    <input type="file" />
    <span x-icon="lucide:upload"></span>
    Upload
</label>
:::

```html copy
<label role="button">
    <input type="file" />
    <span x-icon="lucide:upload"></span>
    Upload
</label>
```

---

## Groups

Horizontally group buttons, inputs, or selects together with a `role="group"` attribute added to the parent container.

::: frame
<div role="group">
    <input placeholder="Insert email"/>
    <button class="accent">Signup</button>
</div>
:::

```html copy
<div role="group">
    <input placeholder="Insert email"/>
    <button class="accent">Signup</button>
</div>
```

When these elements are grouped, only the outer elements' outer corners retain their border radii for a seamless appearance.