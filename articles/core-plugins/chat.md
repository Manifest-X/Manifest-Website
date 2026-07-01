# Chat

Add conversations to your project — with AI or people.

---

## Overview

The chat plugin turns conversations into something you can build with plain HTML. A conversation is a reactive object — its messages, participants, and typing indicators update live — and you render it however you like: an AI assistant, a support box, a group thread, a comment section. The plugin ships no chat window; your markup is the chat window, styled like everything else in your project.

Where the messages come from is pluggable. The built-in `claude` adapter connects a conversation to <a href="https://www.anthropic.com" target="_blank" rel="noopener">Anthropic's Claude</a> models with almost no setup — that's the fastest path to an AI assistant. Other adapters can connect the same markup to your own backend, so a conversation between people works identically to one with an AI. Your API key and any server secrets stay server-side; the browser never sees them.

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

The headline use case: a conversation with Claude, grounded in your own content. Two pieces of configuration and it works.

### Configuration

Register the model in `manifest.json` under an `ai` block:

```json "manifest.json" copy
{
    "ai": {
        "provider": "anthropic",
        "model": "claude-haiku-4-5",
        "system": "You are the support assistant for Acme. Answer briefly.",
        "grounding": "https://acme.com/llms.txt"
    }
}
```

| Property | Default | Description |
|---|---|---|
| `provider`{copy} | `"anthropic"` | The AI provider. |
| `model`{copy} | `"claude-haiku-4-5"` | Any Claude model ID. Haiku is fast and inexpensive; larger models reason more deeply. |
| `system`{copy} | – | Instructions that shape every reply — the assistant's role, tone, and boundaries. |
| `grounding`{copy} | – | A URL or project file whose text is added to the instructions, so answers come from your content instead of the model's general knowledge. Loaded once at server start. |
| `maxTokens`{copy} | `1024` | The maximum length of a single reply. |

Then put your API key in the project's `.env` file — the same place Appwrite credentials go:

```env ".env" copy
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

::: negative icon="lucide:shield-alert"
Keep the name exactly `ANTHROPIC_API_KEY` — <b>never</b> add a `PUBLIC_` prefix. `PUBLIC_` variables are shipped to every visitor's browser; a bare-named variable stays on the server, which is the whole point. Manifest warns loudly if it ever sees `PUBLIC_ANTHROPIC_API_KEY`.
:::

That's the whole setup. During development, `mnfst run` notices the `ai` block and quietly hosts a relay at `/_ai/chat`: the page talks to the relay, the relay holds your key and talks to Anthropic, and replies stream back word by word. Without a key, the relay answers with a mock reply so you can build the UI first. Manifest-hosted projects serve the same relay in production; self-hosted projects can deploy the reference proxy from the <a href="https://github.com/Manifest-X/Manifest/blob/master/tools/chat-llm-proxy.mjs" target="_blank" rel="noopener">Manifest repository</a> and point the adapter at it.

::: brand icon="lucide:info"
Long `system` + `grounding` text is sent as a cacheable prompt: after the first message, Anthropic serves it from cache at a fraction of the price. Grounding on a large document costs far less per message than it looks.
:::

### Talk to it

Open a conversation with the `claude` adapter and render it. `$chat.open` returns a reactive handle — loop over `messages`, bind an input, call `send`.

```html "HTML" copy
<div x-data="{ c: $chat.open('support', { adapter: 'claude' }), draft: '' }">

    <div class="col gap-2">
        <template x-for="m in c.messages" :key="m.id">
            <p>
                <b x-text="m.author?.displayName"></b>
                <span x-text="m.body.text"></span>
                <small x-show="m.status === 'streaming'">…</small>
            </p>
        </template>
    </div>

    <form class="row gap-2" @submit.prevent="c.send({ text: draft }); draft = ''">
        <input type="text" x-model="draft" placeholder="Ask anything…">
        <button>Send</button>
    </form>

</div>
```

Replies stream in live — the message appears with `status: 'streaming'` and grows token by token until it's done. Conversation history is kept in the visitor's browser per conversation ID, so `$chat.open('support', …)` picks up where they left off after a reload.

| Option | Description |
|---|---|
| `adapter: 'claude'`{copy} | Use the built-in Claude adapter. |
| `endpoint`{copy} | Override the relay URL (defaults to `/_ai/chat`). Point this at a self-hosted proxy. |
| `system`{copy} | Per-conversation instructions, replacing the `ai` block's for this handle. |
| `model`{copy} | Per-conversation model override. |

Messages are plain text by default. Claude replies in markdown — render it with the [markdown plugin](/docs/core-plugins/markdown), or keep `x-text` for plain output. Image and PDF attachments ride along on `send`:

```html "Attachments" copy
<!-- media items: { kind: 'image'|'document', mediaType, data (base64), url, name } -->
<button @click="c.send({ body: { text: draft, media: files } })">Send with files</button>
```

---

## Conversations

Everything below applies to every adapter — AI, demo, or your own backend. The frame is live: it runs against the built-in `demo` adapter (seeded, in-browser, nothing leaves the page). Send a message, then let the simulated assistant stream a reply.

<div x-code-group copy>

```html "HTML"
<div x-data="{ c: $chat.open('dm-ai', { adapter: 'demo' }), draft: '' }">

    <div class="col gap-1">
        <template x-for="m in c.messages" :key="m.id">
            <p>
                <b :style="`color:${m.author?.color}`" x-text="m.author?.displayName"></b>
                <span x-text="m.body.text"></span>
                <small x-show="m.status === 'streaming'">streaming…</small>
            </p>
        </template>
    </div>

    <form class="row gap-2" @submit.prevent="c.send({ text: draft }); draft = ''">
        <input type="text" x-model="draft" placeholder="Say something…">
        <button>Send</button>
        <button type="button" class="outlined" @click="$chat.sim.aiReply('dm-ai')">Simulate reply</button>
    </form>

