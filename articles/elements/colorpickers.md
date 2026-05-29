# Color Pickers

Visual color selection with Hex, RGB, HSL, and OKLCH inputs.

---

## Setup

Color picker styles are included in Manifest CSS or a standalone stylesheet, both referencing [theme](/docs/styles/theme) variables.

Color picker functionality is included in `manifest.js` with all core plugins, or it can be selectively loaded.

<div x-code-group copy>

```html "Manifest CSS / JS"
<!-- Manifest CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.css" />

<!-- Manifest JS -->
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Standalone"
<!-- Color picker styles only, with dropdown and tooltip dependencies -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.colorpicker.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.dropdown.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.tooltip.css" />

<!-- Manifest JS: colorpicker plugin only, with dropdowns and tooltips dependencies -->
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
  data-plugins="colorpicker,dropdowns,tooltips"></script>
```

</div>

::: brand icon="lucide:info"
The default color picker menu uses [dropdowns](/docs/elements/dropdowns) and [tooltips](/docs/elements/tooltips), with their respective plugins and styles as dependencies.
:::

---

## Swatch

Every color picker starts with a clickable preview of the current color, called a swatch.

### Native Input

The simplest swatch is a native `<input type="color">`, displaying the browser's built-in picker menu when pressed.

<div x-code-group>

```html copy
<input type="color" value="#3b82f6">
```

::: frame
<input type="color" value="#3b82f6">
:::

</div>

---

### Picker Button

Manifest provides a more nuanced color picker menu, opened by default as a [dropdown](/docs/elements/dropdowns) from a button swatch with `x-colorpicker.swatch`.

<div x-code-group>

```html copy
<button x-colorpicker.swatch></button>
```

::: frame
<button x-colorpicker.swatch></button>
:::

</div>

#### Default Color

Set a default color with the swatch's `value` attribute — the same attribute a native `<input type="color">` would carry. The value seeds the picker's initial state and the swatch's preview before any user interaction. Any valid CSS color or gradient is accepted.

<div x-code-group>

```html copy
<button x-colorpicker.swatch value="#ff0000"></button>
```

::: frame
<button x-colorpicker.swatch value="#ff0000"></button>
:::

</div>

For two-way reactive binding, use `x-model` instead. When both are present, `x-model` wins.

<div x-code-group>

```html copy
<div x-data="{ color: '#22c55e' }">
    <button x-colorpicker.swatch x-model="color"></button>
    <button @click="color = '#22c55e'">Green</button>
    <button @click="color = '#3b82f6'">Blue</button>
</div>
```

::: frame
<div class="row-wrap items-center gap-4" x-data="{ color: '#22c55e' }">
    <button x-colorpicker.swatch x-model="color"></button>
    <button @click="color = '#22c55e'">Green</button>
    <button @click="color = '#3b82f6'" >Blue</button>
</div>
:::

</div>

#### Form Participation

Add a `name` attribute to make a swatch submit with a `<form>`, just like any other form field. The plugin synthesizes a paired hidden input with that name and keeps it in sync with the picker's current color.

```html copy
<form>
    <button x-colorpicker.swatch name="background" value="#3b82f6"></button>
    <button type="submit">Save</button>
</form>
```

---

### Applying Color

To use a picker's value elsewhere, read it with the `$colorpicker(id)` magic method.

::: frame text-base
<div class="row-wrap items-center gap-4" x-data>
    <button id="brand" x-colorpicker.swatch value="#3b82f6"></button>
    <div class="col">
        <span class="h3" :style="`color: ${$colorpicker('brand')}`">Brand Color</span>
        <span x-text="$colorpicker('brand')"></span>
    </div>
</div>
:::

```html copy
<div class="row-wrap items-center gap-4" x-data>
    <button id="brand" x-colorpicker.swatch value="#3b82f6"></button>
    <span class="h3" :style="`color: ${$colorpicker('brand')}`">Brand Color</span>
    <span x-text="$colorpicker('brand')"></span>
</div>
```

---

## Menu

The color picker menu offers solid and gradient editing, four color spaces with alpha (Hex, RGB, HSL, OKLCH), custom and recent palettes, and a screen eyedropper. Manifest produces a swatch button's menu in this order:

