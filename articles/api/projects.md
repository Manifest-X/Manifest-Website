# Projects

Create a project for anything you publish, find it again by your own id, and give people access to it.

---

## Create a Project

Each thing you publish is one project. Create it once, tagged with your own id for it.

<div x-code-group copy>

```bash "cURL"
curl -X POST https://api.manifestx.dev/v1/projects \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "source_id": "site_8231", "name": "Acme Docs", "subdomain": "acme-docs" }'
```

```js "JavaScript"
const res = await fetch('https://api.manifestx.dev/v1/projects', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ source_id: 'site_8231', name: 'Acme Docs', subdomain: 'acme-docs' }),
})
const { project, project_key } = await res.json()
```

</div>

| Field | Type | Required | Notes |
|---|---|---|---|
| `source_id` | string | yes | Your id for this project, 1 to 128 characters. Unique within your account. |
| `name` | string | yes | Display name, 1 to 120 characters. The default subdomain comes from it. |
| `subdomain` | string | no | The exact label to use instead: 1 to 40 lowercase letters, digits, or single hyphens. |

The project gets `<label>.manifestx.ai` and `<label>-staging.manifestx.ai`. Unknown fields are refused with `400 invalid_input`. A new project answers `201 Created`:

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

- **`project_key`** is the project's own key, returned once. It starts `mfst_live_` on paid accounts. Give it to the project's own build pipeline if it publishes without you, or keep it in your vault. The API doesn't need it.
- **`plan`** is the project's own plan, such as `free`, `pro`, or `api` for projects an Enterprise account creates.
- **`published`** turns `true` per environment after the first publish there. The subdomains are reserved straight away.

Free projects show the "Made with Manifest" badge and can appear in the Manifest showcase. Enterprise projects carry no badge and are private by default, so they never appear in the showcase.

### Staging and Production

Each project has two addresses, both in `urls`, and both public. Staging is kept out of search results.

