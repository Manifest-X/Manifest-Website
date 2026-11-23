# Edit

Build and change a project by chatting.

---

## Ask for Changes

Describe what you want as you would to a person. If something isn't right, say so.

> `Make the headline bigger and center it`{copy}
> `Show our product list from this spreadsheet`{copy}
> `Add a French version`{copy}
> `Make it look like this screenshot`{copy}

---

## Preview

In a Code session, ask Claude to `preview my project`{.prompt copy}. It opens next to the conversation and updates as Claude works. Only you can see it; to share a version, publish it to [staging](/docs/platform/publish#staging-then-live).

If the preview stops, ask Claude to `restart the preview`{.prompt copy}. Your work is saved in the project's folder either way.

Chat sessions have no preview, so Claude publishes to staging for you to check there.

---

## What Claude Knows

Manifest teaches Claude how to build with the [Manifest framework](/docs/framework). Claude uses this on its own, so there's nothing to name.

| Area | Prompt ideas |
|---|---|
| Pages and layout | `Add an About page`{.prompt copy} `Put these three cards in a row`{.prompt copy} |
| Look and feel | `Use our brand colors`{.prompt copy} `Make the buttons rounder`{.prompt copy} |
| Forms and data | `Add a contact form`{.prompt copy} `Load our team from this file`{.prompt copy} |
| Accounts | `Let people sign in`{.prompt copy} |
| Languages | `Add a French version`{.prompt copy} |
| Search and sharing | `Improve how pages look when shared`{.prompt copy} |
| Checking | `Check everything works before I publish`{.prompt copy} |

Projects built with something else, such as React or Astro, keep their own setup, and Claude edits them the way they're built.

---

## Working as a Team

When several people edit a project, start each session with everyone's latest changes: ask Claude to `download the latest published version`{.prompt copy}, or, if the project is on [GitHub](/docs/platform/github-sync), to `get the latest changes`{.prompt copy}.

If someone published since your copy was made, Manifest stops you from publishing over their work, and Claude helps you catch up first.
