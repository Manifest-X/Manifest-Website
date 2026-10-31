# Manage

What a key can manage, how to create, list, and look up projects, and how to invite editors.

---

## What a key can manage

A key reaches two kinds of project:

| **Project**                                   | **What the key can do**                                                                 |
|-----------------------------------------------|-----------------------------------------------------------------------------------------|
| Projects you own or admin                     | Publish, promote, roll back, list deployments, manage custom domains, and invite or remove editors. |
| Projects your keys create through the API     | All of the above, plus [content](/docs/api/projects/content).                           |

Your own projects are the ones you see in the dashboard, made with Claude, the Manifest plugin, or the API. On a team project you need the owner or admin role: as a member the key answers `403 forbidden`. A project created by another account's API keys is reachable only with that account's keys. A project you can't access answers `404 not_found`, the same as one that doesn't exist.

Each project keeps its own plan. Publishing, staging, promote, and custom domains work on every plan. Rollback is part of Pro, so on a Free project it answers `402 pro_required`; upgrade the project in the [dashboard](https://dash.manifestx.dev) to use it.

A platform account's key reaches only the projects that account creates.

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
| `source_id`{copy}   | string   | yes          | Your id for this site (1–128 characters). Unique within your API account; blank values are rejected.                               |
| `name`{copy}        | string   | yes          | Display name (1–120 characters). The default subdomain is derived from it.                                                         |
| `subdomain`{copy}   | string   | no           | Exact label to use instead of the derived one: 1–40 lowercase letters, digits, or single hyphens. The site gets `<label>.manifestx.ai` and `<label>-staging.manifestx.ai`. |

Unknown fields are rejected with `400 invalid_input`.

A new project answers `201 Created`:

```json
{
  "project": {
    "id": "proj_…",
    "source_id": "site_8231",
    "name": "Acme Docs",
    "plan": "free",
    "status": "active",
    "project_key_prefix": "mfst_free_AbCd1234",
    "created_at": 1760140800,
    "urls": {
      "production": "https://acme-docs.manifestx.ai",
      "staging": "https://acme-docs-staging.manifestx.ai"
    },
    "published": { "production": false, "staging": false }
  },
  "project_key": "mfst_free_…",
  "request_id": "…"
}
```

`project_key`{copy} is the project's own key, returned **once**. It is a normal Manifest project key for that one project, not your API key: hand it to the site's CI if it publishes headless, or keep it in your vault. The API itself doesn't need it, because your API key already reaches the project. The subdomains are reserved immediately; `published`{copy} flips to `true` per environment after the first publish there.

`plan`{copy} is the project's plan: `free`{copy}, `pro`{copy}, or `api`{copy} for a platform account's projects. On the free allowance a new project is on Free, so its site shows the "Made with Manifest" badge and can appear in the Manifest showcase. A platform account's projects are private by default (they never appear in the showcase) and carry no badge.

### Idempotent creates

`source_id`{copy} is the idempotency key for creates, so a retry is always safe without any extra header:

| **Request**                                              | **Response**                                                                                  |
|----------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| Same `source_id`{copy}, same `name`{copy} (and `subdomain`{copy}, if sent) | `200 OK` with the existing project. No `project_key`{copy}: it was returned when the project was created. |
| Same `source_id`{copy}, different `name`{copy} or `subdomain`{copy}        | `409 source_id_conflict`, naming the existing project id. Nothing is changed.                 |
| Two creates for the same `source_id`{copy} at the same moment  | One project. The first wins (`201`); the other sees it (`200`).                               |

Every other request that changes something is made retry-safe with an `Idempotency-Key`{copy} header. See [Idempotency](/docs/api/reference/idempotency).

### Free allowance and project cap

Your API keys share one allowance: together they can create up to `max_projects`{copy} projects through the API, shown on `GET /me`{copy}. On the free allowance that is 2. Projects you made with Claude, the plugin, or the dashboard don't count toward it.

A create past the cap is refused with `403 project_cap_reached`, and the message names the cap. Existing projects are unaffected, and re-sending an existing `source_id`{copy} still returns it. Deleting an allowance project in the dashboard frees its place.

For more projects, ask about a platform account at [team@manifestx.dev](mailto:team@manifestx.dev). Platform accounts are set up by contract, with a higher cap.

---

## List projects

```bash copy
curl https://api.manifestx.dev/v1/projects \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

Returns `{ "projects": [ … ], "complete": true, "request_id": "…" }` with every live project the key reaches, newest first, in the same shape as the create response (without `project_key`{copy}). Projects you made outside the API have `"source_id": null`. Deleted projects and projects the key can't reach are never included.

`complete`{copy} is `false` when Manifest couldn't check your team roles just then. The list then holds only the projects you own; retry to see team projects too.

---

## Get a project

```bash copy
curl https://api.manifestx.dev/v1/projects/proj_… \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

Returns `{ "project": { … }, "request_id": "…" }`. A project the key can't reach answers `404 not_found`, the same as one that doesn't exist.

---

## Inviting editors

Give the people behind a site their own access to it. An invited editor signs in to Manifest with the invited email and the project appears in their own Claude, ready to edit and publish. They never see or need an API key.

### Invite an editor

```bash copy
curl -X POST https://api.manifestx.dev/v1/projects/proj_…/invites \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "email": "editor@acme.com" }'
```

| **Field** | **Type** | **Required** | **Notes** |
|---|---|---|---|
| `email`{copy} | string | yes | The editor's email address. They sign in with this exact address. |
| `role`{copy} | string | no | `member`{copy} (default) can edit and publish. `admin`{copy} can also invite and remove others; send it only when you mean to. |

Manifest adds the editor to the project's team and emails them a sign-in link. A new editor answers `201 Created`:

```json
{
  "member": { "user_id": "…", "email": "editor@acme.com", "role": "member", "is_owner": false },
  "already_member": false,
  "email_sent": true,
  "request_id": "…"
}
```

Inviting someone already on the project answers `200 OK` with `"already_member": true`{copy}, their current role, and a fresh sign-in email; nothing else changes. `email_sent`{copy} is `false`{copy} when the email couldn't be sent: the editor is still added and can join by signing in with that address.

Inviting editors is part of Pro, so on a Free project it answers `402 pro_required`. Projects on a platform account include it.

### List editors

```bash copy
curl https://api.manifestx.dev/v1/projects/proj_…/members \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

Returns `{ "members": [ … ], "complete": true, "request_id": "…" }`. Each member has `user_id`{copy}, `email`{copy}, `role`{copy} (`owner`{copy}, `admin`{copy}, or `member`{copy}), and `is_owner`{copy}. The owner is always listed first. `complete`{copy} is `false`{copy} when Manifest couldn't reach the team just then; the list then holds only the owner, so retry.

### Remove an editor

```bash copy
curl -X DELETE https://api.manifestx.dev/v1/projects/proj_…/members/USER_ID \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

Use the `user_id`{copy} from the invite or the list. Access is revoked immediately; the editor keeps their own Manifest account. Listing and removing editors work on every plan, so access can always be taken away. The project owner can't be removed (`403 owner_not_removable`).

### Editors outlive your keys

An editor's access belongs to the project, not to the key that invited them. Revoking or rotating an API key doesn't remove anyone: to take access away, remove the editor. If a key leaks, list each project's editors and remove anyone you didn't invite.

---

## Errors

| **Status** | **`error`**                 | **Meaning**                                                                                   |
|------------|-----------------------------|-----------------------------------------------------------------------------------------------|
| 400        | `invalid_input`{copy}             | Missing or malformed field, blank `source_id`{copy}, unknown field, or a body that isn't JSON.       |
| 400        | `invalid_subdomain`{copy}         | `subdomain`{copy} isn't a clean label (lowercase letters, digits, single hyphens, 1–40 characters). |
| 400        | `invalid_idempotency_key`{copy}   | `Idempotency-Key`{copy} is blank or longer than 200 characters.                                     |
| 402        | `pro_required`{copy}              | Inviting editors is part of Pro. Upgrade the project in the dashboard.                        |
| 403        | `project_cap_reached`{copy}       | Your account's project cap is reached. The message names the cap.                                  |
| 403        | `forbidden`{copy}                 | You are a member of this project, not its owner or an admin.                                  |
| 403        | `owner_not_removable`{copy}       | The project owner can't be removed.                                                           |
| 404        | `not_found`{copy}                 | No such project, or the key can't reach it.                                                   |
| 404        | `member_not_found`{copy}          | No one with that `user_id`{copy} is on the project.                                                |
| 409        | `source_id_conflict`{copy}        | `source_id`{copy} already names a project with a different `name`{copy} or `subdomain`{copy}.                   |
| 409        | `source_id_deleted`{copy}         | `source_id`{copy} named a project that has since been deleted. Use a new `source_id`{copy}.               |
| 409        | `subdomain_taken`{copy}           | The requested subdomain belongs to another project.                                           |
| 409        | `idempotency_in_progress`{copy}   | The first request with this `Idempotency-Key`{copy} is still running. Retry shortly.                |
| 422        | `subdomain_reserved`{copy}        | The requested subdomain is a reserved label (for example `login` or `billing`).               |
| 422        | `idempotency_key_reused`{copy}    | `Idempotency-Key`{copy} was already used with a different request body.                             |
| 422        | `invite_failed`{copy}             | The invite was refused. The message says why.                                                 |
| 503        | `idempotency_unavailable`{copy}   | Idempotent requests are temporarily unavailable. Retry later, or without the header.          |
| 503        | `membership_unverified`{copy}     | Manifest couldn't check your role on a team project just then. Nothing was done. Retry.       |
| 503        | `team_unavailable`{copy}          | Manifest couldn't reach the project's team just then. No one was invited or removed. Retry.   |
