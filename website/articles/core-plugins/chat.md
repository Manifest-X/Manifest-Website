# Chat

Add conversations with AI or people to your project.

---

## Overview

The chat plugin turns conversations into something you can build with plain HTML. A conversation is a reactive object — its messages, participants, and typing indicators update live — and you render it however you like. An AI assistant, a support box, a group thread, a comment section or all supported with your custom markup.

Where the messages come from is pluggable. The built-in `claude` adapter connects a conversation to <a href="https://www.anthropic.com" target="_blank" rel="noopener">Anthropic's Claude</a> models with almost no setup — that's the fastest path to an AI assistant. Other adapters can connect the same markup to your own backend or messaging app integrations, so a conversation between people works identically to one with an AI.

---

## Setup

The chat plugin is included in `manifest.js` with all core plugins. It activates when `manifest.json` contains an `ai` (or `chat`) block, or whenever it's declared in `data-plugins`.

<div x-code-group copy>

```html "All Plugins (default)"
<!-- Meta -->
<link rel="manifest" href="/manifest.json">

<!-- Scripts -->
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Selective"
<!-- Meta -->
<link rel="manifest" href="/manifest.json">

<!-- Scripts -->
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="chat"></script>
```

</div>

---

## AI Chat

Manifest supports turnkey AI integration using Anthropic's Claude, grounded in your own content.

### Configuration

Register the model in `manifest.json` under an `ai` block:

```json "manifest.json" copy
{
    "ai": {
        "provider": "anthropic",
        "model": "claude-haiku-4-5",
        "system": "You are the support assistant for Universal Exports. Answer briefly.",
        "grounding": "https://universalexports.com/llms.txt"
    }
}
```

| Property | Default | Description |
|---|---|---|
| `provider`{copy} | `"anthropic"` | The AI provider; more may be added in the future. |
| `model`{copy} | `"claude-haiku-4-5"` | Any Claude model ID. Haiku is fast and inexpensive; larger models reason more deeply. |
| `system`{copy} | – | Instructions that shape every reply — the assistant's role, tone, and boundaries. |
| `grounding`{copy} | – | A URL or project file whose text is added to the instructions, so answers come from your content instead of the model's general knowledge. Loaded once at server start. |
| `maxTokens`{copy} | `1024` | The maximum length of a single reply. |

Then put your API key in the project's `.env` file:

```env ".env" copy
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

::: brand icon="lucide:info"
Long `system` + `grounding` text is sent as a cacheable prompt. After the first message, Anthropic serves it from cache at a fraction of the price. Grounding on a large document costs far less per message than it looks.
:::

---

### Talk to it

Open a conversation with the `claude` adapter and render it. `$chat.open` returns a reactive handle — loop over `messages`, bind an input, call `send`.

The markup below covers the three things a chat UI wants: **your messages styled differently** (compare each message's author to `c.me` — here, yours get a brand bubble on the right), **markdown replies rendered** (Claude answers in markdown; the [markdown plugin](/docs/core-plugins/markdown) formats it once the reply finishes, while `x-text` shows the plain text as it streams), and a form that sends.

The frame is live — the demo plays the model's part so this page doesn't need an API key. With your `ai` block configured, the same markup talks to the real thing: change the adapter name from `demo` to `claude`.

<div x-code-group copy>

```html "HTML"
<div x-data="{ c: $chat.open('support', { adapter: 'claude' }), draft: '' }">

    <div class="col gap-2">
        <template x-for="m in c.messages" :key="m.id">
            <div class="col" :class="m.author?.id === c.me?.id ? 'items-end' : 'items-start'">
                <div :class="m.author?.id === c.me?.id
                        ? 'bg-brand-surface text-brand-content rounded-lg px-3 py-1'
                        : ''">
                    <span x-show="m.status === 'streaming'" x-text="m.body.text"></span>
                    <div x-show="m.status !== 'streaming'" x-markdown="m.body.text + ''"></div>
                </div>
            </div>
        </template>
    </div>

    <form class="row gap-2" @submit.prevent="c.send({ text: draft }); draft = ''">
        <input type="text" x-model="draft" placeholder="Ask anything…">
        <button>Send</button>
    </form>