1. **Inline picker** — a live element on the page whose `id` matches the swatch's value.
2. **Default template** — a single `<template x-colorpicker>` (see [Customization](#customization)).
3. **Plugin fallback** — used when neither of the above exists.

The wrapper element of an inline picker determines its presentation: `<menu popover>` anchors to the swatch as a dropdown, `<dialog popover>` opens centered as a modal, and `<div>` renders in the page flow.

<div x-code-group>

```html copy
<!-- Dropdown -->
<button x-colorpicker.swatch="dropdown-picker"></button>
<menu id="dropdown-picker" popover x-colorpicker></menu>

<!-- Dialog -->
<button x-colorpicker.swatch="dialog-picker"></button>
<dialog id="dialog-picker" popover x-colorpicker></dialog>

<!-- Inline menu without swatch -->
<div id="inline-picker" x-colorpicker></div>
```

::: frame row-wrap gap-10
<div class="col gap-2">
<p>Dropdown</p>
<button x-colorpicker.swatch="dropdown-picker"></button>
<menu id="dropdown-picker" popover x-colorpicker></menu>
</div>
<div class="col gap-2">
<p>Dialog</p>
<button x-colorpicker.swatch="dialog-picker"></button>
<dialog id="dialog-picker" popover x-colorpicker></dialog>
</div>
<div class="col gap-2">
<p>Inline</p>
<div id="inline-picker" class="border border-line" x-colorpicker></div>
</div>
:::

</div>

---

### Panels

By default, the picker menu shows three tabs: Solid, Gradient, and Library. You can hide tabs you don't need, change their order, or replace the entire menu with custom HTML.

Limit which panels appear by passing them as a value in a bare swatch or a modified `x-colorpicker` attribute in a picker menu.

<div x-code-group>

```html "Bare swatches" copy
<!-- Solids only -->
<button x-colorpicker.swatch="['solid']"></button>

<!-- Solids and gradients, no library -->
<button x-colorpicker.swatch="['solid', 'gradient']"></button>

<!-- Library first -->
<button x-colorpicker.swatch="['library', 'solid', 'gradient']"></button>
```

```html "Modified picker menus" copy
<button x-colorpicker.swatch="my-picker"></button>

<!-- Modified menu -->
<menu id="my-picker" popover x-colorpicker>
    <div x-colorpicker.solid></div>
    <div x-colorpicker.library></div>
</menu>
```

</div>

When only one panel is allowed, the tab bar is hidden automatically.

### Customization

To replace the fallback menu page-wide, declare a single `<template x-colorpicker>` (no `id`, no value) anywhere in your markup. Every bare swatch on the page that would otherwise auto-create the plugin's default menu instead clones from your template — preserving its wrapper element (`<menu>`, `<dialog>`, or `<div>`) and any attributes you put on it.

```html copy
<!-- Page-wide default -->
<template x-colorpicker>
    <menu popover>
        <!-- Your custom picker UI: tabs, panels, directives -->
    </menu>
</template>

<!-- Every bare swatch on the page now uses your template -->
<button x-colorpicker.swatch></button>
<button x-colorpicker.swatch></button>
```

To componentize the default across multiple pages or routes, wrap the template in a Manifest [HTML component](/docs/core-plugins/components) and drop it into your layout.

Each panel can be individually customized:

<details>
<summary>Solids</summary>

The solid panel offers a 2D saturation/lightness canvas, a hue slider, an alpha slider, a format selector (`HEX`, `RGB`, `HSL`, `OKLCH`), <a href="https://developer.mozilla.org/docs/Web/API/EyeDropper" target="_blank" rel="noopener">eye dropper</a>, and direct value inputs.

::: frame
<div x-colorpicker class="bg-page dark:bg-surface-3 border border-line">
    <div x-colorpicker.solid></div>
</div>
:::

Build a custom solid panel by wrapping any container in `x-colorpicker.solid` and adding the directives below. Each binds a specific control or display surface to the picker's solid-color state.

| Directive                                                | Description                                                                 |
| -------------------------------------------------------- | --------------------------------------------------------------------------- |
| `<div x-colorpicker.solid>`{copy}                              | Wraps the solid panel. Children below are wired to the picker's state.      |
| `<canvas x-colorpicker.set-canvas>`{copy}                      | The 2D saturation/value plane. Pointer drag updates S and V.                |
| `<input type="range" x-colorpicker.set-hue>`{copy}             | Hue slider (0–360). Background gradient is applied by the plugin.           |
| `<input type="range" x-colorpicker.set-alpha>`{copy}           | Alpha slider (0–100). Checkered backdrop applied by the plugin.             |
| `<input type="text" x-colorpicker.set-color-value>`{copy}      | Free-form input — accepts any CSS color in the active format.               |
| `<input type="number" x-colorpicker.set-alpha-value>`{copy}    | Numeric alpha input (0–100). Mirrors the alpha slider.                      |
| `<button x-colorpicker.set-color-space>`{copy}                 | Reactive **label** — its text content reflects the active format. Pair with a dropdown of choice elements (below) to make a format selector. |
| `<li x-colorpicker.set-color-space="hex\|rgb\|hsl\|oklch">`{copy} | Choice element. Click sets the format to its value; the element is auto-flagged `.active` when its value matches the current format. |
| `<button x-colorpicker.grab-color>`{copy}                      | Opens the browser's [`EyeDropper`](https://developer.mozilla.org/docs/Web/API/EyeDropper) and applies the sampled color. Hidden automatically in unsupported browsers. |

```html copy collapse="10"
<div x-colorpicker.solid>
    <canvas x-colorpicker.set-canvas></canvas>
    <input type="range" min="0" max="360" x-colorpicker.set-hue>
    <input type="range" min="0" max="100" x-colorpicker.set-alpha>
    <button x-dropdown="format-menu" x-colorpicker.set-color-space></button>
    <menu popover id="format-menu">
        <li x-colorpicker.set-color-space="hex">Hex</li>
        <li x-colorpicker.set-color-space="rgb">RGB</li>
        <li x-colorpicker.set-color-space="hsl">HSL</li>
        <li x-colorpicker.set-color-space="oklch">OKLCH</li>
    </menu>
    <input type="text" x-colorpicker.set-color-value>
    <input type="number" min="0" max="100" x-colorpicker.set-alpha-value>
    <button x-colorpicker.grab-color aria-label="Grab color"></button>
</div>
```

</details>

<hr>

<details>
<summary>Gradients</summary>

The gradient panel supports linear, radial, and conic gradients with arbitrary numbers of layers and stops.

::: frame
<div x-colorpicker class="bg-page dark:bg-surface-3 border border-line">
    <div x-colorpicker.gradient></div>
</div>
:::

Each gradient has one or more **layers**, and each layer has two or more **stops**. The panel uses two nested templates: one for the layer container and one for each layer's UI. The plugin clones `layer-options` once per layer, exposing per-layer scope variables to your bindings.

| Directive                                                            | Description                                                  |
| -------------------------------------------------------------------- | ------------------------------------------------------------ |
| `<div x-colorpicker.gradient>`{copy}                                       | Wraps the gradient panel.                                    |
| `<div x-colorpicker.gradient-layers>`{copy}                                | Container that the plugin populates with one cloned layer-options instance per layer, in stack order. |
| `<template x-colorpicker.layer-options>`{copy}                             | Per-layer markup. Cloned into `gradient-layers` for each layer. |
| `<div x-colorpicker.layer-stops-bar>`{copy}                                | Visual stops bar per layer. Shows draggable stop handles, supports right-click context menus, and double-click on the bar adds a stop at that position. |
| `<input type="number" x-colorpicker.set-angle>`{copy}                      | Numeric angle input for the layer (degrees, drag to scrub).  |
| `<li x-colorpicker.set-gradient-type="linear\|radial\|conic">`{copy}       | Click sets the active layer's gradient type to the given value. The element is auto-flagged `.active` when its value matches. |
| `<button x-colorpicker.add-layer>`{copy}                                   | Append a new layer to the top of the stack.                  |
| `<li x-colorpicker.add-layer-above>`{copy} / `<li x-colorpicker.add-layer-below>`{copy} | Insert a new layer relative to the current layer.   |
| `<li x-colorpicker.duplicate-layer>`{copy}                                 | Clone the current layer.                                     |
| `<li x-colorpicker.remove-layer>`{copy}                                    | Delete the current layer. Disabled when only one remains.    |
| `<li x-colorpicker.flip-layer>`{copy}                                      | Reverse the stop order.                                      |
| `<li x-colorpicker.rotate-layer>`{copy}                                    | Rotate the layer's angle by 90°.                             |
| `<li x-colorpicker.move-layer-up>`{copy} / `<li x-colorpicker.move-layer-down>`{copy} | Reorder the layer in the stack.                         |
| `<li x-colorpicker.duplicate-stop>`{copy}                                  | Clone the active stop. Typically placed in the stop's right-click context menu. |
| `<li x-colorpicker.delete-stop>`{copy}                                     | Delete the active stop. Disabled when only two remain.       |
| `<textarea x-colorpicker.set-gradient-value>`{copy}                        | Raw CSS-gradient input. Accepts any valid `linear-gradient(...)` / `radial-gradient(...)` / `conic-gradient(...)` and parses it back into layers/stops on commit. |

Inside the cloned `layer-options` markup, these reactive variables are available for `x-bind`, `:disabled`, `x-text`, etc.:

| Variable      | Description                                  |
| ------------- | -------------------------------------------- |
| `layerType`   | `'linear'`, `'radial'`, or `'conic'`         |
| `layerIndex`  | Zero-based index of this layer in the stack  |
| `layerCount`  | Total number of layers                       |

Stops support drag-to-reposition along the bar, click to open the stop's own solid panel, and right-click for the per-stop context menu (containing duplicate, delete, and the swatch library).

```html copy collapse="10"
<!-- Custom gradient panel -->
<div x-colorpicker.gradient>

    <!-- Add new layer -->
    <button x-colorpicker.add-layer>Add layer</button>

    <!-- Gradient layers -->
    <div x-colorpicker.gradient-layers></div>

    <!-- Template for each layer -->
    <template x-colorpicker.layer-options>
        <div>

            <!-- Layer options menu -->
            <button x-dropdown="layer-options-menu">
                <span x-text="layerType"></span>
            </button>
            <menu popover id="layer-options-menu">
                <li x-colorpicker.set-gradient-type="linear">Linear</li>
                <li x-colorpicker.set-gradient-type="radial">Radial</li>
                <li x-colorpicker.set-gradient-type="conic">Conic</li>
                <hr>
                <li x-colorpicker.move-layer-up :disabled="layerIndex === 0">Move Layer Up</li>
                <li x-colorpicker.move-layer-down :disabled="layerIndex === layerCount - 1">Move Layer Down</li>
                <hr>
                <li x-colorpicker.remove-layer :disabled="layerCount === 1">Remove Layer</li>
            </menu>

            <!-- Layer angle -->
            <input type="number" min="0" max="360" x-colorpicker.set-angle>

            <!-- Layer stops bar -->
            <div x-colorpicker.layer-stops-bar></div>

            <!-- Per-stop accordion -->
            <div x-colorpicker.solid></div>

        </div>
    </template>

    <!-- Gradient CSS input (all layers) -->
    <textarea x-colorpicker.set-gradient-value></textarea>
</div>
```

</details>

<hr>

<details>
<summary>Library</summary>

The library panel is where preset palettes live. There are three sources, each rendered as its own group: Recent (most-recent picks), Default Palettes (Tailwind / iOS), and your Custom Palettes.

::: frame
<div x-colorpicker class="bg-page dark:bg-surface-3 border border-line">
    <div x-colorpicker.library></div>
</div>
:::

Build a custom library layout with a single root `x-colorpicker.library` container plus optional inner templates. The plugin clones the templates once per group / palette / swatch so you can fully control the visual structure while keeping the data-driven behavior.

| Directive                                              | Description                                                                  |
| ------------------------------------------------------ | ---------------------------------------------------------------------------- |
| `<div x-colorpicker.library>`{copy}                          | The library container. With no children, the plugin renders its default layout. With children, your markup is used verbatim. |
| `<template x-colorpicker.library-group>`{copy}               | Cloned once per palette group. Inside, `x-text="group._name"` (or the group's key) is the group label. |
| `<template x-colorpicker.library-palette>`{copy}             | Cloned once per palette inside a group.                                      |
| `<template x-colorpicker.library-swatch>`{copy}              | Cloned once per color in a palette. Wire the click using `x-colorpicker.apply-color`{copy}. |
| `<template x-colorpicker.library-recent-swatch>`{copy}       | Cloned once per Recent entry. Use `x-colorpicker.apply-color`{copy} for click and `x-colorpicker.remove-recent`{copy} for the per-swatch context menu. |
| `<button x-colorpicker.apply-color>`{copy}                   | When clicked, applies the swatch's current background as the picker's color (or the active stop's color in gradient context). |
| `<li x-colorpicker.remove-recent>`{copy}                     | Removes the right-clicked Recent swatch from the list. Typically used inside a stop-style context menu. |

Inside a library template, each clone exposes scope variables you can bind against (group name, palette key, swatch name, color value), and the plugin auto-flags swatches whose color matches the picker's current value with an `.active` class — so styling the selected swatch is just a CSS rule.

```html copy collapse="10"
<!-- Custom library panel -->
<div x-colorpicker.library>

    <!-- Template for each library group (e.g. Recent, Tailwind, iOS, each custom group) -->
    <template x-colorpicker.library-group>
        <section>
            <h4 x-text="group._name || groupKey"></h4>

            <!-- Template for each palette within a group -->
            <template x-colorpicker.library-palette>
                <div class="palette">

                    <!-- Template for each swatch in a palette -->
                    <template x-colorpicker.library-swatch>
                        <button x-colorpicker.apply-color :style="`background: ${color}`" :title="name"></button>
                    </template>

                </div>
            </template>

        </section>
    </template>

    <!-- Template for each recent swatch -->
    <template x-colorpicker.library-recent-swatch>
        <button x-colorpicker.apply-color x-dropdown.context="recent-menu" :style="`background: ${color}`"></button>
    </template>

    <!-- Recent swatch context menu -->
    <menu popover id="recent-menu">
        <li x-colorpicker.remove-recent>Remove from recent</li>
    </menu>
</div>
```

#### Recent Palette

The plugin tracks the most recently committed colors per swatch and surfaces them for the library. Selecting a swatch from Recent restores both solid colors and full gradients exactly as they were committed. A color enters the recent palette only when the picker popover menu closes (or is focused out of for inline menus).

Recent is per-swatch and persists in `localStorage`, which can be cleared programmatically. See [magic method](#magic-method).

#### Default & Custom Palettes

Two default palettes are bundled and appear in the library automatically: Tailwind (the full Tailwind CSS color scale) and iOS (Apple's system colors). To overwrite either one or add custom palettes, declare one or more [local data](/docs/core-plugins/local-data) files flagged with a `colorpicker` key.

<div x-code-group>

```json "manifest.json" copy
{
    "data": {
        "colors": {
            "colorpicker": "/data/colors.yaml"
        }
    }
}
```

```yaml "colors.yaml" copy
# Replace the bundled Tailwind palette with a locked subset
_tailwind:
    _group: Brand    # optional — overrides the group heading ("Tailwind" by default)
    blue:    "#3b82f6"
    indigo:  "#6366f1"
    violet:  "#8b5cf6"

# Replace iOS with custom system colors
_ios:
    red:    "#ff3b30"
    green:  "#34c759"
    blue:   "#007aff"

# Custom groups
Primary:
    _name: Primary Brand
    blue: "#3b82f6"
    indigo: "#6366f1"
    violet: "#8b5cf6"

Accent:
    _name: Accents
    rose: "#f43f5e"
    amber: "#f59e0b"
    emerald: "#10b981"
```

</div>

The contents of `_tailwind` or `_ios` will overwrite their respective default content. Any other top-level keys become custom palette groups. Each group is a flat map of `name: color`. The reserved `_name` key sets the displayed group label (otherwise the key itself is used). Colors can be any valid CSS color string, including gradients.

</details>

---

### Text & Localization

Default text in the color picker UI can be overwritten using a [local data](/docs/core-plugins/local-data) source flagged with a `colorpicker` key, and containing the following `_ui` object syntax.

<div x-code-group copy>

```json "manifest.json"
{
    "data": {
        "colors": {
            "colorpicker": "/data/colors.yaml"
        }
    }
}
```

```yaml "colors.yaml"
_ui:
    tabs:
        solid: Solid
        gradient: Gradient
        library: Library
    grabColor: Grab color from screen
    gradientTypes:
        linear: Linear
        radial: Radial
        conic: Conic
    layerActions:
        rotate: Rotate
        flip: Flip
        addAbove: Add layer above
        addBelow: Add layer below
        duplicate: Duplicate
        moveUp: Move up
        moveDown: Move down
        remove: Remove layer
    stopActions:
        duplicate: Duplicate stop
        delete: Delete stop
    recent:
        remove: Remove from recent
```

</div>

Text can be localized by chaining values with `$x` references to [locale](/docs/core-plugins/local-data) files.

<div x-code-group>

```json "manifest.json" copy
{
    "data": {
        "colors": {
            "colorpicker": "data/colors.yaml"
        },
        "translations": {
            "en": "data/translations.en.yaml",
            "fr": "data/translations.fr.yaml"
        }
    }
}
```

```yaml "colors.yaml"
_ui:
    tabs:
        solid: $x.translations.colors.solid
        gradient: $x.translations.colors.gradient
        library: $x.translations.colors.library

Primary:
    _name: $x.translations.colors.primary
    blue: "#3b82f6"
```

```yaml "translations.fr.yaml"
color:
    solid: Plein
    gradient: Dégradé
    library: Bibliothèque
    primary: Marque principale
```

</div>

Alternatively, use dedicated locale files mapped under `colorpicker`:

<div x-code-group>

```json "manifest.json" copy
{
    "data": {
        "colors": {
            "colorpicker": {
                "en": "/data/colors.en.yaml",
                "fr": "/data/colors.fr.yaml"
            }
        }
    }
}
```

```yaml "colors.fr.yaml"
_ui:
    tabs:
        solid: Plein
        gradient: Dégradé
        library: Bibliothèque

Primary:
    _name: Marque principale
    blue: "#3b82f6"
```

</div>

---

## Magic Method

Use the `$colorpicker(id)` magic method to read or change a picker's value from anywhere on the page. Used on its own it returns the current color as a CSS string — solid color or full gradient — so it drops straight into `:style`, `x-text`, or any template literal.

::: frame text-base
<div class="row-wrap items-center gap-4">
    <button id="hero" x-colorpicker.swatch value="#3b82f6"></button>
    <span class="h3" :style="`color: ${$colorpicker('hero')}`">Brand Color</span>
    <span x-text="$colorpicker('hero')"></span>
</div>
:::

```html copy
<button id="hero" x-colorpicker.swatch value="#3b82f6"></button>
<h3 :style="`color: ${$colorpicker('hero')}`">Brand Color</h3>
<span x-text="$colorpicker('hero')"></span>
```

For a different format or specific picker state, read the named property:

| Property                                                | Returns                                                                 |
| ------------------------------------------------------- | ----------------------------------------------------------------------- |
| `$colorpicker(id)`{copy}                                      | Current CSS value — solid color or full gradient string.                |
| `$colorpicker(id).hex`{copy}                                  | Current solid color as 6-digit hex (e.g. `'#3b82f6'`).                  |
| `$colorpicker(id).formatted`{copy}                            | Current value in the active format (Hex / RGB / HSL / OKLCH).           |
| `$colorpicker(id).format`{copy}                               | Active format identifier — `'hex'`, `'rgb'`, `'hsl'`, or `'oklch'`.     |
| `$colorpicker(id).pickerMode`{copy}                           | `'solid'` or `'gradient'`.                                              |
| `$colorpicker(id).layers`{copy}                               | Gradient layer descriptors (gradient mode).                             |
| `$colorpicker(id).activeLayer`{copy} / `.activeStop`{copy}          | The currently selected layer or stop.                                   |

To change a picker's value programmatically, call the corresponding action:

| Action                                                          | Effect                                                |
| --------------------------------------------------------------- | ----------------------------------------------------- |
| `$colorpicker(id).applyColor(value)`{copy}                            | Set the picker to a new color or gradient.            |
| `$colorpicker(id).setColorSpace('hex'\|'rgb'\|'hsl'\|'oklch')`{copy}  | Switch the active format.                             |
| `$colorpicker(id).setHue(deg)`{copy}                                  | Set the hue (0–360).                                  |
| `$colorpicker(id).setAlpha(value)`{copy}                              | Set the alpha (0–1).                                  |
| `$colorpicker(id).grabColor()`{copy}                                  | Open the screen eyedropper.                           |
| `$colorpicker(id).addLayer()`{copy}                                   | Append a new gradient layer.                          |
| `$colorpicker(id).duplicateLayer(i)`{copy} / `.removeLayer(i)`{copy} / `.flipLayer(i)`{copy} / `.rotateLayer(i)`{copy} | Per-layer operations.  |
| `$colorpicker(id).addStop(layerIndex, position)`{copy} / `.duplicateStop(li, si)`{copy} / `.deleteStop(li, si)`{copy} | Per-stop operations. |

Without an id, `$colorpicker` exposes a few helpers for working with palettes:

| Helper                  | Returns                                                  |
| ----------------------- | -------------------------------------------------------- |
| `$colorpicker.tailwind`{copy} | The bundled Tailwind palette.                            |
| `$colorpicker.ios`{copy}      | The bundled iOS palette.                                 |
| `$colorpicker.presets`{copy}  | All custom palettes from your registered color sources.  |
| `$colorpicker.recent`{copy}   | The current Recent list, most-recent first.              |

---

## Styles

### Theme

The default picker uses the following [theme](/docs/styles/theme) variables:

| Variable                  | Purpose                                                          |
| ------------------------- | ---------------------------------------------------------------- |
| `--color-popover-surface`{copy} | Menu background                                                  |
| `--color-content-neutral`{copy} | Muted UI text (degree symbol, secondary labels)                  |
| `--color-field-surface`{copy}   | Input field backgrounds inside the menu                          |
| `--color-line`{copy}            | Borders and dividers                                             |
| `--radius`{copy}                | Menu, swatch, and field corner radius                            |
| `--spacing-field-height`{copy}  | Swatch size (matches input height)                               |
| `--transition`{copy}            | Hover, focus, and active state transitions                       |

The plugin sets two of its own variables on each swatch element to drive the live color preview:

| Variable                | Purpose                                                            |
| ----------------------- | ------------------------------------------------------------------ |
| `--color-picker-swatch`{copy} | Swatch background (and border, derived from this color via `oklch`) |
| `--color-picker-alpha`{copy}  | Alpha-slider tint behind the checkered alpha pattern                |

---

### Tailwind CSS

If using Tailwind, individual swatches and menus can be customized with utility classes.

<div x-code-group>

```html copy
<button x-colorpicker.swatch="custom-tw-picker" class="size-14 max-w-none rounded-full" value="#3b82f6"></button>
<menu id="custom-tw-picker" popover x-colorpicker class="w-100 max-w-none max-h-none"></menu>
```

::: frame
<button x-colorpicker.swatch="custom-tw-picker" class="size-14 max-w-none rounded-full" value="#3b82f6"></button>
<menu id="custom-tw-picker" popover x-colorpicker class="w-100 max-w-none max-h-none"></menu>
:::

</div>

---

### Customization

Modify base picker styles with custom CSS targeting the `[x-colorpicker]` and `[x-colorpicker.swatch]` selectors. Each panel and control has its own selector — `[x-colorpicker.solid]`, `[x-colorpicker.gradient]`, `[x-colorpicker.library]`, `[x-colorpicker.set-canvas]`, `[x-colorpicker.set-hue]`, `[x-colorpicker.set-alpha]`, and so on.

```css copy
/* Square swatches with a thicker ring */
[x-colorpicker\.swatch] {
    border-radius: 0;
    border-width: 2px;
}

/* Wider menu with extra padding */
[x-colorpicker] {
    min-width: 22rem;
    max-width: 22rem;
}

/* Recolor the saturation reticle */
[x-colorpicker\.solid] .color-reticle {
    border-color: #facc15;
}
```

The internal layout classes (`.canvas-wrapper`, `.color-reticle`, `.tabs-wrapper`, `.library-group`, `.library-palette`, `.layer-options`, `.gradient-layer`) are stable hooks for finer-grained styling. Library swatches that match the picker's current color carry an `.active` class for highlighting the selected entry.
