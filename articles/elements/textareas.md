# Textareas

Multi-line text fields with auto-resize and validation.

---

## Setup

Textareas styles are included in Manifest CSS or the standalone [inputs](/docs/elements/inputs) stylesheet. Both reference [theme](/docs/styles/theme) variables.

<div x-code-group copy>

```html "Manifest CSS"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.css" />
```

```html "Standalone"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.theme.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.input.css" />
```

</div>

---

## Default

<div x-code-group>

```html copy
<textarea placeholder="Type here"></textarea>
```

::: frame
<textarea placeholder="Type here"></textarea>
:::

</div>

---

## Utilities

Textareas accept Manifest [utility](/docs/styles/utilities) classes, which can be stacked in any combination.

### Colors

<div x-code-group>

```html copy
<!-- Brand variant -->
<textarea class="brand" placeholder="Brand"></textarea>

<!-- Accent variant -->
<textarea class="accent" placeholder="Accent"></textarea>

<!-- Positive variant -->
<textarea class="positive" placeholder="Positive"></textarea>

<!-- Negative variant -->
<textarea class="negative" placeholder="Negative"></textarea>
```

::: frame col gap-4
<textarea class="brand" placeholder="Brand"></textarea>
<textarea class="accent" placeholder="Accent"></textarea>
<textarea class="positive" placeholder="Positive"></textarea>
<textarea class="negative" placeholder="Negative"></textarea>
:::

</div>

---

### Size

<div x-code-group>

```html copy
<!-- Small variant -->
<textarea class="sm" placeholder="Small"></textarea>

<!-- Large variant -->
<textarea class="lg" placeholder="Large"></textarea>
```

::: frame col gap-4
<textarea class="sm" placeholder="Small"></textarea>
<textarea class="lg" placeholder="Large"></textarea>
:::

</div>

---

### Appearance

<div x-code-group>

```html copy
<!-- No background until hover -->
<textarea class="ghost" placeholder="Ghost"></textarea>

<!-- Border included -->
<textarea class="outlined" placeholder="Outlined"></textarea>

<!-- No background at all -->
<textarea class="transparent" placeholder="Transparent"></textarea>
```

::: frame col gap-4
<textarea class="ghost" placeholder="Ghost"></textarea>
<textarea class="outlined" placeholder="Outlined"></textarea>
<textarea class="transparent" placeholder="Transparent"></textarea>
:::

</div>

---

## Resizing

### Drag Handle

The CSS <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/resize" target="_blank">resize</a> property or Tailwind's <a href="https://tailwindcss.com/docs/resize" target="_blank">resize</a> utility can be used to control the textarea's resizing behavior with a manual drag handle.

<div x-code-group>

```html copy
<textarea placeholder="Resize in any direction" class="resize"></textarea>
```

::: frame
<textarea placeholder="Resize in any direction" class="resize"></textarea>
:::

</div>

---

### Automatic

The CSS property <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing" target="_blank">field-sizing: content</a> or Tailwind's <a href="https://tailwindcss.com/docs/field-sizing" target="_blank">field-sizing-content</a> utility allow a textarea to auto-resize from its minimum height to fit all content.

<div x-code-group>

```html copy
<textarea placeholder="Type to resize" class="field-sizing-content"></textarea>
```

::: frame
<textarea placeholder="Type to resize" class="field-sizing-content"></textarea>
:::

</div>

If a resize drag handle is applied and interacted with, the manually-set height will override automatic resizing.

---

## Labels

::: brand icon="lucide:info"
These styles are included in `manifest.css`, or the standalone `manifest.form.css`.
:::

Placing the textarea and text inside a `<label>` automatically stacks them with spacing.

<div x-code-group>

```html copy
<label>
    Message
    <textarea placeholder="Enter your message"></textarea>
</label>
```

::: frame
<label>
    Message
    <textarea placeholder="Enter your message"></textarea>
</label>
:::

</div>

To horizontally inline the label text with the textarea, place the text in a `<data>` element. This is used as a CSS hook with no semantic impact.

<div x-code-group>

```html copy
<label>
    <data>Message</data>
    <textarea placeholder="Enter your message"></textarea>
</label>
```

::: frame
<label>
    <data>Message</data>
    <textarea placeholder="Enter your message"></textarea>
</label>
:::

</div>

---

## Validation

Textareas support native HTML5 validation through `required`, `minlength`, and `maxlength` attributes. Style the invalid and valid states with Tailwind pseudo-class variants.

<div x-code-group>

```html copy
<textarea required minlength="10"
    class="user-invalid:border-negative-surface user-valid:border-positive-surface"></textarea>
```

::: frame
<textarea required minlength="10" placeholder="At least 10 characters" class="user-invalid:border-negative-surface user-valid:border-positive-surface"></textarea>
:::

</div>

Prefer `user-invalid:` and `user-valid:` over the unprefixed `invalid:` and `valid:`. They wait until the user has actually engaged with the field. See [forms](/docs/elements/forms#validation) for the full variant reference and inline-message patterns.

---

## Styles

### Theme

Default textareas use the following [theme](/docs/styles/theme) variables:

| Variable | Purpose |
|----------|---------|
| `--color-field-surface`{copy} | Textarea background color |
| `--color-field-surface-hover`{copy} | Textarea hover/active background color |
| `--color-field-inverse`{copy} | Text and selection highlight color |
| `--spacing-field-padding`{copy} | Padding for textarea content |
| `--radius`{copy} | Border radius for textarea corners |
| `--transition`{copy} | Transition for interactive states |

---

### Customization

Modify base textarea styles with custom CSS for the `textarea` selector.

<div x-code-group>

```css copy
textarea {
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
textarea.custom {
    background-color: #f0f8ff;
    border: 2px solid #3b82f6;
    border-radius: 8px;
    color: #1e40af;
}

textarea.custom::placeholder {
    color: #60a5fa;
}

textarea.custom:focus-visible {
    border-color: #1d4ed8;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>

<textarea class="custom" placeholder="Custom Textarea"></textarea>
:::

</div>

