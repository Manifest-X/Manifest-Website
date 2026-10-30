# Authentication

Send your API key with every request.

---

## Create an API key

1. Open the [API page](https://dash.manifestx.dev/api) of the dashboard. It's also in the account menu, under **API**.
2. Select **New key**, name it after the service that will use it, such as "CI" or "Docs sync", and select **Create key**.
3. Copy the key. It is shown once, so store it in your secrets manager right away.

Keys start with `mnfst_api_`{copy}. You can hold up to 10 keys. Give each service its own key, so you can revoke one without touching the others. The API page lists each key's prefix, name, creation date, and when it was last used.

Platform account keys are issued by Manifest when the account is set up.

---

## Send the key

Send the key on every request as a bearer token, `Authorization: Bearer <key>`{copy}:

```bash copy
curl https://api.manifestx.dev/v1/me \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

`GET /me`{copy} confirms the key works and returns the API account it belongs to:

```json
{
  "account": {
    "id": "acct_…",
    "name": "Sam Rivera",
    "plan": "free",
    "max_projects": 2,
    "created_at": 1760140800
  },
  "rate_limit": { "requests_per_minute": 60 },
  "key": { "prefix": "mnfst_api_AbCd1234" },
  "request_id": "…"
}
```

`plan`{copy} is `free`{copy} for the free allowance that comes with every Manifest account, or `platform`{copy} for a platform account. `max_projects`{copy} is how many projects the key can create through the API. See [Manage](/docs/api/projects/manage#what-a-key-can-manage) for what the key can do.

Keep the key on your server. It can act on every project it reaches, so never ship it to a browser or a site's repository.

**No CORS:** call the API from your server, never from a browser.

---

## Project keys

Creating a project also returns that project's own key, `project_key`{copy}, once. It is a normal Manifest project key for publishing that one project headless, for example from its CI with `mnfst-publish`. The API doesn't need it: your API key already reaches the project. See [Create a project](/docs/api/projects/manage#create-a-project).

---

## Revoke a key

On the [API page](https://dash.manifestx.dev/api), select the trash icon next to the key, then **Revoke key**. The key stops working on the next request and can't be restored. If a key leaks, revoke it and create a new one. Platform accounts revoke their keys [with the API](#keys).

---

## Keys

A key can create, list, and revoke the keys of its own API account. This is how a server rotates its key without the dashboard.

### Create a key with the API

```bash copy
curl -X POST https://api.manifestx.dev/v1/keys \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"label": "CI 2026-11"}'
```

`label`{copy} is optional, 1 to 60 characters. The response is `201`{copy} and carries the new key once:

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

An account holds up to 10 live keys, counting keys from the dashboard. Over that: `409 key_limit`{copy}. An account can create up to 20 keys a day this way, counting keys created in the last 24 hours, revoked ones included. Over that: `429 mint_limit`{copy} with `Retry-After`{copy}. A bad `label`{copy}: `400 invalid_input`{copy}.

`POST /keys`{copy} ignores `Idempotency-Key`{copy}, so a new key is never stored or replayed. If a request times out, list the keys and revoke any you didn't receive.

### List keys

`GET /keys`{copy} lists the account's live keys, newest first. It never returns a key, only its prefix:

```json
{
  "keys": [
    { "prefix": "mnfst_api_EfGh5678", "label": "CI 2026-11", "created_at": 1761868800, "last_used_at": null, "current": false },
    { "prefix": "mnfst_api_AbCd1234", "label": "CI", "created_at": 1760140800, "last_used_at": 1761868740, "current": true }
  ],
  "request_id": "…"
}
```

`current`{copy} marks the key that made the request. `last_used_at`{copy} is accurate to the minute.

### Revoke a key with the API

```bash copy
curl -X DELETE https://api.manifestx.dev/v1/keys/mnfst_api_AbCd1234 \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

```json
{ "revoked": "mnfst_api_AbCd1234", "request_id": "…" }
```

The key stops working on the next request. A key can revoke itself. The account's last live key can't be revoked with the API (`409 last_key`{copy}), so the account always keeps a working key. Revoke it on the dashboard, or [contact Manifest](/support) for a platform account.

### Rotate a key

1. Create a new key with the old one.
2. Deploy the new key to every service that uses the old one.
3. Check `last_used_at`{copy} on the old key stops moving.
4. Revoke the old key.

Both keys work until step 4. They share one request limit: more keys never add capacity. See [Limits](/docs/api/reference/limits).

---

## Errors

| **Status** | **`error`**      | **Meaning**                                                  |
|------------|------------------|--------------------------------------------------------------|
| 401        | `unauthorized`{copy}   | The key is missing, malformed, or not an API key.            |
| 401        | `key_revoked`{copy}    | The key was revoked. Use a current key or contact Manifest.  |
| 400        | `invalid_input`{copy}  | `POST /keys`{copy}: `label`{copy} isn't a string of 1 to 60 characters. |
| 404        | `not_found`{copy}      | `DELETE /keys/:prefix`{copy}: no live key with that prefix in this account. |
| 409        | `key_limit`{copy}      | `POST /keys`{copy}: the account already has 10 live keys.          |
| 429        | `mint_limit`{copy}     | `POST /keys`{copy}: 20 keys created in the last 24 hours. Wait the seconds in `Retry-After`{copy}. |
| 409        | `last_key`{copy}       | `DELETE /keys/:prefix`{copy}: that is the account's only live key. |
| 404        | `not_found`{copy}      | No such API route. Only `/v1/*` exists on `api.manifestx.dev`. |
| 429        | `rate_limited`{copy}   | Too many requests with this account's keys. Wait the seconds in `Retry-After`{copy}. See [Limits](/docs/api/reference/limits). |

The `message`{copy} says which key problem it is:

| **Key**   | **`message`**                                                          |
|-----------|------------------------------------------------------------------------|
| Missing   | `Send your API key as "Authorization: Bearer mnfst_api_…".`             |
| Unknown   | `That API key is not recognised.`                                      |
| Revoked   | `That API key has been revoked. Use a current key or contact Manifest.` |
| Revoked, none left (free) | `That API key has been revoked and this account has no live keys. Create one on the dashboard API page (dash.manifestx.dev/api).` |
| Revoked, none left (platform) | `That API key has been revoked and this account has no live keys. Contact Manifest (team@manifestx.dev) for a new one.` |
