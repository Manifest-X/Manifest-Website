/*  Indux JS - Quickstart
/*  By Andrew Matlock under MIT license
/*  https://indux.build
/*
/*  Contains all Indux plugins bundled with:
/*  - Alpine JS (alpinejs.dev)
/*  - Iconify (iconify.design)
/*  - Tailwind CSS (modified Play CDN script) (tailwindcss.com)
/*
/*  With on-demand reference to:
/*  - highlight.js (https://highlightjs.org)
/*  - js-yaml (https://nodeca.github.io/js-yaml)
/*  - Marked JS (https://marked.js.org)
/*
/*  Some plugins use Indux CSS styles.
*/


(function () {
  'use strict';

  var tailwind_v4_1 = {};

  /* Tailwind CSS (Play CDN) v4.1.0 */

  var hasRequiredTailwind_v4_1;

  function requireTailwind_v4_1 () {
  	if (hasRequiredTailwind_v4_1) return tailwind_v4_1;
  	hasRequiredTailwind_v4_1 = 1;
   (() => {
  	  var Yt = "4.1.7"; var Pe = 92, We = 47, qe = 42, Oi = 34, _i = 39, zi = 58, He = 59, ne = 10, Ge = 13, Oe = 32, Ye = 9, Jt = 123, yt = 125, Ct = 40, Qt = 41, Ki = 91, Di = 93, Zt = 45, xt = 64, Ui = 33; function Se(t, r) { let i = r?.from ? { file: r.from, code: t } : null; t[0] === "\uFEFF" && (t = " " + t.slice(1)); let e = [], o = [], s = [], a = null, f = null, u = "", c = "", g = 0, p; for (let m = 0; m < t.length; m++) { let v = t.charCodeAt(m); if (!(v === Ge && (p = t.charCodeAt(m + 1), p === ne))) if (v === Pe) u === "" && (g = m), u += t.slice(m, m + 2), m += 1; else if (v === We && t.charCodeAt(m + 1) === qe) { let k = m; for (let y = m + 2; y < t.length; y++)if (p = t.charCodeAt(y), p === Pe) y += 1; else if (p === qe && t.charCodeAt(y + 1) === We) { m = y + 1; break } let x = t.slice(k, m + 1); if (x.charCodeAt(2) === Ui) { let y = Je(x.slice(2, -2)); o.push(y), i && (y.src = [i, k, m + 1], y.dst = [i, k, m + 1]); } } else if (v === _i || v === Oi) { let k = m; for (let x = m + 1; x < t.length; x++)if (p = t.charCodeAt(x), p === Pe) x += 1; else if (p === v) { m = x; break } else { if (p === He && (t.charCodeAt(x + 1) === ne || t.charCodeAt(x + 1) === Ge && t.charCodeAt(x + 2) === ne)) throw new Error(`Unterminated string: ${t.slice(k, x + 1) + String.fromCharCode(v)}`); if (p === ne || p === Ge && t.charCodeAt(x + 1) === ne) throw new Error(`Unterminated string: ${t.slice(k, x) + String.fromCharCode(v)}`) } u += t.slice(k, m + 1); } else { if ((v === Oe || v === ne || v === Ye) && (p = t.charCodeAt(m + 1)) && (p === Oe || p === ne || p === Ye || p === Ge && (p = t.charCodeAt(m + 2)) && p == ne)) continue; if (v === ne) { if (u.length === 0) continue; p = u.charCodeAt(u.length - 1), p !== Oe && p !== ne && p !== Ye && (u += " "); } else if (v === Zt && t.charCodeAt(m + 1) === Zt && u.length === 0) { let k = "", x = m, y = -1; for (let b = m + 2; b < t.length; b++)if (p = t.charCodeAt(b), p === Pe) b += 1; else if (p === We && t.charCodeAt(b + 1) === qe) { for (let V = b + 2; V < t.length; V++)if (p = t.charCodeAt(V), p === Pe) V += 1; else if (p === qe && t.charCodeAt(V + 1) === We) { b = V + 1; break } } else if (y === -1 && p === zi) y = u.length + b - x; else if (p === He && k.length === 0) { u += t.slice(x, b), m = b; break } else if (p === Ct) k += ")"; else if (p === Ki) k += "]"; else if (p === Jt) k += "}"; else if ((p === yt || t.length - 1 === b) && k.length === 0) { m = b - 1, u += t.slice(x, b); break } else (p === Qt || p === Di || p === yt) && k.length > 0 && t[b] === k[k.length - 1] && (k = k.slice(0, -1)); let N = At(u, y); if (!N) throw new Error("Invalid custom property, expected a value"); i && (N.src = [i, x, m], N.dst = [i, x, m]), a ? a.nodes.push(N) : e.push(N), u = ""; } else if (v === He && u.charCodeAt(0) === xt) f = _e(u), i && (f.src = [i, g, m], f.dst = [i, g, m]), a ? a.nodes.push(f) : e.push(f), u = "", f = null; else if (v === He && c[c.length - 1] !== ")") { let k = At(u); if (!k) throw u.length === 0 ? new Error("Unexpected semicolon") : new Error(`Invalid declaration: \`${u.trim()}\``); i && (k.src = [i, g, m], k.dst = [i, g, m]), a ? a.nodes.push(k) : e.push(k), u = ""; } else if (v === Jt && c[c.length - 1] !== ")") c += "}", f = G(u.trim()), i && (f.src = [i, g, m], f.dst = [i, g, m]), a && a.nodes.push(f), s.push(a), a = f, u = "", f = null; else if (v === yt && c[c.length - 1] !== ")") { if (c === "") throw new Error("Missing opening {"); if (c = c.slice(0, -1), u.length > 0) if (u.charCodeAt(0) === xt) f = _e(u), i && (f.src = [i, g, m], f.dst = [i, g, m]), a ? a.nodes.push(f) : e.push(f), u = "", f = null; else { let x = u.indexOf(":"); if (a) { let y = At(u, x); if (!y) throw new Error(`Invalid declaration: \`${u.trim()}\``); i && (y.src = [i, g, m], y.dst = [i, g, m]), a.nodes.push(y); } } let k = s.pop() ?? null; k === null && a && e.push(a), a = k, u = "", f = null; } else if (v === Ct) c += ")", u += "("; else if (v === Qt) { if (c[c.length - 1] !== ")") throw new Error("Missing opening ("); c = c.slice(0, -1), u += ")"; } else { if (u.length === 0 && (v === Oe || v === ne || v === Ye)) continue; u === "" && (g = m), u += String.fromCharCode(v); } } } if (u.charCodeAt(0) === xt) { let m = _e(u); i && (m.src = [i, g, t.length], m.dst = [i, g, t.length]), e.push(m); } if (c.length > 0 && a) { if (a.kind === "rule") throw new Error(`Missing closing } at ${a.selector}`); if (a.kind === "at-rule") throw new Error(`Missing closing } at ${a.name} ${a.params}`) } return o.length > 0 ? o.concat(e) : e } function _e(t, r = []) { let i = t, e = ""; for (let o = 5; o < t.length; o++) { let s = t.charCodeAt(o); if (s === Oe || s === Ct) { i = t.slice(0, o), e = t.slice(o); break } } return F(i.trim(), e.trim(), r) } function At(t, r = t.indexOf(":")) { if (r === -1) return null; let i = t.indexOf("!important", r + 1); return l(t.slice(0, r).trim(), t.slice(r + 1, i === -1 ? t.length : i).trim(), i !== -1) } function me(t) { if (arguments.length === 0) throw new TypeError("`CSS.escape` requires an argument."); let r = String(t), i = r.length, e = -1, o, s = "", a = r.charCodeAt(0); if (i === 1 && a === 45) return "\\" + r; for (; ++e < i;) { if (o = r.charCodeAt(e), o === 0) { s += "\uFFFD"; continue } if (o >= 1 && o <= 31 || o === 127 || e === 0 && o >= 48 && o <= 57 || e === 1 && o >= 48 && o <= 57 && a === 45) { s += "\\" + o.toString(16) + " "; continue } if (o >= 128 || o === 45 || o === 95 || o >= 48 && o <= 57 || o >= 65 && o <= 90 || o >= 97 && o <= 122) { s += r.charAt(e); continue } s += "\\" + r.charAt(e); } return s } function ve(t) { return t.replace(/\\([\dA-Fa-f]{1,6}[\t\n\f\r ]?|[\S\s])/g, r => r.length > 2 ? String.fromCodePoint(Number.parseInt(r.slice(1).trim(), 16)) : r[1]) } var er = new Map([["--font", ["--font-weight", "--font-size"]], ["--inset", ["--inset-shadow", "--inset-ring"]], ["--text", ["--text-color", "--text-decoration-color", "--text-decoration-thickness", "--text-indent", "--text-shadow", "--text-underline-offset"]]]); function Xt(t, r) { return (er.get(r) ?? []).some(i => t === i || t.startsWith(`${i}-`)) } var Qe = class { constructor(r = new Map, i = new Set([])) { this.values = r; this.keyframes = i; } prefix = null; add(r, i, e = 0, o) { if (r.endsWith("-*")) { if (i !== "initial") throw new Error(`Invalid theme value \`${i}\` for namespace \`${r}\``); r === "--*" ? this.values.clear() : this.clearNamespace(r.slice(0, -2), 0); } if (e & 4) { let s = this.values.get(r); if (s && !(s.options & 4)) return } i === "initial" ? this.values.delete(r) : this.values.set(r, { value: i, options: e, src: o }); } keysInNamespaces(r) { let i = []; for (let e of r) { let o = `${e}-`; for (let s of this.values.keys()) s.startsWith(o) && s.indexOf("--", 2) === -1 && (Xt(s, e) || i.push(s.slice(o.length))); } return i } get(r) { for (let i of r) { let e = this.values.get(i); if (e) return e.value } return null } hasDefault(r) { return (this.getOptions(r) & 4) === 4 } getOptions(r) { return r = ve(this.#r(r)), this.values.get(r)?.options ?? 0 } entries() { return this.prefix ? Array.from(this.values, r => (r[0] = this.prefixKey(r[0]), r)) : this.values.entries() } prefixKey(r) { return this.prefix ? `--${this.prefix}-${r.slice(2)}` : r } #r(r) { return this.prefix ? `--${r.slice(3 + this.prefix.length)}` : r } clearNamespace(r, i) { let e = er.get(r) ?? []; e: for (let o of this.values.keys()) if (o.startsWith(r)) { if (i !== 0 && (this.getOptions(o) & i) !== i) continue; for (let s of e) if (o.startsWith(s)) continue e; this.values.delete(o); } } #e(r, i) { for (let e of i) { let o = r !== null ? `${e}-${r}` : e; if (!this.values.has(o)) if (r !== null && r.includes(".")) { if (o = `${e}-${r.replaceAll(".", "_")}`, !this.values.has(o)) continue } else continue; if (!Xt(o, e)) return o } return null } #t(r) { let i = this.values.get(r); if (!i) return null; let e = null; return i.options & 2 && (e = i.value), `var(${me(this.prefixKey(r))}${e ? `, ${e}` : ""})` } markUsedVariable(r) { let i = ve(this.#r(r)), e = this.values.get(i); if (!e) return false; let o = e.options & 16; return e.options |= 16, !o } resolve(r, i, e = 0) { let o = this.#e(r, i); if (!o) return null; let s = this.values.get(o); return (e | s.options) & 1 ? s.value : this.#t(o) } resolveValue(r, i) { let e = this.#e(r, i); return e ? this.values.get(e).value : null } resolveWith(r, i, e = []) { let o = this.#e(r, i); if (!o) return null; let s = {}; for (let f of e) { let u = `${o}${f}`, c = this.values.get(u); c && (c.options & 1 ? s[f] = c.value : s[f] = this.#t(u)); } let a = this.values.get(o); return a.options & 1 ? [a.value, s] : [this.#t(o), s] } namespace(r) { let i = new Map, e = `${r}-`; for (let [o, s] of this.values) o === r ? i.set(null, s.value) : o.startsWith(`${e}-`) ? i.set(o.slice(r.length), s.value) : o.startsWith(e) && i.set(o.slice(e.length), s.value); return i } addKeyframes(r) { this.keyframes.add(r); } getKeyframes() { return Array.from(this.keyframes) } }; var B = class extends Map { constructor(i) { super(); this.factory = i; } get(i) { let e = super.get(i); return e === void 0 && (e = this.factory(i, this), this.set(i, e)), e } }; function $t(t) { return { kind: "word", value: t } } function ji(t, r) { return { kind: "function", value: t, nodes: r } } function Li(t) { return { kind: "separator", value: t } } function ee(t, r, i = null) { for (let e = 0; e < t.length; e++) { let o = t[e], s = false, a = 0, f = r(o, { parent: i, replaceWith(u) { s || (s = true, Array.isArray(u) ? u.length === 0 ? (t.splice(e, 1), a = 0) : u.length === 1 ? (t[e] = u[0], a = 1) : (t.splice(e, 1, ...u), a = u.length) : t[e] = u); } }) ?? 0; if (s) { f === 0 ? e-- : e += a - 1; continue } if (f === 2) return 2; if (f !== 1 && o.kind === "function" && ee(o.nodes, r, o) === 2) return 2 } } function J(t) { let r = ""; for (let i of t) switch (i.kind) { case "word": case "separator": { r += i.value; break } case "function": r += i.value + "(" + J(i.nodes) + ")"; }return r } var tr = 92, Ii = 41, rr = 58, ir = 44, Fi = 34, or = 61, nr = 62, lr = 60, ar = 10, Mi = 40, Bi = 39, sr = 47, ur = 32, cr = 9; function W(t) {
  	    t = t.replaceAll(`\r
`, `
`); let r = [], i = [], e = null, o = "", s; for (let a = 0; a < t.length; a++) { let f = t.charCodeAt(a); switch (f) { case tr: { o += t[a] + t[a + 1], a++; break } case rr: case ir: case or: case nr: case lr: case ar: case sr: case ur: case cr: { if (o.length > 0) { let p = $t(o); e ? e.nodes.push(p) : r.push(p), o = ""; } let u = a, c = a + 1; for (; c < t.length && (s = t.charCodeAt(c), !(s !== rr && s !== ir && s !== or && s !== nr && s !== lr && s !== ar && s !== sr && s !== ur && s !== cr)); c++); a = c - 1; let g = Li(t.slice(u, c)); e ? e.nodes.push(g) : r.push(g); break } case Bi: case Fi: { let u = a; for (let c = a + 1; c < t.length; c++)if (s = t.charCodeAt(c), s === tr) c += 1; else if (s === f) { a = c; break } o += t.slice(u, a + 1); break } case Mi: { let u = ji(o, []); o = "", e ? e.nodes.push(u) : r.push(u), i.push(u), e = u; break } case Ii: { let u = i.pop(); if (o.length > 0) { let c = $t(o); u.nodes.push(c), o = ""; } i.length > 0 ? e = i[i.length - 1] : e = null; break } default: o += String.fromCharCode(f); } } return o.length > 0 && r.push($t(o)), r
  	  } function Ze(t) { let r = []; return ee(W(t), i => { if (!(i.kind !== "function" || i.value !== "var")) return ee(i.nodes, e => { e.kind !== "word" || e.value[0] !== "-" || e.value[1] !== "-" || r.push(e.value); }), 1 }), r } var qi = 64; function M(t, r = []) { return { kind: "rule", selector: t, nodes: r } } function F(t, r = "", i = []) { return { kind: "at-rule", name: t, params: r, nodes: i } } function G(t, r = []) { return t.charCodeAt(0) === qi ? _e(t, r) : M(t, r) } function l(t, r, i = false) { return { kind: "declaration", property: t, value: r, important: i } } function Je(t) { return { kind: "comment", value: t } } function ue(t, r) { return { kind: "context", context: t, nodes: r } } function j(t) { return { kind: "at-root", nodes: t } } function U(t, r, i = [], e = {}) { for (let o = 0; o < t.length; o++) { let s = t[o], a = i[i.length - 1] ?? null; if (s.kind === "context") { if (U(s.nodes, r, i, { ...e, ...s.context }) === 2) return 2; continue } i.push(s); let f = false, u = 0, c = r(s, { parent: a, context: e, path: i, replaceWith(g) { f || (f = true, Array.isArray(g) ? g.length === 0 ? (t.splice(o, 1), u = 0) : g.length === 1 ? (t[o] = g[0], u = 1) : (t.splice(o, 1, ...g), u = g.length) : (t[o] = g, u = 1)); } }) ?? 0; if (i.pop(), f) { c === 0 ? o-- : o += u - 1; continue } if (c === 2) return 2; if (c !== 1 && "nodes" in s) { i.push(s); let g = U(s.nodes, r, i, e); if (i.pop(), g === 2) return 2 } } } function Xe(t, r, i = [], e = {}) { for (let o = 0; o < t.length; o++) { let s = t[o], a = i[i.length - 1] ?? null; if (s.kind === "rule" || s.kind === "at-rule") i.push(s), Xe(s.nodes, r, i, e), i.pop(); else if (s.kind === "context") { Xe(s.nodes, r, i, { ...e, ...s.context }); continue } i.push(s), r(s, { parent: a, context: e, path: i, replaceWith(f) { Array.isArray(f) ? f.length === 0 ? t.splice(o, 1) : f.length === 1 ? t[o] = f[0] : t.splice(o, 1, ...f) : t[o] = f, o += f.length - 1; } }), i.pop(); } } function be(t, r, i = 3) { let e = [], o = new Set, s = new B(() => new Set), a = new B(() => new Set), f = new Set, u = new Set, c = [], g = [], p = new B(() => new Set); function m(k, x, y = {}, N = 0) { if (k.kind === "declaration") { if (k.property === "--tw-sort" || k.value === void 0 || k.value === null) return; if (y.theme && k.property[0] === "-" && k.property[1] === "-") { if (k.value === "initial") { k.value = void 0; return } y.keyframes || s.get(x).add(k); } if (k.value.includes("var(")) if (y.theme && k.property[0] === "-" && k.property[1] === "-") for (let b of Ze(k.value)) p.get(b).add(k.property); else r.trackUsedVariables(k.value); if (k.property === "animation") for (let b of fr(k.value)) u.add(b); i & 2 && k.value.includes("color-mix(") && a.get(x).add(k), x.push(k); } else if (k.kind === "rule") if (k.selector === "&") for (let b of k.nodes) { let V = []; m(b, V, y, N + 1), V.length > 0 && x.push(...V); } else { let b = { ...k, nodes: [] }; for (let V of k.nodes) m(V, b.nodes, y, N + 1); b.nodes.length > 0 && x.push(b); } else if (k.kind === "at-rule" && k.name === "@property" && N === 0) { if (o.has(k.params)) return; if (i & 1) { let V = k.params, R = null, D = false; for (let L of k.nodes) L.kind === "declaration" && (L.property === "initial-value" ? R = L.value : L.property === "inherits" && (D = L.value === "true")); let _ = l(V, R ?? "initial"); _.src = k.src, D ? c.push(_) : g.push(_); } o.add(k.params); let b = { ...k, nodes: [] }; for (let V of k.nodes) m(V, b.nodes, y, N + 1); x.push(b); } else if (k.kind === "at-rule") { k.name === "@keyframes" && (y = { ...y, keyframes: true }); let b = { ...k, nodes: [] }; for (let V of k.nodes) m(V, b.nodes, y, N + 1); k.name === "@keyframes" && y.theme && f.add(b), (b.nodes.length > 0 || b.name === "@layer" || b.name === "@charset" || b.name === "@custom-media" || b.name === "@namespace" || b.name === "@import") && x.push(b); } else if (k.kind === "at-root") for (let b of k.nodes) { let V = []; m(b, V, y, 0); for (let R of V) e.push(R); } else if (k.kind === "context") { if (k.context.reference) return; for (let b of k.nodes) m(b, x, { ...y, ...k.context }, N); } else k.kind === "comment" && x.push(k); } let v = []; for (let k of t) m(k, v, {}, 0); e: for (let [k, x] of s) for (let y of x) { if (dr(y.property, r.theme, p)) { if (y.property.startsWith(r.theme.prefixKey("--animate-"))) for (let V of fr(y.value)) u.add(V); continue } let b = k.indexOf(y); if (k.splice(b, 1), k.length === 0) { let V = Hi(v, R => R.kind === "rule" && R.nodes === k); if (!V || V.length === 0) continue e; V.unshift({ kind: "at-root", nodes: v }); do { let R = V.pop(); if (!R) break; let D = V[V.length - 1]; if (!D || D.kind !== "at-root" && D.kind !== "at-rule") break; let _ = D.nodes.indexOf(R); if (_ === -1) break; D.nodes.splice(_, 1); } while (true); continue e } } for (let k of f) if (!u.has(k.params)) { let x = e.indexOf(k); e.splice(x, 1); } if (v = v.concat(e), i & 2) for (let [k, x] of a) for (let y of x) { let N = k.indexOf(y); if (N === -1 || y.value == null) continue; let b = W(y.value), V = false; if (ee(b, (_, { replaceWith: L }) => { if (_.kind !== "function" || _.value !== "color-mix") return; let O = false, H = false; if (ee(_.nodes, (I, { replaceWith: q }) => { if (I.kind == "word" && I.value.toLowerCase() === "currentcolor") { H = true, V = true; return } let X = I, oe = null, n = new Set; do { if (X.kind !== "function" || X.value !== "var") return; let d = X.nodes[0]; if (!d || d.kind !== "word") return; let h = d.value; if (n.has(h)) { O = true; return } if (n.add(h), V = true, oe = r.theme.resolveValue(null, [d.value]), !oe) { O = true; return } if (oe.toLowerCase() === "currentcolor") { H = true; return } oe.startsWith("var(") ? X = W(oe)[0] : X = null; } while (X); q({ kind: "word", value: oe }); }), O || H) { let I = _.nodes.findIndex(X => X.kind === "separator" && X.value.trim().includes(",")); if (I === -1) return; let q = _.nodes.length > I ? _.nodes[I + 1] : null; if (!q) return; L(q); } else if (V) { let I = _.nodes[2]; I.kind === "word" && (I.value === "oklab" || I.value === "oklch" || I.value === "lab" || I.value === "lch") && (I.value = "srgb"); } }), !V) continue; let R = { ...y, value: J(b) }, D = G("@supports (color: color-mix(in lab, red, red))", [y]); D.src = y.src, k.splice(N, 1, R, D); } if (i & 1) { let k = []; if (c.length > 0) { let x = G(":root, :host", c); x.src = c[0].src, k.push(x); } if (g.length > 0) { let x = G("*, ::before, ::after, ::backdrop", g); x.src = g[0].src, k.push(x); } if (k.length > 0) { let x = v.findIndex(b => !(b.kind === "comment" || b.kind === "at-rule" && (b.name === "@charset" || b.name === "@import"))), y = F("@layer", "properties", []); y.src = k[0].src, v.splice(x < 0 ? v.length : x, 0, y); let N = G("@layer properties", [F("@supports", "((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))", k)]); N.src = k[0].src, N.nodes[0].src = k[0].src, v.push(N); } } return v } function le(t, r) {
  	    let i = 0, e = { file: null, code: "" }; function o(a, f = 0) {
  	      let u = "", c = "  ".repeat(f); if (a.kind === "declaration") {
  	        if (u += `${c}${a.property}: ${a.value}${a.important ? " !important" : ""};
`, r) { i += c.length; let g = i; i += a.property.length, i += 2, i += a.value?.length ?? 0, a.important && (i += 11); let p = i; i += 2, a.dst = [e, g, p]; }
  	      } else if (a.kind === "rule") {
  	        if (u += `${c}${a.selector} {
`, r) { i += c.length; let g = i; i += a.selector.length, i += 1; let p = i; a.dst = [e, g, p], i += 2; } for (let g of a.nodes) u += o(g, f + 1); u += `${c}}
`, r && (i += c.length, i += 2);
  	      } else if (a.kind === "at-rule") {
  	        if (a.nodes.length === 0) {
  	          let g = `${c}${a.name} ${a.params};
`; if (r) { i += c.length; let p = i; i += a.name.length, i += 1, i += a.params.length; let m = i; i += 2, a.dst = [e, p, m]; } return g
  	        } if (u += `${c}${a.name}${a.params ? ` ${a.params} ` : " "}{
`, r) { i += c.length; let g = i; i += a.name.length, a.params && (i += 1, i += a.params.length), i += 1; let p = i; a.dst = [e, g, p], i += 2; } for (let g of a.nodes) u += o(g, f + 1); u += `${c}}
`, r && (i += c.length, i += 2);
  	      } else if (a.kind === "comment") {
  	        if (u += `${c}/*${a.value}*/
`, r) { i += c.length; let g = i; i += 2 + a.value.length + 2; let p = i; a.dst = [e, g, p], i += 1; }
  	      } else if (a.kind === "context" || a.kind === "at-root") return ""; return u
  	    } let s = ""; for (let a of t) s += o(a, 0); return e.code = s, s
  	  } function Hi(t, r) { let i = []; return U(t, (e, { path: o }) => { if (r(e)) return i = [...o], 2 }), i } function dr(t, r, i, e = new Set) { if (e.has(t) || (e.add(t), r.getOptions(t) & 24)) return true; { let s = i.get(t) ?? []; for (let a of s) if (dr(a, r, i, e)) return true } return false } function fr(t) { return t.split(/[\s,]+/) } var Nt = ["calc", "min", "max", "clamp", "mod", "rem", "sin", "cos", "tan", "asin", "acos", "atan", "atan2", "pow", "sqrt", "hypot", "log", "exp", "round"], tt = ["anchor-size"], pr = new RegExp(`(${tt.join("|")})\\(`, "g"); function ze(t) { return t.indexOf("(") !== -1 && Nt.some(r => t.includes(`${r}(`)) } function mr(t) { if (!Nt.some(o => t.includes(o))) return t; let r = false; tt.some(o => t.includes(o)) && (pr.lastIndex = 0, t = t.replace(pr, (o, s) => (r = true, `$${tt.indexOf(s)}$(`))); let i = "", e = []; for (let o = 0; o < t.length; o++) { let s = t[o]; if (s === "(") { i += s; let a = o; for (let u = o - 1; u >= 0; u--) { let c = t.charCodeAt(u); if (c >= 48 && c <= 57) a = u; else if (c >= 97 && c <= 122) a = u; else break } let f = t.slice(a, o); if (Nt.includes(f)) { e.unshift(true); continue } else if (e[0] && f === "") { e.unshift(true); continue } e.unshift(false); continue } else if (s === ")") i += s, e.shift(); else if (s === "," && e[0]) { i += ", "; continue } else { if (s === " " && e[0] && i[i.length - 1] === " ") continue; if ((s === "+" || s === "*" || s === "/" || s === "-") && e[0]) { let a = i.trimEnd(), f = a[a.length - 1]; if (f === "+" || f === "*" || f === "/" || f === "-") { i += s; continue } else if (f === "(" || f === ",") { i += s; continue } else t[o - 1] === " " ? i += `${s} ` : i += ` ${s} `; } else if (e[0] && t.startsWith("to-zero", o)) { let a = o; o += 7, i += t.slice(a, o + 1); } else i += s; } } return r ? i.replace(/\$(\d+)\$/g, (o, s) => tt[s] ?? o) : i } function ge(t) { if (t.indexOf("(") === -1) return $e(t); let r = W(t); return Vt(r), t = J(r), t = mr(t), t } function $e(t, r = false) { let i = ""; for (let e = 0; e < t.length; e++) { let o = t[e]; o === "\\" && t[e + 1] === "_" ? (i += "_", e += 1) : o === "_" && !r ? i += " " : i += o; } return i } function Vt(t) { for (let r of t) switch (r.kind) { case "function": { if (r.value === "url" || r.value.endsWith("_url")) { r.value = $e(r.value); break } if (r.value === "var" || r.value.endsWith("_var") || r.value === "theme" || r.value.endsWith("_theme")) { r.value = $e(r.value); for (let i = 0; i < r.nodes.length; i++) { if (i == 0 && r.nodes[i].kind === "word") { r.nodes[i].value = $e(r.nodes[i].value, true); continue } Vt([r.nodes[i]]); } break } r.value = $e(r.value), Vt(r.nodes); break } case "separator": case "word": { r.value = $e(r.value); break } default: Yi(r); } } function Yi(t) { throw new Error(`Unexpected value: ${t}`) } var Tt = new Uint8Array(256); function fe(t) { let r = 0, i = t.length; for (let e = 0; e < i; e++) { let o = t.charCodeAt(e); switch (o) { case 92: e += 1; break; case 39: case 34: for (; ++e < i;) { let s = t.charCodeAt(e); if (s === 92) { e += 1; continue } if (s === o) break } break; case 40: Tt[r] = 41, r++; break; case 91: Tt[r] = 93, r++; break; case 123: break; case 93: case 125: case 41: if (r === 0) return false; r > 0 && o === Tt[r - 1] && r--; break; case 59: if (r === 0) return false; break } } return true } var rt = new Uint8Array(256); function z(t, r) { let i = 0, e = [], o = 0, s = t.length, a = r.charCodeAt(0); for (let f = 0; f < s; f++) { let u = t.charCodeAt(f); if (i === 0 && u === a) { e.push(t.slice(o, f)), o = f + 1; continue } switch (u) { case 92: f += 1; break; case 39: case 34: for (; ++f < s;) { let c = t.charCodeAt(f); if (c === 92) { f += 1; continue } if (c === u) break } break; case 40: rt[i] = 41, i++; break; case 91: rt[i] = 93, i++; break; case 123: rt[i] = 125, i++; break; case 93: case 125: case 41: i > 0 && u === rt[i - 1] && i--; break } } return e.push(t.slice(o)), e } var Ji = 58, gr = 45, hr = 97, kr = 122; function* vr(t, r) { let i = z(t, ":"); if (r.theme.prefix) { if (i.length === 1 || i[0] !== r.theme.prefix) return null; i.shift(); } let e = i.pop(), o = []; for (let p = i.length - 1; p >= 0; --p) { let m = r.parseVariant(i[p]); if (m === null) return; o.push(m); } let s = false; e[e.length - 1] === "!" ? (s = true, e = e.slice(0, -1)) : e[0] === "!" && (s = true, e = e.slice(1)), r.utilities.has(e, "static") && !e.includes("[") && (yield { kind: "static", root: e, variants: o, important: s, raw: t }); let [a, f = null, u] = z(e, "/"); if (u) return; let c = f === null ? null : Et(f); if (f !== null && c === null) return; if (a[0] === "[") { if (a[a.length - 1] !== "]") return; let p = a.charCodeAt(1); if (p !== gr && !(p >= hr && p <= kr)) return; a = a.slice(1, -1); let m = a.indexOf(":"); if (m === -1 || m === 0 || m === a.length - 1) return; let v = a.slice(0, m), k = ge(a.slice(m + 1)); if (!fe(k)) return; yield { kind: "arbitrary", property: v, value: k, modifier: c, variants: o, important: s, raw: t }; return } let g; if (a[a.length - 1] === "]") { let p = a.indexOf("-["); if (p === -1) return; let m = a.slice(0, p); if (!r.utilities.has(m, "functional")) return; let v = a.slice(p + 1); g = [[m, v]]; } else if (a[a.length - 1] === ")") { let p = a.indexOf("-("); if (p === -1) return; let m = a.slice(0, p); if (!r.utilities.has(m, "functional")) return; let v = a.slice(p + 2, -1), k = z(v, ":"), x = null; if (k.length === 2 && (x = k[0], v = k[1]), v[0] !== "-" || v[1] !== "-" || !fe(v)) return; g = [[m, x === null ? `[var(${v})]` : `[${x}:var(${v})]`]]; } else g = br(a, p => r.utilities.has(p, "functional")); for (let [p, m] of g) { let v = { kind: "functional", root: p, modifier: c, value: null, variants: o, important: s, raw: t }; if (m === null) { yield v; continue } { let k = m.indexOf("["); if (k !== -1) { if (m[m.length - 1] !== "]") return; let y = ge(m.slice(k + 1, -1)); if (!fe(y)) continue; let N = ""; for (let b = 0; b < y.length; b++) { let V = y.charCodeAt(b); if (V === Ji) { N = y.slice(0, b), y = y.slice(b + 1); break } if (!(V === gr || V >= hr && V <= kr)) break } if (y.length === 0 || y.trim().length === 0) continue; v.value = { kind: "arbitrary", dataType: N || null, value: y }; } else { let y = f === null || v.modifier?.kind === "arbitrary" ? null : `${m}/${f}`; v.value = { kind: "named", value: m, fraction: y }; } } yield v; } } function Et(t) { if (t[0] === "[" && t[t.length - 1] === "]") { let r = ge(t.slice(1, -1)); return !fe(r) || r.length === 0 || r.trim().length === 0 ? null : { kind: "arbitrary", value: r } } return t[0] === "(" && t[t.length - 1] === ")" ? (t = t.slice(1, -1), t[0] !== "-" || t[1] !== "-" || !fe(t) ? null : (t = `var(${t})`, { kind: "arbitrary", value: ge(t) })) : { kind: "named", value: t } } function wr(t, r) { if (t[0] === "[" && t[t.length - 1] === "]") { if (t[1] === "@" && t.includes("&")) return null; let i = ge(t.slice(1, -1)); if (!fe(i) || i.length === 0 || i.trim().length === 0) return null; let e = i[0] === ">" || i[0] === "+" || i[0] === "~"; return !e && i[0] !== "@" && !i.includes("&") && (i = `&:is(${i})`), { kind: "arbitrary", selector: i, relative: e } } { let [i, e = null, o] = z(t, "/"); if (o) return null; let s = br(i, a => r.variants.has(a)); for (let [a, f] of s) switch (r.variants.kind(a)) { case "static": return f !== null || e !== null ? null : { kind: "static", root: a }; case "functional": { let u = e === null ? null : Et(e); if (e !== null && u === null) return null; if (f === null) return { kind: "functional", root: a, modifier: u, value: null }; if (f[f.length - 1] === "]") { if (f[0] !== "[") continue; let c = ge(f.slice(1, -1)); return !fe(c) || c.length === 0 || c.trim().length === 0 ? null : { kind: "functional", root: a, modifier: u, value: { kind: "arbitrary", value: c } } } if (f[f.length - 1] === ")") { if (f[0] !== "(") continue; let c = ge(f.slice(1, -1)); return !fe(c) || c.length === 0 || c.trim().length === 0 || c[0] !== "-" || c[1] !== "-" ? null : { kind: "functional", root: a, modifier: u, value: { kind: "arbitrary", value: `var(${c})` } } } return { kind: "functional", root: a, modifier: u, value: { kind: "named", value: f } } } case "compound": { if (f === null) return null; let u = r.parseVariant(f); if (u === null || !r.variants.compoundsWith(a, u)) return null; let c = e === null ? null : Et(e); return e !== null && c === null ? null : { kind: "compound", root: a, modifier: c, variant: u } } } } return null } function* br(t, r) { r(t) && (yield [t, null]); let i = t.lastIndexOf("-"); for (; i > 0;) { let e = t.slice(0, i); if (r(e)) { let o = [e, t.slice(i + 1)]; if (o[1] === "") break; yield o; } i = t.lastIndexOf("-", i - 1); } t[0] === "@" && r("@") && (yield ["@", t.slice(1)]); } function yr(t, r) { let i = []; for (let o of r.variants) i.unshift(it(o)); t.theme.prefix && i.unshift(t.theme.prefix); let e = ""; if (r.kind === "static" && (e += r.root), r.kind === "functional" && (e += r.root, r.value)) if (r.value.kind === "arbitrary") { if (r.value !== null) { let o = Pt(r.value.value), s = o ? r.value.value.slice(4, -1) : r.value.value, [a, f] = o ? ["(", ")"] : ["[", "]"]; r.value.dataType ? e += `-${a}${r.value.dataType}:${Ne(s)}${f}` : e += `-${a}${Ne(s)}${f}`; } } else r.value.kind === "named" && (e += `-${r.value.value}`); return r.kind === "arbitrary" && (e += `[${r.property}:${Ne(r.value)}]`), (r.kind === "arbitrary" || r.kind === "functional") && (e += xr(r.modifier)), r.important && (e += "!"), i.push(e), i.join(":") } function xr(t) { if (t === null) return ""; let r = Pt(t.value), i = r ? t.value.slice(4, -1) : t.value, [e, o] = r ? ["(", ")"] : ["[", "]"]; return t.kind === "arbitrary" ? `/${e}${Ne(i)}${o}` : t.kind === "named" ? `/${t.value}` : "" } function it(t) { if (t.kind === "static") return t.root; if (t.kind === "arbitrary") return `[${Ne(Xi(t.selector))}]`; let r = ""; if (t.kind === "functional") { r += t.root; let i = t.root !== "@"; if (t.value) if (t.value.kind === "arbitrary") { let e = Pt(t.value.value), o = e ? t.value.value.slice(4, -1) : t.value.value, [s, a] = e ? ["(", ")"] : ["[", "]"]; r += `${i ? "-" : ""}${s}${Ne(o)}${a}`; } else t.value.kind === "named" && (r += `${i ? "-" : ""}${t.value.value}`); } return t.kind === "compound" && (r += t.root, r += "-", r += it(t.variant)), (t.kind === "functional" || t.kind === "compound") && (r += xr(t.modifier)), r } var Qi = new B(t => { let r = W(t), i = new Set; return ee(r, (e, { parent: o }) => { let s = o === null ? r : o.nodes ?? []; if (e.kind === "word" && (e.value === "+" || e.value === "-" || e.value === "*" || e.value === "/")) { let a = s.indexOf(e) ?? -1; if (a === -1) return; let f = s[a - 1]; if (f?.kind !== "separator" || f.value !== " ") return; let u = s[a + 1]; if (u?.kind !== "separator" || u.value !== " ") return; i.add(f), i.add(u); } else e.kind === "separator" && e.value.trim() === "/" ? e.value = "/" : e.kind === "separator" && e.value.length > 0 && e.value.trim() === "" ? (s[0] === e || s[s.length - 1] === e) && i.add(e) : e.kind === "separator" && e.value.trim() === "," && (e.value = ","); }), i.size > 0 && ee(r, (e, { replaceWith: o }) => { i.has(e) && (i.delete(e), o([])); }), Rt(r), J(r) }); function Ne(t) { return Qi.get(t) } var Zi = new B(t => { let r = W(t); return r.length === 3 && r[0].kind === "word" && r[0].value === "&" && r[1].kind === "separator" && r[1].value === ":" && r[2].kind === "function" && r[2].value === "is" ? J(r[2].nodes) : t }); function Xi(t) { return Zi.get(t) } function Rt(t) { for (let r of t) switch (r.kind) { case "function": { if (r.value === "url" || r.value.endsWith("_url")) { r.value = Ke(r.value); break } if (r.value === "var" || r.value.endsWith("_var") || r.value === "theme" || r.value.endsWith("_theme")) { r.value = Ke(r.value); for (let i = 0; i < r.nodes.length; i++)Rt([r.nodes[i]]); break } r.value = Ke(r.value), Rt(r.nodes); break } case "separator": r.value = Ke(r.value); break; case "word": { (r.value[0] !== "-" || r.value[1] !== "-") && (r.value = Ke(r.value)); break } default: to(r); } } var eo = new B(t => { let r = W(t); return r.length === 1 && r[0].kind === "function" && r[0].value === "var" }); function Pt(t) { return eo.get(t) } function to(t) { throw new Error(`Unexpected value: ${t}`) } function Ke(t) { return t.replaceAll("_", String.raw`\_`).replaceAll(" ", "_") } function ye(t, r, i) { if (t === r) return 0; let e = t.indexOf("("), o = r.indexOf("("), s = e === -1 ? t.replace(/[\d.]+/g, "") : t.slice(0, e), a = o === -1 ? r.replace(/[\d.]+/g, "") : r.slice(0, o), f = (s === a ? 0 : s < a ? -1 : 1) || (i === "asc" ? parseInt(t) - parseInt(r) : parseInt(r) - parseInt(t)); return Number.isNaN(f) ? t < r ? -1 : 1 : f } var ro = new Set(["black", "silver", "gray", "white", "maroon", "red", "purple", "fuchsia", "green", "lime", "olive", "yellow", "navy", "blue", "teal", "aqua", "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkgrey", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "grey", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightgrey", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen", "transparent", "currentcolor", "canvas", "canvastext", "linktext", "visitedtext", "activetext", "buttonface", "buttontext", "buttonborder", "field", "fieldtext", "highlight", "highlighttext", "selecteditem", "selecteditemtext", "mark", "marktext", "graytext", "accentcolor", "accentcolortext"]), io = /^(rgba?|hsla?|hwb|color|(ok)?(lab|lch)|light-dark|color-mix)\(/i; function Ar(t) { return t.charCodeAt(0) === 35 || io.test(t) || ro.has(t.toLowerCase()) } var oo = { color: Ar, length: ot, percentage: Ot, ratio: vo, number: Sr, integer: E, url: Cr, position: yo, "bg-size": xo, "line-width": lo, image: uo, "family-name": fo, "generic-name": co, "absolute-size": po, "relative-size": mo, angle: So, vector: No }; function Y(t, r) { if (t.startsWith("var(")) return null; for (let i of r) if (oo[i]?.(t)) return i; return null } var no = /^url\(.*\)$/; function Cr(t) { return no.test(t) } function lo(t) { return z(t, " ").every(r => ot(r) || Sr(r) || r === "thin" || r === "medium" || r === "thick") } var ao = /^(?:element|image|cross-fade|image-set)\(/, so = /^(repeating-)?(conic|linear|radial)-gradient\(/; function uo(t) { let r = 0; for (let i of z(t, ",")) if (!i.startsWith("var(")) { if (Cr(i)) { r += 1; continue } if (so.test(i)) { r += 1; continue } if (ao.test(i)) { r += 1; continue } return false } return r > 0 } function co(t) { return t === "serif" || t === "sans-serif" || t === "monospace" || t === "cursive" || t === "fantasy" || t === "system-ui" || t === "ui-serif" || t === "ui-sans-serif" || t === "ui-monospace" || t === "ui-rounded" || t === "math" || t === "emoji" || t === "fangsong" } function fo(t) { let r = 0; for (let i of z(t, ",")) { let e = i.charCodeAt(0); if (e >= 48 && e <= 57) return false; i.startsWith("var(") || (r += 1); } return r > 0 } function po(t) { return t === "xx-small" || t === "x-small" || t === "small" || t === "medium" || t === "large" || t === "x-large" || t === "xx-large" || t === "xxx-large" } function mo(t) { return t === "larger" || t === "smaller" } var de = /[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?/, go = new RegExp(`^${de.source}$`); function Sr(t) { return go.test(t) || ze(t) } var ho = new RegExp(`^${de.source}%$`); function Ot(t) { return ho.test(t) || ze(t) } var ko = new RegExp(`^${de.source}s*/s*${de.source}$`); function vo(t) { return ko.test(t) || ze(t) } var wo = ["cm", "mm", "Q", "in", "pc", "pt", "px", "em", "ex", "ch", "rem", "lh", "rlh", "vw", "vh", "vmin", "vmax", "vb", "vi", "svw", "svh", "lvw", "lvh", "dvw", "dvh", "cqw", "cqh", "cqi", "cqb", "cqmin", "cqmax"], bo = new RegExp(`^${de.source}(${wo.join("|")})$`); function ot(t) { return bo.test(t) || ze(t) } function yo(t) { let r = 0; for (let i of z(t, " ")) { if (i === "center" || i === "top" || i === "right" || i === "bottom" || i === "left") { r += 1; continue } if (!i.startsWith("var(")) { if (ot(i) || Ot(i)) { r += 1; continue } return false } } return r > 0 } function xo(t) { let r = 0; for (let i of z(t, ",")) { if (i === "cover" || i === "contain") { r += 1; continue } let e = z(i, " "); if (e.length !== 1 && e.length !== 2) return false; if (e.every(o => o === "auto" || ot(o) || Ot(o))) { r += 1; continue } } return r > 0 } var Ao = ["deg", "rad", "grad", "turn"], Co = new RegExp(`^${de.source}(${Ao.join("|")})$`); function So(t) { return Co.test(t) } var $o = new RegExp(`^${de.source} +${de.source} +${de.source}$`); function No(t) { return $o.test(t) } function E(t) { let r = Number(t); return Number.isInteger(r) && r >= 0 && String(r) === String(t) } function _t(t) { let r = Number(t); return Number.isInteger(r) && r > 0 && String(r) === String(t) } function xe(t) { return $r(t, .25) } function nt(t) { return $r(t, .25) } function $r(t, r) { let i = Number(t); return i >= 0 && i % r === 0 && String(i) === String(t) } var Vo = new Set(["inset", "inherit", "initial", "revert", "unset"]), Nr = /^-?(\d+|\.\d+)(.*?)$/g; function De(t, r) { return z(t, ",").map(e => { e = e.trim(); let o = z(e, " ").filter(c => c.trim() !== ""), s = null, a = null, f = null; for (let c of o) Vo.has(c) || (Nr.test(c) ? (a === null ? a = c : f === null && (f = c), Nr.lastIndex = 0) : s === null && (s = c)); if (a === null || f === null) return e; let u = r(s ?? "currentcolor"); return s !== null ? e.replace(s, u) : `${e} ${u}` }).join(", ") } var To = /^-?[a-z][a-zA-Z0-9/%._-]*$/, Eo = /^-?[a-z][a-zA-Z0-9/%._-]*-\*$/, at = ["0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "5", "6", "7", "8", "9", "10", "11", "12", "14", "16", "20", "24", "28", "32", "36", "40", "44", "48", "52", "56", "60", "64", "72", "80", "96"], zt = class { utilities = new B(() => []); completions = new Map; static(r, i) { this.utilities.get(r).push({ kind: "static", compileFn: i }); } functional(r, i, e) { this.utilities.get(r).push({ kind: "functional", compileFn: i, options: e }); } has(r, i) { return this.utilities.has(r) && this.utilities.get(r).some(e => e.kind === i) } get(r) { return this.utilities.has(r) ? this.utilities.get(r) : [] } getCompletions(r) { return this.completions.get(r)?.() ?? [] } suggest(r, i) { this.completions.set(r, i); } keys(r) { let i = []; for (let [e, o] of this.utilities.entries()) for (let s of o) if (s.kind === r) { i.push(e); break } return i } }; function S(t, r, i) { return F("@property", t, [l("syntax", i ? `"${i}"` : '"*"'), l("inherits", "false"), ...r ? [l("initial-value", r)] : []]) } function Q(t, r) { if (r === null) return t; let i = Number(r); return Number.isNaN(i) || (r = `${i * 100}%`), r === "100%" ? t : `color-mix(in oklab, ${t} ${r}, transparent)` } function Tr(t, r) { let i = Number(r); return Number.isNaN(i) || (r = `${i * 100}%`), `oklab(from ${t} l a b / ${r})` } function Z(t, r, i) { if (!r) return t; if (r.kind === "arbitrary") return Q(t, r.value); let e = i.resolve(r.value, ["--opacity"]); return e ? Q(t, e) : nt(r.value) ? Q(t, `${r.value}%`) : null } function te(t, r, i) { let e = null; switch (t.value.value) { case "inherit": { e = "inherit"; break } case "transparent": { e = "transparent"; break } case "current": { e = "currentcolor"; break } default: { e = r.resolve(t.value.value, i); break } }return e ? Z(e, t.modifier, r) : null } var Er = /(\d+)_(\d+)/g; function Rr(t) { let r = new zt; function i(n, d) { function* h(w) { for (let C of t.keysInNamespaces(w)) yield C.replace(Er, (P, $, T) => `${$}.${T}`); } let A = ["1/2", "1/3", "2/3", "1/4", "2/4", "3/4", "1/5", "2/5", "3/5", "4/5", "1/6", "2/6", "3/6", "4/6", "5/6", "1/12", "2/12", "3/12", "4/12", "5/12", "6/12", "7/12", "8/12", "9/12", "10/12", "11/12"]; r.suggest(n, () => { let w = []; for (let C of d()) { if (typeof C == "string") { w.push({ values: [C], modifiers: [] }); continue } let P = [...C.values ?? [], ...h(C.valueThemeKeys ?? [])], $ = [...C.modifiers ?? [], ...h(C.modifierThemeKeys ?? [])]; C.supportsFractions && P.push(...A), C.hasDefaultValue && P.unshift(null), w.push({ supportsNegative: C.supportsNegative, values: P, modifiers: $ }); } return w }); } function e(n, d) { r.static(n, () => d.map(h => typeof h == "function" ? h() : l(h[0], h[1]))); } function o(n, d) { function h({ negative: A }) { return w => { let C = null, P = null; if (w.value) if (w.value.kind === "arbitrary") { if (w.modifier) return; C = w.value.value, P = w.value.dataType; } else { if (C = t.resolve(w.value.fraction ?? w.value.value, d.themeKeys ?? []), C === null && d.supportsFractions && w.value.fraction) { let [$, T] = z(w.value.fraction, "/"); if (!E($) || !E(T)) return; C = `calc(${w.value.fraction} * 100%)`; } if (C === null && A && d.handleNegativeBareValue) { if (C = d.handleNegativeBareValue(w.value), !C?.includes("/") && w.modifier) return; if (C !== null) return d.handle(C, null) } if (C === null && d.handleBareValue && (C = d.handleBareValue(w.value), !C?.includes("/") && w.modifier)) return } else { if (w.modifier) return; C = d.defaultValue !== void 0 ? d.defaultValue : t.resolve(null, d.themeKeys ?? []); } if (C !== null) return d.handle(A ? `calc(${C} * -1)` : C, P) } } d.supportsNegative && r.functional(`-${n}`, h({ negative: true })), r.functional(n, h({ negative: false })), i(n, () => [{ supportsNegative: d.supportsNegative, valueThemeKeys: d.themeKeys ?? [], hasDefaultValue: d.defaultValue !== void 0 && d.defaultValue !== null, supportsFractions: d.supportsFractions }]); } function s(n, d) { r.functional(n, h => { if (!h.value) return; let A = null; if (h.value.kind === "arbitrary" ? (A = h.value.value, A = Z(A, h.modifier, t)) : A = te(h, t, d.themeKeys), A !== null) return d.handle(A) }), i(n, () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: d.themeKeys, modifiers: Array.from({ length: 21 }, (h, A) => `${A * 5}`) }]); } function a(n, d, h, { supportsNegative: A = false, supportsFractions: w = false } = {}) { A && r.static(`-${n}-px`, () => h("-1px")), r.static(`${n}-px`, () => h("1px")), o(n, { themeKeys: d, supportsFractions: w, supportsNegative: A, defaultValue: null, handleBareValue: ({ value: C }) => { let P = t.resolve(null, ["--spacing"]); return !P || !xe(C) ? null : `calc(${P} * ${C})` }, handleNegativeBareValue: ({ value: C }) => { let P = t.resolve(null, ["--spacing"]); return !P || !xe(C) ? null : `calc(${P} * -${C})` }, handle: h }), i(n, () => [{ values: t.get(["--spacing"]) ? at : [], supportsNegative: A, supportsFractions: w, valueThemeKeys: d }]); } e("sr-only", [["position", "absolute"], ["width", "1px"], ["height", "1px"], ["padding", "0"], ["margin", "-1px"], ["overflow", "hidden"], ["clip", "rect(0, 0, 0, 0)"], ["white-space", "nowrap"], ["border-width", "0"]]), e("not-sr-only", [["position", "static"], ["width", "auto"], ["height", "auto"], ["padding", "0"], ["margin", "0"], ["overflow", "visible"], ["clip", "auto"], ["white-space", "normal"]]), e("pointer-events-none", [["pointer-events", "none"]]), e("pointer-events-auto", [["pointer-events", "auto"]]), e("visible", [["visibility", "visible"]]), e("invisible", [["visibility", "hidden"]]), e("collapse", [["visibility", "collapse"]]), e("static", [["position", "static"]]), e("fixed", [["position", "fixed"]]), e("absolute", [["position", "absolute"]]), e("relative", [["position", "relative"]]), e("sticky", [["position", "sticky"]]); for (let [n, d] of [["inset", "inset"], ["inset-x", "inset-inline"], ["inset-y", "inset-block"], ["start", "inset-inline-start"], ["end", "inset-inline-end"], ["top", "top"], ["right", "right"], ["bottom", "bottom"], ["left", "left"]]) e(`${n}-auto`, [[d, "auto"]]), e(`${n}-full`, [[d, "100%"]]), e(`-${n}-full`, [[d, "-100%"]]), a(n, ["--inset", "--spacing"], h => [l(d, h)], { supportsNegative: true, supportsFractions: true }); e("isolate", [["isolation", "isolate"]]), e("isolation-auto", [["isolation", "auto"]]), e("z-auto", [["z-index", "auto"]]), o("z", { supportsNegative: true, handleBareValue: ({ value: n }) => E(n) ? n : null, themeKeys: ["--z-index"], handle: n => [l("z-index", n)] }), i("z", () => [{ supportsNegative: true, values: ["0", "10", "20", "30", "40", "50"], valueThemeKeys: ["--z-index"] }]), e("order-first", [["order", "-9999"]]), e("order-last", [["order", "9999"]]), e("order-none", [["order", "0"]]), o("order", { supportsNegative: true, handleBareValue: ({ value: n }) => E(n) ? n : null, themeKeys: ["--order"], handle: n => [l("order", n)] }), i("order", () => [{ supportsNegative: true, values: Array.from({ length: 12 }, (n, d) => `${d + 1}`), valueThemeKeys: ["--order"] }]), e("col-auto", [["grid-column", "auto"]]), o("col", { supportsNegative: true, handleBareValue: ({ value: n }) => E(n) ? n : null, themeKeys: ["--grid-column"], handle: n => [l("grid-column", n)] }), e("col-span-full", [["grid-column", "1 / -1"]]), o("col-span", { handleBareValue: ({ value: n }) => E(n) ? n : null, handle: n => [l("grid-column", `span ${n} / span ${n}`)] }), e("col-start-auto", [["grid-column-start", "auto"]]), o("col-start", { supportsNegative: true, handleBareValue: ({ value: n }) => E(n) ? n : null, themeKeys: ["--grid-column-start"], handle: n => [l("grid-column-start", n)] }), e("col-end-auto", [["grid-column-end", "auto"]]), o("col-end", { supportsNegative: true, handleBareValue: ({ value: n }) => E(n) ? n : null, themeKeys: ["--grid-column-end"], handle: n => [l("grid-column-end", n)] }), i("col-span", () => [{ values: Array.from({ length: 12 }, (n, d) => `${d + 1}`), valueThemeKeys: [] }]), i("col-start", () => [{ supportsNegative: true, values: Array.from({ length: 13 }, (n, d) => `${d + 1}`), valueThemeKeys: ["--grid-column-start"] }]), i("col-end", () => [{ supportsNegative: true, values: Array.from({ length: 13 }, (n, d) => `${d + 1}`), valueThemeKeys: ["--grid-column-end"] }]), e("row-auto", [["grid-row", "auto"]]), o("row", { supportsNegative: true, handleBareValue: ({ value: n }) => E(n) ? n : null, themeKeys: ["--grid-row"], handle: n => [l("grid-row", n)] }), e("row-span-full", [["grid-row", "1 / -1"]]), o("row-span", { themeKeys: [], handleBareValue: ({ value: n }) => E(n) ? n : null, handle: n => [l("grid-row", `span ${n} / span ${n}`)] }), e("row-start-auto", [["grid-row-start", "auto"]]), o("row-start", { supportsNegative: true, handleBareValue: ({ value: n }) => E(n) ? n : null, themeKeys: ["--grid-row-start"], handle: n => [l("grid-row-start", n)] }), e("row-end-auto", [["grid-row-end", "auto"]]), o("row-end", { supportsNegative: true, handleBareValue: ({ value: n }) => E(n) ? n : null, themeKeys: ["--grid-row-end"], handle: n => [l("grid-row-end", n)] }), i("row-span", () => [{ values: Array.from({ length: 12 }, (n, d) => `${d + 1}`), valueThemeKeys: [] }]), i("row-start", () => [{ supportsNegative: true, values: Array.from({ length: 13 }, (n, d) => `${d + 1}`), valueThemeKeys: ["--grid-row-start"] }]), i("row-end", () => [{ supportsNegative: true, values: Array.from({ length: 13 }, (n, d) => `${d + 1}`), valueThemeKeys: ["--grid-row-end"] }]), e("float-start", [["float", "inline-start"]]), e("float-end", [["float", "inline-end"]]), e("float-right", [["float", "right"]]), e("float-left", [["float", "left"]]), e("float-none", [["float", "none"]]), e("clear-start", [["clear", "inline-start"]]), e("clear-end", [["clear", "inline-end"]]), e("clear-right", [["clear", "right"]]), e("clear-left", [["clear", "left"]]), e("clear-both", [["clear", "both"]]), e("clear-none", [["clear", "none"]]); for (let [n, d] of [["m", "margin"], ["mx", "margin-inline"], ["my", "margin-block"], ["ms", "margin-inline-start"], ["me", "margin-inline-end"], ["mt", "margin-top"], ["mr", "margin-right"], ["mb", "margin-bottom"], ["ml", "margin-left"]]) e(`${n}-auto`, [[d, "auto"]]), a(n, ["--margin", "--spacing"], h => [l(d, h)], { supportsNegative: true }); e("box-border", [["box-sizing", "border-box"]]), e("box-content", [["box-sizing", "content-box"]]), e("line-clamp-none", [["overflow", "visible"], ["display", "block"], ["-webkit-box-orient", "horizontal"], ["-webkit-line-clamp", "unset"]]), o("line-clamp", { themeKeys: ["--line-clamp"], handleBareValue: ({ value: n }) => E(n) ? n : null, handle: n => [l("overflow", "hidden"), l("display", "-webkit-box"), l("-webkit-box-orient", "vertical"), l("-webkit-line-clamp", n)] }), i("line-clamp", () => [{ values: ["1", "2", "3", "4", "5", "6"], valueThemeKeys: ["--line-clamp"] }]), e("block", [["display", "block"]]), e("inline-block", [["display", "inline-block"]]), e("inline", [["display", "inline"]]), e("hidden", [["display", "none"]]), e("inline-flex", [["display", "inline-flex"]]), e("table", [["display", "table"]]), e("inline-table", [["display", "inline-table"]]), e("table-caption", [["display", "table-caption"]]), e("table-cell", [["display", "table-cell"]]), e("table-column", [["display", "table-column"]]), e("table-column-group", [["display", "table-column-group"]]), e("table-footer-group", [["display", "table-footer-group"]]), e("table-header-group", [["display", "table-header-group"]]), e("table-row-group", [["display", "table-row-group"]]), e("table-row", [["display", "table-row"]]), e("flow-root", [["display", "flow-root"]]), e("flex", [["display", "flex"]]), e("grid", [["display", "grid"]]), e("inline-grid", [["display", "inline-grid"]]), e("contents", [["display", "contents"]]), e("list-item", [["display", "list-item"]]), e("field-sizing-content", [["field-sizing", "content"]]), e("field-sizing-fixed", [["field-sizing", "fixed"]]), e("aspect-auto", [["aspect-ratio", "auto"]]), e("aspect-square", [["aspect-ratio", "1 / 1"]]), o("aspect", { themeKeys: ["--aspect"], handleBareValue: ({ fraction: n }) => { if (n === null) return null; let [d, h] = z(n, "/"); return !E(d) || !E(h) ? null : n }, handle: n => [l("aspect-ratio", n)] }); for (let [n, d] of [["full", "100%"], ["svw", "100svw"], ["lvw", "100lvw"], ["dvw", "100dvw"], ["svh", "100svh"], ["lvh", "100lvh"], ["dvh", "100dvh"], ["min", "min-content"], ["max", "max-content"], ["fit", "fit-content"]]) e(`size-${n}`, [["--tw-sort", "size"], ["width", d], ["height", d]]), e(`w-${n}`, [["width", d]]), e(`h-${n}`, [["height", d]]), e(`min-w-${n}`, [["min-width", d]]), e(`min-h-${n}`, [["min-height", d]]), e(`max-w-${n}`, [["max-width", d]]), e(`max-h-${n}`, [["max-height", d]]); e("size-auto", [["--tw-sort", "size"], ["width", "auto"], ["height", "auto"]]), e("w-auto", [["width", "auto"]]), e("h-auto", [["height", "auto"]]), e("min-w-auto", [["min-width", "auto"]]), e("min-h-auto", [["min-height", "auto"]]), e("h-lh", [["height", "1lh"]]), e("min-h-lh", [["min-height", "1lh"]]), e("max-h-lh", [["max-height", "1lh"]]), e("w-screen", [["width", "100vw"]]), e("min-w-screen", [["min-width", "100vw"]]), e("max-w-screen", [["max-width", "100vw"]]), e("h-screen", [["height", "100vh"]]), e("min-h-screen", [["min-height", "100vh"]]), e("max-h-screen", [["max-height", "100vh"]]), e("max-w-none", [["max-width", "none"]]), e("max-h-none", [["max-height", "none"]]), a("size", ["--size", "--spacing"], n => [l("--tw-sort", "size"), l("width", n), l("height", n)], { supportsFractions: true }); for (let [n, d, h] of [["w", ["--width", "--spacing", "--container"], "width"], ["min-w", ["--min-width", "--spacing", "--container"], "min-width"], ["max-w", ["--max-width", "--spacing", "--container"], "max-width"], ["h", ["--height", "--spacing"], "height"], ["min-h", ["--min-height", "--height", "--spacing"], "min-height"], ["max-h", ["--max-height", "--height", "--spacing"], "max-height"]]) a(n, d, A => [l(h, A)], { supportsFractions: true }); r.static("container", () => { let n = [...t.namespace("--breakpoint").values()]; n.sort((h, A) => ye(h, A, "asc")); let d = [l("--tw-sort", "--tw-container-component"), l("width", "100%")]; for (let h of n) d.push(F("@media", `(width >= ${h})`, [l("max-width", h)])); return d }), e("flex-auto", [["flex", "auto"]]), e("flex-initial", [["flex", "0 auto"]]), e("flex-none", [["flex", "none"]]), r.functional("flex", n => { if (n.value) { if (n.value.kind === "arbitrary") return n.modifier ? void 0 : [l("flex", n.value.value)]; if (n.value.fraction) { let [d, h] = z(n.value.fraction, "/"); return !E(d) || !E(h) ? void 0 : [l("flex", `calc(${n.value.fraction} * 100%)`)] } if (E(n.value.value)) return n.modifier ? void 0 : [l("flex", n.value.value)] } }), i("flex", () => [{ supportsFractions: true }]), o("shrink", { defaultValue: "1", handleBareValue: ({ value: n }) => E(n) ? n : null, handle: n => [l("flex-shrink", n)] }), o("grow", { defaultValue: "1", handleBareValue: ({ value: n }) => E(n) ? n : null, handle: n => [l("flex-grow", n)] }), i("shrink", () => [{ values: ["0"], valueThemeKeys: [], hasDefaultValue: true }]), i("grow", () => [{ values: ["0"], valueThemeKeys: [], hasDefaultValue: true }]), e("basis-auto", [["flex-basis", "auto"]]), e("basis-full", [["flex-basis", "100%"]]), a("basis", ["--flex-basis", "--spacing", "--container"], n => [l("flex-basis", n)], { supportsFractions: true }), e("table-auto", [["table-layout", "auto"]]), e("table-fixed", [["table-layout", "fixed"]]), e("caption-top", [["caption-side", "top"]]), e("caption-bottom", [["caption-side", "bottom"]]), e("border-collapse", [["border-collapse", "collapse"]]), e("border-separate", [["border-collapse", "separate"]]); let f = () => j([S("--tw-border-spacing-x", "0", "<length>"), S("--tw-border-spacing-y", "0", "<length>")]); a("border-spacing", ["--border-spacing", "--spacing"], n => [f(), l("--tw-border-spacing-x", n), l("--tw-border-spacing-y", n), l("border-spacing", "var(--tw-border-spacing-x) var(--tw-border-spacing-y)")]), a("border-spacing-x", ["--border-spacing", "--spacing"], n => [f(), l("--tw-border-spacing-x", n), l("border-spacing", "var(--tw-border-spacing-x) var(--tw-border-spacing-y)")]), a("border-spacing-y", ["--border-spacing", "--spacing"], n => [f(), l("--tw-border-spacing-y", n), l("border-spacing", "var(--tw-border-spacing-x) var(--tw-border-spacing-y)")]), e("origin-center", [["transform-origin", "center"]]), e("origin-top", [["transform-origin", "top"]]), e("origin-top-right", [["transform-origin", "top right"]]), e("origin-right", [["transform-origin", "right"]]), e("origin-bottom-right", [["transform-origin", "bottom right"]]), e("origin-bottom", [["transform-origin", "bottom"]]), e("origin-bottom-left", [["transform-origin", "bottom left"]]), e("origin-left", [["transform-origin", "left"]]), e("origin-top-left", [["transform-origin", "top left"]]), o("origin", { themeKeys: ["--transform-origin"], handle: n => [l("transform-origin", n)] }), e("perspective-origin-center", [["perspective-origin", "center"]]), e("perspective-origin-top", [["perspective-origin", "top"]]), e("perspective-origin-top-right", [["perspective-origin", "top right"]]), e("perspective-origin-right", [["perspective-origin", "right"]]), e("perspective-origin-bottom-right", [["perspective-origin", "bottom right"]]), e("perspective-origin-bottom", [["perspective-origin", "bottom"]]), e("perspective-origin-bottom-left", [["perspective-origin", "bottom left"]]), e("perspective-origin-left", [["perspective-origin", "left"]]), e("perspective-origin-top-left", [["perspective-origin", "top left"]]), o("perspective-origin", { themeKeys: ["--perspective-origin"], handle: n => [l("perspective-origin", n)] }), e("perspective-none", [["perspective", "none"]]), o("perspective", { themeKeys: ["--perspective"], handle: n => [l("perspective", n)] }); let u = () => j([S("--tw-translate-x", "0"), S("--tw-translate-y", "0"), S("--tw-translate-z", "0")]); e("translate-none", [["translate", "none"]]), e("-translate-full", [u, ["--tw-translate-x", "-100%"], ["--tw-translate-y", "-100%"], ["translate", "var(--tw-translate-x) var(--tw-translate-y)"]]), e("translate-full", [u, ["--tw-translate-x", "100%"], ["--tw-translate-y", "100%"], ["translate", "var(--tw-translate-x) var(--tw-translate-y)"]]), a("translate", ["--translate", "--spacing"], n => [u(), l("--tw-translate-x", n), l("--tw-translate-y", n), l("translate", "var(--tw-translate-x) var(--tw-translate-y)")], { supportsNegative: true, supportsFractions: true }); for (let n of ["x", "y"]) e(`-translate-${n}-full`, [u, [`--tw-translate-${n}`, "-100%"], ["translate", "var(--tw-translate-x) var(--tw-translate-y)"]]), e(`translate-${n}-full`, [u, [`--tw-translate-${n}`, "100%"], ["translate", "var(--tw-translate-x) var(--tw-translate-y)"]]), a(`translate-${n}`, ["--translate", "--spacing"], d => [u(), l(`--tw-translate-${n}`, d), l("translate", "var(--tw-translate-x) var(--tw-translate-y)")], { supportsNegative: true, supportsFractions: true }); a("translate-z", ["--translate", "--spacing"], n => [u(), l("--tw-translate-z", n), l("translate", "var(--tw-translate-x) var(--tw-translate-y) var(--tw-translate-z)")], { supportsNegative: true }), e("translate-3d", [u, ["translate", "var(--tw-translate-x) var(--tw-translate-y) var(--tw-translate-z)"]]); let c = () => j([S("--tw-scale-x", "1"), S("--tw-scale-y", "1"), S("--tw-scale-z", "1")]); e("scale-none", [["scale", "none"]]); function g({ negative: n }) { return d => { if (!d.value || d.modifier) return; let h; return d.value.kind === "arbitrary" ? (h = d.value.value, h = n ? `calc(${h} * -1)` : h, [l("scale", h)]) : (h = t.resolve(d.value.value, ["--scale"]), !h && E(d.value.value) && (h = `${d.value.value}%`), h ? (h = n ? `calc(${h} * -1)` : h, [c(), l("--tw-scale-x", h), l("--tw-scale-y", h), l("--tw-scale-z", h), l("scale", "var(--tw-scale-x) var(--tw-scale-y)")]) : void 0) } } r.functional("-scale", g({ negative: true })), r.functional("scale", g({ negative: false })), i("scale", () => [{ supportsNegative: true, values: ["0", "50", "75", "90", "95", "100", "105", "110", "125", "150", "200"], valueThemeKeys: ["--scale"] }]); for (let n of ["x", "y", "z"]) o(`scale-${n}`, { supportsNegative: true, themeKeys: ["--scale"], handleBareValue: ({ value: d }) => E(d) ? `${d}%` : null, handle: d => [c(), l(`--tw-scale-${n}`, d), l("scale", `var(--tw-scale-x) var(--tw-scale-y)${n === "z" ? " var(--tw-scale-z)" : ""}`)] }), i(`scale-${n}`, () => [{ supportsNegative: true, values: ["0", "50", "75", "90", "95", "100", "105", "110", "125", "150", "200"], valueThemeKeys: ["--scale"] }]); e("scale-3d", [c, ["scale", "var(--tw-scale-x) var(--tw-scale-y) var(--tw-scale-z)"]]), e("rotate-none", [["rotate", "none"]]); function p({ negative: n }) { return d => { if (!d.value || d.modifier) return; let h; if (d.value.kind === "arbitrary") { h = d.value.value; let A = d.value.dataType ?? Y(h, ["angle", "vector"]); if (A === "vector") return [l("rotate", `${h} var(--tw-rotate)`)]; if (A !== "angle") return [l("rotate", n ? `calc(${h} * -1)` : h)] } else if (h = t.resolve(d.value.value, ["--rotate"]), !h && E(d.value.value) && (h = `${d.value.value}deg`), !h) return; return [l("rotate", n ? `calc(${h} * -1)` : h)] } } r.functional("-rotate", p({ negative: true })), r.functional("rotate", p({ negative: false })), i("rotate", () => [{ supportsNegative: true, values: ["0", "1", "2", "3", "6", "12", "45", "90", "180"], valueThemeKeys: ["--rotate"] }]); { let n = ["var(--tw-rotate-x,)", "var(--tw-rotate-y,)", "var(--tw-rotate-z,)", "var(--tw-skew-x,)", "var(--tw-skew-y,)"].join(" "), d = () => j([S("--tw-rotate-x"), S("--tw-rotate-y"), S("--tw-rotate-z"), S("--tw-skew-x"), S("--tw-skew-y")]); for (let h of ["x", "y", "z"]) o(`rotate-${h}`, { supportsNegative: true, themeKeys: ["--rotate"], handleBareValue: ({ value: A }) => E(A) ? `${A}deg` : null, handle: A => [d(), l(`--tw-rotate-${h}`, `rotate${h.toUpperCase()}(${A})`), l("transform", n)] }), i(`rotate-${h}`, () => [{ supportsNegative: true, values: ["0", "1", "2", "3", "6", "12", "45", "90", "180"], valueThemeKeys: ["--rotate"] }]); o("skew", { supportsNegative: true, themeKeys: ["--skew"], handleBareValue: ({ value: h }) => E(h) ? `${h}deg` : null, handle: h => [d(), l("--tw-skew-x", `skewX(${h})`), l("--tw-skew-y", `skewY(${h})`), l("transform", n)] }), o("skew-x", { supportsNegative: true, themeKeys: ["--skew"], handleBareValue: ({ value: h }) => E(h) ? `${h}deg` : null, handle: h => [d(), l("--tw-skew-x", `skewX(${h})`), l("transform", n)] }), o("skew-y", { supportsNegative: true, themeKeys: ["--skew"], handleBareValue: ({ value: h }) => E(h) ? `${h}deg` : null, handle: h => [d(), l("--tw-skew-y", `skewY(${h})`), l("transform", n)] }), i("skew", () => [{ supportsNegative: true, values: ["0", "1", "2", "3", "6", "12"], valueThemeKeys: ["--skew"] }]), i("skew-x", () => [{ supportsNegative: true, values: ["0", "1", "2", "3", "6", "12"], valueThemeKeys: ["--skew"] }]), i("skew-y", () => [{ supportsNegative: true, values: ["0", "1", "2", "3", "6", "12"], valueThemeKeys: ["--skew"] }]), r.functional("transform", h => { if (h.modifier) return; let A = null; if (h.value ? h.value.kind === "arbitrary" && (A = h.value.value) : A = n, A !== null) return [d(), l("transform", A)] }), i("transform", () => [{ hasDefaultValue: true }]), e("transform-cpu", [["transform", n]]), e("transform-gpu", [["transform", `translateZ(0) ${n}`]]), e("transform-none", [["transform", "none"]]); } e("transform-flat", [["transform-style", "flat"]]), e("transform-3d", [["transform-style", "preserve-3d"]]), e("transform-content", [["transform-box", "content-box"]]), e("transform-border", [["transform-box", "border-box"]]), e("transform-fill", [["transform-box", "fill-box"]]), e("transform-stroke", [["transform-box", "stroke-box"]]), e("transform-view", [["transform-box", "view-box"]]), e("backface-visible", [["backface-visibility", "visible"]]), e("backface-hidden", [["backface-visibility", "hidden"]]); for (let n of ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out"]) e(`cursor-${n}`, [["cursor", n]]); o("cursor", { themeKeys: ["--cursor"], handle: n => [l("cursor", n)] }); for (let n of ["auto", "none", "manipulation"]) e(`touch-${n}`, [["touch-action", n]]); let m = () => j([S("--tw-pan-x"), S("--tw-pan-y"), S("--tw-pinch-zoom")]); for (let n of ["x", "left", "right"]) e(`touch-pan-${n}`, [m, ["--tw-pan-x", `pan-${n}`], ["touch-action", "var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)"]]); for (let n of ["y", "up", "down"]) e(`touch-pan-${n}`, [m, ["--tw-pan-y", `pan-${n}`], ["touch-action", "var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)"]]); e("touch-pinch-zoom", [m, ["--tw-pinch-zoom", "pinch-zoom"], ["touch-action", "var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)"]]); for (let n of ["none", "text", "all", "auto"]) e(`select-${n}`, [["-webkit-user-select", n], ["user-select", n]]); e("resize-none", [["resize", "none"]]), e("resize-x", [["resize", "horizontal"]]), e("resize-y", [["resize", "vertical"]]), e("resize", [["resize", "both"]]), e("snap-none", [["scroll-snap-type", "none"]]); let v = () => j([S("--tw-scroll-snap-strictness", "proximity", "*")]); for (let n of ["x", "y", "both"]) e(`snap-${n}`, [v, ["scroll-snap-type", `${n} var(--tw-scroll-snap-strictness)`]]); e("snap-mandatory", [v, ["--tw-scroll-snap-strictness", "mandatory"]]), e("snap-proximity", [v, ["--tw-scroll-snap-strictness", "proximity"]]), e("snap-align-none", [["scroll-snap-align", "none"]]), e("snap-start", [["scroll-snap-align", "start"]]), e("snap-end", [["scroll-snap-align", "end"]]), e("snap-center", [["scroll-snap-align", "center"]]), e("snap-normal", [["scroll-snap-stop", "normal"]]), e("snap-always", [["scroll-snap-stop", "always"]]); for (let [n, d] of [["scroll-m", "scroll-margin"], ["scroll-mx", "scroll-margin-inline"], ["scroll-my", "scroll-margin-block"], ["scroll-ms", "scroll-margin-inline-start"], ["scroll-me", "scroll-margin-inline-end"], ["scroll-mt", "scroll-margin-top"], ["scroll-mr", "scroll-margin-right"], ["scroll-mb", "scroll-margin-bottom"], ["scroll-ml", "scroll-margin-left"]]) a(n, ["--scroll-margin", "--spacing"], h => [l(d, h)], { supportsNegative: true }); for (let [n, d] of [["scroll-p", "scroll-padding"], ["scroll-px", "scroll-padding-inline"], ["scroll-py", "scroll-padding-block"], ["scroll-ps", "scroll-padding-inline-start"], ["scroll-pe", "scroll-padding-inline-end"], ["scroll-pt", "scroll-padding-top"], ["scroll-pr", "scroll-padding-right"], ["scroll-pb", "scroll-padding-bottom"], ["scroll-pl", "scroll-padding-left"]]) a(n, ["--scroll-padding", "--spacing"], h => [l(d, h)]); e("list-inside", [["list-style-position", "inside"]]), e("list-outside", [["list-style-position", "outside"]]), e("list-none", [["list-style-type", "none"]]), e("list-disc", [["list-style-type", "disc"]]), e("list-decimal", [["list-style-type", "decimal"]]), o("list", { themeKeys: ["--list-style-type"], handle: n => [l("list-style-type", n)] }), e("list-image-none", [["list-style-image", "none"]]), o("list-image", { themeKeys: ["--list-style-image"], handle: n => [l("list-style-image", n)] }), e("appearance-none", [["appearance", "none"]]), e("appearance-auto", [["appearance", "auto"]]), e("scheme-normal", [["color-scheme", "normal"]]), e("scheme-dark", [["color-scheme", "dark"]]), e("scheme-light", [["color-scheme", "light"]]), e("scheme-light-dark", [["color-scheme", "light dark"]]), e("scheme-only-dark", [["color-scheme", "only dark"]]), e("scheme-only-light", [["color-scheme", "only light"]]), e("columns-auto", [["columns", "auto"]]), o("columns", { themeKeys: ["--columns", "--container"], handleBareValue: ({ value: n }) => E(n) ? n : null, handle: n => [l("columns", n)] }), i("columns", () => [{ values: Array.from({ length: 12 }, (n, d) => `${d + 1}`), valueThemeKeys: ["--columns", "--container"] }]); for (let n of ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"]) e(`break-before-${n}`, [["break-before", n]]); for (let n of ["auto", "avoid", "avoid-page", "avoid-column"]) e(`break-inside-${n}`, [["break-inside", n]]); for (let n of ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"]) e(`break-after-${n}`, [["break-after", n]]); e("grid-flow-row", [["grid-auto-flow", "row"]]), e("grid-flow-col", [["grid-auto-flow", "column"]]), e("grid-flow-dense", [["grid-auto-flow", "dense"]]), e("grid-flow-row-dense", [["grid-auto-flow", "row dense"]]), e("grid-flow-col-dense", [["grid-auto-flow", "column dense"]]), e("auto-cols-auto", [["grid-auto-columns", "auto"]]), e("auto-cols-min", [["grid-auto-columns", "min-content"]]), e("auto-cols-max", [["grid-auto-columns", "max-content"]]), e("auto-cols-fr", [["grid-auto-columns", "minmax(0, 1fr)"]]), o("auto-cols", { themeKeys: ["--grid-auto-columns"], handle: n => [l("grid-auto-columns", n)] }), e("auto-rows-auto", [["grid-auto-rows", "auto"]]), e("auto-rows-min", [["grid-auto-rows", "min-content"]]), e("auto-rows-max", [["grid-auto-rows", "max-content"]]), e("auto-rows-fr", [["grid-auto-rows", "minmax(0, 1fr)"]]), o("auto-rows", { themeKeys: ["--grid-auto-rows"], handle: n => [l("grid-auto-rows", n)] }), e("grid-cols-none", [["grid-template-columns", "none"]]), e("grid-cols-subgrid", [["grid-template-columns", "subgrid"]]), o("grid-cols", { themeKeys: ["--grid-template-columns"], handleBareValue: ({ value: n }) => _t(n) ? `repeat(${n}, minmax(0, 1fr))` : null, handle: n => [l("grid-template-columns", n)] }), e("grid-rows-none", [["grid-template-rows", "none"]]), e("grid-rows-subgrid", [["grid-template-rows", "subgrid"]]), o("grid-rows", { themeKeys: ["--grid-template-rows"], handleBareValue: ({ value: n }) => _t(n) ? `repeat(${n}, minmax(0, 1fr))` : null, handle: n => [l("grid-template-rows", n)] }), i("grid-cols", () => [{ values: Array.from({ length: 12 }, (n, d) => `${d + 1}`), valueThemeKeys: ["--grid-template-columns"] }]), i("grid-rows", () => [{ values: Array.from({ length: 12 }, (n, d) => `${d + 1}`), valueThemeKeys: ["--grid-template-rows"] }]), e("flex-row", [["flex-direction", "row"]]), e("flex-row-reverse", [["flex-direction", "row-reverse"]]), e("flex-col", [["flex-direction", "column"]]), e("flex-col-reverse", [["flex-direction", "column-reverse"]]), e("flex-wrap", [["flex-wrap", "wrap"]]), e("flex-nowrap", [["flex-wrap", "nowrap"]]), e("flex-wrap-reverse", [["flex-wrap", "wrap-reverse"]]), e("place-content-center", [["place-content", "center"]]), e("place-content-start", [["place-content", "start"]]), e("place-content-end", [["place-content", "end"]]), e("place-content-center-safe", [["place-content", "safe center"]]), e("place-content-end-safe", [["place-content", "safe end"]]), e("place-content-between", [["place-content", "space-between"]]), e("place-content-around", [["place-content", "space-around"]]), e("place-content-evenly", [["place-content", "space-evenly"]]), e("place-content-baseline", [["place-content", "baseline"]]), e("place-content-stretch", [["place-content", "stretch"]]), e("place-items-center", [["place-items", "center"]]), e("place-items-start", [["place-items", "start"]]), e("place-items-end", [["place-items", "end"]]), e("place-items-center-safe", [["place-items", "safe center"]]), e("place-items-end-safe", [["place-items", "safe end"]]), e("place-items-baseline", [["place-items", "baseline"]]), e("place-items-stretch", [["place-items", "stretch"]]), e("content-normal", [["align-content", "normal"]]), e("content-center", [["align-content", "center"]]), e("content-start", [["align-content", "flex-start"]]), e("content-end", [["align-content", "flex-end"]]), e("content-center-safe", [["align-content", "safe center"]]), e("content-end-safe", [["align-content", "safe flex-end"]]), e("content-between", [["align-content", "space-between"]]), e("content-around", [["align-content", "space-around"]]), e("content-evenly", [["align-content", "space-evenly"]]), e("content-baseline", [["align-content", "baseline"]]), e("content-stretch", [["align-content", "stretch"]]), e("items-center", [["align-items", "center"]]), e("items-start", [["align-items", "flex-start"]]), e("items-end", [["align-items", "flex-end"]]), e("items-center-safe", [["align-items", "safe center"]]), e("items-end-safe", [["align-items", "safe flex-end"]]), e("items-baseline", [["align-items", "baseline"]]), e("items-baseline-last", [["align-items", "last baseline"]]), e("items-stretch", [["align-items", "stretch"]]), e("justify-normal", [["justify-content", "normal"]]), e("justify-center", [["justify-content", "center"]]), e("justify-start", [["justify-content", "flex-start"]]), e("justify-end", [["justify-content", "flex-end"]]), e("justify-center-safe", [["justify-content", "safe center"]]), e("justify-end-safe", [["justify-content", "safe flex-end"]]), e("justify-between", [["justify-content", "space-between"]]), e("justify-around", [["justify-content", "space-around"]]), e("justify-evenly", [["justify-content", "space-evenly"]]), e("justify-baseline", [["justify-content", "baseline"]]), e("justify-stretch", [["justify-content", "stretch"]]), e("justify-items-normal", [["justify-items", "normal"]]), e("justify-items-center", [["justify-items", "center"]]), e("justify-items-start", [["justify-items", "start"]]), e("justify-items-end", [["justify-items", "end"]]), e("justify-items-center-safe", [["justify-items", "safe center"]]), e("justify-items-end-safe", [["justify-items", "safe end"]]), e("justify-items-stretch", [["justify-items", "stretch"]]), a("gap", ["--gap", "--spacing"], n => [l("gap", n)]), a("gap-x", ["--gap", "--spacing"], n => [l("column-gap", n)]), a("gap-y", ["--gap", "--spacing"], n => [l("row-gap", n)]), a("space-x", ["--space", "--spacing"], n => [j([S("--tw-space-x-reverse", "0")]), M(":where(& > :not(:last-child))", [l("--tw-sort", "row-gap"), l("--tw-space-x-reverse", "0"), l("margin-inline-start", `calc(${n} * var(--tw-space-x-reverse))`), l("margin-inline-end", `calc(${n} * calc(1 - var(--tw-space-x-reverse)))`)])], { supportsNegative: true }), a("space-y", ["--space", "--spacing"], n => [j([S("--tw-space-y-reverse", "0")]), M(":where(& > :not(:last-child))", [l("--tw-sort", "column-gap"), l("--tw-space-y-reverse", "0"), l("margin-block-start", `calc(${n} * var(--tw-space-y-reverse))`), l("margin-block-end", `calc(${n} * calc(1 - var(--tw-space-y-reverse)))`)])], { supportsNegative: true }), e("space-x-reverse", [() => j([S("--tw-space-x-reverse", "0")]), () => M(":where(& > :not(:last-child))", [l("--tw-sort", "row-gap"), l("--tw-space-x-reverse", "1")])]), e("space-y-reverse", [() => j([S("--tw-space-y-reverse", "0")]), () => M(":where(& > :not(:last-child))", [l("--tw-sort", "column-gap"), l("--tw-space-y-reverse", "1")])]), e("accent-auto", [["accent-color", "auto"]]), s("accent", { themeKeys: ["--accent-color", "--color"], handle: n => [l("accent-color", n)] }), s("caret", { themeKeys: ["--caret-color", "--color"], handle: n => [l("caret-color", n)] }), s("divide", { themeKeys: ["--divide-color", "--color"], handle: n => [M(":where(& > :not(:last-child))", [l("--tw-sort", "divide-color"), l("border-color", n)])] }), e("place-self-auto", [["place-self", "auto"]]), e("place-self-start", [["place-self", "start"]]), e("place-self-end", [["place-self", "end"]]), e("place-self-center", [["place-self", "center"]]), e("place-self-end-safe", [["place-self", "safe end"]]), e("place-self-center-safe", [["place-self", "safe center"]]), e("place-self-stretch", [["place-self", "stretch"]]), e("self-auto", [["align-self", "auto"]]), e("self-start", [["align-self", "flex-start"]]), e("self-end", [["align-self", "flex-end"]]), e("self-center", [["align-self", "center"]]), e("self-end-safe", [["align-self", "safe flex-end"]]), e("self-center-safe", [["align-self", "safe center"]]), e("self-stretch", [["align-self", "stretch"]]), e("self-baseline", [["align-self", "baseline"]]), e("self-baseline-last", [["align-self", "last baseline"]]), e("justify-self-auto", [["justify-self", "auto"]]), e("justify-self-start", [["justify-self", "flex-start"]]), e("justify-self-end", [["justify-self", "flex-end"]]), e("justify-self-center", [["justify-self", "center"]]), e("justify-self-end-safe", [["justify-self", "safe flex-end"]]), e("justify-self-center-safe", [["justify-self", "safe center"]]), e("justify-self-stretch", [["justify-self", "stretch"]]); for (let n of ["auto", "hidden", "clip", "visible", "scroll"]) e(`overflow-${n}`, [["overflow", n]]), e(`overflow-x-${n}`, [["overflow-x", n]]), e(`overflow-y-${n}`, [["overflow-y", n]]); for (let n of ["auto", "contain", "none"]) e(`overscroll-${n}`, [["overscroll-behavior", n]]), e(`overscroll-x-${n}`, [["overscroll-behavior-x", n]]), e(`overscroll-y-${n}`, [["overscroll-behavior-y", n]]); e("scroll-auto", [["scroll-behavior", "auto"]]), e("scroll-smooth", [["scroll-behavior", "smooth"]]), e("truncate", [["overflow", "hidden"], ["text-overflow", "ellipsis"], ["white-space", "nowrap"]]), e("text-ellipsis", [["text-overflow", "ellipsis"]]), e("text-clip", [["text-overflow", "clip"]]), e("hyphens-none", [["-webkit-hyphens", "none"], ["hyphens", "none"]]), e("hyphens-manual", [["-webkit-hyphens", "manual"], ["hyphens", "manual"]]), e("hyphens-auto", [["-webkit-hyphens", "auto"], ["hyphens", "auto"]]), e("whitespace-normal", [["white-space", "normal"]]), e("whitespace-nowrap", [["white-space", "nowrap"]]), e("whitespace-pre", [["white-space", "pre"]]), e("whitespace-pre-line", [["white-space", "pre-line"]]), e("whitespace-pre-wrap", [["white-space", "pre-wrap"]]), e("whitespace-break-spaces", [["white-space", "break-spaces"]]), e("text-wrap", [["text-wrap", "wrap"]]), e("text-nowrap", [["text-wrap", "nowrap"]]), e("text-balance", [["text-wrap", "balance"]]), e("text-pretty", [["text-wrap", "pretty"]]), e("break-normal", [["overflow-wrap", "normal"], ["word-break", "normal"]]), e("break-words", [["overflow-wrap", "break-word"]]), e("break-all", [["word-break", "break-all"]]), e("break-keep", [["word-break", "keep-all"]]), e("wrap-anywhere", [["overflow-wrap", "anywhere"]]), e("wrap-break-word", [["overflow-wrap", "break-word"]]), e("wrap-normal", [["overflow-wrap", "normal"]]); for (let [n, d] of [["rounded", ["border-radius"]], ["rounded-s", ["border-start-start-radius", "border-end-start-radius"]], ["rounded-e", ["border-start-end-radius", "border-end-end-radius"]], ["rounded-t", ["border-top-left-radius", "border-top-right-radius"]], ["rounded-r", ["border-top-right-radius", "border-bottom-right-radius"]], ["rounded-b", ["border-bottom-right-radius", "border-bottom-left-radius"]], ["rounded-l", ["border-top-left-radius", "border-bottom-left-radius"]], ["rounded-ss", ["border-start-start-radius"]], ["rounded-se", ["border-start-end-radius"]], ["rounded-ee", ["border-end-end-radius"]], ["rounded-es", ["border-end-start-radius"]], ["rounded-tl", ["border-top-left-radius"]], ["rounded-tr", ["border-top-right-radius"]], ["rounded-br", ["border-bottom-right-radius"]], ["rounded-bl", ["border-bottom-left-radius"]]]) e(`${n}-none`, d.map(h => [h, "0"])), e(`${n}-full`, d.map(h => [h, "calc(infinity * 1px)"])), o(n, { themeKeys: ["--radius"], handle: h => d.map(A => l(A, h)) }); e("border-solid", [["--tw-border-style", "solid"], ["border-style", "solid"]]), e("border-dashed", [["--tw-border-style", "dashed"], ["border-style", "dashed"]]), e("border-dotted", [["--tw-border-style", "dotted"], ["border-style", "dotted"]]), e("border-double", [["--tw-border-style", "double"], ["border-style", "double"]]), e("border-hidden", [["--tw-border-style", "hidden"], ["border-style", "hidden"]]), e("border-none", [["--tw-border-style", "none"], ["border-style", "none"]]); { let d = function (h, A) { r.functional(h, w => { if (!w.value) { if (w.modifier) return; let C = t.get(["--default-border-width"]) ?? "1px", P = A.width(C); return P ? [n(), ...P] : void 0 } if (w.value.kind === "arbitrary") { let C = w.value.value; switch (w.value.dataType ?? Y(C, ["color", "line-width", "length"])) { case "line-width": case "length": { if (w.modifier) return; let $ = A.width(C); return $ ? [n(), ...$] : void 0 } default: return C = Z(C, w.modifier, t), C === null ? void 0 : A.color(C) } } { let C = te(w, t, ["--border-color", "--color"]); if (C) return A.color(C) } { if (w.modifier) return; let C = t.resolve(w.value.value, ["--border-width"]); if (C) { let P = A.width(C); return P ? [n(), ...P] : void 0 } if (E(w.value.value)) { let P = A.width(`${w.value.value}px`); return P ? [n(), ...P] : void 0 } } }), i(h, () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--border-color", "--color"], modifiers: Array.from({ length: 21 }, (w, C) => `${C * 5}`), hasDefaultValue: true }, { values: ["0", "2", "4", "8"], valueThemeKeys: ["--border-width"] }]); }; let n = () => j([S("--tw-border-style", "solid")]); d("border", { width: h => [l("border-style", "var(--tw-border-style)"), l("border-width", h)], color: h => [l("border-color", h)] }), d("border-x", { width: h => [l("border-inline-style", "var(--tw-border-style)"), l("border-inline-width", h)], color: h => [l("border-inline-color", h)] }), d("border-y", { width: h => [l("border-block-style", "var(--tw-border-style)"), l("border-block-width", h)], color: h => [l("border-block-color", h)] }), d("border-s", { width: h => [l("border-inline-start-style", "var(--tw-border-style)"), l("border-inline-start-width", h)], color: h => [l("border-inline-start-color", h)] }), d("border-e", { width: h => [l("border-inline-end-style", "var(--tw-border-style)"), l("border-inline-end-width", h)], color: h => [l("border-inline-end-color", h)] }), d("border-t", { width: h => [l("border-top-style", "var(--tw-border-style)"), l("border-top-width", h)], color: h => [l("border-top-color", h)] }), d("border-r", { width: h => [l("border-right-style", "var(--tw-border-style)"), l("border-right-width", h)], color: h => [l("border-right-color", h)] }), d("border-b", { width: h => [l("border-bottom-style", "var(--tw-border-style)"), l("border-bottom-width", h)], color: h => [l("border-bottom-color", h)] }), d("border-l", { width: h => [l("border-left-style", "var(--tw-border-style)"), l("border-left-width", h)], color: h => [l("border-left-color", h)] }), o("divide-x", { defaultValue: t.get(["--default-border-width"]) ?? "1px", themeKeys: ["--divide-width", "--border-width"], handleBareValue: ({ value: h }) => E(h) ? `${h}px` : null, handle: h => [j([S("--tw-divide-x-reverse", "0")]), M(":where(& > :not(:last-child))", [l("--tw-sort", "divide-x-width"), n(), l("--tw-divide-x-reverse", "0"), l("border-inline-style", "var(--tw-border-style)"), l("border-inline-start-width", `calc(${h} * var(--tw-divide-x-reverse))`), l("border-inline-end-width", `calc(${h} * calc(1 - var(--tw-divide-x-reverse)))`)])] }), o("divide-y", { defaultValue: t.get(["--default-border-width"]) ?? "1px", themeKeys: ["--divide-width", "--border-width"], handleBareValue: ({ value: h }) => E(h) ? `${h}px` : null, handle: h => [j([S("--tw-divide-y-reverse", "0")]), M(":where(& > :not(:last-child))", [l("--tw-sort", "divide-y-width"), n(), l("--tw-divide-y-reverse", "0"), l("border-bottom-style", "var(--tw-border-style)"), l("border-top-style", "var(--tw-border-style)"), l("border-top-width", `calc(${h} * var(--tw-divide-y-reverse))`), l("border-bottom-width", `calc(${h} * calc(1 - var(--tw-divide-y-reverse)))`)])] }), i("divide-x", () => [{ values: ["0", "2", "4", "8"], valueThemeKeys: ["--divide-width", "--border-width"], hasDefaultValue: true }]), i("divide-y", () => [{ values: ["0", "2", "4", "8"], valueThemeKeys: ["--divide-width", "--border-width"], hasDefaultValue: true }]), e("divide-x-reverse", [() => j([S("--tw-divide-x-reverse", "0")]), () => M(":where(& > :not(:last-child))", [l("--tw-divide-x-reverse", "1")])]), e("divide-y-reverse", [() => j([S("--tw-divide-y-reverse", "0")]), () => M(":where(& > :not(:last-child))", [l("--tw-divide-y-reverse", "1")])]); for (let h of ["solid", "dashed", "dotted", "double", "none"]) e(`divide-${h}`, [() => M(":where(& > :not(:last-child))", [l("--tw-sort", "divide-style"), l("--tw-border-style", h), l("border-style", h)])]); } e("bg-auto", [["background-size", "auto"]]), e("bg-cover", [["background-size", "cover"]]), e("bg-contain", [["background-size", "contain"]]), o("bg-size", { handle(n) { if (n) return [l("background-size", n)] } }), e("bg-fixed", [["background-attachment", "fixed"]]), e("bg-local", [["background-attachment", "local"]]), e("bg-scroll", [["background-attachment", "scroll"]]), e("bg-top", [["background-position", "top"]]), e("bg-top-left", [["background-position", "left top"]]), e("bg-top-right", [["background-position", "right top"]]), e("bg-bottom", [["background-position", "bottom"]]), e("bg-bottom-left", [["background-position", "left bottom"]]), e("bg-bottom-right", [["background-position", "right bottom"]]), e("bg-left", [["background-position", "left"]]), e("bg-right", [["background-position", "right"]]), e("bg-center", [["background-position", "center"]]), o("bg-position", { handle(n) { if (n) return [l("background-position", n)] } }), e("bg-repeat", [["background-repeat", "repeat"]]), e("bg-no-repeat", [["background-repeat", "no-repeat"]]), e("bg-repeat-x", [["background-repeat", "repeat-x"]]), e("bg-repeat-y", [["background-repeat", "repeat-y"]]), e("bg-repeat-round", [["background-repeat", "round"]]), e("bg-repeat-space", [["background-repeat", "space"]]), e("bg-none", [["background-image", "none"]]); { let h = function (C) { let P = "in oklab"; if (C?.kind === "named") switch (C.value) { case "longer": case "shorter": case "increasing": case "decreasing": P = `in oklch ${C.value} hue`; break; default: P = `in ${C.value}`; } else C?.kind === "arbitrary" && (P = C.value); return P }, A = function ({ negative: C }) { return P => { if (!P.value) return; if (P.value.kind === "arbitrary") { if (P.modifier) return; let K = P.value.value; switch (P.value.dataType ?? Y(K, ["angle"])) { case "angle": return K = C ? `calc(${K} * -1)` : `${K}`, [l("--tw-gradient-position", K), l("background-image", `linear-gradient(var(--tw-gradient-stops,${K}))`)]; default: return C ? void 0 : [l("--tw-gradient-position", K), l("background-image", `linear-gradient(var(--tw-gradient-stops,${K}))`)] } } let $ = P.value.value; if (!C && d.has($)) $ = d.get($); else if (E($)) $ = C ? `calc(${$}deg * -1)` : `${$}deg`; else return; let T = h(P.modifier); return [l("--tw-gradient-position", `${$}`), G("@supports (background-image: linear-gradient(in lab, red, red))", [l("--tw-gradient-position", `${$} ${T}`)]), l("background-image", "linear-gradient(var(--tw-gradient-stops))")] } }, w = function ({ negative: C }) { return P => { if (P.value?.kind === "arbitrary") { if (P.modifier) return; let K = P.value.value; return [l("--tw-gradient-position", K), l("background-image", `conic-gradient(var(--tw-gradient-stops,${K}))`)] } let $ = h(P.modifier); if (!P.value) return [l("--tw-gradient-position", $), l("background-image", "conic-gradient(var(--tw-gradient-stops))")]; let T = P.value.value; if (E(T)) return T = C ? `calc(${T}deg * -1)` : `${T}deg`, [l("--tw-gradient-position", `from ${T} ${$}`), l("background-image", "conic-gradient(var(--tw-gradient-stops))")] } }; let n = ["oklab", "oklch", "srgb", "hsl", "longer", "shorter", "increasing", "decreasing"], d = new Map([["to-t", "to top"], ["to-tr", "to top right"], ["to-r", "to right"], ["to-br", "to bottom right"], ["to-b", "to bottom"], ["to-bl", "to bottom left"], ["to-l", "to left"], ["to-tl", "to top left"]]); r.functional("-bg-linear", A({ negative: true })), r.functional("bg-linear", A({ negative: false })), i("bg-linear", () => [{ values: [...d.keys()], modifiers: n }, { values: ["0", "30", "60", "90", "120", "150", "180", "210", "240", "270", "300", "330"], supportsNegative: true, modifiers: n }]), r.functional("-bg-conic", w({ negative: true })), r.functional("bg-conic", w({ negative: false })), i("bg-conic", () => [{ hasDefaultValue: true, modifiers: n }, { values: ["0", "30", "60", "90", "120", "150", "180", "210", "240", "270", "300", "330"], supportsNegative: true, modifiers: n }]), r.functional("bg-radial", C => { if (!C.value) { let P = h(C.modifier); return [l("--tw-gradient-position", P), l("background-image", "radial-gradient(var(--tw-gradient-stops))")] } if (C.value.kind === "arbitrary") { if (C.modifier) return; let P = C.value.value; return [l("--tw-gradient-position", P), l("background-image", `radial-gradient(var(--tw-gradient-stops,${P}))`)] } }), i("bg-radial", () => [{ hasDefaultValue: true, modifiers: n }]); } r.functional("bg", n => { if (n.value) { if (n.value.kind === "arbitrary") { let d = n.value.value; switch (n.value.dataType ?? Y(d, ["image", "color", "percentage", "position", "bg-size", "length", "url"])) { case "percentage": case "position": return n.modifier ? void 0 : [l("background-position", d)]; case "bg-size": case "length": case "size": return n.modifier ? void 0 : [l("background-size", d)]; case "image": case "url": return n.modifier ? void 0 : [l("background-image", d)]; default: return d = Z(d, n.modifier, t), d === null ? void 0 : [l("background-color", d)] } } { let d = te(n, t, ["--background-color", "--color"]); if (d) return [l("background-color", d)] } { if (n.modifier) return; let d = t.resolve(n.value.value, ["--background-image"]); if (d) return [l("background-image", d)] } } }), i("bg", () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--background-color", "--color"], modifiers: Array.from({ length: 21 }, (n, d) => `${d * 5}`) }, { values: [], valueThemeKeys: ["--background-image"] }]); let k = () => j([S("--tw-gradient-position"), S("--tw-gradient-from", "#0000", "<color>"), S("--tw-gradient-via", "#0000", "<color>"), S("--tw-gradient-to", "#0000", "<color>"), S("--tw-gradient-stops"), S("--tw-gradient-via-stops"), S("--tw-gradient-from-position", "0%", "<length-percentage>"), S("--tw-gradient-via-position", "50%", "<length-percentage>"), S("--tw-gradient-to-position", "100%", "<length-percentage>")]); function x(n, d) { r.functional(n, h => { if (h.value) { if (h.value.kind === "arbitrary") { let A = h.value.value; switch (h.value.dataType ?? Y(A, ["color", "length", "percentage"])) { case "length": case "percentage": return h.modifier ? void 0 : d.position(A); default: return A = Z(A, h.modifier, t), A === null ? void 0 : d.color(A) } } { let A = te(h, t, ["--background-color", "--color"]); if (A) return d.color(A) } { if (h.modifier) return; let A = t.resolve(h.value.value, ["--gradient-color-stop-positions"]); if (A) return d.position(A); if (h.value.value[h.value.value.length - 1] === "%" && E(h.value.value.slice(0, -1))) return d.position(h.value.value) } } }), i(n, () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--background-color", "--color"], modifiers: Array.from({ length: 21 }, (h, A) => `${A * 5}`) }, { values: Array.from({ length: 21 }, (h, A) => `${A * 5}%`), valueThemeKeys: ["--gradient-color-stop-positions"] }]); } x("from", { color: n => [k(), l("--tw-sort", "--tw-gradient-from"), l("--tw-gradient-from", n), l("--tw-gradient-stops", "var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))")], position: n => [k(), l("--tw-gradient-from-position", n)] }), e("via-none", [["--tw-gradient-via-stops", "initial"]]), x("via", { color: n => [k(), l("--tw-sort", "--tw-gradient-via"), l("--tw-gradient-via", n), l("--tw-gradient-via-stops", "var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position)"), l("--tw-gradient-stops", "var(--tw-gradient-via-stops)")], position: n => [k(), l("--tw-gradient-via-position", n)] }), x("to", { color: n => [k(), l("--tw-sort", "--tw-gradient-to"), l("--tw-gradient-to", n), l("--tw-gradient-stops", "var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))")], position: n => [k(), l("--tw-gradient-to-position", n)] }), e("mask-none", [["mask-image", "none"]]), r.functional("mask", n => { if (!n.value || n.modifier || n.value.kind !== "arbitrary") return; let d = n.value.value; switch (n.value.dataType ?? Y(d, ["image", "percentage", "position", "bg-size", "length", "url"])) { case "percentage": case "position": return n.modifier ? void 0 : [l("mask-position", d)]; case "bg-size": case "length": case "size": return [l("mask-size", d)]; case "image": case "url": default: return [l("mask-image", d)] } }), e("mask-add", [["mask-composite", "add"]]), e("mask-subtract", [["mask-composite", "subtract"]]), e("mask-intersect", [["mask-composite", "intersect"]]), e("mask-exclude", [["mask-composite", "exclude"]]), e("mask-alpha", [["mask-mode", "alpha"]]), e("mask-luminance", [["mask-mode", "luminance"]]), e("mask-match", [["mask-mode", "match-source"]]), e("mask-type-alpha", [["mask-type", "alpha"]]), e("mask-type-luminance", [["mask-type", "luminance"]]), e("mask-auto", [["mask-size", "auto"]]), e("mask-cover", [["mask-size", "cover"]]), e("mask-contain", [["mask-size", "contain"]]), o("mask-size", { handle(n) { if (n) return [l("mask-size", n)] } }), e("mask-top", [["mask-position", "top"]]), e("mask-top-left", [["mask-position", "left top"]]), e("mask-top-right", [["mask-position", "right top"]]), e("mask-bottom", [["mask-position", "bottom"]]), e("mask-bottom-left", [["mask-position", "left bottom"]]), e("mask-bottom-right", [["mask-position", "right bottom"]]), e("mask-left", [["mask-position", "left"]]), e("mask-right", [["mask-position", "right"]]), e("mask-center", [["mask-position", "center"]]), o("mask-position", { handle(n) { if (n) return [l("mask-position", n)] } }), e("mask-repeat", [["mask-repeat", "repeat"]]), e("mask-no-repeat", [["mask-repeat", "no-repeat"]]), e("mask-repeat-x", [["mask-repeat", "repeat-x"]]), e("mask-repeat-y", [["mask-repeat", "repeat-y"]]), e("mask-repeat-round", [["mask-repeat", "round"]]), e("mask-repeat-space", [["mask-repeat", "space"]]), e("mask-clip-border", [["mask-clip", "border-box"]]), e("mask-clip-padding", [["mask-clip", "padding-box"]]), e("mask-clip-content", [["mask-clip", "content-box"]]), e("mask-clip-fill", [["mask-clip", "fill-box"]]), e("mask-clip-stroke", [["mask-clip", "stroke-box"]]), e("mask-clip-view", [["mask-clip", "view-box"]]), e("mask-no-clip", [["mask-clip", "no-clip"]]), e("mask-origin-border", [["mask-origin", "border-box"]]), e("mask-origin-padding", [["mask-origin", "padding-box"]]), e("mask-origin-content", [["mask-origin", "content-box"]]), e("mask-origin-fill", [["mask-origin", "fill-box"]]), e("mask-origin-stroke", [["mask-origin", "stroke-box"]]), e("mask-origin-view", [["mask-origin", "view-box"]]); let y = () => j([S("--tw-mask-linear", "linear-gradient(#fff, #fff)"), S("--tw-mask-radial", "linear-gradient(#fff, #fff)"), S("--tw-mask-conic", "linear-gradient(#fff, #fff)")]); function N(n, d) { r.functional(n, h => { if (h.value) { if (h.value.kind === "arbitrary") { let A = h.value.value; switch (h.value.dataType ?? Y(A, ["length", "percentage", "color"])) { case "color": return A = Z(A, h.modifier, t), A === null ? void 0 : d.color(A); case "percentage": return h.modifier || !E(A.slice(0, -1)) ? void 0 : d.position(A); default: return h.modifier ? void 0 : d.position(A) } } { let A = te(h, t, ["--background-color", "--color"]); if (A) return d.color(A) } { if (h.modifier) return; let A = Y(h.value.value, ["number", "percentage"]); if (!A) return; switch (A) { case "number": { let w = t.resolve(null, ["--spacing"]); return !w || !xe(h.value.value) ? void 0 : d.position(`calc(${w} * ${h.value.value})`) } case "percentage": return E(h.value.value.slice(0, -1)) ? d.position(h.value.value) : void 0; default: return } } } }), i(n, () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--background-color", "--color"], modifiers: Array.from({ length: 21 }, (h, A) => `${A * 5}`) }, { values: Array.from({ length: 21 }, (h, A) => `${A * 5}%`), valueThemeKeys: ["--gradient-color-stop-positions"] }]), i(n, () => [{ values: Array.from({ length: 21 }, (h, A) => `${A * 5}%`) }, { values: t.get(["--spacing"]) ? at : [] }, { values: ["current", "inherit", "transparent"], valueThemeKeys: ["--background-color", "--color"], modifiers: Array.from({ length: 21 }, (h, A) => `${A * 5}`) }]); } let b = () => j([S("--tw-mask-left", "linear-gradient(#fff, #fff)"), S("--tw-mask-right", "linear-gradient(#fff, #fff)"), S("--tw-mask-bottom", "linear-gradient(#fff, #fff)"), S("--tw-mask-top", "linear-gradient(#fff, #fff)")]); function V(n, d, h) { N(n, { color(A) { let w = [y(), b(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-linear", "var(--tw-mask-left), var(--tw-mask-right), var(--tw-mask-bottom), var(--tw-mask-top)")]; for (let C of ["top", "right", "bottom", "left"]) h[C] && (w.push(l(`--tw-mask-${C}`, `linear-gradient(to ${C}, var(--tw-mask-${C}-from-color) var(--tw-mask-${C}-from-position), var(--tw-mask-${C}-to-color) var(--tw-mask-${C}-to-position))`)), w.push(j([S(`--tw-mask-${C}-from-position`, "0%"), S(`--tw-mask-${C}-to-position`, "100%"), S(`--tw-mask-${C}-from-color`, "black"), S(`--tw-mask-${C}-to-color`, "transparent")])), w.push(l(`--tw-mask-${C}-${d}-color`, A))); return w }, position(A) { let w = [y(), b(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-linear", "var(--tw-mask-left), var(--tw-mask-right), var(--tw-mask-bottom), var(--tw-mask-top)")]; for (let C of ["top", "right", "bottom", "left"]) h[C] && (w.push(l(`--tw-mask-${C}`, `linear-gradient(to ${C}, var(--tw-mask-${C}-from-color) var(--tw-mask-${C}-from-position), var(--tw-mask-${C}-to-color) var(--tw-mask-${C}-to-position))`)), w.push(j([S(`--tw-mask-${C}-from-position`, "0%"), S(`--tw-mask-${C}-to-position`, "100%"), S(`--tw-mask-${C}-from-color`, "black"), S(`--tw-mask-${C}-to-color`, "transparent")])), w.push(l(`--tw-mask-${C}-${d}-position`, A))); return w } }); } V("mask-x-from", "from", { top: false, right: true, bottom: false, left: true }), V("mask-x-to", "to", { top: false, right: true, bottom: false, left: true }), V("mask-y-from", "from", { top: true, right: false, bottom: true, left: false }), V("mask-y-to", "to", { top: true, right: false, bottom: true, left: false }), V("mask-t-from", "from", { top: true, right: false, bottom: false, left: false }), V("mask-t-to", "to", { top: true, right: false, bottom: false, left: false }), V("mask-r-from", "from", { top: false, right: true, bottom: false, left: false }), V("mask-r-to", "to", { top: false, right: true, bottom: false, left: false }), V("mask-b-from", "from", { top: false, right: false, bottom: true, left: false }), V("mask-b-to", "to", { top: false, right: false, bottom: true, left: false }), V("mask-l-from", "from", { top: false, right: false, bottom: false, left: true }), V("mask-l-to", "to", { top: false, right: false, bottom: false, left: true }); let R = () => j([S("--tw-mask-linear-position", "0deg"), S("--tw-mask-linear-from-position", "0%"), S("--tw-mask-linear-to-position", "100%"), S("--tw-mask-linear-from-color", "black"), S("--tw-mask-linear-to-color", "transparent")]); o("mask-linear", { defaultValue: null, supportsNegative: true, supportsFractions: false, handleBareValue(n) { return E(n.value) ? `calc(1deg * ${n.value})` : null }, handleNegativeBareValue(n) { return E(n.value) ? `calc(1deg * -${n.value})` : null }, handle: n => [y(), R(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-linear", "linear-gradient(var(--tw-mask-linear-stops, var(--tw-mask-linear-position)))"), l("--tw-mask-linear-position", n)] }), i("mask-linear", () => [{ supportsNegative: true, values: ["0", "1", "2", "3", "6", "12", "45", "90", "180"] }]), N("mask-linear-from", { color: n => [y(), R(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-linear-stops", "var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)"), l("--tw-mask-linear", "linear-gradient(var(--tw-mask-linear-stops))"), l("--tw-mask-linear-from-color", n)], position: n => [y(), R(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-linear-stops", "var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)"), l("--tw-mask-linear", "linear-gradient(var(--tw-mask-linear-stops))"), l("--tw-mask-linear-from-position", n)] }), N("mask-linear-to", { color: n => [y(), R(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-linear-stops", "var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)"), l("--tw-mask-linear", "linear-gradient(var(--tw-mask-linear-stops))"), l("--tw-mask-linear-to-color", n)], position: n => [y(), R(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-linear-stops", "var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)"), l("--tw-mask-linear", "linear-gradient(var(--tw-mask-linear-stops))"), l("--tw-mask-linear-to-position", n)] }); let D = () => j([S("--tw-mask-radial-from-position", "0%"), S("--tw-mask-radial-to-position", "100%"), S("--tw-mask-radial-from-color", "black"), S("--tw-mask-radial-to-color", "transparent"), S("--tw-mask-radial-shape", "ellipse"), S("--tw-mask-radial-size", "farthest-corner"), S("--tw-mask-radial-position", "center")]); e("mask-circle", [["--tw-mask-radial-shape", "circle"]]), e("mask-ellipse", [["--tw-mask-radial-shape", "ellipse"]]), e("mask-radial-closest-side", [["--tw-mask-radial-size", "closest-side"]]), e("mask-radial-farthest-side", [["--tw-mask-radial-size", "farthest-side"]]), e("mask-radial-closest-corner", [["--tw-mask-radial-size", "closest-corner"]]), e("mask-radial-farthest-corner", [["--tw-mask-radial-size", "farthest-corner"]]), e("mask-radial-at-top", [["--tw-mask-radial-position", "top"]]), e("mask-radial-at-top-left", [["--tw-mask-radial-position", "top left"]]), e("mask-radial-at-top-right", [["--tw-mask-radial-position", "top right"]]), e("mask-radial-at-bottom", [["--tw-mask-radial-position", "bottom"]]), e("mask-radial-at-bottom-left", [["--tw-mask-radial-position", "bottom left"]]), e("mask-radial-at-bottom-right", [["--tw-mask-radial-position", "bottom right"]]), e("mask-radial-at-left", [["--tw-mask-radial-position", "left"]]), e("mask-radial-at-right", [["--tw-mask-radial-position", "right"]]), e("mask-radial-at-center", [["--tw-mask-radial-position", "center"]]), o("mask-radial-at", { defaultValue: null, supportsNegative: false, supportsFractions: false, handle: n => [l("--tw-mask-radial-position", n)] }), o("mask-radial", { defaultValue: null, supportsNegative: false, supportsFractions: false, handle: n => [y(), D(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-radial", "radial-gradient(var(--tw-mask-radial-stops, var(--tw-mask-radial-size)))"), l("--tw-mask-radial-size", n)] }), N("mask-radial-from", { color: n => [y(), D(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-radial-stops", "var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)"), l("--tw-mask-radial", "radial-gradient(var(--tw-mask-radial-stops))"), l("--tw-mask-radial-from-color", n)], position: n => [y(), D(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-radial-stops", "var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)"), l("--tw-mask-radial", "radial-gradient(var(--tw-mask-radial-stops))"), l("--tw-mask-radial-from-position", n)] }), N("mask-radial-to", { color: n => [y(), D(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-radial-stops", "var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)"), l("--tw-mask-radial", "radial-gradient(var(--tw-mask-radial-stops))"), l("--tw-mask-radial-to-color", n)], position: n => [y(), D(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-radial-stops", "var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)"), l("--tw-mask-radial", "radial-gradient(var(--tw-mask-radial-stops))"), l("--tw-mask-radial-to-position", n)] }); let _ = () => j([S("--tw-mask-conic-position", "0deg"), S("--tw-mask-conic-from-position", "0%"), S("--tw-mask-conic-to-position", "100%"), S("--tw-mask-conic-from-color", "black"), S("--tw-mask-conic-to-color", "transparent")]); o("mask-conic", { defaultValue: null, supportsNegative: true, supportsFractions: false, handleBareValue(n) { return E(n.value) ? `calc(1deg * ${n.value})` : null }, handleNegativeBareValue(n) { return E(n.value) ? `calc(1deg * -${n.value})` : null }, handle: n => [y(), _(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-conic", "conic-gradient(var(--tw-mask-conic-stops, var(--tw-mask-conic-position)))"), l("--tw-mask-conic-position", n)] }), i("mask-conic", () => [{ supportsNegative: true, values: ["0", "1", "2", "3", "6", "12", "45", "90", "180"] }]), N("mask-conic-from", { color: n => [y(), _(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-conic-stops", "from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)"), l("--tw-mask-conic", "conic-gradient(var(--tw-mask-conic-stops))"), l("--tw-mask-conic-from-color", n)], position: n => [y(), _(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-conic-stops", "from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)"), l("--tw-mask-conic", "conic-gradient(var(--tw-mask-conic-stops))"), l("--tw-mask-conic-from-position", n)] }), N("mask-conic-to", { color: n => [y(), _(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-conic-stops", "from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)"), l("--tw-mask-conic", "conic-gradient(var(--tw-mask-conic-stops))"), l("--tw-mask-conic-to-color", n)], position: n => [y(), _(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-conic-stops", "from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)"), l("--tw-mask-conic", "conic-gradient(var(--tw-mask-conic-stops))"), l("--tw-mask-conic-to-position", n)] }), e("box-decoration-slice", [["-webkit-box-decoration-break", "slice"], ["box-decoration-break", "slice"]]), e("box-decoration-clone", [["-webkit-box-decoration-break", "clone"], ["box-decoration-break", "clone"]]), e("bg-clip-text", [["background-clip", "text"]]), e("bg-clip-border", [["background-clip", "border-box"]]), e("bg-clip-padding", [["background-clip", "padding-box"]]), e("bg-clip-content", [["background-clip", "content-box"]]), e("bg-origin-border", [["background-origin", "border-box"]]), e("bg-origin-padding", [["background-origin", "padding-box"]]), e("bg-origin-content", [["background-origin", "content-box"]]); for (let n of ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"]) e(`bg-blend-${n}`, [["background-blend-mode", n]]), e(`mix-blend-${n}`, [["mix-blend-mode", n]]); e("mix-blend-plus-darker", [["mix-blend-mode", "plus-darker"]]), e("mix-blend-plus-lighter", [["mix-blend-mode", "plus-lighter"]]), e("fill-none", [["fill", "none"]]), r.functional("fill", n => { if (!n.value) return; if (n.value.kind === "arbitrary") { let h = Z(n.value.value, n.modifier, t); return h === null ? void 0 : [l("fill", h)] } let d = te(n, t, ["--fill", "--color"]); if (d) return [l("fill", d)] }), i("fill", () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--fill", "--color"], modifiers: Array.from({ length: 21 }, (n, d) => `${d * 5}`) }]), e("stroke-none", [["stroke", "none"]]), r.functional("stroke", n => { if (n.value) { if (n.value.kind === "arbitrary") { let d = n.value.value; switch (n.value.dataType ?? Y(d, ["color", "number", "length", "percentage"])) { case "number": case "length": case "percentage": return n.modifier ? void 0 : [l("stroke-width", d)]; default: return d = Z(n.value.value, n.modifier, t), d === null ? void 0 : [l("stroke", d)] } } { let d = te(n, t, ["--stroke", "--color"]); if (d) return [l("stroke", d)] } { let d = t.resolve(n.value.value, ["--stroke-width"]); if (d) return [l("stroke-width", d)]; if (E(n.value.value)) return [l("stroke-width", n.value.value)] } } }), i("stroke", () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--stroke", "--color"], modifiers: Array.from({ length: 21 }, (n, d) => `${d * 5}`) }, { values: ["0", "1", "2", "3"], valueThemeKeys: ["--stroke-width"] }]), e("object-contain", [["object-fit", "contain"]]), e("object-cover", [["object-fit", "cover"]]), e("object-fill", [["object-fit", "fill"]]), e("object-none", [["object-fit", "none"]]), e("object-scale-down", [["object-fit", "scale-down"]]), e("object-top", [["object-position", "top"]]), e("object-top-left", [["object-position", "left top"]]), e("object-top-right", [["object-position", "right top"]]), e("object-bottom", [["object-position", "bottom"]]), e("object-bottom-left", [["object-position", "left bottom"]]), e("object-bottom-right", [["object-position", "right bottom"]]), e("object-left", [["object-position", "left"]]), e("object-right", [["object-position", "right"]]), e("object-center", [["object-position", "center"]]), o("object", { themeKeys: ["--object-position"], handle: n => [l("object-position", n)] }); for (let [n, d] of [["p", "padding"], ["px", "padding-inline"], ["py", "padding-block"], ["ps", "padding-inline-start"], ["pe", "padding-inline-end"], ["pt", "padding-top"], ["pr", "padding-right"], ["pb", "padding-bottom"], ["pl", "padding-left"]]) a(n, ["--padding", "--spacing"], h => [l(d, h)]); e("text-left", [["text-align", "left"]]), e("text-center", [["text-align", "center"]]), e("text-right", [["text-align", "right"]]), e("text-justify", [["text-align", "justify"]]), e("text-start", [["text-align", "start"]]), e("text-end", [["text-align", "end"]]), a("indent", ["--text-indent", "--spacing"], n => [l("text-indent", n)], { supportsNegative: true }), e("align-baseline", [["vertical-align", "baseline"]]), e("align-top", [["vertical-align", "top"]]), e("align-middle", [["vertical-align", "middle"]]), e("align-bottom", [["vertical-align", "bottom"]]), e("align-text-top", [["vertical-align", "text-top"]]), e("align-text-bottom", [["vertical-align", "text-bottom"]]), e("align-sub", [["vertical-align", "sub"]]), e("align-super", [["vertical-align", "super"]]), o("align", { themeKeys: [], handle: n => [l("vertical-align", n)] }), r.functional("font", n => { if (!(!n.value || n.modifier)) { if (n.value.kind === "arbitrary") { let d = n.value.value; switch (n.value.dataType ?? Y(d, ["number", "generic-name", "family-name"])) { case "generic-name": case "family-name": return [l("font-family", d)]; default: return [j([S("--tw-font-weight")]), l("--tw-font-weight", d), l("font-weight", d)] } } { let d = t.resolveWith(n.value.value, ["--font"], ["--font-feature-settings", "--font-variation-settings"]); if (d) { let [h, A = {}] = d; return [l("font-family", h), l("font-feature-settings", A["--font-feature-settings"]), l("font-variation-settings", A["--font-variation-settings"])] } } { let d = t.resolve(n.value.value, ["--font-weight"]); if (d) return [j([S("--tw-font-weight")]), l("--tw-font-weight", d), l("font-weight", d)] } } }), i("font", () => [{ values: [], valueThemeKeys: ["--font"] }, { values: [], valueThemeKeys: ["--font-weight"] }]), e("uppercase", [["text-transform", "uppercase"]]), e("lowercase", [["text-transform", "lowercase"]]), e("capitalize", [["text-transform", "capitalize"]]), e("normal-case", [["text-transform", "none"]]), e("italic", [["font-style", "italic"]]), e("not-italic", [["font-style", "normal"]]), e("underline", [["text-decoration-line", "underline"]]), e("overline", [["text-decoration-line", "overline"]]), e("line-through", [["text-decoration-line", "line-through"]]), e("no-underline", [["text-decoration-line", "none"]]), e("font-stretch-normal", [["font-stretch", "normal"]]), e("font-stretch-ultra-condensed", [["font-stretch", "ultra-condensed"]]), e("font-stretch-extra-condensed", [["font-stretch", "extra-condensed"]]), e("font-stretch-condensed", [["font-stretch", "condensed"]]), e("font-stretch-semi-condensed", [["font-stretch", "semi-condensed"]]), e("font-stretch-semi-expanded", [["font-stretch", "semi-expanded"]]), e("font-stretch-expanded", [["font-stretch", "expanded"]]), e("font-stretch-extra-expanded", [["font-stretch", "extra-expanded"]]), e("font-stretch-ultra-expanded", [["font-stretch", "ultra-expanded"]]), o("font-stretch", { handleBareValue: ({ value: n }) => { if (!n.endsWith("%")) return null; let d = Number(n.slice(0, -1)); return !E(d) || Number.isNaN(d) || d < 50 || d > 200 ? null : n }, handle: n => [l("font-stretch", n)] }), i("font-stretch", () => [{ values: ["50%", "75%", "90%", "95%", "100%", "105%", "110%", "125%", "150%", "200%"] }]), s("placeholder", { themeKeys: ["--background-color", "--color"], handle: n => [M("&::placeholder", [l("--tw-sort", "placeholder-color"), l("color", n)])] }), e("decoration-solid", [["text-decoration-style", "solid"]]), e("decoration-double", [["text-decoration-style", "double"]]), e("decoration-dotted", [["text-decoration-style", "dotted"]]), e("decoration-dashed", [["text-decoration-style", "dashed"]]), e("decoration-wavy", [["text-decoration-style", "wavy"]]), e("decoration-auto", [["text-decoration-thickness", "auto"]]), e("decoration-from-font", [["text-decoration-thickness", "from-font"]]), r.functional("decoration", n => { if (n.value) { if (n.value.kind === "arbitrary") { let d = n.value.value; switch (n.value.dataType ?? Y(d, ["color", "length", "percentage"])) { case "length": case "percentage": return n.modifier ? void 0 : [l("text-decoration-thickness", d)]; default: return d = Z(d, n.modifier, t), d === null ? void 0 : [l("text-decoration-color", d)] } } { let d = t.resolve(n.value.value, ["--text-decoration-thickness"]); if (d) return n.modifier ? void 0 : [l("text-decoration-thickness", d)]; if (E(n.value.value)) return n.modifier ? void 0 : [l("text-decoration-thickness", `${n.value.value}px`)] } { let d = te(n, t, ["--text-decoration-color", "--color"]); if (d) return [l("text-decoration-color", d)] } } }), i("decoration", () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--text-decoration-color", "--color"], modifiers: Array.from({ length: 21 }, (n, d) => `${d * 5}`) }, { values: ["0", "1", "2"], valueThemeKeys: ["--text-decoration-thickness"] }]), e("animate-none", [["animation", "none"]]), o("animate", { themeKeys: ["--animate"], handle: n => [l("animation", n)] }); { let n = ["var(--tw-blur,)", "var(--tw-brightness,)", "var(--tw-contrast,)", "var(--tw-grayscale,)", "var(--tw-hue-rotate,)", "var(--tw-invert,)", "var(--tw-saturate,)", "var(--tw-sepia,)", "var(--tw-drop-shadow,)"].join(" "), d = ["var(--tw-backdrop-blur,)", "var(--tw-backdrop-brightness,)", "var(--tw-backdrop-contrast,)", "var(--tw-backdrop-grayscale,)", "var(--tw-backdrop-hue-rotate,)", "var(--tw-backdrop-invert,)", "var(--tw-backdrop-opacity,)", "var(--tw-backdrop-saturate,)", "var(--tw-backdrop-sepia,)"].join(" "), h = () => j([S("--tw-blur"), S("--tw-brightness"), S("--tw-contrast"), S("--tw-grayscale"), S("--tw-hue-rotate"), S("--tw-invert"), S("--tw-opacity"), S("--tw-saturate"), S("--tw-sepia"), S("--tw-drop-shadow"), S("--tw-drop-shadow-color"), S("--tw-drop-shadow-alpha", "100%", "<percentage>"), S("--tw-drop-shadow-size")]), A = () => j([S("--tw-backdrop-blur"), S("--tw-backdrop-brightness"), S("--tw-backdrop-contrast"), S("--tw-backdrop-grayscale"), S("--tw-backdrop-hue-rotate"), S("--tw-backdrop-invert"), S("--tw-backdrop-opacity"), S("--tw-backdrop-saturate"), S("--tw-backdrop-sepia")]); r.functional("filter", w => { if (!w.modifier) { if (w.value === null) return [h(), l("filter", n)]; if (w.value.kind === "arbitrary") return [l("filter", w.value.value)]; switch (w.value.value) { case "none": return [l("filter", "none")] } } }), r.functional("backdrop-filter", w => { if (!w.modifier) { if (w.value === null) return [A(), l("-webkit-backdrop-filter", d), l("backdrop-filter", d)]; if (w.value.kind === "arbitrary") return [l("-webkit-backdrop-filter", w.value.value), l("backdrop-filter", w.value.value)]; switch (w.value.value) { case "none": return [l("-webkit-backdrop-filter", "none"), l("backdrop-filter", "none")] } } }), o("blur", { themeKeys: ["--blur"], handle: w => [h(), l("--tw-blur", `blur(${w})`), l("filter", n)] }), e("blur-none", [h, ["--tw-blur", " "], ["filter", n]]), o("backdrop-blur", { themeKeys: ["--backdrop-blur", "--blur"], handle: w => [A(), l("--tw-backdrop-blur", `blur(${w})`), l("-webkit-backdrop-filter", d), l("backdrop-filter", d)] }), e("backdrop-blur-none", [A, ["--tw-backdrop-blur", " "], ["-webkit-backdrop-filter", d], ["backdrop-filter", d]]), o("brightness", { themeKeys: ["--brightness"], handleBareValue: ({ value: w }) => E(w) ? `${w}%` : null, handle: w => [h(), l("--tw-brightness", `brightness(${w})`), l("filter", n)] }), o("backdrop-brightness", { themeKeys: ["--backdrop-brightness", "--brightness"], handleBareValue: ({ value: w }) => E(w) ? `${w}%` : null, handle: w => [A(), l("--tw-backdrop-brightness", `brightness(${w})`), l("-webkit-backdrop-filter", d), l("backdrop-filter", d)] }), i("brightness", () => [{ values: ["0", "50", "75", "90", "95", "100", "105", "110", "125", "150", "200"], valueThemeKeys: ["--brightness"] }]), i("backdrop-brightness", () => [{ values: ["0", "50", "75", "90", "95", "100", "105", "110", "125", "150", "200"], valueThemeKeys: ["--backdrop-brightness", "--brightness"] }]), o("contrast", { themeKeys: ["--contrast"], handleBareValue: ({ value: w }) => E(w) ? `${w}%` : null, handle: w => [h(), l("--tw-contrast", `contrast(${w})`), l("filter", n)] }), o("backdrop-contrast", { themeKeys: ["--backdrop-contrast", "--contrast"], handleBareValue: ({ value: w }) => E(w) ? `${w}%` : null, handle: w => [A(), l("--tw-backdrop-contrast", `contrast(${w})`), l("-webkit-backdrop-filter", d), l("backdrop-filter", d)] }), i("contrast", () => [{ values: ["0", "50", "75", "100", "125", "150", "200"], valueThemeKeys: ["--contrast"] }]), i("backdrop-contrast", () => [{ values: ["0", "50", "75", "100", "125", "150", "200"], valueThemeKeys: ["--backdrop-contrast", "--contrast"] }]), o("grayscale", { themeKeys: ["--grayscale"], handleBareValue: ({ value: w }) => E(w) ? `${w}%` : null, defaultValue: "100%", handle: w => [h(), l("--tw-grayscale", `grayscale(${w})`), l("filter", n)] }), o("backdrop-grayscale", { themeKeys: ["--backdrop-grayscale", "--grayscale"], handleBareValue: ({ value: w }) => E(w) ? `${w}%` : null, defaultValue: "100%", handle: w => [A(), l("--tw-backdrop-grayscale", `grayscale(${w})`), l("-webkit-backdrop-filter", d), l("backdrop-filter", d)] }), i("grayscale", () => [{ values: ["0", "25", "50", "75", "100"], valueThemeKeys: ["--grayscale"], hasDefaultValue: true }]), i("backdrop-grayscale", () => [{ values: ["0", "25", "50", "75", "100"], valueThemeKeys: ["--backdrop-grayscale", "--grayscale"], hasDefaultValue: true }]), o("hue-rotate", { supportsNegative: true, themeKeys: ["--hue-rotate"], handleBareValue: ({ value: w }) => E(w) ? `${w}deg` : null, handle: w => [h(), l("--tw-hue-rotate", `hue-rotate(${w})`), l("filter", n)] }), o("backdrop-hue-rotate", { supportsNegative: true, themeKeys: ["--backdrop-hue-rotate", "--hue-rotate"], handleBareValue: ({ value: w }) => E(w) ? `${w}deg` : null, handle: w => [A(), l("--tw-backdrop-hue-rotate", `hue-rotate(${w})`), l("-webkit-backdrop-filter", d), l("backdrop-filter", d)] }), i("hue-rotate", () => [{ values: ["0", "15", "30", "60", "90", "180"], valueThemeKeys: ["--hue-rotate"] }]), i("backdrop-hue-rotate", () => [{ values: ["0", "15", "30", "60", "90", "180"], valueThemeKeys: ["--backdrop-hue-rotate", "--hue-rotate"] }]), o("invert", { themeKeys: ["--invert"], handleBareValue: ({ value: w }) => E(w) ? `${w}%` : null, defaultValue: "100%", handle: w => [h(), l("--tw-invert", `invert(${w})`), l("filter", n)] }), o("backdrop-invert", { themeKeys: ["--backdrop-invert", "--invert"], handleBareValue: ({ value: w }) => E(w) ? `${w}%` : null, defaultValue: "100%", handle: w => [A(), l("--tw-backdrop-invert", `invert(${w})`), l("-webkit-backdrop-filter", d), l("backdrop-filter", d)] }), i("invert", () => [{ values: ["0", "25", "50", "75", "100"], valueThemeKeys: ["--invert"], hasDefaultValue: true }]), i("backdrop-invert", () => [{ values: ["0", "25", "50", "75", "100"], valueThemeKeys: ["--backdrop-invert", "--invert"], hasDefaultValue: true }]), o("saturate", { themeKeys: ["--saturate"], handleBareValue: ({ value: w }) => E(w) ? `${w}%` : null, handle: w => [h(), l("--tw-saturate", `saturate(${w})`), l("filter", n)] }), o("backdrop-saturate", { themeKeys: ["--backdrop-saturate", "--saturate"], handleBareValue: ({ value: w }) => E(w) ? `${w}%` : null, handle: w => [A(), l("--tw-backdrop-saturate", `saturate(${w})`), l("-webkit-backdrop-filter", d), l("backdrop-filter", d)] }), i("saturate", () => [{ values: ["0", "50", "100", "150", "200"], valueThemeKeys: ["--saturate"] }]), i("backdrop-saturate", () => [{ values: ["0", "50", "100", "150", "200"], valueThemeKeys: ["--backdrop-saturate", "--saturate"] }]), o("sepia", { themeKeys: ["--sepia"], handleBareValue: ({ value: w }) => E(w) ? `${w}%` : null, defaultValue: "100%", handle: w => [h(), l("--tw-sepia", `sepia(${w})`), l("filter", n)] }), o("backdrop-sepia", { themeKeys: ["--backdrop-sepia", "--sepia"], handleBareValue: ({ value: w }) => E(w) ? `${w}%` : null, defaultValue: "100%", handle: w => [A(), l("--tw-backdrop-sepia", `sepia(${w})`), l("-webkit-backdrop-filter", d), l("backdrop-filter", d)] }), i("sepia", () => [{ values: ["0", "50", "100"], valueThemeKeys: ["--sepia"], hasDefaultValue: true }]), i("backdrop-sepia", () => [{ values: ["0", "50", "100"], valueThemeKeys: ["--backdrop-sepia", "--sepia"], hasDefaultValue: true }]), e("drop-shadow-none", [h, ["--tw-drop-shadow", " "], ["filter", n]]), r.functional("drop-shadow", w => { let C; if (w.modifier && (w.modifier.kind === "arbitrary" ? C = w.modifier.value : E(w.modifier.value) && (C = `${w.modifier.value}%`)), !w.value) { let P = t.get(["--drop-shadow"]), $ = t.resolve(null, ["--drop-shadow"]); return P === null || $ === null ? void 0 : [h(), l("--tw-drop-shadow-alpha", C), ...lt("--tw-drop-shadow-size", P, C, T => `var(--tw-drop-shadow-color, ${T})`), l("--tw-drop-shadow", z($, ",").map(T => `drop-shadow(${T})`).join(" ")), l("filter", n)] } if (w.value.kind === "arbitrary") { let P = w.value.value; switch (w.value.dataType ?? Y(P, ["color"])) { case "color": return P = Z(P, w.modifier, t), P === null ? void 0 : [h(), l("--tw-drop-shadow-color", Q(P, "var(--tw-drop-shadow-alpha)")), l("--tw-drop-shadow", "var(--tw-drop-shadow-size)")]; default: return w.modifier && !C ? void 0 : [h(), l("--tw-drop-shadow-alpha", C), ...lt("--tw-drop-shadow-size", P, C, T => `var(--tw-drop-shadow-color, ${T})`), l("--tw-drop-shadow", "var(--tw-drop-shadow-size)"), l("filter", n)] } } { let P = t.get([`--drop-shadow-${w.value.value}`]), $ = t.resolve(w.value.value, ["--drop-shadow"]); if (P && $) return w.modifier && !C ? void 0 : C ? [h(), l("--tw-drop-shadow-alpha", C), ...lt("--tw-drop-shadow-size", P, C, T => `var(--tw-drop-shadow-color, ${T})`), l("--tw-drop-shadow", "var(--tw-drop-shadow-size)"), l("filter", n)] : [h(), l("--tw-drop-shadow-alpha", C), ...lt("--tw-drop-shadow-size", P, C, T => `var(--tw-drop-shadow-color, ${T})`), l("--tw-drop-shadow", z($, ",").map(T => `drop-shadow(${T})`).join(" ")), l("filter", n)] } { let P = te(w, t, ["--drop-shadow-color", "--color"]); if (P) return P === "inherit" ? [h(), l("--tw-drop-shadow-color", "inherit"), l("--tw-drop-shadow", "var(--tw-drop-shadow-size)")] : [h(), l("--tw-drop-shadow-color", Q(P, "var(--tw-drop-shadow-alpha)")), l("--tw-drop-shadow", "var(--tw-drop-shadow-size)")] } }), i("drop-shadow", () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--drop-shadow-color", "--color"], modifiers: Array.from({ length: 21 }, (w, C) => `${C * 5}`) }, { valueThemeKeys: ["--drop-shadow"] }]), o("backdrop-opacity", { themeKeys: ["--backdrop-opacity", "--opacity"], handleBareValue: ({ value: w }) => nt(w) ? `${w}%` : null, handle: w => [A(), l("--tw-backdrop-opacity", `opacity(${w})`), l("-webkit-backdrop-filter", d), l("backdrop-filter", d)] }), i("backdrop-opacity", () => [{ values: Array.from({ length: 21 }, (w, C) => `${C * 5}`), valueThemeKeys: ["--backdrop-opacity", "--opacity"] }]); } { let n = `var(--tw-ease, ${t.resolve(null, ["--default-transition-timing-function"]) ?? "ease"})`, d = `var(--tw-duration, ${t.resolve(null, ["--default-transition-duration"]) ?? "0s"})`; e("transition-none", [["transition-property", "none"]]), e("transition-all", [["transition-property", "all"], ["transition-timing-function", n], ["transition-duration", d]]), e("transition-colors", [["transition-property", "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to"], ["transition-timing-function", n], ["transition-duration", d]]), e("transition-opacity", [["transition-property", "opacity"], ["transition-timing-function", n], ["transition-duration", d]]), e("transition-shadow", [["transition-property", "box-shadow"], ["transition-timing-function", n], ["transition-duration", d]]), e("transition-transform", [["transition-property", "transform, translate, scale, rotate"], ["transition-timing-function", n], ["transition-duration", d]]), o("transition", { defaultValue: "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, display, visibility, content-visibility, overlay, pointer-events", themeKeys: ["--transition-property"], handle: h => [l("transition-property", h), l("transition-timing-function", n), l("transition-duration", d)] }), e("transition-discrete", [["transition-behavior", "allow-discrete"]]), e("transition-normal", [["transition-behavior", "normal"]]), o("delay", { handleBareValue: ({ value: h }) => E(h) ? `${h}ms` : null, themeKeys: ["--transition-delay"], handle: h => [l("transition-delay", h)] }); { let h = () => j([S("--tw-duration")]); e("duration-initial", [h, ["--tw-duration", "initial"]]), r.functional("duration", A => { if (A.modifier || !A.value) return; let w = null; if (A.value.kind === "arbitrary" ? w = A.value.value : (w = t.resolve(A.value.fraction ?? A.value.value, ["--transition-duration"]), w === null && E(A.value.value) && (w = `${A.value.value}ms`)), w !== null) return [h(), l("--tw-duration", w), l("transition-duration", w)] }); } i("delay", () => [{ values: ["75", "100", "150", "200", "300", "500", "700", "1000"], valueThemeKeys: ["--transition-delay"] }]), i("duration", () => [{ values: ["75", "100", "150", "200", "300", "500", "700", "1000"], valueThemeKeys: ["--transition-duration"] }]); } { let n = () => j([S("--tw-ease")]); e("ease-initial", [n, ["--tw-ease", "initial"]]), e("ease-linear", [n, ["--tw-ease", "linear"], ["transition-timing-function", "linear"]]), o("ease", { themeKeys: ["--ease"], handle: d => [n(), l("--tw-ease", d), l("transition-timing-function", d)] }); } e("will-change-auto", [["will-change", "auto"]]), e("will-change-scroll", [["will-change", "scroll-position"]]), e("will-change-contents", [["will-change", "contents"]]), e("will-change-transform", [["will-change", "transform"]]), o("will-change", { themeKeys: [], handle: n => [l("will-change", n)] }), e("content-none", [["--tw-content", "none"], ["content", "none"]]), o("content", { themeKeys: [], handle: n => [j([S("--tw-content", '""')]), l("--tw-content", n), l("content", "var(--tw-content)")] }); { let n = "var(--tw-contain-size,) var(--tw-contain-layout,) var(--tw-contain-paint,) var(--tw-contain-style,)", d = () => j([S("--tw-contain-size"), S("--tw-contain-layout"), S("--tw-contain-paint"), S("--tw-contain-style")]); e("contain-none", [["contain", "none"]]), e("contain-content", [["contain", "content"]]), e("contain-strict", [["contain", "strict"]]), e("contain-size", [d, ["--tw-contain-size", "size"], ["contain", n]]), e("contain-inline-size", [d, ["--tw-contain-size", "inline-size"], ["contain", n]]), e("contain-layout", [d, ["--tw-contain-layout", "layout"], ["contain", n]]), e("contain-paint", [d, ["--tw-contain-paint", "paint"], ["contain", n]]), e("contain-style", [d, ["--tw-contain-style", "style"], ["contain", n]]), o("contain", { themeKeys: [], handle: h => [l("contain", h)] }); } e("forced-color-adjust-none", [["forced-color-adjust", "none"]]), e("forced-color-adjust-auto", [["forced-color-adjust", "auto"]]), e("leading-none", [() => j([S("--tw-leading")]), ["--tw-leading", "1"], ["line-height", "1"]]), a("leading", ["--leading", "--spacing"], n => [j([S("--tw-leading")]), l("--tw-leading", n), l("line-height", n)]), o("tracking", { supportsNegative: true, themeKeys: ["--tracking"], handle: n => [j([S("--tw-tracking")]), l("--tw-tracking", n), l("letter-spacing", n)] }), e("antialiased", [["-webkit-font-smoothing", "antialiased"], ["-moz-osx-font-smoothing", "grayscale"]]), e("subpixel-antialiased", [["-webkit-font-smoothing", "auto"], ["-moz-osx-font-smoothing", "auto"]]); { let n = "var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)", d = () => j([S("--tw-ordinal"), S("--tw-slashed-zero"), S("--tw-numeric-figure"), S("--tw-numeric-spacing"), S("--tw-numeric-fraction")]); e("normal-nums", [["font-variant-numeric", "normal"]]), e("ordinal", [d, ["--tw-ordinal", "ordinal"], ["font-variant-numeric", n]]), e("slashed-zero", [d, ["--tw-slashed-zero", "slashed-zero"], ["font-variant-numeric", n]]), e("lining-nums", [d, ["--tw-numeric-figure", "lining-nums"], ["font-variant-numeric", n]]), e("oldstyle-nums", [d, ["--tw-numeric-figure", "oldstyle-nums"], ["font-variant-numeric", n]]), e("proportional-nums", [d, ["--tw-numeric-spacing", "proportional-nums"], ["font-variant-numeric", n]]), e("tabular-nums", [d, ["--tw-numeric-spacing", "tabular-nums"], ["font-variant-numeric", n]]), e("diagonal-fractions", [d, ["--tw-numeric-fraction", "diagonal-fractions"], ["font-variant-numeric", n]]), e("stacked-fractions", [d, ["--tw-numeric-fraction", "stacked-fractions"], ["font-variant-numeric", n]]); } { let n = () => j([S("--tw-outline-style", "solid")]); r.static("outline-hidden", () => [l("--tw-outline-style", "none"), l("outline-style", "none"), F("@media", "(forced-colors: active)", [l("outline", "2px solid transparent"), l("outline-offset", "2px")])]), e("outline-none", [["--tw-outline-style", "none"], ["outline-style", "none"]]), e("outline-solid", [["--tw-outline-style", "solid"], ["outline-style", "solid"]]), e("outline-dashed", [["--tw-outline-style", "dashed"], ["outline-style", "dashed"]]), e("outline-dotted", [["--tw-outline-style", "dotted"], ["outline-style", "dotted"]]), e("outline-double", [["--tw-outline-style", "double"], ["outline-style", "double"]]), r.functional("outline", d => { if (d.value === null) { if (d.modifier) return; let h = t.get(["--default-outline-width"]) ?? "1px"; return [n(), l("outline-style", "var(--tw-outline-style)"), l("outline-width", h)] } if (d.value.kind === "arbitrary") { let h = d.value.value; switch (d.value.dataType ?? Y(h, ["color", "length", "number", "percentage"])) { case "length": case "number": case "percentage": return d.modifier ? void 0 : [n(), l("outline-style", "var(--tw-outline-style)"), l("outline-width", h)]; default: return h = Z(h, d.modifier, t), h === null ? void 0 : [l("outline-color", h)] } } { let h = te(d, t, ["--outline-color", "--color"]); if (h) return [l("outline-color", h)] } { if (d.modifier) return; let h = t.resolve(d.value.value, ["--outline-width"]); if (h) return [n(), l("outline-style", "var(--tw-outline-style)"), l("outline-width", h)]; if (E(d.value.value)) return [n(), l("outline-style", "var(--tw-outline-style)"), l("outline-width", `${d.value.value}px`)] } }), i("outline", () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--outline-color", "--color"], modifiers: Array.from({ length: 21 }, (d, h) => `${h * 5}`), hasDefaultValue: true }, { values: ["0", "1", "2", "4", "8"], valueThemeKeys: ["--outline-width"] }]), o("outline-offset", { supportsNegative: true, themeKeys: ["--outline-offset"], handleBareValue: ({ value: d }) => E(d) ? `${d}px` : null, handle: d => [l("outline-offset", d)] }), i("outline-offset", () => [{ supportsNegative: true, values: ["0", "1", "2", "4", "8"], valueThemeKeys: ["--outline-offset"] }]); } o("opacity", { themeKeys: ["--opacity"], handleBareValue: ({ value: n }) => nt(n) ? `${n}%` : null, handle: n => [l("opacity", n)] }), i("opacity", () => [{ values: Array.from({ length: 21 }, (n, d) => `${d * 5}`), valueThemeKeys: ["--opacity"] }]), e("underline-offset-auto", [["text-underline-offset", "auto"]]), o("underline-offset", { supportsNegative: true, themeKeys: ["--text-underline-offset"], handleBareValue: ({ value: n }) => E(n) ? `${n}px` : null, handle: n => [l("text-underline-offset", n)] }), i("underline-offset", () => [{ supportsNegative: true, values: ["0", "1", "2", "4", "8"], valueThemeKeys: ["--text-underline-offset"] }]), r.functional("text", n => { if (n.value) { if (n.value.kind === "arbitrary") { let d = n.value.value; switch (n.value.dataType ?? Y(d, ["color", "length", "percentage", "absolute-size", "relative-size"])) { case "size": case "length": case "percentage": case "absolute-size": case "relative-size": { if (n.modifier) { let A = n.modifier.kind === "arbitrary" ? n.modifier.value : t.resolve(n.modifier.value, ["--leading"]); if (!A && xe(n.modifier.value)) { let w = t.resolve(null, ["--spacing"]); if (!w) return null; A = `calc(${w} * ${n.modifier.value})`; } return !A && n.modifier.value === "none" && (A = "1"), A ? [l("font-size", d), l("line-height", A)] : null } return [l("font-size", d)] } default: return d = Z(d, n.modifier, t), d === null ? void 0 : [l("color", d)] } } { let d = te(n, t, ["--text-color", "--color"]); if (d) return [l("color", d)] } { let d = t.resolveWith(n.value.value, ["--text"], ["--line-height", "--letter-spacing", "--font-weight"]); if (d) { let [h, A = {}] = Array.isArray(d) ? d : [d]; if (n.modifier) { let w = n.modifier.kind === "arbitrary" ? n.modifier.value : t.resolve(n.modifier.value, ["--leading"]); if (!w && xe(n.modifier.value)) { let P = t.resolve(null, ["--spacing"]); if (!P) return null; w = `calc(${P} * ${n.modifier.value})`; } if (!w && n.modifier.value === "none" && (w = "1"), !w) return null; let C = [l("font-size", h)]; return w && C.push(l("line-height", w)), C } return typeof A == "string" ? [l("font-size", h), l("line-height", A)] : [l("font-size", h), l("line-height", A["--line-height"] ? `var(--tw-leading, ${A["--line-height"]})` : void 0), l("letter-spacing", A["--letter-spacing"] ? `var(--tw-tracking, ${A["--letter-spacing"]})` : void 0), l("font-weight", A["--font-weight"] ? `var(--tw-font-weight, ${A["--font-weight"]})` : void 0)] } } } }), i("text", () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--text-color", "--color"], modifiers: Array.from({ length: 21 }, (n, d) => `${d * 5}`) }, { values: [], valueThemeKeys: ["--text"], modifiers: [], modifierThemeKeys: ["--leading"] }]); let L = () => j([S("--tw-text-shadow-color"), S("--tw-text-shadow-alpha", "100%", "<percentage>")]); e("text-shadow-initial", [L, ["--tw-text-shadow-color", "initial"]]), r.functional("text-shadow", n => { let d; if (n.modifier && (n.modifier.kind === "arbitrary" ? d = n.modifier.value : E(n.modifier.value) && (d = `${n.modifier.value}%`)), !n.value) { let h = t.get(["--text-shadow"]); return h === null ? void 0 : [L(), l("--tw-text-shadow-alpha", d), ...pe("text-shadow", h, d, A => `var(--tw-text-shadow-color, ${A})`)] } if (n.value.kind === "arbitrary") { let h = n.value.value; switch (n.value.dataType ?? Y(h, ["color"])) { case "color": return h = Z(h, n.modifier, t), h === null ? void 0 : [L(), l("--tw-text-shadow-color", Q(h, "var(--tw-text-shadow-alpha)"))]; default: return [L(), l("--tw-text-shadow-alpha", d), ...pe("text-shadow", h, d, w => `var(--tw-text-shadow-color, ${w})`)] } } switch (n.value.value) { case "none": return n.modifier ? void 0 : [L(), l("text-shadow", "none")]; case "inherit": return n.modifier ? void 0 : [L(), l("--tw-text-shadow-color", "inherit")] }{ let h = t.get([`--text-shadow-${n.value.value}`]); if (h) return [L(), l("--tw-text-shadow-alpha", d), ...pe("text-shadow", h, d, A => `var(--tw-text-shadow-color, ${A})`)] } { let h = te(n, t, ["--text-shadow-color", "--color"]); if (h) return [L(), l("--tw-text-shadow-color", Q(h, "var(--tw-text-shadow-alpha)"))] } }), i("text-shadow", () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--text-shadow-color", "--color"], modifiers: Array.from({ length: 21 }, (n, d) => `${d * 5}`) }, { values: ["none"] }, { valueThemeKeys: ["--text-shadow"], modifiers: Array.from({ length: 21 }, (n, d) => `${d * 5}`), hasDefaultValue: t.get(["--text-shadow"]) !== null }]); { let w = function ($) { return `var(--tw-ring-inset,) 0 0 0 calc(${$} + var(--tw-ring-offset-width)) var(--tw-ring-color, ${A})` }, C = function ($) { return `inset 0 0 0 ${$} var(--tw-inset-ring-color, currentcolor)` }; let n = ["var(--tw-inset-shadow)", "var(--tw-inset-ring-shadow)", "var(--tw-ring-offset-shadow)", "var(--tw-ring-shadow)", "var(--tw-shadow)"].join(", "), d = "0 0 #0000", h = () => j([S("--tw-shadow", d), S("--tw-shadow-color"), S("--tw-shadow-alpha", "100%", "<percentage>"), S("--tw-inset-shadow", d), S("--tw-inset-shadow-color"), S("--tw-inset-shadow-alpha", "100%", "<percentage>"), S("--tw-ring-color"), S("--tw-ring-shadow", d), S("--tw-inset-ring-color"), S("--tw-inset-ring-shadow", d), S("--tw-ring-inset"), S("--tw-ring-offset-width", "0px", "<length>"), S("--tw-ring-offset-color", "#fff"), S("--tw-ring-offset-shadow", d)]); e("shadow-initial", [h, ["--tw-shadow-color", "initial"]]), r.functional("shadow", $ => { let T; if ($.modifier && ($.modifier.kind === "arbitrary" ? T = $.modifier.value : E($.modifier.value) && (T = `${$.modifier.value}%`)), !$.value) { let K = t.get(["--shadow"]); return K === null ? void 0 : [h(), l("--tw-shadow-alpha", T), ...pe("--tw-shadow", K, T, se => `var(--tw-shadow-color, ${se})`), l("box-shadow", n)] } if ($.value.kind === "arbitrary") { let K = $.value.value; switch ($.value.dataType ?? Y(K, ["color"])) { case "color": return K = Z(K, $.modifier, t), K === null ? void 0 : [h(), l("--tw-shadow-color", Q(K, "var(--tw-shadow-alpha)"))]; default: return [h(), l("--tw-shadow-alpha", T), ...pe("--tw-shadow", K, T, bt => `var(--tw-shadow-color, ${bt})`), l("box-shadow", n)] } } switch ($.value.value) { case "none": return $.modifier ? void 0 : [h(), l("--tw-shadow", d), l("box-shadow", n)]; case "inherit": return $.modifier ? void 0 : [h(), l("--tw-shadow-color", "inherit")] }{ let K = t.get([`--shadow-${$.value.value}`]); if (K) return [h(), l("--tw-shadow-alpha", T), ...pe("--tw-shadow", K, T, se => `var(--tw-shadow-color, ${se})`), l("box-shadow", n)] } { let K = te($, t, ["--box-shadow-color", "--color"]); if (K) return [h(), l("--tw-shadow-color", Q(K, "var(--tw-shadow-alpha)"))] } }), i("shadow", () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--box-shadow-color", "--color"], modifiers: Array.from({ length: 21 }, ($, T) => `${T * 5}`) }, { values: ["none"] }, { valueThemeKeys: ["--shadow"], modifiers: Array.from({ length: 21 }, ($, T) => `${T * 5}`), hasDefaultValue: t.get(["--shadow"]) !== null }]), e("inset-shadow-initial", [h, ["--tw-inset-shadow-color", "initial"]]), r.functional("inset-shadow", $ => { let T; if ($.modifier && ($.modifier.kind === "arbitrary" ? T = $.modifier.value : E($.modifier.value) && (T = `${$.modifier.value}%`)), !$.value) { let K = t.get(["--inset-shadow"]); return K === null ? void 0 : [h(), l("--tw-inset-shadow-alpha", T), ...pe("--tw-inset-shadow", K, T, se => `var(--tw-inset-shadow-color, ${se})`), l("box-shadow", n)] } if ($.value.kind === "arbitrary") { let K = $.value.value; switch ($.value.dataType ?? Y(K, ["color"])) { case "color": return K = Z(K, $.modifier, t), K === null ? void 0 : [h(), l("--tw-inset-shadow-color", Q(K, "var(--tw-inset-shadow-alpha)"))]; default: return [h(), l("--tw-inset-shadow-alpha", T), ...pe("--tw-inset-shadow", K, T, bt => `var(--tw-inset-shadow-color, ${bt})`, "inset "), l("box-shadow", n)] } } switch ($.value.value) { case "none": return $.modifier ? void 0 : [h(), l("--tw-inset-shadow", d), l("box-shadow", n)]; case "inherit": return $.modifier ? void 0 : [h(), l("--tw-inset-shadow-color", "inherit")] }{ let K = t.get([`--inset-shadow-${$.value.value}`]); if (K) return [h(), l("--tw-inset-shadow-alpha", T), ...pe("--tw-inset-shadow", K, T, se => `var(--tw-inset-shadow-color, ${se})`), l("box-shadow", n)] } { let K = te($, t, ["--box-shadow-color", "--color"]); if (K) return [h(), l("--tw-inset-shadow-color", Q(K, "var(--tw-inset-shadow-alpha)"))] } }), i("inset-shadow", () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--box-shadow-color", "--color"], modifiers: Array.from({ length: 21 }, ($, T) => `${T * 5}`) }, { values: ["none"] }, { valueThemeKeys: ["--inset-shadow"], modifiers: Array.from({ length: 21 }, ($, T) => `${T * 5}`), hasDefaultValue: t.get(["--inset-shadow"]) !== null }]), e("ring-inset", [h, ["--tw-ring-inset", "inset"]]); let A = t.get(["--default-ring-color"]) ?? "currentcolor"; r.functional("ring", $ => { if (!$.value) { if ($.modifier) return; let T = t.get(["--default-ring-width"]) ?? "1px"; return [h(), l("--tw-ring-shadow", w(T)), l("box-shadow", n)] } if ($.value.kind === "arbitrary") { let T = $.value.value; switch ($.value.dataType ?? Y(T, ["color", "length"])) { case "length": return $.modifier ? void 0 : [h(), l("--tw-ring-shadow", w(T)), l("box-shadow", n)]; default: return T = Z(T, $.modifier, t), T === null ? void 0 : [l("--tw-ring-color", T)] } } { let T = te($, t, ["--ring-color", "--color"]); if (T) return [l("--tw-ring-color", T)] } { if ($.modifier) return; let T = t.resolve($.value.value, ["--ring-width"]); if (T === null && E($.value.value) && (T = `${$.value.value}px`), T) return [h(), l("--tw-ring-shadow", w(T)), l("box-shadow", n)] } }), i("ring", () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--ring-color", "--color"], modifiers: Array.from({ length: 21 }, ($, T) => `${T * 5}`) }, { values: ["0", "1", "2", "4", "8"], valueThemeKeys: ["--ring-width"], hasDefaultValue: true }]), r.functional("inset-ring", $ => { if (!$.value) return $.modifier ? void 0 : [h(), l("--tw-inset-ring-shadow", C("1px")), l("box-shadow", n)]; if ($.value.kind === "arbitrary") { let T = $.value.value; switch ($.value.dataType ?? Y(T, ["color", "length"])) { case "length": return $.modifier ? void 0 : [h(), l("--tw-inset-ring-shadow", C(T)), l("box-shadow", n)]; default: return T = Z(T, $.modifier, t), T === null ? void 0 : [l("--tw-inset-ring-color", T)] } } { let T = te($, t, ["--ring-color", "--color"]); if (T) return [l("--tw-inset-ring-color", T)] } { if ($.modifier) return; let T = t.resolve($.value.value, ["--ring-width"]); if (T === null && E($.value.value) && (T = `${$.value.value}px`), T) return [h(), l("--tw-inset-ring-shadow", C(T)), l("box-shadow", n)] } }), i("inset-ring", () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--ring-color", "--color"], modifiers: Array.from({ length: 21 }, ($, T) => `${T * 5}`) }, { values: ["0", "1", "2", "4", "8"], valueThemeKeys: ["--ring-width"], hasDefaultValue: true }]); let P = "var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)"; r.functional("ring-offset", $ => { if ($.value) { if ($.value.kind === "arbitrary") { let T = $.value.value; switch ($.value.dataType ?? Y(T, ["color", "length"])) { case "length": return $.modifier ? void 0 : [l("--tw-ring-offset-width", T), l("--tw-ring-offset-shadow", P)]; default: return T = Z(T, $.modifier, t), T === null ? void 0 : [l("--tw-ring-offset-color", T)] } } { let T = t.resolve($.value.value, ["--ring-offset-width"]); if (T) return $.modifier ? void 0 : [l("--tw-ring-offset-width", T), l("--tw-ring-offset-shadow", P)]; if (E($.value.value)) return $.modifier ? void 0 : [l("--tw-ring-offset-width", `${$.value.value}px`), l("--tw-ring-offset-shadow", P)] } { let T = te($, t, ["--ring-offset-color", "--color"]); if (T) return [l("--tw-ring-offset-color", T)] } } }); } return i("ring-offset", () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--ring-offset-color", "--color"], modifiers: Array.from({ length: 21 }, (n, d) => `${d * 5}`) }, { values: ["0", "1", "2", "4", "8"], valueThemeKeys: ["--ring-offset-width"] }]), r.functional("@container", n => { let d = null; if (n.value === null ? d = "inline-size" : n.value.kind === "arbitrary" ? d = n.value.value : n.value.kind === "named" && n.value.value === "normal" && (d = "normal"), d !== null) return n.modifier ? [l("container-type", d), l("container-name", n.modifier.value)] : [l("container-type", d)] }), i("@container", () => [{ values: ["normal"], valueThemeKeys: [], hasDefaultValue: true }]), r } var Kt = ["number", "integer", "ratio", "percentage"]; function Pr(t) {
  	    let r = t.params; return Eo.test(r) ? i => {
  	      let e = { "--value": { usedSpacingInteger: false, usedSpacingNumber: false, themeKeys: new Set, literals: new Set }, "--modifier": { usedSpacingInteger: false, usedSpacingNumber: false, themeKeys: new Set, literals: new Set } }; U(t.nodes, o => {
  	        if (o.kind !== "declaration" || !o.value || !o.value.includes("--value(") && !o.value.includes("--modifier(")) return; let s = W(o.value); ee(s, a => {
  	          if (a.kind !== "function") return; if (a.value === "--spacing" && !(e["--modifier"].usedSpacingNumber && e["--value"].usedSpacingNumber)) return ee(a.nodes, u => { if (u.kind !== "function" || u.value !== "--value" && u.value !== "--modifier") return; let c = u.value; for (let g of u.nodes) if (g.kind === "word") { if (g.value === "integer") e[c].usedSpacingInteger ||= true; else if (g.value === "number" && (e[c].usedSpacingNumber ||= true, e["--modifier"].usedSpacingNumber && e["--value"].usedSpacingNumber)) return 2 } }), 0; if (a.value !== "--value" && a.value !== "--modifier") return; let f = z(J(a.nodes), ","); for (let [u, c] of f.entries()) c = c.replace(/\\\*/g, "*"), c = c.replace(/--(.*?)\s--(.*?)/g, "--$1-*--$2"), c = c.replace(/\s+/g, ""), c = c.replace(/(-\*){2,}/g, "-*"), c[0] === "-" && c[1] === "-" && !c.includes("-*") && (c += "-*"), f[u] = c; a.nodes = W(f.join(",")); for (let u of a.nodes) if (u.kind === "word" && (u.value[0] === '"' || u.value[0] === "'") && u.value[0] === u.value[u.value.length - 1]) { let c = u.value.slice(1, -1); e[a.value].literals.add(c); } else if (u.kind === "word" && u.value[0] === "-" && u.value[1] === "-") { let c = u.value.replace(/-\*.*$/g, ""); e[a.value].themeKeys.add(c); } else if (u.kind === "word" && !(u.value[0] === "[" && u.value[u.value.length - 1] === "]") && !Kt.includes(u.value)) {
  	            console.warn(`Unsupported bare value data type: "${u.value}".
Only valid data types are: ${Kt.map(x => `"${x}"`).join(", ")}.
`); let c = u.value, g = structuredClone(a), p = "\xB6"; ee(g.nodes, (x, { replaceWith: y }) => { x.kind === "word" && x.value === c && y({ kind: "word", value: p }); }); let m = "^".repeat(J([u]).length), v = J([g]).indexOf(p), k = ["```css", J([a]), " ".repeat(v) + m, "```"].join(`
`); console.warn(k);
  	          }
  	        }), o.value = J(s);
  	      }), i.utilities.functional(r.slice(0, -2), o => { let s = structuredClone(t), a = o.value, f = o.modifier; if (a === null) return; let u = false, c = false, g = false, p = false, m = new Map, v = false; if (U([s], (k, { parent: x, replaceWith: y }) => { if (x?.kind !== "rule" && x?.kind !== "at-rule" || k.kind !== "declaration" || !k.value) return; let N = W(k.value); (ee(N, (V, { replaceWith: R }) => { if (V.kind === "function") { if (V.value === "--value") { u = true; let D = Vr(a, V, i); return D ? (c = true, D.ratio ? v = true : m.set(k, x), R(D.nodes), 1) : (u ||= false, y([]), 2) } else if (V.value === "--modifier") { if (f === null) return y([]), 2; g = true; let D = Vr(f, V, i); return D ? (p = true, R(D.nodes), 1) : (g ||= false, y([]), 2) } } }) ?? 0) === 0 && (k.value = J(N)); }), u && !c || g && !p || v && p || f && !v && !p) return null; if (v) for (let [k, x] of m) { let y = x.nodes.indexOf(k); y !== -1 && x.nodes.splice(y, 1); } return s.nodes }), i.utilities.suggest(r.slice(0, -2), () => { let o = [], s = []; for (let [a, { literals: f, usedSpacingNumber: u, usedSpacingInteger: c, themeKeys: g }] of [[o, e["--value"]], [s, e["--modifier"]]]) { for (let p of f) a.push(p); if (u) a.push(...at); else if (c) for (let p of at) E(p) && a.push(p); for (let p of i.theme.keysInNamespaces(g)) a.push(p.replace(Er, (m, v, k) => `${v}.${k}`)); } return [{ values: o, modifiers: s }] });
  	    } : To.test(r) ? i => { i.utilities.static(r, () => structuredClone(t.nodes)); } : null
  	  } function Vr(t, r, i) { for (let e of r.nodes) { if (t.kind === "named" && e.kind === "word" && (e.value[0] === "'" || e.value[0] === '"') && e.value[e.value.length - 1] === e.value[0] && e.value.slice(1, -1) === t.value) return { nodes: W(t.value) }; if (t.kind === "named" && e.kind === "word" && e.value[0] === "-" && e.value[1] === "-") { let o = e.value; if (o.endsWith("-*")) { o = o.slice(0, -2); let s = i.theme.resolve(t.value, [o]); if (s) return { nodes: W(s) } } else { let s = o.split("-*"); if (s.length <= 1) continue; let a = [s.shift()], f = i.theme.resolveWith(t.value, a, s); if (f) { let [, u = {}] = f; { let c = u[s.pop()]; if (c) return { nodes: W(c) } } } } } else if (t.kind === "named" && e.kind === "word") { if (!Kt.includes(e.value)) continue; let o = e.value === "ratio" && "fraction" in t ? t.fraction : t.value; if (!o) continue; let s = Y(o, [e.value]); if (s === null) continue; if (s === "ratio") { let [a, f] = z(o, "/"); if (!E(a) || !E(f)) continue } else { if (s === "number" && !xe(o)) continue; if (s === "percentage" && !E(o.slice(0, -1))) continue } return { nodes: W(o), ratio: s === "ratio" } } else if (t.kind === "arbitrary" && e.kind === "word" && e.value[0] === "[" && e.value[e.value.length - 1] === "]") { let o = e.value.slice(1, -1); if (o === "*") return { nodes: W(t.value) }; if ("dataType" in t && t.dataType && t.dataType !== o) continue; if ("dataType" in t && t.dataType) return { nodes: W(t.value) }; if (Y(t.value, [o]) !== null) return { nodes: W(t.value) } } } } function pe(t, r, i, e, o = "") { let s = false, a = De(r, u => i == null ? e(u) : u.startsWith("current") ? e(Q(u, i)) : ((u.startsWith("var(") || i.startsWith("var(")) && (s = true), e(Tr(u, i)))); function f(u) { return o ? z(u, ",").map(c => o + c).join(",") : u } return s ? [l(t, f(De(r, e))), G("@supports (color: lab(from red l a b))", [l(t, f(a))])] : [l(t, f(a))] } function lt(t, r, i, e, o = "") { let s = false, a = z(r, ",").map(f => De(f, u => i == null ? e(u) : u.startsWith("current") ? e(Q(u, i)) : ((u.startsWith("var(") || i.startsWith("var(")) && (s = true), e(Tr(u, i))))).map(f => `drop-shadow(${f})`).join(" "); return s ? [l(t, o + z(r, ",").map(f => `drop-shadow(${De(f, e)})`).join(" ")), G("@supports (color: lab(from red l a b))", [l(t, o + a)])] : [l(t, o + a)] } var Dt = { "--alpha": Ro, "--spacing": Po, "--theme": Oo, theme: _o }; function Ro(t, r, i, ...e) { let [o, s] = z(i, "/").map(a => a.trim()); if (!o || !s) throw new Error(`The --alpha(\u2026) function requires a color and an alpha value, e.g.: \`--alpha(${o || "var(--my-color)"} / ${s || "50%"})\``); if (e.length > 0) throw new Error(`The --alpha(\u2026) function only accepts one argument, e.g.: \`--alpha(${o || "var(--my-color)"} / ${s || "50%"})\``); return Q(o, s) } function Po(t, r, i, ...e) { if (!i) throw new Error("The --spacing(\u2026) function requires an argument, but received none."); if (e.length > 0) throw new Error(`The --spacing(\u2026) function only accepts a single argument, but received ${e.length + 1}.`); let o = t.theme.resolve(null, ["--spacing"]); if (!o) throw new Error("The --spacing(\u2026) function requires that the `--spacing` theme variable exists, but it was not found."); return `calc(${o} * ${i})` } function Oo(t, r, i, ...e) { if (!i.startsWith("--")) throw new Error("The --theme(\u2026) function can only be used with CSS variables from your theme."); let o = false; i.endsWith(" inline") && (o = true, i = i.slice(0, -7)), r.kind === "at-rule" && (o = true); let s = t.resolveThemeValue(i, o); if (!s) { if (e.length > 0) return e.join(", "); throw new Error(`Could not resolve value for theme function: \`theme(${i})\`. Consider checking if the variable name is correct or provide a fallback value to silence this error.`) } if (e.length === 0) return s; let a = e.join(", "); if (a === "initial") return s; if (s === "initial") return a; if (s.startsWith("var(") || s.startsWith("theme(") || s.startsWith("--theme(")) { let f = W(s); return Ko(f, a), J(f) } return s } function _o(t, r, i, ...e) { i = zo(i); let o = t.resolveThemeValue(i); if (!o && e.length > 0) return e.join(", "); if (!o) throw new Error(`Could not resolve value for theme function: \`theme(${i})\`. Consider checking if the path is correct or provide a fallback value to silence this error.`); return o } var Or = new RegExp(Object.keys(Dt).map(t => `${t}\\(`).join("|")); function Ve(t, r) { let i = 0; return U(t, e => { if (e.kind === "declaration" && e.value && Or.test(e.value)) { i |= 8, e.value = _r(e.value, e, r); return } e.kind === "at-rule" && (e.name === "@media" || e.name === "@custom-media" || e.name === "@container" || e.name === "@supports") && Or.test(e.params) && (i |= 8, e.params = _r(e.params, e, r)); }), i } function _r(t, r, i) { let e = W(t); return ee(e, (o, { replaceWith: s }) => { if (o.kind === "function" && o.value in Dt) { let a = z(J(o.nodes).trim(), ",").map(u => u.trim()), f = Dt[o.value](i, r, ...a); return s(W(f)) } }), J(e) } function zo(t) { if (t[0] !== "'" && t[0] !== '"') return t; let r = "", i = t[0]; for (let e = 1; e < t.length - 1; e++) { let o = t[e], s = t[e + 1]; o === "\\" && (s === i || s === "\\") ? (r += s, e++) : r += o; } return r } function Ko(t, r) { ee(t, i => { if (i.kind === "function" && !(i.value !== "var" && i.value !== "theme" && i.value !== "--theme")) if (i.nodes.length === 1) i.nodes.push({ kind: "word", value: `, ${r}` }); else { let e = i.nodes[i.nodes.length - 1]; e.kind === "word" && e.value === "initial" && (e.value = r); } }); } function st(t, r) { let i = t.length, e = r.length, o = i < e ? i : e; for (let s = 0; s < o; s++) { let a = t.charCodeAt(s), f = r.charCodeAt(s); if (a >= 48 && a <= 57 && f >= 48 && f <= 57) { let u = s, c = s + 1, g = s, p = s + 1; for (a = t.charCodeAt(c); a >= 48 && a <= 57;)a = t.charCodeAt(++c); for (f = r.charCodeAt(p); f >= 48 && f <= 57;)f = r.charCodeAt(++p); let m = t.slice(u, c), v = r.slice(g, p), k = Number(m) - Number(v); if (k) return k; if (m < v) return -1; if (m > v) return 1; continue } if (a !== f) return a - f } return t.length - r.length } var Do = /^\d+\/\d+$/; function zr(t) { let r = new B(o => ({ name: o, utility: o, fraction: false, modifiers: [] })); for (let o of t.utilities.keys("static")) { let s = r.get(o); s.fraction = false, s.modifiers = []; } for (let o of t.utilities.keys("functional")) { let s = t.utilities.getCompletions(o); for (let a of s) for (let f of a.values) { let u = f !== null && Do.test(f), c = f === null ? o : `${o}-${f}`, g = r.get(c); if (g.utility = o, g.fraction ||= u, g.modifiers.push(...a.modifiers), a.supportsNegative) { let p = r.get(`-${c}`); p.utility = `-${o}`, p.fraction ||= u, p.modifiers.push(...a.modifiers); } } } if (r.size === 0) return []; let i = Array.from(r.values()); return i.sort((o, s) => st(o.name, s.name)), Uo(i) } function Uo(t) { let r = [], i = null, e = new Map, o = new B(() => []); for (let a of t) { let { utility: f, fraction: u } = a; i || (i = { utility: f, items: [] }, e.set(f, i)), f !== i.utility && (r.push(i), i = { utility: f, items: [] }, e.set(f, i)), u ? o.get(f).push(a) : i.items.push(a); } i && r[r.length - 1] !== i && r.push(i); for (let [a, f] of o) { let u = e.get(a); u && u.items.push(...f); } let s = []; for (let a of r) for (let f of a.items) s.push([f.name, { modifiers: f.modifiers }]); return s } function Kr(t) { let r = []; for (let [e, o] of t.variants.entries()) { let f = function ({ value: u, modifier: c } = {}) { let g = e; u && (g += s ? `-${u}` : u), c && (g += `/${c}`); let p = t.parseVariant(g); if (!p) return []; let m = M(".__placeholder__", []); if (Te(m, p, t.variants) === null) return []; let v = []; return Xe(m.nodes, (k, { path: x }) => { if (k.kind !== "rule" && k.kind !== "at-rule" || k.nodes.length > 0) return; x.sort((b, V) => { let R = b.kind === "at-rule", D = V.kind === "at-rule"; return R && !D ? -1 : !R && D ? 1 : 0 }); let y = x.flatMap(b => b.kind === "rule" ? b.selector === "&" ? [] : [b.selector] : b.kind === "at-rule" ? [`${b.name} ${b.params}`] : []), N = ""; for (let b = y.length - 1; b >= 0; b--)N = N === "" ? y[b] : `${y[b]} { ${N} }`; v.push(N); }), v }; if (o.kind === "arbitrary") continue; let s = e !== "@", a = t.variants.getCompletions(e); switch (o.kind) { case "static": { r.push({ name: e, values: a, isArbitrary: false, hasDash: s, selectors: f }); break } case "functional": { r.push({ name: e, values: a, isArbitrary: true, hasDash: s, selectors: f }); break } case "compound": { r.push({ name: e, values: a, isArbitrary: true, hasDash: s, selectors: f }); break } } } return r } function Dr(t, r) { let { astNodes: i, nodeSorting: e } = he(Array.from(r), t), o = new Map(r.map(a => [a, null])), s = 0n; for (let a of i) { let f = e.get(a)?.candidate; f && o.set(f, o.get(f) ?? s++); } return r.map(a => [a, o.get(a) ?? null]) } var ut = /^@?[a-zA-Z0-9_-]*$/; var jt = class { compareFns = new Map; variants = new Map; completions = new Map; groupOrder = null; lastOrder = 0; static(r, i, { compounds: e, order: o } = {}) { this.set(r, { kind: "static", applyFn: i, compoundsWith: 0, compounds: e ?? 2, order: o }); } fromAst(r, i) { let e = []; U(i, o => { o.kind === "rule" ? e.push(o.selector) : o.kind === "at-rule" && o.name !== "@slot" && e.push(`${o.name} ${o.params}`); }), this.static(r, o => { let s = structuredClone(i); Lt(s, o.nodes), o.nodes = s; }, { compounds: Ae(e) }); } functional(r, i, { compounds: e, order: o } = {}) { this.set(r, { kind: "functional", applyFn: i, compoundsWith: 0, compounds: e ?? 2, order: o }); } compound(r, i, e, { compounds: o, order: s } = {}) { this.set(r, { kind: "compound", applyFn: e, compoundsWith: i, compounds: o ?? 2, order: s }); } group(r, i) { this.groupOrder = this.nextOrder(), i && this.compareFns.set(this.groupOrder, i), r(), this.groupOrder = null; } has(r) { return this.variants.has(r) } get(r) { return this.variants.get(r) } kind(r) { return this.variants.get(r)?.kind } compoundsWith(r, i) { let e = this.variants.get(r), o = typeof i == "string" ? this.variants.get(i) : i.kind === "arbitrary" ? { compounds: Ae([i.selector]) } : this.variants.get(i.root); return !(!e || !o || e.kind !== "compound" || o.compounds === 0 || e.compoundsWith === 0 || (e.compoundsWith & o.compounds) === 0) } suggest(r, i) { this.completions.set(r, i); } getCompletions(r) { return this.completions.get(r)?.() ?? [] } compare(r, i) { if (r === i) return 0; if (r === null) return -1; if (i === null) return 1; if (r.kind === "arbitrary" && i.kind === "arbitrary") return r.selector < i.selector ? -1 : 1; if (r.kind === "arbitrary") return 1; if (i.kind === "arbitrary") return -1; let e = this.variants.get(r.root).order, o = this.variants.get(i.root).order, s = e - o; if (s !== 0) return s; if (r.kind === "compound" && i.kind === "compound") { let c = this.compare(r.variant, i.variant); return c !== 0 ? c : r.modifier && i.modifier ? r.modifier.value < i.modifier.value ? -1 : 1 : r.modifier ? 1 : i.modifier ? -1 : 0 } let a = this.compareFns.get(e); if (a !== void 0) return a(r, i); if (r.root !== i.root) return r.root < i.root ? -1 : 1; let f = r.value, u = i.value; return f === null ? -1 : u === null || f.kind === "arbitrary" && u.kind !== "arbitrary" ? 1 : f.kind !== "arbitrary" && u.kind === "arbitrary" || f.value < u.value ? -1 : 1 } keys() { return this.variants.keys() } entries() { return this.variants.entries() } set(r, { kind: i, applyFn: e, compounds: o, compoundsWith: s, order: a }) { let f = this.variants.get(r); f ? Object.assign(f, { kind: i, applyFn: e, compounds: o }) : (a === void 0 && (this.lastOrder = this.nextOrder(), a = this.lastOrder), this.variants.set(r, { kind: i, applyFn: e, order: a, compoundsWith: s, compounds: o })); } nextOrder() { return this.groupOrder ?? this.lastOrder + 1 } }; function Ae(t) { let r = 0; for (let i of t) { if (i[0] === "@") { if (!i.startsWith("@media") && !i.startsWith("@supports") && !i.startsWith("@container")) return 0; r |= 1; continue } if (i.includes("::")) return 0; r |= 2; } return r } function jr(t) { let r = new jt; function i(c, g, { compounds: p } = {}) { p = p ?? Ae(g), r.static(c, m => { m.nodes = g.map(v => G(v, m.nodes)); }, { compounds: p }); } i("*", [":is(& > *)"], { compounds: 0 }), i("**", [":is(& *)"], { compounds: 0 }); function e(c, g) { return g.map(p => { p = p.trim(); let m = z(p, " "); return m[0] === "not" ? m.slice(1).join(" ") : c === "@container" ? m[0][0] === "(" ? `not ${p}` : m[1] === "not" ? `${m[0]} ${m.slice(2).join(" ")}` : `${m[0]} not ${m.slice(1).join(" ")}` : `not ${p}` }) } let o = ["@media", "@supports", "@container"]; function s(c) { for (let g of o) { if (g !== c.name) continue; let p = z(c.params, ","); return p.length > 1 ? null : (p = e(c.name, p), F(c.name, p.join(", "))) } return null } function a(c) { return c.includes("::") ? null : `&:not(${z(c, ",").map(p => (p = p.replaceAll("&", "*"), p)).join(", ")})` } r.compound("not", 3, (c, g) => { if (g.variant.kind === "arbitrary" && g.variant.relative || g.modifier) return null; let p = false; if (U([c], (m, { path: v }) => { if (m.kind !== "rule" && m.kind !== "at-rule") return 0; if (m.nodes.length > 0) return 0; let k = [], x = []; for (let N of v) N.kind === "at-rule" ? k.push(N) : N.kind === "rule" && x.push(N); if (k.length > 1) return 2; if (x.length > 1) return 2; let y = []; for (let N of x) { let b = a(N.selector); if (!b) return p = false, 2; y.push(M(b, [])); } for (let N of k) { let b = s(N); if (!b) return p = false, 2; y.push(b); } return Object.assign(c, M("&", y)), p = true, 1 }), c.kind === "rule" && c.selector === "&" && c.nodes.length === 1 && Object.assign(c, c.nodes[0]), !p) return null }), r.suggest("not", () => Array.from(r.keys()).filter(c => r.compoundsWith("not", c))), r.compound("group", 2, (c, g) => { if (g.variant.kind === "arbitrary" && g.variant.relative) return null; let p = g.modifier ? `:where(.${t.prefix ? `${t.prefix}\\:` : ""}group\\/${g.modifier.value})` : `:where(.${t.prefix ? `${t.prefix}\\:` : ""}group)`, m = false; if (U([c], (v, { path: k }) => { if (v.kind !== "rule") return 0; for (let y of k.slice(0, -1)) if (y.kind === "rule") return m = false, 2; let x = v.selector.replaceAll("&", p); z(x, ",").length > 1 && (x = `:is(${x})`), v.selector = `&:is(${x} *)`, m = true; }), !m) return null }), r.suggest("group", () => Array.from(r.keys()).filter(c => r.compoundsWith("group", c))), r.compound("peer", 2, (c, g) => { if (g.variant.kind === "arbitrary" && g.variant.relative) return null; let p = g.modifier ? `:where(.${t.prefix ? `${t.prefix}\\:` : ""}peer\\/${g.modifier.value})` : `:where(.${t.prefix ? `${t.prefix}\\:` : ""}peer)`, m = false; if (U([c], (v, { path: k }) => { if (v.kind !== "rule") return 0; for (let y of k.slice(0, -1)) if (y.kind === "rule") return m = false, 2; let x = v.selector.replaceAll("&", p); z(x, ",").length > 1 && (x = `:is(${x})`), v.selector = `&:is(${x} ~ *)`, m = true; }), !m) return null }), r.suggest("peer", () => Array.from(r.keys()).filter(c => r.compoundsWith("peer", c))), i("first-letter", ["&::first-letter"]), i("first-line", ["&::first-line"]), i("marker", ["& *::marker", "&::marker", "& *::-webkit-details-marker", "&::-webkit-details-marker"]), i("selection", ["& *::selection", "&::selection"]), i("file", ["&::file-selector-button"]), i("placeholder", ["&::placeholder"]), i("backdrop", ["&::backdrop"]), i("details-content", ["&::details-content"]); { let c = function () { return j([F("@property", "--tw-content", [l("syntax", '"*"'), l("initial-value", '""'), l("inherits", "false")])]) }; r.static("before", g => { g.nodes = [M("&::before", [c(), l("content", "var(--tw-content)"), ...g.nodes])]; }, { compounds: 0 }), r.static("after", g => { g.nodes = [M("&::after", [c(), l("content", "var(--tw-content)"), ...g.nodes])]; }, { compounds: 0 }); } i("first", ["&:first-child"]), i("last", ["&:last-child"]), i("only", ["&:only-child"]), i("odd", ["&:nth-child(odd)"]), i("even", ["&:nth-child(even)"]), i("first-of-type", ["&:first-of-type"]), i("last-of-type", ["&:last-of-type"]), i("only-of-type", ["&:only-of-type"]), i("visited", ["&:visited"]), i("target", ["&:target"]), i("open", ["&:is([open], :popover-open, :open)"]), i("default", ["&:default"]), i("checked", ["&:checked"]), i("indeterminate", ["&:indeterminate"]), i("placeholder-shown", ["&:placeholder-shown"]), i("autofill", ["&:autofill"]), i("optional", ["&:optional"]), i("required", ["&:required"]), i("valid", ["&:valid"]), i("invalid", ["&:invalid"]), i("user-valid", ["&:user-valid"]), i("user-invalid", ["&:user-invalid"]), i("in-range", ["&:in-range"]), i("out-of-range", ["&:out-of-range"]), i("read-only", ["&:read-only"]), i("empty", ["&:empty"]), i("focus-within", ["&:focus-within"]), r.static("hover", c => { c.nodes = [M("&:hover", [F("@media", "(hover: hover)", c.nodes)])]; }), i("focus", ["&:focus"]), i("focus-visible", ["&:focus-visible"]), i("active", ["&:active"]), i("enabled", ["&:enabled"]), i("disabled", ["&:disabled"]), i("inert", ["&:is([inert], [inert] *)"]), r.compound("in", 2, (c, g) => { if (g.modifier) return null; let p = false; if (U([c], (m, { path: v }) => { if (m.kind !== "rule") return 0; for (let k of v.slice(0, -1)) if (k.kind === "rule") return p = false, 2; m.selector = `:where(${m.selector.replaceAll("&", "*")}) &`, p = true; }), !p) return null }), r.suggest("in", () => Array.from(r.keys()).filter(c => r.compoundsWith("in", c))), r.compound("has", 2, (c, g) => { if (g.modifier) return null; let p = false; if (U([c], (m, { path: v }) => { if (m.kind !== "rule") return 0; for (let k of v.slice(0, -1)) if (k.kind === "rule") return p = false, 2; m.selector = `&:has(${m.selector.replaceAll("&", "*")})`, p = true; }), !p) return null }), r.suggest("has", () => Array.from(r.keys()).filter(c => r.compoundsWith("has", c))), r.functional("aria", (c, g) => { if (!g.value || g.modifier) return null; g.value.kind === "arbitrary" ? c.nodes = [M(`&[aria-${Ur(g.value.value)}]`, c.nodes)] : c.nodes = [M(`&[aria-${g.value.value}="true"]`, c.nodes)]; }), r.suggest("aria", () => ["busy", "checked", "disabled", "expanded", "hidden", "pressed", "readonly", "required", "selected"]), r.functional("data", (c, g) => { if (!g.value || g.modifier) return null; c.nodes = [M(`&[data-${Ur(g.value.value)}]`, c.nodes)]; }), r.functional("nth", (c, g) => { if (!g.value || g.modifier || g.value.kind === "named" && !E(g.value.value)) return null; c.nodes = [M(`&:nth-child(${g.value.value})`, c.nodes)]; }), r.functional("nth-last", (c, g) => { if (!g.value || g.modifier || g.value.kind === "named" && !E(g.value.value)) return null; c.nodes = [M(`&:nth-last-child(${g.value.value})`, c.nodes)]; }), r.functional("nth-of-type", (c, g) => { if (!g.value || g.modifier || g.value.kind === "named" && !E(g.value.value)) return null; c.nodes = [M(`&:nth-of-type(${g.value.value})`, c.nodes)]; }), r.functional("nth-last-of-type", (c, g) => { if (!g.value || g.modifier || g.value.kind === "named" && !E(g.value.value)) return null; c.nodes = [M(`&:nth-last-of-type(${g.value.value})`, c.nodes)]; }), r.functional("supports", (c, g) => { if (!g.value || g.modifier) return null; let p = g.value.value; if (p === null) return null; if (/^[\w-]*\s*\(/.test(p)) { let m = p.replace(/\b(and|or|not)\b/g, " $1 "); c.nodes = [F("@supports", m, c.nodes)]; return } p.includes(":") || (p = `${p}: var(--tw)`), (p[0] !== "(" || p[p.length - 1] !== ")") && (p = `(${p})`), c.nodes = [F("@supports", p, c.nodes)]; }, { compounds: 1 }), i("motion-safe", ["@media (prefers-reduced-motion: no-preference)"]), i("motion-reduce", ["@media (prefers-reduced-motion: reduce)"]), i("contrast-more", ["@media (prefers-contrast: more)"]), i("contrast-less", ["@media (prefers-contrast: less)"]); { let c = function (g, p, m, v) { if (g === p) return 0; let k = v.get(g); if (k === null) return m === "asc" ? -1 : 1; let x = v.get(p); return x === null ? m === "asc" ? 1 : -1 : ye(k, x, m) }; { let g = t.namespace("--breakpoint"), p = new B(m => { switch (m.kind) { case "static": return t.resolveValue(m.root, ["--breakpoint"]) ?? null; case "functional": { if (!m.value || m.modifier) return null; let v = null; return m.value.kind === "arbitrary" ? v = m.value.value : m.value.kind === "named" && (v = t.resolveValue(m.value.value, ["--breakpoint"])), !v || v.includes("var(") ? null : v } case "arbitrary": case "compound": return null } }); r.group(() => { r.functional("max", (m, v) => { if (v.modifier) return null; let k = p.get(v); if (k === null) return null; m.nodes = [F("@media", `(width < ${k})`, m.nodes)]; }, { compounds: 1 }); }, (m, v) => c(m, v, "desc", p)), r.suggest("max", () => Array.from(g.keys()).filter(m => m !== null)), r.group(() => { for (let [m, v] of t.namespace("--breakpoint")) m !== null && r.static(m, k => { k.nodes = [F("@media", `(width >= ${v})`, k.nodes)]; }, { compounds: 1 }); r.functional("min", (m, v) => { if (v.modifier) return null; let k = p.get(v); if (k === null) return null; m.nodes = [F("@media", `(width >= ${k})`, m.nodes)]; }, { compounds: 1 }); }, (m, v) => c(m, v, "asc", p)), r.suggest("min", () => Array.from(g.keys()).filter(m => m !== null)); } { let g = t.namespace("--container"), p = new B(m => { switch (m.kind) { case "functional": { if (m.value === null) return null; let v = null; return m.value.kind === "arbitrary" ? v = m.value.value : m.value.kind === "named" && (v = t.resolveValue(m.value.value, ["--container"])), !v || v.includes("var(") ? null : v } case "static": case "arbitrary": case "compound": return null } }); r.group(() => { r.functional("@max", (m, v) => { let k = p.get(v); if (k === null) return null; m.nodes = [F("@container", v.modifier ? `${v.modifier.value} (width < ${k})` : `(width < ${k})`, m.nodes)]; }, { compounds: 1 }); }, (m, v) => c(m, v, "desc", p)), r.suggest("@max", () => Array.from(g.keys()).filter(m => m !== null)), r.group(() => { r.functional("@", (m, v) => { let k = p.get(v); if (k === null) return null; m.nodes = [F("@container", v.modifier ? `${v.modifier.value} (width >= ${k})` : `(width >= ${k})`, m.nodes)]; }, { compounds: 1 }), r.functional("@min", (m, v) => { let k = p.get(v); if (k === null) return null; m.nodes = [F("@container", v.modifier ? `${v.modifier.value} (width >= ${k})` : `(width >= ${k})`, m.nodes)]; }, { compounds: 1 }); }, (m, v) => c(m, v, "asc", p)), r.suggest("@min", () => Array.from(g.keys()).filter(m => m !== null)), r.suggest("@", () => Array.from(g.keys()).filter(m => m !== null)); } } return i("portrait", ["@media (orientation: portrait)"]), i("landscape", ["@media (orientation: landscape)"]), i("ltr", ['&:where(:dir(ltr), [dir="ltr"], [dir="ltr"] *)']), i("rtl", ['&:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *)']), i("dark", ["@media (prefers-color-scheme: dark)"]), i("starting", ["@starting-style"]), i("print", ["@media print"]), i("forced-colors", ["@media (forced-colors: active)"]), i("inverted-colors", ["@media (inverted-colors: inverted)"]), i("pointer-none", ["@media (pointer: none)"]), i("pointer-coarse", ["@media (pointer: coarse)"]), i("pointer-fine", ["@media (pointer: fine)"]), i("any-pointer-none", ["@media (any-pointer: none)"]), i("any-pointer-coarse", ["@media (any-pointer: coarse)"]), i("any-pointer-fine", ["@media (any-pointer: fine)"]), i("noscript", ["@media (scripting: none)"]), r } function Ur(t) { if (t.includes("=")) { let [r, ...i] = z(t, "="), e = i.join("=").trim(); if (e[0] === "'" || e[0] === '"') return t; if (e.length > 1) { let o = e[e.length - 1]; if (e[e.length - 2] === " " && (o === "i" || o === "I" || o === "s" || o === "S")) return `${r}="${e.slice(0, -2)}" ${o}` } return `${r}="${e}"` } return t } function Lt(t, r) { U(t, (i, { replaceWith: e }) => { if (i.kind === "at-rule" && i.name === "@slot") e(r); else if (i.kind === "at-rule" && (i.name === "@keyframes" || i.name === "@property")) return Object.assign(i, j([F(i.name, i.params, i.nodes)])), 1 }); } function Lr(t) { let r = Rr(t), i = jr(t), e = new B(u => wr(u, f)), o = new B(u => Array.from(vr(u, f))), s = new B(u => { let c = Ir(u, f); try { Ve(c.map(({ node: g }) => g), f); } catch { return [] } return c }), a = new B(u => { for (let c of Ze(u)) t.markUsedVariable(c); }), f = { theme: t, utilities: r, variants: i, invalidCandidates: new Set, important: false, candidatesToCss(u) { let c = []; for (let g of u) { let p = false, { astNodes: m } = he([g], this, { onInvalidCandidate() { p = true; } }); m = be(m, f, 0), m.length === 0 || p ? c.push(null) : c.push(le(m)); } return c }, getClassOrder(u) { return Dr(this, u) }, getClassList() { return zr(this) }, getVariants() { return Kr(this) }, parseCandidate(u) { return o.get(u) }, parseVariant(u) { return e.get(u) }, compileAstNodes(u) { return s.get(u) }, printCandidate(u) { return yr(f, u) }, printVariant(u) { return it(u) }, getVariantOrder() { let u = Array.from(e.values()); u.sort((m, v) => this.variants.compare(m, v)); let c = new Map, g, p = 0; for (let m of u) m !== null && (g !== void 0 && this.variants.compare(g, m) !== 0 && p++, c.set(m, p), g = m); return c }, resolveThemeValue(u, c = true) { let g = u.lastIndexOf("/"), p = null; g !== -1 && (p = u.slice(g + 1).trim(), u = u.slice(0, g).trim()); let m = t.resolve(null, [u], c ? 1 : 0) ?? void 0; return p && m ? Q(m, p) : m }, trackUsedVariables(u) { a.get(u); } }; return f } var It = ["container-type", "pointer-events", "visibility", "position", "inset", "inset-inline", "inset-block", "inset-inline-start", "inset-inline-end", "top", "right", "bottom", "left", "isolation", "z-index", "order", "grid-column", "grid-column-start", "grid-column-end", "grid-row", "grid-row-start", "grid-row-end", "float", "clear", "--tw-container-component", "margin", "margin-inline", "margin-block", "margin-inline-start", "margin-inline-end", "margin-top", "margin-right", "margin-bottom", "margin-left", "box-sizing", "display", "field-sizing", "aspect-ratio", "height", "max-height", "min-height", "width", "max-width", "min-width", "flex", "flex-shrink", "flex-grow", "flex-basis", "table-layout", "caption-side", "border-collapse", "border-spacing", "transform-origin", "translate", "--tw-translate-x", "--tw-translate-y", "--tw-translate-z", "scale", "--tw-scale-x", "--tw-scale-y", "--tw-scale-z", "rotate", "--tw-rotate-x", "--tw-rotate-y", "--tw-rotate-z", "--tw-skew-x", "--tw-skew-y", "transform", "animation", "cursor", "touch-action", "--tw-pan-x", "--tw-pan-y", "--tw-pinch-zoom", "resize", "scroll-snap-type", "--tw-scroll-snap-strictness", "scroll-snap-align", "scroll-snap-stop", "scroll-margin", "scroll-margin-inline", "scroll-margin-block", "scroll-margin-inline-start", "scroll-margin-inline-end", "scroll-margin-top", "scroll-margin-right", "scroll-margin-bottom", "scroll-margin-left", "scroll-padding", "scroll-padding-inline", "scroll-padding-block", "scroll-padding-inline-start", "scroll-padding-inline-end", "scroll-padding-top", "scroll-padding-right", "scroll-padding-bottom", "scroll-padding-left", "list-style-position", "list-style-type", "list-style-image", "appearance", "columns", "break-before", "break-inside", "break-after", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-template-columns", "grid-template-rows", "flex-direction", "flex-wrap", "place-content", "place-items", "align-content", "align-items", "justify-content", "justify-items", "gap", "column-gap", "row-gap", "--tw-space-x-reverse", "--tw-space-y-reverse", "divide-x-width", "divide-y-width", "--tw-divide-y-reverse", "divide-style", "divide-color", "place-self", "align-self", "justify-self", "overflow", "overflow-x", "overflow-y", "overscroll-behavior", "overscroll-behavior-x", "overscroll-behavior-y", "scroll-behavior", "border-radius", "border-start-radius", "border-end-radius", "border-top-radius", "border-right-radius", "border-bottom-radius", "border-left-radius", "border-start-start-radius", "border-start-end-radius", "border-end-end-radius", "border-end-start-radius", "border-top-left-radius", "border-top-right-radius", "border-bottom-right-radius", "border-bottom-left-radius", "border-width", "border-inline-width", "border-block-width", "border-inline-start-width", "border-inline-end-width", "border-top-width", "border-right-width", "border-bottom-width", "border-left-width", "border-style", "border-inline-style", "border-block-style", "border-inline-start-style", "border-inline-end-style", "border-top-style", "border-right-style", "border-bottom-style", "border-left-style", "border-color", "border-inline-color", "border-block-color", "border-inline-start-color", "border-inline-end-color", "border-top-color", "border-right-color", "border-bottom-color", "border-left-color", "background-color", "background-image", "--tw-gradient-position", "--tw-gradient-stops", "--tw-gradient-via-stops", "--tw-gradient-from", "--tw-gradient-from-position", "--tw-gradient-via", "--tw-gradient-via-position", "--tw-gradient-to", "--tw-gradient-to-position", "mask-image", "--tw-mask-top", "--tw-mask-top-from-color", "--tw-mask-top-from-position", "--tw-mask-top-to-color", "--tw-mask-top-to-position", "--tw-mask-right", "--tw-mask-right-from-color", "--tw-mask-right-from-position", "--tw-mask-right-to-color", "--tw-mask-right-to-position", "--tw-mask-bottom", "--tw-mask-bottom-from-color", "--tw-mask-bottom-from-position", "--tw-mask-bottom-to-color", "--tw-mask-bottom-to-position", "--tw-mask-left", "--tw-mask-left-from-color", "--tw-mask-left-from-position", "--tw-mask-left-to-color", "--tw-mask-left-to-position", "--tw-mask-linear", "--tw-mask-linear-position", "--tw-mask-linear-from-color", "--tw-mask-linear-from-position", "--tw-mask-linear-to-color", "--tw-mask-linear-to-position", "--tw-mask-radial", "--tw-mask-radial-shape", "--tw-mask-radial-size", "--tw-mask-radial-position", "--tw-mask-radial-from-color", "--tw-mask-radial-from-position", "--tw-mask-radial-to-color", "--tw-mask-radial-to-position", "--tw-mask-conic", "--tw-mask-conic-position", "--tw-mask-conic-from-color", "--tw-mask-conic-from-position", "--tw-mask-conic-to-color", "--tw-mask-conic-to-position", "box-decoration-break", "background-size", "background-attachment", "background-clip", "background-position", "background-repeat", "background-origin", "mask-composite", "mask-mode", "mask-type", "mask-size", "mask-clip", "mask-position", "mask-repeat", "mask-origin", "fill", "stroke", "stroke-width", "object-fit", "object-position", "padding", "padding-inline", "padding-block", "padding-inline-start", "padding-inline-end", "padding-top", "padding-right", "padding-bottom", "padding-left", "text-align", "text-indent", "vertical-align", "font-family", "font-size", "line-height", "font-weight", "letter-spacing", "text-wrap", "overflow-wrap", "word-break", "text-overflow", "hyphens", "white-space", "color", "text-transform", "font-style", "font-stretch", "font-variant-numeric", "text-decoration-line", "text-decoration-color", "text-decoration-style", "text-decoration-thickness", "text-underline-offset", "-webkit-font-smoothing", "placeholder-color", "caret-color", "accent-color", "color-scheme", "opacity", "background-blend-mode", "mix-blend-mode", "box-shadow", "--tw-shadow", "--tw-shadow-color", "--tw-ring-shadow", "--tw-ring-color", "--tw-inset-shadow", "--tw-inset-shadow-color", "--tw-inset-ring-shadow", "--tw-inset-ring-color", "--tw-ring-offset-width", "--tw-ring-offset-color", "outline", "outline-width", "outline-offset", "outline-color", "--tw-blur", "--tw-brightness", "--tw-contrast", "--tw-drop-shadow", "--tw-grayscale", "--tw-hue-rotate", "--tw-invert", "--tw-saturate", "--tw-sepia", "filter", "--tw-backdrop-blur", "--tw-backdrop-brightness", "--tw-backdrop-contrast", "--tw-backdrop-grayscale", "--tw-backdrop-hue-rotate", "--tw-backdrop-invert", "--tw-backdrop-opacity", "--tw-backdrop-saturate", "--tw-backdrop-sepia", "backdrop-filter", "transition-property", "transition-behavior", "transition-delay", "transition-duration", "transition-timing-function", "will-change", "contain", "content", "forced-color-adjust"]; function he(t, r, { onInvalidCandidate: i } = {}) { let e = new Map, o = [], s = new Map; for (let f of t) { if (r.invalidCandidates.has(f)) { i?.(f); continue } let u = r.parseCandidate(f); if (u.length === 0) { i?.(f); continue } s.set(f, u); } let a = r.getVariantOrder(); for (let [f, u] of s) { let c = false; for (let g of u) { let p = r.compileAstNodes(g); if (p.length !== 0) { c = true; for (let { node: m, propertySort: v } of p) { let k = 0n; for (let x of g.variants) k |= 1n << BigInt(a.get(x)); e.set(m, { properties: v, variants: k, candidate: f }), o.push(m); } } } c || i?.(f); } return o.sort((f, u) => { let c = e.get(f), g = e.get(u); if (c.variants - g.variants !== 0n) return Number(c.variants - g.variants); let p = 0; for (; p < c.properties.order.length && p < g.properties.order.length && c.properties.order[p] === g.properties.order[p];)p += 1; return (c.properties.order[p] ?? 1 / 0) - (g.properties.order[p] ?? 1 / 0) || g.properties.count - c.properties.count || st(c.candidate, g.candidate) }), { astNodes: o, nodeSorting: e } } function Ir(t, r) { let i = jo(t, r); if (i.length === 0) return []; let e = [], o = `.${me(t.raw)}`; for (let s of i) { let a = Lo(s); (t.important || r.important) && Mr(s); let f = { kind: "rule", selector: o, nodes: s }; for (let u of t.variants) if (Te(f, u, r.variants) === null) return []; e.push({ node: f, propertySort: a }); } return e } function Te(t, r, i, e = 0) { if (r.kind === "arbitrary") { if (r.relative && e === 0) return null; t.nodes = [G(r.selector, t.nodes)]; return } let { applyFn: o } = i.get(r.root); if (r.kind === "compound") { let a = F("@slot"); if (Te(a, r.variant, i, e + 1) === null || r.root === "not" && a.nodes.length > 1) return null; for (let u of a.nodes) if (u.kind !== "rule" && u.kind !== "at-rule" || o(u, r) === null) return null; U(a.nodes, u => { if ((u.kind === "rule" || u.kind === "at-rule") && u.nodes.length <= 0) return u.nodes = t.nodes, 1 }), t.nodes = a.nodes; return } if (o(t, r) === null) return null } function Fr(t) { let r = t.options?.types ?? []; return r.length > 1 && r.includes("any") } function jo(t, r) { if (t.kind === "arbitrary") { let a = t.value; return t.modifier && (a = Z(a, t.modifier, r.theme)), a === null ? [] : [[l(t.property, a)]] } let i = r.utilities.get(t.root) ?? [], e = [], o = i.filter(a => !Fr(a)); for (let a of o) { if (a.kind !== t.kind) continue; let f = a.compileFn(t); if (f !== void 0) { if (f === null) return e; e.push(f); } } if (e.length > 0) return e; let s = i.filter(a => Fr(a)); for (let a of s) { if (a.kind !== t.kind) continue; let f = a.compileFn(t); if (f !== void 0) { if (f === null) return e; e.push(f); } } return e } function Mr(t) { for (let r of t) r.kind !== "at-root" && (r.kind === "declaration" ? r.important = true : (r.kind === "rule" || r.kind === "at-rule") && Mr(r.nodes)); } function Lo(t) { let r = new Set, i = 0, e = t.slice(), o = false; for (; e.length > 0;) { let s = e.shift(); if (s.kind === "declaration") { if (s.value === void 0 || (i++, o)) continue; if (s.property === "--tw-sort") { let f = It.indexOf(s.value ?? ""); if (f !== -1) { r.add(f), o = true; continue } } let a = It.indexOf(s.property); a !== -1 && r.add(a); } else if (s.kind === "rule" || s.kind === "at-rule") for (let a of s.nodes) e.push(a); } return { order: Array.from(r).sort((s, a) => s - a), count: i } } function je(t, r) {
  	    let i = 0, e = G("&", t), o = new Set, s = new B(() => new Set), a = new B(() => new Set); U([e], (p, { parent: m, path: v }) => { if (p.kind === "at-rule") { if (p.name === "@keyframes") return U(p.nodes, k => { if (k.kind === "at-rule" && k.name === "@apply") throw new Error("You cannot use `@apply` inside `@keyframes`.") }), 1; if (p.name === "@utility") { let k = p.params.replace(/-\*$/, ""); a.get(k).add(p), U(p.nodes, x => { if (!(x.kind !== "at-rule" || x.name !== "@apply")) { o.add(p); for (let y of Br(x, r)) s.get(p).add(y); } }); return } if (p.name === "@apply") { if (m === null) return; i |= 1, o.add(m); for (let k of Br(p, r)) for (let x of v) x !== p && o.has(x) && s.get(x).add(k); } } }); let f = new Set, u = [], c = new Set; function g(p, m = []) {
  	      if (!f.has(p)) {
  	        if (c.has(p)) {
  	          let v = m[(m.indexOf(p) + 1) % m.length]; throw p.kind === "at-rule" && p.name === "@utility" && v.kind === "at-rule" && v.name === "@utility" && U(p.nodes, k => { if (k.kind !== "at-rule" || k.name !== "@apply") return; let x = k.params.split(/\s+/g); for (let y of x) for (let N of r.parseCandidate(y)) switch (N.kind) { case "arbitrary": break; case "static": case "functional": if (v.params.replace(/-\*$/, "") === N.root) throw new Error(`You cannot \`@apply\` the \`${y}\` utility here because it creates a circular dependency.`); break; } }), new Error(`Circular dependency detected:

${le([p])}
Relies on:

${le([v])}`)
  	        } c.add(p); for (let v of s.get(p)) for (let k of a.get(v)) m.push(p), g(k, m), m.pop(); f.add(p), c.delete(p), u.push(p);
  	      }
  	    } for (let p of o) g(p); for (let p of u) "nodes" in p && U(p.nodes, (m, { replaceWith: v }) => { if (m.kind !== "at-rule" || m.name !== "@apply") return; let k = m.params.split(/(\s+)/g), x = {}, y = 0; for (let [N, b] of k.entries()) N % 2 === 0 && (x[b] = y), y += b.length; { let N = Object.keys(x), b = he(N, r, { onInvalidCandidate: _ => { throw new Error(`Cannot apply unknown utility class: ${_}`) } }), V = m.src, R = b.astNodes.map(_ => { let L = b.nodeSorting.get(_)?.candidate, O = L ? x[L] : void 0; if (_ = structuredClone(_), !V || !L || O === void 0) return U([_], I => { I.src = V; }), _; let H = [V[0], V[1], V[2]]; return H[1] += 7 + O, H[2] = H[1] + L.length, U([_], I => { I.src = H; }), _ }), D = []; for (let _ of R) if (_.kind === "rule") for (let L of _.nodes) D.push(L); else D.push(_); v(D); } }); return i
  	  } function* Br(t, r) { for (let i of t.params.split(/\s+/g)) for (let e of r.parseCandidate(i)) switch (e.kind) { case "arbitrary": break; case "static": case "functional": yield e.root; break; } } async function Ft(t, r, i, e = 0, o = false) { let s = 0, a = []; return U(t, (f, { replaceWith: u }) => { if (f.kind === "at-rule" && (f.name === "@import" || f.name === "@reference")) { let c = Io(W(f.params)); if (c === null) return; f.name === "@reference" && (c.media = "reference"), s |= 2; let { uri: g, layer: p, media: m, supports: v } = c; if (g.startsWith("data:") || g.startsWith("http://") || g.startsWith("https://")) return; let k = ue({}, []); return a.push((async () => { if (e > 100) throw new Error(`Exceeded maximum recursion depth while resolving \`${g}\` in \`${r}\`)`); let x = await i(g, r), y = Se(x.content, { from: o ? x.path : void 0 }); await Ft(y, x.base, i, e + 1, o), k.nodes = Fo(f, [ue({ base: x.base }, y)], p, m, v); })()), u(k), 1 } }), a.length > 0 && await Promise.all(a), s } function Io(t) { let r, i = null, e = null, o = null; for (let s = 0; s < t.length; s++) { let a = t[s]; if (a.kind !== "separator") { if (a.kind === "word" && !r) { if (!a.value || a.value[0] !== '"' && a.value[0] !== "'") return null; r = a.value.slice(1, -1); continue } if (a.kind === "function" && a.value.toLowerCase() === "url" || !r) return null; if ((a.kind === "word" || a.kind === "function") && a.value.toLowerCase() === "layer") { if (i) return null; if (o) throw new Error("`layer(\u2026)` in an `@import` should come before any other functions or conditions"); "nodes" in a ? i = J(a.nodes) : i = ""; continue } if (a.kind === "function" && a.value.toLowerCase() === "supports") { if (o) return null; o = J(a.nodes); continue } e = J(t.slice(s)); break } } return r ? { uri: r, layer: i, media: e, supports: o } : null } function Fo(t, r, i, e, o) { let s = r; if (i !== null) { let a = F("@layer", i, s); a.src = t.src, s = [a]; } if (e !== null) { let a = F("@media", e, s); a.src = t.src, s = [a]; } if (o !== null) { let a = F("@supports", o[0] === "(" ? o : `(${o})`, s); a.src = t.src, s = [a]; } return s } function Ee(t, r = null) { return Array.isArray(t) && t.length === 2 && typeof t[1] == "object" && typeof t[1] !== null ? r ? t[1][r] ?? null : t[0] : Array.isArray(t) && r === null ? t.join(", ") : typeof t == "string" && r === null ? t : null } function Wr(t, { theme: r }, i) { for (let e of i) { let o = ct([e]); o && t.theme.clearNamespace(`--${o}`, 4); } for (let [e, o] of Mo(r)) { if (typeof o != "string" && typeof o != "number") continue; if (typeof o == "string" && (o = o.replace(/<alpha-value>/g, "1")), e[0] === "opacity" && (typeof o == "number" || typeof o == "string")) { let a = typeof o == "string" ? parseFloat(o) : o; a >= 0 && a <= 1 && (o = a * 100 + "%"); } let s = ct(e); s && t.theme.add(`--${s}`, "" + o, 7); } if (Object.hasOwn(r, "fontFamily")) { let e = 5; { let o = Ee(r.fontFamily.sans); o && t.theme.hasDefault("--font-sans") && (t.theme.add("--default-font-family", o, e), t.theme.add("--default-font-feature-settings", Ee(r.fontFamily.sans, "fontFeatureSettings") ?? "normal", e), t.theme.add("--default-font-variation-settings", Ee(r.fontFamily.sans, "fontVariationSettings") ?? "normal", e)); } { let o = Ee(r.fontFamily.mono); o && t.theme.hasDefault("--font-mono") && (t.theme.add("--default-mono-font-family", o, e), t.theme.add("--default-mono-font-feature-settings", Ee(r.fontFamily.mono, "fontFeatureSettings") ?? "normal", e), t.theme.add("--default-mono-font-variation-settings", Ee(r.fontFamily.mono, "fontVariationSettings") ?? "normal", e)); } } return r } function Mo(t) { let r = []; return qr(t, [], (i, e) => { if (Wo(i)) return r.push([e, i]), 1; if (qo(i)) { r.push([e, i[0]]); for (let o of Reflect.ownKeys(i[1])) r.push([[...e, `-${o}`], i[1][o]]); return 1 } if (Array.isArray(i) && i.every(o => typeof o == "string")) return e[0] === "fontSize" ? (r.push([e, i[0]]), i.length >= 2 && r.push([[...e, "-line-height"], i[1]])) : r.push([e, i.join(", ")]), 1 }), r } var Bo = /^[a-zA-Z0-9-_%/\.]+$/; function ct(t) { if (t[0] === "container") return null; t = structuredClone(t), t[0] === "animation" && (t[0] = "animate"), t[0] === "aspectRatio" && (t[0] = "aspect"), t[0] === "borderRadius" && (t[0] = "radius"), t[0] === "boxShadow" && (t[0] = "shadow"), t[0] === "colors" && (t[0] = "color"), t[0] === "containers" && (t[0] = "container"), t[0] === "fontFamily" && (t[0] = "font"), t[0] === "fontSize" && (t[0] = "text"), t[0] === "letterSpacing" && (t[0] = "tracking"), t[0] === "lineHeight" && (t[0] = "leading"), t[0] === "maxWidth" && (t[0] = "container"), t[0] === "screens" && (t[0] = "breakpoint"), t[0] === "transitionTimingFunction" && (t[0] = "ease"); for (let r of t) if (!Bo.test(r)) return null; return t.map((r, i, e) => r === "1" && i !== e.length - 1 ? "" : r).map(r => r.replaceAll(".", "_").replace(/([a-z])([A-Z])/g, (i, e, o) => `${e}-${o.toLowerCase()}`)).filter((r, i) => r !== "DEFAULT" || i !== t.length - 1).join("-") } function Wo(t) { return typeof t == "number" || typeof t == "string" } function qo(t) { if (!Array.isArray(t) || t.length !== 2 || typeof t[0] != "string" && typeof t[0] != "number" || t[1] === void 0 || t[1] === null || typeof t[1] != "object") return false; for (let r of Reflect.ownKeys(t[1])) if (typeof r != "string" || typeof t[1][r] != "string" && typeof t[1][r] != "number") return false; return true } function qr(t, r = [], i) { for (let e of Reflect.ownKeys(t)) { let o = t[e]; if (o == null) continue; let s = [...r, e], a = i(o, s) ?? 0; if (a !== 1) { if (a === 2) return 2; if (!(!Array.isArray(o) && typeof o != "object") && qr(o, s, i) === 2) return 2 } } } function ft(t) { let r = []; for (let i of z(t, ".")) { if (!i.includes("[")) { r.push(i); continue } let e = 0; for (; ;) { let o = i.indexOf("[", e), s = i.indexOf("]", o); if (o === -1 || s === -1) break; o > e && r.push(i.slice(e, o)), r.push(i.slice(o + 1, s)), e = s + 1; } e <= i.length - 1 && r.push(i.slice(e)); } return r } function Re(t) { if (Object.prototype.toString.call(t) !== "[object Object]") return false; let r = Object.getPrototypeOf(t); return r === null || Object.getPrototypeOf(r) === null } function Le(t, r, i, e = []) { for (let o of r) if (o != null) for (let s of Reflect.ownKeys(o)) { e.push(s); let a = i(t[s], o[s], e); a !== void 0 ? t[s] = a : !Re(t[s]) || !Re(o[s]) ? t[s] = o[s] : t[s] = Le({}, [t[s], o[s]], i, e), e.pop(); } return t } function dt(t, r, i) { return function (o, s) { let a = o.lastIndexOf("/"), f = null; a !== -1 && (f = o.slice(a + 1).trim(), o = o.slice(0, a).trim()); let u = (() => { let c = ft(o), [g, p] = Ho(t.theme, c), m = i(Hr(r() ?? {}, c) ?? null); if (typeof m == "string" && (m = m.replace("<alpha-value>", "1")), typeof g != "object") return typeof p != "object" && p & 4 ? m ?? g : g; if (m !== null && typeof m == "object" && !Array.isArray(m)) { let v = Le({}, [m], (k, x) => x); if (g === null && Object.hasOwn(m, "__CSS_VALUES__")) { let k = {}; for (let x in m.__CSS_VALUES__) k[x] = m[x], delete v[x]; g = k; } for (let k in g) k !== "__CSS_VALUES__" && (m?.__CSS_VALUES__?.[k] & 4 && Hr(v, k.split("-")) !== void 0 || (v[ve(k)] = g[k])); return v } if (Array.isArray(g) && Array.isArray(p) && Array.isArray(m)) { let v = g[0], k = g[1]; p[0] & 4 && (v = m[0] ?? v); for (let x of Object.keys(k)) p[1][x] & 4 && (k[x] = m[1][x] ?? k[x]); return [v, k] } return g ?? m })(); return f && typeof u == "string" && (u = Q(u, f)), u ?? s } } function Ho(t, r) { if (r.length === 1 && r[0].startsWith("--")) return [t.get([r[0]]), t.getOptions(r[0])]; let i = ct(r), e = new Map, o = new B(() => new Map), s = t.namespace(`--${i}`); if (s.size === 0) return [null, 0]; let a = new Map; for (let [g, p] of s) { if (!g || !g.includes("--")) { e.set(g, p), a.set(g, t.getOptions(g ? `--${i}-${g}` : `--${i}`)); continue } let m = g.indexOf("--"), v = g.slice(0, m), k = g.slice(m + 2); k = k.replace(/-([a-z])/g, (x, y) => y.toUpperCase()), o.get(v === "" ? null : v).set(k, [p, t.getOptions(`--${i}${g}`)]); } let f = t.getOptions(`--${i}`); for (let [g, p] of o) { let m = e.get(g); if (typeof m != "string") continue; let v = {}, k = {}; for (let [x, [y, N]] of p) v[x] = y, k[x] = N; e.set(g, [m, v]), a.set(g, [f, k]); } let u = {}, c = {}; for (let [g, p] of e) Gr(u, [g ?? "DEFAULT"], p); for (let [g, p] of a) Gr(c, [g ?? "DEFAULT"], p); return r[r.length - 1] === "DEFAULT" ? [u?.DEFAULT ?? null, c.DEFAULT ?? 0] : "DEFAULT" in u && Object.keys(u).length === 1 ? [u.DEFAULT, c.DEFAULT ?? 0] : (u.__CSS_VALUES__ = c, [u, c]) } function Hr(t, r) { for (let i = 0; i < r.length; ++i) { let e = r[i]; if (t?.[e] === void 0) { if (r[i + 1] === void 0) return; r[i + 1] = `${e}-${r[i + 1]}`; continue } t = t[e]; } return t } function Gr(t, r, i) { for (let e of r.slice(0, -1)) t[e] === void 0 && (t[e] = {}), t = t[e]; t[r[r.length - 1]] = i; } function Go(t) { return { kind: "combinator", value: t } } function Yo(t, r) { return { kind: "function", value: t, nodes: r } } function Ie(t) { return { kind: "selector", value: t } } function Jo(t) { return { kind: "separator", value: t } } function Qo(t) { return { kind: "value", value: t } } function Fe(t, r, i = null) { for (let e = 0; e < t.length; e++) { let o = t[e], s = false, a = 0, f = r(o, { parent: i, replaceWith(u) { s || (s = true, Array.isArray(u) ? u.length === 0 ? (t.splice(e, 1), a = 0) : u.length === 1 ? (t[e] = u[0], a = 1) : (t.splice(e, 1, ...u), a = u.length) : (t[e] = u, a = 1)); } }) ?? 0; if (s) { f === 0 ? e-- : e += a - 1; continue } if (f === 2) return 2; if (f !== 1 && o.kind === "function" && Fe(o.nodes, r, o) === 2) return 2 } } function Me(t) { let r = ""; for (let i of t) switch (i.kind) { case "combinator": case "selector": case "separator": case "value": { r += i.value; break } case "function": r += i.value + "(" + Me(i.nodes) + ")"; }return r } var Yr = 92, Zo = 93, Jr = 41, Xo = 58, Qr = 44, en = 34, tn = 46, Zr = 62, Xr = 10, rn = 35, ei = 91, ti = 40, ri = 43, on = 39, ii = 32, oi = 9, ni = 126; function pt(t) {
  	    t = t.replaceAll(`\r
`, `
`); let r = [], i = [], e = null, o = "", s; for (let a = 0; a < t.length; a++) { let f = t.charCodeAt(a); switch (f) { case Qr: case Zr: case Xr: case ii: case ri: case oi: case ni: { if (o.length > 0) { let m = Ie(o); e ? e.nodes.push(m) : r.push(m), o = ""; } let u = a, c = a + 1; for (; c < t.length && (s = t.charCodeAt(c), !(s !== Qr && s !== Zr && s !== Xr && s !== ii && s !== ri && s !== oi && s !== ni)); c++); a = c - 1; let g = t.slice(u, c), p = g.trim() === "," ? Jo(g) : Go(g); e ? e.nodes.push(p) : r.push(p); break } case ti: { let u = Yo(o, []); if (o = "", u.value !== ":not" && u.value !== ":where" && u.value !== ":has" && u.value !== ":is") { let c = a + 1, g = 0; for (let m = a + 1; m < t.length; m++) { if (s = t.charCodeAt(m), s === ti) { g++; continue } if (s === Jr) { if (g === 0) { a = m; break } g--; } } let p = a; u.nodes.push(Qo(t.slice(c, p))), o = "", a = p, e ? e.nodes.push(u) : r.push(u); break } e ? e.nodes.push(u) : r.push(u), i.push(u), e = u; break } case Jr: { let u = i.pop(); if (o.length > 0) { let c = Ie(o); u.nodes.push(c), o = ""; } i.length > 0 ? e = i[i.length - 1] : e = null; break } case tn: case Xo: case rn: { if (o.length > 0) { let u = Ie(o); e ? e.nodes.push(u) : r.push(u); } o = String.fromCharCode(f); break } case ei: { if (o.length > 0) { let g = Ie(o); e ? e.nodes.push(g) : r.push(g); } o = ""; let u = a, c = 0; for (let g = a + 1; g < t.length; g++) { if (s = t.charCodeAt(g), s === ei) { c++; continue } if (s === Zo) { if (c === 0) { a = g; break } c--; } } o += t.slice(u, a + 1); break } case on: case en: { let u = a; for (let c = a + 1; c < t.length; c++)if (s = t.charCodeAt(c), s === Yr) c += 1; else if (s === f) { a = c; break } o += t.slice(u, a + 1); break } case Yr: { let u = t.charCodeAt(a + 1); o += String.fromCharCode(f) + String.fromCharCode(u), a += 1; break } default: o += String.fromCharCode(f); } } return o.length > 0 && r.push(Ie(o)), r
  	  } var li = /^[a-z@][a-zA-Z0-9/%._-]*$/; function Mt({ designSystem: t, ast: r, resolvedConfig: i, featuresRef: e, referenceMode: o }) { let s = { addBase(a) { if (o) return; let f = ce(a); e.current |= Ve(f, t), r.push(F("@layer", "base", f)); }, addVariant(a, f) { if (!ut.test(a)) throw new Error(`\`addVariant('${a}')\` defines an invalid variant name. Variants should only contain alphanumeric, dashes or underscore characters.`); if (typeof f == "string") { if (f.includes(":merge(")) return } else if (Array.isArray(f)) { if (f.some(c => c.includes(":merge("))) return } else if (typeof f == "object") { let c = function (g, p) { return Object.entries(g).some(([m, v]) => m.includes(p) || typeof v == "object" && c(v, p)) }; if (c(f, ":merge(")) return } typeof f == "string" || Array.isArray(f) ? t.variants.static(a, c => { c.nodes = ai(f, c.nodes); }, { compounds: Ae(typeof f == "string" ? [f] : f) }) : typeof f == "object" && t.variants.fromAst(a, ce(f)); }, matchVariant(a, f, u) { function c(p, m, v) { let k = f(p, { modifier: m?.value ?? null }); return ai(k, v) } try { let p = f("a", { modifier: null }); if (typeof p == "string" && p.includes(":merge(")) return; if (Array.isArray(p) && p.some(m => m.includes(":merge("))) return } catch { } let g = Object.keys(u?.values ?? {}); t.variants.group(() => { t.variants.functional(a, (p, m) => { if (!m.value) { if (u?.values && "DEFAULT" in u.values) { p.nodes = c(u.values.DEFAULT, m.modifier, p.nodes); return } return null } if (m.value.kind === "arbitrary") p.nodes = c(m.value.value, m.modifier, p.nodes); else if (m.value.kind === "named" && u?.values) { let v = u.values[m.value.value]; if (typeof v != "string") return; p.nodes = c(v, m.modifier, p.nodes); } }); }, (p, m) => { if (p.kind !== "functional" || m.kind !== "functional") return 0; let v = p.value ? p.value.value : "DEFAULT", k = m.value ? m.value.value : "DEFAULT", x = u?.values?.[v] ?? v, y = u?.values?.[k] ?? k; if (u && typeof u.sort == "function") return u.sort({ value: x, modifier: p.modifier?.value ?? null }, { value: y, modifier: m.modifier?.value ?? null }); let N = g.indexOf(v), b = g.indexOf(k); return N = N === -1 ? g.length : N, b = b === -1 ? g.length : b, N !== b ? N - b : x < y ? -1 : 1 }); }, addUtilities(a) { a = Array.isArray(a) ? a : [a]; let f = a.flatMap(c => Object.entries(c)); f = f.flatMap(([c, g]) => z(c, ",").map(p => [p.trim(), g])); let u = new B(() => []); for (let [c, g] of f) { if (c.startsWith("@keyframes ")) { o || r.push(G(c, ce(g))); continue } let p = pt(c), m = false; if (Fe(p, v => { if (v.kind === "selector" && v.value[0] === "." && li.test(v.value.slice(1))) { let k = v.value; v.value = "&"; let x = Me(p), y = k.slice(1), N = x === "&" ? ce(g) : [G(x, ce(g))]; u.get(y).push(...N), m = true, v.value = k; return } if (v.kind === "function" && v.value === ":not") return 1 }), !m) throw new Error(`\`addUtilities({ '${c}' : \u2026 })\` defines an invalid utility selector. Utilities must be a single class name and start with a lowercase letter, eg. \`.scrollbar-none\`.`) } for (let [c, g] of u) t.theme.prefix && U(g, p => { if (p.kind === "rule") { let m = pt(p.selector); Fe(m, v => { v.kind === "selector" && v.value[0] === "." && (v.value = `.${t.theme.prefix}\\:${v.value.slice(1)}`); }), p.selector = Me(m); } }), t.utilities.static(c, p => { let m = structuredClone(g); return si(m, c, p.raw), e.current |= je(m, t), m }); }, matchUtilities(a, f) { let u = f?.type ? Array.isArray(f?.type) ? f.type : [f.type] : ["any"]; for (let [g, p] of Object.entries(a)) { let m = function ({ negative: v }) { return k => { if (k.value?.kind === "arbitrary" && u.length > 0 && !u.includes("any") && (k.value.dataType && !u.includes(k.value.dataType) || !k.value.dataType && !Y(k.value.value, u))) return; let x = u.includes("color"), y = null, N = false; { let R = f?.values ?? {}; x && (R = Object.assign({ inherit: "inherit", transparent: "transparent", current: "currentcolor" }, R)), k.value ? k.value.kind === "arbitrary" ? y = k.value.value : k.value.fraction && R[k.value.fraction] ? (y = R[k.value.fraction], N = true) : R[k.value.value] ? y = R[k.value.value] : R.__BARE_VALUE__ && (y = R.__BARE_VALUE__(k.value) ?? null, N = (k.value.fraction !== null && y?.includes("/")) ?? false) : y = R.DEFAULT ?? null; } if (y === null) return; let b; { let R = f?.modifiers ?? null; k.modifier ? R === "any" || k.modifier.kind === "arbitrary" ? b = k.modifier.value : R?.[k.modifier.value] ? b = R[k.modifier.value] : x && !Number.isNaN(Number(k.modifier.value)) ? b = `${k.modifier.value}%` : b = null : b = null; } if (k.modifier && b === null && !N) return k.value?.kind === "arbitrary" ? null : void 0; x && b !== null && (y = Q(y, b)), v && (y = `calc(${y} * -1)`); let V = ce(p(y, { modifier: b })); return si(V, g, k.raw), e.current |= je(V, t), V } }; if (!li.test(g)) throw new Error(`\`matchUtilities({ '${g}' : \u2026 })\` defines an invalid utility name. Utilities should be alphanumeric and start with a lowercase letter, eg. \`scrollbar\`.`); f?.supportsNegativeValues && t.utilities.functional(`-${g}`, m({ negative: true }), { types: u }), t.utilities.functional(g, m({ negative: false }), { types: u }), t.utilities.suggest(g, () => { let v = f?.values ?? {}, k = new Set(Object.keys(v)); k.delete("__BARE_VALUE__"), k.has("DEFAULT") && (k.delete("DEFAULT"), k.add(null)); let x = f?.modifiers ?? {}, y = x === "any" ? [] : Object.keys(x); return [{ supportsNegative: f?.supportsNegativeValues ?? false, values: Array.from(k), modifiers: y }] }); } }, addComponents(a, f) { this.addUtilities(a, f); }, matchComponents(a, f) { this.matchUtilities(a, f); }, theme: dt(t, () => i.theme ?? {}, a => a), prefix(a) { return a }, config(a, f) { let u = i; if (!a) return u; let c = ft(a); for (let g = 0; g < c.length; ++g) { let p = c[g]; if (u[p] === void 0) return f; u = u[p]; } return u ?? f } }; return s.addComponents = s.addComponents.bind(s), s.matchComponents = s.matchComponents.bind(s), s } function ce(t) { let r = []; t = Array.isArray(t) ? t : [t]; let i = t.flatMap(e => Object.entries(e)); for (let [e, o] of i) if (typeof o != "object") { if (!e.startsWith("--")) { if (o === "@slot") { r.push(G(e, [F("@slot")])); continue } e = e.replace(/([A-Z])/g, "-$1").toLowerCase(); } r.push(l(e, String(o))); } else if (Array.isArray(o)) for (let s of o) typeof s == "string" ? r.push(l(e, s)) : r.push(G(e, ce(s))); else o !== null && r.push(G(e, ce(o))); return r } function ai(t, r) { return (typeof t == "string" ? [t] : t).flatMap(e => { if (e.trim().endsWith("}")) { let o = e.replace("}", "{@slot}}"), s = Se(o); return Lt(s, r), s } else return G(e, r) }) } function si(t, r, i) { U(t, e => { if (e.kind === "rule") { let o = pt(e.selector); Fe(o, s => { s.kind === "selector" && s.value === `.${r}` && (s.value = `.${me(i)}`); }), e.selector = Me(o); } }); } function ui(t, r, i) { for (let e of ln(r)) t.theme.addKeyframes(e); } function ln(t) { let r = []; if ("keyframes" in t.theme) for (let [i, e] of Object.entries(t.theme.keyframes)) r.push(F("@keyframes", i, ce(e))); return r } var mt = { inherit: "inherit", current: "currentcolor", transparent: "transparent", black: "#000", white: "#fff", slate: { 50: "oklch(98.4% 0.003 247.858)", 100: "oklch(96.8% 0.007 247.896)", 200: "oklch(92.9% 0.013 255.508)", 300: "oklch(86.9% 0.022 252.894)", 400: "oklch(70.4% 0.04 256.788)", 500: "oklch(55.4% 0.046 257.417)", 600: "oklch(44.6% 0.043 257.281)", 700: "oklch(37.2% 0.044 257.287)", 800: "oklch(27.9% 0.041 260.031)", 900: "oklch(20.8% 0.042 265.755)", 950: "oklch(12.9% 0.042 264.695)" }, gray: { 50: "oklch(98.5% 0.002 247.839)", 100: "oklch(96.7% 0.003 264.542)", 200: "oklch(92.8% 0.006 264.531)", 300: "oklch(87.2% 0.01 258.338)", 400: "oklch(70.7% 0.022 261.325)", 500: "oklch(55.1% 0.027 264.364)", 600: "oklch(44.6% 0.03 256.802)", 700: "oklch(37.3% 0.034 259.733)", 800: "oklch(27.8% 0.033 256.848)", 900: "oklch(21% 0.034 264.665)", 950: "oklch(13% 0.028 261.692)" }, zinc: { 50: "oklch(98.5% 0 0)", 100: "oklch(96.7% 0.001 286.375)", 200: "oklch(92% 0.004 286.32)", 300: "oklch(87.1% 0.006 286.286)", 400: "oklch(70.5% 0.015 286.067)", 500: "oklch(55.2% 0.016 285.938)", 600: "oklch(44.2% 0.017 285.786)", 700: "oklch(37% 0.013 285.805)", 800: "oklch(27.4% 0.006 286.033)", 900: "oklch(21% 0.006 285.885)", 950: "oklch(14.1% 0.005 285.823)" }, neutral: { 50: "oklch(98.5% 0 0)", 100: "oklch(97% 0 0)", 200: "oklch(92.2% 0 0)", 300: "oklch(87% 0 0)", 400: "oklch(70.8% 0 0)", 500: "oklch(55.6% 0 0)", 600: "oklch(43.9% 0 0)", 700: "oklch(37.1% 0 0)", 800: "oklch(26.9% 0 0)", 900: "oklch(20.5% 0 0)", 950: "oklch(14.5% 0 0)" }, stone: { 50: "oklch(98.5% 0.001 106.423)", 100: "oklch(97% 0.001 106.424)", 200: "oklch(92.3% 0.003 48.717)", 300: "oklch(86.9% 0.005 56.366)", 400: "oklch(70.9% 0.01 56.259)", 500: "oklch(55.3% 0.013 58.071)", 600: "oklch(44.4% 0.011 73.639)", 700: "oklch(37.4% 0.01 67.558)", 800: "oklch(26.8% 0.007 34.298)", 900: "oklch(21.6% 0.006 56.043)", 950: "oklch(14.7% 0.004 49.25)" }, red: { 50: "oklch(97.1% 0.013 17.38)", 100: "oklch(93.6% 0.032 17.717)", 200: "oklch(88.5% 0.062 18.334)", 300: "oklch(80.8% 0.114 19.571)", 400: "oklch(70.4% 0.191 22.216)", 500: "oklch(63.7% 0.237 25.331)", 600: "oklch(57.7% 0.245 27.325)", 700: "oklch(50.5% 0.213 27.518)", 800: "oklch(44.4% 0.177 26.899)", 900: "oklch(39.6% 0.141 25.723)", 950: "oklch(25.8% 0.092 26.042)" }, orange: { 50: "oklch(98% 0.016 73.684)", 100: "oklch(95.4% 0.038 75.164)", 200: "oklch(90.1% 0.076 70.697)", 300: "oklch(83.7% 0.128 66.29)", 400: "oklch(75% 0.183 55.934)", 500: "oklch(70.5% 0.213 47.604)", 600: "oklch(64.6% 0.222 41.116)", 700: "oklch(55.3% 0.195 38.402)", 800: "oklch(47% 0.157 37.304)", 900: "oklch(40.8% 0.123 38.172)", 950: "oklch(26.6% 0.079 36.259)" }, amber: { 50: "oklch(98.7% 0.022 95.277)", 100: "oklch(96.2% 0.059 95.617)", 200: "oklch(92.4% 0.12 95.746)", 300: "oklch(87.9% 0.169 91.605)", 400: "oklch(82.8% 0.189 84.429)", 500: "oklch(76.9% 0.188 70.08)", 600: "oklch(66.6% 0.179 58.318)", 700: "oklch(55.5% 0.163 48.998)", 800: "oklch(47.3% 0.137 46.201)", 900: "oklch(41.4% 0.112 45.904)", 950: "oklch(27.9% 0.077 45.635)" }, yellow: { 50: "oklch(98.7% 0.026 102.212)", 100: "oklch(97.3% 0.071 103.193)", 200: "oklch(94.5% 0.129 101.54)", 300: "oklch(90.5% 0.182 98.111)", 400: "oklch(85.2% 0.199 91.936)", 500: "oklch(79.5% 0.184 86.047)", 600: "oklch(68.1% 0.162 75.834)", 700: "oklch(55.4% 0.135 66.442)", 800: "oklch(47.6% 0.114 61.907)", 900: "oklch(42.1% 0.095 57.708)", 950: "oklch(28.6% 0.066 53.813)" }, lime: { 50: "oklch(98.6% 0.031 120.757)", 100: "oklch(96.7% 0.067 122.328)", 200: "oklch(93.8% 0.127 124.321)", 300: "oklch(89.7% 0.196 126.665)", 400: "oklch(84.1% 0.238 128.85)", 500: "oklch(76.8% 0.233 130.85)", 600: "oklch(64.8% 0.2 131.684)", 700: "oklch(53.2% 0.157 131.589)", 800: "oklch(45.3% 0.124 130.933)", 900: "oklch(40.5% 0.101 131.063)", 950: "oklch(27.4% 0.072 132.109)" }, green: { 50: "oklch(98.2% 0.018 155.826)", 100: "oklch(96.2% 0.044 156.743)", 200: "oklch(92.5% 0.084 155.995)", 300: "oklch(87.1% 0.15 154.449)", 400: "oklch(79.2% 0.209 151.711)", 500: "oklch(72.3% 0.219 149.579)", 600: "oklch(62.7% 0.194 149.214)", 700: "oklch(52.7% 0.154 150.069)", 800: "oklch(44.8% 0.119 151.328)", 900: "oklch(39.3% 0.095 152.535)", 950: "oklch(26.6% 0.065 152.934)" }, emerald: { 50: "oklch(97.9% 0.021 166.113)", 100: "oklch(95% 0.052 163.051)", 200: "oklch(90.5% 0.093 164.15)", 300: "oklch(84.5% 0.143 164.978)", 400: "oklch(76.5% 0.177 163.223)", 500: "oklch(69.6% 0.17 162.48)", 600: "oklch(59.6% 0.145 163.225)", 700: "oklch(50.8% 0.118 165.612)", 800: "oklch(43.2% 0.095 166.913)", 900: "oklch(37.8% 0.077 168.94)", 950: "oklch(26.2% 0.051 172.552)" }, teal: { 50: "oklch(98.4% 0.014 180.72)", 100: "oklch(95.3% 0.051 180.801)", 200: "oklch(91% 0.096 180.426)", 300: "oklch(85.5% 0.138 181.071)", 400: "oklch(77.7% 0.152 181.912)", 500: "oklch(70.4% 0.14 182.503)", 600: "oklch(60% 0.118 184.704)", 700: "oklch(51.1% 0.096 186.391)", 800: "oklch(43.7% 0.078 188.216)", 900: "oklch(38.6% 0.063 188.416)", 950: "oklch(27.7% 0.046 192.524)" }, cyan: { 50: "oklch(98.4% 0.019 200.873)", 100: "oklch(95.6% 0.045 203.388)", 200: "oklch(91.7% 0.08 205.041)", 300: "oklch(86.5% 0.127 207.078)", 400: "oklch(78.9% 0.154 211.53)", 500: "oklch(71.5% 0.143 215.221)", 600: "oklch(60.9% 0.126 221.723)", 700: "oklch(52% 0.105 223.128)", 800: "oklch(45% 0.085 224.283)", 900: "oklch(39.8% 0.07 227.392)", 950: "oklch(30.2% 0.056 229.695)" }, sky: { 50: "oklch(97.7% 0.013 236.62)", 100: "oklch(95.1% 0.026 236.824)", 200: "oklch(90.1% 0.058 230.902)", 300: "oklch(82.8% 0.111 230.318)", 400: "oklch(74.6% 0.16 232.661)", 500: "oklch(68.5% 0.169 237.323)", 600: "oklch(58.8% 0.158 241.966)", 700: "oklch(50% 0.134 242.749)", 800: "oklch(44.3% 0.11 240.79)", 900: "oklch(39.1% 0.09 240.876)", 950: "oklch(29.3% 0.066 243.157)" }, blue: { 50: "oklch(97% 0.014 254.604)", 100: "oklch(93.2% 0.032 255.585)", 200: "oklch(88.2% 0.059 254.128)", 300: "oklch(80.9% 0.105 251.813)", 400: "oklch(70.7% 0.165 254.624)", 500: "oklch(62.3% 0.214 259.815)", 600: "oklch(54.6% 0.245 262.881)", 700: "oklch(48.8% 0.243 264.376)", 800: "oklch(42.4% 0.199 265.638)", 900: "oklch(37.9% 0.146 265.522)", 950: "oklch(28.2% 0.091 267.935)" }, indigo: { 50: "oklch(96.2% 0.018 272.314)", 100: "oklch(93% 0.034 272.788)", 200: "oklch(87% 0.065 274.039)", 300: "oklch(78.5% 0.115 274.713)", 400: "oklch(67.3% 0.182 276.935)", 500: "oklch(58.5% 0.233 277.117)", 600: "oklch(51.1% 0.262 276.966)", 700: "oklch(45.7% 0.24 277.023)", 800: "oklch(39.8% 0.195 277.366)", 900: "oklch(35.9% 0.144 278.697)", 950: "oklch(25.7% 0.09 281.288)" }, violet: { 50: "oklch(96.9% 0.016 293.756)", 100: "oklch(94.3% 0.029 294.588)", 200: "oklch(89.4% 0.057 293.283)", 300: "oklch(81.1% 0.111 293.571)", 400: "oklch(70.2% 0.183 293.541)", 500: "oklch(60.6% 0.25 292.717)", 600: "oklch(54.1% 0.281 293.009)", 700: "oklch(49.1% 0.27 292.581)", 800: "oklch(43.2% 0.232 292.759)", 900: "oklch(38% 0.189 293.745)", 950: "oklch(28.3% 0.141 291.089)" }, purple: { 50: "oklch(97.7% 0.014 308.299)", 100: "oklch(94.6% 0.033 307.174)", 200: "oklch(90.2% 0.063 306.703)", 300: "oklch(82.7% 0.119 306.383)", 400: "oklch(71.4% 0.203 305.504)", 500: "oklch(62.7% 0.265 303.9)", 600: "oklch(55.8% 0.288 302.321)", 700: "oklch(49.6% 0.265 301.924)", 800: "oklch(43.8% 0.218 303.724)", 900: "oklch(38.1% 0.176 304.987)", 950: "oklch(29.1% 0.149 302.717)" }, fuchsia: { 50: "oklch(97.7% 0.017 320.058)", 100: "oklch(95.2% 0.037 318.852)", 200: "oklch(90.3% 0.076 319.62)", 300: "oklch(83.3% 0.145 321.434)", 400: "oklch(74% 0.238 322.16)", 500: "oklch(66.7% 0.295 322.15)", 600: "oklch(59.1% 0.293 322.896)", 700: "oklch(51.8% 0.253 323.949)", 800: "oklch(45.2% 0.211 324.591)", 900: "oklch(40.1% 0.17 325.612)", 950: "oklch(29.3% 0.136 325.661)" }, pink: { 50: "oklch(97.1% 0.014 343.198)", 100: "oklch(94.8% 0.028 342.258)", 200: "oklch(89.9% 0.061 343.231)", 300: "oklch(82.3% 0.12 346.018)", 400: "oklch(71.8% 0.202 349.761)", 500: "oklch(65.6% 0.241 354.308)", 600: "oklch(59.2% 0.249 0.584)", 700: "oklch(52.5% 0.223 3.958)", 800: "oklch(45.9% 0.187 3.815)", 900: "oklch(40.8% 0.153 2.432)", 950: "oklch(28.4% 0.109 3.907)" }, rose: { 50: "oklch(96.9% 0.015 12.422)", 100: "oklch(94.1% 0.03 12.58)", 200: "oklch(89.2% 0.058 10.001)", 300: "oklch(81% 0.117 11.638)", 400: "oklch(71.2% 0.194 13.428)", 500: "oklch(64.5% 0.246 16.439)", 600: "oklch(58.6% 0.253 17.585)", 700: "oklch(51.4% 0.222 16.935)", 800: "oklch(45.5% 0.188 13.697)", 900: "oklch(41% 0.159 10.272)", 950: "oklch(27.1% 0.105 12.094)" } }; function Ce(t) { return { __BARE_VALUE__: t } } var ae = Ce(t => { if (E(t.value)) return t.value }), ie = Ce(t => { if (E(t.value)) return `${t.value}%` }), ke = Ce(t => { if (E(t.value)) return `${t.value}px` }), ci = Ce(t => { if (E(t.value)) return `${t.value}ms` }), gt = Ce(t => { if (E(t.value)) return `${t.value}deg` }), an = Ce(t => { if (t.fraction === null) return; let [r, i] = z(t.fraction, "/"); if (!(!E(r) || !E(i))) return t.fraction }), fi = Ce(t => { if (E(Number(t.value))) return `repeat(${t.value}, minmax(0, 1fr))` }), di = { accentColor: ({ theme: t }) => t("colors"), animation: { none: "none", spin: "spin 1s linear infinite", ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite", pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite", bounce: "bounce 1s infinite" }, aria: { busy: 'busy="true"', checked: 'checked="true"', disabled: 'disabled="true"', expanded: 'expanded="true"', hidden: 'hidden="true"', pressed: 'pressed="true"', readonly: 'readonly="true"', required: 'required="true"', selected: 'selected="true"' }, aspectRatio: { auto: "auto", square: "1 / 1", video: "16 / 9", ...an }, backdropBlur: ({ theme: t }) => t("blur"), backdropBrightness: ({ theme: t }) => ({ ...t("brightness"), ...ie }), backdropContrast: ({ theme: t }) => ({ ...t("contrast"), ...ie }), backdropGrayscale: ({ theme: t }) => ({ ...t("grayscale"), ...ie }), backdropHueRotate: ({ theme: t }) => ({ ...t("hueRotate"), ...gt }), backdropInvert: ({ theme: t }) => ({ ...t("invert"), ...ie }), backdropOpacity: ({ theme: t }) => ({ ...t("opacity"), ...ie }), backdropSaturate: ({ theme: t }) => ({ ...t("saturate"), ...ie }), backdropSepia: ({ theme: t }) => ({ ...t("sepia"), ...ie }), backgroundColor: ({ theme: t }) => t("colors"), backgroundImage: { none: "none", "gradient-to-t": "linear-gradient(to top, var(--tw-gradient-stops))", "gradient-to-tr": "linear-gradient(to top right, var(--tw-gradient-stops))", "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))", "gradient-to-br": "linear-gradient(to bottom right, var(--tw-gradient-stops))", "gradient-to-b": "linear-gradient(to bottom, var(--tw-gradient-stops))", "gradient-to-bl": "linear-gradient(to bottom left, var(--tw-gradient-stops))", "gradient-to-l": "linear-gradient(to left, var(--tw-gradient-stops))", "gradient-to-tl": "linear-gradient(to top left, var(--tw-gradient-stops))" }, backgroundOpacity: ({ theme: t }) => t("opacity"), backgroundPosition: { bottom: "bottom", center: "center", left: "left", "left-bottom": "left bottom", "left-top": "left top", right: "right", "right-bottom": "right bottom", "right-top": "right top", top: "top" }, backgroundSize: { auto: "auto", cover: "cover", contain: "contain" }, blur: { 0: "0", none: "", sm: "4px", DEFAULT: "8px", md: "12px", lg: "16px", xl: "24px", "2xl": "40px", "3xl": "64px" }, borderColor: ({ theme: t }) => ({ DEFAULT: "currentcolor", ...t("colors") }), borderOpacity: ({ theme: t }) => t("opacity"), borderRadius: { none: "0px", sm: "0.125rem", DEFAULT: "0.25rem", md: "0.375rem", lg: "0.5rem", xl: "0.75rem", "2xl": "1rem", "3xl": "1.5rem", full: "9999px" }, borderSpacing: ({ theme: t }) => t("spacing"), borderWidth: { DEFAULT: "1px", 0: "0px", 2: "2px", 4: "4px", 8: "8px", ...ke }, boxShadow: { sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)", DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)", md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)", lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)", xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)", "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)", inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)", none: "none" }, boxShadowColor: ({ theme: t }) => t("colors"), brightness: { 0: "0", 50: ".5", 75: ".75", 90: ".9", 95: ".95", 100: "1", 105: "1.05", 110: "1.1", 125: "1.25", 150: "1.5", 200: "2", ...ie }, caretColor: ({ theme: t }) => t("colors"), colors: () => ({ ...mt }), columns: { auto: "auto", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12", "3xs": "16rem", "2xs": "18rem", xs: "20rem", sm: "24rem", md: "28rem", lg: "32rem", xl: "36rem", "2xl": "42rem", "3xl": "48rem", "4xl": "56rem", "5xl": "64rem", "6xl": "72rem", "7xl": "80rem", ...ae }, container: {}, content: { none: "none" }, contrast: { 0: "0", 50: ".5", 75: ".75", 100: "1", 125: "1.25", 150: "1.5", 200: "2", ...ie }, cursor: { auto: "auto", default: "default", pointer: "pointer", wait: "wait", text: "text", move: "move", help: "help", "not-allowed": "not-allowed", none: "none", "context-menu": "context-menu", progress: "progress", cell: "cell", crosshair: "crosshair", "vertical-text": "vertical-text", alias: "alias", copy: "copy", "no-drop": "no-drop", grab: "grab", grabbing: "grabbing", "all-scroll": "all-scroll", "col-resize": "col-resize", "row-resize": "row-resize", "n-resize": "n-resize", "e-resize": "e-resize", "s-resize": "s-resize", "w-resize": "w-resize", "ne-resize": "ne-resize", "nw-resize": "nw-resize", "se-resize": "se-resize", "sw-resize": "sw-resize", "ew-resize": "ew-resize", "ns-resize": "ns-resize", "nesw-resize": "nesw-resize", "nwse-resize": "nwse-resize", "zoom-in": "zoom-in", "zoom-out": "zoom-out" }, divideColor: ({ theme: t }) => t("borderColor"), divideOpacity: ({ theme: t }) => t("borderOpacity"), divideWidth: ({ theme: t }) => ({ ...t("borderWidth"), ...ke }), dropShadow: { sm: "0 1px 1px rgb(0 0 0 / 0.05)", DEFAULT: ["0 1px 2px rgb(0 0 0 / 0.1)", "0 1px 1px rgb(0 0 0 / 0.06)"], md: ["0 4px 3px rgb(0 0 0 / 0.07)", "0 2px 2px rgb(0 0 0 / 0.06)"], lg: ["0 10px 8px rgb(0 0 0 / 0.04)", "0 4px 3px rgb(0 0 0 / 0.1)"], xl: ["0 20px 13px rgb(0 0 0 / 0.03)", "0 8px 5px rgb(0 0 0 / 0.08)"], "2xl": "0 25px 25px rgb(0 0 0 / 0.15)", none: "0 0 #0000" }, fill: ({ theme: t }) => t("colors"), flex: { 1: "1 1 0%", auto: "1 1 auto", initial: "0 1 auto", none: "none" }, flexBasis: ({ theme: t }) => ({ auto: "auto", "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", "1/5": "20%", "2/5": "40%", "3/5": "60%", "4/5": "80%", "1/6": "16.666667%", "2/6": "33.333333%", "3/6": "50%", "4/6": "66.666667%", "5/6": "83.333333%", "1/12": "8.333333%", "2/12": "16.666667%", "3/12": "25%", "4/12": "33.333333%", "5/12": "41.666667%", "6/12": "50%", "7/12": "58.333333%", "8/12": "66.666667%", "9/12": "75%", "10/12": "83.333333%", "11/12": "91.666667%", full: "100%", ...t("spacing") }), flexGrow: { 0: "0", DEFAULT: "1", ...ae }, flexShrink: { 0: "0", DEFAULT: "1", ...ae }, fontFamily: { sans: ["ui-sans-serif", "system-ui", "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'], serif: ["ui-serif", "Georgia", "Cambria", '"Times New Roman"', "Times", "serif"], mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", '"Liberation Mono"', '"Courier New"', "monospace"] }, fontSize: { xs: ["0.75rem", { lineHeight: "1rem" }], sm: ["0.875rem", { lineHeight: "1.25rem" }], base: ["1rem", { lineHeight: "1.5rem" }], lg: ["1.125rem", { lineHeight: "1.75rem" }], xl: ["1.25rem", { lineHeight: "1.75rem" }], "2xl": ["1.5rem", { lineHeight: "2rem" }], "3xl": ["1.875rem", { lineHeight: "2.25rem" }], "4xl": ["2.25rem", { lineHeight: "2.5rem" }], "5xl": ["3rem", { lineHeight: "1" }], "6xl": ["3.75rem", { lineHeight: "1" }], "7xl": ["4.5rem", { lineHeight: "1" }], "8xl": ["6rem", { lineHeight: "1" }], "9xl": ["8rem", { lineHeight: "1" }] }, fontWeight: { thin: "100", extralight: "200", light: "300", normal: "400", medium: "500", semibold: "600", bold: "700", extrabold: "800", black: "900" }, gap: ({ theme: t }) => t("spacing"), gradientColorStops: ({ theme: t }) => t("colors"), gradientColorStopPositions: { "0%": "0%", "5%": "5%", "10%": "10%", "15%": "15%", "20%": "20%", "25%": "25%", "30%": "30%", "35%": "35%", "40%": "40%", "45%": "45%", "50%": "50%", "55%": "55%", "60%": "60%", "65%": "65%", "70%": "70%", "75%": "75%", "80%": "80%", "85%": "85%", "90%": "90%", "95%": "95%", "100%": "100%", ...ie }, grayscale: { 0: "0", DEFAULT: "100%", ...ie }, gridAutoColumns: { auto: "auto", min: "min-content", max: "max-content", fr: "minmax(0, 1fr)" }, gridAutoRows: { auto: "auto", min: "min-content", max: "max-content", fr: "minmax(0, 1fr)" }, gridColumn: { auto: "auto", "span-1": "span 1 / span 1", "span-2": "span 2 / span 2", "span-3": "span 3 / span 3", "span-4": "span 4 / span 4", "span-5": "span 5 / span 5", "span-6": "span 6 / span 6", "span-7": "span 7 / span 7", "span-8": "span 8 / span 8", "span-9": "span 9 / span 9", "span-10": "span 10 / span 10", "span-11": "span 11 / span 11", "span-12": "span 12 / span 12", "span-full": "1 / -1" }, gridColumnEnd: { auto: "auto", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12", 13: "13", ...ae }, gridColumnStart: { auto: "auto", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12", 13: "13", ...ae }, gridRow: { auto: "auto", "span-1": "span 1 / span 1", "span-2": "span 2 / span 2", "span-3": "span 3 / span 3", "span-4": "span 4 / span 4", "span-5": "span 5 / span 5", "span-6": "span 6 / span 6", "span-7": "span 7 / span 7", "span-8": "span 8 / span 8", "span-9": "span 9 / span 9", "span-10": "span 10 / span 10", "span-11": "span 11 / span 11", "span-12": "span 12 / span 12", "span-full": "1 / -1" }, gridRowEnd: { auto: "auto", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12", 13: "13", ...ae }, gridRowStart: { auto: "auto", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12", 13: "13", ...ae }, gridTemplateColumns: { none: "none", subgrid: "subgrid", 1: "repeat(1, minmax(0, 1fr))", 2: "repeat(2, minmax(0, 1fr))", 3: "repeat(3, minmax(0, 1fr))", 4: "repeat(4, minmax(0, 1fr))", 5: "repeat(5, minmax(0, 1fr))", 6: "repeat(6, minmax(0, 1fr))", 7: "repeat(7, minmax(0, 1fr))", 8: "repeat(8, minmax(0, 1fr))", 9: "repeat(9, minmax(0, 1fr))", 10: "repeat(10, minmax(0, 1fr))", 11: "repeat(11, minmax(0, 1fr))", 12: "repeat(12, minmax(0, 1fr))", ...fi }, gridTemplateRows: { none: "none", subgrid: "subgrid", 1: "repeat(1, minmax(0, 1fr))", 2: "repeat(2, minmax(0, 1fr))", 3: "repeat(3, minmax(0, 1fr))", 4: "repeat(4, minmax(0, 1fr))", 5: "repeat(5, minmax(0, 1fr))", 6: "repeat(6, minmax(0, 1fr))", 7: "repeat(7, minmax(0, 1fr))", 8: "repeat(8, minmax(0, 1fr))", 9: "repeat(9, minmax(0, 1fr))", 10: "repeat(10, minmax(0, 1fr))", 11: "repeat(11, minmax(0, 1fr))", 12: "repeat(12, minmax(0, 1fr))", ...fi }, height: ({ theme: t }) => ({ auto: "auto", "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", "1/5": "20%", "2/5": "40%", "3/5": "60%", "4/5": "80%", "1/6": "16.666667%", "2/6": "33.333333%", "3/6": "50%", "4/6": "66.666667%", "5/6": "83.333333%", full: "100%", screen: "100vh", svh: "100svh", lvh: "100lvh", dvh: "100dvh", min: "min-content", max: "max-content", fit: "fit-content", ...t("spacing") }), hueRotate: { 0: "0deg", 15: "15deg", 30: "30deg", 60: "60deg", 90: "90deg", 180: "180deg", ...gt }, inset: ({ theme: t }) => ({ auto: "auto", "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", full: "100%", ...t("spacing") }), invert: { 0: "0", DEFAULT: "100%", ...ie }, keyframes: { spin: { to: { transform: "rotate(360deg)" } }, ping: { "75%, 100%": { transform: "scale(2)", opacity: "0" } }, pulse: { "50%": { opacity: ".5" } }, bounce: { "0%, 100%": { transform: "translateY(-25%)", animationTimingFunction: "cubic-bezier(0.8,0,1,1)" }, "50%": { transform: "none", animationTimingFunction: "cubic-bezier(0,0,0.2,1)" } } }, letterSpacing: { tighter: "-0.05em", tight: "-0.025em", normal: "0em", wide: "0.025em", wider: "0.05em", widest: "0.1em" }, lineHeight: { none: "1", tight: "1.25", snug: "1.375", normal: "1.5", relaxed: "1.625", loose: "2", 3: ".75rem", 4: "1rem", 5: "1.25rem", 6: "1.5rem", 7: "1.75rem", 8: "2rem", 9: "2.25rem", 10: "2.5rem" }, listStyleType: { none: "none", disc: "disc", decimal: "decimal" }, listStyleImage: { none: "none" }, margin: ({ theme: t }) => ({ auto: "auto", ...t("spacing") }), lineClamp: { 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", ...ae }, maxHeight: ({ theme: t }) => ({ none: "none", full: "100%", screen: "100vh", svh: "100svh", lvh: "100lvh", dvh: "100dvh", min: "min-content", max: "max-content", fit: "fit-content", ...t("spacing") }), maxWidth: ({ theme: t }) => ({ none: "none", xs: "20rem", sm: "24rem", md: "28rem", lg: "32rem", xl: "36rem", "2xl": "42rem", "3xl": "48rem", "4xl": "56rem", "5xl": "64rem", "6xl": "72rem", "7xl": "80rem", full: "100%", min: "min-content", max: "max-content", fit: "fit-content", prose: "65ch", ...t("spacing") }), minHeight: ({ theme: t }) => ({ full: "100%", screen: "100vh", svh: "100svh", lvh: "100lvh", dvh: "100dvh", min: "min-content", max: "max-content", fit: "fit-content", ...t("spacing") }), minWidth: ({ theme: t }) => ({ full: "100%", min: "min-content", max: "max-content", fit: "fit-content", ...t("spacing") }), objectPosition: { bottom: "bottom", center: "center", left: "left", "left-bottom": "left bottom", "left-top": "left top", right: "right", "right-bottom": "right bottom", "right-top": "right top", top: "top" }, opacity: { 0: "0", 5: "0.05", 10: "0.1", 15: "0.15", 20: "0.2", 25: "0.25", 30: "0.3", 35: "0.35", 40: "0.4", 45: "0.45", 50: "0.5", 55: "0.55", 60: "0.6", 65: "0.65", 70: "0.7", 75: "0.75", 80: "0.8", 85: "0.85", 90: "0.9", 95: "0.95", 100: "1", ...ie }, order: { first: "-9999", last: "9999", none: "0", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12", ...ae }, outlineColor: ({ theme: t }) => t("colors"), outlineOffset: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px", ...ke }, outlineWidth: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px", ...ke }, padding: ({ theme: t }) => t("spacing"), placeholderColor: ({ theme: t }) => t("colors"), placeholderOpacity: ({ theme: t }) => t("opacity"), ringColor: ({ theme: t }) => ({ DEFAULT: "currentcolor", ...t("colors") }), ringOffsetColor: ({ theme: t }) => t("colors"), ringOffsetWidth: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px", ...ke }, ringOpacity: ({ theme: t }) => ({ DEFAULT: "0.5", ...t("opacity") }), ringWidth: { DEFAULT: "3px", 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px", ...ke }, rotate: { 0: "0deg", 1: "1deg", 2: "2deg", 3: "3deg", 6: "6deg", 12: "12deg", 45: "45deg", 90: "90deg", 180: "180deg", ...gt }, saturate: { 0: "0", 50: ".5", 100: "1", 150: "1.5", 200: "2", ...ie }, scale: { 0: "0", 50: ".5", 75: ".75", 90: ".9", 95: ".95", 100: "1", 105: "1.05", 110: "1.1", 125: "1.25", 150: "1.5", ...ie }, screens: { sm: "40rem", md: "48rem", lg: "64rem", xl: "80rem", "2xl": "96rem" }, scrollMargin: ({ theme: t }) => t("spacing"), scrollPadding: ({ theme: t }) => t("spacing"), sepia: { 0: "0", DEFAULT: "100%", ...ie }, skew: { 0: "0deg", 1: "1deg", 2: "2deg", 3: "3deg", 6: "6deg", 12: "12deg", ...gt }, space: ({ theme: t }) => t("spacing"), spacing: { px: "1px", 0: "0px", .5: "0.125rem", 1: "0.25rem", 1.5: "0.375rem", 2: "0.5rem", 2.5: "0.625rem", 3: "0.75rem", 3.5: "0.875rem", 4: "1rem", 5: "1.25rem", 6: "1.5rem", 7: "1.75rem", 8: "2rem", 9: "2.25rem", 10: "2.5rem", 11: "2.75rem", 12: "3rem", 14: "3.5rem", 16: "4rem", 20: "5rem", 24: "6rem", 28: "7rem", 32: "8rem", 36: "9rem", 40: "10rem", 44: "11rem", 48: "12rem", 52: "13rem", 56: "14rem", 60: "15rem", 64: "16rem", 72: "18rem", 80: "20rem", 96: "24rem" }, stroke: ({ theme: t }) => ({ none: "none", ...t("colors") }), strokeWidth: { 0: "0", 1: "1", 2: "2", ...ae }, supports: {}, data: {}, textColor: ({ theme: t }) => t("colors"), textDecorationColor: ({ theme: t }) => t("colors"), textDecorationThickness: { auto: "auto", "from-font": "from-font", 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px", ...ke }, textIndent: ({ theme: t }) => t("spacing"), textOpacity: ({ theme: t }) => t("opacity"), textUnderlineOffset: { auto: "auto", 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px", ...ke }, transformOrigin: { center: "center", top: "top", "top-right": "top right", right: "right", "bottom-right": "bottom right", bottom: "bottom", "bottom-left": "bottom left", left: "left", "top-left": "top left" }, transitionDelay: { 0: "0s", 75: "75ms", 100: "100ms", 150: "150ms", 200: "200ms", 300: "300ms", 500: "500ms", 700: "700ms", 1e3: "1000ms", ...ci }, transitionDuration: { DEFAULT: "150ms", 0: "0s", 75: "75ms", 100: "100ms", 150: "150ms", 200: "200ms", 300: "300ms", 500: "500ms", 700: "700ms", 1e3: "1000ms", ...ci }, transitionProperty: { none: "none", all: "all", DEFAULT: "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter", colors: "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke", opacity: "opacity", shadow: "box-shadow", transform: "transform" }, transitionTimingFunction: { DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)", linear: "linear", in: "cubic-bezier(0.4, 0, 1, 1)", out: "cubic-bezier(0, 0, 0.2, 1)", "in-out": "cubic-bezier(0.4, 0, 0.2, 1)" }, translate: ({ theme: t }) => ({ "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", full: "100%", ...t("spacing") }), size: ({ theme: t }) => ({ auto: "auto", "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", "1/5": "20%", "2/5": "40%", "3/5": "60%", "4/5": "80%", "1/6": "16.666667%", "2/6": "33.333333%", "3/6": "50%", "4/6": "66.666667%", "5/6": "83.333333%", "1/12": "8.333333%", "2/12": "16.666667%", "3/12": "25%", "4/12": "33.333333%", "5/12": "41.666667%", "6/12": "50%", "7/12": "58.333333%", "8/12": "66.666667%", "9/12": "75%", "10/12": "83.333333%", "11/12": "91.666667%", full: "100%", min: "min-content", max: "max-content", fit: "fit-content", ...t("spacing") }), width: ({ theme: t }) => ({ auto: "auto", "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", "1/5": "20%", "2/5": "40%", "3/5": "60%", "4/5": "80%", "1/6": "16.666667%", "2/6": "33.333333%", "3/6": "50%", "4/6": "66.666667%", "5/6": "83.333333%", "1/12": "8.333333%", "2/12": "16.666667%", "3/12": "25%", "4/12": "33.333333%", "5/12": "41.666667%", "6/12": "50%", "7/12": "58.333333%", "8/12": "66.666667%", "9/12": "75%", "10/12": "83.333333%", "11/12": "91.666667%", full: "100%", screen: "100vw", svw: "100svw", lvw: "100lvw", dvw: "100dvw", min: "min-content", max: "max-content", fit: "fit-content", ...t("spacing") }), willChange: { auto: "auto", scroll: "scroll-position", contents: "contents", transform: "transform" }, zIndex: { auto: "auto", 0: "0", 10: "10", 20: "20", 30: "30", 40: "40", 50: "50", ...ae } }; function pi(t) { return { theme: { ...di, colors: ({ theme: r }) => r("color", {}), extend: { fontSize: ({ theme: r }) => ({ ...r("text", {}) }), boxShadow: ({ theme: r }) => ({ ...r("shadow", {}) }), animation: ({ theme: r }) => ({ ...r("animate", {}) }), aspectRatio: ({ theme: r }) => ({ ...r("aspect", {}) }), borderRadius: ({ theme: r }) => ({ ...r("radius", {}) }), screens: ({ theme: r }) => ({ ...r("breakpoint", {}) }), letterSpacing: ({ theme: r }) => ({ ...r("tracking", {}) }), lineHeight: ({ theme: r }) => ({ ...r("leading", {}) }), transitionDuration: { DEFAULT: t.get(["--default-transition-duration"]) ?? null }, transitionTimingFunction: { DEFAULT: t.get(["--default-transition-timing-function"]) ?? null }, maxWidth: ({ theme: r }) => ({ ...r("container", {}) }) } } } } var sn = { blocklist: [], future: {}, prefix: "", important: false, darkMode: null, theme: {}, plugins: [], content: { files: [] } }; function Wt(t, r) { let i = { design: t, configs: [], plugins: [], content: { files: [] }, theme: {}, extend: {}, result: structuredClone(sn) }; for (let o of r) Bt(i, o); for (let o of i.configs) "darkMode" in o && o.darkMode !== void 0 && (i.result.darkMode = o.darkMode ?? null), "prefix" in o && o.prefix !== void 0 && (i.result.prefix = o.prefix ?? ""), "blocklist" in o && o.blocklist !== void 0 && (i.result.blocklist = o.blocklist ?? []), "important" in o && o.important !== void 0 && (i.result.important = o.important ?? false); let e = cn(i); return { resolvedConfig: { ...i.result, content: i.content, theme: i.theme, plugins: i.plugins }, replacedThemeKeys: e } } function un(t, r) { if (Array.isArray(t) && Re(t[0])) return t.concat(r); if (Array.isArray(r) && Re(r[0]) && Re(t)) return [t, ...r]; if (Array.isArray(r)) return r } function Bt(t, { config: r, base: i, path: e, reference: o }) { let s = []; for (let u of r.plugins ?? []) "__isOptionsFunction" in u ? s.push({ ...u(), reference: o }) : "handler" in u ? s.push({ ...u, reference: o }) : s.push({ handler: u, reference: o }); if (Array.isArray(r.presets) && r.presets.length === 0) throw new Error("Error in the config file/plugin/preset. An empty preset (`preset: []`) is not currently supported."); for (let u of r.presets ?? []) Bt(t, { path: e, base: i, config: u, reference: o }); for (let u of s) t.plugins.push(u), u.config && Bt(t, { path: e, base: i, config: u.config, reference: !!u.reference }); let a = r.content ?? [], f = Array.isArray(a) ? a : a.files; for (let u of f) t.content.files.push(typeof u == "object" ? u : { base: i, pattern: u }); t.configs.push(r); } function cn(t) { let r = new Set, i = dt(t.design, () => t.theme, o), e = Object.assign(i, { theme: i, colors: mt }); function o(s) { return typeof s == "function" ? s(e) ?? null : s ?? null } for (let s of t.configs) { let a = s.theme ?? {}, f = a.extend ?? {}; for (let u in a) u !== "extend" && r.add(u); Object.assign(t.theme, a); for (let u in f) t.extend[u] ??= [], t.extend[u].push(f[u]); } delete t.theme.extend; for (let s in t.extend) { let a = [t.theme[s], ...t.extend[s]]; t.theme[s] = () => { let f = a.map(o); return Le({}, f, un) }; } for (let s in t.theme) t.theme[s] = o(t.theme[s]); if (t.theme.screens && typeof t.theme.screens == "object") for (let s of Object.keys(t.theme.screens)) { let a = t.theme.screens[s]; a && typeof a == "object" && ("raw" in a || "max" in a || "min" in a && (t.theme.screens[s] = a.min)); } return r } function mi(t, r) { let i = t.theme.container || {}; if (typeof i != "object" || i === null) return; let e = fn(i, r); e.length !== 0 && r.utilities.static("container", () => structuredClone(e)); } function fn({ center: t, padding: r, screens: i }, e) { let o = [], s = null; if (t && o.push(l("margin-inline", "auto")), (typeof r == "string" || typeof r == "object" && r !== null && "DEFAULT" in r) && o.push(l("padding-inline", typeof r == "string" ? r : r.DEFAULT)), typeof i == "object" && i !== null) { s = new Map; let a = Array.from(e.theme.namespace("--breakpoint").entries()); if (a.sort((f, u) => ye(f[1], u[1], "asc")), a.length > 0) { let [f] = a[0]; o.push(F("@media", `(width >= --theme(--breakpoint-${f}))`, [l("max-width", "none")])); } for (let [f, u] of Object.entries(i)) { if (typeof u == "object") if ("min" in u) u = u.min; else continue; s.set(f, F("@media", `(width >= ${u})`, [l("max-width", u)])); } } if (typeof r == "object" && r !== null) { let a = Object.entries(r).filter(([f]) => f !== "DEFAULT").map(([f, u]) => [f, e.theme.resolveValue(f, ["--breakpoint"]), u]).filter(Boolean); a.sort((f, u) => ye(f[1], u[1], "asc")); for (let [f, , u] of a) if (s && s.has(f)) s.get(f).nodes.push(l("padding-inline", u)); else { if (s) continue; o.push(F("@media", `(width >= theme(--breakpoint-${f}))`, [l("padding-inline", u)])); } } if (s) for (let [, a] of s) o.push(a); return o } function gi({ addVariant: t, config: r }) { let i = r("darkMode", null), [e, o = ".dark"] = Array.isArray(i) ? i : [i]; if (e === "variant") { let s; if (Array.isArray(o) || typeof o == "function" ? s = o : typeof o == "string" && (s = [o]), Array.isArray(s)) for (let a of s) a === ".dark" ? (e = false, console.warn('When using `variant` for `darkMode`, you must provide a selector.\nExample: `darkMode: ["variant", ".your-selector &"]`')) : a.includes("&") || (e = false, console.warn('When using `variant` for `darkMode`, your selector must contain `&`.\nExample `darkMode: ["variant", ".your-selector &"]`')); o = s; } e === null || (e === "selector" ? t("dark", `&:where(${o}, ${o} *)`) : e === "media" ? t("dark", "@media (prefers-color-scheme: dark)") : e === "variant" ? t("dark", o) : e === "class" && t("dark", `&:is(${o} *)`)); } function hi(t) { for (let [r, i] of [["t", "top"], ["tr", "top right"], ["r", "right"], ["br", "bottom right"], ["b", "bottom"], ["bl", "bottom left"], ["l", "left"], ["tl", "top left"]]) t.utilities.static(`bg-gradient-to-${r}`, () => [l("--tw-gradient-position", `to ${i} in oklab`), l("background-image", "linear-gradient(var(--tw-gradient-stops))")]); t.utilities.static("bg-left-top", () => [l("background-position", "left top")]), t.utilities.static("bg-right-top", () => [l("background-position", "right top")]), t.utilities.static("bg-left-bottom", () => [l("background-position", "left bottom")]), t.utilities.static("bg-right-bottom", () => [l("background-position", "right bottom")]), t.utilities.static("object-left-top", () => [l("object-position", "left top")]), t.utilities.static("object-right-top", () => [l("object-position", "right top")]), t.utilities.static("object-left-bottom", () => [l("object-position", "left bottom")]), t.utilities.static("object-right-bottom", () => [l("object-position", "right bottom")]), t.utilities.functional("max-w-screen", r => { if (!r.value || r.value.kind === "arbitrary") return; let i = t.theme.resolve(r.value.value, ["--breakpoint"]); if (i) return [l("max-width", i)] }), t.utilities.static("overflow-ellipsis", () => [l("text-overflow", "ellipsis")]), t.utilities.static("decoration-slice", () => [l("-webkit-box-decoration-break", "slice"), l("box-decoration-break", "slice")]), t.utilities.static("decoration-clone", () => [l("-webkit-box-decoration-break", "clone"), l("box-decoration-break", "clone")]), t.utilities.functional("flex-shrink", r => { if (!r.modifier) { if (!r.value) return [l("flex-shrink", "1")]; if (r.value.kind === "arbitrary") return [l("flex-shrink", r.value.value)]; if (E(r.value.value)) return [l("flex-shrink", r.value.value)] } }), t.utilities.functional("flex-grow", r => { if (!r.modifier) { if (!r.value) return [l("flex-grow", "1")]; if (r.value.kind === "arbitrary") return [l("flex-grow", r.value.value)]; if (E(r.value.value)) return [l("flex-grow", r.value.value)] } }); } function ki(t, r) { let i = t.theme.screens || {}, e = r.variants.get("min")?.order ?? 0, o = []; for (let [a, f] of Object.entries(i)) { let m = function (v) { r.variants.static(a, k => { k.nodes = [F("@media", p, k.nodes)]; }, { order: v }); }; let u = r.variants.get(a), c = r.theme.resolveValue(a, ["--breakpoint"]); if (u && c && !r.theme.hasDefault(`--breakpoint-${a}`)) continue; let g = true; typeof f == "string" && (g = false); let p = dn(f); g ? o.push(m) : m(e); } if (o.length !== 0) { for (let [, a] of r.variants.variants) a.order > e && (a.order += o.length); r.variants.compareFns = new Map(Array.from(r.variants.compareFns).map(([a, f]) => (a > e && (a += o.length), [a, f]))); for (let [a, f] of o.entries()) f(e + a + 1); } } function dn(t) { return (Array.isArray(t) ? t : [t]).map(i => typeof i == "string" ? { min: i } : i && typeof i == "object" ? i : null).map(i => { if (i === null) return null; if ("raw" in i) return i.raw; let e = ""; return i.max !== void 0 && (e += `${i.max} >= `), e += "width", i.min !== void 0 && (e += ` >= ${i.min}`), `(${e})` }).filter(Boolean).join(", ") } function vi(t, r) { let i = t.theme.aria || {}, e = t.theme.supports || {}, o = t.theme.data || {}; if (Object.keys(i).length > 0) { let s = r.variants.get("aria"), a = s?.applyFn, f = s?.compounds; r.variants.functional("aria", (u, c) => { let g = c.value; return g && g.kind === "named" && g.value in i ? a?.(u, { ...c, value: { kind: "arbitrary", value: i[g.value] } }) : a?.(u, c) }, { compounds: f }); } if (Object.keys(e).length > 0) { let s = r.variants.get("supports"), a = s?.applyFn, f = s?.compounds; r.variants.functional("supports", (u, c) => { let g = c.value; return g && g.kind === "named" && g.value in e ? a?.(u, { ...c, value: { kind: "arbitrary", value: e[g.value] } }) : a?.(u, c) }, { compounds: f }); } if (Object.keys(o).length > 0) { let s = r.variants.get("data"), a = s?.applyFn, f = s?.compounds; r.variants.functional("data", (u, c) => { let g = c.value; return g && g.kind === "named" && g.value in o ? a?.(u, { ...c, value: { kind: "arbitrary", value: o[g.value] } }) : a?.(u, c) }, { compounds: f }); } } var pn = /^[a-z]+$/; async function bi({ designSystem: t, base: r, ast: i, loadModule: e, sources: o }) {
  	    let s = 0, a = [], f = []; U(i, (p, { parent: m, replaceWith: v, context: k }) => {
  	      if (p.kind === "at-rule") {
  	        if (p.name === "@plugin") {
  	          if (m !== null) throw new Error("`@plugin` cannot be nested."); let x = p.params.slice(1, -1); if (x.length === 0) throw new Error("`@plugin` must have a path."); let y = {}; for (let N of p.nodes ?? []) {
  	            if (N.kind !== "declaration") throw new Error(`Unexpected \`@plugin\` option:

${le([N])}

\`@plugin\` options must be a flat list of declarations.`); if (N.value === void 0) continue; let b = N.value, V = z(b, ",").map(R => {
  	              if (R = R.trim(), R === "null") return null; if (R === "true") return true; if (R === "false") return false; if (Number.isNaN(Number(R))) {
  	                if (R[0] === '"' && R[R.length - 1] === '"' || R[0] === "'" && R[R.length - 1] === "'") return R.slice(1, -1); if (R[0] === "{" && R[R.length - 1] === "}") throw new Error(`Unexpected \`@plugin\` option: Value of declaration \`${le([N]).trim()}\` is not supported.

Using an object as a plugin option is currently only supported in JavaScript configuration files.`)
  	              } else return Number(R); return R
  	            }); y[N.property] = V.length === 1 ? V[0] : V;
  	          } a.push([{ id: x, base: k.base, reference: !!k.reference }, Object.keys(y).length > 0 ? y : null]), v([]), s |= 4; return
  	        } if (p.name === "@config") { if (p.nodes.length > 0) throw new Error("`@config` cannot have a body."); if (m !== null) throw new Error("`@config` cannot be nested."); f.push({ id: p.params.slice(1, -1), base: k.base, reference: !!k.reference }), v([]), s |= 4; return }
  	      }
  	    }), hi(t); let u = t.resolveThemeValue; if (t.resolveThemeValue = function (m, v) { return m.startsWith("--") ? u(m, v) : (s |= wi({ designSystem: t, base: r, ast: i, sources: o, configs: [], pluginDetails: [] }), t.resolveThemeValue(m, v)) }, !a.length && !f.length) return 0; let [c, g] = await Promise.all([Promise.all(f.map(async ({ id: p, base: m, reference: v }) => { let k = await e(p, m, "config"); return { path: p, base: k.base, config: k.module, reference: v } })), Promise.all(a.map(async ([{ id: p, base: m, reference: v }, k]) => { let x = await e(p, m, "plugin"); return { path: p, base: x.base, plugin: x.module, options: k, reference: v } }))]); return s |= wi({ designSystem: t, base: r, ast: i, sources: o, configs: c, pluginDetails: g }), s
  	  } function wi({ designSystem: t, base: r, ast: i, sources: e, configs: o, pluginDetails: s }) {
  	    let a = 0, u = [...s.map(y => { if (!y.options) return { config: { plugins: [y.plugin] }, base: y.base, reference: y.reference }; if ("__isOptionsFunction" in y.plugin) return { config: { plugins: [y.plugin(y.options)] }, base: y.base, reference: y.reference }; throw new Error(`The plugin "${y.path}" does not accept options`) }), ...o], { resolvedConfig: c } = Wt(t, [{ config: pi(t.theme), base: r, reference: true }, ...u, { config: { plugins: [gi] }, base: r, reference: true }]), { resolvedConfig: g, replacedThemeKeys: p } = Wt(t, u), m = t.resolveThemeValue; t.resolveThemeValue = function (N, b) { if (N[0] === "-" && N[1] === "-") return m(N, b); let V = k.theme(N, void 0); if (Array.isArray(V) && V.length === 2) return V[0]; if (Array.isArray(V)) return V.join(", "); if (typeof V == "string") return V }; let v = { designSystem: t, ast: i, resolvedConfig: c, featuresRef: { set current(y) { a |= y; } } }, k = Mt({ ...v, referenceMode: false }), x; for (let { handler: y, reference: N } of c.plugins) N ? (x ||= Mt({ ...v, referenceMode: true }), y(x)) : y(k); if (Wr(t, g, p), ui(t, g), vi(g, t), ki(g, t), mi(g, t), !t.theme.prefix && c.prefix) { if (c.prefix.endsWith("-") && (c.prefix = c.prefix.slice(0, -1), console.warn(`The prefix "${c.prefix}" is invalid. Prefixes must be lowercase ASCII letters (a-z) only and is written as a variant before all utilities. We have fixed up the prefix for you. Remove the trailing \`-\` to silence this warning.`)), !pn.test(c.prefix)) throw new Error(`The prefix "${c.prefix}" is invalid. Prefixes must be lowercase ASCII letters (a-z) only.`); t.theme.prefix = c.prefix; } if (!t.important && c.important === true && (t.important = true), typeof c.important == "string") { let y = c.important; U(i, (N, { replaceWith: b, parent: V }) => { if (N.kind === "at-rule" && !(N.name !== "@tailwind" || N.params !== "utilities")) return V?.kind === "rule" && V.selector === y ? 2 : (b(M(y, [N])), 2) }); } for (let y of c.blocklist) t.invalidCandidates.add(y); for (let y of c.content.files) {
  	      if ("raw" in y) throw new Error(`Error in the config file/plugin/preset. The \`content\` key contains a \`raw\` entry:

${JSON.stringify(y, null, 2)}

This feature is not currently supported.`); let N = false; y.pattern[0] == "!" && (N = true, y.pattern = y.pattern.slice(1)), e.push({ ...y, negated: N });
  	    } return a
  	  } function yi(t) { let r = [0]; for (let o = 0; o < t.length; o++)t.charCodeAt(o) === 10 && r.push(o + 1); function i(o) { let s = 0, a = r.length; for (; a > 0;) { let u = (a | 0) >> 1, c = s + u; r[c] <= o ? (s = c + 1, a = a - u - 1) : a = u; } s -= 1; let f = o - r[s]; return { line: s + 1, column: f } } function e({ line: o, column: s }) { o -= 1, o = Math.min(Math.max(o, 0), r.length - 1); let a = r[o], f = r[o + 1] ?? a; return Math.min(Math.max(a + s, 0), f) } return { find: i, findOffset: e } } function xi({ ast: t }) {
  	    let r = new B(o => yi(o.code)), i = new B(o => ({ url: o.file, content: o.code, ignore: false })), e = { file: null, sources: [], mappings: [] }; U(t, o => {
  	      if (!o.src || !o.dst) return; let s = i.get(o.src[0]); if (!s.content) return; let a = r.get(o.src[0]), f = r.get(o.dst[0]), u = s.content.slice(o.src[1], o.src[2]), c = 0; for (let m of u.split(`
`)) { if (m.trim() !== "") { let v = a.find(o.src[1] + c), k = f.find(o.dst[1]); e.mappings.push({ name: null, originalPosition: { source: s, ...v }, generatedPosition: k }); } c += m.length, c += 1; } let g = a.find(o.src[2]), p = f.find(o.dst[2]); e.mappings.push({ name: null, originalPosition: { source: s, ...g }, generatedPosition: p });
  	    }); for (let o of r.keys()) e.sources.push(i.get(o)); return e.mappings.sort((o, s) => o.generatedPosition.line - s.generatedPosition.line || o.generatedPosition.column - s.generatedPosition.column || (o.originalPosition?.line ?? 0) - (s.originalPosition?.line ?? 0) || (o.originalPosition?.column ?? 0) - (s.originalPosition?.column ?? 0)), e
  	  } var Ai = /^(-?\d+)\.\.(-?\d+)(?:\.\.(-?\d+))?$/; function ht(t) { let r = t.indexOf("{"); if (r === -1) return [t]; let i = [], e = t.slice(0, r), o = t.slice(r), s = 0, a = o.lastIndexOf("}"); for (let p = 0; p < o.length; p++) { let m = o[p]; if (m === "{") s++; else if (m === "}" && (s--, s === 0)) { a = p; break } } if (a === -1) throw new Error(`The pattern \`${t}\` is not balanced.`); let f = o.slice(1, a), u = o.slice(a + 1), c; mn(f) ? c = gn(f) : c = z(f, ","), c = c.flatMap(p => ht(p)); let g = ht(u); for (let p of g) for (let m of c) i.push(e + m + p); return i } function mn(t) { return Ai.test(t) } function gn(t) { let r = t.match(Ai); if (!r) return [t]; let [, i, e, o] = r, s = o ? parseInt(o, 10) : void 0, a = []; if (/^-?\d+$/.test(i) && /^-?\d+$/.test(e)) { let f = parseInt(i, 10), u = parseInt(e, 10); if (s === void 0 && (s = f <= u ? 1 : -1), s === 0) throw new Error("Step cannot be zero in sequence expansion."); let c = f < u; c && s < 0 && (s = -s), !c && s > 0 && (s = -s); for (let g = f; c ? g <= u : g >= u; g += s)a.push(g.toString()); } return a } var hn = /^[a-z]+$/; function kn() { throw new Error("No `loadModule` function provided to `compile`") } function vn() { throw new Error("No `loadStylesheet` function provided to `compile`") } function wn(t) { let r = 0, i = null; for (let e of z(t, " ")) e === "reference" ? r |= 2 : e === "inline" ? r |= 1 : e === "default" ? r |= 4 : e === "static" ? r |= 8 : e.startsWith("prefix(") && e.endsWith(")") && (i = e.slice(7, -1)); return [r, i] } async function bn(t, { base: r = "", from: i, loadModule: e = kn, loadStylesheet: o = vn } = {}) {
  	    let s = 0; t = [ue({ base: r }, t)], s |= await Ft(t, r, o, 0, i !== void 0); let a = null, f = new Qe, u = [], c = [], g = null, p = null, m = [], v = [], k = [], x = [], y = null; U(t, (b, { parent: V, replaceWith: R, context: D }) => {
  	      if (b.kind === "at-rule") {
  	        if (b.name === "@tailwind" && (b.params === "utilities" || b.params.startsWith("utilities"))) { if (p !== null) { R([]); return } if (D.reference) { R([]); return } let _ = z(b.params, " "); for (let L of _) if (L.startsWith("source(")) { let O = L.slice(7, -1); if (O === "none") { y = O; continue } if (O[0] === '"' && O[O.length - 1] !== '"' || O[0] === "'" && O[O.length - 1] !== "'" || O[0] !== "'" && O[0] !== '"') throw new Error("`source(\u2026)` paths must be quoted."); y = { base: D.sourceBase ?? D.base, pattern: O.slice(1, -1) }; } p = b, s |= 16; } if (b.name === "@utility") { if (V !== null) throw new Error("`@utility` cannot be nested."); if (b.nodes.length === 0) throw new Error(`\`@utility ${b.params}\` is empty. Utilities should include at least one property.`); let _ = Pr(b); if (_ === null) throw new Error(`\`@utility ${b.params}\` defines an invalid utility name. Utilities should be alphanumeric and start with a lowercase letter.`); c.push(_); } if (b.name === "@source") { if (b.nodes.length > 0) throw new Error("`@source` cannot have a body."); if (V !== null) throw new Error("`@source` cannot be nested."); let _ = false, L = false, O = b.params; if (O[0] === "n" && O.startsWith("not ") && (_ = true, O = O.slice(4)), O[0] === "i" && O.startsWith("inline(") && (L = true, O = O.slice(7, -1)), O[0] === '"' && O[O.length - 1] !== '"' || O[0] === "'" && O[O.length - 1] !== "'" || O[0] !== "'" && O[0] !== '"') throw new Error("`@source` paths must be quoted."); let H = O.slice(1, -1); if (L) { let I = _ ? x : k, q = z(H, " "); for (let X of q) for (let oe of ht(X)) I.push(oe); } else v.push({ base: D.base, pattern: H, negated: _ }); R([]); return } if (b.name === "@variant" && (V === null ? b.nodes.length === 0 ? b.name = "@custom-variant" : (U(b.nodes, _ => { if (_.kind === "at-rule" && _.name === "@slot") return b.name = "@custom-variant", 2 }), b.name === "@variant" && m.push(b)) : m.push(b)), b.name === "@custom-variant") { if (V !== null) throw new Error("`@custom-variant` cannot be nested."); R([]); let [_, L] = z(b.params, " "); if (!ut.test(_)) throw new Error(`\`@custom-variant ${_}\` defines an invalid variant name. Variants should only contain alphanumeric, dashes or underscore characters.`); if (b.nodes.length > 0 && L) throw new Error(`\`@custom-variant ${_}\` cannot have both a selector and a body.`); if (b.nodes.length === 0) { if (!L) throw new Error(`\`@custom-variant ${_}\` has no selector or body.`); let O = z(L.slice(1, -1), ","); if (O.length === 0 || O.some(q => q.trim() === "")) throw new Error(`\`@custom-variant ${_} (${O.join(",")})\` selector is invalid.`); let H = [], I = []; for (let q of O) q = q.trim(), q[0] === "@" ? H.push(q) : I.push(q); u.push(q => { q.variants.static(_, X => { let oe = []; I.length > 0 && oe.push(M(I.join(", "), X.nodes)); for (let n of H) oe.push(G(n, X.nodes)); X.nodes = oe; }, { compounds: Ae([...I, ...H]) }); }); return } else { u.push(O => { O.variants.fromAst(_, b.nodes); }); return } } if (b.name === "@media") { let _ = z(b.params, " "), L = []; for (let O of _) if (O.startsWith("source(")) { let H = O.slice(7, -1); U(b.nodes, (I, { replaceWith: q }) => { if (I.kind === "at-rule" && I.name === "@tailwind" && I.params === "utilities") return I.params += ` source(${H})`, q([ue({ sourceBase: D.base }, [I])]), 2 }); } else if (O.startsWith("theme(")) { let H = O.slice(6, -1), I = H.includes("reference"); U(b.nodes, q => { if (q.kind !== "at-rule") { if (I) throw new Error('Files imported with `@import "\u2026" theme(reference)` must only contain `@theme` blocks.\nUse `@reference "\u2026";` instead.'); return 0 } if (q.name === "@theme") return q.params += " " + H, 1 }); } else if (O.startsWith("prefix(")) { let H = O.slice(7, -1); U(b.nodes, I => { if (I.kind === "at-rule" && I.name === "@theme") return I.params += ` prefix(${H})`, 1 }); } else O === "important" ? a = true : O === "reference" ? b.nodes = [ue({ reference: true }, b.nodes)] : L.push(O); L.length > 0 ? b.params = L.join(" ") : _.length > 0 && R(b.nodes); } if (b.name === "@theme") {
  	          let [_, L] = wn(b.params); if (D.reference && (_ |= 2), L) { if (!hn.test(L)) throw new Error(`The prefix "${L}" is invalid. Prefixes must be lowercase ASCII letters (a-z) only.`); f.prefix = L; } return U(b.nodes, O => {
  	            if (O.kind === "at-rule" && O.name === "@keyframes") return f.addKeyframes(O), 1; if (O.kind === "comment") return; if (O.kind === "declaration" && O.property.startsWith("--")) { f.add(ve(O.property), O.value ?? "", _, O.src); return } let H = le([F(b.name, b.params, [O])]).split(`
`).map((I, q, X) => `${q === 0 || q >= X.length - 2 ? " " : ">"} ${I}`).join(`
`); throw new Error(`\`@theme\` blocks must only contain custom properties or \`@keyframes\`.

${H}`)
  	          }), g ? R([]) : (g = M(":root, :host", []), g.src = b.src, R([g])), 1
  	        }
  	      }
  	    }); let N = Lr(f); if (a && (N.important = a), x.length > 0) for (let b of x) N.invalidCandidates.add(b); s |= await bi({ designSystem: N, base: r, ast: t, loadModule: e, sources: v }); for (let b of u) b(N); for (let b of c) b(N); if (g) { let b = []; for (let [R, D] of N.theme.entries()) { if (D.options & 2) continue; let _ = l(me(R), D.value); _.src = D.src, b.push(_); } let V = N.theme.getKeyframes(); for (let R of V) t.push(ue({ theme: true }, [j([R])])); g.nodes = [ue({ theme: true }, b)]; } if (p) { let b = p; b.kind = "context", b.context = {}; } if (m.length > 0) { for (let b of m) { let V = M("&", b.nodes), R = b.params, D = N.parseVariant(R); if (D === null) throw new Error(`Cannot use \`@variant\` with unknown variant: ${R}`); if (Te(V, D, N.variants) === null) throw new Error(`Cannot use \`@variant\` with variant: ${R}`); Object.assign(b, V); } s |= 32; } return s |= Ve(t, N), s |= je(t, N), U(t, (b, { replaceWith: V }) => { if (b.kind === "at-rule") return b.name === "@utility" && V([]), 1 }), { designSystem: N, ast: t, sources: v, root: y, utilitiesNode: p, features: s, inlineCandidates: k }
  	  } async function yn(t, r = {}) { let { designSystem: i, ast: e, sources: o, root: s, utilitiesNode: a, features: f, inlineCandidates: u } = await bn(t, r); e.unshift(Je(`! tailwindcss v${Yt} | MIT License | https://tailwindcss.com `)); function c(k) { i.invalidCandidates.add(k); } let g = new Set, p = null, m = 0, v = false; for (let k of u) i.invalidCandidates.has(k) || (g.add(k), v = true); return { sources: o, root: s, features: f, build(k) { if (f === 0) return t; if (!a) return p ??= be(e, i, r.polyfills), p; let x = v, y = false; v = false; let N = g.size; for (let V of k) if (!i.invalidCandidates.has(V)) if (V[0] === "-" && V[1] === "-") { let R = i.theme.markUsedVariable(V); x ||= R, y ||= R; } else g.add(V), x ||= g.size !== N; if (!x) return p ??= be(e, i, r.polyfills), p; let b = he(g, i, { onInvalidCandidate: c }).astNodes; return r.from && U(b, V => { V.src ??= a.src; }), !y && m === b.length ? (p ??= be(e, i, r.polyfills), p) : (m = b.length, a.nodes = b, p = be(e, i, r.polyfills), p) } } } async function Ci(t, r = {}) { let i = Se(t, { from: r.from }), e = await yn(i, r), o = i, s = t; return { ...e, build(a) { let f = e.build(a); return f === o || (s = le(f, !!r.from), o = f), s }, buildSourceMap() { return xi({ ast: o }) } } } var Si = `@layer theme, base, components, utilities;

@import './theme.css' layer(theme);
@import './utilities.css' layer(utilities);
`; var $i = `
`; var Ni = `@theme default {
  --font-sans:
    ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
  --font-serif: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;
  --font-mono:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
    monospace;

  --color-red-50: oklch(97.1% 0.013 17.38);
  --color-red-100: oklch(93.6% 0.032 17.717);
  --color-red-200: oklch(88.5% 0.062 18.334);
  --color-red-300: oklch(80.8% 0.114 19.571);
  --color-red-400: oklch(70.4% 0.191 22.216);
  --color-red-500: oklch(63.7% 0.237 25.331);
  --color-red-600: oklch(57.7% 0.245 27.325);
  --color-red-700: oklch(50.5% 0.213 27.518);
  --color-red-800: oklch(44.4% 0.177 26.899);
  --color-red-900: oklch(39.6% 0.141 25.723);
  --color-red-950: oklch(25.8% 0.092 26.042);

  --color-orange-50: oklch(98% 0.016 73.684);
  --color-orange-100: oklch(95.4% 0.038 75.164);
  --color-orange-200: oklch(90.1% 0.076 70.697);
  --color-orange-300: oklch(83.7% 0.128 66.29);
  --color-orange-400: oklch(75% 0.183 55.934);
  --color-orange-500: oklch(70.5% 0.213 47.604);
  --color-orange-600: oklch(64.6% 0.222 41.116);
  --color-orange-700: oklch(55.3% 0.195 38.402);
  --color-orange-800: oklch(47% 0.157 37.304);
  --color-orange-900: oklch(40.8% 0.123 38.172);
  --color-orange-950: oklch(26.6% 0.079 36.259);

  --color-amber-50: oklch(98.7% 0.022 95.277);
  --color-amber-100: oklch(96.2% 0.059 95.617);
  --color-amber-200: oklch(92.4% 0.12 95.746);
  --color-amber-300: oklch(87.9% 0.169 91.605);
  --color-amber-400: oklch(82.8% 0.189 84.429);
  --color-amber-500: oklch(76.9% 0.188 70.08);
  --color-amber-600: oklch(66.6% 0.179 58.318);
  --color-amber-700: oklch(55.5% 0.163 48.998);
  --color-amber-800: oklch(47.3% 0.137 46.201);
  --color-amber-900: oklch(41.4% 0.112 45.904);
  --color-amber-950: oklch(27.9% 0.077 45.635);

  --color-yellow-50: oklch(98.7% 0.026 102.212);
  --color-yellow-100: oklch(97.3% 0.071 103.193);
  --color-yellow-200: oklch(94.5% 0.129 101.54);
  --color-yellow-300: oklch(90.5% 0.182 98.111);
  --color-yellow-400: oklch(85.2% 0.199 91.936);
  --color-yellow-500: oklch(79.5% 0.184 86.047);
  --color-yellow-600: oklch(68.1% 0.162 75.834);
  --color-yellow-700: oklch(55.4% 0.135 66.442);
  --color-yellow-800: oklch(47.6% 0.114 61.907);
  --color-yellow-900: oklch(42.1% 0.095 57.708);
  --color-yellow-950: oklch(28.6% 0.066 53.813);

  --color-lime-50: oklch(98.6% 0.031 120.757);
  --color-lime-100: oklch(96.7% 0.067 122.328);
  --color-lime-200: oklch(93.8% 0.127 124.321);
  --color-lime-300: oklch(89.7% 0.196 126.665);
  --color-lime-400: oklch(84.1% 0.238 128.85);
  --color-lime-500: oklch(76.8% 0.233 130.85);
  --color-lime-600: oklch(64.8% 0.2 131.684);
  --color-lime-700: oklch(53.2% 0.157 131.589);
  --color-lime-800: oklch(45.3% 0.124 130.933);
  --color-lime-900: oklch(40.5% 0.101 131.063);
  --color-lime-950: oklch(27.4% 0.072 132.109);

  --color-green-50: oklch(98.2% 0.018 155.826);
  --color-green-100: oklch(96.2% 0.044 156.743);
  --color-green-200: oklch(92.5% 0.084 155.995);
  --color-green-300: oklch(87.1% 0.15 154.449);
  --color-green-400: oklch(79.2% 0.209 151.711);
  --color-green-500: oklch(72.3% 0.219 149.579);
  --color-green-600: oklch(62.7% 0.194 149.214);
  --color-green-700: oklch(52.7% 0.154 150.069);
  --color-green-800: oklch(44.8% 0.119 151.328);
  --color-green-900: oklch(39.3% 0.095 152.535);
  --color-green-950: oklch(26.6% 0.065 152.934);

  --color-emerald-50: oklch(97.9% 0.021 166.113);
  --color-emerald-100: oklch(95% 0.052 163.051);
  --color-emerald-200: oklch(90.5% 0.093 164.15);
  --color-emerald-300: oklch(84.5% 0.143 164.978);
  --color-emerald-400: oklch(76.5% 0.177 163.223);
  --color-emerald-500: oklch(69.6% 0.17 162.48);
  --color-emerald-600: oklch(59.6% 0.145 163.225);
  --color-emerald-700: oklch(50.8% 0.118 165.612);
  --color-emerald-800: oklch(43.2% 0.095 166.913);
  --color-emerald-900: oklch(37.8% 0.077 168.94);
  --color-emerald-950: oklch(26.2% 0.051 172.552);

  --color-teal-50: oklch(98.4% 0.014 180.72);
  --color-teal-100: oklch(95.3% 0.051 180.801);
  --color-teal-200: oklch(91% 0.096 180.426);
  --color-teal-300: oklch(85.5% 0.138 181.071);
  --color-teal-400: oklch(77.7% 0.152 181.912);
  --color-teal-500: oklch(70.4% 0.14 182.503);
  --color-teal-600: oklch(60% 0.118 184.704);
  --color-teal-700: oklch(51.1% 0.096 186.391);
  --color-teal-800: oklch(43.7% 0.078 188.216);
  --color-teal-900: oklch(38.6% 0.063 188.416);
  --color-teal-950: oklch(27.7% 0.046 192.524);

  --color-cyan-50: oklch(98.4% 0.019 200.873);
  --color-cyan-100: oklch(95.6% 0.045 203.388);
  --color-cyan-200: oklch(91.7% 0.08 205.041);
  --color-cyan-300: oklch(86.5% 0.127 207.078);
  --color-cyan-400: oklch(78.9% 0.154 211.53);
  --color-cyan-500: oklch(71.5% 0.143 215.221);
  --color-cyan-600: oklch(60.9% 0.126 221.723);
  --color-cyan-700: oklch(52% 0.105 223.128);
  --color-cyan-800: oklch(45% 0.085 224.283);
  --color-cyan-900: oklch(39.8% 0.07 227.392);
  --color-cyan-950: oklch(30.2% 0.056 229.695);

  --color-sky-50: oklch(97.7% 0.013 236.62);
  --color-sky-100: oklch(95.1% 0.026 236.824);
  --color-sky-200: oklch(90.1% 0.058 230.902);
  --color-sky-300: oklch(82.8% 0.111 230.318);
  --color-sky-400: oklch(74.6% 0.16 232.661);
  --color-sky-500: oklch(68.5% 0.169 237.323);
  --color-sky-600: oklch(58.8% 0.158 241.966);
  --color-sky-700: oklch(50% 0.134 242.749);
  --color-sky-800: oklch(44.3% 0.11 240.79);
  --color-sky-900: oklch(39.1% 0.09 240.876);
  --color-sky-950: oklch(29.3% 0.066 243.157);

  --color-blue-50: oklch(97% 0.014 254.604);
  --color-blue-100: oklch(93.2% 0.032 255.585);
  --color-blue-200: oklch(88.2% 0.059 254.128);
  --color-blue-300: oklch(80.9% 0.105 251.813);
  --color-blue-400: oklch(70.7% 0.165 254.624);
  --color-blue-500: oklch(62.3% 0.214 259.815);
  --color-blue-600: oklch(54.6% 0.245 262.881);
  --color-blue-700: oklch(48.8% 0.243 264.376);
  --color-blue-800: oklch(42.4% 0.199 265.638);
  --color-blue-900: oklch(37.9% 0.146 265.522);
  --color-blue-950: oklch(28.2% 0.091 267.935);

  --color-indigo-50: oklch(96.2% 0.018 272.314);
  --color-indigo-100: oklch(93% 0.034 272.788);
  --color-indigo-200: oklch(87% 0.065 274.039);
  --color-indigo-300: oklch(78.5% 0.115 274.713);
  --color-indigo-400: oklch(67.3% 0.182 276.935);
  --color-indigo-500: oklch(58.5% 0.233 277.117);
  --color-indigo-600: oklch(51.1% 0.262 276.966);
  --color-indigo-700: oklch(45.7% 0.24 277.023);
  --color-indigo-800: oklch(39.8% 0.195 277.366);
  --color-indigo-900: oklch(35.9% 0.144 278.697);
  --color-indigo-950: oklch(25.7% 0.09 281.288);

  --color-violet-50: oklch(96.9% 0.016 293.756);
  --color-violet-100: oklch(94.3% 0.029 294.588);
  --color-violet-200: oklch(89.4% 0.057 293.283);
  --color-violet-300: oklch(81.1% 0.111 293.571);
  --color-violet-400: oklch(70.2% 0.183 293.541);
  --color-violet-500: oklch(60.6% 0.25 292.717);
  --color-violet-600: oklch(54.1% 0.281 293.009);
  --color-violet-700: oklch(49.1% 0.27 292.581);
  --color-violet-800: oklch(43.2% 0.232 292.759);
  --color-violet-900: oklch(38% 0.189 293.745);
  --color-violet-950: oklch(28.3% 0.141 291.089);

  --color-purple-50: oklch(97.7% 0.014 308.299);
  --color-purple-100: oklch(94.6% 0.033 307.174);
  --color-purple-200: oklch(90.2% 0.063 306.703);
  --color-purple-300: oklch(82.7% 0.119 306.383);
  --color-purple-400: oklch(71.4% 0.203 305.504);
  --color-purple-500: oklch(62.7% 0.265 303.9);
  --color-purple-600: oklch(55.8% 0.288 302.321);
  --color-purple-700: oklch(49.6% 0.265 301.924);
  --color-purple-800: oklch(43.8% 0.218 303.724);
  --color-purple-900: oklch(38.1% 0.176 304.987);
  --color-purple-950: oklch(29.1% 0.149 302.717);

  --color-fuchsia-50: oklch(97.7% 0.017 320.058);
  --color-fuchsia-100: oklch(95.2% 0.037 318.852);
  --color-fuchsia-200: oklch(90.3% 0.076 319.62);
  --color-fuchsia-300: oklch(83.3% 0.145 321.434);
  --color-fuchsia-400: oklch(74% 0.238 322.16);
  --color-fuchsia-500: oklch(66.7% 0.295 322.15);
  --color-fuchsia-600: oklch(59.1% 0.293 322.896);
  --color-fuchsia-700: oklch(51.8% 0.253 323.949);
  --color-fuchsia-800: oklch(45.2% 0.211 324.591);
  --color-fuchsia-900: oklch(40.1% 0.17 325.612);
  --color-fuchsia-950: oklch(29.3% 0.136 325.661);

  --color-pink-50: oklch(97.1% 0.014 343.198);
  --color-pink-100: oklch(94.8% 0.028 342.258);
  --color-pink-200: oklch(89.9% 0.061 343.231);
  --color-pink-300: oklch(82.3% 0.12 346.018);
  --color-pink-400: oklch(71.8% 0.202 349.761);
  --color-pink-500: oklch(65.6% 0.241 354.308);
  --color-pink-600: oklch(59.2% 0.249 0.584);
  --color-pink-700: oklch(52.5% 0.223 3.958);
  --color-pink-800: oklch(45.9% 0.187 3.815);
  --color-pink-900: oklch(40.8% 0.153 2.432);
  --color-pink-950: oklch(28.4% 0.109 3.907);

  --color-rose-50: oklch(96.9% 0.015 12.422);
  --color-rose-100: oklch(94.1% 0.03 12.58);
  --color-rose-200: oklch(89.2% 0.058 10.001);
  --color-rose-300: oklch(81% 0.117 11.638);
  --color-rose-400: oklch(71.2% 0.194 13.428);
  --color-rose-500: oklch(64.5% 0.246 16.439);
  --color-rose-600: oklch(58.6% 0.253 17.585);
  --color-rose-700: oklch(51.4% 0.222 16.935);
  --color-rose-800: oklch(45.5% 0.188 13.697);
  --color-rose-900: oklch(41% 0.159 10.272);
  --color-rose-950: oklch(27.1% 0.105 12.094);

  --color-slate-50: oklch(98.4% 0.003 247.858);
  --color-slate-100: oklch(96.8% 0.007 247.896);
  --color-slate-200: oklch(92.9% 0.013 255.508);
  --color-slate-300: oklch(86.9% 0.022 252.894);
  --color-slate-400: oklch(70.4% 0.04 256.788);
  --color-slate-500: oklch(55.4% 0.046 257.417);
  --color-slate-600: oklch(44.6% 0.043 257.281);
  --color-slate-700: oklch(37.2% 0.044 257.287);
  --color-slate-800: oklch(27.9% 0.041 260.031);
  --color-slate-900: oklch(20.8% 0.042 265.755);
  --color-slate-950: oklch(12.9% 0.042 264.695);

  --color-gray-50: oklch(98.5% 0.002 247.839);
  --color-gray-100: oklch(96.7% 0.003 264.542);
  --color-gray-200: oklch(92.8% 0.006 264.531);
  --color-gray-300: oklch(87.2% 0.01 258.338);
  --color-gray-400: oklch(70.7% 0.022 261.325);
  --color-gray-500: oklch(55.1% 0.027 264.364);
  --color-gray-600: oklch(44.6% 0.03 256.802);
  --color-gray-700: oklch(37.3% 0.034 259.733);
  --color-gray-800: oklch(27.8% 0.033 256.848);
  --color-gray-900: oklch(21% 0.034 264.665);
  --color-gray-950: oklch(13% 0.028 261.692);

  --color-zinc-50: oklch(98.5% 0 0);
  --color-zinc-100: oklch(96.7% 0.001 286.375);
  --color-zinc-200: oklch(92% 0.004 286.32);
  --color-zinc-300: oklch(87.1% 0.006 286.286);
  --color-zinc-400: oklch(70.5% 0.015 286.067);
  --color-zinc-500: oklch(55.2% 0.016 285.938);
  --color-zinc-600: oklch(44.2% 0.017 285.786);
  --color-zinc-700: oklch(37% 0.013 285.805);
  --color-zinc-800: oklch(27.4% 0.006 286.033);
  --color-zinc-900: oklch(21% 0.006 285.885);
  --color-zinc-950: oklch(14.1% 0.005 285.823);

  --color-neutral-50: oklch(98.5% 0 0);
  --color-neutral-100: oklch(97% 0 0);
  --color-neutral-200: oklch(92.2% 0 0);
  --color-neutral-300: oklch(87% 0 0);
  --color-neutral-400: oklch(70.8% 0 0);
  --color-neutral-500: oklch(55.6% 0 0);
  --color-neutral-600: oklch(43.9% 0 0);
  --color-neutral-700: oklch(37.1% 0 0);
  --color-neutral-800: oklch(26.9% 0 0);
  --color-neutral-900: oklch(20.5% 0 0);
  --color-neutral-950: oklch(14.5% 0 0);

  --color-stone-50: oklch(98.5% 0.001 106.423);
  --color-stone-100: oklch(97% 0.001 106.424);
  --color-stone-200: oklch(92.3% 0.003 48.717);
  --color-stone-300: oklch(86.9% 0.005 56.366);
  --color-stone-400: oklch(70.9% 0.01 56.259);
  --color-stone-500: oklch(55.3% 0.013 58.071);
  --color-stone-600: oklch(44.4% 0.011 73.639);
  --color-stone-700: oklch(37.4% 0.01 67.558);
  --color-stone-800: oklch(26.8% 0.007 34.298);
  --color-stone-900: oklch(21.6% 0.006 56.043);
  --color-stone-950: oklch(14.7% 0.004 49.25);

  --color-black: #000;
  --color-white: #fff;

  --spacing: 0.25rem;

  --breakpoint-sm: 40rem;
  --breakpoint-md: 48rem;
  --breakpoint-lg: 64rem;
  --breakpoint-xl: 80rem;
  --breakpoint-2xl: 96rem;

  --container-3xs: 16rem;
  --container-2xs: 18rem;
  --container-xs: 20rem;
  --container-sm: 24rem;
  --container-md: 28rem;
  --container-lg: 32rem;
  --container-xl: 36rem;
  --container-2xl: 42rem;
  --container-3xl: 48rem;
  --container-4xl: 56rem;
  --container-5xl: 64rem;
  --container-6xl: 72rem;
  --container-7xl: 80rem;

  --text-xs: 0.75rem;
  --text-xs--line-height: calc(1 / 0.75);
  --text-sm: 0.875rem;
  --text-sm--line-height: calc(1.25 / 0.875);
  --text-base: 1rem;
  --text-base--line-height: calc(1.5 / 1);
  --text-lg: 1.125rem;
  --text-lg--line-height: calc(1.75 / 1.125);
  --text-xl: 1.25rem;
  --text-xl--line-height: calc(1.75 / 1.25);
  --text-2xl: 1.5rem;
  --text-2xl--line-height: calc(2 / 1.5);
  --text-3xl: 1.875rem;
  --text-3xl--line-height: calc(2.25 / 1.875);
  --text-4xl: 2.25rem;
  --text-4xl--line-height: calc(2.5 / 2.25);
  --text-5xl: 3rem;
  --text-5xl--line-height: 1;
  --text-6xl: 3.75rem;
  --text-6xl--line-height: 1;
  --text-7xl: 4.5rem;
  --text-7xl--line-height: 1;
  --text-8xl: 6rem;
  --text-8xl--line-height: 1;
  --text-9xl: 8rem;
  --text-9xl--line-height: 1;

  --font-weight-thin: 100;
  --font-weight-extralight: 200;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  --font-weight-black: 900;

  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0em;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;

  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;

  --radius-xs: 0.125rem;
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;
  --radius-4xl: 2rem;

  --shadow-2xs: 0 1px rgb(0 0 0 / 0.05);
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  --inset-shadow-2xs: inset 0 1px rgb(0 0 0 / 0.05);
  --inset-shadow-xs: inset 0 1px 1px rgb(0 0 0 / 0.05);
  --inset-shadow-sm: inset 0 2px 4px rgb(0 0 0 / 0.05);

  --drop-shadow-xs: 0 1px 1px rgb(0 0 0 / 0.05);
  --drop-shadow-sm: 0 1px 2px rgb(0 0 0 / 0.15);
  --drop-shadow-md: 0 3px 3px rgb(0 0 0 / 0.12);
  --drop-shadow-lg: 0 4px 4px rgb(0 0 0 / 0.15);
  --drop-shadow-xl: 0 9px 7px rgb(0 0 0 / 0.1);
  --drop-shadow-2xl: 0 25px 25px rgb(0 0 0 / 0.15);

  --text-shadow-2xs: 0px 1px 0px rgb(0 0 0 / 0.15);
  --text-shadow-xs: 0px 1px 1px rgb(0 0 0 / 0.2);
  --text-shadow-sm:
    0px 1px 0px rgb(0 0 0 / 0.075), 0px 1px 1px rgb(0 0 0 / 0.075), 0px 2px 2px rgb(0 0 0 / 0.075);
  --text-shadow-md:
    0px 1px 1px rgb(0 0 0 / 0.1), 0px 1px 2px rgb(0 0 0 / 0.1), 0px 2px 4px rgb(0 0 0 / 0.1);
  --text-shadow-lg:
    0px 1px 2px rgb(0 0 0 / 0.1), 0px 3px 2px rgb(0 0 0 / 0.1), 0px 4px 8px rgb(0 0 0 / 0.1);

  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

  --animate-spin: spin 1s linear infinite;
  --animate-ping: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  --animate-pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  --animate-bounce: bounce 1s infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes ping {
    75%,
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  @keyframes pulse {
    50% {
      opacity: 0.5;
    }
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(-25%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }

    50% {
      transform: none;
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }

  --blur-xs: 4px;
  --blur-sm: 8px;
  --blur-md: 12px;
  --blur-lg: 16px;
  --blur-xl: 24px;
  --blur-2xl: 40px;
  --blur-3xl: 64px;

  --perspective-dramatic: 100px;
  --perspective-near: 300px;
  --perspective-normal: 500px;
  --perspective-midrange: 800px;
  --perspective-distant: 1200px;

  --aspect-video: 16 / 9;

  --default-transition-duration: 150ms;
  --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  --default-font-family: --theme(--font-sans, initial);
  --default-font-feature-settings: --theme(--font-sans--font-feature-settings, initial);
  --default-font-variation-settings: --theme(--font-sans--font-variation-settings, initial);
  --default-mono-font-family: --theme(--font-mono, initial);
  --default-mono-font-feature-settings: --theme(--font-mono--font-feature-settings, initial);
  --default-mono-font-variation-settings: --theme(--font-mono--font-variation-settings, initial);
}

/* Deprecated */
@theme default inline reference {
  --blur: 8px;
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  --drop-shadow: 0 1px 2px rgb(0 0 0 / 0.1), 0 1px 1px rgb(0 0 0 / 0.06);
  --radius: 0.25rem;
  --max-width-prose: 65ch;
}
`; var Vi = `@tailwind utilities;
`; var Be = { index: Si, preflight: $i, theme: Ni, utilities: Vi }; var kt = class { start(r) { performance.mark(`${r} (start)`); } end(r, i) { performance.mark(`${r} (end)`), performance.measure(r, { start: `${r} (start)`, end: `${r} (end)`, detail: i }); } hit(r, i) { performance.mark(r, { detail: i }); } error(r) { throw performance.mark("(error)", { detail: { error: `${r}` } }), r } }; var Ei = "text/tailwindcss", vt, Ht = new Set, qt = "", Gt = document.createElement("style"), Ti = Promise.resolve(), Vn = 1, re = new kt; async function Tn() {
  	    re.start("Create compiler"), re.start("Reading Stylesheets"); let t = document.querySelectorAll(`style[type="${Ei}"]`), r = ""; for (let i of t) Ri(i), r += i.textContent + `
`; if (r.includes("@import") || (r = `@import "tailwindcss";${r}`), re.end("Reading Stylesheets", { size: r.length, changed: qt !== r }), qt !== r) { qt = r, re.start("Compile CSS"); try { vt = await Ci(r, { base: "/", loadStylesheet: En, loadModule: Rn }); } finally { re.end("Compile CSS"), re.end("Create compiler"); } Ht.clear(); }
  	  } async function En(t, r) { function i() { if (t === "tailwindcss") return { path: "virtual:tailwindcss/index.css", base: r, content: Be.index }; if (t === "tailwindcss/preflight" || t === "tailwindcss/preflight.css" || t === "./preflight.css") return { path: "virtual:tailwindcss/preflight.css", base: r, content: Be.preflight }; if (t === "tailwindcss/theme" || t === "tailwindcss/theme.css" || t === "./theme.css") return { path: "virtual:tailwindcss/theme.css", base: r, content: Be.theme }; if (t === "tailwindcss/utilities" || t === "tailwindcss/utilities.css" || t === "./utilities.css") return { path: "virtual:tailwindcss/utilities.css", base: r, content: Be.utilities }; throw new Error(`The browser build does not support @import for "${t}"`) } try { let e = i(); return re.hit("Loaded stylesheet", { id: t, base: r, size: e.content.length }), e } catch (e) { throw re.hit("Failed to load stylesheet", { id: t, base: r, error: e.message ?? e }), e } } async function Rn() { throw new Error("The browser build does not support plugins or config files.") } async function Pn(t) { if (!vt) return; let r = new Set; re.start("Collect classes"); for (let i of document.querySelectorAll("[class]")) for (let e of i.classList) Ht.has(e) || (Ht.add(e), r.add(e)); re.end("Collect classes", { count: r.size }), !(r.size === 0 && t === "incremental") && (re.start("Build utilities"), Gt.textContent = vt.build(Array.from(r)), re.end("Build utilities")); } function wt(t) { async function r() { if (!vt && t !== "full") return; let i = Vn++; re.start(`Build #${i} (${t})`), t === "full" && await Tn(), re.start("Build"), await Pn(t), re.end("Build"), re.end(`Build #${i} (${t})`); } Ti = Ti.then(r).catch(i => re.error(i)); } var On = new MutationObserver(() => wt("full")); function Ri(t) { On.observe(t, { attributes: true, attributeFilter: ["type"], characterData: true, subtree: true, childList: true }); } new MutationObserver(t => { let r = 0, i = 0; for (let e of t) { for (let o of e.addedNodes) o.nodeType === Node.ELEMENT_NODE && o.tagName === "STYLE" && o.getAttribute("type") === Ei && (Ri(o), r++); for (let o of e.addedNodes) o.nodeType === 1 && o !== Gt && i++; e.type === "attributes" && i++; } if (r > 0) return wt("full"); if (i > 0) return wt("incremental") }).observe(document.documentElement, { attributes: true, attributeFilter: ["class"], childList: true, subtree: true }); wt("full"); document.head.append(Gt);
  	})();
  	return tailwind_v4_1;
  }

  requireTailwind_v4_1();

  /* Indux Utilities */

  // Browser runtime compiler
  class TailwindCompiler {
      constructor(options = {}) {

          // Create style element immediately
          this.styleElement = document.createElement('style');
          this.styleElement.id = 'utility-styles';
          document.head.appendChild(this.styleElement);

          // Initialize properties
          this.tailwindLink = null;
          this.observer = null;
          this.isCompiling = false;
          this.compileTimeout = null;
          this.cache = new Map();
          this.lastThemeHash = null;
          this.processedElements = new WeakSet();
          this.activeBreakpoints = new Set();
          this.activeModifiers = new Set();
          this.cssFiles = new Set();
          this.pendingStyles = new Map();
          this.currentThemeVars = new Map();
          this.hasInitialized = false;
          this.lastCompileTime = 0;
          this.minCompileInterval = 100; // Minimum time between compilations in ms
          this.cssContentCache = new Map(); // Cache CSS file contents with timestamps
          this.lastClassesHash = ''; // Track changes in used classes
          this.staticClassCache = new Set(); // Cache classes found in static HTML/components
          this.dynamicClassCache = new Set(); // Cache classes that appear dynamically
          this.hasScannedStatic = false; // Track if we've done initial static scan
          this.staticScanPromise = null; // Promise for initial static scan
          this.ignoredClassPatterns = [ // Patterns for classes to ignore
              /^hljs/, /^language-/, /^copy$/, /^copied$/, /^lines$/, /^selected$/
          ];
          this.ignoredElementSelectors = [ // Elements to ignore for DOM mutations
              'pre', 'code', 'x-code', 'x-code-group'
          ];
          this.ignoredAttributes = [ // Attribute changes to ignore (non-visual/utility changes)
              'id', 'data-order', 'data-component-id', 'data-highlighted', 'data-processed',
              'x-intersect', 'x-intersect:leave', 'x-show', 'x-hide', 'x-transition',
              'aria-expanded', 'aria-selected', 'aria-current', 'aria-hidden', 'aria-label',
              'tabindex', 'role', 'title', 'alt', 'data-state', 'data-value'
          ];
          this.significantChangeSelectors = [ // Only these DOM additions trigger recompilation
              '[data-component]', '[x-data]' // Components and Alpine elements
          ];
          this.options = {
              rootSelector: options.rootSelector || ':root',
              themeSelector: options.themeSelector || '@theme',
              debounceTime: options.debounceTime || 50,
              maxCacheAge: options.maxCacheAge || 24 * 60 * 60 * 1000,
              debug: options.debug || true,
              ...options
          };

          // Pre-compile regex patterns
          this.regexPatterns = {
              root: new RegExp(`${this.options.rootSelector}\\s*{([^}]*)}`, 'g'),
              theme: new RegExp(`${this.options.themeSelector}\\s*{([^}]*)}`, 'g'),
              variable: /--([\w-]+):\s*([^;]+);/g,
              tailwindPrefix: /^(color|font|text|font-weight|tracking|leading|breakpoint|container|spacing|radius|shadow|inset-shadow|drop-shadow|blur|perspective|aspect|ease|animate|border-width|border-style|outline|outline-width|outline-style|ring|ring-offset|divide|accent|caret|decoration|placeholder|selection|scrollbar)-/
          };

          // Pre-define pseudo classes
          this.pseudoClasses = ['hover', 'focus', 'active', 'disabled', 'dark'];

          // Cache for discovered custom utility classes
          this.customUtilities = new Map();

          // Pre-define utility generators
          this.utilityGenerators = {
              'color-': (suffix, value) => {
                  const utilities = [];

                  // Helper function to generate utility with optional opacity
                  const addUtility = (prefix, property, baseValue) => {
                      // Base utility without opacity
                      utilities.push([`${prefix}-${suffix}`, `${property}: ${baseValue}`]);
                  };

                  addUtility('text', 'color', value);
                  addUtility('bg', 'background-color', value);
                  addUtility('border', 'border-color', value);
                  addUtility('outline', 'outline-color', value);
                  addUtility('ring', 'box-shadow', `0 0 0 1px ${value}`);
                  addUtility('fill', 'fill', value);
                  addUtility('stroke', 'stroke', value);

                  return utilities;
              },
              'font-': (suffix, value) => [
                  [`font-${suffix}`, `font-family: ${value}`]
              ],
              'text-': (suffix, value) => [
                  [`text-${suffix}`, `font-size: ${value}`]
              ],
              'font-weight-': (suffix, value) => [
                  [`font-${suffix}`, `font-weight: ${value}`]
              ],
              'tracking-': (suffix, value) => [
                  [`tracking-${suffix}`, `letter-spacing: ${value}`]
              ],
              'leading-': (suffix, value) => [
                  [`leading-${suffix}`, `line-height: ${value}`]
              ],
              'breakpoint-': (suffix, value) => [
                  [`@${suffix}`, `@media (min-width: ${value})`]
              ],
              'container-': (suffix, value) => [
                  [`container-${suffix}`, `max-width: ${value}`],
                  [`@container-${suffix}`, `@container (min-width: ${value})`]
              ],
              'spacing-': (suffix, value) => [
                  [`gap-${suffix}`, `gap: ${value}`],
                  [`p-${suffix}`, `padding: ${value}`],
                  [`px-${suffix}`, `padding-left: ${value}; padding-right: ${value}`],
                  [`py-${suffix}`, `padding-top: ${value}; padding-bottom: ${value}`],
                  [`m-${suffix}`, `margin: ${value}`],
                  [`mx-${suffix}`, `margin-left: ${value}; margin-right: ${value}`],
                  [`my-${suffix}`, `margin-top: ${value}; margin-bottom: ${value}`],
                  [`space-x-${suffix}`, `> * + * { margin-left: ${value}; }`],
                  [`space-y-${suffix}`, `> * + * { margin-top: ${value}; }`],
                  [`max-w-${suffix}`, `max-width: ${value}`],
                  [`max-h-${suffix}`, `max-height: ${value}`],
                  [`min-w-${suffix}`, `min-width: ${value}`],
                  [`min-h-${suffix}`, `min-height: ${value}`],
                  [`w-${suffix}`, `width: ${value}`],
                  [`h-${suffix}`, `height: ${value}`]
              ],
              'radius-': (suffix, value) => [
                  [`rounded-${suffix}`, `border-radius: ${value}`]
              ],
              'shadow-': (suffix, value) => [
                  [`shadow-${suffix}`, `box-shadow: ${value}`]
              ],
              'inset-shadow-': (suffix, value) => [
                  [`inset-shadow-${suffix}`, `box-shadow: inset ${value}`]
              ],
              'drop-shadow-': (suffix, value) => [
                  [`drop-shadow-${suffix}`, `filter: drop-shadow(${value})`]
              ],
              'blur-': (suffix, value) => [
                  [`blur-${suffix}`, `filter: blur(${value})`]
              ],
              'perspective-': (suffix, value) => [
                  [`perspective-${suffix}`, `perspective: ${value}`]
              ],
              'aspect-': (suffix, value) => [
                  [`aspect-${suffix}`, `aspect-ratio: ${value}`]
              ],
              'ease-': (suffix, value) => [
                  [`ease-${suffix}`, `transition-timing-function: ${value}`]
              ],
              'animate-': (suffix, value) => [
                  [`animate-${suffix}`, `animation: ${value}`]
              ],
              'border-width-': (suffix, value) => [
                  [`border-${suffix}`, `border-width: ${value}`]
              ],
              'border-style-': (suffix, value) => [
                  [`border-${suffix}`, `border-style: ${value}`]
              ],
              'outline-': (suffix, value) => [
                  [`outline-${suffix}`, `outline-color: ${value}`]
              ],
              'outline-width-': (suffix, value) => [
                  [`outline-${suffix}`, `outline-width: ${value}`]
              ],
              'outline-style-': (suffix, value) => [
                  [`outline-${suffix}`, `outline-style: ${value}`]
              ],
              'ring-': (suffix, value) => [
                  [`ring-${suffix}`, `box-shadow: 0 0 0 ${value} var(--color-ring)`]
              ],
              'ring-offset-': (suffix, value) => [
                  [`ring-offset-${suffix}`, `--tw-ring-offset-width: ${value}`]
              ],
              'divide-': (suffix, value) => [
                  [`divide-${suffix}`, `border-color: ${value}`]
              ],
              'accent-': (suffix, value) => [
                  [`accent-${suffix}`, `accent-color: ${value}`]
              ],
              'caret-': (suffix, value) => [
                  [`caret-${suffix}`, `caret-color: ${value}`]
              ],
              'decoration-': (suffix, value) => [
                  [`decoration-${suffix}`, `text-decoration-color: ${value}`]
              ],
              'placeholder-': (suffix, value) => [
                  [`placeholder-${suffix}`, `&::placeholder { color: ${value} }`]
              ],
              'selection-': (suffix, value) => [
                  [`selection-${suffix}`, `&::selection { background-color: ${value} }`]
              ],
              'scrollbar-': (suffix, value) => [
                  [`scrollbar-${suffix}`, `scrollbar-color: ${value}`]
              ]
          };

          // Define valid variants and their CSS selectors
          this.variants = {
              // State variants
              'hover': ':hover',
              'focus': ':focus',
              'focus-visible': ':focus-visible',
              'focus-within': ':focus-within',
              'active': ':active',
              'visited': ':visited',
              'target': ':target',
              'first': ':first-child',
              'last': ':last-child',
              'only': ':only-child',
              'odd': ':nth-child(odd)',
              'even': ':nth-child(even)',
              'first-of-type': ':first-of-type',
              'last-of-type': ':last-of-type',
              'only-of-type': ':only-of-type',
              'empty': ':empty',
              'disabled': ':disabled',
              'enabled': ':enabled',
              'checked': ':checked',
              'indeterminate': ':indeterminate',
              'default': ':default',
              'required': ':required',
              'valid': ':valid',
              'invalid': ':invalid',
              'in-range': ':in-range',
              'out-of-range': ':out-of-range',
              'placeholder-shown': ':placeholder-shown',
              'autofill': ':autofill',
              'read-only': ':read-only',
              'read-write': ':read-write',
              'optional': ':optional',
              'user-valid': ':user-valid',
              'user-invalid': ':user-invalid',
              'open': '[open] &',
              'closed': ':not([open]) &',
              'paused': '[data-state="paused"] &',
              'playing': '[data-state="playing"] &',
              'muted': '[data-state="muted"] &',
              'unmuted': '[data-state="unmuted"] &',
              'collapsed': '[data-state="collapsed"] &',
              'expanded': '[data-state="expanded"] &',
              'unchecked': ':not(:checked)',
              'selected': '[data-state="selected"] &',
              'unselected': '[data-state="unselected"] &',
              'details-content': '::details-content',
              'nth': ':nth-child',
              'nth-last': ':nth-last-child',
              'nth-of-type': ':nth-of-type',
              'nth-last-of-type': ':nth-last-of-type',
              'has': ':has',
              'not': ':not',

              // Pseudo-elements
              'before': '::before',
              'after': '::after',
              'first-letter': '::first-letter',
              'first-line': '::first-line',
              'marker': '::marker',
              'selection': '::selection',
              'file': '::file-selector-button',
              'backdrop': '::backdrop',
              'placeholder': '::placeholder',
              'target-text': '::target-text',
              'spelling-error': '::spelling-error',
              'grammar-error': '::grammar-error',

              // Media queries
              'dark': '.dark &',
              'light': '.light &',

              // Group variants
              'group': '.group &',
              'group-hover': '.group:hover &',
              'group-focus': '.group:focus &',
              'group-focus-within': '.group:focus-within &',
              'group-active': '.group:active &',
              'group-disabled': '.group:disabled &',
              'group-visited': '.group:visited &',
              'group-checked': '.group:checked &',
              'group-required': '.group:required &',
              'group-valid': '.group:valid &',
              'group-invalid': '.group:invalid &',
              'group-in-range': '.group:in-range &',
              'group-out-of-range': '.group:out-of-range &',
              'group-placeholder-shown': '.group:placeholder-shown &',
              'group-autofill': '.group:autofill &',
              'group-read-only': '.group:read-only &',
              'group-read-write': '.group:read-write &',
              'group-optional': '.group:optional &',
              'group-user-valid': '.group:user-valid &',
              'group-user-invalid': '.group:user-invalid &',

              // Peer variants
              'peer': '.peer ~ &',
              'peer-hover': '.peer:hover ~ &',
              'peer-focus': '.peer:focus ~ &',
              'peer-focus-within': '.peer:focus-within ~ &',
              'peer-active': '.peer:active ~ &',
              'peer-disabled': '.peer:disabled ~ &',
              'peer-visited': '.peer:visited ~ &',
              'peer-checked': '.peer:checked ~ &',
              'peer-required': '.peer:required ~ &',
              'peer-valid': '.peer:valid ~ &',
              'peer-invalid': '.peer:invalid ~ &',
              'peer-in-range': '.peer:in-range ~ &',
              'peer-out-of-range': '.peer:out-of-range ~ &',
              'peer-placeholder-shown': '.peer:placeholder-shown ~ &',
              'peer-autofill': '.peer:autofill ~ &',
              'peer-read-only': '.peer:read-only ~ &',
              'peer-read-write': '.peer:read-write ~ &',
              'peer-optional': '.peer:optional ~ &',
              'peer-user-valid': '.peer:user-valid ~ &',
              'peer-user-invalid': '.peer:user-invalid &',

              'motion-safe': '@media (prefers-reduced-motion: no-preference)',
              'motion-reduce': '@media (prefers-reduced-motion: reduce)',
              'print': '@media print',
              'portrait': '@media (orientation: portrait)',
              'landscape': '@media (orientation: landscape)',
              'contrast-more': '@media (prefers-contrast: more)',
              'contrast-less': '@media (prefers-contrast: less)',
              'forced-colors': '@media (forced-colors: active)',
              'rtl': '&:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *)',
              'ltr': '&:where(:dir(ltr), [dir="ltr"], [dir="ltr"] *)',
              '[dir=rtl]': '[dir="rtl"] &',
              '[dir=ltr]': '[dir="ltr"] &',
              'pointer-fine': '@media (pointer: fine)',
              'pointer-coarse': '@media (pointer: coarse)',
              'pointer-none': '@media (pointer: none)',
              'any-pointer-fine': '@media (any-pointer: fine)',
              'any-pointer-coarse': '@media (any-pointer: coarse)',
              'any-pointer-none': '@media (any-pointer: none)',
              'scripting-enabled': '@media (scripting: enabled)',
              'can-hover': '@media (hover: hover)',
              'can-not-hover': '@media (hover: none)',
              'any-hover': '@media (any-hover: hover)',
              'any-hover-none': '@media (any-hover: none)',
              'any-pointer': '@media (any-pointer: fine)',
              'any-pointer-coarse': '@media (any-pointer: coarse)',
              'any-pointer-none': '@media (any-pointer: none)',
              'color': '@media (color)',
              'color-gamut': '@media (color-gamut: srgb)',
              'color-gamut-p3': '@media (color-gamut: p3)',
              'color-gamut-rec2020': '@media (color-gamut: rec2020)',
              'monochrome': '@media (monochrome)',
              'monochrome-color': '@media (monochrome: 0)',
              'monochrome-grayscale': '@media (monochrome: 1)',
              'inverted-colors': '@media (inverted-colors: inverted)',
              'inverted-colors-none': '@media (inverted-colors: none)',
              'update': '@media (update: fast)',
              'update-slow': '@media (update: slow)',
              'update-none': '@media (update: none)',
              'overflow-block': '@media (overflow-block: scroll)',
              'overflow-block-paged': '@media (overflow-block: paged)',
              'overflow-inline': '@media (overflow-inline: scroll)',
              'overflow-inline-auto': '@media (overflow-inline: auto)',
              'prefers-color-scheme': '@media (prefers-color-scheme: dark)',
              'prefers-color-scheme-light': '@media (prefers-color-scheme: light)',
              'prefers-contrast': '@media (prefers-contrast: more)',
              'prefers-contrast-less': '@media (prefers-contrast: less)',
              'prefers-contrast-no-preference': '@media (prefers-contrast: no-preference)',
              'prefers-reduced-motion': '@media (prefers-reduced-motion: reduce)',
              'prefers-reduced-motion-no-preference': '@media (prefers-reduced-motion: no-preference)',
              'prefers-reduced-transparency': '@media (prefers-reduced-transparency: reduce)',
              'prefers-reduced-transparency-no-preference': '@media (prefers-reduced-transparency: no-preference)',
              'resolution': '@media (resolution: 1dppx)',
              'resolution-low': '@media (resolution: 1dppx)',
              'resolution-high': '@media (resolution: 2dppx)',
              'scan': '@media (scan: progressive)',
              'scan-interlace': '@media (scan: interlace)',
              'scripting': '@media (scripting: enabled)',
              'scripting-none': '@media (scripting: none)',
              'scripting-initial-only': '@media (scripting: initial-only)',

              // Container queries
              'container': '@container',
              'container-name': '@container',

              // Important modifier
              '!': '!important',

              // Responsive breakpoints
              'sm': '@media (min-width: 640px)',
              'md': '@media (min-width: 768px)',
              'lg': '@media (min-width: 1024px)',
              'xl': '@media (min-width: 1280px)',
              '2xl': '@media (min-width: 1536px)',

              // Supports queries
              'supports': '@supports',

              // Starting style
              'starting': '@starting-style',

              // Data attribute variants (common patterns)
              'data-open': '[data-state="open"] &',
              'data-closed': '[data-state="closed"] &',
              'data-checked': '[data-state="checked"] &',
              'data-unchecked': '[data-state="unchecked"] &',
              'data-on': '[data-state="on"] &',
              'data-off': '[data-state="off"] &',
              'data-visible': '[data-state="visible"] &',
              'data-hidden': '[data-state="hidden"] &',
              'data-disabled': '[data-disabled] &',
              'data-loading': '[data-loading] &',
              'data-error': '[data-error] &',
              'data-success': '[data-success] &',
              'data-warning': '[data-warning] &',
              'data-selected': '[data-selected] &',
              'data-highlighted': '[data-highlighted] &',
              'data-pressed': '[data-pressed] &',
              'data-expanded': '[data-expanded] &',
              'data-collapsed': '[data-collapsed] &',
              'data-active': '[data-active] &',
              'data-inactive': '[data-inactive] &',
              'data-valid': '[data-valid] &',
              'data-invalid': '[data-invalid] &',
              'data-required': '[data-required] &',
              'data-optional': '[data-optional] &',
              'data-readonly': '[data-readonly] &',
              'data-write': '[data-write] &',

              // Aria attribute variants (common patterns)
              'aria-expanded': '[aria-expanded="true"] &',
              'aria-collapsed': '[aria-expanded="false"] &',
              'aria-pressed': '[aria-pressed="true"] &',
              'aria-unpressed': '[aria-pressed="false"] &',
              'aria-checked': '[aria-checked="true"] &',
              'aria-unchecked': '[aria-checked="false"] &',
              'aria-selected': '[aria-selected="true"] &',
              'aria-unselected': '[aria-selected="false"] &',
              'aria-invalid': '[aria-invalid="true"] &',
              'aria-valid': '[aria-invalid="false"] &',
              'aria-required': '[aria-required="true"] &',
              'aria-optional': '[aria-required="false"] &',
              'aria-disabled': '[aria-disabled="true"] &',
              'aria-enabled': '[aria-disabled="false"] &',
              'aria-hidden': '[aria-hidden="true"] &',
              'aria-visible': '[aria-hidden="false"] &',
              'aria-busy': '[aria-busy="true"] &',
              'aria-available': '[aria-busy="false"] &',
              'aria-current': '[aria-current="true"] &',
              'aria-not-current': '[aria-current="false"] &',
              'aria-live': '[aria-live="polite"] &, [aria-live="assertive"] &',
              'aria-atomic': '[aria-atomic="true"] &',
              'aria-relevant': '[aria-relevant="additions"] &, [aria-relevant="removals"] &, [aria-relevant="text"] &, [aria-relevant="all"] &'
          };

          // Define variant groups that can be combined
          this.variantGroups = {
              'state': ['hover', 'focus', 'active', 'visited', 'target', 'open', 'closed', 'paused', 'playing', 'muted', 'unmuted', 'collapsed', 'expanded', 'unchecked', 'selected', 'unselected'],
              'child': ['first', 'last', 'only', 'odd', 'even'],
              'form': ['disabled', 'enabled', 'checked', 'indeterminate', 'required', 'valid', 'invalid'],
              'pseudo': ['before', 'after', 'first-letter', 'first-line', 'marker', 'selection', 'file', 'backdrop'],
              'media': ['dark', 'light', 'motion-safe', 'motion-reduce', 'print', 'portrait', 'landscape', 'rtl', 'ltr', 'can-hover', 'can-not-hover', 'any-hover', 'any-hover-none', 'color', 'monochrome', 'inverted-colors', 'inverted-colors-none', 'update', 'update-slow', 'update-none', 'overflow-block', 'overflow-block-paged', 'overflow-inline', 'overflow-inline-auto', 'prefers-color-scheme', 'prefers-color-scheme-light', 'prefers-contrast', 'prefers-contrast-less', 'prefers-contrast-no-preference', 'prefers-reduced-motion', 'prefers-reduced-motion-no-preference', 'prefers-reduced-transparency', 'prefers-reduced-transparency-no-preference', 'resolution', 'resolution-low', 'resolution-high', 'scan', 'scan-interlace', 'scripting', 'scripting-none', 'scripting-initial-only', 'forced-colors', 'contrast-more', 'contrast-less', 'pointer-fine', 'pointer-coarse', 'pointer-none', 'any-pointer-fine', 'any-pointer-coarse', 'any-pointer-none', 'scripting-enabled'],
              'responsive': ['sm', 'md', 'lg', 'xl', '2xl'],
              'group': ['group', 'group-hover', 'group-focus', 'group-active', 'group-disabled', 'group-checked', 'group-required', 'group-valid', 'group-invalid'],
              'peer': ['peer', 'peer-hover', 'peer-focus', 'peer-active', 'peer-disabled', 'peer-checked', 'peer-required', 'peer-valid', 'peer-invalid'],
              'data': ['data-open', 'data-closed', 'data-checked', 'data-unchecked', 'data-visible', 'data-hidden', 'data-disabled', 'data-loading', 'data-error', 'data-success', 'data-warning', 'data-selected', 'data-highlighted', 'data-pressed', 'data-expanded', 'data-collapsed', 'data-active', 'data-inactive', 'data-valid', 'data-invalid', 'data-required', 'data-optional', 'data-readonly', 'data-write'],
              'aria': ['aria-expanded', 'aria-collapsed', 'aria-pressed', 'aria-unpressed', 'aria-checked', 'aria-unchecked', 'aria-selected', 'aria-unselected', 'aria-invalid', 'aria-valid', 'aria-required', 'aria-optional', 'aria-disabled', 'aria-enabled', 'aria-hidden', 'aria-visible', 'aria-busy', 'aria-available', 'aria-current', 'aria-not-current', 'aria-live', 'aria-atomic', 'aria-relevant']
          };

          // Cache for parsed class names
          this.classCache = new Map();

          // Load cache and start processing
          this.loadAndApplyCache();

          // Listen for component loads
          this.setupComponentLoadListener();

          this.waitForTailwind().then(() => {
              this.startProcessing();
          });
      }

      // Public API for other plugins to configure behavior
      addIgnoredClassPattern(pattern) {
          if (pattern instanceof RegExp) {
              this.ignoredClassPatterns.push(pattern);
          } else if (typeof pattern === 'string') {
              this.ignoredClassPatterns.push(new RegExp(pattern));
          }
      }

      addIgnoredElementSelector(selector) {
          if (typeof selector === 'string') {
              this.ignoredElementSelectors.push(selector);
          }
      }

      addSignificantChangeSelector(selector) {
          if (typeof selector === 'string') {
              this.significantChangeSelectors.push(selector);
          }
      }

      // Allow plugins to trigger recompilation when needed
      triggerRecompilation(reason = 'manual') {
          this.compile();
      }

      setupComponentLoadListener() {
          // Use a single debounced handler for all component-related events
          const debouncedCompile = this.debounce(() => {
              if (!this.isCompiling) {
                  this.compile();
              }
          }, this.options.debounceTime);

          // Listen for custom event when components are loaded
          document.addEventListener('indux:component-loaded', (event) => {
              debouncedCompile();
          });

          // Listen for route changes but don't recompile unnecessarily
          document.addEventListener('indux:route-change', (event) => {
              // Only trigger compilation if we detect new dynamic classes
              // The existing MutationObserver will handle actual DOM changes
              if (this.hasScannedStatic) {
                  // Wait longer for route content to fully load before checking
                  setTimeout(() => {
                      const currentDynamicCount = this.dynamicClassCache.size;
                      const currentClassesHash = this.lastClassesHash;
                      
                      // Scan for new classes
                      this.getUsedClasses();
                      const newDynamicCount = this.dynamicClassCache.size;
                      const dynamicClasses = Array.from(this.dynamicClassCache);
                      const newClassesHash = dynamicClasses.sort().join(',');
                      
                      // Only compile if we found genuinely new classes, not just code processing artifacts
                      if (newDynamicCount > currentDynamicCount && newClassesHash !== currentClassesHash) {
                          const newClasses = dynamicClasses.filter(cls => 
                              // Filter out classes that are likely from code processing
                              !cls.includes('hljs') && 
                              !cls.startsWith('language-') && 
                              !cls.includes('copy') &&
                              !cls.includes('lines')
                          );
                          
                          if (newClasses.length > 0) {
                              debouncedCompile();
                          }
                      }
                  }, 300); // Longer delay to let code processing finish
              }
          });

          // Use a single MutationObserver for all DOM changes
          const observer = new MutationObserver((mutations) => {
              let shouldRecompile = false;

              for (const mutation of mutations) {
                  // Skip attribute changes that don't affect utilities
                  if (mutation.type === 'attributes') {
                      const attributeName = mutation.attributeName;
                      
                      // Skip ignored attributes (like id changes from router)
                      if (this.ignoredAttributes.includes(attributeName)) {
                          continue;
                      }
                      
                      // Only care about class attribute changes
                      if (attributeName !== 'class') {
                          continue;
                      }
                      
                      // If it's a class change, check if we have new classes that need utilities
                      const element = mutation.target;
                      if (element.nodeType === Node.ELEMENT_NODE) {
                          const currentClasses = Array.from(element.classList || []);
                          const newClasses = currentClasses.filter(cls => {
                              // Skip ignored patterns
                              if (this.ignoredClassPatterns.some(pattern => pattern.test(cls))) {
                                  return false;
                              }
                              
                              // Check if this class is new (not in our cache)
                              return !this.staticClassCache.has(cls) && !this.dynamicClassCache.has(cls);
                          });
                          
                          if (newClasses.length > 0) {
                              // Add new classes to dynamic cache
                              newClasses.forEach(cls => this.dynamicClassCache.add(cls));
                              shouldRecompile = true;
                              break;
                          }
                      }
                  }
                  else if (mutation.type === 'childList') {
                      for (const node of mutation.addedNodes) {
                          if (node.nodeType === Node.ELEMENT_NODE) {
                              // Skip ignored elements using configurable selectors
                              const isIgnoredElement = this.ignoredElementSelectors.some(selector => 
                                  node.tagName?.toLowerCase() === selector.toLowerCase() ||
                                  node.closest(selector)
                              );
                              
                              if (isIgnoredElement) {
                                  continue;
                              }

                              // Only recompile for significant changes using configurable selectors
                              const hasSignificantChange = this.significantChangeSelectors.some(selector => {
                                  try {
                                      return node.matches?.(selector) || node.querySelector?.(selector);
                                  } catch (e) {
                                      return false; // Invalid selector
                                  }
                              });

                              if (hasSignificantChange) {
                              shouldRecompile = true;
                              break;
                              }
                          }
                      }
                  }
                  if (shouldRecompile) break;
              }

              if (shouldRecompile) {
                  debouncedCompile();
              }
          });

          // Start observing the document with the configured parameters
          observer.observe(document.documentElement, {
              childList: true,
              subtree: true,
              attributes: true,
              attributeFilter: ['class'] // Only observe class changes
          });
      }

      // Debounce helper
      debounce(func, wait) {
          let timeout;
          return function executedFunction(...args) {
              const later = () => {
                  clearTimeout(timeout);
                  func(...args);
              };
              clearTimeout(timeout);
              timeout = setTimeout(later, wait);
          };
      }

      // Wait for Tailwind to be available
      async waitForTailwind() {
          // Check if Tailwind is already available
          if (this.isTailwindAvailable()) {
              return;
          }

          // Wait for Tailwind to be available
          return new Promise(resolve => {
              const checkInterval = setInterval(() => {
                  if (this.isTailwindAvailable()) {
                      clearInterval(checkInterval);
                      resolve();
                  }
              }, 50);

              // Also check on DOMContentLoaded
              document.addEventListener('DOMContentLoaded', () => {
                  if (this.isTailwindAvailable()) {
                      clearInterval(checkInterval);
                      resolve();
                  }
              });

              // Set a timeout to prevent infinite waiting
              setTimeout(() => {
                  clearInterval(checkInterval);
                  resolve();
              }, 5000);
          });
      }

      // Check if Tailwind is available
      isTailwindAvailable() {
          // Check for Tailwind in various ways
          return (
              // Check for Tailwind CSS file
              Array.from(document.styleSheets).some(sheet =>
                  sheet.href && (
                      sheet.href.includes('tailwind') ||
                      sheet.href.includes('tailwindcss')
                  )
              ) ||
              // Check for Tailwind classes in document
              document.querySelector('[class*="tailwind"]') ||
              // Check for Tailwind in window object
              window.tailwind ||
              // Check for Tailwind in document head
              document.head.innerHTML.includes('tailwind')
          );
      }

      loadAndApplyCache() {
          try {
              const cached = localStorage.getItem('tailwind-cache');
              if (cached) {
                  const parsed = JSON.parse(cached);
                  this.cache = new Map(Object.entries(parsed));

                  // Apply the most recent cached styles immediately
                  const mostRecentCache = Array.from(this.cache.entries())
                      .sort((a, b) => b[1].timestamp - a[1].timestamp)[0];

                  if (mostRecentCache) {
                      this.styleElement.textContent = mostRecentCache[1].css;
                      this.lastThemeHash = mostRecentCache[1].themeHash;
                  }
              }
          } catch (error) {
              console.warn('Failed to load cached styles:', error);
          }
      }

      async startProcessing() {
          try {

              // Start initial compilation immediately
              const initialCompilation = this.compile();

              // Set up observer while compilation is running
              this.observer = new MutationObserver((mutations) => {
                  const relevantMutations = mutations.filter(mutation => {
                      if (mutation.type === 'attributes' &&
                          mutation.attributeName === 'class') {
                          return true;
                      }
                      if (mutation.type === 'childList') {
                          return Array.from(mutation.addedNodes).some(node =>
                              node.nodeType === Node.ELEMENT_NODE);
                      }
                      return false;
                  });

                  if (relevantMutations.length === 0) return;

                  // Check if there are any new classes that need processing
                  const newClasses = this.getUsedClasses();
                  if (newClasses.classes.length === 0) return;

                  if (this.compileTimeout) {
                      clearTimeout(this.compileTimeout);
                  }
                  this.compileTimeout = setTimeout(() => {
                      if (!this.isCompiling) {
                          this.compile();
                      }
                  }, this.options.debounceTime);
              });

              // Start observing immediately
              this.observer.observe(document.documentElement, {
                  childList: true,
                  subtree: true,
                  attributes: true,
                  attributeFilter: ['class']
              });

              // Wait for initial compilation
              await initialCompilation;

              this.hasInitialized = true;
          } catch (error) {
              console.error('Error starting Tailwind compiler:', error);
          }
      }

      discoverCssFiles() {
          try {
              // Get all stylesheets from the document
              const stylesheets = Array.from(document.styleSheets);

              // Process each stylesheet
              for (const sheet of stylesheets) {
                  try {
                      // Only process local files (exclude CDNs and external resources)
                      if (sheet.href && 
                          sheet.href.startsWith(window.location.origin) &&
                          !sheet.href.includes('cdn.') &&
                          !sheet.href.includes('jsdelivr') &&
                          !sheet.href.includes('unpkg') &&
                          !sheet.href.includes('cdnjs')) {
                          this.cssFiles.add(sheet.href);
                      }

                      // Get all @import rules (only local ones)
                      const rules = Array.from(sheet.cssRules || []);
                      for (const rule of rules) {
                          if (rule.type === CSSRule.IMPORT_RULE &&
                              rule.href.startsWith(window.location.origin) &&
                              !rule.href.includes('cdn.')) {
                              this.cssFiles.add(rule.href);
                          }
                      }
                  } catch (e) {
                      // Skip stylesheets that can't be accessed due to CORS
                      console.warn('Skipped stylesheet due to CORS:', sheet.href || 'inline');
                  }
              }

              // Add any inline styles (exclude generated styles)
              const styleElements = document.querySelectorAll('style:not(#utility-styles)');
              for (const style of styleElements) {
                  if (style.textContent && style.textContent.trim()) {
                      const id = style.id || `inline-style-${Array.from(styleElements).indexOf(style)}`;
                      this.cssFiles.add('inline:' + id);
                  }
              }
          } catch (error) {
              console.warn('Error discovering CSS files:', error);
          }
      }

      loadPersistentCache() {
          try {
              const cached = localStorage.getItem('tailwind-cache');
              if (cached) {
                  const parsed = JSON.parse(cached);
                  this.cache = new Map(Object.entries(parsed));
              }
          } catch (error) {
              console.warn('Failed to load cached styles:', error);
          }
      }

      savePersistentCache() {
          try {
              const serialized = JSON.stringify(Object.fromEntries(this.cache));
              localStorage.setItem('tailwind-cache', serialized);
          } catch (error) {
              console.warn('Failed to save cached styles:', error);
          }
      }

      // Generate a hash of the theme variables to detect changes
      generateThemeHash(themeCss) {
          // Use encodeURIComponent to handle non-Latin1 characters safely
          return encodeURIComponent(themeCss).slice(0, 8); // Simple hash of theme content
      }

      // Clean up old cache entries
      cleanupCache() {
          const now = Date.now();
          const maxAge = this.options.maxCacheAge;
          const entriesToDelete = [];

          for (const [key, value] of this.cache.entries()) {
              if (value.timestamp && (now - value.timestamp > maxAge)) {
                  entriesToDelete.push(key);
              }
          }

          for (const key of entriesToDelete) {
              this.cache.delete(key);
          }

          if (entriesToDelete.length > 0) {
              this.savePersistentCache();
          }
      }

      // Scan static HTML files and components for classes
      async scanStaticClasses() {
          if (this.staticScanPromise) {
              return this.staticScanPromise;
          }

          this.staticScanPromise = (async () => {
              try {
                  const staticClasses = new Set();

                  // 1. Scan index.html content
                  const htmlContent = document.documentElement.outerHTML;
                  this.extractClassesFromHTML(htmlContent, staticClasses);

                  // 2. Scan component files from manifest
                  const registry = window.InduxComponentsRegistry;
                  const componentUrls = [];
                  
                  if (registry && registry.manifest) {
                      // Get all component paths from manifest
                      const allComponents = [
                          ...(registry.manifest.preloadedComponents || []),
                          ...(registry.manifest.components || [])
                      ];
                      componentUrls.push(...allComponents);
                  }

                  const componentPromises = componentUrls.map(async (url) => {
                      try {
                          const response = await fetch('/' + url);
                          if (response.ok) {
                              const html = await response.text();
                              this.extractClassesFromHTML(html, staticClasses);
                          }
                      } catch (error) {
                          // Silently ignore missing components
                      }
                  });

                  await Promise.all(componentPromises);

                  // Cache static classes
                  for (const cls of staticClasses) {
                      this.staticClassCache.add(cls);
                  }

                  this.hasScannedStatic = true;

                  return staticClasses;
              } catch (error) {
                  console.warn('[TailwindCompiler] Error scanning static classes:', error);
                  this.hasScannedStatic = true;
                  return new Set();
              }
          })();

          return this.staticScanPromise;
      }

      // Extract classes from HTML content
      extractClassesFromHTML(html, classSet) {

          // Match class attributes: class="..." or class='...'
          const classRegex = /class=["']([^"']+)["']/g;
          let match;
          
          while ((match = classRegex.exec(html)) !== null) {
              const classString = match[1];
              const classes = classString.split(/\s+/).filter(Boolean);
              for (const cls of classes) {
                  if (cls && !cls.startsWith('x-') && !cls.startsWith('$')) {
                      classSet.add(cls);
                  }
              }
          }

          // Also check for x-data and other Alpine directives that might contain classes
          const alpineRegex = /x-(?:data|bind:class|class)=["']([^"']+)["']/g;
          while ((match = alpineRegex.exec(html)) !== null) {
              // Simple extraction - could be enhanced for complex Alpine expressions
              const content = match[1];
              const classMatches = content.match(/['"`]([^'"`\s]+)['"`]/g);
              if (classMatches) {
                  for (const classMatch of classMatches) {
                      const cls = classMatch.replace(/['"`]/g, '');
                      if (cls && !cls.startsWith('$') && !cls.includes('(')) {
                          classSet.add(cls);
                      }
                  }
              }
          }
      }

      getUsedClasses() {
          try {
              const allClasses = new Set();
              const usedVariableSuffixes = new Set();

              // Add static classes (pre-scanned)
              for (const cls of this.staticClassCache) {
                  allClasses.add(cls);
              }

              // Scan current DOM for dynamic classes only
              const elements = document.getElementsByTagName('*');
              for (const element of elements) {
                  let classes = [];
                  if (typeof element.className === 'string') {
                      classes = element.className.split(/\s+/).filter(Boolean);
                  } else if (element.classList) {
                      classes = Array.from(element.classList);
                  }

                  for (const cls of classes) {
                      if (!cls) continue;

                      // Skip classes using configurable patterns
                      const isIgnoredClass = this.ignoredClassPatterns.some(pattern => 
                          pattern.test(cls)
                      );
                      
                      if (isIgnoredClass) {
                          continue;
                      }

                      // Add all classes (static + dynamic)
                      allClasses.add(cls);

                      // Track dynamic classes separately
                      if (!this.staticClassCache.has(cls)) {
                          this.dynamicClassCache.add(cls);
                      }
                  }
              }

              // Process all classes for variable suffixes
              for (const cls of allClasses) {
                      // Extract base class and variants
                      const parts = cls.split(':');
                      const baseClass = parts[parts.length - 1];

                      // Extract suffix for variable matching
                      const classParts = baseClass.split('-');
                      if (classParts.length > 1) {
                          let suffix = classParts.slice(1).join('-');

                          // Handle opacity modifiers (like /90, /50)
                          let baseSuffix = suffix;
                          if (suffix.includes('/')) {
                              const parts = suffix.split('/');
                              baseSuffix = parts[0];
                              const opacity = parts[1];

                              // Add both the base suffix and the full suffix with opacity
                              usedVariableSuffixes.add(baseSuffix);
                              usedVariableSuffixes.add(suffix); // Keep the full suffix with opacity
                          } else {
                              usedVariableSuffixes.add(suffix);
                          }

                          // For compound classes like text-content-subtle, also add the full suffix
                          // This handles cases where the variable is --color-content-subtle
                          if (classParts.length > 2) {
                              const fullSuffix = classParts.slice(1).join('-');
                              if (fullSuffix.includes('/')) {
                                  usedVariableSuffixes.add(fullSuffix.split('/')[0]);
                              } else {
                                  usedVariableSuffixes.add(fullSuffix);
                          }
                      }
                  }
              }

              return {
                  classes: Array.from(allClasses),
                  variableSuffixes: Array.from(usedVariableSuffixes)
              };
          } catch (error) {
              console.error('Error getting used classes:', error);
              return { classes: [], variableSuffixes: [] };
          }
      }

      async fetchThemeContent() {
          const themeContents = new Set();
          const fetchPromises = [];

          // If we haven't discovered CSS files yet, do it now
          if (this.cssFiles.size === 0) {
              this.discoverCssFiles();
          }

          // Process all files concurrently
          for (const source of this.cssFiles) {
              const fetchPromise = (async () => {
                  try {
                      let content = '';
                      let needsFetch = true;

                      if (source.startsWith('inline:')) {
                          const styleId = source.replace('inline:', '');
                          const styleElement = styleId ?
                              document.getElementById(styleId) :
                              document.querySelector('style');
                          if (styleElement) {
                              content = styleElement.textContent;
                          }
                          needsFetch = false;
                      } else {
                          // Smart caching: use session storage + timestamp approach
                          const cacheKey = source;
                          const cached = this.cssContentCache.get(cacheKey);
                          const now = Date.now();
                          
                          // For static compilation phase, cache for longer (30 seconds)
                          // For dynamic compilation phase, cache for shorter (5 seconds)
                          const cacheTime = this.hasScannedStatic ? 5000 : 30000;
                          
                          if (cached && (now - cached.timestamp) < cacheTime) {
                              content = cached.content;
                              needsFetch = false;
                          }

                          if (needsFetch) {
                              // Add timestamp for development cache busting, but keep it minimal
                              const timestamp = Math.floor(now / 1000); // Only changes every second
                              const url = `${source}?t=${timestamp}`;

                              const response = await fetch(url);

                          if (!response.ok) {
                              console.warn('Failed to fetch stylesheet:', url);
                              return;
                          }

                          content = await response.text();
                              
                              // Cache the content with timestamp
                              this.cssContentCache.set(cacheKey, {
                                  content: content,
                                  timestamp: now
                              });
                          }
                      }

                      if (content) {
                          themeContents.add(content);
                      }
                  } catch (error) {
                      console.warn(`Error fetching CSS from ${source}:`, error);
                  }
              })();
              fetchPromises.push(fetchPromise);
          }

          // Wait for all fetches to complete
          await Promise.all(fetchPromises);

          return Array.from(themeContents).join('\n');
      }

      async processThemeContent(content) {
          try {
              const variables = this.extractThemeVariables(content);
              if (variables.size === 0) {
                  return;
              }

              // Only log and process actual changes
              let hasChanges = false;
              for (const [name, value] of variables.entries()) {
                  const currentValue = this.currentThemeVars.get(name);
                  if (currentValue !== value) {
                      hasChanges = true;
                      this.currentThemeVars.set(name, value);
                  }
              }

              if (hasChanges) {
                  // Generate utilities for these variables
                  const utilities = this.generateUtilitiesFromVars(content, this.getUsedClasses());
                  if (!utilities) {
                      return;
                  }

                  // Update styles immediately with new utilities
                  const newStyles = `@layer utilities {\n${utilities}\n}`;
                  this.updateStyles(newStyles);
              }

          } catch (error) {
              console.warn('Error processing theme content:', error);
          }
      }

      updateStyles(newStyles) {
          if (!this.styleElement) {
              console.warn('No style element found');
              return;
          }

          this.styleElement.textContent = newStyles;
      }

      extractThemeVariables(cssText) {
          const variables = new Map();

          // Extract ALL CSS custom properties from ANY declaration block
          // This regex finds --variable-name: value; patterns anywhere in the CSS
          const varRegex = /--([\w-]+):\s*([^;]+);/g;

          let varMatch;
          while ((varMatch = varRegex.exec(cssText)) !== null) {
              const name = varMatch[1];
              const value = varMatch[2].trim();
              variables.set(name, value);
          }

          return variables;
      }

      extractCustomUtilities(cssText) {
          const utilities = new Map();

          // Extract custom utility classes from CSS
          // This regex finds .class-name { ... } patterns in @layer utilities or standalone
          const utilityRegex = /(?:@layer\s+utilities\s*{[^}]*}|^)(?:[^{}]*?)(?:^|\s)(\.[\w-]+)\s*{([^}]+)}/gm;

          let match;
          while ((match = utilityRegex.exec(cssText)) !== null) {
              const className = match[1].substring(1); // Remove the leading dot
              const cssRules = match[2].trim();
              
              // Skip if it's a Tailwind-generated class (starts with common prefixes)
              if (this.isTailwindGeneratedClass(className)) {
                  continue;
              }

              // Store the utility class and its CSS (combine if already exists)
              if (utilities.has(className)) {
                  const existingRules = utilities.get(className);
                  utilities.set(className, `${existingRules}; ${cssRules}`);
              } else {
                  utilities.set(className, cssRules);
              }
          }

          // Also look for :where() selectors which are common in Indux utilities
          // Handle both single class and multiple class selectors
          const whereRegex = /:where\(([^)]+)\)\s*{([^}]+)}/g;
          while ((match = whereRegex.exec(cssText)) !== null) {
              const selectorContent = match[1];
              const cssRules = match[2].trim();
              
              // Extract individual class names from the selector
              const classMatches = selectorContent.match(/\.([\w-]+)/g);
              if (classMatches) {
                  for (const classMatch of classMatches) {
                      const className = classMatch.substring(1); // Remove the leading dot
                      
                      if (!this.isTailwindGeneratedClass(className)) {
                          // Combine CSS rules if the class already exists
                          if (utilities.has(className)) {
                              const existingRules = utilities.get(className);
                              utilities.set(className, `${existingRules}; ${cssRules}`);
                          } else {
                              utilities.set(className, cssRules);
                          }
                      }
                  }
              }
          }

          return utilities;
      }

      isTailwindGeneratedClass(className) {
          // Check if this looks like a Tailwind-generated class
          const tailwindPatterns = [
              /^[a-z]+-\d+$/, // spacing, sizing classes like p-4, w-10
              /^[a-z]+-\[/, // arbitrary values like w-[100px]
              /^(text|bg|border|ring|shadow|opacity|scale|rotate|translate|skew|origin|transform|transition|duration|delay|ease|animate|backdrop|blur|brightness|contrast|drop-shadow|grayscale|hue-rotate|invert|saturate|sepia|filter|backdrop-)/, // common Tailwind prefixes
              /^(sm|md|lg|xl|2xl):/, // responsive prefixes
              /^(hover|focus|active|disabled|group-hover|group-focus|peer-hover|peer-focus):/, // state prefixes
              /^(dark|light):/, // theme prefixes
              /^!/, // important modifier
              /^\[/, // arbitrary selectors
          ];

          return tailwindPatterns.some(pattern => pattern.test(className));
      }

      parseClassName(className) {
          // Check cache first
          if (this.classCache.has(className)) {
              return this.classCache.get(className);
          }

          const result = {
              important: className.startsWith('!'),
              variants: [],
              baseClass: className
          };

          // Remove important modifier if present
          if (result.important) {
              className = className.slice(1);
          }

          // Split by variant separator, but preserve content within brackets
          const parts = [];
          let current = '';
          let bracketDepth = 0;
          
          for (let i = 0; i < className.length; i++) {
              const char = className[i];
              
              if (char === '[') {
                  bracketDepth++;
              } else if (char === ']') {
                  bracketDepth--;
              }
              
              if (char === ':' && bracketDepth === 0) {
                  // This is a variant separator, not part of a bracket expression
                  parts.push(current);
                  current = '';
              } else {
                  current += char;
              }
          }
          parts.push(current); // Add the last part
          
          result.baseClass = parts.pop(); // Last part is always the base class

          // Process variants in order (left to right)
          result.variants = parts.map(variant => {
              // Check for arbitrary selector variants [&_selector]
              if (variant.startsWith('[') && variant.endsWith(']')) {
                  const arbitrarySelector = variant.slice(1, -1); // Remove brackets
                  if (arbitrarySelector.startsWith('&')) {
                      return {
                          name: variant,
                          selector: arbitrarySelector,
                          isArbitrary: true
                      };
                  }
              }
              
              const selector = this.variants[variant];
              if (!selector) {
                  console.warn(`Unknown variant: ${variant}`);
                  return null;
              }
              return {
                  name: variant,
                  selector: selector,
                  isArbitrary: false
              };
          }).filter(Boolean);

          // Cache the result
          this.classCache.set(className, result);
          return result;
      }

      generateCustomUtilities(usedData) {
          try {
              const utilities = [];
              const generatedRules = new Set();
              const { classes: usedClasses } = usedData;


              if (this.customUtilities.size === 0) {
                  return '';
              }

              // Helper to escape special characters in class names
              const escapeClassName = (className) => {
                  return className.replace(/[^a-zA-Z0-9-]/g, '\\$&');
              };

              // Helper to generate a single utility with its variants
              const generateUtility = (baseClass, css) => {
                  // Find all variants of this base class that are actually used
                  const usedVariants = usedClasses
                      .filter(cls => {
                          const parts = cls.split(':');
                          const basePart = parts[parts.length - 1];
                          const isMatch = basePart === baseClass || (basePart.startsWith('!') && basePart.slice(1) === baseClass);
                          return isMatch;
                      });

                  // Skip generating base utility - it already exists in the CSS
                  // Only generate variants and important versions
                  
                  // Generate important version if used
                  if (usedClasses.includes('!' + baseClass)) {
                      const importantCss = css.includes(';') ? 
                          css.replace(/;/g, ' !important;') : 
                          css + ' !important';
                      const rule = `.${escapeClassName('!' + baseClass)} { ${importantCss} }`;
                      if (!generatedRules.has(rule)) {
                          utilities.push(rule);
                          generatedRules.add(rule);
                      }
                  }

                  // Generate each variant as a separate class
                  for (const variantClass of usedVariants) {
                      if (variantClass === baseClass) continue;

                      const parsed = this.parseClassName(variantClass);

                      // Check if this is an important variant
                      const isImportant = parsed.important;
                      const cssContent = isImportant ? 
                          (css.includes(';') ? css.replace(/;/g, ' !important;') : css + ' !important') : 
                          css;

                      // Build selector by applying variants
                      let selector = `.${escapeClassName(variantClass)}`;
                      let hasMediaQuery = false;
                      let mediaQueryRule = '';

                      for (const variant of parsed.variants) {
                          if (variant.isArbitrary) {
                              // Handle arbitrary selectors like [&_figure] or [&_fieldset:has(legend):not(.whatever)]
                              let arbitrarySelector = variant.selector;
                              
                              // Replace underscores with spaces, but preserve them inside parentheses
                              arbitrarySelector = arbitrarySelector.replace(/_/g, ' ');
                              
                              selector = { baseClass: selector, arbitrarySelector };
                          } else if (variant.selector.startsWith(':')) {
                              // For pseudo-classes, append to selector
                              selector = `${selector}${variant.selector}`;
                          } else if (variant.selector.startsWith('@')) {
                              // For media queries, wrap the whole rule
                              hasMediaQuery = true;
                              mediaQueryRule = variant.selector;
                          } else if (variant.selector.includes('&')) {
                              // For contextual selectors (like dark mode)
                              selector = variant.selector.replace('&', selector);
                          }
                      }

                      // Generate the final rule
                      let rule;
                      if (typeof selector === 'object' && selector.arbitrarySelector) {
                          // Handle arbitrary selectors with nested CSS
                          rule = `${selector.baseClass} {\n    ${selector.arbitrarySelector} {\n        ${cssContent}\n    }\n}`;
                      } else {
                          // Regular selector
                          rule = `${selector} { ${cssContent} }`;
                      }
                      
                      const finalRule = hasMediaQuery ? 
                          `${mediaQueryRule} { ${rule} }` : 
                          rule;


                      if (!generatedRules.has(finalRule)) {
                          utilities.push(finalRule);
                          generatedRules.add(finalRule);
                      }
                  }
              };

              // Generate utilities for each custom class that's actually used
              for (const [className, css] of this.customUtilities.entries()) {
                  // Check if this specific utility class is actually used (including variants and important)
                  const isUsed = usedClasses.some(cls => {
                      // Parse the class to extract the base utility name
                      const parsed = this.parseClassName(cls);
                      const baseClass = parsed.baseClass;
                      
                      // Check both normal and important versions
                      return baseClass === className || 
                             baseClass === '!' + className ||
                             (baseClass.startsWith('!') && baseClass.slice(1) === className);
                  });

                  if (isUsed) {
                      generateUtility(className, css);
                  }
              }

              return utilities.join('\n');
          } catch (error) {
              console.error('Error generating custom utilities:', error);
              return '';
          }
      }

      generateUtilitiesFromVars(cssText, usedData) {
          try {
              const utilities = [];
              const generatedRules = new Set(); // Track generated rules to prevent duplicates
              const variables = this.extractThemeVariables(cssText);
              const { classes: usedClasses, variableSuffixes } = usedData;

              if (variables.size === 0) {
                  return '';
              }

              // Helper to escape special characters in class names
              const escapeClassName = (className) => {
                  return className.replace(/[^a-zA-Z0-9-]/g, '\\$&');
              };

              // Helper to generate a single utility with its variants
              const generateUtility = (baseClass, css) => {
                  // Find all variants of this base class that are actually used
                  const usedVariants = usedClasses
                      .filter(cls => {
                          const parts = cls.split(':');
                          const basePart = parts[parts.length - 1];
                          return basePart === baseClass || (basePart.startsWith('!') && basePart.slice(1) === baseClass);
                      });

                  // Generate base utility if it's used directly
                  if (usedClasses.includes(baseClass)) {
                      const rule = `.${escapeClassName(baseClass)} { ${css} }`;
                      if (!generatedRules.has(rule)) {
                          utilities.push(rule);
                          generatedRules.add(rule);
                      }
                  }
                  // Generate important version if used
                  if (usedClasses.includes('!' + baseClass)) {
                      const importantCss = css.includes(';') ? 
                          css.replace(/;/g, ' !important;') : 
                          css + ' !important';
                      const rule = `.${escapeClassName('!' + baseClass)} { ${importantCss} }`;
                      if (!generatedRules.has(rule)) {
                          utilities.push(rule);
                          generatedRules.add(rule);
                      }
                  }

                  // Generate each variant as a separate class
                  for (const variantClass of usedVariants) {
                      if (variantClass === baseClass) continue;

                      const parsed = this.parseClassName(variantClass);

                      // Check if this is an important variant
                      const isImportant = parsed.important;
                      const cssContent = isImportant ? 
                          (css.includes(';') ? css.replace(/;/g, ' !important;') : css + ' !important') : 
                          css;

                      // Build selector by applying variants
                          let selector = `.${escapeClassName(variantClass)}`;
                      let hasMediaQuery = false;
                      let mediaQueryRule = '';

                      for (const variant of parsed.variants) {
                          if (variant.isArbitrary) {
                              // Handle arbitrary selectors like [&_figure] or [&_fieldset:has(legend):not(.whatever)]
                              // Convert underscores to spaces, but be careful with complex selectors
                              let arbitrarySelector = variant.selector;
                              
                              // Replace underscores with spaces, but preserve them inside parentheses
                              // This handles cases like :not(.whatever,_else) where the underscore should become a space
                              arbitrarySelector = arbitrarySelector.replace(/_/g, ' ');
                              
                              // We'll handle this in the CSS generation - store for later use
                              selector = { baseClass: selector, arbitrarySelector };
                          } else if (variant.selector.startsWith(':')) {
                              // For pseudo-classes, append to selector
                              selector = `${selector}${variant.selector}`;
                          } else if (variant.selector.startsWith('@')) {
                              // For media queries, wrap the whole rule
                              hasMediaQuery = true;
                              mediaQueryRule = variant.selector;
                          } else if (variant.selector.includes('&')) {
                              // For contextual selectors (like dark mode)
                              selector = variant.selector.replace('&', selector);
                          }
                      }

                      // Generate the final rule
                      let rule;
                      if (typeof selector === 'object' && selector.arbitrarySelector) {
                          // Handle arbitrary selectors with nested CSS
                          rule = `${selector.baseClass} {\n    ${selector.arbitrarySelector} {\n        ${cssContent}\n    }\n}`;
                      } else {
                          // Regular selector
                          rule = `${selector} { ${cssContent} }`;
                      }
                      
                      const finalRule = hasMediaQuery ? 
                          `${mediaQueryRule} { ${rule} }` : 
                          rule;

                          if (!generatedRules.has(finalRule)) {
                              utilities.push(finalRule);
                              generatedRules.add(finalRule);
                      }
                  }
              };

              // Generate utilities based on variable prefix
              for (const [varName, varValue] of variables.entries()) {
                  if (!varName.match(this.regexPatterns.tailwindPrefix)) {
                      continue;
                  }

                  const suffix = varName.split('-').slice(1).join('-');
                  const value = `var(--${varName})`;
                  const prefix = varName.split('-')[0] + '-';
                  const generator = this.utilityGenerators[prefix];

                  if (generator) {
                      const utilityPairs = generator(suffix, value);
                      for (const [className, css] of utilityPairs) {
                          // Check if this specific utility class is actually used (including variants and important)
                          const isUsed = usedClasses.some(cls => {
                              // Parse the class to extract the base utility name
                              const parsed = this.parseClassName(cls);
                              const baseClass = parsed.baseClass;
                              
                              // Check both normal and important versions
                              return baseClass === className || 
                                     baseClass === '!' + className ||
                                     (baseClass.startsWith('!') && baseClass.slice(1) === className);
                          });
                          if (isUsed) {
                              generateUtility(className, css);
                          }

                          // Check for opacity variants of this utility
                          const opacityVariants = usedClasses.filter(cls => {
                              // Parse the class to extract the base utility name
                              const parsed = this.parseClassName(cls);
                              const baseClass = parsed.baseClass;
                              
                              // Check if this class has an opacity modifier and matches our base class
                              if (baseClass.includes('/')) {
                                  const baseWithoutOpacity = baseClass.split('/')[0];
                                  if (baseWithoutOpacity === className) {
                                      const opacity = baseClass.split('/')[1];
                                      // Validate that the opacity is a number between 0-100
                                      return !isNaN(opacity) && opacity >= 0 && opacity <= 100;
                                  }
                              }
                              return false;
                          });

                          // Generate opacity utilities for each variant found
                          for (const variant of opacityVariants) {
                              const opacity = variant.split('/')[1];
                              const opacityValue = `color-mix(in oklch, ${value} ${opacity}%, transparent)`;
                              const opacityCss = css.replace(value, opacityValue);
                              generateUtility(variant, opacityCss);
                          }
                      }
                  }
              }

              return utilities.join('\n');
          } catch (error) {
              console.error('Error generating utilities:', error);
              return '';
          }
      }

      async compile() {
          try {
              // Prevent too frequent compilations
              const now = Date.now();
              if (now - this.lastCompileTime < this.minCompileInterval) {
                  return;
              }
              this.lastCompileTime = now;

              if (this.isCompiling) {
                  return;
              }
              this.isCompiling = true;

              // On first run, scan static classes and CSS variables
              if (!this.hasScannedStatic) {
                  await this.scanStaticClasses();
                  
                  // Fetch CSS content once for initial compilation
                  const themeCss = await this.fetchThemeContent();
                  if (themeCss) {
                      // Extract and cache custom utilities
                  const discoveredCustomUtilities = this.extractCustomUtilities(themeCss);
                      for (const [name, value] of discoveredCustomUtilities.entries()) {
                          this.customUtilities.set(name, value);
                      }

                      const variables = this.extractThemeVariables(themeCss);
                      for (const [name, value] of variables.entries()) {
                          this.currentThemeVars.set(name, value);
                      }
                      
                      // Generate utilities for all static classes
                      const staticUsedData = {
                          classes: Array.from(this.staticClassCache),
                          variableSuffixes: []
                      };
                      // Process static classes for variable suffixes
                      for (const cls of this.staticClassCache) {
                          const parts = cls.split(':');
                          const baseClass = parts[parts.length - 1];
                          const classParts = baseClass.split('-');
                          if (classParts.length > 1) {
                              staticUsedData.variableSuffixes.push(classParts.slice(1).join('-'));
                          }
                      }
                      
                      // Generate both variable-based and custom utilities
                      const varUtilities = this.generateUtilitiesFromVars(themeCss, staticUsedData);
                      const customUtilitiesGenerated = this.generateCustomUtilities(staticUsedData);
                      
                      const allUtilities = [varUtilities, customUtilitiesGenerated].filter(Boolean).join('\n\n');
                      if (allUtilities) {
                          const finalCss = `@layer utilities {\n${allUtilities}\n}`;
                          this.styleElement.textContent = finalCss;
                          this.lastClassesHash = staticUsedData.classes.sort().join(',');
                      }
                  }
                  
                  this.hasInitialized = true;
                  this.isCompiling = false;
                  return;
              }

              // For subsequent compilations, check for new dynamic classes
              const usedData = this.getUsedClasses();
              const dynamicClasses = Array.from(this.dynamicClassCache);
              
              // Create a hash of current dynamic classes to detect changes
              const dynamicClassesHash = dynamicClasses.sort().join(',');
              
              // Check if dynamic classes have actually changed
              if (dynamicClassesHash !== this.lastClassesHash || !this.hasInitialized) {
                  // Fetch CSS content for dynamic compilation
                  const themeCss = await this.fetchThemeContent();
                  if (!themeCss) {
                      this.isCompiling = false;
                      return;
                  }

                  // Update custom utilities cache if needed
                  const discoveredCustomUtilities = this.extractCustomUtilities(themeCss);
                  for (const [name, value] of discoveredCustomUtilities.entries()) {
                      this.customUtilities.set(name, value);
                  }

                  // Check for variable changes
                  const variables = this.extractThemeVariables(themeCss);
                  let hasVariableChanges = false;
                  for (const [name, value] of variables.entries()) {
                      const currentValue = this.currentThemeVars.get(name);
                      if (currentValue !== value) {
                          hasVariableChanges = true;
                          this.currentThemeVars.set(name, value);
                      }
                  }

                  // Generate utilities for all classes (static + dynamic) if needed
                  if (hasVariableChanges || dynamicClassesHash !== this.lastClassesHash) {
                      
                      // Generate both variable-based and custom utilities
                      const varUtilities = this.generateUtilitiesFromVars(themeCss, usedData);
                      const customUtilitiesGenerated = this.generateCustomUtilities(usedData);
                      
                      
                      const allUtilities = [varUtilities, customUtilitiesGenerated].filter(Boolean).join('\n\n');
                      if (allUtilities) {
                          const finalCss = `@layer utilities {\n${allUtilities}\n}`;
                          this.styleElement.textContent = finalCss;
                          this.lastClassesHash = dynamicClassesHash;
                      }
                  }
              }

          } catch (error) {
              console.error('Error compiling Tailwind CSS:', error);
          } finally {
              this.isCompiling = false;
          }
      }
  }

  // Initialize immediately without waiting for DOMContentLoaded
  const compiler = new TailwindCompiler();

  // Expose utilities compiler for optional integration
  window.InduxUtilities = compiler;

  // Also handle DOMContentLoaded for any elements that might be added later
  document.addEventListener('DOMContentLoaded', () => {
      if (!compiler.isCompiling) {
          compiler.compile();
      }
  });

  var indux_components = {};

  /* Indux Components */

  var hasRequiredIndux_components;

  function requireIndux_components () {
  	if (hasRequiredIndux_components) return indux_components;
  	hasRequiredIndux_components = 1;
  	// Components registry
  	window.InduxComponentsRegistry = {
  	    manifest: null,
  	    registered: new Set(),
  	    preloaded: [],
  	    initialize() {
  	        // Load manifest.json synchronously
  	        try {
  	            const req = new XMLHttpRequest();
  	            req.open('GET', '/manifest.json?t=' + Date.now(), false);
  	            req.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  	            req.setRequestHeader('Pragma', 'no-cache');
  	            req.setRequestHeader('Expires', '0');
  	            req.send(null);
  	            if (req.status === 200) {
  	                this.manifest = JSON.parse(req.responseText);
  	                // Register all components from manifest
  	                const allComponents = [
  	                    ...(this.manifest?.preloadedComponents || []),
  	                    ...(this.manifest?.components || [])
  	                ];
  	                allComponents.forEach(path => {
  	                    const name = path.split('/').pop().replace('.html', '');
  	                    this.registered.add(name);
  	                });
  	                this.preloaded = (this.manifest?.preloadedComponents || []).map(path => path.split('/').pop().replace('.html', ''));
  	            } else {
  	                console.warn('[Indux] Failed to load manifest.json (HTTP', req.status + ')');
  	            }
  	        } catch (e) {
  	            console.warn('[Indux] Failed to load manifest.json:', e.message);
  	        }
  	    }
  	}; 

  	// Components loader
  	window.InduxComponentsLoader = {
  	    cache: {},
  	    initialize() {
  	        this.cache = {};
  	        // Preload components listed in registry.preloaded
  	        const registry = window.InduxComponentsRegistry;
  	        if (registry && Array.isArray(registry.preloaded)) {
  	            registry.preloaded.forEach(name => {
  	                this.loadComponent(name).then(() => {
  	                    // Preloaded component
  	                });
  	            });
  	        }
  	    },
  	    async loadComponent(name) {
  	        if (this.cache[name]) {
  	            return this.cache[name];
  	        }
  	        const registry = window.InduxComponentsRegistry;
  	        if (!registry || !registry.manifest) {
  	            console.warn('[Indux] Manifest not loaded, cannot load component:', name);
  	            return null;
  	        }
  	        const path = (registry.manifest.preloadedComponents || []).concat(registry.manifest.components || [])
  	            .find(p => p.split('/').pop().replace('.html', '') === name);
  	        if (!path) {
  	            console.warn('[Indux] Component', name, 'not found in manifest.');
  	            return null;
  	        }
  	        try {
  	            const response = await fetch('/' + path);
  	            if (!response.ok) {
  	                console.warn('[Indux] HTML file not found for component', name, 'at path:', path, '(HTTP', response.status + ')');
  	                return null;
  	            }
  	            const content = await response.text();
  	            this.cache[name] = content;
  	            return content;
  	        } catch (error) {
  	            console.warn('[Indux] Failed to load component', name, 'from', path + ':', error.message);
  	            return null;
  	        }
  	    }
  	}; 

  	// Components processor
  	window.InduxComponentsProcessor = {
  	    async processComponent(element, instanceId) {
  	        const name = element.tagName.toLowerCase().replace('x-', '');
  	        const registry = window.InduxComponentsRegistry;
  	        const loader = window.InduxComponentsLoader;
  	        if (!registry || !loader) {
  	            return;
  	        }
  	        if (!registry.registered.has(name)) {
  	            return;
  	        }
  	        if (element.hasAttribute('data-pre-rendered') || element.hasAttribute('data-processed')) {
  	            return;
  	        }
  	        const content = await loader.loadComponent(name);
  	        if (!content) {
  	            element.replaceWith(document.createComment(` Failed to load component: ${name} `));
  	            return;
  	        }
  	        const container = document.createElement('div');
  	        container.innerHTML = content.trim();
  	        const topLevelElements = Array.from(container.children);
  	        if (topLevelElements.length === 0) {
  	            element.replaceWith(document.createComment(` Empty component: ${name} `));
  	            return;
  	        }

  	        // Extract and prepare scripts for execution
  	        const scripts = [];
  	        const processScripts = (el) => {
  	            if (el.tagName.toLowerCase() === 'script') {
  	                scripts.push({
  	                    content: el.textContent,
  	                    type: el.getAttribute('type') || 'text/javascript',
  	                    src: el.getAttribute('src'),
  	                    async: el.hasAttribute('async'),
  	                    defer: el.hasAttribute('defer')
  	                });
  	                // Remove script from DOM to avoid duplication
  	                el.remove();
  	            } else {
  	                Array.from(el.children).forEach(processScripts);
  	            }
  	        };
  	        topLevelElements.forEach(processScripts);
  	        // Collect properties from placeholder attributes
  	        const props = {};
  	        Array.from(element.attributes).forEach(attr => {
  	            if (attr.name !== name && attr.name !== 'class' && !attr.name.startsWith('data-')) {
  	                // Store both original case and lowercase for flexibility
  	                props[attr.name] = attr.value;
  	                props[attr.name.toLowerCase()] = attr.value;
  	            }
  	        });
  	        // Process $modify usage in all elements
  	        const processElementProps = (el) => {
  	            Array.from(el.attributes).forEach(attr => {
  	                const value = attr.value.trim();
  	                if (value.includes('$modify(')) {
  	                    const propMatch = value.match(/\$modify\(['"]([^'"]+)['"]\)/);
  	                    if (propMatch) {
  	                        const propName = propMatch[1].toLowerCase();
  	                        const propValue = props[propName] || '';
  	                        if (attr.name === 'class') {
  	                            const existingClasses = el.getAttribute('class') || '';
  	                            const newClasses = existingClasses
  	                                .replace(new RegExp(`\$modify\(['"]${propName}['"]\)`, 'i'), propValue)
  	                                .split(' ')
  	                                .filter(Boolean)
  	                                .join(' ');
  	                            el.setAttribute('class', newClasses);
  	                        } else if (attr.name === 'x-icon') {
  	                            // x-icon should get the raw value, not wrapped for Alpine evaluation
  	                            el.setAttribute(attr.name, propValue);
  	                        } else if (attr.name === 'x-show' || attr.name === 'x-if') {
  	                            // x-show and x-if expect boolean expressions, convert string to boolean check
  	                            if (value !== `$modify('${propName}')`) {
  	                                const newValue = value.replace(
  	                                    /\$modify\(['"]([^'"]+)['"]\)/g,
  	                                    (_, name) => {
  	                                        const val = props[name.toLowerCase()] || '';
  	                                        // Convert to boolean check - true if value exists and is not empty
  	                                        return val ? 'true' : 'false';
  	                                    }
  	                                );
  	                                el.setAttribute(attr.name, newValue);
  	                            } else {
  	                                // Simple replacement - check if prop exists and is not empty
  	                                const booleanValue = propValue && propValue.trim() !== '' ? 'true' : 'false';
  	                                el.setAttribute(attr.name, booleanValue);
  	                            }
  	                        } else if (
  	                            attr.name.startsWith('x-') ||
  	                            attr.name.startsWith(':') ||
  	                            attr.name.startsWith('@') ||
  	                            attr.name.startsWith('x-bind:') ||
  	                            attr.name.startsWith('x-on:')
  	                        ) {
  	                            // For Alpine directives, properly quote string values
  	                            if (value !== `$modify('${propName}')`) {
  	                                // Handle mixed content with multiple $modify() calls
  	                                const newValue = value.replace(
  	                                    /\$modify\(['"]([^'"]+)['"]\)/g,
  	                                    (_, name) => {
  	                                        const val = props[name.toLowerCase()] || '';
  	                                        // For expressions with fallbacks (||), use null for empty/whitespace values
  	                                        if (!val || val.trim() === '' || /^[\r\n\t\s]+$/.test(val)) {
  	                                            return value.includes('||') ? 'null' : "''";
  	                                        }
  	                                        // If value starts with $, it's an Alpine expression - don't quote
  	                                        if (val.startsWith('$')) {
  	                                            return val;
  	                                        }
  	                                        // Always quote string values to ensure they're treated as strings, not variables
  	                                        return `'${val.replace(/'/g, "\\'").replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\t/g, '\\t')}'`;
  	                                    }
  	                                );
  	                                el.setAttribute(attr.name, newValue);
  	                            } else {
  	                                // Simple $modify() replacement
  	                                if (!propValue || propValue.trim() === '' || /^[\r\n\t\s]+$/.test(propValue)) {
  	                                    // For empty/whitespace values, remove the attribute
  	                                    el.removeAttribute(attr.name);
  	                                } else {
  	                                    // If value starts with $, it's an Alpine expression - don't quote
  	                                    if (propValue.startsWith('$')) {
  	                                        el.setAttribute(attr.name, propValue);
  	                                    } else {
  	                                        // Always quote string values and escape special characters
  	                                        const quotedValue = `'${propValue.replace(/'/g, "\\'").replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\t/g, '\\t')}'`;
  	                                        el.setAttribute(attr.name, quotedValue);
  	                                    }
  	                                }
  	                            }
  	                        } else {
  	                            el.setAttribute(attr.name, propValue);
  	                        }
  	                    }
  	                }
  	            });
  	            Array.from(el.children).forEach(processElementProps);
  	        };
  	        topLevelElements.forEach(processElementProps);
  	        // Apply attributes from placeholder to root elements
  	        topLevelElements.forEach(rootElement => {
  	            Array.from(element.attributes).forEach(attr => {
  	                if (attr.name === 'class') {
  	                    const existingClass = rootElement.getAttribute('class') || '';
  	                    const newClasses = `${existingClass} ${attr.value}`.trim();
  	                    rootElement.setAttribute('class', newClasses);
  	                } else if (attr.name.startsWith('x-') || attr.name.startsWith(':') || attr.name.startsWith('@')) {
  	                    rootElement.setAttribute(attr.name, attr.value);
  	                } else if (attr.name !== name && !attr.name.startsWith('data-')) {
  	                    rootElement.setAttribute(attr.name, attr.value);
  	                }
  	                // Preserve important data attributes including data-order
  	                else if (attr.name === 'data-order' || attr.name === 'x-route' || attr.name === 'data-head') {
  	                    rootElement.setAttribute(attr.name, attr.value);
  	                }
  	            });
  	            // Set data-component=instanceId if provided
  	            if (instanceId) {
  	                rootElement.setAttribute('data-component', instanceId);
  	            }
  	        });
  	        // After rendering, copy all attributes from the original placeholder to the first top-level element
  	        if (topLevelElements.length > 0) {
  	            const firstRoot = topLevelElements[0];
  	            Array.from(element.attributes).forEach(attr => {
  	                // Preserve important attributes including data-order, x-route, and other routing/data attributes
  	                const preserveAttributes = [
  	                    'data-order', 'x-route', 'data-component', 'data-head',
  	                    'x-route-*', 'data-route-*', 'x-tabpanel'
  	                ];
  	                const shouldPreserve = preserveAttributes.some(preserveAttr =>
  	                    attr.name === preserveAttr || attr.name.startsWith(preserveAttr.replace('*', ''))
  	                );

  	                if (!['data-original-placeholder', 'data-pre-rendered', 'data-processed'].includes(attr.name) || shouldPreserve) {
  	                    firstRoot.setAttribute(attr.name, attr.value);
  	                }
  	            });
  	        }
  	        const parent = element.parentElement;
  	        if (!parent || !document.contains(element)) {
  	            return;
  	        }
  	        // Replace the placeholder element with the component content
  	        const fragment = document.createDocumentFragment();
  	        topLevelElements.forEach(el => fragment.appendChild(el));
  	        parent.replaceChild(fragment, element);

  	        // Execute scripts after component is rendered
  	        if (scripts.length > 0) {
  	            // Use a small delay to ensure DOM is updated
  	            setTimeout(() => {
  	                scripts.forEach(script => {
  	                    if (script.src) {
  	                        // External script - create and append to head
  	                        const scriptEl = document.createElement('script');
  	                        scriptEl.src = script.src;
  	                        scriptEl.type = script.type;
  	                        if (script.async) scriptEl.async = true;
  	                        if (script.defer) scriptEl.defer = true;
  	                        document.head.appendChild(scriptEl);
  	                    } else if (script.content) {
  	                        // Inline script - execute directly
  	                        try {
  	                            // Create a function to execute the script in the global scope
  	                            const executeScript = new Function(script.content);
  	                            executeScript();
  	                        } catch (error) {
  	                            console.error(`[Indux] Error executing script in component ${name}:`, error);
  	                        }
  	                    }
  	                });
  	            }, 0);
  	        }
  	    },
  	    initialize() {
  	    }
  	}; 

  	// Components swapping
  	(function () {
  	    let componentInstanceCounters = {};
  	    const swappedInstances = new Set();
  	    const instanceRouteMap = new Map();
  	    const placeholderMap = new Map();

  	    function getComponentInstanceId(name) {
  	        if (!componentInstanceCounters[name]) componentInstanceCounters[name] = 1;
  	        else componentInstanceCounters[name]++;
  	        return `${name}-${componentInstanceCounters[name]}`;
  	    }

  	    function logSiblings(parent, context) {
  	        if (!parent) return;
  	        Array.from(parent.children).map(el => `${el.tagName}[data-component=${el.getAttribute('data-component') || ''}]`).join(', ');
  	    }

  	    window.InduxComponentsSwapping = {
  	        // Swap in source code for a placeholder
  	        async swapIn(placeholder) {
  	            if (placeholder.hasAttribute('data-swapped')) return;
  	            const processor = window.InduxComponentsProcessor;
  	            if (!processor) return;
  	            const name = placeholder.tagName.toLowerCase().replace('x-', '');
  	            let instanceId = placeholder.getAttribute('data-component');
  	            if (!instanceId) {
  	                instanceId = getComponentInstanceId(name);
  	                placeholder.setAttribute('data-component', instanceId);
  	            }
  	            // Save placeholder for reversion in the map
  	            if (!placeholderMap.has(instanceId)) {
  	                const clone = placeholder.cloneNode(true);
  	                clone.setAttribute('data-original-placeholder', '');
  	                clone.setAttribute('data-component', instanceId);
  	                placeholderMap.set(instanceId, clone);
  	            }
  	            // Log before swap
  	            logSiblings(placeholder.parentNode);
  	            // Process and swap in source code, passing instanceId
  	            await processor.processComponent(placeholder, instanceId);
  	            swappedInstances.add(instanceId);
  	            // Track the route for this instance
  	            const xRoute = placeholder.getAttribute('x-route');
  	            instanceRouteMap.set(instanceId, xRoute);
  	            // Log after swap
  	            logSiblings(placeholder.parentNode || document.body);
  	        },
  	        // Revert to placeholder
  	        revert(instanceId) {
  	            if (!swappedInstances.has(instanceId)) return;
  	            // Remove all elements with data-component=instanceId
  	            const rendered = Array.from(document.querySelectorAll(`[data-component="${instanceId}"]`));
  	            if (rendered.length === 0) return;
  	            const first = rendered[0];
  	            const parent = first.parentNode;
  	            // Retrieve the original placeholder from the map
  	            const placeholder = placeholderMap.get(instanceId);
  	            // Log before revert
  	            logSiblings(parent);
  	            // Remove all rendered elements
  	            rendered.forEach(el => {
  	                el.remove();
  	            });
  	            // Restore the placeholder at the correct position if not present
  	            if (placeholder && parent && !parent.contains(placeholder)) {
  	                const targetPosition = parseInt(placeholder.getAttribute('data-order')) || 0;
  	                let inserted = false;

  	                // Find the correct position based on data-order
  	                for (let i = 0; i < parent.children.length; i++) {
  	                    const child = parent.children[i];
  	                    const childPosition = parseInt(child.getAttribute('data-order')) || 0;

  	                    if (targetPosition < childPosition) {
  	                        parent.insertBefore(placeholder, child);
  	                        inserted = true;
  	                        break;
  	                    }
  	                }

  	                // If not inserted (should be at the end), append to parent
  	                if (!inserted) {
  	                    parent.appendChild(placeholder);
  	                }

  	            }
  	            swappedInstances.delete(instanceId);
  	            instanceRouteMap.delete(instanceId);
  	            placeholderMap.delete(instanceId);
  	            // Log after revert
  	            logSiblings(parent);
  	        },
  	        // Main swapping logic
  	        async processAll() {
  	            componentInstanceCounters = {};
  	            const registry = window.InduxComponentsRegistry;
  	            if (!registry) return;
  	            const routing = window.InduxRouting;
  	            const placeholders = Array.from(document.querySelectorAll('*')).filter(el =>
  	                el.tagName.toLowerCase().startsWith('x-') &&
  	                !el.hasAttribute('data-pre-rendered') &&
  	                !el.hasAttribute('data-processed')
  	            );
  	            // First pass: revert any swapped-in instances that no longer match
  	            if (routing) {
  	                const currentPath = window.location.pathname;
  	                const normalizedPath = currentPath === '/' ? '/' : currentPath.replace(/^\/+|\/+$/g, '');
  	                for (const instanceId of Array.from(swappedInstances)) {
  	                    const xRoute = instanceRouteMap.get(instanceId);
  	                    const matches = !xRoute || window.InduxRouting.matchesCondition(normalizedPath, xRoute);
  	                    if (!matches) {
  	                        this.revert(instanceId);
  	                    }
  	                }
  	            }
  	            // Second pass: swap in any placeholders that match
  	            for (const placeholder of placeholders) {
  	                const name = placeholder.tagName.toLowerCase().replace('x-', '');
  	                let instanceId = placeholder.getAttribute('data-component');
  	                if (!instanceId) {
  	                    instanceId = getComponentInstanceId(name);
  	                    placeholder.setAttribute('data-component', instanceId);
  	                }
  	                const xRoute = placeholder.getAttribute('x-route');
  	                if (!routing) {
  	                    // No routing: always swap in
  	                    await this.swapIn(placeholder);
  	                } else {
  	                    // Routing present: check route
  	                    const currentPath = window.location.pathname;
  	                    const normalizedPath = currentPath === '/' ? '/' : currentPath.replace(/^\/+|\/+$/g, '');
  	                    const matches = !xRoute || window.InduxRouting.matchesCondition(normalizedPath, xRoute);
  	                    if (matches) {
  	                        await this.swapIn(placeholder);
  	                    }
  	                }
  	            }
  	        },
  	        initialize() {
  	            // On init, process all
  	            this.processAll().then(() => {
  	                // Dispatch event when components are fully processed
  	                window.dispatchEvent(new CustomEvent('indux:components-processed'));
  	            });
  	            // If routing is present, listen for route changes
  	            if (window.InduxRouting) {
  	                window.addEventListener('indux:route-change', () => {
  	                    this.processAll().then(() => {
  	                        // Dispatch event when components are fully processed after route change
  	                        window.dispatchEvent(new CustomEvent('indux:components-processed'));
  	                    });
  	                });
  	            }
  	        }
  	    };
  	})(); 

  	// Components mutation observer
  	window.InduxComponentsMutation = {
  	    async processAllPlaceholders() {
  	        const processor = window.InduxComponentsProcessor;
  	        const routing = window.InduxRouting;
  	        if (!processor) return;
  	        const placeholders = Array.from(document.querySelectorAll('*')).filter(el =>
  	            el.tagName.toLowerCase().startsWith('x-') &&
  	            !el.hasAttribute('data-pre-rendered') &&
  	            !el.hasAttribute('data-processed')
  	        );
  	        for (const el of placeholders) {
  	            if (routing) {
  	                // Only process if route matches
  	                const xRoute = el.getAttribute('x-route');
  	                const currentPath = window.location.pathname;
  	                const normalizedPath = currentPath === '/' ? '/' : currentPath.replace(/^\/+|\/+$/g, '');
  	                const matches = !xRoute || window.InduxRouting.matchesCondition(normalizedPath, xRoute);
  	                if (!matches) continue;
  	            }
  	            await processor.processComponent(el);
  	        }
  	    },
  	    initialize() {
  	        const processor = window.InduxComponentsProcessor;
  	        const routing = window.InduxRouting;
  	        if (!processor) return;
  	        // Initial scan
  	        this.processAllPlaceholders();
  	        // Mutation observer for new placeholders
  	        const observer = new MutationObserver(async mutations => {
  	            for (const mutation of mutations) {
  	                for (const node of mutation.addedNodes) {
  	                    if (node.nodeType === 1 && node.tagName.toLowerCase().startsWith('x-')) {
  	                        if (!node.hasAttribute('data-pre-rendered') && !node.hasAttribute('data-processed')) {
  	                            if (routing) {
  	                                const xRoute = node.getAttribute('x-route');
  	                                const currentPath = window.location.pathname;
  	                                const normalizedPath = currentPath === '/' ? '/' : currentPath.replace(/^\/+|\/+$/g, '');
  	                                const matches = !xRoute || window.InduxRouting.matchesCondition(normalizedPath, xRoute);
  	                                if (!matches) continue;
  	                            }
  	                            await processor.processComponent(node);
  	                        }
  	                    }
  	                    // Also check for any <x-*> descendants
  	                    if (node.nodeType === 1) {
  	                        const descendants = Array.from(node.querySelectorAll('*')).filter(el =>
  	                            el.tagName.toLowerCase().startsWith('x-') &&
  	                            !el.hasAttribute('data-pre-rendered') &&
  	                            !el.hasAttribute('data-processed')
  	                        );
  	                        for (const el of descendants) {
  	                            if (routing) {
  	                                const xRoute = el.getAttribute('x-route');
  	                                const currentPath = window.location.pathname;
  	                                const normalizedPath = currentPath === '/' ? '/' : currentPath.replace(/^\/+|\/+$/g, '');
  	                                const matches = !xRoute || window.InduxRouting.matchesCondition(normalizedPath, xRoute);
  	                                if (!matches) continue;
  	                            }
  	                            await processor.processComponent(el);
  	                        }
  	                    }
  	                }
  	            }
  	        });

  	        // Ensure document.body exists before observing
  	        if (document.body) {
  	            observer.observe(document.body, { childList: true, subtree: true });
  	        } else {
  	            // Wait for body to be available
  	            document.addEventListener('DOMContentLoaded', () => {
  	                observer.observe(document.body, { childList: true, subtree: true });
  	            });
  	        }
  	    }
  	}; 

  	// Main initialization for Indux Components
  	function initializeComponents() {
  	    if (window.InduxComponentsRegistry) window.InduxComponentsRegistry.initialize();
  	    if (window.InduxComponentsLoader) window.InduxComponentsLoader.initialize();
  	    if (window.InduxComponentsProcessor) window.InduxComponentsProcessor.initialize();
  	    if (window.InduxComponentsSwapping) window.InduxComponentsSwapping.initialize();
  	    if (window.InduxComponentsMutation) window.InduxComponentsMutation.initialize();
  	    if (window.InduxComponentsUtils) window.InduxComponentsUtils.initialize?.();
  	    window.__induxComponentsInitialized = true;
  	    window.dispatchEvent(new CustomEvent('indux:components-ready'));
  	}

  	if (document.readyState === 'loading') {
  	    document.addEventListener('DOMContentLoaded', initializeComponents);
  	} else {
  	    initializeComponents();
  	}

  	window.InduxComponents = {
  	    initialize: initializeComponents
  	};
  	return indux_components;
  }

  requireIndux_components();

  /* Indux Code */

  // Cache for highlight.js loading
  let hljsPromise = null;

  // Load highlight.js from CDN
  async function loadHighlightJS() {
      if (typeof hljs !== 'undefined') {
          return hljs;
      }
      
      // Return existing promise if already loading
      if (hljsPromise) {
          return hljsPromise;
      }
      
      hljsPromise = new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.11.1/build/highlight.min.js';
          script.onload = () => {
              // Initialize highlight.js
              if (typeof hljs !== 'undefined') {
                  resolve(hljs);
              } else {
                  console.error('[Indux Code] Highlight.js failed to load - hljs is undefined');
                  hljsPromise = null; // Reset so we can try again
                  reject(new Error('highlight.js failed to load'));
              }
          };
          script.onerror = (error) => {
              console.error('[Indux Code] Script failed to load:', error);
              hljsPromise = null; // Reset so we can try again
              reject(error);
          };
          document.head.appendChild(script);
      });
      
      return hljsPromise;
  }

  // Preload highlight.js as soon as script loads
  loadHighlightJS().catch(() => {
      // Silently ignore errors during preload
  });

  // Optional optimization: Configure utilities plugin if present
  if (window.InduxUtilities) {
      // Tell utilities plugin to ignore code-related DOM changes and classes
      window.InduxUtilities.addIgnoredClassPattern(/^hljs/);
      window.InduxUtilities.addIgnoredClassPattern(/^language-/);
      window.InduxUtilities.addIgnoredClassPattern(/^copy$/);
      window.InduxUtilities.addIgnoredClassPattern(/^copied$/);
      window.InduxUtilities.addIgnoredClassPattern(/^lines$/);
      window.InduxUtilities.addIgnoredClassPattern(/^selected$/);
      
      window.InduxUtilities.addIgnoredElementSelector('pre');
      window.InduxUtilities.addIgnoredElementSelector('code');
      window.InduxUtilities.addIgnoredElementSelector('x-code');
      window.InduxUtilities.addIgnoredElementSelector('x-code-group');
  }

  // Process existing pre/code blocks
  async function processExistingCodeBlocks() {
      try {
          const hljs = await loadHighlightJS();
          
          // Find all pre > code blocks that aren't already processed
          // Exclude elements with frame class but allow those inside asides (frames)
          const codeBlocks = document.querySelectorAll('pre > code:not(.hljs):not([data-highlighted="yes"]):not(.frame)');
          
          for (const codeBlock of codeBlocks) {
              try {
                  
                  // Skip if the element contains HTML (has child elements)
                  if (codeBlock.children.length > 0) {
                      continue;
                  }
                  
                  // Skip if the content looks like HTML (contains tags)
                  let content = codeBlock.textContent || '';
                  if (content.includes('<') && content.includes('>') && content.includes('</')) {
                      // This looks like HTML content, skip highlighting to avoid security warnings
                      continue;
                  }
                  
                  // Special handling for frames - clean up content
                  const isInsideFrame = codeBlock.closest('aside');
                  if (isInsideFrame) {
                      // Remove leading empty lines and whitespace
                      content = content.replace(/^\s*\n+/, '');
                      // Remove trailing empty lines and whitespace
                      content = content.replace(/\n+\s*$/, '');
                      // Also trim any remaining leading/trailing whitespace
                      content = content.trim();
                      // Update the code block content
                      codeBlock.textContent = content;
                  }
                  
                  const pre = codeBlock.parentElement;
                  
                  // Add title if present
                  if (pre.hasAttribute('name') || pre.hasAttribute('title')) {
                      const title = pre.getAttribute('name') || pre.getAttribute('title');
                      const header = document.createElement('header');
                      
                      const titleElement = document.createElement('div');
                      titleElement.textContent = title;
                      header.appendChild(titleElement);
                      
                      pre.insertBefore(header, codeBlock);
                  }
                  
                  // Add line numbers if requested
                  if (pre.hasAttribute('numbers')) {
                      const codeText = codeBlock.textContent;
                      const lines = codeText.split('\n');
                      
                      const linesContainer = document.createElement('div');
                      linesContainer.className = 'lines';
                      
                      for (let i = 0; i < lines.length; i++) {
                          const lineSpan = document.createElement('span');
                          lineSpan.textContent = (i + 1).toString();
                          linesContainer.appendChild(lineSpan);
                      }
                      
                      pre.insertBefore(linesContainer, codeBlock);
                  }
                  
                  // Check if element has a supported language class
                  const languageMatch = codeBlock.className.match(/language-(\w+)/);
                  if (languageMatch) {
                      const language = languageMatch[1];
                      
                      // Skip non-programming languages
                      if (language === 'frame') {
                          continue;
                      }
                      
                      const supportedLanguages = hljs.listLanguages();
                      const languageAliases = {
                          'js': 'javascript',
                          'ts': 'typescript', 
                          'py': 'python',
                          'rb': 'ruby',
                          'sh': 'bash',
                          'yml': 'yaml'
                      };
                      
                      let actualLanguage = language;
                      if (languageAliases[language]) {
                          actualLanguage = languageAliases[language];
                          // Update the class name to use the correct language
                          codeBlock.className = codeBlock.className.replace(`language-${language}`, `language-${actualLanguage}`);
                      }
                      
                      // Only highlight if the language is supported
                      if (!supportedLanguages.includes(actualLanguage)) {
                          // Skip unsupported languages instead of warning
                          continue;
                      }
                  } else {
                      // Add default language class if not present
                      codeBlock.className += ' language-css'; // Default to CSS for the example
                  }
                  
                  // Highlight the code block
                  hljs.highlightElement(codeBlock);
                  
              } catch (error) {
                  console.warn('[Indux] Failed to process code block:', error);
              }
          }
      } catch (error) {
          console.warn('[Indux] Failed to process existing code blocks:', error);
      }
  }

  // Initialize plugin when either DOM is ready or Alpine is ready
  function initializeCodePlugin() {

      // X-Code-Group custom element for tabbed code blocks
      class XCodeGroupElement extends HTMLElement {
          constructor() {
              super();
          }

          static get observedAttributes() {
              return ['numbers', 'copy'];
          }

          get numbers() {
              return this.hasAttribute('numbers');
          }

          get copy() {
              return this.hasAttribute('copy');
          }

          connectedCallback() {
              // Small delay to ensure x-code elements are initialized
              setTimeout(() => {
                  this.setupCodeGroup();
              }, 0);
          }

          attributeChangedCallback(name, oldValue, newValue) {
              if (oldValue !== newValue) {
                  if (name === 'numbers' || name === 'copy') {
                      this.updateAttributes();
                  }
              }
          }

          setupCodeGroup() {
              // Find all x-code elements within this group
              const codeElements = this.querySelectorAll('x-code');
              
              if (codeElements.length === 0) {
                  return;
              }

              // Set default tab to first named code element first
              const firstNamedCode = Array.from(codeElements).find(code => code.getAttribute('name'));
              if (firstNamedCode) {
                  const defaultTab = firstNamedCode.getAttribute('name');
                  this.setAttribute('x-data', `{ codeTabs: '${defaultTab}' }`);
              }

              // Create header for tabs
              const header = document.createElement('header');
              
              // Process each code element
              codeElements.forEach((codeElement, index) => {
                  const name = codeElement.getAttribute('name');
                  
                  if (!name) {
                      return; // Skip if no name attribute
                  }
                  
                  // Create tab button
                  const tabButton = document.createElement('button');
                  tabButton.setAttribute('x-on:click', `codeTabs = '${name}'`);
                  tabButton.setAttribute('x-bind:class', `codeTabs === '${name}' ? 'selected' : ''`);
                  tabButton.setAttribute('role', 'tab');
                  tabButton.setAttribute('aria-controls', `code-${name.replace(/\s+/g, '-').toLowerCase()}`);
                  tabButton.setAttribute('x-bind:aria-selected', `codeTabs === '${name}' ? 'true' : 'false'`);
                  tabButton.textContent = name;
                  
                  // Add keyboard navigation
                  tabButton.addEventListener('keydown', (e) => {
                      const tabs = header.querySelectorAll('button[role="tab"]');
                      const currentIndex = Array.from(tabs).indexOf(tabButton);
                      
                      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                          e.preventDefault();
                          const nextIndex = e.key === 'ArrowRight' 
                              ? (currentIndex + 1) % tabs.length
                              : (currentIndex - 1 + tabs.length) % tabs.length;
                          tabs[nextIndex].focus();
                          tabs[nextIndex].click();
                      }
                  });
                  
                  header.appendChild(tabButton);
                  
                  // Set up the code element for tabs
                  codeElement.setAttribute('x-show', `codeTabs === '${name}'`);
                  codeElement.setAttribute('id', `code-${name.replace(/\s+/g, '-').toLowerCase()}`);
                  codeElement.setAttribute('role', 'tabpanel');
                  codeElement.setAttribute('aria-labelledby', `tab-${name.replace(/\s+/g, '-').toLowerCase()}`);
                  
                  // Apply numbers and copy attributes from group if present
                  if (this.numbers && !codeElement.hasAttribute('numbers')) {
                      codeElement.setAttribute('numbers', '');
                  }
                  if (this.copy && !codeElement.hasAttribute('copy')) {
                      codeElement.setAttribute('copy', '');
                  }
              });
              
              // Set up header with proper ARIA attributes
              header.setAttribute('role', 'tablist');
              header.setAttribute('aria-label', 'Code examples');
              
              // Insert header at the beginning
              this.insertBefore(header, this.firstChild);
              
              // Set initial tab IDs after header is added
              const tabs = header.querySelectorAll('button[role="tab"]');
              tabs.forEach((tab, index) => {
                  const name = tab.textContent.replace(/\s+/g, '-').toLowerCase();
                  tab.setAttribute('id', `tab-${name}`);
              });
          }

          updateAttributes() {
              const codeElements = this.querySelectorAll('x-code');
              codeElements.forEach(codeElement => {
                  if (this.numbers) {
                      codeElement.setAttribute('numbers', '');
                  } else {
                      codeElement.removeAttribute('numbers');
                  }
                  if (this.copy) {
                      codeElement.setAttribute('copy', '');
                  } else {
                      codeElement.removeAttribute('copy');
                  }
              });
          }
      }

      // X-Code custom element
      class XCodeElement extends HTMLElement {
          constructor() {
              super();
          }

          static get observedAttributes() {
              return ['language', 'numbers', 'title', 'copy'];
          }

          get language() {
              return this.getAttribute('language') || 'auto';
          }

          get numbers() {
              return this.hasAttribute('numbers');
          }

          get title() {
              return this.getAttribute('name') || this.getAttribute('title');
          }

          get copy() {
              return this.hasAttribute('copy');
          }

          get contentElement() {
              return this.querySelector('code') || this;
          }

          connectedCallback() {
              this.setupElement();
              // Remove tabindex to prevent focusing the container itself
              // Focus should go to interactive elements like copy button
              this.highlightCode();
          }

          attributeChangedCallback(name, oldValue, newValue) {
              if (oldValue !== newValue) {
                  if (name === 'language') {
                      this.highlightCode();
                  } else if (name === 'numbers') {
                      this.updateLineNumbers();
                  } else if (name === 'title') {
                      this.updateTitle();
                  } else if (name === 'copy' && typeof this.updateCopyButton === 'function') {
                      this.updateCopyButton();
                  }
              }
          }

          setupElement() {
              // Extract content BEFORE adding any UI elements
              let content = this.extractContent();
              
              // Check if we have preserved original content for complete HTML documents
              const originalContent = this.getAttribute('data-original-content');
              if (originalContent) {
                  // Use the preserved original content that includes document-level tags
                  content = originalContent;
                  // Remove the data attribute as we no longer need it
                  this.removeAttribute('data-original-content');
              }
              
              // Create semantically correct structure: pre > code
              const pre = document.createElement('pre');
              const code = document.createElement('code');
              
              // Use textContent to preserve HTML tags as literal text
              // This ensures highlight.js treats the content as code, not HTML
              code.textContent = content;
              pre.appendChild(code);
              this.textContent = '';
              this.appendChild(pre);

              // Create title if present (after pre element is created) - but only if not in a code group
              if (this.title && !this.closest('x-code-group')) {
                  const header = document.createElement('header');
                  
                  const title = document.createElement('div');
                  title.textContent = this.title;
                  header.appendChild(title);
                  
                  this.insertBefore(header, pre);
              }

              // Add line numbers if enabled
              if (this.numbers) {
                  this.setupLineNumbers();
              }

              // Add copy button if enabled (after content extraction)
              if (this.copy) {
                  this.setupCopyButton();
              }
              
              // If this is in a code group, ensure copy button comes after title in tab order
              const codeGroup = this.closest('x-code-group');
              if (codeGroup && this.copy) {
                  const copyButton = this.querySelector('.copy');
                  if (copyButton) {
                      // Set tabindex to ensure it comes after header buttons in tab order
                      copyButton.setAttribute('tabindex', '0');
                  }
              }
          }

          extractContent() {
              // Get the content and preserve original formatting
              let content = this.textContent;
              
              // Preserve intentional line breaks at the beginning and end
              // Only trim if there are no intentional line breaks
              const hasLeadingLineBreak = content.startsWith('\n');
              const hasTrailingLineBreak = content.endsWith('\n');
              
              // Trim but preserve intentional line breaks
              if (hasLeadingLineBreak) {
                  content = '\n' + content.trimStart();
              } else {
                  content = content.trimStart();
              }
              
              if (hasTrailingLineBreak) {
                  content = content.trimEnd() + '\n';
              } else {
                  content = content.trimEnd();
              }
              
              // Check if this is markdown-generated content (has preserved indentation)
              // Also check if this is inside a frame (aside element)
              const isInsideFrame = this.closest('aside');
              const hasPreservedIndentation = content.includes('\n    ') || content.includes('\n\t');
              
              // Special handling for frames - remove leading and trailing empty lines
              if (isInsideFrame) {
                  // If we have a title and the content starts with it, remove it
                  if (this.title && content.startsWith(this.title)) {
                      content = content.substring(this.title.length);
                      // Remove any leading newline after removing title
                      content = content.replace(/^\n+/, '');
                  }
                  
                  // Remove leading empty lines and whitespace
                  content = content.replace(/^\s*\n+/, '');
                  // Remove trailing empty lines and whitespace
                  content = content.replace(/\n+\s*$/, '');
                  // Also trim any remaining leading/trailing whitespace
                  content = content.trim();
              }
              
              if (!hasPreservedIndentation && content.includes('\n') && !isInsideFrame) {
                  // Only normalize indentation for non-markdown content
                  const hasTrailingLineBreakText = content.endsWith('\n');
                  const lines = content.split('\n');
                  
                  // Find the minimum indentation (excluding empty lines and lines with no indentation)
                  let minIndent = Infinity;
                  for (const line of lines) {
                      if (line.trim() !== '') {
                          const indent = line.length - line.trimStart().length;
                          if (indent > 0) { // Only consider lines that actually have indentation
                              minIndent = Math.min(minIndent, indent);
                          }
                      }
                  }

                  // Remove the common indentation from all lines
                  if (minIndent < Infinity) {
                      content = lines.map(line => {
                          if (line.trim() === '') return '';
                          const indent = line.length - line.trimStart().length;
                          // Only remove indentation if the line has enough spaces
                          return indent >= minIndent ? line.slice(minIndent) : line;
                      }).join('\n');
                      
                      // Preserve trailing line break if it was originally there
                      if (hasTrailingLineBreakText) {
                          content += '\n';
                      }
                  }
              }
              
              // Check if the content was interpreted as HTML (has child nodes)
              if (this.children.length > 0) {
                  // Extract the original HTML from the child nodes
                  content = this.innerHTML;
                  
                  // Preserve intentional line breaks at the beginning and end
                  const hasLeadingLineBreak = content.startsWith('\n');
                  const hasTrailingLineBreak = content.endsWith('\n');
                  
                  // Trim but preserve intentional line breaks
                  if (hasLeadingLineBreak) {
                      content = '\n' + content.trimStart();
                  } else {
                      content = content.trimStart();
                  }
                  
                  if (hasTrailingLineBreak) {
                      content = content.trimEnd() + '\n';
                  } else {
                      content = content.trimEnd();
                  }

                  // Remove any copy button that might have been included
                  content = content.replace(/<button[^>]*class="copy"[^>]*>.*?<\/button>/g, '');

                  // Clean up empty attribute values (data-head="" -> data-head)
                  content = content.replace(/(\w+)=""/g, '$1');

                  // For HTML content, normalize indentation (but not for frames)
                  const isInsideFrame = this.closest('aside');
                  const hasTrailingLineBreakHtml = content.endsWith('\n');
                  const lines = content.split('\n');
                  if (lines.length > 1 && !isInsideFrame) {
                      // Find the minimum indentation
                      let minIndent = Infinity;
                      for (const line of lines) {
                          if (line.trim() !== '') {
                              const indent = line.length - line.trimStart().length;
                              if (indent > 0) {
                                  minIndent = Math.min(minIndent, indent);
                              }
                          }
                      }

                      // Remove the common indentation from all lines
                      if (minIndent < Infinity) {
                          content = lines.map(line => {
                              if (line.trim() === '') return '';
                              const indent = line.length - line.trimStart().length;
                              return indent >= minIndent ? line.slice(minIndent) : line;
                          }).join('\n');
                          
                          // Preserve trailing line break if it was originally there
                          if (hasTrailingLineBreakHtml) {
                              content += '\n';
                          }
                      }
                  }
              }
              
              return content;
          }

          async setupLineNumbers() {
              try {
                  // Ensure the pre element exists and has content
                  const pre = this.querySelector('pre');

                  if (pre && !this.querySelector('.lines')) {
                      // Make sure the pre element is properly set up first
                      if (!pre.querySelector('code')) {
                          const code = document.createElement('code');
                          code.textContent = pre.textContent;
                          pre.textContent = '';
                          pre.appendChild(code);
                      }

                      // Count the lines using the actual DOM content
                      const codeText = pre.textContent;
                      const lines = codeText.split('\n');

                      // Create the lines container
                      const linesContainer = document.createElement('div');
                      linesContainer.className = 'lines';

                      // Add line number items for all lines (including empty ones)
                      for (let i = 0; i < lines.length; i++) {
                          const lineSpan = document.createElement('span');
                          lineSpan.textContent = (i + 1).toString();
                          linesContainer.appendChild(lineSpan);
                      }

                      // Insert line numbers before the pre element
                      this.insertBefore(linesContainer, pre);
                  }
              } catch (error) {
                  console.warn('[Indux] Failed to setup line numbers:', error);
              }
          }

          async setupCopyButton() {
              try {
                  const copyButton = document.createElement('button');
                  copyButton.className = 'copy';
                  copyButton.setAttribute('aria-label', 'Copy code to clipboard');
                  copyButton.setAttribute('type', 'button');
                  
                  copyButton.addEventListener('click', () => {
                      this.copyCodeToClipboard();
                  });
                  
                  // Add keyboard support
                  copyButton.addEventListener('keydown', (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          this.copyCodeToClipboard();
                      }
                  });
                  
                  this.appendChild(copyButton);
              } catch (error) {
                  console.warn('[Indux] Failed to setup copy button:', error);
              }
          }

          async copyCodeToClipboard() {
              try {
                  const codeElement = this.contentElement;
                  const codeText = codeElement.textContent;
                  
                  await navigator.clipboard.writeText(codeText);
                  
                  // Show copied state using CSS classes
                  const copyButton = this.querySelector('.copy');
                  if (copyButton) {
                      copyButton.classList.add('copied');
                      setTimeout(() => {
                          copyButton.classList.remove('copied');
                      }, 2000);
                  }
              } catch (error) {
                  console.warn('[Indux] Failed to copy code:', error);
              }
          }

          updateLineNumbers() {
              if (this.numbers) {
                  this.setupLineNumbers();
              } else {
                  // Remove line numbers if disabled
                  const lines = this.querySelector('.lines');
                  if (lines) {
                      lines.remove();
                  }
              }
          }

          async highlightCode() {
              try {
                  // Ensure highlight.js is loaded
                  const hljs = await loadHighlightJS();
                  
                  const codeElement = this.contentElement;
                  
                  // Skip if this element contains HTML (has child elements)
                  if (codeElement.children.length > 0) {
                      return;
                  }
                  
                  // Only skip HTML content for auto-detection, not when language is explicitly specified
                  const content = codeElement.textContent || '';
                  
                  // Reset highlighting if already highlighted
                  if (codeElement.dataset.highlighted === 'yes') {
                      delete codeElement.dataset.highlighted;
                      // Clear all highlight.js related classes
                      codeElement.className = codeElement.className.replace(/\bhljs\b|\blanguage-\w+\b/g, '').trim();
                  }
                  
                  // Set language class if specified
                  if (this.language && this.language !== 'auto') {
                      // Skip non-programming languages
                      if (this.language === 'frame') {
                          return;
                      }
                      
                      // Check if the language is supported by highlight.js
                      const supportedLanguages = hljs.listLanguages();
                      const languageAliases = {
                          'js': 'javascript',
                          'ts': 'typescript', 
                          'py': 'python',
                          'rb': 'ruby',
                          'sh': 'bash',
                          'yml': 'yaml',
                          'html': 'xml'
                      };
                      
                      let actualLanguage = this.language;
                      if (languageAliases[this.language]) {
                          actualLanguage = languageAliases[this.language];
                      }
                      
                      // Only highlight if language is supported, otherwise skip highlighting
                      if (supportedLanguages.includes(actualLanguage)) {
                          // Use hljs.highlight() with specific language to avoid auto-detection
                          const result = hljs.highlight(codeElement.textContent, { language: actualLanguage });
                          codeElement.innerHTML = result.value;
                          codeElement.className = `language-${actualLanguage} hljs`;
                          codeElement.dataset.highlighted = 'yes';
                      } else {
                          // Skip unsupported languages
                          return;
                      }
                  } else {
                      // For auto-detection, only proceed if content doesn't look like HTML
                      if (content.includes('<') && content.includes('>') && content.includes('</')) {
                          // Skip HTML-like content to avoid security warnings during auto-detection
                          return;
                      }
                      
                      // Remove any existing language class for auto-detection
                      codeElement.className = codeElement.className.replace(/\blanguage-\w+/g, '');
                      
                      // Use highlightElement for auto-detection when no specific language
                      hljs.highlightElement(codeElement);
                  }
                  
              } catch (error) {
                  console.warn(`[Indux] Failed to highlight code:`, error);
              }
          }

          update() {
              this.highlightCode();
          }

          updateTitle() {
              let titleElement = this.querySelector('header div');
              if (this.title) {
                  if (!titleElement) {
                      titleElement = document.createElement('div');
                      titleElement.textContent = this.title;
                      this.insertBefore(titleElement, this.firstChild);
                  }
                  titleElement.textContent = this.title;
              } else if (titleElement) {
                  titleElement.remove();
              }
          }

          updateCopyButton() {
              const existingCopyButton = this.querySelector('.copy');
              
              if (this.copy) {
                  if (!existingCopyButton) {
                      // Only add copy button if setupElement has already been called
                      // (i.e., if we have a pre element)
                      if (this.querySelector('pre')) {
                          this.setupCopyButton();
                      }
                      // Otherwise, the copy button will be added in setupElement()
                  }
              } else {
                  if (existingCopyButton) {
                      existingCopyButton.remove();
                  }
              }
          }
      }

      // Initialize the plugin
      async function initialize() {
          try {
              // Register the custom element
              if (!customElements.get('x-code')) {
                  customElements.define('x-code', XCodeElement);
              }
              if (!customElements.get('x-code-group')) {
                  customElements.define('x-code-group', XCodeGroupElement);
              }

                  // Process existing code blocks
      await processExistingCodeBlocks();
      
      // Listen for markdown plugin conversions
      document.addEventListener('indux:code-blocks-converted', async () => {
          await processExistingCodeBlocks();
      });
      
      // Also listen for the event on the document body for better coverage
      document.body.addEventListener('indux:code-blocks-converted', async () => {
          await processExistingCodeBlocks();
      });

          } catch (error) {
              console.error('[Indux] Failed to initialize code plugin:', error);
          }
      }

      // Alpine.js directive for code highlighting (only if Alpine is available)
      if (typeof Alpine !== 'undefined') {
          Alpine.directive('code', (el, { expression, modifiers }, { effect, evaluateLater }) => {
              // Create x-code element
              const codeElement = document.createElement('x-code');

              // Get language from various possible sources
              let language = 'auto';
              
              // Check for language attribute first
              const languageAttr = el.getAttribute('language');
              if (languageAttr) {
                  language = languageAttr;
              } else if (expression && typeof expression === 'string' && !expression.includes('.')) {
                  // Fallback to expression if it's a simple string
                  language = expression;
              } else if (modifiers.length > 0) {
                  // Fallback to first modifier
                  language = modifiers[0];
              }

              codeElement.setAttribute('language', language);

              // Enable line numbers if specified
              if (modifiers.includes('numbers') || modifiers.includes('line-numbers') || el.hasAttribute('numbers')) {
                  codeElement.setAttribute('numbers', '');
              }

              // Set title from various possible sources
              const title = el.getAttribute('name') || el.getAttribute('title') || el.getAttribute('data-title');
              if (title) {
                  codeElement.setAttribute('name', title);
              }

              // Move content to x-code element
              const content = el.textContent.trim();
              codeElement.textContent = content;
              el.textContent = '';
              el.appendChild(codeElement);

              // Handle dynamic content updates only if expression is a variable
              if (expression && (expression.includes('.') || !['javascript', 'css', 'html', 'python', 'ruby', 'php', 'java', 'c', 'cpp', 'csharp', 'go', 'sql', 'json', 'yaml', 'markdown', 'typescript', 'jsx', 'tsx', 'scss', 'sass', 'less', 'xml', 'markup'].includes(expression))) {
                  const getContent = evaluateLater(expression);
                  effect(() => {
                      getContent((content) => {
                          if (content && typeof content === 'string') {
                              codeElement.textContent = content;
                              codeElement.update();
                          }
                      });
                  });
              }
          });
      }

      // Handle both DOMContentLoaded and alpine:init
      if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initialize);
      } else {
          initialize();
      }

      // Listen for Alpine initialization (only if Alpine is available)
      if (typeof Alpine !== 'undefined') {
          document.addEventListener('alpine:init', initialize);
      } else {
          // If Alpine isn't available yet, listen for it to become available
          document.addEventListener('alpine:init', () => {
              // Re-register the directive when Alpine becomes available
              if (typeof Alpine !== 'undefined') {
                  Alpine.directive('code', (el, { expression, modifiers }, { effect, evaluateLater }) => {
                      // Create x-code element
                      const codeElement = document.createElement('x-code');

                      // Get language from various possible sources
                      let language = 'auto';
                      
                      // Check for language attribute first
                      const languageAttr = el.getAttribute('language');
                      if (languageAttr) {
                          language = languageAttr;
                      } else if (expression && typeof expression === 'string' && !expression.includes('.')) {
                          // Fallback to expression if it's a simple string
                          language = expression;
                      } else if (modifiers.length > 0) {
                          // Fallback to first modifier
                          language = modifiers[0];
                      }

                      codeElement.setAttribute('language', language);

                      // Enable line numbers if specified
                      if (modifiers.includes('numbers') || modifiers.includes('line-numbers') || el.hasAttribute('numbers')) {
                          codeElement.setAttribute('numbers', '');
                      }

                      // Set title from various possible sources
                      const title = el.getAttribute('name') || el.getAttribute('title') || el.getAttribute('data-title');
                      if (title) {
                          codeElement.setAttribute('name', title);
                      }

                      // Move content to x-code element
                      const content = el.textContent.trim();
                      codeElement.textContent = content;
                      el.textContent = '';
                      el.appendChild(codeElement);

                      // Handle dynamic content updates only if expression is a variable
                      if (expression && (expression.includes('.') || !['javascript', 'css', 'html', 'python', 'ruby', 'php', 'java', 'c', 'cpp', 'csharp', 'go', 'sql', 'json', 'yaml', 'markdown', 'typescript', 'jsx', 'tsx', 'scss', 'sass', 'less', 'xml', 'markup'].includes(expression))) {
                          const getContent = evaluateLater(expression);
                          effect(() => {
                              getContent((content) => {
                                  if (content && typeof content === 'string') {
                                      codeElement.textContent = content;
                                      codeElement.update();
                                  }
                              });
                          });
                      }
                  });
              }
          });
      }
  }

  // Initialize the plugin
  initializeCodePlugin();

  /* Indux Data Sources */

  // Dynamic js-yaml loader
  let jsyaml = null;
  let yamlLoadingPromise = null;

  async function loadYamlLibrary() {
      if (jsyaml) return jsyaml;
      if (yamlLoadingPromise) return yamlLoadingPromise;
      
      yamlLoadingPromise = new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/js-yaml/dist/js-yaml.min.js';
          script.onload = () => {
              if (typeof window.jsyaml !== 'undefined') {
                  jsyaml = window.jsyaml;
                  resolve(jsyaml);
              } else {
                  console.error('[Indux Data] js-yaml failed to load - jsyaml is undefined');
                  yamlLoadingPromise = null; // Reset so we can try again
                  reject(new Error('js-yaml failed to load'));
              }
          };
          script.onerror = (error) => {
              console.error('[Indux Data] Script failed to load:', error);
              yamlLoadingPromise = null; // Reset so we can try again
              reject(error);
          };
          document.head.appendChild(script);
      });
      
      return yamlLoadingPromise;
  }

  // Initialize plugin when either DOM is ready or Alpine is ready
  async function initializeDataSourcesPlugin() {
      // Initialize empty data sources store
      const initialStore = {
          all: [], // Global content array for cross-dataSource access
          _initialized: false,
          _currentUrl: window.location.pathname
      };
      Alpine.store('data', initialStore);

      // Cache for loaded data sources
      const dataSourceCache = new Map();
      const loadingPromises = new Map();

      // Listen for locale changes to reload data
      window.addEventListener('localechange', async (event) => {
          event.detail.locale;
          
          // Set loading state to prevent flicker
          const store = Alpine.store('data');
          if (store) {
              Alpine.store('data', {
                  ...store,
                  _localeChanging: true
              });
          }
          
          try {
              // Get manifest to identify localized data sources
              const manifest = await ensureManifest();
              if (!manifest?.data) return;
              
              // Find localized data sources (those with locale keys)
              const localizedDataSources = [];
              Object.entries(manifest.data).forEach(([name, config]) => {
                  if (typeof config === 'object' && !config.url) {
                      // Check if it has locale keys (2-letter codes)
                      const hasLocaleKeys = Object.keys(config).some(key => 
                          key.length === 2 && typeof config[key] === 'string'
                      );
                      if (hasLocaleKeys) {
                          localizedDataSources.push(name);
                      }
                  }
              });
              
              // Only clear cache for localized data sources
              localizedDataSources.forEach(dataSourceName => {
                  // Clear all locale variants of this data source
                  const keysToDelete = [];
                  for (const key of dataSourceCache.keys()) {
                      if (key.startsWith(`${dataSourceName}:`)) {
                          keysToDelete.push(key);
                      }
                  }
                  keysToDelete.forEach(key => dataSourceCache.delete(key));
                  
                  // Clear loading promises for this data source
                  const promisesToDelete = [];
                  for (const key of loadingPromises.keys()) {
                      if (key.startsWith(`${dataSourceName}:`)) {
                          promisesToDelete.push(key);
                      }
                  }
                  promisesToDelete.forEach(key => loadingPromises.delete(key));
              });
              
              // Only remove localized data from store, keep non-localized data
              const store = Alpine.store('data');
              if (store && store.all) {
                  const filteredAll = store.all.filter(item => 
                      !localizedDataSources.includes(item.contentType)
                  );
                  
                  // Remove localized data sources from store
                  const newStore = { ...store, all: filteredAll };
                  localizedDataSources.forEach(dataSourceName => {
                      delete newStore[dataSourceName];
                  });
                  
                  Alpine.store('data', {
                      ...newStore,
                      _localeChanging: false
                  });
              }
              
          } catch (error) {
              console.error('[Indux Data] Error handling locale change:', error);
              // Fallback to full reload if something goes wrong
              dataSourceCache.clear();
              loadingPromises.clear();
              Alpine.store('data', {
                  all: [],
                  _initialized: true,
                  _localeChanging: false
              });
          }
      });

      // Track initialization state
      let isInitializing = false;
      let initializationComplete = false;

      // Load manifest if not already loaded
      async function ensureManifest() {
          if (window.InduxComponentsRegistry?.manifest) {
              return window.InduxComponentsRegistry.manifest;
          }

          try {
              const response = await fetch('/manifest.json');
              return await response.json();
          } catch (error) {
              console.error('[Indux Data] Failed to load manifest:', error);
              return null;
          }
      }

      // Helper to interpolate environment variables
      function interpolateEnvVars(str) {
          if (typeof str !== 'string') return str;
          return str.replace(/\$\{([^}]+)\}/g, (match, varName) => {
              // Check for environment variables (in browser, these would be set by build process)
              if (typeof process !== 'undefined' && process.env && process.env[varName]) {
                  return process.env[varName];
              }
              // Check for window.env (common pattern for client-side env vars)
              if (typeof window !== 'undefined' && window.env && window.env[varName]) {
                  return window.env[varName];
              }
              // Return original if not found
              return match;
          });
      }

      // Helper to get nested value from object
      function getNestedValue(obj, path) {
          return path.split('.').reduce((current, key) => {
              return current && current[key] !== undefined ? current[key] : undefined;
          }, obj);
      }

      // Load from API endpoint
      async function loadFromAPI(dataSource) {
          try {
              const url = new URL(interpolateEnvVars(dataSource.url));
              
              // Add query parameters
              if (dataSource.params) {
                  Object.entries(dataSource.params).forEach(([key, value]) => {
                      url.searchParams.set(key, interpolateEnvVars(value));
                  });
              }
              
              // Prepare headers
              const headers = {};
              if (dataSource.headers) {
                  Object.entries(dataSource.headers).forEach(([key, value]) => {
                      headers[key] = interpolateEnvVars(value);
                  });
              }
              
              const response = await fetch(url, {
                  method: dataSource.method || 'GET',
                  headers: headers
              });
              
              if (!response.ok) {
                  throw new Error(`API request failed: ${response.status} ${response.statusText}`);
              }
              
              let data = await response.json();
              
              // Transform data if needed
              if (dataSource.transform) {
                  data = getNestedValue(data, dataSource.transform);
              }
              
              return data;
          } catch (error) {
              console.error(`[Indux Data] Failed to load API dataSource:`, error);
              // Return empty array/object to prevent breaking the UI
              return Array.isArray(dataSource.defaultValue) ? dataSource.defaultValue : (dataSource.defaultValue || []);
          }
      }

      // Load dataSource data
      async function loadDataSource(dataSourceName, locale = 'en') {
          const cacheKey = `${dataSourceName}:${locale}`;

          // Check memory cache first
          if (dataSourceCache.has(cacheKey)) {
              const cachedData = dataSourceCache.get(cacheKey);
              if (!isInitializing) {
                  updateStore(dataSourceName, cachedData);
              }
              return cachedData;
          }

          // If already loading, return existing promise
          if (loadingPromises.has(cacheKey)) {
              return loadingPromises.get(cacheKey);
          }

          const loadPromise = (async () => {
              try {
                  const manifest = await ensureManifest();
                  if (!manifest?.data) {
                      console.warn('[Indux Data] No data sources defined in manifest.json');
                      return null;
                  }

                  const dataSource = manifest.data[dataSourceName];
                  if (!dataSource) {
                      // Only warn for dataSources that are actually being accessed
                      // This prevents warnings for test references that might exist in HTML
                      return null;
                  }

                  let data;
                  
                  // Auto-detect dataSource type based on structure
                  if (typeof dataSource === 'string') {
                      // Local file - load from filesystem
                      const response = await fetch(dataSource);
                      const contentType = response.headers.get('content-type');

                      // Handle different content types
                      if (contentType?.includes('application/json') || dataSource.endsWith('.json')) {
                          data = await response.json();
                      } else if (contentType?.includes('text/yaml') || dataSource.endsWith('.yaml') || dataSource.endsWith('.yml')) {
                          const text = await response.text();
                          
                          // Load js-yaml library dynamically
                          const yamlLib = await loadYamlLibrary();
                          data = yamlLib.load(text);
                      } else {
                          // Try JSON first, then YAML
                          try {
                              const text = await response.text();
                              data = JSON.parse(text);
                          } catch (e) {
                              const yamlLib = await loadYamlLibrary();
                              data = yamlLib.load(text);
                          }
                      }
                  } else if (dataSource.url) {
                      // Cloud API - load from HTTP endpoint
                      data = await loadFromAPI(dataSource);
                  } else if (dataSource[locale]) {
                      // Localized dataSource
                      const localizedDataSource = dataSource[locale];
                      if (typeof localizedDataSource === 'string') {
                          // Localized local file
                          const response = await fetch(localizedDataSource);
                          const contentType = response.headers.get('content-type');

                          if (contentType?.includes('application/json') || localizedDataSource.endsWith('.json')) {
                              data = await response.json();
                          } else if (contentType?.includes('text/yaml') || localizedDataSource.endsWith('.yaml') || localizedDataSource.endsWith('.yml')) {
                              const text = await response.text();
                              const yamlLib = await loadYamlLibrary();
                              data = yamlLib.load(text);
                          } else {
                              try {
                                  const text = await response.text();
                                  data = JSON.parse(text);
                              } catch (e) {
                                  const yamlLib = await loadYamlLibrary();
                                  data = yamlLib.load(text);
                              }
                          }
                      } else if (localizedDataSource.url) {
                          // Localized cloud API
                          data = await loadFromAPI(localizedDataSource);
                      } else {
                          console.warn(`[Indux Data] No valid source found for dataSource "${dataSourceName}" in locale "${locale}"`);
                          return null;
                      }
                  } else {
                      console.warn(`[Indux Data] No valid source found for dataSource "${dataSourceName}"`);
                      return null;
                  }

                  // Enhance data with metadata
                  let enhancedData;
                  const sourceType = typeof dataSource === 'string' ? 'local' : 'api';
                  const sourcePath = typeof dataSource === 'string' ? dataSource : dataSource.url;
                  
                  if (Array.isArray(data)) {
                      enhancedData = data.map(item => ({
                          ...item,
                          contentType: dataSourceName,
                          _loadedFrom: sourcePath,
                          _sourceType: sourceType,
                          _locale: locale
                      }));
                  } else if (typeof data === 'object') {
                      enhancedData = {
                          ...data,
                          contentType: dataSourceName,
                          _loadedFrom: sourcePath,
                          _sourceType: sourceType,
                          _locale: locale
                      };
                  }

                  // Update cache
                  dataSourceCache.set(cacheKey, enhancedData);

                  // Update store only if not initializing
                  if (!isInitializing) {
                      updateStore(dataSourceName, enhancedData);
                  }

                  return enhancedData;
              } catch (error) {
                  console.error(`[Indux Data] Failed to load dataSource "${dataSourceName}":`, error);
                  return null;
              } finally {
                  loadingPromises.delete(cacheKey);
              }
          })();

          loadingPromises.set(cacheKey, loadPromise);
          return loadPromise;
      }

      // Update store with new data
      function updateStore(dataSourceName, data) {
          if (isInitializing) return;

          const store = Alpine.store('data');
          const all = store.all.filter(item => item.contentType !== dataSourceName);

          if (Array.isArray(data)) {
              all.push(...data);
          } else {
              all.push(data);
          }

          Alpine.store('data', {
              ...store,
              [dataSourceName]: data,
              all,
              _initialized: true
          });
      }

      // Create a safe proxy for loading state
      function createLoadingProxy() {
          return new Proxy({}, {
              get(target, key) {
                  // Handle special keys
                  if (key === Symbol.iterator || key === 'then' || key === 'catch' || key === 'finally') {
                      return undefined;
                  }

                  // Handle route() function - always available
                  if (key === 'route') {
                      return function(pathKey) {
                          // Return a safe fallback proxy that returns empty strings for all properties
                          return new Proxy({}, {
                              get(target, prop) {
                                  // Return empty string for any property to prevent expression display
                                  if (typeof prop === 'string') {
                                      return '';
                                  }
                                  return undefined;
                              }
                          });
                      };
                  }

                  // Handle toPrimitive for text content
                  if (key === Symbol.toPrimitive) {
                      return function () { return ''; };
                  }

                  // Handle valueOf for text content
                  if (key === 'valueOf') {
                      return function () { return ''; };
                  }

                  // Handle toString for text content
                  if (key === 'toString') {
                      return function () { return ''; };
                  }

                  // Handle numeric keys for array access
                  if (typeof key === 'string' && !isNaN(Number(key))) {
                      return createLoadingProxy();
                  }

                  // Return empty string for most properties to prevent expression display
                  if (typeof key === 'string') {
                      // For known array properties, return a special proxy with route() function
                      // This prevents infinite recursion while providing route() functionality
                      if (key === 'legal' || key === 'docs' || key === 'features' || key === 'items') {
                          return new Proxy({}, {
                              get(target, prop) {
                                  if (prop === 'route') {
                                      return function(pathKey) {
                                          // Return a safe fallback proxy that returns empty strings
                                          return new Proxy({}, {
                                              get() { return ''; }
                                          });
                                      };
                                  }
                                  if (prop === 'length') return 0;
                                  if (typeof prop === 'string' && !isNaN(Number(prop))) {
                                      return createLoadingProxy();
                                  }
                                  return '';
                              }
                          });
                      }
                      return '';
                  }

                  // Return empty object for nested properties
                  return createLoadingProxy();
              }
          });
      }

      // Create a proxy for array items
      function createArrayItemProxy(item) {
          return new Proxy(item, {
              get(target, key) {
                  // Handle special keys
                  if (key === Symbol.iterator || key === 'then' || key === 'catch' || key === 'finally') {
                      return undefined;
                  }

                  // Handle toPrimitive for text content
                  if (key === Symbol.toPrimitive) {
                      return function () {
                          return target[key] || '';
                      };
                  }

                  return target[key];
              }
          });
      }

      // Create proxy for route-specific lookups
      function createRouteProxy(dataSourceData, pathKey, dataSourceName) {
          // First check if we have a valid route
          let foundItem = null;
          try {
              const store = Alpine.store('data');
              const currentPath = store?._currentUrl || window.location.pathname;
              let pathSegments = currentPath.split('/').filter(segment => segment);
              
              // Filter out language codes from path segments for route matching
              const localeStore = Alpine.store('locale');
              if (localeStore && localeStore.available && pathSegments.length > 0) {
                  const firstSegment = pathSegments[0];
                  if (localeStore.available.includes(firstSegment)) {
                      pathSegments = pathSegments.slice(1);
                  }
              }
              
              if (dataSourceData && typeof dataSourceData === 'object') {
                  foundItem = findItemByPath(dataSourceData, pathKey, pathSegments);
              }
          } catch (error) {
              // Error finding route
          }
          
          // If no route found, return null to make the expression falsy
          if (!foundItem) {
              return null;
          }
          
          // Return a proxy for the found item
          return new Proxy({}, {
              get(target, prop) {
                  try {
                      if (foundItem && prop in foundItem) {
                          return foundItem[prop];
                      }
                      
                      // Special handling for 'group' property - find the group containing the matched item
                      if (prop === 'group' && foundItem) {
                          const groupItem = findGroupContainingItem(dataSourceData, foundItem);
                          return groupItem?.group || '';
                      }
                      
                      return undefined;
                  } catch (error) {
                      return undefined;
                  }
              }
          });
      }

      // Listen for URL changes to trigger reactivity
      let currentUrl = window.location.pathname;
      window.addEventListener('popstate', () => {
          if (window.location.pathname !== currentUrl) {
              currentUrl = window.location.pathname;
              // Update store to trigger Alpine reactivity
              const store = Alpine.store('data');
              if (store && store._initialized) {
                  store._currentUrl = window.location.pathname;
              }
          }
      });


      // Also listen for pushstate/replacestate (for SPA navigation)
      const originalPushState = history.pushState;
      const originalReplaceState = history.replaceState;
      
      history.pushState = function(...args) {
          originalPushState.apply(history, args);
          if (window.location.pathname !== currentUrl) {
              currentUrl = window.location.pathname;
              const store = Alpine.store('data');
              if (store && store._initialized) {
                  store._currentUrl = window.location.pathname;
              }
          }
      };
      
      history.replaceState = function(...args) {
          originalReplaceState.apply(history, args);
          if (window.location.pathname !== currentUrl) {
              currentUrl = window.location.pathname;
              const store = Alpine.store('data');
              if (store && store._initialized) {
                  store._currentUrl = window.location.pathname;
              }
          }
      };

      // Recursively search for items with matching path
      function findItemByPath(data, pathKey, pathSegments) {
          if (!pathSegments || pathSegments.length === 0) {
              return null;
          }
          
          if (Array.isArray(data)) {
              for (const item of data) {
                  if (typeof item === 'object' && item !== null) {
                      // Check if this item has the path key
                      if (pathKey in item) {
                          const itemPath = item[pathKey];
                          // Check if any path segment matches this item's path
                          if (pathSegments.some(segment => segment === itemPath)) {
                              return item;
                          }
                      }
                      
                      // Recursively search nested objects
                      const found = findItemByPath(item, pathKey, pathSegments);
                      if (found) return found;
                  }
              }
          } else if (typeof data === 'object' && data !== null) {
              for (const key in data) {
                  const found = findItemByPath(data[key], pathKey, pathSegments);
                  if (found) return found;
              }
          }
          
          return null;
      }

      // Find the group that contains a specific item
      function findGroupContainingItem(data, targetItem) {
          if (Array.isArray(data)) {
              for (const item of data) {
                  if (typeof item === 'object' && item !== null) {
                      // Check if this is a group with items
                      if (item.group && Array.isArray(item.items)) {
                          // Check if the target item is in this group's items
                          if (item.items.includes(targetItem)) {
                              return item;
                          }
                      }
                      
                      // Recursively search in nested objects
                      const found = findGroupContainingItem(item, targetItem);
                      if (found) return found;
                  }
              }
          } else if (typeof data === 'object' && data !== null) {
              for (const key in data) {
                  const found = findGroupContainingItem(data[key], targetItem);
                  if (found) return found;
              }
          }
          
          return null;
      }

      // Add $x magic method
      Alpine.magic('x', () => {
          const pendingLoads = new Map();
          const store = Alpine.store('data');
          const accessCache = new Map(); // Cache for frequently accessed dataSources

          return new Proxy({}, {
              get(target, prop) {
                  // Handle special keys
                  if (prop === Symbol.iterator || prop === 'then' || prop === 'catch' || prop === 'finally') {
                      return undefined;
                  }

                  // Check access cache first for better performance
                  if (accessCache.has(prop)) {
                      return accessCache.get(prop);
                  }

                  // Get current value from store
                  const value = store[prop];
                  // Use HTML lang as source of truth, fallback to Alpine store, then 'en'
                  document.documentElement.lang || Alpine.store('locale')?.current || 'en';

                  // If not in store, try to load it
                  if (!value && !pendingLoads.has(prop)) {
                      // Wait a tick to ensure localization plugin has initialized
                      const loadPromise = new Promise(resolve => {
                          setTimeout(() => {
                              // Re-check locale after delay
                              const finalLocale = document.documentElement.lang || Alpine.store('locale')?.current || 'en';
                              resolve(loadDataSource(prop, finalLocale));
                          }, 0);
                      });
                      pendingLoads.set(prop, loadPromise);
                      
                      // Cache the loading proxy
                      const proxy = createLoadingProxy();
                      accessCache.set(prop, proxy);
                      
                      // Clear cache when loaded
                      loadPromise.finally(() => {
                          accessCache.delete(prop);
                          pendingLoads.delete(prop);
                      });
                      
                      return proxy;
                  }

                  // If we have a value, return a reactive proxy
                  if (value) {
                      return new Proxy(value, {
                          get(target, key) {
                              // Handle special keys
                              if (key === Symbol.iterator || key === 'then' || key === 'catch' || key === 'finally') {
                                  return undefined;
                              }

                              // Handle route() function for route-specific lookups
                              if (key === 'route') {
                                  return function(pathKey) {
                                      // Only create route proxy if we have valid data
                                      if (target && typeof target === 'object') {
                                          return createRouteProxy(target, pathKey);
                                      }
                                      // Return a safe fallback proxy
                                      return new Proxy({}, {
                                          get() { return undefined; }
                                      });
                                  };
                              }

                              // Handle toPrimitive for text content
                              if (key === Symbol.toPrimitive) {
                                  return function () { return ''; };
                              }

                              // Handle array-like behavior
                              if (Array.isArray(target)) {
                                  if (key === 'length') {
                                      return target.length;
                                  }
                                  // Handle numeric keys for array access
                                  if (typeof key === 'string' && !isNaN(Number(key))) {
                                      const index = Number(key);
                                      if (index >= 0 && index < target.length) {
                                          return createArrayItemProxy(target[index]);
                                      }
                                      return createLoadingProxy();
                                  }
                                  // Add essential array methods
                                  if (key === 'filter' || key === 'map' || key === 'find' || 
                                      key === 'findIndex' || key === 'some' || key === 'every' ||
                                      key === 'reduce' || key === 'forEach' || key === 'slice') {
                                      return target[key].bind(target);
                                  }
                              }

                              // Handle nested objects
                              const nestedValue = target[key];
                              if (nestedValue) {
                                  if (Array.isArray(nestedValue)) {
                                      return new Proxy(nestedValue, {
                                          get(target, nestedKey) {
                                              // Handle special keys
                                              if (nestedKey === Symbol.iterator || nestedKey === 'then' || nestedKey === 'catch' || nestedKey === 'finally') {
                                                  return undefined;
                                              }

                                              // Handle route() function for route-specific lookups on arrays
                                              if (nestedKey === 'route') {
                                                  return function(pathKey) {
                                                      // Only create route proxy if we have valid data
                                                      if (target && typeof target === 'object') {
                                                          // Get data source name from the first item's contentType metadata
                                                          return createRouteProxy(
                                                              target, 
                                                              pathKey, 
                                                              (Array.isArray(target) && target.length > 0 && target[0] && target[0].contentType) 
                                                                  ? target[0].contentType 
                                                                  : undefined
                                                          );
                                                      }
                                                      // Return a safe fallback proxy
                                                      return new Proxy({}, {
                                                          get() { return undefined; }
                                                      });
                                                  };
                                              }

                                              if (nestedKey === 'length') {
                                                  return target.length;
                                              }
                                              if (typeof nestedKey === 'string' && !isNaN(Number(nestedKey))) {
                                                  const index = Number(nestedKey);
                                                  if (index >= 0 && index < target.length) {
                                                      return createArrayItemProxy(target[index]);
                                                  }
                                                  return createLoadingProxy();
                                              }
                                              // Add essential array methods
                                              if (nestedKey === 'filter' || nestedKey === 'map' || nestedKey === 'find' || 
                                                  nestedKey === 'findIndex' || nestedKey === 'some' || nestedKey === 'every' ||
                                                  nestedKey === 'reduce' || nestedKey === 'forEach' || nestedKey === 'slice') {
                                                  return target[nestedKey].bind(target);
                                              }
                                              return createLoadingProxy();
                                          }
                                      });
                                  }
                                  // Only create proxy for objects, return primitives directly
                                  if (typeof nestedValue === 'object' && nestedValue !== null) {
                                      if (Array.isArray(nestedValue)) {
                                          // Handle nested arrays with route() function
                                          return new Proxy(nestedValue, {
                                              get(target, nestedKey) {
                                                  // Handle special keys
                                                  if (nestedKey === Symbol.iterator || nestedKey === 'then' || nestedKey === 'catch' || nestedKey === 'finally') {
                                                      return undefined;
                                                  }

                                                  // Handle route() function for route-specific lookups on nested arrays
                                                  if (nestedKey === 'route') {
                                                      return function(pathKey) {
                                                          // Only create route proxy if we have valid data
                                                          if (target && typeof target === 'object') {
                                                              // Get data source name from the first item's contentType metadata
                                                              return createRouteProxy(
                                                                  target, 
                                                                  pathKey, 
                                                                  (Array.isArray(target) && target.length > 0 && target[0] && target[0].contentType) 
                                                                      ? target[0].contentType 
                                                                      : undefined
                                                              );
                                                          }
                                                          // Return a safe fallback proxy
                                                          return new Proxy({}, {
                                                              get() { return undefined; }
                                                          });
                                                      };
                                                  }

                                                  if (nestedKey === 'length') {
                                                      return target.length;
                                                  }
                                                  if (typeof nestedKey === 'string' && !isNaN(Number(nestedKey))) {
                                                      const index = Number(nestedKey);
                                                      if (index >= 0 && index < target.length) {
                                                          return createArrayItemProxy(target[index]);
                                                      }
                                                      return createLoadingProxy();
                                                  }
                                                  // Add essential array methods
                                                  if (nestedKey === 'filter' || nestedKey === 'map' || nestedKey === 'find' || 
                                                      nestedKey === 'findIndex' || nestedKey === 'some' || nestedKey === 'every' ||
                                                      nestedKey === 'reduce' || nestedKey === 'forEach' || nestedKey === 'slice') {
                                                      return target[nestedKey].bind(target);
                                                  }
                                                  return createLoadingProxy();
                                              }
                                          });
                                      } else {
                                          // Handle nested objects
                                          return new Proxy(nestedValue, {
                                              get(target, nestedKey) {
                                                  // Handle toPrimitive for text content
                                                  if (nestedKey === Symbol.toPrimitive) {
                                                      return function () {
                                                          return target[nestedKey] || '';
                                                      };
                                                  }
                                                  return target[nestedKey];
                                              }
                                          });
                                      }
                                  }
                                  // Return primitive values directly (strings, numbers, booleans)
                                  return nestedValue;
                              }
                              return createLoadingProxy();
                          }
                      });
                  }

                  return createLoadingProxy();
              }
          });
      });

      // Initialize dataSources after magic method is registered
      if (isInitializing || initializationComplete) return;
      isInitializing = true;

      try {
          // Initialize store without loading all dataSources
          Alpine.store('data', {
              all: [],
              _initialized: true
          });

          // Data sources will be loaded on-demand when accessed via $x
      } finally {
          isInitializing = false;
          initializationComplete = true;
      }
  }

  // Handle both DOMContentLoaded and alpine:init
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
          if (window.Alpine) initializeDataSourcesPlugin();
      });
  }

  document.addEventListener('alpine:init', initializeDataSourcesPlugin);

  /* Indux Dropdowns */

  // Initialize plugin when either DOM is ready or Alpine is ready
  function initializeDropdownPlugin() {
      // Ensure Alpine.js context exists for directives to work
      function ensureAlpineContext() {
          const body = document.body;
          if (!body.hasAttribute('x-data')) {
              body.setAttribute('x-data', '{}');
          }
      }

      // Helper to register directives
      function registerDirective(name, handler) {
          Alpine.directive(name, handler);
      }

      // Ensure Alpine.js context exists
      ensureAlpineContext();

      // Register dropdown directive
      registerDirective('dropdown', (el, { modifiers, expression }, { effect, evaluateLater }) => {
          let menu;

          // Shared hover state for all dropdown types
          let hoverTimeout;
          let autoCloseTimeout;
          let startAutoCloseTimer;

          effect(() => {

              // Defer processing to ensure Alpine is fully ready
              setTimeout(() => {
                  if (!window.Alpine) {
                      console.warn('[Indux] Alpine not available for dropdown processing');
                      return;
                  }

                  // Generate a unique anchor code for positioning
                  const anchorCode = Math.random().toString(36).substr(2, 9);

                  // Evaluate the expression to get the actual menu ID
                  let dropdownId;
                  if (expression) {
                      // Check if expression contains template literals or is a static string
                      if (expression.includes('${') || expression.includes('`')) {
                          // Use evaluateLater for dynamic expressions
                          const evaluator = evaluateLater(expression);
                          evaluator(value => {
                              dropdownId = value;
                          });
                      } else {
                          // Static string - use as-is
                          dropdownId = expression;
                      }
                  } else {
                      dropdownId = `dropdown-${anchorCode}`;
                  }

                  // Check if expression refers to a template ID
                  if (dropdownId && document.getElementById(dropdownId)?.tagName === 'TEMPLATE') {
                      // Clone template content and generate unique ID
                      const template = document.getElementById(dropdownId);
                      menu = template.content.cloneNode(true).firstElementChild;
                      const uniqueDropdownId = `dropdown-${anchorCode}`;
                      menu.setAttribute('id', uniqueDropdownId);
                      document.body.appendChild(menu);
                      el.setAttribute('popovertarget', uniqueDropdownId);

                      // Initialize Alpine on the cloned menu
                      Alpine.initTree(menu);
                  } else {
                      // Original behavior for static dropdowns
                      menu = document.getElementById(dropdownId);
                      if (!menu) {
                          // Check if this might be a component-based dropdown
                          if (window.InduxComponentsRegistry && window.InduxComponentsLoader) {
                              // Try to find the menu in components
                              const componentName = dropdownId; // Assume the dropdownId is the component name
                              const registry = window.InduxComponentsRegistry;
                              
                              if (registry.registered.has(componentName)) {
                                  // Component exists, wait for it to be loaded
                                  const waitForComponent = async () => {
                                      const loader = window.InduxComponentsLoader;
                                      const content = await loader.loadComponent(componentName);
                                      if (content) {
                                          // Create a temporary container to parse the component
                                          const tempDiv = document.createElement('div');
                                          tempDiv.innerHTML = content.trim();
                                          const menuElement = tempDiv.querySelector(`#${dropdownId}`);
                                          
                                          if (menuElement) {
                                              // Clone the menu and append to body
                                              menu = menuElement.cloneNode(true);
                                              menu.setAttribute('id', dropdownId);
                                              document.body.appendChild(menu);
                                              el.setAttribute('popovertarget', dropdownId);
                                              
                                              // Initialize Alpine on the menu
                                              Alpine.initTree(menu);
                                              
                                              // Set up the dropdown after menu is ready
                                              setupDropdown();
                                          } else {
                                              console.warn(`[Indux] Menu with id "${dropdownId}" not found in component "${componentName}"`);
                                          }
                                      } else {
                                          console.warn(`[Indux] Failed to load component "${componentName}" for dropdown`);
                                      }
                                  };
                                  
                                  // Wait for components to be ready, then try to load
                                  if (window.__induxComponentsInitialized) {
                                      waitForComponent();
                                  } else {
                                      window.addEventListener('indux:components-ready', waitForComponent);
                                  }
                                  return; // Exit early, setup will happen in waitForComponent
                              }
                          }
                          
                          console.warn(`[Indux] Dropdown menu with id "${dropdownId}" not found`);
                          return;
                      }
                      el.setAttribute('popovertarget', dropdownId);
                  }

                  // Set up the dropdown
                  setupDropdown();

                  function setupDropdown() {
                      if (!menu) return;
                      
                      // Set up popover
                      menu.setAttribute('popover', '');

                      // Set up anchor positioning
                      const anchorName = `--dropdown-${anchorCode}`;
                      el.style.setProperty('anchor-name', anchorName);
                      menu.style.setProperty('position-anchor', anchorName);

                      // Set up hover functionality after menu is ready
                      if (modifiers.includes('hover')) {
                      const handleShowPopover = () => {
                          if (menu && !menu.matches(':popover-open')) {
                              clearTimeout(hoverTimeout);
                              clearTimeout(autoCloseTimeout);
                              
                              menu.showPopover();
                          }
                      };

                      // Enhanced auto-close when mouse leaves both trigger and menu
                      startAutoCloseTimer = () => {
                          clearTimeout(autoCloseTimeout);
                          autoCloseTimeout = setTimeout(() => {
                              if (menu?.matches(':popover-open')) {
                                  const isOverButton = el.matches(':hover');
                                  const isOverMenu = menu.matches(':hover');
                                  
                                  if (!isOverButton && !isOverMenu) {
                                      menu.hidePopover();
                                  }
                              }
                          }, 300); // Small delay to prevent accidental closes
                      };

                      el.addEventListener('mouseenter', handleShowPopover);
                      el.addEventListener('mouseleave', startAutoCloseTimer);
                  }



                  // Add keyboard navigation handling
                  menu.addEventListener('keydown', (e) => {
                      // Get all navigable elements (traditional focusable + li elements)
                      const allElements = menu.querySelectorAll(
                          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), li'
                      );
                      const currentIndex = Array.from(allElements).indexOf(e.target);

                      if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          const nextIndex = (currentIndex + 1) % allElements.length;
                          const nextElement = allElements[nextIndex];
                          if (nextElement.tagName === 'LI') {
                              nextElement.setAttribute('tabindex', '0');
                          }
                          nextElement.focus();
                      } else if (e.key === 'ArrowUp') {
                          e.preventDefault();
                          const prevIndex = (currentIndex - 1 + allElements.length) % allElements.length;
                          const prevElement = allElements[prevIndex];
                          if (prevElement.tagName === 'LI') {
                              prevElement.setAttribute('tabindex', '0');
                          }
                          prevElement.focus();
                      } else if (e.key === 'Tab') {
                          // Get only traditional focusable elements for tab navigation
                          const focusable = menu.querySelectorAll(
                              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                          );

                          // If we're on the last focusable element and tabbing forward
                          if (!e.shiftKey && e.target === focusable[focusable.length - 1]) {
                              e.preventDefault();
                              menu.hidePopover();
                              // Focus the next focusable element after the dropdown trigger
                              const allFocusable = document.querySelectorAll(
                                  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                              );
                              const triggerIndex = Array.from(allFocusable).indexOf(el);
                              const nextElement = allFocusable[triggerIndex + 1];
                              if (nextElement) nextElement.focus();
                          }

                          // If we're on the first element and tabbing backward
                          if (e.shiftKey && e.target === focusable[0]) {
                              menu.hidePopover();
                          }
                      } else if (e.key === 'Escape') {
                          menu.hidePopover();
                          el.focus();
                      } else if (e.key === 'Enter' || e.key === ' ') {
                          // Allow Enter/Space to activate li elements or follow links
                          if (e.target.tagName === 'LI') {
                              const link = e.target.querySelector('a');
                              if (link) {
                                  e.preventDefault();
                                  link.click();
                              }
                          }
                      }
                  });

                  // Make li elements focusable when menu opens
                  menu.addEventListener('toggle', (e) => {
                      if (e.newState === 'open') {
                          // Set up li elements for keyboard navigation
                          const liElements = menu.querySelectorAll('li');
                          liElements.forEach((li, index) => {
                              if (!li.hasAttribute('tabindex')) {
                                  li.setAttribute('tabindex', '-1');
                              }
                              // Focus first li element if no other focusable elements
                              if (index === 0 && !menu.querySelector('button, [href], input, select, textarea, [tabindex="0"]')) {
                                  li.setAttribute('tabindex', '0');
                                  li.focus();
                              }
                          });
                      }
                  });

                  // Add hover functionality for menu
                  if (modifiers.includes('hover')) {
                      // Simple approach: any mouse activity in the menu area cancels close timer
                      menu.addEventListener('mouseenter', () => {
                          clearTimeout(autoCloseTimeout);
                          clearTimeout(hoverTimeout);
                      });

                      menu.addEventListener('mouseleave', () => {
                          // Always start timer when leaving menu bounds
                          if (startAutoCloseTimer) {
                              startAutoCloseTimer();
                          }
                      });

                      // Add event listeners to all interactive elements inside menu to cancel timers
                      const cancelCloseTimer = () => {
                          clearTimeout(autoCloseTimeout);
                      };

                      // Set up listeners on existing menu items
                      const setupMenuItemListeners = () => {
                          const menuItems = menu.querySelectorAll('li, button, a, [role="menuitem"]');
                          menuItems.forEach(item => {
                              item.addEventListener('mouseenter', cancelCloseTimer);
                          });
                      };

                      // Setup listeners after a brief delay to ensure menu is rendered
                      setTimeout(setupMenuItemListeners, 10);
                  }
                  } // End of setupDropdown function
              });
          });
      });
  }

  // Handle both DOMContentLoaded and alpine:init
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
          if (window.Alpine) {
              initializeDropdownPlugin();
          } else {
              // Wait for Alpine to be available
              document.addEventListener('alpine:init', initializeDropdownPlugin);
          }
      });
  } else {
      // DOM is already loaded
      if (window.Alpine) {
          initializeDropdownPlugin();
      } else {
          // Wait for Alpine to be available
          document.addEventListener('alpine:init', initializeDropdownPlugin);
      }
  }

  // Also listen for alpine:init as a backup
  document.addEventListener('alpine:init', initializeDropdownPlugin);

  // Handle dialog interactions - close dropdowns when dialogs open
  document.addEventListener('click', (event) => {
      const button = event.target.closest('button[popovertarget]');
      if (!button) return;
      
      const targetId = button.getAttribute('popovertarget');
      const target = document.getElementById(targetId);
      
      if (target && target.tagName === 'DIALOG' && target.hasAttribute('popover')) {
          // Close dropdowns BEFORE the dialog opens to avoid conflicts
          const openDropdowns = document.querySelectorAll('menu[popover]:popover-open');
          
          openDropdowns.forEach(dropdown => {
              if (!target.contains(dropdown)) {
                  dropdown.hidePopover();
              }
          });
      }
  });

  var indux_icons = {};

  /* Iconify v3.1.1 */

  var hasRequiredIndux_icons;

  function requireIndux_icons () {
  	if (hasRequiredIndux_icons) return indux_icons;
  	hasRequiredIndux_icons = 1;
  	(function (exports) {
  		var Iconify = function (t) { const e = Object.freeze({ left: 0, top: 0, width: 16, height: 16 }), n = Object.freeze({ rotate: 0, vFlip: false, hFlip: false }), o = Object.freeze({ ...e, ...n }), r = Object.freeze({ ...o, body: "", hidden: false }); function i(t, e) { const o = function (t, e) { const n = {}; !t.hFlip != !e.hFlip && (n.hFlip = true), !t.vFlip != !e.vFlip && (n.vFlip = true); const o = ((t.rotate || 0) + (e.rotate || 0)) % 4; return o && (n.rotate = o), n }(t, e); for (const i in r) i in n ? i in t && !(i in o) && (o[i] = n[i]) : i in e ? o[i] = e[i] : i in t && (o[i] = t[i]); return o } function c(t, e, n) { const o = t.icons, r = t.aliases || Object.create(null); let c = {}; function s(t) { c = i(o[t] || r[t], c); } return s(e), n.forEach(s), i(t, c) } function s(t, e) { const n = []; if ("object" != typeof t || "object" != typeof t.icons) return n; t.not_found instanceof Array && t.not_found.forEach((t => { e(t, null), n.push(t); })); const o = function (t, e) { const n = t.icons, o = t.aliases || Object.create(null), r = Object.create(null); return (Object.keys(n).concat(Object.keys(o))).forEach((function t(e) { if (n[e]) return r[e] = []; if (!(e in r)) { r[e] = null; const n = o[e] && o[e].parent, i = n && t(n); i && (r[e] = [n].concat(i)); } return r[e] })), r }(t); for (const r in o) { const i = o[r]; i && (e(r, c(t, r, i)), n.push(r)); } return n } const a = /^[a-z0-9]+(-[a-z0-9]+)*$/, u = (t, e, n, o = "") => { const r = t.split(":"); if ("@" === t.slice(0, 1)) { if (r.length < 2 || r.length > 3) return null; o = r.shift().slice(1); } if (r.length > 3 || !r.length) return null; if (r.length > 1) { const t = r.pop(), n = r.pop(), i = { provider: r.length > 0 ? r[0] : o, prefix: n, name: t }; return e && !f(i) ? null : i } const i = r[0], c = i.split("-"); if (c.length > 1) { const t = { provider: o, prefix: c.shift(), name: c.join("-") }; return e && !f(t) ? null : t } if (n && "" === o) { const t = { provider: o, prefix: "", name: i }; return e && !f(t, n) ? null : t } return null }, f = (t, e) => !!t && !("" !== t.provider && !t.provider.match(a) || !(e && "" === t.prefix || t.prefix.match(a)) || !t.name.match(a)), l = { provider: "", aliases: {}, not_found: {}, ...e }; function d(t, e) { for (const n in e) if (n in t && typeof t[n] != typeof e[n]) return false; return true } function p(t) { if ("object" != typeof t || null === t) return null; const e = t; if ("string" != typeof e.prefix || !t.icons || "object" != typeof t.icons) return null; if (!d(t, l)) return null; const n = e.icons; for (const t in n) { const e = n[t]; if (!t.match(a) || "string" != typeof e.body || !d(e, r)) return null } const o = e.aliases || Object.create(null); for (const t in o) { const e = o[t], i = e.parent; if (!t.match(a) || "string" != typeof i || !n[i] && !o[i] || !d(e, r)) return null } return e } const h = Object.create(null); function g(t, e) { const n = h[t] || (h[t] = Object.create(null)); return n[e] || (n[e] = function (t, e) { return { provider: t, prefix: e, icons: Object.create(null), missing: new Set } }(t, e)) } function m(t, e) { return p(e) ? s(e, ((e, n) => { n ? t.icons[e] = n : t.missing.add(e); })) : [] } function y(t, e) { let n = []; return ("string" == typeof t ? [t] : Object.keys(h)).forEach((t => { ("string" == typeof t && "string" == typeof e ? [e] : Object.keys(h[t] || {})).forEach((e => { const o = g(t, e); n = n.concat(Object.keys(o.icons).map((n => ("" !== t ? "@" + t + ":" : "") + e + ":" + n))); })); })), n } let b = false; function v(t) { const e = "string" == typeof t ? u(t, true, b) : t; if (e) { const t = g(e.provider, e.prefix), n = e.name; return t.icons[n] || (t.missing.has(n) ? null : void 0) } } function x(t, e) { const n = u(t, true, b); if (!n) return false; return function (t, e, n) { try { if ("string" == typeof n.body) return t.icons[e] = { ...n }, !0 } catch (t) { } return false }(g(n.provider, n.prefix), n.name, e) } function w(t, e) { if ("object" != typeof t) return false; if ("string" != typeof e && (e = t.provider || ""), b) ; const n = t.prefix; if (!f({ provider: e, prefix: n, name: "a" })) return false; return !!m(g(e, n), t) } function S(t) { return !!v(t) } function j(t) { const e = v(t); return e ? { ...o, ...e } : null } const E = Object.freeze({ width: null, height: null }), I = Object.freeze({ ...E, ...n }), O = /(-?[0-9.]*[0-9]+[0-9.]*)/g, k = /^-?[0-9.]*[0-9]+[0-9.]*$/g; function C(t, e, n) { if (1 === e) return t; if (n = n || 100, "number" == typeof t) return Math.ceil(t * e * n) / n; if ("string" != typeof t) return t; const o = t.split(O); if (null === o || !o.length) return t; const r = []; let i = o.shift(), c = k.test(i); for (; ;) { if (c) { const t = parseFloat(i); isNaN(t) ? r.push(i) : r.push(Math.ceil(t * e * n) / n); } else r.push(i); if (i = o.shift(), void 0 === i) return r.join(""); c = !c; } } const M = t => "unset" === t || "undefined" === t || "none" === t; function T(t, e) { const n = { ...o, ...t }, r = { ...I, ...e }, i = { left: n.left, top: n.top, width: n.width, height: n.height }; let c = n.body;[n, r].forEach((t => { const e = [], n = t.hFlip, o = t.vFlip; let r, s = t.rotate; switch (n ? o ? s += 2 : (e.push("translate(" + (i.width + i.left).toString() + " " + (0 - i.top).toString() + ")"), e.push("scale(-1 1)"), i.top = i.left = 0) : o && (e.push("translate(" + (0 - i.left).toString() + " " + (i.height + i.top).toString() + ")"), e.push("scale(1 -1)"), i.top = i.left = 0), s < 0 && (s -= 4 * Math.floor(s / 4)), s %= 4, s) { case 1: r = i.height / 2 + i.top, e.unshift("rotate(90 " + r.toString() + " " + r.toString() + ")"); break; case 2: e.unshift("rotate(180 " + (i.width / 2 + i.left).toString() + " " + (i.height / 2 + i.top).toString() + ")"); break; case 3: r = i.width / 2 + i.left, e.unshift("rotate(-90 " + r.toString() + " " + r.toString() + ")"); }s % 2 == 1 && (i.left !== i.top && (r = i.left, i.left = i.top, i.top = r), i.width !== i.height && (r = i.width, i.width = i.height, i.height = r)), e.length && (c = '<g transform="' + e.join(" ") + '">' + c + "</g>"); })); const s = r.width, a = r.height, u = i.width, f = i.height; let l, d; null === s ? (d = null === a ? "1em" : "auto" === a ? f : a, l = C(d, u / f)) : (l = "auto" === s ? u : s, d = null === a ? C(l, f / u) : "auto" === a ? f : a); const p = {}, h = (t, e) => { M(e) || (p[t] = e.toString()); }; return h("width", l), h("height", d), p.viewBox = i.left.toString() + " " + i.top.toString() + " " + u.toString() + " " + f.toString(), { attributes: p, body: c } } const L = /\sid="(\S+)"/g, A = "IconifyId" + Date.now().toString(16) + (16777216 * Math.random() | 0).toString(16); let F = 0; function P(t, e = A) { const n = []; let o; for (; o = L.exec(t);)n.push(o[1]); if (!n.length) return t; const r = "suffix" + (16777216 * Math.random() | Date.now()).toString(16); return n.forEach((n => { const o = "function" == typeof e ? e(n) : e + (F++).toString(), i = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); t = t.replace(new RegExp('([#;"])(' + i + ')([")]|\\.[a-z])', "g"), "$1" + o + r + "$3"); })), t = t.replace(new RegExp(r, "g"), "") } const N = { local: true, session: true }, z = { local: new Set, session: new Set }; let _ = false; const D = "iconify2", R = "iconify", $ = R + "-count", q = R + "-version", H = 36e5, U = 168; function V(t, e) { try { return t.getItem(e) } catch (t) { } } function Q(t, e, n) { try { return t.setItem(e, n), !0 } catch (t) { } } function G(t, e) { try { t.removeItem(e); } catch (t) { } } function J(t, e) { return Q(t, $, e.toString()) } function B(t) { return parseInt(V(t, $)) || 0 } let K = "undefined" == typeof window ? {} : window; function W(t) { const e = t + "Storage"; try { if (K && K[e] && "number" == typeof K[e].length) return K[e] } catch (t) { } N[t] = false; } function X(t, e) { const n = W(t); if (!n) return; const o = V(n, q); if (o !== D) { if (o) { const t = B(n); for (let e = 0; e < t; e++)G(n, R + e.toString()); } return Q(n, q, D), void J(n, 0) } const r = Math.floor(Date.now() / H) - U, i = t => { const o = R + t.toString(), i = V(n, o); if ("string" == typeof i) { try { const n = JSON.parse(i); if ("object" == typeof n && "number" == typeof n.cached && n.cached > r && "string" == typeof n.provider && "object" == typeof n.data && "string" == typeof n.data.prefix && e(n, t)) return !0 } catch (t) { } G(n, o); } }; let c = B(n); for (let e = c - 1; e >= 0; e--)i(e) || (e === c - 1 ? (c--, J(n, c)) : z[t].add(e)); } function Y() { if (!_) { _ = true; for (const t in N) X(t, (t => { const e = t.data, n = g(t.provider, e.prefix); if (!m(n, e).length) return !1; const o = e.lastModified || -1; return n.lastModifiedCached = n.lastModifiedCached ? Math.min(n.lastModifiedCached, o) : o, !0 })); } } function Z(t, e) { switch (t) { case "local": case "session": N[t] = e; break; case "all": for (const t in N) N[t] = e; } } const tt = Object.create(null); function et(t, e) { tt[t] = e; } function nt(t) { return tt[t] || tt[""] } function ot(t) { let e; if ("string" == typeof t.resources) e = [t.resources]; else if (e = t.resources, !(e instanceof Array && e.length)) return null; return { resources: e, path: t.path || "/", maxURL: t.maxURL || 500, rotate: t.rotate || 750, timeout: t.timeout || 5e3, random: true === t.random, index: t.index || 0, dataAfterTimeout: false !== t.dataAfterTimeout } } const rt = Object.create(null), it = ["https://api.simplesvg.com", "https://api.unisvg.com"], ct = []; for (; it.length > 0;)1 === it.length || Math.random() > .5 ? ct.push(it.shift()) : ct.push(it.pop()); function st(t, e) { const n = ot(e); return null !== n && (rt[t] = n, true) } function at(t) { return rt[t] } rt[""] = ot({ resources: ["https://api.iconify.design"].concat(ct) }); let ut = (() => { let t; try { if (t = fetch, "function" == typeof t) return t } catch (t) { } })(); const ft = { prepare: (t, e, n) => { const o = [], r = function (t, e) { const n = at(t); if (!n) return 0; let o; if (n.maxURL) { let t = 0; n.resources.forEach((e => { const n = e; t = Math.max(t, n.length); })); const r = e + ".json?icons="; o = n.maxURL - t - n.path.length - r.length; } else o = 0; return o }(t, e), i = "icons"; let c = { type: i, provider: t, prefix: e, icons: [] }, s = 0; return n.forEach(((n, a) => { s += n.length + 1, s >= r && a > 0 && (o.push(c), c = { type: i, provider: t, prefix: e, icons: [] }, s = n.length), c.icons.push(n); })), o.push(c), o }, send: (t, e, n) => { if (!ut) return void n("abort", 424); let o = function (t) { if ("string" == typeof t) { const e = at(t); if (e) return e.path } return "/" }(e.provider); switch (e.type) { case "icons": { const t = e.prefix, n = e.icons.join(","); o += t + ".json?" + new URLSearchParams({ icons: n }).toString(); break } case "custom": { const t = e.uri; o += "/" === t.slice(0, 1) ? t.slice(1) : t; break } default: return void n("abort", 400) }let r = 503; ut(t + o).then((t => { const e = t.status; if (200 === e) return r = 501, t.json(); setTimeout((() => { n(function (t) { return 404 === t }(e) ? "abort" : "next", e); })); })).then((t => { "object" == typeof t && null !== t ? setTimeout((() => { n("success", t); })) : setTimeout((() => { 404 === t ? n("abort", t) : n("next", r); })); })).catch((() => { n("next", r); })); } }; function lt(t, e) { t.forEach((t => { const n = t.loaderCallbacks; n && (t.loaderCallbacks = n.filter((t => t.id !== e))); })); } let dt = 0; var pt = { resources: [], index: 0, timeout: 2e3, rotate: 750, random: false, dataAfterTimeout: false }; function ht(t, e, n, o) { const r = t.resources.length, i = t.random ? Math.floor(Math.random() * r) : t.index; let c; if (t.random) { let e = t.resources.slice(0); for (c = []; e.length > 1;) { const t = Math.floor(Math.random() * e.length); c.push(e[t]), e = e.slice(0, t).concat(e.slice(t + 1)); } c = c.concat(e); } else c = t.resources.slice(i).concat(t.resources.slice(0, i)); const s = Date.now(); let a, u = "pending", f = 0, l = null, d = [], p = []; function h() { l && (clearTimeout(l), l = null); } function g() { "pending" === u && (u = "aborted"), h(), d.forEach((t => { "pending" === t.status && (t.status = "aborted"); })), d = []; } function m(t, e) { e && (p = []), "function" == typeof t && p.push(t); } function y() { u = "failed", p.forEach((t => { t(void 0, a); })); } function b() { d.forEach((t => { "pending" === t.status && (t.status = "aborted"); })), d = []; } function v() { if ("pending" !== u) return; h(); const o = c.shift(); if (void 0 === o) return d.length ? void (l = setTimeout((() => { h(), "pending" === u && (b(), y()); }), t.timeout)) : void y(); const r = { status: "pending", resource: o, callback: (e, n) => { !function (e, n, o) { const r = "success" !== n; switch (d = d.filter((t => t !== e)), u) { case "pending": break; case "failed": if (r || !t.dataAfterTimeout) return; break; default: return }if ("abort" === n) return a = o, void y(); if (r) return a = o, void (d.length || (c.length ? v() : y())); if (h(), b(), !t.random) { const n = t.resources.indexOf(e.resource); -1 !== n && n !== t.index && (t.index = n); } u = "completed", p.forEach((t => { t(o); })); }(r, e, n); } }; d.push(r), f++, l = setTimeout(v, t.rotate), n(o, e, r.callback); } return "function" == typeof o && p.push(o), setTimeout(v), function () { return { startTime: s, payload: e, status: u, queriesSent: f, queriesPending: d.length, subscribe: m, abort: g } } } function gt(t) { const e = { ...pt, ...t }; let n = []; function o() { n = n.filter((t => "pending" === t().status)); } const r = { query: function (t, r, i) { const c = ht(e, t, r, ((t, e) => { o(), i && i(t, e); })); return n.push(c), c }, find: function (t) { return n.find((e => t(e))) || null }, setIndex: t => { e.index = t; }, getIndex: () => e.index, cleanup: o }; return r } function mt() { } const yt = Object.create(null); function bt(t, e, n) { let o, r; if ("string" == typeof t) { const e = nt(t); if (!e) return n(void 0, 424), mt; r = e.send; const i = function (t) { if (!yt[t]) { const e = at(t); if (!e) return; const n = { config: e, redundancy: gt(e) }; yt[t] = n; } return yt[t] }(t); i && (o = i.redundancy); } else { const e = ot(t); if (e) { o = gt(e); const n = nt(t.resources ? t.resources[0] : ""); n && (r = n.send); } } return o && r ? o.query(e, r, n)().abort : (n(void 0, 424), mt) } function vt(t, e) { function n(n) { let o; if (!N[n] || !(o = W(n))) return; const r = z[n]; let i; if (r.size) r.delete(i = Array.from(r).shift()); else if (i = B(o), !J(o, i + 1)) return; const c = { cached: Math.floor(Date.now() / H), provider: t.provider, data: e }; return Q(o, R + i.toString(), JSON.stringify(c)) } _ || Y(), e.lastModified && !function (t, e) { const n = t.lastModifiedCached; if (n && n >= e) return n === e; if (t.lastModifiedCached = e, n) for (const n in N) X(n, (n => { const o = n.data; return n.provider !== t.provider || o.prefix !== t.prefix || o.lastModified === e })); return true }(t, e.lastModified) || Object.keys(e.icons).length && (e.not_found && delete (e = Object.assign({}, e)).not_found, n("local") || n("session")); } function xt() { } function wt(t) { t.iconsLoaderFlag || (t.iconsLoaderFlag = true, setTimeout((() => { t.iconsLoaderFlag = false, function (t) { t.pendingCallbacksFlag || (t.pendingCallbacksFlag = true, setTimeout((() => { t.pendingCallbacksFlag = false; const e = t.loaderCallbacks ? t.loaderCallbacks.slice(0) : []; if (!e.length) return; let n = false; const o = t.provider, r = t.prefix; e.forEach((e => { const i = e.icons, c = i.pending.length; i.pending = i.pending.filter((e => { if (e.prefix !== r) return true; const c = e.name; if (t.icons[c]) i.loaded.push({ provider: o, prefix: r, name: c }); else { if (!t.missing.has(c)) return n = true, true; i.missing.push({ provider: o, prefix: r, name: c }); } return false })), i.pending.length !== c && (n || lt([t], e.id), e.callback(i.loaded.slice(0), i.missing.slice(0), i.pending.slice(0), e.abort)); })); }))); }(t); }))); } const St = t => { const e = g(t.provider, t.prefix).pendingIcons; return !(!e || !e.has(t.name)) }, jt = (t, e) => { const o = function (t) { const e = { loaded: [], missing: [], pending: [] }, n = Object.create(null); t.sort(((t, e) => t.provider !== e.provider ? t.provider.localeCompare(e.provider) : t.prefix !== e.prefix ? t.prefix.localeCompare(e.prefix) : t.name.localeCompare(e.name))); let o = { provider: "", prefix: "", name: "" }; return t.forEach((t => { if (o.name === t.name && o.prefix === t.prefix && o.provider === t.provider) return; o = t; const r = t.provider, i = t.prefix, c = t.name, s = n[r] || (n[r] = Object.create(null)), a = s[i] || (s[i] = g(r, i)); let u; u = c in a.icons ? e.loaded : "" === i || a.missing.has(c) ? e.missing : e.pending; const f = { provider: r, prefix: i, name: c }; u.push(f); })), e }(function (t, e = true, n = false) { const o = []; return t.forEach((t => { const r = "string" == typeof t ? u(t, e, n) : t; r && o.push(r); })), o }(t, true, (b))); if (!o.pending.length) { let t = true; return e && setTimeout((() => { t && e(o.loaded, o.missing, o.pending, xt); })), () => { t = false; } } const r = Object.create(null), i = []; let c, s; return o.pending.forEach((t => { const { provider: e, prefix: n } = t; if (n === s && e === c) return; c = e, s = n, i.push(g(e, n)); const o = r[e] || (r[e] = Object.create(null)); o[n] || (o[n] = []); })), o.pending.forEach((t => { const { provider: e, prefix: n, name: o } = t, i = g(e, n), c = i.pendingIcons || (i.pendingIcons = new Set); c.has(o) || (c.add(o), r[e][n].push(o)); })), i.forEach((t => { const { provider: e, prefix: n } = t; r[e][n].length && function (t, e) { t.iconsToLoad ? t.iconsToLoad = t.iconsToLoad.concat(e).sort() : t.iconsToLoad = e, t.iconsQueueFlag || (t.iconsQueueFlag = true, setTimeout((() => { t.iconsQueueFlag = false; const { provider: e, prefix: n } = t, o = t.iconsToLoad; let r; delete t.iconsToLoad, o && (r = nt(e)) && r.prepare(e, n, o).forEach((n => { bt(e, n, (e => { if ("object" != typeof e) n.icons.forEach((e => { t.missing.add(e); })); else try { const n = m(t, e); if (!n.length) return; const o = t.pendingIcons; o && n.forEach((t => { o.delete(t); })), vt(t, e); } catch (t) { console.error(t); } wt(t); })); })); }))); }(t, r[e][n]); })), e ? function (t, e, n) { const o = dt++, r = lt.bind(null, n, o); if (!e.pending.length) return r; const i = { id: o, icons: e, callback: t, abort: r }; return n.forEach((t => { (t.loaderCallbacks || (t.loaderCallbacks = [])).push(i); })), r }(e, o, i) : xt }, Et = t => new Promise(((e, n) => { const r = "string" == typeof t ? u(t, true) : t; r ? jt([r || t], (i => { if (i.length && r) { const t = v(r); if (t) return void e({ ...o, ...t }) } n(t); })) : n(t); })); function It(t, e) { const n = { ...t }; for (const t in e) { const o = e[t], r = typeof o; t in E ? (null === o || o && ("string" === r || "number" === r)) && (n[t] = o) : r === typeof n[t] && (n[t] = "rotate" === t ? o % 4 : o); } return n } const Ot = { ...I, inline: false }, kt = "iconify", Ct = "iconify-inline", Mt = "iconifyData" + Date.now(); let Tt = []; function Lt(t) { for (let e = 0; e < Tt.length; e++) { const n = Tt[e]; if (("function" == typeof n.node ? n.node() : n.node) === t) return n } } function At(t, e = false) { let n = Lt(t); return n ? (n.temporary && (n.temporary = e), n) : (n = { node: t, temporary: e }, Tt.push(n), n) } function Ft() { return Tt } let Pt = null; const Nt = { childList: true, subtree: true, attributes: true }; function zt(t) { if (!t.observer) return; const e = t.observer; e.pendingScan || (e.pendingScan = setTimeout((() => { delete e.pendingScan, Pt && Pt(t); }))); } function _t(t, e) { if (!t.observer) return; const n = t.observer; if (!n.pendingScan) for (let o = 0; o < e.length; o++) { const r = e[o]; if (r.addedNodes && r.addedNodes.length > 0 || "attributes" === r.type && void 0 !== r.target[Mt]) return void (n.paused || zt(t)) } } function Dt(t, e) { t.observer.instance.observe(e, Nt); } function Rt(t) { let e = t.observer; if (e && e.instance) return; const n = "function" == typeof t.node ? t.node() : t.node; n && window && (e || (e = { paused: 0 }, t.observer = e), e.instance = new window.MutationObserver(_t.bind(null, t)), Dt(t, n), e.paused || zt(t)); } function $t() { Ft().forEach(Rt); } function qt(t) { if (!t.observer) return; const e = t.observer; e.pendingScan && (clearTimeout(e.pendingScan), delete e.pendingScan), e.instance && (e.instance.disconnect(), delete e.instance); } function Ht(t) { const e = null !== Pt; Pt !== t && (Pt = t, e && Ft().forEach(qt)), e ? $t() : function (t) { const e = document; e.readyState && "loading" !== e.readyState ? t() : e.addEventListener("DOMContentLoaded", t); }($t); } function Ut(t) { (t ? [t] : Ft()).forEach((t => { if (!t.observer) return void (t.observer = { paused: 1 }); const e = t.observer; if (e.paused++, e.paused > 1 || !e.instance) return; e.instance.disconnect(); })); } function Vt(t) { if (t) { const e = Lt(t); e && Ut(e); } else Ut(); } function Qt(t) { (t ? [t] : Ft()).forEach((t => { if (!t.observer) return void Rt(t); const e = t.observer; if (e.paused && (e.paused--, !e.paused)) { const n = "function" == typeof t.node ? t.node() : t.node; if (!n) return; e.instance ? Dt(t, n) : Rt(t); } })); } function Gt(t) { if (t) { const e = Lt(t); e && Qt(e); } else Qt(); } function Jt(t, e = false) { const n = At(t, e); return Rt(n), n } function Bt(t) { const e = Lt(t); e && (qt(e), function (t) { Tt = Tt.filter((e => t !== e && t !== ("function" == typeof e.node ? e.node() : e.node))); }(t)); } const Kt = /[\s,]+/; const Wt = ["width", "height"], Xt = ["inline", "hFlip", "vFlip"]; function Yt(t) { const e = t.getAttribute("data-icon"), n = "string" == typeof e && u(e, true); if (!n) return null; const o = { ...Ot, inline: t.classList && t.classList.contains(Ct) }; Wt.forEach((e => { const n = t.getAttribute("data-" + e); n && (o[e] = n); })); const r = t.getAttribute("data-rotate"); "string" == typeof r && (o.rotate = function (t, e = 0) { const n = t.replace(/^-?[0-9.]*/, ""); function o(t) { for (; t < 0;)t += 4; return t % 4 } if ("" === n) { const e = parseInt(t); return isNaN(e) ? 0 : o(e) } if (n !== t) { let e = 0; switch (n) { case "%": e = 25; break; case "deg": e = 90; }if (e) { let r = parseFloat(t.slice(0, t.length - n.length)); return isNaN(r) ? 0 : (r /= e, r % 1 == 0 ? o(r) : 0) } } return e }(r)); const i = t.getAttribute("data-flip"); "string" == typeof i && function (t, e) { e.split(Kt).forEach((e => { switch (e.trim()) { case "horizontal": t.hFlip = true; break; case "vertical": t.vFlip = true; } })); }(o, i), Xt.forEach((e => { const n = "data-" + e, r = function (t, e) { return t === e || "true" === t || "" !== t && "false" !== t && null }(t.getAttribute(n), n); "boolean" == typeof r && (o[e] = r); })); const c = t.getAttribute("data-mode"); return { name: e, icon: n, customisations: o, mode: c } } const Zt = "svg." + kt + ", i." + kt + ", span." + kt + ", i." + Ct + ", span." + Ct; function te(t, e) { let n = -1 === t.indexOf("xlink:") ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"'; for (const t in e) n += " " + t + '="' + e[t] + '"'; return '<svg xmlns="http://www.w3.org/2000/svg"' + n + ">" + t + "</svg>" } let ee; function ne(t) { return void 0 === ee && function () { try { ee = window.trustedTypes.createPolicy("iconify", { createHTML: t => t }); } catch (t) { ee = null; } }(), ee ? ee.createHTML(t) : t } function oe(t) { const e = new Set(["iconify"]); return ["provider", "prefix"].forEach((n => { t[n] && e.add("iconify--" + t[n]); })), e } function re(t, e, n, o) { const r = t.classList; if (o) { const t = o.classList; Array.from(t).forEach((t => { r.add(t); })); } const i = []; return e.forEach((t => { r.contains(t) ? n.has(t) && i.push(t) : (r.add(t), i.push(t)); })), n.forEach((t => { e.has(t) || r.remove(t); })), i } function ie(t, e, n) { const o = t.style; (n || []).forEach((t => { o.removeProperty(t); })); const r = []; for (const t in e) o.getPropertyValue(t) || (r.push(t), o.setProperty(t, e[t])); return r } function ce(t, e, n) { let o; try { o = document.createElement("span"); } catch (e) { return t } const r = e.customisations, i = T(n, r), c = t[Mt], s = te(P(i.body), { "aria-hidden": "true", role: "img", ...i.attributes }); o.innerHTML = ne(s); const a = o.childNodes[0], u = t.attributes; for (let t = 0; t < u.length; t++) { const e = u.item(t), n = e.name; "class" === n || a.hasAttribute(n) || a.setAttribute(n, e.value); } const f = re(a, oe(e.icon), new Set(c && c.addedClasses), t), l = ie(a, r.inline ? { "vertical-align": "-0.125em" } : {}, c && c.addedStyles), d = { ...e, status: "loaded", addedClasses: f, addedStyles: l }; return a[Mt] = d, t.parentNode && t.parentNode.replaceChild(a, t), a } const se = { display: "inline-block" }, ae = { "background-color": "currentColor" }, ue = { "background-color": "transparent" }, fe = { image: "var(--svg)", repeat: "no-repeat", size: "100% 100%" }, le = { "-webkit-mask": ae, mask: ae, background: ue }; for (const t in le) { const e = le[t]; for (const n in fe) e[t + "-" + n] = fe[n]; } function de(t) { return t + (t.match(/^[-0-9.]+$/) ? "px" : "") } let pe = false; function he() { pe || (pe = true, setTimeout((() => { pe && (pe = false, ge()); }))); } function ge(t, e = false) { const n = Object.create(null); function r(t, e) { const { provider: o, prefix: r, name: i } = t, c = g(o, r), s = c.icons[i]; if (s) return { status: "loaded", icon: s }; if (c.missing.has(i)) return { status: "missing" }; if (e && !St(t)) { const t = n[o] || (n[o] = Object.create(null)); (t[r] || (t[r] = new Set)).add(i); } return { status: "loading" } } (t ? [t] : Ft()).forEach((t => { const n = "function" == typeof t.node ? t.node() : t.node; if (!n || !n.querySelectorAll) return; let i = false, c = false; function s(e, n, r) { if (c || (c = true, Ut(t)), "SVG" !== e.tagName.toUpperCase()) { const t = n.mode, i = "mask" === t || "bg" !== t && ("style" === t ? -1 !== r.body.indexOf("currentColor") : null); if ("boolean" == typeof i) return void function (t, e, n, o) { const r = e.customisations, i = T(n, r), c = i.attributes, s = t[Mt], a = te(i.body, { ...c, width: n.width + "", height: n.height + "" }), u = re(t, oe(e.icon), new Set(s && s.addedClasses)), f = { "--svg": 'url("' + (l = a, "data:image/svg+xml," + function (t) { return t.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ") }(l) + '")'), width: de(c.width), height: de(c.height), ...se, ...o ? ae : ue }; var l; r.inline && (f["vertical-align"] = "-0.125em"); const d = ie(t, f, s && s.addedStyles), p = { ...e, status: "loaded", addedClasses: u, addedStyles: d }; t[Mt] = p; }(e, n, { ...o, ...r }, i) } ce(e, n, r); } ((function (t) { const e = []; return t.querySelectorAll(Zt).forEach((t => { const n = t[Mt] || "svg" !== t.tagName.toLowerCase() ? Yt(t) : null; n && e.push({ node: t, props: n }); })), e }))(n).forEach((({ node: t, props: e }) => { const n = t[Mt]; if (!n) { const { status: n, icon: o } = r(e.icon, true); return o ? void s(t, e, o) : (i = i || "loading" === n, void (t[Mt] = { ...e, status: n })) } let o; if (function (t, e) { if (t.name !== e.name || t.mode !== e.mode) return true; const n = t.customisations, o = e.customisations; for (const t in Ot) if (n[t] !== o[t]) return true; return false }(n, e)) { if (o = r(e.icon, n.name !== e.name), !o.icon) return i = i || "loading" === o.status, void Object.assign(n, { ...e, status: o.status }) } else { if ("loading" !== n.status) return; if (o = r(e.icon, false), !o.icon) return void (n.status = o.status) } s(t, e, o.icon); })), t.temporary && !i ? Bt(n) : e && i ? Jt(n, true) : c && t.observer && Qt(t); })); for (const t in n) { const e = n[t]; for (const n in e) { const o = e[n]; jt(Array.from(o).map((e => ({ provider: t, prefix: n, name: e }))), he); } } } function me(t, e, n = false) { const o = v(t); if (!o) return null; const r = u(t), i = It(Ot, e || {}), c = ce(document.createElement("span"), { name: t, icon: r, customisations: i }, o); return n ? c.outerHTML : c } function ye() { return "3.1.1" } function be(t, e) { return me(t, e, false) } function ve(t, e) { return me(t, e, true) } function xe(t, e) { const n = v(t); if (!n) return null; return T(n, It(Ot, e || {})) } function we(t) { t ? function (t) { const e = Lt(t); e ? ge(e) : ge({ node: t, temporary: true }, true); }(t) : ge(); } if ("undefined" != typeof document && "undefined" != typeof window) { !function () { if (document.documentElement) return At(document.documentElement); Tt.push({ node: () => document.documentElement }); }(); const t = window; if (void 0 !== t.IconifyPreload) { const e = t.IconifyPreload, n = "Invalid IconifyPreload syntax."; "object" == typeof e && null !== e && (e instanceof Array ? e : [e]).forEach((t => { try { ("object" != typeof t || null === t || t instanceof Array || "object" != typeof t.icons || "string" != typeof t.prefix || !w(t)) && console.error(n); } catch (t) { console.error(n); } })); } setTimeout((() => { Ht(ge), ge(); })); } function Se(t, e) { Z(t, false !== e); } function je(t) { Z(t, true); } if (et("", ft), "undefined" != typeof document && "undefined" != typeof window) { Y(); const t = window; if (void 0 !== t.IconifyProviders) { const e = t.IconifyProviders; if ("object" == typeof e && null !== e) for (const t in e) { const n = "IconifyProviders[" + t + "] is invalid."; try { const o = e[t]; if ("object" != typeof o || !o || void 0 === o.resources) continue; st(t, o) || console.error(n); } catch (t) { console.error(n); } } } } const Ee = { getAPIConfig: at, setAPIModule: et, sendAPIQuery: bt, setFetch: function (t) { ut = t; }, getFetch: function () { return ut }, listAPIProviders: function () { return Object.keys(rt) } }, Ie = { _api: Ee, addAPIProvider: st, loadIcons: jt, loadIcon: Et, iconExists: S, getIcon: j, listIcons: y, addIcon: x, addCollection: w, replaceIDs: P, calculateSize: C, buildIcon: T, getVersion: ye, renderSVG: be, renderHTML: ve, renderIcon: xe, scan: we, observe: Jt, stopObserving: Bt, pauseObserver: Vt, resumeObserver: Gt, enableCache: Se, disableCache: je }; return t._api = Ee, t.addAPIProvider = st, t.addCollection = w, t.addIcon = x, t.buildIcon = T, t.calculateSize = C, t.default = Ie, t.disableCache = je, t.enableCache = Se, t.getIcon = j, t.getVersion = ye, t.iconExists = S, t.listIcons = y, t.loadIcon = Et, t.loadIcons = jt, t.observe = Jt, t.pauseObserver = Vt, t.renderHTML = ve, t.renderIcon = xe, t.renderSVG = be, t.replaceIDs = P, t.resumeObserver = Gt, t.scan = we, t.stopObserving = Bt, Object.defineProperty(t, "__esModule", { value: true }), t }({}); try { for (var key in exports.__esModule = !0, exports.default = Iconify, Iconify) exports[key] = Iconify[key]; } catch (t) { } try { void 0 === self.Iconify && (self.Iconify = Iconify); } catch (t) { }

  		/* Indux Icons */

  		// Initialize plugin when either DOM is ready or Alpine is ready
  		function initializeIconPlugin() {
  		    // Register icon directive
  		    Alpine.directive('icon', (el, { expression }, { effect, evaluateLater }) => {
  		        const iconValue = expression;
  		        if (!iconValue) return

  		        // Check if it's a raw icon name (should contain a colon for icon format like 'lucide:house')
  		        const isRawIconName = iconValue.includes(':') &&
  		            !iconValue.includes("'") &&
  		            !iconValue.includes('"') &&
  		            !iconValue.includes('$') &&
  		            !iconValue.includes('?') &&
  		            !iconValue.includes('.') &&
  		            !iconValue.includes('(') &&
  		            !iconValue.includes(')');

  		        // For raw icon names, wrap in quotes
  		        const safeExpression = isRawIconName ? `'${iconValue}'` : iconValue;
  		        const evaluate = evaluateLater(safeExpression);

  		        effect(() => {
  		            evaluate(value => {
  		                if (!value) return

  		                // Special handling for <li> elements
  		                if (el.tagName.toLowerCase() === 'li') {
  		                    // Check if this is the first time processing this li
  		                    if (!el.hasAttribute('data-icon-processed')) {
  		                        // Store original text content
  		                        const originalText = el.textContent.trim();

  		                        // Clear the element
  		                        el.innerHTML = '';

  		                        // Create a temporary element for Iconify to process
  		                        const tempEl = document.createElement('span');
  		                        tempEl.className = 'iconify';
  		                        tempEl.setAttribute('data-icon', value);

  		                        // Add temporary element first
  		                        el.appendChild(tempEl);

  		                        // Add text content back
  		                        if (originalText) {
  		                            const textNode = document.createTextNode(originalText);
  		                            el.appendChild(textNode);
  		                        }

  		                        // Mark as processed to prevent re-processing
  		                        el.setAttribute('data-icon-processed', 'true');

  		                        // Use Iconify to process the temporary element
  		                        window.Iconify.scan(tempEl);

  		                        // After a short delay, check if Iconify replaced our element
  		                        setTimeout(() => {
  		                            // Check if the temp element was replaced by an SVG
  		                            const svg = el.querySelector('svg');
  		                            if (svg && svg.parentNode === el) {
  		                                // Iconify replaced our span with SVG, wrap it in a new span
  		                                const newSpan = document.createElement('span');
  		                                newSpan.setAttribute('x-icon', value);
  		                                el.insertBefore(newSpan, svg);
  		                                newSpan.appendChild(svg);
  		                            }
  		                        }, 50);
  		                        return
  		                    } else {
  		                        // Update existing icon
  		                        const iconSpan = el.querySelector('.iconify');
  		                        if (iconSpan) {
  		                            iconSpan.setAttribute('data-icon', value);
  		                            if (window.Iconify) {
  		                                window.Iconify.scan(iconSpan);
  		                            }
  		                        }
  		                        return
  		                    }
  		                }

  		                // Standard handling for non-li elements
  		                let iconEl = el.querySelector('.iconify');
  		                if (!iconEl) {
  		                    iconEl = document.createElement('span');
  		                    iconEl.className = 'iconify';
  		                    el.innerHTML = '';
  		                    el.appendChild(iconEl);
  		                }

  		                // Set icon data
  		                iconEl.setAttribute('data-icon', value);

  		                // Use Iconify (already embedded in script)
  		                window.Iconify.scan(iconEl);
  		            });
  		        });
  		    });
  		}

  		// Handle both DOMContentLoaded and alpine:init
  		if (document.readyState === 'loading') {
  		    document.addEventListener('DOMContentLoaded', () => {
  		        if (window.Alpine) initializeIconPlugin();
  		    });
  		}

  		document.addEventListener('alpine:init', initializeIconPlugin); 
  	} (indux_icons));
  	return indux_icons;
  }

  requireIndux_icons();

  /* Indux Localization */

  function initializeLocalizationPlugin() {
      // Environment detection for debug logging
      window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1' || 
                           window.location.hostname.includes('dev') ||
                           window.location.search.includes('debug=true');
      
      // RTL language codes - using Set for O(1) lookups
      const rtlLanguages = new Set([
          // Arabic script
          'ar',     // Arabic
          'az-Arab',// Azerbaijani (Arabic script)
          'bal',    // Balochi
          'ckb',    // Central Kurdish (Sorani)
          'fa',     // Persian (Farsi)
          'glk',    // Gilaki
          'ks',     // Kashmiri
          'ku-Arab',// Kurdish (Arabic script)
          'lrc',    // Northern Luri
          'mzn',    // Mazanderani
          'pnb',    // Western Punjabi (Shahmukhi)
          'ps',     // Pashto
          'sd',     // Sindhi
          'ur',     // Urdu
        
          // Hebrew script
          'he',     // Hebrew
          'yi',     // Yiddish
          'jrb',    // Judeo-Arabic
          'jpr',    // Judeo-Persian
          'lad-Hebr',// Ladino (Hebrew script)
        
          // Thaana script
          'dv',     // Dhivehi (Maldivian)
        
          // N’Ko script
          'nqo',    // N’Ko (West Africa)
        
          // Syriac script
          'syr',    // Syriac
          'aii',    // Assyrian Neo-Aramaic
          'arc',    // Aramaic
          'sam',    // Samaritan Aramaic
        
          // Mandaic script
          'mid',    // Mandaic
        
          // Other RTL minority/obscure scripts
          'uga',    // Ugaritic
          'phn',    // Phoenician
          'xpr',    // Parthian (ancient)
          'peo',    // Old Persian (cuneiform, but RTL)
          'pal',    // Middle Persian (Pahlavi)
          'avst',   // Avestan
          'man',    // Manding (N'Ko variants)
      ]);
      
      // Detect if a language is RTL
      function isRTL(lang) {
          return rtlLanguages.has(lang);
      }
      
      // Input validation for language codes
      function isValidLanguageCode(lang) {
          if (typeof lang !== 'string' || lang.length === 0) return false;
          // Allow alphanumeric, hyphens, and underscores
          return /^[a-zA-Z0-9_-]+$/.test(lang);
      }
      
      // Safe localStorage operations with error handling
      const safeStorage = {
          get: (key) => {
              try {
                  return localStorage.getItem(key);
              } catch (error) {
                  return null;
              }
          },
          set: (key, value) => {
              try {
                  localStorage.setItem(key, value);
                  return true;
              } catch (error) {
                  return false;
              }
          }
      };
      
      // Initialize empty localization store
      Alpine.store('locale', {
          current: 'en',
          available: [],
          direction: 'ltr',
          _initialized: false
      });

      // Cache for manifest data
      let manifestCache = null;
      
      // Get available locales from manifest with caching
      async function getAvailableLocales() {
          // Return cached data if available
          if (manifestCache) {
              return manifestCache;
          }
          
          try {
              const response = await fetch('/manifest.json');
              if (!response.ok) {
                  throw new Error(`HTTP ${response.status}: ${response.statusText}`);
              }
              const manifest = await response.json();

              // Validate manifest structure
              if (!manifest || typeof manifest !== 'object') {
                  throw new Error('Invalid manifest structure');
              }

              // Get unique locales from data sources
              const locales = new Set();
              if (manifest.data && typeof manifest.data === 'object') {
                  Object.values(manifest.data).forEach(collection => {
                      if (collection && typeof collection === 'object') {
                          Object.keys(collection).forEach(key => {
                              // Validate and accept language codes
                              if (isValidLanguageCode(key) && 
                                  key !== 'url' && 
                                  key !== 'headers' && 
                                  key !== 'params' && 
                                  key !== 'transform' && 
                                  key !== 'defaultValue') {
                                  locales.add(key);
                              }
                          });
                      }
                  });
              }

              // If no locales found, fallback to HTML lang or 'en'
              if (locales.size === 0) {
                  const htmlLang = document.documentElement.lang;
                  const fallbackLang = htmlLang && isValidLanguageCode(htmlLang) ? htmlLang : 'en';
                  locales.add(fallbackLang);
              }

              const availableLocales = Array.from(locales);
              
              // Cache the result
              manifestCache = availableLocales;
              return availableLocales;
          } catch (error) {
              console.error('[Indux Localization] Error loading manifest:', error);
              // Fallback to HTML lang or 'en'
              const htmlLang = document.documentElement.lang;
              const fallbackLang = htmlLang && isValidLanguageCode(htmlLang) ? htmlLang : 'en';
              return [fallbackLang];
          }
      }

      // Detect initial locale
      function detectInitialLocale(availableLocales) {
          
          // 1. Check URL path first (highest priority for direct links)
          const pathParts = window.location.pathname.split('/').filter(Boolean);
          if (pathParts[0] && isValidLanguageCode(pathParts[0]) && availableLocales.includes(pathParts[0])) {
              return pathParts[0];
          }

          // 2. Check localStorage (user preference from UI toggles)
          const storedLang = safeStorage.get('lang');
          if (storedLang && isValidLanguageCode(storedLang) && availableLocales.includes(storedLang)) {
              return storedLang;
          }

          // 3. Check HTML lang attribute
          const htmlLang = document.documentElement.lang;
          if (htmlLang && isValidLanguageCode(htmlLang) && availableLocales.includes(htmlLang)) {
              return htmlLang;
          }

          // 4. Check browser language
          if (navigator.language) {
              const browserLang = navigator.language.split('-')[0];
              if (isValidLanguageCode(browserLang) && availableLocales.includes(browserLang)) {
                  return browserLang;
              }
          }

          // Default to first available locale
          const defaultLang = availableLocales[0] || 'en';
          return defaultLang;
      }

      // Update locale
      async function setLocale(newLang, updateUrl = false) {
          // Validate input
          if (!isValidLanguageCode(newLang)) {
              console.error('[Indux Localization] Invalid language code:', newLang);
              return false;
          }
          
          const store = Alpine.store('locale');
          
          // If available locales aren't loaded yet, load them first
          if (!store.available || store.available.length === 0) {
              const availableLocales = await getAvailableLocales();
              if (!availableLocales.includes(newLang)) {
                  return false;
              }
          } else if (!store.available.includes(newLang)) {
              return false;
          }
          
          if (newLang === store.current) {
              return false;
          }

          try {
              // Update store
              store.current = newLang;
              store.direction = isRTL(newLang) ? 'rtl' : 'ltr';
              store._initialized = true;

              // Update HTML safely
              try {
                  document.documentElement.lang = newLang;
                  document.documentElement.dir = store.direction;
              } catch (domError) {
                  console.error('[Indux Localization] DOM update error:', domError);
              }

              // Update localStorage safely
              safeStorage.set('lang', newLang);

              // Update URL based on current URL state and updateUrl parameter
              try {
                  const currentUrl = new URL(window.location.href);
                  const pathParts = currentUrl.pathname.split('/').filter(Boolean);
                  const hasLanguageInUrl = pathParts[0] && store.available.includes(pathParts[0]);

                  if (updateUrl || hasLanguageInUrl) {
                      // Update URL if:
                      // 1. updateUrl is explicitly true (router navigation, initialization)
                      // 2. OR there's already a language code in the URL (user expects URL to update)
                      
                      if (hasLanguageInUrl) {
                          // Replace existing language code
                          if (pathParts[0] !== newLang) {
                              pathParts[0] = newLang;
                              currentUrl.pathname = '/' + pathParts.join('/');
                              window.history.replaceState({}, '', currentUrl);
                          }
                      } else if (updateUrl && pathParts.length > 0) {
                          // Add language code only if explicitly requested (router/init)
                          pathParts.unshift(newLang);
                          currentUrl.pathname = '/' + pathParts.join('/');
                          window.history.replaceState({}, '', currentUrl);
                      }
                  }
              } catch (urlError) {
                  console.error('[Indux Localization] URL update error:', urlError);
              }

              // Trigger locale change event
              try {
                  window.dispatchEvent(new CustomEvent('localechange', {
                      detail: { locale: newLang }
                  }));
              } catch (eventError) {
                  console.error('[Indux Localization] Event dispatch error:', eventError);
              }

              return true;

          } catch (error) {
              console.error('[Indux Localization] Error setting locale:', error);
              // Restore previous state safely
              const fallbackLang = safeStorage.get('lang') || store.available[0] || 'en';
              store.current = fallbackLang;
              store.direction = isRTL(fallbackLang) ? 'rtl' : 'ltr';
              try {
                  document.documentElement.lang = store.current;
                  document.documentElement.dir = store.direction;
              } catch (domError) {
                  console.error('[Indux Localization] DOM restore error:', domError);
              }
              return false;
          }
      }

      // Add $locale magic method
      Alpine.magic('locale', () => {
          const store = Alpine.store('locale');

          return new Proxy({}, {
              get(target, prop) {
                  if (prop === 'current') return store.current;
                  if (prop === 'available') return store.available;
                  if (prop === 'direction') return store.direction;
                  if (prop === 'set') return setLocale;
                  if (prop === 'toggle') {
                      return () => {
                          const currentIndex = store.available.indexOf(store.current);
                          const nextIndex = (currentIndex + 1) % store.available.length;
                          setLocale(store.available[nextIndex], false);
                      };
                  }
                  return undefined;
              }
          });
      });

      // Event listener cleanup tracking
      let routeChangeListener = null;
      
      // Initialize with manifest data
      (async () => {
          try {
              const availableLocales = await getAvailableLocales();
              const store = Alpine.store('locale');
              store.available = availableLocales;

              const initialLocale = detectInitialLocale(availableLocales);
              
              const success = await setLocale(initialLocale, true);
              // Locale initialization complete
          } catch (error) {
              console.error('[Indux Localization] Initialization error:', error);
          }
      })();

      // Listen for router navigation to detect locale changes
      routeChangeListener = async (event) => {
          try {
              const newPath = event.detail.to;
              
              // Extract locale from new path
              const pathParts = newPath.split('/').filter(Boolean);
              const store = Alpine.store('locale');
              
              if (pathParts[0] && isValidLanguageCode(pathParts[0]) && store.available.includes(pathParts[0])) {
                  const newLocale = pathParts[0];
                  
                  // Only change if it's different from current locale
                  if (newLocale !== store.current) {
                      await setLocale(newLocale, true);
                  }
              }
          } catch (error) {
              console.error('[Indux Localization] Router navigation error:', error);
          }
      };
      
      window.addEventListener('indux:route-change', routeChangeListener);
      
      // Cleanup function for memory management
      const cleanup = () => {
          if (routeChangeListener) {
              window.removeEventListener('indux:route-change', routeChangeListener);
              routeChangeListener = null;
          }
          manifestCache = null;
      };
      
      // Expose cleanup for external use
      window.__induxLocalizationCleanup = cleanup;
  }

  // Handle both DOMContentLoaded and alpine:init
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
          if (window.Alpine) initializeLocalizationPlugin();
      });
  }

  document.addEventListener('alpine:init', initializeLocalizationPlugin);

  var indux_markdown = {};

  /* Indux Markdown */

  var hasRequiredIndux_markdown;

  function requireIndux_markdown () {
  	if (hasRequiredIndux_markdown) return indux_markdown;
  	hasRequiredIndux_markdown = 1;
  	// Cache for marked.js loading
  	let markedPromise = null;

  	// Load marked.js from CDN
  	async function loadMarkedJS() {
  	    if (typeof marked !== 'undefined') {
  	        return marked;
  	    }
  	    
  	    // Return existing promise if already loading
  	    if (markedPromise) {
  	        return markedPromise;
  	    }
  	    
  	    markedPromise = new Promise((resolve, reject) => {
  	        const script = document.createElement('script');
  	        script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
  	        script.onload = () => {
  	            // Initialize marked.js
  	            if (typeof marked !== 'undefined') {
  	                resolve(marked);
  	            } else {
  	                console.error('[Indux Markdown] Marked.js failed to load - marked is undefined');
  	                markedPromise = null; // Reset so we can try again
  	                reject(new Error('marked.js failed to load'));
  	            }
  	        };
  	        script.onerror = (error) => {
  	            console.error('[Indux Markdown] Script failed to load:', error);
  	            markedPromise = null; // Reset so we can try again
  	            reject(error);
  	        };
  	        document.head.appendChild(script);
  	    });
  	    
  	    return markedPromise;
  	}

  	// Configure marked to preserve full language strings
  	async function configureMarked(marked) {
  	    marked.use({
  	        renderer: {
  	            code(token) {
  	                const lang = token.lang || '';
  	                const text = token.text || '';
  	                token.escaped || false;
  	                
  	                // Parse the language string to extract attributes
  	                const attributes = parseLanguageString(lang);
  	                
  	                // Build attributes for the x-code element
  	                let xCodeAttributes = '';
  	                if (attributes.title) {
  	                    xCodeAttributes += ` name="${attributes.title}"`;
  	                }
  	                if (attributes.language) {
  	                    xCodeAttributes += ` language="${attributes.language}"`;
  	                }
  	                if (attributes.numbers) {
  	                    xCodeAttributes += ' numbers';
  	                }
  	                if (attributes.copy) {
  	                    xCodeAttributes += ' copy';
  	                }
  	                
  	                // For x-code elements, use the raw text to preserve formatting
  	                let code = text;
  	                let preserveOriginal = '';
  	                
  	                // For HTML language code blocks, preserve the original raw text to maintain indentation
  	                if (attributes.language === 'html' || text.includes('<!DOCTYPE') || (text.includes('<html') && text.includes('<head') && text.includes('<body'))) {
  	                    // Store the original content in a data attribute to preserve indentation
  	                    preserveOriginal = ` data-original-content="${text.replace(/"/g, '&quot;')}"`;
  	                }
  	                
  	                // Always create an x-code element, with or without attributes
  	                return `<x-code${xCodeAttributes}${preserveOriginal}>${code}</x-code>\n`;
  	            }
  	        },
  	        // Configure marked to allow custom HTML tags
  	        breaks: true,
  	        gfm: true
  	    });

  	    // Add custom tokenizer for callout blocks
  	    marked.use({
  	        extensions: [{
  	            name: 'callout',
  	            level: 'block',
  	            start(src) {
  	                return src.match(/^:::/)?.index;
  	            },
  	            tokenizer(src) {
  	                // Find the opening ::: and type
  	                const openMatch = src.match(/^:::(.*?)(?:\n|$)/);
  	                if (!openMatch) return;
  	                
  	                // Parse the opening line for classes and icon
  	                const openingLine = openMatch[1].trim();
  	                let classes = '';
  	                let iconValue = '';
  	                
  	                // Match icon="value" pattern
  	                const iconMatch = openingLine.match(/icon="([^"]+)"/);
  	                if (iconMatch) {
  	                    iconValue = iconMatch[1];
  	                }
  	                
  	                // Get all class names (remove icon attribute first)
  	                classes = openingLine.replace(/\s*icon="[^"]+"\s*/, '').trim();
  	                
  	                const startPos = openMatch[0].length;
  	                
  	                // Find the closing ::: from the remaining content
  	                const remainingContent = src.slice(startPos);
  	                const closeMatch = remainingContent.match(/\n:::/);
  	                
  	                if (closeMatch) {
  	                    const content = remainingContent.slice(0, closeMatch.index);
  	                    const raw = openMatch[0] + content + closeMatch[0];
  	                    
  	                    return {
  	                        type: 'callout',
  	                        raw: raw,
  	                        classes: classes,
  	                        iconValue: iconValue,
  	                        text: content.trim()
  	                    };
  	                }
  	            },
  	            renderer(token) {
  	                const classes = token.classes || '';
  	                const iconValue = token.iconValue || '';
  	                
  	                // For frame callouts, don't parse as markdown to avoid wrapping HTML in <p> tags
  	                let parsedContent;
  	                if (classes.includes('frame')) {
  	                    // Use raw content for frame callouts to preserve HTML structure
  	                    parsedContent = token.text;
  	                } else {
  	                    // Parse the content as markdown to support nested markdown syntax
  	                    parsedContent = marked.parse(token.text);
  	                }
  	                
  	                const iconHtml = iconValue ? `<span x-icon="${iconValue}"></span>` : '';
  	                
  	                // Create a temporary div to count top-level elements
  	                const temp = document.createElement('div');
  	                temp.innerHTML = parsedContent;
  	                const elementCount = temp.children.length;
  	                
  	                // Only wrap in a div if:
  	                // 1. There are 2 or more elements AND
  	                // 2. There's an icon (which needs the content to be wrapped as a sibling)
  	                const needsWrapper = elementCount >= 2 && iconValue;
  	                const wrappedContent = needsWrapper ? 
  	                    `<div>${parsedContent}</div>` : 
  	                    parsedContent;
  	                
  	                return `<aside${classes ? ` class="${classes}"` : ''}>${iconHtml}${wrappedContent}</aside>\n`;
  	            }
  	        }]
  	    });

  	    // Configure marked to preserve custom HTML tags
  	    marked.setOptions({
  	        headerIds: false,
  	        mangle: false
  	    });
  	}

  	// Custom renderer for x-code-group to handle line breaks properly
  	function renderXCodeGroup(markdown) {
  	    // Find x-code-group blocks and process them specially
  	    const xCodeGroupRegex = /<x-code-group[^>]*>([\s\S]*?)<\/x-code-group>/g;
  	    
  	    return markdown.replace(xCodeGroupRegex, (match, content) => {
  	        // Ensure there's a line break after the opening tag if there isn't one
  	        const processedContent = content.replace(/^(?!\s*\n)/, '\n');
  	        
  	        return `<x-code-group>${processedContent}</x-code-group>`;
  	    });
  	}

  	// Post-process HTML to enable checkboxes by removing disabled attribute
  	function enableCheckboxes(html) {
  	    // Create a temporary DOM element to parse the HTML
  	    const temp = document.createElement('div');
  	    temp.innerHTML = html;
  	    
  	    // Find all checkbox inputs and remove disabled attribute
  	    const checkboxes = temp.querySelectorAll('input[type="checkbox"]');
  	    checkboxes.forEach(checkbox => {
  	        checkbox.removeAttribute('disabled');
  	    });
  	    
  	    return temp.innerHTML;
  	}





  	// Parse language string to extract title and attributes
  	function parseLanguageString(languageString) {
  	    if (!languageString || languageString.trim() === '') {
  	        return { title: null, language: null, numbers: false, copy: false };
  	    }
  	    
  	    const parts = languageString.split(/\s+/);
  	    
  	    const attributes = {
  	        title: null,
  	        language: null,
  	        numbers: false,
  	        copy: false
  	    };
  	    
  	    let i = 0;
  	    while (i < parts.length) {
  	        const part = parts[i];
  	        
  	        // Check for attributes
  	        if (part === 'numbers') {
  	            attributes.numbers = true;
  	            i++;
  	            continue;
  	        }
  	        
  	        if (part === 'copy') {
  	            attributes.copy = true;
  	            i++;
  	            continue;
  	        }
  	        
  	        // Check for quoted names (e.g., "Example")
  	        if (part.startsWith('"') && part.endsWith('"')) {
  	            // Single word quoted name
  	            attributes.title = part.slice(1, -1);
  	            i++;
  	            continue;
  	        } else if (part.startsWith('"')) {
  	            // Multi-word quoted name
  	            let fullName = part.slice(1);
  	            i++;
  	            while (i < parts.length) {
  	                const nextPart = parts[i];
  	                if (nextPart.endsWith('"')) {
  	                    fullName += ' ' + nextPart.slice(0, -1);
  	                    attributes.title = fullName;
  	                    i++;
  	                    break;
  	                } else {
  	                    fullName += ' ' + nextPart;
  	                    i++;
  	                }
  	            }
  	            continue;
  	        }
  	        
  	        // Store language identifiers (e.g., "css", "javascript", etc.)
  	        // Use the first language identifier found
  	        if (!attributes.language) {
  	            attributes.language = part;
  	        }
  	        i++;
  	    }
  	    
  	    return attributes;
  	}

  	// Preload marked.js as soon as script loads
  	loadMarkedJS().catch(() => {
  	    // Silently ignore errors during preload
  	});

  	// Initialize plugin when either DOM is ready or Alpine is ready
  	async function initializeMarkdownPlugin() {
  	    try {
  	        // Load marked.js
  	        const marked = await loadMarkedJS();
  	        
  	        // Configure marked with all our custom settings
  	        await configureMarked(marked);
  	        
  	        // Configure marked to generate heading IDs
  	        marked.use({
  	            renderer: {
  	                heading(token) {
  	                    // Extract text and level from the token
  	                    const text = token.text || '';
  	                    const level = token.depth || 1;
  	                    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-+|-+$/g, '');
  	                    return `<h${level} id="${escapedText}">${text}</h${level}>`;
  	                }
  	            }
  	        });
  	    
  	    // Check if there are any elements with x-markdown already on the page
  	    const existingMarkdownElements = document.querySelectorAll('[x-markdown]');
  	    
  	    // Register markdown directive
  	    Alpine.directive('markdown', (el, { expression, modifiers }, { effect, evaluateLater }) => {
  	        
  	        // Handle null/undefined expressions gracefully
  	        if (!expression) {
  	            return;
  	        }
  	        
  	        // Hide element initially to prevent flicker
  	        el.style.opacity = '0';
  	        el.style.transition = 'opacity 0.15s ease-in-out';
  	        
  	        // Store original markdown content
  	        let markdownSource = '';
  	        let isUpdating = false;
  	        let hasContent = false;

  	        const normalizeContent = (content) => {
  	            const lines = content.split('\n');
  	            const commonIndent = lines
  	                .filter(line => line.trim())
  	                .reduce((min, line) => {
  	                    const indent = line.match(/^\s*/)[0].length;
  	                    return Math.min(min, indent);
  	                }, Infinity);

  	            return lines
  	                .map(line => line.slice(commonIndent))
  	                .join('\n')
  	                .trim();
  	        };

  	        const updateContent = async (element, newContent = null) => {
  	            if (isUpdating) return;
  	            isUpdating = true;

  	            try {
  	                // Update source if new content provided
  	                if (newContent !== null && newContent.trim() !== '') {
  	                    markdownSource = normalizeContent(newContent);
  	                }

  	                // Skip if no content
  	                if (!markdownSource || markdownSource.trim() === '') {
  	                    element.style.opacity = '0';
  	                    return;
  	                }

  	                // Load marked.js and parse markdown
  	                const marked = await loadMarkedJS();
  	                const processedMarkdown = renderXCodeGroup(markdownSource);
  	                let html = marked.parse(processedMarkdown);

  	                // Post-process HTML to enable checkboxes (remove disabled attribute)
  	                html = enableCheckboxes(html);

  	                // Only update if content has changed and isn't empty
  	                if (element.innerHTML !== html && html.trim() !== '') {
  	                    // Create a temporary container to hold the HTML
  	                    const temp = document.createElement('div');
  	                    temp.innerHTML = html;

  	                    // Replace the content
  	                    element.innerHTML = '';
  	                    while (temp.firstChild) {
  	                        element.appendChild(temp.firstChild);
  	                    }
  	                    
  	                    // Show element with content
  	                    hasContent = true;
  	                    element.style.opacity = '1';
  	                } else if (!hasContent) {
  	                    // Keep hidden if no valid content
  	                    element.style.opacity = '0';
  	                }
  	            } finally {
  	                isUpdating = false;
  	            }
  	        };

  	        // Handle inline markdown content (no expression or 'inline')
  	        if (!expression || expression === 'inline') {
  	            // Initial parse
  	            markdownSource = normalizeContent(el.textContent);
  	            updateContent(el);

  	            // Set up mutation observer for streaming content
  	            const observer = new MutationObserver((mutations) => {
  	                let newContent = null;

  	                for (const mutation of mutations) {
  	                    if (mutation.type === 'childList') {
  	                        const textNodes = Array.from(el.childNodes)
  	                            .filter(node => node.nodeType === Node.TEXT_NODE);
  	                        if (textNodes.length > 0) {
  	                            newContent = textNodes.map(node => node.textContent).join('');
  	                            break;
  	                        }
  	                    } else if (mutation.type === 'characterData') {
  	                        newContent = mutation.target.textContent;
  	                        break;
  	                    }
  	                }

  	                if (newContent && newContent.trim() !== '') {
  	                    updateContent(el, newContent);
  	                }
  	            });

  	            observer.observe(el, {
  	                characterData: true,
  	                childList: true,
  	                subtree: true,
  	                characterDataOldValue: true
  	            });

  	            return;
  	        }

  	        // Handle expressions (file paths, inline strings, content references)
  	        // Check if this is a simple string literal that needs to be quoted
  	        let processedExpression = expression;
  	        if (!expression.includes('+') && !expression.includes('`') && !expression.includes('${') && 
  	            !expression.startsWith('$') && !expression.startsWith("'") && !expression.startsWith('"')) {
  	            // Wrap simple string literals in quotes to prevent Alpine from treating them as expressions
  	            processedExpression = `'${expression.replace(/'/g, "\\'")}'`;
  	        }
  	        const getMarkdownContent = evaluateLater(processedExpression);

  	        effect(() => {
  	            getMarkdownContent(async (pathOrContent) => {
  	                // Reset visibility if content is empty/undefined
  	                if (!pathOrContent || pathOrContent === undefined || pathOrContent === '') {
  	                    el.style.opacity = '0';
  	                    hasContent = false;
  	                    return;
  	                }

  	                if (pathOrContent === undefined) {
  	                    pathOrContent = expression;
  	                }

  	                // Check if this looks like a file path (contains .md, .markdown, or starts with /)
  	                const isFilePath = typeof pathOrContent === 'string' &&
  	                    (pathOrContent.includes('.md') ||
  	                        pathOrContent.includes('.markdown') ||
  	                        pathOrContent.startsWith('/') ||
  	                        pathOrContent.includes('/'));

  	                let markdownContent = pathOrContent;

  	                // If it's a file path, fetch the content
  	                if (isFilePath) {
  	                    try {
  	                        // Ensure the path is absolute from project root
  	                        let resolvedPath = pathOrContent;
  	                        
  	                        // If it's a relative path (doesn't start with /), make it absolute from root
  	                        if (!pathOrContent.startsWith('/')) {
  	                            resolvedPath = '/' + pathOrContent;
  	                        }
  	                        
  	                        const response = await fetch(resolvedPath);
  	                        if (response.ok) {
  	                            markdownContent = await response.text();
  	                        } else {
  	                            console.warn(`[Indux] Failed to fetch markdown file: ${resolvedPath}`);
  	                            markdownContent = `# Error Loading Content\n\nCould not load: ${resolvedPath}`;
  	                        }
  	                    } catch (error) {
  	                        console.error(`[Indux] Error fetching markdown file: ${pathOrContent}`, error);
  	                        markdownContent = `# Error Loading Content\n\nCould not load: ${pathOrContent}\n\nError: ${error.message}`;
  	                    }
  	                }

  	                // Skip empty content
  	                if (!markdownContent || markdownContent.trim() === '') {
  	                    el.style.opacity = '0';
  	                    hasContent = false;
  	                    return;
  	                }

  	                const marked = await loadMarkedJS();
  	                let html = marked.parse(markdownContent);
  	                
  	                // Post-process HTML to enable checkboxes (remove disabled attribute)
  	                html = enableCheckboxes(html);
  	                
  	                // Create temporary container
  	                const temp = document.createElement('div');
  	                temp.innerHTML = html;
  	                
  	                el.innerHTML = '';
  	                while (temp.firstChild) {
  	                    el.appendChild(temp.firstChild);
  	                }
  	                
  	                // Code highlighting is handled by indux.code.js plugin

  	                // Show content with fade-in
  	                hasContent = true;
  	                el.style.opacity = '1';

  	                // Extract headings for anchor links
  	                const headings = [];
  	                const headingElements = el.querySelectorAll('h1, h2, h3');
  	                headingElements.forEach(heading => {
  	                    headings.push({
  	                        id: heading.id,
  	                        text: heading.textContent,
  	                        level: parseInt(heading.tagName.charAt(1))
  	                    });
  	                });

  	                // Store headings in Alpine data if 'headings' modifier is used
  	                if (modifiers.includes('headings')) {
  	                    // Generate a unique ID for this markdown section
  	                    const sectionId = 'markdown-' + Math.random().toString(36).substr(2, 9);
  	                    el.setAttribute('data-headings-section', sectionId);

  	                    // Store headings in a global registry
  	                    if (!window._induxHeadings) {
  	                        window._induxHeadings = {};
  	                    }
  	                    window._induxHeadings[sectionId] = headings;
  	                }
  	            });
  	        });
  	    });
  	    
  	    // If there are existing elements with x-markdown, manually process them with proper Alpine context
  	    if (existingMarkdownElements.length > 0) {
  	        
  	        existingMarkdownElements.forEach(el => {
  	            const expression = el.getAttribute('x-markdown');
  	            
  	            // Create a temporary Alpine component context for this element
  	            const tempComponent = Alpine.$data(el) || {};
  	            
  	            // Use Alpine's evaluation system within the component context
  	            const updateContent = async (element, newContent = null) => {
  	                try {
  	                    if (!newContent) {
  	                        return;
  	                    }
  	                    
  	                    // Load marked.js and parse markdown
  	                    const marked = await loadMarkedJS();
  	                    const processedMarkdown = renderXCodeGroup(newContent);
  	                    let html = marked.parse(processedMarkdown);
  	                    
  	                    // Post-process HTML to enable checkboxes (remove disabled attribute)
  	                    html = html.replace(/<input type="checkbox"([^>]*?)disabled([^>]*?)>/g, '<input type="checkbox"$1$2>');
  	                    
  	                    // Create temporary container
  	                    const temp = document.createElement('div');
  	                    temp.innerHTML = html;
  	                    
  	                    element.innerHTML = '';
  	                    while (temp.firstChild) {
  	                        element.appendChild(temp.firstChild);
  	                    }
  	                    
  	                    // Re-highlight code blocks after content update
  	                    // Code highlighting is handled by indux.code.js plugin
  	                } catch (error) {
  	                    console.error('[Indux Markdown] Failed to process element:', error);
  	                }
  	            };
  	            
  	            // Handle simple string expressions
  	            if (expression.startsWith("'") && expression.endsWith("'")) {
  	                const content = expression.slice(1, -1);
  	                updateContent(el, content);
  	            } else {
  	                // For complex expressions, we need to force Alpine to re-process this element
  	                
  	                // Remove and re-add the attribute to force Alpine to re-process it
  	                const originalExpression = expression;
  	                el.removeAttribute('x-markdown');
  	                
  	                // Use a small delay to ensure the directive is registered
  	                setTimeout(() => {
  	                    el.setAttribute('x-markdown', originalExpression);
  	                }, 50);
  	            }
  	        });
  	    }
  	    
  	    } catch (error) {
  	        console.error('[Indux] Failed to initialize markdown plugin:', error);
  	    }
  	}

  	// Handle both DOMContentLoaded and alpine:init
  	if (document.readyState === 'loading') {
  	    document.addEventListener('DOMContentLoaded', () => {
  	        if (window.Alpine) {
  	            initializeMarkdownPlugin();
  	        }
  	    });
  	}

  	document.addEventListener('alpine:init', () => {
  	    initializeMarkdownPlugin();
  	});
  	return indux_markdown;
  }

  requireIndux_markdown();

  /* Indux Resizer */

  function initializeResizablePlugin() {
      // Cache for unit conversions to avoid repeated DOM manipulation
      const unitCache = new Map();
      let tempConversionEl = null;

      // Helper to convert any unit to pixels (cached and optimized)
          const convertToPixels = (value, unit) => {
              if (unit === 'px') return value;

          const cacheKey = `${value}${unit}`;
          if (unitCache.has(cacheKey)) {
              return unitCache.get(cacheKey);
          }

          // Use a single cached conversion element
          if (!tempConversionEl) {
              tempConversionEl = document.createElement('div');
              tempConversionEl.style.cssText = 'visibility:hidden;position:absolute;top:-9999px;left:-9999px;width:0;height:0;';
              document.body.appendChild(tempConversionEl);
          }

          tempConversionEl.style.width = `${value}${unit}`;
          const pixels = tempConversionEl.getBoundingClientRect().width;
          
          unitCache.set(cacheKey, pixels);
              return pixels;
          };

      // Helper to convert pixels back to original unit (cached)
      const convertFromPixels = (pixels, unit, element) => {
              if (unit === 'px') return pixels;

          const cacheKey = `${pixels}${unit}${element.tagName}`;
          if (unitCache.has(cacheKey)) {
              return unitCache.get(cacheKey);
          }

          let result;
              switch (unit) {
                  case '%':
                  result = (pixels / element.parentElement.getBoundingClientRect().width) * 100;
                  break;
                  case 'rem':
                      const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
                  result = pixels / remSize;
                  break;
                  case 'em':
                  const emSize = parseFloat(getComputedStyle(element).fontSize);
                  result = pixels / emSize;
                  break;
                  default:
                  result = pixels;
          }
          
          unitCache.set(cacheKey, result);
          return result;
      };

      Alpine.directive('resize', (el, { modifiers, expression }, { evaluate }) => {
          // Store configuration on the element for lazy initialization
          el._resizeConfig = {
              expression,
              evaluate,
              handles: null,
              initialized: false
          };

          // Load saved width and height immediately if specified
          if (expression) {
              try {
                  const options = evaluate(expression);
                  if (options) {
                      if (options.saveWidth) {
                          const savedWidth = localStorage.getItem(`resizable-${options.saveWidth}`);
                          if (savedWidth) {
                              // Preserve the original unit if saved
                              const [value, unit] = savedWidth.split('|');
                              el.style.width = `${value}${unit || 'px'}`;
                          }
                      }
                      if (options.saveHeight) {
                          const savedHeight = localStorage.getItem(`resizable-${options.saveHeight}`);
                          if (savedHeight) {
                              // Preserve the original unit if saved
                              const [value, unit] = savedHeight.split('|');
                              el.style.height = `${value}${unit || 'px'}`;
                          }
                      }
                  }
              } catch (error) {
                  // Ignore parsing errors here, they'll be handled in initializeResizeElement
              }
          }

          // Add hover listener to create handles on first interaction
          el.addEventListener('mouseenter', initializeResizeElement, { once: true });
      });

      function initializeResizeElement(event) {
          const el = event.target;
          const config = el._resizeConfig;
          if (config.initialized) return;

          config.initialized = true;

          // Helper to parse value and unit from CSS dimension
          const parseDimension = (value) => {
              if (typeof value === 'number') return { value, unit: 'px' };
              const match = String(value).match(/^([\d.]+)(.*)$/);
              return match ? { value: parseFloat(match[1]), unit: match[2] || 'px' } : { value: 0, unit: 'px' };
          };

          // Parse options from expression or use defaults
          let options = {};
          if (config.expression) {
              try {
                  options = config.evaluate(config.expression);
              } catch (error) {
                  console.error('Error parsing x-resize expression:', config.expression, error);
                  options = {};
              }
          }
          const {
              snapDistance = 0,
              snapPoints = [],
              snapCloseX = null,
              snapDistanceX = null,
              snapDistanceY = null,
              snapPointsX = [],
              snapPointsY = [],
              snapCloseY = null,
              toggle = null,
              handles = ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
              saveWidth = null,
              saveHeight = null
          } = options;

          // Store handles for cleanup
          config.handles = [];

          // Parse constraints with units
          const constraints = {
              closeX: snapCloseX ? parseDimension(snapCloseX) : null,
              closeY: snapCloseY ? parseDimension(snapCloseY) : null
          };

          // Parse snap points with units
          const parsedSnapPoints = snapPoints.map(point => parseDimension(point));
          const parsedSnapPointsX = snapPointsX.map(point => parseDimension(point));
          const parsedSnapPointsY = snapPointsY.map(point => parseDimension(point));

          // Detect RTL context
          const isRTL = getComputedStyle(el).direction === 'rtl';
          
          // Handle mapping for resize behavior
          const handleMap = {
              // Physical directions (fixed)
              top: { edge: 'top', direction: 'vertical' },
              bottom: { edge: 'bottom', direction: 'vertical' },
              left: { edge: 'left', direction: 'horizontal' },
              right: { edge: 'right', direction: 'horizontal' },
              
              // Corners
              'top-left': { edge: 'top-left', direction: 'both', edges: ['top', 'left'] },
              'top-right': { edge: 'top-right', direction: 'both', edges: ['top', 'right'] },
              'bottom-left': { edge: 'bottom-left', direction: 'both', edges: ['bottom', 'left'] },
              'bottom-right': { edge: 'bottom-right', direction: 'both', edges: ['bottom', 'right'] },
              
              // Logical directions (RTL-aware)
              start: { 
                  edge: isRTL ? 'right' : 'left', 
                  direction: 'horizontal',
                  logical: true
              },
              end: { 
                  edge: isRTL ? 'left' : 'right', 
                  direction: 'horizontal',
                  logical: true
              },
              
              // Logical corners
              'top-start': { 
                  edge: isRTL ? 'top-right' : 'top-left', 
                  direction: 'both', 
                  edges: isRTL ? ['top', 'right'] : ['top', 'left'],
                  logical: true
              },
              'top-end': { 
                  edge: isRTL ? 'top-left' : 'top-right', 
                  direction: 'both', 
                  edges: isRTL ? ['top', 'left'] : ['top', 'right'],
                  logical: true
              },
              'bottom-start': { 
                  edge: isRTL ? 'bottom-right' : 'bottom-left', 
                  direction: 'both', 
                  edges: isRTL ? ['bottom', 'right'] : ['bottom', 'left'],
                  logical: true
              },
              'bottom-end': { 
                  edge: isRTL ? 'bottom-left' : 'bottom-right', 
                  direction: 'both', 
                  edges: isRTL ? ['bottom', 'left'] : ['bottom', 'right'],
                  logical: true
              }
          };

          // Create handles for each specified handle
          handles.forEach(handleName => {
              const handleInfo = handleMap[handleName];
              if (!handleInfo) return;

              const handle = document.createElement('span');
              handle.className = `resize-handle resize-handle-${handleName}`;
              handle.setAttribute('data-handle', handleName);

              let startX, startY, startWidth, startHeight;
              let currentSnap = null;

              // Convert constraints to pixels for calculations
              const pixelConstraints = {
                  closeX: constraints.closeX ? convertToPixels(constraints.closeX.value, constraints.closeX.unit) : null,
                  closeY: constraints.closeY ? convertToPixels(constraints.closeY.value, constraints.closeY.unit) : null
              };

              // Convert snap points to pixels
              const pixelSnapPoints = parsedSnapPoints.map(point => ({
                  value: convertToPixels(point.value, point.unit),
                  unit: point.unit
              }));
              const pixelSnapPointsX = parsedSnapPointsX.map(point => ({
                  value: convertToPixels(point.value, point.unit),
                  unit: point.unit
              }));
              const pixelSnapPointsY = parsedSnapPointsY.map(point => ({
                  value: convertToPixels(point.value, point.unit),
                  unit: point.unit
              }));

              const snapDistancePixels = convertToPixels(snapDistance, 'px');
          const snapDistanceXPixels = snapDistanceX ? convertToPixels(snapDistanceX, 'px') : snapDistancePixels;
          const snapDistanceYPixels = snapDistanceY ? convertToPixels(snapDistanceY, 'px') : snapDistancePixels;

              const handleMouseDown = (e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  startX = e.clientX;
                  startY = e.clientY;
                  startWidth = el.getBoundingClientRect().width;
                  startHeight = el.getBoundingClientRect().height;

                  // Show overlay
                  const overlay = document.querySelector('.resize-overlay') || createOverlay();
                  overlay.style.display = 'block';
                  document.body.appendChild(overlay);

                  document.addEventListener('mousemove', handleMouseMove);
                  document.addEventListener('mouseup', handleMouseUp);
              };

              const handleMouseMove = (e) => {
                  const deltaX = e.clientX - startX;
                  const deltaY = e.clientY - startY;

                  let newWidth = startWidth;
                  let newHeight = startHeight;

                  // Calculate new dimensions based on handle type
                  if (handleInfo.direction === 'horizontal' || handleInfo.direction === 'both') {
                      if (handleInfo.edge === 'left' || handleInfo.edge === 'top-left' || handleInfo.edge === 'bottom-left') {
                          newWidth = startWidth - deltaX;
                      } else if (handleInfo.edge === 'right' || handleInfo.edge === 'top-right' || handleInfo.edge === 'bottom-right') {
                      newWidth = startWidth + deltaX;
                      }
                  }

                  if (handleInfo.direction === 'vertical' || handleInfo.direction === 'both') {
                      if (handleInfo.edge === 'top' || handleInfo.edge === 'top-left' || handleInfo.edge === 'top-right') {
                          newHeight = startHeight - deltaY;
                      } else if (handleInfo.edge === 'bottom' || handleInfo.edge === 'bottom-left' || handleInfo.edge === 'bottom-right') {
                          newHeight = startHeight + deltaY;
                      }
                  }

                  // Handle snap-close behavior for width
                  if (pixelConstraints.closeX !== null) {
                      // Close when element becomes smaller than threshold (dragging toward inside)
                      if (newWidth <= pixelConstraints.closeX) {
                          el.classList.add('resizable-closing');
                          currentSnap = 'closing';
                          
                          if (toggle) {
                              config.evaluate(`${toggle} = false`);
                          }
                          return; // Exit early to prevent further width calculations
                      }
                  }

                  // Handle snap-close behavior for height
                  if (pixelConstraints.closeY !== null) {
                      // Close when element becomes smaller than threshold (dragging toward inside)
                      if (newHeight <= pixelConstraints.closeY) {
                          el.classList.add('resizable-closing');
                          currentSnap = 'closing';
                          
                          if (toggle) {
                              config.evaluate(`${toggle} = false`);
                          }
                          return; // Exit early to prevent further height calculations
                      }
                  }

                  // Apply constraints only if we're not closing
                  // Note: maxWidth and maxHeight are now handled by CSS (e.g., Tailwind classes)

                  // Handle normal snap points for width
                  const widthSnapPoints = pixelSnapPointsX.length > 0 ? pixelSnapPointsX : pixelSnapPoints;
                  const widthSnapDistance = snapDistanceXPixels;
                  for (const point of widthSnapPoints) {
                      const distance = Math.abs(newWidth - point.value);
                      if (distance < widthSnapDistance) {
                              newWidth = point.value;
                          currentSnap = `${convertFromPixels(newWidth, point.unit, el)}${point.unit}`;
                              break;
                          }
                  }

                  // Handle normal snap points for height
                  const heightSnapPoints = pixelSnapPointsY.length > 0 ? pixelSnapPointsY : pixelSnapPoints;
                  const heightSnapDistance = snapDistanceYPixels;
                  for (const point of heightSnapPoints) {
                      const distance = Math.abs(newHeight - point.value);
                      if (distance < heightSnapDistance) {
                          newHeight = point.value;
                          currentSnap = `${convertFromPixels(newHeight, point.unit, el)}${point.unit}`;
                          break;
                      }
                  }

                  // Convert back to original unit for display
                  el.style.width = `${newWidth}px`;
                  el.style.height = `${newHeight}px`;
                  el.classList.remove('resizable-closing', 'resizable-closed');
                  if (toggle) {
                      config.evaluate(`${toggle} = true`);
                  }

                  if (currentSnap !== 'closing') {
                      if (saveWidth) {
                      localStorage.setItem(`resizable-${saveWidth}`,
                              `${newWidth}|px`);
                      }
                      if (saveHeight) {
                          localStorage.setItem(`resizable-${saveHeight}`,
                              `${newHeight}|px`);
                      }
                  }

                  // Dispatch resize event
                  el.dispatchEvent(new CustomEvent('resize', {
                      detail: {
                          width: newWidth,
                          height: newHeight,
                          unit: 'px',
                          snap: currentSnap,
                          closing: currentSnap === 'closing'
                      }
                  }));
              };

              const handleMouseUp = () => {
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);

                  // Hide overlay
                  const overlay = document.querySelector('.resize-overlay');
                  if (overlay) {
                      overlay.style.display = 'none';
                  }

                  if (currentSnap === 'closing') {
                      el.classList.add('resizable-closed');
                  }
              };

              handle.addEventListener('mousedown', handleMouseDown);
              el.appendChild(handle);
              config.handles.push(handle);
          });
      }

      function createOverlay() {
          const overlay = document.createElement('div');
          overlay.className = 'resize-overlay';
          overlay.style.display = 'none';
          return overlay;
      }
  }

  // Initialize the plugin
  if (typeof Alpine !== 'undefined') {
      initializeResizablePlugin();
  } else {
      document.addEventListener('alpine:init', () => {
          initializeResizablePlugin();
      });
  }

  /* Indux Router */

  // Main routing initialization
  function initializeRouting() {

      // Mark as initialized
      window.__induxRoutingInitialized = true;
      window.dispatchEvent(new CustomEvent('indux:routing-ready'));

  }

  // Start initialization when DOM is ready
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeRouting);
  } else {
      initializeRouting();
  }

  // Export main routing interface
  window.InduxRouting = {
      initialize: initializeRouting,
      // Route matching utility
      matchesCondition: (path, condition) => {
          // Normalize path consistently - keep '/' as '/' for home route
          const normalizedPath = path === '/' ? '/' : path.replace(/^\/+|\/+$/g, '') || '/';

          // Get localization codes from manifest
          const localizationCodes = [];
          try {
              const manifest = window.InduxComponentsRegistry?.manifest || window.manifest;
              if (manifest && manifest.data) {
                  Object.values(manifest.data).forEach(dataSource => {
                      if (typeof dataSource === 'object' && dataSource !== null) {
                          Object.keys(dataSource).forEach(key => {
                              if (key.match(/^[a-z]{2}(-[A-Z]{2})?$/)) {
                                  localizationCodes.push(key);
                              }
                          });
                      }
                  });
              }
          } catch (e) {
              // Ignore errors if manifest is not available
          }

          // Check if path starts with a localization code
          let pathToCheck = normalizedPath;
          if (localizationCodes.length > 0) {
              const pathSegments = normalizedPath.split('/').filter(segment => segment);
              if (pathSegments.length > 0 && localizationCodes.includes(pathSegments[0])) {
                  // Remove the localization code and check the remaining path
                  pathToCheck = pathSegments.slice(1).join('/') || '/';
              }
          }

          // Handle wildcards
          if (condition.includes('*')) {
              if (condition === '*') return true;
              const wildcardPattern = condition.replace('*', '');
              const normalizedPattern = wildcardPattern.replace(/^\/+|\/+$/g, '');
              return pathToCheck.startsWith(normalizedPattern + '/');
          }

          // Handle exact matches (starting with =) - after localization processing
          if (condition.startsWith('=')) {
              const exactPath = condition.slice(1);
              if (exactPath === '/') {
                  return pathToCheck === '/' || pathToCheck === '';
              }
              const normalizedExactPath = exactPath.replace(/^\/+|\/+$/g, '');
              return pathToCheck === normalizedExactPath;
          }

          // Handle exact paths (starting with /)
          if (condition.startsWith('/')) {
              if (condition === '/') {
                  return pathToCheck === '/' || pathToCheck === '';
              }
              const routePath = condition.replace(/^\//, '');
              return pathToCheck === routePath || pathToCheck.startsWith(routePath + '/');
          }

          // Handle substring matching (default behavior)
          return pathToCheck.includes(condition);
      }
  };


  // Router position

  // Capture initial body order from index.html
  function captureBodyOrder() {
      if (window.__induxBodyOrder) return; // Already captured

      try {
          const req = new XMLHttpRequest();
          req.open('GET', '/index.html', false);
          req.send(null);
          if (req.status === 200) {
              let html = req.responseText;

              // Handle self-closing tags if components plugin isn't available
              if (!window.InduxComponents) {
                  html = html.replace(/<x-([a-z0-9-]+)([^>]*)\s*\/?>/gi, (match, tag, attrs) => `<x-${tag}${attrs}></x-${tag}>`);
              }

              const parser = new DOMParser();
              const doc = parser.parseFromString(html, 'text/html');
              const bodyChildren = Array.from(doc.body.children);

              window.__induxBodyOrder = bodyChildren.map((el, index) => ({
                  index,
                  tag: el.tagName.toLowerCase().trim(),
                  isComponent: el.tagName.toLowerCase().startsWith('x-'),
                  attrs: Array.from(el.attributes).map(attr => [attr.name, attr.value]),
                  key: el.getAttribute('data-component-id') || (el.tagName.toLowerCase().startsWith('x-') ? el.tagName.toLowerCase().replace('x-', '').trim() : null),
                  position: index,
                  content: el.tagName.toLowerCase().startsWith('x-') ? null : el.innerHTML
              }));
          }
      } catch (e) {
          // Failed to load index.html for body order snapshot
      }
  }

  // Assign data-order attributes to all top-level elements
  function assignDataPositions() {
      if (!document.body) return;

      const bodyChildren = Array.from(document.body.children);

      bodyChildren.forEach((element, index) => {
          element.setAttribute('data-order', index.toString());
      });
  }

  // Initialize position management
  function initializePositionManagement() {
      // Capture body order first
      captureBodyOrder();

      // Assign data-order attributes
      assignDataPositions();
  }

  // Run immediately if DOM is ready, otherwise wait
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializePositionManagement);
  } else {
      initializePositionManagement();
  }

  // Export position management interface
  window.InduxRoutingPosition = {
      initialize: initializePositionManagement,
      captureBodyOrder,
      assignDataPositions
  }; 

  // Router navigation

  // Current route state
  let currentRoute = '/';
  let isInternalNavigation = false;

  // Handle route changes
  async function handleRouteChange() {
      const newRoute = window.location.pathname;
      if (newRoute === currentRoute) return;

      currentRoute = newRoute;

      // Handle scrolling based on whether this is an anchor link or route change
      if (!window.location.hash) {
          // This is a route change - scroll to top
          // Use a small delay to ensure content has loaded
          setTimeout(() => {
              // Scroll main page to top
              window.scrollTo({ top: 0, behavior: 'smooth' });
              
              // Find and scroll scrollable containers to top
              // Use a generic approach that works with any CSS framework
              // Only check elements that are likely to be scrollable containers
              const potentialContainers = document.querySelectorAll('div, main, section, article, aside, nav, header, footer, .prose');
              potentialContainers.forEach(element => {
                  const computedStyle = window.getComputedStyle(element);
                  const isScrollable = (
                      computedStyle.overflowY === 'auto' || 
                      computedStyle.overflowY === 'scroll' ||
                      computedStyle.overflow === 'auto' || 
                      computedStyle.overflow === 'scroll'
                  ) && element.scrollHeight > element.clientHeight;
                  
                  if (isScrollable) {
                      element.scrollTop = 0;
                  }
              });
          }, 50);
      } else {
          // This is an anchor link - let the browser handle the scroll naturally
          // Use a small delay to ensure content has loaded, then let browser scroll to anchor
          setTimeout(() => {
              // The browser will automatically scroll to the anchor
              // We just need to ensure the content is loaded first
          }, 50);
      }

      // Emit route change event
      window.dispatchEvent(new CustomEvent('indux:route-change', {
          detail: {
              from: currentRoute,
              to: newRoute,
              normalizedPath: newRoute === '/' ? '/' : newRoute.replace(/^\/|\/$/g, '')
          }
      }));
  }

  // Intercept link clicks to prevent page reloads
  function interceptLinkClicks() {
      // Use capture phase to intercept before other handlers
      document.addEventListener('click', (event) => {
          const link = event.target.closest('a');
          if (!link) return;

          const href = link.getAttribute('href');
          if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) return;
          
          // Handle pure anchor links normally - don't intercept them
          if (href.startsWith('#')) return;
          
          // Check if it's an external link FIRST (before any other processing)
          let isExternalLink = false;
          try {
              const url = new URL(href, window.location.origin);
              if (url.origin !== window.location.origin) {
                  isExternalLink = true; // External link
              }
          } catch (e) {
              // Invalid URL, treat as relative
          }

          // If it's an external link, don't intercept it
          if (isExternalLink) {
              return;
          }
          
          // Handle links with both route and anchor (e.g., /page#section)
          if (href.includes('#')) {
              const [path, hash] = href.split('#');
              
              event.preventDefault();
              event.stopPropagation();
              event.stopImmediatePropagation();

              // Set flag to prevent recursive calls
              isInternalNavigation = true;

              // Update URL without page reload
              history.pushState(null, '', href);

              // Handle route change (but don't scroll to top since there's an anchor)
              handleRouteChange();

              // Reset flag
              isInternalNavigation = false;
              
              // After route change, scroll to the anchor
              setTimeout(() => {
                  const targetElement = document.getElementById(hash);
                  if (targetElement) {
                      targetElement.scrollIntoView({ behavior: 'smooth' });
                  }
              }, 100);
              
              return;
          }

          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();

          // Set flag to prevent recursive calls
          isInternalNavigation = true;

          // Update URL without page reload
          history.pushState(null, '', href);

          // Handle route change
          handleRouteChange();

          // Reset flag
          isInternalNavigation = false;

      }, true); // Use capture phase
  }

  // Initialize navigation
  function initializeNavigation() {
      // Set initial route
      currentRoute = window.location.pathname;

      // Intercept link clicks
      interceptLinkClicks();

      // Listen for popstate events (browser back/forward)
      window.addEventListener('popstate', () => {
          if (!isInternalNavigation) {
              handleRouteChange();
          }
      });

      // Handle initial route
      handleRouteChange();
  }

  // Run immediately if DOM is ready, otherwise wait
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeNavigation);
  } else {
      initializeNavigation();
  }

  // Export navigation interface
  window.InduxRoutingNavigation = {
      initialize: initializeNavigation,
      getCurrentRoute: () => currentRoute
  }; 

  // Router visibility

  // Process visibility for all elements with x-route
  function processRouteVisibility(normalizedPath) {

      const routeElements = document.querySelectorAll('[x-route]');

      // First pass: collect all defined routes (excluding !* and other negative conditions)
      const definedRoutes = [];
      routeElements.forEach(element => {
          const routeCondition = element.getAttribute('x-route');
          if (!routeCondition) return;

          const conditions = routeCondition.split(',').map(cond => cond.trim());
          conditions.forEach(cond => {
              // Only collect positive conditions and wildcards (not negative ones)
              if (!cond.startsWith('!') && cond !== '!*') {
                  definedRoutes.push(cond);
              }
          });
      });

      // Extract localization codes from manifest.json data sources
      const localizationCodes = [];
      try {
          // Check if manifest is available and has data sources
          const manifest = window.InduxComponentsRegistry?.manifest || window.manifest;
          if (manifest && manifest.data) {
              Object.values(manifest.data).forEach(dataSource => {
                  if (typeof dataSource === 'object' && dataSource !== null) {
                      Object.keys(dataSource).forEach(key => {
                          // Check if this looks like a localization key (common language codes)
                          if (key.match(/^[a-z]{2}(-[A-Z]{2})?$/)) {
                              localizationCodes.push(key);
                          }
                      });
                  }
              });
          }
      } catch (e) {
          // Ignore errors if manifest is not available
      }

      // Check if current route is defined by any route
      let isRouteDefined = definedRoutes.some(route => 
          window.InduxRouting.matchesCondition(normalizedPath, route)
      );

      // Also check if the route starts with a localization code
      if (!isRouteDefined && localizationCodes.length > 0) {
          const pathSegments = normalizedPath.split('/').filter(segment => segment);
          if (pathSegments.length > 0) {
              const firstSegment = pathSegments[0];
              if (localizationCodes.includes(firstSegment)) {
                  // This is a localized route - check if the remaining path is defined
                  const remainingPath = pathSegments.slice(1).join('/');
                  
                  // If no remaining path, treat as root route
                  if (remainingPath === '') {
                      isRouteDefined = definedRoutes.some(route => 
                          window.InduxRouting.matchesCondition('/', route) || 
                          window.InduxRouting.matchesCondition('', route)
                      );
                  } else {
                      // Check if the remaining path matches any defined route
                      isRouteDefined = definedRoutes.some(route => 
                          window.InduxRouting.matchesCondition(remainingPath, route)
                      );
                  }
              }
          }
      }

      routeElements.forEach(element => {
          const routeCondition = element.getAttribute('x-route');
          if (!routeCondition) return;

          // Parse route conditions
          const conditions = routeCondition.split(',').map(cond => cond.trim());
          const positiveConditions = conditions.filter(cond => !cond.startsWith('!'));
          const negativeConditions = conditions
              .filter(cond => cond.startsWith('!'))
              .map(cond => cond.slice(1));

          // Special handling for !* (undefined routes)
          if (conditions.includes('!*')) {
              const shouldShow = !isRouteDefined;
              if (shouldShow) {
                  element.removeAttribute('hidden');
                  element.style.display = '';
              } else {
                  element.setAttribute('hidden', '');
                  element.style.display = 'none';
              }
              return;
          }

          // Check conditions
          const hasNegativeMatch = negativeConditions.some(cond =>
              window.InduxRouting.matchesCondition(normalizedPath, cond)
          );
          const hasPositiveMatch = positiveConditions.length === 0 || positiveConditions.some(cond =>
              window.InduxRouting.matchesCondition(normalizedPath, cond)
          );

          const shouldShow = hasPositiveMatch && !hasNegativeMatch;

          // Show/hide element
          if (shouldShow) {
              element.removeAttribute('hidden');
              element.style.display = '';
          } else {
              element.setAttribute('hidden', '');
              element.style.display = 'none';
          }
      });
  }

  // Add x-cloak to route elements that don't have it
  function addXCloakToRouteElements() {
      const routeElements = document.querySelectorAll('[x-route]:not([x-cloak])');
      routeElements.forEach(element => {
          element.setAttribute('x-cloak', '');
      });
  }

  // Initialize visibility management
  function initializeVisibility() {
      // Add x-cloak to route elements to prevent flash
      addXCloakToRouteElements();
      
      // Process initial visibility
      const currentPath = window.location.pathname;
      const normalizedPath = currentPath === '/' ? '/' : currentPath.replace(/^\/|\/$/g, '');
      processRouteVisibility(normalizedPath);

      // Listen for route changes
      window.addEventListener('indux:route-change', (event) => {
          processRouteVisibility(event.detail.normalizedPath);
      });

      // Listen for component processing to ensure visibility is applied after components load
      window.addEventListener('indux:components-processed', () => {
          // Add x-cloak to any new route elements
          addXCloakToRouteElements();
          
          const currentPath = window.location.pathname;
          const normalizedPath = currentPath === '/' ? '/' : currentPath.replace(/^\/|\/$/g, '');
          processRouteVisibility(normalizedPath);
      });
  }

  // Add x-cloak immediately to prevent flash
  if (document.readyState === 'loading') {
      // DOM is still loading, add x-cloak as soon as possible
      document.addEventListener('DOMContentLoaded', () => {
          addXCloakToRouteElements();
          initializeVisibility();
      });
  } else {
      // DOM is ready, add x-cloak immediately
      addXCloakToRouteElements();
      initializeVisibility();
  }

  // Export visibility interface
  window.InduxRoutingVisibility = {
      initialize: initializeVisibility,
      processRouteVisibility
  }; 

  // Router head

  // Track injected head content to prevent duplicates
  const injectedHeadContent = new Set();

  // Check if an element should be visible based on route conditions
  function shouldElementBeVisible(element, normalizedPath) {

      // Check if element has x-route attribute
      if (element.hasAttribute('x-route')) {
          const routeCondition = element.getAttribute('x-route');

          if (routeCondition) {
              const conditions = routeCondition.split(',').map(cond => cond.trim());
              const positiveConditions = conditions.filter(cond => !cond.startsWith('!'));
              const negativeConditions = conditions
                  .filter(cond => cond.startsWith('!'))
                  .map(cond => cond.slice(1));

              const hasNegativeMatch = negativeConditions.some(cond => {
                  const matches = window.InduxRouting.matchesCondition(normalizedPath, cond);
                  return matches;
              });

              const hasPositiveMatch = positiveConditions.length === 0 || positiveConditions.some(cond => {
                  const matches = window.InduxRouting.matchesCondition(normalizedPath, cond);
                  return matches;
              });

              const result = hasPositiveMatch && !hasNegativeMatch;
              return result;
          }
      }

      // Check parent elements for x-route
      const parentWithRoute = element.closest('[x-route]');
      if (parentWithRoute) {
          return shouldElementBeVisible(parentWithRoute, normalizedPath);
      }

      // If no route conditions, element is visible
      return true;
  }

  // Generate unique identifier for head content
  function generateHeadId(element) {
      const position = element.getAttribute('data-order');
      const componentId = element.getAttribute('data-component-id');
      const tagName = element.tagName.toLowerCase();

      if (position) {
          return `${tagName}-${position}`;
      } else if (componentId) {
          return `${tagName}-${componentId}`;
      } else {
          return `${tagName}-${Math.random().toString(36).substr(2, 9)}`;
      }
  }

  // Process head content for a single element
  function processElementHeadContent(element, normalizedPath) {
      let headTemplate = null;

      // Check if the element itself is a template with data-head
      if (element.tagName === 'TEMPLATE' && element.hasAttribute('data-head')) {
          headTemplate = element;
      } else {
          // Look for a template with data-head inside the element
          headTemplate = element.querySelector('template[data-head]');
      }

      if (!headTemplate) {
          return;
      }

      const headId = generateHeadId(element);
      const isVisible = shouldElementBeVisible(element, normalizedPath);

      if (isVisible) {
          // Check if we've already injected this content
          if (injectedHeadContent.has(headId)) {
              return;
          }

          // Add new head content
          Array.from(headTemplate.content.children).forEach(child => {
              if (child.tagName === 'SCRIPT') {
                  // For scripts, create and execute directly
                  const script = document.createElement('script');
                  script.textContent = child.textContent;
                  script.setAttribute('data-route-head', headId);
                  document.head.appendChild(script);
              } else {
                  // For other elements, clone and add
                  const clonedChild = child.cloneNode(true);
                  clonedChild.setAttribute('data-route-head', headId);
                  document.head.appendChild(clonedChild);
              }
          });

          injectedHeadContent.add(headId);
      } else {
          // Element is not visible, remove any existing head content for this element
          const existingHead = document.head.querySelectorAll(`[data-route-head="${headId}"]`);
          existingHead.forEach(el => {
              el.remove();
          });
          injectedHeadContent.delete(headId);
      }
  }

  // Process all head content in the DOM
  function processAllHeadContent(normalizedPath) {

      // Find all elements with head templates
      const elementsWithHead = document.querySelectorAll('template[data-head]');

      // Debug: Let's see what's actually in the DOM
      const allTemplates = document.querySelectorAll('template');
      allTemplates.forEach((template, index) => {
          if (template.hasAttribute('data-head')) ; else {
              // Check if this might be the about template
              if (template.getAttribute('x-route') === 'about') ;
          }
      });

      // Also try a more specific selector to see if we can find the about template
      document.querySelector('template[x-route="about"]');

      // Process each element's head content
      elementsWithHead.forEach((template, index) => {

          // For component templates, we need to check if the component should be visible
          // based on the current route, not just the template's own attributes
          let element = template;
          let shouldProcess = true;

          // If this is a component template (has data-component), check if the component
          // should be visible for the current route
          if (template.hasAttribute('data-component')) {
              template.getAttribute('data-component');
              const componentRoute = template.getAttribute('x-route');

              // Check if this component should be visible for the current route
              if (componentRoute) {
                  const isVisible = window.InduxRouting.matchesCondition(normalizedPath, componentRoute);
                  shouldProcess = isVisible;
              } else {
                  shouldProcess = false;
              }
          } else {
              // For non-component templates, use the existing logic
              element = template.closest('[data-order], [data-component-id], [x-route]');

              // If the template itself has the attributes we need, use it directly
              if (!element || element === template) {
                  if (template.hasAttribute('data-order') || template.hasAttribute('data-component') || template.hasAttribute('x-route')) {
                      element = template;
                  } else {
                      element = template.parentElement;
                  }
              }

              if (element) {
                  const isVisible = shouldElementBeVisible(element, normalizedPath);
                  shouldProcess = isVisible;
              }
          }

          if (shouldProcess) {
              // For component templates, process them directly since we've already determined visibility
              if (template.hasAttribute('data-component')) {
                  processElementHeadContent(template, normalizedPath);
              } else {
                  // For non-component templates, use the existing logic
                  processElementHeadContent(element, normalizedPath);
              }
          }
      });
  }

  // Initialize head content management
  function initializeHeadContent() {
      // Wait for components to be ready before processing head content
      function processHeadContentAfterComponentsReady() {
          // Process initial head content after a longer delay to let components settle
          setTimeout(() => {
              const currentPath = window.location.pathname;
              const normalizedPath = currentPath === '/' ? '/' : currentPath.replace(/^\/|\/$/g, '');

              // Debug: Check if about component exists
              document.querySelector('[data-component="about-1"]');

              // Debug: Check what placeholders exist
              const placeholders = document.querySelectorAll('x-about, x-home, x-ui');
              placeholders.forEach((placeholder, index) => {
              });

              processAllHeadContent(normalizedPath);
          }, 200);
      }

      // Function to process head content immediately (for projects without components)
      function processHeadContentImmediately() {
          const currentPath = window.location.pathname;
          const normalizedPath = currentPath === '/' ? '/' : currentPath.replace(/^\/|\/$/g, '');
          processAllHeadContent(normalizedPath);
      }

      // Check if components system exists
      if (window.InduxComponents) {
          // Components system exists - wait for it to be fully processed
          if (window.__induxComponentsInitialized) {
              // Components are initialized, but we need to wait for them to be processed
              // Check if components have already been processed
              if (document.querySelector('[data-component]')) {
                  processHeadContentAfterComponentsReady();
              } else {
                  // Wait for components to be processed
                  window.addEventListener('indux:components-processed', processHeadContentAfterComponentsReady);
              }
          } else {
              // Wait for components to be ready, then wait for them to be processed
              window.addEventListener('indux:components-ready', () => {
                  window.addEventListener('indux:components-processed', processHeadContentAfterComponentsReady);
              });
          }
      } else {
          // No components system - process immediately
          processHeadContentImmediately();
      }

      // Listen for route changes - process immediately after components are ready
      window.addEventListener('indux:route-change', (event) => {

          // Wait a bit for components to settle after route change
          setTimeout(() => {
              // Process head content immediately to catch components before they're reverted
              const currentPath = window.location.pathname;
              const normalizedPath = currentPath === '/' ? '/' : currentPath.replace(/^\/|\/$/g, '');

              // Debug: Check if about component exists
              document.querySelector('[data-component="about-1"]');

              // Debug: Check what placeholders exist
              const placeholders = document.querySelectorAll('x-about, x-home, x-ui');
              placeholders.forEach((placeholder, index) => {
              });

              processAllHeadContent(normalizedPath);
          }, 100);
      });
  }

  // Run immediately if DOM is ready, otherwise wait
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeHeadContent);
  } else {
      initializeHeadContent();
  }

  // Export head content interface
  window.InduxRoutingHead = {
      initialize: initializeHeadContent,
      processElementHeadContent,
      processAllHeadContent
  }; 

  // Router anchors

  // Anchors functionality
  function initializeAnchors() {
      
      // Register anchors directive  
      Alpine.directive('anchors', (el, { expression, modifiers }, { effect, evaluateLater, Alpine }) => {

          
          try {
              // Parse pipeline syntax: 'scope | targets'
              const parseExpression = (expr) => {
                  if (!expr || expr.trim() === '') {
                      return { scope: '', targets: 'h1, h2, h3, h4, h5, h6' };
                  }
                  
                  if (expr.includes('|')) {
                      const parts = expr.split('|').map(p => p.trim());
                      return {
                          scope: parts[0] || '',
                          targets: parts[1] || 'h1, h2, h3, h4, h5, h6'
                      };
                  } else {
                      return { scope: '', targets: expr };
                  }
              };
              
              // Extract anchors function
              const extractAnchors = (expr) => {
                  const parsed = parseExpression(expr);
                  
                  let containers = [];
                  if (!parsed.scope) {
                      containers = [document.body];
                  } else {
                      containers = Array.from(document.querySelectorAll(parsed.scope));
                  }
                  
                  let elements = [];
                  const targets = parsed.targets.split(',').map(t => t.trim());
                  
                  containers.forEach(container => {
                      // Query all targets at once, then filter and sort by DOM order
                      const allMatches = [];
                      targets.forEach(target => {
                          const matches = container.querySelectorAll(target);
                          allMatches.push(...Array.from(matches));
                      });
                      
                      // Remove duplicates and sort by DOM order
                      const uniqueMatches = [...new Set(allMatches)];
                      uniqueMatches.sort((a, b) => {
                          const position = a.compareDocumentPosition(b);
                          if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
                          if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
                          return 0;
                      });
                      
                      elements.push(...uniqueMatches);
                  });
                  
                  return elements.map((element, index) => {
                      // Generate simple ID
                      let id = element.id;
                      if (!id) {
                          id = element.textContent.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
                          if (id) element.id = id;
                      }

                      // Selected state will be managed by intersection observer

                      return {
                          id: id,
                          text: element.textContent,
                          link: `#${id}`,
                          tag: element.tagName.toLowerCase(),
                          class: element.className.split(' ')[0] || '',
                          classes: Array.from(element.classList),
                          index: index,
                          element: element,

                      };
                  });
              };
              
              // Track rendered elements to prevent duplicates
              let renderedElements = [];
              
              // Update Alpine data with anchors
              const updateAnchors = (anchors) => {
                  // Remove existing rendered elements if they exist
                  renderedElements.forEach(element => {
                      if (element.parentElement) {
                          element.remove();
                      }
                  });
                  renderedElements = [];
                  
                  // Set Alpine reactive property for anchor count
                  Alpine.store('anchors', { count: anchors.length });
                  
                  // Render using the template element's structure and classes
                  if (anchors.length > 0) {
                      // Find the container div inside the template
                      const templateContent = el.content || el;
                      const containerTemplate = templateContent.querySelector('div') || el.querySelector('div');
                      
                      if (containerTemplate) {
                          // Clone the container div from the template
                          const containerElement = containerTemplate.cloneNode(false); // Don't clone children
                          
                          // Remove Alpine directives from the container
                          containerElement.removeAttribute('x-show');
                          
                          anchors.forEach(anchor => {
                              // Find the <a> element inside the template
                              const anchorTemplate = templateContent.querySelector('a') || el.querySelector('a');
                              
                              if (anchorTemplate) {
                                  // Clone the <a> element from inside the template
                                  const linkElement = anchorTemplate.cloneNode(true);
                                  
                                  // Remove Alpine directives
                                  linkElement.removeAttribute('x-text');
                                  linkElement.removeAttribute(':href');
                                  
                                  // Set the actual href and text content
                                  linkElement.href = anchor.link;
                                  linkElement.textContent = anchor.text;
                                  
                                  // Evaluate :class binding if present
                                  if (linkElement.hasAttribute(':class')) {
                                      const classBinding = linkElement.getAttribute(':class');
                                      linkElement.removeAttribute(':class');
                                      
                                      try {
                                          // Create a simple evaluator for class bindings
                                          const evaluateClassBinding = (binding, anchor) => {
                                              // Replace anchor.property references with actual values
                                              let evaluated = binding
                                                  .replace(/anchor\.tag/g, `'${anchor.tag}'`)
                                                  .replace(/anchor\.selected/g, anchor.selected ? 'true' : 'false')
                                                  .replace(/anchor\.index/g, anchor.index)
                                                  .replace(/anchor\.id/g, `'${anchor.id}'`)
                                                  .replace(/anchor\.text/g, `'${anchor.text.replace(/'/g, "\\'")}'`)
                                                  .replace(/anchor\.link/g, `'${anchor.link}'`)
                                                  .replace(/anchor\.class/g, `'${anchor.class}'`);
                                              
                                              // Simple object evaluation for class bindings
                                              if (evaluated.includes('{') && evaluated.includes('}')) {
                                                  // Extract the object part
                                                  const objectMatch = evaluated.match(/\{([^}]+)\}/);
                                                  if (objectMatch) {
                                                      const objectContent = objectMatch[1];
                                                      const classPairs = objectContent.split(',').map(pair => pair.trim());
                                                      
                                                      classPairs.forEach(pair => {
                                                          const [className, condition] = pair.split(':').map(s => s.trim());
                                                          if (condition && eval(condition)) {
                                                              linkElement.classList.add(className.replace(/['"]/g, ''));
                                                          }
                                                      });
                                                  }
                                              }
                                          };
                                          
                                          evaluateClassBinding(classBinding, anchor);
                                      } catch (error) {
                                          console.warn('[Indux Anchors] Could not evaluate class binding:', classBinding, error);
                                      }
                                  }
                                  
                                  containerElement.appendChild(linkElement);
                              }
                          });
                          
                          // Insert the container before the template element
                          el.parentElement.insertBefore(containerElement, el);
                          renderedElements.push(containerElement);
                      } else {
                          // Fallback: insert links directly if no container found
                          anchors.forEach(anchor => {
                              const templateContent = el.content || el;
                              const anchorTemplate = templateContent.querySelector('a') || el.querySelector('a');
                              
                              if (anchorTemplate) {
                                  const linkElement = anchorTemplate.cloneNode(true);
                                  linkElement.removeAttribute('x-text');
                                  linkElement.removeAttribute(':href');
                                  linkElement.href = anchor.link;
                                  linkElement.textContent = anchor.text;
                                  
                                  // Evaluate :class binding if present
                                  if (linkElement.hasAttribute(':class')) {
                                      const classBinding = linkElement.getAttribute(':class');
                                      linkElement.removeAttribute(':class');
                                      
                                      try {
                                          // Create a simple evaluator for class bindings
                                          const evaluateClassBinding = (binding, anchor) => {
                                              // Replace anchor.property references with actual values
                                              let evaluated = binding
                                                  .replace(/anchor\.tag/g, `'${anchor.tag}'`)
                                                  .replace(/anchor\.selected/g, anchor.selected ? 'true' : 'false')
                                                  .replace(/anchor\.index/g, anchor.index)
                                                  .replace(/anchor\.id/g, `'${anchor.id}'`)
                                                  .replace(/anchor\.text/g, `'${anchor.text.replace(/'/g, "\\'")}'`)
                                                  .replace(/anchor\.link/g, `'${anchor.link}'`)
                                                  .replace(/anchor\.class/g, `'${anchor.class}'`);
                                              
                                              // Simple object evaluation for class bindings
                                              if (evaluated.includes('{') && evaluated.includes('}')) {
                                                  // Extract the object part
                                                  const objectMatch = evaluated.match(/\{([^}]+)\}/);
                                                  if (objectMatch) {
                                                      const objectContent = objectMatch[1];
                                                      const classPairs = objectContent.split(',').map(pair => pair.trim());
                                                      
                                                      classPairs.forEach(pair => {
                                                          const [className, condition] = pair.split(':').map(s => s.trim());
                                                          if (condition && eval(condition)) {
                                                              linkElement.classList.add(className.replace(/['"]/g, ''));
                                                          }
                                                      });
                                                  }
                                              }
                                          };
                                          
                                          evaluateClassBinding(classBinding, anchor);
                                      } catch (error) {
                                          console.warn('[Indux Anchors] Could not evaluate class binding:', classBinding, error);
                                      }
                                  }
                                  
                                  el.parentElement.insertBefore(linkElement, el);
                                  renderedElements.push(linkElement);
                              }
                          });
                      }
                      
                      el.style.display = 'none'; // Hide template
                  } else {
                      // No anchors - ensure template is visible and elements are cleared
                      el.style.display = '';
                  }
              };
              
              // Try extraction and update data
              const tryExtraction = () => {
                  const anchors = extractAnchors(expression);
                  updateAnchors(anchors);
                  return anchors;
              };
              
              // Try extraction with progressive delays and content detection
              const attemptExtraction = (attempt = 1, maxAttempts = 10) => {
                  const anchors = extractAnchors(expression);
                  
                  if (anchors.length > 0) {
                      updateAnchors(anchors);
                      return true;
                  } else if (attempt < maxAttempts) {
                      setTimeout(() => {
                          attemptExtraction(attempt + 1, maxAttempts);
                      }, attempt * 200); // Progressive delay: 200ms, 400ms, 600ms, etc.
                  } else {
                      // No anchors found after all attempts, update store to clear previous state
                      updateAnchors([]);
                  }
                  return false;
              };
              
              // Store refresh function on element for route changes
              el._x_anchorRefresh = () => {
                  attemptExtraction();
              };
              
              // Start extraction attempts
              attemptExtraction();
              
              
          } catch (error) {
              console.error('[Indux Anchors] Error in directive:', error);
          }
      });
  }

  // Initialize anchors when Alpine is ready
  document.addEventListener('alpine:init', () => {

      try {
          initializeAnchors();

      } catch (error) {
          console.error('[Indux Anchors] Failed to initialize:', error);
      }
  });

  // Refresh anchors when route changes
  window.addEventListener('indux:route-change', () => {
      // Immediately clear the store to hide the h5 element
      Alpine.store('anchors', { count: 0 });
      
      // Wait longer for content to load after route change
      setTimeout(() => {
          const anchorElements = document.querySelectorAll('[x-anchors]');
          anchorElements.forEach(el => {
              const expression = el.getAttribute('x-anchors');
              if (expression && el._x_anchorRefresh) {
                  el._x_anchorRefresh();
              }
          });
      }, 200);
  });

  // Refresh anchors when hash changes (for active state updates)
  window.addEventListener('hashchange', () => {
      const anchorElements = document.querySelectorAll('[x-anchors]');
      anchorElements.forEach(el => {
          if (el._x_anchorRefresh) {
              el._x_anchorRefresh();
          }
      });
  });

  // Also refresh anchors when components are processed
  window.addEventListener('indux:components-processed', () => {
      setTimeout(() => {
          const anchorElements = document.querySelectorAll('[x-anchors]');
          anchorElements.forEach(el => {
              const expression = el.getAttribute('x-anchors');
              if (expression && el._x_anchorRefresh) {
                  el._x_anchorRefresh();
              }
          });
      }, 100);
  }); 

  // Export anchors interface
  window.InduxRoutingAnchors = {
      initialize: initializeAnchors
  };


  // Router magic property

  // Initialize router magic property
  function initializeRouterMagic() {
      // Check if Alpine is available
      if (typeof Alpine === 'undefined') {
          console.error('[Indux Router Magic] Alpine is not available');
          return;
      }
      
      // Create a reactive object for route data
      const route = Alpine.reactive({
          current: window.location.pathname,
          segments: [],
          params: {},
          matches: null
      });

      // Update route when route changes
      const updateRoute = () => {
          const currentRoute = window.InduxRoutingNavigation?.getCurrentRoute() || window.location.pathname;
          
          // Strip localization codes and other injected segments to get the logical route
          let logicalRoute = currentRoute;
          
          // Check if there's a localization code at the start of the path
          const pathParts = currentRoute.split('/').filter(Boolean);
          if (pathParts.length > 0) {
              // Check if first segment is a language code (2-5 characters, alphanumeric with hyphens/underscores)
              const firstSegment = pathParts[0];
              if (/^[a-zA-Z0-9_-]{2,5}$/.test(firstSegment)) {
                  // This might be a language code, check if it's in the available locales
                  const store = Alpine.store('locale');
                  if (store && store.available && store.available.includes(firstSegment)) {
                      // Remove the language code from the path
                      logicalRoute = '/' + pathParts.slice(1).join('/');
                      if (logicalRoute === '/') logicalRoute = '/';
                  }
              }
          }
          
          const normalizedPath = logicalRoute === '/' ? '' : logicalRoute.replace(/^\/|\/$/g, '');
          const segments = normalizedPath ? normalizedPath.split('/').filter(segment => segment) : [];
          
          route.current = logicalRoute;
          route.segments = segments;
          route.params = {};
      };

      // Listen for route changes
      window.addEventListener('indux:route-change', updateRoute);
      window.addEventListener('popstate', updateRoute);
      
      // Register $route magic property - return the route string directly
      Alpine.magic('route', () => route.current);
  }

  // Initialize when Alpine is ready and router is ready
  document.addEventListener('alpine:init', () => {
      // Wait for router to be ready
      const waitForRouter = () => {
          if (window.InduxRoutingNavigation && window.InduxRouting) {
              try {
                  initializeRouterMagic();
              } catch (error) {
                  console.error('[Indux Router Magic] Failed to initialize:', error);
              }
          } else {
              // Wait a bit more for router to initialize
              setTimeout(waitForRouter, 50);
          }
      };
      
      waitForRouter();
  });

  // Also try to initialize immediately if Alpine and router are already available
  if (typeof Alpine !== 'undefined' && window.InduxRoutingNavigation && window.InduxRouting) {
      try {
          initializeRouterMagic();
      } catch (error) {
          console.error('[Indux Router Magic] Failed to initialize immediately:', error);
      }
  }

  // Export magic property interface
  window.InduxRoutingMagic = {
      initialize: initializeRouterMagic
  };

  /* Indux Slides */

  function initializeCarouselPlugin() {

      Alpine.directive('carousel', (el, { value, modifiers, expression }, { evaluate, effect }) => {
          const state = {
              carousel: {
                  autoplay: modifiers.includes('autoplay'),
                  interval: 3000,
                  loop: modifiers.includes('loop'),
                  arrows: modifiers.includes('arrows'),
                  dots: modifiers.includes('dots'),
                  thumbnails: modifiers.includes('thumbnails'),
                  enableDrag: !modifiers.includes('no-drag')
              },
              currentSlide: 0,
              dragging: false,
              startX: 0,

              // Get total slides by counting actual DOM elements
              get totalSlides() {
                  const track = el.querySelector('.carousel-slides');
                  if (!track) return 0;
                  return Array.from(track.children).filter(child =>
                      child.tagName !== 'TEMPLATE'
                  ).length;
              },

              // Navigation methods
              next() {
                  const total = this.totalSlides;
                  if (this.currentSlide >= total - 1) {
                      if (this.carousel.loop) {
                          this.currentSlide = 0;
                      }
                  } else {
                      this.currentSlide++;
                  }
              },

              prev() {
                  const total = this.totalSlides;
                  if (this.currentSlide <= 0) {
                      if (this.carousel.loop) {
                          this.currentSlide = total - 1;
                      }
                  } else {
                      this.currentSlide--;
                  }
              },

              goToSlide(index) {
                  const total = this.totalSlides;
                  if (index >= 0 && index < total) {
                      this.currentSlide = index;
                  }
              },

              // Drag handlers
              startDrag(e) {
                  if (!this.carousel.enableDrag) return;
                  this.dragging = true;
                  this.startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
              },

              drag(e) {
                  if (!this.dragging) return;
                  e.preventDefault();
                  const currentX = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
                  const diff = currentX - this.startX;

                  if (Math.abs(diff) > 50) {
                      if (diff > 0) {
                          this.prev();
                      } else {
                          this.next();
                      }
                      this.dragging = false;
                  }
              },

              endDrag() {
                  this.dragging = false;
              },

              // Add this method to generate dots array
              get dots() {
                  return Array.from({ length: this.totalSlides }, (_, i) => ({
                      index: i,
                      active: i === this.currentSlide
                  }));
              }
          };

          Alpine.bind(el, {
              'x-data'() {
                  return state;
              },

              'x-init'() {
                  setTimeout(() => {
                      const track = el.querySelector('.carousel-slides');
                      if (!track) {
                          console.warn('[Indux] Carousel track element not found. Expected element with class "carousel-slides"');
                          return;
                      }

                      // Setup autoplay if enabled
                      if (this.carousel.autoplay) {
                          let interval;

                          const startAutoplay = () => {
                              interval = setInterval(() => this.next(), this.carousel.interval);
                          };

                          const stopAutoplay = () => {
                              clearInterval(interval);
                          };

                          // Start autoplay
                          startAutoplay();

                          // Pause on hover if autoplay is enabled
                          el.addEventListener('mouseenter', stopAutoplay);
                          el.addEventListener('mouseleave', startAutoplay);

                          // Clean up on element removal
                          el._x_cleanups = el._x_cleanups || [];
                          el._x_cleanups.push(() => {
                              stopAutoplay();
                              el.removeEventListener('mouseenter', stopAutoplay);
                              el.removeEventListener('mouseleave', startAutoplay);
                          });
                      }
                  }, 0);
              }
          });
      });
  }

  // Handle both DOMContentLoaded and alpine:init
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
          if (window.Alpine) initializeCarouselPlugin();
      });
  }

  document.addEventListener('alpine:init', initializeCarouselPlugin);

  /* Indux Tabs */

  // Simple tabs plugin that acts as a proxy for Alpine's native functionality
  function initializeTabsPlugin() {
      // Process all tab elements
      function processTabs() {
          // Find all x-tab elements
          const tabButtons = document.querySelectorAll('[x-tab]');
          const tabPanels = document.querySelectorAll('[x-tabpanel]');
          
          if (tabButtons.length === 0 && tabPanels.length === 0) {
              return;
          }
          
          // Group panels by their x-tabpanel value
          const panelGroups = {};
          tabPanels.forEach(panel => {
              const panelSet = panel.getAttribute('x-tabpanel') || '';
              const panelId = panel.id || panel.className.split(' ')[0];
              if (panelId) {
                  if (!panelGroups[panelSet]) panelGroups[panelSet] = [];
                  panelGroups[panelSet].push({ element: panel, id: panelId });
              }
          });
          
          // Process each panel group
          Object.entries(panelGroups).forEach(([panelSet, panels]) => {
              const tabProp = panelSet ? `tab_${panelSet}` : 'tab';
              
              // Find the common parent (body or closest x-data element)
              let commonParent = document.body;
              if (panels.length > 0) {
                  commonParent = panels[0].element.closest('[x-data]') || document.body;
              }
              
              // Ensure x-data exists
              if (!commonParent.hasAttribute('x-data')) {
                  commonParent.setAttribute('x-data', '{}');
              }
              
              // Set up x-data with default value
              const existingXData = commonParent.getAttribute('x-data') || '{}';
              let newXData = existingXData;
              
              // Check if the tab property already exists
              const propertyRegex = new RegExp(`${tabProp}\\s*:\\s*'[^']*'`, 'g');
              if (!propertyRegex.test(newXData)) {
                  // Add the tab property with default value (first panel's id)
                  const defaultValue = panels.length > 0 ? panels[0].id : 'a';
                  const tabProperty = `${tabProp}: '${defaultValue}'`;
                  
                  if (newXData === '{}') {
                      newXData = `{ ${tabProperty} }`;
                  } else {
                      const lastBraceIndex = newXData.lastIndexOf('}');
                      if (lastBraceIndex > 0) {
                          const beforeBrace = newXData.substring(0, lastBraceIndex);
                          const afterBrace = newXData.substring(lastBraceIndex);
                          const separator = beforeBrace.trim().endsWith(',') ? '' : ', ';
                          newXData = beforeBrace + separator + tabProperty + afterBrace;
                      }
                  }
                  
                  if (newXData !== existingXData) {
                      commonParent.setAttribute('x-data', newXData);
                  }
              }
              
              // Process panels for this group - add x-show attributes FIRST
              panels.forEach(panel => {
                  const showCondition = `${tabProp} === '${panel.id}'`;
                  panel.element.setAttribute('x-show', showCondition);
                  
                  // Remove x-tabpanel attribute since we've converted it
                  panel.element.removeAttribute('x-tabpanel');
              });
              
              // Process tab buttons for this panel set
              tabButtons.forEach(button => {
                  const tabValue = button.getAttribute('x-tab');
                  if (!tabValue) return;
                  
                  // Check if this button targets panels in this group
                  const targetsThisGroup = panels.some(panel => panel.id === tabValue);
                  if (!targetsThisGroup) return;
                  
                  // Set up click handler
                  const clickHandler = `${tabProp} = '${tabValue}'`;
                  button.setAttribute('x-on:click', clickHandler);
                  
                  // Remove x-tab attribute since we've converted it
                  button.removeAttribute('x-tab');
              });
          });
      }
      
      // Wait for components to be ready first
      document.addEventListener('indux:components-ready', () => {
          setTimeout(processTabs, 100); // Small delay to ensure DOM is settled
      });
      
      // Also listen for components-processed event
      document.addEventListener('indux:components-processed', () => {
          setTimeout(processTabs, 100);
      });
      
      // Also run on DOMContentLoaded as a fallback for non-component pages
      document.addEventListener('DOMContentLoaded', () => {
          setTimeout(processTabs, 100);
      });
      
      // Add a fallback timer to catch cases where events don't fire
      setTimeout(() => {
          processTabs();
      }, 2000);
  }

  // Initialize the plugin
  initializeTabsPlugin();

  /* Indux Themes */

  // Initialize plugin when either DOM is ready or Alpine is ready
  function initializeThemePlugin() {

      // Initialize theme state with Alpine reactivity
      const theme = Alpine.reactive({
          current: localStorage.getItem('theme') || 'system'
      });

      // Apply initial theme
      applyTheme(theme.current);

      // Setup system theme listener
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', () => {
          if (theme.current === 'system') {
              applyTheme('system');
          }
      });

      // Register theme directive
      Alpine.directive('theme', (el, { expression }, { evaluate, cleanup }) => {

          const handleClick = () => {
              const newTheme = expression === 'toggle'
                  ? (document.documentElement.classList.contains('dark') ? 'light' : 'dark')
                  : evaluate(expression);
              setTheme(newTheme);
          };

          el.addEventListener('click', handleClick);
          cleanup(() => el.removeEventListener('click', handleClick));
      });

      // Add $theme magic method
      Alpine.magic('theme', () => ({
          get current() {
              return theme.current
          },
          set current(value) {
              setTheme(value);
          }
      }));

      function setTheme(newTheme) {
          if (newTheme === 'toggle') {
              newTheme = theme.current === 'light' ? 'dark' : 'light';
          }

          // Update theme state
          theme.current = newTheme;
          localStorage.setItem('theme', newTheme);

          // Apply theme
          applyTheme(newTheme);
      }

      function applyTheme(theme) {
          const isDark = theme === 'system'
              ? window.matchMedia('(prefers-color-scheme: dark)').matches
              : theme === 'dark';

          // Update document classes
          document.documentElement.classList.remove('light', 'dark');
          document.documentElement.classList.add(isDark ? 'dark' : 'light');

          // Update meta theme-color
          const metaThemeColor = document.querySelector('meta[name="theme-color"]');
          if (metaThemeColor) {
              metaThemeColor.setAttribute('content', isDark ? '#000000' : '#FFFFFF');
          }
      }
  }

  // Handle both DOMContentLoaded and alpine:init
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
          if (window.Alpine) {
              initializeThemePlugin();
          }
      });
  }

  document.addEventListener('alpine:init', initializeThemePlugin);

  /* Indux Toasts */

  const TOAST_DURATION = 3000; // Default duration in ms

  function initializeToastPlugin() {

      // Helper function to get or create container
      const getContainer = () => {
          let container = document.querySelector('.toast-container');
          if (!container) {
              container = document.createElement('div');
              container.className = 'toast-container';
              document.body.appendChild(container);
          }
          return container;
      };

      // Helper function to create icon element
      const createIconElement = (iconName) => {
          const iconSpan = document.createElement('span');
          iconSpan.className = 'iconify';
          iconSpan.setAttribute('data-icon', iconName);
          if (window.Iconify) {
              window.Iconify.scan(iconSpan);
          }
          return iconSpan;
      };

      // Helper function to show toast
      const showToast = (message, { type = '', duration = TOAST_DURATION, dismissible = false, fixed = false, icon = null } = {}) => {
          const container = getContainer();

          // Create toast element
          const toast = document.createElement('div');
          toast.setAttribute('role', 'alert');
          toast.setAttribute('class', type ? `toast ${type}` : 'toast');

          // Create content with optional icon
          const contentHtml = `
            ${icon ? '<span class="toast-icon"></span>' : ''}
            <div class="toast-content">${message}</div>
            ${dismissible || fixed ? '<button class="toast-dismiss-button" aria-label="Dismiss"></button>' : ''}
        `;

          toast.innerHTML = contentHtml;

          // Add icon if specified
          if (icon) {
              const iconContainer = toast.querySelector('.toast-icon');
              iconContainer.appendChild(createIconElement(icon));
          }

          // Add to container
          container.appendChild(toast);

          // Force a reflow before adding the entry class
          requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                  toast.classList.add('toast-entry');
              });
          });

          // Handle dismiss button if present
          if (dismissible || fixed) {
              toast.querySelector('.toast-dismiss-button')?.addEventListener('click', () => {
                  removeToast(toast);
              });
          }

          // Auto dismiss after duration (unless fixed)
          if (!fixed) {
              const timeout = setTimeout(() => {
                  removeToast(toast);
              }, duration);

              // Pause timer on hover
              toast.addEventListener('mouseenter', () => {
                  clearTimeout(timeout);
              });

              // Resume timer on mouse leave
              toast.addEventListener('mouseleave', () => {
                  setTimeout(() => {
                      removeToast(toast);
                  }, duration / 2);
              });
          }
      };

      // Helper function to remove toast with animation
      const removeToast = (toast) => {
          toast.classList.remove('toast-entry');
          toast.classList.add('toast-exit');

          // Track all transitions
          let transitions = 0;
          const totalTransitions = 2; // opacity and transform

          toast.addEventListener('transitionend', (e) => {
              transitions++;
              // Only remove the toast after all transitions complete
              if (transitions >= totalTransitions) {
                  // Set height to 0 and opacity to 0 before removing
                  // This allows other toasts to smoothly animate to their new positions
                  toast.style.height = `${toast.offsetHeight}px`;
                  toast.offsetHeight; // Force reflow
                  toast.style.height = '0';
                  toast.style.margin = '0';
                  toast.style.padding = '0';

                  // Finally remove the element after the collapse animation
                  toast.addEventListener('transitionend', () => {
                      toast.remove();
                  }, { once: true });
              }
          });
      };

      // Add toast directive
      Alpine.directive('toast', (el, { modifiers, expression }, { evaluate }) => {
          // Parse options from modifiers
          const options = {
              type: modifiers.includes('brand') ? 'brand' :
                  modifiers.includes('positive') ? 'positive' :
                  modifiers.includes('negative') ? 'negative' :
                  modifiers.includes('accent') ? 'accent' : '',
              dismissible: modifiers.includes('dismiss'),
              fixed: modifiers.includes('fixed')
          };

          // Find duration modifier (any number)
          const durationModifier = modifiers.find(mod => !isNaN(mod));
          if (durationModifier) {
              options.duration = Number(durationModifier);
          } else {
              options.duration = modifiers.includes('long') ? TOAST_DURATION * 2 : TOAST_DURATION;
          }

          // Handle both static and dynamic expressions
          let message;
          try {
              // Check if expression starts with $x (data sources)
              if (expression.startsWith('$x.')) {
                  // Use evaluate for $x expressions to access collections
                  message = evaluate(expression);
              } else if (expression.includes('+') || expression.includes('`') || expression.includes('${')) {
                  // Try to evaluate as a dynamic expression
                  message = evaluate(expression);
              } else {
                  // Use as static string
                  message = expression;
              }
          } catch (e) {
              // If evaluation fails, use the expression as a static string
              message = expression;
          }

          // Store the toast options on the element
          el._toastOptions = { message, options };

          // Add click handler that works with other handlers
          const originalClick = el.onclick;
          el.onclick = (e) => {
              // Call original click handler if it exists
              if (originalClick) {
                  originalClick.call(el, e);
              }
              // Show toast after original handler
              showToast(message, options);
          };
      });

      // Add toast magic to Alpine
      Alpine.magic('toast', () => {
          // Create the base toast function
          const toast = (message, options = {}) => {
              showToast(message, { ...options, type: '' });
          };

          // Add type methods
          toast.brand = (message, options = {}) => {
              showToast(message, { ...options, type: 'brand' });
          };

          toast.accent = (message, options = {}) => {
              showToast(message, { ...options, type: 'accent' });
          };

          toast.positive = (message, options = {}) => {
              showToast(message, { ...options, type: 'positive' });
          };

          toast.negative = (message, options = {}) => {
              showToast(message, { ...options, type: 'negative' });
          };

          // Add dismiss variants
          toast.dismiss = (message, options = {}) => {
              showToast(message, { ...options, type: '', dismissible: true });
          };

          toast.brand.dismiss = (message, options = {}) => {
              showToast(message, { ...options, type: 'brand', dismissible: true });
          };

          toast.accent.dismiss = (message, options = {}) => {
              showToast(message, { ...options, type: 'accent', dismissible: true });
          };

          toast.positive.dismiss = (message, options = {}) => {
              showToast(message, { ...options, type: 'positive', dismissible: true });
          };

          toast.negative.dismiss = (message, options = {}) => {
              showToast(message, { ...options, type: 'negative', dismissible: true });
          };

          // Add fixed variants
          toast.fixed = (message, options = {}) => {
              showToast(message, { ...options, type: '', fixed: true });
          };

          toast.brand.fixed = (message, options = {}) => {
              showToast(message, { ...options, type: 'brand', fixed: true });
          };

          toast.accent.fixed = (message, options = {}) => {
              showToast(message, { ...options, type: 'accent', fixed: true });
          };

          toast.positive.fixed = (message, options = {}) => {
              showToast(message, { ...options, type: 'positive', fixed: true });
          };

          toast.negative.fixed = (message, options = {}) => {
              showToast(message, { ...options, type: 'negative', fixed: true });
          };

          return toast;
      });
  }

  // Handle both DOMContentLoaded and alpine:init
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
          if (window.Alpine) initializeToastPlugin();
      });
  }

  document.addEventListener('alpine:init', initializeToastPlugin);

  var indux_tooltips = {};

  /* Indux Tooltips */

  var hasRequiredIndux_tooltips;

  function requireIndux_tooltips () {
  	if (hasRequiredIndux_tooltips) return indux_tooltips;
  	hasRequiredIndux_tooltips = 1;
  	// Get tooltip hover delay from CSS variable
  	function getTooltipHoverDelay(element) {
  	    // Try to get the value from the element first, then from document root
  	    let computedStyle = getComputedStyle(element);
  	    let delayValue = computedStyle.getPropertyValue('--tooltip-hover-delay').trim();
  	    
  	    if (!delayValue) {
  	        // If not found on element, check document root
  	        computedStyle = getComputedStyle(document.documentElement);
  	        delayValue = computedStyle.getPropertyValue('--tooltip-hover-delay').trim();
  	    }
  	    
  	    if (!delayValue) {
  	        return 500; // Default to 500ms if not set
  	    }
  	    
  	    // Parse CSS time value (supports various time units)
  	    const timeValue = parseFloat(delayValue);
  	    
  	    if (delayValue.endsWith('s')) {
  	        return timeValue * 1000; // Convert seconds to milliseconds
  	    } else if (delayValue.endsWith('ms')) {
  	        return timeValue; // Already in milliseconds
  	    } else if (delayValue.endsWith('m')) {
  	        return timeValue * 60 * 1000; // Convert minutes to milliseconds
  	    } else if (delayValue.endsWith('h')) {
  	        return timeValue * 60 * 60 * 1000; // Convert hours to milliseconds
  	    } else if (delayValue.endsWith('min')) {
  	        return timeValue * 60 * 1000; // Convert minutes to milliseconds
  	    } else if (delayValue.endsWith('sec')) {
  	        return timeValue * 1000; // Convert seconds to milliseconds
  	    } else if (delayValue.endsWith('second')) {
  	        return timeValue * 1000; // Convert seconds to milliseconds
  	    } else if (delayValue.endsWith('minute')) {
  	        return timeValue * 60 * 1000; // Convert minutes to milliseconds
  	    } else if (delayValue.endsWith('hour')) {
  	        return timeValue * 60 * 60 * 1000; // Convert hours to milliseconds
  	    } else {
  	        // If no unit, assume milliseconds (backward compatibility)
  	        return timeValue;
  	    }
  	}

  	function initializeTooltipPlugin() {

  	    Alpine.directive('tooltip', (el, { modifiers, expression }, { effect, evaluateLater }) => {

  	        let getTooltipContent;

  	        // If it starts with $x, handle content loading
  	        if (expression.startsWith('$x.')) {
  	            const path = expression.substring(3); // Remove '$x.'
  	            const [contentType, ...pathParts] = path.split('.');

  	            // Create evaluator that uses the $x magic method
  	            getTooltipContent = evaluateLater(expression);

  	            // Ensure content is loaded before showing tooltip
  	            effect(() => {
  	                const store = Alpine.store('collections');
  	                if (store && typeof store.loadCollection === 'function' && !store[contentType]) {
  	                    store.loadCollection(contentType);
  	                }
  	            });
  	        } else {
  	            // Check if expression contains HTML tags (indicating rich content)
  	            if (expression.includes('<') && expression.includes('>')) {
  	                // Treat as literal HTML string - escape any quotes to prevent syntax errors
  	                const escapedExpression = expression.replace(/'/g, "\\'");
  	                getTooltipContent = evaluateLater(`'${escapedExpression}'`);
  	            } else if (expression.includes('+') || expression.includes('`') || expression.includes('${')) {
  	                // Try to evaluate as a dynamic expression
  	                getTooltipContent = evaluateLater(expression);
  	            } else {
  	                // Use as static string
  	                getTooltipContent = evaluateLater(`'${expression}'`);
  	            }
  	        }

  	        effect(() => {
  	            // Generate a unique ID for the tooltip
  	            const tooltipCode = Math.random().toString(36).substr(2, 9);
  	            const tooltipId = `tooltip-${tooltipCode}`;

  	            // Store the original popovertarget if it exists, or check for x-dropdown
  	            let originalTarget = el.getAttribute('popovertarget');
  	            
  	            // If no popovertarget but has x-dropdown, that will become the target
  	            if (!originalTarget && el.hasAttribute('x-dropdown')) {
  	                originalTarget = el.getAttribute('x-dropdown');
  	            }

  	            // Create the tooltip element
  	            const tooltip = document.createElement('div');
  	            tooltip.setAttribute('popover', '');
  	            tooltip.setAttribute('id', tooltipId);
  	            tooltip.setAttribute('class', 'tooltip');

  	            // Store the original anchor name if it exists
  	            el.style.getPropertyValue('anchor-name');
  	            const tooltipAnchor = `--tooltip-${tooltipCode}`;

  	            // Set tooltip content
  	            getTooltipContent(content => {
  	                tooltip.innerHTML = content || '';
  	            });

  	            // Handle positioning modifiers - preserve exact order and build class names like dropdown CSS
  	            const validPositions = ['top', 'bottom', 'start', 'end', 'center', 'corner'];
  	            const positions = modifiers.filter(mod => validPositions.includes(mod));
  	            
  	            if (positions.length > 0) {
  	                // Build class name by joining modifiers with dashes (preserves original order)
  	                const positionClass = positions.join('-');
  	                tooltip.classList.add(positionClass);
  	            }

  	            // Add the tooltip to the document
  	            document.body.appendChild(tooltip);

  	            // State variables for managing tooltip behavior
  	            let showTimeout;
  	            let isMouseDown = false;

  	            el.addEventListener('mouseenter', () => {
  	                if (!isMouseDown) {
  	                    const hoverDelay = getTooltipHoverDelay(el);
  	                    showTimeout = setTimeout(() => {
  	                        // Check if user is actively interacting with other popovers
  	                        const hasOpenPopover = originalTarget && document.getElementById(originalTarget)?.matches(':popover-open');
  	                        
  	                        if (!isMouseDown && !tooltip.matches(':popover-open') && !hasOpenPopover) {
  	                            // Only manage anchor-name if element has other popover functionality
  	                            if (originalTarget) {
  	                                // Store current anchor name (dropdown may have set it by now)
  	                                const currentAnchorName = el.style.getPropertyValue('anchor-name');
  	                                if (currentAnchorName) {
  	                                    el._originalAnchorName = currentAnchorName;
  	                                }
  	                            }
  	                            
  	                            el.style.setProperty('anchor-name', tooltipAnchor);
  	                            tooltip.style.setProperty('position-anchor', tooltipAnchor);

  	                            // Show tooltip without changing popovertarget
  	                            tooltip.showPopover();
  	                        }
  	                    }, hoverDelay);
  	                }
  	            });

  	            el.addEventListener('mouseleave', () => {
  	                clearTimeout(showTimeout);
  	                if (tooltip.matches(':popover-open')) {
  	                    tooltip.hidePopover();
  	                    // Only restore anchor name if element has other popover functionality
  	                    if (originalTarget) {
  	                        restoreOriginalAnchor();
  	                    }
  	                }
  	            });

  	            el.addEventListener('mousedown', () => {
  	                isMouseDown = true;
  	                clearTimeout(showTimeout);
  	                if (tooltip.matches(':popover-open')) {
  	                    tooltip.hidePopover();
  	                }
  	                // Only restore anchor name if element has other popover functionality
  	                if (originalTarget) {
  	                    restoreOriginalAnchor();
  	                }
  	            });

  	            el.addEventListener('mouseup', () => {
  	                isMouseDown = false;
  	            });

  	            // Handle click events - hide tooltip but delay anchor restoration
  	            el.addEventListener('click', (e) => {
  	                clearTimeout(showTimeout);
  	                
  	                // Hide tooltip if open
  	                if (tooltip.matches(':popover-open')) {
  	                    tooltip.hidePopover();
  	                }
  	                
  	                // Don't restore anchor immediately - let other click handlers run first
  	                // This allows dropdown plugin to set its own anchor-name
  	                setTimeout(() => {
  	                    // Only restore anchor if no popover opened from this click
  	                    if (originalTarget) {
  	                        const targetPopover = document.getElementById(originalTarget);
  	                        const isPopoverOpen = targetPopover?.matches(':popover-open');
  	                        if (!targetPopover || !isPopoverOpen) {
  	                            restoreOriginalAnchor();
  	                        }
  	                        // If popover is open, keep current anchor (don't restore)
  	                    } else {
  	                        restoreOriginalAnchor();
  	                    }
  	                }, 100); // Give other plugins time to set their anchors
  	            });

  	            // Helper function to restore original anchor
  	            function restoreOriginalAnchor() {
  	                if (el._originalAnchorName) {
  	                    // Restore the original anchor name
  	                    el.style.setProperty('anchor-name', el._originalAnchorName);
  	                } else {
  	                    // Remove the tooltip anchor name so other plugins can set their own
  	                    el.style.removeProperty('anchor-name');
  	                }
  	            }

  	            // Listen for other popovers opening and close tooltip if needed
  	            const handlePopoverOpen = (event) => {
  	                // If another popover opens and it's not our tooltip, close our tooltip
  	                if (event.target !== tooltip && tooltip.matches(':popover-open')) {
  	                    tooltip.hidePopover();
  	                    // Only restore anchor name if element has other popover functionality
  	                    if (originalTarget) {
  	                        restoreOriginalAnchor();
  	                    }
  	                }
  	            };

  	            // Add global listener for popover events (only if not already added)
  	            if (!el._tooltipPopoverListener) {
  	                document.addEventListener('toggle', handlePopoverOpen);
  	                el._tooltipPopoverListener = handlePopoverOpen;
  	            }

  	            // Cleanup function for when element is removed
  	            const cleanup = () => {
  	                if (el._tooltipPopoverListener) {
  	                    document.removeEventListener('toggle', el._tooltipPopoverListener);
  	                    delete el._tooltipPopoverListener;
  	                }
  	                if (tooltip && tooltip.parentElement) {
  	                    tooltip.remove();
  	                }
  	            };

  	            // Store cleanup function for manual cleanup if needed
  	            el._tooltipCleanup = cleanup;
  	        });
  	    });
  	}

  	// Handle both DOMContentLoaded and alpine:init
  	if (document.readyState === 'loading') {
  	    document.addEventListener('DOMContentLoaded', () => {
  	        if (window.Alpine) initializeTooltipPlugin();
  	    });
  	}

  	document.addEventListener('alpine:init', initializeTooltipPlugin);
  	return indux_tooltips;
  }

  requireIndux_tooltips();

  /* Indux URL Parameters */

  function initializeUrlParametersPlugin() {
      // Initialize empty parameters store
      Alpine.store('urlParams', {
          current: {},
          _initialized: false
      });

      // Cache for debounced updates
      const updateTimeouts = new Map();
      const DEBOUNCE_DELAY = 300;

      // Helper to parse query string
      function parseQueryString(queryString) {
          const params = new URLSearchParams(queryString);
          const result = {};

          for (const [key, value] of params.entries()) {
              // Handle array values (comma-separated)
              if (value.includes(',')) {
                  result[key] = value.split(',').filter(Boolean);
              } else {
                  result[key] = value;
              }
          }

          return result;
      }

      // Helper to stringify query object
      function stringifyQueryObject(query) {
          const params = new URLSearchParams();

          for (const [key, value] of Object.entries(query)) {
              if (Array.isArray(value)) {
                  params.set(key, value.filter(Boolean).join(','));
              } else if (value != null && value !== '') {
                  params.set(key, value);
              }
          }

          return params.toString();
      }

      // Helper to ensure value is in array format
      function ensureArray(value) {
          if (Array.isArray(value)) return value;
          if (value == null || value === '') return [];
          return [value];
      }

      // Update URL with new query parameters
      async function updateURL(updates, action = 'set') {

          const url = new URL(window.location.href);
          const currentParams = parseQueryString(url.search);

          // Apply updates based on action
          for (const [key, value] of Object.entries(updates)) {
              switch (action) {
                  case 'add':
                      const currentAdd = ensureArray(currentParams[key]);
                      const newValues = ensureArray(value);
                      currentParams[key] = [...new Set([...currentAdd, ...newValues])];
                      break;

                  case 'remove':
                      const currentRemove = ensureArray(currentParams[key]);
                      const removeValue = ensureArray(value)[0]; // Take first value to remove
                      currentParams[key] = currentRemove.filter(v => v !== removeValue);
                      if (currentParams[key].length === 0) {
                          delete currentParams[key];
                      }
                      break;

                  case 'set':
                  default:
                      if (value == null || value === '') {
                          delete currentParams[key];
                      } else {
                          currentParams[key] = value;
                      }
                      break;
              }
          }

          // Update URL
          const newQueryString = stringifyQueryObject(currentParams);
          url.search = newQueryString ? `?${newQueryString}` : '';
          console.debug('[Indux] New URL:', url.toString());

          // Update URL using pushState to ensure changes are visible
          window.history.pushState({}, '', url.toString());

          // Update store
          Alpine.store('urlParams', {
              current: currentParams,
              _initialized: true
          });

          // Dispatch event
          document.dispatchEvent(new CustomEvent('url-updated', {
              detail: { updates, action }
          }));

          return currentParams;
      }

      // Add $url magic method
      Alpine.magic('url', () => {
          const store = Alpine.store('urlParams');

          return new Proxy({}, {
              get(target, prop) {
                  // Handle special keys
                  if (prop === Symbol.iterator || prop === 'then' || prop === 'catch' || prop === 'finally') {
                      return undefined;
                  }

                  // Get current value
                  const value = store.current[prop];

                  // Return a proxy for the value
                  return new Proxy({}, {
                      get(target, key) {
                          if (key === 'value') {
                              // Ensure arrays are returned as arrays, not strings
                              if (Array.isArray(value)) return value;
                              if (typeof value === 'string' && value.includes(',')) {
                                  return value.split(',').filter(Boolean);
                              }
                              // Return undefined/null values as they are (for proper falsy checks)
                              return value;
                          }
                          if (key === 'set') return (newValue) => {
                              clearTimeout(updateTimeouts.get(prop));
                              const timeout = setTimeout(() => {
                                  updateURL({ [prop]: newValue }, 'set');
                              }, DEBOUNCE_DELAY);
                              updateTimeouts.set(prop, timeout);
                          };
                          if (key === 'add') return (newValue) => {
                              clearTimeout(updateTimeouts.get(prop));
                              const timeout = setTimeout(() => {
                                  updateURL({ [prop]: newValue }, 'add');
                              }, DEBOUNCE_DELAY);
                              updateTimeouts.set(prop, timeout);
                          };
                          if (key === 'remove') return (value) => {
                              clearTimeout(updateTimeouts.get(prop));
                              const timeout = setTimeout(() => {
                                  updateURL({ [prop]: value }, 'remove');
                              }, DEBOUNCE_DELAY);
                              updateTimeouts.set(prop, timeout);
                          };
                          if (key === 'clear') return () => {
                              clearTimeout(updateTimeouts.get(prop));
                              const timeout = setTimeout(() => {
                                  updateURL({ [prop]: null }, 'set');
                              }, DEBOUNCE_DELAY);
                              updateTimeouts.set(prop, timeout);
                          };
                          return undefined;
                      },
                      set(target, key, newValue) {
                          if (key === 'value') {
                              // Make value settable for x-model compatibility
                              clearTimeout(updateTimeouts.get(prop));
                              const timeout = setTimeout(() => {
                                  updateURL({ [prop]: newValue }, 'set');
                              }, DEBOUNCE_DELAY);
                              updateTimeouts.set(prop, timeout);
                              return true;
                          }
                          return false;
                      }
                  });
              }
          });
      });

      // Initialize with current URL parameters
      const initialParams = parseQueryString(window.location.search);
      Alpine.store('urlParams', {
          current: initialParams,
          _initialized: true
      });

      // Listen for popstate events
      window.addEventListener('popstate', () => {
          const params = parseQueryString(window.location.search);
          Alpine.store('urlParams', {
              current: params,
              _initialized: true
          });
      });
  }

  // Handle both DOMContentLoaded and alpine:init
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
          if (window.Alpine) initializeUrlParametersPlugin();
      });
  }

  document.addEventListener('alpine:init', initializeUrlParametersPlugin);

  /* Alpine JS v3.15.0 */

  (()=>{var nt=false,it=false,W=[],ot=-1;function Ut(e){Rn(e);}function Rn(e){W.includes(e)||W.push(e),Mn();}function Wt(e){let t=W.indexOf(e);t!==-1&&t>ot&&W.splice(t,1);}function Mn(){!it&&!nt&&(nt=true,queueMicrotask(Nn));}function Nn(){nt=false,it=true;for(let e=0;e<W.length;e++)W[e](),ot=e;W.length=0,ot=-1,it=false;}var T,N,$,at,st=true;function Gt(e){st=false,e(),st=true;}function Jt(e){T=e.reactive,$=e.release,N=t=>e.effect(t,{scheduler:r=>{st?Ut(r):r();}}),at=e.raw;}function ct(e){N=e;}function Yt(e){let t=()=>{};return [n=>{let i=N(n);return e._x_effects||(e._x_effects=new Set,e._x_runEffects=()=>{e._x_effects.forEach(o=>o());}),e._x_effects.add(i),t=()=>{i!==void 0&&(e._x_effects.delete(i),$(i));},i},()=>{t();}]}function ve(e,t){let r=true,n,i=N(()=>{let o=e();JSON.stringify(o),r?n=o:queueMicrotask(()=>{t(o,n),n=o;}),r=false;});return ()=>$(i)}var Xt=[],Zt=[],Qt=[];function er(e){Qt.push(e);}function te(e,t){typeof t=="function"?(e._x_cleanups||(e._x_cleanups=[]),e._x_cleanups.push(t)):(t=e,Zt.push(t));}function Ae(e){Xt.push(e);}function Oe(e,t,r){e._x_attributeCleanups||(e._x_attributeCleanups={}),e._x_attributeCleanups[t]||(e._x_attributeCleanups[t]=[]),e._x_attributeCleanups[t].push(r);}function lt(e,t){e._x_attributeCleanups&&Object.entries(e._x_attributeCleanups).forEach(([r,n])=>{(t===void 0||t.includes(r))&&(n.forEach(i=>i()),delete e._x_attributeCleanups[r]);});}function tr(e){for(e._x_effects?.forEach(Wt);e._x_cleanups?.length;)e._x_cleanups.pop()();}var ut=new MutationObserver(mt),ft=false;function ue(){ut.observe(document,{subtree:true,childList:true,attributes:true,attributeOldValue:true}),ft=true;}function dt(){kn(),ut.disconnect(),ft=false;}var le=[];function kn(){let e=ut.takeRecords();le.push(()=>e.length>0&&mt(e));let t=le.length;queueMicrotask(()=>{if(le.length===t)for(;le.length>0;)le.shift()();});}function m(e){if(!ft)return e();dt();let t=e();return ue(),t}var pt=false,Se=[];function rr(){pt=true;}function nr(){pt=false,mt(Se),Se=[];}function mt(e){if(pt){Se=Se.concat(e);return}let t=[],r=new Set,n=new Map,i=new Map;for(let o=0;o<e.length;o++)if(!e[o].target._x_ignoreMutationObserver&&(e[o].type==="childList"&&(e[o].removedNodes.forEach(s=>{s.nodeType===1&&s._x_marker&&r.add(s);}),e[o].addedNodes.forEach(s=>{if(s.nodeType===1){if(r.has(s)){r.delete(s);return}s._x_marker||t.push(s);}})),e[o].type==="attributes")){let s=e[o].target,a=e[o].attributeName,c=e[o].oldValue,l=()=>{n.has(s)||n.set(s,[]),n.get(s).push({name:a,value:s.getAttribute(a)});},u=()=>{i.has(s)||i.set(s,[]),i.get(s).push(a);};s.hasAttribute(a)&&c===null?l():s.hasAttribute(a)?(u(),l()):u();}i.forEach((o,s)=>{lt(s,o);}),n.forEach((o,s)=>{Xt.forEach(a=>a(s,o));});for(let o of r)t.some(s=>s.contains(o))||Zt.forEach(s=>s(o));for(let o of t)o.isConnected&&Qt.forEach(s=>s(o));t=null,r=null,n=null,i=null;}function Ce(e){return z(B(e))}function k(e,t,r){return e._x_dataStack=[t,...B(r||e)],()=>{e._x_dataStack=e._x_dataStack.filter(n=>n!==t);}}function B(e){return e._x_dataStack?e._x_dataStack:typeof ShadowRoot=="function"&&e instanceof ShadowRoot?B(e.host):e.parentNode?B(e.parentNode):[]}function z(e){return new Proxy({objects:e},Dn)}var Dn={ownKeys({objects:e}){return Array.from(new Set(e.flatMap(t=>Object.keys(t))))},has({objects:e},t){return t==Symbol.unscopables?false:e.some(r=>Object.prototype.hasOwnProperty.call(r,t)||Reflect.has(r,t))},get({objects:e},t,r){return t=="toJSON"?Pn:Reflect.get(e.find(n=>Reflect.has(n,t))||{},t,r)},set({objects:e},t,r,n){let i=e.find(s=>Object.prototype.hasOwnProperty.call(s,t))||e[e.length-1],o=Object.getOwnPropertyDescriptor(i,t);return o?.set&&o?.get?o.set.call(n,r)||true:Reflect.set(i,t,r)}};function Pn(){return Reflect.ownKeys(this).reduce((t,r)=>(t[r]=Reflect.get(this,r),t),{})}function Te(e){let t=n=>typeof n=="object"&&!Array.isArray(n)&&n!==null,r=(n,i="")=>{Object.entries(Object.getOwnPropertyDescriptors(n)).forEach(([o,{value:s,enumerable:a}])=>{if(a===false||s===void 0||typeof s=="object"&&s!==null&&s.__v_skip)return;let c=i===""?o:`${i}.${o}`;typeof s=="object"&&s!==null&&s._x_interceptor?n[o]=s.initialize(e,c,o):t(s)&&s!==n&&!(s instanceof Element)&&r(s,c);});};return r(e)}function Re(e,t=()=>{}){let r={initialValue:void 0,_x_interceptor:true,initialize(n,i,o){return e(this.initialValue,()=>In(n,i),s=>ht(n,i,s),i,o)}};return t(r),n=>{if(typeof n=="object"&&n!==null&&n._x_interceptor){let i=r.initialize.bind(r);r.initialize=(o,s,a)=>{let c=n.initialize(o,s,a);return r.initialValue=c,i(o,s,a)};}else r.initialValue=n;return r}}function In(e,t){return t.split(".").reduce((r,n)=>r[n],e)}function ht(e,t,r){if(typeof t=="string"&&(t=t.split(".")),t.length===1)e[t[0]]=r;else {if(t.length===0)throw error;return e[t[0]]||(e[t[0]]={}),ht(e[t[0]],t.slice(1),r)}}var ir={};function y(e,t){ir[e]=t;}function fe(e,t){let r=Ln(t);return Object.entries(ir).forEach(([n,i])=>{Object.defineProperty(e,`$${n}`,{get(){return i(t,r)},enumerable:false});}),e}function Ln(e){let[t,r]=_t(e),n={interceptor:Re,...t};return te(e,r),n}function or(e,t,r,...n){try{return r(...n)}catch(i){re(i,e,t);}}function re(e,t,r=void 0){e=Object.assign(e??{message:"No error message given."},{el:t,expression:r}),console.warn(`Alpine Expression Error: ${e.message}

${r?'Expression: "'+r+`"

`:""}`,t),setTimeout(()=>{throw e},0);}var Me=true;function ke(e){let t=Me;Me=false;let r=e();return Me=t,r}function R(e,t,r={}){let n;return x(e,t)(i=>n=i,r),n}function x(...e){return sr(...e)}var sr=xt;function ar(e){sr=e;}function xt(e,t){let r={};fe(r,e);let n=[r,...B(e)],i=typeof t=="function"?$n(n,t):Fn(n,t,e);return or.bind(null,e,t,i)}function $n(e,t){return (r=()=>{},{scope:n={},params:i=[],context:o}={})=>{let s=t.apply(z([n,...e]),i);Ne(r,s);}}var gt={};function jn(e,t){if(gt[e])return gt[e];let r=Object.getPrototypeOf(async function(){}).constructor,n=/^[\n\s]*if.*\(.*\)/.test(e.trim())||/^(let|const)\s/.test(e.trim())?`(async()=>{ ${e} })()`:e,o=(()=>{try{let s=new r(["__self","scope"],`with (scope) { __self.result = ${n} }; __self.finished = true; return __self.result;`);return Object.defineProperty(s,"name",{value:`[Alpine] ${e}`}),s}catch(s){return re(s,t,e),Promise.resolve()}})();return gt[e]=o,o}function Fn(e,t,r){let n=jn(t,r);return (i=()=>{},{scope:o={},params:s=[],context:a}={})=>{n.result=void 0,n.finished=false;let c=z([o,...e]);if(typeof n=="function"){let l=n.call(a,n,c).catch(u=>re(u,r,t));n.finished?(Ne(i,n.result,c,s,r),n.result=void 0):l.then(u=>{Ne(i,u,c,s,r);}).catch(u=>re(u,r,t)).finally(()=>n.result=void 0);}}}function Ne(e,t,r,n,i){if(Me&&typeof t=="function"){let o=t.apply(r,n);o instanceof Promise?o.then(s=>Ne(e,s,r,n)).catch(s=>re(s,i,t)):e(o);}else typeof t=="object"&&t instanceof Promise?t.then(o=>e(o)):e(t);}var wt="x-";function C(e=""){return wt+e}function cr(e){wt=e;}var De={};function d(e,t){return De[e]=t,{before(r){if(!De[r]){console.warn(String.raw`Cannot find directive \`${r}\`. \`${e}\` will use the default order of execution`);return}let n=G.indexOf(r);G.splice(n>=0?n:G.indexOf("DEFAULT"),0,e);}}}function lr(e){return Object.keys(De).includes(e)}function pe(e,t,r){if(t=Array.from(t),e._x_virtualDirectives){let o=Object.entries(e._x_virtualDirectives).map(([a,c])=>({name:a,value:c})),s=Et(o);o=o.map(a=>s.find(c=>c.name===a.name)?{name:`x-bind:${a.name}`,value:`"${a.value}"`}:a),t=t.concat(o);}let n={};return t.map(dr((o,s)=>n[o]=s)).filter(mr).map(zn(n,r)).sort(Kn).map(o=>Bn(e,o))}function Et(e){return Array.from(e).map(dr()).filter(t=>!mr(t))}var yt=false,de=new Map,ur=Symbol();function fr(e){yt=true;let t=Symbol();ur=t,de.set(t,[]);let r=()=>{for(;de.get(t).length;)de.get(t).shift()();de.delete(t);},n=()=>{yt=false,r();};e(r),n();}function _t(e){let t=[],r=a=>t.push(a),[n,i]=Yt(e);return t.push(i),[{Alpine:K,effect:n,cleanup:r,evaluateLater:x.bind(x,e),evaluate:R.bind(R,e)},()=>t.forEach(a=>a())]}function Bn(e,t){let r=()=>{},n=De[t.type]||r,[i,o]=_t(e);Oe(e,t.original,o);let s=()=>{e._x_ignore||e._x_ignoreSelf||(n.inline&&n.inline(e,t,i),n=n.bind(n,e,t,i),yt?de.get(ur).push(n):n());};return s.runCleanups=o,s}var Pe=(e,t)=>({name:r,value:n})=>(r.startsWith(e)&&(r=r.replace(e,t)),{name:r,value:n}),Ie=e=>e;function dr(e=()=>{}){return ({name:t,value:r})=>{let{name:n,value:i}=pr.reduce((o,s)=>s(o),{name:t,value:r});return n!==t&&e(n,t),{name:n,value:i}}}var pr=[];function ne(e){pr.push(e);}function mr({name:e}){return hr().test(e)}var hr=()=>new RegExp(`^${wt}([^:^.]+)\\b`);function zn(e,t){return ({name:r,value:n})=>{let i=r.match(hr()),o=r.match(/:([a-zA-Z0-9\-_:]+)/),s=r.match(/\.[^.\]]+(?=[^\]]*$)/g)||[],a=t||e[r]||r;return {type:i?i[1]:null,value:o?o[1]:null,modifiers:s.map(c=>c.replace(".","")),expression:n,original:a}}}var bt="DEFAULT",G=["ignore","ref","data","id","anchor","bind","init","for","model","modelable","transition","show","if",bt,"teleport"];function Kn(e,t){let r=G.indexOf(e.type)===-1?bt:e.type,n=G.indexOf(t.type)===-1?bt:t.type;return G.indexOf(r)-G.indexOf(n)}function J(e,t,r={}){e.dispatchEvent(new CustomEvent(t,{detail:r,bubbles:true,composed:true,cancelable:true}));}function D(e,t){if(typeof ShadowRoot=="function"&&e instanceof ShadowRoot){Array.from(e.children).forEach(i=>D(i,t));return}let r=false;if(t(e,()=>r=true),r)return;let n=e.firstElementChild;for(;n;)D(n,t),n=n.nextElementSibling;}function E(e,...t){console.warn(`Alpine Warning: ${e}`,...t);}var _r=false;function gr(){_r&&E("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."),_r=true,document.body||E("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"),J(document,"alpine:init"),J(document,"alpine:initializing"),ue(),er(t=>S(t,D)),te(t=>P(t)),Ae((t,r)=>{pe(t,r).forEach(n=>n());});let e=t=>!Y(t.parentElement,true);Array.from(document.querySelectorAll(br().join(","))).filter(e).forEach(t=>{S(t);}),J(document,"alpine:initialized"),setTimeout(()=>{Vn();});}var vt=[],xr=[];function yr(){return vt.map(e=>e())}function br(){return vt.concat(xr).map(e=>e())}function Le(e){vt.push(e);}function $e(e){xr.push(e);}function Y(e,t=false){return j(e,r=>{if((t?br():yr()).some(i=>r.matches(i)))return  true})}function j(e,t){if(e){if(t(e))return e;if(e._x_teleportBack&&(e=e._x_teleportBack),!!e.parentElement)return j(e.parentElement,t)}}function wr(e){return yr().some(t=>e.matches(t))}var Er=[];function vr(e){Er.push(e);}var Hn=1;function S(e,t=D,r=()=>{}){j(e,n=>n._x_ignore)||fr(()=>{t(e,(n,i)=>{n._x_marker||(r(n,i),Er.forEach(o=>o(n,i)),pe(n,n.attributes).forEach(o=>o()),n._x_ignore||(n._x_marker=Hn++),n._x_ignore&&i());});});}function P(e,t=D){t(e,r=>{tr(r),lt(r),delete r._x_marker;});}function Vn(){[["ui","dialog",["[x-dialog], [x-popover]"]],["anchor","anchor",["[x-anchor]"]],["sort","sort",["[x-sort]"]]].forEach(([t,r,n])=>{lr(r)||n.some(i=>{if(document.querySelector(i))return E(`found "${i}", but missing ${t} plugin`),true});});}var St=[],At=false;function ie(e=()=>{}){return queueMicrotask(()=>{At||setTimeout(()=>{je();});}),new Promise(t=>{St.push(()=>{e(),t();});})}function je(){for(At=false;St.length;)St.shift()();}function Sr(){At=true;}function me(e,t){return Array.isArray(t)?Ar(e,t.join(" ")):typeof t=="object"&&t!==null?qn(e,t):typeof t=="function"?me(e,t()):Ar(e,t)}function Ar(e,t){let n=o=>o.split(" ").filter(s=>!e.classList.contains(s)).filter(Boolean),i=o=>(e.classList.add(...o),()=>{e.classList.remove(...o);});return t=t===true?t="":t||"",i(n(t))}function qn(e,t){let r=a=>a.split(" ").filter(Boolean),n=Object.entries(t).flatMap(([a,c])=>c?r(a):false).filter(Boolean),i=Object.entries(t).flatMap(([a,c])=>c?false:r(a)).filter(Boolean),o=[],s=[];return i.forEach(a=>{e.classList.contains(a)&&(e.classList.remove(a),s.push(a));}),n.forEach(a=>{e.classList.contains(a)||(e.classList.add(a),o.push(a));}),()=>{s.forEach(a=>e.classList.add(a)),o.forEach(a=>e.classList.remove(a));}}function X(e,t){return typeof t=="object"&&t!==null?Un(e,t):Wn(e,t)}function Un(e,t){let r={};return Object.entries(t).forEach(([n,i])=>{r[n]=e.style[n],n.startsWith("--")||(n=Gn(n)),e.style.setProperty(n,i);}),setTimeout(()=>{e.style.length===0&&e.removeAttribute("style");}),()=>{X(e,r);}}function Wn(e,t){let r=e.getAttribute("style",t);return e.setAttribute("style",t),()=>{e.setAttribute("style",r||"");}}function Gn(e){return e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}function he(e,t=()=>{}){let r=false;return function(){r?t.apply(this,arguments):(r=true,e.apply(this,arguments));}}d("transition",(e,{value:t,modifiers:r,expression:n},{evaluate:i})=>{typeof n=="function"&&(n=i(n)),n!==false&&(!n||typeof n=="boolean"?Yn(e,r,t):Jn(e,n,t));});function Jn(e,t,r){Or(e,me,""),{enter:i=>{e._x_transition.enter.during=i;},"enter-start":i=>{e._x_transition.enter.start=i;},"enter-end":i=>{e._x_transition.enter.end=i;},leave:i=>{e._x_transition.leave.during=i;},"leave-start":i=>{e._x_transition.leave.start=i;},"leave-end":i=>{e._x_transition.leave.end=i;}}[r](t);}function Yn(e,t,r){Or(e,X);let n=!t.includes("in")&&!t.includes("out")&&!r,i=n||t.includes("in")||["enter"].includes(r),o=n||t.includes("out")||["leave"].includes(r);t.includes("in")&&!n&&(t=t.filter((g,b)=>b<t.indexOf("out"))),t.includes("out")&&!n&&(t=t.filter((g,b)=>b>t.indexOf("out")));let s=!t.includes("opacity")&&!t.includes("scale"),a=s||t.includes("opacity"),c=s||t.includes("scale"),l=a?0:1,u=c?_e(t,"scale",95)/100:1,p=_e(t,"delay",0)/1e3,h=_e(t,"origin","center"),w="opacity, transform",F=_e(t,"duration",150)/1e3,Ee=_e(t,"duration",75)/1e3,f="cubic-bezier(0.4, 0.0, 0.2, 1)";i&&(e._x_transition.enter.during={transformOrigin:h,transitionDelay:`${p}s`,transitionProperty:w,transitionDuration:`${F}s`,transitionTimingFunction:f},e._x_transition.enter.start={opacity:l,transform:`scale(${u})`},e._x_transition.enter.end={opacity:1,transform:"scale(1)"}),o&&(e._x_transition.leave.during={transformOrigin:h,transitionDelay:`${p}s`,transitionProperty:w,transitionDuration:`${Ee}s`,transitionTimingFunction:f},e._x_transition.leave.start={opacity:1,transform:"scale(1)"},e._x_transition.leave.end={opacity:l,transform:`scale(${u})`});}function Or(e,t,r={}){e._x_transition||(e._x_transition={enter:{during:r,start:r,end:r},leave:{during:r,start:r,end:r},in(n=()=>{},i=()=>{}){Fe(e,t,{during:this.enter.during,start:this.enter.start,end:this.enter.end},n,i);},out(n=()=>{},i=()=>{}){Fe(e,t,{during:this.leave.during,start:this.leave.start,end:this.leave.end},n,i);}});}window.Element.prototype._x_toggleAndCascadeWithTransitions=function(e,t,r,n){let i=document.visibilityState==="visible"?requestAnimationFrame:setTimeout,o=()=>i(r);if(t){e._x_transition&&(e._x_transition.enter||e._x_transition.leave)?e._x_transition.enter&&(Object.entries(e._x_transition.enter.during).length||Object.entries(e._x_transition.enter.start).length||Object.entries(e._x_transition.enter.end).length)?e._x_transition.in(r):o():e._x_transition?e._x_transition.in(r):o();return}e._x_hidePromise=e._x_transition?new Promise((s,a)=>{e._x_transition.out(()=>{},()=>s(n)),e._x_transitioning&&e._x_transitioning.beforeCancel(()=>a({isFromCancelledTransition:true}));}):Promise.resolve(n),queueMicrotask(()=>{let s=Cr(e);s?(s._x_hideChildren||(s._x_hideChildren=[]),s._x_hideChildren.push(e)):i(()=>{let a=c=>{let l=Promise.all([c._x_hidePromise,...(c._x_hideChildren||[]).map(a)]).then(([u])=>u?.());return delete c._x_hidePromise,delete c._x_hideChildren,l};a(e).catch(c=>{if(!c.isFromCancelledTransition)throw c});});});};function Cr(e){let t=e.parentNode;if(t)return t._x_hidePromise?t:Cr(t)}function Fe(e,t,{during:r,start:n,end:i}={},o=()=>{},s=()=>{}){if(e._x_transitioning&&e._x_transitioning.cancel(),Object.keys(r).length===0&&Object.keys(n).length===0&&Object.keys(i).length===0){o(),s();return}let a,c,l;Xn(e,{start(){a=t(e,n);},during(){c=t(e,r);},before:o,end(){a(),l=t(e,i);},after:s,cleanup(){c(),l();}});}function Xn(e,t){let r,n,i,o=he(()=>{m(()=>{r=true,n||t.before(),i||(t.end(),je()),t.after(),e.isConnected&&t.cleanup(),delete e._x_transitioning;});});e._x_transitioning={beforeCancels:[],beforeCancel(s){this.beforeCancels.push(s);},cancel:he(function(){for(;this.beforeCancels.length;)this.beforeCancels.shift()();o();}),finish:o},m(()=>{t.start(),t.during();}),Sr(),requestAnimationFrame(()=>{if(r)return;let s=Number(getComputedStyle(e).transitionDuration.replace(/,.*/,"").replace("s",""))*1e3,a=Number(getComputedStyle(e).transitionDelay.replace(/,.*/,"").replace("s",""))*1e3;s===0&&(s=Number(getComputedStyle(e).animationDuration.replace("s",""))*1e3),m(()=>{t.before();}),n=true,requestAnimationFrame(()=>{r||(m(()=>{t.end();}),je(),setTimeout(e._x_transitioning.finish,s+a),i=true);});});}function _e(e,t,r){if(e.indexOf(t)===-1)return r;let n=e[e.indexOf(t)+1];if(!n||t==="scale"&&isNaN(n))return r;if(t==="duration"||t==="delay"){let i=n.match(/([0-9]+)ms/);if(i)return i[1]}return t==="origin"&&["top","right","left","center","bottom"].includes(e[e.indexOf(t)+2])?[n,e[e.indexOf(t)+2]].join(" "):n}var I=false;function A(e,t=()=>{}){return (...r)=>I?t(...r):e(...r)}function Tr(e){return (...t)=>I&&e(...t)}var Rr=[];function H(e){Rr.push(e);}function Mr(e,t){Rr.forEach(r=>r(e,t)),I=true,kr(()=>{S(t,(r,n)=>{n(r,()=>{});});}),I=false;}var Be=false;function Nr(e,t){t._x_dataStack||(t._x_dataStack=e._x_dataStack),I=true,Be=true,kr(()=>{Zn(t);}),I=false,Be=false;}function Zn(e){let t=false;S(e,(n,i)=>{D(n,(o,s)=>{if(t&&wr(o))return s();t=true,i(o,s);});});}function kr(e){let t=N;ct((r,n)=>{let i=t(r);return $(i),()=>{}}),e(),ct(t);}function ge(e,t,r,n=[]){switch(e._x_bindings||(e._x_bindings=T({})),e._x_bindings[t]=r,t=n.includes("camel")?si(t):t,t){case "value":Qn(e,r);break;case "style":ti(e,r);break;case "class":ei(e,r);break;case "selected":case "checked":ri(e,t,r);break;default:Pr(e,t,r);break}}function Qn(e,t){if(Ot(e))e.attributes.value===void 0&&(e.value=t),window.fromModel&&(typeof t=="boolean"?e.checked=xe(e.value)===t:e.checked=Dr(e.value,t));else if(ze(e))Number.isInteger(t)?e.value=t:!Array.isArray(t)&&typeof t!="boolean"&&![null,void 0].includes(t)?e.value=String(t):Array.isArray(t)?e.checked=t.some(r=>Dr(r,e.value)):e.checked=!!t;else if(e.tagName==="SELECT")oi(e,t);else {if(e.value===t)return;e.value=t===void 0?"":t;}}function ei(e,t){e._x_undoAddedClasses&&e._x_undoAddedClasses(),e._x_undoAddedClasses=me(e,t);}function ti(e,t){e._x_undoAddedStyles&&e._x_undoAddedStyles(),e._x_undoAddedStyles=X(e,t);}function ri(e,t,r){Pr(e,t,r),ii(e,t,r);}function Pr(e,t,r){[null,void 0,false].includes(r)&&ci(t)?e.removeAttribute(t):(Ir(t)&&(r=t),ni(e,t,r));}function ni(e,t,r){e.getAttribute(t)!=r&&e.setAttribute(t,r);}function ii(e,t,r){e[t]!==r&&(e[t]=r);}function oi(e,t){let r=[].concat(t).map(n=>n+"");Array.from(e.options).forEach(n=>{n.selected=r.includes(n.value);});}function si(e){return e.toLowerCase().replace(/-(\w)/g,(t,r)=>r.toUpperCase())}function Dr(e,t){return e==t}function xe(e){return [1,"1","true","on","yes",true].includes(e)?true:[0,"0","false","off","no",false].includes(e)?false:e?Boolean(e):null}var ai=new Set(["allowfullscreen","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","inert","ismap","itemscope","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected","shadowrootclonable","shadowrootdelegatesfocus","shadowrootserializable"]);function Ir(e){return ai.has(e)}function ci(e){return !["aria-pressed","aria-checked","aria-expanded","aria-selected"].includes(e)}function Lr(e,t,r){return e._x_bindings&&e._x_bindings[t]!==void 0?e._x_bindings[t]:jr(e,t,r)}function $r(e,t,r,n=true){if(e._x_bindings&&e._x_bindings[t]!==void 0)return e._x_bindings[t];if(e._x_inlineBindings&&e._x_inlineBindings[t]!==void 0){let i=e._x_inlineBindings[t];return i.extract=n,ke(()=>R(e,i.expression))}return jr(e,t,r)}function jr(e,t,r){let n=e.getAttribute(t);return n===null?typeof r=="function"?r():r:n===""?true:Ir(t)?!![t,"true"].includes(n):n}function ze(e){return e.type==="checkbox"||e.localName==="ui-checkbox"||e.localName==="ui-switch"}function Ot(e){return e.type==="radio"||e.localName==="ui-radio"}function Ke(e,t){let r;return function(){let n=this,i=arguments,o=function(){r=null,e.apply(n,i);};clearTimeout(r),r=setTimeout(o,t);}}function He(e,t){let r;return function(){let n=this,i=arguments;r||(e.apply(n,i),r=true,setTimeout(()=>r=false,t));}}function Ve({get:e,set:t},{get:r,set:n}){let i=true,o,a=N(()=>{let c=e(),l=r();if(i)n(Ct(c)),i=false;else {let u=JSON.stringify(c),p=JSON.stringify(l);u!==o?n(Ct(c)):u!==p&&t(Ct(l));}o=JSON.stringify(e()),JSON.stringify(r());});return ()=>{$(a);}}function Ct(e){return typeof e=="object"?JSON.parse(JSON.stringify(e)):e}function Fr(e){(Array.isArray(e)?e:[e]).forEach(r=>r(K));}var Z={},Br=false;function zr(e,t){if(Br||(Z=T(Z),Br=true),t===void 0)return Z[e];Z[e]=t,Te(Z[e]),typeof t=="object"&&t!==null&&t.hasOwnProperty("init")&&typeof t.init=="function"&&Z[e].init();}function Kr(){return Z}var Hr={};function Vr(e,t){let r=typeof t!="function"?()=>t:t;return e instanceof Element?Tt(e,r()):(Hr[e]=r,()=>{})}function qr(e){return Object.entries(Hr).forEach(([t,r])=>{Object.defineProperty(e,t,{get(){return (...n)=>r(...n)}});}),e}function Tt(e,t,r){let n=[];for(;n.length;)n.pop()();let i=Object.entries(t).map(([s,a])=>({name:s,value:a})),o=Et(i);return i=i.map(s=>o.find(a=>a.name===s.name)?{name:`x-bind:${s.name}`,value:`"${s.value}"`}:s),pe(e,i,r).map(s=>{n.push(s.runCleanups),s();}),()=>{for(;n.length;)n.pop()();}}var Ur={};function Wr(e,t){Ur[e]=t;}function Gr(e,t){return Object.entries(Ur).forEach(([r,n])=>{Object.defineProperty(e,r,{get(){return (...i)=>n.bind(t)(...i)},enumerable:false});}),e}var li={get reactive(){return T},get release(){return $},get effect(){return N},get raw(){return at},version:"3.15.0",flushAndStopDeferringMutations:nr,dontAutoEvaluateFunctions:ke,disableEffectScheduling:Gt,startObservingMutations:ue,stopObservingMutations:dt,setReactivityEngine:Jt,onAttributeRemoved:Oe,onAttributesAdded:Ae,closestDataStack:B,skipDuringClone:A,onlyDuringClone:Tr,addRootSelector:Le,addInitSelector:$e,interceptClone:H,addScopeToNode:k,deferMutations:rr,mapAttributes:ne,evaluateLater:x,interceptInit:vr,setEvaluator:ar,mergeProxies:z,extractProp:$r,findClosest:j,onElRemoved:te,closestRoot:Y,destroyTree:P,interceptor:Re,transition:Fe,setStyles:X,mutateDom:m,directive:d,entangle:Ve,throttle:He,debounce:Ke,evaluate:R,initTree:S,nextTick:ie,prefixed:C,prefix:cr,plugin:Fr,magic:y,store:zr,start:gr,clone:Nr,cloneNode:Mr,bound:Lr,$data:Ce,watch:ve,walk:D,data:Wr,bind:Vr},K=li;function Rt(e,t){let r=Object.create(null),n=e.split(",");for(let i=0;i<n.length;i++)r[n[i]]=true;return i=>!!r[i]}var ui="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";Rt(ui+",async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");var Jr=Object.freeze({});var fi=Object.prototype.hasOwnProperty,ye=(e,t)=>fi.call(e,t),V=Array.isArray,oe=e=>Yr(e)==="[object Map]";var di=e=>typeof e=="string",qe=e=>typeof e=="symbol",be=e=>e!==null&&typeof e=="object";var pi=Object.prototype.toString,Yr=e=>pi.call(e),Mt=e=>Yr(e).slice(8,-1);var Ue=e=>di(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e;var We=e=>{let t=Object.create(null);return r=>t[r]||(t[r]=e(r))},Nt=We(e=>e.charAt(0).toUpperCase()+e.slice(1)),kt=(e,t)=>e!==t&&(e===e||t===t);var Dt=new WeakMap,we=[],L,Q=Symbol("iterate"),Pt=Symbol("Map key iterate");function _i(e){return e&&e._isEffect===true}function rn(e,t=Jr){_i(e)&&(e=e.raw);let r=xi(e,t);return t.lazy||r(),r}function nn(e){e.active&&(on(e),e.options.onStop&&e.options.onStop(),e.active=false);}var gi=0;function xi(e,t){let r=function(){if(!r.active)return e();if(!we.includes(r)){on(r);try{return bi(),we.push(r),L=r,e()}finally{we.pop(),sn(),L=we[we.length-1];}}};return r.id=gi++,r.allowRecurse=!!t.allowRecurse,r._isEffect=true,r.active=true,r.raw=e,r.deps=[],r.options=t,r}function on(e){let{deps:t}=e;if(t.length){for(let r=0;r<t.length;r++)t[r].delete(e);t.length=0;}}var se=true,Lt=[];function yi(){Lt.push(se),se=false;}function bi(){Lt.push(se),se=true;}function sn(){let e=Lt.pop();se=e===void 0?true:e;}function M(e,t,r){if(!se||L===void 0)return;let n=Dt.get(e);n||Dt.set(e,n=new Map);let i=n.get(r);i||n.set(r,i=new Set),i.has(L)||(i.add(L),L.deps.push(i),L.options.onTrack&&L.options.onTrack({effect:L,target:e,type:t,key:r}));}function U(e,t,r,n,i,o){let s=Dt.get(e);if(!s)return;let a=new Set,c=u=>{u&&u.forEach(p=>{(p!==L||p.allowRecurse)&&a.add(p);});};if(t==="clear")s.forEach(c);else if(r==="length"&&V(e))s.forEach((u,p)=>{(p==="length"||p>=n)&&c(u);});else switch(r!==void 0&&c(s.get(r)),t){case "add":V(e)?Ue(r)&&c(s.get("length")):(c(s.get(Q)),oe(e)&&c(s.get(Pt)));break;case "delete":V(e)||(c(s.get(Q)),oe(e)&&c(s.get(Pt)));break;case "set":oe(e)&&c(s.get(Q));break}let l=u=>{u.options.onTrigger&&u.options.onTrigger({effect:u,target:e,key:r,type:t,newValue:n,oldValue:i,oldTarget:o}),u.options.scheduler?u.options.scheduler(u):u();};a.forEach(l);}var wi=Rt("__proto__,__v_isRef,__isVue"),an=new Set(Object.getOwnPropertyNames(Symbol).map(e=>Symbol[e]).filter(qe)),Ei=cn();var vi=cn(true);var Xr=Si();function Si(){let e={};return ["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...r){let n=_(this);for(let o=0,s=this.length;o<s;o++)M(n,"get",o+"");let i=n[t](...r);return i===-1||i===false?n[t](...r.map(_)):i};}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...r){yi();let n=_(this)[t].apply(this,r);return sn(),n};}),e}function cn(e=false,t=false){return function(n,i,o){if(i==="__v_isReactive")return !e;if(i==="__v_isReadonly")return e;if(i==="__v_raw"&&o===(e?t?Bi:dn:t?Fi:fn).get(n))return n;let s=V(n);if(!e&&s&&ye(Xr,i))return Reflect.get(Xr,i,o);let a=Reflect.get(n,i,o);return (qe(i)?an.has(i):wi(i))||(e||M(n,"get",i),t)?a:It(a)?!s||!Ue(i)?a.value:a:be(a)?e?pn(a):et(a):a}}var Ai=Oi();function Oi(e=false){return function(r,n,i,o){let s=r[n];if(!e&&(i=_(i),s=_(s),!V(r)&&It(s)&&!It(i)))return s.value=i,true;let a=V(r)&&Ue(n)?Number(n)<r.length:ye(r,n),c=Reflect.set(r,n,i,o);return r===_(o)&&(a?kt(i,s)&&U(r,"set",n,i,s):U(r,"add",n,i)),c}}function Ci(e,t){let r=ye(e,t),n=e[t],i=Reflect.deleteProperty(e,t);return i&&r&&U(e,"delete",t,void 0,n),i}function Ti(e,t){let r=Reflect.has(e,t);return (!qe(t)||!an.has(t))&&M(e,"has",t),r}function Ri(e){return M(e,"iterate",V(e)?"length":Q),Reflect.ownKeys(e)}var Mi={get:Ei,set:Ai,deleteProperty:Ci,has:Ti,ownKeys:Ri},Ni={get:vi,set(e,t){return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`,e),true},deleteProperty(e,t){return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`,e),true}};var $t=e=>be(e)?et(e):e,jt=e=>be(e)?pn(e):e,Ft=e=>e,Qe=e=>Reflect.getPrototypeOf(e);function Ge(e,t,r=false,n=false){e=e.__v_raw;let i=_(e),o=_(t);t!==o&&!r&&M(i,"get",t),!r&&M(i,"get",o);let{has:s}=Qe(i),a=n?Ft:r?jt:$t;if(s.call(i,t))return a(e.get(t));if(s.call(i,o))return a(e.get(o));e!==i&&e.get(t);}function Je(e,t=false){let r=this.__v_raw,n=_(r),i=_(e);return e!==i&&!t&&M(n,"has",e),!t&&M(n,"has",i),e===i?r.has(e):r.has(e)||r.has(i)}function Ye(e,t=false){return e=e.__v_raw,!t&&M(_(e),"iterate",Q),Reflect.get(e,"size",e)}function Zr(e){e=_(e);let t=_(this);return Qe(t).has.call(t,e)||(t.add(e),U(t,"add",e,e)),this}function Qr(e,t){t=_(t);let r=_(this),{has:n,get:i}=Qe(r),o=n.call(r,e);o?un(r,n,e):(e=_(e),o=n.call(r,e));let s=i.call(r,e);return r.set(e,t),o?kt(t,s)&&U(r,"set",e,t,s):U(r,"add",e,t),this}function en(e){let t=_(this),{has:r,get:n}=Qe(t),i=r.call(t,e);i?un(t,r,e):(e=_(e),i=r.call(t,e));let o=n?n.call(t,e):void 0,s=t.delete(e);return i&&U(t,"delete",e,void 0,o),s}function tn(){let e=_(this),t=e.size!==0,r=oe(e)?new Map(e):new Set(e),n=e.clear();return t&&U(e,"clear",void 0,void 0,r),n}function Xe(e,t){return function(n,i){let o=this,s=o.__v_raw,a=_(s),c=t?Ft:e?jt:$t;return !e&&M(a,"iterate",Q),s.forEach((l,u)=>n.call(i,c(l),c(u),o))}}function Ze(e,t,r){return function(...n){let i=this.__v_raw,o=_(i),s=oe(o),a=e==="entries"||e===Symbol.iterator&&s,c=e==="keys"&&s,l=i[e](...n),u=r?Ft:t?jt:$t;return !t&&M(o,"iterate",c?Pt:Q),{next(){let{value:p,done:h}=l.next();return h?{value:p,done:h}:{value:a?[u(p[0]),u(p[1])]:u(p),done:h}},[Symbol.iterator](){return this}}}}function q(e){return function(...t){{let r=t[0]?`on key "${t[0]}" `:"";console.warn(`${Nt(e)} operation ${r}failed: target is readonly.`,_(this));}return e==="delete"?false:this}}function ki(){let e={get(o){return Ge(this,o)},get size(){return Ye(this)},has:Je,add:Zr,set:Qr,delete:en,clear:tn,forEach:Xe(false,false)},t={get(o){return Ge(this,o,false,true)},get size(){return Ye(this)},has:Je,add:Zr,set:Qr,delete:en,clear:tn,forEach:Xe(false,true)},r={get(o){return Ge(this,o,true)},get size(){return Ye(this,true)},has(o){return Je.call(this,o,true)},add:q("add"),set:q("set"),delete:q("delete"),clear:q("clear"),forEach:Xe(true,false)},n={get(o){return Ge(this,o,true,true)},get size(){return Ye(this,true)},has(o){return Je.call(this,o,true)},add:q("add"),set:q("set"),delete:q("delete"),clear:q("clear"),forEach:Xe(true,true)};return ["keys","values","entries",Symbol.iterator].forEach(o=>{e[o]=Ze(o,false,false),r[o]=Ze(o,true,false),t[o]=Ze(o,false,true),n[o]=Ze(o,true,true);}),[e,r,t,n]}var[Di,Pi]=ki();function ln(e,t){let r=e?Pi:Di;return (n,i,o)=>i==="__v_isReactive"?!e:i==="__v_isReadonly"?e:i==="__v_raw"?n:Reflect.get(ye(r,i)&&i in n?r:n,i,o)}var $i={get:ln(false)};var ji={get:ln(true)};function un(e,t,r){let n=_(r);if(n!==r&&t.call(e,n)){let i=Mt(e);console.warn(`Reactive ${i} contains both the raw and reactive versions of the same object${i==="Map"?" as keys":""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);}}var fn=new WeakMap,Fi=new WeakMap,dn=new WeakMap,Bi=new WeakMap;function zi(e){switch(e){case "Object":case "Array":return 1;case "Map":case "Set":case "WeakMap":case "WeakSet":return 2;default:return 0}}function Ki(e){return e.__v_skip||!Object.isExtensible(e)?0:zi(Mt(e))}function et(e){return e&&e.__v_isReadonly?e:mn(e,false,Mi,$i,fn)}function pn(e){return mn(e,true,Ni,ji,dn)}function mn(e,t,r,n,i){if(!be(e))return console.warn(`value cannot be made reactive: ${String(e)}`),e;if(e.__v_raw&&!(t&&e.__v_isReactive))return e;let o=i.get(e);if(o)return o;let s=Ki(e);if(s===0)return e;let a=new Proxy(e,s===2?n:r);return i.set(e,a),a}function _(e){return e&&_(e.__v_raw)||e}function It(e){return Boolean(e&&e.__v_isRef===true)}y("nextTick",()=>ie);y("dispatch",e=>J.bind(J,e));y("watch",(e,{evaluateLater:t,cleanup:r})=>(n,i)=>{let o=t(n),a=ve(()=>{let c;return o(l=>c=l),c},i);r(a);});y("store",Kr);y("data",e=>Ce(e));y("root",e=>Y(e));y("refs",e=>(e._x_refs_proxy||(e._x_refs_proxy=z(Hi(e))),e._x_refs_proxy));function Hi(e){let t=[];return j(e,r=>{r._x_refs&&t.push(r._x_refs);}),t}var Bt={};function zt(e){return Bt[e]||(Bt[e]=0),++Bt[e]}function hn(e,t){return j(e,r=>{if(r._x_ids&&r._x_ids[t])return  true})}function _n(e,t){e._x_ids||(e._x_ids={}),e._x_ids[t]||(e._x_ids[t]=zt(t));}y("id",(e,{cleanup:t})=>(r,n=null)=>{let i=`${r}${n?`-${n}`:""}`;return Vi(e,i,t,()=>{let o=hn(e,r),s=o?o._x_ids[r]:zt(r);return n?`${r}-${s}-${n}`:`${r}-${s}`})});H((e,t)=>{e._x_id&&(t._x_id=e._x_id);});function Vi(e,t,r,n){if(e._x_id||(e._x_id={}),e._x_id[t])return e._x_id[t];let i=n();return e._x_id[t]=i,r(()=>{delete e._x_id[t];}),i}y("el",e=>e);gn("Focus","focus","focus");gn("Persist","persist","persist");function gn(e,t,r){y(t,n=>E(`You can't use [$${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${r}`,n));}d("modelable",(e,{expression:t},{effect:r,evaluateLater:n,cleanup:i})=>{let o=n(t),s=()=>{let u;return o(p=>u=p),u},a=n(`${t} = __placeholder`),c=u=>a(()=>{},{scope:{__placeholder:u}}),l=s();c(l),queueMicrotask(()=>{if(!e._x_model)return;e._x_removeModelListeners.default();let u=e._x_model.get,p=e._x_model.set,h=Ve({get(){return u()},set(w){p(w);}},{get(){return s()},set(w){c(w);}});i(h);});});d("teleport",(e,{modifiers:t,expression:r},{cleanup:n})=>{e.tagName.toLowerCase()!=="template"&&E("x-teleport can only be used on a <template> tag",e);let i=xn(r),o=e.content.cloneNode(true).firstElementChild;e._x_teleport=o,o._x_teleportBack=e,e.setAttribute("data-teleport-template",true),o.setAttribute("data-teleport-target",true),e._x_forwardEvents&&e._x_forwardEvents.forEach(a=>{o.addEventListener(a,c=>{c.stopPropagation(),e.dispatchEvent(new c.constructor(c.type,c));});}),k(o,{},e);let s=(a,c,l)=>{l.includes("prepend")?c.parentNode.insertBefore(a,c):l.includes("append")?c.parentNode.insertBefore(a,c.nextSibling):c.appendChild(a);};m(()=>{s(o,i,t),A(()=>{S(o);})();}),e._x_teleportPutBack=()=>{let a=xn(r);m(()=>{s(e._x_teleport,a,t);});},n(()=>m(()=>{o.remove(),P(o);}));});var qi=document.createElement("div");function xn(e){let t=A(()=>document.querySelector(e),()=>qi)();return t||E(`Cannot find x-teleport element for selector: "${e}"`),t}var yn=()=>{};yn.inline=(e,{modifiers:t},{cleanup:r})=>{t.includes("self")?e._x_ignoreSelf=true:e._x_ignore=true,r(()=>{t.includes("self")?delete e._x_ignoreSelf:delete e._x_ignore;});};d("ignore",yn);d("effect",A((e,{expression:t},{effect:r})=>{r(x(e,t));}));function ae(e,t,r,n){let i=e,o=c=>n(c),s={},a=(c,l)=>u=>l(c,u);if(r.includes("dot")&&(t=Ui(t)),r.includes("camel")&&(t=Wi(t)),r.includes("passive")&&(s.passive=true),r.includes("capture")&&(s.capture=true),r.includes("window")&&(i=window),r.includes("document")&&(i=document),r.includes("debounce")){let c=r[r.indexOf("debounce")+1]||"invalid-wait",l=tt(c.split("ms")[0])?Number(c.split("ms")[0]):250;o=Ke(o,l);}if(r.includes("throttle")){let c=r[r.indexOf("throttle")+1]||"invalid-wait",l=tt(c.split("ms")[0])?Number(c.split("ms")[0]):250;o=He(o,l);}return r.includes("prevent")&&(o=a(o,(c,l)=>{l.preventDefault(),c(l);})),r.includes("stop")&&(o=a(o,(c,l)=>{l.stopPropagation(),c(l);})),r.includes("once")&&(o=a(o,(c,l)=>{c(l),i.removeEventListener(t,o,s);})),(r.includes("away")||r.includes("outside"))&&(i=document,o=a(o,(c,l)=>{e.contains(l.target)||l.target.isConnected!==false&&(e.offsetWidth<1&&e.offsetHeight<1||e._x_isShown!==false&&c(l));})),r.includes("self")&&(o=a(o,(c,l)=>{l.target===e&&c(l);})),(Ji(t)||wn(t))&&(o=a(o,(c,l)=>{Yi(l,r)||c(l);})),i.addEventListener(t,o,s),()=>{i.removeEventListener(t,o,s);}}function Ui(e){return e.replace(/-/g,".")}function Wi(e){return e.toLowerCase().replace(/-(\w)/g,(t,r)=>r.toUpperCase())}function tt(e){return !Array.isArray(e)&&!isNaN(e)}function Gi(e){return [" ","_"].includes(e)?e:e.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/[_\s]/,"-").toLowerCase()}function Ji(e){return ["keydown","keyup"].includes(e)}function wn(e){return ["contextmenu","click","mouse"].some(t=>e.includes(t))}function Yi(e,t){let r=t.filter(o=>!["window","document","prevent","stop","once","capture","self","away","outside","passive","preserve-scroll"].includes(o));if(r.includes("debounce")){let o=r.indexOf("debounce");r.splice(o,tt((r[o+1]||"invalid-wait").split("ms")[0])?2:1);}if(r.includes("throttle")){let o=r.indexOf("throttle");r.splice(o,tt((r[o+1]||"invalid-wait").split("ms")[0])?2:1);}if(r.length===0||r.length===1&&bn(e.key).includes(r[0]))return  false;let i=["ctrl","shift","alt","meta","cmd","super"].filter(o=>r.includes(o));return r=r.filter(o=>!i.includes(o)),!(i.length>0&&i.filter(s=>((s==="cmd"||s==="super")&&(s="meta"),e[`${s}Key`])).length===i.length&&(wn(e.type)||bn(e.key).includes(r[0])))}function bn(e){if(!e)return [];e=Gi(e);let t={ctrl:"control",slash:"/",space:" ",spacebar:" ",cmd:"meta",esc:"escape",up:"arrow-up",down:"arrow-down",left:"arrow-left",right:"arrow-right",period:".",comma:",",equal:"=",minus:"-",underscore:"_"};return t[e]=e,Object.keys(t).map(r=>{if(t[r]===e)return r}).filter(r=>r)}d("model",(e,{modifiers:t,expression:r},{effect:n,cleanup:i})=>{let o=e;t.includes("parent")&&(o=e.parentNode);let s=x(o,r),a;typeof r=="string"?a=x(o,`${r} = __placeholder`):typeof r=="function"&&typeof r()=="string"?a=x(o,`${r()} = __placeholder`):a=()=>{};let c=()=>{let h;return s(w=>h=w),En(h)?h.get():h},l=h=>{let w;s(F=>w=F),En(w)?w.set(h):a(()=>{},{scope:{__placeholder:h}});};typeof r=="string"&&e.type==="radio"&&m(()=>{e.hasAttribute("name")||e.setAttribute("name",r);});let u=e.tagName.toLowerCase()==="select"||["checkbox","radio"].includes(e.type)||t.includes("lazy")?"change":"input",p=I?()=>{}:ae(e,u,t,h=>{l(Kt(e,t,h,c()));});if(t.includes("fill")&&([void 0,null,""].includes(c())||ze(e)&&Array.isArray(c())||e.tagName.toLowerCase()==="select"&&e.multiple)&&l(Kt(e,t,{target:e},c())),e._x_removeModelListeners||(e._x_removeModelListeners={}),e._x_removeModelListeners.default=p,i(()=>e._x_removeModelListeners.default()),e.form){let h=ae(e.form,"reset",[],w=>{ie(()=>e._x_model&&e._x_model.set(Kt(e,t,{target:e},c())));});i(()=>h());}e._x_model={get(){return c()},set(h){l(h);}},e._x_forceModelUpdate=h=>{h===void 0&&typeof r=="string"&&r.match(/\./)&&(h=""),window.fromModel=true,m(()=>ge(e,"value",h)),delete window.fromModel;},n(()=>{let h=c();t.includes("unintrusive")&&document.activeElement.isSameNode(e)||e._x_forceModelUpdate(h);});});function Kt(e,t,r,n){return m(()=>{if(r instanceof CustomEvent&&r.detail!==void 0)return r.detail!==null&&r.detail!==void 0?r.detail:r.target.value;if(ze(e))if(Array.isArray(n)){let i=null;return t.includes("number")?i=Ht(r.target.value):t.includes("boolean")?i=xe(r.target.value):i=r.target.value,r.target.checked?n.includes(i)?n:n.concat([i]):n.filter(o=>!Xi(o,i))}else return r.target.checked;else {if(e.tagName.toLowerCase()==="select"&&e.multiple)return t.includes("number")?Array.from(r.target.selectedOptions).map(i=>{let o=i.value||i.text;return Ht(o)}):t.includes("boolean")?Array.from(r.target.selectedOptions).map(i=>{let o=i.value||i.text;return xe(o)}):Array.from(r.target.selectedOptions).map(i=>i.value||i.text);{let i;return Ot(e)?r.target.checked?i=r.target.value:i=n:i=r.target.value,t.includes("number")?Ht(i):t.includes("boolean")?xe(i):t.includes("trim")?i.trim():i}}})}function Ht(e){let t=e?parseFloat(e):null;return Zi(t)?t:e}function Xi(e,t){return e==t}function Zi(e){return !Array.isArray(e)&&!isNaN(e)}function En(e){return e!==null&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"}d("cloak",e=>queueMicrotask(()=>m(()=>e.removeAttribute(C("cloak")))));$e(()=>`[${C("init")}]`);d("init",A((e,{expression:t},{evaluate:r})=>typeof t=="string"?!!t.trim()&&r(t,{},false):r(t,{},false)));d("text",(e,{expression:t},{effect:r,evaluateLater:n})=>{let i=n(t);r(()=>{i(o=>{m(()=>{e.textContent=o;});});});});d("html",(e,{expression:t},{effect:r,evaluateLater:n})=>{let i=n(t);r(()=>{i(o=>{m(()=>{e.innerHTML=o,e._x_ignoreSelf=true,S(e),delete e._x_ignoreSelf;});});});});ne(Pe(":",Ie(C("bind:"))));var vn=(e,{value:t,modifiers:r,expression:n,original:i},{effect:o,cleanup:s})=>{if(!t){let c={};qr(c),x(e,n)(u=>{Tt(e,u,i);},{scope:c});return}if(t==="key")return Qi(e,n);if(e._x_inlineBindings&&e._x_inlineBindings[t]&&e._x_inlineBindings[t].extract)return;let a=x(e,n);o(()=>a(c=>{c===void 0&&typeof n=="string"&&n.match(/\./)&&(c=""),m(()=>ge(e,t,c,r));})),s(()=>{e._x_undoAddedClasses&&e._x_undoAddedClasses(),e._x_undoAddedStyles&&e._x_undoAddedStyles();});};vn.inline=(e,{value:t,modifiers:r,expression:n})=>{t&&(e._x_inlineBindings||(e._x_inlineBindings={}),e._x_inlineBindings[t]={expression:n,extract:false});};d("bind",vn);function Qi(e,t){e._x_keyExpression=t;}Le(()=>`[${C("data")}]`);d("data",(e,{expression:t},{cleanup:r})=>{if(eo(e))return;t=t===""?"{}":t;let n={};fe(n,e);let i={};Gr(i,n);let o=R(e,t,{scope:i});(o===void 0||o===true)&&(o={}),fe(o,e);let s=T(o);Te(s);let a=k(e,s);s.init&&R(e,s.init),r(()=>{s.destroy&&R(e,s.destroy),a();});});H((e,t)=>{e._x_dataStack&&(t._x_dataStack=e._x_dataStack,t.setAttribute("data-has-alpine-state",true));});function eo(e){return I?Be?true:e.hasAttribute("data-has-alpine-state"):false}d("show",(e,{modifiers:t,expression:r},{effect:n})=>{let i=x(e,r);e._x_doHide||(e._x_doHide=()=>{m(()=>{e.style.setProperty("display","none",t.includes("important")?"important":void 0);});}),e._x_doShow||(e._x_doShow=()=>{m(()=>{e.style.length===1&&e.style.display==="none"?e.removeAttribute("style"):e.style.removeProperty("display");});});let o=()=>{e._x_doHide(),e._x_isShown=false;},s=()=>{e._x_doShow(),e._x_isShown=true;},a=()=>setTimeout(s),c=he(p=>p?s():o(),p=>{typeof e._x_toggleAndCascadeWithTransitions=="function"?e._x_toggleAndCascadeWithTransitions(e,p,s,o):p?a():o();}),l,u=true;n(()=>i(p=>{!u&&p===l||(t.includes("immediate")&&(p?a():o()),c(p),l=p,u=false);}));});d("for",(e,{expression:t},{effect:r,cleanup:n})=>{let i=ro(t),o=x(e,i.items),s=x(e,e._x_keyExpression||"index");e._x_prevKeys=[],e._x_lookup={},r(()=>to(e,i,o,s)),n(()=>{Object.values(e._x_lookup).forEach(a=>m(()=>{P(a),a.remove();})),delete e._x_prevKeys,delete e._x_lookup;});});function to(e,t,r,n){let i=s=>typeof s=="object"&&!Array.isArray(s),o=e;r(s=>{no(s)&&s>=0&&(s=Array.from(Array(s).keys(),f=>f+1)),s===void 0&&(s=[]);let a=e._x_lookup,c=e._x_prevKeys,l=[],u=[];if(i(s))s=Object.entries(s).map(([f,g])=>{let b=Sn(t,g,f,s);n(v=>{u.includes(v)&&E("Duplicate key on x-for",e),u.push(v);},{scope:{index:f,...b}}),l.push(b);});else for(let f=0;f<s.length;f++){let g=Sn(t,s[f],f,s);n(b=>{u.includes(b)&&E("Duplicate key on x-for",e),u.push(b);},{scope:{index:f,...g}}),l.push(g);}let p=[],h=[],w=[],F=[];for(let f=0;f<c.length;f++){let g=c[f];u.indexOf(g)===-1&&w.push(g);}c=c.filter(f=>!w.includes(f));let Ee="template";for(let f=0;f<u.length;f++){let g=u[f],b=c.indexOf(g);if(b===-1)c.splice(f,0,g),p.push([Ee,f]);else if(b!==f){let v=c.splice(f,1)[0],O=c.splice(b-1,1)[0];c.splice(f,0,O),c.splice(b,0,v),h.push([v,O]);}else F.push(g);Ee=g;}for(let f=0;f<w.length;f++){let g=w[f];g in a&&(m(()=>{P(a[g]),a[g].remove();}),delete a[g]);}for(let f=0;f<h.length;f++){let[g,b]=h[f],v=a[g],O=a[b],ee=document.createElement("div");m(()=>{O||E('x-for ":key" is undefined or invalid',o,b,a),O.after(ee),v.after(O),O._x_currentIfEl&&O.after(O._x_currentIfEl),ee.before(v),v._x_currentIfEl&&v.after(v._x_currentIfEl),ee.remove();}),O._x_refreshXForScope(l[u.indexOf(b)]);}for(let f=0;f<p.length;f++){let[g,b]=p[f],v=g==="template"?o:a[g];v._x_currentIfEl&&(v=v._x_currentIfEl);let O=l[b],ee=u[b],ce=document.importNode(o.content,true).firstElementChild,qt=T(O);k(ce,qt,o),ce._x_refreshXForScope=On=>{Object.entries(On).forEach(([Cn,Tn])=>{qt[Cn]=Tn;});},m(()=>{v.after(ce),A(()=>S(ce))();}),typeof ee=="object"&&E("x-for key cannot be an object, it must be a string or an integer",o),a[ee]=ce;}for(let f=0;f<F.length;f++)a[F[f]]._x_refreshXForScope(l[u.indexOf(F[f])]);o._x_prevKeys=u;});}function ro(e){let t=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,r=/^\s*\(|\)\s*$/g,n=/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,i=e.match(n);if(!i)return;let o={};o.items=i[2].trim();let s=i[1].replace(r,"").trim(),a=s.match(t);return a?(o.item=s.replace(t,"").trim(),o.index=a[1].trim(),a[2]&&(o.collection=a[2].trim())):o.item=s,o}function Sn(e,t,r,n){let i={};return /^\[.*\]$/.test(e.item)&&Array.isArray(t)?e.item.replace("[","").replace("]","").split(",").map(s=>s.trim()).forEach((s,a)=>{i[s]=t[a];}):/^\{.*\}$/.test(e.item)&&!Array.isArray(t)&&typeof t=="object"?e.item.replace("{","").replace("}","").split(",").map(s=>s.trim()).forEach(s=>{i[s]=t[s];}):i[e.item]=t,e.index&&(i[e.index]=r),e.collection&&(i[e.collection]=n),i}function no(e){return !Array.isArray(e)&&!isNaN(e)}function An(){}An.inline=(e,{expression:t},{cleanup:r})=>{let n=Y(e);n._x_refs||(n._x_refs={}),n._x_refs[t]=e,r(()=>delete n._x_refs[t]);};d("ref",An);d("if",(e,{expression:t},{effect:r,cleanup:n})=>{e.tagName.toLowerCase()!=="template"&&E("x-if can only be used on a <template> tag",e);let i=x(e,t),o=()=>{if(e._x_currentIfEl)return e._x_currentIfEl;let a=e.content.cloneNode(true).firstElementChild;return k(a,{},e),m(()=>{e.after(a),A(()=>S(a))();}),e._x_currentIfEl=a,e._x_undoIf=()=>{m(()=>{P(a),a.remove();}),delete e._x_currentIfEl;},a},s=()=>{e._x_undoIf&&(e._x_undoIf(),delete e._x_undoIf);};r(()=>i(a=>{a?o():s();})),n(()=>e._x_undoIf&&e._x_undoIf());});d("id",(e,{expression:t},{evaluate:r})=>{r(t).forEach(i=>_n(e,i));});H((e,t)=>{e._x_ids&&(t._x_ids=e._x_ids);});ne(Pe("@",Ie(C("on:"))));d("on",A((e,{value:t,modifiers:r,expression:n},{cleanup:i})=>{let o=n?x(e,n):()=>{};e.tagName.toLowerCase()==="template"&&(e._x_forwardEvents||(e._x_forwardEvents=[]),e._x_forwardEvents.includes(t)||e._x_forwardEvents.push(t));let s=ae(e,t,r,a=>{o(()=>{},{scope:{$event:a},params:[a]});});i(()=>s());}));rt("Collapse","collapse","collapse");rt("Intersect","intersect","intersect");rt("Focus","trap","focus");rt("Mask","mask","mask");function rt(e,t,r){d(t,n=>E(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${r}`,n));}K.setEvaluator(xt);K.setReactivityEngine({reactive:et,effect:rn,release:nn,raw:_});var Vt=K;window.Alpine=Vt;queueMicrotask(()=>{Vt.start();});})();

})();
