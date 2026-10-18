# Authentication

Send your API key with every request.

---

## API keys

Your API account comes with an API key, issued by Manifest when the account is set up. It starts with `mnfst_api_`{copy} and is shown once, so store it in your secrets manager. Send it on every request as a bearer token, `Authorization: Bearer <key>`{copy}:

```bash copy
curl https://api.manifestx.dev/v1/me \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

`GET /me`{copy} confirms the key works and returns the API account it belongs to:

```json
{
  "account": {
    "id": "acct_…",
    "name": "Acme Docs",
    "max_projects": 100,
    "created_at": 1760140800
  },
  "key": { "prefix": "mnfst_api_AbCd1234" },
  "request_id": "…"
}
```

Keep the key on your server. It can act on every project your API account owns, so never ship it to a browser or a site's repository.

**No CORS:** call the API from your server, never from a browser.

---

## Project keys

Creating a project also returns that project's own key, `project_key`{copy}, once. It is a normal Manifest project key for publishing that one project headless, for example from its CI with `mnfst-publish`. The API doesn't need it: your API key acts on every project in your account. See [Create a project](/docs/api/projects/manage#create-a-project).

---

## Revoked keys

A revoked key stops working on the next request. If a key leaks, [contact Manifest](/support) to revoke it and receive a replacement.

---

## Errors

| **Status** | **`error`**      | **Meaning**                                                  |
|------------|------------------|--------------------------------------------------------------|
| 401        | `unauthorized`{copy}   | The key is missing, malformed, or not an API key.            |
| 401        | `key_revoked`{copy}    | The key was revoked. Use a current key or contact Manifest.  |
| 404        | `not_found`{copy}      | No such API route. Only `/v1/*` exists on `api.manifestx.dev`. |

The `message`{copy} says which key problem it is:

| **Key**   | **`message`**                                                          |
|-----------|------------------------------------------------------------------------|
| Missing   | `Send your API key as "Authorization: Bearer mnfst_api_…".`             |
| Unknown   | `That API key is not recognised.`                                      |
| Revoked   | `That API key has been revoked. Use a current key or contact Manifest.` |
