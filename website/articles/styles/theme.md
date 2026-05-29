# Theme
Global colors, spacing, typography, and more via CSS custom properties.

---

## Overview

Manifest centralizes project theme management with a curated set of CSS variables, sometimes referred to as design tokens. These variables are referenced throughout Manifest's base HTML styles, utility classes, and can be compiled as custom utility classes—establishing your project's consistent visual identity with minimal code.

::: brand icon="lucide:info"
Many Manifest styles reference the theme. If the theme file or a variable within is unavailable, affected styles use a static fallback value.
:::

---

## Setup

Apply the theme alongside `manifest.css` or standalone sheets. The default version is available through CDN for previewing:

<div x-code-group copy>

```html "Manifest CSS"
<!-- Theme -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.theme.css">

<!-- manifest.css -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.css">
```

```html "Standalone"
<!-- Theme -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.theme.css">

<!-- Tailwind color palette (red, orange, yellow, … as `--color-<name>-<shade>` variables) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.colors.css">

<!-- Examples of standalone styles with theme references -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.button.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.utilities.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.typography.css">
```

</div>

Modify the theme by saving it as a local file from <a href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.theme.css" target="_blank">jsDelivr</a> or <a href="https://github.com/Manifest-X/Manifest/tree/master/lib/manifest.theme.css" target="_blank">GitHub</a>, or copy it here:

```css "manifest.theme.css" copy lines collapse="10"
:root,
::selection {

    /* Light mode */
    --color-page: var(--color-neutral-50);
    --color-surface-1: var(--color-neutral-100);
    --color-surface-2: var(--color-neutral-200);
    --color-surface-3: var(--color-neutral-300);
    --color-content-stark: var(--color-neutral-900);
    --color-content-neutral: var(--color-neutral-600);
    --color-content-subtle: var(--color-neutral-500);
    --color-field-surface: var(--color-neutral-300);
    --color-field-surface-hover: var(--color-neutral-400);
    --color-field-inverse: var(--color-content-stark);
    --color-popover-surface: var(--color-page);
    --color-line: color-mix(var(--color-content-stark) 11%, transparent);
    --color-brand-surface: var(--color-yellow-300);
    --color-brand-surface-hover: var(--color-yellow-400);
    --color-brand-inverse: var(--color-yellow-700);
    --color-brand-content: var(--color-yellow-600);
    --color-accent-surface: var(--color-neutral-900);
    --color-accent-surface-hover: var(--color-neutral-700);
    --color-accent-inverse: var(--color-neutral-50);
    --color-accent-content: var(--color-neutral-900);
    --color-positive-surface: var(--color-green-300);
    --color-positive-surface-hover: var(--color-green-400);
    --color-positive-inverse: var(--color-green-800);
    --color-positive-content: var(--color-green-600);
    --color-negative-surface: var(--color-red-300);
    --color-negative-surface-hover: var(--color-red-400);
    --color-negative-inverse: var(--color-red-800);
    --color-negative-content: var(--color-red-600);

    /* Fonts */
    --font-sans: Inter, ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';

    /* Sizes */
    --radius: 0.5rem;
    --spacing: 0.25rem;
    --spacing-content-width: 74rem;
    --spacing-field-padding: calc(var(--spacing) * 2.5);
    --spacing-field-height: calc(var(--spacing) * 9);
    --spacing-popover-offset: calc(var(--spacing) * 2);
    --spacing-resize-handle: 1rem;
    --spacing-viewport-padding: 5vw;

    /* Effects */
    --transition: all .05s ease-in-out;
    --tooltip-hover-delay: .5s;
    --view-transition-duration: 200ms;
    --view-transition-easing: cubic-bezier(0.4, 0, 0.2, 1);

    /* Icons */
    --icon-accordion: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 256 256'%3E%3Cpath fill='%23000' d='m184.49 136.49l-80 80a12 12 0 0 1-17-17L159 128L87.51 56.49a12 12 0 1 1 17-17l80 80a12 12 0 0 1-.02 17'/%3E%3C/svg%3E");
    --icon-checkbox: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='currentColor' d='m0 11l2-2l5 5L18 3l2 2L7 18z'/%3E%3C/svg%3E");
    --icon-toast-dismiss: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M18 6L6 18M6 6l12 12'/%3E%3C/svg%3E");
}

/* Dark mode overrides */
.dark {
    --color-page: var(--color-neutral-950);
    --color-surface-1: var(--color-neutral-900);
    --color-surface-2: var(--color-neutral-800);
    --color-surface-3: var(--color-neutral-700);
    --color-field-surface: var(--color-neutral-700);
    --color-field-surface-hover: var(--color-neutral-600);
    --color-popover-surface: var(--color-neutral-800);
    --color-content-stark: var(--color-neutral-50);
    --color-content-neutral: var(--color-neutral-400);
    --color-content-subtle: var(--color-neutral-500);
    --color-brand-surface: var(--color-yellow-400);
    --color-brand-surface-hover: var(--color-yellow-500);
    --color-brand-inverse: var(--color-yellow-800);
    --color-brand-content: var(--color-yellow-500);
    --color-accent-surface: var(--color-neutral-50);
    --color-accent-surface-hover: var(--color-neutral-200);
    --color-accent-inverse: var(--color-neutral-900);
    --color-accent-content: var(--color-neutral-50);
    --color-positive-surface: var(--color-green-400);
    --color-positive-surface-hover: var(--color-green-500);
    --color-positive-inverse: var(--color-green-900);
    --color-positive-content: var(--color-green-500);
    --color-negative-surface: var(--color-red-400);
    --color-negative-surface-hover: var(--color-red-500);
    --color-negative-inverse: var(--color-red-900);
    --color-negative-content: var(--color-red-500);
}

@font-face {
    font-family: 'Inter';
    src: url('/assets/fonts/Inter.woff2') format('woff2');
    font-weight: 400 500 600 700;
    font-display: swap
}

@layer base {

    /* Default font and colors */
    :where(html),
    :host {
        line-height: 1.5;
        font-family: var(--font-sans);
        color: var(--color-content-stark, inherit);
        background-color: var(--color-page, inherit)
    }

    /* Text selection */
    ::selection {
        background-color: color-mix(currentColor 25%, transparent)
    }

    /* Focus state */
    :where(:focus-visible, label:has(input[type=search], input[type=file]):focus-within) {
        outline: none;
        box-shadow: 0 0 0 2px color-mix(var(--color-content-stark) 30%, transparent)
    }
}
```

