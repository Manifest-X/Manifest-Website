# Forms

Structured input layouts with built-in validation.

---

## Setup

Form styles are included in Manifest CSS or a standalone stylesheet, both referencing [theme](/docs/styles/theme) variables.

<div x-code-group copy>

```html "Manifest CSS"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.css" />
```

```html "Standalone"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.form.css" />
```

</div>

---

## Default

The `<form>` element arranges its contents in a column with gaps.

<div x-code-group>

```html
<form>
    <label for="input1">Input 1</label>
    <input id="input1" placeholder="Insert" />
    <label for="input2">Input 2</label>
    <input id="input2" placeholder="Insert" />
</form>
```

::: frame text-base
<form>
    <label for="input1">Input 1</label>
    <input id="input1" placeholder="Insert" />
    <label for="input2">Input 2</label>
    <input id="input2" placeholder="Insert" />
</form>
:::

</div>

Place form elements inside a label for enhanced default styling, and to reduce code required. Label text can be standalone or in a `<span>`.

<div x-code-group>

```html
<form>
    <label>
        Input 1
        <input placeholder="Insert" />
    </label>
    <label>
        <span>Input 2</span>
        <input placeholder="Insert" />
    </label>
</form>
```

::: frame text-base
<form>
    <label>
        Input 1
        <input placeholder="Insert" />
    </label>
    <label>
        <span>Input 2</span>
        <input placeholder="Insert" />
    </label>
</form>
:::

</div>

This works for all types of form elements.

<div x-code-group>

```html lines copy collapse="10"
<form>
    <label>
        Button label
        <button>Button</button>
    </label>
    <label>
        Text input label
        <input placeholder="Input" />
    </label>

    <!-- Search and file inputs require an external label for text, and can be visually grouped in a fieldset wrapper -->
    <fieldset>
        <label for="search">Search input label</label>
        <label>
            <i x-icon="lucide:search"></i>
            <input id="search" type="search" />
        </label>
    </fieldset>
    <fieldset>
        <label for="file">File input label</label>
        <label>
            <i x-icon="lucide:upload"></i>
            Upload
            <input id="file" type="file" />
        </label>
    </fieldset>

    <label>
        Select label
        <select>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
        </select>
    </label>
    <label>
        Textarea label
        <textarea placeholder="Insert"></textarea>
    </label>
    <label>
        <input type="checkbox" role="switch" />
        Switch label
    </label>

    <!-- Visually group checkbox and radio sets with a fieldset wrapper -->
    <fieldset>
        <label>
            <input type="checkbox" />
            Checkbox label
        </label>
        <label>
            <input type="checkbox" />
            Checkbox label
        </label>
    </fieldset>
    <fieldset>
        <label>
            <input type="radio" name="radio-set" />
            Radio label
        </label>
        <label>
            <input type="radio" name="radio-set" />
            Radio label
        </label>
    </fieldset>
</form>
```

::: frame text-base
<form>
    <label>
        Button label
        <button>Button</button>
    </label>
    <label>
        Text input label
        <input placeholder="Input" />
    </label>
    <div>
        <label for="search">Search input label</label>
        <label>
            <i x-icon="lucide:search"></i>
            <input id="search" type="search" />
        </label>
    </div>
    <div>
        <label for="file">File input label</label>
        <label>
            <i x-icon="lucide:upload"></i>
            Upload
            <input id="file" type="file" />
        </label>
    </div>
    <label>
        Select label
        <select>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
        </select>
    </label>
    <label>
        Textarea label
        <textarea placeholder="Insert"></textarea>
    </label>
    <label>
        <input type="checkbox" role="switch" />
        Switch label
    </label>
    <fieldset>
        <label>
            <input type="checkbox" />
            Checkbox label
        </label>
        <label>
            <input type="checkbox" />
            Checkbox label
        </label>
    </fieldset>
    <fieldset>
        <label>
            <input type="radio" name="radio-set" />
            Radio label
        </label>
        <label>
            <input type="radio" name="radio-set" />
            Radio label
        </label>
    </fieldset>
</form>
:::

</div>

---

## Inline Labels

To horizontally inline the label text with its form element, place the text in a `<data>` element, which Manifest uses as a CSS hook. `<data>` elements are semantically neutral, equivalent to a `<span>`.

<div x-code-group>

```html lines copy collapse="10"
<form>
    <label>
        <data>Button label</data>
        <button>Button</button>
    </label>
    <label>
        <data>Text input label</data>
        <input placeholder="Input" />
    </label>

    <!-- For search and file inputs, use a div with the `label` utility class for the inner wrapper — this avoids <label> element nesting -->
    <label>
        <data>Search input label</data>
        <div class="label">
            <i x-icon="lucide:search"></i>
            <input id="search" type="search" />
        </div>
    </label>
    <label>
        <data>File input label</data>
        <div class="label">
            <i x-icon="lucide:upload"></i>
            Upload
            <input id="file" type="file" />
        </div>
    </label>

    <label>
        <data>Select label</data>
        <select>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
        </select>
    </label>
    <label>
        <data>Textarea label</data>
        <textarea placeholder="Insert"></textarea>
    </label>
    <label>
        <data>Switch label</data>
        <input type="checkbox" role="switch" />
    </label>
    <fieldset>
        <label>
            <data>Checkbox label</data>
            <input type="checkbox" />
        </label>
        <label>
            <data>Checkbox label</data>
            <input type="checkbox" />
        </label>
    </fieldset>
    <fieldset>
        <label>
            <data>Radio label</data>
            <input type="radio" name="radio-set" />
        </label>
        <label>
            <data>Radio label</data>
            <input type="radio" name="radio-set" />
        </label>
    </fieldset>
</form>
```

