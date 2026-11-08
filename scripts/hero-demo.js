// Home hero demo: a looping chat-to-live-site sequence
document.addEventListener('alpine:init', () => {
  const END = 16;
  const STEPS = [
    [2, 'Reading Manifest skills'],
    [3, 'Building pages'],
    [4, 'Adding member sign-in'],
    [5, 'Saving bookings'],
    [6, 'Published to staging'],
  ];
  const LIVE = [[9, 'Connecting solstice.studio'], [10, 'Published live']];
  const URLS = [[0, 'about:blank'], [3, 'localhost:5001'], [6, 'solstice-studio.manifestx.ai'], [10, 'solstice.studio']];
  const at = (list, t) => list.reduce((v, [s, text]) => (t >= s ? text : v), list[0][1]);

  Alpine.data('heroDemo', () => ({
    t: END,
    visible: false,
    visitors: 214,
    shownVisitors: 214,
    seats: 12,
    shownUrl: 'about:blank',
    editing: false,
    timer: null,
    typing: null,
    counting: null,

    get activity() { return at(STEPS, this.t) },
    get publish() { return at(LIVE, this.t) },
    get url() { return at(URLS, this.t) },
    get env() { return this.t >= 10 ? 'live' : this.t >= 6 ? 'staging' : this.t >= 3 ? 'local' : '' },
    get stats() { return this.t >= 12 && this.t < 16 },

    init() {
      this.shownUrl = this.url;
      if (window.__manifestRender || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      new IntersectionObserver(([e]) => { this.visible = e.isIntersecting }, { threshold: 0.2 }).observe(this.$el);
      this.$watch('url', v => this.retype(v));
      this.replay();
      this.timer = setInterval(() => this.tick(), 1000);
    },

    destroy() { clearInterval(this.timer); clearTimeout(this.typing); cancelAnimationFrame(this.counting) },

    replay() {
      this.t = 0;
      this.visitors = 0;
      this.shownVisitors = 0;
      this.seats = 12;
    },

    retype(target) {
      clearTimeout(this.typing);
      this.editing = true;
      const step = () => {
        const cur = this.shownUrl;
        if (!target.startsWith(cur)) this.shownUrl = cur.slice(0, -1);
        else if (cur !== target) this.shownUrl = target.slice(0, cur.length + 1);
        else { this.typing = setTimeout(() => { this.editing = false }, 400); return }
        this.typing = setTimeout(step, target.startsWith(this.shownUrl) ? 45 : 18);
      };
      step();
    },

    countTo(target) {
      cancelAnimationFrame(this.counting);
      const from = this.shownVisitors, start = performance.now(), dur = 900;
      const frame = now => {
        const p = Math.min(1, (now - start) / dur);
        this.shownVisitors = Math.round(from + (target - from) * (1 - Math.pow(1 - p, 3)));
        if (p < 1) this.counting = requestAnimationFrame(frame);
      };
      this.counting = requestAnimationFrame(frame);
    },

    tick() {
      if (!this.visible || document.hidden) return;
      if (this.t >= END) return this.replay();
      this.t++;
      if (this.t >= 11 && this.t % 2) this.seats = this.seats >= 16 ? 13 : this.seats + 1;
      if (this.stats) this.countTo(this.visitors += 40 + Math.round(Math.random() * 30));
    },
  }));

  // Home discoverability demo: items light up, then hold and restart
  Alpine.data('foundDemo', () => ({
    t: 6,
    visible: false,
    timer: null,

    get page() { return { on: this.t === 6, scan: this.t === 4 || this.t === 5 } },
    mark(n) { return this.t === n ? 'on' : '' },

    init() {
      if (window.__manifestRender || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      new IntersectionObserver(([e]) => { this.visible = e.isIntersecting }, { threshold: 0.2 }).observe(this.$el);
      this.t = 0;
      this.timer = setInterval(() => {
        if (!this.visible || document.hidden) return;
        this.t = this.t >= 9 ? 0 : this.t + 1;
      }, 800);
    },

    destroy() { clearInterval(this.timer) },
  }));

  // Home team demo: separate Claude chats on one project
  const TEAM_END = 28;
  const TEAM = [
    {
      name: 'Maya', role: 'Owner', pic: 'https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc?w=112&h=112&fit=crop&crop=faces&fm=webp&q=75', ex: [
        { at: 1, msg: 'Invite sam@solstice.studio to edit', work: 'Sending invite', done: 'Invited Sam', reply: 'Done. Sam can edit from their own Claude.' },
        { at: 5, next: true, msg: 'How many visitors this week?', work: 'Checking analytics', done: 'Read analytics', reply: '1,204 unique visitors, up 18% from last week.' },
      ],
    },
    {
      name: 'Sam', role: 'Designer', pic: 'https://images.unsplash.com/photo-1770510067230-1059f0776b3a?w=112&h=112&fit=crop&crop=faces&fm=webp&q=75', ex: [
        { at: 9, msg: 'Restyle it like old.solstice.studio', work: 'Reading old.solstice.studio', done: 'Published to staging', reply: 'Matched your old colors and fonts. Ready on staging.' },
        { at: 13, next: true, msg: 'Put it live', work: 'Publishing', done: 'Published live', reply: "It's live." },
      ],
    },
    {
      name: 'Leo', role: 'Client', pic: 'https://images.unsplash.com/photo-1600603406200-5b2a104684ac?w=112&h=112&fit=crop&crop=faces&fm=webp&q=75', ex: [
        { at: 17, msg: 'Change our summer hours', work: 'Editing the hours', done: 'Published to staging', reply: 'Updated. Take a look on staging.' },
        { at: 21, next: true, msg: 'Actually, roll that back', work: 'Finding the last version', done: 'Rolled back', reply: 'Back to the previous version.' },
      ],
    },
  ];

  Alpine.data('teamDemo', () => ({
    people: TEAM,
    t: TEAM_END,
    visible: false,
    timer: null,

    typing(p) {
      const i = p.ex.findIndex(e => this.t < e.at);
      return i === 0 || (i > 0 && this.t >= p.ex[i - 1].at + 3);
    },

    init() {
      if (window.__manifestRender || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      new IntersectionObserver(([e]) => { this.visible = e.isIntersecting }, { threshold: 0.2 }).observe(this.$el);
      this.t = 0;
      this.timer = setInterval(() => {
        if (!this.visible || document.hidden) return;
        this.t = this.t >= TEAM_END ? 0 : this.t + 1;
      }, 750);
    },

    destroy() { clearInterval(this.timer) },
  }));

  // Home framework card: feature tiles swap at random
  const FEATURES = [
    ['Sign-ins', 'lucide:user-round-check'],
    ['Cloud data', 'lucide:database'],
    ['File uploads', 'lucide:upload'],
    ['Many languages', 'lucide:languages'],
    ['Rich text editing', 'lucide:pen-line'],
    ['Native apps', 'lucide:smartphone'],
    ['Teams and roles', 'lucide:users'],
    ['Live presence', 'lucide:radio'],
    ['AI chat', 'lucide:message-circle'],
    ['Form submissions', 'lucide:send'],
    ['Import and export', 'lucide:file-down'],
    ['Visual editing', 'lucide:mouse-pointer-click'],
    ['Markdown', 'lucide:file-text'],
    ['Routing', 'lucide:route'],
    ['Components', 'lucide:blocks'],
    ['Huge lists', 'lucide:list'],
    ['Charts', 'lucide:chart-column'],
    ['Data tables', 'lucide:table'],
    ['Dark mode', 'lucide:moon'],
    ['200,000+ icons', 'lucide:shapes'],
    ['Code blocks', 'lucide:code'],
    ['Toasts', 'lucide:bell'],
    ['Tooltips', 'lucide:message-square'],
    ['Dialogs', 'lucide:app-window'],
    ['Date pickers', 'lucide:calendar'],
    ['Color pickers', 'lucide:palette'],
    ['Comboboxes', 'lucide:list-filter'],
    ['Tabs', 'lucide:panels-top-left'],
    ['Accessibility', 'lucide:accessibility'],
    ['Installable web apps', 'lucide:app-window-mac'],
  ];

  Alpine.data('featureTiles', () => ({
    features: FEATURES,
    slots: [0, 1, 2, 3, 4, 5].map(f => ({ f, out: false, below: false })),
    last: -1,
    timer: null,

    init() {
      if (window.__manifestRender || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const tick = () => {
        this.timer = setTimeout(tick, 1400 + Math.random() * 1400);
        if (document.hidden) return;
        let i;
        do i = Math.floor(Math.random() * this.slots.length); while (i === this.last);
        this.last = i;
        this.swap(i);
      };
      this.timer = setTimeout(tick, 1600);
    },

    destroy() { clearTimeout(this.timer) },

    swap(i) {
      const slot = this.slots[i];
      if (slot.out) return;
      const shown = this.slots.map(s => s.f);
      const pool = this.features.map((_, n) => n).filter(n => !shown.includes(n));
      slot.out = true;
      setTimeout(() => {
        slot.f = pool[Math.floor(Math.random() * pool.length)];
        slot.below = true;
        slot.out = false;
        requestAnimationFrame(() => requestAnimationFrame(() => { slot.below = false }));
      }, 200);
    },
  }));
  // Home closing prompt: rotating build ideas
  const IDEAS = [
    'A booking site for my yoga studio',
    'A members portal for our running club',
    'An online shop for my ceramics',
    'A help center for our product',
    'A wedding site with RSVPs',
    'A dashboard for our sales team',
    'A landing page for my podcast',
  ];

  Alpine.data('ctaIdeas', () => ({
    i: 0,
    out: false,
    timer: null,
    get idea() { return IDEAS[this.i] },

    init() {
      if (window.__manifestRender || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      this.timer = setInterval(() => {
        if (document.hidden) return;
        this.out = true;
        setTimeout(() => { this.i = (this.i + 1) % IDEAS.length; this.out = false }, 450);
      }, 3000);
    },

    destroy() { clearInterval(this.timer) },
  }));

  Alpine.data('pageTrack', () => ({
    at: 'home',

    init() {
      const ids = [...this.$el.querySelectorAll('a')].map(a => a.hash.slice(1));
      let raf = 0;
      this.update = () => {
        raf = 0;
        const line = innerHeight * 0.4;
        let at = ids[0];
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= line) at = id;
        }
        this.at = at;
      };
      this.onScroll = () => { raf ||= requestAnimationFrame(this.update) };
      addEventListener('scroll', this.onScroll, { passive: true });
      this.update();
    },

    destroy() { removeEventListener('scroll', this.onScroll) },
  }));

  // Comparison pages: the same requests spend a credit meter on one side
  Alpine.data('creditMeter', () => ({
    step: 99,
    timer: null,
    get prompts() { return this.c?.prompts || [] },
    get total() { return this.prompts.filter(p => p.them === 'credit').length },
    get left() { return this.total - this.prompts.slice(0, this.step).filter(p => p.them === 'credit').length },
    get pct() { return this.total ? Math.round(this.left / this.total * 100) : 0 },

    init() {
      if (window.__manifestRender || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      let visible = false;
      new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0.3 }).observe(this.$el);
      this.step = 0;
      this.timer = setInterval(() => {
        if (!visible || document.hidden) return;
        this.step = this.step >= this.prompts.length + 2 ? 0 : this.step + 1;
      }, 1300);
    },

    destroy() { clearInterval(this.timer) },
  }));

  // Pricing: billing period and currency
  Alpine.data('planPrices', () => ({
    yearly: false,
    eur: false,

    init() {
      if (window.__manifestRender) return;
      try {
        const saved = localStorage.getItem('price-currency');
        this.eur = saved ? saved === 'eur' : Intl.DateTimeFormat().resolvedOptions().timeZone.startsWith('Europe/');
      } catch {}
    },

    setEur(v) {
      this.eur = v;
      try { localStorage.setItem('price-currency', v ? 'eur' : 'usd') } catch {}
    },

    get cur() { return this.eur ? '€' : '$' },
    get pro() { return this.yearly ? (this.eur ? '140' : '150') : (this.eur ? '14' : '15') },
  }));
});
