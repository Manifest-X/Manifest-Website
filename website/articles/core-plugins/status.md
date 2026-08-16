# Status
Track the health of your services and display it with `$status`.

---

## Setup

The status plugin is included in `manifest.js` with all core plugins, or can be selectively loaded. It activates when `manifest.json` contains a `status` block.

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
    data-plugins="status"></script>
```

</div>

---

## Configuration

Add a `status` block to `manifest.json`. Each key becomes a top-level status at `$status.<name>`, rolled up from its underlying signals. A value can be a string (a single probe), an array (several signals rolled up), or an object (a single signal, or an aggregate with options).

```json "manifest.json" copy
{
    "status": {
        "website": "https://example.com",
        "docs": ["https://docs.example.com", "https://cdn.example.com"],
        "api": {
            "url": "https://api.example.com/health",
            "degradedAbove": 800
        },
        "cloud": {
            "signals": [
                { "appwriteService": "databases", "label": "database" },
                { "mirror": "appwrite", "label": "upstream" }
            ],
            "rollup": "worst",
            "refresh": 30000
        }
    }
}
```

A single project can mix sources freely, with the provider behind each signal is inferred from which field is present.

| Field | Signal | Behavior |
|---|---|---|
| `url`{copy} | HTTP probe | Fetches the endpoint; reads reachability and latency. |
| `feed`{copy} | Status feed | Reads a normalized status JSON the endpoint returns. |
| `static`{copy} | Literal | A fixed state — useful for placeholders or manual control. |
| `appwriteService`{copy} | Appwrite | Resolves against your Appwrite endpoint's `/health`. |
| `mirror`{copy} | Upstream | Reflects a known third party's own status. |
| `heartbeat`{copy} | Dead-man's switch | A job calls `$status.beat(key)`; silence reads as down. |
| `mcp`{copy} | Manifest hosting | Hosted signal for projects published with Manifest AI. |

---

### Probes & Feeds

For a service you own, probe an endpoint directly or read a status feed it publishes.

- **`url`** has the browser fetch the endpoint and infer state from the response (`2xx` is operational; a `degradedAbove` latency threshold marks it degraded). Simplest, but bound by CORS and run per visitor, so it suits same-origin or CORS-enabled endpoints.
- **`feed`** reads a small JSON document your backend produces and maps its state onto the Manifest vocabulary. This avoids CORS and can represent what a probe cannot, such as background workers and queues.

<div x-code-group copy>

```json "Probe"
{
    "status": {
        "api": {
            "url": "https://api.example.com/health",
            "expect": 200,
            "degradedAbove": 800
        }
    }
}
```

```json "Feed"
{
    "status": {
        "api": {
            "feed": "https://api.example.com/status.json",
            "path": "components.api"
        }
    }
}
```

```json "Feed response"
{
    "components": {
        "api": "operational"
    }
}
```

</div>

A network error, timeout, or CORS block resolves a probe to `unknown` rather than a false outage. The plugin never reports "down" when it simply could not reach the endpoint.

---

### Mirrors

A `mirror` reflects a third party's own published status. Common providers are built in by name — `github`, `cloudflare`, `stripe`, `openai`, `anthropic`, `discord`, `npm`, `vercel`, `netlify`, `appwrite` — and any service running an Atlassian Statuspage works by passing its base URL directly.

```json "Mirror examples" copy
{
    "status": {
        "payments": { "mirror": "stripe" },
        "ai": { "mirror": "anthropic" },
        "custom": { "mirror": "https://status.example.com" }
    }
}
```

---

## States

Every signal and entry resolves to one of these states.

| State | Level | Meaning |
|---|---|---|
| `operational`{copy} | 0 | Healthy |
| `maintenance`{copy} | 0.5 | Planned downtime |
| `degraded`{copy} | 1 | Working but impaired (e.g. slow) |
| `partial_outage`{copy} | 2 | Some functionality unavailable |
| `major_outage`{copy} | 3 | Down |
| `unknown`{copy} | -1 | No signal yet, or could not be reached |

A `feed` or `mirror` may return its own vocabulary (`up`, `down`, `pass`, `minor`, etc.) — the plugin maps common terms onto the table above.

---

### Labels

`$status.label(state)` turns a state into a display string (`major_outage` → "Major Outage"). Labels default to English but localize through the `_ui` convention — the same mechanism as the datepicker (`_ui.date`) and [colorpicker](/docs/elements/color-pickers) (`_ui.colorpicker`). Provide overrides under `_ui.status.label` in any loaded data source, per locale:

```yaml "labels.fr.yaml" copy
_ui:
  status:
    label:
      operational: Opérationnel
      degraded: Dégradé
      partial_outage: Panne Partielle
      major_outage: Panne Majeure
      maintenance: Maintenance
      unknown: Inconnu
