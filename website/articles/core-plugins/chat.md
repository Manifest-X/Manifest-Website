# Chat

Add conversations with AI or people to your project.

---

## Overview

The chat plugin adds conversations to your project. A conversation is a reactive object: its messages, participants, and typing indicators update live, and you render them with your own markup. The same markup can power an AI assistant, a support box, a group thread, or a comment section.

Adapters decide where messages live. Built-in adapters cover AI models, an Appwrite backend, and an in-browser demo — or you can register your own. A conversation with an AI works the same as one between people.

::: brand icon="lucide:info"
The plugin renders nothing itself. See the [chats](/docs/elements/chats) element styles for ready-made conversation layouts. Each works without the other.
:::

---

## Setup

The chat plugin is included in `manifest.js` with all core plugins. It loads automatically when `$chat` appears in your page's markup, or when `manifest.json` contains an `ai` or `chat` entry (a config block, or `"chat": true`). It can also be declared in `data-plugins`, where the `+` prefix adds it alongside the default plugins.

<div x-code-group copy>

```html "Manifest Trigger (default)"
<!-- Meta: manifest.json contains an "ai" or "chat" entry -->
<link rel="manifest" href="/manifest.json">

<!-- Scripts -->
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Declared"
<!-- Meta -->
<link rel="manifest" href="/manifest.json">

<!-- Scripts: defaults plus chat -->
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-plugins="+chat"></script>
```

</div>

Markup detection covers `$chat` written in the page itself. If your only usage lives inside a lazily loaded [component](/docs/core-plugins/components), use one of the other two triggers.

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
| `system`{copy} | – | Instructions that shape every reply, like the assistant's role, tone, and boundaries. |
| `grounding`{copy} | – | A URL or project file whose text is added to the instructions, so answers come from your content instead of the model's general knowledge. Loaded once at server start. |
| `maxTokens`{copy} | `1024` | The maximum length of a single reply. |

Then put your API key in the project's `.env` file:

```env ".env" copy
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Long `system` and `grounding` text is sent as a cacheable prompt. After the first message, Anthropic serves it from cache at a fraction of the price.

---

### Markup

Open a conversation with `$chat.open` and render it. The call returns a reactive handle. Loop over its `messages`, bind a field to a draft, and call `send`.

Three details complete the UI. Style your own messages by comparing each message's author to the handle's `me`. Render finished replies with the [markdown](/docs/core-plugins/markdown) plugin, and show plain text with `x-text` while a reply streams. When the text comes from participants you don't control, use `x-markdown.safe` to sanitize it.

<div x-code-group copy>

```html "HTML"
<div class="chat-wrapper" x-data="{ c: $chat.open('support', { adapter: 'claude' }), draft: '' }">

    <!-- Message log -->
    <div role="log">
        <div>
            <template x-for="m in c.messages" :key="m.id">
                <div :class="m.author?.id === c.me?.id && 'own'">
                    <span x-show="m.status === 'streaming'" x-text="m.body.text"></span>
                    <div x-show="m.status !== 'streaming'" x-markdown="m.body.text"></div>
                </div>
            </template>
        </div>
    </div>

    <!-- Composer -->
    <form class="bg-popover-surface border border-line focus-within:outlined rounded-lg"
        @submit.prevent="c.send({ text: draft }); draft = ''">
        <textarea class="transparent no-focus" x-model="draft" placeholder="Ask anything…"
            @keydown.enter="if (!$event.shiftKey) { $event.preventDefault(); $el.form.requestSubmit() }"></textarea>
        <button type="submit" class="transparent" x-icon="lucide:corner-down-left" aria-label="Send"></button>
    </form>

