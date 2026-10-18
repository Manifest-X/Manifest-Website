# Endpoints

Every endpoint on one page.

---

## Endpoints

Base URL `https://api.manifestx.dev/v1`{copy}, authenticated with your [API key](/docs/api/setup/authentication).

| **Endpoint** | **Purpose** | **Reference** |
|---|---|---|
| `GET /me`{copy} | The API account the key belongs to | [Authentication](/docs/api/setup/authentication#api-keys) |
| `POST /projects`{copy} | Create a project, idempotent on `source_id`{copy} | [Create a project](/docs/api/projects/manage#create-a-project) |
| `GET /projects`{copy} | List the account's projects | [List projects](/docs/api/projects/manage#list-projects) |
| `GET /projects/:id`{copy} | One project, with its URLs and publish state | [Get a project](/docs/api/projects/manage#get-a-project) |
| `POST /projects/:id/content`{copy} | Build a docs site from Markdown pages | [Content](/docs/api/projects/content) |
| `POST /projects/:id/publish`{copy} | Start a publish: a one-time upload URL for a zip | [Start a publish](/docs/api/projects/publish#start-a-publish) |
| `PATCH /projects/:id/files`{copy} | Update individual files on staging as a new deployment | [Update individual files](/docs/api/projects/publish#update-individual-files) |
| `POST /projects/:id/promote`{copy} | Ship what is live on staging to production | [Promote](/docs/api/projects/publish#promote-staging-to-production) |
| `POST /projects/:id/rollback`{copy} | Point an environment back at an earlier deployment | [Roll back](/docs/api/projects/publish#roll-back) |
| `GET /projects/:id/deployments`{copy} | Recent deployments per environment | [List deployments](/docs/api/projects/publish#list-deployments) |
| `POST /projects/:id/domains`{copy} | Attach a custom domain; returns the DNS records | [Attach a domain](/docs/api/projects/domains#attach-a-domain) |
| `GET /projects/:id/domains/:hostname`{copy} | Domain and certificate status | [Check status](/docs/api/projects/domains#check-status) |
| `DELETE /projects/:id/domains/:hostname`{copy} | Detach a custom domain | [Remove a domain](/docs/api/projects/domains#remove-a-domain) |
