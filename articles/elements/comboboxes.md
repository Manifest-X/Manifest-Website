# Comboboxes

Collect entries or chips in filterable fields.

---

## Setup

Combobox styles are included in Manifest CSS or a standalone stylesheet, both referencing [theme](/docs/styles/theme) variables. The plugin is included in `manifest.js`{copy} with all core plugins, or it can be loaded on its own.

<div x-code-group copy>

```html "Manifest CSS / JS"
<!-- Manifest CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.css" />

<!-- Manifest JS -->
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Standalone"
<!-- Combobox styles, with field and dropdown dependencies -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.combobox.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.input.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.dropdown.css" />

<!-- Manifest JS: combobox plugin only -->
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
  data-plugins="combobox"></script>
```

</div>

::: brand icon="lucide:info"
The suggestion list uses [dropdowns](/docs/elements/dropdowns), with its respective plugins and styles as dependencies.
:::

---

## Triggers

Add `x-combobox`{copy} to the element that holds the selection and opens the list. Three elements work as triggers, and the rest of this guide uses an input.

### Input

Type to filter or to enter free text.

<div x-code-group>

```html copy
<input x-combobox="countries" placeholder="Country">
```

::: frame
<input x-combobox="cb-countries-t" placeholder="Country" style="max-width: 22rem;">
<datalist id="cb-countries-t"><option>Australia</option><option>Brazil</option><option>Canada</option><option>Denmark</option><option>France</option><option>Germany</option><option>Japan</option><option>Mexico</option><option>Spain</option><option>Sweden</option></datalist>
:::

</div>

### Textarea

Textareas are effectively the same as inputs in style and function. The `.multiple` modifier enabled both inputs and textareas to support multiple entries, which wrap and grow the field's height on overflow.

<div x-code-group>

```html copy
<textarea x-combobox.multiple.chips="skills" placeholder="Add skills"></textarea>
```

::: frame
<textarea x-combobox.multiple.chips="cb-skills-t" placeholder="Add skills" style="max-width: 30rem;"></textarea>
<datalist id="cb-skills-t"><option>Design</option><option>Writing</option><option>Research</option><option>Strategy</option><option>Testing</option></datalist>
:::

</div>

### Button

Buttons behave like a select menu trigger, with no typing input. A single field shows the choice as the button's text. A multiple field shows chips.

<div x-code-group>

```html copy
<button x-combobox="priority">Select priority</button>
<menu popover id="priority">
    <li>Low</li>
    <li>Medium</li>
    <li>High</li>
</menu>
```

::: frame
<button x-combobox="cb-priority-t" style="max-width: 16rem;">Select priority</button>
<menu popover id="cb-priority-t"><li>Low</li><li>Medium</li><li>High</li><li>Urgent</li></menu>
:::

</div>

---

## Chips

Add `.chips`{copy} to show selections as removable chips, and `.multiple`{copy} to allow more than one. Type a value and press Enter, or a comma, to commit it as a chip. Press Backspace on an empty field to remove the last one.

<div x-code-group>

```html copy
<input x-combobox.multiple.chips placeholder="Add emails">
```

::: frame
<input x-combobox.multiple.chips placeholder="Add emails" style="max-width: 30rem;">
:::

</div>

### Separators

Set your own commit keys with the `separators`{copy} option, where each character commits the current entry. So `", "`{copy} commits on a comma or a space. Pasting text that already contains a separator splits it into several chips at once.

<div x-code-group>

```html copy
<input x-combobox.multiple.chips="{ separators: ', ' }" placeholder="Add tags">
```

::: frame
<input x-combobox.multiple.chips="{ separators: ', ' }" placeholder="Add tags" style="max-width: 30rem;">
:::

</div>

### Starting Values

Seed the field with a starting set using the `value`{copy} attribute, written with the same separators.

<div x-code-group>

```html copy
<input x-combobox.multiple.chips value="ana@acme.com, sam@acme.com">
```

::: frame
<input x-combobox.multiple.chips value="ana@acme.com, sam@acme.com" placeholder="Add emails" style="max-width: 30rem;">
:::

</div>

---

## Suggestions List

Point a field at a list of options to filter as the user types. Name the list by its `id`{copy} in the directive value, the same way [dropdowns](/docs/elements/dropdowns) reference their menu. The list is a `<datalist>`{copy} or `<select>`{copy} kept in the page as the source.