</div>
```

::: frame
<div x-data="{ c: $chat.open('dm-ai', { adapter: 'demo' }), draft: '' }" class="col gap-3">
    <div class="col gap-2">
        <template x-for="m in c.messages" :key="m.id">
            <div class="col" :class="m.author?.id === c.me?.id ? 'items-end' : 'items-start'">
                <div :class="m.author?.id === c.me?.id ? 'bg-brand-surface text-brand-content rounded-lg px-3 py-1' : ''">
                    <span x-show="m.status === 'streaming'" x-text="m.body.text"></span>
                    <div class="[&_p]:m-0" x-show="m.status !== 'streaming'" x-markdown="m.body.text + ''"></div>
                </div>
            </div>
        </template>
    </div>
    <form class="row gap-2" @submit.prevent="c.send({ text: draft }); draft = ''">
        <input type="text" x-model="draft" placeholder="Ask anything…">
        <button>Send</button>
        <button type="button" class="outlined" @click="$chat.sim.aiReply('dm-ai', 'Good question — **every** account starts with `5,000` free credits a month.')">Simulate reply</button>
    </form>
</div>
:::

</div>

Replies stream in live — the message appears with `status: 'streaming'` and grows token by token until it's done. Conversation history is kept in the visitor's browser per conversation ID, so `$chat.open('support', …)` picks up where they left off after a reload.

| Option | Description |
|---|---|
| `adapter: 'claude'`{copy} | Use the built-in Claude adapter. |
| `endpoint`{copy} | Override the relay URL (defaults to `/_ai/chat`). Point this at a self-hosted proxy. |
| `system`{copy} | Per-conversation instructions, replacing the `ai` block's for this handle. |
| `model`{copy} | Per-conversation model override. |

Image and PDF attachments ride along on `send`:

```html "Attachments" copy
<!-- media items: { kind: 'image'|'document', mediaType, data (base64), url, name } -->
<button @click="c.send({ body: { text: draft, media: files } })">Send with files</button>
```

---

## The Message Object

A conversation is the same reactive object no matter which adapter feeds it, so markup written for one works with any other — the AI thread above and a conversation between people differ only in who the participants are.

Each message carries everything a chat UI needs:

| Field | Description |
|---|---|
| `body.text`{copy} | The message text — raw, exactly as written. |
| `body.media`{copy} | Attachments, if any. |
| `author`{copy} | Who sent it: `displayName`, `color`, and a `kind` of `human`, `agent` (an AI), `contact`, or `system`. |
| `status`{copy} | `pending` → `streaming` → `sent` → `delivered` → `read`, plus `failed`, `edited`, `retracted`. |
| `replyTo`{copy} | The parent message's ID, when this message is a reply. |
| `reactions`{copy} | Emoji reactions: `{ emoji, count, byMe }`. |
| `ts`{copy} | The message timestamp. |

The frame below renders a seeded email thread between a customer and a support agent, with each message's `kind`, `status`, and text laid out — a message inspector rather than a chat. Notice `kind` distinguishing the customer (`contact`) from the agent (`human`), and per-message delivery states.

<div x-code-group copy>

```html "HTML"
<div x-data="{ c: $chat.open('hist-em-1', { adapter: 'demo' }) }">
    <template x-for="m in c.messages" :key="m.id">
        <p>
            <b :style="`color:${m.author?.color}`" x-text="m.author?.displayName"></b>
            <small class="chip" x-text="m.author?.kind"></small>
            <span x-text="m.body.text"></span>
            <small x-text="m.status"></small>
        </p>
    </template>
