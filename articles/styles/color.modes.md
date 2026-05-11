# Color Modes

Apply light, dark, and system color modes.

---

## Setup

Color modes are included in `manifest.js` with all core plugins, or can be selectively loaded.

<x-code-group copy>

```html "All Plugins (default)"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Selective"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="color"></script>
```

</x-code-group>

---

## Modes

### Light/Default

The light mode is the default, picking up all variable and static colors not in a `.dark` declaration.

<x-code-group>

```css "Variable"
:root {
    --color-page: #efefef;
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

See [theme](/docs/styles/theme) styles for Manifest's suggested color variables.

---

### Dark

Use the `.dark` class to override light/default color values. The plugin operates by adding or removing the `dark` class in the `<html>` tag.

<x-code-group>

```css "Variable"
/* Light mode */
:root {
    --color-page: #efefef;
}

/* Dark mode */
.dark {
    --color-page: #000000;
}

/* Card will adjust background for current mode */
.card {
    background-color: var(--color-page);
}
```

```css "Static"
/* Light mode element */
.card {
    background-color: #eee;
}

/* Dark mode element */
.dark .card {
    background-color: #222;
}
```

</x-code-group>

Using Tailwind, dark colors can also be set in HTML using the `dark:` variant on color utility classes.

```html
<div class="bg-page dark:bg-surface-1">We're going dark</div>
```

---

### System

The system mode follows the user's system preference for light or dark mode, including automatic switching at dawn and dusk. No additional configuration is required.

---

## UI Toggles

Allow users to toggle color modes with the `x-color` directive, using the following values:
- `'light'` sets to light mode
- `'dark'` sets to dark mode
- `'system'` sets to system mode
- `'toggle'` toggles between light and dark modes

### Buttons

::: frame
<button x-color="'light'"><span x-icon="lucide:sun"></span><span>Light</span></button>
<button x-color="'dark'"><span x-icon="lucide:moon"></span><span>Dark</span></button>
<button x-color="'system'"><span x-icon="lucide:sun-moon"></span><span>System</span></button>
:::

```html copy
<button x-color="'light'"><span x-icon="lucide:sun"></span><span>Light</span></button>
<button x-color="'dark'"><span x-icon="lucide:moon"></span><span>Dark</span></button>
<button x-color="'system'"><span x-icon="lucide:sun-moon"></span><span>System</span></button>
```

See [buttons](/docs/elements/buttons) for details on the element.

---

### Toggle

::: frame
<button x-color="'toggle'" x-icon="$color.current === 'light' ? 'ph:moon' : 'ph:sun'" aria-label="Toggle Color Mode"></button>
:::

```html copy
<button x-color="'toggle'" x-icon="$color.current === 'light' ? 'ph:moon' : 'ph:sun'" aria-label="Toggle Color Mode"></button>
```

See [icons](/docs/elements/icons) for details on conditional icons.

---

### Dropdown

::: frame
<button x-dropdown.bottom="color-mode-preview" aria-label="Color Mode Menu" x-icon="$color.current === 'light' ? 'lucide:sun' : $color.current === 'dark' ? 'lucide:moon' : 'lucide:sun-moon'"></button>
<menu popover id="color-mode-preview" class="min-w-0">
    <li x-color="'light'" :disabled="$color.current === 'light'" x-icon="lucide:sun" aria-label="Light"></li>
    <li x-color="'dark'" :disabled="$color.current === 'dark'" x-icon="lucide:moon" aria-label="Dark"></li>
    <li x-color="'system'" :disabled="$color.current === 'system'" x-icon="lucide:sun-moon" aria-label="System"></li>
</menu>
:::

```html copy
<button x-dropdown.bottom="color-mode" aria-label="Color Mode Menu" x-icon="$color.current === 'light' ? 'lucide:sun' : $color.current === 'dark' ? 'lucide:moon' : 'lucide:sun-moon'"></button>
<menu popover id="color-mode" disabled="min-w-0">
    <li x-color="'light'" :disabled="$color.current === 'light'" x-icon="lucide:sun" aria-label="Light"></li>
    <li x-color="'dark'" :disabled="$color.current === 'dark'" x-icon="lucide:moon" aria-label="Dark"></li>
    <li x-color="'system'" :disabled="$color.current === 'system'" x-icon="lucide:sun-moon" aria-label="System"></li>
</menu>
```

See [dropdowns](/docs/elements/dropdowns) for details on the menu element.

---

## Current Mode

Display the current mode's title with `x-text="$color.current"`:

::: frame
    <p>Join the <strong x-text="$color.current"></strong> side</p>
:::

```html copy
<p>Join the <strong x-text="$color.current"></strong> side</p>
```
