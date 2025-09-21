# Color Themes

Apply light, dark, and system themes.

---

## Setup

Add an [Indux script](/getting-started/setup) to your project, or use the standalone themes plugin:

```html "<head> or <body>" copy
<!-- Alpine -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Indux themes plugin -->
<script src="https://cdn.jsdelivr.net/npm/indux/dist/indux.themes.js"></script>
```

---

## Themes

### Light/Default

The light theme is the default color mode, picking up all variable and static colors not in a `.dark` declaration.

<x-code-group>

```css "Variable"
:root {
    --color-page: var(--color-50);
}

.card {
    background-color: var(--color-page);
}
```

```css "Static"
.card {
    background-color: white;
}
```

</x-code-group>

---

### Dark

Use the `.dark` class to override light/default color values. The plugin operates by adding or removing the `dark` class in the `<html>` tag.

<x-code-group>

```css "Variable"
:root {
    --color-page: var(--color-50);
}

.dark {
    --color-page: var(--color-950);
}

/* .dark variaable value applies in dark mode  */
.card {
    background-color: var(--color-page);
}
```

```css "Static"
.card {
    background-color: white;
}

/* .dark override applies in dark mode */
.dark .card {
    background-color: black;
}
```

</x-code-group>

Using Tailwind, dark colors can also be set in HTML using the `dark:` variant on color utility classes.

```html
<div class="bg-page dark:bg-surface-1">We're going dark</div>
```

---

### System

The system theme follows the user's system preference for light or dark mode, including automatic switching at dusk and dawn. No additional configuration is required.

---

## Usage

### UI Toggles

Allow users to toggle color themes with the `x-theme` directive, using the following values:
- `'light'` sets to light theme
- `'dark'` sets to dark theme
- `'system'` sets to system theme
- `'toggle'` toggles between light and dark themes

::: frame
<button x-theme="'light'"><span x-icon="lucide:sun"></span><span>Light</span></button>
<button x-theme="'dark'"><span x-icon="lucide:moon"></span><span>Dark</span></button>
<button x-theme="'system'"><span x-icon="lucide:sun-moon"></span><span>System</span></button>
<button x-theme="'toggle'" x-icon="$theme.current === 'light' ? 'ph:moon' : 'ph:sun'" aria-label="Toggle Theme"></button>
:::

```html copy
<button x-theme="'light'"><span x-icon="lucide:sun"></span><span>Light</span></button>
<button x-theme="'dark'"><span x-icon="lucide:moon"></span><span>Dark</span></button>
<button x-theme="'system'"><span x-icon="lucide:sun-moon"></span><span>System</span></button>
<button x-theme="'toggle'" x-icon="$theme.current === 'light' ? 'ph:moon' : 'ph:sun'" aria-label="Toggle Theme"></button>
```

---

### Current Theme

Display the current theme's title with `x-text="$theme.current"`:

::: frame
    <p>Join the <strong x-text="$theme.current"></strong> side</p>
:::

```html copy
<p>Join the <strong x-text="$theme.current"></strong> side</p>
```