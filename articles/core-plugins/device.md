# Device

Share sheets, secure storage, deep links, push, lifecycle, haptics, biometrics and the camera as Alpine magics that fall back to the web.

---

## Overview

Each magic talks to Capacitor inside a Capacitor app and to a web equivalent, or an honest no-op, in a browser. The same markup runs as a website, an installed PWA and a packaged app.

<div x-code-group>

```html copy
<span x-text="$device.online ? 'Online' : 'Offline'"></span>
<span x-text="$device.standalone ? 'Installed' : 'In a browser tab'"></span>
<span x-text="$device.os"></span>
```

::: frame
<div class="row-wrap gap-2">
    <span class="badge" x-text="$device.online ? 'Online' : 'Offline'"></span>
    <span class="badge" x-text="$device.standalone ? 'Installed' : 'In a browser tab'"></span>
    <span class="badge" x-text="$device.os || 'unknown os'"></span>
</div>
:::

</div>

---

## Setup

Device is opt-in. It loads on its own when a page uses one of its magics, when `manifest.json` has a `device` block, or inside a Capacitor app. The `+` prefix keeps the default plugins and adds it explicitly. `native` still works as an alias in both places.

<div x-code-group copy>

```html "Script Tag"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="+device"></script>
```

```json "manifest.json"
{
  "device": {}
}
```

</div>

Capacitor plugins are read from `window.Capacitor.Plugins`. Install the ones you use when [packaging the app](/docs/publishing/native-apps).

---

## $device

`$device` is part of the core utilities and always available. This plugin only adds Capacitor's network and platform readings to it.

| Property | Value |
|---|---|
| `$device.os` | `macos`, `windows`, `linux`, `ios`, `android` |
| `$device.platform` | `web`, `ios`, `android`: the container, not the OS |
| `$device.online` | Connectivity, reactive |
| `$device.standalone` | Installed as a PWA |
| `$device.native` | Inside a Capacitor app |
| `$device.touch` | Coarse pointer |

<div x-code-group>

```html copy
<p x-show="!$device.online">You're offline. Changes sync when you're back.</p>
<button x-show="$device.native">Pay with Face ID</button>
<button x-show="!$device.native">Pay</button>
```

::: frame
<div class="col gap-3 w-full">
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <template x-for="key in ['os', 'platform', 'online', 'standalone', 'native', 'touch']" :key="key">
            <div class="row gap-2 justify-between px-3 py-2 rounded-lg bg-surface-2">
                <small class="text-content-subtle" x-text="key"></small>
                <code x-text="String($device[key])"></code>
            </div>
        </template>
    </div>
    <small class="text-content-subtle">Turn your connection off and on: <code>online</code> follows it.</small>
</div>
:::

</div>