::: frame text-base
<form>
    <label>
        <data>Button label</data>
        <button>Button</button>
    </label>
    <label>
        <data>Text input label</data>
        <input placeholder="Input" />
    </label>
    <label>
        <data>Search input label</data>
        <div class="label">
            <i x-icon="lucide:search"></i>
            <input id="search" type="search" />
        </div>
    </label>
    <label>
        <data>File input label</data>
        <div class="label">
            <i x-icon="lucide:upload"></i>
            Upload
            <input id="file" type="file" />
        </div>
    </label>
    <label>
        <data>Select label</data>
        <select>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
        </select>
    </label>
    <label>
        <data>Textarea label</data>
        <textarea placeholder="Insert"></textarea>
    </label>
    <label>
        <data>Switch label</data>
        <input type="checkbox" role="switch" />
    </label>
    <fieldset>
        <label>
            <data>Checkbox label</data>
            <input type="checkbox" />
        </label>
        <label>
            <data>Checkbox label</data>
            <input type="checkbox" />
        </label>
    </fieldset>
    <fieldset>
        <label>
            <data>Radio label</data>
            <input type="radio" name="radio-set" />
        </label>
        <label>
            <data>Radio label</data>
            <input type="radio" name="radio-set" />
        </label>
    </fieldset>
</form>
:::

</div>

---

## Fieldset Legends

Add a `<legend>` element to a `<fieldset>` with checkboxes or radios, to create a bordered container with a small title.

<div x-code-group>

```html copy
<fieldset>
    <legend>Preferences</legend>
    <label>
        <input type="checkbox" />
        <data>Email notifications</data>
    </label>
    <label>
        <input type="checkbox" />
        <data>SMS notifications</data>
    </label>
</fieldset>
```

::: frame text-base
<fieldset>
<legend>Preferences</legend>
<label>
    <input type="checkbox" />
    <data>Email notifications</data>
</label>
<label>
    <input type="checkbox" />
    <data>SMS notifications</data>
</label>
</fieldset>
:::

</div>

---

## Group Wrappers

Buttons, inputs, and selects can be arranged horizontally flush inside a wrapper with the `role="group"` attribute. Elements are connected seamlessly with shared borders.

<div x-code-group>

```html lines copy
<div role="group">
    <select>
        <option>Category</option>
        <option>Technology</option>
        <option>Design</option>
    </select>
    <input placeholder="Filter" />
    <button>Apply</button>
</div>
```

::: frame
<div role="group">
    <select>
        <option>Category</option>
        <option>Technology</option>
        <option>Design</option>
    </select>
    <input placeholder="Filter" />
    <button>Apply</button>
</div>
:::

</div>

The `even` utility class makes all form elements an equal width.

<div x-code-group>

```html lines copy
<div role="group" class="even">
    <select>
        <option>Category</option>
        <option>Technology</option>
        <option>Design</option>
    </select>
    <input placeholder="Filter" />
    <button>Apply</button>
</div>
```

::: frame
<div role="group" class="even">
    <select>
        <option>Category</option>
        <option>Technology</option>
        <option>Design</option>
    </select>
    <input placeholder="Filter" />
    <button>Apply</button>
</div>
:::

</div>

A wrapper with `role="tablist"` instead becomes a tab bar. Mark the active button (or `<a role="button">`) with the `selected` class — or `aria-selected="true"` / `aria-current` — and a highlighted background slides behind the active item.

<div x-code-group>

```html lines copy
<div role="tablist" x-data="{ tab: 1 }">
    <button :class="tab === 1 && 'selected'" @click="tab = 1">Item 1</button>
    <button :class="tab === 2 && 'selected'" @click="tab = 2">Item 2</button>
    <button :class="tab === 3 && 'selected'" @click="tab = 3">Item 3</button>
</div>
```

::: frame
<div role="tablist" x-data="{ tab: 1 }">
    <button :class="tab === 1 && 'selected'" @click="tab = 1">Item 1</button>
    <button :class="tab === 2 && 'selected'" @click="tab = 2">Item 2</button>
    <button :class="tab === 3 && 'selected'" @click="tab = 3">Item 3</button>
</div>
:::

</div>

[Tab](/docs/elements/tabs) buttons sync `aria-selected` automatically, so adding `role="tablist"` to a wrapper of `x-tab` buttons gets this styling with no further markup.

