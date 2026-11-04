# Limits

Caps on requests, writes, storage, projects, uploads, content, file reads and updates, and retries.

---

## All Limits

| **Limit**                                | **Value**                                          |
|------------------------------------------|----------------------------------------------------|
| Requests per API account                 | 60 a minute on the free allowance, 600 on a platform account, across all the account's keys together. A burst of that many at once is fine. Over it: `429 rate_limited` with `Retry-After`{copy}. |
| Write requests per account               | 30 a minute on the free allowance, 120 on a platform account, across all the account's keys. Writes are `POST`{copy}, `PATCH`{copy} and `DELETE`{copy}; reads and revoking a key (`DELETE /keys/:prefix`{copy}) don't count. Over it: `429 rate_limited`{copy} with `Retry-After`{copy}, the seconds until the next minute. Your cap is `rate_limit.writes_per_minute`{copy} on `GET /me`{copy}. |
| Storage per account                      | 500 MB on the free allowance, 10 GB on a platform account: the total size of the live staging and production sites of the projects the account created. A publish, content ingest or file update that would go over it answers `403 storage_cap_reached`{copy} and changes nothing. Promotes and rollbacks are not refused. Your cap is `max_storage_bytes`{copy} on `GET /me`{copy}. |
| Projects created through the API         | 2 on the free allowance. A platform account's cap is `max_projects`{copy} on `GET /me`{copy}; ask [team@manifestx.dev](mailto:team@manifestx.dev) to raise it. |
| API keys per account                     | 10 live                                            |
| Keys created with `POST /keys`{copy}            | 20 a day per account, counting every key created in the last 24 hours. Over it: `429 mint_limit` with `Retry-After`{copy}. |
| Publishes per Free project               | 30 a day, counting publishes from Claude and file updates too. Over it: `429 publish_limit_reached` with `Retry-After`{copy}. |
| Custom domains per project               | 25                                                 |
| Editor invites per project               | 50 a day (UTC), on every plan. Over it: `429 invite_limit` with `Retry-After`{copy}. |
| Invite emails to an existing editor      | One every 10 minutes. A re-invite inside that window answers `"email_skipped": "recently_sent"`{copy} and sends nothing. |
| Content ingest request body              | 12 MB. Per-article and per-field limits are in [Content limits](/docs/api/projects/content#content-limits). |
| Zip upload                               | 80 MB zipped, 250 MB unzipped, 25 MB per file, 10,000 files |
| File list                                | 1,000 files per page; follow `next_cursor`{copy} for the rest |
| File update request                      | 12 MB body, 8 MB per file, 1,000 changes. The updated site stays within the zip limits. |
| Upload URL lifetime                      | 15 minutes, one upload                             |
| `Idempotency-Key`{copy}                        | 1 to 200 characters, kept 24 hours                 |
| Webhook delivery                         | 10-second timeout per attempt; retried for 24 hours |
| Deployments kept                         | The 5 most recent per environment, plus the live one |