A single field lets the user pick one option or type their own. Re-opening it shows the whole list again, so the choice can be swapped.

<div x-code-group>

```html copy
<input x-combobox="countries" placeholder="Country">
<datalist id="countries">
    <option>Australia</option>
    <option>Brazil</option>
    <option>Canada</option>
</datalist>
```

::: frame
<input x-combobox="cb-countries" placeholder="Country" style="max-width: 22rem;">
<datalist id="cb-countries"><option>Australia</option><option>Brazil</option><option>Canada</option><option>Denmark</option><option>France</option><option>Germany</option><option>Japan</option><option>Mexico</option><option>Spain</option><option>Sweden</option></datalist>
:::

</div>

Add `.multiple.chips`{copy} to choose several. Chosen options drop out of the list as they are picked.

<div x-code-group>

```html copy
<input x-combobox.multiple.chips="skills" placeholder="Skills">
<datalist id="skills">
    <option>Design</option>
    <option>Writing</option>
    <option>Research</option>
</datalist>
```

::: frame
<input x-combobox.multiple.chips="cb-skills" placeholder="Skills" style="max-width: 30rem;">
<datalist id="cb-skills"><option>Design</option><option>Writing</option><option>Research</option><option>Strategy</option><option>Testing</option></datalist>
:::

</div>

### Dropdown Menu

For richer rows, author the list as a `<menu popover>`{copy} instead of a datalist, same as dropdown menus. Give each item a `data-value`{copy} for the value to store and a `data-label`{copy} for the chip text. Everything inside the item is free to hold extra content.

<div x-code-group>

```html copy
<input x-combobox.multiple.chips="people" placeholder="Assign people">
<menu popover id="people">
    <li data-value="ana" data-label="Ana Ruiz">Ana Ruiz <span class="trailing">ana@acme.com</span></li>
    <li data-value="sam" data-label="Sam Cole">Sam Cole <span class="trailing">sam@acme.com</span></li>
</menu>
```

::: frame
<input x-combobox.multiple.chips="cb-people" placeholder="Assign people" style="max-width: 30rem;">
<menu popover id="cb-people">
    <li data-value="ana" data-label="Ana Ruiz">Ana Ruiz <span class="trailing">ana@acme.com</span></li>
    <li data-value="sam" data-label="Sam Cole">Sam Cole <span class="trailing">sam@acme.com</span></li>
    <li data-value="kim" data-label="Kim Park">Kim Park <span class="trailing">kim@acme.com</span></li>
    <li data-value="lee" data-label="Lee Nash">Lee Nash <span class="trailing">lee@acme.com</span></li>
</menu>
:::

</div>

---

## Options

Beyond modes, settings are passed as an object in the directive value. The bare id form is shorthand for the `source`{copy} key, so `x-combobox="people"`{copy} and `x-combobox="{ source: 'people' }"`{copy} are the same.

| Option | Purpose |
|--------|---------|
| `source`{copy} | ID of the `<datalist>`, `<select>`, or `<menu>` holding the options |
| `max`{copy} | Most selections allowed; omit for uncapped selections |
| `filter`{copy} | How typed text matches options. See below |
| `separators`{copy} | Characters that commit the current entry as a chip |
| `min`{copy} | Characters to type before remote results are fetched |
| `debounce`{copy} | Milliseconds to wait after typing before fetching. Default `200`{copy} |

---

### Filtering

Set how typed text matches options with the `filter`{copy} option.

| Value | Match |
|-------|-------|
| `includes`{copy} | Text appears anywhere in the option (default mode) |
| `startswith`{copy} | Option begins with the text |
| `none`{copy} | No filtering; always show every option |
| `pattern`{copy} | Match each option's own `data-pattern`{copy} expression against the input |

```html copy
<input x-combobox="{ source: 'countries', filter: 'startswith' }">
```

---

## Modifiers

### New Values

A field accepts anything the user types by default. Add `.create`{copy} to show an explicit "Add …" row for the current text when it does not match an option.

<div x-code-group>

```html copy
<input x-combobox.multiple.chips.create="skills" placeholder="Skills">
```

