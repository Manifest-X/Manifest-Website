# Manage

Keep track of your projects, team, visitors, and plan, in the Manifest dashboard or by asking your AI.

---

## Open the dashboard

Go to <a href="https://dash.manifestx.dev" target="_blank">dash.manifestx.dev</a> and sign in the same way you signed in from your AI app: with Google, GitHub, or your email address. It's the same account, so you'll see every project you've made or been invited to.

---

## Your projects

Each project is a card. A card shows:

- **The project's name** and its web address. Select the address to visit the site. If it hasn't been published yet, the card says **Not published yet**.
- **Its status:**
  - **Live**: visitors can see the site.
  - **Staging**: there's a preview version, but nothing is live yet.
  - **Draft**: nothing has been published.
- **Its plan**: **Free** or **Pro**.
- **Who's on the team**, as initials, when other people have joined.
- **When it was last updated.**

Point to a card and select **⋯** for more options, such as opening the live or staging version of the site.

### New projects

You start new projects from your AI app. Ask something like `Make me a website for my bakery and put it online`{.prompt copy}, and the new project appears in the dashboard. Select **New project** in the dashboard for a reminder of the steps.

### Several projects

Ask `Which Manifest projects do I have?`{.prompt copy} to see them all. When it isn't clear which project you mean, Claude asks before changing anything. To switch, name the project: `Let's work on the bakery site`{.prompt copy}

---

## Your team

People you invite can manage the project from their own AI app: take it live, undo changes, connect domains, and see visitors. They sign in with their own email address, so nobody shares a password or key.

To **edit** the site, a teammate also needs a copy of the project's files. The usual way is to share the project on [GitHub](/docs/ai/site/github#work-with-a-teammate), which Claude can set up for both of you.

### Invite someone

1. On the project's card, select **⋯**, then **Manage members**. Only the project's owner sees this option.
2. Enter one or more email addresses.
3. Choose a role:
   - **Member**: can edit and publish.
   - **Admin**: can also invite other people.
4. Select **Send invite**.

Each person gets an email. Once they sign in to Manifest with that email address, the project shows up in their AI app and their dashboard.

You can also ask your AI:

- `Invite sam@example.com to my site`{.prompt copy}
- `Who's on my site's team?`{.prompt copy}
- `Remove sam@example.com from my site`{.prompt copy}

Teams are part of the [Pro plan](#plans-and-billing).

---

## Your visitors

Ask `How many people visited my site this week, and where did they come from?`{.prompt copy} Claude reports page views, visits, your most-read pages, the sites visitors came from, and their countries, devices, and browsers. On the Free plan you see the last 7 days; on Pro, up to 12 months.

Manifest's analytics don't use cookies or identify individual visitors. To turn them off completely, ask `Turn off analytics for my site`{.prompt copy}. This removes the tracking from every page. Ask to turn them back on any time.

---

## Plans and billing

Each project has its own plan. Every project starts on **Free**, and you can upgrade any project to **Pro**.

| | Free | Pro |
|---|---|---|
| Build and publish with Claude | ✓ | ✓ |
| A `.manifestx.ai` web address | ✓ | ✓ |
| Your own domain | ✓ | ✓ |
| Staging, to check changes before they go live | ✓ | ✓ |
| Visitor analytics | Last 7 days | Up to 12 months |
| Remove the "Made with Manifest" badge | | ✓ |
| Keep the site out of Manifest's showcase | | ✓ |
| Undo changes and download recent versions | | Last 5 versions |
| Invite teammates and set roles | | ✓ |

For the full comparison, ask Claude: `Compare Manifest's plans`{.prompt copy}

### Upgrade

Ask Claude: `Upgrade my site to Pro`{.prompt copy}. Claude gives you a secure checkout link. The price is shown there before you pay. Once you've paid, the project switches to Pro within a few seconds. Only the project's owner can upgrade.

### Manage your subscription

Ask Claude: `Manage my billing`{.prompt copy}. You get a link where you can change or cancel your plan, update your payment method, and download invoices.

If a payment fails or your subscription ends, Pro features keep working for 14 days, then the project moves to the Free plan. Your site stays online.

---

## Get expert help

Would you rather have a person build, finish, or fix your site? Ask Claude: `I'd like someone to build this for me`{.prompt copy}. Claude sends your request to the Manifest team, who reply by email. Nothing is charged or booked until you agree to it.

---

## More things to ask

| To | Ask |
|---|---|
| Check on a site | `What's the status of my site?`{.prompt copy} |
| See the version history | `Show me my site's recent versions`{.prompt copy} |
| Download a copy of your site | `Download a copy of my published site`{.prompt copy} (Pro) |
| Change the web address | `Change my site's address to my-bakery`{.prompt copy} |
| Connect your own domain | `Connect www.mybakery.com to my site`{.prompt copy} |

For more on putting changes online, see [Publish](/docs/ai/site/publish).