- **Before anything is published there,** an address answers `404` with "This site hasn't been published yet."
- **Staging** gets every publish, file update, and content request by default. Check changes there.
- **Production** changes only when you [promote](/docs/api/guides/publish#promote-to-production), or publish to it directly with `env`.
- **Custom domains** serve production unless you add them for staging. See [Domains](/docs/api/guides/domains).
- **Seeing an old version** after a publish? Reload. A browser can keep a page for up to a minute.

### Safe to Repeat

`source_id` makes creates safe to retry, with no extra header.

| You send | You get |
|---|---|
| The same `source_id`, `name`, and `subdomain` (if sent) | `200 OK` with the existing project, without `project_key`. |
| The same `source_id` with a different `name` or `subdomain` | `409 source_id_conflict`, naming the existing project. Nothing changes. |
| Two creates for one `source_id` at the same moment | One project. The first gets `201`, the other `200`. |

::: brand icon="lucide:info"
A sync that re-sends the create body breaks once a project is renamed. Look the project up [by `source_id`](#find-a-project-by-source_id) first, and create only when nothing comes back.
:::

### Free Allowance

Your keys can create up to `max_projects` projects through the API together, shown on `GET /me`. On the free allowance that's 2. Projects made with Claude or the dashboard don't count.

Past the cap, a create answers `403 project_cap_reached`. Existing projects are unaffected, and deleting an allowance project frees its place. Upgrading one to Pro doesn't free it. For more, <a href="/support?topic=enterprise#contact" target="_blank">talk to us</a> about Enterprise.

---

## Find a Project by source_id

<div x-code-group copy>

```bash "cURL"
curl "https://api.manifestx.dev/v1/projects?source_id=site_8231" \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

```js "JavaScript"
const res = await fetch(
  `https://api.manifestx.dev/v1/projects?source_id=${encodeURIComponent('site_8231')}`,
  { headers: { Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}` } },
)
const { projects } = await res.json()
const project = projects[0] ?? null
```

</div>

```json
{ "projects": [{ "id": "proj_…", "source_id": "site_8231", "name": "Acme Docs", "…": "…" }], "complete": true, "request_id": "…" }
```

`projects` holds zero or one project: the live project your account created with that `source_id`. URL-encode the value. A deleted project is never returned.

---

## List Projects

<div x-code-group copy>

```bash "cURL"
curl https://api.manifestx.dev/v1/projects \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

```js "JavaScript"
const res = await fetch('https://api.manifestx.dev/v1/projects', {
  headers: { Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}` },
})
const { projects, complete } = await res.json()
```

</div>

Returns `{ "projects": [ … ], "complete": true, "request_id": "…" }`: every live project the key reaches, newest first, shaped like the create response without `project_key`.

Good to know:

- **Not paginated.** Every project comes in one answer. To look up one, [find it by source_id](#find-a-project-by-source_id).
- **`source_id` is `null`** on projects you made outside the API.
- **`complete` is `false`** when Manifest couldn't check your team roles just then. The list holds only the projects you own, so retry.

---

## Get a Project

<div x-code-group copy>

```bash "cURL"
curl https://api.manifestx.dev/v1/projects/proj_… \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

```js "JavaScript"
const res = await fetch(`https://api.manifestx.dev/v1/projects/${projectId}`, {
  headers: { Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}` },
})
const { project } = await res.json()
```

</div>

Returns `{ "project": { … }, "request_id": "…" }`. A project the key can't reach answers `404 not_found`, the same as one that doesn't exist. A deleted project answers `410 project_deleted`.

---

## Rename a Project

<div x-code-group copy>

```bash "cURL"
curl -X PATCH https://api.manifestx.dev/v1/projects/proj_… \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "name": "Acme Help Center" }'
```

```js "JavaScript"
const res = await fetch(`https://api.manifestx.dev/v1/projects/${projectId}`, {
  method: 'PATCH',
  headers: {
    Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: 'Acme Help Center' }),
})
const { project } = await res.json()
```

</div>

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | yes | New display name, 1 to 120 characters. |

Answers `200 OK` with `{ "project": { … }, "request_id": "…" }`. Only the name changes: `source_id`, subdomains, and custom domains stay. Creates with the same `source_id` then match the new name.

Any other field, including `source_id`, is refused with `400 invalid_input`. Send an `Idempotency-Key` to make a retry safe.

---

## Editors

Give the people behind a project their own access. An invited editor signs in to Manifest with the invited email, and the project appears in their own Claude, ready to edit and publish. They never see or need an API key.

::: brand icon="lucide:info"
Inviting editors is part of Pro, so a Free project answers `402 pro_required`. Enterprise projects include it. Listing and removing editors work on every plan, so access can always be taken away.
:::

### Invite an Editor

<div x-code-group copy>

```bash "cURL"
curl -X POST https://api.manifestx.dev/v1/projects/proj_…/invites \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "email": "editor@acme.com" }'
```

```js "JavaScript"
const res = await fetch(`https://api.manifestx.dev/v1/projects/${projectId}/invites`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email: 'editor@acme.com' }),
})
const { member } = await res.json()
```

</div>

| Field | Type | Required | Notes |
|---|---|---|---|
| `email` | string | yes | The editor's email. They sign in with this exact address. |
| `role` | string | no | `member` (default) can edit and publish. `admin` can also invite and remove others. |

Manifest adds the editor to the project's team and emails them a sign-in link. A new editor answers `201 Created`:

```json
{
  "member": { "user_id": "…", "email": "editor@acme.com", "role": "member", "is_owner": false },
  "already_member": false,
  "email_sent": true,
  "email_skipped": null,
  "request_id": "…"
}
```

| If | Then |
|---|---|
| They're already on the project | `200 OK` with `"already_member": true` and their current role. The role never changes. |
| They were emailed in the last 10 minutes | No new email. `email_skipped` is `recently_sent`. |
| The address is the project owner's | No email. `email_skipped` is `self`. |
| The email couldn't be sent | `email_sent` is `false`. They're still added, and can join by signing in with that address. |

Two invites for the same address at once seat them once. Each project accepts 50 invites a day, on every plan. Past that: `429 invite_limit`, with `Retry-After`.

### List Editors

<div x-code-group copy>

```bash "cURL"
curl https://api.manifestx.dev/v1/projects/proj_…/members \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

```js "JavaScript"
const res = await fetch(`https://api.manifestx.dev/v1/projects/${projectId}/members`, {
  headers: { Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}` },
})
const { members, complete } = await res.json()
```

</div>

```json
{
  "members": [
    { "user_id": "…", "email": "owner@example.com", "role": "owner", "is_owner": true },
    { "user_id": "…", "email": "editor@acme.com", "role": "member", "is_owner": false }
  ],
  "complete": true,
  "request_id": "…"
}
```

`role` is `owner`, `admin`, or `member`, and the owner is always first. `complete` is `false` when Manifest couldn't reach the team just then. The list then holds only the owner, so retry.

### Remove an Editor

Use the `user_id` from the invite or the list.

<div x-code-group copy>

```bash "cURL"
curl -X DELETE https://api.manifestx.dev/v1/projects/proj_…/members/USER_ID \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

```js "JavaScript"
await fetch(`https://api.manifestx.dev/v1/projects/${projectId}/members/${userId}`, {
  method: 'DELETE',
  headers: { Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}` },
})
```

</div>

```json
{ "removed": { "user_id": "…", "email": "editor@acme.com" }, "request_id": "…" }
```

Access ends at once. The editor keeps their own Manifest account. The project owner can't be removed (`403 owner_not_removable`).

### Editors Outlive Your Keys

An editor's access belongs to the project, not to the key that invited them. Revoking or rotating a key removes no one. If a key leaks, list each project's editors and remove anyone you didn't invite.

---

## Delete a Project

<div x-code-group copy>

```bash "cURL"
curl -X DELETE https://api.manifestx.dev/v1/projects/proj_… \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

```js "JavaScript"
const res = await fetch(`https://api.manifestx.dev/v1/projects/${projectId}`, {
  method: 'DELETE',
  headers: { Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}` },
})
const { purge_after } = await res.json()
```

</div>

```json
{
  "deleted": "proj_…",
  "deleted_at": 1762041600,
  "purge_after": 1764633600,
  "request_id": "…"
}
```

::: negative icon="lucide:triangle-alert"
The project goes offline at once. Staging and production stop serving, the default subdomains are released, and custom domains are detached. The `source_id` stays taken for good.
:::

After a delete:

- The project's own key stops working, and the project leaves `GET /projects`.
- Any request for it answers `410 project_deleted`, including a second delete.
- On the free allowance, its place is freed straight away.
- A create that reuses its `source_id` answers `409 source_id_deleted`.

**Restoring.** Files and history are kept for 30 days, until `purge_after`. Within that window, email [team@manifestx.dev](mailto:team@manifestx.dev) with the project id and Manifest can restore it. A restore brings back staging, production, and the default subdomains.

Custom domains come back pending, because their certificates were released. Manifest sends the DNS records to check again, and the domain's [status](/docs/api/guides/domains) shows when it's active. A subdomain or domain another project took in the meantime can't be returned.

**Who can delete.** Only the owner can delete a project made outside the API; an admin gets `403 forbidden`. A project with a Pro subscription answers `409 subscription_active`, so cancel it in the <a href="https://dash.manifestx.dev" target="_blank">dashboard</a> first.

---

## Which Projects a Key Reaches

| Project | What the key can do |
|---|---|
| Projects you own or admin | Publish, promote, roll back, rename, list deployments, manage domains, and invite or remove editors. |
| Projects your keys create | All of the above, plus the [docs template](/docs/api/guides/docs-template). |

- **Your own projects** are the ones in your dashboard, made in Claude, in the dashboard, or through the API.
- **Team projects** need the owner or admin role. As a member, the key gets `403 forbidden`.
- **Another account's projects** are out of reach. They answer `404 not_found`, like a project that doesn't exist.
- **Enterprise keys** reach only the projects that account creates.

Each project keeps its own plan. Publishing, staging, promote, and custom domains work on every plan. Rollback is part of Pro, so a Free project answers `402 pro_required`.

To move a project to Pro, its owner upgrades it from the <a href="https://dash.manifestx.dev" target="_blank">dashboard</a>. Projects your keys create are listed there, and in Claude, like any other project of yours.

---

## Errors

Every error has the [same shape](/docs/api/reference/errors). These are the ones specific to projects and editors.

| Status | `error` | Meaning |
|---|---|---|
| 400 | `invalid_input` | A field is missing, malformed, or unknown, or the body isn't JSON. |
| 400 | `invalid_subdomain` | `subdomain` isn't 1 to 40 lowercase letters, digits, or single hyphens. |
| 402 | `pro_required` | Inviting editors is part of Pro. Upgrade the project in the dashboard. |
| 403 | `project_cap_reached` | Your account's project cap is reached. The message names the cap. |
| 403 | `forbidden` | You're a member, not the owner or an admin. Deleting a project made outside the API needs its owner. |
| 403 | `owner_not_removable` | The project owner can't be removed. |
| 404 | `not_found` | No such project, or the key can't reach it. |
| 404 | `member_not_found` | No one with that `user_id` is on the project. |
| 409 | `source_id_conflict` | `source_id` already names a project with a different `name` or `subdomain`. |
| 409 | `source_id_deleted` | `source_id` named a project that was deleted. Use a new one. |
| 409 | `subdomain_taken` | Another project has that subdomain. |
| 409 | `subscription_active` | The project has a Pro subscription. Cancel it in the dashboard, then delete. |
| 410 | `project_deleted` | The project was deleted. The message says until when Manifest can restore it. |
| 422 | `subdomain_reserved` | That subdomain is reserved, like `login` or `billing`. |
| 422 | `invite_failed` | Manifest's team service refused the address. The message says why; fix it rather than retrying. |
| 429 | `invite_limit` | The project's 50 invites for today are used. Wait the seconds in `Retry-After`. |
| 503 | `membership_unverified` | Manifest couldn't check your role on a team project. Nothing was done. Retry. |
| 503 | `team_unavailable` | Manifest couldn't reach the project's team. No one was invited or removed. Retry. |

Idempotency errors are on [Errors](/docs/api/reference/errors#idempotency).
