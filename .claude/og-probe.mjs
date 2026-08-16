// Probe: replicate the render engine's screenshot conditions against the live
// local server and report what the page looks like inside headless puppeteer.
import puppeteer from 'puppeteer';

const URL_ = process.argv[2] || 'http://localhost:5070/docs/core-plugins/chat';
const OUT = process.argv[3] || '/tmp/og-probe.png';

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 800 });
const consoleMsgs = [];
page.on('console', (m) => consoleMsgs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => consoleMsgs.push(`[pageerror] ${e.message}`));
page.on('requestfailed', (r) => consoleMsgs.push(`[reqfail] ${r.url()} ${r.failure()?.errorText}`));

await page.goto(URL_, { waitUntil: 'load', timeout: 30000 });
await new Promise((r) => setTimeout(r, 6000));

const report = await page.evaluate(() => {
  const art = document.querySelector('article') || document.querySelector('.prose');
  const rect = art ? art.getBoundingClientRect() : null;
  const cs = art ? getComputedStyle(art) : null;
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent');
  return {
    articleFound: !!art,
    articleTextLen: art ? art.innerText.length : 0,
    articleRect: rect ? { x: rect.x, y: rect.y, w: rect.width, h: rect.height } : null,
    articleDisplay: cs ? { display: cs.display, opacity: cs.opacity, visibility: cs.visibility } : null,
    accent: accent.trim(),
    fonts: document.fonts.status,
    bodyTextLen: document.body.innerText.length,
  };
});

await page.screenshot({ path: OUT, clip: { x: 0, y: 0, width: 1200, height: 630 } });
console.log(JSON.stringify(report, null, 2));
console.log('--- console ---');
console.log(consoleMsgs.slice(0, 30).join('\n') || '(none)');
await browser.close();
