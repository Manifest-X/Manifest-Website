# Manage

Create, list, and look up projects.

---

## Create a project

Each site is one project. Create it once, keyed by your own id for that site, and the API keeps creates idempotent for you.

```bash copy
curl -X POST https://api.manifestx.dev/v1/projects \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "source_id": "site_8231", "name": "Acme Docs", "subdomain": "acme-docs" }'
```

| **Field**     | **Type** | **Required** | **Notes**                                                                                                                          |
|---------------|----------|--------------|------------------------------------------------------------------------------------------------------------------------------------|
| `source_id`   | string   | yes          | Your id for this site (1–128 characters). Unique within your API account; blank values are rejected.                               |
| `name`        | string   | yes          | Display name (1–120 characters). The default subdomain is derived from it.                                                         |
| `subdomain`   | string   | no           | Exact label to use instead of the derived one: 1–40 lowercase letters, digits, or single hyphens. The site gets `<label>.manifestx.ai` and `<label>-staging.manifestx.ai`. |

Unknown fields are rejected with `400 invalid_input`.

A new project answers `201 Created`:

```json
{
  "project": {
    "id": "proj_…",
    "source_id": "site_8231",
    "name": "Acme Docs",
    "status": "active",
    "project_key_prefix": "mfst_live_AbCd1234",
    "created_at": 1760140800,
    "urls": {
      "production": "https://acme-docs.manifestx.ai",
      "staging": "https://acme-docs-staging.manifestx.ai"
    },
    "published": { "production": false, "staging": false }
  },
  "project_key": "mfst_live_…",
  "request_id": "…"
}
```

`project_key` is the project's own key, returned **once**. It is a normal Manifest project key for that one project, not your API key: hand it to the site's CI if it publishes headless, or keep it in your vault. The API itself doesn't need it, because your API key acts on every project in your account. The subdomains are reserved immediately; `published` flips to `true` per environment after the first publish there.

Every project you create is private by default (it never appears in the Manifest showcase) and carries no badge.

### Idempotent creates

`source_id` is the idempotency key for creates, so a retry is always safe without any extra header:

| **Request**                                              | **Response**                                                                                  |
|----------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| Same `source_id`, same `name` (and `subdomain`, if sent) | `200 OK` with the existing project. No `project_key`: it was returned when the project was created. |
| Same `source_id`, different `name` or `subdomain`        | `409 source_id_conflict`, naming the existing project id. Nothing is changed.                 |
| Two creates for the same `source_id` at the same moment  | One project. The first wins (`201`); the other sees it (`200`).                               |

Every other request that changes something is made retry-safe with an `Idempotency-Key` header. See [Idempotency](/docs/api/reference/idempotency).

### Project cap

Each API account has a project cap, shown as `max_projects` on `GET /me`. A create that would exceed it is refused with `403 project_cap_reached` and the cap in the message. Existing projects are unaffected, and re-sending an existing `source_id` still returns it. [Contact Manifest](/support) to raise the cap.

---

## List projects

```bash copy
curl https://api.manifestx.dev/v1/projects \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

Returns `{ "projects": [ … ], "request_id": "…" }` with every live project in your API account, newest first, in the same shape as the create response (without `project_key`). Deleted projects and projects outside your account are never included.

---

## Get a project

```bash copy
curl https://api.manifestx.dev/v1/projects/proj_… \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

Returns `{ "project": { … }, "request_id": "…" }`. A project that is not in your API account answers `404 not_found`, the same as one that doesn't exist.

---

## Errors

| **Status** | **`error`**                 | **Meaning**                                                                                   |
|------------|-----------------------------|-----------------------------------------------------------------------------------------------|
| 400        | `invalid_input`             | Missing or malformed field, blank `source_id`, unknown field, or a body that isn't JSON.       |
| 400        | `invalid_subdomain`         | `subdomain` isn't a clean label (lowercase letters, digits, single hyphens, 1–40 characters). |
| 400        | `invalid_idempotency_key`   | `Idempotency-Key` is blank or longer than 200 characters.                                     |
| 403        | `project_cap_reached`       | The account's project cap is reached. The message names the cap.                              |
| 404        | `not_found`                 | No such project in your API account.                                                          |
| 409        | `source_id_conflict`        | `source_id` already names a project with a different `name` or `subdomain`.                   |
| 409        | `source_id_deleted`         | `source_id` named a project that has since been deleted. Use a new `source_id`.               |
| 409        | `subdomain_taken`           | The requested subdomain belongs to another project.                                           |
| 409        | `idempotency_in_progress`   | The first request with this `Idempotency-Key` is still running. Retry shortly.                |
| 422        | `subdomain_reserved`        | The requested subdomain is a reserved label (for example `login` or `billing`).               |
| 422        | `idempotency_key_reused`    | `Idempotency-Key` was already used with a different request body.                             |
| 503        | `idempotency_unavailable`   | Idempotent requests are temporarily unavailable. Retry later, or without the header.          |
