# Claude Connector

Build, publish, and run websites and apps from Claude with the Manifest connector.

---

## Overview

The Manifest connector adds publishing and hosting to Claude. Ask Claude to put a site online and it happens in the conversation: your project goes live on managed hosting with a staging preview, one-step promotion to production, custom domains with automatic certificates, team access without shared keys, and visitor analytics.

It works with any project that builds to static files — React, Vite, Astro, Hugo, plain HTML — and with the open-source [Manifest framework](/docs/getting-started/introduction). Manifest hosts static sites and single-page apps; it doesn't run server code, so a backend you already have stays where it is and your site calls it.

---

## Add the connector

**On claude.ai or the Claude desktop app:**

1. Open **Settings → Connectors → Add custom connector**.
2. Name it `Manifest` and enter the URL `https://mcp.manifestx.dev/mcp`.
3. Leave the advanced OAuth fields blank and save.

**In Claude Code**, add it from the terminal:

```
claude mcp add --transport http manifest https://mcp.manifestx.dev/mcp
```

Projects created with Manifest already carry a `.mcp.json` — opening the project folder in Claude Code connects automatically.

---

## Sign in

The first time Claude uses the connector, your browser opens the Manifest dashboard to sign in — with Google, GitHub, or a one-time code sent to your email. A free account is created on your first sign-in; there is no separate registration step.

After signing in you'll see what's connecting and where the authorization is sent. Review it and choose **Approve**. No API keys are involved — the connection is authorized per device, and you can revoke it at any time.

---

## What you can ask for

- "Make me a one-page website for a neighborhood bakery and put it online."
- "This is a Vite app. Build it and publish it to a staging link so I can check it, then take it live."
- "Connect www.example-bakery.com to my site."
- "The last update broke the menu page. Put the previous version back."
- "Invite sam@example.com so they can edit the site from their own Claude."
- "How many people visited my site this week, and where did they come from?"

Publishing goes to a staging address first when you want to review, and promotion ships exactly what you reviewed. Rollback restores any earlier version. Teammates you invite sign in with their own email and see the project from their own Claude — no keys to share.

---

## Plans

The free plan covers publishing, staging, custom domains, and 7-day analytics. Teams, rollback, and export are part of paid plans — Claude will tell you when a request needs one, and upgrading happens in your browser, never in the chat.

---

## Managing the connection

Your projects, deployments, domains, team, and billing are also visible in the [Manifest dashboard](https://dash.manifestx.dev). To disconnect, remove the connector in Claude's settings — the authorization is revoked with it. Reconnecting signs you back into the same account.

For how your data is handled, see the [Privacy Policy](/legal/privacy) and [Terms of Service](/legal/terms). Questions or trouble connecting: [team@manifestx.dev](mailto:team@manifestx.dev).