```

`$status.label(state)` — and anything that uses it — then returns the localized string, reactive to the current [locale](/docs/core-plugins/localization).

---

## Rollup & Options

Aggregate entries accept options alongside their `signals`.

| Option | Default | Description |
|---|---|---|
| `rollup`{copy} | `"worst"` | How children combine: `worst` takes the most severe, `best` the least. |
| `refresh`{copy} | `30000` | Poll interval in milliseconds. |
| `confirmations`{copy} | `1` | Consecutive observations required before a state change (debounce). |
| `staleAfter`{copy} | `refresh × 3` | Milliseconds without a known signal before `stale` becomes `true`. |
| `history`{copy} | `90` | Number of recent checks retained for the uptime meter. |

By default, blocks with no options set or a bare `"website": "https://example.com"` will poll every 30 seconds, rolls up worst-first, and goes stale after 90 seconds.

---

## Reading Status

`$status.<name>` returns a reactive health object. Read whatever you need; every read re-evaluates when the underlying signals update.

| Property | Type | Description |
|---|---|---|
| `state`{copy} | string | Rolled-up state (see [States](#states)). |
| `up`{copy} | boolean | `true` only when `state` is `operational`. |
| `level`{copy} | number | Severity, `0` (operational) to `3` (major outage), `-1` unknown. |
| `latencyMs`{copy} | number \| null | Average probe latency, when measured. |
| `message`{copy} | string \| null | A human update attached to the state (from a feed or `$status.set`), or `null`. |
| `stale`{copy} | boolean | `true` when no fresh signal has arrived within the stale window. |
| `updatedAt`{copy} | number | Timestamp of the last resolution. |
| `signals`{copy} | array | The underlying inputs, each with its own `label` and `state`. |
| `uptime`{copy} | number \| null | Percent operational over the retained history window. |
| `history`{copy} | array | Recent observed states, oldest to newest. |
| `incidents`{copy} | array | Open and recent incidents for this service. |

The magic also exposes a few helpers:

| Accessor | Description |
|---|---|
| `$status.overall`{copy} | Worst state across every entry. |
| `$status.all`{copy} | The map of all entries. |
| `$status.ready`{copy} | `true` once the first resolution pass has run. |
| `$status.incidents`{copy} | All incidents across every service, newest first. |
| `$status.label(state)`{copy} | Human label for a state string (`major_outage` → "Major Outage"). |

Address a service by name, or iterate `$status` directly — each item is a health object, so you read it with dot notation just like a `$x` source.

<div x-code-group>

```html copy
<p x-text="$status.API.state"></p>

<template x-for="(service, name) in $status" :key="name">
    <span x-text="name + ': ' + service.state"></span>
</template>
```

::: frame col gap-1 items-start
<p>API: <strong x-text="$status.API.state"></strong></p>
<template x-for="(service, name) in $status" :key="name">
    <small><span x-text="name"></span>: <span x-text="service.state.replace('_',' ')"></span></small>
</template>
:::

</div>

---

## UI Templates

The plugin gives you state; the presentation is yours. These templates range from a full status page down to a single indicator — each reads the same `$status` values, including the built-in `service.uptime`, the `service.history` meter, and `$status.incidents`. History accrues live as the plugin polls (or is hydrated from a feed); incidents are logged whenever you post an update with `$status.set`.

<div x-code-group lines collapse="10" copy>

```html "Status Page"
<div class="col gap-10 w-full">

    <!-- Headline banner -->
    <div class="row items-center gap-3 p-4 bg-page border border-line rounded-lg">
        <figure style="size-6 rounded-full"
            :class="{
                'bg-positive-content':$status.overall==='operational',
                'bg-yellow-400':$status.overall==='degraded',
                'bg-orange-400':$status.overall==='partial_outage',
                'bg-negative-content':$status.overall==='major_outage',
                'bg-surface-3':$status.overall==='maintenance',
                'bg-surface-3':$status.overall==='unknown'
            }"></figure>
        <p x-text="$status.overall==='operational' ? 'All systems operational' : 'Some systems are experiencing issues'"></p>
    </div>

    <!-- Status list -->
    <template x-for="(service, name) in $status" :key="name">
        <div class="col gap-1">

            <!-- Title -->
            <div class="row items-center justify-between">
                <strong x-text="name"></strong>
                <small x-text="service.uptime + '% uptime'"></small>
            </div>

            <!-- Daily status -->
            <div class="row" style="gap:2px;">
                <template x-for="(day,i) in service.history" :key="i">
                    <figure x-tooltip="`${$status.label(day)}`" class="flex-1 h-6 rounded-xs"
                        :class="{
                            'bg-positive-content':day==='operational',
                            'bg-yellow-400':day==='degraded',
                            'bg-orange-400':day==='partial_outage',
                            'bg-negative-content':day==='major_outage',
                            'bg-surface-3':day==='maintenance',
                            'bg-surface-3':day==='unknown'
                        }"></figure>
                </template>
            </div>

        </div>
    </template>

    <!-- Incident history -->
    <div class="col gap-4">
        <strong>Past Incidents</strong>
        <template x-for="inc in $status.incidents" :key="inc.id">
            <div class="row items-center gap-3 p-2 border-t border-line">
                <small class="min-w-14 capitalize" x-text="inc.name"></small>
                <div class="capitalize"><span x-text="inc.message || $status.label(inc.state)"></span> ∙ <small x-text="inc.resolved ? 'resolved' : $status.label(inc.state)"></small></div>
            </div>
        </template>
        <small x-show="!$status.incidents.length" class="text-content-subtle">No incidents reported</small>
    </div>
