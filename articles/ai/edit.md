# Edit

Change a project by asking Claude, and check it in a preview.

---

## Ask for changes

Open the project's folder in the **Code** tab of the Claude desktop app, and describe what you want as you would to a person.

> `Make the headline bigger and center it`{copy}
> `Add a signup form that saves entries to a database`{copy}
> `Show our product list from this spreadsheet`{copy}
> `Add a high-score table to the game`{copy}
> `Add a French version`{copy}
> `Make it look like this screenshot`{copy}

If something isn't right, say so: `the button is too big now`{.prompt copy}.

---

## Preview

A preview runs your project on your own computer, so you can try changes before anyone else sees them. Nothing goes online.

- **Start it** by asking Claude to `preview my project`{.prompt copy}, or type `/manifest:preview`. It opens next to the chat.
- **It updates on its own.** Each change Claude makes appears in the preview a moment later.
- **It's only on your computer.** To share a version with someone, publish it to [staging](/docs/ai/projects/publish#staging-then-live).

::: icon="lucide:refresh-cw"
**Preview closed or stopped loading?** Previews stop after a while without use. Ask Claude to `restart the preview`{.prompt copy}, and it picks up where you left off. Your work is saved in your project's folder either way.
:::

---

## What Claude knows

Manifest's skills teach Claude how projects built with the Manifest framework work. Claude uses them on its own, so you never need to name one.

| Area | Ask things like |
|---|---|
| Pages and layout | `Add an About page`{.prompt copy} `Put these three cards in a row`{.prompt copy} |
| Look and feel | `Use our brand colors`{.prompt copy} `Make the buttons rounder`{.prompt copy} |
| Forms and data | `Add a contact form`{.prompt copy} `Load our team from this file`{.prompt copy} |
| Accounts | `Let people sign in`{.prompt copy} |
| Images and fonts | `Replace the logo`{.prompt copy} `Use the Inter font`{.prompt copy} |
| Languages | `Add a French version`{.prompt copy} |
| Search and sharing | `Improve how pages look when shared on social media`{.prompt copy} |
| Speed and testing | `This menu feels slow`{.prompt copy} `Check everything works before I publish`{.prompt copy} |
| Matching a design | `Rebuild this layout from the screenshot`{.prompt copy} |

Projects built with something else, such as React or Astro, keep their own setup, and Claude edits them the way they're built.

---

## Team collaboration

When several people edit a Pro project, start each session by getting everyone else's latest changes:

- **On GitHub:** ask Claude to `get the latest changes`{.prompt copy}, or type `/manifest:sync`.
- **Not on GitHub:** ask Claude to `download the latest published version`{.prompt copy} and work from that.

Without GitHub, if someone else published since your copy was made, Manifest stops you from publishing over their work, and Claude helps you catch up first. See [Project teams](/docs/ai/projects/manage#project-teams).
