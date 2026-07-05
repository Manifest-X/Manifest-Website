# Presence

Show who's here and what they're up to, live, with `$presence`.

---

## Overview

Presence is a live picture of who's currently using your app. Anyone with a session — a full account or a guest — publishes a simple status like `online`, `away`, or any label you choose, and everyone on the team sees it update the moment it changes. When someone leaves or closes the tab, their status quietly disappears on its own.

It's the mechanism behind the little green dots in a chat app, the "3 people viewing" line on a shared document, and the "typing…" hint in a conversation.

Presence is built on <a href="https://appwrite.io/" target="_blank" rel="noopener">Appwrite</a>'s native realtime service. Statuses are held in memory and expire automatically, so there's nothing to clean up and no database table to manage.

::: brand icon="lucide:info"
Presence identifies people by their [auth](/docs/appwrite-plugins/auth) session — a signed-in account **or** a guest both work equally well. What doesn't work is a visitor with no session at all; they can watch the roster but can't publish a status. Statuses are shared within the current [team](/docs/appwrite-plugins/teams), so each workspace sees only its own members.
:::

---

## Setup

Complete the [Appwrite setup](/docs/appwrite-plugins/appwrite-setup) and [auth](/docs/appwrite-plugins/auth) steps to connect your project and give people a way in — a full sign-in, guest access, or both. Presence needs auth, since it identifies each person by their session.

Add the Appwrite SDK and `manifest.js` scripts to the HTML head, then turn presence on by adding a `presence` block to your `appwrite` config in `manifest.json`. It loads automatically whenever that block is present (bringing auth along with it), or you can load it explicitly with `data-plugins`.

<div x-code-group copy>

```html "All Plugins (default)"
<!-- Meta -->
<link rel="manifest" href="/manifest.json">

<!-- Scripts -->
<script src="https://cdn.jsdelivr.net/npm/appwrite@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Selective"
<!-- Meta -->
<link rel="manifest" href="/manifest.json">

<!-- Scripts -->
<script src="https://cdn.jsdelivr.net/npm/appwrite@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="appwrite-presences"></script>
```

</div>

Enable it in `manifest.json`:

```json "manifest.json" copy
{
    "appwrite": {
        "projectId": "your-project-id",
        "endpoint": "your-API-endpoint",
        "auth": {},
        "presence": {}
    }
}
```

::: brand icon="lucide:info"
The interactive examples below are real — they publish **your** status to this page's team. Each one includes a quick sign-in, so you can try them right here.
:::

---

## Start Tracking

Call `$presence.start()` once the person has a session — whether they signed in or joined as a guest. It begins publishing their status and loads everyone else's, keeping the roster in sync from then on.

<div x-code-group copy>

```html "HTML"
<!-- Begin tracking presence -->
<button @click="$presence.start()">Go online</button>

<!-- Reflect the live state -->
<p x-show="$presence.ready">You're online as <b x-text="$presence.me"></b></p>
```

::: frame col gap-3 text-base
<!-- Quick sign-in -->
<div x-show="!$auth.isAuthenticated" class="row-wrap items-center gap-2">
    <button @click="$auth.loginOAuth('google')">Sign in with Google</button>
    <button class="outlined" @click="$auth.requestGuest()">Continue as guest</button>
</div>

<!-- Signed in: track presence -->
<div x-show="$auth.isAuthenticated" class="row-wrap items-center gap-3">
    <button @click="$presence.start()" x-show="!$presence.ready">Go online</button>
    <button class="outlined" @click="$presence.stop()" x-show="$presence.ready">Stop</button>
    <small x-show="$presence.ready">You're online as <b x-text="$presence.me"></b></small>
    <button class="ghost sm ms-auto" @click="$auth.logout()">Sign out</button>
</div>
<small x-show="$presence.error" class="text-negative-content" x-text="$presence.error"></small>
:::

</div>

By default, tracking is automatic: a person is marked `away` when they switch to another tab and `online` again when they return. Adjust this with options passed to `start()`:

| Option | Default | Description |
|---|---|---|
| `auto`{copy} | `true` | Automatically flip between `online` and `away` as the tab loses and regains focus. |
| `status`{copy} | `"online"` | The status to publish when tracking begins. |
| `heartbeatMs`{copy} | `25000` | How often, in milliseconds, to refresh the status so it doesn't expire. |

```html "Manual control" copy
<!-- Start with a custom status and no automatic away-detection -->
<button @click="$presence.start({ auto: false, status: 'available' })">Start</button>
```

---

## Set a Status

`$presence.set(status)` publishes any label you like — there's no fixed list. Pass an optional second argument to attach extra details, such as which page the person is viewing.

<div x-code-group copy>

```html "HTML"
<button @click="$presence.set('online')">Online</button>
<button @click="$presence.set('away')">Away</button>
<button @click="$presence.set('busy')">Busy</button>

<!-- Any label works, with optional details — a name (handy for guests), a page, anything -->
<button @click="$presence.set('editing', { name: 'Ada', page: 'Invoice #42' })">Editing</button>

<p>Your status: <b x-text="$presence.me"></b></p>
```

::: frame col gap-3 text-base
<small x-show="!$auth.isAuthenticated" class="text-muted">Sign in using the first example above to try this.</small>

