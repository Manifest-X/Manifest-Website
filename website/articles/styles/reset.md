# Reset

Normalize styles for consistent rendering across browsers.

---

## Overview

Manifest provides a modern CSS reset and normalization library that ensures consistent rendering across browsers. It's based on <a href="https://necolas.github.io/normalize.css/" target="_blank" rel="noopener">Normalize.css</a> and <a href="https://tailwindcss.com/docs/preflight" target="_blank" rel="noopener">Tailwind's Preflight</a>, with additional optimizations for modern web development.

---

## Setup

Reset styles are available in the full Manifest CSS library, or as a standalone stylesheet.

<div x-code-group copy>

```html "Manifest CSS"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.css">
```

```html "Standalone"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.reset.css">
```

</div>

Reset styles have no required dependencies, and can be used as-is in any project or framework. When the [theme](/docs/framework/styles/theme) is present, they pick up `--color-line` and the view-transition variables from it.

---

## Key Features

- **Element Reset** - Removes default margins, padding, and browser inconsistencies.
- **Form Normalization** - Standardizes buttons, inputs, selects, and form controls.
- **Typography Optimization** - Optimizes text rendering, font smoothing, and size adjustments.
- **Modern Feature Support** - Handles popovers and other contemporary CSS features.
- **Performance & UX** - Hides `[x-cloak]` elements until Alpine starts, and cuts animations and transitions short under `prefers-reduced-motion`.
- **Cross-Browser Compatibility** - Normalizes rendering across all major browsers.
- **Accessibility** - Dims and blocks `[disabled]` and `[aria-disabled=true]` elements, and gives `[aria-controls]` triggers a pointer cursor.

Add the `unstyle` class to an element to opt it out of Manifest styles — see [utilities](/docs/framework/styles/utilities#miscellaneous).