# Inputs

Single-line text fields with validation states.

---

## Setup

Input styles are included in Manifest CSS or a standalone stylesheet, both referencing [theme](/docs/styles/theme) variables.

<div x-code-group copy>

```html "Manifest CSS"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.css" />
```

```html "Standalone"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.input.css" />
```

</div>

---

## Default

<div x-code-group>

```html copy
<input placeholder="Type here" />
```

::: frame
<input placeholder="Type here" />
:::

</div>

---

## Utilities

Inputs accept Manifest [utility](/docs/styles/utilities) classes, which can be stacked in any combination.

### Colors

<div x-code-group>

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

::: frame col gap-4
<input class="brand" placeholder="Brand" />
<input class="accent" placeholder="Accent" />
<input class="positive" placeholder="Positive" />
<input class="negative" placeholder="Negative" />
:::

</div>

---

### Size

<div x-code-group>

```html copy
<!-- Small variant -->
<input class="sm" placeholder="Small" />

<!-- Large variant -->
<input class="lg" placeholder="Large" />
```

::: frame col gap-4
<input class="sm" placeholder="Small" />
<input class="lg" placeholder="Large" />
:::

</div>

---

### Appearance

<div x-code-group>

```html copy
<!-- No background until hover -->
<input class="ghost" placeholder="Ghost" />

<!-- Border included -->
<input class="outlined" placeholder="Outlined" />

<!-- No background at all -->
<input class="transparent" placeholder="Transparent" />
```

::: frame col gap-4
<input class="ghost" placeholder="Ghost" />
<input class="outlined" placeholder="Outlined" />
<input class="transparent" placeholder="Transparent" />
:::

</div>

---

## Search

Inputs of `type="search"` work on their own, or can be placed in a label to facilitate a search icon.

<div x-code-group>

```html copy
<label role="button">
    <span x-icon="lucide:search"></span>
    <input type="search" placeholder="Search" aria-label="Search" />
</label>
```

::: frame
<label role="button">
    <span x-icon="lucide:search"></span>
    <input type="search" placeholder="Search" aria-label="Search" />
</label>
:::

</div>

---

## Copy

Pair an input with a copy button by placing both in a label, marking the button with `command="--copy"`. The button stays hidden until the field is hovered or focused. Copying is wired with a little Alpine — on success, flash a confirmation icon [tooltip](/docs/core-plugins/tooltips), just like copyable code blocks.

<div x-code-group>

```html copy
<label x-data>
    <input x-ref="code" value="MNFST-20" aria-label="Coupon code" />
    <button type="button" command="--copy" aria-label="Copy to clipboard" x-tooltip.top.end="Copy"
        @click="navigator.clipboard.writeText($refs.code.value)
            .then(() => ManifestTooltips.showTransient($el, '<span class=field-copied-icon></span>', 1500, ['top', 'end']))"></button>
</label>
```

::: frame
<label x-data>
    <input x-ref="code" value="MNFST-20" aria-label="Coupon code" />
    <button type="button" command="--copy" aria-label="Copy to clipboard" x-tooltip.top.end="Copy"
        @click="navigator.clipboard.writeText($refs.code.value)
            .then(() => ManifestTooltips.showTransient($el, '<span class=field-copied-icon></span>', 1500, ['top', 'end']))"></button>
</label>
:::

</div>

This works with any text-like input type (`text`, `email`, `tel`, `number`, `url`). The `command` attribute is native HTML — custom `--` commands have no default behavior, making it a clean styling hook. The `x-tooltip` is optional — it labels the button on hover, steps aside for the confirmation flash on click, and returns on the next hover. Without the tooltip plugin, toggle a `copied` class on the button instead to swap its icon to a check in place. Override the icons with the `--icon-field-copy`{copy} and `--icon-field-copied`{copy} variables.

---

## File Uploads

Inputs of `type="file"` work on their own, or can be placed in a label to facilitate an upload icon.

<div x-code-group>

```html copy
<label role="button">
    <input type="file" />
    <span x-icon="lucide:upload"></span>
    Upload
</label>
```

::: frame justify-start
<label role="button">
    <input type="file" />
    <span x-icon="lucide:upload"></span>
    Upload
</label>
:::

</div>

---

## Form Layouts

::: brand icon="lucide:info"
These styles are included in `manifest.css`, or the standalone `manifest.form.css`.
:::

### Labels

Placing the input and text inside a `<label>` automatically stacks them with spacing.

<div x-code-group>

```html copy
<label>
    Email
    <input placeholder="Enter your email" />
</label>
```

::: frame text-base
<label>
    Email
    <input placeholder="Enter your email" />
</label>
:::

</div>

To horizontally inline the label text with the input, place the text in a `<data>` element. This is used as a CSS hook with no semantic impact.

<div x-code-group>

```html copy
<label>
    <data>Email</data>
    <input placeholder="Enter your email" />
</label>
```

::: frame text-base
<label>
    <data>Email</data>
    <input placeholder="Enter your email" />
</label>
:::

</div>

---

### Groups

Horizontally group inputs, buttons, or selects together with a `role="group"` attribute on the parent container.

<div x-code-group>

```html copy
<div role="group">
    <input placeholder="Insert email" />
    <button class="brand">Signup</button>
</div>
```

::: frame
<div role="group">
    <input placeholder="Insert email" />
    <button class="brand">Signup</button>
</div>
:::

</div>

When these elements are grouped, only the outer elements' outer corners retain their border radii for a seamless appearance.

---

## Validation

Inputs support native HTML5 validation through attributes like `required`, `pattern`, `minlength`, `maxlength`, `min`, `max`, and `type="email"` / `type="url"`. Style the invalid and valid states with Tailwind pseudo-class variants.

<div x-code-group>

```html copy
<input type="email" required
    class="user-invalid:border-negative-surface user-valid:border-positive-surface" />
```

::: frame
<input type="email" required placeholder="you@example.com" class="user-invalid:border-negative-surface user-valid:border-positive-surface" />
:::

</div>

Prefer `user-invalid:` and `user-valid:` over the unprefixed `invalid:` and `valid:`. They wait until the user has actually engaged with the field, avoiding the awkward "everything is red on page load" effect. See [forms](/docs/elements/forms#validation) for the full variant reference and inline-message patterns.

---

## Styles

### Theme

Default inputs use the following [theme](/docs/styles/theme) variables:

| Variable | Purpose |
|----------|---------|
| `--color-field-surface`{copy} | Input background color |
| `--color-field-surface-hover`{copy} | Input hover/active background color |
| `--color-field-inverse`{copy} | Text and selection highlight color |
| `--spacing-field-height`{copy} | Input height |
| `--spacing-field-padding`{copy} | Horizontal padding for input content |
| `--radius`{copy} | Border radius for input corners |
| `--transition`{copy} | Transition for interactive states |

---

### Customization

Modify base input styles with custom CSS for the `input` selector.

<div x-code-group>

```css copy
input {
    background-color: #f0f8ff;
    border: 2px solid #3b82f6;
    border-radius: 8px;
    color: #1e40af;

    &::placeholder {
        color: #60a5fa;
    }

    &:focus-visible {
        border-color: #1d4ed8;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
}
```

::: frame
<style>
input.custom {
    background-color: #f0f8ff;
    border: 2px solid #3b82f6;
    border-radius: 8px;
    color: #1e40af;
}

input.custom::placeholder {
    color: #60a5fa;
}

input.custom:focus-visible {
    border-color: #1d4ed8;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>

<input class="custom" placeholder="Custom Input" />
:::

</div>

