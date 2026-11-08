# Errors

What an error looks like, what each code means, and how to retry safely.

---

## Error Shape

Every error has the same shape. `message`{copy} is written for a person, so branch on `error`{copy} instead.

```json
{
  "error": "unauthorized",
  "message": "That API key is not recognised.",
  "request_id": "…"
}
```

Quote the `request_id`{copy} when you <a href="/support" target="_blank">contact Manifest</a>. Some errors add a property:

- **`field`{copy}** names the input at fault, such as `"articles[1].slug"`{copy} or `"files[0].path"`{copy}.
- **`live_deployment_id`{copy}** comes with `base_mismatch`{copy}, so you can reapply your change on it.

Upload and status URL errors carry `error`{copy} and `message`{copy}, but no `request_id`{copy}. Any path outside `/v1/*` answers `404 not_found`{copy} with "No such API route." A rare unexpected failure can answer `500` without a JSON body. Retry it like any 5xx.

---

## Common Problems

| Symptom | Likely cause | Fix |
|---|---|---|
| `401 unauthorized`{copy} on every request | The header isn't `Authorization: Bearer mnfst_api_…`{copy}, or it sends a project key (`mfst_…`) instead. | Send an API key from the dashboard's <a href="https://dash.manifestx.dev/api" target="_blank">API page</a>. |
| A browser `fetch` fails with a CORS error | The API refuses browsers. | Call it from your server. |
| `404 not_found`{copy} for a project in your dashboard | The path is missing `/v1`, the id is wrong, or the project belongs to another account. | Check the URL, and the id from `GET /projects`{copy}. |
| `403 forbidden`{copy} on a team project | You're a member of it, not its owner or an admin. | Ask the owner for the admin role. |
| `409 subdomain_taken`{copy} on create | Another project, perhaps someone else's, has that subdomain. | Pick another, or leave `subdomain`{copy} out. |
| `409 source_id_conflict`{copy} on create | The project exists under that `source_id`{copy} with another name. | [Look it up](/docs/api/guides/projects#find-a-project-by-source_id) instead of creating it. |
| `403 project_cap_reached`{copy} | The free allowance's two projects are in use. | Delete a test project, or <a href="/support?topic=enterprise#contact" target="_blank">talk to us</a> about Enterprise. |
| `402 pro_required`{copy} | Rollback and inviting editors are part of Pro. | Upgrade the project in the dashboard. On Free, [publish the earlier version again](/docs/api/guides/publish#undo-on-free). |
| An address says "This site hasn't been published yet." | Nothing is live on that environment. | Publish to staging, then [promote](/docs/api/guides/publish#promote-to-production). |
| Production doesn't show your change | Updates land on staging. | Check staging, then promote. |
| An old version still shows | The browser kept the page. | Reload. Pages are cached for up to a minute. |
| "No Manifest site is configured for this address." | The custom domain isn't active, was removed, or its project was deleted. | [Check the domain's status](/docs/api/guides/domains#check-the-status). |
| An upload's status stays `ingesting`{copy} | Each poll moves the publish forward. | Keep polling `status_url`{copy} until `done`{copy} or `error`{copy}. |
| `429`{copy} | A rate or daily limit is reached. | Wait the seconds in `Retry-After`{copy}. See [Limits](/docs/api/reference/limits). |

---

## Error Codes

| Status | `error` | What to do |
|---|---|---|
| 400 | `invalid_input`{copy} | A field is missing, malformed or unknown, `env`{copy} is wrong, or the body isn't JSON. Fix the request. |
| 400 | `invalid_idempotency_key`{copy} | `Idempotency-Key`{copy} is blank or over 200 characters. |
| 400 | `invalid_subdomain`{copy} | Use lowercase letters, digits, and single hyphens, 1 to 40 characters. |
| 400 | `invalid_hostname`{copy} | The hostname has spaces, no dot, or is an IP address. |
| 400 | `invalid_cursor`{copy} | The file list cursor isn't valid, or its deployment is gone. List again without it. |
| 400 | `invalid_path`{copy} | A file read's path doesn't name a file, for example it ends in `/`{copy} or contains `..`{copy}. |
| 400 | `staging_only`{copy} | File updates go to staging only. Update staging, then promote. |
| 400 | `empty_upload`{copy} | The upload had no body. Start a new publish. |
| 400 | `store_failed`{copy} | The zip couldn't be stored. Start a new publish. |
| 400 | `retry_upload`{copy} | On the status URL: the upload was lost before it was stored. Send the same zip to the same upload URL. |
| 401 | `unauthorized`{copy} | The key is missing, malformed, unknown, or not an API key. Check it. |
| 401 | `key_revoked`{copy} | The key was revoked, and stays revoked. Use a current key. |
| 402 | `pro_required`{copy} | Rollback and inviting editors are part of Pro. Upgrade the project in the dashboard, then retry. |
| 403 | `forbidden`{copy} | You're a member of the project, not its owner or an admin. Deleting a project made outside the API needs its owner. |
| 403 | `plan_required`{copy} | The project's plan doesn't include this, such as publishing to that environment, promote, file reads, deployment history, or custom domains. Every current plan includes these, so <a href="/support" target="_blank">contact Manifest</a> with the `request_id`{copy}. |
| 403 | `project_cap_reached`{copy} | Your account's project cap is reached. The message names it. See [Limits](/docs/api/reference/limits). |
| 403 | `domain_cap_reached`{copy} | The project has 25 custom domains. Remove one first. |
| 403 | `storage_cap_reached`{copy} | The publish would take the account over its storage cap. Nothing changed. See [Limits](/docs/api/reference/limits). |
| 403 | `owner_not_removable`{copy} | The project owner can't be removed. |
| 404 | `not_found`{copy} | No such project, domain, or key, or the key can't reach it. Also any unknown route. |
| 404 | `member_not_found`{copy} | No one with that `user_id`{copy} is on the project. |
| 404 | `unknown_deployment`{copy} | That `deployment_id`{copy} isn't one of this project's deployments for that environment. |
| 404 | `file_not_found`{copy} | A file read names a file that isn't live, or nothing is live on that environment yet. |
| 404 | `unknown_token`{copy} | On the status URL: the link expired or doesn't exist. Start a new publish. |
| 409 | `source_id_conflict`{copy} | That `source_id`{copy} already names a project with a different `name`{copy} or `subdomain`{copy}. |
| 409 | `source_id_deleted`{copy} | That `source_id`{copy} belonged to a deleted project. Use a new one. |
| 409 | `subdomain_taken`{copy} | Another project has that subdomain. Pick another. |
| 409 | `subscription_active`{copy} | The project has a Pro subscription. Cancel it in the dashboard, then delete. |
| 409 | `hostname_taken`{copy} | Another project has that hostname. |
| 409 | `key_limit`{copy} | The account has 10 live keys. Revoke one first. |
| 409 | `last_key`{copy} | That's the account's only live key. Create another before revoking it. |
| 409 | `nothing_on_staging`{copy} | Nothing is live on staging to promote. Publish to staging first. |
| 409 | `no_earlier_version`{copy} | There's no earlier version to roll back to. |
| 409 | `already_live`{copy} | That deployment is already live. |
| 409 | `not_restorable`{copy} | That deployment is still uploading or failed. |
| 409 | `base_mismatch`{copy} | Staging moved on from your `base`{copy}. Read the files again and reapply on `live_deployment_id`{copy}. |
| 409 | `idempotency_in_progress`{copy} | The first request with this key is still running. Retry shortly. |
| 409 | `ingest_in_progress`{copy} | An earlier upload to this URL is still processing. Poll the status URL. |
| 409 | `promote_in_progress`{copy} | Another promote of this project is still running. Retry shortly. |
| 410 | `project_deleted`{copy} | The project was deleted. The message says until when Manifest can restore it. See [Projects](/docs/api/guides/projects). |
| 410 | `expired`{copy} | The upload URL expired or was already used. Start a new publish. |
| 413 | `too_large`{copy} | The zip is over 80 MB, a file is over 25 MB, or the unzipped build is over 250 MB. |
| 413 | `too_many_files`{copy} | The zip holds more than 10,000 files. |
| 413 | `payload_too_large`{copy} | A content or file update body is over 12 MB. |
| 413 | `file_too_large`{copy} | A file update's file is over 8 MB. Publish it in a zip. |
| 413 | `deployment_too_large`{copy} | The updated project would pass 250 MB or 10,000 files. |
| 422 | `invalid_content`{copy} | A content slug, size, theme value, or page field is invalid. `field`{copy} says which. |
| 422 | `not_api_project`{copy} | Content only works on projects created through the API. Publish a zip instead. |
| 422 | `invalid_path`{copy} | A file update path is unsafe, private, written by Manifest, compiled, or listed twice. `field`{copy} names it. |
| 422 | `invalid_file`{copy} | A change needs exactly one of `content`{copy}, `content_base64`{copy}, or `delete`{copy}, or its base64 is invalid. |
| 422 | `file_not_found`{copy} | A delete names a file that isn't on staging. |
| 422 | `no_index`{copy} | The update would leave the project without `index.html`{copy}. |
| 422 | `hostname_reserved`{copy} | The hostname is on a Manifest domain, such as `manifestx.ai`. |
| 422 | `subdomain_reserved`{copy} | That subdomain is reserved, such as `login` or `billing`. |
| 422 | `idempotency_key_reused`{copy} | The key was already used for another body, endpoint, or project. Use a new key. |
| 422 | `invite_failed`{copy} | Manifest's team service refused the address. The message says why. Fix it rather than retrying. |
| 429 | `rate_limited`{copy} | Too many requests or writes. Wait the seconds in `Retry-After`{copy}. On the status URL there's no `Retry-After`{copy}: wait a minute. |
| 429 | `mint_limit`{copy} | 20 keys were created in the last 24 hours. Wait the seconds in `Retry-After`{copy}. |
| 429 | `invite_limit`{copy} | The project's 50 invites for today are used. Wait the seconds in `Retry-After`{copy}. |
| 429 | `publish_limit_reached`{copy} | A Free project's daily publish limit is reached. Wait the seconds in `Retry-After`{copy}. |
| 500 | `ingest_failed`{copy} | Content failed before going live, and what was live is unchanged. Retry. |
| 500 | `update_failed`{copy} | A file update failed. The message says whether staging is unchanged, or to check [deployments](/docs/api/guides/publish#list-deployments) first. |
| 502 | `domain_attach_failed`{copy} | The domain couldn't be added. Check the hostname, then retry. |
| 503 | `update_timed_out`{copy} | Storing the files took too long, and staging is unchanged. Retry, or send fewer files. |
| 503 | `promote_failed`{copy} | The promote couldn't finish, and production is unchanged. Retry shortly. |
| 503 | `publish_unavailable`{copy} | A publish couldn't be started. Retry shortly. |
| 503 | `template_unavailable`{copy} | The docs template couldn't be loaded. Retry shortly. |
| 503 | `domain_status_unavailable`{copy} | The domain status couldn't be read just now. Retry shortly. |
| 503 | `domains_unavailable`{copy} | Custom domains are briefly unavailable. Retry later. |
| 503 | `membership_unverified`{copy} | Your role on a team project couldn't be checked. Nothing was done. Retry. |
| 503 | `team_unavailable`{copy} | The project's team couldn't be reached. No one was invited or removed. Retry. |
| 503 | `idempotency_unavailable`{copy} | Idempotent requests are briefly unavailable. Retry later. Retrying without the header loses its duplicate protection. |

---

## Retrying

- **400 and 422:** fix the request. Sending it again unchanged gives the same answer.
- **409:** retry the `_in_progress`{copy} codes shortly. The others need a change first.
- **429:** wait the seconds in `Retry-After`{copy}, then retry.
- **5xx:** retry with the same `Idempotency-Key`{copy}. Failures are never stored, so the retry runs again.

Two 5xx codes need a check first. When `update_failed`{copy} says the update may or may not be live, check [deployments](/docs/api/guides/publish#list-deployments). On `502 domain_attach_failed`{copy}, check the hostname.

---

## Idempotency

Send an `Idempotency-Key`{copy} header so a retried request never runs twice.

<div x-code-group copy>

```bash "cURL"
curl -X POST https://api.manifestx.dev/v1/projects/proj_…/promote \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Idempotency-Key: help-center-sync-0193-promote"
```

```js "JavaScript"
const res = await fetch('https://api.manifestx.dev/v1/projects/proj_…/promote', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}`,
    'Idempotency-Key': 'help-center-sync-0193-promote',
  },
})
```

</div>

- **Which requests.** Every `POST`{copy}, `PATCH`{copy}, and `DELETE`{copy} accepts it, such as content, file updates, publish, promote, rollback, domains, and editors. It's ignored on `GET`{copy}.
- **Creating a project** needs no header. `source_id`{copy} is the key, so re-sending the same body returns the existing project with `200`. See [Projects](/docs/api/guides/projects).
- **Creating an API key** (`POST /keys`{copy}) ignores the header, so a new key is never stored or replayed.
- **The key itself** is 1 to 200 characters, unique per operation, and scoped to your API account. Derive it from your own job id, such as `help-center-sync-0193`, so a retry of the same job reuses it.

Responses are kept for 24 hours. A key is bound to the method, the path (including the project id), and the body of its first request. JSON key order and whitespace don't change the match.

| Repeat with the same key | Result |
|---|---|
| Same request, first one finished | The stored response, byte for byte, with an `Idempotent-Replayed: true`{copy} header. Nothing runs twice. |
| Same request, first one still running | `409 idempotency_in_progress`{copy}. Retry shortly. |
| Different body, endpoint, or project | `422 idempotency_key_reused`{copy}. Nothing runs. |
| First one answered `402`, `403`, `409`, `429`, or `5xx` | Not stored, so the retry runs again. It succeeds once the plan, role, cap, conflict, or limit allows it. |

A replayed project create returns the original `project_key`{copy}, so a retry after a dropped response still gets it.
