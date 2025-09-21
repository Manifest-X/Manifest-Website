# Data Sources

---

## Setup

Data sources are supported by an Alpine plugin, available on its own or as part of Indux bundles.

<x-code-group copy>

```html "Standalone"
<!-- Alpine -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Indux data sources plugin only -->
<script src="https://cdn.jsdelivr.net/npm/indux/dist/indux.data.js"></script>
```

```html "Indux JS"
<!-- Alpine -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>

<!-- Indux JS -->
<script src="https://cdn.jsdelivr.net/npm/indux/dist/indux.js"></script>
```

```html "Quickstart"
<!-- Indux JS, Alpine, and Tailwind combined -->
<script src="https://cdn.jsdelivr.net/npm/indux/dist/indux.quickstart.js"></script>
```

</x-code-group>

Data sources provide access to content from local JSON/YAML files or cloud APIs, making it easy to manage data across your project. Sources are loaded on-demand and cached for the session duration.

::: brand icon="lucide:info"
Local files are maintained client-side and should not contain sensitive data. Cloud APIs require proper authentication and security measures.
:::

---

## Local Data Sources

Local data sources use JSON or YAML files stored in your project directory.

### Create Local Files

Create JSON or YAML files anywhere in your project. Both formats work identically - choose based on preference.

<x-code-group copy>

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
- name: Darth Vader
  role: Lord
  image: /assets/examples/vader.webp
- name: Admiral Piett
  role: Fleet Commander
  image: /assets/examples/piett.webp
