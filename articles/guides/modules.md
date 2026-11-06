# Splitting Code into Modules

Move app logic out of one long script and into small files that import each other. No build step.

---

## When You'd Want This

- A script has grown past a few hundred lines and is hard to find your way around.
- The same helper is copied into several places.
- Two parts of the page need to share state.
- `x-data` attributes are getting long.

A small site doesn't need any of this. Inline `x-data` is fine until it isn't.

---

## The Idea

<figure class="col gap-3 my-6">
<div class="row-wrap items-center gap-6">
<svg viewBox="0 0 200 190" class="w-[180px] max-w-full h-auto text-content-neutral" role="img" aria-labelledby="modules-before-title">
  <title id="modules-before-title">Before: one script holds the cart state, list behaviour, summary behaviour and formatPrice.</title>
  <rect x="5" y="30" width="190" height="150" rx="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <g fill="currentColor" font-family="inherit" font-size="13">
    <text x="100" y="18" text-anchor="middle" font-weight="600">Before</text>
    <text x="22" y="62">script.js</text>
    <text x="22" y="92" opacity=".7">cart state</text>
    <text x="22" y="114" opacity=".7">list behaviour</text>
    <text x="22" y="136" opacity=".7">summary behaviour</text>
    <text x="22" y="158" opacity=".7">formatPrice()</text>
  </g>
</svg>
<svg viewBox="0 0 410 216" class="grow min-w-[280px] max-w-[440px] h-auto text-content-neutral" role="img" aria-labelledby="modules-after-title">
  <title id="modules-after-title">After: main.js imports a cart store and two components, and both components import a money helper.</title>
  <defs>
    <marker id="modules-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L8 4 L0 8 z" fill="currentColor"/>
    </marker>
  </defs>
  <g fill="none" stroke="currentColor" stroke-width="1.5">
    <rect x="5" y="95" width="80" height="40" rx="8"/>
    <rect x="130" y="20" width="135" height="40" rx="8"/>
    <rect x="130" y="95" width="135" height="40" rx="8"/>
    <rect x="130" y="170" width="135" height="40" rx="8"/>
    <rect x="315" y="132" width="90" height="40" rx="8"/>
  </g>
  <g fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#modules-arrow)">
    <path d="M85 115 C 108 115 108 40 128 40"/>
    <path d="M85 115 L 128 115"/>
    <path d="M85 115 C 108 115 108 190 128 190"/>
    <path d="M265 115 C 290 115 290 152 313 152"/>
    <path d="M265 190 C 290 190 290 152 313 152"/>
  </g>
  <g fill="currentColor" font-family="inherit" font-size="13">
    <text x="197" y="12" text-anchor="middle" font-weight="600">After</text>
    <text x="45" y="120" text-anchor="middle">main.js</text>
    <text x="197" y="45" text-anchor="middle">cart.js</text>
    <text x="197" y="120" text-anchor="middle">item-list.js</text>
    <text x="197" y="195" text-anchor="middle">cart-summary.js</text>
    <text x="360" y="157" text-anchor="middle">money.js</text>
  </g>
</svg>
</div>
<figcaption class="small text-content-subtle">Arrows point from a file to what it imports. Each file lists what it needs at the top.</figcaption>
</figure>

Browsers load JavaScript modules natively. Each file exports what it offers and imports what it uses. An import map gives your folder a short name, so imports read the same from any file.

---

## Example

A shopping list with a running total. The list and the total are separate components that share one cart.

::: frame p-0
<iframe src="/assets/examples/modules-demo/index.html" title="Shopping list built from modules" loading="lazy" class="w-full h-[210px] border-0 block"></iframe>
:::

Every name below is a stand-in. Call the folder, the files and the import prefix whatever you like, and arrange them however suits your project.

### 1. Load the Entry File

In `<head>`, add an import map, then the Manifest loader, then one module that starts everything:

```html "index.html" copy
<script type="importmap">
  { "imports": { "@js/": "/js/" } }
</script>
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
<script type="module" src="/js/main.js"></script>
```

`@js/` now means `/js/`, from any file at any depth.

### 2. Register What the Page Uses

The entry file imports the pieces and hands them to Alpine:

```js "js/main.js" copy
import { cart } from '@js/stores/cart.js'
import { itemList } from '@js/components/item-list.js'
import { cartSummary } from '@js/components/cart-summary.js'

document.addEventListener('alpine:init', () => {
  Alpine.store('cart', cart())
  Alpine.data('itemList', itemList)
  Alpine.data('cartSummary', cartSummary)
})
```

### 3. Write Each Piece

<div x-code-group copy>

```js "js/stores/cart.js"
export function cart() {
  return {
    items: [],
    has(item) { return this.items.some(i => i.id === item.id) },
    toggle(item) {
      this.items = this.has(item) ? this.items.filter(i => i.id !== item.id) : [...this.items, item]
    }
  }
}
```

```js "js/components/item-list.js"
import { formatPrice } from '@js/lib/money.js'

export function itemList() {
  return {
    items: [
      { id: 1, name: 'Apples', cents: 349 },
      { id: 2, name: 'Bread', cents: 425 },
      { id: 3, name: 'Coffee', cents: 1199 }
    ],
    price(item) { return formatPrice(item.cents) },
    inCart(item) { return this.$store.cart.has(item) },
    toggle(item) { this.$store.cart.toggle(item) }
  }
}
```

```js "js/components/cart-summary.js"
import { formatPrice, total } from '@js/lib/money.js'

export function cartSummary() {
  return {
    get label() {
      const items = this.$store.cart.items
      return items.length ? `${items.length} in cart · ${formatPrice(total(items))}` : 'Cart is empty'
    }
  }
}
```

```js "js/lib/money.js"
export function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`
}

export function total(items) {
  return items.reduce((sum, item) => sum + item.cents, 0)
}
```

</div>

### 4. Use Them in Markup

```html "index.html" copy
<header x-data="cartSummary">
  <strong>Shopping list</strong>
  <small x-text="label"></small>
</header>

<ul x-data="itemList">
  <template x-for="item in items" :key="item.id">
    <li>
      <span x-text="item.name"></span>
      <small x-text="price(item)"></small>
      <button @click="toggle(item)" x-text="inCart(item) ? 'Added' : 'Add'"></button>
    </li>
  </template>
</ul>
```

`money.js` knows nothing about Alpine or the page, so any file, or a test, can import it.

---

## Good to Know

These are how browsers and Manifest behave, whatever you name things:

- **Register when the module first runs.** Manifest starts Alpine after your modules have loaded, so an `alpine:init` listener at the top level of a module is always in time. Don't add `async` to the module tag, put `await` before registering, or register inside `import()`.
- **One URL, one copy.** The browser keeps one copy of each module per URL. Adding `?v=2` to an import loads a second copy with its own state, so a store imported both ways splits in two.
- **`Alpine` is the only global you need,** and only inside `alpine:init`.

---

## Moving an Existing Project

Classic `<script>` tags and modules work side by side, so move one file at a time:

1. Add `export` to what the file provides.
2. Import it where it's used, or in your entry file.
3. Remove its `<script>` tag.
