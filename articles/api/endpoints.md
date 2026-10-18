# Endpoints

Every endpoint on one page.

---

## Endpoints

Base URL `https://api.manifestx.dev/v1`, authenticated with your [API key](/docs/api/setup/authentication).

| **Endpoint** | **Purpose** | **Reference** |
|---|---|---|
| `GET /me` | The API account the key belongs to | [Authentication](/docs/api/setup/authentication#api-keys) |
| `POST /projects` | Create a project, idempotent on `source_id` | [Create a project](/docs/api/projects/manage#create-a-project) |
| `GET /projects` | List the account's projects | [List projects](/docs/api/projects/manage#list-projects) |
| `GET /projects/:id` | One project, with its URLs and publish state | [Get a project](/docs/api/projects/manage#get-a-project) |
| `POST /projects/:id/content` | Build a docs site from articles | [Content](/docs/api/projects/content) |
| `POST /projects/:id/publish` | Start a publish: a one-time upload URL for a zip | [Start a publish](/docs/api/projects/publish#start-a-publish) |
| `POST /projects/:id/promote` | Ship what is live on staging to production | [Promote](/docs/api/projects/publish#promote-staging-to-production) |
| `POST /projects/:id/rollback` | Point an environment back at an earlier deployment | [Roll back](/docs/api/projects/publish#roll-back) |
| `GET /projects/:id/deployments` | Recent deployments per environment | [List deployments](/docs/api/projects/publish#list-deployments) |
| `POST /projects/:id/domains` | Attach a custom domain; returns the DNS records | [Attach a domain](/docs/api/projects/domains#attach-a-domain) |
| `GET /projects/:id/domains/:hostname` | Domain and certificate status | [Check status](/docs/api/projects/domains#check-status) |
| `DELETE /projects/:id/domains/:hostname` | Detach a custom domain | [Remove a domain](/docs/api/projects/domains#remove-a-domain) |