Button [utility classes](/docs/elements/buttons#utilities) like `transparent`, `outlined`, `sm`, and `lg`, also apply at the wrapper level, styling the whole control as one.

---

## Remove Buttons

A button named `remove` becomes a floating dismiss affordance for whatever contains it — a chip, an [avatar](/docs/elements/avatars), a pending [chat attachment](/docs/elements/chats#composer). The complete markup is one attribute pair; everything else is automatic.

<div x-code-group>

```html copy
<span class="badge">
    Design
    <button type="button" name="remove" aria-label="Remove Design"></button>
</span>
```

::: frame
<div class="row-wrap items-center gap-3" x-data="{ all: ['Design', 'Engineering', 'Marketing'], tags: ['Design', 'Engineering', 'Marketing'] }">
    <template x-for="tag in tags" :key="tag">
        <span class="badge lg">
            <span x-text="tag"></span>
            <button type="button" name="remove" :aria-label="`Remove ${tag}`" @click="tags = tags.filter(t => t !== tag)"></button>
        </span>
    </template>
    <button class="sm ghost" x-show="tags.length < all.length" @click="tags = [...all]">Reset</button>
</div>
:::

</div>

The parent element anchors the button automatically (it's given `position: relative`), the button floats over the parent's top end corner above neighbouring content, and it stays hidden until the parent is hovered or holds focus — all in CSS. The ✕ glyph comes from the theme's `--icon-dismiss` variable, so no icon markup is needed; the `aria-label` is required since the button has no visible text.

A few notes:

- The parent can be anything, anywhere — `name` is a native button attribute and carries no behavior outside a form.
- In a server-rendered form, `<button type="submit" name="remove" value="42">` submits the pair as its payload — the styling hook and the delete request are the same attribute.
- Touch devices have no hover: the button also reveals while anything inside the parent holds focus, but for touch-first UIs consider overriding `opacity` to keep it always visible.

---

## Validation

Native HTML5 attributes like `required`, `type="email"`, `pattern`, `minlength`, and `maxlength` trigger the browser's built-in form validation on submit. Custom CSS or Tailwind pseudo-class variants can be used to style valid and invalid states without Javascript. Block the form's own validation messages with `novalidate`.

<div x-code-group>

```html copy
<form class="group">
    <label>
        Email
        <input type="email" required
            class="user-invalid:negative user-valid:positive" />
    </label>
    <label>
        Subject
        <input type="text" required minlength="8"
            class="user-invalid:negative user-valid:positive" />
    </label>
    <button class="group-invalid:disabled accent">Submit</button>
</form>
```

::: frame
<form class="group">
    <label>
        Email
        <input type="email" required
            class="user-invalid:negative user-valid:positive" />
    </label>
    <label>
        Subject
        <input type="text" required minlength="8"
            class="user-invalid:negative user-valid:positive" />
    </label>
    <button class="group-invalid:disabled accent">Submit</button>
</form>
:::

</div>

Common Tailwind variants:

| Variant | Triggers when |
|---|---|
| `invalid:`{copy} | The field's value fails its native validation rules |
| `valid:`{copy} | The field's value passes its native validation rules |
| `user-invalid:`{copy} | Same as `invalid:`{copy} but only after the user has interacted with the field |
| `user-valid:`{copy} | Same as `valid:`{copy} but only after the user has interacted with the field |
| `peer-invalid:`{copy} | A `.peer` sibling fails its native validation rules |
| `peer-user-invalid:`{copy} | A `.peer` sibling fails validation only after user interaction |
| `group-invalid:`{copy} | A `.group` parent contains one or more invalid fields |
| `group-user-invalid:`{copy} | A `.group` parent contains one or more user-invalid fields (after user interaction) |
| `required:`{copy} | The field has the `required` attribute |
| `placeholder-shown:`{copy} | The field is empty and showing its placeholder |
| `focus:`{copy} | The field is currently focused |

`user-invalid:` and `user-valid:` are better suited than the unprefixed `invalid:` and `valid:` for most cases. They wait until the user has actually engaged with the field, avoiding the awkward "everything is red on page load" effect.

---

## Styles

Forms inherit styling from their child elements ([buttons](/docs/elements/buttons), [inputs](/docs/elements/inputs), [selects](/docs/elements/selects)) and reference [theme](/docs/styles/theme) variables. The form, fieldset, label, and group elements layer in a small amount of layout structure on top.

| Selector | Purpose |
|---|---|
| `form` | Default column layout with vertical gaps between children |
| `fieldset` | Bordered grouping with column layout |
| `legend` | Fieldset title styling |
| `label` | Stacks a label above its form control |
| `label > data` | Inlines the label text horizontally with the control |
| `[role="group"]` | Horizontal row of form elements with shared borders |
| `[role="group"].even` | Equal-width siblings inside a group |
| `[role="tablist"]` | Tab bar with a background that slides behind the `selected` item |
| `button[name="remove"]` | Floating dismiss affordance anchored to its parent element |

### Customization

Target any of the selectors above with custom CSS.

```css copy
form {
    gap: 1rem;
    padding: 1rem;
    background: var(--color-surface-2);
    border-radius: var(--radius);
}
```