::: frame
<input x-combobox.multiple.chips.create="cb-skills-create" placeholder="Skills" style="max-width: 30rem;">
<datalist id="cb-skills-create"><option>Design</option><option>Writing</option><option>Research</option><option>Strategy</option></datalist>
:::

</div>

To restrict the field to the list and reject anything else, add `.strict`{copy} instead.

---

### Limit

Cap the number of selections with the `max`{copy} option. Once the limit is reached the field stops accepting input until a chip is removed.

<div x-code-group>

```html copy
<input x-combobox.multiple.chips="{ source: 'skills', max: 3 }" placeholder="Pick up to 3">
```

::: frame
<input x-combobox.multiple.chips="{ source: 'cb-skills-max', max: 3 }" placeholder="Pick up to 3" style="max-width: 30rem;">
<datalist id="cb-skills-max"><option>Design</option><option>Writing</option><option>Research</option><option>Strategy</option><option>Testing</option></datalist>
:::

</div>

---

### Locked Values

Mark a value as locked to keep it in the field but block its removal — its × is hidden and the chip ignores delete while still showing as selected. Flag an option with `data-locked`{copy}, or pass a `locked`{copy} list in the directive. Below, **SSL** is always included so its chip has no remove button, while the other features can be cleared.

<div x-code-group>

```html copy
<input x-combobox.multiple.chips="features" x-model="plan" placeholder="Add features">
<datalist id="features">
    <option data-locked>SSL</option>
    <option>Backups</option>
    <option>Analytics</option>
</datalist>
```

::: frame
<div x-data="{ plan: ['SSL', 'Backups'] }" style="max-width: 30rem;">
<input x-combobox.multiple.chips="cb-plan-lock" x-model="plan" placeholder="Add features">
<datalist id="cb-plan-lock"><option data-locked>SSL</option><option>Backups</option><option>Analytics</option><option>Priority support</option></datalist>
</div>
:::

</div>

The `locked`{copy} list is reactive too: pass `locked: <expression>`{copy} in the config object to lock or unlock values as state changes.

---

### Remote Suggestions

Add `.async`{copy} to fetch options as the user types instead of filtering a fixed list. On each keystroke the field sends a `combobox-filter`{copy} event carrying the typed `value`{copy} and a `setOptions`{copy} callback. Call `setOptions`{copy} with your results to fill the list.

```html copy
<input x-combobox.async="{ min: 1 }" placeholder="Search users"
    @combobox-filter="
        fetch('/api/users?q=' + $event.detail.value)
            .then(r => r.json())
            .then(users => $event.detail.setOptions(users))
    ">
```

::: frame
<div x-data="{ search(e) { const all = ['Ada Lovelace','Alan Turing','Grace Hopper','Katherine Johnson','Linus Torvalds','Margaret Hamilton']; const v = e.detail.value.toLowerCase(); clearTimeout(this._t); this._t = setTimeout(() => e.detail.setOptions(all.filter(n => n.toLowerCase().includes(v))), 400) } }">
<input x-combobox.async="{ min: 1 }" placeholder="Search users" @combobox-filter="search($event)" style="max-width: 26rem;">
</div>
:::

Each result is `{ value, label }`{copy}, or a plain string when the two are the same. The field opens on focus, shows a brief loading state while it waits, and ignores out-of-date responses. Use `min`{copy} to set how many characters are needed before fetching, and `debounce`{copy} to set the pause after typing.

---

## Form Participation

Add a `name`{copy} attribute to submit with a `<form>`. A single text field submits its value directly. A field with chips, or any multiple field, submits one entry per value under that name, which arrives as a list on the server.

<div x-code-group>

```html "Markup" copy
<form>
    <input x-combobox.multiple.chips="tags" name="tags" value="design, research">
    <button type="submit">Save</button>
</form>
```

```txt "Submitted"
tags=design
tags=research
```

</div>

---

## Dynamic Data

Bind a field to state with `x-model`{copy} and it stays in sync both ways. The field renders one chip per value on load and re-renders whenever the bound value changes — so the same combobox both composes a new selection and edits an existing record (switch which record is selected and the chips follow). Adding or removing chips writes straight back to the bound value.

The bound value can be an array or a comma-separated string; the field keeps whatever shape it started with. Any reactive source works, including [local](/docs/core-plugins/local-data) and [cloud](/docs/appwrite-plugins/cloud-data) data through `$x`{copy}.