</div>
```

::: frame
<div x-data="{ c: $chat.open('dm-ai', { adapter: 'demo' }), draft: '' }" class="col gap-3">
    <div class="col gap-1">
        <template x-for="m in c.messages" :key="m.id">
            <p class="m-0">
                <b :style="`color:${m.author?.color}`" x-text="m.author?.displayName"></b>
                <span x-text="m.body.text"></span>
                <small x-show="m.status === 'streaming'">streaming…</small>
            </p>
        </template>
    </div>
    <form class="row gap-2" @submit.prevent="c.send({ text: draft }); draft = ''">
        <input type="text" x-model="draft" placeholder="Say something…">
        <button>Send</button>
        <button type="button" class="outlined" @click="$chat.sim.aiReply('dm-ai')">Simulate reply</button>
    </form>
</div>
:::

</div>

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

Sends are optimistic — your message appears instantly as `pending` and settles when the backend confirms, so the UI never waits on the network. Failures mark the message `failed` instead of losing it.

---

## Groups & Reactions

Conversations aren't limited to two sides. The handle exposes the participant list and typing state reactively, and reactions are one call. AI assistants and people are just participants — a group can mix both.

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
                <span x-show="m.reactions" x-text="(m.reactions || []).map(r => r.emoji + r.count).join(' ')"></span>
                <button class="ghost sm" @click="g.react(m.id, '🎉')">react</button>
            </p>
        </template>
    </div>

    <p x-show="g.typing.length"><small>
        <span x-text="g.typing.map(p => p.displayName).join(', ')"></span> typing…
    </small></p>

</div>
```

::: frame
<div x-data="{ g: $chat.open('grp-1', { adapter: 'demo' }) }" class="col gap-3">
    <p class="m-0"><small>In this conversation: <span x-text="g.participants.map(p => p.displayName).join(', ')"></span></small></p>
    <div class="col gap-1">
        <template x-for="m in g.messages" :key="m.id">
            <p class="m-0 row gap-2 items-center">
                <b :style="`color:${m.author?.color}`" x-text="m.author?.displayName"></b>
                <span x-text="m.body.text"></span>
                <span x-show="m.reactions" x-text="(m.reactions || []).map(r => r.emoji + r.count).join(' ')"></span>
                <button class="ghost sm" @click="g.react(m.id, '🎉')">react</button>
            </p>
        </template>
    </div>
    <p class="m-0" x-show="g.typing.length"><small><span x-text="g.typing.map(p => p.displayName).join(', ')"></span> typing…</small></p>
</div>
:::

</div>

---

## Threaded Replies

Messages can reply to other messages via `replyTo`, and `tree()` projects the flat list into a nested one — so the same conversation renders as a chat, a forum, or a comment section. Nesting depth is a rendering choice, never a storage one: cap it with `maxDepth`, or don't.

<div x-code-group copy>

```html "HTML"
<div x-data="{ f: $chat.open('forum-1', { adapter: 'demo' }) }">
    <template x-for="n in f.flatTree({ maxDepth: 3 })" :key="n.id">
        <p :style="`margin-left:${n.depth * 1.5}rem`">
            <b :style="`color:${n.author?.color}`" x-text="n.author?.displayName"></b>
            <span x-text="n.body.text"></span>
        </p>
    </template>
</div>
```

::: frame
<div x-data="{ f: $chat.open('forum-1', { adapter: 'demo' }) }" class="col gap-1">
    <template x-for="n in f.flatTree({ maxDepth: 3 })" :key="n.id">
        <p class="m-0" :style="`margin-left:${n.depth * 1.5}rem`">
            <b :style="`color:${n.author?.color}`" x-text="n.author?.displayName"></b>
            <span x-text="n.body.text"></span>
        </p>
    </template>
</div>
:::

</div>

Reply by sending with a parent: `c.send({ text: 'Agreed!', replyTo: message.id })`. A reply whose parent isn't loaded still renders (flagged as an orphan) instead of disappearing.

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

`identity`, `load`, and `subscribe` are required; everything else — `send`, `react`, `edit`, `setTyping`, and more — is optional, and the handle's `can` flags reflect exactly what you implemented. A read-only transcript is just an adapter with no `send`. The full adapter contract, including streaming, paging, and reconnection, is documented in the <a href="https://github.com/Manifest-X/Manifest/blob/master/CHAT-PLUGIN-DESIGN.md" target="_blank" rel="noopener">Manifest repository</a>.

::: brand icon="lucide:info"
Chat visibility in the browser is cosmetic, like all client-side gating — real access control belongs to whatever backend the adapter talks to. And as with [payments](/docs/core-plugins/payments), secrets live server-side only: the adapter calls your API, and your API holds the keys.
:::
