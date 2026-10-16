# Claude Plugin

Add Manifest to Claude once, and use it in every Claude app.

---

## What it does

The Manifest plugin connects Claude to your Manifest account and teaches it how to build, publish, and run projects. You install it once, and it works in chats on the web, desktop, and phone, in Cowork, and in the desktop app's **Code** tab.

It includes:

- **The Manifest connection**, so Claude can publish and manage your projects for you.
- **Skills**: know-how Claude uses on its own when you ask for something, like laying out a page or adding a form.
- **Commands**: shortcuts like `/manifest:publish`, for the Code tab.

---

## Install

The plugin works on every Claude plan, including Free.

1. In the Claude app or at <a href="https://claude.ai" target="_blank">claude.ai</a>, go to **Customize > Plugins**.
2. Add Manifest:
   - **On Claude Pro, Max, Team, or Enterprise:** open **Discover**, search for **Manifest**, and add it.
   - **On Claude's Free plan:** select **Add > Add marketplace**, enter `Manifest-X/claude-plugin`{copy}, then add **Manifest**.
3. In the plugin's **Connectors** tab, select **Connect** next to Manifest.

A Manifest page opens in your browser:

1. **Sign in** with Google, GitHub, or your email address. If you're new, this creates your free account.
2. **Check the request.** Manifest shows which app is connecting and what it will be able to do: publish and update your projects, manage domains, and invite people.
3. **Select Approve.** Or select **Cancel**, and nothing is shared.

That's it. The plugin appears in the Code tab the next time you start a session there. You never share a password or API key with Claude.

::: icon="lucide:building-2"
**On a Team or Enterprise plan**, an Owner can make the plugin available to everyone, or install it for everyone, from the organization's plugin settings. Each person still connects their own Manifest account.
:::

---

## Where to do what

The **Code** tab of the Claude desktop app is the best place to build: Claude works with files on your computer, previews your project, and handles projects of any size. Claude can also build and publish smaller projects right in a chat, and you can manage any project from a chat, including on your phone.

| | Code tab | Any Claude chat |
|---|---|---|
| Build and publish | ✓ | Smaller projects |
| Preview on your computer | ✓ | |
| Take staging live, roll back | ✓ | ✓ |
| Domains, team, and analytics | ✓ | ✓ |

The **Code** tab is the part of the Claude desktop app where Claude can work with files on your computer. You pick a folder, and Claude creates and changes files there, runs your project, and shows it in a preview next to the chat.

---

## Updates and removal

Plugin updates arrive on their own. To remove the plugin, go to **Customize > Plugins**. Your Manifest account and projects stay as they are.

If Manifest stops responding, your sign-in may have lapsed. Open the plugin's **Connectors** tab and connect again.

---

## Connect without the plugin

You can also add Manifest to Claude as a custom connector. It connects to the same Manifest account and gives Claude the same abilities. Instead of being built in, Manifest's skills and commands are added to each project's folder when Claude sets the project up.

1. Go to **Customize > Connectors**, select **+**, then **Add custom connector**.
2. Enter the details below, leave **Advanced settings** empty, and select **Add**, then **Connect**.

| Field | Value |
|---|---|
| Name | `Manifest`{copy} |
| Server URL | `https://mcp.manifestx.dev/mcp`{copy} |

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

::: icon="lucide:terminal"
**Using Claude Code in a terminal?** Type `/plugin directory` and install Manifest from there.
:::

::: icon="lucide:plug"
**Other AI apps.** Manifest's server uses the open MCP standard, so other AI apps that let you add a custom MCP server can usually connect with the same server URL. Setup differs by app, and Manifest's skills and commands are written for Claude, so other apps get Manifest's tools without them.
:::
