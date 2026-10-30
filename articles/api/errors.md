# Errors

What an error looks like, and what to do about it.

---

## Error shape

Every error has the same shape. `message`{copy} is written for a person; branch on `error`{copy}. Quote the `request_id`{copy} when you [contact Manifest](/support).

```json
{
  "error": "unauthorized",
  "message": "That API key is not recognised.",
  "request_id": "…"
}
```

Any path outside `/v1/*` answers `404` with `"error": "not_found"`{copy} and "No such API route." A content or file update error also names the field, for example `"field": "articles[1].slug"`{copy} or `"field": "files[0].path"`{copy}.

---

## What to do

| **Status** | **What to do**                                                                                                  |
|------------|-----------------------------------------------------------------------------------------------------------------|
| 400, 422   | Fix the request. The `message`{copy} says what is wrong; don't retry unchanged.                                       |
| 401        | Check the key. A revoked key stays revoked.                                                                     |
| 402        | `pro_required`{copy}: the feature is part of Pro. Upgrade the project in the dashboard, then retry.                   |
| 403        | A cap is reached (projects or domains), or you are a member of the project but not its owner or an admin. The message says which. |
| 404        | The project, deployment, file, or domain doesn't exist or the key can't reach it, or the route doesn't exist.   |
| 409        | A conflict or an operation still running. The `error`{copy} code says which; retry the `_in_progress` ones shortly.  |
| 413        | The body or a file is too large. See [Limits](/docs/api/reference/limits).                                      |
| 429        | Too many requests. Wait the number of seconds in `Retry-After`{copy}, then retry.                                     |
| 5xx        | Retry with the same `Idempotency-Key`{copy}. Failures are never stored, so the retry runs again.                      |

---

## Codes by topic

Each article lists its own codes:

- [Authentication](/docs/api/setup/authentication#errors): missing, invalid, and revoked keys, and the rate limit.
- [Manage](/docs/api/projects/manage#errors): creates, `source_id`{copy} conflicts, the project cap, and project roles.
- [Publish](/docs/api/projects/publish#errors): uploads, file reads and updates, promotes, rollbacks, and Pro features.
- [Content](/docs/api/projects/content#errors): content ingest and `field`{copy} errors.
- [Domains](/docs/api/projects/domains#errors): hostnames, certificates, and the domain cap.
- [Usage](/docs/api/projects/usage#errors): the `period`{copy} parameter.
- [Idempotency](/docs/api/reference/idempotency#errors): `Idempotency-Key`{copy} reuse and retries.