</div>
```

::: frame
<div x-data="{ c: $chat.open('hist-em-1', { adapter: 'demo' }) }" class="col gap-2">
    <template x-for="m in c.messages" :key="m.id">
        <p class="m-0 row-wrap gap-2 items-baseline">
            <b :style="`color:${m.author?.color}`" x-text="m.author?.displayName"></b>
            <small class="px-2 rounded bg-surface-2" x-text="m.author?.kind"></small>
            <span x-text="m.body.text"></span>
            <small class="text-content-subtle" x-text="m.status"></small>
        </p>
    </template>
</div>
:::

</div>

Sends are optimistic — your message appears instantly as `pending` and settles when the backend confirms, so the UI never waits on the network. Failures mark the message `failed` instead of losing it. You can watch this in the AI frame above: your own message lands before the reply starts streaming.

---

## Groups & Reactions

Conversations aren't limited to two sides. The handle exposes the participant list reactively, and reactions are one call — `react` toggles: once to add yours, again to remove it. AI assistants and people are just participants; a group can mix both.

Everything in the frame is wired, not painted: invite Cy and the participant list updates, ask the assistant and its streamed reply adds it to the conversation.

<div x-code-group copy>

```html "HTML"
<div x-data="{ g: $chat.open('grp-1', { adapter: 'demo' }) }">

    <p><small>
        In this conversation:
        <span x-text="g.participants.map(p => p.displayName).join(', ')"></span>
    </small></p>

    <div class="col gap-1">
        <template x-for="m in g.messages" :key="m.id">
            <p>
                <b :style="`color:${m.author?.color}`" x-text="m.author?.displayName"></b>
                <span x-text="m.body.text"></span>
                <button class="ghost sm" :class="(m.reactions || []).some(r => r.byMe) && 'selected'"
                    @click="g.react(m.id, (m.reactions || [])[0]?.emoji || '🎉')"
                    x-text="(m.reactions || [])[0] ? m.reactions[0].emoji + ' ' + m.reactions[0].count : '🎉'">
                </button>
            </p>
        </template>
    </div>

    <div class="row gap-2">
        <button class="outlined" @click="g.addParticipant({ id: 'u_cy', kind: 'human', role: 'member', displayName: 'Cy', color: '#ea580c' })"
            :disabled="g.participants.some(p => p.id === 'u_cy')">Invite Cy</button>
        <button class="outlined" @click="$chat.sim.aiReply('grp-1', 'On it — the v2 doc looks ready to ship.')">Ask the assistant</button>
    </div>

</div>
```

::: frame
<div x-data="{ g: $chat.open('grp-1', { adapter: 'demo' }) }" class="col gap-3">
    <p class="m-0"><small>In this conversation: <span x-text="g.participants.map(p => p.displayName).join(', ')"></span></small></p>
    <div class="col gap-1">
        <template x-for="m in g.messages" :key="m.id">
            <p class="m-0 row-wrap gap-2 items-center">
                <b :style="`color:${m.author?.color}`" x-text="m.author?.displayName"></b>
                <span x-text="m.body.text"></span>
                <button class="ghost sm" :class="(m.reactions || []).some(r => r.byMe) && 'selected'" @click="g.react(m.id, (m.reactions || [])[0]?.emoji || '🎉')" x-text="(m.reactions || [])[0] ? m.reactions[0].emoji + ' ' + m.reactions[0].count : '🎉'"></button>
            </p>
        </template>
    </div>
    <div class="row gap-2">
        <button class="outlined" @click="g.addParticipant({ id: 'u_cy', kind: 'human', role: 'member', displayName: 'Cy', color: '#ea580c' })" :disabled="g.participants.some(p => p.id === 'u_cy')">Invite Cy</button>
        <button class="outlined" @click="$chat.sim.aiReply('grp-1', 'On it — the v2 doc looks ready to ship.')">Ask the assistant</button>
    </div>
</div>
:::

</div>

---

## Threaded Replies

Messages can reply to other messages via `replyTo`, and `tree()` projects the flat list into a nested one — so the same conversation renders as a chat, a forum, or a comment section. Nesting depth is a rendering choice, never a storage one: cap it with `maxDepth`, or don't.

Replying is just `send` with a parent. In the frame, pick a message to reply to and watch yours nest under it.

<div x-code-group copy>

```html "HTML"
<div x-data="{ f: $chat.open('forum-1', { adapter: 'demo' }), to: null, reply: '' }">

    <template x-for="n in f.flatTree({ maxDepth: 3 })" :key="n.id">
        <p :style="`margin-left:${n.depth * 1.5}rem`">
            <b :style="`color:${n.author?.color}`" x-text="n.author?.displayName"></b>
            <span x-text="n.body.text"></span>
            <button class="ghost sm" @click="to = n">reply</button>
        </p>
    </template>

    <form class="row gap-2" x-show="to"
        @submit.prevent="f.send({ text: reply, replyTo: to.id }); reply = ''; to = null">
        <input type="text" x-model="reply" :placeholder="`Reply to ${to?.author?.displayName}…`">
        <button>Reply</button>
    </form>

