# Forms

Receive contact forms and other submissions from a published site.

---

## Overview

A site published with Manifest can take form submissions without a server, a form service, or a `mailto:` link. Every form on the site posts to its own address, `/_forms/<name>`, and Manifest keeps each submission in your dashboard and sends it where you choose:

- **Email**, to an address you confirm.
- **Slack, Discord, or Microsoft Teams**, or any other webhook (Pro).

Manifest only receives, protects, stores, and delivers. How the form looks, which fields it has, what counts as valid, and what visitors see after sending are all up to your site.

---

## Set it up

In Claude, with your project open, ask:

> `Set up the contact form to email me at hello@example.com`{copy}

Claude turns forms on and adds the address. Manifest sends that address a confirmation link, and nothing is delivered there until someone clicks it. Until then, submissions still arrive in the dashboard.

To deliver to a chat channel, create an incoming webhook in Slack, Discord, or a Teams workflow, and give Claude its URL:

> `Also send form submissions to this Slack webhook: https://hooks.slack.com/…`{copy}

Manifest sends a test message to check the address before saving it. Webhook addresses are stored encrypted and never shown again.

---

## The form

Claude writes the form in your site's own style. A form needs only an `action` and `method="post"`:

```html
<form action="/_forms/contact" method="post">
    <label>Name <input name="name" required autocomplete="name"></label>
    <label>Email <input name="email" type="email" required autocomplete="email"></label>
    <label>Message <textarea name="message" required></textarea></label>
    <input type="hidden" name="_redirect" value="/contact?sent=1">
    <input name="_gotcha" tabindex="-1" autocomplete="off" hidden>
    <button>Send</button>
</form>
```

The browser checks the fields before sending. To keep visitors on the page and show your own sent or error state, add [`x-submit`](/docs/framework/core-plugins/submissions) to the form.

A form can post to `/_forms` on any of the project's own addresses, so a page on `www.example.com` can send to `https://example.com/_forms/contact`. Other sites can't post to it from a browser.

Each form name keeps its submissions apart, so a site can have `/_forms/contact` and `/_forms/estimate`. Names use lowercase letters, digits, `-` and `_`. `/_forms` on its own is the form named `default`.

### Special fields

| Field | What it does |
|---|---|
| `_redirect`{copy} | A page on your site to send visitors to after a successful submit, when the form is sent without `x-submit`. It must be on one of the project's own addresses. |
| `_gotcha`{copy} | A hidden, empty trap field. Spam bots fill it in, and those submissions are quietly dropped. |
| `cf-turnstile-response`{copy} | Added by Cloudflare Turnstile, when it's on. |
| `email` | Not reserved. When it holds an email address, replies to the delivery email go to the visitor. |

These fields are never stored or delivered. Every other field is, as sent: text only, up to 50 fields and 64 KB per submission. File uploads aren't supported.

### Responses

Manifest answers with a status code and a small JSON body, never a page:

- **Success**: `200` and `{ "ok": true, "id": "sub_…" }`, or a `303` to `_redirect` for a form sent without JavaScript.
- **Refused**: `{ "ok": false, "error": "…", "message": "…" }`.

| `error` | Status | Meaning |
|---|---|---|
| `forms_not_enabled` | 404 | Forms aren't turned on for this site. |
| `rate_limited` | 429 | Too many submissions from one visitor or to one site in a minute. |
| `cap_reached` | 429 | The site has used this month's submissions. |
| `turnstile_failed` | 403 | The Turnstile check didn't pass. |
| `body_too_large` | 413 | Over 64 KB, or a field over 10,000 characters. |
| `files_not_supported` | 400 | The form included a file. |
| `empty_submission` | 400 | No fields arrived. |

---

## Spam

Every form gets the `_gotcha` trap, per-visitor and per-site rate limits, and size limits. These stop casual spam, but a determined bot can still use up a site's monthly submissions. For any public form, we recommend adding [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/): create a free widget in your own Cloudflare account with your site's addresses as its hostnames, then give Claude the site key and secret key:

> `Turn on Turnstile for the forms with site key 0x4AAA… and secret key 0x4AAA…`{copy}

Once it's on, every submission needs a valid Turnstile token, so the widget must be on each form before you publish.

---

## Submissions

Every submission is listed in the [dashboard](https://dash.manifestx.dev), with whether each delivery succeeded, and can be downloaded as a CSV file. If a delivery fails, Manifest retries it for 24 hours, and the submission stays in the dashboard either way.

You can also ask Claude:

> `Show me the latest form submissions`{copy}

| | Free | Pro |
|---|---|---|
| Submissions per site, each month | 100 | 5,000 |
| Destinations | 1 email | Up to 10 |
| Slack, Discord, Teams, and webhooks | | ✓ |
| Kept in the dashboard | 30 days | 1 year |

When a site uses its month's submissions, new ones are refused with `cap_reached` until the next month (UTC), and the owner gets one email about it.

Submissions are your visitors' personal data, and you're responsible for them. Delete one, or all of them, from the dashboard or by asking Claude. They're also deleted after the times above and when the project is deleted.

### Webhook format

A webhook that isn't Slack, Discord, or Teams receives JSON, signed with [Standard Webhooks](https://www.standardwebhooks.com) headers using the signing secret Claude shows once when you add it:

```json
{
  "type": "form.submission",
  "id": "sub_…",
  "project_id": "…",
  "form": "contact",
  "env": "production",
  "hostname": "example.com",
  "created_at": "2026-11-04T12:00:00.000Z",
  "fields": { "name": "Ada", "email": "ada@example.com", "message": "Hello" }
}
```
