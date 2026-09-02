# Local Data
Load YAML, JSON, or CSV files as reactive data sources.

---

## Overview

Local data consists of CSV, JSON, or YAML files in your project directory. Their content can be used to organize and populate UI content. Files are loaded on-demand and cached in memory until the page reloads.

::: brand icon="lucide:info"
Local files are maintained client-side and should not contain sensitive data. See [cloud data](/docs/appwrite-plugins/cloud-data) for a securely hosted equivalent.
:::

---

## Setup

Data support is included in `manifest.js` with all core plugins, or can be selectively loaded. `manifest.json` is required to register data sources.

<div x-code-group copy>

```html "All Plugins (default)"
<!-- Meta -->
<link rel="manifest" href="/manifest.json">

<!-- Scripts -->
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Selective"
<!-- Meta -->
<link rel="manifest" href="/manifest.json">

<!-- Scripts -->
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="data"></script>
```

</div>

---

## Create Local Data

Create CSV, JSON, or YAML files anywhere in your project directory. Each format works identically—choose based on preference.

<div x-code-group copy>

```csv "contact.csv (key-value)"
key,value
headquarters.name,Empire Headquarters
headquarters.location,Death Star
contact.email,forcechoke69@aol.com
contact.phone,+1-555-0100
```

```csv "team.csv (tabular)"
id,name,role,image
1,Darth Vader,Lord,/assets/examples/vader.webp
2,Admiral Piett,Fleet Commander,/assets/examples/piett.webp
```

```json "team.json"
[
    {
        "name": "Darth Vader",
        "role": "Lord",
        "image": "/assets/examples/vader.webp"
    },
    {
        "name": "Admiral Piett", 
        "role": "Fleet Commander",
        "image": "/assets/examples/piett.webp"
    }
]
```

```yaml "team.yaml"
-   name: Darth Vader
    role: Lord
    image: /assets/examples/vader.webp
-   name: Admiral Piett
    role: Fleet Commander
    image: /assets/examples/piett.webp
```

</div>

Local files can use any structure - arrays, objects, or nested combinations. See [localization](/docs/core-plugins/localization) for details on language-specific data sources.

::: brand icon="lucide:info"
Syntax errors will prevent usability. Use validators like <a href="https://jsonlint.com/" target="_blank">JSON Lint</a> or <a href="https://yamlchecker.com/" target="_blank">YAML Checker</a> to check your files.
:::

### CSV Formatting

CSV files support two parsing modes, automatically detected based on structure.

**Key-Value Mode** (nested object):
- First column is `key`, second column is `value`
- Supports dot notation for nesting (`contact.name` → `{ contact: { name: "..." } }`)
- Returns a nested object structure
- Use for structured configuration or hierarchical data
- List-like (array of objects) use numeric path segments, e.g. `features.0.name`, `features.0.description`, `features.1.name`, `features.1.description`, interpreted as a real array and supporting `x-for="item in $x.sourceName.features"` in Alpine

**Tabular Mode** (array of objects):
- First column header is `id` (case-insensitive)
- Returns an array of objects, one per row
- Use for lists of similar items (team members, products, etc.)

CSV files can also include locale columns for multilingual content. See [localization](/docs/core-plugins/localization) for details.

---

## Register Local Data

Register local data in the project's `manifest.json`. Under the `data` property, declare each file with its custom filepath from the project root:

```json "manifest.json" copy
{
    "data": {
        "team": "/data/team.json",
        "contact": "/data/contact.csv"
    }
}
```

---

## API Sources

Register an HTTP endpoint as a data source the same way as a file. Currently read-only, only `GET` requests are fully supported. For full CRUD with realtime sync, use [Appwrite databases](/docs/appwrite-plugins/databases).

For an endpoint with no auth or transformation, register the URL string directly:

```json "manifest.json" copy
{
    "data": {
        "weather": "https://api.example.com/weather"
    }
}
```

For headers, query params, or response shaping, use an object with git-ignored `.env` variable references as needed:

<div x-code-group>