</div>
```

::: frame p-0
<div class="col" x-data="{ c: $chat.open('dm-ai', { adapter: 'demo' }), draft: '' }">
    <div class="chat-wrapper h-96">
        <div role="log">
            <div>
                <template x-for="m in c.messages" :key="m.id">
                    <div :class="m.author?.id === c.me?.id && 'own'">
                        <span x-show="m.status === 'streaming'" x-text="m.body.text"></span>
                        <div x-show="m.status !== 'streaming'" x-markdown="m.body.text"></div>
                    </div>
                </template>
            </div>
        </div>
        <form class="bg-popover-surface border border-line focus-within:outlined rounded-lg" @submit.prevent="c.send({ text: draft }); draft = ''">
            <textarea class="transparent no-focus" x-model="draft" placeholder="Ask anything…"
                @keydown.enter="if (!$event.shiftKey) { $event.preventDefault(); $el.form.requestSubmit() }"></textarea>
            <button type="submit" class="transparent me-1 mb-1" x-icon="lucide:corner-down-left" aria-label="Send"></button>
        </form>
    </div>
    <button type="button" class="outlined sm self-end m-3" @click="$chat.sim.aiReply('dm-ai', 'Good question — **every** account starts with `5,000` free credits a month.')">Simulate reply</button>
</div>
:::

</div>

This frame uses the `demo` adapter, which plays the model's part so this page doesn't need an API key. With an `ai` block configured, change the adapter name to `claude` and the same markup talks to the real model. The layout comes from the [chats](/docs/elements/chats) element styles; the plugin only supplies the data.

Replies stream in live. A reply appears with `status: 'streaming'` and grows until it's done. Conversation history is kept in the visitor's browser per conversation ID, so an open conversation picks up where it left off after a reload.

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

## Message Objects

Every adapter feeds the same reactive conversation object, so markup written for one adapter works with any other. Each message carries everything a chat UI needs:

| Field | Description |
|---|---|
| `body.text`{copy} | The message text, raw and exactly as written. |
| `body.media`{copy} | Attachments, if any. |
| `author`{copy} | Who sent it: `displayName`, `color`, and a `kind` of `human`, `agent` (an AI), `contact`, or `system`. |
| `status`{copy} | `pending` → `streaming` → `sent` → `delivered` → `read`, plus `failed`, `edited`, `retracted`. |
| `replyTo`{copy} | The parent message's ID, when this message is a reply. |
| `reactions`{copy} | Emoji reactions: `{ emoji, count, byMe }`. |
| `ts`{copy} | The message timestamp. |

The frame below lays these fields out for a seeded support thread. Each row shows the author's `kind`, the text, and the delivery `status`. Notice `kind` distinguishing the customer (`contact`) from the agent (`human`).

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

Sends are optimistic. Your message appears instantly as `pending` and settles when the backend confirms, so the UI never waits on the network. Failures mark the message `failed` instead of losing it.

---

## Groups & Reactions

A conversation can hold any number of participants, human or AI. The handle exposes the participant list reactively. Reactions toggle with one call: `react` adds yours, and calling it again removes it.

In the frame, invite Cy and the participant list updates. Ask the assistant and its reply streams into the conversation.

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
        <button @click="g.addParticipant({ id: 'u_cy', kind: 'human', role: 'member', displayName: 'Cy', color: '#ea580c' })"
            :disabled="g.participants.some(p => p.id === 'u_cy')">Invite Cy</button>
        <button @click="$chat.sim.aiReply('grp-1', 'On it — the v2 doc looks ready to ship.')">Ask the assistant</button>
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
        <button @click="g.addParticipant({ id: 'u_cy', kind: 'human', role: 'member', displayName: 'Cy', color: '#ea580c' })" :disabled="g.participants.some(p => p.id === 'u_cy')">Invite Cy</button>
        <button @click="$chat.sim.aiReply('grp-1', 'On it — the v2 doc looks ready to ship.')">Ask the assistant</button>
    </div>
</div>
:::

</div>

---

## Threaded Replies

Messages can reply to other messages through `replyTo`. The `tree()` and `flatTree()` methods project the flat list into a nested one, so the same conversation renders as a chat, a forum, or a comment section. Nesting depth is a rendering choice: cap it with `maxDepth` or leave it unlimited.

Replying is a `send` with a parent ID. Pick a message in the frame and your reply nests under it.

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

A reply whose parent isn't loaded still renders, flagged as an orphan, instead of disappearing. The last seeded message above is one.

---

## Appwrite Adapter

Conversations between real visitors need a real backend. Manifest integrates with <a href="https://appwrite.io" target="_blank" rel="noopener">Appwrite</a>, an open source backend platform, for [authentication](/docs/appwrite-plugins/auth), [databases](/docs/appwrite-plugins/databases), and more. See [Appwrite setup](/docs/appwrite-plugins/appwrite-setup) to connect a project.

The built-in `appwrite` adapter stores messages as rows in your Appwrite database, and new messages arrive over its realtime connection. Identity comes from auth. Visitors get a guest session on their first message, so commenting needs no signup.

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

The frame below is this page's real comment thread. Comments come from other readers, live, and disappear after 24 hours:

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

The same adapter serves support threads, project discussions, and small group chats — anywhere the conversation is part of your app's data. Messages are ordinary rows, so the rest of the Appwrite toolbox applies: permissions, the console, your own functions.

::: brand icon="lucide:info"
**Where the Appwrite adapter fits.** Comments, support inboxes, and small groups are a natural fit. Modest write volumes sit comfortably in Appwrite's free tier, with realtime included. A high-volume messaging product deserves purpose-built infrastructure instead — connect it with a [custom adapter](#custom-adapters).
:::

---

## Custom Adapters

An adapter is where messages actually live. The plugin renders and drives the conversation; the adapter stores and transports it. Connect your own backend or messaging platform by registering one object:

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

`identity`, `load`, and `subscribe` are required. Everything else — `send`, `react`, `edit`, `setTyping`, and more — is optional, and the handle's `can` flags reflect exactly what you implemented. A read-only transcript is just an adapter with no `send`. The full adapter guide, covering streaming, paging, reconnection, and a copyable skeleton, lives in the <a href="https://github.com/Manifest-X/Manifest/tree/master/templates/chat-adapter" target="_blank" rel="noopener">Manifest repository</a>.

Chat visibility in the browser is cosmetic, like all client-side gating. Real access control belongs to whatever backend the adapter talks to. As with [payments](/docs/core-plugins/payments), secrets live server-side only: the adapter calls your API, and your API holds the keys.

---

## Persisted Conversations

A conversation window can keep its recent messages on the visitor's device, so reopening it shows the last messages at once while the adapter loads. Off unless enabled, and it needs the [data](/docs/core-plugins/local-data#persisted-data) plugin's persistence store.

```json "manifest.json" copy
{
    "chat": {
        "persist": { "messages": 50, "conversations": 30, "ttl": "7d", "strip": ["meta.raw"] }
    }
}
```

`"persist": true`{copy} uses those defaults. `messages` is how many recent messages each conversation keeps, `conversations` how many conversations are kept before the least recently active is dropped, and `strip` removes fields from every message before it is saved. A conversation is saved once it has messages; one that never receives any takes no space. To leave a particular window out, open it with `$chat.open(id, { persistWindow: false })`{copy}. Fields matching `*secret*`, `*token*`, `*password*` and `credentials*` are always removed, and messages that haven't been acknowledged yet are never saved.

Restored messages are marked stale: `$chat.stale`{copy} is `true` until the adapter's response replaces them. Messages missing from that response are dropped, messages you send in the meantime are kept, and a failed load leaves the restored window in place with the usual `error` status. Group and threaded views built with `aggregate` are not saved.

Saved conversations follow the same `persistence.scope` as data sources and are cleared on sign-out or a scope change, at which point open windows empty until reopened. `$chat.persistence()`{copy} reports what is saved.

---


## Reference

The `$chat` magic:

| Property | Type | Description |
|---|---|---|
| `$chat.open(id, options)`{copy} | method | Open a conversation. Returns a reactive handle. |
| `$chat.merge(handles)`{copy} | method | Merge several conversations into one time-ordered read view. |
| `$chat.adapter(name, factory)`{copy} | method | Register a custom adapter. |
| `$chat.version`{copy} | reactive | Shared integer that increments on every update across all conversations, readable before any handle exists. If a list expression looks its handle up through a key that may not be set yet (`threads[key]?.messages ?? []`), start it with `void $chat.version;` so the list still re-renders when the handle arrives and loads. |

The handle returned by `$chat.open`:

| Property | Type | Description |
|---|---|---|
| `messages`{copy} | reactive | The conversation, oldest first. |
| `participants`{copy} | reactive | Who's in the conversation. |
| `typing`{copy} | reactive | Participants typing right now. |
| `status`{copy} | reactive | `idle` → `loading` → `ready`, or `error`. |
| `live`{copy} | reactive | `false` while the connection is re-establishing. |
| `version`{copy} | reactive | Integer that increments on every conversation update. Reading any list above already tracks it; read `version` itself when an effect needs an explicit dependency on "anything changed". Merged views expose it too. |
| `can`{copy} | reactive | What this conversation supports: `can.send`, `can.react`, `can.edit`, … Hide affordances the adapter doesn't offer. |
| `send(draft)`{copy} | method | Send a message: `{ text }`, or `{ body: { text, media }, replyTo }`. |
| `react(id, emoji)`{copy} / `edit(id, body)`{copy} / `retract(id)`{copy} | method | Act on a message, where supported. |
| `setTyping(on)`{copy} / `markRead(upToId)`{copy} | method | Report typing and read state. |
| `loadOlder()`{copy} / `loadNewer()`{copy} | method | Page through history; `atStart`/`atEnd` flag the boundaries. |
| `tree(options)`{copy} / `flatTree(options)`{copy} | method | Nested or flattened reply-tree projection; `{ maxDepth }` caps indentation. |
| `addParticipant(p)`{copy} / `removeParticipant(id)`{copy} / `transfer(from, to)`{copy} | method | Change who's in the conversation, where supported. |
| `close()`{copy} | method | Disconnect this handle. Call it when the UI unmounts. |