---

## Theme Variables

::: brand icon="lucide:info"
Certain variable names use namespace prefixes like `--color-` to automatically generate utility classes in projects using [Tailwind v4+](https://tailwindcss.com/docs/theme#theme-variable-namespaces). Examples are provided below.
:::

### Color Palette

In the default theme, all purpose-specific color variables reference downstream variables from the <a href="https://tailwindcss.com/docs/colors" target="_blank" rel="noopener">Tailwind palettes</a>, bundled into `manifest.min.css`. Reference any Tailwind color in your own CSS (e.g. `--color-neutral-500`) without re-declaring values. The default theme makes use of the following palettes:

- `neutral` for content, surfaces, and accent colors.
- `yellow` for brand colors.
- `green` for positive colors.
- `red` for negative colors.

The fastest way to customize your theme is to find and replace these default color names with any others in the Tailwind palette. Alternatively, consider <a href="https://uicolors.app/generate" target="_blank" rel="noopener">generating your own</a> palettes.

---

### Theme Colors
See [color modes](/docs/styles/color-modes) for more information on setting up light and dark themes. Light/default color variables are established in a `:root`, while equivalent dark variable values go in a standalone  `.dark` style.

| Variable | Purpose | Ex. Tailwind Utilities |
|----------|---------|-------------------|
| `--color-page`{copy} | Page background color | `bg-page`<br/>`text-page` |
| `--color-surface-1`{copy} | Initial surface background | `bg-surface-1` |
| `--color-surface-2`{copy} | Next surface background | `bg-surface-2` |
| `--color-surface-3`{copy} | Last surface background | `bg-surface-3` |
| `--color-content-stark`{copy} | High contrast text color | `text-content-stark` |
| `--color-content-neutral`{copy} | Medium contrast text color | `text-content-neutral` |
| `--color-content-subtle`{copy} | Low contrast text color | `text-content-subtle` |
| `--color-field-surface`{copy} | Background color for interactive elements | `bg-field-surface` |
| `--color-field-surface-hover`{copy} | Hover state background for interactive elements | `hover:bg-field-surface-hover` |
| `--color-field-inverse`{copy} | Content color for interactive elements | `text-field-inverse` |
| `--color-popover-surface`{copy} | Dialog and dropdown background | `bg-popover-surface` |
| `--color-line`{copy} | Border and divider color | `border-line` |

---

### Semantic Colors
These semantic colors are easily applied to text, backgrounds, and certain form elements using the Manifest [utility](/docs/styles/utilities) classes `brand`, `accent`, `positive`, and `negative`.

| Variable | Purpose | Ex. Tailwind Utilities |
|----------|---------|-------------------|
| `--color-brand-surface`{copy} | Brand background color | `bg-brand`<br/>`border-brand` |
| `--color-brand-surface-hover`{copy} | Brand hover state background | `hover:bg-brand-surface-hover` |
| `--color-brand-inverse`{copy} | Content color on brand backgrounds | `text-brand-inverse` |
| `--color-brand-content`{copy} | Brand text color | `text-brand-content` |
| `--color-accent-surface`{copy} | Accent background color | `bg-accent`<br/>`border-accent` |
| `--color-accent-surface-hover`{copy} | Accent hover state background | `hover:bg-accent-hover` |
| `--color-accent-inverse`{copy} | Content color on accent backgrounds | `text-accent-inverse` |
| `--color-accent-content`{copy} | Accent text color | `text-accent-content` |
| `--color-positive-surface`{copy} | Positive background color | `bg-positive`<br/>`border-positive` |
| `--color-positive-surface-hover`{copy} | Positive hover state background | `hover:bg-positive-hover` |
| `--color-positive-inverse`{copy} | Content color on positive backgrounds | `text-positive-inverse` |
| `--color-positive-content`{copy} | Positive text color | `text-positive-content` |
| `--color-negative-surface`{copy} | Negative background color | `bg-negative`<br/>`border-negative` |
| `--color-negative-surface-hover`{copy} | Negative hover state background | `hover:bg-negative-hover` |
| `--color-negative-inverse`{copy} | Content color on negative backgrounds | `text-negative-inverse` |
| `--color-negative-content`{copy} | Negative text color | `text-negative-content` |

---

### Spacing & Sizing
| Variable | Purpose | Ex. Tailwind Utilities |
|----------|---------|-------------------|
| `--radius`{copy} | Default border radius | — |
| `--spacing`{copy} | Base spacing unit | `p-1` `m-1` `gap-1` |
| `--spacing-content-width`{copy} | Maximum content width in [utility](/docs/styles/utilities) styles | `max-w-content-width` |
| `--spacing-field-padding`{copy} | Form field padding | `p-field-padding` |
| `--spacing-field-height`{copy} | Form field height | `h-field-height` |
| `--spacing-popover-offset`{copy} | Dropdown & tooltip positioning offset | `mt-dropdown-offset` |
| `--spacing-resize-handle`{copy} | [Resize](/docs/core-plugins/resize) handle width | `w-resize-handle` |
| `--spacing-viewport-padding`{copy} | Viewport padding for responsive design  in [utility](/docs/styles/utilities) styles | `px-viewport-padding` |

---

### Effects
| Variable | Purpose | Ex. Tailwind Utilities |
|----------|---------|-------------------|
| `--transition`{copy} | Default form element transition timing | — |
| `--tooltip-hover-delay`{copy} | [Tooltip](/docs/elements/tooltips) hover delay timing | — |
| `--view-transition-duration`{copy} | [Page transition](/docs/publishing/websites) duration for prerendered MPAs | — |
| `--view-transition-easing`{copy} | [Page transition](/docs/publishing/websites) easing for prerendered MPAs | — |

---

### Fonts
| Variable | Purpose | Ex. Tailwind Utilities |
|----------|---------|-------------------|
| `--font-sans`{copy} | Default sans-serif font stack | `font-sans` |

---

### Icons
| Variable | Purpose | Ex. Tailwind Utilities |
|----------|---------|-------------------|
| `--icon-accordion`{copy} | [Accordion](/docs/elements/accordions) expand/collapse icon | — |
| `--icon-checkbox`{copy} | [Checkbox](/docs/elements/checkboxes) checked state icon | — |
| `--icon-toast-dismiss`{copy} | [Toast](/docs/elements/toasts) notification dismiss icon | — |

---

## Custom Utilities

Theme variables can be compiled into Tailwind-style custom utility classes using Manifest's utilities plugin. It's included in `manifest.js` with all core plugins, or can be selectively loaded.

<div x-code-group copy>

```html "All Plugins (default)"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Selective"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="utilities"></script>
```

</div>


### Application

Any declared CSS variables throughout your project can be compiled into utility classes, provided they use Tailwind <a href="https://tailwindcss.com/docs/theme#theme-variable-namespaces" target="_blank" rel="noopener">namespace</a> prefixes like `--color-` or `--spacing-`. For example:

```css
:root {
    --color-brand-surface: red;
}
```

...can compile into classes like:

```css
.bg-brand { background-color: red; }
.text-brand { color: red; }
.border-brand { border-color: red; }
```

The runtime compiler is highly optimized for performance. Running concurrent to other page load events, it only generates styles for classes used in the current DOM view, and leverages caching to avoid redundant work.

For performance optimization, any non-Manifest stylesheets served over CDN are ignored. As a result, updating the generated `<style>` tag in the head is nearly instantaneous, with average execution time being 30-60ms.

---

### Tailwind Integration

The utility plugin operates independently, but follows Tailwind naming patterns and is designed to pair well with <a href="https://tailwindcss.com/docs/installation/play-cdn" target="_blank" rel="noopener">Play CDN</a>, a client-side version of Tailwind.

While it's not advertised for production use, Play CDN aligns with Manifest's ethos of being plug-and-play with no build steps, and has a typically negligible performance impact.

`manifest.js` can load a modified version of Play CDN that removes Tailwind's Preflight styles in favor of our [reset](/docs/styles/reset) styles. It also removes a console warning about using Play CDN in production. Add the `data-tailwind` attribute to access it.

<div x-code-group copy>

```html "With Manifest"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-tailwind></script>
```

```html "With Play CDN"
<!-- Tailwind Play CDN -->
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

<!-- Manifest -->
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

</div>

Alternatively, Tailwind can be <a href="https://tailwindcss.com/docs/installation/using-vite" target="_blank" rel="noopener">directly installed</a>. It uses a build step to compile CSS variables (from `@theme { ... }` rules) into CSS utility classes, making Manifest's utility plugin redundant.