<div x-show="$auth.isAuthenticated && $presence.ready" x-data="{ custom: '' }" class="col gap-3">
    <div class="row-wrap gap-2">
        <button class="sm" @click="$presence.set('online')">Online</button>
        <button class="sm" @click="$presence.set('away')">Away</button>
        <button class="sm" @click="$presence.set('busy')">Busy</button>
    </div>
    <div class="row-wrap gap-2 items-center">
        <input type="text" class="flex-1" placeholder="Custom status" aria-label="Custom status" x-model="custom" />
        <button class="sm" @click="if (custom.trim()) { $presence.set(custom.trim()); custom = ''; }" :disabled="!custom.trim()">Set</button>
    </div>
    <small>Your status: <b x-text="$presence.me"></b></small>
</div>
<small x-show="$auth.isAuthenticated && !$presence.ready" class="text-muted">Press <b>Go online</b> in the example above first.</small>
:::

</div>

---

## See Who's Here

`$presence.list` is the live roster — an array of everyone currently present, yourself included. It updates on its own as people arrive, change status, and leave. Loop over it to build whatever display you like.

Each person carries a `color` for easy visual distinction and a `metadata.name`. The name is the person's real account name when they have one, or `null` when they don't — a guest, say. Because that fallback is `null`, **you** decide the label to show in its place, so it's yours to name and to [localize](/docs/core-plugins/localization).

<div x-code-group copy>

```html "HTML"
<template x-for="person in $presence.list" :key="person.userId">
    <div class="row items-center gap-2">
        <!-- Coloured status dot -->
        <figure class="size-2 rounded-full" :style="`background:${person.color}`"></figure>
        <!-- Your label for the nameless — rename or localize freely -->
        <span x-text="person.metadata?.name || 'Guest'"></span>
        <small class="capitalize" x-text="person.status"></small>
    </div>
</template>
```

::: frame col gap-3 text-base
<small x-show="!$auth.isAuthenticated" class="text-muted">Sign in using the first example above to try this.</small>

<div x-show="$auth.isAuthenticated" class="col gap-2">
    <template x-for="person in $presence.list" :key="person.userId">
        <div class="row items-center gap-2 py-1 border-t border-line">
            <figure class="size-2 rounded-full" :style="`background:${person.color}`"></figure>
            <span class="flex-1" x-text="person.metadata?.name || 'Guest'"></span>
            <small class="capitalize text-muted" x-text="person.status"></small>
        </div>
    </template>
    <small x-show="!$presence.list.length" class="text-muted">No one here yet — press <b>Go online</b> above.</small>
</div>
:::

</div>

To look up one specific person instead of the whole roster, use `$presence.of(userId)`:

```html copy
<!-- Is this teammate around? -->
<span x-show="$presence.of(user.$id)">
    <b x-text="user.name"></b> is <span x-text="$presence.of(user.$id).status"></span>
</span>
```

---

## Stop & Clear

Presence tidies up after itself: a person's status clears automatically when they leave, close the tab, or sign out. To end tracking yourself, use `clear` to remove your status or `stop` to end the session entirely.

```html copy
<!-- Remove your status but keep watching others -->
<button @click="$presence.clear()">Appear offline</button>

<!-- Stop tracking completely -->
<button @click="$presence.stop()">Stop</button>
```

---

## Properties

Read these anywhere in your markup — each updates reactively as presence changes.

| Property | Type | Description |
|---|---|---|
| `$presence.list`{copy} | array | Everyone currently present, yourself included. |
| `$presence.records`{copy} | object | The same people keyed by their user ID, for direct lookups. |
| `$presence.me`{copy} | string \| null | Your own current status, or `null` if you aren't publishing one. |
| `$presence.ready`{copy} | boolean | `true` once tracking has started and the roster has loaded. |
| `$presence.error`{copy} | string \| null | The most recent error message, or `null`. |

---

## Methods

| Method | Parameters | Description |
|---|---|---|
| `$presence.start(options?)`{copy} | `options` (object, optional) | Begin tracking and publish your status. Options: `auto`, `status`, `heartbeatMs`. |
| `$presence.set(status, metadata?)`{copy} | `status` (string), `metadata` (object, optional) | Publish a status label with optional details. |
| `$presence.of(userId)`{copy} | `userId` (string) | Get one person's presence record, or `null` if they aren't present. |
| `$presence.all()`{copy} | None | Return the full roster as an array (same as `list`). |
| `$presence.clear()`{copy} | None | Remove your own status. |
| `$presence.stop()`{copy} | None | Stop tracking and disconnect. |

---

## A Presence Record

Every entry in the roster has this shape.

| Property | Type | Description |
|---|---|---|
| `userId`{copy} | string | The person's account ID. |
| `status`{copy} | string | Their current status label. |
| `metadata`{copy} | object | Details attached with `set`, including `color` and `name` (the account name, or `null` — pass your own with `set(status, { name })`). |
| `color`{copy} | string | A consistent colour for this person, handy for dots and avatars. |
| `lastSeen`{copy} | number | Timestamp of their most recent update. |
| `expiresAt`{copy} | string \| null | When the status will expire if not refreshed. |

---

## Next Steps

See [teams](/docs/appwrite-plugins/teams) to scope presence to a workspace, or [cloud data](/docs/appwrite-plugins/cloud-data) to pair it with shared databases and files.
