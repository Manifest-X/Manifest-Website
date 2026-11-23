# Domains

Serve a project on a domain of its own.

---

## How It Works

A project can answer on its own domain as well as its `manifestx.ai` address. Manifest doesn't register or sell domains.

1. [Add the domain](#add-a-domain). The answer lists the DNS record to create.
2. The domain's owner adds that record where the domain's DNS is managed, usually the registrar.
3. Manifest issues the HTTPS certificate. [Check the status](#check-the-status) until it reads `active`{copy}.

---

## Add a Domain

Attach a hostname to a project and get the DNS records to add.

<div x-code-group copy>

```bash "cURL"
curl -X POST https://api.manifestx.dev/v1/projects/proj_…/domains \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Idempotency-Key: domain-site_8231-docs" \
  -H "Content-Type: application/json" \
  -d '{ "hostname": "docs.acme.com" }'
```

```js "JavaScript"
const res = await fetch('https://api.manifestx.dev/v1/projects/proj_…/domains', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}`,
    'Idempotency-Key': 'domain-site_8231-docs',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ hostname: 'docs.acme.com' }),
})
```

</div>

| Field | Type | Required | Notes |
|---|---|---|---|
| `hostname`{copy} | string | yes | Such as `docs.acme.com`. No scheme or path. |
| `env`{copy} | string | no | The environment it serves: `production`{copy} (default) or `staging`{copy}. |
| `validation`{copy} | string | no | `http`{copy} (default) or `txt`{copy}. See [Moving a Live Domain](#moving-a-live-domain). |

A new domain answers `201 Created`:

```json
{
  "domain": {
    "hostname": "docs.acme.com",
    "requested": "docs.acme.com",
    "env": "production",
    "validation": "http",
    "status": "pending",
    "certificate_status": "pending_validation"
  },
  "records": [
    { "purpose": "Point the domain to the site", "type": "CNAME", "name": "docs", "value": "cname.manifestx.ai" }
  ],
  "root_redirect": null,
  "request_id": "…"
}
```

Each item in `records`{copy} is one DNS record to create. Put `type`{copy} in the record type, `name`{copy} in the Name or Host field, and `value`{copy} in the value or target. These are the same records the Manifest connector gives.

Sending the same hostname again updates it in place, for example to switch `validation`{copy}, and answers `200`. A project can have up to 25 custom domains, and a hostname can belong to only one project.

### Root Domains

A root domain such as `acme.com` is served at `www.acme.com`, shown in `domain.hostname`{copy}. Most DNS providers can't point a root domain with a CNAME. `root_redirect`{copy} then describes the forwarding to set up at the registrar, so `acme.com` goes to `https://www.acme.com`.

### Moving a Live Domain

For a domain already in use elsewhere, send `"validation": "txt"`{copy}. `records`{copy} then starts with a TXT record.

1. Add only the TXT record. The certificate is issued while the old site keeps serving.
2. Once the status shows the certificate `active`{copy}, add the CNAME. Traffic moves with HTTPS on both sides.

---

## Check the Status

See whether the domain is live, and which records are still needed.

<div x-code-group copy>

```bash "cURL"
curl https://api.manifestx.dev/v1/projects/proj_…/domains/docs.acme.com \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

```js "JavaScript"
const res = await fetch('https://api.manifestx.dev/v1/projects/proj_…/domains/docs.acme.com', {
  headers: { Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}` },
})
```

</div>

```json
{
  "domain": {
    "hostname": "docs.acme.com",
    "env": "production",
    "status": "pending",
    "hostname_status": "pending",
    "certificate_status": "pending_validation",
    "certificate_validation": { "method": "http", "expected_records": [], "errors": [] }
  },
  "records": [
    { "purpose": "Point the domain to the site", "type": "CNAME", "name": "docs", "value": "cname.manifestx.ai" }
  ],
  "request_id": "…"
}
```

| `status` | Meaning |
|---|---|
| `pending`{copy} | Waiting for the DNS record or the certificate. Usually a few minutes after the record is added. |
| `active`{copy} | Verified, with its certificate, and serving the project. |
| `error`{copy} | Validation failed or timed out, or the domain was removed at the provider. Check the records and add the domain again. |

Poll about once a minute while `status`{copy} is `pending`{copy}. `records`{copy} repeats what to add, so you can show it again. With `txt`{copy} validation, the TXT record is listed until the certificate is issued.

`hostname_status`{copy} and `certificate_status`{copy} are the underlying states. `certificate_validation`{copy} lists what's still expected until the certificate is active.

::: brand icon="lucide:info"
Once `active`{copy}, a later `error`{copy}, such as a failed renewal, doesn't take the project off the domain. Fix the records and add it again. The exception is `hostname_status`{copy} `deleted`{copy}: that domain stops serving until it's added again and validates.
:::

---

## Remove a Domain

Detach a domain from the project.

<div x-code-group copy>

```bash "cURL"
curl -X DELETE https://api.manifestx.dev/v1/projects/proj_…/domains/docs.acme.com \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

```js "JavaScript"
const res = await fetch('https://api.manifestx.dev/v1/projects/proj_…/domains/docs.acme.com', {
  method: 'DELETE',
  headers: { Authorization: `Bearer ${process.env.MANIFEST_ACCOUNT_KEY}` },
})
```

</div>

```json
{ "removed": "docs.acme.com", "request_id": "…" }
```

The project stops answering on that domain at once, and the domain is free to add elsewhere. The CNAME can then be deleted at the DNS provider.

---

## Errors

Domain errors, such as `hostname_taken`{copy} and `domain_cap_reached`{copy}, are in [Errors](/docs/api/reference/errors), with what to do.
