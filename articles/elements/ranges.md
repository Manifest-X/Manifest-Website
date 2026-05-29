# Ranges

Sliders for numeric input with optional steps.

---

## Setup

Range styles are included in Manifest CSS or a standalone stylesheet, both referencing [theme](/docs/styles/theme) variables.

<div x-code-group copy>

```html "Manifest CSS"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.css" />
```

```html "Standalone"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.range.css" />
```

</div>

---

## Default

<div x-code-group>

```html copy
<input type="range" min="0" max="100" value="50" />
```

::: frame
<input type="range" min="0" max="100" value="50" />
:::

</div>

---

## Utilities

Ranges accept Manifest [utility](/docs/styles/utilities) classes, which can be stacked in any combination.

### Colors

<div x-code-group>

```html copy
<!-- Brand variant -->
<input type="range" class="brand" min="0" max="100" value="50" />

<!-- Accent variant -->
<input type="range" class="accent" min="0" max="100" value="50" />

<!-- Positive variant -->
<input type="range" class="positive" min="0" max="100" value="50" />

<!-- Negative variant -->
<input type="range" class="negative" min="0" max="100" value="50" />
```

::: frame row-wrap gap-4
<input type="range" class="brand" min="0" max="100" value="50" />
<input type="range" class="accent" min="0" max="100" value="50" />
<input type="range" class="positive" min="0" max="100" value="50" />
<input type="range" class="negative" min="0" max="100" value="50" />
:::

</div>

---

### Size

<div x-code-group>

```html copy
<!-- Small variant -->
<input type="range" class="sm" min="0" max="100" value="50" />

<!-- Large variant -->
<input type="range" class="lg" min="0" max="100" value="50" />
```

::: frame row-wrap gap-4
<input type="range" class="sm" min="0" max="100" value="50" />
<input type="range" class="lg" min="0" max="100" value="50" />
:::

</div>

---

## Markers

Use a `<datalist>` element to add tick marks with option labels to your range input.

<div x-code-group>

```html lines copy
<label>
    <input type="range" min="0" max="100" step="25" value="50" list="volume-ticks" />
    <datalist id="volume-ticks">
        <option value="0" label="0"></option>
        <option value="25" label="25"></option>
        <option value="50" label="50"></option>
        <option value="75" label="75"></option>
        <option value="100" label="100"></option>
    </datalist>
</label>
```

::: frame
<label>
    <input type="range" min="0" max="100" step="25" value="50" list="volume-ticks" />
    <datalist id="volume-ticks">
        <option value="0" label="0"></option>
        <option value="25" label="25"></option>
        <option value="50" label="50"></option>
        <option value="75" label="75"></option>
        <option value="100" label="100"></option>
    </datalist>
</label>
:::

</div>

---

## Labels

::: brand icon="lucide:info"
Label styles are included in `manifest.css`, or the standalone [form](/docs/elements/forms) stylesheet.
:::

Placing the range and text inside a `<label>` automatically stacks them with spacing.

<div x-code-group>

```html copy
<label>
    Volume
    <input type="range" min="0" max="100" value="50" />
</label>
```

::: frame
<label>
    Volume
    <input type="range" min="0" max="100" value="50" />
</label>
:::

</div>

To horizontally inline the label text with the range, place the text in a `<data>` element. This is used as a CSS hook with no semantic impact.

<div x-code-group>

```html copy
<label>
    <data>Volume</data>
    <input type="range" min="0" max="100" value="50" />
</label>
```

::: frame
<label>
    <data>Volume</data>
    <input type="range" min="0" max="100" value="50" />
</label>
:::

</div>

---

## Styles

### Theme

Default ranges use the following [theme](/docs/styles/theme) variables:

| Variable | Purpose |
|----------|---------|
| `--color-field-surface`{copy} | Track background color |
| `--color-field-surface-hover`{copy} | Track hover background color |
| `--color-field-inverse`{copy} | Thumb color |
| `--spacing-field-height`{copy} | Thumb size |
| `--spacing`{copy} | Track height |
| `--radius`{copy} | Border radius for track corners |
| `--transition`{copy} | Transition for interactive states |

---

### Customization

Modify base range styles with custom CSS for the `input[type=range]` selector.

<div x-code-group>

```css copy
input[type=range] {
    --color-field-surface: #f0f8ff;
    --color-field-surface-hover: #dbeafe;

    &::-webkit-slider-thumb {
        background-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
}
```

::: frame
<style>
    input[type=range].custom {
        --color-field-surface: #f0f8ff;
        --color-field-surface-hover: #dbeafe;
    }

    input[type=range].custom::-webkit-slider-thumb {
        background-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>

<input type="range" class="custom" min="0" max="100" value="50" />
:::

</div>