</div>
```

::: frame "Status Page"
<div class="col gap-10 w-full">

    <!-- Headline banner -->
    <div class="row items-center gap-3 p-4 bg-page border border-line rounded-lg">
        <figure style="size-6 rounded-full"
            :class="{
                'bg-positive-content':$status.overall==='operational',
                'bg-yellow-400':$status.overall==='degraded',
                'bg-orange-400':$status.overall==='partial_outage',
                'bg-negative-content':$status.overall==='major_outage',
                'bg-surface-3':$status.overall==='maintenance',
                'bg-surface-3':$status.overall==='unknown'
            }"></figure>
        <p x-text="$status.overall==='operational' ? 'All systems operational' : 'Some systems are experiencing issues'"></p>
    </div>

    <!-- Status list -->
    <template x-for="(service, name) in $status" :key="name">
        <div class="col gap-1">

            <!-- Title -->
            <div class="row items-center justify-between">
                <strong x-text="name"></strong>
                <small x-text="service.uptime + '% uptime'"></small>
            </div>

            <!-- Daily status -->
            <div class="row" style="gap:2px;">
                <template x-for="(day,i) in service.history" :key="i">
                    <figure x-tooltip="`${$status.label(day)}`" class="flex-1 h-6 rounded-xs"
                        :class="{
                            'bg-positive-content':day==='operational',
                            'bg-yellow-400':day==='degraded',
                            'bg-orange-400':day==='partial_outage',
                            'bg-negative-content':day==='major_outage',
                            'bg-surface-3':day==='maintenance',
                            'bg-surface-3':day==='unknown'
                        }"></figure>
                </template>
            </div>

        </div>
    </template>

    <!-- Incident history -->
    <div class="col gap-4">
        <strong>Past Incidents</strong>
        <template x-for="inc in $status.incidents" :key="inc.id">
            <div class="row items-center gap-3 p-2 border-t border-line">
                <small class="min-w-14 capitalize" x-text="inc.name"></small>
                <div class="capitalize"><span x-text="inc.message || $status.label(inc.state)"></span> ∙ <small x-text="inc.resolved ? 'resolved' : $status.label(inc.state)"></small></div>
            </div>
        </template>
        <small x-show="!$status.incidents.length" class="text-content-subtle">No incidents reported</small>
    </div>
</div>
:::

```html "Service Cards"
<div x-data class="grid grid-cols-1 sm:grid-cols-3 gap-3">
    <template x-for="(service, name) in $status" :key="name">
        <div class="col gap-1 p-4 bg-page shadow rounded" style="min-width:150px;">
            <div class="row items-center gap-2">
                <figure class="size-2 rounded-full" :class="{ 'bg-positive-content':service.state==='operational', 'bg-yellow-400':service.state==='degraded', 'bg-orange-400':service.state==='partial_outage', 'bg-negative-content':service.state==='major_outage', 'bg-slate-400':service.state==='maintenance', 'bg-slate-300':service.state==='unknown' }"></figure>
                <span x-text="name"></span>
            </div>
            <small x-text="service.state.replace('_',' ')"></small>
        </div>
    </template>
