# Connector

Add Manifest to any Claude app and sign in once.

---

## Overview

The Manifest connector lets Claude publish and run your projects for you. Ask in plain words and Claude handles the rest:

- **Publish** any project that builds to static files, whether it's made with Manifest, React, Vite, Astro, Hugo, or plain HTML.
- **Preview on staging**, then move the exact version you checked live.
- **Connect your own domain.** The secure certificate is set up and renewed for you.
- **Invite people** to work on your project from their own Claude.
- **See visitor numbers** for your project.

You never need an API key. Signing in to the connector is all Claude needs to work on your behalf.

Using Claude Code? The [plugin](/docs/ai/setup/plugin) includes this connector, plus skills and commands for building.

---

## Add Manifest to Claude

Use these details wherever Claude asks for them:

| Field | Value |
|---|---|
| Name | `Manifest`{copy} |
| Server URL | `https://mcp.manifestx.dev/mcp`{copy} |
| OAuth Client ID and Secret | Leave blank |

### Claude on the web, desktop, or phone

1. Go to **Customize > Connectors**.
2. Select **+**, then **Add custom connector**.
3. Enter the name and server URL above. Leave **Advanced settings** empty.
4. Select **Add**, then **Connect** to sign in.

::: frame py-10
<div class="w-full max-w-sm mx-auto border border-line rounded-2xl bg-surface-1 p-6 flex flex-col gap-4 pointer-events-none select-none shadow-lg" aria-hidden="true">
  <strong>Add custom connector</strong>
  <label class="flex flex-col gap-1.5 text-sm">
    Name
    <input value="Manifest" readonly tabindex="-1" />
  </label>
  <label class="flex flex-col gap-1.5 text-sm">
    Server URL
    <input value="https://mcp.manifestx.dev/mcp" readonly tabindex="-1" />
  </label>
  <p class="text-xs text-content-2">Advanced settings — leave empty</p>
  <div class="flex justify-end gap-2 pt-1">
    <button class="ghost small" tabindex="-1">Cancel</button>
    <button class="brand small" tabindex="-1">Add</button>
  </div>
</div>
:::

On Claude's Free plan, you can add one custom connector.

On a Team or Enterprise plan, only an Owner can add a custom connector. The Owner adds it in **Organization settings > Connectors**. Everyone else then finds Manifest under **Customize > Connectors** and selects **Connect**.

To use Manifest in a chat, turn it on from the **+** menu under **Connectors**.

### Claude Code

Run this once in your terminal:

```bash copy
claude mcp add --transport http --scope user manifest https://mcp.manifestx.dev/mcp
```

Then start Claude Code, type `/mcp`, and choose Manifest to sign in.

Projects that Claude sets up with Manifest include a `.mcp.json` file that connects them automatically. Open Claude Code in that project folder and approve Manifest when it asks. If Claude just created the file, reopen Claude Code in the folder so it loads.

---

## Sign in

The first time you connect, Claude opens a Manifest sign-in page in your browser.

1. **Sign in** with Google, GitHub, or your email address. With email, Manifest sends you a one-time code to type in. If you're new, this creates your Manifest account.
2. **Review the request.** Manifest shows which app is asking to connect and the address it will return you to, along with what it will be able to do: publish and update your sites, manage your projects and domains, and invite teammates to your projects.
3. **Select Approve** to finish connecting, or **Cancel** to stop. Nothing is shared if you cancel.

When you connect from Claude on the web, desktop, or phone, the return address is `claude.ai` or `claude.com`. When you connect from Claude Code, it's an address on your own computer (`localhost`). Manifest can't confirm who is asking in that case, so it shows a warning. Approve only if you just started connecting yourself.

::: brand icon="lucide:clock"
A sign-in request is valid for 10 minutes. If it expires, go back to Claude and connect again.
:::

---

## Start using it

Once you're connected, ask Claude in plain words. To learn what to ask, see:

- [Manage](/docs/ai/projects/manage) your projects and team
- [Edit](/docs/ai/projects/edit) a project
- [Publish](/docs/ai/projects/publish) a project and take it live

---

## Disconnect

To stop Claude from using Manifest, remove the connector from **Customize > Connectors**, or run `claude mcp remove manifest` in Claude Code. Your Manifest account and projects stay as they are. Connect again any time to pick up where you left off.

---

## If something stops working

If Manifest tools keep failing, your sign-in may have lapsed. Reconnect Manifest from your connector settings (or `/mcp` in Claude Code) and try again.

For anything else, email <a href="mailto:team@manifestx.dev">team@manifestx.dev</a>.
