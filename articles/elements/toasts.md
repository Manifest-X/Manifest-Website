# Toasts

Transient notifications anchored to the viewport.

---

## Setup

Toast styles are included in Manifest CSS or a standalone stylesheet, both referencing [theme](/docs/styles/theme) variables.

Toast functionality is included in `manifest.js` with all core plugins, or it can be selectively loaded.

<div x-code-group copy>

```html "Manifest CSS / JS"
<!-- Manifest CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.css" />

<!-- Manifest JS -->
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Standalone"
<!-- Toast styles only -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.toast.css" />

<!-- Manifest JS: toasts plugin only -->
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
  data-plugins="toasts"></script>
```

</div>

---

## Default

Toasts can be triggered from any element using the `x-toast` directive, with its value being the content. They automatically disappear after 3 seconds, though the timer will pause on hover. Toasts will stack if multiple are triggered concurrently.

<div x-code-group>

```html copy
<button x-toast="This is a basic toast notification">Show Toast</button>
```

::: frame
<button x-toast="This is a basic toast notification">Show Toast</button>
:::

</div>

---

## Modifiers

### Colors

Color modifiers provide unique visual context.

<div x-code-group>

```html copy
<button x-toast="Default toast notification">Default</button>
<button x-toast.brand="Brand toast notification">Brand</button>
<button x-toast.accent="Accent toast notification">Accent</button>
<button x-toast.positive="Operation completed successfully">Positive</button>
<button x-toast.negative="Something went wrong">Negative</button>
```

::: frame row-wrap gap-4
<button x-toast="Default toast notification">Default</button>
<button x-toast.brand="Brand toast notification">Brand</button>
<button x-toast.accent="Accent toast notification">Accent</button>
<button x-toast.positive="Operation completed successfully">Positive</button>
<button x-toast.negative="Something went wrong">Negative</button>
:::

</div>

---

### Duration

A number sets how long the toast remains visible in milliseconds.

<div x-code-group>

```html copy
<button x-toast.1000="Dismisses after 1 second">1 Second</button>
<button x-toast="Default 3 seconds">Default</button>
<button x-toast.5000="Dismisses after 5 seconds">5 Seconds</button>
```

::: frame row-wrap gap-4
<button x-toast.1000="Dismisses after 1 second">1 Second</button>
<button x-toast="Default 3 seconds">Default</button>
<button x-toast.5000="Dismisses after 5 seconds">5 Seconds</button>
:::

</div>

---

### Dismiss

The dismiss modifier enables manual closing.

<div x-code-group>

```html copy
<button x-toast.dismiss="Can be manually dismissed">Dismissible</button>
<button x-toast.positive.dismiss="Positive with dismiss button">Positive Dismissible</button>
<button x-toast.negative.dismiss="Negative with dismiss button">Negative Dismissible</button>
```

::: frame row-wrap gap-4
<button x-toast.dismiss="Can be manually dismissed">Dismissible</button>
<button x-toast.positive.dismiss="Positive with dismiss button">Positive Dismissible</button>
<button x-toast.negative.dismiss="Negative with dismiss button">Negative Dismissible</button>
:::

</div>

---

### Fixed

The fixed modifier prevents the default auto-dismiss behavior and adds the dismiss button by default.

<div x-code-group>

```html copy
<button x-toast.fixed="Stays until manually closed">Fixed</button>
<button x-toast.positive.fixed="Fixed positive notification">Fixed Positive</button>
<button x-toast.negative.fixed="Fixed negative notification">Fixed Negative</button>
```

::: frame row-wrap gap-4
<button x-toast.fixed="Stays until manually closed">Fixed</button>
<button x-toast.positive.fixed="Fixed positive notification">Fixed Positive</button>
<button x-toast.negative.fixed="Fixed negative notification">Fixed Negative</button>
:::

</div>

---

### Combined

Combine different modifiers for complex toast behaviors.

<div x-code-group>

```html copy
<button x-toast.negative.dismiss.2000="Negative toast with 2s duration and dismiss button">Negative + Dismiss + 2s</button>
<button x-toast.positive.fixed="Positive toast that stays until dismissed">Positive + Fixed</button>
```

::: frame row-wrap gap-4
<button x-toast.negative.dismiss.2000="Negative toast with 2s duration and dismiss button">Negative + Dismiss + 2s</button>
<button x-toast.positive.fixed="Positive toast that stays until dismissed">Positive + Fixed</button>
:::

