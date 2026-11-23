# Usage

See what your API account used in a month, per project.

---

## Get a Usage Report

Use it for your own reporting or billing, or to check what Manifest counts.

<div x-code-group copy>

```bash "cURL"
curl "https://api.manifestx.dev/v1/usage?period=2026-09" \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

```js "JavaScript"
const res = await fetch('https://api.manifestx.dev/v1/usage?period=2026-09', {
  headers: { Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}` },
})
```

</div>

| Field | Type | Required | Notes |
|---|---|---|---|
| `period`{copy} | string | yes | A calendar month in UTC, as `YYYY-MM`{copy}, such as `2026-09`. |

```json
{
  "period": "2026-09",
  "starts_at": 1788220800,
  "ends_at": 1790812800,
  "complete": true,
  "projects": [
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
  "totals": { "active_projects": 1, "publishes": 3, "domains_attached": 1, "domains_removed": 0 },
  "request_id": "…"
}
```

The report lists every project your API account created that existed at any time in the month. Projects you were only invited to aren't included.

---

## Fields

| Field | Meaning |
|---|---|
| `starts_at`{copy}, `ends_at`{copy} | The month's bounds in Unix seconds: its first second, and the first second of the next month. |
| `complete`{copy} | `false`{copy} while the month is still running, so its numbers can still grow. |
| `active`{copy} | Created before the month ended, and not deleted before it began. Every listed project is active, including one deleted during the month. |
| `publishes`{copy} | Deployments that went live in the month, on staging or production. Each zip, [file update](/docs/api/guides/edit#update-files), and [content](/docs/api/guides/docs-template) request counts once. Promotes and rollbacks don't. |
| `domains_attached`{copy} | Custom domains newly added in the month. Updating one doesn't count again. |
| `domains_removed`{copy} | Custom domains removed in the month. Domains released by deleting their project aren't counted. |
| `totals`{copy} | `active_projects`{copy} is the number of listed projects. The other totals add up the rows. |

A `period`{copy} that is missing or isn't `YYYY-MM`{copy} answers `400 invalid_input`{copy}.

---

## CSV

Send `Accept: text/csv` for the same report as a spreadsheet file.

<div x-code-group copy>

```bash "cURL"
curl "https://api.manifestx.dev/v1/usage?period=2026-09" \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Accept: text/csv" \
  -o manifest-usage-2026-09.csv
```

```js "JavaScript"
const res = await fetch('https://api.manifestx.dev/v1/usage?period=2026-09', {
  headers: {
    Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}`,
    Accept: 'text/csv',
  },
})
const csv = await res.text()
```

</div>

```text
period,project_id,source_id,name,created_at,deleted_at,active,publishes,domains_attached,domains_removed
2026-09,proj_…,site_8231,Acme Docs,2026-09-12T11:00:05.000Z,,1,3,1,0
2026-09,,,Total,,,1,3,1,0
```

There's one row per project, then a `Total` row. Times are ISO 8601 in UTC, and `active` is `1`.

A text cell starting with `=`, `+`, `-`, `@`, a tab, or a carriage return gets a leading `'`. That way spreadsheet apps show it as text instead of running it as a formula. The JSON report always has the values unchanged.
