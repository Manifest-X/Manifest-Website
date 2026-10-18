# Authentication

Send your API key with every request.

---

## API keys

Your API account comes with an API key, issued by Manifest when the account is set up. It starts with `mfst_api_` and is shown once, so store it in your secrets manager. Send it on every request as a bearer token:

```bash copy
curl https://api.manifestx.dev/v1/me \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

`GET /me` confirms the key works and returns the API account it belongs to:

```json
{
  "account": {
    "id": "acct_…",
    "name": "Acme Docs",
    "max_projects": 100,
    "created_at": 1760140800
  },
  "key": { "prefix": "mfst_api_AbCd1234" },
  "request_id": "…"
}
```

Keep the key on your server. It can act on every project your API account owns, so never ship it to a browser or a site's repository.

::: brand icon="lucide:info"
**An API key works only on the API.** It is refused by the Manifest connector, the dashboard, and every other endpoint. Project keys and connector sign-ins don't work on the API either.
:::

---

## Project keys

Creating a project also returns that project's own key, `project_key`, once. It is a normal Manifest project key for publishing that one project headless, for example from its CI with `mnfst-publish`. The API doesn't need it: your API key acts on every project in your account. See [Create a project](/docs/api/projects/manage#create-a-project).

---

## Revoked keys

A revoked key stops working on the next request. If a key leaks, [contact Manifest](/support) to revoke it and receive a replacement.

---

## Errors

| **Status** | **`error`**      | **Meaning**                                                  |
|------------|------------------|--------------------------------------------------------------|
| 401        | `unauthorized`   | The key is missing, malformed, or not an API key.            |
| 401        | `key_revoked`    | The key was revoked. Use a current key or contact Manifest.  |
| 404        | `not_found`      | No such API route. Only `/v1/*` exists on `api.manifestx.dev`. |

The `message` says which key problem it is:

| **Key**   | **`message`**                                                          |
|-----------|------------------------------------------------------------------------|
| Missing   | `Send your API key as "Authorization: Bearer mfst_api_…".`             |
| Unknown   | `That API key is not recognised.`                                      |
| Revoked   | `That API key has been revoked. Use a current key or contact Manifest.` |
