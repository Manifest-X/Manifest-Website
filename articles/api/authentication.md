# Authentication

Send your API key with every request, and rotate it without downtime.

---

## Create an API Key

1. Open the <a href="https://dash.manifestx.dev/api" target="_blank">API page</a> of the dashboard. It's also in the account menu, under **API**. New to Manifest? Signing in creates your free account.
2. Select **New key**, name it after the service that will use it, like "CI" or "Docs sync", then select **Create key**.
3. Copy the key and store it in your secrets manager.

::: negative icon="lucide:triangle-alert"
The key is shown once. If you lose it, revoke it and create another.
:::

Your first key also sets up your **API account**, which holds your keys, your project allowance, and your caps. Keys start with `mnfst_api_`. An account can hold up to 10 live keys. Give each service its own, so you can revoke one without touching the others. Enterprise keys are issued by Manifest when the account is set up.

---

## Send the Key

Send the key on every request as a bearer token, `Authorization: Bearer <key>`{copy}. `GET /me` checks that it works.

<div x-code-group copy>

```bash "cURL"
curl https://api.manifestx.dev/v1/me \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

```js "JavaScript"
const res = await fetch('https://api.manifestx.dev/v1/me', {
  headers: { Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}` },
})
const me = await res.json()
```

</div>

```json
{
  "account": {
    "id": "acct_…",
    "name": "Sam Rivera",
    "plan": "free",
    "max_projects": 2,
    "max_storage_bytes": 524288000,
    "created_at": 1760140800
  },
  "rate_limit": { "requests_per_minute": 60, "writes_per_minute": 30 },
  "key": { "prefix": "mnfst_api_AbCd1234" },
  "request_id": "…"
}
```

- **`plan`** is `free` for the allowance every account gets, or `platform` for an Enterprise account.
- **`max_projects`** is how many projects your keys can create through the API.
- **`max_storage_bytes`** and **`rate_limit`** are the account's other caps. See [Limits](/docs/api/reference/limits).

The examples name the key `MANIFEST_ACCOUNT_KEY`, so it's never mixed up with a project's own `MANIFEST_API_KEY`.

::: negative icon="lucide:shield-alert"
A key acts on every project it reaches. Call the API from your server only: browsers are refused (no CORS). Never put the key in code that runs in a browser, or in a repository.
:::

---

## Project Keys

Creating a project also returns that project's own key, `project_key`, once. It publishes that one project headless, for example from its CI with `mnfst-publish`.

The API doesn't need it: your API key already reaches the project. See [Create a Project](/docs/api/guides/projects#create-a-project).

---

## Revoke a Key

On the <a href="https://dash.manifestx.dev/api" target="_blank">API page</a>, select the trash icon next to the key, then **Revoke key**. The key stops working on the next request and can't be restored.

If a key leaks, revoke it and create a new one. Enterprise accounts revoke keys [with the API](#revoke-a-key-with-the-api).

---

## Manage Keys With the API

A key can create, list, and revoke its own account's keys. This is how a server rotates its key without the dashboard.

### Create a Key With the API

<div x-code-group copy>

```bash "cURL"
curl -X POST https://api.manifestx.dev/v1/keys \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "label": "CI 2026-11" }'
```

```js "JavaScript"
const res = await fetch('https://api.manifestx.dev/v1/keys', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ label: 'CI 2026-11' }),
})
const { key } = await res.json()
```

</div>

| Field | Type | Required | Notes |
|---|---|---|---|
| `label` | string | no | 1 to 60 characters. |

The answer is `201 Created`, with the new key shown once:

```json
{
  "key": "mnfst_api_…",
  "prefix": "mnfst_api_EfGh5678",
  "label": "CI 2026-11",
  "created_at": 1761868800,
  "last_used_at": null,
  "request_id": "…"
}
```

Good to know:

- The 10-key cap counts dashboard keys too. Over it: `409 key_limit`.
- An account can create 20 keys a day this way, revoked ones included. Over that: `429 mint_limit`, with `Retry-After`.
- `Idempotency-Key` is ignored here, so a key is never stored or replayed. If a request times out, list the keys and revoke any you didn't receive.

### List Keys

`GET /keys` lists the account's live keys, newest first. It shows each key's prefix, never the key itself.

<div x-code-group copy>

```bash "cURL"
curl https://api.manifestx.dev/v1/keys \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

```js "JavaScript"
const res = await fetch('https://api.manifestx.dev/v1/keys', {
  headers: { Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}` },
})
const { keys } = await res.json()
```

</div>

```json
{
  "keys": [
    { "prefix": "mnfst_api_EfGh5678", "label": "CI 2026-11", "created_at": 1761868800, "last_used_at": null, "current": false },
    { "prefix": "mnfst_api_AbCd1234", "label": "CI", "created_at": 1760140800, "last_used_at": 1761868740, "current": true }
  ],
  "request_id": "…"
}
```

`current` marks the key that made the request. `last_used_at` is accurate to the minute.

### Revoke a Key With the API

<div x-code-group copy>

```bash "cURL"
curl -X DELETE https://api.manifestx.dev/v1/keys/mnfst_api_AbCd1234 \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

```js "JavaScript"
await fetch('https://api.manifestx.dev/v1/keys/mnfst_api_AbCd1234', {
  method: 'DELETE',
  headers: { Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}` },
})
```

</div>

```json
{ "revoked": "mnfst_api_AbCd1234", "request_id": "…" }
```

The key stops working on the next request, and a key can revoke itself. The account's last live key can't be revoked with the API (`409 last_key`), so there's always a working key. Create another key first.

### Rotate a Key

1. Create a new key with the old one.
2. Deploy the new key to every service that uses the old one.
3. Check that `last_used_at` on the old key stops moving.
4. Revoke the old key.

Both keys work until step 4. They share one request limit, so extra keys never add capacity. See [Limits](/docs/api/reference/limits).

---

## Errors

Every error has the [same shape](/docs/api/reference/errors).

| Status | `error` | Meaning |
|---|---|---|
| 400 | `invalid_input` | `POST /keys`: `label` isn't a string of 1 to 60 characters. |
| 401 | `unauthorized` | The key is missing, malformed, or not recognised. |
| 401 | `key_revoked` | The key was revoked. If the account has no live keys left, create one on the dashboard, or contact Manifest for an Enterprise account. |
| 404 | `not_found` | `DELETE /keys/:prefix`: no live key with that prefix in this account. |
| 409 | `key_limit` | `POST /keys`: the account already has 10 live keys. |
| 409 | `last_key` | `DELETE /keys/:prefix`: that's the account's only live key. |
| 429 | `mint_limit` | `POST /keys`: 20 keys created in the last 24 hours. Wait the seconds in `Retry-After`. |
| 429 | `rate_limited` | Too many requests or writes from this account. Wait the seconds in `Retry-After`. |

The `message` on a `401` says which key problem it is.