<div x-code-group>

```html copy
<div x-data="{ member: { roles: ['Design', 'Research'] } }">
    <input x-combobox.multiple.chips="roles" x-model="member.roles" placeholder="Roles">
</div>
```

::: frame
<div x-data="{ roles: ['Design', 'Research'] }" style="display: flex; flex-direction: column; gap: 0.75rem; max-width: 30rem;">
<input x-combobox.multiple.chips="cb-roles-bind" x-model="roles" placeholder="Roles">
<datalist id="cb-roles-bind"><option>Design</option><option>Writing</option><option>Research</option><option>Strategy</option><option>Testing</option></datalist>
<button type="button" class="hug sm" @click="roles = ['Writing', 'Testing']">Load a different record</button>
<code x-text="'roles = ' + JSON.stringify(roles)"></code>
</div>
:::

</div>

When the list carries separate values and labels — a [dropdown menu](#dropdown-menu) with `data-value`{copy}/`data-label`{copy} — the chip shows the label while the bound value holds the token. Pick "Owner" and `roles` stores `owner`, keeping value mapping clean for editing.

---

## Localization

The few built-in UI strings are overridable through the universal `_ui`{copy} block, namespaced under `combobox`{copy}, in any [local data](/docs/core-plugins/local-data) file your project loads. Override only the keys you want. Anything omitted stays in English, and switching [locale](/docs/core-plugins/localization) updates them live.

<div x-code-group copy>

```json "manifest.json"
{
    "data": {
        "content": {
            "en": "/data/content.en.yaml",
            "fr": "/data/content.fr.yaml"
        }
    }
}
```

```yaml "content.fr.yaml"
_ui:
    combobox:
        empty: Aucun résultat
        add: Ajouter « {value} »
        loading: Recherche…
        prompt: Tapez pour rechercher
```

</div>

The `add`{copy} string places the typed text with a `{value}`{copy} token, so translations keep their own word order and punctuation.

| Key | Default | Used for |
|-----|---------|----------|
| `empty`{copy} | No matches | Shown when nothing matches |
| `add`{copy} | Add “{value}” | The `.create` row label |
| `loading`{copy} | Searching… | Shown while remote results load |
| `prompt`{copy} | Type to search | Remote field before enough is typed |

---

## Keyboard

| Key | Action |
|-----|--------|
| `↑` `↓` | Move through the list |
| `Enter` | Select the highlighted option, or commit typed text |
| `Backspace` | Remove the last chip when the field is empty |
| Separator | Commit the current text as a chip |
| `Escape` | Close the list |

---

## Styles

### Theme

Comboboxes use the following [theme](/docs/styles/theme) variables.

| Variable | Purpose |
|----------|---------|
| `--color-field-surface`{copy} | Field background, and the highlighted option |
| `--color-field-surface-hover`{copy} | Field hover background |
| `--color-field-inverse`{copy} | Field text |
| `--color-popover-surface`{copy} | Suggestion menu and chip background |
| `--color-content-stark`{copy} | Chip text and focus ring |
| `--color-content-neutral`{copy} | Chip remove icon and the "Add …" row |
| `--color-content-subtle`{copy} | Caret and empty-state text |
| `--color-negative-surface`{copy} / `--color-negative-inverse`{copy} | Invalid chip |
| `--radius`{copy} | Field, chip, and menu corners |
| `--spacing-field-height`{copy} | Field height |
| `--spacing-field-padding`{copy} | Field padding |
| `--icon-chevron-down`{copy} | Button trigger caret |
| `--transition`{copy} | Interactive transitions |

### Customization

The markup is semantic, so the parts are plain selectors.

| Selector | Part |
|----------|------|
| `.combobox`{copy} | The field shell |
| `.combobox-chip`{copy} | A chip, with its label in a `span` and remove control in a `button` |
| `menu[role=listbox]`{copy} | The suggestion menu |
| `[role=option]`{copy} | An option |
| `[role=option][aria-selected=true]`{copy} | A chosen option |
| `[role=option][aria-current=true]`{copy} | The highlighted option |

```css copy
/* Pill-shaped chips */
.combobox-chip {
    border-radius: 100px;
}
```
