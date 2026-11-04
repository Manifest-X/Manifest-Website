# Radios

Form controls for selecting one option from a group.

---

## Setup

Radio styles are included in Manifest CSS or a standalone stylesheet, both referencing [theme](/docs/framework/styles/theme) variables.

<div x-code-group copy>

```html "Manifest CSS"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.css" />
```

```html "Standalone"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.radio.css" />
```

</div>

---

## Default

<div x-code-group>

```html copy
<input type="radio" name="default" checked />
<input type="radio" name="default" />
```

::: frame
<input type="radio" name="default-preview" checked />
<input type="radio" name="default-preview" />
:::

</div>

---

## Utilities

Radios accept Manifest [utility](/docs/framework/styles/utilities) classes, which can be stacked in any combination.

### Colors

<div x-code-group>

```html copy
<!-- Brand variant -->
<input type="radio" class="brand" name="colors" checked />

<!-- Accent variant -->
<input type="radio" class="accent" name="colors" />

<!-- Positive variant -->
<input type="radio" class="positive" name="colors" />

<!-- Negative variant -->
<input type="radio" class="negative" name="colors" />
```

::: frame row-wrap gap-4
<input type="radio" class="brand" name="colors-preview" checked />
<input type="radio" class="accent" name="colors-preview" />
<input type="radio" class="positive" name="colors-preview" />
<input type="radio" class="negative" name="colors-preview" />
:::

</div>

---

### Size

<div x-code-group>

```html copy
<!-- Small variant -->
<input type="radio" class="sm" name="sizes" checked />

<!-- Large variant -->
<input type="radio" class="lg" name="sizes" />
```

::: frame
<input type="radio" class="sm" name="sizes-preview" checked />
<input type="radio" class="lg" name="sizes-preview" />
:::

</div>

---

### Outlined

<div x-code-group>

```html copy
<!-- Border variant -->
<input type="radio" class="outlined" name="outlines" checked />

<!-- Combined with colors -->
<input type="radio" class="outlined brand" name="outlines" />
<input type="radio" class="outlined accent" name="outlines" />
<input type="radio" class="outlined positive" name="outlines" />
<input type="radio" class="outlined negative" name="outlines" />
```

::: frame row-wrap gap-4
<input type="radio" class="outlined" name="outlines-preview" checked />
<input type="radio" class="outlined brand" name="outlines-preview" />
<input type="radio" class="outlined accent" name="outlines-preview" />
<input type="radio" class="outlined positive" name="outlines-preview" />
<input type="radio" class="outlined negative" name="outlines-preview" />
:::

</div>

---

## Form Layouts

::: brand icon="lucide:info"
These styles are included in `manifest.css`, or the standalone `manifest.form.css`.
:::

### Labels

Placing the radio and text inside a `<label>` automatically arranges them in a row.

<div x-code-group>

```html copy
<label>
    <input type="radio" name="labelled" checked />
    Option A
</label>
<label>
    <input type="radio" name="labelled" />
    Option B
</label>
```

::: frame row-wrap gap-4
<label>
    <input type="radio" name="labelled-preview" checked />
    Option A
</label>
<label>
    <input type="radio" name="labelled-preview" />
    Option B
</label>
:::

</div>

---

### Groups

Placing labelled radios inside a `<fieldset>` automatically arranges them in a column with a gap.

<div x-code-group>

```html copy
<fieldset>
    <label>
        <input type="radio" name="group" checked />
        Option A
    </label>
    <label>
        <input type="radio" name="group" />
        Option B
    </label>
    <label>
        <input type="radio" name="group" />
        Option C
    </label>
</fieldset>
```

::: frame
<fieldset>
    <label>
        <input type="radio" name="group-preview" checked />
        Option A
    </label>
    <label>
        <input type="radio" name="group-preview" />
        Option B
    </label>
    <label>
        <input type="radio" name="group-preview" />
        Option C
    </label>
</fieldset>
:::

</div>

---

## Styles

### Theme

Default radios use the following [theme](/docs/framework/styles/theme) variables:

| Variable | Purpose |
|----------|---------|
| `--color-field-surface`{copy} | Radio background |
| `--color-field-surface-hover`{copy} | Radio background on hover |
| `--color-field-inverse`{copy} | Radio icon color |
| `--spacing-field-height`{copy} | Radio size |
| `--transition`{copy} | Transition for interactive states |

---

### Customization

Modify base radio styles with custom CSS for the `input[type=radio]` selector. Overriding the field [theme](/docs/framework/styles/theme) variables keeps both color modes working.

<div x-code-group>

```css copy
input[type=radio] {
    --color-field-surface: color-mix(in oklch, var(--color-brand-surface) 20%, transparent);
    --color-field-inverse: var(--color-brand-content);
    border: 2px solid var(--color-brand-surface);
}
```

::: frame row-wrap gap-4
<style>
input[type=radio].custom {
    --color-field-surface: color-mix(in oklch, var(--color-brand-surface) 20%, transparent);
    --color-field-inverse: var(--color-brand-content);
    border: 2px solid var(--color-brand-surface);
}
</style>

<input type="radio" class="custom" name="custom-preview" checked />
<input type="radio" class="custom" name="custom-preview" />
:::

</div>