</div>

---

## Magic Method

Use the `$toast` magic method for programmatic toast creation.

<div x-code-group>

```html copy
<button @click="$toast('Programmatic toast')">Basic Magic</button>
<button @click="$toast.brand('Brand via magic method')">Brand Magic</button>
<button @click="$toast.positive('Positive via magic method')">Positive Magic</button>
<button @click="$toast.negative('Negative via magic method')">Negative Magic</button>
<button @click="$toast.negative.fixed('Fixed negative toast')">Fixed Negative Magic</button>
```

::: frame row-wrap gap-4
<button @click="$toast('Programmatic toast')">Basic Magic</button>
<button @click="$toast.brand('Brand via magic method')">Brand Magic</button>
<button @click="$toast.positive('Positive via magic method')">Positive Magic</button>
<button @click="$toast.negative('Negative via magic method')">Negative Magic</button>
<button @click="$toast.negative.fixed('Fixed negative toast')">Fixed Negative Magic</button>
:::

</div>

---

## Rich Content

Rich content supports HTML including [icons](/docs/elements/icons) for enhanced formatting.

<div x-code-group>

```html copy
<button x-toast="<span x-icon='lucide:info'></span>Hello <b>bold</b> and <em>italic</em> world">Rich Content</button>
```

::: frame
<button x-toast.fixed="<span x-icon='lucide:info'></span>Hello <b>bold</b> and <em>italic</em> world">Rich Content</button>
:::

</div>

---

## Dynamic Expressions

Toast content can include dynamic expressions and variables.

<div x-code-group>

```html copy
<button x-data="{ count: 0 }" @click="count++; $toast(`Button clicked ${count} times`)">
    Dynamic Count (<span x-text="count"></span>)
</button>

<button x-toast="`Current time: ${new Date().toLocaleTimeString()}`">
    Current Time
</button>
```

::: frame row-wrap gap-4
<button x-data="{ count: 0 }" @click="count++; $toast(`Button clicked ${count} times`)">
    Dynamic Count (<span x-text="count"></span>)
</button>

<button x-toast="`Current time: ${new Date().toLocaleTimeString()}`">
    Current Time
</button>
:::

</div>

---

## Dynamic Data

Toasts can retrieve content from [data sources](/docs/core-plugins/local-data) using the `$x` syntax.

<div x-code-group copy>

```html "HTML"
<button x-toast="$x.example.toast">Data Source Toast</button>
```

```json "example.json"
{
    "toast": "This content comes from a data source"
}
```

::: frame
<button x-toast="$x.example.toast">Data Source Toast</button>
:::

</div>

---

## Styles

### Theme

Default toasts use the following [theme](/docs/styles/theme) variables:

| Variable | Purpose |
|----------|----------|
| `--color-popover-surface`{copy} | Default toast background color |
| `--color-content-stark`{copy} | Default toast text color |
| `--spacing`{copy} | Base spacing unit for gaps and padding |
| `--radius`{copy} | Border radius for toast corners |

---

### Dismiss Button Icon

The dismiss button icon is an encoded SVG in the toast style's `--icon-toast-dismiss` variable. To modify it:
1. Choose a desired icon from <a href="https://icon-sets.iconify.design/" target="_blank">Iconify</a> or other SVG icon source.
2. Copy the encoded SVG string (in Iconify, go to an icon's CSS tab and find the `--svg` value). Otherwise, use an <a href="https://yoksel.github.io/url-encoder/" target="_blank">SVG encoder</a>.
3. Overwrite the `--icon-toast-dismiss` variable value with the encoded SVG string.

```css "Default toast dismiss icon" copy
:root {
    --icon-toast-dismiss: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M18 6L6 18M6 6l12 12'/%3E%3C/svg%3E")
}
```

---

### Customization

Modify styles with custom CSS for various toast classes.

```css numbers copy
/* Parent wrapper for multiple toasts */
.toast-container { 
    position: fixed;
    top: 3rem;
    left: auto;
    right: 3rem;
}

/* Toast */
.toast { 
    background: white;

    /* Content area */
    .toast-content { 
        font-size: 1rem; 
    }

    /* Dismiss button */
    .toast-dismiss-button { 
        color: gray; 
    }
}

/* Entry animation */
.toast-entry { 
    opacity: 1; 
}

/* Exit animation */
.toast-exit { 
    opacity: 0; 
}
```