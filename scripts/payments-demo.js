/* Payments docs demo ("mockpay") — powers the live frames in /docs/core-plugins/payments.
   Inert elsewhere: only x-pay clicks reach fn.test/pay (intercepted, no real requests). */
(function () {
    let plan = 'pro', credits = 42;
    const setState = () => {
        const s = window.Alpine?.store('pay');
        if (s) s.state = { plan, status: 'active', credits };
    };

    const realFetch = window.fetch.bind(window);
    window.fetch = async (url, opts) => {
        if (String(url).indexOf('https://fn.test/pay') === 0) {
            const body = JSON.parse(opts.body);
            if (body.context && body.context.preferMode === 'overlay') {
                return { ok: true, json: async () => ({ mode: 'overlay', provider: 'mockpay', params: { ref: body.ref } }) };
            }
            return { ok: true, json: async () => ({ mode: 'redirect', url: 'https://demo.checkout/' + body.ref }) };
        }
        return realFetch(url, opts);
    };

    const setup = () => {
        if (!window.ManifestPayments || !window.ManifestPaymentsAdapters) return;
        window.ManifestPayments.setNavigate((u) => console.info('[payments demo] would navigate to:', u));
        window.ManifestPaymentsAdapters.register('mockpay', {
            supportsOverlay: true,
            async open({ params }) {
                if (params && params.ref === 'credits-1000') credits += 1000;
                if (params && params.ref === 'pro-upgrade') { plan = 'pro'; credits += 1000; }
                setState();
                return { status: 'complete' };
            }
        });
        setState();
    };
    document.addEventListener('alpine:init', setup);
    document.addEventListener('alpine:initialized', setState);
    if (typeof Alpine !== 'undefined') setup();
})();
