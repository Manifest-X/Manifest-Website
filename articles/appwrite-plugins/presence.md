# Presence

Real-time tracking of which users are currently active.

---

## Setup

The presence plugin is included with `manifest.js` when the full Appwrite bundle is loaded, or can be selectively loaded.

<div x-code-group copy>

```html "All Plugins (default)"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Selective"
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="appwrite-auth,appwrite-presence"></script>
```

</div>

Presence requires [Appwrite Setup](/docs/appwrite-plugins/appwrite-setup) and [Auth](/docs/appwrite-plugins/auth) to be configured first.

---

## Configuration

Register the presence source in your project's `manifest.json`. The plugin tracks active users in a dedicated Appwrite table.

```json copy
{
  "data": {
    "presence": {
      "appwriteTableId": "presence",
      "appwriteDatabaseId": "your-database-id"
    }
  }
}
```

| Key | Purpose |
|-----|---------|
| `appwriteTableId`{copy} | Name of the Appwrite table that stores presence records |
| `appwriteDatabaseId`{copy} | ID of the Appwrite database containing that table |

---

## Status

Detailed API documentation for the presence plugin is in progress. In the meantime, see the configuration above for project setup, and refer to [Auth](/docs/appwrite-plugins/auth) and [Cloud Data](/docs/appwrite-plugins/cloud-data) for the surrounding patterns the presence plugin builds on.
