# Authentication

Send your API key with every request.

---

## Create an API key

1. Open the [dashboard](https://dash.manifestx.dev/settings) and go to **Settings**.
2. Under **API keys**, name the key after the service that will use it, such as "CI" or "Docs sync", and select **Create key**.
3. Copy the key. It is shown once, so store it in your secrets manager right away.

Keys start with `mnfst_api_`{copy}. You can hold up to 10 keys. Give each service its own key, so you can revoke one without touching the others. The list in Settings shows each key's prefix, name, creation date, and when it was last used.

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

In **Settings**, under **API keys**, select the trash icon next to the key, then **Revoke key**. The key stops working on the next request and can't be restored. If a key leaks, revoke it and create a new one. To revoke a platform account key, [contact Manifest](/support).

---

## Errors

| **Status** | **`error`**      | **Meaning**                                                  |
|------------|------------------|--------------------------------------------------------------|
| 401        | `unauthorized`{copy}   | The key is missing, malformed, or not an API key.            |
| 401        | `key_revoked`{copy}    | The key was revoked. Use a current key or contact Manifest.  |
| 404        | `not_found`{copy}      | No such API route. Only `/v1/*` exists on `api.manifestx.dev`. |
| 429        | `rate_limited`{copy}   | Too many requests with this key. Wait the seconds in `Retry-After`{copy}. See [Limits](/docs/api/reference/limits). |

The `message`{copy} says which key problem it is:

| **Key**   | **`message`**                                                          |
|-----------|------------------------------------------------------------------------|
| Missing   | `Send your API key as "Authorization: Bearer mnfst_api_…".`             |
| Unknown   | `That API key is not recognised.`                                      |
| Revoked   | `That API key has been revoked. Use a current key or contact Manifest.` |
