# Domains

Serve a site on a domain of its own.

---

## Attach a domain

A site can answer on its own domain as well as its `manifestx.ai` address. You attach the domain, the domain's owner adds a DNS record at their DNS provider, and the HTTPS certificate is issued automatically. Manifest doesn't register or sell domains.

```bash copy
curl -X POST https://api.manifestx.dev/v1/projects/proj_…/domains \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY" \
  -H "Idempotency-Key: domain-site_8231-docs" \
  -H "Content-Type: application/json" \
  -d '{ "hostname": "docs.acme.com", "env": "production", "validation": "http" }'
```

| **Field**    | **Type** | **Required** | **Notes**                                                                                                                         |
|--------------|----------|--------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `hostname`{copy}   | string   | yes          | The hostname, such as `docs.acme.com`. No scheme or path.                                                                 |
| `env`{copy}        | string   | no           | `production`{copy} (default) or `staging`{copy}: the environment the domain serves.                                                          |
| `validation`{copy} | string   | no           | `http`{copy} (default) issues the certificate once the routing record is in place. `txt`{copy} issues it first, for a domain that is live elsewhere. |

A new domain answers `201 Created` with the DNS records to add:

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

`name`{copy} is the label to type into the DNS provider's Name/Host field, which adds the domain itself. These are the same records the Manifest connector gives for the same domain.

- **Root domains.** A root such as `acme.com` is served at `www.acme.com` (`domain.hostname`{copy}), because most DNS providers can't put a CNAME on a root. `root_redirect`{copy} then describes the forwarding to set up at the registrar so `acme.com` goes to `https://www.acme.com`.
- **Moving a live domain.** With `"validation": "txt"`{copy}, `records`{copy} starts with a TXT record. Add only that one first: the certificate is issued while the old site keeps serving. Add the CNAME once the status shows the certificate `active`{copy}, and traffic moves with HTTPS on both sides.

Sending the same hostname again updates it in place (for example, to switch `validation`{copy}) and answers `200`. A hostname already attached to another project is refused.

---

## Check status

```bash copy
curl https://api.manifestx.dev/v1/projects/proj_…/domains/docs.acme.com \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

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
  "request_id": "…"
}
```

`status`{copy} is one of:

| **`status`** | **Meaning**                                                                                                   |
|--------------|---------------------------------------------------------------------------------------------------------------|
| `pending`{copy}    | Waiting for the DNS record or the certificate. Usually a few minutes after the record is added.               |
| `active`{copy}     | The domain is verified, has its certificate, and serves the site.                                             |
| `error`{copy}      | Validation failed or timed out, or the domain was removed at the provider. Check the records and attach again. |

`hostname_status`{copy} and `certificate_status`{copy} are the underlying states; `certificate_validation`{copy} appears until the certificate is active and lists what is still expected. Poll every minute or so while `status`{copy} is `pending`{copy}. The domain serves the site from the first check that reads `active`{copy}. After that, a later `error`{copy} (for example a certificate renewal that timed out, or the CNAME removed) is reported but doesn't take the site off the domain; fix the records and attach again. The exception is a domain whose `hostname_status`{copy} reads `deleted`{copy}: it has no certificate or routing left, so it stops serving. Attaching it again issues a new certificate, and the domain reads `pending`{copy} until it validates.

---

## Remove a domain

```bash copy
curl -X DELETE https://api.manifestx.dev/v1/projects/proj_…/domains/docs.acme.com \
  -H "Authorization: Bearer $MANIFEST_ACCOUNT_KEY"
```

Answers `{ "removed": "docs.acme.com", "request_id": "…" }`. The site stops answering on that domain at once and the domain is free to attach elsewhere. The CNAME can then be deleted at the DNS provider.

---

## Errors

| **Status** | **`error`**                   | **Meaning**                                                                       |
|------------|-------------------------------|-----------------------------------------------------------------------------------|
| 400        | `invalid_input`{copy}               | Missing or malformed field, or an unknown field.                                  |
| 400        | `invalid_hostname`{copy}            | `hostname`{copy} isn't a hostname, for example it has spaces, no dot, or is an IP address.     |
| 403        | `domain_cap_reached`{copy}          | The project has 25 custom domains. Remove one first.                              |
| 404        | `not_found`{copy}                   | No such project in your API account, or no such domain on the project.        |
| 409        | `hostname_taken`{copy}              | The hostname is attached to another project.                                      |
| 422        | `hostname_reserved`{copy}           | The hostname is on a Manifest domain (`manifestx.ai`, `manifestx.dev`).           |
| 502        | `domain_attach_failed`{copy}        | The domain couldn't be attached. Check the hostname and retry.                    |
| 503        | `domain_status_unavailable`{copy}   | The status couldn't be read just now. Retry shortly.                              |
| 503        | `domains_unavailable`{copy}         | Custom domains are temporarily unavailable. Retry later.                          |

