# Usage

What your API account used in a month, per project.

---

## Get a usage report

```bash copy
curl "https://api.manifestx.dev/v1/usage?period=2026-09" \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

| **Parameter** | **Type** | **Required** | **Notes**                                              |
|---------------|----------|--------------|--------------------------------------------------------|
| `period`{copy}      | string   | yes          | A calendar month in UTC, as `YYYY-MM`{copy}, such as `2026-09`. |

The report lists the projects your API account created that existed at any time during the month, with what happened to each:

```json
{
  "period": "2026-09",
  "starts_at": 1788220800,
  "ends_at": 1790812800,
  "complete": true,
  "projects": [
    {
      "id": "proj_…",
      "source_id": "site_8107",
      "name": "Acme Help",
      "created_at": 1785751200,
      "deleted_at": 1789893000,
      "active": true,
      "publishes": 0,
      "domains_attached": 0,
      "domains_removed": 0
    },
    {
      "id": "proj_…",
      "source_id": "site_8231",
      "name": "Acme Docs",
      "created_at": 1789210805,
      "deleted_at": null,
      "active": true,
      "publishes": 3,
      "domains_attached": 1,
      "domains_removed": 0
    }
  ],
  "totals": { "active_projects": 2, "publishes": 3, "domains_attached": 1, "domains_removed": 0 },
  "request_id": "…"
}
```

| **Field**                | **Meaning**                                                                                              |
|--------------------------|----------------------------------------------------------------------------------------------------------|
| `starts_at`{copy}, `ends_at`{copy} | The month's bounds in Unix seconds: the first second of the month, and the first second of the next.      |
| `complete`{copy}               | `false`{copy} while the month is still running; its numbers can still grow.                                   |
| `active`{copy}                 | The project counts as active for the month: created before the month ended, and not deleted before it began. Every listed project is active. |
| `publishes`{copy}              | Deployments that went live in the month, on staging or production. Promotes, rollbacks and file reads don't count. |
| `domains_attached`{copy}       | Custom domains newly attached in the month. Updating an attached domain doesn't count again.             |
| `domains_removed`{copy}        | Custom domains removed in the month.                                                                     |

`totals.active_projects`{copy} is the number of listed projects; the other totals add up the rows. A project created after the month, or deleted before it began, isn't listed. The report only covers projects your account created, not projects you were invited to.

---

## CSV

Send `Accept: text/csv` for the same report as a spreadsheet file:

```bash copy
curl "https://api.manifestx.dev/v1/usage?period=2026-09" \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Accept: text/csv" \
  -o manifest-usage-2026-09.csv
```

```text
period,project_id,source_id,name,created_at,deleted_at,active,publishes,domains_attached,domains_removed
2026-09,proj_…,site_8107,Acme Help,2026-08-03T10:00:00.000Z,2026-09-20T08:30:00.000Z,1,0,0,0
2026-09,proj_…,site_8231,Acme Docs,2026-09-12T11:00:05.000Z,,1,3,1,0
2026-09,,,Total,,,2,3,1,0
```

One row per project, then a `Total` row. Times are ISO 8601 in UTC, and `active` is `1`. A name that starts with `=`, `+`, `-` or `@` is written with a leading `'` so spreadsheet apps show it as text.

---

## Errors

| **Status** | **`error`**     | **Meaning**                                          |
|------------|-----------------|------------------------------------------------------|
| 400        | `invalid_input`{copy} | `period`{copy} is missing or isn't a month as `YYYY-MM`{copy}. |
