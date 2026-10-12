# Edit

Change your project by asking your AI.

---

## Where to edit

Editing changes your project's files, so you do it in Claude Code, opened in your project's folder. If you're new to it, see [what Claude Code is](/docs/ai/setup/claude#what-is-claude-code).

For the best results, install the [Manifest plugin](/docs/ai/setup/plugin). Its skills teach Claude how Manifest projects are put together.

---

## Just ask

Describe the change you want in plain words. For example:

> `Make the headline bigger and center it`{copy}
> `Change the main color to dark green`{copy}
> `Add a contact form at the bottom of the page`{copy}
> `Add a high-score table to the game`{copy}
> `Add a French version`{copy}
> `Make it look like this screenshot`{copy}

Claude works out which files to change and makes the edit. If something isn't right, say so, as you would to a person: `The button is too big now`{.prompt copy}.

---

## See your changes

Check your changes on your own computer before anyone else sees them. Ask Claude to `preview my project`{.prompt copy}, or type `/manifest:preview` if you have the plugin. Your project opens in a browser window or preview panel. Nothing goes online.

When you're happy with it, [publish](/docs/ai/projects/publish) the changes.

::: brand icon="lucide:info"
Previewing needs <a href="https://nodejs.org" target="_blank">Node.js</a> on your computer.
:::

---

## What Claude can help with

With the plugin, Claude uses Manifest skills for pages and layout, colors and fonts, forms, images, translations, search and sharing, sign-in and saved data, speed, and testing. See the full list in [Skills](/docs/ai/setup/plugin#skills).

Using only the connector in Claude Code? Ask Claude to `install the Manifest skills`{.prompt copy} and it adds them to your project folder.

---

## Projects built another way

If your project was built with something other than Manifest, such as React, Vite, or Astro, Claude keeps your setup as it is and edits the project the way it expects. Publishing works the same way for every project.

To bring an existing project to Manifest, open Claude Code in its folder and ask:

> `Connect this project to Manifest`{copy}

Claude sets it up as a Manifest project without changing how it's built.

---

## Edit with other people

To edit the same project as someone else, share it on [GitHub](/docs/ai/setup/github#work-with-a-teammate). Each of you then gets the latest changes with `/manifest:sync` before you start, and shares yours with `/manifest:staging`.