The same state is stamped on `<html>` as `data-os`, `data-platform`, `data-online`, `data-standalone` and `data-native`, which drive the `.native-only`, `.web-only`, `.offline-only`, `.online-only` and `.standalone-only` classes and the [OS classes](/docs/styles/utilities#operating-system).

---

## $share

`$share()` opens the native share sheet inside a Capacitor app (`Share`) and the Web Share sheet in a browser. Without Web Share it copies the URL, or the text, to the clipboard. It resolves `{ shared, method, cancelled? }`; `method` is `native`, `web`, `clipboard` or `none`.

<div x-code-group>

```html copy
<button @click="$share({ title: 'Manifest', text: 'Supercharged HTML', url: 'https://manifestx.dev' })">Share</button>
```

::: frame
<div x-data="{ ready: false, r: null }" x-init="window.__manifestRender || (function () { let n = 0; const tick = () => Alpine.store('links') ? ready = true : (n++ < 250 && setTimeout(tick, 20)); Alpine.store('links') || Manifest.loadPlugin('device'); tick(); })()">
<template x-if="ready">
<div class="row-wrap gap-3 center">
    <button class="hug" @click="r = await $share({ title: 'Manifest', text: 'Supercharged HTML', url: 'https://manifestx.dev' })">Share</button>
    <small class="text-content-subtle" x-text="!r ? 'Share sheet, or the clipboard where there is none.' : r.shared ? 'Shared via ' + r.method : r.cancelled ? 'Cancelled' : 'Not shared'"></small>
</div>
</template>
</div>
:::

</div>

---

## $camera

`photo()` captures and `pick()` chooses from the library (`Camera`). Both resolve `{ dataUrl, format }`, or `{ cancelled: true }`. On the web both open a file picker; on a phone `photo()` asks for the camera.

<div x-code-group>

```html copy
<div x-data="{ shot: null }">
    <button @click="shot = await $camera.photo()">Take a photo</button>
    <img x-show="shot?.dataUrl" :src="shot?.dataUrl" alt="">
</div>
```

::: frame
<div x-data="{ ready: false, shot: null }" x-init="window.__manifestRender || (function () { let n = 0; const tick = () => Alpine.store('links') ? ready = true : (n++ < 250 && setTimeout(tick, 20)); Alpine.store('links') || Manifest.loadPlugin('device'); tick(); })()">
<template x-if="ready">
<div class="col gap-3 w-full">
    <div class="row-wrap gap-2 center">
        <button class="hug" @click="shot = await $camera.photo()">Take a photo</button>
        <button class="hug" @click="shot = await $camera.pick()">Pick from library</button>
        <small class="text-content-subtle" x-text="!shot ? 'A file picker in this browser.' : shot.dataUrl ? 'Got a ' + shot.format : 'Cancelled'"></small>
    </div>
    <img x-show="shot?.dataUrl" :src="shot?.dataUrl" alt="" class="max-h-48 w-auto self-start rounded-lg">
</div>
</template>
</div>
:::

</div>

---

## $app

`$app.active` is `true` in the foreground. Capacitor reports `appStateChange` (`App`); the web uses `visibilitychange`, `pageshow` and `pagehide`. `$app.onChange(fn)` runs on each transition.

<div x-code-group>

```html copy
<div x-data="{ away: 0 }" x-init="$app.onChange(active => { if (!active) away++ })">
    <span x-text="$app.active ? 'Active' : 'In the background'"></span>
    <span x-text="away + ' times away'"></span>
</div>
```

::: frame
<div x-data="{ ready: false, away: 0 }" x-init="window.__manifestRender || (function () { let n = 0; const tick = () => Alpine.store('links') ? ready = true : (n++ < 250 && setTimeout(tick, 20)); Alpine.store('links') || Manifest.loadPlugin('device'); tick(); })()">
<template x-if="ready">
<div class="row-wrap gap-3 center" x-init="$app.onChange(active => { if (!active) away++ })">
    <span class="badge" x-text="$app.active ? 'Active' : 'In the background'"></span>
    <code x-text="away + ' times away'"></code>
    <small class="text-content-subtle">Switch tabs and come back.</small>
</div>
</template>
</div>
:::

</div>

---

## $secure

Key/value storage. Inside a Capacitor app it uses the Keychain or Keystore through a plugin registered as `SecureStorage`. On the web it is `localStorage` under an `mnfst:` prefix, which is not encrypted. `get()` resolves a string or `null`.

<div x-code-group>

```html copy
<div x-data="{ value: null }">
    <button @click="await $secure.set('token', 'abc123')">Set</button>
    <button @click="value = await $secure.get('token')">Get</button>
    <button @click="await $secure.remove('token'); value = null">Remove</button>
    <code x-text="JSON.stringify(value)"></code>
</div>
```

::: frame
<div x-data="{ ready: false, value: null }" x-init="window.__manifestRender || (function () { let n = 0; const tick = () => Alpine.store('links') ? ready = true : (n++ < 250 && setTimeout(tick, 20)); Alpine.store('links') || Manifest.loadPlugin('device'); tick(); })()">
<template x-if="ready">
<div class="row-wrap gap-2 center">
    <button class="hug" @click="await $secure.set('token', 'abc123'); value = await $secure.get('token')">Set</button>
    <button class="hug" @click="value = await $secure.get('token')">Get</button>
    <button class="hug" @click="await $secure.remove('token'); value = await $secure.get('token')">Remove</button>
    <code x-text="'token: ' + JSON.stringify(value)"></code>
</div>
</template>
</div>
:::

</div>

`keys()` lists stored keys and `clear()` removes them all. If your plugin's method names differ, hand it over once with `$secure.use(adapter)`.

---

## $haptics

`impact()`, `notification()` and `selection()` map to Capacitor `Haptics`. The web falls back to `navigator.vibrate`, which desktop browsers and iOS Safari ignore.

<div x-code-group>

```html copy
<button @click="$haptics.impact('LIGHT')">Light</button>
<button @click="$haptics.impact('HEAVY')">Heavy</button>
<button @click="$haptics.notification('SUCCESS')">Success</button>
```

::: frame
<div x-data="{ ready: false, last: '' }" x-init="window.__manifestRender || (function () { let n = 0; const tick = () => Alpine.store('links') ? ready = true : (n++ < 250 && setTimeout(tick, 20)); Alpine.store('links') || Manifest.loadPlugin('device'); tick(); })()">
<template x-if="ready">
<div class="row-wrap gap-2 center">
    <button class="hug" @click="$haptics.impact('LIGHT'); last = 'impact LIGHT'">Light</button>
    <button class="hug" @click="$haptics.impact('HEAVY'); last = 'impact HEAVY'">Heavy</button>
    <button class="hug" @click="$haptics.notification('SUCCESS'); last = 'notification SUCCESS'">Success</button>
    <small class="text-content-subtle" x-text="(last ? last + '. ' : '') + ($device.touch ? 'A short buzz on Android; iOS Safari stays silent.' : 'No feedback on a desktop browser.')"></small>
</div>
</template>
</div>
:::

</div>

`impact` takes `LIGHT`, `MEDIUM` (default) or `HEAVY`; `notification` takes `SUCCESS` (default), `WARNING` or `ERROR`. `vibrate(ms)` is a plain buzz.

---

## $links

Inside a Capacitor app (`App`) a tapped universal link like `https://app.example.com/order/123`, or a custom scheme like `myapp://order/123`, is routed to `/order/123` through the [router](/docs/core-plugins/router). `$links.open(url)` runs the same path by hand; `$links.last` keeps the latest inbound URL.

<div x-code-group>

```html copy
<button @click="$links.open('myapp://docs/core-plugins/device')">Open a deep link</button>
<code x-text="$links.last"></code>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (function () { let n = 0; const tick = () => Alpine.store('links') ? ready = true : (n++ < 250 && setTimeout(tick, 20)); Alpine.store('links') || Manifest.loadPlugin('device'); tick(); })()">
<template x-if="ready">
<div class="row-wrap gap-3 center">
    <button class="hug" @click="$links.open('myapp://docs/core-plugins/device')">Open a deep link</button>
    <code x-text="'last: ' + ($links.last || 'none')"></code>
    <small class="text-content-subtle">The scheme maps to this page's route.</small>
</div>
</template>
</div>
:::

</div>

`$links.on(fn)` replaces the default routing; `fn` receives `{ url, path }`.

---

## $push

`$push.permission` is `prompt`, `granted`, `denied` or `unsupported`. Nothing is asked until you call `$push.request()`, which prompts and resolves the new state.

<div x-code-group>

```html copy
<span x-text="$push.permission"></span>
<button @click="$push.request()">Enable notifications</button>
```

::: frame
<div x-data="{ ready: false }" x-init="window.__manifestRender || (function () { let n = 0; const tick = () => Alpine.store('links') ? ready = true : (n++ < 250 && setTimeout(tick, 20)); Alpine.store('links') || Manifest.loadPlugin('device'); tick(); })()">
<template x-if="ready">
<div class="row-wrap gap-3 center">
    <code x-text="'permission: ' + $push.permission"></code>
    <button class="hug" @click="$push.request()">Enable notifications</button>
    <small class="text-content-subtle">Opens the browser's permission prompt.</small>
</div>
</template>
</div>
:::

</div>

Inside a Capacitor app (`PushNotifications`), `register()` registers with APNs or FCM, `onToken(fn)` receives the device token for your backend, `onReceive(fn)` fires in the foreground, and a tapped notification routes to its `url` or `route` unless `onTap(fn)` takes over. On the web, permission maps to the Notification API; `register()` is a no-op and `token` stays `null`.

---

## $biometric

`available()` resolves `true` when a Capacitor biometric plugin (`BiometricAuth` or `NativeBiometric`) reports Face ID or Touch ID. `verify({ reason })` resolves `{ verified: true }`, or `{ verified: false, error }`. The web has no equivalent: `available()` is `false` and `verify()` reports `unsupported`.

<div x-code-group>

```html copy
<div x-data="{ can: null }" x-init="can = await $biometric.available()">
    <button x-show="can" @click="$biometric.verify({ reason: 'Confirm payment' })">Pay with Face ID</button>
    <span x-show="can === false">Biometrics are not available here.</span>
</div>
```

::: frame
<div x-data="{ ready: false, can: null, r: null }" x-init="window.__manifestRender || (function () { let n = 0; const tick = () => Alpine.store('links') ? ready = true : (n++ < 250 && setTimeout(tick, 20)); Alpine.store('links') || Manifest.loadPlugin('device'); tick(); })()">
<template x-if="ready">
<div class="row-wrap gap-3 center" x-init="can = await $biometric.available()">
    <code x-text="'available: ' + String(can)"></code>
    <button class="hug" @click="r = await $biometric.verify({ reason: 'Confirm payment' })">Verify</button>
    <small class="text-content-subtle" x-text="r ? (r.verified ? 'Verified' : 'verify() returned ' + JSON.stringify(r)) : 'Not available in a browser.'"></small>
</div>
</template>
</div>
:::

</div>

---

## Reference

| Magic | API | Web | Capacitor |
|---|---|---|---|
| `$device` | `os`, `platform`, `online`, `standalone`, `native`, `touch` | Always on (core) | `Network` |
| `$share(opts)` | `{ shared, method, cancelled? }` | Web Share, then clipboard | `Share` |
| `$camera` | `photo()`, `pick()` | File picker | `Camera` |
| `$app` | `active`, `onChange(fn)` | Page visibility | `App` |
| `$secure` | `get`, `set`, `remove`, `keys`, `clear`, `use(adapter)` | Prefixed `localStorage` | `SecureStorage` |
| `$haptics` | `impact`, `notification`, `selection`, `vibrate` | `navigator.vibrate` | `Haptics` |
| `$links` | `open(url)`, `on(fn)`, `last` | `open()` only | `App` |
| `$push` | `permission`, `token`, `request`, `register`, `onToken`, `onReceive`, `onTap` | Permission only | `PushNotifications` |
| `$biometric` | `available()`, `verify(opts)` | `false` / `unsupported` | `BiometricAuth`, `NativeBiometric` |

---

## Related

- [Native Apps](/docs/publishing/native-apps) — packaging with Capacitor
- [Router](/docs/core-plugins/router) — where deep links and notification taps land
- [Utilities](/docs/styles/utilities#operating-system) — OS classes and variants