```json "manifest.json" copy
{
    "data": {
        "products": {
            "url": "${API_BASE_URL}/products",
            "headers": {
                "Authorization": "Bearer ${API_TOKEN}",
                "Content-Type": "application/json"
            },
            "params": {
                "limit": 50,
                "status": "active"
            },
            "transform": "data.products",
            "defaultValue": []
        }
    }
}
```

```env ".env" copy
API_BASE_URL=https://api.example.com
API_TOKEN=sk_1234567890abcdef
```

</div>

| Property | Required | Default | Description |
|----------|----------|---------|-------------|
| `url` | Yes | – | Endpoint URL |
| `headers` | No | `{}` | Request headers for auth and content type |
| `params` | No | `{}` | Query parameters appended to the URL |
| `transform` | No | – | Dot-notation path to extract nested data (e.g. `"data.products"` unwraps `{ data: { products: [...] } }`) |
| `defaultValue` | No | `[]` | Fallback if the request fails |

API sources behave the same as local sources, accessed via `$x.sourceName` with the same loading/error/ready state and `$search` / `$query` / `$route` helpers (see [Display Content](#display-content) below).

---

## Persisted Data

Any data source can keep its last rows on the visitor's device, so the next visit shows them before the network answers. Persistence is off unless a source asks for it, and it works for local, API and Appwrite sources alike.

```json "manifest.json" copy
{
    "data": {
        "chats": { "url": "${API_BASE_URL}/chats", "persist": true },
        "contacts": {
            "url": "${API_BASE_URL}/contacts",
            "persist": { "tier": "lazy", "maxRows": 2000, "recent": "updatedAt", "ttl": "7d", "strip": ["email", "phone"] }
        }
    }
}
```

| Option | Default | Effect |
|---|---|---|
| `tier` | `boot` | `boot` restores rows before the first paint; `lazy` restores on the first read of the source |
| `maxRows` | `1000` | How many rows to keep, most recent first |
| `recent` | `$updatedAt` | The field that decides which rows are most recent |
| `ttl` | `7d` | Saved rows older than this are ignored |
| `strip` | `[]` | Fields removed from every row before it is saved. Names, or patterns like `credentials*`. Fields matching `*secret*`, `*token*`, `*password*` and `credentials*` are always removed |

Restored rows are marked stale: `$x.chats.$stale`{copy} is `true` until the first network response replaces them. Rows missing from that response are removed, so a deleted record never lingers. If the network fails, the restored rows stay and `$error` is set.

**Scope.** Sites where one visitor can see different data, such as a workspace switcher, set a scope so rows from one workspace never appear in another:

```json "manifest.json" copy
{
    "persistence": { "scope": "$auth.currentTeam?.$id" }
}
```

The expression is re-evaluated whenever authentication changes. While sign-in is still resolving, nothing is saved or cleared. When the scope changes, the previous scope's rows are removed from the device and from memory before anything renders. Signing out always clears saved rows.

**Clearing.** `$x.$wipe()`{copy} removes every saved row for the current scope, `$x.$wipe('chats')`{copy} one source, and `$x.$wipe({ all: true })`{copy} everything. `ManifestData.persistence()`{copy} reports what is enabled and saved. Saving happens after data arrives, never during your own edits, and if the browser refuses storage the site simply runs without it.

---


## Display Content

Data sources are accessed in HTML using our `$x` magic method with dot notation. The structure follows this pattern:

`$x.sourceName.property.subProperty`

**Structure breakdown:**
- `$x` - Magic method prefix
- `sourceName` - Data source name from `manifest.json` (e.g., `team`, `features`, `pricing`)
- `property` - Object property or array name
- `subProperty` - Nested property (optional at any level)

**Examples:**
- `$x.team` - Access the `team` data source
- `$x.team.managers` - Access the `managers` array or object
- `$x.team.managers[0].name` - Display the first manager's name
- `$x.team.filter(p => p.role === 'Junior Vice President')` - Filter team members by role

---

### Text

Use Alpine's <a href="https://alpinejs.dev/directives/text" target="_blank">x-text</a> to display text from data sources:

<div x-code-group copy>

```html "HTML"
<h4 x-text="$x.team.managers[0].name"></h4>
<p x-text="$x.team.managers[0].role"></p>
```

```json "team.json"
{
    "managers": [
        {
            "name": "Darth Vader",
            "role": "Lord",
            "image": "/assets/examples/vader.webp"
        },
        ...
    ]
}
```

::: frame
<h4 x-text="$x.example.team[0].name"></h4>
<p x-text="$x.example.team[0].role"></p>
:::

</div>

---

### HTML

Use Alpine's <a href="https://alpinejs.dev/directives/html" target="_blank">x-html</a> for content that includes HTML tags:

<div x-code-group copy>

```html "HTML"
<div x-html="$x.team.managers[0].content"></div>
```

```json "team.json"
{
    "managers": [
        {
            "name": "Darth Vader",
            "role": "Lord",
            "image": "/assets/examples/vader.webp",
            "content": "<p>Dark Lord of the Sith with <strong>unlimited power</strong>.</p>"
        },
        ...
    ]
}
```

::: frame
<div x-html="'<p>Dark Lord of the Sith with <strong>unlimited power</strong>.</p>'"></div>
:::

</div>

---

### Attributes

Use Alpine's <a href="https://alpinejs.dev/directives/bind" target="_blank">x-bind</a> to bind data to HTML attributes:

<div x-code-group copy>

```html "HTML"
<img :src="$x.team.managers[0].image" :alt="$x.team.managers[0].name">
<a :href="$x.headquarters.contact.email">Contact</a>
```

::: frame col gap-1 items-start
<img :src="$x.example.team[0].image" :alt="$x.example.team[0].name" class="w-20 h-20 object-cover rounded">
<a :href="$x.example.team[0].contact" x-text="$x.example.team[0].contact"></a>
:::

</div>

---

### Lists

Use Alpine's <a href="https://alpinejs.dev/directives/for" target="_blank">x-for</a> in a template to iterate through data arrays:

<div x-code-group>

```html copy
<template x-for="person in $x.team.managers" :key="person.name">
    <div class="card">
        <img :src="person.image" :alt="person.name">
        <div>
            <p x-text="person.name"></p>
            <small x-text="person.role"></small>
        </div>
    </div>
</template>
```

::: frame row-wrap gap-6
<template x-for="person in $x.example.team" :key="person.name">
    <div class="grow w-[160px] min-w-[160px] bg-page shadow">
        <img :src="person.image" :alt="person.name" class="aspect-square object-cover mt-0 mb-xs">
        <div class="p-4">
            <p x-text="person.name"></p>
            <small x-text="person.role"></small>
        </div>
    </div>
</template>
:::

</div>

The `<template>` tag (which can only have one child element) creates a loop through the data source array. Use `x-for="item in $x.sourceName"` where `item` is an arbitrary name for the current loop item.

**Prerender (SEO):** Static lists are kept in prerendered HTML for crawlers. The prerender script collapses lists it infers are dynamic (search/query, URL params, auth, or getter names like `filteredTeam`), or you can force collapse with `data-prerender="dynamic"` on the `<template>`.

`<template x-for>` iterating data-source values (e.g. `group in $x.docs`) defaults to client-side rendering — the baked clones are stripped and Alpine re-renders the list at runtime — so locale switches and other reactive updates work without producing duplicates. To freeze that list into the static HTML for SEO instead, add `data-static` to the `<template>` or any ancestor. Manifest will keep the baked clones, remove the template so Alpine has nothing left to iterate, and strip per-item loop bindings (the resolved values are already in the DOM). Element-level bindings that reference global state (e.g. `:class` using `$x.foo.$route('path')`) remain live; only the iteration is frozen.

`data-static` extends to other prerender-time templates too — anything that emits its rendered output as DOM siblings, such as `<template x-anchors>` for table-of-contents links. Without `data-static`, the runtime plugin re-runs and produces a duplicate render alongside the baked one. Wrapping the template in `[data-static]` removes the source `<template>` after prerender, so the runtime plugin sees nothing to render and the baked output stands alone.

Use `data-hydrate` on any wrapper to preserve a subtree as-is during prerender transforms — bindings stay attached and Alpine hydrates them at runtime.

---

### Search & Query

Use `$search` for real-time text filtering and `$query` for advanced filtering, sorting, and pagination. Both methods work client-side on data already loaded in the browser.

<div x-code-group lines copy collapse="10">

```html copy
<div x-data="{ 
    searchTerm: '', 
    sortBy: 'name',
    get filteredTeam() {
        if (!$x.team) return [];
        let results = this.searchTerm 
            ? $x.team.$search(this.searchTerm, 'name', 'role')
            : $x.team;
        return this.sortBy !== 'all' 
            ? $x.team.$query([['orderAsc', this.sortBy]])
            : results;
    }
}">
    <!-- Search Input -->
    <input 
        type="text" 
        placeholder="Search team members..." 
        x-model="searchTerm"
    />
    
    <!-- Sort Buttons -->
    <button @click="sortBy = 'name'"> Sort by Name </button>
    <button @click="sortBy = 'role'"> Sort by Role </button>
    <button @click="sortBy = 'all'; searchTerm = ''"> Reset </button>
    
    <!-- Results List -->
    <template x-for="person in filteredTeam" :key="person.name">
        <div>
            <p x-text="person.name"></p>
            <small x-text="person.role"></small>
        </div>
    </template>
    <small x-show="searchTerm && filteredTeam.length === 0">No team members found</small>
</div>
```

::: frame col
<div x-data="{ 
    searchTerm: '', 
    sortBy: 'all',
    get filteredTeam() {
        if (!$x.example || !$x.example.team || !Array.isArray($x.example.team)) return [];
        try {
            let results = this.searchTerm && $x.example.team.$search
                ? $x.example.team.$search(this.searchTerm, 'name', 'role')
                : $x.example.team;
            return this.sortBy !== 'all' && $x.example.team.$query
                ? $x.example.team.$query([['orderAsc', this.sortBy]])
                : results;
        } catch (e) {
            return $x.example?.team || [];
        }
    }
}" class="col gap-4">

    <div class="row-wrap gap-2">
        <!-- Search Input -->
        <input 
            type="text" 
            placeholder="Search team members..." 
            x-model="searchTerm"
            class="grow w-fit"
        />
        
        <!-- Sort Buttons -->
        <button @click="sortBy = 'name'">
            Sort by Name
        </button>
        <button @click="sortBy = 'role'">
            Sort by Role
        </button>
        <button @click="sortBy = 'all'; searchTerm = ''">
            Reset
        </button>
    </div>
    
    <!-- Results List -->
    <div class="col gap-2">
        <template x-for="person in filteredTeam" :key="person.name">
            <div class="p-2 border-t border-line">
                <p x-text="person.name" class="font-semibold"></p>
                <small x-text="person.role" class="text-muted"></small>
            </div>
        </template>
        <small x-show="searchTerm && filteredTeam.length === 0" class="text-muted">No team members found</small>
    </div>
</div>
:::

</div>

Both `$search` and `$query` operate **client-side** (in the browser) for local data sources:

- **`$search(term, ...attributes)`**: Real-time text filtering across specified attributes. Returns filtered array immediately.
- **`$query(queries)`**: Advanced filtering, sorting, and pagination using query arrays. Processes data in browser.

For cloud-hosted data with backend filtering, see [Appwrite databases](/docs/appwrite-plugins/databases).

#### Weighted Search

Pass an object of field weights instead of field names and `$search` returns **ranked** results. Each whitespace-separated term must match at least one field; items score by the best-matching field's weight per term, with prefix matches boosted. Higher scores rank first.

```javascript copy
// Title matches outrank body matches
$x.articles.$search('toast', { title: 3, headings: 2, body: 1 })

// Multiple terms all must match somewhere
$x.articles.$search('cursor pagination', { title: 3, body: 1 })
```

#### Runtime Sources

`$x.$register(name, data)` installs (or replaces) a data source at runtime — an array or object built in the browser, such as fetched content or a derived index. It behaves like any `manifest.json` source: reactive, with the same `$search` / `$query` / `$route` helpers.

```javascript copy
$x.$register('searchIndex', records)
$x.searchIndex.$search(term, { title: 3, body: 1 })
```

#### Query Syntax

Each query is an array with the format `['method', 'attribute', 'value']`. Use these patterns:

<div x-code-group copy>

```javascript "Patterns" copy
// Comparison operators
['equal', 'role', 'Lord']                    // role equals 'Lord'
['notEqual', 'role', 'Commander']            // role does not equal 'Commander'
['greaterThan', 'priority', 5]              // priority greater than 5
['greaterThanOrEqual', 'priority', 5]       // priority greater than or equal to 5
['lessThan', 'priority', 10]                // priority less than 10
['lessThanOrEqual', 'priority', 10]        // priority less than or equal to 10
['between', 'priority', 5, 10]              // priority between 5 and 10 (inclusive)

// Null checks
['isNull', 'deletedAt']                     // deletedAt is null
['isNotNull', 'email']                       // email is not null

// String operations
['contains', 'name', 'Vader']               // name contains 'Vader' (case-insensitive)
['startsWith', 'name', 'Darth']             // name starts with 'Darth' (case-insensitive)
['endsWith', 'name', 'Vader']               // name ends with 'Vader' (case-insensitive)

// Sorting
['orderAsc', 'name']                        // Sort ascending by name
['orderDesc', 'name']                       // Sort descending by name
['orderRandom']                             // Random order

// Pagination
['limit', 10]                               // Return maximum 10 results
['offset', 20]                              // Skip first 20 results

// Combine multiple queries (all applied together)
[
    ['equal', 'role', 'Lord'],
    ['orderAsc', 'name'],
    ['limit', 5]
]
```

```html "Example"
<!-- Filter, sort, limit: processes data in browser (client-side) -->
<button @click="$x.team.$query([
    ['equal', 'role', 'Lord'],
    ['orderAsc', 'name']
])">Show Lords Only</button>

<!-- Multiple filters -->
<button @click="$x.team.$query([
    ['contains', 'name', 'Vader'],
    ['orderDesc', 'name'],
    ['limit', 5]
])">Top 5 Vader Matches</button>
```

</div>

---

### Route-Specific

Use the `$route()` function to find content based on the current URL path like **/team/darth-vader**:

<div x-code-group copy>

```html "HTML"
<h1 x-text="$x.team.managers.$route('path').name"></h1>
<p x-text="$x.team.managers.$route('path').role"></p>
```

```json "team.json"
{
    "managers": [
        {
            "path": "darth-vader",
            "name": "Darth Vader",
            "role": "Lord",
            "image": "/assets/examples/vader.webp"
        },
        {
            "path": "admiral-piett",
            "name": "Admiral Piett",
            "role": "Fleet Commander",
            "image": "/assets/examples/piett.webp"
        }
    ]
}
```

::: frame
<h1 x-text="$x.example.team[0].name"></h1>
<p x-text="$x.example.team[0].role"></p>
:::

</div>

The `$route('path')` function searches the collection for an item where the specified property (e.g., `path`) matches any segment of the current URL path. When found, it returns a reactive proxy to that item, allowing access to its properties.

**How it works:**
- Compares the property value against URL path segments (e.g., `/team/darth-vader` or `/team/mgmt/darth-vader/bio` → matches `"darth-vader"`)
- Automatically filters out language codes from the path (e.g., `/fr/team/darth-vader` → matches `"darth-vader"`)
- Searches recursively through nested arrays and objects
- Returns a reactive proxy that updates when the URL changes
- Returns empty values if no match is found (prevents errors)

---

### Array Methods

Data sources support all standard JavaScript array methods for filtering, mapping, and transforming data:

#### Filter

<div x-code-group copy>

::: frame col items-start
<template x-for="person in $x.example.team.filter(p => p.role === 'Sith Lord')" :key="person.name">
    <div x-text="person.name"></div>
</template>
:::

```html "HTML"
<!-- Show only team members with "Lord" role -->
<template x-for="person in $x.team.managers.filter(p => p.role === 'Lord')" :key="person.name">
    <div x-text="person.name"></div>
</template>
```

</div>

---

#### Map

<div x-code-group copy>

```html "HTML"
<!-- Transform team data to display names only -->
<template x-for="name in $x.team.managers.map(p => p.name)" :key="name">
    <div x-text="name"></div>
</template>
```

::: frame col items-start
<template x-for="name in $x.example.team.map(p => p.name)" :key="name">
    <div x-text="name"></div>
</template>
:::

</div>

---

#### Find

<div x-code-group copy>

```html "HTML"
<!-- Find specific team member -->
<div x-text="$x.team.managers.find(p => p.role === 'Lord')?.name || 'Not found'"></div>
```

::: frame
<div x-text="$x.example.team.find(p => p.role === 'Sith Lord')?.name || 'Not found'"></div>
:::

</div>

---

#### Other Methods

Data sources support standard JavaScript array methods:

**Transformation (return new array / value):**
- `map()` — transform each item
- `filter()` — filter items by condition
- `reduce()` / `reduceRight()` — reduce to a single value
- `slice()` — extract a portion of the array
- `concat()` — combine with another array
- `flat()` / `flatMap()` — flatten nested arrays
- `sort()` / `reverse()` — return ordered copies
- `join()` — convert to string

**Search:**
- `find()` / `findIndex()` — locate the first matching item / its index
- `includes()` — check whether the array includes a value
- `indexOf()` / `lastIndexOf()` — find the index of a value

**Iteration:**
- `forEach()` — execute a function for each item

**Testing:**
- `some()` / `every()` — check whether any / all items match

**Modification (in-memory only):**
- `push()` / `pop()` / `shift()` / `unshift()` / `splice()`

::: brand icon="lucide:info"
Mutation methods on local data sources update the in-memory store and trigger reactivity, but **do not persist** — values reset to the file's contents on page reload. For persistence, use [Appwrite databases](/docs/appwrite-plugins/databases).
:::

---

## State Properties

Data sources expose state properties for UI reactivity:

- `$x.sourceName.$loading` - Boolean indicating if data is loading
- `$x.sourceName.$error` - Error message string (null if no error)
- `$x.sourceName.$ready` - Boolean indicating if data has loaded successfully
- `$x.sourceName.$stale` - Boolean indicating cached rows are showing while fresh data loads (see [how data updates](#how-data-updates))

```html copy
<!-- Loading state -->
<div x-show="$x.team.$loading">Loading team data...</div>

<!-- Error state -->
<div x-show="$x.team.$error" x-text="$x.team.$error" class="text-error"></div>

<!-- Ready state -->
<div x-show="$x.team.$ready && !$x.team.$loading">
    Team loaded: <b x-text="$x.team.length"></b> members
</div>
```

These properties are reactive and update automatically as data loads or errors occur.

---

## How Data Updates

The parts of the page that read `$x.team` follow only the `team` source. When one source updates, only the parts of the page that read it are refreshed — everything else is left alone.

Rows keep their identity. When new data arrives for rows you already have, the existing rows are updated in place, so lists don't flicker and edits you are making are not disturbed. Fields you add to a row yourself (a `_pending` flag on a placeholder, say) survive too — the network never sends them, so nothing clears them for you; clear them explicitly once the real data has landed.

Your own changes show immediately. Direct assignments and array mutations (and `$create`, `$update` and `$delete` on [cloud sources](/docs/appwrite-plugins/cloud-data)) appear on the page at once, even while data is still arriving from the network.

Network updates are batched. Many arriving at once are applied together, once per frame.

If a source was loaded before, you see its cached rows immediately while fresh data loads. `$x.team.$stale` is `true` until the fresh data has landed, and `$x.team.$fresh` is a promise that resolves at that moment, for a single reveal. A reload keeps the rows on screen and merges the fresh data in place; a failed reload keeps the old rows and sets `$error`. Identical concurrent loads make one request.

```html copy
<small x-show="$x.team.$stale">Refreshing…</small>
```

---

## Safe Async

The `$try` magic wraps an async callback in try/catch and optionally routes the error message to a named property on the current `x-data` scope. Useful when calling cloud-data mutations or any other async operation that can fail.

```html copy
<div x-data="{ saveError: null }">
    <button @click="$try(() => $x.products.$create({ name: 'New' }), 'saveError')">
        Save
    </button>
    <small x-show="saveError" x-text="saveError" class="text-error"></small>
</div>
```

| Argument | Description |
|---|---|
| `fn` | Async callback to await. The callback's result is returned on success |
| `errorVar` *(optional)* | Name of a property on the current `x-data` scope. On error, the error message is written there; on success it's cleared to `null` |

On error, `$try` returns `undefined` instead of throwing.