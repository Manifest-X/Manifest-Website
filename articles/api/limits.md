# Limits

Every cap the API enforces, and what it answers when you reach one.

---

## Requests

| Limit | Free allowance | Enterprise |
|---|---|---|
| Requests per minute | 60 | 600 |
| Writes per minute | 30 | 120 |
| API keys created with `POST /keys`{copy} | 20 a day | 20 a day |
| Editor invites per project | 50 a day (UTC) | 50 a day (UTC) |

- **Per account.** Request and write limits count all the account's keys together, so extra keys add no capacity. A burst up to the limit at once is fine.
- **Writes** are `POST`{copy}, `PATCH`{copy}, and `DELETE`{copy}. Reads and revoking a key don't count. Your cap is `rate_limit.writes_per_minute`{copy} on `GET /me`{copy}.
- **Free projects** can publish 30 times a day, counting publishes from Claude and file updates. Pro projects, and projects on an Enterprise account, have no daily publish limit.
- **Over a limit**, the answer is `429` with `Retry-After`{copy}: `rate_limited`{copy}, `mint_limit`{copy}, `invite_limit`{copy}, or `publish_limit_reached`{copy}.
- **Repeat invites** to an existing editor send at most one email every 10 minutes. Inside that window, the answer has `"email_skipped": "recently_sent"`{copy}.

---

## Account and Projects

| Limit | Free allowance | Enterprise |
|---|---|---|
| Projects created through the API | 2 | Set per account |
| Storage | 500 MB | 10 GB |
| Live API keys | 10 | 10 |
| Custom domains per project | 25 | 25 |
| Deployments kept per environment | 5 plus the live one | 5 plus the live one |

- **Projects.** Your cap is `max_projects`{copy} on `GET /me`{copy}. Over it, a create answers `403 project_cap_reached`{copy}.
- **Storage** is the total size of the live staging and production versions of the projects the account created. Your cap is `max_storage_bytes`{copy} on `GET /me`{copy}.
- **Over the storage cap**, a publish, content request, or file update answers `403 storage_cap_reached`{copy} and changes nothing. Promotes and rollbacks are never refused.
- **Deployments.** Production on a prerendered project keeps ten. Older deployments can't be [rolled back](/docs/api/guides/publish#roll-back) to.

To raise an Enterprise cap, <a href="/support?topic=enterprise#contact" target="_blank">talk to us</a>.

---

## Sizes and Files

These are the same on every plan.

| Limit | Value |
|---|---|
| Zip upload | 80 MB zipped, 250 MB unzipped |
| Files in a zip | 10,000, each up to 25 MB |
| Upload URL | One upload, within 15 minutes |
| Upload status reads | 120 a minute per IP address |
| File update request | 12 MB body, 1,000 changes, each file up to 8 MB |
| Project after a file update | 250 MB and 10,000 files |
| Content request body | 12 MB. See [Docs Template](/docs/api/guides/docs-template#limits) for per-page limits. |
| File list page | 1,000 files. Follow `next_cursor`{copy} for the rest. |
| `Idempotency-Key`{copy} | 1 to 200 characters, kept 24 hours |
| Webhook delivery | 10 seconds per attempt, retried for 24 hours |
