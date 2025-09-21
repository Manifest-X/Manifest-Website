# Switches

---

## Setup

Switches styles are included in Indux CSS, or a standalone stylesheet.

<x-code-group copy>

```html "Indux CSS"
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.css" />
</head>
```

```html "Standalone"
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.theme.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.switch.css" />
</head>
```

</x-code-group>

---

## Default

::: frame
<input type="checkbox" role="switch" />
:::

```html copy
<input type="checkbox" role="switch" />
```

---

### Theme

Default switches use the following [theme](/styles/theme) variables:

| Variable | Purpose |
|----------|---------|
| `--color-field-surface` | Switch background |
| `--color-field-surface-hover` | Switch background on hover |
| `--color-field-inverse` | Marker color |
| `--spacing-field-height` | Switch size |
| `--radius` | Border radius for switch corners |
| `--transition` | Transition for interactive states |


## Labels

Placing the switch and text inside a `<label>` automatically arranges them in a row (requires [Form](/elements/forms) styles).


::: frame
<label>
    <input type="checkbox" role="switch" checked />
    Enable notifications
</label>
:::

```html copy
<label>
    <input type="checkbox" role="switch" />
    Enable notifications
</label>
```

---

## Utilities

Switches accept Indux [utility](/styles/utilities) classes, which can be stacked in any combination.

### Colors

::: frame
<input type="checkbox" role="switch" class="brand" checked />
<input type="checkbox" role="switch" class="accent" checked />
<input type="checkbox" role="switch" class="positive" />
<input type="checkbox" role="switch" class="negative" checked />
:::

```html copy
<!-- Brand variant -->
<input type="checkbox" role="switch" class="brand" />

<!-- Accent variant -->
<input type="checkbox" role="switch" class="accent" />

<!-- Positive variant -->
<input type="checkbox" role="switch" class="positive" />

<!-- Negative variant -->
<input type="checkbox" role="switch" class="negative" />
```

---

### Size

::: frame
<input type="checkbox" role="switch" class="sm" checked />
<input type="checkbox" role="switch" class="lg" checked />
:::

```html copy
<!-- Small variant -->
<input type="checkbox" role="switch" class="sm" />

<!-- Large variant -->
<input type="checkbox" role="switch" class="lg" />
```

---

### Appearance

::: frame
<input type="checkbox" role="switch" class="outlined" checked />
<input type="checkbox" role="switch" class="outlined brand" />
<input type="checkbox" role="switch" class="outlined accent" />
<input type="checkbox" role="switch" class="outlined positive" />
<input type="checkbox" role="switch" class="outlined negative" />
:::

```html copy
<!-- Border variant -->
<input type="checkbox" role="switch" class="outlined" />

<!-- Combined with colors -->
<input type="checkbox" role="switch" class="outlined brand" />
<input type="checkbox" role="switch" class="outlined accent" />
<input type="checkbox" role="switch" class="outlined positive" />
<input type="checkbox" role="switch" class="outlined negative" />
```

---

## Groups

Placing labelled switches inside a `<fieldset>` automatically arranges them in a column with a gap.

::: frame
<fieldset>
    <label>
        <input type="checkbox" role="switch" checked />
        Option A
    </label>
    <label>
        <input type="checkbox" role="switch" />
        Option B
    </label>
</fieldset>
:::

```html copy
<fieldset>
    <label>
        <input type="checkbox" role="switch" />
        Option A
    </label>
    <label>
        <input type="checkbox" role="switch" />
        Option B
    </label>
</fieldset>
```