</div>
```

::: frame
<div x-data="{ f: $chat.open('forum-1', { adapter: 'demo' }), to: null, reply: '' }" class="col gap-2">
    <div class="col gap-1">
        <template x-for="n in f.flatTree({ maxDepth: 3 })" :key="n.id">
            <p class="m-0 row-wrap gap-2 items-center" :style="`margin-left:${n.depth * 1.5}rem`">
                <b :style="`color:${n.author?.color}`" x-text="n.author?.displayName"></b>
                <span x-text="n.body.text"></span>
                <button class="ghost sm" @click="to = n">reply</button>
            </p>
        </template>
    </div>
    <form class="row gap-2" x-show="to" @submit.prevent="f.send({ text: reply, replyTo: to.id }); reply = ''; to = null">
        <input type="text" x-model="reply" :placeholder="`Reply to ${to?.author?.displayName}…`">
        <button>Reply</button>
    </form>
</div>
:::

</div>

A reply whose parent isn't loaded still renders (flagged as an orphan) instead of disappearing — the last seeded message above is one.

---

## Comments & Cloud Chats

Conversations between real visitors need a real backend. The built-in `appwrite` adapter stores messages as rows in your project's <a href="https://appwrite.io" target="_blank" rel="noopener">Appwrite</a> database — new messages arrive over realtime, and identity comes from [auth](/docs/appwrite-plugins/auth). Visitors get a guest session on their first message, so commenting needs no signup.

Configure it in the same `chat` block that activates the plugin:

```json "manifest.json" copy
{
    "chat": {
        "appwriteDatabaseId": "your-database-id",
        "appwriteTableId": "chat_messages",
        "ttlHours": 24
    }
}
```

| Property | Default | Description |
|---|---|---|
| `appwriteDatabaseId`{copy} | – | The database holding the messages table. |
| `appwriteTableId`{copy} | `"chat_messages"` | A table with columns `conversationId` (indexed), `text`, `authorId`, `authorName`, and optional `authorColor`, `replyTo`. Permissions: read `any`, create `users` + `guests`. |
| `ttlHours`{copy} | – | Optional: only load messages younger than this, making conversations ephemeral. Pair with the <a href="https://github.com/Manifest-X/Manifest/tree/master/templates/chat-prune-function" target="_blank" rel="noopener">prune function</a> to physically delete the rest on a schedule. |

The frame below is this page's real comment thread — comments come from other readers, live, and disappear after 24 hours:

<div x-code-group copy>

```html "HTML"
<div x-data="{ c: $chat.open('website-comments', { adapter: 'appwrite' }), draft: '' }">

    <div class="col gap-1">
        <template x-for="m in c.messages" :key="m.id">
            <p>
                <b :style="`color:${m.author?.color}`" x-text="m.author?.displayName"></b>
                <span x-text="m.body.text"></span>
            </p>
        </template>
        <small x-show="!c.messages.length">No comments in the last 24 hours — leave the first.</small>
    </div>

    <form class="row gap-2" @submit.prevent="if (draft.trim()) { c.send({ text: draft }); draft = '' }">
        <input type="text" x-model="draft" placeholder="Leave an anonymous comment…">
        <button>Comment</button>
    </form>

