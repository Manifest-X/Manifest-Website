# Limits

Caps on projects, uploads, content, and retries.

---

## Limits

| **Limit**                                | **Value**                                          |
|------------------------------------------|----------------------------------------------------|
| Projects per API account                 | `max_projects`{copy} on `GET /me`{copy}. [Contact Manifest](/support) to raise it. |
| Custom domains per project               | 25                                                 |
| Content ingest request body              | 12 MB. Per-article and per-field limits are in [Content limits](/docs/api/projects/content#content-limits). |
| Zip upload                               | 80 MB zipped, 250 MB unzipped, 25 MB per file, 10,000 files |
| Upload URL lifetime                      | 15 minutes, one upload                             |
| `Idempotency-Key`{copy}                        | 1 to 200 characters, kept 24 hours                 |
| Deployments kept                         | The 5 most recent per environment, plus the live one |
