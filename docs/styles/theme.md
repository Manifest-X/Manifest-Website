# Theme
Easy and scalable global style management.

---

## Overview

Indux centralizes project theme management with a curated set of CSS variables, sometimes referred to as design tokens. These variables are referenced throughout Indux's base HTML styles, common utility classes, and can be compiled as custom utilities—establishing your project's attractive and consistent visual identity with minimal code.

::: brand icon="lucide:info"
Most Indux stylesheets reference the theme's CSS variables. If a variable is removed, affected styles will use a static fallback value.
:::

---

## Setup

The theme is available in the full Indux CSS library, or as a standalone stylesheet for use with specific elements or utilities.

<x-code-group copy>

```html "Indux CSS"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.css">
```

```html "Standalone"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.theme.css">

<!-- Examples of standalone styles with theme references -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.buttons.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.utilities.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.typography.css">
```

</x-code-group>

---

## Theme Variables

::: brand icon="lucide:info"
Certain variable names use namespace prefixes like `--color-` to automatically generate utility classes in projects using [Tailwind v4+](https://tailwindcss.com/docs/theme#theme-variable-namespaces). Examples are provided below.
:::

### Color Palette

In the default theme, all other color variables in both light and dark themes (except primaries, accents, and overlays) make reference to the color palette as a single source of truth. Consider grabbing [alternate palettes](https://tailwindcss.com/docs/colors) or [generating your own](https://uicolors.app/generate).

| Variable | Purpose | Ex. Tailwind Utilities |
|----------|---------|-------------------|
| `--color-50` to<br/> `--color-950` | Base color scale from lightest to darkest | `bg-color-500`<br/>`text-color-700`<br/>`border-color-300` |


### Theme Colors
See [color themes](/plugins/color-themes) for more information on setting up light and dark themes. Use a `.dark { ... }` rule to override default light colors with their dark equivalents.

| Variable | Purpose | Ex. Tailwind Utilities |
|----------|---------|-------------------|
| `--color-page` | Page background color | `bg-page`<br/>`text-page` |
| `--color-surface-1` | Initial surface background | `bg-surface-1` |
| `--color-surface-2` | Next surface background | `bg-surface-2` |
| `--color-surface-3` | Last surface background | `bg-surface-3` |
| `--color-content-stark` | High contrast text color | `text-content-stark` |
| `--color-content-neutral` | Medium contrast text color | `text-neutral` |
| `--color-content-subtle` | Low contrast text color | `text-content-subtle` |
| `--color-field-surface` | Background color for interactive elements | `bg-field-surface` |
| `--color-field-surface-hover` | Hover state background for interactive elements | `hover:bg-field-surface-hover` |
| `--color-field-inverse` | Content color for interactive elements | `text-field-inverse` |
| `--color-popover-surface` | Modal and dropdown background | `bg-popover-surface` |
| `--color-line` | Border and divider color | `border-line` |

### Semantic Colors
These semantic colors are easily applied to text, backgrounds, and certain form elements using the Indux [utility](/styles/utilities) classes `primary`, `accent`, and `negative`.

| Variable | Purpose | Ex. Tailwind Utilities |
|----------|---------|-------------------|
| `--color-brand-surface` | Brand background color | `bg-brand`<br/>`border-brand` |
| `--color-brand-surface-hover` | Brand hover state background | `hover:bg-brand-surface-hover` |
| `--color-brand-inverse` | Content color on brand backgrounds | `text-brand-inverse` |
| `--color-brand-content` | Brand text color | `text-brand-content` |
| `--color-accent-surface` | Accent background color | `bg-accent`<br/>`border-accent` |
| `--color-accent-surface-hover` | Accent hover state background | `hover:bg-accent-hover` |
| `--color-accent-inverse` | Content color on accent backgrounds | `text-accent-inverse` |
| `--color-accent-content` | Accent text color | `text-accent-content` |
| `--color-negative-surface` | Negative background color | `bg-negative`<br/>`border-negative` |
| `--color-negative-surface-hover` | Negative hover state background | `hover:bg-negative-hover` |
| `--color-negative-inverse` | Content color on negative backgrounds | `text-negative-inverse` |
| `--color-negative-content` | Negative text color | `text-negative-content` |

### Overlay Colors
| Variable | Purpose | Ex. Tailwind Utilities |
|----------|---------|-------------------|
| `--color-overlay-dark` | Dark overlay for banners | `bg-overlay-dark` |
| `--color-overlay-light` | Light overlay for banners | `bg-overlay-light` |

### Spacing & Sizing
| Variable | Purpose | Ex. Tailwind Utilities |
|----------|---------|-------------------|
| `--radius` | Default border radius | — |
| `--spacing` | Base spacing unit | `p-1` `m-1` `gap-1` |
| `--spacing-field-padding` | Form field padding | `p-field-padding` |
| `--spacing-field-height` | Form field height | `h-field-height` |
| `--spacing-popover-offset` | Dropdown & tooltip positioning offset | `mt-dropdown-offset` |

### Effects
| Variable | Purpose | Ex. Tailwind Utilities |
|----------|---------|-------------------|
| `--transition` | Default form element transition timing | — |

### Fonts
| Variable | Purpose | Ex. Tailwind Utilities |
|----------|---------|-------------------|
| `--font-sans` | Default sans-serif font stack | `font-sans` |

---

## Default Values

```css "indux.theme.css" copy numbers
:root,
::selection {
    /* Default palette */
    --color-50: oklch(100% 0 0);
    --color-100: oklch(98.17% 0.0005 95.87);
    --color-200: oklch(96.27% 0.0026 252.34);
    --color-300: oklch(91.79% 0.0029 264.26);
    --color-400: oklch(89.24% 0.0024 12.48);
    --color-500: oklch(67.4% 0.0318 251.27);
    --color-600: oklch(48.26% 0.0365 255.09);
    --color-700: oklch(28.7% 0.030787 270.1);
    --color-800: oklch(20.7% 0.026326 268.7);
    --color-900: oklch(16.6% 0.026 267);
    --color-950: oklch(3.89% 0.0181 262.25);

    /* Light theme */
    --color-page: var(--color-50);
    --color-surface-1: var(--color-100);
    --color-surface-2: var(--color-200);
    --color-surface-3: var(--color-300);
    --color-content-stark: var(--color-900);
    --color-content-neutral: var(--color-600);
    --color-content-subtle: var(--color-500);
    --color-field-surface: var(--color-300);
    --color-field-surface-hover: var(--color-400);
    --color-field-inverse: var(--color-content-stark);
    --color-popover-surface: var(--color-page);
    --color-line: color-mix(in oklch, var(--color-content-stark) 11%, transparent);
    --color-brand-surface: #f6c07b;
    --color-brand-surface-hover: #f19b46;
    --color-brand-inverse: #763518;
    --color-brand-content: #de6618;
    --color-accent-surface: var(--color-900);
    --color-accent-surface-hover: var(--color-700);
    --color-accent-inverse: var(--color-page);
    --color-accent-content: var(--color-content-stark);
    --color-negative-surface: #ef4444;
    --color-negative-surface-hover: #dc2626;
    --color-negative-inverse: white;
    --color-negative-content: var(--color-negative-surface);

    /* Overlays */
    --color-overlay-dark: oklch(50% 0 0);
    --color-overlay-light: oklch(50% 0 100);

    /* Sizes */
    --radius: 0.5rem;
    --spacing: 0.25rem;
    --spacing-field-padding: calc(var(--spacing) * 2.5);
    --spacing-field-height: calc(var(--spacing) * 9);
    --spacing-popover-offset: calc(var(--spacing) * 2);

    /* Effects */
    --transition: all 0.1s ease-in-out;

    /* Fonts */
    --font-sans: ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

/* Dark theme overrides */
.dark {
    --color-page: var(--color-950);
    --color-surface-1: var(--color-900);
    --color-surface-2: var(--color-800);
    --color-surface-3: var(--color-700);
    --color-field-surface: var(--color-700);
    --color-field-surface-hover: var(--color-600);
    --color-popover-surface: var(--color-700);
    --color-content-stark: var(--color-50);
    --color-content-neutral: var(--color-400);
    --color-content-subtle: var(--color-500);
    --color-brand-content: #f6c07b;
    --color-accent-surface: var(--color-50);
    --color-accent-surface-hover: var(--color-100);
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
        background-color: color-mix(in oklch, var(--color-surface-1) 92%, var(--color-content-stark))
    }

    /* Focus state */
    :where(:focus-visible),
    :where(label:has(input, button, [role="button"], [type="button"], select, textarea):focus-within) {
        outline: none;
        box-shadow: 0 0 0 2px color-mix(in oklch, var(--color-content-stark) 35%, transparent);
    }
}
```

---

## Custom Utilities

Theme variables can be compiled into Tailwind-style custom utility classes using Indux's utilities script. To enable this, add an [Indux sript bundle](/getting-started/setup) to your project, or use the standalone utilities plugin:

```html "indux.utilities.js" copy
<script src="https://cdn.jsdelivr.net/npm/indux/dist/indux.utilities.js"></script>
```

Unlike other plugins, this script does not require Alpine JS to operate.

---

### Application

Any declared CSS variables throughout your project can be compiled into utility classes, provided they use Tailwind [namespace](https://tailwindcss.com/docs/theme#theme-variable-namespaces) prefixes like `--color-` or `--spacing-`. For example:

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

The runtime compiler is highly optimized for performance. Running concurrent to other page load events, it only generates styles for classes used in the current DOM view, and leverages caching to avoid redundant work. As a result, updating of its generated `<style>` tag in the head is nearly instantaneous, with average execution times under 10ms.

---

### Tailwind Integration

The utility plugin operates independently, but follows Tailwind naming patterns and is designed to pair well with [Play CDN](https://tailwindcss.com/docs/installation/play-cdn), a client-side version of Tailwind.

While it's not advertised for production use, Play CDN aligns with Indux's ethos of being plug-and-play with no build steps, and has a typically nelgible impact on performance.

Add Play CDN to your project using Indux's quickstart script (bundled with all Indux plugins alongside Alpine), or via Tailwind's CDN link.

<x-code-group>

```html "Quickstart" copy
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/indux/dist/indux.alpine.tailwind.css">
```

```html "Tailwind Play CDN + Custom Utilities" copy
<head>
    ...
    <!-- Tailwind Play CDN -->
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

    <!-- Generate custom utility classes from CSS variables -->
    <script src="https://cdn.jsdelivr.net/npm/indux/dist/indux.utilities.js"></script>
    ...
</head>
```

</x-code-group>

The all inclusive script's embedded Play CDN has been modified to remove Tailwind's Preflight styles in favour of Indux's [reset](/styles/reset) styles. It also removes a console warning about using Play CDN in production.

::: brand icon="lucide:info"
Projects with Tailwind v4+ [directly installed](https://tailwindcss.com/docs/installation/using-vite) will already compile theme variables from [@theme](https://tailwindcss.com/docs/theme) declarations during the build step.

In this scenario, Indux's all inclusive script or the standalone `indux.utilities.js` are redundant and should not be used. Be sure to update your theme's `:root { ... }` declarations to `@theme { ... }` for compatibility.
:::