```

</x-code-group>

Local files can use any structure - arrays, objects, or nested combinations. See [localization](/plugins/localization) for details on language-specific data sources.

::: brand icon="lucide:info"
Syntax errors will prevent usability. Use validators like <a href="https://jsonlint.com/" target="_blank">JSON Lint</a> or <a href="https://yamlchecker.com/" target="_blank">YAML Checker</a> to check your files.
:::

---

### Register Local Files

Register local sources in the project's `manifest.json` config file:

```json "manifest.json" copy
{
    "data": {
        "team": "/data/team.json",
        "products": "/data/products.yaml",
        "features": {
            "en": "/data/features/en.yaml",
            "fr": "/data/features/fr.yaml"
        }
    }
}
```

---

## Cloud API Sources

::: brand icon="lucide:info"
Cloud API Sources are in the technology preview stage and may produce varying results.
:::

Cloud sources connect to external APIs and work identically to local sources. API keys and sensitive data should be stored in an `.env` file.

### Basic API Configuration

Only the `url` property is mandatory.

<x-code-group copy>

```json "manifest.json"
{
    "data": {
        "users": {
            "url": "${API_BASE_URL}/users"
        }
    }
}
```

```env ".env"
API_BASE_URL=https://api.myapp.com
API_TOKEN=sk_1234567890abcdef
```

</x-code-group>

---

### Authentication Example

Most APIs require authentication headers. The header names and values depend on the specific API:

<x-code-group copy>

```json "manifest.json"
{
    "data": {
        "users": {
            "url": "${API_BASE_URL}/users",
            "headers": {
                "Authorization": "Bearer ${API_TOKEN}",
                "Content-Type": "application/json"
            }
        }
    }
}
```

```env ".env"
API_BASE_URL=https://api.myapp.com
API_TOKEN=sk_1234567890abcdef
```

</x-code-group>

::: brand icon="lucide:info"
Header names and authentication formats vary by API. Common patterns include `Authorization: Bearer`, `X-API-Key`, or custom headers. Check your API's documentation for the correct format.
:::

---

### Advanced API Configuration

All properties except `url` are optional.

```json "manifest.json" copy
{
    "data": {
        "products": {
            "url": "${API_BASE_URL}/products",
            "method": "GET",
            "headers": {
                "Authorization": "Bearer ${API_TOKEN}",
                "Content-Type": "application/json"
            },
            "params": {
                "limit": 100,
                "status": "active"
            },
            "transform": "data.products",
            "defaultValue": []
        }
    }
}
```

#### Configuration Options

| Property | Required | Default | Description |
|----------|----------|---------|-------------|
| **`url`** | Yes | - | API endpoint URL |
| **`method`** | No | `GET` | HTTP method (GET, POST, PUT, DELETE) |
| **`headers`** | No | `{}` | Request headers for authentication |
| **`params`** | No | `{}` | Query parameters |
| **`transform`** | No | - | Extract nested data (e.g., "data.products") |
| **`defaultValue`** | No | `[]` | Fallback data if API fails |

---

### Common API Patterns

<x-code-group copy>

```json "Generic REST API"
{
    "data": {
        "products": {
            "url": "${API_BASE_URL}/products",
            "headers": {
                "Authorization": "Bearer ${API_TOKEN}"
            },
            "params": {
                "limit": 50,
                "sort": "name"
            }
        }
    }
}
```

```json "GraphQL API"
{
    "data": {
        "posts": {
            "url": "${GRAPHQL_ENDPOINT}",
            "method": "POST",
            "headers": {
                "Authorization": "Bearer ${API_TOKEN}",
                "Content-Type": "application/json"
            },
            "params": {
                "query": "query { posts { id title content } }"
            }
        }
    }
}
```

```json "Appwrite"
{
    "data": {
        "users": {
            "url": "${APPWRITE_ENDPOINT}/databases/${DATABASE_ID}/collections/${COLLECTION_ID}",
            "headers": {
                "X-Appwrite-Project": "${APPWRITE_PROJECT_ID}",
                "X-Appwrite-Key": "${APPWRITE_API_KEY}"
            },
            "transform": "documents"
        }
    }
}
```

</x-code-group>

---

## Display Content

Data sources are accessed using the `$x` magic method with dot notation. The structure follows this pattern:

`$x.sourceName.property[index].subProperty[index]`

**Structure breakdown:**
- `$x` - Magic method prefix
- `sourceName` - Data source name from `manifest.json` (e.g., `team`, `products`, `users`)
- `property` - Object property or array name
- `subProperty` - Nested property (optional at any level)
- `[index]` - Array index (optional)

**Examples:**
- `$x.team` - Access the `team` data source
- `$x.team.managers` - Access the `managers` array or object
- `$x.team.managers[0].name` - First manager's name
- `$x.team.filter(p => p.role === 'Junior Vice President')` - Filter team members by role

---

### Text

Use Alpine's <a href="https://alpinejs.dev/directives/text" target="_blank">x-text</a> to display text from data sources:

<x-code-group copy>

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

</x-code-group>

---

### HTML

Use Alpine's <a href="https://alpinejs.dev/directives/html" target="_blank">x-html</a> for content that includes HTML tags:

<x-code-group copy>

```html "HTML"
<div x-html="$x.team.managers[0].content"></div>
```

```json "team.json"
{
    "managers": [
        {
            "name": "Darth Vader",
            "role": "Lord",
            "image": "/assets/examples/vader.webp"
            "content": "<p>Dark Lord of the Sith with <strong>unlimited power</strong>.</p>"
        },
        ...
    ]
}
```

</x-code-group>

---

### Attributes

Use Alpine's <a href="https://alpinejs.dev/directives/bind" target="_blank">x-bind</a> to bind data to HTML attributes:

```html copy
<img :src="$x.team.managers[0].image" :alt="$x.team[0].name">
<a :href="$x.team.managers[0].linkedin">LinkedIn</a>
```

---

### Lists

Use Alpine's <a href="https://alpinejs.dev/directives/for" target="_blank">x-for</a> in a template to iterate through data arrays:

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

The `<template>` tag (which can only have one child element) creates a loop through the data source array. Use `x-for="item in $x.sourceName"` where `item` is an arbitrary name for the current loop item.

---

### Route-Specific

Use the `route()` function to find content based on the current URL path (e.g. `/team/darth-vader`):

<x-code-group copy>

```html "HTML"
<h1 x-text="$x.team.managers.route('path').name"></h1>
<p x-text="$x.team.managers.route('path').role"></p>
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
        ...
    ]
}
```

</x-code-group>

The `route('path')` function searches the collection for an item where an arbitrary property like `path` matches any segment of the current URL. When found, it returns that item, allowing access to its properties (like `name` and `role`). This enables route-specific content loading without manual URL parsing.

---

### Array Methods

Data sources support all standard JavaScript array methods for filtering, mapping, and transforming data:

#### Filter

```html copy
<!-- Show only team members with "Lord" role -->
<template x-for="person in $x.team.managers.filter(p => p.role === 'Lord')" :key="person.name">
    <div x-text="person.name"></div>
</template>
```

---

#### Map

```html copy
<!-- Transform team data to display names only -->
<template x-for="name in $x.team.managers.map(p => p.name)" :key="name">
    <div x-text="name"></div>
</template>
```

---

#### Find

```html copy
<!-- Find specific team member -->
<div x-text="$x.team.managers.find(p => p.role === 'Lord')?.name || 'Not found'"></div>
```

---

#### Other Methods

Data sources also support `slice()`, `forEach()`, `reduce()`, `some()`, `every()`, and `findIndex()`.