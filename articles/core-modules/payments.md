# Payments

Integrate payment providers with your project.

---

## Overview

The payments module connects your project to any payment provider, which are processors like <a href="https://stripe.com" target="_blank" rel="noopener">Stripe</a> or <a href="https://www.revolut.com/business/merchant-accounts/" target="_blank" rel="noopener">Revolut</a>, and merchants of record like <a href="https://www.paddle.com" target="_blank" rel="noopener">Paddle</a> or <a href="https://www.lemonsqueezy.com" target="_blank" rel="noopener">Lemon Squeezy</a> that also handle sales tax for you. Buyers check out on the provider's secure page or in a popup over yours, and your project never sees card numbers or secret keys.

There are three ways to use it. **Payment links** simply send buyers to a checkout or donation page you already have, with no backend needed. **Full checkout** adds a small [payment function](#payment-function) so you can sell by product name, confirm payments reliably, and unlock features the moment someone pays. Sites on Manifest hosting can have that function [hosted by Manifest](#hosted-by-manifest), with nothing to deploy.

---

## Setup

Payments isn't part of the default module set. It loads automatically when `manifest.json` contains a `payments` block, or it can be declared in `data-modules`, where the `+` prefix adds it alongside the default modules.

<div x-code-group copy>

```html "Auto-detect"
<!-- Meta: manifest.json contains a "payments" block -->
<link rel="manifest" href="/manifest.json">

<!-- Scripts -->
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"></script>
```

```html "Declared"
<!-- Meta -->
<link rel="manifest" href="/manifest.json">

<!-- Scripts: defaults plus payments -->
<script src="https://cdn.jsdelivr.net/npm/mnfst@latest/lib/manifest.min.js"
    data-modules="+payments"></script>
```

</div>

---

## Payment Links

The simplest checkout is a link. Most providers let you create a hosted payment page in their dashboard — a Stripe payment link, a Revolut payment link, a Patreon or Buy Me a Coffee page — and `x-pay` sends the buyer straight to it. Alternatively, just use regular `<a href="...">` links.

```html "HTML" copy
<button x-pay="'https://buy.stripe.com/your-link'">Buy now</button>

<a x-pay="'https://patreon.com/yourpage'">Become a patron</a>
<a x-pay="'https://buymeacoffee.com/yourpage'">Buy me a coffee</a>
```

This needs no configuration and no backend; any absolute URL just navigates. It suits donations, tips, community memberships, and one-off products where the provider's dashboard tells you who paid.

---

## Full Checkouts

Full checkouts allow your project to communicate with the payment solution.

### Configuration

Register the payment provider in `manifest.json` under a `payments` block, pointing at your payment function.

```json "manifest.json" copy
{
    "payments": {
        "provider": "revolut",
        "endpoint": "https://your-function-url",
        "state": { "url": "https://your-function-url/state" }
    }
}
```

| Property | Default | Description |
|---|---|---|
| `provider`{copy} | – | Your payment provider. Built in: `stripe`, `paypal`, `square`, `braintree`, `adyen`, `mollie`, `worldpay`, `revolut`, `paddle`, `lemonsqueezy`, `polar`, `razorpay` — or any name you register a [custom adapter](#providers) for. Five of these support popup checkouts; the rest use the provider's hosted page. |
| `endpoint`{copy} | – | Your payment function's URL. Creates checkouts and confirms payments. |
| `mode`{copy} | `"redirect"` | Preferred checkout style: `redirect` (provider's page) or `overlay` (popup). |
| `publicKey`{copy} | – | A publishable key, if your provider's popup needs one. Safe to commit. |
| `environment`{copy} | `"live"` | `live` or `sandbox`: which of the provider's popup SDKs `overlay` checkouts load. Set `sandbox` while testing with the provider's test keys, and match the environment your payment function uses. |
| `options`{copy} | `{}` | Provider-specific options passed to the adapter. |
| `redirectHosts`{copy} | – | Optional list of hostnames your function may send buyers to. A leading dot allows a domain and all its subdomains, as in `[".worldpay.com"]`. Any other checkout address, or one not on https, is refused. Since mnfst 0.5.311. |
| `state.url`{copy} | – | Where to read payment state for `$pay.state`. Appwrite projects can use [databases](/docs/framework/appwrite-modules/databases) and `$x` instead. |

::: brand icon="lucide:info"
Since mnfst 0.5.270, `environment` defaults to `live`. Sites that relied on the old sandbox default must now set `"environment": "sandbox"`.
:::

::: brand icon="lucide:info"
Your provider's <b>secret key</b> never goes in `manifest.json`, HTML, or anywhere else a browser can see. It lives only in the payment function's environment variables.
:::

---

## Start a Checkout

Add `x-pay` to any element with a product reference, with the value being a transaction name like `pro-upgrade` or `credits-1000` that you define in your payment function (alongside its real price). Clicking it opens the provider's checkout UI. The frame below runs against a demo provider — no real charges; popup purchases grant credits instantly, and redirect buttons report their destination instead of leaving the page.

<div x-code-group copy>

```html "HTML"
<button x-pay="'pro-upgrade'">Upgrade to Pro</button>
<button x-pay.overlay="'credits-1000'">Buy 1,000 credits</button>
<button class="outlined" x-pay.portal>Manage billing</button>

<p>
    Plan: <b x-text="$pay.state?.plan ?? '—'"></b> ·
    Credits: <b x-text="$pay.state?.credits ?? '—'"></b>
</p>
<small x-show="$pay.last?.url">Would open: <code x-text="$pay.last?.url"></code></small>
```

```js "Function"
// The refs your buttons use, defined server-side with their REAL prices.
// (See Payment Function below for the full main.js snippet)

const PRODUCTS = {
    'pro-upgrade':  { price: { amount: 4900, currency: 'USD' }, grant: { type: 'plan', plan: 'pro', credits: 1000 } },
    'credits-1000': { price: { amount: 500, currency: 'USD' }, grant: { type: 'credits', amount: 1000 } }
}

// POST { ref, context } → look up the price, create the provider checkout
const { ref, context } = JSON.parse(req.bodyRaw)
const product = PRODUCTS[ref]
if (!product) return res.json({ error: 'unknown ref' }, 400)

const order = await createProviderOrder(product.price, {
    workspace_id: context?.workspaceId, ref
})
return res.json({ mode: 'redirect', url: order.checkout_url })
```

```json "manifest.json"
{
    "payments": {
        "provider": "revolut",
        "endpoint": "https://your-function-url",
        "state": { "url": "https://your-function-url/state" }
    }
}
```

::: frame col gap-3
<div class="row-wrap gap-2">
    <button x-pay="'pro-upgrade'">Upgrade to Pro</button>
    <button x-pay.overlay="'credits-1000'">Buy 1,000 credits</button>
    <button class="outlined" x-pay.portal>Manage billing</button>
</div>
<p>
    Plan: <b x-text="$pay.state?.plan ?? '—'"></b> ·
    Credits: <b x-text="$pay.state?.credits ?? '—'"></b>
</p>
<small x-show="$pay.last?.url">Would open: <code x-text="$pay.last?.url"></code></small>
:::

</div>

Because prices live in the function, nothing on the page can be tampered with — the browser only ever mentions the product by name. The same buttons work for any provider and either checkout style; switching is a configuration change, never an HTML change.

| Modifier | Description |
|---|---|
| `x-pay.overlay`{copy} | Ask for a popup checkout over the current page. |
| `x-pay.redirect`{copy} | Ask for the provider's hosted checkout page. |
| `x-pay.portal`{copy} | Open the provider's billing portal instead of a checkout. Provider-dependent: Stripe, Paddle, Lemon Squeezy, and Polar host one; Revolut doesn't, and the template answers with a clear error. |

Since mnfst 0.5.311, `x-pay` also takes an object, so a quantity or other payload needs no click handler: `x-pay="{ ref: 'solar-panel', quantity: qty }"`.

Checkouts can also start from any Alpine expression using the `$pay` magic method, with an optional payload your function receives:

<div x-code-group copy>

```html "HTML"
<button @click="$pay('donate-25', { campaign: 'spring' })">Donate $25</button>
```

```js "Function"
// The payload arrives alongside the ref — read it however you like.
const { ref, payload, context } = JSON.parse(req.bodyRaw)

const PRODUCTS = {
    'donate-25': { price: { amount: 2500, currency: 'USD' }, grant: { type: 'credits', amount: 0 } }
}
const product = PRODUCTS[ref]

const order = await createProviderOrder(product.price, {
    workspace_id: context?.workspaceId, ref,
    campaign: payload?.campaign
})
return res.json({ mode: 'redirect', url: order.checkout_url })
```

::: frame col gap-2
<button @click="$pay('donate-25', { campaign: 'spring' })">Donate $25</button>
<small x-show="$pay.last?.url">Would open: <code x-text="$pay.last?.url"></code></small>
:::

</div>

If the signed-in user and active team are available from [auth](/docs/framework/appwrite-modules/auth), the module sends them along automatically as `userId` (`$auth.user.$id`) and `workspaceId` (`$auth.currentTeam.$id`) — so your function knows which account to credit without extra wiring. The payload also suits quantities, coupon codes, or anything else your function wants at checkout time — it travels as-is. Two keys are also read by the module: `mode` is passed to your function as the preferred checkout style (`context.preferMode`), and `context` is merged into the identity context sent alongside, overriding `userId` or `workspaceId` if it sets them.

::: brand icon="lucide:info"
The [template function](#appwrite-template) needs a <b>signed-in buyer</b> — the grant is credited to their active team (the template stores it as `workspace_id`), so it refuses anonymous checkouts rather than taking money it can't assign. A function you write yourself decides its own rule. For anonymous purchases (donations, one-off sales), use [payment links](#payment-links). Buttons also handle themselves during a checkout: they disable while the flow opens (no double-charges from double-clicks), and failures surface automatically as a toast when the toasts module is loaded.
:::

---

## Payment State

`$pay.state` holds whatever record your payment function returns — plan, credits, or anything you define. Read it like any reactive value to gate features or show balances. In the frame below, the demo account is on the `pro` plan with a low balance — both lines react to the record.

<div x-code-group copy>

```html "HTML"
<div x-show="$pay.state?.plan === 'pro'">Welcome, Pro member!</div>

<p x-show="$pay.state?.credits < 50">
    Running low — <button x-pay="'credits-1000'">top up</button>
</p>
```

```js "Function"
// GET /state?workspace=… → whatever shape your pages want to read.
const workspace = req.query?.workspace
const e = workspace ? await getEntitlement(workspace) : null
return res.json(e ? { plan: e.plan, status: e.status, credits: e.credits } : {})
```

::: frame col gap-2
<div x-show="$pay.state?.plan === 'pro'">Welcome, Pro member!</div>
<p x-show="$pay.state?.credits < 50" class="row gap-2 items-center">
    Running low — <button x-pay="'credits-1000'">top up</button>
</p>
<small x-show="$pay.last?.url">Would open: <code x-text="$pay.last?.url"></code></small>
:::

</div>

| Property | Type | Description |
|---|---|---|
| `$pay(ref, payload?)`{copy} | method | Start a checkout. Returns a Promise. |
| `$pay.portal()`{copy} | method | Open the billing portal. |
| `$pay.refresh()`{copy} | method | Re-fetch `$pay.state` from your function. |
| `$pay.state`{copy} | reactive | Your function's payment record — shaped however you like. |
| `$pay.loading`{copy} | reactive | `true` while a checkout is opening. |
| `$pay.error`{copy} | reactive | The last error message, or `null`. |
| `$pay.last`{copy} | reactive | Your function's response to the last checkout request. |
| `$pay.register(name, adapter)`{copy} | method | Add or replace a popup adapter (see [providers](#providers)). |

Appwrite-enabled projects can skip `state.url` and store the payment record in a [database](/docs/framework/appwrite-modules/databases) instead. The function writes it, and your pages read it reactively through `$x` with realtime updates.

---

## Providers

Two checkout styles are supported, and every provider gets at least one:

- **Redirect** sends the buyer to the provider's hosted checkout page. Every provider with a hosted page works this way — including ones Manifest has never heard of.
- **Overlay** opens the provider's own popup over your page, for providers that offer one.

| Style | Providers |
|---|---|
| Overlay popup | `revolut`{copy}, `paddle`{copy}, `lemonsqueezy`{copy}, `polar`{copy}, `razorpay`{copy} |
| Redirect | `stripe`{copy}, `square`{copy}, `paypal`{copy}, `braintree`{copy}, `adyen`{copy}, `mollie`{copy}, `worldpay`{copy}, and any provider with a hosted checkout |

If a popup isn't available, the module falls back to redirect when your function also returned a checkout `url`. Popup SDKs load on demand from the provider's own CDN — sites with a strict Content Security Policy should allow that provider's domain in `script-src`. Providers outside the list can add popup support without touching the framework:

```html "Custom overlay" copy
<script>
    document.addEventListener('alpine:init', () => {
        ManifestPaymentsAdapters.register('myprovider', {
            supportsOverlay: true,
            async open({ url, params, config }) {
                // open the provider's SDK popup, resolve when done
                return { status: 'complete' }
            }
        })
    })
</script>
```

---

## Hosted by Manifest

Sites published on Manifest hosting can skip the payment function entirely. Manifest runs it for you on your own site's address, with your own payment provider account: you keep the merchant relationship and the money goes straight to you. Worldpay is supported today.

Ask Claude to set up payments, or use the `manifest_setup_site_payments` tool directly. Setup has three parts:

1. **Products.** Each product has an id, a name, a price in the currency's minor units, a currency, and an allowed quantity range. Minor units follow ISO 4217: pence or cents for GBP, EUR, USD and most currencies (£250.00 is `25000`), whole units for zero-decimal currencies such as JPY, and thousandths for three-decimal ones such as KWD. They're stored by Manifest, not in your pages, so a visitor can never change a price. Deposits work the same way: make the product the deposit amount.
2. **Credentials.** Claude gives you a one-time secure link. You open it and type your provider's API credentials there. They are encrypted and never shown again, to you or to Claude. Never paste them into a chat.
3. **Notifications** (optional). A confirmed email address gets a message whenever a payment is authorized or refunded.

Then add the block Claude returns to `manifest.json`:

```json "manifest.json" copy
{
    "payments": {
        "provider": "worldpay",
        "endpoint": "/_pay/checkout",
        "state": { "url": "/_pay/state" }
    }
}
```

Buttons name a product id. A quantity travels in the payload:

```html "HTML" copy
<button x-pay="'battery-deposit'">Pay the deposit</button>

<input type="number" min="1" max="20" x-model.number="qty">
<button @click="$pay('solar-panel', { quantity: qty })">Buy panels</button>
```

Prices for display can come from the same catalogue, so the page and the payment never disagree:

```html "HTML" copy
<div x-data="{ products: [] }" x-init="products = (await (await fetch('/_pay/products')).json()).products">
    <template x-for="p in products" :key="p.id">
        <p><span x-text="p.name"></span>: <span x-text="(p.amount / 100).toFixed(2) + ' ' + p.currency"></span></p>
    </template>
</div>
```

`/_pay/products` is public, even on a private site: anyone can see the active products and their prices.

### Plans

| | Free | Pro |
|---|---|---|
| Live paid orders per month | 200 | 10,000 |
| Notification addresses | 1 | 10 |
| Signed webhook notifications | – | Yes |

### Test and Live

You can store both sets of credentials. Your staging address always uses test credentials. The production address uses test credentials until you switch it to live. No real money moves in test mode, test payments don't count toward your plan, and test-mode notifications are limited to a few a day. Your plan's monthly limit on live payments is soft: it's checked when a checkout starts and counted when a payment goes through, so a few payments started just before the limit can still complete.

### After Payment

The provider sends the buyer back to a page on your site. By default these are `/checkout/success`, `/checkout/pending`, `/checkout/failure`, `/checkout/error`, `/checkout/cancel` and `/checkout/expired`, and you can choose your own. The address the buyer lands on proves nothing by itself, so build these pages from `$pay.state`, which Manifest checks with the provider:

```html "HTML" copy
<section x-route="checkout" x-data="{ get order() { return this.$pay?.state ?? null } }">
    <div x-show="!order || order.checking">
        We're confirming your payment. Please don't pay again.
    </div>
    <template x-if="order?.paid">
        <div>Thank you. Your payment of <b x-text="(order.amount / 100).toFixed(2) + ' ' + order.currency"></b> is confirmed.</div>
    </template>
    <div x-show="order?.retry_after !== undefined && order?.status === 'refused'">
        That card didn't go through. You can try another card on the payment page, or start again in a few minutes.
    </div>
    <div x-show="order?.retry_after !== undefined && order?.status !== 'refused'">
        This payment didn't complete. You can start again in a few minutes.
    </div>
    <template x-if="order?.can_retry">
        <div>The payment didn't go through. <button x-pay="order.product">Try again</button></div>
    </template>
    <div x-show="order?.do_not_pay_again && !order?.paid && !order?.checking">
        Please don't pay again. Contact us about this order and we'll sort it out.
    </div>
</section>
```

One section with `x-route="checkout"` covers all six default addresses as subroutes, because it renders only from `$pay.state`. Two details keep it from breaking:

- Blocks that read order fields such as `amount`, `order_id` or `product` use `<template x-if>`, not `x-show`. Alpine still evaluates `x-text` inside a hidden element, so an `x-show` block throws on every load while the state is null.
- The `order` getter reads the state defensively. Until the `payments` block is in `manifest.json`, the page shows the "confirming" message instead of throwing, so you can publish the return pages before setting up payments.

| Field | Description |
|---|---|
| `status`{copy} | `created` (page opened, not paid), `pending`, `authorized` (funds reserved), `settled` (sent for settlement), `partially_refunded`, `refunded`, `refund_recorded` (a refund was reported without its amount), `refused`, `cancelled`, `expired` or `error`. |
| `paid`{copy} | `true` while funds are authorized or settled and not fully refunded. |
| `checking`{copy} | `true` while the outcome isn't known yet: the page was opened but Worldpay doesn't show a payment yet, it's processing, or Worldpay reports it in a state Manifest doesn't recognise. The buyer may already have paid, so say "we're confirming your payment". A buyer who pressed Cancel on the payment page also sees this until the page has closed and been checked (up to about 17 minutes with signed webhooks, 25 without). That's deliberate: the same page could still take a payment. |
| `do_not_pay_again`{copy} | `true` when money is reserved, taken, refunded, possibly on its way, or the outcome can't be known. Show "please don't pay again". |
| `can_retry`{copy} | `true` only when all of these hold: the attempt was never authorized; its payment page has closed; a short wait has passed (2 minutes with signed webhooks, 10 without); and a status check sent to Worldpay after that wait, for the same merchant account (API user and entity), found no payment or only refused, failed, cancelled or expired attempts. A payment in a state Manifest doesn't recognise, a Worldpay outage, or a change of merchant account all keep it `false`. |
| `retry_after`{copy} | Only for a `refused`, `error`, `cancelled` or `expired` attempt that was never authorized: seconds until the wait ends. It can read `0` when the wait is over but Worldpay hasn't yet answered a check since the page closed. `can_retry` is the signal to act on. |
| `final`{copy} | `true` when the order won't change any more without a refund. Orders Manifest closes because they couldn't be confirmed, and authorizations later cancelled or left to lapse, are final, with `do_not_pay_again` `true` and no retry: point the buyer to your contact details. |
| `settled`{copy} | `true` once the payment is sent for settlement. |
| `test`{copy} | `true` for test-mode payments. |
| `order_id`{copy}, `product`{copy}, `quantity`{copy}, `amount`{copy}, `currency`{copy} | The order as placed. `order_id` is the transaction reference in your provider's dashboard. |
| `settled_amount`{copy}, `refunded_amount`{copy} | What was actually taken and refunded. Refund amounts come only from signed webhooks (see below); a refund reported without one shows as `refund_recorded`, with `refunded_amount` `null`. |

`$pay.state` holds the latest order from this browser. On a return from checkout, the module (mnfst 0.5.311 and later) passes the return address's `order` to the state request and keeps re-checking for up to about two minutes while the order is still being confirmed. A page can also read any order by id from `/_pay/orders/<order_id>`.

### Worldpay

Use your Worldpay eCommerce (Access Worldpay) **API username and password** and your **merchant entity**, all under Developer Tools in the Worldpay dashboard. Try and live have separate credentials. A checkout ID is not needed.

In the dashboard's webhook settings, add the webhook address Claude gives you (it ends in `/_pay/webhook/…`) and turn on payment events. Turn webhooks on. Without them, Manifest follows unpaid and authorized orders by checking periodically, but it learns about refunds only from webhooks. Manifest treats every notification as a prompt to ask Worldpay for the payment's real status, so a forged notification changes nothing. If Worldpay has given you an event signature secret, enter it with your credentials: unsigned notifications are then refused, and partial captures and refunds are tracked to the penny. Claude can issue a new webhook address at any time.

Buyers enter card and billing details on Worldpay's own page. Manifest never sees them; it stores only the order: product, quantity, amount, status and times.

---

## Payment Function

Real payments need one small piece of server code, because two things can never happen in a browser: creating a checkout with your secret key, and confirming that money actually arrived. The payment function does both.

Your function answers three requests:

| Request | Purpose |
|---|---|
| `POST /`{copy} | Turns a product reference into a checkout, using the real price from your product list. |
| `POST /webhook`{copy} | Receives the provider's signed payment confirmation and updates the buyer's record. |
| `GET /state`{copy} | Returns a payment record for `$pay.state`. |

The webhook deserves a plain-language note: when someone finishes paying, the provider's servers send your function a cryptographically signed message. That message — not the buyer returning to your site — is what the template trusts before granting anything. It's the difference between "the buyer's browser says they paid" and "the provider says they paid."

### Appwrite Template

Appwrite-enabled projects can use an <a href="https://appwrite.io/docs/products/functions" target="_blank" rel="noopener">Appwrite Function</a>. The template function below is complete and ready to deploy — edit `PRODUCTS` to match what you sell, deploy it as an Appwrite Function (Node runtime, `node-appwrite` dependency), and set the environment variables. The full multi-file template with tests lives in the <a href="https://github.com/Manifest-X/Manifest/tree/master/templates/payments-function" target="_blank" rel="noopener">Manifest repository</a>.

<div x-code-group lines collapse="10" copy>

```js "main.js"
import { Client, Databases, Query, ID } from 'node-appwrite'
import crypto from 'node:crypto'

// Your catalogue. Prices live HERE, server-side — the page only sends the ref.
// Grant types: `credits` tops up a balance; `plan` is a one-time unlock that
// can bundle credits. (True subscriptions need a provider with recurring
// billing — an MoR like Paddle or Polar, or Stripe. Revolut orders are
// one-time, so nothing here renews or expires.)
const PRODUCTS = {
    'credits-1000': { price: { amount: 500, currency: 'USD' }, grant: { type: 'credits', amount: 1000 } },
    'pro-upgrade':  { price: { amount: 4900, currency: 'USD' }, grant: { type: 'plan', plan: 'pro', credits: 1000 } }
}

const REVOLUT_BASE = process.env.PAYMENTS_ENV === 'live'
    ? 'https://merchant.revolut.com' : 'https://sandbox-merchant.revolut.com'
const HEADERS = {
    'Authorization': `Bearer ${process.env.REVOLUT_SECRET_KEY}`,
    'Revolut-Api-Version': '2024-09-01',
    'Content-Type': 'application/json'
}

function db() {
    const client = new Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT)
        .setProject(process.env.APPWRITE_PROJECT)
        .setKey(process.env.APPWRITE_API_KEY)
    return new Databases(client)
}

async function getEntitlement(workspaceId) {
    const r = await db().listDocuments(process.env.PAY_DATABASE_ID, 'entitlements',
        [Query.equal('workspace_id', workspaceId), Query.limit(1)])
    return r.documents[0] || null
}

async function saveEntitlement(workspaceId, data) {
    const existing = await getEntitlement(workspaceId)
    if (existing) return db().updateDocument(process.env.PAY_DATABASE_ID, 'entitlements', existing.$id, data)
    return db().createDocument(process.env.PAY_DATABASE_ID, 'entitlements', ID.unique(), { workspace_id: workspaceId, ...data })
}

// Append-only audit trail. Doubles as the idempotency record: webhooks are
// delivered at-least-once, so "was this order already granted?" is answered
// by the ledger — a redelivered event must never grant twice.
async function addLedger(entry) {
    return db().createDocument(process.env.PAY_DATABASE_ID, 'ledger', ID.unique(), entry)
}

async function hasLedger(orderId, reason) {
    const queries = [Query.equal('order_id', orderId), Query.limit(1)]
    if (reason) queries.unshift(Query.equal('reason', reason))
    const r = await db().listDocuments(process.env.PAY_DATABASE_ID, 'ledger', queries)
    return r.documents.length > 0
}

// Verify Revolut's signature: HMAC-SHA256 over `v1.{timestamp}.{body}`.
function verifySignature(rawBody, signature, timestamp) {
    if (!signature || !timestamp) return false
    if (Math.abs(Date.now() - Number(timestamp)) > 5 * 60 * 1000) return false
    const expected = 'v1=' + crypto.createHmac('sha256', process.env.REVOLUT_WEBHOOK_SECRET)
        .update(`v1.${timestamp}.${rawBody}`).digest('hex')
    return signature.split(/\s+/).some((sig) =>
        sig.length === expected.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected)))
}

export default async ({ req, res, log }) => {
    // 1. The provider's signed confirmations. ORDER_COMPLETED grants the
    //    workspace (once — the ledger dedupes redeliveries); DISPUTE_LOST
    //    means a chargeback was lost, so the same grant is reversed.
    if (req.method === 'POST' && req.path.endsWith('/webhook')) {
        const ok = verifySignature(req.bodyRaw,
            req.headers['revolut-signature'], req.headers['revolut-request-timestamp'])
        if (!ok) return res.json({ ok: false }, 401)

        const { event, order_id } = JSON.parse(req.bodyRaw)
        if (order_id && (event === 'ORDER_COMPLETED' || event === 'DISPUTE_LOST')) {
            const order = await (await fetch(`${REVOLUT_BASE}/api/orders/${order_id}`, { headers: HEADERS })).json()
            const { workspace_id, ref } = order.metadata || {}
            const grant = PRODUCTS[ref]?.grant
            if (workspace_id && grant) {
                const current = await getEntitlement(workspace_id)
                const credits = current?.credits || 0
                const amount = grant.amount || grant.credits || 0

                if (event === 'ORDER_COMPLETED' && !(await hasLedger(order_id))) {
                    await saveEntitlement(workspace_id, grant.type === 'credits'
                        ? { credits: credits + amount }
                        : { plan: grant.plan, status: 'active', credits: credits + amount })
                    await addLedger({ workspace_id, delta: amount, reason: grant.type === 'credits' ? 'topup' : 'grant', ref, order_id })
                    log(`granted ${ref} to ${workspace_id}`)
                }
                if (event === 'DISPUTE_LOST' && (await hasLedger(order_id)) && !(await hasLedger(order_id, 'refund'))) {
                    await saveEntitlement(workspace_id, grant.type === 'credits'
                        ? { credits: Math.max(0, credits - amount) }
                        : { plan: 'free', status: 'revoked', credits: Math.max(0, credits - amount) })
                    await addLedger({ workspace_id, delta: -amount, reason: 'refund', ref, order_id })
                    log(`revoked ${ref} from ${workspace_id}`)
                }
            }
        }
        return res.json({ ok: true })
    }

    // 2. Burn credits (pay-as-you-go). Server-to-server only: YOUR backend
    //    calls this with the shared key — never the browser, or buyers could
    //    skip the spend.
    if (req.method === 'POST' && req.path.endsWith('/consume')) {
        if (req.headers['x-consume-key'] !== process.env.PAYMENTS_CONSUME_KEY) {
            return res.json({ error: 'unauthorized' }, 401)
        }
        const { workspace, amount, reason } = JSON.parse(req.bodyRaw || '{}')
        const e = await getEntitlement(workspace)
        if (!e) return res.json({ error: 'unknown workspace' }, 404)
        if ((e.credits || 0) < amount) return res.json({ error: 'insufficient credits' }, 402)
        await saveEntitlement(workspace, { credits: e.credits - amount })
        await addLedger({ workspace_id: workspace, delta: -amount, reason: reason || 'usage' })
        return res.json({ ok: true, credits: e.credits - amount })
    }

    // 3. Turn a product ref into a checkout (price looked up server-side).
    //    Anonymous checkouts are refused: the grant needs a workspace to land
    //    in, so taking the money without one would lose the purchase.
    if (req.method === 'POST') {
        const { ref, context } = JSON.parse(req.bodyRaw || '{}')
        if (ref === 'portal') return res.json({ error: 'portal not available: Revolut has no customer portal' }, 400)
        if (!context?.workspaceId) return res.json({ error: 'sign in required' }, 401)
        const product = PRODUCTS[ref]
        if (!product) return res.json({ error: 'unknown ref' }, 400)
        const order = await (await fetch(`${REVOLUT_BASE}/api/orders`, {
            method: 'POST', headers: HEADERS,
            body: JSON.stringify({
                amount: product.price.amount, currency: product.price.currency,
                redirect_url: process.env.PAYMENTS_SUCCESS_URL,
                metadata: { workspace_id: context.workspaceId, ref }
            })
        })).json()
        if (context?.preferMode === 'overlay') {
            return res.json({ mode: 'overlay', provider: 'revolut', params: { token: order.token } })
        }
        return res.json({ mode: 'redirect', url: order.checkout_url })
    }

    // 4. The payment record for $pay.state. Readable by workspace id (an
    //    unguessable Appwrite team id) — treat its contents as non-secret.
    const workspace = req.query?.workspace
    const e = workspace ? await getEntitlement(workspace) : null
    return res.json(e ? { plan: e.plan, status: e.status, credits: e.credits } : {})
}
```

```env "Environment"
REVOLUT_SECRET_KEY=sk_…          # provider SECRET key (sandbox to start)
REVOLUT_WEBHOOK_SECRET=…         # returned when you register the webhook
PAYMENTS_ENV=sandbox             # sandbox | live; set the same `environment` in manifest.json
PAYMENTS_SUCCESS_URL=https://yourapp.com/thanks?checkout=1
PAYMENTS_CONSUME_KEY=…           # any long random string; guards POST /consume
APPWRITE_ENDPOINT=…
APPWRITE_PROJECT=…
APPWRITE_API_KEY=…
PAY_DATABASE_ID=…                # database with `entitlements` + `ledger` collections
```

</div>

This example uses <a href="https://help.revolut.com/business/help/merchant-accounts/setting-up-a-merchant-account/what-is-a-merchant-account/" target="_blank" rel="noopener">Revolut Merchant</a>, verified end-to-end against its sandbox. The structure is the same for any provider — swap the two `fetch` calls and the signature check for your provider's equivalents, and the rest (products, grants, state) is untouched. On the page, every provider already works: popups for the five built-in adapters, hosted redirect for everything else.

---

## Returning from Checkout

After a checkout redirect, the provider sends the buyer back to a success URL you choose. Add `checkout=1` to it — when the buyer lands, the module refreshes `$pay.state` against your function and tidies the URL.

```text "Success URL" copy
https://yourapp.com/thanks?checkout=1
```

Popup checkouts stay on the page and refresh state automatically when the popup completes. Because the provider's confirmation can arrive a few seconds after the buyer does, the module re-checks state on a short backoff after the return — the page settles on the webhook-confirmed record without any author code, so what buyers see is what your function actually granted.

| Event | Fires when |
|---|---|
| `manifest:pay:result`{copy} | A popup checkout completes or is cancelled. |
| `manifest:pay:return`{copy} | The buyer returns from a redirect checkout. |
| `manifest:pay:error`{copy} | A checkout could not be started. |
