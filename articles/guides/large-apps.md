# Large Apps

Building something big on Manifest — a product with many screens, sign-in, lots of data? Here's how to set it up so it stays fast and easy to change.

---

## Organize Your Code

Once your scripts grow past a few hundred lines, split them into small files that import each other. Browsers do this natively with JavaScript modules, so there's still no build step. An import map gives your folder a short name.

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

::: frame p-0
<iframe src="/assets/examples/modules-demo/index.html" title="Shopping list built from modules" loading="lazy" class="w-full h-[210px] border-0 block"></iframe>
:::

This demo is built exactly that way. Every name here is a stand-in: call the folder, the files and the prefix whatever you like.

<div x-code-group copy>

```html "index.html"
<script type="importmap">
  { "imports": { "@js/": "/js/" } }
</script>
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
<script type="module" src="/js/main.js"></script>
```

```js "main.js"
import { cart } from '@js/cart.js'
import { itemList } from '@js/item-list.js'
import { cartSummary } from '@js/cart-summary.js'

document.addEventListener('alpine:init', () => {
  Alpine.store('cart', cart())
  Alpine.data('itemList', itemList)
  Alpine.data('cartSummary', cartSummary)
})
```

```js "cart-summary.js"
import { formatPrice, total } from '@js/money.js'

export function cartSummary() {
  return {
    get label() {
      const items = this.$store.cart.items
      return items.length ? `${items.length} in cart · ${formatPrice(total(items))}` : 'Cart is empty'
    }
  }
}
```

</div>

Register inside `alpine:init` when a module first runs, and import each file by one URL: adding `?v=2` loads a second copy with its own state.

---

## Share Code with Your Server

If a server, such as a Cloudflare Worker, checks the same things as the page, put those rules in one file that both import. The page and the server then can't disagree, and a change is one edit.

<div x-code-group copy>

```js "rules.js"
export const maxTitle = 80

export function checkTitle(title) {
  if (!title.trim()) return 'required'
  if (title.length > maxTitle) return 'too-long'
}
```

```js "Page"
import { maxTitle, checkTitle } from '@js/rules.js'
```

```js "Worker"
import { checkTitle } from '../rules.js'
```

</div>

Everything the page loads is public, so keep secrets in server code only.

---

## Load Large Tables

An Appwrite table shows its first 25 rows unless you ask for more. Set `paging` on the data source and Manifest loads pages as people scroll, keeping each one live. Filter on the server with `$query`, and save with `$update`: the change shows at once and rolls back if it fails.

```html copy
<div x-virtual class="h-[480px] overflow-auto" @virtual-end="$x.tasks.$more()">
  <template x-for="task in $x.tasks" :key="task.$id">
    <label>
      <input type="checkbox" :checked="task.done" @change="$x.tasks.$update(task.$id, { done: $el.checked })">
      <span x-text="task.title"></span>
    </label>
  </template>
</div>
```

```json "manifest.json" copy
"tasks": { "appwriteTableId": "tasks", "paging": { "mode": "window", "size": 100 } }
```

See [large tables](/docs/framework/appwrite-plugins/databases#large-tables) for every option.

---

## Catch Mistakes Early

A misspelt name often fails only when someone clicks. `mnfst-types` reads your scripts, without changing them, and points at the mistake first.

```bash copy
npx mnfst-types --tsc
```

```text
js/cart-summary.js(1,10): error TS2724: '"@js/money.js"' has no exported member named 'formatPrise'. Did you mean 'formatPrice'?
```

It checks the scripts your page loads and everything they import. See [type checks](/docs/framework/resources/typescript#type-checks).

---

## Test Like a User

List the few things people must always be able to do, like signing in or adding an item, and let `mnfst-test` do them in a real browser (it uses <a href="https://pptr.dev" target="_blank">puppeteer</a>). It saves a screenshot of each step and fails when one changes.

```js "journeys.mjs" copy
export default {
  root: '.',
  journeys: [{
    name: 'add an item',
    async steps(j) {
      await j.page.click('button')
      await j.snap('added')
    }
  }]
}
```

```bash copy
npx mnfst-test journeys journeys.mjs
```

See [golden journeys](/docs/framework/publishing/testing#golden-journeys).
