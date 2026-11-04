# Submissions

Send a form without leaving the page.

---

## Overview

A form is plain HTML first. With an `action` and `method="post"`, the browser checks the fields and sends them, no script involved. `x-submit` on the same `<form>` keeps everything the browser does and changes one thing: the form is sent in the background, so the visitor stays on the page.

The plugin renders nothing. It adds no messages, styles, or success screens, and it doesn't validate fields. Your page owns how the form looks, what counts as valid, and how a sent or failed form is shown. The plugin only reports what happened.

It works with any endpoint that accepts a form post: a [Manifest-hosted form](/docs/ai/projects/forms), your own server, or a form service.

---

## Setup

Submissions isn't in the default bundle. With the default plugins, or a `data-plugins` list starting with `+`, it loads by itself as soon as the page uses `x-submit`, including in components and markdown added later. A `data-plugins` list without `+` loads only what it names, so add `submissions` to it.

<div x-code-group copy>

```html "All Plugins (default)"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Selective"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="submissions,url-parameters"></script>
```

</div>

Until the plugin has loaded, a submitted form is sent the plain HTML way, so nothing is lost.

---

## Without JavaScript

Start with a form that works on its own. Native attributes do the checking: `required`, `type="email"`, `pattern`, `minlength` and `maxlength`, `min` and `max`. The browser won't send the form until they pass. `autocomplete` and `inputmode` give visitors autofill and the right keyboard.

```html copy
<form action="/_forms/contact" method="post">
    <label>
        Name
        <input name="name" required autocomplete="name">
    </label>
    <label>
        Email
        <input name="email" type="email" required autocomplete="email">
    </label>
    <label>
        Message
        <textarea name="message" required minlength="10"></textarea>
    </label>
    <button>Send</button>
</form>
```

Fields the visitor has touched are styled as valid or invalid by Manifest's [form styles](/docs/framework/elements/forms#validation).

### Confirming

Where the browser goes after sending is the endpoint's answer. Endpoints that support it, including Manifest-hosted forms, accept a `_redirect` field and send the visitor back to a page of yours. Point it at the same page with a parameter, and show the confirmation with [`$url`](/docs/framework/core-plugins/url-parameters).

```html copy
<form action="/_forms/contact" method="post" x-show="!$url.sent.value">
    <input type="hidden" name="_redirect" value="/contact?sent=1">
    <!-- fields -->
    <button>Send</button>
</form>

<p x-show="$url.sent.value">Thanks, we'll be in touch.</p>
```

A separate page, such as `value="/thanks"`, works too, and needs no script at all.

---

## Sending in Place

Add `x-submit` to the form. Nothing else changes.

```html copy
<form x-submit action="/_forms/contact" method="post">
    <!-- fields -->
    <button>Send</button>
</form>
```

When the browser's own checks pass, the form's fields are sent to its `action` with its `method`, in the same encoding a plain post would use, and with `Accept: application/json` so the endpoint answers with data instead of a page. A `GET` form sends its fields as the query string. The button that sent the form counts as a field when it has a `name`, and its `formaction` and `formmethod` apply, so one form can have two buttons that go to different places.

`novalidate` on the form, or `formnovalidate` on a button, turns off the browser's checks as usual, and the form is sent as it stands. A `submit` handler of your own that calls `preventDefault()` stops the send.

---

## States

While a form is sending, and after, it carries a `data-state` attribute.

| `data-state` | Means |
|---|---|
| `sending` | The request is on its way. The form also has `aria-busy="true"`, and further submits are ignored |
| `sent` | The endpoint accepted it |
| `error` | The endpoint refused it, or the request never arrived |

Show feedback with CSS alone. The form keeps its fields, so a visitor can correct and try again.

```html copy
<form x-submit action="/_forms/contact" method="post" class="contact">
    <!-- fields -->
    <button>Send</button>
    <p class="sent">Thanks, we'll be in touch.</p>
    <p class="failed">That didn't go through. Please try again.</p>
</form>
```

```css copy
.contact :is(.sent, .failed) { display: none }
.contact[data-state=sent] .sent,
.contact[data-state=error] .failed { display: block }
.contact[data-state=sending] button { opacity: 0.5 }
```

---

## Events

The form dispatches an event when the answer comes back. Both bubble.

| Event | Fired when |
|---|---|
| `submit-sent`{copy} | The endpoint accepted the form |
| `submit-error`{copy} | The endpoint refused it, or the network failed |

`$event.detail` holds the answer:

| Property | Value |
|---|---|
| `ok` | `true` for a sent form |
| `status` | The HTTP status, or `0` when the request never arrived |
| `data` | The response body as JSON, or `null` |
| `response` | The `Response`, or `null` |
| `error` | The endpoint's error code (its `error` field), `http_error` for a failure without one, or `network_error`; `null` when sent |
| `message` | The endpoint's message, if any |

```html copy
<div x-data="{ sent: false, problem: '' }">
    <form x-submit action="/_forms/contact" method="post" x-show="!sent"
        @submit-sent="sent = true"
        @submit-error="problem = $event.detail.error === 'rate_limited' ? 'Too many tries. Wait a minute.' : 'Something went wrong.'">
        <!-- fields -->
        <button>Send</button>
        <p x-show="problem" x-text="problem"></p>
    </form>
    <p x-show="sent">Thanks, we'll be in touch.</p>
</div>
```

A form that is `sent` stays as it is. Call `$el.reset()` in your handler to clear it.

---

## Field Errors

Some endpoints check fields on the server and say which ones failed. When an error response names fields, each message is attached to its field with the browser's own validity API, the first one is shown the way the browser shows its own messages, and the field matches `:invalid` until the visitor edits it. Both common shapes are understood:

```json
{ "fields": { "email": "Use your work address" } }
```

```json
{ "errors": [{ "field": "email", "message": "Use your work address" }] }
```

---

## Spam Protection

A <a href="https://developers.cloudflare.com/turnstile/" target="_blank">Cloudflare Turnstile</a> widget inside the form sends its token as a field. Tokens work once, so the widget is reset after every answer, ready for the next try.

```html copy
<form x-submit action="/_forms/contact" method="post">
    <!-- fields -->
    <div class="cf-turnstile" data-sitekey="your-site-key"></div>
    <button>Send</button>
</form>
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
```

---

## Reference

| Write | Does |
|---|---|
| `x-submit`{copy} | On a `<form>`: send it in place to its own `action` and `method` |
| `data-state` | Set on the form: `sending`, `sent`, or `error` |
| `aria-busy` | `true` on the form while sending |
| `submit-sent`{copy}, `submit-error`{copy} | Events on the form, with the answer in `$event.detail` |
