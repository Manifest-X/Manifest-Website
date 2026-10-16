# Manage

Your projects, team, visitors, and plan.

---

## The dashboard

Go to <a href="https://dash.manifestx.dev" target="_blank">dash.manifestx.dev</a> and sign in the same way you did in Claude. Each project is a card showing its name, address, plan, team, and status:

- **Live**: anyone can open it.
- **Staging**: there's a staging version, but nothing is live yet.
- **Draft**: nothing is published.

Select **⋯** on a card to open its live or staging version, or to manage its members.

New projects start in Claude. Each one appears in the dashboard as soon as it's created.

### Several projects

If it isn't clear which project you mean, Claude asks before changing anything.

> `Which Manifest projects do I have?`{copy}
> `Let's work on the product launch site`{copy}

---

## Project teams

Each project has its own team. Inviting someone to one project doesn't give them access to your other projects. Each person works from their own Claude and signs in with their own email address, so nobody shares a password or key.

### Invite someone

On the project's card, select **⋯**, then **Manage members**, and enter their email address. Choose a role:

- **Member**: can edit and publish.
- **Admin**: can also invite people.

Or ask Claude:

> `Invite sam@example.com to this project`{copy}

Once they sign in to Manifest with that address, the project appears in their dashboard, and in their Claude once they've added the [Manifest plugin](/docs/ai/setup/claude-plugin). To edit it, they ask Claude to `download the latest published version`{.prompt copy} into a new folder in the **Code** tab, then work from there. See [Team collaboration](/docs/ai/projects/edit#team-collaboration).

To see or change who's on a project's team, ask Claude to `show the project's team`{.prompt copy} or `remove sam@example.com`{.prompt copy}. Teams are part of [Pro](/docs/ai/setup/plans).

::: icon="lucide:git-branch"
For teams that edit often, saving the project to [GitHub](/docs/ai/projects/github-sync) adds a full change history and smoother updates. It's optional.
:::

---

## Analytics

> `How many people visited this week, and where did they come from?`{copy}

Claude reports views, visits, top pages, where visitors came from, and their countries and devices: the last 7 days on Free, all time on [Pro](/docs/ai/setup/plans). Manifest's analytics don't use cookies or identify anyone. To switch them off, ask Claude to `turn off analytics`{.prompt copy}.

---

## Plans and billing

Each project has its own plan: Free or Pro. To compare them, upgrade, or manage billing, see [Plans](/docs/ai/setup/plans).

---

## Expert help

Would you rather a person build, finish, or fix your project? Claude sends your request to the Manifest team, who reply by email. Nothing is charged until you agree.

> `I'd like someone to build this for me`{copy}

You can also [email the Manifest team](mailto:team@manifestx.dev) directly.
