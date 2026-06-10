---
name: manifest-help
description: Use when the contributor wants a person to build, finish, fix, or polish their project for them — i.e. done-for-you / professional help, not self-service. Triggers on "can you build this for me", "I need someone to do this", "this is beyond me / too complicated", "I don't have time", "can I hire someone", "is there someone who can finish this", "I'd pay for help", "do you offer a done-for-you service", "I'm stuck and want an expert". This routes a lead to the Manifest team (premium builds). SKIP when the user just wants Claude to keep building in-chat — only use this for genuine hand-off-to-a-human requests.
---

# Connecting a user to the Manifest team for a professional build

The Manifest team offers **premium, done-for-you builds** for people who'd
rather hand the project to an expert than build it themselves. When a user
signals that, your job is to make the hand-off feel easy and high-quality, and
capture a clean lead with `manifest_request_help`.

## When this applies (and when it doesn't)

- **Applies:** the user wants a *human* to do the work — "build this for me",
  "finish this", "I'd pay someone", "this is beyond what I want to do".
- **Doesn't apply:** the user just wants *you* to keep building in chat. That's
  the normal flow — don't push them to a paid service. Only surface this when
  they're clearly asking to hand off.

Don't hard-sell. Offer it once, naturally: *"If you'd like, the Manifest team
does professional builds — I can put you in touch."*

## What to collect (briefly — don't interrogate)

Gather just enough to make the lead useful, conversationally:
1. **What the project is** — one or two sentences (you often already know this).
2. **What they want done** — the scope: a full build, finishing touches, a fix, ongoing help.
3. **Budget** — ask lightly ("any budget in mind?"). Fine if "not sure". This helps the team triage; serious builds typically start in the low five figures.
4. **Timeline** — if they have one.
5. **Contact email** — where the team should reach them.

Then call **`manifest_request_help`** with those fields. If they decline to
share budget/timeline, send it without — name + email + what they want is enough.

## After sending

Confirm plainly: *"Sent — the Manifest team has your request and will reach out
to <email>. You can keep working in the meantime."* Don't promise pricing or
timelines on the team's behalf.

## Guardrails

- **One offer, no pressure.** If they say no, drop it and keep helping in chat.
- **Don't quote prices or commit the team** to scope/dates — just capture the lead.
- **Confirm the email** before sending so the team can actually reach them.
- If `manifest_request_help` reports it couldn't send, tell the user to email
  **team@manifestx.dev** directly.