</div>
```

::: frame "Service Cards"
<div x-data class="grid grid-cols-1 sm:grid-cols-3 gap-3">
    <template x-for="(service, name) in $status" :key="name">
        <div class="col gap-1 p-4 bg-page shadow rounded" style="min-width:150px;">
            <div class="row items-center gap-2">
                <figure class="size-2 rounded-full" :class="{ 'bg-positive-content':service.state==='operational', 'bg-yellow-400':service.state==='degraded', 'bg-orange-400':service.state==='partial_outage', 'bg-negative-content':service.state==='major_outage', 'bg-slate-400':service.state==='maintenance', 'bg-slate-300':service.state==='unknown' }"></figure>
                <span x-text="name"></span>
            </div>
            <small x-text="service.state.replace('_',' ')"></small>
        </div>
    </template>
</div>
:::

```html "Banner"
<!-- Issues -->
<p x-show="$status.overall !== 'operational'" class="p-4 bg-page text-negative-content rounded-lg shadow">
    <span x-icon="lucide:alert-triangle"></span>
    <span>Some services are experiencing issues.</span>
</p>

<!-- Operational -->
<p x-show="$status.overall === 'operational'" class="p-4 bg-page text-positive-content rounded-lg shadow">
    <span x-icon="lucide:check-circle"></span>
    <span>All systems operational.</span>
</p>
```

::: frame "Banner" col gap-3
<!-- Issues -->
<p class="p-4 bg-page text-negative-content rounded-lg shadow">
    <span x-icon="lucide:alert-triangle"></span>
    <span>Some services are experiencing issues.</span>
</p>

<!-- Operational -->
<p class="p-4 bg-page text-positive-content rounded-lg shadow">
    <span x-icon="lucide:check-circle"></span>
    <span>All systems operational.</span>
</p>
:::

```html "Notification Dot"
<small class="row items-center gap-2">
    <figure 
        class="size-2 rounded-full" 
        :class="{
            'bg-positive-content': $status.overall === 'operational',
            'bg-yellow-400': $status.overall === 'degraded',
            'bg-orange-400': $status.overall === 'partial_outage',
            'bg-negative-content': $status.overall === 'major_outage',
            'bg-surface-3': $status.overall === 'maintenance',
            'bg-surface-3': $status.overall === 'unknown'
        }"
    ></figure>
    <span x-text="$status.overall === 'operational' ? 'All systems operational' : 'Service disruption'"></span>
</small>
```

::: frame "Notification Dot"
<small class="row items-center gap-2">
    <figure 
        class="size-2 rounded-full" 
        :class="{
            'bg-positive-content': $status.overall === 'operational',
            'bg-yellow-400': $status.overall === 'degraded',
            'bg-orange-400': $status.overall === 'partial_outage',
            'bg-negative-content': $status.overall === 'major_outage',
            'bg-surface-3': $status.overall === 'maintenance',
            'bg-surface-3': $status.overall === 'unknown'
        }"
    ></figure>
    <span x-text="$status.overall === 'operational' ? 'All systems operational' : 'Service disruption'"></span>
</small>
:::

</div>

---

## Manual Control

The magic exposes methods for operators and background systems.

| Method | Description |
|---|---|
| `$status.set(name, state, message?)`{copy} | Force a state and an optional update message, overriding signals. |
| `$status.clear(name)`{copy} | Remove an override and return to signal-derived state. |
| `$status.refresh(name?)`{copy} | Re-resolve one entry, or all when called with no argument. |
| `$status.beat(key)`{copy} | Pulse a `heartbeat` signal; absence past its window reads as down. |

<div x-code-group>

```html copy
<button @click="$status.set('API', 'major_outage', 'Investigating elevated error rates')">Report outage</button>
<button @click="$status.clear('API')">Resolve</button>

<small class="capitalize" x-text="$status.API.state"></small>
<p x-show="$status.API.message" x-text="$status.API.message"></p>
```

::: frame row-wrap items-center gap-3
<button class="sm" @click="$status.set('API', 'major_outage', 'Investigating elevated error rates')">Report outage</button>
<button class="sm" @click="$status.clear('API')">Resolve</button>

<small class="ms-4 capitalize" x-text="$status.API.state.replace('_',' ')"></small>
<small class="text-content-subtle" x-show="$status.API.message" x-text="$status.API.message"></small>
:::

</div>

---

## Update Messages

A message is a human note attached to a status — the line you post during an incident, like "Investigating elevated error rates". It rides alongside the state and surfaces as `$status.<name>.message`, or `null` when there is none. It can be set one of two ways:

- **Manually**, as the third argument to `$status.set` — for operator actions and incident updates:

```html copy
<button @click="$status.set('api', 'degraded', 'Investigating elevated error rates')">Post update</button>
```

- **From a feed**, by returning a message next to the state. The plugin reads both:

```json "status.json" copy
{
    "state": "degraded",
    "message": "Elevated latency in the EU region"
}
```

Clearing the override (or the feed dropping its message) returns `message` to `null`.
