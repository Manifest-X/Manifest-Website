# Buttons

Interactive elements that trigger actions.

---

## Setup

Button styles are included in Manifest CSS or a standalone stylesheet, both referencing [theme](/docs/styles/theme) variables.

<div x-code-group copy>

```html "Manifest CSS"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.css" />
```

```html "Standalone"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.button.css" />
```

</div>

---

## Default

<div x-code-group>

```html copy
<button>Button</button>
```

::: frame
<button>Button</button>
:::

</div>

The button's appearance is determined by these top-level factors:
- **Sizing:** Buttons horizontally size to their content unless overridden, with the minimum size being a square.
- **Content alignment:** Buttons use `display: inline-flex` with centered content by default. Flexbox properties like Tailwind's `justify-start` modify content alignment.
- **Truncation:** To truncate overflowing text with ellipsis, place it in an internal `<span>`.

<div x-code-group>

```html copy
<!-- Fit to content, or square -->
<button>!</button>

<!-- Modify alignment -->
<button class="flex-1 justify-start">Starting Alignment</button>

<!-- Truncate text -->
<button class="flex-1">
    <span>Truncated lorem ipsum dolor sit amet</span>
</button>
```

::: frame row-wrap gap-2
<button>!</button>
<button class="flex-1 justify-start">Starting Alignment</button>
<button class="flex-1">
    <span>Truncated lorem ipsum dolor sit amet</span>
</button>
:::

</div>

---

## Utilities

Buttons accept Manifest [utility](/docs/styles/utilities) classes, which can be stacked in any combination.

### Colors

<div x-code-group>

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

::: frame row-wrap gap-2
<button class="brand">Brand</button>
<button class="accent">Accent</button>
<button class="positive">Positive</button>
<button class="negative">Negative</button>
:::

</div>

---

### Size

<div x-code-group>

```html copy
<!-- Small variant -->
<button class="sm">Small</button>

<!-- Large variant -->
<button class="lg">Large</button>
```

::: frame row-wrap gap-2
<button class="sm">Small</button>
<button class="lg">Large</button>
:::

</div>

---

### Appearance

<div x-code-group>

```html copy
<!-- No background until hover -->
<button class="ghost">Ghost</button>

<!-- Border included -->
<button class="outlined">Outlined</button>

<!-- No background at all -->
<button class="transparent">Transparent</button>

<!-- No padding for minimal target area, best paired with transparency -->
<button class="hug transparent">Hug</button>
```

::: frame row-wrap items-center gap-2
<button class="ghost">Ghost</button>
<button class="outlined">Outlined</button>
<button class="transparent">Transparent</button>
<button class="hug transparent">Hug</button>
:::

</div>

---

## Icons

### Solo Icon

Buttons containing a single [icon](/docs/elements/icons) are automatically squared. Add `aria-label` so screen readers can announce what the button does — icons alone have no accessible name.

<div x-code-group>

```html copy
<button x-icon="ph:house" aria-label="Home"></button>
```

::: frame
<button x-icon="ph:house" aria-label="Home"></button>
:::

</div>

---

### Icon & Text

Any number of icons and text can be nested in any order. Place icons in `<span>` tags and any sibling elements will auto-space.

<div x-code-group>

```html copy
<button><span x-icon="ph:house"></span> Home</button>
<button><span x-icon="ph:house"></span><span>Home</span></button>
```

::: frame row-wrap gap-2
<button><span x-icon="ph:house"></span> Home</button>
<button><span x-icon="ph:house"></span><span>Home</span></button>
:::

</div>

---

## Links

For button links, use `<a role="button">`. Modifier classes above can also be applied.

<div x-code-group>

```html copy
<a role="button" href="#">Learn more</a>
<a role="button" href="#" class="brand">Try now</a>
```

::: frame row-wrap gap-2
<a role="button" href="#">Learn more</a>
<a role="button" href="#" class="brand">Try now</a>
:::

</div>

---

## File Uploads

Manifest hides the `type="file"` input since it lacks modern style control. To visualize it as a button, place it inside a label with `role="button"` alongside any icons or text.

<div x-code-group>

```html copy
<label role="button">
    <input type="file" />
    <span x-icon="lucide:upload"></span>
    Upload
</label>
```

::: frame row-wrap gap-2 justify-start
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

Placing the button and text inside a `<label>` automatically stacks them with spacing.

<div x-code-group>

```html copy
<label>
    Action
    <button>Submit</button>
</label>
```

::: frame
<label>
    Action
    <button>Submit</button>
</label>
:::

</div>

To horizontally inline the label text with the button, place the text in a `<data>` element. This is used as a CSS hook with no semantic impact.

<div x-code-group>

```html copy
<label>
    <data>Action</data>
    <button>Submit</button>
</label>
```

::: frame
<label>
    <data>Action</data>
    <button>Submit</button>
</label>
:::

</div>

---

### Groups

Horizontally group buttons, inputs, or selects together with a `role="group"` attribute added to the parent container.

<div x-code-group>

```html copy
<div role="group">
    <input placeholder="Insert email"/>
    <button class="brand">Signup</button>
</div>
```

::: frame
<div role="group">
    <input placeholder="Insert email"/>
    <button class="brand">Signup</button>
</div>
:::

</div>

When these elements are grouped, only the outer elements' outer corners retain their border radii for a seamless appearance.

---

## Styles

### Theme

Default buttons use the following [theme](/docs/styles/theme) variables:

| Variable | Purpose |
|----------|---------|
| `--color-field-surface`{copy} | Button background color |
| `--color-field-surface-hover`{copy} | Button hover/active background color |
| `--color-field-inverse`{copy} | Button text color |
| `--spacing-field-height`{copy} | Button height and min-width |
| `--spacing-field-padding`{copy} | Horizontal padding for button content |
| `--radius`{copy} | Border radius for button corners |
| `--transition`{copy} | Transition for interactive states |

---

### Customization

Modify base button styles with custom CSS for the `button` selector.

<div x-code-group>

```css copy
button {
    color: white;
    background-color: black;
    border: 1px solid white;
    border-radius: 100px;
}
```

::: frame
<style>
button.custom {
    color: white;
    background-color: black;
    border: 1px solid white;
    border-radius: 100px;
}
</style>

<button class="custom">Custom Button</button>
:::

</div>