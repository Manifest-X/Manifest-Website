# Limits

Caps on requests, projects, uploads, content, file reads and updates, and retries.

---

## Limits

| **Limit**                                | **Value**                                          |
|------------------------------------------|----------------------------------------------------|
| Requests per API key                     | 60 a minute on the free allowance, 600 on a platform account. A burst of that many at once is fine. Over it: `429 rate_limited` with `Retry-After`{copy}. |
| Projects created through the API         | 2 on the free allowance. A platform account's cap is `max_projects`{copy} on `GET /me`{copy}; ask [team@manifestx.dev](mailto:team@manifestx.dev) to raise it. |
| API keys per account                     | 10                                                 |
| Publishes per Free project               | 30 a day, counting publishes from Claude and file updates too. Over it: `429 publish_limit_reached` with `Retry-After`{copy}. |
| Custom domains per project               | 25                                                 |
| Content ingest request body              | 12 MB. Per-article and per-field limits are in [Content limits](/docs/api/projects/content#content-limits). |
| Zip upload                               | 80 MB zipped, 250 MB unzipped, 25 MB per file, 10,000 files |
| File list                                | 1,000 files per page; follow `next_cursor`{copy} for the rest |
| File update request                      | 12 MB body, 8 MB per file, 1,000 changes. The updated site stays within the zip limits. |
| Upload URL lifetime                      | 15 minutes, one upload                             |
| `Idempotency-Key`{copy}                        | 1 to 200 characters, kept 24 hours                 |
| Deployments kept                         | The 5 most recent per environment, plus the live one |
