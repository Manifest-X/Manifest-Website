# Reset

Normalize styles for consistent rendering across browsers.

---

## Overview

Indux's <code>reset.css</code> provides a modern CSS reset and normalization library or styles that ensures consistent rendering across browsers. It's based on <a href="https://necolas.github.io/normalize.css/" target="_blank" rel="noopener">Normalize.css</a> and <a href="https://tailwindcss.com/docs/preflight" target="_blank" rel="noopener">Tailwind's Preflight</a>, with additional optimizations for modern web development.

---

## Setup

Reset styles are available in the full Indux CSS library, or as a standalone stylesheet for independent use.

<x-code-group copy>

```html "Indux CSS"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@indux/indux@latest/dist/indux.min.css">
```

```html "Standalone"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@indux/indux@latest/dist/indux.reset.css">
```

</x-code-group>

Reset styles have no dependencies or theme references, and can be used as-is in any project or framework.

---

## Key Features

- **Element Reset** - Removes default margins, padding, and browser inconsistencies.
- **Form Normalization** - Standardizes buttons, inputs, selects, and form controls.
- **Typography Optimization** - Optimizes text rendering, font smoothing, and size adjustments.
- **Modern Feature Support** - Handles popovers and other contemporary CSS features
- **Performance & UX** - Prevents page load flicker and supports reduced motion preferences.
- **Cross-Browser Compatibility** - Normalizes rendering across all major browsers.
- **Accessibility** - Includes ARIA support and focus management improvements.