# Inputs

---

## Setup

Inputs styles are included in Indux CSS, or a standalone stylesheet.

<x-code-group copy>

```html "Indux CSS"
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.css" />
</head>
```

```html "Standalone"
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.theme.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.input.css" />
</head>
```

</x-code-group>

---

## Default

::: frame
<input placeholder="Type here" />
:::

```html copy
<input placeholder="Type here" />
```

### Theme

Default inputs use the following [theme](/styles/theme) variables:

| Variable | Purpose |
|----------|---------|
| `--color-field-surface` | Input background color |
| `--color-field-surface-hover` | Input hover/active background color |
| `--color-field-inverse` | Text and selection highlight color |
| `--spacing-field-height` | Input height |
| `--spacing-field-padding` | Horizontal padding for input content |
| `--radius` | Border radius for input corners |
| `--transition` | Transition for interactive states |

## Utilities

Inputs accept Indux [utility](/styles/utilities) classes, which can be stacked in any combination.

### Colors

::: frame
<input class="brand" placeholder="Brand" />
<input class="accent" placeholder="Accent" />
<input class="positive" placeholder="Positive" />
<input class="negative" placeholder="Negative" />
:::

```html copy
<!-- Brand variant -->
<input class="brand" placeholder="Brand" />

<!-- Accent variant -->
<input class="accent" placeholder="Accent" />

<!-- Positive variant -->
<input class="positive" placeholder="Positive" />

<!-- Negative variant -->
<input class="negative" placeholder="Negative" />
```

---

### Size

::: frame
<input class="sm" placeholder="Small" />
<input class="lg" placeholder="Large" />
:::

```html copy
<!-- Small variant -->
<input class="sm" placeholder="Small" />

<!-- Large variant -->
<input class="lg" placeholder="Large" />
```

---

### Appearance

::: frame
<input class="ghost" placeholder="Ghost" />
<input class="outlined" placeholder="Outlined" />
<input class="transparent" placeholder="Transparent" />
:::

```html copy
<!-- No background until hover -->
<input class="ghost" placeholder="Ghost" />

<!-- Border included -->
<input class="outlined" placeholder="Outlined" />

<!-- No background at all -->
<input class="transparent" placeholder="Transparent" />
```

---

## Search

Inputs of `type="search"` automatically display a search icon.

::: frame
<input type="search" placeholder="Search..." />
:::

```html copy
<input type="search" placeholder="Search..." />
```

---

## File Uploads

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

Horizontally group inputs, buttons, or selects together with a `role="group"` attribute on the parent container.

::: frame
<div role="group">
    <input placeholder="Insert email" />
    <button class="accent">Signup</button>
</div>
:::

```html copy
<div role="group">
    <input placeholder="Insert email" />
    <button class="accent">Signup</button>
</div>
```

When these elements are grouped, only the outer elements' outer corners retain their border radii for a seamless appearance.