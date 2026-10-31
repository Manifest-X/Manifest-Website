# Idempotency

Retry any request safely.

---

## How retries work

Creates are idempotent on your own id; everything else that changes something uses a header.

- **Creates:** `source_id`{copy} is the key. Re-sending the same body returns the existing project (`200`), so a create needs no header. See [Idempotent creates](/docs/api/projects/manage#idempotent-creates).
- **Everything else that changes something** (content, publish, promote, rollback, domains, and editors): send an `Idempotency-Key`{copy} header, 1 to 200 characters, unique per operation and scoped to your API account. Derive it from your own job id, such as `help-center-sync-0193`, so a retry of the same job reuses it.

```bash copy
curl -X POST https://api.manifestx.dev/v1/projects \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Idempotency-Key: 6f1c2a8e-create-site_8232" \
  -H "Content-Type: application/json" \
  -d '{ "source_id": "site_8232", "name": "Beta Docs" }'
```

---

## Repeating a key

| **Repeat with the same key**             | **Result**                                                                                                  |
|------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| Same body, first request finished        | The stored response, byte for byte, with an `Idempotent-Replayed: true`{copy} header. Nothing runs twice.         |
| Same body, first request still running   | `409 idempotency_in_progress`. Retry shortly.                                                               |
| Different body                           | `422 idempotency_key_reused`. Nothing runs.                                                                 |
| First request answered `402`, `403`, `409`, `429`, or `5xx` | Not stored: the retry runs the request again, so it succeeds once the plan, role, cap, conflict, or limit allows it. |

Responses are kept for 24 hours. JSON key order and whitespace don't change the match, and the header is ignored on `GET`. A replayed create returns the original `project_key`{copy}, so a retry after a dropped response still receives the project key.

---

## Errors

| **Status** | **`error`**                 | **Meaning**                                                                          |
|------------|-----------------------------|--------------------------------------------------------------------------------------|
| 400        | `invalid_idempotency_key`{copy}   | `Idempotency-Key`{copy} is blank or longer than 200 characters.                            |
| 409        | `idempotency_in_progress`{copy}   | The first request with this key is still running. Retry shortly.                     |
| 422        | `idempotency_key_reused`{copy}    | The key was already used with a different request body.                              |
| 503        | `idempotency_unavailable`{copy}   | Idempotent requests are temporarily unavailable. Retry later, or without the header. |
