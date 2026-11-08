# Endpoints

Every endpoint on one page, each linked to its guide.

---

## All Endpoints

Paths are relative to `https://api.manifestx.dev/v1`{copy}, and need your [API key](/docs/api/reference/authentication#send-the-key). The upload and status URLs are the exception: their token is the authority.

Every `POST`{copy}, `PATCH`{copy}, and `DELETE`{copy} accepts an [`Idempotency-Key`{copy}](/docs/api/reference/errors#idempotency), except `POST /keys`{copy}. **Pro** marks endpoints that need a Pro project.

| Method | Path | What it does |
|---|---|---|
| **Account & keys** | | |
| `GET`{copy} | `/me`{copy} | [The API account the key belongs to](/docs/api/reference/authentication#send-the-key) |
| `POST`{copy} | `/keys`{copy} | [Create another key, shown once](/docs/api/reference/authentication#create-a-key-with-the-api) |
| `GET`{copy} | `/keys`{copy} | [List live keys, with when each was last used](/docs/api/reference/authentication#list-keys) |
| `DELETE`{copy} | `/keys/:prefix`{copy} | [Revoke a key, never the last one](/docs/api/reference/authentication#revoke-a-key-with-the-api) |
| **Projects** | | |
| `POST`{copy} | `/projects`{copy} | [Create a project, safe to repeat on `source_id`{copy}](/docs/api/guides/projects#create-a-project) |
| `GET`{copy} | `/projects`{copy} | [List projects, or find one with `?source_id=`{copy}](/docs/api/guides/projects#list-projects) |
| `GET`{copy} | `/projects/:id`{copy} | [One project, with its URLs and publish state](/docs/api/guides/projects#get-a-project) |
| `PATCH`{copy} | `/projects/:id`{copy} | [Rename a project](/docs/api/guides/projects#rename-a-project) |
| `DELETE`{copy} | `/projects/:id`{copy} | [Delete a project, restorable for 30 days](/docs/api/guides/projects#delete-a-project) |
| **Editors** | | |
| `POST`{copy} | `/projects/:id/invites`{copy} | [Invite an editor by email](/docs/api/guides/projects#invite-an-editor). **Pro** |
| `GET`{copy} | `/projects/:id/members`{copy} | [List who has access](/docs/api/guides/projects#list-editors) |
| `DELETE`{copy} | `/projects/:id/members/:user_id`{copy} | [Remove an editor](/docs/api/guides/projects#remove-an-editor) |
| **Content** | | |
| `POST`{copy} | `/projects/:id/content`{copy} | [Build a docs site from Markdown pages](/docs/api/guides/docs-template#send-pages) |
| **Publish & files** | | |
| `POST`{copy} | `/projects/:id/publish`{copy} | [Start a publish and get a one-time upload URL](/docs/api/guides/publish#start-a-publish) |
| `POST`{copy} | `/uploads/:token`{copy} | [Upload the zip to `upload_url`{copy}](/docs/api/guides/publish#upload-the-zip) |
| `GET`{copy} | `/uploads/:token/status`{copy} | [Check an upload at `status_url`{copy}](/docs/api/guides/publish#check-the-status) |
| `GET`{copy} | `/projects/:id/files`{copy} | [List the files of the live deployment](/docs/api/guides/edit#read-files) |
| `GET`{copy} | `/projects/:id/files/:path`{copy} | [Read one file](/docs/api/guides/edit#read-one-file) |
| `PATCH`{copy} | `/projects/:id/files`{copy} | [Update individual files on staging](/docs/api/guides/edit#update-files) |
| **Deployments** | | |
| `POST`{copy} | `/projects/:id/promote`{copy} | [Ship what's live on staging to production](/docs/api/guides/publish#promote-to-production) |
| `POST`{copy} | `/projects/:id/rollback`{copy} | [Go back to an earlier deployment](/docs/api/guides/publish#roll-back). **Pro** |
| `GET`{copy} | `/projects/:id/deployments`{copy} | [List an environment's recent deployments](/docs/api/guides/publish#list-deployments) |
| **Domains** | | |
| `POST`{copy} | `/projects/:id/domains`{copy} | [Add a custom domain and get its DNS records](/docs/api/guides/domains#add-a-domain) |
| `GET`{copy} | `/projects/:id/domains/:hostname`{copy} | [Check a domain and its certificate](/docs/api/guides/domains#check-the-status) |
| `DELETE`{copy} | `/projects/:id/domains/:hostname`{copy} | [Remove a custom domain](/docs/api/guides/domains#remove-a-domain) |
| **Usage** | | |
| `GET`{copy} | `/usage?period=YYYY-MM`{copy} | [Per-project usage for a month, as JSON or CSV](/docs/api/guides/usage) |
| **Webhooks** | | |
| | | [Endpoints are set up by emailing Manifest](/docs/api/guides/webhooks#set-up-an-endpoint), not through the API. |