</div>
```

::: frame
<div x-data="{ c: $chat.open('website-comments', { adapter: 'appwrite' }), draft: '' }" class="col gap-3">
    <div class="col gap-1">
        <template x-for="m in c.messages" :key="m.id">
            <p class="m-0">
                <b :style="`color:${m.author?.color}`" x-text="m.author?.displayName"></b>
                <span x-text="m.body.text"></span>
            </p>
        </template>
        <small x-show="!c.messages.length">No comments in the last 24 hours — leave the first.</small>
    </div>
    <form class="row gap-2" @submit.prevent="if (draft.trim()) { c.send({ text: draft }); draft = '' }">
        <input type="text" x-model="draft" placeholder="Leave an anonymous comment…" style="flex:1">
        <button>Comment</button>
    </form>
</div>
:::

</div>

The same adapter serves support threads, project discussions, and small group chats — anywhere the conversation is part of your app's data. Because messages are ordinary rows, everything else in the Appwrite toolbox applies: permissions, the console, your own functions.

::: brand icon="lucide:info"
**Where Appwrite chat fits.** Comments, support inboxes, and small groups are a natural fit — modest write volumes sit comfortably in Appwrite's free tier, with realtime included. A high-volume messaging product (thousands of concurrent conversations, high message rates) deserves purpose-built infrastructure instead — connect it with a [custom adapter](#custom-adapters), which is exactly how large platforms use this plugin.
:::

---

## Reference

The `$chat` magic:

| Property | Type | Description |
|---|---|---|
| `$chat.open(id, options)`{copy} | method | Open a conversation. Returns a reactive handle. |
| `$chat.merge(handles)`{copy} | method | Merge several conversations into one time-ordered read view. |
| `$chat.adapter(name, factory)`{copy} | method | Register a custom adapter (see below). |

The handle returned by `$chat.open`:

| Property | Type | Description |
|---|---|---|
| `messages`{copy} | reactive | The conversation, oldest first. |
| `participants`{copy} | reactive | Who's in the conversation. |
| `typing`{copy} | reactive | Participants typing right now. |
| `status`{copy} | reactive | `idle` → `loading` → `ready`, or `error`. |
| `live`{copy} | reactive | `false` while the connection is re-establishing. |
| `can`{copy} | reactive | What this conversation supports: `can.send`, `can.react`, `can.edit`, … Hide affordances the adapter doesn't offer. |
| `send(draft)`{copy} | method | Send a message: `{ text }`, or `{ body: { text, media }, replyTo }`. |
| `react(id, emoji)`{copy} / `edit(id, body)`{copy} / `retract(id)`{copy} | method | Act on a message, where supported. |
| `setTyping(on)`{copy} / `markRead(upToId)`{copy} | method | Report typing and read state. |
| `loadOlder()`{copy} / `loadNewer()`{copy} | method | Page through history; `atStart`/`atEnd` flag the boundaries. |
| `tree(options)`{copy} / `flatTree(options)`{copy} | method | Nested or flattened reply-tree projection; `{ maxDepth }` caps indentation. |
| `addParticipant(p)`{copy} / `removeParticipant(id)`{copy} / `transfer(from, to)`{copy} | method | Change who's in the conversation, where supported. |
| `close()`{copy} | method | Disconnect this handle. Call it when the UI unmounts. |

---

## Custom Adapters

An adapter is where messages actually live — the plugin renders and drives the conversation, the adapter stores and transports it. The built-ins cover Claude (`claude`) and an in-browser sandbox (`demo`); connecting your own backend, an <a href="https://appwrite.io" target="_blank" rel="noopener">Appwrite</a> database, or a full messaging platform means registering one object:

```html "Custom adapter" copy
<script>
    document.addEventListener('alpine:init', () => {
        window.ManifestChatAdapters.register('mybackend', (opts) => ({
            identity: () => ({ id: 'me', kind: 'human', displayName: 'Me' }),
            async load(conversationId) {
                const r = await fetch(`/api/chats/${conversationId}`)
                return await r.json()   // { messages, participants }
            },
            subscribe(conversationId, handlers) {
                const es = new EventSource(`/api/chats/${conversationId}/stream`)
                es.onmessage = (e) => handlers.onMessage(JSON.parse(e.data))
                return () => es.close()
            },
            async send(conversationId, draft) {
                const r = await fetch(`/api/chats/${conversationId}`, { method: 'POST', body: JSON.stringify(draft) })
                return await r.json()   // { id, ts }
            }
        }))
    })
</script>
```

`identity`, `load`, and `subscribe` are required; everything else — `send`, `react`, `edit`, `setTyping`, and more — is optional, and the handle's `can` flags reflect exactly what you implemented. A read-only transcript is just an adapter with no `send`. The full adapter guide — streaming, paging, reconnection, and a copyable skeleton — lives in the <a href="https://github.com/Manifest-X/Manifest/tree/master/templates/chat-adapter" target="_blank" rel="noopener">Manifest repository</a>.

::: brand icon="lucide:info"
Chat visibility in the browser is cosmetic, like all client-side gating — real access control belongs to whatever backend the adapter talks to. And as with [payments](/docs/core-plugins/payments), secrets live server-side only: the adapter calls your API, and your API holds the keys.
:::
