# Switches

Binary toggle controls with on/off states.

---

## Setup

Switch styles are included in Manifest CSS or a standalone stylesheet, both referencing [theme](/docs/framework/styles/theme) variables.

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

Switches accept Manifest [utility](/docs/framework/styles/utilities) classes, which can be stacked in any combination.

### Colors

<div x-code-group>

```html copy
<!-- Brand variant -->
<input type="checkbox" role="switch" class="brand" checked />

<!-- Accent variant -->
<input type="checkbox" role="switch" class="accent" checked />

<!-- Positive variant -->
<input type="checkbox" role="switch" class="positive" />

<!-- Negative variant -->
<input type="checkbox" role="switch" class="negative" checked />
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
<input type="checkbox" role="switch" class="sm" checked />

<!-- Large variant -->
<input type="checkbox" role="switch" class="lg" checked />
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
<input type="checkbox" role="switch" class="outlined" checked />

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
    <input type="checkbox" role="switch" checked />
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
        <input type="checkbox" role="switch" checked />
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

Default switches use the following [theme](/docs/framework/styles/theme) variables:

| Variable | Purpose |
|----------|---------|
| `--color-field-surface`{copy} | Switch background |
| `--color-field-surface-hover`{copy} | Switch background on hover |
| `--color-field-inverse`{copy} | Marker color |
| `--spacing-field-height`{copy} | Switch size and corner rounding |
| `--transition`{copy} | Transition for interactive states |

---

### Customization

Modify base switch styles with custom CSS for the `input[role=switch]` selector. Overriding the field [theme](/docs/framework/styles/theme) variables keeps both color modes working.

<div x-code-group>

```css copy
input[role=switch] {
    --color-field-surface: color-mix(in oklch, var(--color-brand-surface) 20%, transparent);
    --color-field-inverse: var(--color-brand-content);

    /* Checked */
    &:checked {
        --color-field-surface: var(--color-brand-surface);
        --color-field-surface-hover: var(--color-brand-surface-hover);
        --color-field-inverse: var(--color-brand-inverse);
    }
}
```

::: frame row-wrap gap-4
<style>
input[role=switch].custom {
    --color-field-surface: color-mix(in oklch, var(--color-brand-surface) 20%, transparent);
    --color-field-inverse: var(--color-brand-content);

    &:checked {
        --color-field-surface: var(--color-brand-surface);
        --color-field-surface-hover: var(--color-brand-surface-hover);
        --color-field-inverse: var(--color-brand-inverse);
    }
}
</style>

<input type="checkbox" role="switch" class="custom" />
<input type="checkbox" role="switch" class="custom" checked />
:::

</div>
