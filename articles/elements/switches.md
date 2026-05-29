# Switches

Binary toggle controls with on/off states.

---

## Setup

Switch styles are included in Manifest CSS or a standalone stylesheet, both referencing [theme](/docs/styles/theme) variables.

<div x-code-group copy>

```html "Manifest CSS"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.css" />
```

```html "Standalone"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.switch.css" />
```

</div>

---

## Default

<div x-code-group>

```html copy
<input type="checkbox" role="switch" />
```

::: frame
<input type="checkbox" role="switch" />
:::

</div>

---

## Utilities

Switches accept Manifest [utility](/docs/styles/utilities) classes, which can be stacked in any combination.

### Colors

<div x-code-group>

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

::: frame row-wrap gap-4
<input type="checkbox" role="switch" class="brand" checked />
<input type="checkbox" role="switch" class="accent" checked />
<input type="checkbox" role="switch" class="positive" />
<input type="checkbox" role="switch" class="negative" checked />
:::

</div>

---

### Size

<div x-code-group>

```html copy
<!-- Small variant -->
<input type="checkbox" role="switch" class="sm" />

<!-- Large variant -->
<input type="checkbox" role="switch" class="lg" />
```

::: frame row-wrap gap-4
<input type="checkbox" role="switch" class="sm" checked />
<input type="checkbox" role="switch" class="lg" checked />
:::

</div>

---

### Appearance

<div x-code-group>

```html copy
<!-- Border variant -->
<input type="checkbox" role="switch" class="outlined" />

<!-- Combined with colors -->
<input type="checkbox" role="switch" class="outlined brand" />
<input type="checkbox" role="switch" class="outlined accent" />
<input type="checkbox" role="switch" class="outlined positive" />
<input type="checkbox" role="switch" class="outlined negative" />
```

::: frame row-wrap gap-4
<input type="checkbox" role="switch" class="outlined" checked />
<input type="checkbox" role="switch" class="outlined brand" />
<input type="checkbox" role="switch" class="outlined accent" />
<input type="checkbox" role="switch" class="outlined positive" />
<input type="checkbox" role="switch" class="outlined negative" />
:::

</div>

---

## Form Layouts

::: brand icon="lucide:info"
These styles are included in `manifest.css`, or the standalone `manifest.form.css`.
:::

### Labels

Placing the switch and text inside a `<label>` automatically arranges them in a row.


<div x-code-group>

```html copy
<label>
    <input type="checkbox" role="switch" />
    Enable notifications
</label>
```

::: frame
<label>
    <input type="checkbox" role="switch" checked />
    Enable notifications
</label>
:::

</div>

---

### Groups

Placing labelled switches inside a `<fieldset>` automatically arranges them in a column with a gap.

<div x-code-group>

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

</div>

---

## Styles

### Theme

Default switches use the following [theme](/docs/styles/theme) variables:

| Variable | Purpose |
|----------|---------|
| `--color-field-surface`{copy} | Switch background |
| `--color-field-surface-hover`{copy} | Switch background on hover |
| `--color-field-inverse`{copy} | Marker color |
| `--spacing-field-height`{copy} | Switch size |
| `--radius`{copy} | Border radius for switch corners |
| `--transition`{copy} | Transition for interactive states |

---

### Customization

Modify base switch styles with custom CSS for the `input[role=switch]` selector.

<div x-code-group>

```css copy
input[role=switch] {
    background-color: #f0f8ff;
    border: 2px solid #3b82f6;
    border-radius: 20px;

    /* Marker */
    &::before {
        background-color: #1e40af;
        box-shadow: 0 2px 4px rgba(30, 64, 175, 0.3);
    }

    /* Background when checked */
    &:checked {
        background-color: #3b82f6;
    }

    /* Marker when checked */
    &:checked::before {
        background-color: white;
        left: calc(100% - 1.5rem + 0.125rem);
    }
}
```

::: frame row-wrap gap-4
<style>
input[role=switch].custom {
    background-color: #f0f8ff;
    border: 2px solid #3b82f6;
    border-radius: 20px;
}

/* Marker */
input[role=switch].custom::before {
    background-color: #1e40af;
    box-shadow: 0 2px 4px rgba(30, 64, 175, 0.3);
}

/* Background when checked */
input[role=switch].custom:checked {
    background-color: #3b82f6;
}

/* Marker when checked */
input[role=switch].custom:checked::before {
    background-color: white;
    left: calc(100% - 1.5rem + 0.125rem);
}
</style>

<input type="checkbox" role="switch" class="custom" checked />
:::

</div>