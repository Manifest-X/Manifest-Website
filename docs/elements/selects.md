# Selects

---

## Setup

Selects styles are included in Indux CSS, or a standalone stylesheet.

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
<select>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
</select>
:::

```html copy
<select>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
</select>
```

---

### Theme

Default selects use the following [theme](/styles/theme) variables:

| Variable | Purpose |
|----------|---------|
| `--color-field-surface` | Select background color |
| `--color-field-surface-hover` | Select hover/active background color |
| `--color-field-inverse` | Select text color |
| `--spacing-field-height` | Select height and min-width |
| `--spacing-field-padding` | Horizontal padding for select content |
| `--radius` | Border radius for select corners |
| `--transition` | Transition for interactive states |

---

## Utilities

Selects accept Indux [utility](/styles/utilities) classes, which can be stacked in any combination.

### Colors
::: frame
<select class="brand">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
</select>
<select class="accent">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
</select>
<select class="positive">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
</select>
<select class="negative">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
</select>
:::

```html copy
<!-- Brand variant -->
<select class="brand">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
</select>

<!-- Accent variant -->
<select class="accent">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
</select>

<!-- Positive variant -->
<select class="positive">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
</select>

<!-- Negative variant -->
<select class="negative">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
</select>
```

---

### Size

::: frame
<select class="sm">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
</select>
<select class="lg">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
</select>
:::

```html copy
<!-- Small variant -->
<select class="sm">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
</select>

<!-- Large variant -->
<select class="lg">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
</select>
```

---

### Appearance

::: frame items-center
<select class="ghost">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
</select>
<select class="outlined">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
</select>
<select class="transparent">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
</select>
<select class="hug transparent">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
</select>
:::

```html copy
<!-- No background until hover -->
<select class="ghost">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
</select>

<!-- Border variant -->
<select class="outlined">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
</select>

<!-- No background at all -->
<select class="transparent">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
</select>

<!-- No padding for minimal target area, best paired with transparency -->
<select class="hug transparent">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
</select>
```

---

## Groups

Horizontally group buttons, inputs, or selects together with a `role="group"` attribute added to the parent container.

::: frame
<div role="group">
    <select>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
    </select>
    <button class="accent">Confirm</button>
</div>
:::

```html copy
<div role="group">
    <select>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
    </select>
    <button class="accent">Confirm</button>
</div>
```

When these elements are grouped, only the outer elements' outer corners retain their border radii for a seamless appearance.