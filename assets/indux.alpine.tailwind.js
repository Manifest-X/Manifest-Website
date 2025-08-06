(function () {
  'use strict';

  /*! Marked.js - MIT License */
  !function (e, t) { "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).marked = {}) }(this, (function (e) { "use strict"; function t() { return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null } } function n(t) { e.defaults = t } e.defaults = { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null }; const s = /[&<>"']/, r = new RegExp(s.source, "g"), i = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, l = new RegExp(i.source, "g"), o = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, a = e => o[e]; function c(e, t) { if (t) { if (s.test(e)) return e.replace(r, a) } else if (i.test(e)) return e.replace(l, a); return e } const h = /(^|[^\[])\^/g; function p(e, t) { let n = "string" == typeof e ? e : e.source; t = t || ""; const s = { replace: (e, t) => { let r = "string" == typeof t ? t : t.source; return r = r.replace(h, "$1"), n = n.replace(e, r), s }, getRegex: () => new RegExp(n, t) }; return s } function u(e) { try { e = encodeURI(e).replace(/%25/g, "%") } catch { return null } return e } const k = { exec: () => null }; function g(e, t) { const n = e.replace(/\|/g, ((e, t, n) => { let s = !1, r = t; for (; --r >= 0 && "\\" === n[r];)s = !s; return s ? "|" : " |" })).split(/ \|/); let s = 0; if (n[0].trim() || n.shift(), n.length > 0 && !n[n.length - 1].trim() && n.pop(), t) if (n.length > t) n.splice(t); else for (; n.length < t;)n.push(""); for (; s < n.length; s++)n[s] = n[s].trim().replace(/\\\|/g, "|"); return n } function f(e, t, n) { const s = e.length; if (0 === s) return ""; let r = 0; for (; r < s;) { const i = e.charAt(s - r - 1); if (i !== t || n) { if (i === t || !n) break; r++ } else r++ } return e.slice(0, s - r) } function d(e, t, n, s) { const r = t.href, i = t.title ? c(t.title) : null, l = e[1].replace(/\\([\[\]])/g, "$1"); if ("!" !== e[0].charAt(0)) { s.state.inLink = !0; const e = { type: "link", raw: n, href: r, title: i, text: l, tokens: s.inlineTokens(l) }; return s.state.inLink = !1, e } return { type: "image", raw: n, href: r, title: i, text: c(l) } } class x { options; rules; lexer; constructor(t) { this.options = t || e.defaults } space(e) { const t = this.rules.block.newline.exec(e); if (t && t[0].length > 0) return { type: "space", raw: t[0] } } code(e) { const t = this.rules.block.code.exec(e); if (t) { const e = t[0].replace(/^(?: {1,4}| {0,3}\t)/gm, ""); return { type: "code", raw: t[0], codeBlockStyle: "indented", text: this.options.pedantic ? e : f(e, "\n") } } } fences(e) { const t = this.rules.block.fences.exec(e); if (t) { const e = t[0], n = function (e, t) { const n = e.match(/^(\s+)(?:```)/); if (null === n) return t; const s = n[1]; return t.split("\n").map((e => { const t = e.match(/^\s+/); if (null === t) return e; const [n] = t; return n.length >= s.length ? e.slice(s.length) : e })).join("\n") }(e, t[3] || ""); return { type: "code", raw: e, lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2], text: n } } } heading(e) { const t = this.rules.block.heading.exec(e); if (t) { let e = t[2].trim(); if (/#$/.test(e)) { const t = f(e, "#"); this.options.pedantic ? e = t.trim() : t && !/ $/.test(t) || (e = t.trim()) } return { type: "heading", raw: t[0], depth: t[1].length, text: e, tokens: this.lexer.inline(e) } } } hr(e) { const t = this.rules.block.hr.exec(e); if (t) return { type: "hr", raw: f(t[0], "\n") } } blockquote(e) { const t = this.rules.block.blockquote.exec(e); if (t) { let e = f(t[0], "\n").split("\n"), n = "", s = ""; const r = []; for (; e.length > 0;) { let t = !1; const i = []; let l; for (l = 0; l < e.length; l++)if (/^ {0,3}>/.test(e[l])) i.push(e[l]), t = !0; else { if (t) break; i.push(e[l]) } e = e.slice(l); const o = i.join("\n"), a = o.replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g, "\n    $1").replace(/^ {0,3}>[ \t]?/gm, ""); n = n ? `${n}\n${o}` : o, s = s ? `${s}\n${a}` : a; const c = this.lexer.state.top; if (this.lexer.state.top = !0, this.lexer.blockTokens(a, r, !0), this.lexer.state.top = c, 0 === e.length) break; const h = r[r.length - 1]; if ("code" === h?.type) break; if ("blockquote" === h?.type) { const t = h, i = t.raw + "\n" + e.join("\n"), l = this.blockquote(i); r[r.length - 1] = l, n = n.substring(0, n.length - t.raw.length) + l.raw, s = s.substring(0, s.length - t.text.length) + l.text; break } if ("list" !== h?.type); else { const t = h, i = t.raw + "\n" + e.join("\n"), l = this.list(i); r[r.length - 1] = l, n = n.substring(0, n.length - h.raw.length) + l.raw, s = s.substring(0, s.length - t.raw.length) + l.raw, e = i.substring(r[r.length - 1].raw.length).split("\n") } } return { type: "blockquote", raw: n, tokens: r, text: s } } } list(e) { let t = this.rules.block.list.exec(e); if (t) { let n = t[1].trim(); const s = n.length > 1, r = { type: "list", raw: "", ordered: s, start: s ? +n.slice(0, -1) : "", loose: !1, items: [] }; n = s ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = s ? n : "[*+-]"); const i = new RegExp(`^( {0,3}${n})((?:[\t ][^\\n]*)?(?:\\n|$))`); let l = !1; for (; e;) { let n = !1, s = "", o = ""; if (!(t = i.exec(e))) break; if (this.rules.block.hr.test(e)) break; s = t[0], e = e.substring(s.length); let a = t[2].split("\n", 1)[0].replace(/^\t+/, (e => " ".repeat(3 * e.length))), c = e.split("\n", 1)[0], h = !a.trim(), p = 0; if (this.options.pedantic ? (p = 2, o = a.trimStart()) : h ? p = t[1].length + 1 : (p = t[2].search(/[^ ]/), p = p > 4 ? 1 : p, o = a.slice(p), p += t[1].length), h && /^[ \t]*$/.test(c) && (s += c + "\n", e = e.substring(c.length + 1), n = !0), !n) { const t = new RegExp(`^ {0,${Math.min(3, p - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`), n = new RegExp(`^ {0,${Math.min(3, p - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), r = new RegExp(`^ {0,${Math.min(3, p - 1)}}(?:\`\`\`|~~~)`), i = new RegExp(`^ {0,${Math.min(3, p - 1)}}#`), l = new RegExp(`^ {0,${Math.min(3, p - 1)}}<[a-z].*>`, "i"); for (; e;) { const u = e.split("\n", 1)[0]; let k; if (c = u, this.options.pedantic ? (c = c.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  "), k = c) : k = c.replace(/\t/g, "    "), r.test(c)) break; if (i.test(c)) break; if (l.test(c)) break; if (t.test(c)) break; if (n.test(c)) break; if (k.search(/[^ ]/) >= p || !c.trim()) o += "\n" + k.slice(p); else { if (h) break; if (a.replace(/\t/g, "    ").search(/[^ ]/) >= 4) break; if (r.test(a)) break; if (i.test(a)) break; if (n.test(a)) break; o += "\n" + c } h || c.trim() || (h = !0), s += u + "\n", e = e.substring(u.length + 1), a = k.slice(p) } } r.loose || (l ? r.loose = !0 : /\n[ \t]*\n[ \t]*$/.test(s) && (l = !0)); let u, k = null; this.options.gfm && (k = /^\[[ xX]\] /.exec(o), k && (u = "[ ] " !== k[0], o = o.replace(/^\[[ xX]\] +/, ""))), r.items.push({ type: "list_item", raw: s, task: !!k, checked: u, loose: !1, text: o, tokens: [] }), r.raw += s } r.items[r.items.length - 1].raw = r.items[r.items.length - 1].raw.trimEnd(), r.items[r.items.length - 1].text = r.items[r.items.length - 1].text.trimEnd(), r.raw = r.raw.trimEnd(); for (let e = 0; e < r.items.length; e++)if (this.lexer.state.top = !1, r.items[e].tokens = this.lexer.blockTokens(r.items[e].text, []), !r.loose) { const t = r.items[e].tokens.filter((e => "space" === e.type)), n = t.length > 0 && t.some((e => /\n.*\n/.test(e.raw))); r.loose = n } if (r.loose) for (let e = 0; e < r.items.length; e++)r.items[e].loose = !0; return r } } html(e) { const t = this.rules.block.html.exec(e); if (t) { return { type: "html", block: !0, raw: t[0], pre: "pre" === t[1] || "script" === t[1] || "style" === t[1], text: t[0] } } } def(e) { const t = this.rules.block.def.exec(e); if (t) { const e = t[1].toLowerCase().replace(/\s+/g, " "), n = t[2] ? t[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", s = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3]; return { type: "def", tag: e, raw: t[0], href: n, title: s } } } table(e) { const t = this.rules.block.table.exec(e); if (!t) return; if (!/[:|]/.test(t[2])) return; const n = g(t[1]), s = t[2].replace(/^\||\| *$/g, "").split("|"), r = t[3] && t[3].trim() ? t[3].replace(/\n[ \t]*$/, "").split("\n") : [], i = { type: "table", raw: t[0], header: [], align: [], rows: [] }; if (n.length === s.length) { for (const e of s) /^ *-+: *$/.test(e) ? i.align.push("right") : /^ *:-+: *$/.test(e) ? i.align.push("center") : /^ *:-+ *$/.test(e) ? i.align.push("left") : i.align.push(null); for (let e = 0; e < n.length; e++)i.header.push({ text: n[e], tokens: this.lexer.inline(n[e]), header: !0, align: i.align[e] }); for (const e of r) i.rows.push(g(e, i.header.length).map(((e, t) => ({ text: e, tokens: this.lexer.inline(e), header: !1, align: i.align[t] })))); return i } } lheading(e) { const t = this.rules.block.lheading.exec(e); if (t) return { type: "heading", raw: t[0], depth: "=" === t[2].charAt(0) ? 1 : 2, text: t[1], tokens: this.lexer.inline(t[1]) } } paragraph(e) { const t = this.rules.block.paragraph.exec(e); if (t) { const e = "\n" === t[1].charAt(t[1].length - 1) ? t[1].slice(0, -1) : t[1]; return { type: "paragraph", raw: t[0], text: e, tokens: this.lexer.inline(e) } } } text(e) { const t = this.rules.block.text.exec(e); if (t) return { type: "text", raw: t[0], text: t[0], tokens: this.lexer.inline(t[0]) } } escape(e) { const t = this.rules.inline.escape.exec(e); if (t) return { type: "escape", raw: t[0], text: c(t[1]) } } tag(e) { const t = this.rules.inline.tag.exec(e); if (t) return !this.lexer.state.inLink && /^<a /i.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) && (this.lexer.state.inRawBlock = !1), { type: "html", raw: t[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: !1, text: t[0] } } link(e) { const t = this.rules.inline.link.exec(e); if (t) { const e = t[2].trim(); if (!this.options.pedantic && /^</.test(e)) { if (!/>$/.test(e)) return; const t = f(e.slice(0, -1), "\\"); if ((e.length - t.length) % 2 == 0) return } else { const e = function (e, t) { if (-1 === e.indexOf(t[1])) return -1; let n = 0; for (let s = 0; s < e.length; s++)if ("\\" === e[s]) s++; else if (e[s] === t[0]) n++; else if (e[s] === t[1] && (n--, n < 0)) return s; return -1 }(t[2], "()"); if (e > -1) { const n = (0 === t[0].indexOf("!") ? 5 : 4) + t[1].length + e; t[2] = t[2].substring(0, e), t[0] = t[0].substring(0, n).trim(), t[3] = "" } } let n = t[2], s = ""; if (this.options.pedantic) { const e = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n); e && (n = e[1], s = e[3]) } else s = t[3] ? t[3].slice(1, -1) : ""; return n = n.trim(), /^</.test(n) && (n = this.options.pedantic && !/>$/.test(e) ? n.slice(1) : n.slice(1, -1)), d(t, { href: n ? n.replace(this.rules.inline.anyPunctuation, "$1") : n, title: s ? s.replace(this.rules.inline.anyPunctuation, "$1") : s }, t[0], this.lexer) } } reflink(e, t) { let n; if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) { const e = t[(n[2] || n[1]).replace(/\s+/g, " ").toLowerCase()]; if (!e) { const e = n[0].charAt(0); return { type: "text", raw: e, text: e } } return d(n, e, n[0], this.lexer) } } emStrong(e, t, n = "") { let s = this.rules.inline.emStrongLDelim.exec(e); if (!s) return; if (s[3] && n.match(/[\p{L}\p{N}]/u)) return; if (!(s[1] || s[2] || "") || !n || this.rules.inline.punctuation.exec(n)) { const n = [...s[0]].length - 1; let r, i, l = n, o = 0; const a = "*" === s[0][0] ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd; for (a.lastIndex = 0, t = t.slice(-1 * e.length + n); null != (s = a.exec(t));) { if (r = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !r) continue; if (i = [...r].length, s[3] || s[4]) { l += i; continue } if ((s[5] || s[6]) && n % 3 && !((n + i) % 3)) { o += i; continue } if (l -= i, l > 0) continue; i = Math.min(i, i + l + o); const t = [...s[0]][0].length, a = e.slice(0, n + s.index + t + i); if (Math.min(n, i) % 2) { const e = a.slice(1, -1); return { type: "em", raw: a, text: e, tokens: this.lexer.inlineTokens(e) } } const c = a.slice(2, -2); return { type: "strong", raw: a, text: c, tokens: this.lexer.inlineTokens(c) } } } } codespan(e) { const t = this.rules.inline.code.exec(e); if (t) { let e = t[2].replace(/\n/g, " "); const n = /[^ ]/.test(e), s = /^ /.test(e) && / $/.test(e); return n && s && (e = e.substring(1, e.length - 1)), e = c(e, !0), { type: "codespan", raw: t[0], text: e } } } br(e) { const t = this.rules.inline.br.exec(e); if (t) return { type: "br", raw: t[0] } } del(e) { const t = this.rules.inline.del.exec(e); if (t) return { type: "del", raw: t[0], text: t[2], tokens: this.lexer.inlineTokens(t[2]) } } autolink(e) { const t = this.rules.inline.autolink.exec(e); if (t) { let e, n; return "@" === t[2] ? (e = c(t[1]), n = "mailto:" + e) : (e = c(t[1]), n = e), { type: "link", raw: t[0], text: e, href: n, tokens: [{ type: "text", raw: e, text: e }] } } } url(e) { let t; if (t = this.rules.inline.url.exec(e)) { let e, n; if ("@" === t[2]) e = c(t[0]), n = "mailto:" + e; else { let s; do { s = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "" } while (s !== t[0]); e = c(t[0]), n = "www." === t[1] ? "http://" + t[0] : t[0] } return { type: "link", raw: t[0], text: e, href: n, tokens: [{ type: "text", raw: e, text: e }] } } } inlineText(e) { const t = this.rules.inline.text.exec(e); if (t) { let e; return e = this.lexer.state.inRawBlock ? t[0] : c(t[0]), { type: "text", raw: t[0], text: e } } } } const b = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, w = /(?:[*+-]|\d{1,9}[.)])/, m = p(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, w).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex(), y = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, $ = /(?!\s*\])(?:\\.|[^\[\]\\])+/, z = p(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", $).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), T = p(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, w).getRegex(), R = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", _ = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, A = p("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$))", "i").replace("comment", _).replace("tag", R).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), S = p(y).replace("hr", b).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", R).getRegex(), I = { blockquote: p(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", S).getRegex(), code: /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, def: z, fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, hr: b, html: A, lheading: m, list: T, newline: /^(?:[ \t]*(?:\n|$))+/, paragraph: S, table: k, text: /^[^\n]+/ }, E = p("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", b).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}\t)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", R).getRegex(), q = { ...I, table: E, paragraph: p(y).replace("hr", b).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", E).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", R).getRegex() }, Z = { ...I, html: p("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", _).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: k, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: p(y).replace("hr", b).replace("heading", " *#{1,6} *[^\n]").replace("lheading", m).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, P = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, L = /^( {2,}|\\)\n(?!\s*$)/, v = "\\p{P}\\p{S}", Q = p(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, v).getRegex(), B = p(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, v).getRegex(), M = p("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])", "gu").replace(/punct/g, v).getRegex(), O = p("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])", "gu").replace(/punct/g, v).getRegex(), j = p(/\\([punct])/, "gu").replace(/punct/g, v).getRegex(), D = p(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), C = p(_).replace("(?:--\x3e|$)", "--\x3e").getRegex(), H = p("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", C).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), U = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, X = p(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", U).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), F = p(/^!?\[(label)\]\[(ref)\]/).replace("label", U).replace("ref", $).getRegex(), N = p(/^!?\[(ref)\](?:\[\])?/).replace("ref", $).getRegex(), G = { _backpedal: k, anyPunctuation: j, autolink: D, blockSkip: /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, br: L, code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, del: k, emStrongLDelim: B, emStrongRDelimAst: M, emStrongRDelimUnd: O, escape: P, link: X, nolink: N, punctuation: Q, reflink: F, reflinkSearch: p("reflink|nolink(?!\\()", "g").replace("reflink", F).replace("nolink", N).getRegex(), tag: H, text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, url: k }, J = { ...G, link: p(/^!?\[(label)\]\((.*?)\)/).replace("label", U).getRegex(), reflink: p(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", U).getRegex() }, K = { ...G, escape: p(P).replace("])", "~|])").getRegex(), url: p(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/, text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/ }, V = { ...K, br: p(L).replace("{2,}", "*").getRegex(), text: p(K.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, W = { normal: I, gfm: q, pedantic: Z }, Y = { normal: G, gfm: K, breaks: V, pedantic: J }; class ee { tokens; options; state; tokenizer; inlineQueue; constructor(t) { this.tokens = [], this.tokens.links = Object.create(null), this.options = t || e.defaults, this.options.tokenizer = this.options.tokenizer || new x, this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 }; const n = { block: W.normal, inline: Y.normal }; this.options.pedantic ? (n.block = W.pedantic, n.inline = Y.pedantic) : this.options.gfm && (n.block = W.gfm, this.options.breaks ? n.inline = Y.breaks : n.inline = Y.gfm), this.tokenizer.rules = n } static get rules() { return { block: W, inline: Y } } static lex(e, t) { return new ee(t).lex(e) } static lexInline(e, t) { return new ee(t).inlineTokens(e) } lex(e) { e = e.replace(/\r\n|\r/g, "\n"), this.blockTokens(e, this.tokens); for (let e = 0; e < this.inlineQueue.length; e++) { const t = this.inlineQueue[e]; this.inlineTokens(t.src, t.tokens) } return this.inlineQueue = [], this.tokens } blockTokens(e, t = [], n = !1) { let s, r, i; for (this.options.pedantic && (e = e.replace(/\t/g, "    ").replace(/^ +$/gm, "")); e;)if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((n => !!(s = n.call({ lexer: this }, e, t)) && (e = e.substring(s.raw.length), t.push(s), !0))))) if (s = this.tokenizer.space(e)) e = e.substring(s.raw.length), 1 === s.raw.length && t.length > 0 ? t[t.length - 1].raw += "\n" : t.push(s); else if (s = this.tokenizer.code(e)) e = e.substring(s.raw.length), r = t[t.length - 1], !r || "paragraph" !== r.type && "text" !== r.type ? t.push(s) : (r.raw += "\n" + s.raw, r.text += "\n" + s.text, this.inlineQueue[this.inlineQueue.length - 1].src = r.text); else if (s = this.tokenizer.fences(e)) e = e.substring(s.raw.length), t.push(s); else if (s = this.tokenizer.heading(e)) e = e.substring(s.raw.length), t.push(s); else if (s = this.tokenizer.hr(e)) e = e.substring(s.raw.length), t.push(s); else if (s = this.tokenizer.blockquote(e)) e = e.substring(s.raw.length), t.push(s); else if (s = this.tokenizer.list(e)) e = e.substring(s.raw.length), t.push(s); else if (s = this.tokenizer.html(e)) e = e.substring(s.raw.length), t.push(s); else if (s = this.tokenizer.def(e)) e = e.substring(s.raw.length), r = t[t.length - 1], !r || "paragraph" !== r.type && "text" !== r.type ? this.tokens.links[s.tag] || (this.tokens.links[s.tag] = { href: s.href, title: s.title }) : (r.raw += "\n" + s.raw, r.text += "\n" + s.raw, this.inlineQueue[this.inlineQueue.length - 1].src = r.text); else if (s = this.tokenizer.table(e)) e = e.substring(s.raw.length), t.push(s); else if (s = this.tokenizer.lheading(e)) e = e.substring(s.raw.length), t.push(s); else { if (i = e, this.options.extensions && this.options.extensions.startBlock) { let t = 1 / 0; const n = e.slice(1); let s; this.options.extensions.startBlock.forEach((e => { s = e.call({ lexer: this }, n), "number" == typeof s && s >= 0 && (t = Math.min(t, s)) })), t < 1 / 0 && t >= 0 && (i = e.substring(0, t + 1)) } if (this.state.top && (s = this.tokenizer.paragraph(i))) r = t[t.length - 1], n && "paragraph" === r?.type ? (r.raw += "\n" + s.raw, r.text += "\n" + s.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = r.text) : t.push(s), n = i.length !== e.length, e = e.substring(s.raw.length); else if (s = this.tokenizer.text(e)) e = e.substring(s.raw.length), r = t[t.length - 1], r && "text" === r.type ? (r.raw += "\n" + s.raw, r.text += "\n" + s.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = r.text) : t.push(s); else if (e) { const t = "Infinite loop on byte: " + e.charCodeAt(0); if (this.options.silent) { console.error(t); break } throw new Error(t) } } return this.state.top = !0, t } inline(e, t = []) { return this.inlineQueue.push({ src: e, tokens: t }), t } inlineTokens(e, t = []) { let n, s, r, i, l, o, a = e; if (this.tokens.links) { const e = Object.keys(this.tokens.links); if (e.length > 0) for (; null != (i = this.tokenizer.rules.inline.reflinkSearch.exec(a));)e.includes(i[0].slice(i[0].lastIndexOf("[") + 1, -1)) && (a = a.slice(0, i.index) + "[" + "a".repeat(i[0].length - 2) + "]" + a.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex)) } for (; null != (i = this.tokenizer.rules.inline.blockSkip.exec(a));)a = a.slice(0, i.index) + "[" + "a".repeat(i[0].length - 2) + "]" + a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex); for (; null != (i = this.tokenizer.rules.inline.anyPunctuation.exec(a));)a = a.slice(0, i.index) + "++" + a.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex); for (; e;)if (l || (o = ""), l = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((s => !!(n = s.call({ lexer: this }, e, t)) && (e = e.substring(n.raw.length), t.push(n), !0))))) if (n = this.tokenizer.escape(e)) e = e.substring(n.raw.length), t.push(n); else if (n = this.tokenizer.tag(e)) e = e.substring(n.raw.length), s = t[t.length - 1], s && "text" === n.type && "text" === s.type ? (s.raw += n.raw, s.text += n.text) : t.push(n); else if (n = this.tokenizer.link(e)) e = e.substring(n.raw.length), t.push(n); else if (n = this.tokenizer.reflink(e, this.tokens.links)) e = e.substring(n.raw.length), s = t[t.length - 1], s && "text" === n.type && "text" === s.type ? (s.raw += n.raw, s.text += n.text) : t.push(n); else if (n = this.tokenizer.emStrong(e, a, o)) e = e.substring(n.raw.length), t.push(n); else if (n = this.tokenizer.codespan(e)) e = e.substring(n.raw.length), t.push(n); else if (n = this.tokenizer.br(e)) e = e.substring(n.raw.length), t.push(n); else if (n = this.tokenizer.del(e)) e = e.substring(n.raw.length), t.push(n); else if (n = this.tokenizer.autolink(e)) e = e.substring(n.raw.length), t.push(n); else if (this.state.inLink || !(n = this.tokenizer.url(e))) { if (r = e, this.options.extensions && this.options.extensions.startInline) { let t = 1 / 0; const n = e.slice(1); let s; this.options.extensions.startInline.forEach((e => { s = e.call({ lexer: this }, n), "number" == typeof s && s >= 0 && (t = Math.min(t, s)) })), t < 1 / 0 && t >= 0 && (r = e.substring(0, t + 1)) } if (n = this.tokenizer.inlineText(r)) e = e.substring(n.raw.length), "_" !== n.raw.slice(-1) && (o = n.raw.slice(-1)), l = !0, s = t[t.length - 1], s && "text" === s.type ? (s.raw += n.raw, s.text += n.text) : t.push(n); else if (e) { const t = "Infinite loop on byte: " + e.charCodeAt(0); if (this.options.silent) { console.error(t); break } throw new Error(t) } } else e = e.substring(n.raw.length), t.push(n); return t } } class te { options; parser; constructor(t) { this.options = t || e.defaults } space(e) { return "" } code({ text: e, lang: t, escaped: n }) { const s = (t || "").match(/^\S*/)?.[0], r = e.replace(/\n$/, "") + "\n"; return s ? '<pre><code class="language-' + c(s) + '">' + (n ? r : c(r, !0)) + "</code></pre>\n" : "<pre><code>" + (n ? r : c(r, !0)) + "</code></pre>\n" } blockquote({ tokens: e }) { return `<blockquote>\n${this.parser.parse(e)}</blockquote>\n` } html({ text: e }) { return e } heading({ tokens: e, depth: t }) { return `<h${t}>${this.parser.parseInline(e)}</h${t}>\n` } hr(e) { return "<hr>\n" } list(e) { const t = e.ordered, n = e.start; let s = ""; for (let t = 0; t < e.items.length; t++) { const n = e.items[t]; s += this.listitem(n) } const r = t ? "ol" : "ul"; return "<" + r + (t && 1 !== n ? ' start="' + n + '"' : "") + ">\n" + s + "</" + r + ">\n" } listitem(e) { let t = ""; if (e.task) { const n = this.checkbox({ checked: !!e.checked }); e.loose ? e.tokens.length > 0 && "paragraph" === e.tokens[0].type ? (e.tokens[0].text = n + " " + e.tokens[0].text, e.tokens[0].tokens && e.tokens[0].tokens.length > 0 && "text" === e.tokens[0].tokens[0].type && (e.tokens[0].tokens[0].text = n + " " + e.tokens[0].tokens[0].text)) : e.tokens.unshift({ type: "text", raw: n + " ", text: n + " " }) : t += n + " " } return t += this.parser.parse(e.tokens, !!e.loose), `<li>${t}</li>\n` } checkbox({ checked: e }) { return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox">' } paragraph({ tokens: e }) { return `<p>${this.parser.parseInline(e)}</p>\n` } table(e) { let t = "", n = ""; for (let t = 0; t < e.header.length; t++)n += this.tablecell(e.header[t]); t += this.tablerow({ text: n }); let s = ""; for (let t = 0; t < e.rows.length; t++) { const r = e.rows[t]; n = ""; for (let e = 0; e < r.length; e++)n += this.tablecell(r[e]); s += this.tablerow({ text: n }) } return s && (s = `<tbody>${s}</tbody>`), "<table>\n<thead>\n" + t + "</thead>\n" + s + "</table>\n" } tablerow({ text: e }) { return `<tr>\n${e}</tr>\n` } tablecell(e) { const t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td"; return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>\n` } strong({ tokens: e }) { return `<strong>${this.parser.parseInline(e)}</strong>` } em({ tokens: e }) { return `<em>${this.parser.parseInline(e)}</em>` } codespan({ text: e }) { return `<code>${e}</code>` } br(e) { return "<br>" } del({ tokens: e }) { return `<del>${this.parser.parseInline(e)}</del>` } link({ href: e, title: t, tokens: n }) { const s = this.parser.parseInline(n), r = u(e); if (null === r) return s; let i = '<a href="' + (e = r) + '"'; return t && (i += ' title="' + t + '"'), i += ">" + s + "</a>", i } image({ href: e, title: t, text: n }) { const s = u(e); if (null === s) return n; let r = `<img src="${e = s}" alt="${n}"`; return t && (r += ` title="${t}"`), r += ">", r } text(e) { return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : e.text } } class ne { strong({ text: e }) { return e } em({ text: e }) { return e } codespan({ text: e }) { return e } del({ text: e }) { return e } html({ text: e }) { return e } text({ text: e }) { return e } link({ text: e }) { return "" + e } image({ text: e }) { return "" + e } br() { return "" } } class se { options; renderer; textRenderer; constructor(t) { this.options = t || e.defaults, this.options.renderer = this.options.renderer || new te, this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new ne } static parse(e, t) { return new se(t).parse(e) } static parseInline(e, t) { return new se(t).parseInline(e) } parse(e, t = !0) { let n = ""; for (let s = 0; s < e.length; s++) { const r = e[s]; if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[r.type]) { const e = r, t = this.options.extensions.renderers[e.type].call({ parser: this }, e); if (!1 !== t || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(e.type)) { n += t || ""; continue } } const i = r; switch (i.type) { case "space": n += this.renderer.space(i); continue; case "hr": n += this.renderer.hr(i); continue; case "heading": n += this.renderer.heading(i); continue; case "code": n += this.renderer.code(i); continue; case "table": n += this.renderer.table(i); continue; case "blockquote": n += this.renderer.blockquote(i); continue; case "list": n += this.renderer.list(i); continue; case "html": n += this.renderer.html(i); continue; case "paragraph": n += this.renderer.paragraph(i); continue; case "text": { let r = i, l = this.renderer.text(r); for (; s + 1 < e.length && "text" === e[s + 1].type;)r = e[++s], l += "\n" + this.renderer.text(r); n += t ? this.renderer.paragraph({ type: "paragraph", raw: l, text: l, tokens: [{ type: "text", raw: l, text: l }] }) : l; continue } default: { const e = 'Token with "' + i.type + '" type was not found.'; if (this.options.silent) return console.error(e), ""; throw new Error(e) } } } return n } parseInline(e, t) { t = t || this.renderer; let n = ""; for (let s = 0; s < e.length; s++) { const r = e[s]; if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[r.type]) { const e = this.options.extensions.renderers[r.type].call({ parser: this }, r); if (!1 !== e || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(r.type)) { n += e || ""; continue } } const i = r; switch (i.type) { case "escape": case "text": n += t.text(i); break; case "html": n += t.html(i); break; case "link": n += t.link(i); break; case "image": n += t.image(i); break; case "strong": n += t.strong(i); break; case "em": n += t.em(i); break; case "codespan": n += t.codespan(i); break; case "br": n += t.br(i); break; case "del": n += t.del(i); break; default: { const e = 'Token with "' + i.type + '" type was not found.'; if (this.options.silent) return console.error(e), ""; throw new Error(e) } } } return n } } class re { options; block; constructor(t) { this.options = t || e.defaults } static passThroughHooks = new Set(["preprocess", "postprocess", "processAllTokens"]); preprocess(e) { return e } postprocess(e) { return e } processAllTokens(e) { return e } provideLexer() { return this.block ? ee.lex : ee.lexInline } provideParser() { return this.block ? se.parse : se.parseInline } } class ie { defaults = { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null }; options = this.setOptions; parse = this.parseMarkdown(!0); parseInline = this.parseMarkdown(!1); Parser = se; Renderer = te; TextRenderer = ne; Lexer = ee; Tokenizer = x; Hooks = re; constructor(...e) { this.use(...e) } walkTokens(e, t) { let n = []; for (const s of e) switch (n = n.concat(t.call(this, s)), s.type) { case "table": { const e = s; for (const s of e.header) n = n.concat(this.walkTokens(s.tokens, t)); for (const s of e.rows) for (const e of s) n = n.concat(this.walkTokens(e.tokens, t)); break } case "list": { const e = s; n = n.concat(this.walkTokens(e.items, t)); break } default: { const e = s; this.defaults.extensions?.childTokens?.[e.type] ? this.defaults.extensions.childTokens[e.type].forEach((s => { const r = e[s].flat(1 / 0); n = n.concat(this.walkTokens(r, t)) })) : e.tokens && (n = n.concat(this.walkTokens(e.tokens, t))) } }return n } use(...e) { const t = this.defaults.extensions || { renderers: {}, childTokens: {} }; return e.forEach((e => { const n = { ...e }; if (n.async = this.defaults.async || n.async || !1, e.extensions && (e.extensions.forEach((e => { if (!e.name) throw new Error("extension name required"); if ("renderer" in e) { const n = t.renderers[e.name]; t.renderers[e.name] = n ? function (...t) { let s = e.renderer.apply(this, t); return !1 === s && (s = n.apply(this, t)), s } : e.renderer } if ("tokenizer" in e) { if (!e.level || "block" !== e.level && "inline" !== e.level) throw new Error("extension level must be 'block' or 'inline'"); const n = t[e.level]; n ? n.unshift(e.tokenizer) : t[e.level] = [e.tokenizer], e.start && ("block" === e.level ? t.startBlock ? t.startBlock.push(e.start) : t.startBlock = [e.start] : "inline" === e.level && (t.startInline ? t.startInline.push(e.start) : t.startInline = [e.start])) } "childTokens" in e && e.childTokens && (t.childTokens[e.name] = e.childTokens) })), n.extensions = t), e.renderer) { const t = this.defaults.renderer || new te(this.defaults); for (const n in e.renderer) { if (!(n in t)) throw new Error(`renderer '${n}' does not exist`); if (["options", "parser"].includes(n)) continue; const s = n, r = e.renderer[s], i = t[s]; t[s] = (...e) => { let n = r.apply(t, e); return !1 === n && (n = i.apply(t, e)), n || "" } } n.renderer = t } if (e.tokenizer) { const t = this.defaults.tokenizer || new x(this.defaults); for (const n in e.tokenizer) { if (!(n in t)) throw new Error(`tokenizer '${n}' does not exist`); if (["options", "rules", "lexer"].includes(n)) continue; const s = n, r = e.tokenizer[s], i = t[s]; t[s] = (...e) => { let n = r.apply(t, e); return !1 === n && (n = i.apply(t, e)), n } } n.tokenizer = t } if (e.hooks) { const t = this.defaults.hooks || new re; for (const n in e.hooks) { if (!(n in t)) throw new Error(`hook '${n}' does not exist`); if (["options", "block"].includes(n)) continue; const s = n, r = e.hooks[s], i = t[s]; re.passThroughHooks.has(n) ? t[s] = e => { if (this.defaults.async) return Promise.resolve(r.call(t, e)).then((e => i.call(t, e))); const n = r.call(t, e); return i.call(t, n) } : t[s] = (...e) => { let n = r.apply(t, e); return !1 === n && (n = i.apply(t, e)), n } } n.hooks = t } if (e.walkTokens) { const t = this.defaults.walkTokens, s = e.walkTokens; n.walkTokens = function (e) { let n = []; return n.push(s.call(this, e)), t && (n = n.concat(t.call(this, e))), n } } this.defaults = { ...this.defaults, ...n } })), this } setOptions(e) { return this.defaults = { ...this.defaults, ...e }, this } lexer(e, t) { return ee.lex(e, t ?? this.defaults) } parser(e, t) { return se.parse(e, t ?? this.defaults) } parseMarkdown(e) { return (t, n) => { const s = { ...n }, r = { ...this.defaults, ...s }, i = this.onError(!!r.silent, !!r.async); if (!0 === this.defaults.async && !1 === s.async) return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise.")); if (null == t) return i(new Error("marked(): input parameter is undefined or null")); if ("string" != typeof t) return i(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(t) + ", string expected")); r.hooks && (r.hooks.options = r, r.hooks.block = e); const l = r.hooks ? r.hooks.provideLexer() : e ? ee.lex : ee.lexInline, o = r.hooks ? r.hooks.provideParser() : e ? se.parse : se.parseInline; if (r.async) return Promise.resolve(r.hooks ? r.hooks.preprocess(t) : t).then((e => l(e, r))).then((e => r.hooks ? r.hooks.processAllTokens(e) : e)).then((e => r.walkTokens ? Promise.all(this.walkTokens(e, r.walkTokens)).then((() => e)) : e)).then((e => o(e, r))).then((e => r.hooks ? r.hooks.postprocess(e) : e)).catch(i); try { r.hooks && (t = r.hooks.preprocess(t)); let e = l(t, r); r.hooks && (e = r.hooks.processAllTokens(e)), r.walkTokens && this.walkTokens(e, r.walkTokens); let n = o(e, r); return r.hooks && (n = r.hooks.postprocess(n)), n } catch (e) { return i(e) } } } onError(e, t) { return n => { if (n.message += "\nPlease report this to https://github.com/markedjs/marked.", e) { const e = "<p>An error occurred:</p><pre>" + c(n.message + "", !0) + "</pre>"; return t ? Promise.resolve(e) : e } if (t) return Promise.reject(n); throw n } } } const le = new ie; function oe(e, t) { return le.parse(e, t) } oe.options = oe.setOptions = function (e) { return le.setOptions(e), oe.defaults = le.defaults, n(oe.defaults), oe }, oe.getDefaults = t, oe.defaults = e.defaults, oe.use = function (...e) { return le.use(...e), oe.defaults = le.defaults, n(oe.defaults), oe }, oe.walkTokens = function (e, t) { return le.walkTokens(e, t) }, oe.parseInline = le.parseInline, oe.Parser = se, oe.parser = se.parse, oe.Renderer = te, oe.TextRenderer = ne, oe.Lexer = ee, oe.lexer = ee.lex, oe.Tokenizer = x, oe.Hooks = re, oe.parse = oe; const ae = oe.options, ce = oe.setOptions, he = oe.use, pe = oe.walkTokens, ue = oe.parseInline, ke = oe, ge = se.parse, fe = ee.lex; e.Hooks = re, e.Lexer = ee, e.Marked = ie, e.Parser = se, e.Renderer = te, e.TextRenderer = ne, e.Tokenizer = x, e.getDefaults = t, e.lexer = fe, e.marked = oe, e.options = ae, e.parse = ke, e.parseInline = ue, e.parser = ge, e.setOptions = ce, e.use = he, e.walkTokens = pe }));

  var tailwind_v4_1 = {};

  var hasRequiredTailwind_v4_1;

  function requireTailwind_v4_1 () {
  	if (hasRequiredTailwind_v4_1) return tailwind_v4_1;
  	hasRequiredTailwind_v4_1 = 1;
   (() => {
  	  var Yt = "4.1.7"; var Pe = 92, We = 47, qe = 42, Oi = 34, _i = 39, zi = 58, He = 59, ne = 10, Ge = 13, Oe = 32, Ye = 9, Jt = 123, yt = 125, Ct = 40, Qt = 41, Ki = 91, Di = 93, Zt = 45, xt = 64, Ui = 33; function Se(t, r) { let i = r?.from ? { file: r.from, code: t } : null; t[0] === "\uFEFF" && (t = " " + t.slice(1)); let e = [], o = [], s = [], a = null, f = null, u = "", c = "", g = 0, p; for (let m = 0; m < t.length; m++) { let v = t.charCodeAt(m); if (!(v === Ge && (p = t.charCodeAt(m + 1), p === ne))) if (v === Pe) u === "" && (g = m), u += t.slice(m, m + 2), m += 1; else if (v === We && t.charCodeAt(m + 1) === qe) { let k = m; for (let y = m + 2; y < t.length; y++)if (p = t.charCodeAt(y), p === Pe) y += 1; else if (p === qe && t.charCodeAt(y + 1) === We) { m = y + 1; break } let x = t.slice(k, m + 1); if (x.charCodeAt(2) === Ui) { let y = Je(x.slice(2, -2)); o.push(y), i && (y.src = [i, k, m + 1], y.dst = [i, k, m + 1]); } } else if (v === _i || v === Oi) { let k = m; for (let x = m + 1; x < t.length; x++)if (p = t.charCodeAt(x), p === Pe) x += 1; else if (p === v) { m = x; break } else { if (p === He && (t.charCodeAt(x + 1) === ne || t.charCodeAt(x + 1) === Ge && t.charCodeAt(x + 2) === ne)) throw new Error(`Unterminated string: ${t.slice(k, x + 1) + String.fromCharCode(v)}`); if (p === ne || p === Ge && t.charCodeAt(x + 1) === ne) throw new Error(`Unterminated string: ${t.slice(k, x) + String.fromCharCode(v)}`) } u += t.slice(k, m + 1); } else { if ((v === Oe || v === ne || v === Ye) && (p = t.charCodeAt(m + 1)) && (p === Oe || p === ne || p === Ye || p === Ge && (p = t.charCodeAt(m + 2)) && p == ne)) continue; if (v === ne) { if (u.length === 0) continue; p = u.charCodeAt(u.length - 1), p !== Oe && p !== ne && p !== Ye && (u += " "); } else if (v === Zt && t.charCodeAt(m + 1) === Zt && u.length === 0) { let k = "", x = m, y = -1; for (let b = m + 2; b < t.length; b++)if (p = t.charCodeAt(b), p === Pe) b += 1; else if (p === We && t.charCodeAt(b + 1) === qe) { for (let V = b + 2; V < t.length; V++)if (p = t.charCodeAt(V), p === Pe) V += 1; else if (p === qe && t.charCodeAt(V + 1) === We) { b = V + 1; break } } else if (y === -1 && p === zi) y = u.length + b - x; else if (p === He && k.length === 0) { u += t.slice(x, b), m = b; break } else if (p === Ct) k += ")"; else if (p === Ki) k += "]"; else if (p === Jt) k += "}"; else if ((p === yt || t.length - 1 === b) && k.length === 0) { m = b - 1, u += t.slice(x, b); break } else (p === Qt || p === Di || p === yt) && k.length > 0 && t[b] === k[k.length - 1] && (k = k.slice(0, -1)); let N = At(u, y); if (!N) throw new Error("Invalid custom property, expected a value"); i && (N.src = [i, x, m], N.dst = [i, x, m]), a ? a.nodes.push(N) : e.push(N), u = ""; } else if (v === He && u.charCodeAt(0) === xt) f = _e(u), i && (f.src = [i, g, m], f.dst = [i, g, m]), a ? a.nodes.push(f) : e.push(f), u = "", f = null; else if (v === He && c[c.length - 1] !== ")") { let k = At(u); if (!k) throw u.length === 0 ? new Error("Unexpected semicolon") : new Error(`Invalid declaration: \`${u.trim()}\``); i && (k.src = [i, g, m], k.dst = [i, g, m]), a ? a.nodes.push(k) : e.push(k), u = ""; } else if (v === Jt && c[c.length - 1] !== ")") c += "}", f = G(u.trim()), i && (f.src = [i, g, m], f.dst = [i, g, m]), a && a.nodes.push(f), s.push(a), a = f, u = "", f = null; else if (v === yt && c[c.length - 1] !== ")") { if (c === "") throw new Error("Missing opening {"); if (c = c.slice(0, -1), u.length > 0) if (u.charCodeAt(0) === xt) f = _e(u), i && (f.src = [i, g, m], f.dst = [i, g, m]), a ? a.nodes.push(f) : e.push(f), u = "", f = null; else { let x = u.indexOf(":"); if (a) { let y = At(u, x); if (!y) throw new Error(`Invalid declaration: \`${u.trim()}\``); i && (y.src = [i, g, m], y.dst = [i, g, m]), a.nodes.push(y); } } let k = s.pop() ?? null; k === null && a && e.push(a), a = k, u = "", f = null; } else if (v === Ct) c += ")", u += "("; else if (v === Qt) { if (c[c.length - 1] !== ")") throw new Error("Missing opening ("); c = c.slice(0, -1), u += ")"; } else { if (u.length === 0 && (v === Oe || v === ne || v === Ye)) continue; u === "" && (g = m), u += String.fromCharCode(v); } } } if (u.charCodeAt(0) === xt) { let m = _e(u); i && (m.src = [i, g, t.length], m.dst = [i, g, t.length]), e.push(m); } if (c.length > 0 && a) { if (a.kind === "rule") throw new Error(`Missing closing } at ${a.selector}`); if (a.kind === "at-rule") throw new Error(`Missing closing } at ${a.name} ${a.params}`) } return o.length > 0 ? o.concat(e) : e } function _e(t, r = []) { let i = t, e = ""; for (let o = 5; o < t.length; o++) { let s = t.charCodeAt(o); if (s === Oe || s === Ct) { i = t.slice(0, o), e = t.slice(o); break } } return F(i.trim(), e.trim(), r) } function At(t, r = t.indexOf(":")) { if (r === -1) return null; let i = t.indexOf("!important", r + 1); return l(t.slice(0, r).trim(), t.slice(r + 1, i === -1 ? t.length : i).trim(), i !== -1) } function me(t) { if (arguments.length === 0) throw new TypeError("`CSS.escape` requires an argument."); let r = String(t), i = r.length, e = -1, o, s = "", a = r.charCodeAt(0); if (i === 1 && a === 45) return "\\" + r; for (; ++e < i;) { if (o = r.charCodeAt(e), o === 0) { s += "\uFFFD"; continue } if (o >= 1 && o <= 31 || o === 127 || e === 0 && o >= 48 && o <= 57 || e === 1 && o >= 48 && o <= 57 && a === 45) { s += "\\" + o.toString(16) + " "; continue } if (o >= 128 || o === 45 || o === 95 || o >= 48 && o <= 57 || o >= 65 && o <= 90 || o >= 97 && o <= 122) { s += r.charAt(e); continue } s += "\\" + r.charAt(e); } return s } function ve(t) { return t.replace(/\\([\dA-Fa-f]{1,6}[\t\n\f\r ]?|[\S\s])/g, r => r.length > 2 ? String.fromCodePoint(Number.parseInt(r.slice(1).trim(), 16)) : r[1]) } var er = new Map([["--font", ["--font-weight", "--font-size"]], ["--inset", ["--inset-shadow", "--inset-ring"]], ["--text", ["--text-color", "--text-decoration-color", "--text-decoration-thickness", "--text-indent", "--text-shadow", "--text-underline-offset"]]]); function Xt(t, r) { return (er.get(r) ?? []).some(i => t === i || t.startsWith(`${i}-`)) } var Qe = class { constructor(r = new Map, i = new Set([])) { this.values = r; this.keyframes = i; } prefix = null; add(r, i, e = 0, o) { if (r.endsWith("-*")) { if (i !== "initial") throw new Error(`Invalid theme value \`${i}\` for namespace \`${r}\``); r === "--*" ? this.values.clear() : this.clearNamespace(r.slice(0, -2), 0); } if (e & 4) { let s = this.values.get(r); if (s && !(s.options & 4)) return } i === "initial" ? this.values.delete(r) : this.values.set(r, { value: i, options: e, src: o }); } keysInNamespaces(r) { let i = []; for (let e of r) { let o = `${e}-`; for (let s of this.values.keys()) s.startsWith(o) && s.indexOf("--", 2) === -1 && (Xt(s, e) || i.push(s.slice(o.length))); } return i } get(r) { for (let i of r) { let e = this.values.get(i); if (e) return e.value } return null } hasDefault(r) { return (this.getOptions(r) & 4) === 4 } getOptions(r) { return r = ve(this.#r(r)), this.values.get(r)?.options ?? 0 } entries() { return this.prefix ? Array.from(this.values, r => (r[0] = this.prefixKey(r[0]), r)) : this.values.entries() } prefixKey(r) { return this.prefix ? `--${this.prefix}-${r.slice(2)}` : r } #r(r) { return this.prefix ? `--${r.slice(3 + this.prefix.length)}` : r } clearNamespace(r, i) { let e = er.get(r) ?? []; e: for (let o of this.values.keys()) if (o.startsWith(r)) { if (i !== 0 && (this.getOptions(o) & i) !== i) continue; for (let s of e) if (o.startsWith(s)) continue e; this.values.delete(o); } } #e(r, i) { for (let e of i) { let o = r !== null ? `${e}-${r}` : e; if (!this.values.has(o)) if (r !== null && r.includes(".")) { if (o = `${e}-${r.replaceAll(".", "_")}`, !this.values.has(o)) continue } else continue; if (!Xt(o, e)) return o } return null } #t(r) { let i = this.values.get(r); if (!i) return null; let e = null; return i.options & 2 && (e = i.value), `var(${me(this.prefixKey(r))}${e ? `, ${e}` : ""})` } markUsedVariable(r) { let i = ve(this.#r(r)), e = this.values.get(i); if (!e) return !1; let o = e.options & 16; return e.options |= 16, !o } resolve(r, i, e = 0) { let o = this.#e(r, i); if (!o) return null; let s = this.values.get(o); return (e | s.options) & 1 ? s.value : this.#t(o) } resolveValue(r, i) { let e = this.#e(r, i); return e ? this.values.get(e).value : null } resolveWith(r, i, e = []) { let o = this.#e(r, i); if (!o) return null; let s = {}; for (let f of e) { let u = `${o}${f}`, c = this.values.get(u); c && (c.options & 1 ? s[f] = c.value : s[f] = this.#t(u)); } let a = this.values.get(o); return a.options & 1 ? [a.value, s] : [this.#t(o), s] } namespace(r) { let i = new Map, e = `${r}-`; for (let [o, s] of this.values) o === r ? i.set(null, s.value) : o.startsWith(`${e}-`) ? i.set(o.slice(r.length), s.value) : o.startsWith(e) && i.set(o.slice(e.length), s.value); return i } addKeyframes(r) { this.keyframes.add(r); } getKeyframes() { return Array.from(this.keyframes) } }; var B = class extends Map { constructor(i) { super(); this.factory = i; } get(i) { let e = super.get(i); return e === void 0 && (e = this.factory(i, this), this.set(i, e)), e } }; function $t(t) { return { kind: "word", value: t } } function ji(t, r) { return { kind: "function", value: t, nodes: r } } function Li(t) { return { kind: "separator", value: t } } function ee(t, r, i = null) { for (let e = 0; e < t.length; e++) { let o = t[e], s = !1, a = 0, f = r(o, { parent: i, replaceWith(u) { s || (s = !0, Array.isArray(u) ? u.length === 0 ? (t.splice(e, 1), a = 0) : u.length === 1 ? (t[e] = u[0], a = 1) : (t.splice(e, 1, ...u), a = u.length) : t[e] = u); } }) ?? 0; if (s) { f === 0 ? e-- : e += a - 1; continue } if (f === 2) return 2; if (f !== 1 && o.kind === "function" && ee(o.nodes, r, o) === 2) return 2 } } function J(t) { let r = ""; for (let i of t) switch (i.kind) { case "word": case "separator": { r += i.value; break } case "function": r += i.value + "(" + J(i.nodes) + ")"; }return r } var tr = 92, Ii = 41, rr = 58, ir = 44, Fi = 34, or = 61, nr = 62, lr = 60, ar = 10, Mi = 40, Bi = 39, sr = 47, ur = 32, cr = 9; function W(t) {
  	    t = t.replaceAll(`\r
`, `
`); let r = [], i = [], e = null, o = "", s; for (let a = 0; a < t.length; a++) { let f = t.charCodeAt(a); switch (f) { case tr: { o += t[a] + t[a + 1], a++; break } case rr: case ir: case or: case nr: case lr: case ar: case sr: case ur: case cr: { if (o.length > 0) { let p = $t(o); e ? e.nodes.push(p) : r.push(p), o = ""; } let u = a, c = a + 1; for (; c < t.length && (s = t.charCodeAt(c), !(s !== rr && s !== ir && s !== or && s !== nr && s !== lr && s !== ar && s !== sr && s !== ur && s !== cr)); c++); a = c - 1; let g = Li(t.slice(u, c)); e ? e.nodes.push(g) : r.push(g); break } case Bi: case Fi: { let u = a; for (let c = a + 1; c < t.length; c++)if (s = t.charCodeAt(c), s === tr) c += 1; else if (s === f) { a = c; break } o += t.slice(u, a + 1); break } case Mi: { let u = ji(o, []); o = "", e ? e.nodes.push(u) : r.push(u), i.push(u), e = u; break } case Ii: { let u = i.pop(); if (o.length > 0) { let c = $t(o); u.nodes.push(c), o = ""; } i.length > 0 ? e = i[i.length - 1] : e = null; break } default: o += String.fromCharCode(f); } } return o.length > 0 && r.push($t(o)), r
  	  } function Ze(t) { let r = []; return ee(W(t), i => { if (!(i.kind !== "function" || i.value !== "var")) return ee(i.nodes, e => { e.kind !== "word" || e.value[0] !== "-" || e.value[1] !== "-" || r.push(e.value); }), 1 }), r } var qi = 64; function M(t, r = []) { return { kind: "rule", selector: t, nodes: r } } function F(t, r = "", i = []) { return { kind: "at-rule", name: t, params: r, nodes: i } } function G(t, r = []) { return t.charCodeAt(0) === qi ? _e(t, r) : M(t, r) } function l(t, r, i = !1) { return { kind: "declaration", property: t, value: r, important: i } } function Je(t) { return { kind: "comment", value: t } } function ue(t, r) { return { kind: "context", context: t, nodes: r } } function j(t) { return { kind: "at-root", nodes: t } } function U(t, r, i = [], e = {}) { for (let o = 0; o < t.length; o++) { let s = t[o], a = i[i.length - 1] ?? null; if (s.kind === "context") { if (U(s.nodes, r, i, { ...e, ...s.context }) === 2) return 2; continue } i.push(s); let f = !1, u = 0, c = r(s, { parent: a, context: e, path: i, replaceWith(g) { f || (f = !0, Array.isArray(g) ? g.length === 0 ? (t.splice(o, 1), u = 0) : g.length === 1 ? (t[o] = g[0], u = 1) : (t.splice(o, 1, ...g), u = g.length) : (t[o] = g, u = 1)); } }) ?? 0; if (i.pop(), f) { c === 0 ? o-- : o += u - 1; continue } if (c === 2) return 2; if (c !== 1 && "nodes" in s) { i.push(s); let g = U(s.nodes, r, i, e); if (i.pop(), g === 2) return 2 } } } function Xe(t, r, i = [], e = {}) { for (let o = 0; o < t.length; o++) { let s = t[o], a = i[i.length - 1] ?? null; if (s.kind === "rule" || s.kind === "at-rule") i.push(s), Xe(s.nodes, r, i, e), i.pop(); else if (s.kind === "context") { Xe(s.nodes, r, i, { ...e, ...s.context }); continue } i.push(s), r(s, { parent: a, context: e, path: i, replaceWith(f) { Array.isArray(f) ? f.length === 0 ? t.splice(o, 1) : f.length === 1 ? t[o] = f[0] : t.splice(o, 1, ...f) : t[o] = f, o += f.length - 1; } }), i.pop(); } } function be(t, r, i = 3) { let e = [], o = new Set, s = new B(() => new Set), a = new B(() => new Set), f = new Set, u = new Set, c = [], g = [], p = new B(() => new Set); function m(k, x, y = {}, N = 0) { if (k.kind === "declaration") { if (k.property === "--tw-sort" || k.value === void 0 || k.value === null) return; if (y.theme && k.property[0] === "-" && k.property[1] === "-") { if (k.value === "initial") { k.value = void 0; return } y.keyframes || s.get(x).add(k); } if (k.value.includes("var(")) if (y.theme && k.property[0] === "-" && k.property[1] === "-") for (let b of Ze(k.value)) p.get(b).add(k.property); else r.trackUsedVariables(k.value); if (k.property === "animation") for (let b of fr(k.value)) u.add(b); i & 2 && k.value.includes("color-mix(") && a.get(x).add(k), x.push(k); } else if (k.kind === "rule") if (k.selector === "&") for (let b of k.nodes) { let V = []; m(b, V, y, N + 1), V.length > 0 && x.push(...V); } else { let b = { ...k, nodes: [] }; for (let V of k.nodes) m(V, b.nodes, y, N + 1); b.nodes.length > 0 && x.push(b); } else if (k.kind === "at-rule" && k.name === "@property" && N === 0) { if (o.has(k.params)) return; if (i & 1) { let V = k.params, R = null, D = !1; for (let L of k.nodes) L.kind === "declaration" && (L.property === "initial-value" ? R = L.value : L.property === "inherits" && (D = L.value === "true")); let _ = l(V, R ?? "initial"); _.src = k.src, D ? c.push(_) : g.push(_); } o.add(k.params); let b = { ...k, nodes: [] }; for (let V of k.nodes) m(V, b.nodes, y, N + 1); x.push(b); } else if (k.kind === "at-rule") { k.name === "@keyframes" && (y = { ...y, keyframes: !0 }); let b = { ...k, nodes: [] }; for (let V of k.nodes) m(V, b.nodes, y, N + 1); k.name === "@keyframes" && y.theme && f.add(b), (b.nodes.length > 0 || b.name === "@layer" || b.name === "@charset" || b.name === "@custom-media" || b.name === "@namespace" || b.name === "@import") && x.push(b); } else if (k.kind === "at-root") for (let b of k.nodes) { let V = []; m(b, V, y, 0); for (let R of V) e.push(R); } else if (k.kind === "context") { if (k.context.reference) return; for (let b of k.nodes) m(b, x, { ...y, ...k.context }, N); } else k.kind === "comment" && x.push(k); } let v = []; for (let k of t) m(k, v, {}, 0); e: for (let [k, x] of s) for (let y of x) { if (dr(y.property, r.theme, p)) { if (y.property.startsWith(r.theme.prefixKey("--animate-"))) for (let V of fr(y.value)) u.add(V); continue } let b = k.indexOf(y); if (k.splice(b, 1), k.length === 0) { let V = Hi(v, R => R.kind === "rule" && R.nodes === k); if (!V || V.length === 0) continue e; V.unshift({ kind: "at-root", nodes: v }); do { let R = V.pop(); if (!R) break; let D = V[V.length - 1]; if (!D || D.kind !== "at-root" && D.kind !== "at-rule") break; let _ = D.nodes.indexOf(R); if (_ === -1) break; D.nodes.splice(_, 1); } while (!0); continue e } } for (let k of f) if (!u.has(k.params)) { let x = e.indexOf(k); e.splice(x, 1); } if (v = v.concat(e), i & 2) for (let [k, x] of a) for (let y of x) { let N = k.indexOf(y); if (N === -1 || y.value == null) continue; let b = W(y.value), V = !1; if (ee(b, (_, { replaceWith: L }) => { if (_.kind !== "function" || _.value !== "color-mix") return; let O = !1, H = !1; if (ee(_.nodes, (I, { replaceWith: q }) => { if (I.kind == "word" && I.value.toLowerCase() === "currentcolor") { H = !0, V = !0; return } let X = I, oe = null, n = new Set; do { if (X.kind !== "function" || X.value !== "var") return; let d = X.nodes[0]; if (!d || d.kind !== "word") return; let h = d.value; if (n.has(h)) { O = !0; return } if (n.add(h), V = !0, oe = r.theme.resolveValue(null, [d.value]), !oe) { O = !0; return } if (oe.toLowerCase() === "currentcolor") { H = !0; return } oe.startsWith("var(") ? X = W(oe)[0] : X = null; } while (X); q({ kind: "word", value: oe }); }), O || H) { let I = _.nodes.findIndex(X => X.kind === "separator" && X.value.trim().includes(",")); if (I === -1) return; let q = _.nodes.length > I ? _.nodes[I + 1] : null; if (!q) return; L(q); } else if (V) { let I = _.nodes[2]; I.kind === "word" && (I.value === "oklab" || I.value === "oklch" || I.value === "lab" || I.value === "lch") && (I.value = "srgb"); } }), !V) continue; let R = { ...y, value: J(b) }, D = G("@supports (color: color-mix(in lab, red, red))", [y]); D.src = y.src, k.splice(N, 1, R, D); } if (i & 1) { let k = []; if (c.length > 0) { let x = G(":root, :host", c); x.src = c[0].src, k.push(x); } if (g.length > 0) { let x = G("*, ::before, ::after, ::backdrop", g); x.src = g[0].src, k.push(x); } if (k.length > 0) { let x = v.findIndex(b => !(b.kind === "comment" || b.kind === "at-rule" && (b.name === "@charset" || b.name === "@import"))), y = F("@layer", "properties", []); y.src = k[0].src, v.splice(x < 0 ? v.length : x, 0, y); let N = G("@layer properties", [F("@supports", "((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))", k)]); N.src = k[0].src, N.nodes[0].src = k[0].src, v.push(N); } } return v } function le(t, r) {
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
  	  } function Hi(t, r) { let i = []; return U(t, (e, { path: o }) => { if (r(e)) return i = [...o], 2 }), i } function dr(t, r, i, e = new Set) { if (e.has(t) || (e.add(t), r.getOptions(t) & 24)) return !0; { let s = i.get(t) ?? []; for (let a of s) if (dr(a, r, i, e)) return !0 } return !1 } function fr(t) { return t.split(/[\s,]+/) } var Nt = ["calc", "min", "max", "clamp", "mod", "rem", "sin", "cos", "tan", "asin", "acos", "atan", "atan2", "pow", "sqrt", "hypot", "log", "exp", "round"], tt = ["anchor-size"], pr = new RegExp(`(${tt.join("|")})\\(`, "g"); function ze(t) { return t.indexOf("(") !== -1 && Nt.some(r => t.includes(`${r}(`)) } function mr(t) { if (!Nt.some(o => t.includes(o))) return t; let r = !1; tt.some(o => t.includes(o)) && (pr.lastIndex = 0, t = t.replace(pr, (o, s) => (r = !0, `$${tt.indexOf(s)}$(`))); let i = "", e = []; for (let o = 0; o < t.length; o++) { let s = t[o]; if (s === "(") { i += s; let a = o; for (let u = o - 1; u >= 0; u--) { let c = t.charCodeAt(u); if (c >= 48 && c <= 57) a = u; else if (c >= 97 && c <= 122) a = u; else break } let f = t.slice(a, o); if (Nt.includes(f)) { e.unshift(!0); continue } else if (e[0] && f === "") { e.unshift(!0); continue } e.unshift(!1); continue } else if (s === ")") i += s, e.shift(); else if (s === "," && e[0]) { i += ", "; continue } else { if (s === " " && e[0] && i[i.length - 1] === " ") continue; if ((s === "+" || s === "*" || s === "/" || s === "-") && e[0]) { let a = i.trimEnd(), f = a[a.length - 1]; if (f === "+" || f === "*" || f === "/" || f === "-") { i += s; continue } else if (f === "(" || f === ",") { i += s; continue } else t[o - 1] === " " ? i += `${s} ` : i += ` ${s} `; } else if (e[0] && t.startsWith("to-zero", o)) { let a = o; o += 7, i += t.slice(a, o + 1); } else i += s; } } return r ? i.replace(/\$(\d+)\$/g, (o, s) => tt[s] ?? o) : i } function ge(t) { if (t.indexOf("(") === -1) return $e(t); let r = W(t); return Vt(r), t = J(r), t = mr(t), t } function $e(t, r = !1) { let i = ""; for (let e = 0; e < t.length; e++) { let o = t[e]; o === "\\" && t[e + 1] === "_" ? (i += "_", e += 1) : o === "_" && !r ? i += " " : i += o; } return i } function Vt(t) { for (let r of t) switch (r.kind) { case "function": { if (r.value === "url" || r.value.endsWith("_url")) { r.value = $e(r.value); break } if (r.value === "var" || r.value.endsWith("_var") || r.value === "theme" || r.value.endsWith("_theme")) { r.value = $e(r.value); for (let i = 0; i < r.nodes.length; i++) { if (i == 0 && r.nodes[i].kind === "word") { r.nodes[i].value = $e(r.nodes[i].value, !0); continue } Vt([r.nodes[i]]); } break } r.value = $e(r.value), Vt(r.nodes); break } case "separator": case "word": { r.value = $e(r.value); break } default: Yi(r); } } function Yi(t) { throw new Error(`Unexpected value: ${t}`) } var Tt = new Uint8Array(256); function fe(t) { let r = 0, i = t.length; for (let e = 0; e < i; e++) { let o = t.charCodeAt(e); switch (o) { case 92: e += 1; break; case 39: case 34: for (; ++e < i;) { let s = t.charCodeAt(e); if (s === 92) { e += 1; continue } if (s === o) break } break; case 40: Tt[r] = 41, r++; break; case 91: Tt[r] = 93, r++; break; case 123: break; case 93: case 125: case 41: if (r === 0) return !1; r > 0 && o === Tt[r - 1] && r--; break; case 59: if (r === 0) return !1; break } } return !0 } var rt = new Uint8Array(256); function z(t, r) { let i = 0, e = [], o = 0, s = t.length, a = r.charCodeAt(0); for (let f = 0; f < s; f++) { let u = t.charCodeAt(f); if (i === 0 && u === a) { e.push(t.slice(o, f)), o = f + 1; continue } switch (u) { case 92: f += 1; break; case 39: case 34: for (; ++f < s;) { let c = t.charCodeAt(f); if (c === 92) { f += 1; continue } if (c === u) break } break; case 40: rt[i] = 41, i++; break; case 91: rt[i] = 93, i++; break; case 123: rt[i] = 125, i++; break; case 93: case 125: case 41: i > 0 && u === rt[i - 1] && i--; break } } return e.push(t.slice(o)), e } var Ji = 58, gr = 45, hr = 97, kr = 122; function* vr(t, r) { let i = z(t, ":"); if (r.theme.prefix) { if (i.length === 1 || i[0] !== r.theme.prefix) return null; i.shift(); } let e = i.pop(), o = []; for (let p = i.length - 1; p >= 0; --p) { let m = r.parseVariant(i[p]); if (m === null) return; o.push(m); } let s = !1; e[e.length - 1] === "!" ? (s = !0, e = e.slice(0, -1)) : e[0] === "!" && (s = !0, e = e.slice(1)), r.utilities.has(e, "static") && !e.includes("[") && (yield { kind: "static", root: e, variants: o, important: s, raw: t }); let [a, f = null, u] = z(e, "/"); if (u) return; let c = f === null ? null : Et(f); if (f !== null && c === null) return; if (a[0] === "[") { if (a[a.length - 1] !== "]") return; let p = a.charCodeAt(1); if (p !== gr && !(p >= hr && p <= kr)) return; a = a.slice(1, -1); let m = a.indexOf(":"); if (m === -1 || m === 0 || m === a.length - 1) return; let v = a.slice(0, m), k = ge(a.slice(m + 1)); if (!fe(k)) return; yield { kind: "arbitrary", property: v, value: k, modifier: c, variants: o, important: s, raw: t }; return } let g; if (a[a.length - 1] === "]") { let p = a.indexOf("-["); if (p === -1) return; let m = a.slice(0, p); if (!r.utilities.has(m, "functional")) return; let v = a.slice(p + 1); g = [[m, v]]; } else if (a[a.length - 1] === ")") { let p = a.indexOf("-("); if (p === -1) return; let m = a.slice(0, p); if (!r.utilities.has(m, "functional")) return; let v = a.slice(p + 2, -1), k = z(v, ":"), x = null; if (k.length === 2 && (x = k[0], v = k[1]), v[0] !== "-" || v[1] !== "-" || !fe(v)) return; g = [[m, x === null ? `[var(${v})]` : `[${x}:var(${v})]`]]; } else g = br(a, p => r.utilities.has(p, "functional")); for (let [p, m] of g) { let v = { kind: "functional", root: p, modifier: c, value: null, variants: o, important: s, raw: t }; if (m === null) { yield v; continue } { let k = m.indexOf("["); if (k !== -1) { if (m[m.length - 1] !== "]") return; let y = ge(m.slice(k + 1, -1)); if (!fe(y)) continue; let N = ""; for (let b = 0; b < y.length; b++) { let V = y.charCodeAt(b); if (V === Ji) { N = y.slice(0, b), y = y.slice(b + 1); break } if (!(V === gr || V >= hr && V <= kr)) break } if (y.length === 0 || y.trim().length === 0) continue; v.value = { kind: "arbitrary", dataType: N || null, value: y }; } else { let y = f === null || v.modifier?.kind === "arbitrary" ? null : `${m}/${f}`; v.value = { kind: "named", value: m, fraction: y }; } } yield v; } } function Et(t) { if (t[0] === "[" && t[t.length - 1] === "]") { let r = ge(t.slice(1, -1)); return !fe(r) || r.length === 0 || r.trim().length === 0 ? null : { kind: "arbitrary", value: r } } return t[0] === "(" && t[t.length - 1] === ")" ? (t = t.slice(1, -1), t[0] !== "-" || t[1] !== "-" || !fe(t) ? null : (t = `var(${t})`, { kind: "arbitrary", value: ge(t) })) : { kind: "named", value: t } } function wr(t, r) { if (t[0] === "[" && t[t.length - 1] === "]") { if (t[1] === "@" && t.includes("&")) return null; let i = ge(t.slice(1, -1)); if (!fe(i) || i.length === 0 || i.trim().length === 0) return null; let e = i[0] === ">" || i[0] === "+" || i[0] === "~"; return !e && i[0] !== "@" && !i.includes("&") && (i = `&:is(${i})`), { kind: "arbitrary", selector: i, relative: e } } { let [i, e = null, o] = z(t, "/"); if (o) return null; let s = br(i, a => r.variants.has(a)); for (let [a, f] of s) switch (r.variants.kind(a)) { case "static": return f !== null || e !== null ? null : { kind: "static", root: a }; case "functional": { let u = e === null ? null : Et(e); if (e !== null && u === null) return null; if (f === null) return { kind: "functional", root: a, modifier: u, value: null }; if (f[f.length - 1] === "]") { if (f[0] !== "[") continue; let c = ge(f.slice(1, -1)); return !fe(c) || c.length === 0 || c.trim().length === 0 ? null : { kind: "functional", root: a, modifier: u, value: { kind: "arbitrary", value: c } } } if (f[f.length - 1] === ")") { if (f[0] !== "(") continue; let c = ge(f.slice(1, -1)); return !fe(c) || c.length === 0 || c.trim().length === 0 || c[0] !== "-" || c[1] !== "-" ? null : { kind: "functional", root: a, modifier: u, value: { kind: "arbitrary", value: `var(${c})` } } } return { kind: "functional", root: a, modifier: u, value: { kind: "named", value: f } } } case "compound": { if (f === null) return null; let u = r.parseVariant(f); if (u === null || !r.variants.compoundsWith(a, u)) return null; let c = e === null ? null : Et(e); return e !== null && c === null ? null : { kind: "compound", root: a, modifier: c, variant: u } } } } return null } function* br(t, r) { r(t) && (yield [t, null]); let i = t.lastIndexOf("-"); for (; i > 0;) { let e = t.slice(0, i); if (r(e)) { let o = [e, t.slice(i + 1)]; if (o[1] === "") break; yield o; } i = t.lastIndexOf("-", i - 1); } t[0] === "@" && r("@") && (yield ["@", t.slice(1)]); } function yr(t, r) { let i = []; for (let o of r.variants) i.unshift(it(o)); t.theme.prefix && i.unshift(t.theme.prefix); let e = ""; if (r.kind === "static" && (e += r.root), r.kind === "functional" && (e += r.root, r.value)) if (r.value.kind === "arbitrary") { if (r.value !== null) { let o = Pt(r.value.value), s = o ? r.value.value.slice(4, -1) : r.value.value, [a, f] = o ? ["(", ")"] : ["[", "]"]; r.value.dataType ? e += `-${a}${r.value.dataType}:${Ne(s)}${f}` : e += `-${a}${Ne(s)}${f}`; } } else r.value.kind === "named" && (e += `-${r.value.value}`); return r.kind === "arbitrary" && (e += `[${r.property}:${Ne(r.value)}]`), (r.kind === "arbitrary" || r.kind === "functional") && (e += xr(r.modifier)), r.important && (e += "!"), i.push(e), i.join(":") } function xr(t) { if (t === null) return ""; let r = Pt(t.value), i = r ? t.value.slice(4, -1) : t.value, [e, o] = r ? ["(", ")"] : ["[", "]"]; return t.kind === "arbitrary" ? `/${e}${Ne(i)}${o}` : t.kind === "named" ? `/${t.value}` : "" } function it(t) { if (t.kind === "static") return t.root; if (t.kind === "arbitrary") return `[${Ne(Xi(t.selector))}]`; let r = ""; if (t.kind === "functional") { r += t.root; let i = t.root !== "@"; if (t.value) if (t.value.kind === "arbitrary") { let e = Pt(t.value.value), o = e ? t.value.value.slice(4, -1) : t.value.value, [s, a] = e ? ["(", ")"] : ["[", "]"]; r += `${i ? "-" : ""}${s}${Ne(o)}${a}`; } else t.value.kind === "named" && (r += `${i ? "-" : ""}${t.value.value}`); } return t.kind === "compound" && (r += t.root, r += "-", r += it(t.variant)), (t.kind === "functional" || t.kind === "compound") && (r += xr(t.modifier)), r } var Qi = new B(t => { let r = W(t), i = new Set; return ee(r, (e, { parent: o }) => { let s = o === null ? r : o.nodes ?? []; if (e.kind === "word" && (e.value === "+" || e.value === "-" || e.value === "*" || e.value === "/")) { let a = s.indexOf(e) ?? -1; if (a === -1) return; let f = s[a - 1]; if (f?.kind !== "separator" || f.value !== " ") return; let u = s[a + 1]; if (u?.kind !== "separator" || u.value !== " ") return; i.add(f), i.add(u); } else e.kind === "separator" && e.value.trim() === "/" ? e.value = "/" : e.kind === "separator" && e.value.length > 0 && e.value.trim() === "" ? (s[0] === e || s[s.length - 1] === e) && i.add(e) : e.kind === "separator" && e.value.trim() === "," && (e.value = ","); }), i.size > 0 && ee(r, (e, { replaceWith: o }) => { i.has(e) && (i.delete(e), o([])); }), Rt(r), J(r) }); function Ne(t) { return Qi.get(t) } var Zi = new B(t => { let r = W(t); return r.length === 3 && r[0].kind === "word" && r[0].value === "&" && r[1].kind === "separator" && r[1].value === ":" && r[2].kind === "function" && r[2].value === "is" ? J(r[2].nodes) : t }); function Xi(t) { return Zi.get(t) } function Rt(t) { for (let r of t) switch (r.kind) { case "function": { if (r.value === "url" || r.value.endsWith("_url")) { r.value = Ke(r.value); break } if (r.value === "var" || r.value.endsWith("_var") || r.value === "theme" || r.value.endsWith("_theme")) { r.value = Ke(r.value); for (let i = 0; i < r.nodes.length; i++)Rt([r.nodes[i]]); break } r.value = Ke(r.value), Rt(r.nodes); break } case "separator": r.value = Ke(r.value); break; case "word": { (r.value[0] !== "-" || r.value[1] !== "-") && (r.value = Ke(r.value)); break } default: to(r); } } var eo = new B(t => { let r = W(t); return r.length === 1 && r[0].kind === "function" && r[0].value === "var" }); function Pt(t) { return eo.get(t) } function to(t) { throw new Error(`Unexpected value: ${t}`) } function Ke(t) { return t.replaceAll("_", String.raw`\_`).replaceAll(" ", "_") } function ye(t, r, i) { if (t === r) return 0; let e = t.indexOf("("), o = r.indexOf("("), s = e === -1 ? t.replace(/[\d.]+/g, "") : t.slice(0, e), a = o === -1 ? r.replace(/[\d.]+/g, "") : r.slice(0, o), f = (s === a ? 0 : s < a ? -1 : 1) || (i === "asc" ? parseInt(t) - parseInt(r) : parseInt(r) - parseInt(t)); return Number.isNaN(f) ? t < r ? -1 : 1 : f } var ro = new Set(["black", "silver", "gray", "white", "maroon", "red", "purple", "fuchsia", "green", "lime", "olive", "yellow", "navy", "blue", "teal", "aqua", "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkgrey", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "grey", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightgrey", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen", "transparent", "currentcolor", "canvas", "canvastext", "linktext", "visitedtext", "activetext", "buttonface", "buttontext", "buttonborder", "field", "fieldtext", "highlight", "highlighttext", "selecteditem", "selecteditemtext", "mark", "marktext", "graytext", "accentcolor", "accentcolortext"]), io = /^(rgba?|hsla?|hwb|color|(ok)?(lab|lch)|light-dark|color-mix)\(/i; function Ar(t) { return t.charCodeAt(0) === 35 || io.test(t) || ro.has(t.toLowerCase()) } var oo = { color: Ar, length: ot, percentage: Ot, ratio: vo, number: Sr, integer: E, url: Cr, position: yo, "bg-size": xo, "line-width": lo, image: uo, "family-name": fo, "generic-name": co, "absolute-size": po, "relative-size": mo, angle: So, vector: No }; function Y(t, r) { if (t.startsWith("var(")) return null; for (let i of r) if (oo[i]?.(t)) return i; return null } var no = /^url\(.*\)$/; function Cr(t) { return no.test(t) } function lo(t) { return z(t, " ").every(r => ot(r) || Sr(r) || r === "thin" || r === "medium" || r === "thick") } var ao = /^(?:element|image|cross-fade|image-set)\(/, so = /^(repeating-)?(conic|linear|radial)-gradient\(/; function uo(t) { let r = 0; for (let i of z(t, ",")) if (!i.startsWith("var(")) { if (Cr(i)) { r += 1; continue } if (so.test(i)) { r += 1; continue } if (ao.test(i)) { r += 1; continue } return !1 } return r > 0 } function co(t) { return t === "serif" || t === "sans-serif" || t === "monospace" || t === "cursive" || t === "fantasy" || t === "system-ui" || t === "ui-serif" || t === "ui-sans-serif" || t === "ui-monospace" || t === "ui-rounded" || t === "math" || t === "emoji" || t === "fangsong" } function fo(t) { let r = 0; for (let i of z(t, ",")) { let e = i.charCodeAt(0); if (e >= 48 && e <= 57) return !1; i.startsWith("var(") || (r += 1); } return r > 0 } function po(t) { return t === "xx-small" || t === "x-small" || t === "small" || t === "medium" || t === "large" || t === "x-large" || t === "xx-large" || t === "xxx-large" } function mo(t) { return t === "larger" || t === "smaller" } var de = /[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?/, go = new RegExp(`^${de.source}$`); function Sr(t) { return go.test(t) || ze(t) } var ho = new RegExp(`^${de.source}%$`); function Ot(t) { return ho.test(t) || ze(t) } var ko = new RegExp(`^${de.source}s*/s*${de.source}$`); function vo(t) { return ko.test(t) || ze(t) } var wo = ["cm", "mm", "Q", "in", "pc", "pt", "px", "em", "ex", "ch", "rem", "lh", "rlh", "vw", "vh", "vmin", "vmax", "vb", "vi", "svw", "svh", "lvw", "lvh", "dvw", "dvh", "cqw", "cqh", "cqi", "cqb", "cqmin", "cqmax"], bo = new RegExp(`^${de.source}(${wo.join("|")})$`); function ot(t) { return bo.test(t) || ze(t) } function yo(t) { let r = 0; for (let i of z(t, " ")) { if (i === "center" || i === "top" || i === "right" || i === "bottom" || i === "left") { r += 1; continue } if (!i.startsWith("var(")) { if (ot(i) || Ot(i)) { r += 1; continue } return !1 } } return r > 0 } function xo(t) { let r = 0; for (let i of z(t, ",")) { if (i === "cover" || i === "contain") { r += 1; continue } let e = z(i, " "); if (e.length !== 1 && e.length !== 2) return !1; if (e.every(o => o === "auto" || ot(o) || Ot(o))) { r += 1; continue } } return r > 0 } var Ao = ["deg", "rad", "grad", "turn"], Co = new RegExp(`^${de.source}(${Ao.join("|")})$`); function So(t) { return Co.test(t) } var $o = new RegExp(`^${de.source} +${de.source} +${de.source}$`); function No(t) { return $o.test(t) } function E(t) { let r = Number(t); return Number.isInteger(r) && r >= 0 && String(r) === String(t) } function _t(t) { let r = Number(t); return Number.isInteger(r) && r > 0 && String(r) === String(t) } function xe(t) { return $r(t, .25) } function nt(t) { return $r(t, .25) } function $r(t, r) { let i = Number(t); return i >= 0 && i % r === 0 && String(i) === String(t) } var Vo = new Set(["inset", "inherit", "initial", "revert", "unset"]), Nr = /^-?(\d+|\.\d+)(.*?)$/g; function De(t, r) { return z(t, ",").map(e => { e = e.trim(); let o = z(e, " ").filter(c => c.trim() !== ""), s = null, a = null, f = null; for (let c of o) Vo.has(c) || (Nr.test(c) ? (a === null ? a = c : f === null && (f = c), Nr.lastIndex = 0) : s === null && (s = c)); if (a === null || f === null) return e; let u = r(s ?? "currentcolor"); return s !== null ? e.replace(s, u) : `${e} ${u}` }).join(", ") } var To = /^-?[a-z][a-zA-Z0-9/%._-]*$/, Eo = /^-?[a-z][a-zA-Z0-9/%._-]*-\*$/, at = ["0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "5", "6", "7", "8", "9", "10", "11", "12", "14", "16", "20", "24", "28", "32", "36", "40", "44", "48", "52", "56", "60", "64", "72", "80", "96"], zt = class { utilities = new B(() => []); completions = new Map; static(r, i) { this.utilities.get(r).push({ kind: "static", compileFn: i }); } functional(r, i, e) { this.utilities.get(r).push({ kind: "functional", compileFn: i, options: e }); } has(r, i) { return this.utilities.has(r) && this.utilities.get(r).some(e => e.kind === i) } get(r) { return this.utilities.has(r) ? this.utilities.get(r) : [] } getCompletions(r) { return this.completions.get(r)?.() ?? [] } suggest(r, i) { this.completions.set(r, i); } keys(r) { let i = []; for (let [e, o] of this.utilities.entries()) for (let s of o) if (s.kind === r) { i.push(e); break } return i } }; function S(t, r, i) { return F("@property", t, [l("syntax", i ? `"${i}"` : '"*"'), l("inherits", "false"), ...r ? [l("initial-value", r)] : []]) } function Q(t, r) { if (r === null) return t; let i = Number(r); return Number.isNaN(i) || (r = `${i * 100}%`), r === "100%" ? t : `color-mix(in oklab, ${t} ${r}, transparent)` } function Tr(t, r) { let i = Number(r); return Number.isNaN(i) || (r = `${i * 100}%`), `oklab(from ${t} l a b / ${r})` } function Z(t, r, i) { if (!r) return t; if (r.kind === "arbitrary") return Q(t, r.value); let e = i.resolve(r.value, ["--opacity"]); return e ? Q(t, e) : nt(r.value) ? Q(t, `${r.value}%`) : null } function te(t, r, i) { let e = null; switch (t.value.value) { case "inherit": { e = "inherit"; break } case "transparent": { e = "transparent"; break } case "current": { e = "currentcolor"; break } default: { e = r.resolve(t.value.value, i); break } }return e ? Z(e, t.modifier, r) : null } var Er = /(\d+)_(\d+)/g; function Rr(t) { let r = new zt; function i(n, d) { function* h(w) { for (let C of t.keysInNamespaces(w)) yield C.replace(Er, (P, $, T) => `${$}.${T}`); } let A = ["1/2", "1/3", "2/3", "1/4", "2/4", "3/4", "1/5", "2/5", "3/5", "4/5", "1/6", "2/6", "3/6", "4/6", "5/6", "1/12", "2/12", "3/12", "4/12", "5/12", "6/12", "7/12", "8/12", "9/12", "10/12", "11/12"]; r.suggest(n, () => { let w = []; for (let C of d()) { if (typeof C == "string") { w.push({ values: [C], modifiers: [] }); continue } let P = [...C.values ?? [], ...h(C.valueThemeKeys ?? [])], $ = [...C.modifiers ?? [], ...h(C.modifierThemeKeys ?? [])]; C.supportsFractions && P.push(...A), C.hasDefaultValue && P.unshift(null), w.push({ supportsNegative: C.supportsNegative, values: P, modifiers: $ }); } return w }); } function e(n, d) { r.static(n, () => d.map(h => typeof h == "function" ? h() : l(h[0], h[1]))); } function o(n, d) { function h({ negative: A }) { return w => { let C = null, P = null; if (w.value) if (w.value.kind === "arbitrary") { if (w.modifier) return; C = w.value.value, P = w.value.dataType; } else { if (C = t.resolve(w.value.fraction ?? w.value.value, d.themeKeys ?? []), C === null && d.supportsFractions && w.value.fraction) { let [$, T] = z(w.value.fraction, "/"); if (!E($) || !E(T)) return; C = `calc(${w.value.fraction} * 100%)`; } if (C === null && A && d.handleNegativeBareValue) { if (C = d.handleNegativeBareValue(w.value), !C?.includes("/") && w.modifier) return; if (C !== null) return d.handle(C, null) } if (C === null && d.handleBareValue && (C = d.handleBareValue(w.value), !C?.includes("/") && w.modifier)) return } else { if (w.modifier) return; C = d.defaultValue !== void 0 ? d.defaultValue : t.resolve(null, d.themeKeys ?? []); } if (C !== null) return d.handle(A ? `calc(${C} * -1)` : C, P) } } d.supportsNegative && r.functional(`-${n}`, h({ negative: !0 })), r.functional(n, h({ negative: !1 })), i(n, () => [{ supportsNegative: d.supportsNegative, valueThemeKeys: d.themeKeys ?? [], hasDefaultValue: d.defaultValue !== void 0 && d.defaultValue !== null, supportsFractions: d.supportsFractions }]); } function s(n, d) { r.functional(n, h => { if (!h.value) return; let A = null; if (h.value.kind === "arbitrary" ? (A = h.value.value, A = Z(A, h.modifier, t)) : A = te(h, t, d.themeKeys), A !== null) return d.handle(A) }), i(n, () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: d.themeKeys, modifiers: Array.from({ length: 21 }, (h, A) => `${A * 5}`) }]); } function a(n, d, h, { supportsNegative: A = !1, supportsFractions: w = !1 } = {}) { A && r.static(`-${n}-px`, () => h("-1px")), r.static(`${n}-px`, () => h("1px")), o(n, { themeKeys: d, supportsFractions: w, supportsNegative: A, defaultValue: null, handleBareValue: ({ value: C }) => { let P = t.resolve(null, ["--spacing"]); return !P || !xe(C) ? null : `calc(${P} * ${C})` }, handleNegativeBareValue: ({ value: C }) => { let P = t.resolve(null, ["--spacing"]); return !P || !xe(C) ? null : `calc(${P} * -${C})` }, handle: h }), i(n, () => [{ values: t.get(["--spacing"]) ? at : [], supportsNegative: A, supportsFractions: w, valueThemeKeys: d }]); } e("sr-only", [["position", "absolute"], ["width", "1px"], ["height", "1px"], ["padding", "0"], ["margin", "-1px"], ["overflow", "hidden"], ["clip", "rect(0, 0, 0, 0)"], ["white-space", "nowrap"], ["border-width", "0"]]), e("not-sr-only", [["position", "static"], ["width", "auto"], ["height", "auto"], ["padding", "0"], ["margin", "0"], ["overflow", "visible"], ["clip", "auto"], ["white-space", "normal"]]), e("pointer-events-none", [["pointer-events", "none"]]), e("pointer-events-auto", [["pointer-events", "auto"]]), e("visible", [["visibility", "visible"]]), e("invisible", [["visibility", "hidden"]]), e("collapse", [["visibility", "collapse"]]), e("static", [["position", "static"]]), e("fixed", [["position", "fixed"]]), e("absolute", [["position", "absolute"]]), e("relative", [["position", "relative"]]), e("sticky", [["position", "sticky"]]); for (let [n, d] of [["inset", "inset"], ["inset-x", "inset-inline"], ["inset-y", "inset-block"], ["start", "inset-inline-start"], ["end", "inset-inline-end"], ["top", "top"], ["right", "right"], ["bottom", "bottom"], ["left", "left"]]) e(`${n}-auto`, [[d, "auto"]]), e(`${n}-full`, [[d, "100%"]]), e(`-${n}-full`, [[d, "-100%"]]), a(n, ["--inset", "--spacing"], h => [l(d, h)], { supportsNegative: !0, supportsFractions: !0 }); e("isolate", [["isolation", "isolate"]]), e("isolation-auto", [["isolation", "auto"]]), e("z-auto", [["z-index", "auto"]]), o("z", { supportsNegative: !0, handleBareValue: ({ value: n }) => E(n) ? n : null, themeKeys: ["--z-index"], handle: n => [l("z-index", n)] }), i("z", () => [{ supportsNegative: !0, values: ["0", "10", "20", "30", "40", "50"], valueThemeKeys: ["--z-index"] }]), e("order-first", [["order", "-9999"]]), e("order-last", [["order", "9999"]]), e("order-none", [["order", "0"]]), o("order", { supportsNegative: !0, handleBareValue: ({ value: n }) => E(n) ? n : null, themeKeys: ["--order"], handle: n => [l("order", n)] }), i("order", () => [{ supportsNegative: !0, values: Array.from({ length: 12 }, (n, d) => `${d + 1}`), valueThemeKeys: ["--order"] }]), e("col-auto", [["grid-column", "auto"]]), o("col", { supportsNegative: !0, handleBareValue: ({ value: n }) => E(n) ? n : null, themeKeys: ["--grid-column"], handle: n => [l("grid-column", n)] }), e("col-span-full", [["grid-column", "1 / -1"]]), o("col-span", { handleBareValue: ({ value: n }) => E(n) ? n : null, handle: n => [l("grid-column", `span ${n} / span ${n}`)] }), e("col-start-auto", [["grid-column-start", "auto"]]), o("col-start", { supportsNegative: !0, handleBareValue: ({ value: n }) => E(n) ? n : null, themeKeys: ["--grid-column-start"], handle: n => [l("grid-column-start", n)] }), e("col-end-auto", [["grid-column-end", "auto"]]), o("col-end", { supportsNegative: !0, handleBareValue: ({ value: n }) => E(n) ? n : null, themeKeys: ["--grid-column-end"], handle: n => [l("grid-column-end", n)] }), i("col-span", () => [{ values: Array.from({ length: 12 }, (n, d) => `${d + 1}`), valueThemeKeys: [] }]), i("col-start", () => [{ supportsNegative: !0, values: Array.from({ length: 13 }, (n, d) => `${d + 1}`), valueThemeKeys: ["--grid-column-start"] }]), i("col-end", () => [{ supportsNegative: !0, values: Array.from({ length: 13 }, (n, d) => `${d + 1}`), valueThemeKeys: ["--grid-column-end"] }]), e("row-auto", [["grid-row", "auto"]]), o("row", { supportsNegative: !0, handleBareValue: ({ value: n }) => E(n) ? n : null, themeKeys: ["--grid-row"], handle: n => [l("grid-row", n)] }), e("row-span-full", [["grid-row", "1 / -1"]]), o("row-span", { themeKeys: [], handleBareValue: ({ value: n }) => E(n) ? n : null, handle: n => [l("grid-row", `span ${n} / span ${n}`)] }), e("row-start-auto", [["grid-row-start", "auto"]]), o("row-start", { supportsNegative: !0, handleBareValue: ({ value: n }) => E(n) ? n : null, themeKeys: ["--grid-row-start"], handle: n => [l("grid-row-start", n)] }), e("row-end-auto", [["grid-row-end", "auto"]]), o("row-end", { supportsNegative: !0, handleBareValue: ({ value: n }) => E(n) ? n : null, themeKeys: ["--grid-row-end"], handle: n => [l("grid-row-end", n)] }), i("row-span", () => [{ values: Array.from({ length: 12 }, (n, d) => `${d + 1}`), valueThemeKeys: [] }]), i("row-start", () => [{ supportsNegative: !0, values: Array.from({ length: 13 }, (n, d) => `${d + 1}`), valueThemeKeys: ["--grid-row-start"] }]), i("row-end", () => [{ supportsNegative: !0, values: Array.from({ length: 13 }, (n, d) => `${d + 1}`), valueThemeKeys: ["--grid-row-end"] }]), e("float-start", [["float", "inline-start"]]), e("float-end", [["float", "inline-end"]]), e("float-right", [["float", "right"]]), e("float-left", [["float", "left"]]), e("float-none", [["float", "none"]]), e("clear-start", [["clear", "inline-start"]]), e("clear-end", [["clear", "inline-end"]]), e("clear-right", [["clear", "right"]]), e("clear-left", [["clear", "left"]]), e("clear-both", [["clear", "both"]]), e("clear-none", [["clear", "none"]]); for (let [n, d] of [["m", "margin"], ["mx", "margin-inline"], ["my", "margin-block"], ["ms", "margin-inline-start"], ["me", "margin-inline-end"], ["mt", "margin-top"], ["mr", "margin-right"], ["mb", "margin-bottom"], ["ml", "margin-left"]]) e(`${n}-auto`, [[d, "auto"]]), a(n, ["--margin", "--spacing"], h => [l(d, h)], { supportsNegative: !0 }); e("box-border", [["box-sizing", "border-box"]]), e("box-content", [["box-sizing", "content-box"]]), e("line-clamp-none", [["overflow", "visible"], ["display", "block"], ["-webkit-box-orient", "horizontal"], ["-webkit-line-clamp", "unset"]]), o("line-clamp", { themeKeys: ["--line-clamp"], handleBareValue: ({ value: n }) => E(n) ? n : null, handle: n => [l("overflow", "hidden"), l("display", "-webkit-box"), l("-webkit-box-orient", "vertical"), l("-webkit-line-clamp", n)] }), i("line-clamp", () => [{ values: ["1", "2", "3", "4", "5", "6"], valueThemeKeys: ["--line-clamp"] }]), e("block", [["display", "block"]]), e("inline-block", [["display", "inline-block"]]), e("inline", [["display", "inline"]]), e("hidden", [["display", "none"]]), e("inline-flex", [["display", "inline-flex"]]), e("table", [["display", "table"]]), e("inline-table", [["display", "inline-table"]]), e("table-caption", [["display", "table-caption"]]), e("table-cell", [["display", "table-cell"]]), e("table-column", [["display", "table-column"]]), e("table-column-group", [["display", "table-column-group"]]), e("table-footer-group", [["display", "table-footer-group"]]), e("table-header-group", [["display", "table-header-group"]]), e("table-row-group", [["display", "table-row-group"]]), e("table-row", [["display", "table-row"]]), e("flow-root", [["display", "flow-root"]]), e("flex", [["display", "flex"]]), e("grid", [["display", "grid"]]), e("inline-grid", [["display", "inline-grid"]]), e("contents", [["display", "contents"]]), e("list-item", [["display", "list-item"]]), e("field-sizing-content", [["field-sizing", "content"]]), e("field-sizing-fixed", [["field-sizing", "fixed"]]), e("aspect-auto", [["aspect-ratio", "auto"]]), e("aspect-square", [["aspect-ratio", "1 / 1"]]), o("aspect", { themeKeys: ["--aspect"], handleBareValue: ({ fraction: n }) => { if (n === null) return null; let [d, h] = z(n, "/"); return !E(d) || !E(h) ? null : n }, handle: n => [l("aspect-ratio", n)] }); for (let [n, d] of [["full", "100%"], ["svw", "100svw"], ["lvw", "100lvw"], ["dvw", "100dvw"], ["svh", "100svh"], ["lvh", "100lvh"], ["dvh", "100dvh"], ["min", "min-content"], ["max", "max-content"], ["fit", "fit-content"]]) e(`size-${n}`, [["--tw-sort", "size"], ["width", d], ["height", d]]), e(`w-${n}`, [["width", d]]), e(`h-${n}`, [["height", d]]), e(`min-w-${n}`, [["min-width", d]]), e(`min-h-${n}`, [["min-height", d]]), e(`max-w-${n}`, [["max-width", d]]), e(`max-h-${n}`, [["max-height", d]]); e("size-auto", [["--tw-sort", "size"], ["width", "auto"], ["height", "auto"]]), e("w-auto", [["width", "auto"]]), e("h-auto", [["height", "auto"]]), e("min-w-auto", [["min-width", "auto"]]), e("min-h-auto", [["min-height", "auto"]]), e("h-lh", [["height", "1lh"]]), e("min-h-lh", [["min-height", "1lh"]]), e("max-h-lh", [["max-height", "1lh"]]), e("w-screen", [["width", "100vw"]]), e("min-w-screen", [["min-width", "100vw"]]), e("max-w-screen", [["max-width", "100vw"]]), e("h-screen", [["height", "100vh"]]), e("min-h-screen", [["min-height", "100vh"]]), e("max-h-screen", [["max-height", "100vh"]]), e("max-w-none", [["max-width", "none"]]), e("max-h-none", [["max-height", "none"]]), a("size", ["--size", "--spacing"], n => [l("--tw-sort", "size"), l("width", n), l("height", n)], { supportsFractions: !0 }); for (let [n, d, h] of [["w", ["--width", "--spacing", "--container"], "width"], ["min-w", ["--min-width", "--spacing", "--container"], "min-width"], ["max-w", ["--max-width", "--spacing", "--container"], "max-width"], ["h", ["--height", "--spacing"], "height"], ["min-h", ["--min-height", "--height", "--spacing"], "min-height"], ["max-h", ["--max-height", "--height", "--spacing"], "max-height"]]) a(n, d, A => [l(h, A)], { supportsFractions: !0 }); r.static("container", () => { let n = [...t.namespace("--breakpoint").values()]; n.sort((h, A) => ye(h, A, "asc")); let d = [l("--tw-sort", "--tw-container-component"), l("width", "100%")]; for (let h of n) d.push(F("@media", `(width >= ${h})`, [l("max-width", h)])); return d }), e("flex-auto", [["flex", "auto"]]), e("flex-initial", [["flex", "0 auto"]]), e("flex-none", [["flex", "none"]]), r.functional("flex", n => { if (n.value) { if (n.value.kind === "arbitrary") return n.modifier ? void 0 : [l("flex", n.value.value)]; if (n.value.fraction) { let [d, h] = z(n.value.fraction, "/"); return !E(d) || !E(h) ? void 0 : [l("flex", `calc(${n.value.fraction} * 100%)`)] } if (E(n.value.value)) return n.modifier ? void 0 : [l("flex", n.value.value)] } }), i("flex", () => [{ supportsFractions: !0 }]), o("shrink", { defaultValue: "1", handleBareValue: ({ value: n }) => E(n) ? n : null, handle: n => [l("flex-shrink", n)] }), o("grow", { defaultValue: "1", handleBareValue: ({ value: n }) => E(n) ? n : null, handle: n => [l("flex-grow", n)] }), i("shrink", () => [{ values: ["0"], valueThemeKeys: [], hasDefaultValue: !0 }]), i("grow", () => [{ values: ["0"], valueThemeKeys: [], hasDefaultValue: !0 }]), e("basis-auto", [["flex-basis", "auto"]]), e("basis-full", [["flex-basis", "100%"]]), a("basis", ["--flex-basis", "--spacing", "--container"], n => [l("flex-basis", n)], { supportsFractions: !0 }), e("table-auto", [["table-layout", "auto"]]), e("table-fixed", [["table-layout", "fixed"]]), e("caption-top", [["caption-side", "top"]]), e("caption-bottom", [["caption-side", "bottom"]]), e("border-collapse", [["border-collapse", "collapse"]]), e("border-separate", [["border-collapse", "separate"]]); let f = () => j([S("--tw-border-spacing-x", "0", "<length>"), S("--tw-border-spacing-y", "0", "<length>")]); a("border-spacing", ["--border-spacing", "--spacing"], n => [f(), l("--tw-border-spacing-x", n), l("--tw-border-spacing-y", n), l("border-spacing", "var(--tw-border-spacing-x) var(--tw-border-spacing-y)")]), a("border-spacing-x", ["--border-spacing", "--spacing"], n => [f(), l("--tw-border-spacing-x", n), l("border-spacing", "var(--tw-border-spacing-x) var(--tw-border-spacing-y)")]), a("border-spacing-y", ["--border-spacing", "--spacing"], n => [f(), l("--tw-border-spacing-y", n), l("border-spacing", "var(--tw-border-spacing-x) var(--tw-border-spacing-y)")]), e("origin-center", [["transform-origin", "center"]]), e("origin-top", [["transform-origin", "top"]]), e("origin-top-right", [["transform-origin", "top right"]]), e("origin-right", [["transform-origin", "right"]]), e("origin-bottom-right", [["transform-origin", "bottom right"]]), e("origin-bottom", [["transform-origin", "bottom"]]), e("origin-bottom-left", [["transform-origin", "bottom left"]]), e("origin-left", [["transform-origin", "left"]]), e("origin-top-left", [["transform-origin", "top left"]]), o("origin", { themeKeys: ["--transform-origin"], handle: n => [l("transform-origin", n)] }), e("perspective-origin-center", [["perspective-origin", "center"]]), e("perspective-origin-top", [["perspective-origin", "top"]]), e("perspective-origin-top-right", [["perspective-origin", "top right"]]), e("perspective-origin-right", [["perspective-origin", "right"]]), e("perspective-origin-bottom-right", [["perspective-origin", "bottom right"]]), e("perspective-origin-bottom", [["perspective-origin", "bottom"]]), e("perspective-origin-bottom-left", [["perspective-origin", "bottom left"]]), e("perspective-origin-left", [["perspective-origin", "left"]]), e("perspective-origin-top-left", [["perspective-origin", "top left"]]), o("perspective-origin", { themeKeys: ["--perspective-origin"], handle: n => [l("perspective-origin", n)] }), e("perspective-none", [["perspective", "none"]]), o("perspective", { themeKeys: ["--perspective"], handle: n => [l("perspective", n)] }); let u = () => j([S("--tw-translate-x", "0"), S("--tw-translate-y", "0"), S("--tw-translate-z", "0")]); e("translate-none", [["translate", "none"]]), e("-translate-full", [u, ["--tw-translate-x", "-100%"], ["--tw-translate-y", "-100%"], ["translate", "var(--tw-translate-x) var(--tw-translate-y)"]]), e("translate-full", [u, ["--tw-translate-x", "100%"], ["--tw-translate-y", "100%"], ["translate", "var(--tw-translate-x) var(--tw-translate-y)"]]), a("translate", ["--translate", "--spacing"], n => [u(), l("--tw-translate-x", n), l("--tw-translate-y", n), l("translate", "var(--tw-translate-x) var(--tw-translate-y)")], { supportsNegative: !0, supportsFractions: !0 }); for (let n of ["x", "y"]) e(`-translate-${n}-full`, [u, [`--tw-translate-${n}`, "-100%"], ["translate", "var(--tw-translate-x) var(--tw-translate-y)"]]), e(`translate-${n}-full`, [u, [`--tw-translate-${n}`, "100%"], ["translate", "var(--tw-translate-x) var(--tw-translate-y)"]]), a(`translate-${n}`, ["--translate", "--spacing"], d => [u(), l(`--tw-translate-${n}`, d), l("translate", "var(--tw-translate-x) var(--tw-translate-y)")], { supportsNegative: !0, supportsFractions: !0 }); a("translate-z", ["--translate", "--spacing"], n => [u(), l("--tw-translate-z", n), l("translate", "var(--tw-translate-x) var(--tw-translate-y) var(--tw-translate-z)")], { supportsNegative: !0 }), e("translate-3d", [u, ["translate", "var(--tw-translate-x) var(--tw-translate-y) var(--tw-translate-z)"]]); let c = () => j([S("--tw-scale-x", "1"), S("--tw-scale-y", "1"), S("--tw-scale-z", "1")]); e("scale-none", [["scale", "none"]]); function g({ negative: n }) { return d => { if (!d.value || d.modifier) return; let h; return d.value.kind === "arbitrary" ? (h = d.value.value, h = n ? `calc(${h} * -1)` : h, [l("scale", h)]) : (h = t.resolve(d.value.value, ["--scale"]), !h && E(d.value.value) && (h = `${d.value.value}%`), h ? (h = n ? `calc(${h} * -1)` : h, [c(), l("--tw-scale-x", h), l("--tw-scale-y", h), l("--tw-scale-z", h), l("scale", "var(--tw-scale-x) var(--tw-scale-y)")]) : void 0) } } r.functional("-scale", g({ negative: !0 })), r.functional("scale", g({ negative: !1 })), i("scale", () => [{ supportsNegative: !0, values: ["0", "50", "75", "90", "95", "100", "105", "110", "125", "150", "200"], valueThemeKeys: ["--scale"] }]); for (let n of ["x", "y", "z"]) o(`scale-${n}`, { supportsNegative: !0, themeKeys: ["--scale"], handleBareValue: ({ value: d }) => E(d) ? `${d}%` : null, handle: d => [c(), l(`--tw-scale-${n}`, d), l("scale", `var(--tw-scale-x) var(--tw-scale-y)${n === "z" ? " var(--tw-scale-z)" : ""}`)] }), i(`scale-${n}`, () => [{ supportsNegative: !0, values: ["0", "50", "75", "90", "95", "100", "105", "110", "125", "150", "200"], valueThemeKeys: ["--scale"] }]); e("scale-3d", [c, ["scale", "var(--tw-scale-x) var(--tw-scale-y) var(--tw-scale-z)"]]), e("rotate-none", [["rotate", "none"]]); function p({ negative: n }) { return d => { if (!d.value || d.modifier) return; let h; if (d.value.kind === "arbitrary") { h = d.value.value; let A = d.value.dataType ?? Y(h, ["angle", "vector"]); if (A === "vector") return [l("rotate", `${h} var(--tw-rotate)`)]; if (A !== "angle") return [l("rotate", n ? `calc(${h} * -1)` : h)] } else if (h = t.resolve(d.value.value, ["--rotate"]), !h && E(d.value.value) && (h = `${d.value.value}deg`), !h) return; return [l("rotate", n ? `calc(${h} * -1)` : h)] } } r.functional("-rotate", p({ negative: !0 })), r.functional("rotate", p({ negative: !1 })), i("rotate", () => [{ supportsNegative: !0, values: ["0", "1", "2", "3", "6", "12", "45", "90", "180"], valueThemeKeys: ["--rotate"] }]); { let n = ["var(--tw-rotate-x,)", "var(--tw-rotate-y,)", "var(--tw-rotate-z,)", "var(--tw-skew-x,)", "var(--tw-skew-y,)"].join(" "), d = () => j([S("--tw-rotate-x"), S("--tw-rotate-y"), S("--tw-rotate-z"), S("--tw-skew-x"), S("--tw-skew-y")]); for (let h of ["x", "y", "z"]) o(`rotate-${h}`, { supportsNegative: !0, themeKeys: ["--rotate"], handleBareValue: ({ value: A }) => E(A) ? `${A}deg` : null, handle: A => [d(), l(`--tw-rotate-${h}`, `rotate${h.toUpperCase()}(${A})`), l("transform", n)] }), i(`rotate-${h}`, () => [{ supportsNegative: !0, values: ["0", "1", "2", "3", "6", "12", "45", "90", "180"], valueThemeKeys: ["--rotate"] }]); o("skew", { supportsNegative: !0, themeKeys: ["--skew"], handleBareValue: ({ value: h }) => E(h) ? `${h}deg` : null, handle: h => [d(), l("--tw-skew-x", `skewX(${h})`), l("--tw-skew-y", `skewY(${h})`), l("transform", n)] }), o("skew-x", { supportsNegative: !0, themeKeys: ["--skew"], handleBareValue: ({ value: h }) => E(h) ? `${h}deg` : null, handle: h => [d(), l("--tw-skew-x", `skewX(${h})`), l("transform", n)] }), o("skew-y", { supportsNegative: !0, themeKeys: ["--skew"], handleBareValue: ({ value: h }) => E(h) ? `${h}deg` : null, handle: h => [d(), l("--tw-skew-y", `skewY(${h})`), l("transform", n)] }), i("skew", () => [{ supportsNegative: !0, values: ["0", "1", "2", "3", "6", "12"], valueThemeKeys: ["--skew"] }]), i("skew-x", () => [{ supportsNegative: !0, values: ["0", "1", "2", "3", "6", "12"], valueThemeKeys: ["--skew"] }]), i("skew-y", () => [{ supportsNegative: !0, values: ["0", "1", "2", "3", "6", "12"], valueThemeKeys: ["--skew"] }]), r.functional("transform", h => { if (h.modifier) return; let A = null; if (h.value ? h.value.kind === "arbitrary" && (A = h.value.value) : A = n, A !== null) return [d(), l("transform", A)] }), i("transform", () => [{ hasDefaultValue: !0 }]), e("transform-cpu", [["transform", n]]), e("transform-gpu", [["transform", `translateZ(0) ${n}`]]), e("transform-none", [["transform", "none"]]); } e("transform-flat", [["transform-style", "flat"]]), e("transform-3d", [["transform-style", "preserve-3d"]]), e("transform-content", [["transform-box", "content-box"]]), e("transform-border", [["transform-box", "border-box"]]), e("transform-fill", [["transform-box", "fill-box"]]), e("transform-stroke", [["transform-box", "stroke-box"]]), e("transform-view", [["transform-box", "view-box"]]), e("backface-visible", [["backface-visibility", "visible"]]), e("backface-hidden", [["backface-visibility", "hidden"]]); for (let n of ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out"]) e(`cursor-${n}`, [["cursor", n]]); o("cursor", { themeKeys: ["--cursor"], handle: n => [l("cursor", n)] }); for (let n of ["auto", "none", "manipulation"]) e(`touch-${n}`, [["touch-action", n]]); let m = () => j([S("--tw-pan-x"), S("--tw-pan-y"), S("--tw-pinch-zoom")]); for (let n of ["x", "left", "right"]) e(`touch-pan-${n}`, [m, ["--tw-pan-x", `pan-${n}`], ["touch-action", "var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)"]]); for (let n of ["y", "up", "down"]) e(`touch-pan-${n}`, [m, ["--tw-pan-y", `pan-${n}`], ["touch-action", "var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)"]]); e("touch-pinch-zoom", [m, ["--tw-pinch-zoom", "pinch-zoom"], ["touch-action", "var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)"]]); for (let n of ["none", "text", "all", "auto"]) e(`select-${n}`, [["-webkit-user-select", n], ["user-select", n]]); e("resize-none", [["resize", "none"]]), e("resize-x", [["resize", "horizontal"]]), e("resize-y", [["resize", "vertical"]]), e("resize", [["resize", "both"]]), e("snap-none", [["scroll-snap-type", "none"]]); let v = () => j([S("--tw-scroll-snap-strictness", "proximity", "*")]); for (let n of ["x", "y", "both"]) e(`snap-${n}`, [v, ["scroll-snap-type", `${n} var(--tw-scroll-snap-strictness)`]]); e("snap-mandatory", [v, ["--tw-scroll-snap-strictness", "mandatory"]]), e("snap-proximity", [v, ["--tw-scroll-snap-strictness", "proximity"]]), e("snap-align-none", [["scroll-snap-align", "none"]]), e("snap-start", [["scroll-snap-align", "start"]]), e("snap-end", [["scroll-snap-align", "end"]]), e("snap-center", [["scroll-snap-align", "center"]]), e("snap-normal", [["scroll-snap-stop", "normal"]]), e("snap-always", [["scroll-snap-stop", "always"]]); for (let [n, d] of [["scroll-m", "scroll-margin"], ["scroll-mx", "scroll-margin-inline"], ["scroll-my", "scroll-margin-block"], ["scroll-ms", "scroll-margin-inline-start"], ["scroll-me", "scroll-margin-inline-end"], ["scroll-mt", "scroll-margin-top"], ["scroll-mr", "scroll-margin-right"], ["scroll-mb", "scroll-margin-bottom"], ["scroll-ml", "scroll-margin-left"]]) a(n, ["--scroll-margin", "--spacing"], h => [l(d, h)], { supportsNegative: !0 }); for (let [n, d] of [["scroll-p", "scroll-padding"], ["scroll-px", "scroll-padding-inline"], ["scroll-py", "scroll-padding-block"], ["scroll-ps", "scroll-padding-inline-start"], ["scroll-pe", "scroll-padding-inline-end"], ["scroll-pt", "scroll-padding-top"], ["scroll-pr", "scroll-padding-right"], ["scroll-pb", "scroll-padding-bottom"], ["scroll-pl", "scroll-padding-left"]]) a(n, ["--scroll-padding", "--spacing"], h => [l(d, h)]); e("list-inside", [["list-style-position", "inside"]]), e("list-outside", [["list-style-position", "outside"]]), e("list-none", [["list-style-type", "none"]]), e("list-disc", [["list-style-type", "disc"]]), e("list-decimal", [["list-style-type", "decimal"]]), o("list", { themeKeys: ["--list-style-type"], handle: n => [l("list-style-type", n)] }), e("list-image-none", [["list-style-image", "none"]]), o("list-image", { themeKeys: ["--list-style-image"], handle: n => [l("list-style-image", n)] }), e("appearance-none", [["appearance", "none"]]), e("appearance-auto", [["appearance", "auto"]]), e("scheme-normal", [["color-scheme", "normal"]]), e("scheme-dark", [["color-scheme", "dark"]]), e("scheme-light", [["color-scheme", "light"]]), e("scheme-light-dark", [["color-scheme", "light dark"]]), e("scheme-only-dark", [["color-scheme", "only dark"]]), e("scheme-only-light", [["color-scheme", "only light"]]), e("columns-auto", [["columns", "auto"]]), o("columns", { themeKeys: ["--columns", "--container"], handleBareValue: ({ value: n }) => E(n) ? n : null, handle: n => [l("columns", n)] }), i("columns", () => [{ values: Array.from({ length: 12 }, (n, d) => `${d + 1}`), valueThemeKeys: ["--columns", "--container"] }]); for (let n of ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"]) e(`break-before-${n}`, [["break-before", n]]); for (let n of ["auto", "avoid", "avoid-page", "avoid-column"]) e(`break-inside-${n}`, [["break-inside", n]]); for (let n of ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"]) e(`break-after-${n}`, [["break-after", n]]); e("grid-flow-row", [["grid-auto-flow", "row"]]), e("grid-flow-col", [["grid-auto-flow", "column"]]), e("grid-flow-dense", [["grid-auto-flow", "dense"]]), e("grid-flow-row-dense", [["grid-auto-flow", "row dense"]]), e("grid-flow-col-dense", [["grid-auto-flow", "column dense"]]), e("auto-cols-auto", [["grid-auto-columns", "auto"]]), e("auto-cols-min", [["grid-auto-columns", "min-content"]]), e("auto-cols-max", [["grid-auto-columns", "max-content"]]), e("auto-cols-fr", [["grid-auto-columns", "minmax(0, 1fr)"]]), o("auto-cols", { themeKeys: ["--grid-auto-columns"], handle: n => [l("grid-auto-columns", n)] }), e("auto-rows-auto", [["grid-auto-rows", "auto"]]), e("auto-rows-min", [["grid-auto-rows", "min-content"]]), e("auto-rows-max", [["grid-auto-rows", "max-content"]]), e("auto-rows-fr", [["grid-auto-rows", "minmax(0, 1fr)"]]), o("auto-rows", { themeKeys: ["--grid-auto-rows"], handle: n => [l("grid-auto-rows", n)] }), e("grid-cols-none", [["grid-template-columns", "none"]]), e("grid-cols-subgrid", [["grid-template-columns", "subgrid"]]), o("grid-cols", { themeKeys: ["--grid-template-columns"], handleBareValue: ({ value: n }) => _t(n) ? `repeat(${n}, minmax(0, 1fr))` : null, handle: n => [l("grid-template-columns", n)] }), e("grid-rows-none", [["grid-template-rows", "none"]]), e("grid-rows-subgrid", [["grid-template-rows", "subgrid"]]), o("grid-rows", { themeKeys: ["--grid-template-rows"], handleBareValue: ({ value: n }) => _t(n) ? `repeat(${n}, minmax(0, 1fr))` : null, handle: n => [l("grid-template-rows", n)] }), i("grid-cols", () => [{ values: Array.from({ length: 12 }, (n, d) => `${d + 1}`), valueThemeKeys: ["--grid-template-columns"] }]), i("grid-rows", () => [{ values: Array.from({ length: 12 }, (n, d) => `${d + 1}`), valueThemeKeys: ["--grid-template-rows"] }]), e("flex-row", [["flex-direction", "row"]]), e("flex-row-reverse", [["flex-direction", "row-reverse"]]), e("flex-col", [["flex-direction", "column"]]), e("flex-col-reverse", [["flex-direction", "column-reverse"]]), e("flex-wrap", [["flex-wrap", "wrap"]]), e("flex-nowrap", [["flex-wrap", "nowrap"]]), e("flex-wrap-reverse", [["flex-wrap", "wrap-reverse"]]), e("place-content-center", [["place-content", "center"]]), e("place-content-start", [["place-content", "start"]]), e("place-content-end", [["place-content", "end"]]), e("place-content-center-safe", [["place-content", "safe center"]]), e("place-content-end-safe", [["place-content", "safe end"]]), e("place-content-between", [["place-content", "space-between"]]), e("place-content-around", [["place-content", "space-around"]]), e("place-content-evenly", [["place-content", "space-evenly"]]), e("place-content-baseline", [["place-content", "baseline"]]), e("place-content-stretch", [["place-content", "stretch"]]), e("place-items-center", [["place-items", "center"]]), e("place-items-start", [["place-items", "start"]]), e("place-items-end", [["place-items", "end"]]), e("place-items-center-safe", [["place-items", "safe center"]]), e("place-items-end-safe", [["place-items", "safe end"]]), e("place-items-baseline", [["place-items", "baseline"]]), e("place-items-stretch", [["place-items", "stretch"]]), e("content-normal", [["align-content", "normal"]]), e("content-center", [["align-content", "center"]]), e("content-start", [["align-content", "flex-start"]]), e("content-end", [["align-content", "flex-end"]]), e("content-center-safe", [["align-content", "safe center"]]), e("content-end-safe", [["align-content", "safe flex-end"]]), e("content-between", [["align-content", "space-between"]]), e("content-around", [["align-content", "space-around"]]), e("content-evenly", [["align-content", "space-evenly"]]), e("content-baseline", [["align-content", "baseline"]]), e("content-stretch", [["align-content", "stretch"]]), e("items-center", [["align-items", "center"]]), e("items-start", [["align-items", "flex-start"]]), e("items-end", [["align-items", "flex-end"]]), e("items-center-safe", [["align-items", "safe center"]]), e("items-end-safe", [["align-items", "safe flex-end"]]), e("items-baseline", [["align-items", "baseline"]]), e("items-baseline-last", [["align-items", "last baseline"]]), e("items-stretch", [["align-items", "stretch"]]), e("justify-normal", [["justify-content", "normal"]]), e("justify-center", [["justify-content", "center"]]), e("justify-start", [["justify-content", "flex-start"]]), e("justify-end", [["justify-content", "flex-end"]]), e("justify-center-safe", [["justify-content", "safe center"]]), e("justify-end-safe", [["justify-content", "safe flex-end"]]), e("justify-between", [["justify-content", "space-between"]]), e("justify-around", [["justify-content", "space-around"]]), e("justify-evenly", [["justify-content", "space-evenly"]]), e("justify-baseline", [["justify-content", "baseline"]]), e("justify-stretch", [["justify-content", "stretch"]]), e("justify-items-normal", [["justify-items", "normal"]]), e("justify-items-center", [["justify-items", "center"]]), e("justify-items-start", [["justify-items", "start"]]), e("justify-items-end", [["justify-items", "end"]]), e("justify-items-center-safe", [["justify-items", "safe center"]]), e("justify-items-end-safe", [["justify-items", "safe end"]]), e("justify-items-stretch", [["justify-items", "stretch"]]), a("gap", ["--gap", "--spacing"], n => [l("gap", n)]), a("gap-x", ["--gap", "--spacing"], n => [l("column-gap", n)]), a("gap-y", ["--gap", "--spacing"], n => [l("row-gap", n)]), a("space-x", ["--space", "--spacing"], n => [j([S("--tw-space-x-reverse", "0")]), M(":where(& > :not(:last-child))", [l("--tw-sort", "row-gap"), l("--tw-space-x-reverse", "0"), l("margin-inline-start", `calc(${n} * var(--tw-space-x-reverse))`), l("margin-inline-end", `calc(${n} * calc(1 - var(--tw-space-x-reverse)))`)])], { supportsNegative: !0 }), a("space-y", ["--space", "--spacing"], n => [j([S("--tw-space-y-reverse", "0")]), M(":where(& > :not(:last-child))", [l("--tw-sort", "column-gap"), l("--tw-space-y-reverse", "0"), l("margin-block-start", `calc(${n} * var(--tw-space-y-reverse))`), l("margin-block-end", `calc(${n} * calc(1 - var(--tw-space-y-reverse)))`)])], { supportsNegative: !0 }), e("space-x-reverse", [() => j([S("--tw-space-x-reverse", "0")]), () => M(":where(& > :not(:last-child))", [l("--tw-sort", "row-gap"), l("--tw-space-x-reverse", "1")])]), e("space-y-reverse", [() => j([S("--tw-space-y-reverse", "0")]), () => M(":where(& > :not(:last-child))", [l("--tw-sort", "column-gap"), l("--tw-space-y-reverse", "1")])]), e("accent-auto", [["accent-color", "auto"]]), s("accent", { themeKeys: ["--accent-color", "--color"], handle: n => [l("accent-color", n)] }), s("caret", { themeKeys: ["--caret-color", "--color"], handle: n => [l("caret-color", n)] }), s("divide", { themeKeys: ["--divide-color", "--color"], handle: n => [M(":where(& > :not(:last-child))", [l("--tw-sort", "divide-color"), l("border-color", n)])] }), e("place-self-auto", [["place-self", "auto"]]), e("place-self-start", [["place-self", "start"]]), e("place-self-end", [["place-self", "end"]]), e("place-self-center", [["place-self", "center"]]), e("place-self-end-safe", [["place-self", "safe end"]]), e("place-self-center-safe", [["place-self", "safe center"]]), e("place-self-stretch", [["place-self", "stretch"]]), e("self-auto", [["align-self", "auto"]]), e("self-start", [["align-self", "flex-start"]]), e("self-end", [["align-self", "flex-end"]]), e("self-center", [["align-self", "center"]]), e("self-end-safe", [["align-self", "safe flex-end"]]), e("self-center-safe", [["align-self", "safe center"]]), e("self-stretch", [["align-self", "stretch"]]), e("self-baseline", [["align-self", "baseline"]]), e("self-baseline-last", [["align-self", "last baseline"]]), e("justify-self-auto", [["justify-self", "auto"]]), e("justify-self-start", [["justify-self", "flex-start"]]), e("justify-self-end", [["justify-self", "flex-end"]]), e("justify-self-center", [["justify-self", "center"]]), e("justify-self-end-safe", [["justify-self", "safe flex-end"]]), e("justify-self-center-safe", [["justify-self", "safe center"]]), e("justify-self-stretch", [["justify-self", "stretch"]]); for (let n of ["auto", "hidden", "clip", "visible", "scroll"]) e(`overflow-${n}`, [["overflow", n]]), e(`overflow-x-${n}`, [["overflow-x", n]]), e(`overflow-y-${n}`, [["overflow-y", n]]); for (let n of ["auto", "contain", "none"]) e(`overscroll-${n}`, [["overscroll-behavior", n]]), e(`overscroll-x-${n}`, [["overscroll-behavior-x", n]]), e(`overscroll-y-${n}`, [["overscroll-behavior-y", n]]); e("scroll-auto", [["scroll-behavior", "auto"]]), e("scroll-smooth", [["scroll-behavior", "smooth"]]), e("truncate", [["overflow", "hidden"], ["text-overflow", "ellipsis"], ["white-space", "nowrap"]]), e("text-ellipsis", [["text-overflow", "ellipsis"]]), e("text-clip", [["text-overflow", "clip"]]), e("hyphens-none", [["-webkit-hyphens", "none"], ["hyphens", "none"]]), e("hyphens-manual", [["-webkit-hyphens", "manual"], ["hyphens", "manual"]]), e("hyphens-auto", [["-webkit-hyphens", "auto"], ["hyphens", "auto"]]), e("whitespace-normal", [["white-space", "normal"]]), e("whitespace-nowrap", [["white-space", "nowrap"]]), e("whitespace-pre", [["white-space", "pre"]]), e("whitespace-pre-line", [["white-space", "pre-line"]]), e("whitespace-pre-wrap", [["white-space", "pre-wrap"]]), e("whitespace-break-spaces", [["white-space", "break-spaces"]]), e("text-wrap", [["text-wrap", "wrap"]]), e("text-nowrap", [["text-wrap", "nowrap"]]), e("text-balance", [["text-wrap", "balance"]]), e("text-pretty", [["text-wrap", "pretty"]]), e("break-normal", [["overflow-wrap", "normal"], ["word-break", "normal"]]), e("break-words", [["overflow-wrap", "break-word"]]), e("break-all", [["word-break", "break-all"]]), e("break-keep", [["word-break", "keep-all"]]), e("wrap-anywhere", [["overflow-wrap", "anywhere"]]), e("wrap-break-word", [["overflow-wrap", "break-word"]]), e("wrap-normal", [["overflow-wrap", "normal"]]); for (let [n, d] of [["rounded", ["border-radius"]], ["rounded-s", ["border-start-start-radius", "border-end-start-radius"]], ["rounded-e", ["border-start-end-radius", "border-end-end-radius"]], ["rounded-t", ["border-top-left-radius", "border-top-right-radius"]], ["rounded-r", ["border-top-right-radius", "border-bottom-right-radius"]], ["rounded-b", ["border-bottom-right-radius", "border-bottom-left-radius"]], ["rounded-l", ["border-top-left-radius", "border-bottom-left-radius"]], ["rounded-ss", ["border-start-start-radius"]], ["rounded-se", ["border-start-end-radius"]], ["rounded-ee", ["border-end-end-radius"]], ["rounded-es", ["border-end-start-radius"]], ["rounded-tl", ["border-top-left-radius"]], ["rounded-tr", ["border-top-right-radius"]], ["rounded-br", ["border-bottom-right-radius"]], ["rounded-bl", ["border-bottom-left-radius"]]]) e(`${n}-none`, d.map(h => [h, "0"])), e(`${n}-full`, d.map(h => [h, "calc(infinity * 1px)"])), o(n, { themeKeys: ["--radius"], handle: h => d.map(A => l(A, h)) }); e("border-solid", [["--tw-border-style", "solid"], ["border-style", "solid"]]), e("border-dashed", [["--tw-border-style", "dashed"], ["border-style", "dashed"]]), e("border-dotted", [["--tw-border-style", "dotted"], ["border-style", "dotted"]]), e("border-double", [["--tw-border-style", "double"], ["border-style", "double"]]), e("border-hidden", [["--tw-border-style", "hidden"], ["border-style", "hidden"]]), e("border-none", [["--tw-border-style", "none"], ["border-style", "none"]]); { let d = function (h, A) { r.functional(h, w => { if (!w.value) { if (w.modifier) return; let C = t.get(["--default-border-width"]) ?? "1px", P = A.width(C); return P ? [n(), ...P] : void 0 } if (w.value.kind === "arbitrary") { let C = w.value.value; switch (w.value.dataType ?? Y(C, ["color", "line-width", "length"])) { case "line-width": case "length": { if (w.modifier) return; let $ = A.width(C); return $ ? [n(), ...$] : void 0 } default: return C = Z(C, w.modifier, t), C === null ? void 0 : A.color(C) } } { let C = te(w, t, ["--border-color", "--color"]); if (C) return A.color(C) } { if (w.modifier) return; let C = t.resolve(w.value.value, ["--border-width"]); if (C) { let P = A.width(C); return P ? [n(), ...P] : void 0 } if (E(w.value.value)) { let P = A.width(`${w.value.value}px`); return P ? [n(), ...P] : void 0 } } }), i(h, () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--border-color", "--color"], modifiers: Array.from({ length: 21 }, (w, C) => `${C * 5}`), hasDefaultValue: !0 }, { values: ["0", "2", "4", "8"], valueThemeKeys: ["--border-width"] }]); }; let n = () => j([S("--tw-border-style", "solid")]); d("border", { width: h => [l("border-style", "var(--tw-border-style)"), l("border-width", h)], color: h => [l("border-color", h)] }), d("border-x", { width: h => [l("border-inline-style", "var(--tw-border-style)"), l("border-inline-width", h)], color: h => [l("border-inline-color", h)] }), d("border-y", { width: h => [l("border-block-style", "var(--tw-border-style)"), l("border-block-width", h)], color: h => [l("border-block-color", h)] }), d("border-s", { width: h => [l("border-inline-start-style", "var(--tw-border-style)"), l("border-inline-start-width", h)], color: h => [l("border-inline-start-color", h)] }), d("border-e", { width: h => [l("border-inline-end-style", "var(--tw-border-style)"), l("border-inline-end-width", h)], color: h => [l("border-inline-end-color", h)] }), d("border-t", { width: h => [l("border-top-style", "var(--tw-border-style)"), l("border-top-width", h)], color: h => [l("border-top-color", h)] }), d("border-r", { width: h => [l("border-right-style", "var(--tw-border-style)"), l("border-right-width", h)], color: h => [l("border-right-color", h)] }), d("border-b", { width: h => [l("border-bottom-style", "var(--tw-border-style)"), l("border-bottom-width", h)], color: h => [l("border-bottom-color", h)] }), d("border-l", { width: h => [l("border-left-style", "var(--tw-border-style)"), l("border-left-width", h)], color: h => [l("border-left-color", h)] }), o("divide-x", { defaultValue: t.get(["--default-border-width"]) ?? "1px", themeKeys: ["--divide-width", "--border-width"], handleBareValue: ({ value: h }) => E(h) ? `${h}px` : null, handle: h => [j([S("--tw-divide-x-reverse", "0")]), M(":where(& > :not(:last-child))", [l("--tw-sort", "divide-x-width"), n(), l("--tw-divide-x-reverse", "0"), l("border-inline-style", "var(--tw-border-style)"), l("border-inline-start-width", `calc(${h} * var(--tw-divide-x-reverse))`), l("border-inline-end-width", `calc(${h} * calc(1 - var(--tw-divide-x-reverse)))`)])] }), o("divide-y", { defaultValue: t.get(["--default-border-width"]) ?? "1px", themeKeys: ["--divide-width", "--border-width"], handleBareValue: ({ value: h }) => E(h) ? `${h}px` : null, handle: h => [j([S("--tw-divide-y-reverse", "0")]), M(":where(& > :not(:last-child))", [l("--tw-sort", "divide-y-width"), n(), l("--tw-divide-y-reverse", "0"), l("border-bottom-style", "var(--tw-border-style)"), l("border-top-style", "var(--tw-border-style)"), l("border-top-width", `calc(${h} * var(--tw-divide-y-reverse))`), l("border-bottom-width", `calc(${h} * calc(1 - var(--tw-divide-y-reverse)))`)])] }), i("divide-x", () => [{ values: ["0", "2", "4", "8"], valueThemeKeys: ["--divide-width", "--border-width"], hasDefaultValue: !0 }]), i("divide-y", () => [{ values: ["0", "2", "4", "8"], valueThemeKeys: ["--divide-width", "--border-width"], hasDefaultValue: !0 }]), e("divide-x-reverse", [() => j([S("--tw-divide-x-reverse", "0")]), () => M(":where(& > :not(:last-child))", [l("--tw-divide-x-reverse", "1")])]), e("divide-y-reverse", [() => j([S("--tw-divide-y-reverse", "0")]), () => M(":where(& > :not(:last-child))", [l("--tw-divide-y-reverse", "1")])]); for (let h of ["solid", "dashed", "dotted", "double", "none"]) e(`divide-${h}`, [() => M(":where(& > :not(:last-child))", [l("--tw-sort", "divide-style"), l("--tw-border-style", h), l("border-style", h)])]); } e("bg-auto", [["background-size", "auto"]]), e("bg-cover", [["background-size", "cover"]]), e("bg-contain", [["background-size", "contain"]]), o("bg-size", { handle(n) { if (n) return [l("background-size", n)] } }), e("bg-fixed", [["background-attachment", "fixed"]]), e("bg-local", [["background-attachment", "local"]]), e("bg-scroll", [["background-attachment", "scroll"]]), e("bg-top", [["background-position", "top"]]), e("bg-top-left", [["background-position", "left top"]]), e("bg-top-right", [["background-position", "right top"]]), e("bg-bottom", [["background-position", "bottom"]]), e("bg-bottom-left", [["background-position", "left bottom"]]), e("bg-bottom-right", [["background-position", "right bottom"]]), e("bg-left", [["background-position", "left"]]), e("bg-right", [["background-position", "right"]]), e("bg-center", [["background-position", "center"]]), o("bg-position", { handle(n) { if (n) return [l("background-position", n)] } }), e("bg-repeat", [["background-repeat", "repeat"]]), e("bg-no-repeat", [["background-repeat", "no-repeat"]]), e("bg-repeat-x", [["background-repeat", "repeat-x"]]), e("bg-repeat-y", [["background-repeat", "repeat-y"]]), e("bg-repeat-round", [["background-repeat", "round"]]), e("bg-repeat-space", [["background-repeat", "space"]]), e("bg-none", [["background-image", "none"]]); { let h = function (C) { let P = "in oklab"; if (C?.kind === "named") switch (C.value) { case "longer": case "shorter": case "increasing": case "decreasing": P = `in oklch ${C.value} hue`; break; default: P = `in ${C.value}`; } else C?.kind === "arbitrary" && (P = C.value); return P }, A = function ({ negative: C }) { return P => { if (!P.value) return; if (P.value.kind === "arbitrary") { if (P.modifier) return; let K = P.value.value; switch (P.value.dataType ?? Y(K, ["angle"])) { case "angle": return K = C ? `calc(${K} * -1)` : `${K}`, [l("--tw-gradient-position", K), l("background-image", `linear-gradient(var(--tw-gradient-stops,${K}))`)]; default: return C ? void 0 : [l("--tw-gradient-position", K), l("background-image", `linear-gradient(var(--tw-gradient-stops,${K}))`)] } } let $ = P.value.value; if (!C && d.has($)) $ = d.get($); else if (E($)) $ = C ? `calc(${$}deg * -1)` : `${$}deg`; else return; let T = h(P.modifier); return [l("--tw-gradient-position", `${$}`), G("@supports (background-image: linear-gradient(in lab, red, red))", [l("--tw-gradient-position", `${$} ${T}`)]), l("background-image", "linear-gradient(var(--tw-gradient-stops))")] } }, w = function ({ negative: C }) { return P => { if (P.value?.kind === "arbitrary") { if (P.modifier) return; let K = P.value.value; return [l("--tw-gradient-position", K), l("background-image", `conic-gradient(var(--tw-gradient-stops,${K}))`)] } let $ = h(P.modifier); if (!P.value) return [l("--tw-gradient-position", $), l("background-image", "conic-gradient(var(--tw-gradient-stops))")]; let T = P.value.value; if (E(T)) return T = C ? `calc(${T}deg * -1)` : `${T}deg`, [l("--tw-gradient-position", `from ${T} ${$}`), l("background-image", "conic-gradient(var(--tw-gradient-stops))")] } }; let n = ["oklab", "oklch", "srgb", "hsl", "longer", "shorter", "increasing", "decreasing"], d = new Map([["to-t", "to top"], ["to-tr", "to top right"], ["to-r", "to right"], ["to-br", "to bottom right"], ["to-b", "to bottom"], ["to-bl", "to bottom left"], ["to-l", "to left"], ["to-tl", "to top left"]]); r.functional("-bg-linear", A({ negative: !0 })), r.functional("bg-linear", A({ negative: !1 })), i("bg-linear", () => [{ values: [...d.keys()], modifiers: n }, { values: ["0", "30", "60", "90", "120", "150", "180", "210", "240", "270", "300", "330"], supportsNegative: !0, modifiers: n }]), r.functional("-bg-conic", w({ negative: !0 })), r.functional("bg-conic", w({ negative: !1 })), i("bg-conic", () => [{ hasDefaultValue: !0, modifiers: n }, { values: ["0", "30", "60", "90", "120", "150", "180", "210", "240", "270", "300", "330"], supportsNegative: !0, modifiers: n }]), r.functional("bg-radial", C => { if (!C.value) { let P = h(C.modifier); return [l("--tw-gradient-position", P), l("background-image", "radial-gradient(var(--tw-gradient-stops))")] } if (C.value.kind === "arbitrary") { if (C.modifier) return; let P = C.value.value; return [l("--tw-gradient-position", P), l("background-image", `radial-gradient(var(--tw-gradient-stops,${P}))`)] } }), i("bg-radial", () => [{ hasDefaultValue: !0, modifiers: n }]); } r.functional("bg", n => { if (n.value) { if (n.value.kind === "arbitrary") { let d = n.value.value; switch (n.value.dataType ?? Y(d, ["image", "color", "percentage", "position", "bg-size", "length", "url"])) { case "percentage": case "position": return n.modifier ? void 0 : [l("background-position", d)]; case "bg-size": case "length": case "size": return n.modifier ? void 0 : [l("background-size", d)]; case "image": case "url": return n.modifier ? void 0 : [l("background-image", d)]; default: return d = Z(d, n.modifier, t), d === null ? void 0 : [l("background-color", d)] } } { let d = te(n, t, ["--background-color", "--color"]); if (d) return [l("background-color", d)] } { if (n.modifier) return; let d = t.resolve(n.value.value, ["--background-image"]); if (d) return [l("background-image", d)] } } }), i("bg", () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--background-color", "--color"], modifiers: Array.from({ length: 21 }, (n, d) => `${d * 5}`) }, { values: [], valueThemeKeys: ["--background-image"] }]); let k = () => j([S("--tw-gradient-position"), S("--tw-gradient-from", "#0000", "<color>"), S("--tw-gradient-via", "#0000", "<color>"), S("--tw-gradient-to", "#0000", "<color>"), S("--tw-gradient-stops"), S("--tw-gradient-via-stops"), S("--tw-gradient-from-position", "0%", "<length-percentage>"), S("--tw-gradient-via-position", "50%", "<length-percentage>"), S("--tw-gradient-to-position", "100%", "<length-percentage>")]); function x(n, d) { r.functional(n, h => { if (h.value) { if (h.value.kind === "arbitrary") { let A = h.value.value; switch (h.value.dataType ?? Y(A, ["color", "length", "percentage"])) { case "length": case "percentage": return h.modifier ? void 0 : d.position(A); default: return A = Z(A, h.modifier, t), A === null ? void 0 : d.color(A) } } { let A = te(h, t, ["--background-color", "--color"]); if (A) return d.color(A) } { if (h.modifier) return; let A = t.resolve(h.value.value, ["--gradient-color-stop-positions"]); if (A) return d.position(A); if (h.value.value[h.value.value.length - 1] === "%" && E(h.value.value.slice(0, -1))) return d.position(h.value.value) } } }), i(n, () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--background-color", "--color"], modifiers: Array.from({ length: 21 }, (h, A) => `${A * 5}`) }, { values: Array.from({ length: 21 }, (h, A) => `${A * 5}%`), valueThemeKeys: ["--gradient-color-stop-positions"] }]); } x("from", { color: n => [k(), l("--tw-sort", "--tw-gradient-from"), l("--tw-gradient-from", n), l("--tw-gradient-stops", "var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))")], position: n => [k(), l("--tw-gradient-from-position", n)] }), e("via-none", [["--tw-gradient-via-stops", "initial"]]), x("via", { color: n => [k(), l("--tw-sort", "--tw-gradient-via"), l("--tw-gradient-via", n), l("--tw-gradient-via-stops", "var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position)"), l("--tw-gradient-stops", "var(--tw-gradient-via-stops)")], position: n => [k(), l("--tw-gradient-via-position", n)] }), x("to", { color: n => [k(), l("--tw-sort", "--tw-gradient-to"), l("--tw-gradient-to", n), l("--tw-gradient-stops", "var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))")], position: n => [k(), l("--tw-gradient-to-position", n)] }), e("mask-none", [["mask-image", "none"]]), r.functional("mask", n => { if (!n.value || n.modifier || n.value.kind !== "arbitrary") return; let d = n.value.value; switch (n.value.dataType ?? Y(d, ["image", "percentage", "position", "bg-size", "length", "url"])) { case "percentage": case "position": return n.modifier ? void 0 : [l("mask-position", d)]; case "bg-size": case "length": case "size": return [l("mask-size", d)]; case "image": case "url": default: return [l("mask-image", d)] } }), e("mask-add", [["mask-composite", "add"]]), e("mask-subtract", [["mask-composite", "subtract"]]), e("mask-intersect", [["mask-composite", "intersect"]]), e("mask-exclude", [["mask-composite", "exclude"]]), e("mask-alpha", [["mask-mode", "alpha"]]), e("mask-luminance", [["mask-mode", "luminance"]]), e("mask-match", [["mask-mode", "match-source"]]), e("mask-type-alpha", [["mask-type", "alpha"]]), e("mask-type-luminance", [["mask-type", "luminance"]]), e("mask-auto", [["mask-size", "auto"]]), e("mask-cover", [["mask-size", "cover"]]), e("mask-contain", [["mask-size", "contain"]]), o("mask-size", { handle(n) { if (n) return [l("mask-size", n)] } }), e("mask-top", [["mask-position", "top"]]), e("mask-top-left", [["mask-position", "left top"]]), e("mask-top-right", [["mask-position", "right top"]]), e("mask-bottom", [["mask-position", "bottom"]]), e("mask-bottom-left", [["mask-position", "left bottom"]]), e("mask-bottom-right", [["mask-position", "right bottom"]]), e("mask-left", [["mask-position", "left"]]), e("mask-right", [["mask-position", "right"]]), e("mask-center", [["mask-position", "center"]]), o("mask-position", { handle(n) { if (n) return [l("mask-position", n)] } }), e("mask-repeat", [["mask-repeat", "repeat"]]), e("mask-no-repeat", [["mask-repeat", "no-repeat"]]), e("mask-repeat-x", [["mask-repeat", "repeat-x"]]), e("mask-repeat-y", [["mask-repeat", "repeat-y"]]), e("mask-repeat-round", [["mask-repeat", "round"]]), e("mask-repeat-space", [["mask-repeat", "space"]]), e("mask-clip-border", [["mask-clip", "border-box"]]), e("mask-clip-padding", [["mask-clip", "padding-box"]]), e("mask-clip-content", [["mask-clip", "content-box"]]), e("mask-clip-fill", [["mask-clip", "fill-box"]]), e("mask-clip-stroke", [["mask-clip", "stroke-box"]]), e("mask-clip-view", [["mask-clip", "view-box"]]), e("mask-no-clip", [["mask-clip", "no-clip"]]), e("mask-origin-border", [["mask-origin", "border-box"]]), e("mask-origin-padding", [["mask-origin", "padding-box"]]), e("mask-origin-content", [["mask-origin", "content-box"]]), e("mask-origin-fill", [["mask-origin", "fill-box"]]), e("mask-origin-stroke", [["mask-origin", "stroke-box"]]), e("mask-origin-view", [["mask-origin", "view-box"]]); let y = () => j([S("--tw-mask-linear", "linear-gradient(#fff, #fff)"), S("--tw-mask-radial", "linear-gradient(#fff, #fff)"), S("--tw-mask-conic", "linear-gradient(#fff, #fff)")]); function N(n, d) { r.functional(n, h => { if (h.value) { if (h.value.kind === "arbitrary") { let A = h.value.value; switch (h.value.dataType ?? Y(A, ["length", "percentage", "color"])) { case "color": return A = Z(A, h.modifier, t), A === null ? void 0 : d.color(A); case "percentage": return h.modifier || !E(A.slice(0, -1)) ? void 0 : d.position(A); default: return h.modifier ? void 0 : d.position(A) } } { let A = te(h, t, ["--background-color", "--color"]); if (A) return d.color(A) } { if (h.modifier) return; let A = Y(h.value.value, ["number", "percentage"]); if (!A) return; switch (A) { case "number": { let w = t.resolve(null, ["--spacing"]); return !w || !xe(h.value.value) ? void 0 : d.position(`calc(${w} * ${h.value.value})`) } case "percentage": return E(h.value.value.slice(0, -1)) ? d.position(h.value.value) : void 0; default: return } } } }), i(n, () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--background-color", "--color"], modifiers: Array.from({ length: 21 }, (h, A) => `${A * 5}`) }, { values: Array.from({ length: 21 }, (h, A) => `${A * 5}%`), valueThemeKeys: ["--gradient-color-stop-positions"] }]), i(n, () => [{ values: Array.from({ length: 21 }, (h, A) => `${A * 5}%`) }, { values: t.get(["--spacing"]) ? at : [] }, { values: ["current", "inherit", "transparent"], valueThemeKeys: ["--background-color", "--color"], modifiers: Array.from({ length: 21 }, (h, A) => `${A * 5}`) }]); } let b = () => j([S("--tw-mask-left", "linear-gradient(#fff, #fff)"), S("--tw-mask-right", "linear-gradient(#fff, #fff)"), S("--tw-mask-bottom", "linear-gradient(#fff, #fff)"), S("--tw-mask-top", "linear-gradient(#fff, #fff)")]); function V(n, d, h) { N(n, { color(A) { let w = [y(), b(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-linear", "var(--tw-mask-left), var(--tw-mask-right), var(--tw-mask-bottom), var(--tw-mask-top)")]; for (let C of ["top", "right", "bottom", "left"]) h[C] && (w.push(l(`--tw-mask-${C}`, `linear-gradient(to ${C}, var(--tw-mask-${C}-from-color) var(--tw-mask-${C}-from-position), var(--tw-mask-${C}-to-color) var(--tw-mask-${C}-to-position))`)), w.push(j([S(`--tw-mask-${C}-from-position`, "0%"), S(`--tw-mask-${C}-to-position`, "100%"), S(`--tw-mask-${C}-from-color`, "black"), S(`--tw-mask-${C}-to-color`, "transparent")])), w.push(l(`--tw-mask-${C}-${d}-color`, A))); return w }, position(A) { let w = [y(), b(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-linear", "var(--tw-mask-left), var(--tw-mask-right), var(--tw-mask-bottom), var(--tw-mask-top)")]; for (let C of ["top", "right", "bottom", "left"]) h[C] && (w.push(l(`--tw-mask-${C}`, `linear-gradient(to ${C}, var(--tw-mask-${C}-from-color) var(--tw-mask-${C}-from-position), var(--tw-mask-${C}-to-color) var(--tw-mask-${C}-to-position))`)), w.push(j([S(`--tw-mask-${C}-from-position`, "0%"), S(`--tw-mask-${C}-to-position`, "100%"), S(`--tw-mask-${C}-from-color`, "black"), S(`--tw-mask-${C}-to-color`, "transparent")])), w.push(l(`--tw-mask-${C}-${d}-position`, A))); return w } }); } V("mask-x-from", "from", { top: !1, right: !0, bottom: !1, left: !0 }), V("mask-x-to", "to", { top: !1, right: !0, bottom: !1, left: !0 }), V("mask-y-from", "from", { top: !0, right: !1, bottom: !0, left: !1 }), V("mask-y-to", "to", { top: !0, right: !1, bottom: !0, left: !1 }), V("mask-t-from", "from", { top: !0, right: !1, bottom: !1, left: !1 }), V("mask-t-to", "to", { top: !0, right: !1, bottom: !1, left: !1 }), V("mask-r-from", "from", { top: !1, right: !0, bottom: !1, left: !1 }), V("mask-r-to", "to", { top: !1, right: !0, bottom: !1, left: !1 }), V("mask-b-from", "from", { top: !1, right: !1, bottom: !0, left: !1 }), V("mask-b-to", "to", { top: !1, right: !1, bottom: !0, left: !1 }), V("mask-l-from", "from", { top: !1, right: !1, bottom: !1, left: !0 }), V("mask-l-to", "to", { top: !1, right: !1, bottom: !1, left: !0 }); let R = () => j([S("--tw-mask-linear-position", "0deg"), S("--tw-mask-linear-from-position", "0%"), S("--tw-mask-linear-to-position", "100%"), S("--tw-mask-linear-from-color", "black"), S("--tw-mask-linear-to-color", "transparent")]); o("mask-linear", { defaultValue: null, supportsNegative: !0, supportsFractions: !1, handleBareValue(n) { return E(n.value) ? `calc(1deg * ${n.value})` : null }, handleNegativeBareValue(n) { return E(n.value) ? `calc(1deg * -${n.value})` : null }, handle: n => [y(), R(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-linear", "linear-gradient(var(--tw-mask-linear-stops, var(--tw-mask-linear-position)))"), l("--tw-mask-linear-position", n)] }), i("mask-linear", () => [{ supportsNegative: !0, values: ["0", "1", "2", "3", "6", "12", "45", "90", "180"] }]), N("mask-linear-from", { color: n => [y(), R(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-linear-stops", "var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)"), l("--tw-mask-linear", "linear-gradient(var(--tw-mask-linear-stops))"), l("--tw-mask-linear-from-color", n)], position: n => [y(), R(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-linear-stops", "var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)"), l("--tw-mask-linear", "linear-gradient(var(--tw-mask-linear-stops))"), l("--tw-mask-linear-from-position", n)] }), N("mask-linear-to", { color: n => [y(), R(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-linear-stops", "var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)"), l("--tw-mask-linear", "linear-gradient(var(--tw-mask-linear-stops))"), l("--tw-mask-linear-to-color", n)], position: n => [y(), R(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-linear-stops", "var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)"), l("--tw-mask-linear", "linear-gradient(var(--tw-mask-linear-stops))"), l("--tw-mask-linear-to-position", n)] }); let D = () => j([S("--tw-mask-radial-from-position", "0%"), S("--tw-mask-radial-to-position", "100%"), S("--tw-mask-radial-from-color", "black"), S("--tw-mask-radial-to-color", "transparent"), S("--tw-mask-radial-shape", "ellipse"), S("--tw-mask-radial-size", "farthest-corner"), S("--tw-mask-radial-position", "center")]); e("mask-circle", [["--tw-mask-radial-shape", "circle"]]), e("mask-ellipse", [["--tw-mask-radial-shape", "ellipse"]]), e("mask-radial-closest-side", [["--tw-mask-radial-size", "closest-side"]]), e("mask-radial-farthest-side", [["--tw-mask-radial-size", "farthest-side"]]), e("mask-radial-closest-corner", [["--tw-mask-radial-size", "closest-corner"]]), e("mask-radial-farthest-corner", [["--tw-mask-radial-size", "farthest-corner"]]), e("mask-radial-at-top", [["--tw-mask-radial-position", "top"]]), e("mask-radial-at-top-left", [["--tw-mask-radial-position", "top left"]]), e("mask-radial-at-top-right", [["--tw-mask-radial-position", "top right"]]), e("mask-radial-at-bottom", [["--tw-mask-radial-position", "bottom"]]), e("mask-radial-at-bottom-left", [["--tw-mask-radial-position", "bottom left"]]), e("mask-radial-at-bottom-right", [["--tw-mask-radial-position", "bottom right"]]), e("mask-radial-at-left", [["--tw-mask-radial-position", "left"]]), e("mask-radial-at-right", [["--tw-mask-radial-position", "right"]]), e("mask-radial-at-center", [["--tw-mask-radial-position", "center"]]), o("mask-radial-at", { defaultValue: null, supportsNegative: !1, supportsFractions: !1, handle: n => [l("--tw-mask-radial-position", n)] }), o("mask-radial", { defaultValue: null, supportsNegative: !1, supportsFractions: !1, handle: n => [y(), D(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-radial", "radial-gradient(var(--tw-mask-radial-stops, var(--tw-mask-radial-size)))"), l("--tw-mask-radial-size", n)] }), N("mask-radial-from", { color: n => [y(), D(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-radial-stops", "var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)"), l("--tw-mask-radial", "radial-gradient(var(--tw-mask-radial-stops))"), l("--tw-mask-radial-from-color", n)], position: n => [y(), D(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-radial-stops", "var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)"), l("--tw-mask-radial", "radial-gradient(var(--tw-mask-radial-stops))"), l("--tw-mask-radial-from-position", n)] }), N("mask-radial-to", { color: n => [y(), D(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-radial-stops", "var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)"), l("--tw-mask-radial", "radial-gradient(var(--tw-mask-radial-stops))"), l("--tw-mask-radial-to-color", n)], position: n => [y(), D(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-radial-stops", "var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)"), l("--tw-mask-radial", "radial-gradient(var(--tw-mask-radial-stops))"), l("--tw-mask-radial-to-position", n)] }); let _ = () => j([S("--tw-mask-conic-position", "0deg"), S("--tw-mask-conic-from-position", "0%"), S("--tw-mask-conic-to-position", "100%"), S("--tw-mask-conic-from-color", "black"), S("--tw-mask-conic-to-color", "transparent")]); o("mask-conic", { defaultValue: null, supportsNegative: !0, supportsFractions: !1, handleBareValue(n) { return E(n.value) ? `calc(1deg * ${n.value})` : null }, handleNegativeBareValue(n) { return E(n.value) ? `calc(1deg * -${n.value})` : null }, handle: n => [y(), _(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-conic", "conic-gradient(var(--tw-mask-conic-stops, var(--tw-mask-conic-position)))"), l("--tw-mask-conic-position", n)] }), i("mask-conic", () => [{ supportsNegative: !0, values: ["0", "1", "2", "3", "6", "12", "45", "90", "180"] }]), N("mask-conic-from", { color: n => [y(), _(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-conic-stops", "from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)"), l("--tw-mask-conic", "conic-gradient(var(--tw-mask-conic-stops))"), l("--tw-mask-conic-from-color", n)], position: n => [y(), _(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-conic-stops", "from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)"), l("--tw-mask-conic", "conic-gradient(var(--tw-mask-conic-stops))"), l("--tw-mask-conic-from-position", n)] }), N("mask-conic-to", { color: n => [y(), _(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-conic-stops", "from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)"), l("--tw-mask-conic", "conic-gradient(var(--tw-mask-conic-stops))"), l("--tw-mask-conic-to-color", n)], position: n => [y(), _(), l("mask-image", "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"), l("mask-composite", "intersect"), l("--tw-mask-conic-stops", "from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)"), l("--tw-mask-conic", "conic-gradient(var(--tw-mask-conic-stops))"), l("--tw-mask-conic-to-position", n)] }), e("box-decoration-slice", [["-webkit-box-decoration-break", "slice"], ["box-decoration-break", "slice"]]), e("box-decoration-clone", [["-webkit-box-decoration-break", "clone"], ["box-decoration-break", "clone"]]), e("bg-clip-text", [["background-clip", "text"]]), e("bg-clip-border", [["background-clip", "border-box"]]), e("bg-clip-padding", [["background-clip", "padding-box"]]), e("bg-clip-content", [["background-clip", "content-box"]]), e("bg-origin-border", [["background-origin", "border-box"]]), e("bg-origin-padding", [["background-origin", "padding-box"]]), e("bg-origin-content", [["background-origin", "content-box"]]); for (let n of ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"]) e(`bg-blend-${n}`, [["background-blend-mode", n]]), e(`mix-blend-${n}`, [["mix-blend-mode", n]]); e("mix-blend-plus-darker", [["mix-blend-mode", "plus-darker"]]), e("mix-blend-plus-lighter", [["mix-blend-mode", "plus-lighter"]]), e("fill-none", [["fill", "none"]]), r.functional("fill", n => { if (!n.value) return; if (n.value.kind === "arbitrary") { let h = Z(n.value.value, n.modifier, t); return h === null ? void 0 : [l("fill", h)] } let d = te(n, t, ["--fill", "--color"]); if (d) return [l("fill", d)] }), i("fill", () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--fill", "--color"], modifiers: Array.from({ length: 21 }, (n, d) => `${d * 5}`) }]), e("stroke-none", [["stroke", "none"]]), r.functional("stroke", n => { if (n.value) { if (n.value.kind === "arbitrary") { let d = n.value.value; switch (n.value.dataType ?? Y(d, ["color", "number", "length", "percentage"])) { case "number": case "length": case "percentage": return n.modifier ? void 0 : [l("stroke-width", d)]; default: return d = Z(n.value.value, n.modifier, t), d === null ? void 0 : [l("stroke", d)] } } { let d = te(n, t, ["--stroke", "--color"]); if (d) return [l("stroke", d)] } { let d = t.resolve(n.value.value, ["--stroke-width"]); if (d) return [l("stroke-width", d)]; if (E(n.value.value)) return [l("stroke-width", n.value.value)] } } }), i("stroke", () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--stroke", "--color"], modifiers: Array.from({ length: 21 }, (n, d) => `${d * 5}`) }, { values: ["0", "1", "2", "3"], valueThemeKeys: ["--stroke-width"] }]), e("object-contain", [["object-fit", "contain"]]), e("object-cover", [["object-fit", "cover"]]), e("object-fill", [["object-fit", "fill"]]), e("object-none", [["object-fit", "none"]]), e("object-scale-down", [["object-fit", "scale-down"]]), e("object-top", [["object-position", "top"]]), e("object-top-left", [["object-position", "left top"]]), e("object-top-right", [["object-position", "right top"]]), e("object-bottom", [["object-position", "bottom"]]), e("object-bottom-left", [["object-position", "left bottom"]]), e("object-bottom-right", [["object-position", "right bottom"]]), e("object-left", [["object-position", "left"]]), e("object-right", [["object-position", "right"]]), e("object-center", [["object-position", "center"]]), o("object", { themeKeys: ["--object-position"], handle: n => [l("object-position", n)] }); for (let [n, d] of [["p", "padding"], ["px", "padding-inline"], ["py", "padding-block"], ["ps", "padding-inline-start"], ["pe", "padding-inline-end"], ["pt", "padding-top"], ["pr", "padding-right"], ["pb", "padding-bottom"], ["pl", "padding-left"]]) a(n, ["--padding", "--spacing"], h => [l(d, h)]); e("text-left", [["text-align", "left"]]), e("text-center", [["text-align", "center"]]), e("text-right", [["text-align", "right"]]), e("text-justify", [["text-align", "justify"]]), e("text-start", [["text-align", "start"]]), e("text-end", [["text-align", "end"]]), a("indent", ["--text-indent", "--spacing"], n => [l("text-indent", n)], { supportsNegative: !0 }), e("align-baseline", [["vertical-align", "baseline"]]), e("align-top", [["vertical-align", "top"]]), e("align-middle", [["vertical-align", "middle"]]), e("align-bottom", [["vertical-align", "bottom"]]), e("align-text-top", [["vertical-align", "text-top"]]), e("align-text-bottom", [["vertical-align", "text-bottom"]]), e("align-sub", [["vertical-align", "sub"]]), e("align-super", [["vertical-align", "super"]]), o("align", { themeKeys: [], handle: n => [l("vertical-align", n)] }), r.functional("font", n => { if (!(!n.value || n.modifier)) { if (n.value.kind === "arbitrary") { let d = n.value.value; switch (n.value.dataType ?? Y(d, ["number", "generic-name", "family-name"])) { case "generic-name": case "family-name": return [l("font-family", d)]; default: return [j([S("--tw-font-weight")]), l("--tw-font-weight", d), l("font-weight", d)] } } { let d = t.resolveWith(n.value.value, ["--font"], ["--font-feature-settings", "--font-variation-settings"]); if (d) { let [h, A = {}] = d; return [l("font-family", h), l("font-feature-settings", A["--font-feature-settings"]), l("font-variation-settings", A["--font-variation-settings"])] } } { let d = t.resolve(n.value.value, ["--font-weight"]); if (d) return [j([S("--tw-font-weight")]), l("--tw-font-weight", d), l("font-weight", d)] } } }), i("font", () => [{ values: [], valueThemeKeys: ["--font"] }, { values: [], valueThemeKeys: ["--font-weight"] }]), e("uppercase", [["text-transform", "uppercase"]]), e("lowercase", [["text-transform", "lowercase"]]), e("capitalize", [["text-transform", "capitalize"]]), e("normal-case", [["text-transform", "none"]]), e("italic", [["font-style", "italic"]]), e("not-italic", [["font-style", "normal"]]), e("underline", [["text-decoration-line", "underline"]]), e("overline", [["text-decoration-line", "overline"]]), e("line-through", [["text-decoration-line", "line-through"]]), e("no-underline", [["text-decoration-line", "none"]]), e("font-stretch-normal", [["font-stretch", "normal"]]), e("font-stretch-ultra-condensed", [["font-stretch", "ultra-condensed"]]), e("font-stretch-extra-condensed", [["font-stretch", "extra-condensed"]]), e("font-stretch-condensed", [["font-stretch", "condensed"]]), e("font-stretch-semi-condensed", [["font-stretch", "semi-condensed"]]), e("font-stretch-semi-expanded", [["font-stretch", "semi-expanded"]]), e("font-stretch-expanded", [["font-stretch", "expanded"]]), e("font-stretch-extra-expanded", [["font-stretch", "extra-expanded"]]), e("font-stretch-ultra-expanded", [["font-stretch", "ultra-expanded"]]), o("font-stretch", { handleBareValue: ({ value: n }) => { if (!n.endsWith("%")) return null; let d = Number(n.slice(0, -1)); return !E(d) || Number.isNaN(d) || d < 50 || d > 200 ? null : n }, handle: n => [l("font-stretch", n)] }), i("font-stretch", () => [{ values: ["50%", "75%", "90%", "95%", "100%", "105%", "110%", "125%", "150%", "200%"] }]), s("placeholder", { themeKeys: ["--background-color", "--color"], handle: n => [M("&::placeholder", [l("--tw-sort", "placeholder-color"), l("color", n)])] }), e("decoration-solid", [["text-decoration-style", "solid"]]), e("decoration-double", [["text-decoration-style", "double"]]), e("decoration-dotted", [["text-decoration-style", "dotted"]]), e("decoration-dashed", [["text-decoration-style", "dashed"]]), e("decoration-wavy", [["text-decoration-style", "wavy"]]), e("decoration-auto", [["text-decoration-thickness", "auto"]]), e("decoration-from-font", [["text-decoration-thickness", "from-font"]]), r.functional("decoration", n => { if (n.value) { if (n.value.kind === "arbitrary") { let d = n.value.value; switch (n.value.dataType ?? Y(d, ["color", "length", "percentage"])) { case "length": case "percentage": return n.modifier ? void 0 : [l("text-decoration-thickness", d)]; default: return d = Z(d, n.modifier, t), d === null ? void 0 : [l("text-decoration-color", d)] } } { let d = t.resolve(n.value.value, ["--text-decoration-thickness"]); if (d) return n.modifier ? void 0 : [l("text-decoration-thickness", d)]; if (E(n.value.value)) return n.modifier ? void 0 : [l("text-decoration-thickness", `${n.value.value}px`)] } { let d = te(n, t, ["--text-decoration-color", "--color"]); if (d) return [l("text-decoration-color", d)] } } }), i("decoration", () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--text-decoration-color", "--color"], modifiers: Array.from({ length: 21 }, (n, d) => `${d * 5}`) }, { values: ["0", "1", "2"], valueThemeKeys: ["--text-decoration-thickness"] }]), e("animate-none", [["animation", "none"]]), o("animate", { themeKeys: ["--animate"], handle: n => [l("animation", n)] }); { let n = ["var(--tw-blur,)", "var(--tw-brightness,)", "var(--tw-contrast,)", "var(--tw-grayscale,)", "var(--tw-hue-rotate,)", "var(--tw-invert,)", "var(--tw-saturate,)", "var(--tw-sepia,)", "var(--tw-drop-shadow,)"].join(" "), d = ["var(--tw-backdrop-blur,)", "var(--tw-backdrop-brightness,)", "var(--tw-backdrop-contrast,)", "var(--tw-backdrop-grayscale,)", "var(--tw-backdrop-hue-rotate,)", "var(--tw-backdrop-invert,)", "var(--tw-backdrop-opacity,)", "var(--tw-backdrop-saturate,)", "var(--tw-backdrop-sepia,)"].join(" "), h = () => j([S("--tw-blur"), S("--tw-brightness"), S("--tw-contrast"), S("--tw-grayscale"), S("--tw-hue-rotate"), S("--tw-invert"), S("--tw-opacity"), S("--tw-saturate"), S("--tw-sepia"), S("--tw-drop-shadow"), S("--tw-drop-shadow-color"), S("--tw-drop-shadow-alpha", "100%", "<percentage>"), S("--tw-drop-shadow-size")]), A = () => j([S("--tw-backdrop-blur"), S("--tw-backdrop-brightness"), S("--tw-backdrop-contrast"), S("--tw-backdrop-grayscale"), S("--tw-backdrop-hue-rotate"), S("--tw-backdrop-invert"), S("--tw-backdrop-opacity"), S("--tw-backdrop-saturate"), S("--tw-backdrop-sepia")]); r.functional("filter", w => { if (!w.modifier) { if (w.value === null) return [h(), l("filter", n)]; if (w.value.kind === "arbitrary") return [l("filter", w.value.value)]; switch (w.value.value) { case "none": return [l("filter", "none")] } } }), r.functional("backdrop-filter", w => { if (!w.modifier) { if (w.value === null) return [A(), l("-webkit-backdrop-filter", d), l("backdrop-filter", d)]; if (w.value.kind === "arbitrary") return [l("-webkit-backdrop-filter", w.value.value), l("backdrop-filter", w.value.value)]; switch (w.value.value) { case "none": return [l("-webkit-backdrop-filter", "none"), l("backdrop-filter", "none")] } } }), o("blur", { themeKeys: ["--blur"], handle: w => [h(), l("--tw-blur", `blur(${w})`), l("filter", n)] }), e("blur-none", [h, ["--tw-blur", " "], ["filter", n]]), o("backdrop-blur", { themeKeys: ["--backdrop-blur", "--blur"], handle: w => [A(), l("--tw-backdrop-blur", `blur(${w})`), l("-webkit-backdrop-filter", d), l("backdrop-filter", d)] }), e("backdrop-blur-none", [A, ["--tw-backdrop-blur", " "], ["-webkit-backdrop-filter", d], ["backdrop-filter", d]]), o("brightness", { themeKeys: ["--brightness"], handleBareValue: ({ value: w }) => E(w) ? `${w}%` : null, handle: w => [h(), l("--tw-brightness", `brightness(${w})`), l("filter", n)] }), o("backdrop-brightness", { themeKeys: ["--backdrop-brightness", "--brightness"], handleBareValue: ({ value: w }) => E(w) ? `${w}%` : null, handle: w => [A(), l("--tw-backdrop-brightness", `brightness(${w})`), l("-webkit-backdrop-filter", d), l("backdrop-filter", d)] }), i("brightness", () => [{ values: ["0", "50", "75", "90", "95", "100", "105", "110", "125", "150", "200"], valueThemeKeys: ["--brightness"] }]), i("backdrop-brightness", () => [{ values: ["0", "50", "75", "90", "95", "100", "105", "110", "125", "150", "200"], valueThemeKeys: ["--backdrop-brightness", "--brightness"] }]), o("contrast", { themeKeys: ["--contrast"], handleBareValue: ({ value: w }) => E(w) ? `${w}%` : null, handle: w => [h(), l("--tw-contrast", `contrast(${w})`), l("filter", n)] }), o("backdrop-contrast", { themeKeys: ["--backdrop-contrast", "--contrast"], handleBareValue: ({ value: w }) => E(w) ? `${w}%` : null, handle: w => [A(), l("--tw-backdrop-contrast", `contrast(${w})`), l("-webkit-backdrop-filter", d), l("backdrop-filter", d)] }), i("contrast", () => [{ values: ["0", "50", "75", "100", "125", "150", "200"], valueThemeKeys: ["--contrast"] }]), i("backdrop-contrast", () => [{ values: ["0", "50", "75", "100", "125", "150", "200"], valueThemeKeys: ["--backdrop-contrast", "--contrast"] }]), o("grayscale", { themeKeys: ["--grayscale"], handleBareValue: ({ value: w }) => E(w) ? `${w}%` : null, defaultValue: "100%", handle: w => [h(), l("--tw-grayscale", `grayscale(${w})`), l("filter", n)] }), o("backdrop-grayscale", { themeKeys: ["--backdrop-grayscale", "--grayscale"], handleBareValue: ({ value: w }) => E(w) ? `${w}%` : null, defaultValue: "100%", handle: w => [A(), l("--tw-backdrop-grayscale", `grayscale(${w})`), l("-webkit-backdrop-filter", d), l("backdrop-filter", d)] }), i("grayscale", () => [{ values: ["0", "25", "50", "75", "100"], valueThemeKeys: ["--grayscale"], hasDefaultValue: !0 }]), i("backdrop-grayscale", () => [{ values: ["0", "25", "50", "75", "100"], valueThemeKeys: ["--backdrop-grayscale", "--grayscale"], hasDefaultValue: !0 }]), o("hue-rotate", { supportsNegative: !0, themeKeys: ["--hue-rotate"], handleBareValue: ({ value: w }) => E(w) ? `${w}deg` : null, handle: w => [h(), l("--tw-hue-rotate", `hue-rotate(${w})`), l("filter", n)] }), o("backdrop-hue-rotate", { supportsNegative: !0, themeKeys: ["--backdrop-hue-rotate", "--hue-rotate"], handleBareValue: ({ value: w }) => E(w) ? `${w}deg` : null, handle: w => [A(), l("--tw-backdrop-hue-rotate", `hue-rotate(${w})`), l("-webkit-backdrop-filter", d), l("backdrop-filter", d)] }), i("hue-rotate", () => [{ values: ["0", "15", "30", "60", "90", "180"], valueThemeKeys: ["--hue-rotate"] }]), i("backdrop-hue-rotate", () => [{ values: ["0", "15", "30", "60", "90", "180"], valueThemeKeys: ["--backdrop-hue-rotate", "--hue-rotate"] }]), o("invert", { themeKeys: ["--invert"], handleBareValue: ({ value: w }) => E(w) ? `${w}%` : null, defaultValue: "100%", handle: w => [h(), l("--tw-invert", `invert(${w})`), l("filter", n)] }), o("backdrop-invert", { themeKeys: ["--backdrop-invert", "--invert"], handleBareValue: ({ value: w }) => E(w) ? `${w}%` : null, defaultValue: "100%", handle: w => [A(), l("--tw-backdrop-invert", `invert(${w})`), l("-webkit-backdrop-filter", d), l("backdrop-filter", d)] }), i("invert", () => [{ values: ["0", "25", "50", "75", "100"], valueThemeKeys: ["--invert"], hasDefaultValue: !0 }]), i("backdrop-invert", () => [{ values: ["0", "25", "50", "75", "100"], valueThemeKeys: ["--backdrop-invert", "--invert"], hasDefaultValue: !0 }]), o("saturate", { themeKeys: ["--saturate"], handleBareValue: ({ value: w }) => E(w) ? `${w}%` : null, handle: w => [h(), l("--tw-saturate", `saturate(${w})`), l("filter", n)] }), o("backdrop-saturate", { themeKeys: ["--backdrop-saturate", "--saturate"], handleBareValue: ({ value: w }) => E(w) ? `${w}%` : null, handle: w => [A(), l("--tw-backdrop-saturate", `saturate(${w})`), l("-webkit-backdrop-filter", d), l("backdrop-filter", d)] }), i("saturate", () => [{ values: ["0", "50", "100", "150", "200"], valueThemeKeys: ["--saturate"] }]), i("backdrop-saturate", () => [{ values: ["0", "50", "100", "150", "200"], valueThemeKeys: ["--backdrop-saturate", "--saturate"] }]), o("sepia", { themeKeys: ["--sepia"], handleBareValue: ({ value: w }) => E(w) ? `${w}%` : null, defaultValue: "100%", handle: w => [h(), l("--tw-sepia", `sepia(${w})`), l("filter", n)] }), o("backdrop-sepia", { themeKeys: ["--backdrop-sepia", "--sepia"], handleBareValue: ({ value: w }) => E(w) ? `${w}%` : null, defaultValue: "100%", handle: w => [A(), l("--tw-backdrop-sepia", `sepia(${w})`), l("-webkit-backdrop-filter", d), l("backdrop-filter", d)] }), i("sepia", () => [{ values: ["0", "50", "100"], valueThemeKeys: ["--sepia"], hasDefaultValue: !0 }]), i("backdrop-sepia", () => [{ values: ["0", "50", "100"], valueThemeKeys: ["--backdrop-sepia", "--sepia"], hasDefaultValue: !0 }]), e("drop-shadow-none", [h, ["--tw-drop-shadow", " "], ["filter", n]]), r.functional("drop-shadow", w => { let C; if (w.modifier && (w.modifier.kind === "arbitrary" ? C = w.modifier.value : E(w.modifier.value) && (C = `${w.modifier.value}%`)), !w.value) { let P = t.get(["--drop-shadow"]), $ = t.resolve(null, ["--drop-shadow"]); return P === null || $ === null ? void 0 : [h(), l("--tw-drop-shadow-alpha", C), ...lt("--tw-drop-shadow-size", P, C, T => `var(--tw-drop-shadow-color, ${T})`), l("--tw-drop-shadow", z($, ",").map(T => `drop-shadow(${T})`).join(" ")), l("filter", n)] } if (w.value.kind === "arbitrary") { let P = w.value.value; switch (w.value.dataType ?? Y(P, ["color"])) { case "color": return P = Z(P, w.modifier, t), P === null ? void 0 : [h(), l("--tw-drop-shadow-color", Q(P, "var(--tw-drop-shadow-alpha)")), l("--tw-drop-shadow", "var(--tw-drop-shadow-size)")]; default: return w.modifier && !C ? void 0 : [h(), l("--tw-drop-shadow-alpha", C), ...lt("--tw-drop-shadow-size", P, C, T => `var(--tw-drop-shadow-color, ${T})`), l("--tw-drop-shadow", "var(--tw-drop-shadow-size)"), l("filter", n)] } } { let P = t.get([`--drop-shadow-${w.value.value}`]), $ = t.resolve(w.value.value, ["--drop-shadow"]); if (P && $) return w.modifier && !C ? void 0 : C ? [h(), l("--tw-drop-shadow-alpha", C), ...lt("--tw-drop-shadow-size", P, C, T => `var(--tw-drop-shadow-color, ${T})`), l("--tw-drop-shadow", "var(--tw-drop-shadow-size)"), l("filter", n)] : [h(), l("--tw-drop-shadow-alpha", C), ...lt("--tw-drop-shadow-size", P, C, T => `var(--tw-drop-shadow-color, ${T})`), l("--tw-drop-shadow", z($, ",").map(T => `drop-shadow(${T})`).join(" ")), l("filter", n)] } { let P = te(w, t, ["--drop-shadow-color", "--color"]); if (P) return P === "inherit" ? [h(), l("--tw-drop-shadow-color", "inherit"), l("--tw-drop-shadow", "var(--tw-drop-shadow-size)")] : [h(), l("--tw-drop-shadow-color", Q(P, "var(--tw-drop-shadow-alpha)")), l("--tw-drop-shadow", "var(--tw-drop-shadow-size)")] } }), i("drop-shadow", () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--drop-shadow-color", "--color"], modifiers: Array.from({ length: 21 }, (w, C) => `${C * 5}`) }, { valueThemeKeys: ["--drop-shadow"] }]), o("backdrop-opacity", { themeKeys: ["--backdrop-opacity", "--opacity"], handleBareValue: ({ value: w }) => nt(w) ? `${w}%` : null, handle: w => [A(), l("--tw-backdrop-opacity", `opacity(${w})`), l("-webkit-backdrop-filter", d), l("backdrop-filter", d)] }), i("backdrop-opacity", () => [{ values: Array.from({ length: 21 }, (w, C) => `${C * 5}`), valueThemeKeys: ["--backdrop-opacity", "--opacity"] }]); } { let n = `var(--tw-ease, ${t.resolve(null, ["--default-transition-timing-function"]) ?? "ease"})`, d = `var(--tw-duration, ${t.resolve(null, ["--default-transition-duration"]) ?? "0s"})`; e("transition-none", [["transition-property", "none"]]), e("transition-all", [["transition-property", "all"], ["transition-timing-function", n], ["transition-duration", d]]), e("transition-colors", [["transition-property", "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to"], ["transition-timing-function", n], ["transition-duration", d]]), e("transition-opacity", [["transition-property", "opacity"], ["transition-timing-function", n], ["transition-duration", d]]), e("transition-shadow", [["transition-property", "box-shadow"], ["transition-timing-function", n], ["transition-duration", d]]), e("transition-transform", [["transition-property", "transform, translate, scale, rotate"], ["transition-timing-function", n], ["transition-duration", d]]), o("transition", { defaultValue: "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, display, visibility, content-visibility, overlay, pointer-events", themeKeys: ["--transition-property"], handle: h => [l("transition-property", h), l("transition-timing-function", n), l("transition-duration", d)] }), e("transition-discrete", [["transition-behavior", "allow-discrete"]]), e("transition-normal", [["transition-behavior", "normal"]]), o("delay", { handleBareValue: ({ value: h }) => E(h) ? `${h}ms` : null, themeKeys: ["--transition-delay"], handle: h => [l("transition-delay", h)] }); { let h = () => j([S("--tw-duration")]); e("duration-initial", [h, ["--tw-duration", "initial"]]), r.functional("duration", A => { if (A.modifier || !A.value) return; let w = null; if (A.value.kind === "arbitrary" ? w = A.value.value : (w = t.resolve(A.value.fraction ?? A.value.value, ["--transition-duration"]), w === null && E(A.value.value) && (w = `${A.value.value}ms`)), w !== null) return [h(), l("--tw-duration", w), l("transition-duration", w)] }); } i("delay", () => [{ values: ["75", "100", "150", "200", "300", "500", "700", "1000"], valueThemeKeys: ["--transition-delay"] }]), i("duration", () => [{ values: ["75", "100", "150", "200", "300", "500", "700", "1000"], valueThemeKeys: ["--transition-duration"] }]); } { let n = () => j([S("--tw-ease")]); e("ease-initial", [n, ["--tw-ease", "initial"]]), e("ease-linear", [n, ["--tw-ease", "linear"], ["transition-timing-function", "linear"]]), o("ease", { themeKeys: ["--ease"], handle: d => [n(), l("--tw-ease", d), l("transition-timing-function", d)] }); } e("will-change-auto", [["will-change", "auto"]]), e("will-change-scroll", [["will-change", "scroll-position"]]), e("will-change-contents", [["will-change", "contents"]]), e("will-change-transform", [["will-change", "transform"]]), o("will-change", { themeKeys: [], handle: n => [l("will-change", n)] }), e("content-none", [["--tw-content", "none"], ["content", "none"]]), o("content", { themeKeys: [], handle: n => [j([S("--tw-content", '""')]), l("--tw-content", n), l("content", "var(--tw-content)")] }); { let n = "var(--tw-contain-size,) var(--tw-contain-layout,) var(--tw-contain-paint,) var(--tw-contain-style,)", d = () => j([S("--tw-contain-size"), S("--tw-contain-layout"), S("--tw-contain-paint"), S("--tw-contain-style")]); e("contain-none", [["contain", "none"]]), e("contain-content", [["contain", "content"]]), e("contain-strict", [["contain", "strict"]]), e("contain-size", [d, ["--tw-contain-size", "size"], ["contain", n]]), e("contain-inline-size", [d, ["--tw-contain-size", "inline-size"], ["contain", n]]), e("contain-layout", [d, ["--tw-contain-layout", "layout"], ["contain", n]]), e("contain-paint", [d, ["--tw-contain-paint", "paint"], ["contain", n]]), e("contain-style", [d, ["--tw-contain-style", "style"], ["contain", n]]), o("contain", { themeKeys: [], handle: h => [l("contain", h)] }); } e("forced-color-adjust-none", [["forced-color-adjust", "none"]]), e("forced-color-adjust-auto", [["forced-color-adjust", "auto"]]), e("leading-none", [() => j([S("--tw-leading")]), ["--tw-leading", "1"], ["line-height", "1"]]), a("leading", ["--leading", "--spacing"], n => [j([S("--tw-leading")]), l("--tw-leading", n), l("line-height", n)]), o("tracking", { supportsNegative: !0, themeKeys: ["--tracking"], handle: n => [j([S("--tw-tracking")]), l("--tw-tracking", n), l("letter-spacing", n)] }), e("antialiased", [["-webkit-font-smoothing", "antialiased"], ["-moz-osx-font-smoothing", "grayscale"]]), e("subpixel-antialiased", [["-webkit-font-smoothing", "auto"], ["-moz-osx-font-smoothing", "auto"]]); { let n = "var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)", d = () => j([S("--tw-ordinal"), S("--tw-slashed-zero"), S("--tw-numeric-figure"), S("--tw-numeric-spacing"), S("--tw-numeric-fraction")]); e("normal-nums", [["font-variant-numeric", "normal"]]), e("ordinal", [d, ["--tw-ordinal", "ordinal"], ["font-variant-numeric", n]]), e("slashed-zero", [d, ["--tw-slashed-zero", "slashed-zero"], ["font-variant-numeric", n]]), e("lining-nums", [d, ["--tw-numeric-figure", "lining-nums"], ["font-variant-numeric", n]]), e("oldstyle-nums", [d, ["--tw-numeric-figure", "oldstyle-nums"], ["font-variant-numeric", n]]), e("proportional-nums", [d, ["--tw-numeric-spacing", "proportional-nums"], ["font-variant-numeric", n]]), e("tabular-nums", [d, ["--tw-numeric-spacing", "tabular-nums"], ["font-variant-numeric", n]]), e("diagonal-fractions", [d, ["--tw-numeric-fraction", "diagonal-fractions"], ["font-variant-numeric", n]]), e("stacked-fractions", [d, ["--tw-numeric-fraction", "stacked-fractions"], ["font-variant-numeric", n]]); } { let n = () => j([S("--tw-outline-style", "solid")]); r.static("outline-hidden", () => [l("--tw-outline-style", "none"), l("outline-style", "none"), F("@media", "(forced-colors: active)", [l("outline", "2px solid transparent"), l("outline-offset", "2px")])]), e("outline-none", [["--tw-outline-style", "none"], ["outline-style", "none"]]), e("outline-solid", [["--tw-outline-style", "solid"], ["outline-style", "solid"]]), e("outline-dashed", [["--tw-outline-style", "dashed"], ["outline-style", "dashed"]]), e("outline-dotted", [["--tw-outline-style", "dotted"], ["outline-style", "dotted"]]), e("outline-double", [["--tw-outline-style", "double"], ["outline-style", "double"]]), r.functional("outline", d => { if (d.value === null) { if (d.modifier) return; let h = t.get(["--default-outline-width"]) ?? "1px"; return [n(), l("outline-style", "var(--tw-outline-style)"), l("outline-width", h)] } if (d.value.kind === "arbitrary") { let h = d.value.value; switch (d.value.dataType ?? Y(h, ["color", "length", "number", "percentage"])) { case "length": case "number": case "percentage": return d.modifier ? void 0 : [n(), l("outline-style", "var(--tw-outline-style)"), l("outline-width", h)]; default: return h = Z(h, d.modifier, t), h === null ? void 0 : [l("outline-color", h)] } } { let h = te(d, t, ["--outline-color", "--color"]); if (h) return [l("outline-color", h)] } { if (d.modifier) return; let h = t.resolve(d.value.value, ["--outline-width"]); if (h) return [n(), l("outline-style", "var(--tw-outline-style)"), l("outline-width", h)]; if (E(d.value.value)) return [n(), l("outline-style", "var(--tw-outline-style)"), l("outline-width", `${d.value.value}px`)] } }), i("outline", () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--outline-color", "--color"], modifiers: Array.from({ length: 21 }, (d, h) => `${h * 5}`), hasDefaultValue: !0 }, { values: ["0", "1", "2", "4", "8"], valueThemeKeys: ["--outline-width"] }]), o("outline-offset", { supportsNegative: !0, themeKeys: ["--outline-offset"], handleBareValue: ({ value: d }) => E(d) ? `${d}px` : null, handle: d => [l("outline-offset", d)] }), i("outline-offset", () => [{ supportsNegative: !0, values: ["0", "1", "2", "4", "8"], valueThemeKeys: ["--outline-offset"] }]); } o("opacity", { themeKeys: ["--opacity"], handleBareValue: ({ value: n }) => nt(n) ? `${n}%` : null, handle: n => [l("opacity", n)] }), i("opacity", () => [{ values: Array.from({ length: 21 }, (n, d) => `${d * 5}`), valueThemeKeys: ["--opacity"] }]), e("underline-offset-auto", [["text-underline-offset", "auto"]]), o("underline-offset", { supportsNegative: !0, themeKeys: ["--text-underline-offset"], handleBareValue: ({ value: n }) => E(n) ? `${n}px` : null, handle: n => [l("text-underline-offset", n)] }), i("underline-offset", () => [{ supportsNegative: !0, values: ["0", "1", "2", "4", "8"], valueThemeKeys: ["--text-underline-offset"] }]), r.functional("text", n => { if (n.value) { if (n.value.kind === "arbitrary") { let d = n.value.value; switch (n.value.dataType ?? Y(d, ["color", "length", "percentage", "absolute-size", "relative-size"])) { case "size": case "length": case "percentage": case "absolute-size": case "relative-size": { if (n.modifier) { let A = n.modifier.kind === "arbitrary" ? n.modifier.value : t.resolve(n.modifier.value, ["--leading"]); if (!A && xe(n.modifier.value)) { let w = t.resolve(null, ["--spacing"]); if (!w) return null; A = `calc(${w} * ${n.modifier.value})`; } return !A && n.modifier.value === "none" && (A = "1"), A ? [l("font-size", d), l("line-height", A)] : null } return [l("font-size", d)] } default: return d = Z(d, n.modifier, t), d === null ? void 0 : [l("color", d)] } } { let d = te(n, t, ["--text-color", "--color"]); if (d) return [l("color", d)] } { let d = t.resolveWith(n.value.value, ["--text"], ["--line-height", "--letter-spacing", "--font-weight"]); if (d) { let [h, A = {}] = Array.isArray(d) ? d : [d]; if (n.modifier) { let w = n.modifier.kind === "arbitrary" ? n.modifier.value : t.resolve(n.modifier.value, ["--leading"]); if (!w && xe(n.modifier.value)) { let P = t.resolve(null, ["--spacing"]); if (!P) return null; w = `calc(${P} * ${n.modifier.value})`; } if (!w && n.modifier.value === "none" && (w = "1"), !w) return null; let C = [l("font-size", h)]; return w && C.push(l("line-height", w)), C } return typeof A == "string" ? [l("font-size", h), l("line-height", A)] : [l("font-size", h), l("line-height", A["--line-height"] ? `var(--tw-leading, ${A["--line-height"]})` : void 0), l("letter-spacing", A["--letter-spacing"] ? `var(--tw-tracking, ${A["--letter-spacing"]})` : void 0), l("font-weight", A["--font-weight"] ? `var(--tw-font-weight, ${A["--font-weight"]})` : void 0)] } } } }), i("text", () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--text-color", "--color"], modifiers: Array.from({ length: 21 }, (n, d) => `${d * 5}`) }, { values: [], valueThemeKeys: ["--text"], modifiers: [], modifierThemeKeys: ["--leading"] }]); let L = () => j([S("--tw-text-shadow-color"), S("--tw-text-shadow-alpha", "100%", "<percentage>")]); e("text-shadow-initial", [L, ["--tw-text-shadow-color", "initial"]]), r.functional("text-shadow", n => { let d; if (n.modifier && (n.modifier.kind === "arbitrary" ? d = n.modifier.value : E(n.modifier.value) && (d = `${n.modifier.value}%`)), !n.value) { let h = t.get(["--text-shadow"]); return h === null ? void 0 : [L(), l("--tw-text-shadow-alpha", d), ...pe("text-shadow", h, d, A => `var(--tw-text-shadow-color, ${A})`)] } if (n.value.kind === "arbitrary") { let h = n.value.value; switch (n.value.dataType ?? Y(h, ["color"])) { case "color": return h = Z(h, n.modifier, t), h === null ? void 0 : [L(), l("--tw-text-shadow-color", Q(h, "var(--tw-text-shadow-alpha)"))]; default: return [L(), l("--tw-text-shadow-alpha", d), ...pe("text-shadow", h, d, w => `var(--tw-text-shadow-color, ${w})`)] } } switch (n.value.value) { case "none": return n.modifier ? void 0 : [L(), l("text-shadow", "none")]; case "inherit": return n.modifier ? void 0 : [L(), l("--tw-text-shadow-color", "inherit")] }{ let h = t.get([`--text-shadow-${n.value.value}`]); if (h) return [L(), l("--tw-text-shadow-alpha", d), ...pe("text-shadow", h, d, A => `var(--tw-text-shadow-color, ${A})`)] } { let h = te(n, t, ["--text-shadow-color", "--color"]); if (h) return [L(), l("--tw-text-shadow-color", Q(h, "var(--tw-text-shadow-alpha)"))] } }), i("text-shadow", () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--text-shadow-color", "--color"], modifiers: Array.from({ length: 21 }, (n, d) => `${d * 5}`) }, { values: ["none"] }, { valueThemeKeys: ["--text-shadow"], modifiers: Array.from({ length: 21 }, (n, d) => `${d * 5}`), hasDefaultValue: t.get(["--text-shadow"]) !== null }]); { let w = function ($) { return `var(--tw-ring-inset,) 0 0 0 calc(${$} + var(--tw-ring-offset-width)) var(--tw-ring-color, ${A})` }, C = function ($) { return `inset 0 0 0 ${$} var(--tw-inset-ring-color, currentcolor)` }; let n = ["var(--tw-inset-shadow)", "var(--tw-inset-ring-shadow)", "var(--tw-ring-offset-shadow)", "var(--tw-ring-shadow)", "var(--tw-shadow)"].join(", "), d = "0 0 #0000", h = () => j([S("--tw-shadow", d), S("--tw-shadow-color"), S("--tw-shadow-alpha", "100%", "<percentage>"), S("--tw-inset-shadow", d), S("--tw-inset-shadow-color"), S("--tw-inset-shadow-alpha", "100%", "<percentage>"), S("--tw-ring-color"), S("--tw-ring-shadow", d), S("--tw-inset-ring-color"), S("--tw-inset-ring-shadow", d), S("--tw-ring-inset"), S("--tw-ring-offset-width", "0px", "<length>"), S("--tw-ring-offset-color", "#fff"), S("--tw-ring-offset-shadow", d)]); e("shadow-initial", [h, ["--tw-shadow-color", "initial"]]), r.functional("shadow", $ => { let T; if ($.modifier && ($.modifier.kind === "arbitrary" ? T = $.modifier.value : E($.modifier.value) && (T = `${$.modifier.value}%`)), !$.value) { let K = t.get(["--shadow"]); return K === null ? void 0 : [h(), l("--tw-shadow-alpha", T), ...pe("--tw-shadow", K, T, se => `var(--tw-shadow-color, ${se})`), l("box-shadow", n)] } if ($.value.kind === "arbitrary") { let K = $.value.value; switch ($.value.dataType ?? Y(K, ["color"])) { case "color": return K = Z(K, $.modifier, t), K === null ? void 0 : [h(), l("--tw-shadow-color", Q(K, "var(--tw-shadow-alpha)"))]; default: return [h(), l("--tw-shadow-alpha", T), ...pe("--tw-shadow", K, T, bt => `var(--tw-shadow-color, ${bt})`), l("box-shadow", n)] } } switch ($.value.value) { case "none": return $.modifier ? void 0 : [h(), l("--tw-shadow", d), l("box-shadow", n)]; case "inherit": return $.modifier ? void 0 : [h(), l("--tw-shadow-color", "inherit")] }{ let K = t.get([`--shadow-${$.value.value}`]); if (K) return [h(), l("--tw-shadow-alpha", T), ...pe("--tw-shadow", K, T, se => `var(--tw-shadow-color, ${se})`), l("box-shadow", n)] } { let K = te($, t, ["--box-shadow-color", "--color"]); if (K) return [h(), l("--tw-shadow-color", Q(K, "var(--tw-shadow-alpha)"))] } }), i("shadow", () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--box-shadow-color", "--color"], modifiers: Array.from({ length: 21 }, ($, T) => `${T * 5}`) }, { values: ["none"] }, { valueThemeKeys: ["--shadow"], modifiers: Array.from({ length: 21 }, ($, T) => `${T * 5}`), hasDefaultValue: t.get(["--shadow"]) !== null }]), e("inset-shadow-initial", [h, ["--tw-inset-shadow-color", "initial"]]), r.functional("inset-shadow", $ => { let T; if ($.modifier && ($.modifier.kind === "arbitrary" ? T = $.modifier.value : E($.modifier.value) && (T = `${$.modifier.value}%`)), !$.value) { let K = t.get(["--inset-shadow"]); return K === null ? void 0 : [h(), l("--tw-inset-shadow-alpha", T), ...pe("--tw-inset-shadow", K, T, se => `var(--tw-inset-shadow-color, ${se})`), l("box-shadow", n)] } if ($.value.kind === "arbitrary") { let K = $.value.value; switch ($.value.dataType ?? Y(K, ["color"])) { case "color": return K = Z(K, $.modifier, t), K === null ? void 0 : [h(), l("--tw-inset-shadow-color", Q(K, "var(--tw-inset-shadow-alpha)"))]; default: return [h(), l("--tw-inset-shadow-alpha", T), ...pe("--tw-inset-shadow", K, T, bt => `var(--tw-inset-shadow-color, ${bt})`, "inset "), l("box-shadow", n)] } } switch ($.value.value) { case "none": return $.modifier ? void 0 : [h(), l("--tw-inset-shadow", d), l("box-shadow", n)]; case "inherit": return $.modifier ? void 0 : [h(), l("--tw-inset-shadow-color", "inherit")] }{ let K = t.get([`--inset-shadow-${$.value.value}`]); if (K) return [h(), l("--tw-inset-shadow-alpha", T), ...pe("--tw-inset-shadow", K, T, se => `var(--tw-inset-shadow-color, ${se})`), l("box-shadow", n)] } { let K = te($, t, ["--box-shadow-color", "--color"]); if (K) return [h(), l("--tw-inset-shadow-color", Q(K, "var(--tw-inset-shadow-alpha)"))] } }), i("inset-shadow", () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--box-shadow-color", "--color"], modifiers: Array.from({ length: 21 }, ($, T) => `${T * 5}`) }, { values: ["none"] }, { valueThemeKeys: ["--inset-shadow"], modifiers: Array.from({ length: 21 }, ($, T) => `${T * 5}`), hasDefaultValue: t.get(["--inset-shadow"]) !== null }]), e("ring-inset", [h, ["--tw-ring-inset", "inset"]]); let A = t.get(["--default-ring-color"]) ?? "currentcolor"; r.functional("ring", $ => { if (!$.value) { if ($.modifier) return; let T = t.get(["--default-ring-width"]) ?? "1px"; return [h(), l("--tw-ring-shadow", w(T)), l("box-shadow", n)] } if ($.value.kind === "arbitrary") { let T = $.value.value; switch ($.value.dataType ?? Y(T, ["color", "length"])) { case "length": return $.modifier ? void 0 : [h(), l("--tw-ring-shadow", w(T)), l("box-shadow", n)]; default: return T = Z(T, $.modifier, t), T === null ? void 0 : [l("--tw-ring-color", T)] } } { let T = te($, t, ["--ring-color", "--color"]); if (T) return [l("--tw-ring-color", T)] } { if ($.modifier) return; let T = t.resolve($.value.value, ["--ring-width"]); if (T === null && E($.value.value) && (T = `${$.value.value}px`), T) return [h(), l("--tw-ring-shadow", w(T)), l("box-shadow", n)] } }), i("ring", () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--ring-color", "--color"], modifiers: Array.from({ length: 21 }, ($, T) => `${T * 5}`) }, { values: ["0", "1", "2", "4", "8"], valueThemeKeys: ["--ring-width"], hasDefaultValue: !0 }]), r.functional("inset-ring", $ => { if (!$.value) return $.modifier ? void 0 : [h(), l("--tw-inset-ring-shadow", C("1px")), l("box-shadow", n)]; if ($.value.kind === "arbitrary") { let T = $.value.value; switch ($.value.dataType ?? Y(T, ["color", "length"])) { case "length": return $.modifier ? void 0 : [h(), l("--tw-inset-ring-shadow", C(T)), l("box-shadow", n)]; default: return T = Z(T, $.modifier, t), T === null ? void 0 : [l("--tw-inset-ring-color", T)] } } { let T = te($, t, ["--ring-color", "--color"]); if (T) return [l("--tw-inset-ring-color", T)] } { if ($.modifier) return; let T = t.resolve($.value.value, ["--ring-width"]); if (T === null && E($.value.value) && (T = `${$.value.value}px`), T) return [h(), l("--tw-inset-ring-shadow", C(T)), l("box-shadow", n)] } }), i("inset-ring", () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--ring-color", "--color"], modifiers: Array.from({ length: 21 }, ($, T) => `${T * 5}`) }, { values: ["0", "1", "2", "4", "8"], valueThemeKeys: ["--ring-width"], hasDefaultValue: !0 }]); let P = "var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)"; r.functional("ring-offset", $ => { if ($.value) { if ($.value.kind === "arbitrary") { let T = $.value.value; switch ($.value.dataType ?? Y(T, ["color", "length"])) { case "length": return $.modifier ? void 0 : [l("--tw-ring-offset-width", T), l("--tw-ring-offset-shadow", P)]; default: return T = Z(T, $.modifier, t), T === null ? void 0 : [l("--tw-ring-offset-color", T)] } } { let T = t.resolve($.value.value, ["--ring-offset-width"]); if (T) return $.modifier ? void 0 : [l("--tw-ring-offset-width", T), l("--tw-ring-offset-shadow", P)]; if (E($.value.value)) return $.modifier ? void 0 : [l("--tw-ring-offset-width", `${$.value.value}px`), l("--tw-ring-offset-shadow", P)] } { let T = te($, t, ["--ring-offset-color", "--color"]); if (T) return [l("--tw-ring-offset-color", T)] } } }); } return i("ring-offset", () => [{ values: ["current", "inherit", "transparent"], valueThemeKeys: ["--ring-offset-color", "--color"], modifiers: Array.from({ length: 21 }, (n, d) => `${d * 5}`) }, { values: ["0", "1", "2", "4", "8"], valueThemeKeys: ["--ring-offset-width"] }]), r.functional("@container", n => { let d = null; if (n.value === null ? d = "inline-size" : n.value.kind === "arbitrary" ? d = n.value.value : n.value.kind === "named" && n.value.value === "normal" && (d = "normal"), d !== null) return n.modifier ? [l("container-type", d), l("container-name", n.modifier.value)] : [l("container-type", d)] }), i("@container", () => [{ values: ["normal"], valueThemeKeys: [], hasDefaultValue: !0 }]), r } var Kt = ["number", "integer", "ratio", "percentage"]; function Pr(t) {
  	    let r = t.params; return Eo.test(r) ? i => {
  	      let e = { "--value": { usedSpacingInteger: !1, usedSpacingNumber: !1, themeKeys: new Set, literals: new Set }, "--modifier": { usedSpacingInteger: !1, usedSpacingNumber: !1, themeKeys: new Set, literals: new Set } }; U(t.nodes, o => {
  	        if (o.kind !== "declaration" || !o.value || !o.value.includes("--value(") && !o.value.includes("--modifier(")) return; let s = W(o.value); ee(s, a => {
  	          if (a.kind !== "function") return; if (a.value === "--spacing" && !(e["--modifier"].usedSpacingNumber && e["--value"].usedSpacingNumber)) return ee(a.nodes, u => { if (u.kind !== "function" || u.value !== "--value" && u.value !== "--modifier") return; let c = u.value; for (let g of u.nodes) if (g.kind === "word") { if (g.value === "integer") e[c].usedSpacingInteger ||= !0; else if (g.value === "number" && (e[c].usedSpacingNumber ||= !0, e["--modifier"].usedSpacingNumber && e["--value"].usedSpacingNumber)) return 2 } }), 0; if (a.value !== "--value" && a.value !== "--modifier") return; let f = z(J(a.nodes), ","); for (let [u, c] of f.entries()) c = c.replace(/\\\*/g, "*"), c = c.replace(/--(.*?)\s--(.*?)/g, "--$1-*--$2"), c = c.replace(/\s+/g, ""), c = c.replace(/(-\*){2,}/g, "-*"), c[0] === "-" && c[1] === "-" && !c.includes("-*") && (c += "-*"), f[u] = c; a.nodes = W(f.join(",")); for (let u of a.nodes) if (u.kind === "word" && (u.value[0] === '"' || u.value[0] === "'") && u.value[0] === u.value[u.value.length - 1]) { let c = u.value.slice(1, -1); e[a.value].literals.add(c); } else if (u.kind === "word" && u.value[0] === "-" && u.value[1] === "-") { let c = u.value.replace(/-\*.*$/g, ""); e[a.value].themeKeys.add(c); } else if (u.kind === "word" && !(u.value[0] === "[" && u.value[u.value.length - 1] === "]") && !Kt.includes(u.value)) {
  	            console.warn(`Unsupported bare value data type: "${u.value}".
Only valid data types are: ${Kt.map(x => `"${x}"`).join(", ")}.
`); let c = u.value, g = structuredClone(a), p = "\xB6"; ee(g.nodes, (x, { replaceWith: y }) => { x.kind === "word" && x.value === c && y({ kind: "word", value: p }); }); let m = "^".repeat(J([u]).length), v = J([g]).indexOf(p), k = ["```css", J([a]), " ".repeat(v) + m, "```"].join(`
`); console.warn(k);
  	          }
  	        }), o.value = J(s);
  	      }), i.utilities.functional(r.slice(0, -2), o => { let s = structuredClone(t), a = o.value, f = o.modifier; if (a === null) return; let u = !1, c = !1, g = !1, p = !1, m = new Map, v = !1; if (U([s], (k, { parent: x, replaceWith: y }) => { if (x?.kind !== "rule" && x?.kind !== "at-rule" || k.kind !== "declaration" || !k.value) return; let N = W(k.value); (ee(N, (V, { replaceWith: R }) => { if (V.kind === "function") { if (V.value === "--value") { u = !0; let D = Vr(a, V, i); return D ? (c = !0, D.ratio ? v = !0 : m.set(k, x), R(D.nodes), 1) : (u ||= !1, y([]), 2) } else if (V.value === "--modifier") { if (f === null) return y([]), 2; g = !0; let D = Vr(f, V, i); return D ? (p = !0, R(D.nodes), 1) : (g ||= !1, y([]), 2) } } }) ?? 0) === 0 && (k.value = J(N)); }), u && !c || g && !p || v && p || f && !v && !p) return null; if (v) for (let [k, x] of m) { let y = x.nodes.indexOf(k); y !== -1 && x.nodes.splice(y, 1); } return s.nodes }), i.utilities.suggest(r.slice(0, -2), () => { let o = [], s = []; for (let [a, { literals: f, usedSpacingNumber: u, usedSpacingInteger: c, themeKeys: g }] of [[o, e["--value"]], [s, e["--modifier"]]]) { for (let p of f) a.push(p); if (u) a.push(...at); else if (c) for (let p of at) E(p) && a.push(p); for (let p of i.theme.keysInNamespaces(g)) a.push(p.replace(Er, (m, v, k) => `${v}.${k}`)); } return [{ values: o, modifiers: s }] });
  	    } : To.test(r) ? i => { i.utilities.static(r, () => structuredClone(t.nodes)); } : null
  	  } function Vr(t, r, i) { for (let e of r.nodes) { if (t.kind === "named" && e.kind === "word" && (e.value[0] === "'" || e.value[0] === '"') && e.value[e.value.length - 1] === e.value[0] && e.value.slice(1, -1) === t.value) return { nodes: W(t.value) }; if (t.kind === "named" && e.kind === "word" && e.value[0] === "-" && e.value[1] === "-") { let o = e.value; if (o.endsWith("-*")) { o = o.slice(0, -2); let s = i.theme.resolve(t.value, [o]); if (s) return { nodes: W(s) } } else { let s = o.split("-*"); if (s.length <= 1) continue; let a = [s.shift()], f = i.theme.resolveWith(t.value, a, s); if (f) { let [, u = {}] = f; { let c = u[s.pop()]; if (c) return { nodes: W(c) } } } } } else if (t.kind === "named" && e.kind === "word") { if (!Kt.includes(e.value)) continue; let o = e.value === "ratio" && "fraction" in t ? t.fraction : t.value; if (!o) continue; let s = Y(o, [e.value]); if (s === null) continue; if (s === "ratio") { let [a, f] = z(o, "/"); if (!E(a) || !E(f)) continue } else { if (s === "number" && !xe(o)) continue; if (s === "percentage" && !E(o.slice(0, -1))) continue } return { nodes: W(o), ratio: s === "ratio" } } else if (t.kind === "arbitrary" && e.kind === "word" && e.value[0] === "[" && e.value[e.value.length - 1] === "]") { let o = e.value.slice(1, -1); if (o === "*") return { nodes: W(t.value) }; if ("dataType" in t && t.dataType && t.dataType !== o) continue; if ("dataType" in t && t.dataType) return { nodes: W(t.value) }; if (Y(t.value, [o]) !== null) return { nodes: W(t.value) } } } } function pe(t, r, i, e, o = "") { let s = !1, a = De(r, u => i == null ? e(u) : u.startsWith("current") ? e(Q(u, i)) : ((u.startsWith("var(") || i.startsWith("var(")) && (s = !0), e(Tr(u, i)))); function f(u) { return o ? z(u, ",").map(c => o + c).join(",") : u } return s ? [l(t, f(De(r, e))), G("@supports (color: lab(from red l a b))", [l(t, f(a))])] : [l(t, f(a))] } function lt(t, r, i, e, o = "") { let s = !1, a = z(r, ",").map(f => De(f, u => i == null ? e(u) : u.startsWith("current") ? e(Q(u, i)) : ((u.startsWith("var(") || i.startsWith("var(")) && (s = !0), e(Tr(u, i))))).map(f => `drop-shadow(${f})`).join(" "); return s ? [l(t, o + z(r, ",").map(f => `drop-shadow(${De(f, e)})`).join(" ")), G("@supports (color: lab(from red l a b))", [l(t, o + a)])] : [l(t, o + a)] } var Dt = { "--alpha": Ro, "--spacing": Po, "--theme": Oo, theme: _o }; function Ro(t, r, i, ...e) { let [o, s] = z(i, "/").map(a => a.trim()); if (!o || !s) throw new Error(`The --alpha(\u2026) function requires a color and an alpha value, e.g.: \`--alpha(${o || "var(--my-color)"} / ${s || "50%"})\``); if (e.length > 0) throw new Error(`The --alpha(\u2026) function only accepts one argument, e.g.: \`--alpha(${o || "var(--my-color)"} / ${s || "50%"})\``); return Q(o, s) } function Po(t, r, i, ...e) { if (!i) throw new Error("The --spacing(\u2026) function requires an argument, but received none."); if (e.length > 0) throw new Error(`The --spacing(\u2026) function only accepts a single argument, but received ${e.length + 1}.`); let o = t.theme.resolve(null, ["--spacing"]); if (!o) throw new Error("The --spacing(\u2026) function requires that the `--spacing` theme variable exists, but it was not found."); return `calc(${o} * ${i})` } function Oo(t, r, i, ...e) { if (!i.startsWith("--")) throw new Error("The --theme(\u2026) function can only be used with CSS variables from your theme."); let o = !1; i.endsWith(" inline") && (o = !0, i = i.slice(0, -7)), r.kind === "at-rule" && (o = !0); let s = t.resolveThemeValue(i, o); if (!s) { if (e.length > 0) return e.join(", "); throw new Error(`Could not resolve value for theme function: \`theme(${i})\`. Consider checking if the variable name is correct or provide a fallback value to silence this error.`) } if (e.length === 0) return s; let a = e.join(", "); if (a === "initial") return s; if (s === "initial") return a; if (s.startsWith("var(") || s.startsWith("theme(") || s.startsWith("--theme(")) { let f = W(s); return Ko(f, a), J(f) } return s } function _o(t, r, i, ...e) { i = zo(i); let o = t.resolveThemeValue(i); if (!o && e.length > 0) return e.join(", "); if (!o) throw new Error(`Could not resolve value for theme function: \`theme(${i})\`. Consider checking if the path is correct or provide a fallback value to silence this error.`); return o } var Or = new RegExp(Object.keys(Dt).map(t => `${t}\\(`).join("|")); function Ve(t, r) { let i = 0; return U(t, e => { if (e.kind === "declaration" && e.value && Or.test(e.value)) { i |= 8, e.value = _r(e.value, e, r); return } e.kind === "at-rule" && (e.name === "@media" || e.name === "@custom-media" || e.name === "@container" || e.name === "@supports") && Or.test(e.params) && (i |= 8, e.params = _r(e.params, e, r)); }), i } function _r(t, r, i) { let e = W(t); return ee(e, (o, { replaceWith: s }) => { if (o.kind === "function" && o.value in Dt) { let a = z(J(o.nodes).trim(), ",").map(u => u.trim()), f = Dt[o.value](i, r, ...a); return s(W(f)) } }), J(e) } function zo(t) { if (t[0] !== "'" && t[0] !== '"') return t; let r = "", i = t[0]; for (let e = 1; e < t.length - 1; e++) { let o = t[e], s = t[e + 1]; o === "\\" && (s === i || s === "\\") ? (r += s, e++) : r += o; } return r } function Ko(t, r) { ee(t, i => { if (i.kind === "function" && !(i.value !== "var" && i.value !== "theme" && i.value !== "--theme")) if (i.nodes.length === 1) i.nodes.push({ kind: "word", value: `, ${r}` }); else { let e = i.nodes[i.nodes.length - 1]; e.kind === "word" && e.value === "initial" && (e.value = r); } }); } function st(t, r) { let i = t.length, e = r.length, o = i < e ? i : e; for (let s = 0; s < o; s++) { let a = t.charCodeAt(s), f = r.charCodeAt(s); if (a >= 48 && a <= 57 && f >= 48 && f <= 57) { let u = s, c = s + 1, g = s, p = s + 1; for (a = t.charCodeAt(c); a >= 48 && a <= 57;)a = t.charCodeAt(++c); for (f = r.charCodeAt(p); f >= 48 && f <= 57;)f = r.charCodeAt(++p); let m = t.slice(u, c), v = r.slice(g, p), k = Number(m) - Number(v); if (k) return k; if (m < v) return -1; if (m > v) return 1; continue } if (a !== f) return a - f } return t.length - r.length } var Do = /^\d+\/\d+$/; function zr(t) { let r = new B(o => ({ name: o, utility: o, fraction: !1, modifiers: [] })); for (let o of t.utilities.keys("static")) { let s = r.get(o); s.fraction = !1, s.modifiers = []; } for (let o of t.utilities.keys("functional")) { let s = t.utilities.getCompletions(o); for (let a of s) for (let f of a.values) { let u = f !== null && Do.test(f), c = f === null ? o : `${o}-${f}`, g = r.get(c); if (g.utility = o, g.fraction ||= u, g.modifiers.push(...a.modifiers), a.supportsNegative) { let p = r.get(`-${c}`); p.utility = `-${o}`, p.fraction ||= u, p.modifiers.push(...a.modifiers); } } } if (r.size === 0) return []; let i = Array.from(r.values()); return i.sort((o, s) => st(o.name, s.name)), Uo(i) } function Uo(t) { let r = [], i = null, e = new Map, o = new B(() => []); for (let a of t) { let { utility: f, fraction: u } = a; i || (i = { utility: f, items: [] }, e.set(f, i)), f !== i.utility && (r.push(i), i = { utility: f, items: [] }, e.set(f, i)), u ? o.get(f).push(a) : i.items.push(a); } i && r[r.length - 1] !== i && r.push(i); for (let [a, f] of o) { let u = e.get(a); u && u.items.push(...f); } let s = []; for (let a of r) for (let f of a.items) s.push([f.name, { modifiers: f.modifiers }]); return s } function Kr(t) { let r = []; for (let [e, o] of t.variants.entries()) { let f = function ({ value: u, modifier: c } = {}) { let g = e; u && (g += s ? `-${u}` : u), c && (g += `/${c}`); let p = t.parseVariant(g); if (!p) return []; let m = M(".__placeholder__", []); if (Te(m, p, t.variants) === null) return []; let v = []; return Xe(m.nodes, (k, { path: x }) => { if (k.kind !== "rule" && k.kind !== "at-rule" || k.nodes.length > 0) return; x.sort((b, V) => { let R = b.kind === "at-rule", D = V.kind === "at-rule"; return R && !D ? -1 : !R && D ? 1 : 0 }); let y = x.flatMap(b => b.kind === "rule" ? b.selector === "&" ? [] : [b.selector] : b.kind === "at-rule" ? [`${b.name} ${b.params}`] : []), N = ""; for (let b = y.length - 1; b >= 0; b--)N = N === "" ? y[b] : `${y[b]} { ${N} }`; v.push(N); }), v }; if (o.kind === "arbitrary") continue; let s = e !== "@", a = t.variants.getCompletions(e); switch (o.kind) { case "static": { r.push({ name: e, values: a, isArbitrary: !1, hasDash: s, selectors: f }); break } case "functional": { r.push({ name: e, values: a, isArbitrary: !0, hasDash: s, selectors: f }); break } case "compound": { r.push({ name: e, values: a, isArbitrary: !0, hasDash: s, selectors: f }); break } } } return r } function Dr(t, r) { let { astNodes: i, nodeSorting: e } = he(Array.from(r), t), o = new Map(r.map(a => [a, null])), s = 0n; for (let a of i) { let f = e.get(a)?.candidate; f && o.set(f, o.get(f) ?? s++); } return r.map(a => [a, o.get(a) ?? null]) } var ut = /^@?[a-zA-Z0-9_-]*$/; var jt = class { compareFns = new Map; variants = new Map; completions = new Map; groupOrder = null; lastOrder = 0; static(r, i, { compounds: e, order: o } = {}) { this.set(r, { kind: "static", applyFn: i, compoundsWith: 0, compounds: e ?? 2, order: o }); } fromAst(r, i) { let e = []; U(i, o => { o.kind === "rule" ? e.push(o.selector) : o.kind === "at-rule" && o.name !== "@slot" && e.push(`${o.name} ${o.params}`); }), this.static(r, o => { let s = structuredClone(i); Lt(s, o.nodes), o.nodes = s; }, { compounds: Ae(e) }); } functional(r, i, { compounds: e, order: o } = {}) { this.set(r, { kind: "functional", applyFn: i, compoundsWith: 0, compounds: e ?? 2, order: o }); } compound(r, i, e, { compounds: o, order: s } = {}) { this.set(r, { kind: "compound", applyFn: e, compoundsWith: i, compounds: o ?? 2, order: s }); } group(r, i) { this.groupOrder = this.nextOrder(), i && this.compareFns.set(this.groupOrder, i), r(), this.groupOrder = null; } has(r) { return this.variants.has(r) } get(r) { return this.variants.get(r) } kind(r) { return this.variants.get(r)?.kind } compoundsWith(r, i) { let e = this.variants.get(r), o = typeof i == "string" ? this.variants.get(i) : i.kind === "arbitrary" ? { compounds: Ae([i.selector]) } : this.variants.get(i.root); return !(!e || !o || e.kind !== "compound" || o.compounds === 0 || e.compoundsWith === 0 || (e.compoundsWith & o.compounds) === 0) } suggest(r, i) { this.completions.set(r, i); } getCompletions(r) { return this.completions.get(r)?.() ?? [] } compare(r, i) { if (r === i) return 0; if (r === null) return -1; if (i === null) return 1; if (r.kind === "arbitrary" && i.kind === "arbitrary") return r.selector < i.selector ? -1 : 1; if (r.kind === "arbitrary") return 1; if (i.kind === "arbitrary") return -1; let e = this.variants.get(r.root).order, o = this.variants.get(i.root).order, s = e - o; if (s !== 0) return s; if (r.kind === "compound" && i.kind === "compound") { let c = this.compare(r.variant, i.variant); return c !== 0 ? c : r.modifier && i.modifier ? r.modifier.value < i.modifier.value ? -1 : 1 : r.modifier ? 1 : i.modifier ? -1 : 0 } let a = this.compareFns.get(e); if (a !== void 0) return a(r, i); if (r.root !== i.root) return r.root < i.root ? -1 : 1; let f = r.value, u = i.value; return f === null ? -1 : u === null || f.kind === "arbitrary" && u.kind !== "arbitrary" ? 1 : f.kind !== "arbitrary" && u.kind === "arbitrary" || f.value < u.value ? -1 : 1 } keys() { return this.variants.keys() } entries() { return this.variants.entries() } set(r, { kind: i, applyFn: e, compounds: o, compoundsWith: s, order: a }) { let f = this.variants.get(r); f ? Object.assign(f, { kind: i, applyFn: e, compounds: o }) : (a === void 0 && (this.lastOrder = this.nextOrder(), a = this.lastOrder), this.variants.set(r, { kind: i, applyFn: e, order: a, compoundsWith: s, compounds: o })); } nextOrder() { return this.groupOrder ?? this.lastOrder + 1 } }; function Ae(t) { let r = 0; for (let i of t) { if (i[0] === "@") { if (!i.startsWith("@media") && !i.startsWith("@supports") && !i.startsWith("@container")) return 0; r |= 1; continue } if (i.includes("::")) return 0; r |= 2; } return r } function jr(t) { let r = new jt; function i(c, g, { compounds: p } = {}) { p = p ?? Ae(g), r.static(c, m => { m.nodes = g.map(v => G(v, m.nodes)); }, { compounds: p }); } i("*", [":is(& > *)"], { compounds: 0 }), i("**", [":is(& *)"], { compounds: 0 }); function e(c, g) { return g.map(p => { p = p.trim(); let m = z(p, " "); return m[0] === "not" ? m.slice(1).join(" ") : c === "@container" ? m[0][0] === "(" ? `not ${p}` : m[1] === "not" ? `${m[0]} ${m.slice(2).join(" ")}` : `${m[0]} not ${m.slice(1).join(" ")}` : `not ${p}` }) } let o = ["@media", "@supports", "@container"]; function s(c) { for (let g of o) { if (g !== c.name) continue; let p = z(c.params, ","); return p.length > 1 ? null : (p = e(c.name, p), F(c.name, p.join(", "))) } return null } function a(c) { return c.includes("::") ? null : `&:not(${z(c, ",").map(p => (p = p.replaceAll("&", "*"), p)).join(", ")})` } r.compound("not", 3, (c, g) => { if (g.variant.kind === "arbitrary" && g.variant.relative || g.modifier) return null; let p = !1; if (U([c], (m, { path: v }) => { if (m.kind !== "rule" && m.kind !== "at-rule") return 0; if (m.nodes.length > 0) return 0; let k = [], x = []; for (let N of v) N.kind === "at-rule" ? k.push(N) : N.kind === "rule" && x.push(N); if (k.length > 1) return 2; if (x.length > 1) return 2; let y = []; for (let N of x) { let b = a(N.selector); if (!b) return p = !1, 2; y.push(M(b, [])); } for (let N of k) { let b = s(N); if (!b) return p = !1, 2; y.push(b); } return Object.assign(c, M("&", y)), p = !0, 1 }), c.kind === "rule" && c.selector === "&" && c.nodes.length === 1 && Object.assign(c, c.nodes[0]), !p) return null }), r.suggest("not", () => Array.from(r.keys()).filter(c => r.compoundsWith("not", c))), r.compound("group", 2, (c, g) => { if (g.variant.kind === "arbitrary" && g.variant.relative) return null; let p = g.modifier ? `:where(.${t.prefix ? `${t.prefix}\\:` : ""}group\\/${g.modifier.value})` : `:where(.${t.prefix ? `${t.prefix}\\:` : ""}group)`, m = !1; if (U([c], (v, { path: k }) => { if (v.kind !== "rule") return 0; for (let y of k.slice(0, -1)) if (y.kind === "rule") return m = !1, 2; let x = v.selector.replaceAll("&", p); z(x, ",").length > 1 && (x = `:is(${x})`), v.selector = `&:is(${x} *)`, m = !0; }), !m) return null }), r.suggest("group", () => Array.from(r.keys()).filter(c => r.compoundsWith("group", c))), r.compound("peer", 2, (c, g) => { if (g.variant.kind === "arbitrary" && g.variant.relative) return null; let p = g.modifier ? `:where(.${t.prefix ? `${t.prefix}\\:` : ""}peer\\/${g.modifier.value})` : `:where(.${t.prefix ? `${t.prefix}\\:` : ""}peer)`, m = !1; if (U([c], (v, { path: k }) => { if (v.kind !== "rule") return 0; for (let y of k.slice(0, -1)) if (y.kind === "rule") return m = !1, 2; let x = v.selector.replaceAll("&", p); z(x, ",").length > 1 && (x = `:is(${x})`), v.selector = `&:is(${x} ~ *)`, m = !0; }), !m) return null }), r.suggest("peer", () => Array.from(r.keys()).filter(c => r.compoundsWith("peer", c))), i("first-letter", ["&::first-letter"]), i("first-line", ["&::first-line"]), i("marker", ["& *::marker", "&::marker", "& *::-webkit-details-marker", "&::-webkit-details-marker"]), i("selection", ["& *::selection", "&::selection"]), i("file", ["&::file-selector-button"]), i("placeholder", ["&::placeholder"]), i("backdrop", ["&::backdrop"]), i("details-content", ["&::details-content"]); { let c = function () { return j([F("@property", "--tw-content", [l("syntax", '"*"'), l("initial-value", '""'), l("inherits", "false")])]) }; r.static("before", g => { g.nodes = [M("&::before", [c(), l("content", "var(--tw-content)"), ...g.nodes])]; }, { compounds: 0 }), r.static("after", g => { g.nodes = [M("&::after", [c(), l("content", "var(--tw-content)"), ...g.nodes])]; }, { compounds: 0 }); } i("first", ["&:first-child"]), i("last", ["&:last-child"]), i("only", ["&:only-child"]), i("odd", ["&:nth-child(odd)"]), i("even", ["&:nth-child(even)"]), i("first-of-type", ["&:first-of-type"]), i("last-of-type", ["&:last-of-type"]), i("only-of-type", ["&:only-of-type"]), i("visited", ["&:visited"]), i("target", ["&:target"]), i("open", ["&:is([open], :popover-open, :open)"]), i("default", ["&:default"]), i("checked", ["&:checked"]), i("indeterminate", ["&:indeterminate"]), i("placeholder-shown", ["&:placeholder-shown"]), i("autofill", ["&:autofill"]), i("optional", ["&:optional"]), i("required", ["&:required"]), i("valid", ["&:valid"]), i("invalid", ["&:invalid"]), i("user-valid", ["&:user-valid"]), i("user-invalid", ["&:user-invalid"]), i("in-range", ["&:in-range"]), i("out-of-range", ["&:out-of-range"]), i("read-only", ["&:read-only"]), i("empty", ["&:empty"]), i("focus-within", ["&:focus-within"]), r.static("hover", c => { c.nodes = [M("&:hover", [F("@media", "(hover: hover)", c.nodes)])]; }), i("focus", ["&:focus"]), i("focus-visible", ["&:focus-visible"]), i("active", ["&:active"]), i("enabled", ["&:enabled"]), i("disabled", ["&:disabled"]), i("inert", ["&:is([inert], [inert] *)"]), r.compound("in", 2, (c, g) => { if (g.modifier) return null; let p = !1; if (U([c], (m, { path: v }) => { if (m.kind !== "rule") return 0; for (let k of v.slice(0, -1)) if (k.kind === "rule") return p = !1, 2; m.selector = `:where(${m.selector.replaceAll("&", "*")}) &`, p = !0; }), !p) return null }), r.suggest("in", () => Array.from(r.keys()).filter(c => r.compoundsWith("in", c))), r.compound("has", 2, (c, g) => { if (g.modifier) return null; let p = !1; if (U([c], (m, { path: v }) => { if (m.kind !== "rule") return 0; for (let k of v.slice(0, -1)) if (k.kind === "rule") return p = !1, 2; m.selector = `&:has(${m.selector.replaceAll("&", "*")})`, p = !0; }), !p) return null }), r.suggest("has", () => Array.from(r.keys()).filter(c => r.compoundsWith("has", c))), r.functional("aria", (c, g) => { if (!g.value || g.modifier) return null; g.value.kind === "arbitrary" ? c.nodes = [M(`&[aria-${Ur(g.value.value)}]`, c.nodes)] : c.nodes = [M(`&[aria-${g.value.value}="true"]`, c.nodes)]; }), r.suggest("aria", () => ["busy", "checked", "disabled", "expanded", "hidden", "pressed", "readonly", "required", "selected"]), r.functional("data", (c, g) => { if (!g.value || g.modifier) return null; c.nodes = [M(`&[data-${Ur(g.value.value)}]`, c.nodes)]; }), r.functional("nth", (c, g) => { if (!g.value || g.modifier || g.value.kind === "named" && !E(g.value.value)) return null; c.nodes = [M(`&:nth-child(${g.value.value})`, c.nodes)]; }), r.functional("nth-last", (c, g) => { if (!g.value || g.modifier || g.value.kind === "named" && !E(g.value.value)) return null; c.nodes = [M(`&:nth-last-child(${g.value.value})`, c.nodes)]; }), r.functional("nth-of-type", (c, g) => { if (!g.value || g.modifier || g.value.kind === "named" && !E(g.value.value)) return null; c.nodes = [M(`&:nth-of-type(${g.value.value})`, c.nodes)]; }), r.functional("nth-last-of-type", (c, g) => { if (!g.value || g.modifier || g.value.kind === "named" && !E(g.value.value)) return null; c.nodes = [M(`&:nth-last-of-type(${g.value.value})`, c.nodes)]; }), r.functional("supports", (c, g) => { if (!g.value || g.modifier) return null; let p = g.value.value; if (p === null) return null; if (/^[\w-]*\s*\(/.test(p)) { let m = p.replace(/\b(and|or|not)\b/g, " $1 "); c.nodes = [F("@supports", m, c.nodes)]; return } p.includes(":") || (p = `${p}: var(--tw)`), (p[0] !== "(" || p[p.length - 1] !== ")") && (p = `(${p})`), c.nodes = [F("@supports", p, c.nodes)]; }, { compounds: 1 }), i("motion-safe", ["@media (prefers-reduced-motion: no-preference)"]), i("motion-reduce", ["@media (prefers-reduced-motion: reduce)"]), i("contrast-more", ["@media (prefers-contrast: more)"]), i("contrast-less", ["@media (prefers-contrast: less)"]); { let c = function (g, p, m, v) { if (g === p) return 0; let k = v.get(g); if (k === null) return m === "asc" ? -1 : 1; let x = v.get(p); return x === null ? m === "asc" ? 1 : -1 : ye(k, x, m) }; { let g = t.namespace("--breakpoint"), p = new B(m => { switch (m.kind) { case "static": return t.resolveValue(m.root, ["--breakpoint"]) ?? null; case "functional": { if (!m.value || m.modifier) return null; let v = null; return m.value.kind === "arbitrary" ? v = m.value.value : m.value.kind === "named" && (v = t.resolveValue(m.value.value, ["--breakpoint"])), !v || v.includes("var(") ? null : v } case "arbitrary": case "compound": return null } }); r.group(() => { r.functional("max", (m, v) => { if (v.modifier) return null; let k = p.get(v); if (k === null) return null; m.nodes = [F("@media", `(width < ${k})`, m.nodes)]; }, { compounds: 1 }); }, (m, v) => c(m, v, "desc", p)), r.suggest("max", () => Array.from(g.keys()).filter(m => m !== null)), r.group(() => { for (let [m, v] of t.namespace("--breakpoint")) m !== null && r.static(m, k => { k.nodes = [F("@media", `(width >= ${v})`, k.nodes)]; }, { compounds: 1 }); r.functional("min", (m, v) => { if (v.modifier) return null; let k = p.get(v); if (k === null) return null; m.nodes = [F("@media", `(width >= ${k})`, m.nodes)]; }, { compounds: 1 }); }, (m, v) => c(m, v, "asc", p)), r.suggest("min", () => Array.from(g.keys()).filter(m => m !== null)); } { let g = t.namespace("--container"), p = new B(m => { switch (m.kind) { case "functional": { if (m.value === null) return null; let v = null; return m.value.kind === "arbitrary" ? v = m.value.value : m.value.kind === "named" && (v = t.resolveValue(m.value.value, ["--container"])), !v || v.includes("var(") ? null : v } case "static": case "arbitrary": case "compound": return null } }); r.group(() => { r.functional("@max", (m, v) => { let k = p.get(v); if (k === null) return null; m.nodes = [F("@container", v.modifier ? `${v.modifier.value} (width < ${k})` : `(width < ${k})`, m.nodes)]; }, { compounds: 1 }); }, (m, v) => c(m, v, "desc", p)), r.suggest("@max", () => Array.from(g.keys()).filter(m => m !== null)), r.group(() => { r.functional("@", (m, v) => { let k = p.get(v); if (k === null) return null; m.nodes = [F("@container", v.modifier ? `${v.modifier.value} (width >= ${k})` : `(width >= ${k})`, m.nodes)]; }, { compounds: 1 }), r.functional("@min", (m, v) => { let k = p.get(v); if (k === null) return null; m.nodes = [F("@container", v.modifier ? `${v.modifier.value} (width >= ${k})` : `(width >= ${k})`, m.nodes)]; }, { compounds: 1 }); }, (m, v) => c(m, v, "asc", p)), r.suggest("@min", () => Array.from(g.keys()).filter(m => m !== null)), r.suggest("@", () => Array.from(g.keys()).filter(m => m !== null)); } } return i("portrait", ["@media (orientation: portrait)"]), i("landscape", ["@media (orientation: landscape)"]), i("ltr", ['&:where(:dir(ltr), [dir="ltr"], [dir="ltr"] *)']), i("rtl", ['&:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *)']), i("dark", ["@media (prefers-color-scheme: dark)"]), i("starting", ["@starting-style"]), i("print", ["@media print"]), i("forced-colors", ["@media (forced-colors: active)"]), i("inverted-colors", ["@media (inverted-colors: inverted)"]), i("pointer-none", ["@media (pointer: none)"]), i("pointer-coarse", ["@media (pointer: coarse)"]), i("pointer-fine", ["@media (pointer: fine)"]), i("any-pointer-none", ["@media (any-pointer: none)"]), i("any-pointer-coarse", ["@media (any-pointer: coarse)"]), i("any-pointer-fine", ["@media (any-pointer: fine)"]), i("noscript", ["@media (scripting: none)"]), r } function Ur(t) { if (t.includes("=")) { let [r, ...i] = z(t, "="), e = i.join("=").trim(); if (e[0] === "'" || e[0] === '"') return t; if (e.length > 1) { let o = e[e.length - 1]; if (e[e.length - 2] === " " && (o === "i" || o === "I" || o === "s" || o === "S")) return `${r}="${e.slice(0, -2)}" ${o}` } return `${r}="${e}"` } return t } function Lt(t, r) { U(t, (i, { replaceWith: e }) => { if (i.kind === "at-rule" && i.name === "@slot") e(r); else if (i.kind === "at-rule" && (i.name === "@keyframes" || i.name === "@property")) return Object.assign(i, j([F(i.name, i.params, i.nodes)])), 1 }); } function Lr(t) { let r = Rr(t), i = jr(t), e = new B(u => wr(u, f)), o = new B(u => Array.from(vr(u, f))), s = new B(u => { let c = Ir(u, f); try { Ve(c.map(({ node: g }) => g), f); } catch { return [] } return c }), a = new B(u => { for (let c of Ze(u)) t.markUsedVariable(c); }), f = { theme: t, utilities: r, variants: i, invalidCandidates: new Set, important: !1, candidatesToCss(u) { let c = []; for (let g of u) { let p = !1, { astNodes: m } = he([g], this, { onInvalidCandidate() { p = !0; } }); m = be(m, f, 0), m.length === 0 || p ? c.push(null) : c.push(le(m)); } return c }, getClassOrder(u) { return Dr(this, u) }, getClassList() { return zr(this) }, getVariants() { return Kr(this) }, parseCandidate(u) { return o.get(u) }, parseVariant(u) { return e.get(u) }, compileAstNodes(u) { return s.get(u) }, printCandidate(u) { return yr(f, u) }, printVariant(u) { return it(u) }, getVariantOrder() { let u = Array.from(e.values()); u.sort((m, v) => this.variants.compare(m, v)); let c = new Map, g, p = 0; for (let m of u) m !== null && (g !== void 0 && this.variants.compare(g, m) !== 0 && p++, c.set(m, p), g = m); return c }, resolveThemeValue(u, c = !0) { let g = u.lastIndexOf("/"), p = null; g !== -1 && (p = u.slice(g + 1).trim(), u = u.slice(0, g).trim()); let m = t.resolve(null, [u], c ? 1 : 0) ?? void 0; return p && m ? Q(m, p) : m }, trackUsedVariables(u) { a.get(u); } }; return f } var It = ["container-type", "pointer-events", "visibility", "position", "inset", "inset-inline", "inset-block", "inset-inline-start", "inset-inline-end", "top", "right", "bottom", "left", "isolation", "z-index", "order", "grid-column", "grid-column-start", "grid-column-end", "grid-row", "grid-row-start", "grid-row-end", "float", "clear", "--tw-container-component", "margin", "margin-inline", "margin-block", "margin-inline-start", "margin-inline-end", "margin-top", "margin-right", "margin-bottom", "margin-left", "box-sizing", "display", "field-sizing", "aspect-ratio", "height", "max-height", "min-height", "width", "max-width", "min-width", "flex", "flex-shrink", "flex-grow", "flex-basis", "table-layout", "caption-side", "border-collapse", "border-spacing", "transform-origin", "translate", "--tw-translate-x", "--tw-translate-y", "--tw-translate-z", "scale", "--tw-scale-x", "--tw-scale-y", "--tw-scale-z", "rotate", "--tw-rotate-x", "--tw-rotate-y", "--tw-rotate-z", "--tw-skew-x", "--tw-skew-y", "transform", "animation", "cursor", "touch-action", "--tw-pan-x", "--tw-pan-y", "--tw-pinch-zoom", "resize", "scroll-snap-type", "--tw-scroll-snap-strictness", "scroll-snap-align", "scroll-snap-stop", "scroll-margin", "scroll-margin-inline", "scroll-margin-block", "scroll-margin-inline-start", "scroll-margin-inline-end", "scroll-margin-top", "scroll-margin-right", "scroll-margin-bottom", "scroll-margin-left", "scroll-padding", "scroll-padding-inline", "scroll-padding-block", "scroll-padding-inline-start", "scroll-padding-inline-end", "scroll-padding-top", "scroll-padding-right", "scroll-padding-bottom", "scroll-padding-left", "list-style-position", "list-style-type", "list-style-image", "appearance", "columns", "break-before", "break-inside", "break-after", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-template-columns", "grid-template-rows", "flex-direction", "flex-wrap", "place-content", "place-items", "align-content", "align-items", "justify-content", "justify-items", "gap", "column-gap", "row-gap", "--tw-space-x-reverse", "--tw-space-y-reverse", "divide-x-width", "divide-y-width", "--tw-divide-y-reverse", "divide-style", "divide-color", "place-self", "align-self", "justify-self", "overflow", "overflow-x", "overflow-y", "overscroll-behavior", "overscroll-behavior-x", "overscroll-behavior-y", "scroll-behavior", "border-radius", "border-start-radius", "border-end-radius", "border-top-radius", "border-right-radius", "border-bottom-radius", "border-left-radius", "border-start-start-radius", "border-start-end-radius", "border-end-end-radius", "border-end-start-radius", "border-top-left-radius", "border-top-right-radius", "border-bottom-right-radius", "border-bottom-left-radius", "border-width", "border-inline-width", "border-block-width", "border-inline-start-width", "border-inline-end-width", "border-top-width", "border-right-width", "border-bottom-width", "border-left-width", "border-style", "border-inline-style", "border-block-style", "border-inline-start-style", "border-inline-end-style", "border-top-style", "border-right-style", "border-bottom-style", "border-left-style", "border-color", "border-inline-color", "border-block-color", "border-inline-start-color", "border-inline-end-color", "border-top-color", "border-right-color", "border-bottom-color", "border-left-color", "background-color", "background-image", "--tw-gradient-position", "--tw-gradient-stops", "--tw-gradient-via-stops", "--tw-gradient-from", "--tw-gradient-from-position", "--tw-gradient-via", "--tw-gradient-via-position", "--tw-gradient-to", "--tw-gradient-to-position", "mask-image", "--tw-mask-top", "--tw-mask-top-from-color", "--tw-mask-top-from-position", "--tw-mask-top-to-color", "--tw-mask-top-to-position", "--tw-mask-right", "--tw-mask-right-from-color", "--tw-mask-right-from-position", "--tw-mask-right-to-color", "--tw-mask-right-to-position", "--tw-mask-bottom", "--tw-mask-bottom-from-color", "--tw-mask-bottom-from-position", "--tw-mask-bottom-to-color", "--tw-mask-bottom-to-position", "--tw-mask-left", "--tw-mask-left-from-color", "--tw-mask-left-from-position", "--tw-mask-left-to-color", "--tw-mask-left-to-position", "--tw-mask-linear", "--tw-mask-linear-position", "--tw-mask-linear-from-color", "--tw-mask-linear-from-position", "--tw-mask-linear-to-color", "--tw-mask-linear-to-position", "--tw-mask-radial", "--tw-mask-radial-shape", "--tw-mask-radial-size", "--tw-mask-radial-position", "--tw-mask-radial-from-color", "--tw-mask-radial-from-position", "--tw-mask-radial-to-color", "--tw-mask-radial-to-position", "--tw-mask-conic", "--tw-mask-conic-position", "--tw-mask-conic-from-color", "--tw-mask-conic-from-position", "--tw-mask-conic-to-color", "--tw-mask-conic-to-position", "box-decoration-break", "background-size", "background-attachment", "background-clip", "background-position", "background-repeat", "background-origin", "mask-composite", "mask-mode", "mask-type", "mask-size", "mask-clip", "mask-position", "mask-repeat", "mask-origin", "fill", "stroke", "stroke-width", "object-fit", "object-position", "padding", "padding-inline", "padding-block", "padding-inline-start", "padding-inline-end", "padding-top", "padding-right", "padding-bottom", "padding-left", "text-align", "text-indent", "vertical-align", "font-family", "font-size", "line-height", "font-weight", "letter-spacing", "text-wrap", "overflow-wrap", "word-break", "text-overflow", "hyphens", "white-space", "color", "text-transform", "font-style", "font-stretch", "font-variant-numeric", "text-decoration-line", "text-decoration-color", "text-decoration-style", "text-decoration-thickness", "text-underline-offset", "-webkit-font-smoothing", "placeholder-color", "caret-color", "accent-color", "color-scheme", "opacity", "background-blend-mode", "mix-blend-mode", "box-shadow", "--tw-shadow", "--tw-shadow-color", "--tw-ring-shadow", "--tw-ring-color", "--tw-inset-shadow", "--tw-inset-shadow-color", "--tw-inset-ring-shadow", "--tw-inset-ring-color", "--tw-ring-offset-width", "--tw-ring-offset-color", "outline", "outline-width", "outline-offset", "outline-color", "--tw-blur", "--tw-brightness", "--tw-contrast", "--tw-drop-shadow", "--tw-grayscale", "--tw-hue-rotate", "--tw-invert", "--tw-saturate", "--tw-sepia", "filter", "--tw-backdrop-blur", "--tw-backdrop-brightness", "--tw-backdrop-contrast", "--tw-backdrop-grayscale", "--tw-backdrop-hue-rotate", "--tw-backdrop-invert", "--tw-backdrop-opacity", "--tw-backdrop-saturate", "--tw-backdrop-sepia", "backdrop-filter", "transition-property", "transition-behavior", "transition-delay", "transition-duration", "transition-timing-function", "will-change", "contain", "content", "forced-color-adjust"]; function he(t, r, { onInvalidCandidate: i } = {}) { let e = new Map, o = [], s = new Map; for (let f of t) { if (r.invalidCandidates.has(f)) { i?.(f); continue } let u = r.parseCandidate(f); if (u.length === 0) { i?.(f); continue } s.set(f, u); } let a = r.getVariantOrder(); for (let [f, u] of s) { let c = !1; for (let g of u) { let p = r.compileAstNodes(g); if (p.length !== 0) { c = !0; for (let { node: m, propertySort: v } of p) { let k = 0n; for (let x of g.variants) k |= 1n << BigInt(a.get(x)); e.set(m, { properties: v, variants: k, candidate: f }), o.push(m); } } } c || i?.(f); } return o.sort((f, u) => { let c = e.get(f), g = e.get(u); if (c.variants - g.variants !== 0n) return Number(c.variants - g.variants); let p = 0; for (; p < c.properties.order.length && p < g.properties.order.length && c.properties.order[p] === g.properties.order[p];)p += 1; return (c.properties.order[p] ?? 1 / 0) - (g.properties.order[p] ?? 1 / 0) || g.properties.count - c.properties.count || st(c.candidate, g.candidate) }), { astNodes: o, nodeSorting: e } } function Ir(t, r) { let i = jo(t, r); if (i.length === 0) return []; let e = [], o = `.${me(t.raw)}`; for (let s of i) { let a = Lo(s); (t.important || r.important) && Mr(s); let f = { kind: "rule", selector: o, nodes: s }; for (let u of t.variants) if (Te(f, u, r.variants) === null) return []; e.push({ node: f, propertySort: a }); } return e } function Te(t, r, i, e = 0) { if (r.kind === "arbitrary") { if (r.relative && e === 0) return null; t.nodes = [G(r.selector, t.nodes)]; return } let { applyFn: o } = i.get(r.root); if (r.kind === "compound") { let a = F("@slot"); if (Te(a, r.variant, i, e + 1) === null || r.root === "not" && a.nodes.length > 1) return null; for (let u of a.nodes) if (u.kind !== "rule" && u.kind !== "at-rule" || o(u, r) === null) return null; U(a.nodes, u => { if ((u.kind === "rule" || u.kind === "at-rule") && u.nodes.length <= 0) return u.nodes = t.nodes, 1 }), t.nodes = a.nodes; return } if (o(t, r) === null) return null } function Fr(t) { let r = t.options?.types ?? []; return r.length > 1 && r.includes("any") } function jo(t, r) { if (t.kind === "arbitrary") { let a = t.value; return t.modifier && (a = Z(a, t.modifier, r.theme)), a === null ? [] : [[l(t.property, a)]] } let i = r.utilities.get(t.root) ?? [], e = [], o = i.filter(a => !Fr(a)); for (let a of o) { if (a.kind !== t.kind) continue; let f = a.compileFn(t); if (f !== void 0) { if (f === null) return e; e.push(f); } } if (e.length > 0) return e; let s = i.filter(a => Fr(a)); for (let a of s) { if (a.kind !== t.kind) continue; let f = a.compileFn(t); if (f !== void 0) { if (f === null) return e; e.push(f); } } return e } function Mr(t) { for (let r of t) r.kind !== "at-root" && (r.kind === "declaration" ? r.important = !0 : (r.kind === "rule" || r.kind === "at-rule") && Mr(r.nodes)); } function Lo(t) { let r = new Set, i = 0, e = t.slice(), o = !1; for (; e.length > 0;) { let s = e.shift(); if (s.kind === "declaration") { if (s.value === void 0 || (i++, o)) continue; if (s.property === "--tw-sort") { let f = It.indexOf(s.value ?? ""); if (f !== -1) { r.add(f), o = !0; continue } } let a = It.indexOf(s.property); a !== -1 && r.add(a); } else if (s.kind === "rule" || s.kind === "at-rule") for (let a of s.nodes) e.push(a); } return { order: Array.from(r).sort((s, a) => s - a), count: i } } function je(t, r) {
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
  	  } function* Br(t, r) { for (let i of t.params.split(/\s+/g)) for (let e of r.parseCandidate(i)) switch (e.kind) { case "arbitrary": break; case "static": case "functional": yield e.root; break; } } async function Ft(t, r, i, e = 0, o = !1) { let s = 0, a = []; return U(t, (f, { replaceWith: u }) => { if (f.kind === "at-rule" && (f.name === "@import" || f.name === "@reference")) { let c = Io(W(f.params)); if (c === null) return; f.name === "@reference" && (c.media = "reference"), s |= 2; let { uri: g, layer: p, media: m, supports: v } = c; if (g.startsWith("data:") || g.startsWith("http://") || g.startsWith("https://")) return; let k = ue({}, []); return a.push((async () => { if (e > 100) throw new Error(`Exceeded maximum recursion depth while resolving \`${g}\` in \`${r}\`)`); let x = await i(g, r), y = Se(x.content, { from: o ? x.path : void 0 }); await Ft(y, x.base, i, e + 1, o), k.nodes = Fo(f, [ue({ base: x.base }, y)], p, m, v); })()), u(k), 1 } }), a.length > 0 && await Promise.all(a), s } function Io(t) { let r, i = null, e = null, o = null; for (let s = 0; s < t.length; s++) { let a = t[s]; if (a.kind !== "separator") { if (a.kind === "word" && !r) { if (!a.value || a.value[0] !== '"' && a.value[0] !== "'") return null; r = a.value.slice(1, -1); continue } if (a.kind === "function" && a.value.toLowerCase() === "url" || !r) return null; if ((a.kind === "word" || a.kind === "function") && a.value.toLowerCase() === "layer") { if (i) return null; if (o) throw new Error("`layer(\u2026)` in an `@import` should come before any other functions or conditions"); "nodes" in a ? i = J(a.nodes) : i = ""; continue } if (a.kind === "function" && a.value.toLowerCase() === "supports") { if (o) return null; o = J(a.nodes); continue } e = J(t.slice(s)); break } } return r ? { uri: r, layer: i, media: e, supports: o } : null } function Fo(t, r, i, e, o) { let s = r; if (i !== null) { let a = F("@layer", i, s); a.src = t.src, s = [a]; } if (e !== null) { let a = F("@media", e, s); a.src = t.src, s = [a]; } if (o !== null) { let a = F("@supports", o[0] === "(" ? o : `(${o})`, s); a.src = t.src, s = [a]; } return s } function Ee(t, r = null) { return Array.isArray(t) && t.length === 2 && typeof t[1] == "object" && typeof t[1] !== null ? r ? t[1][r] ?? null : t[0] : Array.isArray(t) && r === null ? t.join(", ") : typeof t == "string" && r === null ? t : null } function Wr(t, { theme: r }, i) { for (let e of i) { let o = ct([e]); o && t.theme.clearNamespace(`--${o}`, 4); } for (let [e, o] of Mo(r)) { if (typeof o != "string" && typeof o != "number") continue; if (typeof o == "string" && (o = o.replace(/<alpha-value>/g, "1")), e[0] === "opacity" && (typeof o == "number" || typeof o == "string")) { let a = typeof o == "string" ? parseFloat(o) : o; a >= 0 && a <= 1 && (o = a * 100 + "%"); } let s = ct(e); s && t.theme.add(`--${s}`, "" + o, 7); } if (Object.hasOwn(r, "fontFamily")) { let e = 5; { let o = Ee(r.fontFamily.sans); o && t.theme.hasDefault("--font-sans") && (t.theme.add("--default-font-family", o, e), t.theme.add("--default-font-feature-settings", Ee(r.fontFamily.sans, "fontFeatureSettings") ?? "normal", e), t.theme.add("--default-font-variation-settings", Ee(r.fontFamily.sans, "fontVariationSettings") ?? "normal", e)); } { let o = Ee(r.fontFamily.mono); o && t.theme.hasDefault("--font-mono") && (t.theme.add("--default-mono-font-family", o, e), t.theme.add("--default-mono-font-feature-settings", Ee(r.fontFamily.mono, "fontFeatureSettings") ?? "normal", e), t.theme.add("--default-mono-font-variation-settings", Ee(r.fontFamily.mono, "fontVariationSettings") ?? "normal", e)); } } return r } function Mo(t) { let r = []; return qr(t, [], (i, e) => { if (Wo(i)) return r.push([e, i]), 1; if (qo(i)) { r.push([e, i[0]]); for (let o of Reflect.ownKeys(i[1])) r.push([[...e, `-${o}`], i[1][o]]); return 1 } if (Array.isArray(i) && i.every(o => typeof o == "string")) return e[0] === "fontSize" ? (r.push([e, i[0]]), i.length >= 2 && r.push([[...e, "-line-height"], i[1]])) : r.push([e, i.join(", ")]), 1 }), r } var Bo = /^[a-zA-Z0-9-_%/\.]+$/; function ct(t) { if (t[0] === "container") return null; t = structuredClone(t), t[0] === "animation" && (t[0] = "animate"), t[0] === "aspectRatio" && (t[0] = "aspect"), t[0] === "borderRadius" && (t[0] = "radius"), t[0] === "boxShadow" && (t[0] = "shadow"), t[0] === "colors" && (t[0] = "color"), t[0] === "containers" && (t[0] = "container"), t[0] === "fontFamily" && (t[0] = "font"), t[0] === "fontSize" && (t[0] = "text"), t[0] === "letterSpacing" && (t[0] = "tracking"), t[0] === "lineHeight" && (t[0] = "leading"), t[0] === "maxWidth" && (t[0] = "container"), t[0] === "screens" && (t[0] = "breakpoint"), t[0] === "transitionTimingFunction" && (t[0] = "ease"); for (let r of t) if (!Bo.test(r)) return null; return t.map((r, i, e) => r === "1" && i !== e.length - 1 ? "" : r).map(r => r.replaceAll(".", "_").replace(/([a-z])([A-Z])/g, (i, e, o) => `${e}-${o.toLowerCase()}`)).filter((r, i) => r !== "DEFAULT" || i !== t.length - 1).join("-") } function Wo(t) { return typeof t == "number" || typeof t == "string" } function qo(t) { if (!Array.isArray(t) || t.length !== 2 || typeof t[0] != "string" && typeof t[0] != "number" || t[1] === void 0 || t[1] === null || typeof t[1] != "object") return !1; for (let r of Reflect.ownKeys(t[1])) if (typeof r != "string" || typeof t[1][r] != "string" && typeof t[1][r] != "number") return !1; return !0 } function qr(t, r = [], i) { for (let e of Reflect.ownKeys(t)) { let o = t[e]; if (o == null) continue; let s = [...r, e], a = i(o, s) ?? 0; if (a !== 1) { if (a === 2) return 2; if (!(!Array.isArray(o) && typeof o != "object") && qr(o, s, i) === 2) return 2 } } } function ft(t) { let r = []; for (let i of z(t, ".")) { if (!i.includes("[")) { r.push(i); continue } let e = 0; for (; ;) { let o = i.indexOf("[", e), s = i.indexOf("]", o); if (o === -1 || s === -1) break; o > e && r.push(i.slice(e, o)), r.push(i.slice(o + 1, s)), e = s + 1; } e <= i.length - 1 && r.push(i.slice(e)); } return r } function Re(t) { if (Object.prototype.toString.call(t) !== "[object Object]") return !1; let r = Object.getPrototypeOf(t); return r === null || Object.getPrototypeOf(r) === null } function Le(t, r, i, e = []) { for (let o of r) if (o != null) for (let s of Reflect.ownKeys(o)) { e.push(s); let a = i(t[s], o[s], e); a !== void 0 ? t[s] = a : !Re(t[s]) || !Re(o[s]) ? t[s] = o[s] : t[s] = Le({}, [t[s], o[s]], i, e), e.pop(); } return t } function dt(t, r, i) { return function (o, s) { let a = o.lastIndexOf("/"), f = null; a !== -1 && (f = o.slice(a + 1).trim(), o = o.slice(0, a).trim()); let u = (() => { let c = ft(o), [g, p] = Ho(t.theme, c), m = i(Hr(r() ?? {}, c) ?? null); if (typeof m == "string" && (m = m.replace("<alpha-value>", "1")), typeof g != "object") return typeof p != "object" && p & 4 ? m ?? g : g; if (m !== null && typeof m == "object" && !Array.isArray(m)) { let v = Le({}, [m], (k, x) => x); if (g === null && Object.hasOwn(m, "__CSS_VALUES__")) { let k = {}; for (let x in m.__CSS_VALUES__) k[x] = m[x], delete v[x]; g = k; } for (let k in g) k !== "__CSS_VALUES__" && (m?.__CSS_VALUES__?.[k] & 4 && Hr(v, k.split("-")) !== void 0 || (v[ve(k)] = g[k])); return v } if (Array.isArray(g) && Array.isArray(p) && Array.isArray(m)) { let v = g[0], k = g[1]; p[0] & 4 && (v = m[0] ?? v); for (let x of Object.keys(k)) p[1][x] & 4 && (k[x] = m[1][x] ?? k[x]); return [v, k] } return g ?? m })(); return f && typeof u == "string" && (u = Q(u, f)), u ?? s } } function Ho(t, r) { if (r.length === 1 && r[0].startsWith("--")) return [t.get([r[0]]), t.getOptions(r[0])]; let i = ct(r), e = new Map, o = new B(() => new Map), s = t.namespace(`--${i}`); if (s.size === 0) return [null, 0]; let a = new Map; for (let [g, p] of s) { if (!g || !g.includes("--")) { e.set(g, p), a.set(g, t.getOptions(g ? `--${i}-${g}` : `--${i}`)); continue } let m = g.indexOf("--"), v = g.slice(0, m), k = g.slice(m + 2); k = k.replace(/-([a-z])/g, (x, y) => y.toUpperCase()), o.get(v === "" ? null : v).set(k, [p, t.getOptions(`--${i}${g}`)]); } let f = t.getOptions(`--${i}`); for (let [g, p] of o) { let m = e.get(g); if (typeof m != "string") continue; let v = {}, k = {}; for (let [x, [y, N]] of p) v[x] = y, k[x] = N; e.set(g, [m, v]), a.set(g, [f, k]); } let u = {}, c = {}; for (let [g, p] of e) Gr(u, [g ?? "DEFAULT"], p); for (let [g, p] of a) Gr(c, [g ?? "DEFAULT"], p); return r[r.length - 1] === "DEFAULT" ? [u?.DEFAULT ?? null, c.DEFAULT ?? 0] : "DEFAULT" in u && Object.keys(u).length === 1 ? [u.DEFAULT, c.DEFAULT ?? 0] : (u.__CSS_VALUES__ = c, [u, c]) } function Hr(t, r) { for (let i = 0; i < r.length; ++i) { let e = r[i]; if (t?.[e] === void 0) { if (r[i + 1] === void 0) return; r[i + 1] = `${e}-${r[i + 1]}`; continue } t = t[e]; } return t } function Gr(t, r, i) { for (let e of r.slice(0, -1)) t[e] === void 0 && (t[e] = {}), t = t[e]; t[r[r.length - 1]] = i; } function Go(t) { return { kind: "combinator", value: t } } function Yo(t, r) { return { kind: "function", value: t, nodes: r } } function Ie(t) { return { kind: "selector", value: t } } function Jo(t) { return { kind: "separator", value: t } } function Qo(t) { return { kind: "value", value: t } } function Fe(t, r, i = null) { for (let e = 0; e < t.length; e++) { let o = t[e], s = !1, a = 0, f = r(o, { parent: i, replaceWith(u) { s || (s = !0, Array.isArray(u) ? u.length === 0 ? (t.splice(e, 1), a = 0) : u.length === 1 ? (t[e] = u[0], a = 1) : (t.splice(e, 1, ...u), a = u.length) : (t[e] = u, a = 1)); } }) ?? 0; if (s) { f === 0 ? e-- : e += a - 1; continue } if (f === 2) return 2; if (f !== 1 && o.kind === "function" && Fe(o.nodes, r, o) === 2) return 2 } } function Me(t) { let r = ""; for (let i of t) switch (i.kind) { case "combinator": case "selector": case "separator": case "value": { r += i.value; break } case "function": r += i.value + "(" + Me(i.nodes) + ")"; }return r } var Yr = 92, Zo = 93, Jr = 41, Xo = 58, Qr = 44, en = 34, tn = 46, Zr = 62, Xr = 10, rn = 35, ei = 91, ti = 40, ri = 43, on = 39, ii = 32, oi = 9, ni = 126; function pt(t) {
  	    t = t.replaceAll(`\r
`, `
`); let r = [], i = [], e = null, o = "", s; for (let a = 0; a < t.length; a++) { let f = t.charCodeAt(a); switch (f) { case Qr: case Zr: case Xr: case ii: case ri: case oi: case ni: { if (o.length > 0) { let m = Ie(o); e ? e.nodes.push(m) : r.push(m), o = ""; } let u = a, c = a + 1; for (; c < t.length && (s = t.charCodeAt(c), !(s !== Qr && s !== Zr && s !== Xr && s !== ii && s !== ri && s !== oi && s !== ni)); c++); a = c - 1; let g = t.slice(u, c), p = g.trim() === "," ? Jo(g) : Go(g); e ? e.nodes.push(p) : r.push(p); break } case ti: { let u = Yo(o, []); if (o = "", u.value !== ":not" && u.value !== ":where" && u.value !== ":has" && u.value !== ":is") { let c = a + 1, g = 0; for (let m = a + 1; m < t.length; m++) { if (s = t.charCodeAt(m), s === ti) { g++; continue } if (s === Jr) { if (g === 0) { a = m; break } g--; } } let p = a; u.nodes.push(Qo(t.slice(c, p))), o = "", a = p, e ? e.nodes.push(u) : r.push(u); break } e ? e.nodes.push(u) : r.push(u), i.push(u), e = u; break } case Jr: { let u = i.pop(); if (o.length > 0) { let c = Ie(o); u.nodes.push(c), o = ""; } i.length > 0 ? e = i[i.length - 1] : e = null; break } case tn: case Xo: case rn: { if (o.length > 0) { let u = Ie(o); e ? e.nodes.push(u) : r.push(u); } o = String.fromCharCode(f); break } case ei: { if (o.length > 0) { let g = Ie(o); e ? e.nodes.push(g) : r.push(g); } o = ""; let u = a, c = 0; for (let g = a + 1; g < t.length; g++) { if (s = t.charCodeAt(g), s === ei) { c++; continue } if (s === Zo) { if (c === 0) { a = g; break } c--; } } o += t.slice(u, a + 1); break } case on: case en: { let u = a; for (let c = a + 1; c < t.length; c++)if (s = t.charCodeAt(c), s === Yr) c += 1; else if (s === f) { a = c; break } o += t.slice(u, a + 1); break } case Yr: { let u = t.charCodeAt(a + 1); o += String.fromCharCode(f) + String.fromCharCode(u), a += 1; break } default: o += String.fromCharCode(f); } } return o.length > 0 && r.push(Ie(o)), r
  	  } var li = /^[a-z@][a-zA-Z0-9/%._-]*$/; function Mt({ designSystem: t, ast: r, resolvedConfig: i, featuresRef: e, referenceMode: o }) { let s = { addBase(a) { if (o) return; let f = ce(a); e.current |= Ve(f, t), r.push(F("@layer", "base", f)); }, addVariant(a, f) { if (!ut.test(a)) throw new Error(`\`addVariant('${a}')\` defines an invalid variant name. Variants should only contain alphanumeric, dashes or underscore characters.`); if (typeof f == "string") { if (f.includes(":merge(")) return } else if (Array.isArray(f)) { if (f.some(c => c.includes(":merge("))) return } else if (typeof f == "object") { let c = function (g, p) { return Object.entries(g).some(([m, v]) => m.includes(p) || typeof v == "object" && c(v, p)) }; if (c(f, ":merge(")) return } typeof f == "string" || Array.isArray(f) ? t.variants.static(a, c => { c.nodes = ai(f, c.nodes); }, { compounds: Ae(typeof f == "string" ? [f] : f) }) : typeof f == "object" && t.variants.fromAst(a, ce(f)); }, matchVariant(a, f, u) { function c(p, m, v) { let k = f(p, { modifier: m?.value ?? null }); return ai(k, v) } try { let p = f("a", { modifier: null }); if (typeof p == "string" && p.includes(":merge(")) return; if (Array.isArray(p) && p.some(m => m.includes(":merge("))) return } catch { } let g = Object.keys(u?.values ?? {}); t.variants.group(() => { t.variants.functional(a, (p, m) => { if (!m.value) { if (u?.values && "DEFAULT" in u.values) { p.nodes = c(u.values.DEFAULT, m.modifier, p.nodes); return } return null } if (m.value.kind === "arbitrary") p.nodes = c(m.value.value, m.modifier, p.nodes); else if (m.value.kind === "named" && u?.values) { let v = u.values[m.value.value]; if (typeof v != "string") return; p.nodes = c(v, m.modifier, p.nodes); } }); }, (p, m) => { if (p.kind !== "functional" || m.kind !== "functional") return 0; let v = p.value ? p.value.value : "DEFAULT", k = m.value ? m.value.value : "DEFAULT", x = u?.values?.[v] ?? v, y = u?.values?.[k] ?? k; if (u && typeof u.sort == "function") return u.sort({ value: x, modifier: p.modifier?.value ?? null }, { value: y, modifier: m.modifier?.value ?? null }); let N = g.indexOf(v), b = g.indexOf(k); return N = N === -1 ? g.length : N, b = b === -1 ? g.length : b, N !== b ? N - b : x < y ? -1 : 1 }); }, addUtilities(a) { a = Array.isArray(a) ? a : [a]; let f = a.flatMap(c => Object.entries(c)); f = f.flatMap(([c, g]) => z(c, ",").map(p => [p.trim(), g])); let u = new B(() => []); for (let [c, g] of f) { if (c.startsWith("@keyframes ")) { o || r.push(G(c, ce(g))); continue } let p = pt(c), m = !1; if (Fe(p, v => { if (v.kind === "selector" && v.value[0] === "." && li.test(v.value.slice(1))) { let k = v.value; v.value = "&"; let x = Me(p), y = k.slice(1), N = x === "&" ? ce(g) : [G(x, ce(g))]; u.get(y).push(...N), m = !0, v.value = k; return } if (v.kind === "function" && v.value === ":not") return 1 }), !m) throw new Error(`\`addUtilities({ '${c}' : \u2026 })\` defines an invalid utility selector. Utilities must be a single class name and start with a lowercase letter, eg. \`.scrollbar-none\`.`) } for (let [c, g] of u) t.theme.prefix && U(g, p => { if (p.kind === "rule") { let m = pt(p.selector); Fe(m, v => { v.kind === "selector" && v.value[0] === "." && (v.value = `.${t.theme.prefix}\\:${v.value.slice(1)}`); }), p.selector = Me(m); } }), t.utilities.static(c, p => { let m = structuredClone(g); return si(m, c, p.raw), e.current |= je(m, t), m }); }, matchUtilities(a, f) { let u = f?.type ? Array.isArray(f?.type) ? f.type : [f.type] : ["any"]; for (let [g, p] of Object.entries(a)) { let m = function ({ negative: v }) { return k => { if (k.value?.kind === "arbitrary" && u.length > 0 && !u.includes("any") && (k.value.dataType && !u.includes(k.value.dataType) || !k.value.dataType && !Y(k.value.value, u))) return; let x = u.includes("color"), y = null, N = !1; { let R = f?.values ?? {}; x && (R = Object.assign({ inherit: "inherit", transparent: "transparent", current: "currentcolor" }, R)), k.value ? k.value.kind === "arbitrary" ? y = k.value.value : k.value.fraction && R[k.value.fraction] ? (y = R[k.value.fraction], N = !0) : R[k.value.value] ? y = R[k.value.value] : R.__BARE_VALUE__ && (y = R.__BARE_VALUE__(k.value) ?? null, N = (k.value.fraction !== null && y?.includes("/")) ?? !1) : y = R.DEFAULT ?? null; } if (y === null) return; let b; { let R = f?.modifiers ?? null; k.modifier ? R === "any" || k.modifier.kind === "arbitrary" ? b = k.modifier.value : R?.[k.modifier.value] ? b = R[k.modifier.value] : x && !Number.isNaN(Number(k.modifier.value)) ? b = `${k.modifier.value}%` : b = null : b = null; } if (k.modifier && b === null && !N) return k.value?.kind === "arbitrary" ? null : void 0; x && b !== null && (y = Q(y, b)), v && (y = `calc(${y} * -1)`); let V = ce(p(y, { modifier: b })); return si(V, g, k.raw), e.current |= je(V, t), V } }; if (!li.test(g)) throw new Error(`\`matchUtilities({ '${g}' : \u2026 })\` defines an invalid utility name. Utilities should be alphanumeric and start with a lowercase letter, eg. \`scrollbar\`.`); f?.supportsNegativeValues && t.utilities.functional(`-${g}`, m({ negative: !0 }), { types: u }), t.utilities.functional(g, m({ negative: !1 }), { types: u }), t.utilities.suggest(g, () => { let v = f?.values ?? {}, k = new Set(Object.keys(v)); k.delete("__BARE_VALUE__"), k.has("DEFAULT") && (k.delete("DEFAULT"), k.add(null)); let x = f?.modifiers ?? {}, y = x === "any" ? [] : Object.keys(x); return [{ supportsNegative: f?.supportsNegativeValues ?? !1, values: Array.from(k), modifiers: y }] }); } }, addComponents(a, f) { this.addUtilities(a, f); }, matchComponents(a, f) { this.matchUtilities(a, f); }, theme: dt(t, () => i.theme ?? {}, a => a), prefix(a) { return a }, config(a, f) { let u = i; if (!a) return u; let c = ft(a); for (let g = 0; g < c.length; ++g) { let p = c[g]; if (u[p] === void 0) return f; u = u[p]; } return u ?? f } }; return s.addComponents = s.addComponents.bind(s), s.matchComponents = s.matchComponents.bind(s), s } function ce(t) { let r = []; t = Array.isArray(t) ? t : [t]; let i = t.flatMap(e => Object.entries(e)); for (let [e, o] of i) if (typeof o != "object") { if (!e.startsWith("--")) { if (o === "@slot") { r.push(G(e, [F("@slot")])); continue } e = e.replace(/([A-Z])/g, "-$1").toLowerCase(); } r.push(l(e, String(o))); } else if (Array.isArray(o)) for (let s of o) typeof s == "string" ? r.push(l(e, s)) : r.push(G(e, ce(s))); else o !== null && r.push(G(e, ce(o))); return r } function ai(t, r) { return (typeof t == "string" ? [t] : t).flatMap(e => { if (e.trim().endsWith("}")) { let o = e.replace("}", "{@slot}}"), s = Se(o); return Lt(s, r), s } else return G(e, r) }) } function si(t, r, i) { U(t, e => { if (e.kind === "rule") { let o = pt(e.selector); Fe(o, s => { s.kind === "selector" && s.value === `.${r}` && (s.value = `.${me(i)}`); }), e.selector = Me(o); } }); } function ui(t, r, i) { for (let e of ln(r)) t.theme.addKeyframes(e); } function ln(t) { let r = []; if ("keyframes" in t.theme) for (let [i, e] of Object.entries(t.theme.keyframes)) r.push(F("@keyframes", i, ce(e))); return r } var mt = { inherit: "inherit", current: "currentcolor", transparent: "transparent", black: "#000", white: "#fff", slate: { 50: "oklch(98.4% 0.003 247.858)", 100: "oklch(96.8% 0.007 247.896)", 200: "oklch(92.9% 0.013 255.508)", 300: "oklch(86.9% 0.022 252.894)", 400: "oklch(70.4% 0.04 256.788)", 500: "oklch(55.4% 0.046 257.417)", 600: "oklch(44.6% 0.043 257.281)", 700: "oklch(37.2% 0.044 257.287)", 800: "oklch(27.9% 0.041 260.031)", 900: "oklch(20.8% 0.042 265.755)", 950: "oklch(12.9% 0.042 264.695)" }, gray: { 50: "oklch(98.5% 0.002 247.839)", 100: "oklch(96.7% 0.003 264.542)", 200: "oklch(92.8% 0.006 264.531)", 300: "oklch(87.2% 0.01 258.338)", 400: "oklch(70.7% 0.022 261.325)", 500: "oklch(55.1% 0.027 264.364)", 600: "oklch(44.6% 0.03 256.802)", 700: "oklch(37.3% 0.034 259.733)", 800: "oklch(27.8% 0.033 256.848)", 900: "oklch(21% 0.034 264.665)", 950: "oklch(13% 0.028 261.692)" }, zinc: { 50: "oklch(98.5% 0 0)", 100: "oklch(96.7% 0.001 286.375)", 200: "oklch(92% 0.004 286.32)", 300: "oklch(87.1% 0.006 286.286)", 400: "oklch(70.5% 0.015 286.067)", 500: "oklch(55.2% 0.016 285.938)", 600: "oklch(44.2% 0.017 285.786)", 700: "oklch(37% 0.013 285.805)", 800: "oklch(27.4% 0.006 286.033)", 900: "oklch(21% 0.006 285.885)", 950: "oklch(14.1% 0.005 285.823)" }, neutral: { 50: "oklch(98.5% 0 0)", 100: "oklch(97% 0 0)", 200: "oklch(92.2% 0 0)", 300: "oklch(87% 0 0)", 400: "oklch(70.8% 0 0)", 500: "oklch(55.6% 0 0)", 600: "oklch(43.9% 0 0)", 700: "oklch(37.1% 0 0)", 800: "oklch(26.9% 0 0)", 900: "oklch(20.5% 0 0)", 950: "oklch(14.5% 0 0)" }, stone: { 50: "oklch(98.5% 0.001 106.423)", 100: "oklch(97% 0.001 106.424)", 200: "oklch(92.3% 0.003 48.717)", 300: "oklch(86.9% 0.005 56.366)", 400: "oklch(70.9% 0.01 56.259)", 500: "oklch(55.3% 0.013 58.071)", 600: "oklch(44.4% 0.011 73.639)", 700: "oklch(37.4% 0.01 67.558)", 800: "oklch(26.8% 0.007 34.298)", 900: "oklch(21.6% 0.006 56.043)", 950: "oklch(14.7% 0.004 49.25)" }, red: { 50: "oklch(97.1% 0.013 17.38)", 100: "oklch(93.6% 0.032 17.717)", 200: "oklch(88.5% 0.062 18.334)", 300: "oklch(80.8% 0.114 19.571)", 400: "oklch(70.4% 0.191 22.216)", 500: "oklch(63.7% 0.237 25.331)", 600: "oklch(57.7% 0.245 27.325)", 700: "oklch(50.5% 0.213 27.518)", 800: "oklch(44.4% 0.177 26.899)", 900: "oklch(39.6% 0.141 25.723)", 950: "oklch(25.8% 0.092 26.042)" }, orange: { 50: "oklch(98% 0.016 73.684)", 100: "oklch(95.4% 0.038 75.164)", 200: "oklch(90.1% 0.076 70.697)", 300: "oklch(83.7% 0.128 66.29)", 400: "oklch(75% 0.183 55.934)", 500: "oklch(70.5% 0.213 47.604)", 600: "oklch(64.6% 0.222 41.116)", 700: "oklch(55.3% 0.195 38.402)", 800: "oklch(47% 0.157 37.304)", 900: "oklch(40.8% 0.123 38.172)", 950: "oklch(26.6% 0.079 36.259)" }, amber: { 50: "oklch(98.7% 0.022 95.277)", 100: "oklch(96.2% 0.059 95.617)", 200: "oklch(92.4% 0.12 95.746)", 300: "oklch(87.9% 0.169 91.605)", 400: "oklch(82.8% 0.189 84.429)", 500: "oklch(76.9% 0.188 70.08)", 600: "oklch(66.6% 0.179 58.318)", 700: "oklch(55.5% 0.163 48.998)", 800: "oklch(47.3% 0.137 46.201)", 900: "oklch(41.4% 0.112 45.904)", 950: "oklch(27.9% 0.077 45.635)" }, yellow: { 50: "oklch(98.7% 0.026 102.212)", 100: "oklch(97.3% 0.071 103.193)", 200: "oklch(94.5% 0.129 101.54)", 300: "oklch(90.5% 0.182 98.111)", 400: "oklch(85.2% 0.199 91.936)", 500: "oklch(79.5% 0.184 86.047)", 600: "oklch(68.1% 0.162 75.834)", 700: "oklch(55.4% 0.135 66.442)", 800: "oklch(47.6% 0.114 61.907)", 900: "oklch(42.1% 0.095 57.708)", 950: "oklch(28.6% 0.066 53.813)" }, lime: { 50: "oklch(98.6% 0.031 120.757)", 100: "oklch(96.7% 0.067 122.328)", 200: "oklch(93.8% 0.127 124.321)", 300: "oklch(89.7% 0.196 126.665)", 400: "oklch(84.1% 0.238 128.85)", 500: "oklch(76.8% 0.233 130.85)", 600: "oklch(64.8% 0.2 131.684)", 700: "oklch(53.2% 0.157 131.589)", 800: "oklch(45.3% 0.124 130.933)", 900: "oklch(40.5% 0.101 131.063)", 950: "oklch(27.4% 0.072 132.109)" }, green: { 50: "oklch(98.2% 0.018 155.826)", 100: "oklch(96.2% 0.044 156.743)", 200: "oklch(92.5% 0.084 155.995)", 300: "oklch(87.1% 0.15 154.449)", 400: "oklch(79.2% 0.209 151.711)", 500: "oklch(72.3% 0.219 149.579)", 600: "oklch(62.7% 0.194 149.214)", 700: "oklch(52.7% 0.154 150.069)", 800: "oklch(44.8% 0.119 151.328)", 900: "oklch(39.3% 0.095 152.535)", 950: "oklch(26.6% 0.065 152.934)" }, emerald: { 50: "oklch(97.9% 0.021 166.113)", 100: "oklch(95% 0.052 163.051)", 200: "oklch(90.5% 0.093 164.15)", 300: "oklch(84.5% 0.143 164.978)", 400: "oklch(76.5% 0.177 163.223)", 500: "oklch(69.6% 0.17 162.48)", 600: "oklch(59.6% 0.145 163.225)", 700: "oklch(50.8% 0.118 165.612)", 800: "oklch(43.2% 0.095 166.913)", 900: "oklch(37.8% 0.077 168.94)", 950: "oklch(26.2% 0.051 172.552)" }, teal: { 50: "oklch(98.4% 0.014 180.72)", 100: "oklch(95.3% 0.051 180.801)", 200: "oklch(91% 0.096 180.426)", 300: "oklch(85.5% 0.138 181.071)", 400: "oklch(77.7% 0.152 181.912)", 500: "oklch(70.4% 0.14 182.503)", 600: "oklch(60% 0.118 184.704)", 700: "oklch(51.1% 0.096 186.391)", 800: "oklch(43.7% 0.078 188.216)", 900: "oklch(38.6% 0.063 188.416)", 950: "oklch(27.7% 0.046 192.524)" }, cyan: { 50: "oklch(98.4% 0.019 200.873)", 100: "oklch(95.6% 0.045 203.388)", 200: "oklch(91.7% 0.08 205.041)", 300: "oklch(86.5% 0.127 207.078)", 400: "oklch(78.9% 0.154 211.53)", 500: "oklch(71.5% 0.143 215.221)", 600: "oklch(60.9% 0.126 221.723)", 700: "oklch(52% 0.105 223.128)", 800: "oklch(45% 0.085 224.283)", 900: "oklch(39.8% 0.07 227.392)", 950: "oklch(30.2% 0.056 229.695)" }, sky: { 50: "oklch(97.7% 0.013 236.62)", 100: "oklch(95.1% 0.026 236.824)", 200: "oklch(90.1% 0.058 230.902)", 300: "oklch(82.8% 0.111 230.318)", 400: "oklch(74.6% 0.16 232.661)", 500: "oklch(68.5% 0.169 237.323)", 600: "oklch(58.8% 0.158 241.966)", 700: "oklch(50% 0.134 242.749)", 800: "oklch(44.3% 0.11 240.79)", 900: "oklch(39.1% 0.09 240.876)", 950: "oklch(29.3% 0.066 243.157)" }, blue: { 50: "oklch(97% 0.014 254.604)", 100: "oklch(93.2% 0.032 255.585)", 200: "oklch(88.2% 0.059 254.128)", 300: "oklch(80.9% 0.105 251.813)", 400: "oklch(70.7% 0.165 254.624)", 500: "oklch(62.3% 0.214 259.815)", 600: "oklch(54.6% 0.245 262.881)", 700: "oklch(48.8% 0.243 264.376)", 800: "oklch(42.4% 0.199 265.638)", 900: "oklch(37.9% 0.146 265.522)", 950: "oklch(28.2% 0.091 267.935)" }, indigo: { 50: "oklch(96.2% 0.018 272.314)", 100: "oklch(93% 0.034 272.788)", 200: "oklch(87% 0.065 274.039)", 300: "oklch(78.5% 0.115 274.713)", 400: "oklch(67.3% 0.182 276.935)", 500: "oklch(58.5% 0.233 277.117)", 600: "oklch(51.1% 0.262 276.966)", 700: "oklch(45.7% 0.24 277.023)", 800: "oklch(39.8% 0.195 277.366)", 900: "oklch(35.9% 0.144 278.697)", 950: "oklch(25.7% 0.09 281.288)" }, violet: { 50: "oklch(96.9% 0.016 293.756)", 100: "oklch(94.3% 0.029 294.588)", 200: "oklch(89.4% 0.057 293.283)", 300: "oklch(81.1% 0.111 293.571)", 400: "oklch(70.2% 0.183 293.541)", 500: "oklch(60.6% 0.25 292.717)", 600: "oklch(54.1% 0.281 293.009)", 700: "oklch(49.1% 0.27 292.581)", 800: "oklch(43.2% 0.232 292.759)", 900: "oklch(38% 0.189 293.745)", 950: "oklch(28.3% 0.141 291.089)" }, purple: { 50: "oklch(97.7% 0.014 308.299)", 100: "oklch(94.6% 0.033 307.174)", 200: "oklch(90.2% 0.063 306.703)", 300: "oklch(82.7% 0.119 306.383)", 400: "oklch(71.4% 0.203 305.504)", 500: "oklch(62.7% 0.265 303.9)", 600: "oklch(55.8% 0.288 302.321)", 700: "oklch(49.6% 0.265 301.924)", 800: "oklch(43.8% 0.218 303.724)", 900: "oklch(38.1% 0.176 304.987)", 950: "oklch(29.1% 0.149 302.717)" }, fuchsia: { 50: "oklch(97.7% 0.017 320.058)", 100: "oklch(95.2% 0.037 318.852)", 200: "oklch(90.3% 0.076 319.62)", 300: "oklch(83.3% 0.145 321.434)", 400: "oklch(74% 0.238 322.16)", 500: "oklch(66.7% 0.295 322.15)", 600: "oklch(59.1% 0.293 322.896)", 700: "oklch(51.8% 0.253 323.949)", 800: "oklch(45.2% 0.211 324.591)", 900: "oklch(40.1% 0.17 325.612)", 950: "oklch(29.3% 0.136 325.661)" }, pink: { 50: "oklch(97.1% 0.014 343.198)", 100: "oklch(94.8% 0.028 342.258)", 200: "oklch(89.9% 0.061 343.231)", 300: "oklch(82.3% 0.12 346.018)", 400: "oklch(71.8% 0.202 349.761)", 500: "oklch(65.6% 0.241 354.308)", 600: "oklch(59.2% 0.249 0.584)", 700: "oklch(52.5% 0.223 3.958)", 800: "oklch(45.9% 0.187 3.815)", 900: "oklch(40.8% 0.153 2.432)", 950: "oklch(28.4% 0.109 3.907)" }, rose: { 50: "oklch(96.9% 0.015 12.422)", 100: "oklch(94.1% 0.03 12.58)", 200: "oklch(89.2% 0.058 10.001)", 300: "oklch(81% 0.117 11.638)", 400: "oklch(71.2% 0.194 13.428)", 500: "oklch(64.5% 0.246 16.439)", 600: "oklch(58.6% 0.253 17.585)", 700: "oklch(51.4% 0.222 16.935)", 800: "oklch(45.5% 0.188 13.697)", 900: "oklch(41% 0.159 10.272)", 950: "oklch(27.1% 0.105 12.094)" } }; function Ce(t) { return { __BARE_VALUE__: t } } var ae = Ce(t => { if (E(t.value)) return t.value }), ie = Ce(t => { if (E(t.value)) return `${t.value}%` }), ke = Ce(t => { if (E(t.value)) return `${t.value}px` }), ci = Ce(t => { if (E(t.value)) return `${t.value}ms` }), gt = Ce(t => { if (E(t.value)) return `${t.value}deg` }), an = Ce(t => { if (t.fraction === null) return; let [r, i] = z(t.fraction, "/"); if (!(!E(r) || !E(i))) return t.fraction }), fi = Ce(t => { if (E(Number(t.value))) return `repeat(${t.value}, minmax(0, 1fr))` }), di = { accentColor: ({ theme: t }) => t("colors"), animation: { none: "none", spin: "spin 1s linear infinite", ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite", pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite", bounce: "bounce 1s infinite" }, aria: { busy: 'busy="true"', checked: 'checked="true"', disabled: 'disabled="true"', expanded: 'expanded="true"', hidden: 'hidden="true"', pressed: 'pressed="true"', readonly: 'readonly="true"', required: 'required="true"', selected: 'selected="true"' }, aspectRatio: { auto: "auto", square: "1 / 1", video: "16 / 9", ...an }, backdropBlur: ({ theme: t }) => t("blur"), backdropBrightness: ({ theme: t }) => ({ ...t("brightness"), ...ie }), backdropContrast: ({ theme: t }) => ({ ...t("contrast"), ...ie }), backdropGrayscale: ({ theme: t }) => ({ ...t("grayscale"), ...ie }), backdropHueRotate: ({ theme: t }) => ({ ...t("hueRotate"), ...gt }), backdropInvert: ({ theme: t }) => ({ ...t("invert"), ...ie }), backdropOpacity: ({ theme: t }) => ({ ...t("opacity"), ...ie }), backdropSaturate: ({ theme: t }) => ({ ...t("saturate"), ...ie }), backdropSepia: ({ theme: t }) => ({ ...t("sepia"), ...ie }), backgroundColor: ({ theme: t }) => t("colors"), backgroundImage: { none: "none", "gradient-to-t": "linear-gradient(to top, var(--tw-gradient-stops))", "gradient-to-tr": "linear-gradient(to top right, var(--tw-gradient-stops))", "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))", "gradient-to-br": "linear-gradient(to bottom right, var(--tw-gradient-stops))", "gradient-to-b": "linear-gradient(to bottom, var(--tw-gradient-stops))", "gradient-to-bl": "linear-gradient(to bottom left, var(--tw-gradient-stops))", "gradient-to-l": "linear-gradient(to left, var(--tw-gradient-stops))", "gradient-to-tl": "linear-gradient(to top left, var(--tw-gradient-stops))" }, backgroundOpacity: ({ theme: t }) => t("opacity"), backgroundPosition: { bottom: "bottom", center: "center", left: "left", "left-bottom": "left bottom", "left-top": "left top", right: "right", "right-bottom": "right bottom", "right-top": "right top", top: "top" }, backgroundSize: { auto: "auto", cover: "cover", contain: "contain" }, blur: { 0: "0", none: "", sm: "4px", DEFAULT: "8px", md: "12px", lg: "16px", xl: "24px", "2xl": "40px", "3xl": "64px" }, borderColor: ({ theme: t }) => ({ DEFAULT: "currentcolor", ...t("colors") }), borderOpacity: ({ theme: t }) => t("opacity"), borderRadius: { none: "0px", sm: "0.125rem", DEFAULT: "0.25rem", md: "0.375rem", lg: "0.5rem", xl: "0.75rem", "2xl": "1rem", "3xl": "1.5rem", full: "9999px" }, borderSpacing: ({ theme: t }) => t("spacing"), borderWidth: { DEFAULT: "1px", 0: "0px", 2: "2px", 4: "4px", 8: "8px", ...ke }, boxShadow: { sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)", DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)", md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)", lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)", xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)", "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)", inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)", none: "none" }, boxShadowColor: ({ theme: t }) => t("colors"), brightness: { 0: "0", 50: ".5", 75: ".75", 90: ".9", 95: ".95", 100: "1", 105: "1.05", 110: "1.1", 125: "1.25", 150: "1.5", 200: "2", ...ie }, caretColor: ({ theme: t }) => t("colors"), colors: () => ({ ...mt }), columns: { auto: "auto", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12", "3xs": "16rem", "2xs": "18rem", xs: "20rem", sm: "24rem", md: "28rem", lg: "32rem", xl: "36rem", "2xl": "42rem", "3xl": "48rem", "4xl": "56rem", "5xl": "64rem", "6xl": "72rem", "7xl": "80rem", ...ae }, container: {}, content: { none: "none" }, contrast: { 0: "0", 50: ".5", 75: ".75", 100: "1", 125: "1.25", 150: "1.5", 200: "2", ...ie }, cursor: { auto: "auto", default: "default", pointer: "pointer", wait: "wait", text: "text", move: "move", help: "help", "not-allowed": "not-allowed", none: "none", "context-menu": "context-menu", progress: "progress", cell: "cell", crosshair: "crosshair", "vertical-text": "vertical-text", alias: "alias", copy: "copy", "no-drop": "no-drop", grab: "grab", grabbing: "grabbing", "all-scroll": "all-scroll", "col-resize": "col-resize", "row-resize": "row-resize", "n-resize": "n-resize", "e-resize": "e-resize", "s-resize": "s-resize", "w-resize": "w-resize", "ne-resize": "ne-resize", "nw-resize": "nw-resize", "se-resize": "se-resize", "sw-resize": "sw-resize", "ew-resize": "ew-resize", "ns-resize": "ns-resize", "nesw-resize": "nesw-resize", "nwse-resize": "nwse-resize", "zoom-in": "zoom-in", "zoom-out": "zoom-out" }, divideColor: ({ theme: t }) => t("borderColor"), divideOpacity: ({ theme: t }) => t("borderOpacity"), divideWidth: ({ theme: t }) => ({ ...t("borderWidth"), ...ke }), dropShadow: { sm: "0 1px 1px rgb(0 0 0 / 0.05)", DEFAULT: ["0 1px 2px rgb(0 0 0 / 0.1)", "0 1px 1px rgb(0 0 0 / 0.06)"], md: ["0 4px 3px rgb(0 0 0 / 0.07)", "0 2px 2px rgb(0 0 0 / 0.06)"], lg: ["0 10px 8px rgb(0 0 0 / 0.04)", "0 4px 3px rgb(0 0 0 / 0.1)"], xl: ["0 20px 13px rgb(0 0 0 / 0.03)", "0 8px 5px rgb(0 0 0 / 0.08)"], "2xl": "0 25px 25px rgb(0 0 0 / 0.15)", none: "0 0 #0000" }, fill: ({ theme: t }) => t("colors"), flex: { 1: "1 1 0%", auto: "1 1 auto", initial: "0 1 auto", none: "none" }, flexBasis: ({ theme: t }) => ({ auto: "auto", "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", "1/5": "20%", "2/5": "40%", "3/5": "60%", "4/5": "80%", "1/6": "16.666667%", "2/6": "33.333333%", "3/6": "50%", "4/6": "66.666667%", "5/6": "83.333333%", "1/12": "8.333333%", "2/12": "16.666667%", "3/12": "25%", "4/12": "33.333333%", "5/12": "41.666667%", "6/12": "50%", "7/12": "58.333333%", "8/12": "66.666667%", "9/12": "75%", "10/12": "83.333333%", "11/12": "91.666667%", full: "100%", ...t("spacing") }), flexGrow: { 0: "0", DEFAULT: "1", ...ae }, flexShrink: { 0: "0", DEFAULT: "1", ...ae }, fontFamily: { sans: ["ui-sans-serif", "system-ui", "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'], serif: ["ui-serif", "Georgia", "Cambria", '"Times New Roman"', "Times", "serif"], mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", '"Liberation Mono"', '"Courier New"', "monospace"] }, fontSize: { xs: ["0.75rem", { lineHeight: "1rem" }], sm: ["0.875rem", { lineHeight: "1.25rem" }], base: ["1rem", { lineHeight: "1.5rem" }], lg: ["1.125rem", { lineHeight: "1.75rem" }], xl: ["1.25rem", { lineHeight: "1.75rem" }], "2xl": ["1.5rem", { lineHeight: "2rem" }], "3xl": ["1.875rem", { lineHeight: "2.25rem" }], "4xl": ["2.25rem", { lineHeight: "2.5rem" }], "5xl": ["3rem", { lineHeight: "1" }], "6xl": ["3.75rem", { lineHeight: "1" }], "7xl": ["4.5rem", { lineHeight: "1" }], "8xl": ["6rem", { lineHeight: "1" }], "9xl": ["8rem", { lineHeight: "1" }] }, fontWeight: { thin: "100", extralight: "200", light: "300", normal: "400", medium: "500", semibold: "600", bold: "700", extrabold: "800", black: "900" }, gap: ({ theme: t }) => t("spacing"), gradientColorStops: ({ theme: t }) => t("colors"), gradientColorStopPositions: { "0%": "0%", "5%": "5%", "10%": "10%", "15%": "15%", "20%": "20%", "25%": "25%", "30%": "30%", "35%": "35%", "40%": "40%", "45%": "45%", "50%": "50%", "55%": "55%", "60%": "60%", "65%": "65%", "70%": "70%", "75%": "75%", "80%": "80%", "85%": "85%", "90%": "90%", "95%": "95%", "100%": "100%", ...ie }, grayscale: { 0: "0", DEFAULT: "100%", ...ie }, gridAutoColumns: { auto: "auto", min: "min-content", max: "max-content", fr: "minmax(0, 1fr)" }, gridAutoRows: { auto: "auto", min: "min-content", max: "max-content", fr: "minmax(0, 1fr)" }, gridColumn: { auto: "auto", "span-1": "span 1 / span 1", "span-2": "span 2 / span 2", "span-3": "span 3 / span 3", "span-4": "span 4 / span 4", "span-5": "span 5 / span 5", "span-6": "span 6 / span 6", "span-7": "span 7 / span 7", "span-8": "span 8 / span 8", "span-9": "span 9 / span 9", "span-10": "span 10 / span 10", "span-11": "span 11 / span 11", "span-12": "span 12 / span 12", "span-full": "1 / -1" }, gridColumnEnd: { auto: "auto", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12", 13: "13", ...ae }, gridColumnStart: { auto: "auto", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12", 13: "13", ...ae }, gridRow: { auto: "auto", "span-1": "span 1 / span 1", "span-2": "span 2 / span 2", "span-3": "span 3 / span 3", "span-4": "span 4 / span 4", "span-5": "span 5 / span 5", "span-6": "span 6 / span 6", "span-7": "span 7 / span 7", "span-8": "span 8 / span 8", "span-9": "span 9 / span 9", "span-10": "span 10 / span 10", "span-11": "span 11 / span 11", "span-12": "span 12 / span 12", "span-full": "1 / -1" }, gridRowEnd: { auto: "auto", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12", 13: "13", ...ae }, gridRowStart: { auto: "auto", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12", 13: "13", ...ae }, gridTemplateColumns: { none: "none", subgrid: "subgrid", 1: "repeat(1, minmax(0, 1fr))", 2: "repeat(2, minmax(0, 1fr))", 3: "repeat(3, minmax(0, 1fr))", 4: "repeat(4, minmax(0, 1fr))", 5: "repeat(5, minmax(0, 1fr))", 6: "repeat(6, minmax(0, 1fr))", 7: "repeat(7, minmax(0, 1fr))", 8: "repeat(8, minmax(0, 1fr))", 9: "repeat(9, minmax(0, 1fr))", 10: "repeat(10, minmax(0, 1fr))", 11: "repeat(11, minmax(0, 1fr))", 12: "repeat(12, minmax(0, 1fr))", ...fi }, gridTemplateRows: { none: "none", subgrid: "subgrid", 1: "repeat(1, minmax(0, 1fr))", 2: "repeat(2, minmax(0, 1fr))", 3: "repeat(3, minmax(0, 1fr))", 4: "repeat(4, minmax(0, 1fr))", 5: "repeat(5, minmax(0, 1fr))", 6: "repeat(6, minmax(0, 1fr))", 7: "repeat(7, minmax(0, 1fr))", 8: "repeat(8, minmax(0, 1fr))", 9: "repeat(9, minmax(0, 1fr))", 10: "repeat(10, minmax(0, 1fr))", 11: "repeat(11, minmax(0, 1fr))", 12: "repeat(12, minmax(0, 1fr))", ...fi }, height: ({ theme: t }) => ({ auto: "auto", "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", "1/5": "20%", "2/5": "40%", "3/5": "60%", "4/5": "80%", "1/6": "16.666667%", "2/6": "33.333333%", "3/6": "50%", "4/6": "66.666667%", "5/6": "83.333333%", full: "100%", screen: "100vh", svh: "100svh", lvh: "100lvh", dvh: "100dvh", min: "min-content", max: "max-content", fit: "fit-content", ...t("spacing") }), hueRotate: { 0: "0deg", 15: "15deg", 30: "30deg", 60: "60deg", 90: "90deg", 180: "180deg", ...gt }, inset: ({ theme: t }) => ({ auto: "auto", "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", full: "100%", ...t("spacing") }), invert: { 0: "0", DEFAULT: "100%", ...ie }, keyframes: { spin: { to: { transform: "rotate(360deg)" } }, ping: { "75%, 100%": { transform: "scale(2)", opacity: "0" } }, pulse: { "50%": { opacity: ".5" } }, bounce: { "0%, 100%": { transform: "translateY(-25%)", animationTimingFunction: "cubic-bezier(0.8,0,1,1)" }, "50%": { transform: "none", animationTimingFunction: "cubic-bezier(0,0,0.2,1)" } } }, letterSpacing: { tighter: "-0.05em", tight: "-0.025em", normal: "0em", wide: "0.025em", wider: "0.05em", widest: "0.1em" }, lineHeight: { none: "1", tight: "1.25", snug: "1.375", normal: "1.5", relaxed: "1.625", loose: "2", 3: ".75rem", 4: "1rem", 5: "1.25rem", 6: "1.5rem", 7: "1.75rem", 8: "2rem", 9: "2.25rem", 10: "2.5rem" }, listStyleType: { none: "none", disc: "disc", decimal: "decimal" }, listStyleImage: { none: "none" }, margin: ({ theme: t }) => ({ auto: "auto", ...t("spacing") }), lineClamp: { 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", ...ae }, maxHeight: ({ theme: t }) => ({ none: "none", full: "100%", screen: "100vh", svh: "100svh", lvh: "100lvh", dvh: "100dvh", min: "min-content", max: "max-content", fit: "fit-content", ...t("spacing") }), maxWidth: ({ theme: t }) => ({ none: "none", xs: "20rem", sm: "24rem", md: "28rem", lg: "32rem", xl: "36rem", "2xl": "42rem", "3xl": "48rem", "4xl": "56rem", "5xl": "64rem", "6xl": "72rem", "7xl": "80rem", full: "100%", min: "min-content", max: "max-content", fit: "fit-content", prose: "65ch", ...t("spacing") }), minHeight: ({ theme: t }) => ({ full: "100%", screen: "100vh", svh: "100svh", lvh: "100lvh", dvh: "100dvh", min: "min-content", max: "max-content", fit: "fit-content", ...t("spacing") }), minWidth: ({ theme: t }) => ({ full: "100%", min: "min-content", max: "max-content", fit: "fit-content", ...t("spacing") }), objectPosition: { bottom: "bottom", center: "center", left: "left", "left-bottom": "left bottom", "left-top": "left top", right: "right", "right-bottom": "right bottom", "right-top": "right top", top: "top" }, opacity: { 0: "0", 5: "0.05", 10: "0.1", 15: "0.15", 20: "0.2", 25: "0.25", 30: "0.3", 35: "0.35", 40: "0.4", 45: "0.45", 50: "0.5", 55: "0.55", 60: "0.6", 65: "0.65", 70: "0.7", 75: "0.75", 80: "0.8", 85: "0.85", 90: "0.9", 95: "0.95", 100: "1", ...ie }, order: { first: "-9999", last: "9999", none: "0", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12", ...ae }, outlineColor: ({ theme: t }) => t("colors"), outlineOffset: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px", ...ke }, outlineWidth: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px", ...ke }, padding: ({ theme: t }) => t("spacing"), placeholderColor: ({ theme: t }) => t("colors"), placeholderOpacity: ({ theme: t }) => t("opacity"), ringColor: ({ theme: t }) => ({ DEFAULT: "currentcolor", ...t("colors") }), ringOffsetColor: ({ theme: t }) => t("colors"), ringOffsetWidth: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px", ...ke }, ringOpacity: ({ theme: t }) => ({ DEFAULT: "0.5", ...t("opacity") }), ringWidth: { DEFAULT: "3px", 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px", ...ke }, rotate: { 0: "0deg", 1: "1deg", 2: "2deg", 3: "3deg", 6: "6deg", 12: "12deg", 45: "45deg", 90: "90deg", 180: "180deg", ...gt }, saturate: { 0: "0", 50: ".5", 100: "1", 150: "1.5", 200: "2", ...ie }, scale: { 0: "0", 50: ".5", 75: ".75", 90: ".9", 95: ".95", 100: "1", 105: "1.05", 110: "1.1", 125: "1.25", 150: "1.5", ...ie }, screens: { sm: "40rem", md: "48rem", lg: "64rem", xl: "80rem", "2xl": "96rem" }, scrollMargin: ({ theme: t }) => t("spacing"), scrollPadding: ({ theme: t }) => t("spacing"), sepia: { 0: "0", DEFAULT: "100%", ...ie }, skew: { 0: "0deg", 1: "1deg", 2: "2deg", 3: "3deg", 6: "6deg", 12: "12deg", ...gt }, space: ({ theme: t }) => t("spacing"), spacing: { px: "1px", 0: "0px", .5: "0.125rem", 1: "0.25rem", 1.5: "0.375rem", 2: "0.5rem", 2.5: "0.625rem", 3: "0.75rem", 3.5: "0.875rem", 4: "1rem", 5: "1.25rem", 6: "1.5rem", 7: "1.75rem", 8: "2rem", 9: "2.25rem", 10: "2.5rem", 11: "2.75rem", 12: "3rem", 14: "3.5rem", 16: "4rem", 20: "5rem", 24: "6rem", 28: "7rem", 32: "8rem", 36: "9rem", 40: "10rem", 44: "11rem", 48: "12rem", 52: "13rem", 56: "14rem", 60: "15rem", 64: "16rem", 72: "18rem", 80: "20rem", 96: "24rem" }, stroke: ({ theme: t }) => ({ none: "none", ...t("colors") }), strokeWidth: { 0: "0", 1: "1", 2: "2", ...ae }, supports: {}, data: {}, textColor: ({ theme: t }) => t("colors"), textDecorationColor: ({ theme: t }) => t("colors"), textDecorationThickness: { auto: "auto", "from-font": "from-font", 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px", ...ke }, textIndent: ({ theme: t }) => t("spacing"), textOpacity: ({ theme: t }) => t("opacity"), textUnderlineOffset: { auto: "auto", 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px", ...ke }, transformOrigin: { center: "center", top: "top", "top-right": "top right", right: "right", "bottom-right": "bottom right", bottom: "bottom", "bottom-left": "bottom left", left: "left", "top-left": "top left" }, transitionDelay: { 0: "0s", 75: "75ms", 100: "100ms", 150: "150ms", 200: "200ms", 300: "300ms", 500: "500ms", 700: "700ms", 1e3: "1000ms", ...ci }, transitionDuration: { DEFAULT: "150ms", 0: "0s", 75: "75ms", 100: "100ms", 150: "150ms", 200: "200ms", 300: "300ms", 500: "500ms", 700: "700ms", 1e3: "1000ms", ...ci }, transitionProperty: { none: "none", all: "all", DEFAULT: "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter", colors: "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke", opacity: "opacity", shadow: "box-shadow", transform: "transform" }, transitionTimingFunction: { DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)", linear: "linear", in: "cubic-bezier(0.4, 0, 1, 1)", out: "cubic-bezier(0, 0, 0.2, 1)", "in-out": "cubic-bezier(0.4, 0, 0.2, 1)" }, translate: ({ theme: t }) => ({ "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", full: "100%", ...t("spacing") }), size: ({ theme: t }) => ({ auto: "auto", "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", "1/5": "20%", "2/5": "40%", "3/5": "60%", "4/5": "80%", "1/6": "16.666667%", "2/6": "33.333333%", "3/6": "50%", "4/6": "66.666667%", "5/6": "83.333333%", "1/12": "8.333333%", "2/12": "16.666667%", "3/12": "25%", "4/12": "33.333333%", "5/12": "41.666667%", "6/12": "50%", "7/12": "58.333333%", "8/12": "66.666667%", "9/12": "75%", "10/12": "83.333333%", "11/12": "91.666667%", full: "100%", min: "min-content", max: "max-content", fit: "fit-content", ...t("spacing") }), width: ({ theme: t }) => ({ auto: "auto", "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", "1/5": "20%", "2/5": "40%", "3/5": "60%", "4/5": "80%", "1/6": "16.666667%", "2/6": "33.333333%", "3/6": "50%", "4/6": "66.666667%", "5/6": "83.333333%", "1/12": "8.333333%", "2/12": "16.666667%", "3/12": "25%", "4/12": "33.333333%", "5/12": "41.666667%", "6/12": "50%", "7/12": "58.333333%", "8/12": "66.666667%", "9/12": "75%", "10/12": "83.333333%", "11/12": "91.666667%", full: "100%", screen: "100vw", svw: "100svw", lvw: "100lvw", dvw: "100dvw", min: "min-content", max: "max-content", fit: "fit-content", ...t("spacing") }), willChange: { auto: "auto", scroll: "scroll-position", contents: "contents", transform: "transform" }, zIndex: { auto: "auto", 0: "0", 10: "10", 20: "20", 30: "30", 40: "40", 50: "50", ...ae } }; function pi(t) { return { theme: { ...di, colors: ({ theme: r }) => r("color", {}), extend: { fontSize: ({ theme: r }) => ({ ...r("text", {}) }), boxShadow: ({ theme: r }) => ({ ...r("shadow", {}) }), animation: ({ theme: r }) => ({ ...r("animate", {}) }), aspectRatio: ({ theme: r }) => ({ ...r("aspect", {}) }), borderRadius: ({ theme: r }) => ({ ...r("radius", {}) }), screens: ({ theme: r }) => ({ ...r("breakpoint", {}) }), letterSpacing: ({ theme: r }) => ({ ...r("tracking", {}) }), lineHeight: ({ theme: r }) => ({ ...r("leading", {}) }), transitionDuration: { DEFAULT: t.get(["--default-transition-duration"]) ?? null }, transitionTimingFunction: { DEFAULT: t.get(["--default-transition-timing-function"]) ?? null }, maxWidth: ({ theme: r }) => ({ ...r("container", {}) }) } } } } var sn = { blocklist: [], future: {}, prefix: "", important: !1, darkMode: null, theme: {}, plugins: [], content: { files: [] } }; function Wt(t, r) { let i = { design: t, configs: [], plugins: [], content: { files: [] }, theme: {}, extend: {}, result: structuredClone(sn) }; for (let o of r) Bt(i, o); for (let o of i.configs) "darkMode" in o && o.darkMode !== void 0 && (i.result.darkMode = o.darkMode ?? null), "prefix" in o && o.prefix !== void 0 && (i.result.prefix = o.prefix ?? ""), "blocklist" in o && o.blocklist !== void 0 && (i.result.blocklist = o.blocklist ?? []), "important" in o && o.important !== void 0 && (i.result.important = o.important ?? !1); let e = cn(i); return { resolvedConfig: { ...i.result, content: i.content, theme: i.theme, plugins: i.plugins }, replacedThemeKeys: e } } function un(t, r) { if (Array.isArray(t) && Re(t[0])) return t.concat(r); if (Array.isArray(r) && Re(r[0]) && Re(t)) return [t, ...r]; if (Array.isArray(r)) return r } function Bt(t, { config: r, base: i, path: e, reference: o }) { let s = []; for (let u of r.plugins ?? []) "__isOptionsFunction" in u ? s.push({ ...u(), reference: o }) : "handler" in u ? s.push({ ...u, reference: o }) : s.push({ handler: u, reference: o }); if (Array.isArray(r.presets) && r.presets.length === 0) throw new Error("Error in the config file/plugin/preset. An empty preset (`preset: []`) is not currently supported."); for (let u of r.presets ?? []) Bt(t, { path: e, base: i, config: u, reference: o }); for (let u of s) t.plugins.push(u), u.config && Bt(t, { path: e, base: i, config: u.config, reference: !!u.reference }); let a = r.content ?? [], f = Array.isArray(a) ? a : a.files; for (let u of f) t.content.files.push(typeof u == "object" ? u : { base: i, pattern: u }); t.configs.push(r); } function cn(t) { let r = new Set, i = dt(t.design, () => t.theme, o), e = Object.assign(i, { theme: i, colors: mt }); function o(s) { return typeof s == "function" ? s(e) ?? null : s ?? null } for (let s of t.configs) { let a = s.theme ?? {}, f = a.extend ?? {}; for (let u in a) u !== "extend" && r.add(u); Object.assign(t.theme, a); for (let u in f) t.extend[u] ??= [], t.extend[u].push(f[u]); } delete t.theme.extend; for (let s in t.extend) { let a = [t.theme[s], ...t.extend[s]]; t.theme[s] = () => { let f = a.map(o); return Le({}, f, un) }; } for (let s in t.theme) t.theme[s] = o(t.theme[s]); if (t.theme.screens && typeof t.theme.screens == "object") for (let s of Object.keys(t.theme.screens)) { let a = t.theme.screens[s]; a && typeof a == "object" && ("raw" in a || "max" in a || "min" in a && (t.theme.screens[s] = a.min)); } return r } function mi(t, r) { let i = t.theme.container || {}; if (typeof i != "object" || i === null) return; let e = fn(i, r); e.length !== 0 && r.utilities.static("container", () => structuredClone(e)); } function fn({ center: t, padding: r, screens: i }, e) { let o = [], s = null; if (t && o.push(l("margin-inline", "auto")), (typeof r == "string" || typeof r == "object" && r !== null && "DEFAULT" in r) && o.push(l("padding-inline", typeof r == "string" ? r : r.DEFAULT)), typeof i == "object" && i !== null) { s = new Map; let a = Array.from(e.theme.namespace("--breakpoint").entries()); if (a.sort((f, u) => ye(f[1], u[1], "asc")), a.length > 0) { let [f] = a[0]; o.push(F("@media", `(width >= --theme(--breakpoint-${f}))`, [l("max-width", "none")])); } for (let [f, u] of Object.entries(i)) { if (typeof u == "object") if ("min" in u) u = u.min; else continue; s.set(f, F("@media", `(width >= ${u})`, [l("max-width", u)])); } } if (typeof r == "object" && r !== null) { let a = Object.entries(r).filter(([f]) => f !== "DEFAULT").map(([f, u]) => [f, e.theme.resolveValue(f, ["--breakpoint"]), u]).filter(Boolean); a.sort((f, u) => ye(f[1], u[1], "asc")); for (let [f, , u] of a) if (s && s.has(f)) s.get(f).nodes.push(l("padding-inline", u)); else { if (s) continue; o.push(F("@media", `(width >= theme(--breakpoint-${f}))`, [l("padding-inline", u)])); } } if (s) for (let [, a] of s) o.push(a); return o } function gi({ addVariant: t, config: r }) { let i = r("darkMode", null), [e, o = ".dark"] = Array.isArray(i) ? i : [i]; if (e === "variant") { let s; if (Array.isArray(o) || typeof o == "function" ? s = o : typeof o == "string" && (s = [o]), Array.isArray(s)) for (let a of s) a === ".dark" ? (e = !1, console.warn('When using `variant` for `darkMode`, you must provide a selector.\nExample: `darkMode: ["variant", ".your-selector &"]`')) : a.includes("&") || (e = !1, console.warn('When using `variant` for `darkMode`, your selector must contain `&`.\nExample `darkMode: ["variant", ".your-selector &"]`')); o = s; } e === null || (e === "selector" ? t("dark", `&:where(${o}, ${o} *)`) : e === "media" ? t("dark", "@media (prefers-color-scheme: dark)") : e === "variant" ? t("dark", o) : e === "class" && t("dark", `&:is(${o} *)`)); } function hi(t) { for (let [r, i] of [["t", "top"], ["tr", "top right"], ["r", "right"], ["br", "bottom right"], ["b", "bottom"], ["bl", "bottom left"], ["l", "left"], ["tl", "top left"]]) t.utilities.static(`bg-gradient-to-${r}`, () => [l("--tw-gradient-position", `to ${i} in oklab`), l("background-image", "linear-gradient(var(--tw-gradient-stops))")]); t.utilities.static("bg-left-top", () => [l("background-position", "left top")]), t.utilities.static("bg-right-top", () => [l("background-position", "right top")]), t.utilities.static("bg-left-bottom", () => [l("background-position", "left bottom")]), t.utilities.static("bg-right-bottom", () => [l("background-position", "right bottom")]), t.utilities.static("object-left-top", () => [l("object-position", "left top")]), t.utilities.static("object-right-top", () => [l("object-position", "right top")]), t.utilities.static("object-left-bottom", () => [l("object-position", "left bottom")]), t.utilities.static("object-right-bottom", () => [l("object-position", "right bottom")]), t.utilities.functional("max-w-screen", r => { if (!r.value || r.value.kind === "arbitrary") return; let i = t.theme.resolve(r.value.value, ["--breakpoint"]); if (i) return [l("max-width", i)] }), t.utilities.static("overflow-ellipsis", () => [l("text-overflow", "ellipsis")]), t.utilities.static("decoration-slice", () => [l("-webkit-box-decoration-break", "slice"), l("box-decoration-break", "slice")]), t.utilities.static("decoration-clone", () => [l("-webkit-box-decoration-break", "clone"), l("box-decoration-break", "clone")]), t.utilities.functional("flex-shrink", r => { if (!r.modifier) { if (!r.value) return [l("flex-shrink", "1")]; if (r.value.kind === "arbitrary") return [l("flex-shrink", r.value.value)]; if (E(r.value.value)) return [l("flex-shrink", r.value.value)] } }), t.utilities.functional("flex-grow", r => { if (!r.modifier) { if (!r.value) return [l("flex-grow", "1")]; if (r.value.kind === "arbitrary") return [l("flex-grow", r.value.value)]; if (E(r.value.value)) return [l("flex-grow", r.value.value)] } }); } function ki(t, r) { let i = t.theme.screens || {}, e = r.variants.get("min")?.order ?? 0, o = []; for (let [a, f] of Object.entries(i)) { let m = function (v) { r.variants.static(a, k => { k.nodes = [F("@media", p, k.nodes)]; }, { order: v }); }; let u = r.variants.get(a), c = r.theme.resolveValue(a, ["--breakpoint"]); if (u && c && !r.theme.hasDefault(`--breakpoint-${a}`)) continue; let g = !0; typeof f == "string" && (g = !1); let p = dn(f); g ? o.push(m) : m(e); } if (o.length !== 0) { for (let [, a] of r.variants.variants) a.order > e && (a.order += o.length); r.variants.compareFns = new Map(Array.from(r.variants.compareFns).map(([a, f]) => (a > e && (a += o.length), [a, f]))); for (let [a, f] of o.entries()) f(e + a + 1); } } function dn(t) { return (Array.isArray(t) ? t : [t]).map(i => typeof i == "string" ? { min: i } : i && typeof i == "object" ? i : null).map(i => { if (i === null) return null; if ("raw" in i) return i.raw; let e = ""; return i.max !== void 0 && (e += `${i.max} >= `), e += "width", i.min !== void 0 && (e += ` >= ${i.min}`), `(${e})` }).filter(Boolean).join(", ") } function vi(t, r) { let i = t.theme.aria || {}, e = t.theme.supports || {}, o = t.theme.data || {}; if (Object.keys(i).length > 0) { let s = r.variants.get("aria"), a = s?.applyFn, f = s?.compounds; r.variants.functional("aria", (u, c) => { let g = c.value; return g && g.kind === "named" && g.value in i ? a?.(u, { ...c, value: { kind: "arbitrary", value: i[g.value] } }) : a?.(u, c) }, { compounds: f }); } if (Object.keys(e).length > 0) { let s = r.variants.get("supports"), a = s?.applyFn, f = s?.compounds; r.variants.functional("supports", (u, c) => { let g = c.value; return g && g.kind === "named" && g.value in e ? a?.(u, { ...c, value: { kind: "arbitrary", value: e[g.value] } }) : a?.(u, c) }, { compounds: f }); } if (Object.keys(o).length > 0) { let s = r.variants.get("data"), a = s?.applyFn, f = s?.compounds; r.variants.functional("data", (u, c) => { let g = c.value; return g && g.kind === "named" && g.value in o ? a?.(u, { ...c, value: { kind: "arbitrary", value: o[g.value] } }) : a?.(u, c) }, { compounds: f }); } } var pn = /^[a-z]+$/; async function bi({ designSystem: t, base: r, ast: i, loadModule: e, sources: o }) {
  	    let s = 0, a = [], f = []; U(i, (p, { parent: m, replaceWith: v, context: k }) => {
  	      if (p.kind === "at-rule") {
  	        if (p.name === "@plugin") {
  	          if (m !== null) throw new Error("`@plugin` cannot be nested."); let x = p.params.slice(1, -1); if (x.length === 0) throw new Error("`@plugin` must have a path."); let y = {}; for (let N of p.nodes ?? []) {
  	            if (N.kind !== "declaration") throw new Error(`Unexpected \`@plugin\` option:

${le([N])}

\`@plugin\` options must be a flat list of declarations.`); if (N.value === void 0) continue; let b = N.value, V = z(b, ",").map(R => {
  	              if (R = R.trim(), R === "null") return null; if (R === "true") return !0; if (R === "false") return !1; if (Number.isNaN(Number(R))) {
  	                if (R[0] === '"' && R[R.length - 1] === '"' || R[0] === "'" && R[R.length - 1] === "'") return R.slice(1, -1); if (R[0] === "{" && R[R.length - 1] === "}") throw new Error(`Unexpected \`@plugin\` option: Value of declaration \`${le([N]).trim()}\` is not supported.

Using an object as a plugin option is currently only supported in JavaScript configuration files.`)
  	              } else return Number(R); return R
  	            }); y[N.property] = V.length === 1 ? V[0] : V;
  	          } a.push([{ id: x, base: k.base, reference: !!k.reference }, Object.keys(y).length > 0 ? y : null]), v([]), s |= 4; return
  	        } if (p.name === "@config") { if (p.nodes.length > 0) throw new Error("`@config` cannot have a body."); if (m !== null) throw new Error("`@config` cannot be nested."); f.push({ id: p.params.slice(1, -1), base: k.base, reference: !!k.reference }), v([]), s |= 4; return }
  	      }
  	    }), hi(t); let u = t.resolveThemeValue; if (t.resolveThemeValue = function (m, v) { return m.startsWith("--") ? u(m, v) : (s |= wi({ designSystem: t, base: r, ast: i, sources: o, configs: [], pluginDetails: [] }), t.resolveThemeValue(m, v)) }, !a.length && !f.length) return 0; let [c, g] = await Promise.all([Promise.all(f.map(async ({ id: p, base: m, reference: v }) => { let k = await e(p, m, "config"); return { path: p, base: k.base, config: k.module, reference: v } })), Promise.all(a.map(async ([{ id: p, base: m, reference: v }, k]) => { let x = await e(p, m, "plugin"); return { path: p, base: x.base, plugin: x.module, options: k, reference: v } }))]); return s |= wi({ designSystem: t, base: r, ast: i, sources: o, configs: c, pluginDetails: g }), s
  	  } function wi({ designSystem: t, base: r, ast: i, sources: e, configs: o, pluginDetails: s }) {
  	    let a = 0, u = [...s.map(y => { if (!y.options) return { config: { plugins: [y.plugin] }, base: y.base, reference: y.reference }; if ("__isOptionsFunction" in y.plugin) return { config: { plugins: [y.plugin(y.options)] }, base: y.base, reference: y.reference }; throw new Error(`The plugin "${y.path}" does not accept options`) }), ...o], { resolvedConfig: c } = Wt(t, [{ config: pi(t.theme), base: r, reference: !0 }, ...u, { config: { plugins: [gi] }, base: r, reference: !0 }]), { resolvedConfig: g, replacedThemeKeys: p } = Wt(t, u), m = t.resolveThemeValue; t.resolveThemeValue = function (N, b) { if (N[0] === "-" && N[1] === "-") return m(N, b); let V = k.theme(N, void 0); if (Array.isArray(V) && V.length === 2) return V[0]; if (Array.isArray(V)) return V.join(", "); if (typeof V == "string") return V }; let v = { designSystem: t, ast: i, resolvedConfig: c, featuresRef: { set current(y) { a |= y; } } }, k = Mt({ ...v, referenceMode: !1 }), x; for (let { handler: y, reference: N } of c.plugins) N ? (x ||= Mt({ ...v, referenceMode: !0 }), y(x)) : y(k); if (Wr(t, g, p), ui(t, g), vi(g, t), ki(g, t), mi(g, t), !t.theme.prefix && c.prefix) { if (c.prefix.endsWith("-") && (c.prefix = c.prefix.slice(0, -1), console.warn(`The prefix "${c.prefix}" is invalid. Prefixes must be lowercase ASCII letters (a-z) only and is written as a variant before all utilities. We have fixed up the prefix for you. Remove the trailing \`-\` to silence this warning.`)), !pn.test(c.prefix)) throw new Error(`The prefix "${c.prefix}" is invalid. Prefixes must be lowercase ASCII letters (a-z) only.`); t.theme.prefix = c.prefix; } if (!t.important && c.important === !0 && (t.important = !0), typeof c.important == "string") { let y = c.important; U(i, (N, { replaceWith: b, parent: V }) => { if (N.kind === "at-rule" && !(N.name !== "@tailwind" || N.params !== "utilities")) return V?.kind === "rule" && V.selector === y ? 2 : (b(M(y, [N])), 2) }); } for (let y of c.blocklist) t.invalidCandidates.add(y); for (let y of c.content.files) {
  	      if ("raw" in y) throw new Error(`Error in the config file/plugin/preset. The \`content\` key contains a \`raw\` entry:

${JSON.stringify(y, null, 2)}

This feature is not currently supported.`); let N = !1; y.pattern[0] == "!" && (N = !0, y.pattern = y.pattern.slice(1)), e.push({ ...y, negated: N });
  	    } return a
  	  } function yi(t) { let r = [0]; for (let o = 0; o < t.length; o++)t.charCodeAt(o) === 10 && r.push(o + 1); function i(o) { let s = 0, a = r.length; for (; a > 0;) { let u = (a | 0) >> 1, c = s + u; r[c] <= o ? (s = c + 1, a = a - u - 1) : a = u; } s -= 1; let f = o - r[s]; return { line: s + 1, column: f } } function e({ line: o, column: s }) { o -= 1, o = Math.min(Math.max(o, 0), r.length - 1); let a = r[o], f = r[o + 1] ?? a; return Math.min(Math.max(a + s, 0), f) } return { find: i, findOffset: e } } function xi({ ast: t }) {
  	    let r = new B(o => yi(o.code)), i = new B(o => ({ url: o.file, content: o.code, ignore: !1 })), e = { file: null, sources: [], mappings: [] }; U(t, o => {
  	      if (!o.src || !o.dst) return; let s = i.get(o.src[0]); if (!s.content) return; let a = r.get(o.src[0]), f = r.get(o.dst[0]), u = s.content.slice(o.src[1], o.src[2]), c = 0; for (let m of u.split(`
`)) { if (m.trim() !== "") { let v = a.find(o.src[1] + c), k = f.find(o.dst[1]); e.mappings.push({ name: null, originalPosition: { source: s, ...v }, generatedPosition: k }); } c += m.length, c += 1; } let g = a.find(o.src[2]), p = f.find(o.dst[2]); e.mappings.push({ name: null, originalPosition: { source: s, ...g }, generatedPosition: p });
  	    }); for (let o of r.keys()) e.sources.push(i.get(o)); return e.mappings.sort((o, s) => o.generatedPosition.line - s.generatedPosition.line || o.generatedPosition.column - s.generatedPosition.column || (o.originalPosition?.line ?? 0) - (s.originalPosition?.line ?? 0) || (o.originalPosition?.column ?? 0) - (s.originalPosition?.column ?? 0)), e
  	  } var Ai = /^(-?\d+)\.\.(-?\d+)(?:\.\.(-?\d+))?$/; function ht(t) { let r = t.indexOf("{"); if (r === -1) return [t]; let i = [], e = t.slice(0, r), o = t.slice(r), s = 0, a = o.lastIndexOf("}"); for (let p = 0; p < o.length; p++) { let m = o[p]; if (m === "{") s++; else if (m === "}" && (s--, s === 0)) { a = p; break } } if (a === -1) throw new Error(`The pattern \`${t}\` is not balanced.`); let f = o.slice(1, a), u = o.slice(a + 1), c; mn(f) ? c = gn(f) : c = z(f, ","), c = c.flatMap(p => ht(p)); let g = ht(u); for (let p of g) for (let m of c) i.push(e + m + p); return i } function mn(t) { return Ai.test(t) } function gn(t) { let r = t.match(Ai); if (!r) return [t]; let [, i, e, o] = r, s = o ? parseInt(o, 10) : void 0, a = []; if (/^-?\d+$/.test(i) && /^-?\d+$/.test(e)) { let f = parseInt(i, 10), u = parseInt(e, 10); if (s === void 0 && (s = f <= u ? 1 : -1), s === 0) throw new Error("Step cannot be zero in sequence expansion."); let c = f < u; c && s < 0 && (s = -s), !c && s > 0 && (s = -s); for (let g = f; c ? g <= u : g >= u; g += s)a.push(g.toString()); } return a } var hn = /^[a-z]+$/; function kn() { throw new Error("No `loadModule` function provided to `compile`") } function vn() { throw new Error("No `loadStylesheet` function provided to `compile`") } function wn(t) { let r = 0, i = null; for (let e of z(t, " ")) e === "reference" ? r |= 2 : e === "inline" ? r |= 1 : e === "default" ? r |= 4 : e === "static" ? r |= 8 : e.startsWith("prefix(") && e.endsWith(")") && (i = e.slice(7, -1)); return [r, i] } async function bn(t, { base: r = "", from: i, loadModule: e = kn, loadStylesheet: o = vn } = {}) {
  	    let s = 0; t = [ue({ base: r }, t)], s |= await Ft(t, r, o, 0, i !== void 0); let a = null, f = new Qe, u = [], c = [], g = null, p = null, m = [], v = [], k = [], x = [], y = null; U(t, (b, { parent: V, replaceWith: R, context: D }) => {
  	      if (b.kind === "at-rule") {
  	        if (b.name === "@tailwind" && (b.params === "utilities" || b.params.startsWith("utilities"))) { if (p !== null) { R([]); return } if (D.reference) { R([]); return } let _ = z(b.params, " "); for (let L of _) if (L.startsWith("source(")) { let O = L.slice(7, -1); if (O === "none") { y = O; continue } if (O[0] === '"' && O[O.length - 1] !== '"' || O[0] === "'" && O[O.length - 1] !== "'" || O[0] !== "'" && O[0] !== '"') throw new Error("`source(\u2026)` paths must be quoted."); y = { base: D.sourceBase ?? D.base, pattern: O.slice(1, -1) }; } p = b, s |= 16; } if (b.name === "@utility") { if (V !== null) throw new Error("`@utility` cannot be nested."); if (b.nodes.length === 0) throw new Error(`\`@utility ${b.params}\` is empty. Utilities should include at least one property.`); let _ = Pr(b); if (_ === null) throw new Error(`\`@utility ${b.params}\` defines an invalid utility name. Utilities should be alphanumeric and start with a lowercase letter.`); c.push(_); } if (b.name === "@source") { if (b.nodes.length > 0) throw new Error("`@source` cannot have a body."); if (V !== null) throw new Error("`@source` cannot be nested."); let _ = !1, L = !1, O = b.params; if (O[0] === "n" && O.startsWith("not ") && (_ = !0, O = O.slice(4)), O[0] === "i" && O.startsWith("inline(") && (L = !0, O = O.slice(7, -1)), O[0] === '"' && O[O.length - 1] !== '"' || O[0] === "'" && O[O.length - 1] !== "'" || O[0] !== "'" && O[0] !== '"') throw new Error("`@source` paths must be quoted."); let H = O.slice(1, -1); if (L) { let I = _ ? x : k, q = z(H, " "); for (let X of q) for (let oe of ht(X)) I.push(oe); } else v.push({ base: D.base, pattern: H, negated: _ }); R([]); return } if (b.name === "@variant" && (V === null ? b.nodes.length === 0 ? b.name = "@custom-variant" : (U(b.nodes, _ => { if (_.kind === "at-rule" && _.name === "@slot") return b.name = "@custom-variant", 2 }), b.name === "@variant" && m.push(b)) : m.push(b)), b.name === "@custom-variant") { if (V !== null) throw new Error("`@custom-variant` cannot be nested."); R([]); let [_, L] = z(b.params, " "); if (!ut.test(_)) throw new Error(`\`@custom-variant ${_}\` defines an invalid variant name. Variants should only contain alphanumeric, dashes or underscore characters.`); if (b.nodes.length > 0 && L) throw new Error(`\`@custom-variant ${_}\` cannot have both a selector and a body.`); if (b.nodes.length === 0) { if (!L) throw new Error(`\`@custom-variant ${_}\` has no selector or body.`); let O = z(L.slice(1, -1), ","); if (O.length === 0 || O.some(q => q.trim() === "")) throw new Error(`\`@custom-variant ${_} (${O.join(",")})\` selector is invalid.`); let H = [], I = []; for (let q of O) q = q.trim(), q[0] === "@" ? H.push(q) : I.push(q); u.push(q => { q.variants.static(_, X => { let oe = []; I.length > 0 && oe.push(M(I.join(", "), X.nodes)); for (let n of H) oe.push(G(n, X.nodes)); X.nodes = oe; }, { compounds: Ae([...I, ...H]) }); }); return } else { u.push(O => { O.variants.fromAst(_, b.nodes); }); return } } if (b.name === "@media") { let _ = z(b.params, " "), L = []; for (let O of _) if (O.startsWith("source(")) { let H = O.slice(7, -1); U(b.nodes, (I, { replaceWith: q }) => { if (I.kind === "at-rule" && I.name === "@tailwind" && I.params === "utilities") return I.params += ` source(${H})`, q([ue({ sourceBase: D.base }, [I])]), 2 }); } else if (O.startsWith("theme(")) { let H = O.slice(6, -1), I = H.includes("reference"); U(b.nodes, q => { if (q.kind !== "at-rule") { if (I) throw new Error('Files imported with `@import "\u2026" theme(reference)` must only contain `@theme` blocks.\nUse `@reference "\u2026";` instead.'); return 0 } if (q.name === "@theme") return q.params += " " + H, 1 }); } else if (O.startsWith("prefix(")) { let H = O.slice(7, -1); U(b.nodes, I => { if (I.kind === "at-rule" && I.name === "@theme") return I.params += ` prefix(${H})`, 1 }); } else O === "important" ? a = !0 : O === "reference" ? b.nodes = [ue({ reference: !0 }, b.nodes)] : L.push(O); L.length > 0 ? b.params = L.join(" ") : _.length > 0 && R(b.nodes); } if (b.name === "@theme") {
  	          let [_, L] = wn(b.params); if (D.reference && (_ |= 2), L) { if (!hn.test(L)) throw new Error(`The prefix "${L}" is invalid. Prefixes must be lowercase ASCII letters (a-z) only.`); f.prefix = L; } return U(b.nodes, O => {
  	            if (O.kind === "at-rule" && O.name === "@keyframes") return f.addKeyframes(O), 1; if (O.kind === "comment") return; if (O.kind === "declaration" && O.property.startsWith("--")) { f.add(ve(O.property), O.value ?? "", _, O.src); return } let H = le([F(b.name, b.params, [O])]).split(`
`).map((I, q, X) => `${q === 0 || q >= X.length - 2 ? " " : ">"} ${I}`).join(`
`); throw new Error(`\`@theme\` blocks must only contain custom properties or \`@keyframes\`.

${H}`)
  	          }), g ? R([]) : (g = M(":root, :host", []), g.src = b.src, R([g])), 1
  	        }
  	      }
  	    }); let N = Lr(f); if (a && (N.important = a), x.length > 0) for (let b of x) N.invalidCandidates.add(b); s |= await bi({ designSystem: N, base: r, ast: t, loadModule: e, sources: v }); for (let b of u) b(N); for (let b of c) b(N); if (g) { let b = []; for (let [R, D] of N.theme.entries()) { if (D.options & 2) continue; let _ = l(me(R), D.value); _.src = D.src, b.push(_); } let V = N.theme.getKeyframes(); for (let R of V) t.push(ue({ theme: !0 }, [j([R])])); g.nodes = [ue({ theme: !0 }, b)]; } if (p) { let b = p; b.kind = "context", b.context = {}; } if (m.length > 0) { for (let b of m) { let V = M("&", b.nodes), R = b.params, D = N.parseVariant(R); if (D === null) throw new Error(`Cannot use \`@variant\` with unknown variant: ${R}`); if (Te(V, D, N.variants) === null) throw new Error(`Cannot use \`@variant\` with variant: ${R}`); Object.assign(b, V); } s |= 32; } return s |= Ve(t, N), s |= je(t, N), U(t, (b, { replaceWith: V }) => { if (b.kind === "at-rule") return b.name === "@utility" && V([]), 1 }), { designSystem: N, ast: t, sources: v, root: y, utilitiesNode: p, features: s, inlineCandidates: k }
  	  } async function yn(t, r = {}) { let { designSystem: i, ast: e, sources: o, root: s, utilitiesNode: a, features: f, inlineCandidates: u } = await bn(t, r); e.unshift(Je(`! tailwindcss v${Yt} | MIT License | https://tailwindcss.com `)); function c(k) { i.invalidCandidates.add(k); } let g = new Set, p = null, m = 0, v = !1; for (let k of u) i.invalidCandidates.has(k) || (g.add(k), v = !0); return { sources: o, root: s, features: f, build(k) { if (f === 0) return t; if (!a) return p ??= be(e, i, r.polyfills), p; let x = v, y = !1; v = !1; let N = g.size; for (let V of k) if (!i.invalidCandidates.has(V)) if (V[0] === "-" && V[1] === "-") { let R = i.theme.markUsedVariable(V); x ||= R, y ||= R; } else g.add(V), x ||= g.size !== N; if (!x) return p ??= be(e, i, r.polyfills), p; let b = he(g, i, { onInvalidCandidate: c }).astNodes; return r.from && U(b, V => { V.src ??= a.src; }), !y && m === b.length ? (p ??= be(e, i, r.polyfills), p) : (m = b.length, a.nodes = b, p = be(e, i, r.polyfills), p) } } } async function Ci(t, r = {}) { let i = Se(t, { from: r.from }), e = await yn(i, r), o = i, s = t; return { ...e, build(a) { let f = e.build(a); return f === o || (s = le(f, !!r.from), o = f), s }, buildSourceMap() { return xi({ ast: o }) } } } var Si = `@layer theme, base, components, utilities;

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
  	  } async function En(t, r) { function i() { if (t === "tailwindcss") return { path: "virtual:tailwindcss/index.css", base: r, content: Be.index }; if (t === "tailwindcss/preflight" || t === "tailwindcss/preflight.css" || t === "./preflight.css") return { path: "virtual:tailwindcss/preflight.css", base: r, content: Be.preflight }; if (t === "tailwindcss/theme" || t === "tailwindcss/theme.css" || t === "./theme.css") return { path: "virtual:tailwindcss/theme.css", base: r, content: Be.theme }; if (t === "tailwindcss/utilities" || t === "tailwindcss/utilities.css" || t === "./utilities.css") return { path: "virtual:tailwindcss/utilities.css", base: r, content: Be.utilities }; throw new Error(`The browser build does not support @import for "${t}"`) } try { let e = i(); return re.hit("Loaded stylesheet", { id: t, base: r, size: e.content.length }), e } catch (e) { throw re.hit("Failed to load stylesheet", { id: t, base: r, error: e.message ?? e }), e } } async function Rn() { throw new Error("The browser build does not support plugins or config files.") } async function Pn(t) { if (!vt) return; let r = new Set; re.start("Collect classes"); for (let i of document.querySelectorAll("[class]")) for (let e of i.classList) Ht.has(e) || (Ht.add(e), r.add(e)); re.end("Collect classes", { count: r.size }), !(r.size === 0 && t === "incremental") && (re.start("Build utilities"), Gt.textContent = vt.build(Array.from(r)), re.end("Build utilities")); } function wt(t) { async function r() { if (!vt && t !== "full") return; let i = Vn++; re.start(`Build #${i} (${t})`), t === "full" && await Tn(), re.start("Build"), await Pn(t), re.end("Build"), re.end(`Build #${i} (${t})`); } Ti = Ti.then(r).catch(i => re.error(i)); } var On = new MutationObserver(() => wt("full")); function Ri(t) { On.observe(t, { attributes: !0, attributeFilter: ["type"], characterData: !0, subtree: !0, childList: !0 }); } new MutationObserver(t => { let r = 0, i = 0; for (let e of t) { for (let o of e.addedNodes) o.nodeType === Node.ELEMENT_NODE && o.tagName === "STYLE" && o.getAttribute("type") === Ei && (Ri(o), r++); for (let o of e.addedNodes) o.nodeType === 1 && o !== Gt && i++; e.type === "attributes" && i++; } if (r > 0) return wt("full"); if (i > 0) return wt("incremental") }).observe(document.documentElement, { attributes: !0, attributeFilter: ["class"], childList: !0, subtree: !0 }); wt("full"); document.head.append(Gt);
  	})();
  	return tailwind_v4_1;
  }

  requireTailwind_v4_1();

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

          // Use a single MutationObserver for all DOM changes
          const observer = new MutationObserver((mutations) => {
              let shouldRecompile = false;

              for (const mutation of mutations) {
                  if (mutation.type === 'childList') {
                      for (const node of mutation.addedNodes) {
                          if (node.nodeType === Node.ELEMENT_NODE &&
                              (node.hasAttribute('data-component') ||
                                  node.querySelector('[data-component]'))) {
                              shouldRecompile = true;
                              break;
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
              subtree: true
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
                  console.warn('[TailwindCompiler] Tailwind not found after 5 seconds, proceeding anyway');
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
                      // Only process local files
                      if (sheet.href && sheet.href.startsWith(window.location.origin)) {
                          this.cssFiles.add(sheet.href);
                      }

                      // Get all @import rules
                      const rules = Array.from(sheet.cssRules || []);
                      for (const rule of rules) {
                          if (rule.type === CSSRule.IMPORT_RULE &&
                              rule.href.startsWith(window.location.origin)) {
                              this.cssFiles.add(rule.href);
                          }
                      }
                  } catch (e) {
                      // Skip stylesheets that can't be accessed due to CORS
                      console.warn('Skipped stylesheet due to CORS:', sheet.href || 'inline');
                  }
              }

              // Add any inline styles
              const styleElements = document.querySelectorAll('style');
              for (const style of styleElements) {
                  if (style.textContent) {
                      const id = style.id || 'inline-style';
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

      getUsedClasses() {
          try {
              const usedClasses = new Set();
              const usedVariableSuffixes = new Set();

              // Scan current DOM (including index.html and all loaded components)
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

                      // Add the full class name (including variants)
                      usedClasses.add(cls);

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
              }

              return {
                  classes: Array.from(usedClasses),
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

                      if (source.startsWith('inline:')) {
                          const styleId = source.replace('inline:', '');
                          const styleElement = styleId ?
                              document.getElementById(styleId) :
                              document.querySelector('style');
                          if (styleElement) {
                              content = styleElement.textContent;
                          }
                      } else {
                          // Add timestamp to prevent caching
                          const timestamp = Date.now();
                          const url = `${source}?t=${timestamp}`;

                          const response = await fetch(url, {
                              cache: 'no-store',
                              headers: {
                                  'Cache-Control': 'no-cache',
                                  'Pragma': 'no-cache'
                              }
                          });

                          if (!response.ok) {
                              console.warn('Failed to fetch stylesheet:', url);
                              return;
                          }

                          content = await response.text();
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

          // Split by variant separator
          const parts = className.split(':');
          result.baseClass = parts.pop(); // Last part is always the base class

          // Process variants in order (left to right)
          result.variants = parts.map(variant => {
              const selector = this.variants[variant];
              if (!selector) {
                  console.warn(`Unknown variant: ${variant}`);
                  return null;
              }
              return {
                  name: variant,
                  selector: selector
              };
          }).filter(Boolean);

          // Cache the result
          this.classCache.set(className, result);
          return result;
      }

      generateUtilitiesFromVars(cssText, usedData) {
          try {
              const utilities = [];
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
                          return parts[parts.length - 1] === baseClass;
                      });

                  // Generate base utility if it's used directly
                  if (usedClasses.includes(baseClass)) {
                      utilities.push(`.${escapeClassName(baseClass)} { ${css} }`);
                  }

                  // Generate each variant as a separate class
                  for (const variantClass of usedVariants) {
                      if (variantClass === baseClass) continue;

                      const parts = variantClass.split(':');
                      const variants = parts.slice(0, -1);

                      // For pseudo-classes, we need to generate a rule that matches the actual class name
                      if (variants.length === 1 && this.variants[variants[0]]?.startsWith(':')) {
                          // Generate a rule that matches the actual class name and applies the pseudo-class
                          const pseudoClass = this.variants[variants[0]];
                          const rule = `.${escapeClassName(variantClass)}${pseudoClass} { ${css} }`;
                          utilities.push(rule);
                      } else {
                          // For other variants (like dark mode, media queries)
                          let selector = `.${escapeClassName(variantClass)}`;
                          for (const variant of variants) {
                              const variantSelector = this.variants[variant];
                              if (!variantSelector) continue;

                              if (variantSelector.startsWith('@')) {
                                  // For media queries, we need to include the CSS content inside the media query block
                                  selector = `${variantSelector} { ${selector} { ${css} } }`;

                                  // Skip the final utilities.push since we already included the CSS content
                                  continue;
                              } else if (variantSelector.startsWith('.')) {
                                  selector = variantSelector.replace('&', selector);
                              }
                          }
                          const finalRule = `${selector} { ${css} }`;
                          utilities.push(finalRule);
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
                          // Check if this specific utility class is actually used (including variants)
                          const isUsed = usedClasses.some(cls => {
                              const parts = cls.split(':');
                              const baseClass = parts[parts.length - 1];
                              return baseClass === className;
                          });
                          if (isUsed) {
                              generateUtility(className, css);
                          }

                          // Check for opacity variants of this utility
                          const opacityVariants = usedClasses.filter(cls => {
                              // Check if this class has an opacity modifier and matches our base class
                              if (cls.includes('/') && cls.startsWith(className + '/')) {
                                  const opacity = cls.split('/')[1];
                                  // Validate that the opacity is a number between 0-100
                                  return !isNaN(opacity) && opacity >= 0 && opacity <= 100;
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

              // Get used classes first
              const usedData = this.getUsedClasses();

              // If no classes found, wait a bit and try again
              if (usedData.classes.length === 0) {
                  await new Promise(resolve => setTimeout(resolve, 100));
                  this.isCompiling = false;
                  return this.compile();
              }

              // Start fetching theme content
              const themeCss = await this.fetchThemeContent();
              if (!themeCss) return;

              // Process theme content and generate utilities in one pass
              const variables = this.extractThemeVariables(themeCss);
              if (variables.size === 0) return;

              // Update variables and check for changes
              let hasChanges = false;
              for (const [name, value] of variables.entries()) {
                  const currentValue = this.currentThemeVars.get(name);
                  if (currentValue !== value) {
                      hasChanges = true;
                      this.currentThemeVars.set(name, value);
                  }
              }

              // Always generate utilities when variables change or when we have new classes
              if (hasChanges || usedData.classes.length > 0) {
                  const utilities = this.generateUtilitiesFromVars(themeCss, usedData);
                  if (!utilities) return;

                  const finalCss = `@layer utilities {\n${utilities}\n}`;
                  this.styleElement.textContent = finalCss;

                  // Cache the result
                  const themeHash = this.generateThemeHash(themeCss);
                  const cacheKey = `${themeHash}:${usedData.classes.sort().join(',')}`;
                  this.cache.set(cacheKey, {
                      css: finalCss,
                      timestamp: Date.now(),
                      themeHash: themeHash
                  });
                  this.savePersistentCache();
                  this.cleanupCache();
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

  // Also handle DOMContentLoaded for any elements that might be added later
  document.addEventListener('DOMContentLoaded', () => {
      if (!compiler.isCompiling) {
          compiler.compile();
      }
  });

  /*! Indux Components 1.0.0 - MIT License */



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
          // Collect properties from placeholder attributes
          const props = {};
          Array.from(element.attributes).forEach(attr => {
              if (attr.name !== name && attr.name !== 'class' && !attr.name.startsWith('data-')) {
                  props[attr.name.toLowerCase()] = attr.value;
              }
          });
          // Process $attribute usage in all elements
          const processElementProps = (el) => {
              Array.from(el.attributes).forEach(attr => {
                  const value = attr.value.trim();
                  if (value.includes('$attribute(')) {
                      const propMatch = value.match(/\$attribute\(['"]([^'"]+)['"]\)/);
                      if (propMatch) {
                          const propName = propMatch[1].toLowerCase();
                          const propValue = props[propName] || '';
                          if (attr.name === 'class') {
                              const existingClasses = el.getAttribute('class') || '';
                              const newClasses = existingClasses
                                  .replace(new RegExp(`\$attribute\(['"]${propName}['"]\)`, 'i'), propValue)
                                  .split(' ')
                                  .filter(Boolean)
                                  .join(' ');
                              el.setAttribute('class', newClasses);
                          } else if (
                              attr.name.startsWith('x-') ||
                              attr.name.startsWith(':') ||
                              attr.name.startsWith('@') ||
                              attr.name.startsWith('x-bind:') ||
                              attr.name.startsWith('x-on:')
                          ) {
                              const escapedValue = propValue
                                  .replace(/\\/g, '\\\\')
                                  .replace(/'/g, "\\'")
                                  .replace(/\"/g, '\\"')
                                  .replace(/`/g, '\\`');
                              if (value !== `$attribute('${propName}')`) {
                                  const newValue = value.replace(
                                      /\$attribute\(['"]([^'"]+)['"]\)/g,
                                      (_, name) => `\`${props[name.toLowerCase()] || ''}\``
                                  );
                                  el.setAttribute(attr.name, newValue);
                              } else {
                                  el.setAttribute(attr.name, `\`${escapedValue}\``);
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
                      'x-route-*', 'data-route-*'
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
      },
      initialize() {
      }
  }; 

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

  /*! Indux Anchors 1.0.0 - MIT License */

  // Initialize plugin when Alpine is ready
  function initializeAnchorsPlugin() {
      // Register anchors directive
      Alpine.directive('anchors', (el, { expression, modifiers }, { effect, evaluateLater }) => {
          const getTarget = evaluateLater(expression || 'null');

          effect(() => {
              getTarget(async (target) => {
                  const extractHeadings = () => {
                      let headings = [];

                      if (target) {
                          // If target is a string, treat as selector
                          if (typeof target === 'string') {
                              const targetEl = document.querySelector(target);
                              if (targetEl) {
                                  const headingElements = targetEl.querySelectorAll('h1, h2, h3');
                                  headings = Array.from(headingElements).map(heading => ({
                                      id: heading.id,
                                      text: heading.textContent,
                                      level: parseInt(heading.tagName.charAt(1))
                                  }));
                              }
                          }
                          // If target is a DOM element, extract headings from it
                          else if (target && target.querySelectorAll) {
                              const headingElements = target.querySelectorAll('h1, h2, h3');
                              headings = Array.from(headingElements).map(heading => ({
                                  id: heading.id,
                                  text: heading.textContent,
                                  level: parseInt(heading.tagName.charAt(1))
                              }));
                          }
                      }

                      return headings;
                  };

                  const updateHeadings = (headings) => {
                      // Store headings in Alpine data
                      const parentElement = el.closest('[x-data]') || document.body;
                      if (parentElement._x_dataStack && parentElement._x_dataStack[0]) {
                          parentElement._x_dataStack[0].anchorHeadings = headings;
                      } else {
                          if (!parentElement._x_dataStack) {
                              parentElement._x_dataStack = [{}];
                          }
                          parentElement._x_dataStack[0].anchorHeadings = headings;
                          if (window.Alpine) {
                              Alpine.nextTick(() => {
                                  Alpine.initTree(parentElement);
                              });
                          }
                      }
                  };

                  // Try immediately
                  let headings = extractHeadings();

                  // If no headings found, set up a MutationObserver
                  if (headings.length === 0) {
                      if (typeof target === 'string') {
                          const targetEl = document.querySelector(target);
                          if (targetEl) {
                              const observer = new MutationObserver((mutations) => {
                                  const newHeadings = extractHeadings();
                                  if (newHeadings.length > 0) {
                                      updateHeadings(newHeadings);
                                      observer.disconnect();
                                  }
                              });

                              observer.observe(targetEl, {
                                  childList: true,
                                  subtree: true
                              });

                              // Also try a few times with setTimeout as fallback
                              let attempts = 0;
                              const tryAgain = () => {
                                  attempts++;
                                  const newHeadings = extractHeadings();
                                  if (newHeadings.length > 0) {
                                      updateHeadings(newHeadings);
                                      observer.disconnect();
                                  } else if (attempts < 10) {
                                      setTimeout(tryAgain, 200);
                                  } else {
                                      observer.disconnect();
                                  }
                              };
                              setTimeout(tryAgain, 200);
                          }
                      }
                  }

                  updateHeadings(headings);
              });
          });
      });
  }

  // Handle both DOMContentLoaded and alpine:init
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
          if (window.Alpine) initializeAnchorsPlugin();
      });
  }

  document.addEventListener('alpine:init', initializeAnchorsPlugin);

  /*! Indux Carousels 1.0.0 - MIT License */

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

  var indux_collections$1 = {exports: {}};

  /*! Indux Collections 1.0.0 - MIT License */
  var indux_collections = indux_collections$1.exports;

  var hasRequiredIndux_collections;

  function requireIndux_collections () {
  	if (hasRequiredIndux_collections) return indux_collections$1.exports;
  	hasRequiredIndux_collections = 1;
  	(function (module, exports) {
  		/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
  		!function (e, t) { t(exports) ; }(indux_collections, (function (e) { function t(e) { return null == e } var n = { isNothing: t, isObject: function (e) { return "object" == typeof e && null !== e }, toArray: function (e) { return Array.isArray(e) ? e : t(e) ? [] : [e] }, repeat: function (e, t) { var n, i = ""; for (n = 0; n < t; n += 1)i += e; return i }, isNegativeZero: function (e) { return 0 === e && Number.NEGATIVE_INFINITY === 1 / e }, extend: function (e, t) { var n, i, r, o; if (t) for (n = 0, i = (o = Object.keys(t)).length; n < i; n += 1)e[r = o[n]] = t[r]; return e } }; function i(e, t) { var n = "", i = e.reason || "(unknown reason)"; return e.mark ? (e.mark.name && (n += 'in "' + e.mark.name + '" '), n += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (n += "\n\n" + e.mark.snippet), i + " " + n) : i } function r(e, t) { Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = i(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = (new Error).stack || ""; } r.prototype = Object.create(Error.prototype), r.prototype.constructor = r, r.prototype.toString = function (e) { return this.name + ": " + i(this, e) }; var o = r; function a(e, t, n, i, r) { var o = "", a = "", l = Math.floor(r / 2) - 1; return i - t > l && (t = i - l + (o = " ... ").length), n - i > l && (n = i + l - (a = " ...").length), { str: o + e.slice(t, n).replace(/\t/g, "→") + a, pos: i - t + o.length } } function l(e, t) { return n.repeat(" ", t - e.length) + e } var c = function (e, t) { if (t = Object.create(t || null), !e.buffer) return null; t.maxLength || (t.maxLength = 79), "number" != typeof t.indent && (t.indent = 1), "number" != typeof t.linesBefore && (t.linesBefore = 3), "number" != typeof t.linesAfter && (t.linesAfter = 2); for (var i, r = /\r?\n|\r|\0/g, o = [0], c = [], s = -1; i = r.exec(e.buffer);)c.push(i.index), o.push(i.index + i[0].length), e.position <= i.index && s < 0 && (s = o.length - 2); s < 0 && (s = o.length - 1); var u, p, f = "", d = Math.min(e.line + t.linesAfter, c.length).toString().length, h = t.maxLength - (t.indent + d + 3); for (u = 1; u <= t.linesBefore && !(s - u < 0); u++)p = a(e.buffer, o[s - u], c[s - u], e.position - (o[s] - o[s - u]), h), f = n.repeat(" ", t.indent) + l((e.line - u + 1).toString(), d) + " | " + p.str + "\n" + f; for (p = a(e.buffer, o[s], c[s], e.position, h), f += n.repeat(" ", t.indent) + l((e.line + 1).toString(), d) + " | " + p.str + "\n", f += n.repeat("-", t.indent + d + 3 + p.pos) + "^\n", u = 1; u <= t.linesAfter && !(s + u >= c.length); u++)p = a(e.buffer, o[s + u], c[s + u], e.position - (o[s] - o[s + u]), h), f += n.repeat(" ", t.indent) + l((e.line + u + 1).toString(), d) + " | " + p.str + "\n"; return f.replace(/\n$/, "") }, s = ["kind", "multi", "resolve", "construct", "instanceOf", "predicate", "represent", "representName", "defaultStyle", "styleAliases"], u = ["scalar", "sequence", "mapping"]; var p = function (e, t) { if (t = t || {}, Object.keys(t).forEach((function (t) { if (-1 === s.indexOf(t)) throw new o('Unknown option "' + t + '" is met in definition of "' + e + '" YAML type.') })), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function () { return !0 }, this.construct = t.construct || function (e) { return e }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = function (e) { var t = {}; return null !== e && Object.keys(e).forEach((function (n) { e[n].forEach((function (e) { t[String(e)] = n; })); })), t }(t.styleAliases || null), -1 === u.indexOf(this.kind)) throw new o('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.') }; function f(e, t) { var n = []; return e[t].forEach((function (e) { var t = n.length; n.forEach((function (n, i) { n.tag === e.tag && n.kind === e.kind && n.multi === e.multi && (t = i); })), n[t] = e; })), n } function d(e) { return this.extend(e) } d.prototype.extend = function (e) { var t = [], n = []; if (e instanceof p) n.push(e); else if (Array.isArray(e)) n = n.concat(e); else { if (!e || !Array.isArray(e.implicit) && !Array.isArray(e.explicit)) throw new o("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })"); e.implicit && (t = t.concat(e.implicit)), e.explicit && (n = n.concat(e.explicit)); } t.forEach((function (e) { if (!(e instanceof p)) throw new o("Specified list of YAML types (or a single Type object) contains a non-Type object."); if (e.loadKind && "scalar" !== e.loadKind) throw new o("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported."); if (e.multi) throw new o("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.") })), n.forEach((function (e) { if (!(e instanceof p)) throw new o("Specified list of YAML types (or a single Type object) contains a non-Type object.") })); var i = Object.create(d.prototype); return i.implicit = (this.implicit || []).concat(t), i.explicit = (this.explicit || []).concat(n), i.compiledImplicit = f(i, "implicit"), i.compiledExplicit = f(i, "explicit"), i.compiledTypeMap = function () { var e, t, n = { scalar: {}, sequence: {}, mapping: {}, fallback: {}, multi: { scalar: [], sequence: [], mapping: [], fallback: [] } }; function i(e) { e.multi ? (n.multi[e.kind].push(e), n.multi.fallback.push(e)) : n[e.kind][e.tag] = n.fallback[e.tag] = e; } for (e = 0, t = arguments.length; e < t; e += 1)arguments[e].forEach(i); return n }(i.compiledImplicit, i.compiledExplicit), i }; var h = d, g = new p("tag:yaml.org,2002:str", { kind: "scalar", construct: function (e) { return null !== e ? e : "" } }), m = new p("tag:yaml.org,2002:seq", { kind: "sequence", construct: function (e) { return null !== e ? e : [] } }), y = new p("tag:yaml.org,2002:map", { kind: "mapping", construct: function (e) { return null !== e ? e : {} } }), b = new h({ explicit: [g, m, y] }); var A = new p("tag:yaml.org,2002:null", { kind: "scalar", resolve: function (e) { if (null === e) return !0; var t = e.length; return 1 === t && "~" === e || 4 === t && ("null" === e || "Null" === e || "NULL" === e) }, construct: function () { return null }, predicate: function (e) { return null === e }, represent: { canonical: function () { return "~" }, lowercase: function () { return "null" }, uppercase: function () { return "NULL" }, camelcase: function () { return "Null" }, empty: function () { return "" } }, defaultStyle: "lowercase" }); var v = new p("tag:yaml.org,2002:bool", { kind: "scalar", resolve: function (e) { if (null === e) return !1; var t = e.length; return 4 === t && ("true" === e || "True" === e || "TRUE" === e) || 5 === t && ("false" === e || "False" === e || "FALSE" === e) }, construct: function (e) { return "true" === e || "True" === e || "TRUE" === e }, predicate: function (e) { return "[object Boolean]" === Object.prototype.toString.call(e) }, represent: { lowercase: function (e) { return e ? "true" : "false" }, uppercase: function (e) { return e ? "TRUE" : "FALSE" }, camelcase: function (e) { return e ? "True" : "False" } }, defaultStyle: "lowercase" }); function w(e) { return 48 <= e && e <= 55 } function k(e) { return 48 <= e && e <= 57 } var C = new p("tag:yaml.org,2002:int", { kind: "scalar", resolve: function (e) { if (null === e) return !1; var t, n, i = e.length, r = 0, o = !1; if (!i) return !1; if ("-" !== (t = e[r]) && "+" !== t || (t = e[++r]), "0" === t) { if (r + 1 === i) return !0; if ("b" === (t = e[++r])) { for (r++; r < i; r++)if ("_" !== (t = e[r])) { if ("0" !== t && "1" !== t) return !1; o = !0; } return o && "_" !== t } if ("x" === t) { for (r++; r < i; r++)if ("_" !== (t = e[r])) { if (!(48 <= (n = e.charCodeAt(r)) && n <= 57 || 65 <= n && n <= 70 || 97 <= n && n <= 102)) return !1; o = !0; } return o && "_" !== t } if ("o" === t) { for (r++; r < i; r++)if ("_" !== (t = e[r])) { if (!w(e.charCodeAt(r))) return !1; o = !0; } return o && "_" !== t } } if ("_" === t) return !1; for (; r < i; r++)if ("_" !== (t = e[r])) { if (!k(e.charCodeAt(r))) return !1; o = !0; } return !(!o || "_" === t) }, construct: function (e) { var t, n = e, i = 1; if (-1 !== n.indexOf("_") && (n = n.replace(/_/g, "")), "-" !== (t = n[0]) && "+" !== t || ("-" === t && (i = -1), t = (n = n.slice(1))[0]), "0" === n) return 0; if ("0" === t) { if ("b" === n[1]) return i * parseInt(n.slice(2), 2); if ("x" === n[1]) return i * parseInt(n.slice(2), 16); if ("o" === n[1]) return i * parseInt(n.slice(2), 8) } return i * parseInt(n, 10) }, predicate: function (e) { return "[object Number]" === Object.prototype.toString.call(e) && e % 1 == 0 && !n.isNegativeZero(e) }, represent: { binary: function (e) { return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1) }, octal: function (e) { return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1) }, decimal: function (e) { return e.toString(10) }, hexadecimal: function (e) { return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1) } }, defaultStyle: "decimal", styleAliases: { binary: [2, "bin"], octal: [8, "oct"], decimal: [10, "dec"], hexadecimal: [16, "hex"] } }), x = new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"); var I = /^[-+]?[0-9]+e/; var S = new p("tag:yaml.org,2002:float", { kind: "scalar", resolve: function (e) { return null !== e && !(!x.test(e) || "_" === e[e.length - 1]) }, construct: function (e) { var t, n; return n = "-" === (t = e.replace(/_/g, "").toLowerCase())[0] ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), ".inf" === t ? 1 === n ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : ".nan" === t ? NaN : n * parseFloat(t, 10) }, predicate: function (e) { return "[object Number]" === Object.prototype.toString.call(e) && (e % 1 != 0 || n.isNegativeZero(e)) }, represent: function (e, t) { var i; if (isNaN(e)) switch (t) { case "lowercase": return ".nan"; case "uppercase": return ".NAN"; case "camelcase": return ".NaN" } else if (Number.POSITIVE_INFINITY === e) switch (t) { case "lowercase": return ".inf"; case "uppercase": return ".INF"; case "camelcase": return ".Inf" } else if (Number.NEGATIVE_INFINITY === e) switch (t) { case "lowercase": return "-.inf"; case "uppercase": return "-.INF"; case "camelcase": return "-.Inf" } else if (n.isNegativeZero(e)) return "-0.0"; return i = e.toString(10), I.test(i) ? i.replace("e", ".e") : i }, defaultStyle: "lowercase" }), O = b.extend({ implicit: [A, v, C, S] }), j = O, T = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"), N = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"); var F = new p("tag:yaml.org,2002:timestamp", { kind: "scalar", resolve: function (e) { return null !== e && (null !== T.exec(e) || null !== N.exec(e)) }, construct: function (e) { var t, n, i, r, o, a, l, c, s = 0, u = null; if (null === (t = T.exec(e)) && (t = N.exec(e)), null === t) throw new Error("Date resolve error"); if (n = +t[1], i = +t[2] - 1, r = +t[3], !t[4]) return new Date(Date.UTC(n, i, r)); if (o = +t[4], a = +t[5], l = +t[6], t[7]) { for (s = t[7].slice(0, 3); s.length < 3;)s += "0"; s = +s; } return t[9] && (u = 6e4 * (60 * +t[10] + +(t[11] || 0)), "-" === t[9] && (u = -u)), c = new Date(Date.UTC(n, i, r, o, a, l, s)), u && c.setTime(c.getTime() - u), c }, instanceOf: Date, represent: function (e) { return e.toISOString() } }); var E = new p("tag:yaml.org,2002:merge", { kind: "scalar", resolve: function (e) { return "<<" === e || null === e } }), M = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r"; var L = new p("tag:yaml.org,2002:binary", { kind: "scalar", resolve: function (e) { if (null === e) return !1; var t, n, i = 0, r = e.length, o = M; for (n = 0; n < r; n++)if (!((t = o.indexOf(e.charAt(n))) > 64)) { if (t < 0) return !1; i += 6; } return i % 8 == 0 }, construct: function (e) { var t, n, i = e.replace(/[\r\n=]/g, ""), r = i.length, o = M, a = 0, l = []; for (t = 0; t < r; t++)t % 4 == 0 && t && (l.push(a >> 16 & 255), l.push(a >> 8 & 255), l.push(255 & a)), a = a << 6 | o.indexOf(i.charAt(t)); return 0 === (n = r % 4 * 6) ? (l.push(a >> 16 & 255), l.push(a >> 8 & 255), l.push(255 & a)) : 18 === n ? (l.push(a >> 10 & 255), l.push(a >> 2 & 255)) : 12 === n && l.push(a >> 4 & 255), new Uint8Array(l) }, predicate: function (e) { return "[object Uint8Array]" === Object.prototype.toString.call(e) }, represent: function (e) { var t, n, i = "", r = 0, o = e.length, a = M; for (t = 0; t < o; t++)t % 3 == 0 && t && (i += a[r >> 18 & 63], i += a[r >> 12 & 63], i += a[r >> 6 & 63], i += a[63 & r]), r = (r << 8) + e[t]; return 0 === (n = o % 3) ? (i += a[r >> 18 & 63], i += a[r >> 12 & 63], i += a[r >> 6 & 63], i += a[63 & r]) : 2 === n ? (i += a[r >> 10 & 63], i += a[r >> 4 & 63], i += a[r << 2 & 63], i += a[64]) : 1 === n && (i += a[r >> 2 & 63], i += a[r << 4 & 63], i += a[64], i += a[64]), i } }), _ = Object.prototype.hasOwnProperty, D = Object.prototype.toString; var U = new p("tag:yaml.org,2002:omap", { kind: "sequence", resolve: function (e) { if (null === e) return !0; var t, n, i, r, o, a = [], l = e; for (t = 0, n = l.length; t < n; t += 1) { if (i = l[t], o = !1, "[object Object]" !== D.call(i)) return !1; for (r in i) if (_.call(i, r)) { if (o) return !1; o = !0; } if (!o) return !1; if (-1 !== a.indexOf(r)) return !1; a.push(r); } return !0 }, construct: function (e) { return null !== e ? e : [] } }), q = Object.prototype.toString; var Y = new p("tag:yaml.org,2002:pairs", { kind: "sequence", resolve: function (e) { if (null === e) return !0; var t, n, i, r, o, a = e; for (o = new Array(a.length), t = 0, n = a.length; t < n; t += 1) { if (i = a[t], "[object Object]" !== q.call(i)) return !1; if (1 !== (r = Object.keys(i)).length) return !1; o[t] = [r[0], i[r[0]]]; } return !0 }, construct: function (e) { if (null === e) return []; var t, n, i, r, o, a = e; for (o = new Array(a.length), t = 0, n = a.length; t < n; t += 1)i = a[t], r = Object.keys(i), o[t] = [r[0], i[r[0]]]; return o } }), R = Object.prototype.hasOwnProperty; var B = new p("tag:yaml.org,2002:set", { kind: "mapping", resolve: function (e) { if (null === e) return !0; var t, n = e; for (t in n) if (R.call(n, t) && null !== n[t]) return !1; return !0 }, construct: function (e) { return null !== e ? e : {} } }), K = j.extend({ implicit: [F, E], explicit: [L, U, Y, B] }), P = Object.prototype.hasOwnProperty, W = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, H = /[\x85\u2028\u2029]/, $ = /[,\[\]\{\}]/, G = /^(?:!|!!|![a-z\-]+!)$/i, V = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i; function Z(e) { return Object.prototype.toString.call(e) } function J(e) { return 10 === e || 13 === e } function Q(e) { return 9 === e || 32 === e } function z(e) { return 9 === e || 32 === e || 10 === e || 13 === e } function X(e) { return 44 === e || 91 === e || 93 === e || 123 === e || 125 === e } function ee(e) { var t; return 48 <= e && e <= 57 ? e - 48 : 97 <= (t = 32 | e) && t <= 102 ? t - 97 + 10 : -1 } function te(e) { return 48 === e ? "\0" : 97 === e ? "" : 98 === e ? "\b" : 116 === e || 9 === e ? "\t" : 110 === e ? "\n" : 118 === e ? "\v" : 102 === e ? "\f" : 114 === e ? "\r" : 101 === e ? "" : 32 === e ? " " : 34 === e ? '"' : 47 === e ? "/" : 92 === e ? "\\" : 78 === e ? "" : 95 === e ? " " : 76 === e ? "\u2028" : 80 === e ? "\u2029" : "" } function ne(e) { return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(55296 + (e - 65536 >> 10), 56320 + (e - 65536 & 1023)) } for (var ie = new Array(256), re = new Array(256), oe = 0; oe < 256; oe++)ie[oe] = te(oe) ? 1 : 0, re[oe] = te(oe); function ae(e, t) { this.input = e, this.filename = t.filename || null, this.schema = t.schema || K, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = []; } function le(e, t) { var n = { name: e.filename, buffer: e.input.slice(0, -1), position: e.position, line: e.line, column: e.position - e.lineStart }; return n.snippet = c(n), new o(t, n) } function ce(e, t) { throw le(e, t) } function se(e, t) { e.onWarning && e.onWarning.call(null, le(e, t)); } var ue = { YAML: function (e, t, n) { var i, r, o; null !== e.version && ce(e, "duplication of %YAML directive"), 1 !== n.length && ce(e, "YAML directive accepts exactly one argument"), null === (i = /^([0-9]+)\.([0-9]+)$/.exec(n[0])) && ce(e, "ill-formed argument of the YAML directive"), r = parseInt(i[1], 10), o = parseInt(i[2], 10), 1 !== r && ce(e, "unacceptable YAML version of the document"), e.version = n[0], e.checkLineBreaks = o < 2, 1 !== o && 2 !== o && se(e, "unsupported YAML version of the document"); }, TAG: function (e, t, n) { var i, r; 2 !== n.length && ce(e, "TAG directive accepts exactly two arguments"), i = n[0], r = n[1], G.test(i) || ce(e, "ill-formed tag handle (first argument) of the TAG directive"), P.call(e.tagMap, i) && ce(e, 'there is a previously declared suffix for "' + i + '" tag handle'), V.test(r) || ce(e, "ill-formed tag prefix (second argument) of the TAG directive"); try { r = decodeURIComponent(r); } catch (t) { ce(e, "tag prefix is malformed: " + r); } e.tagMap[i] = r; } }; function pe(e, t, n, i) { var r, o, a, l; if (t < n) { if (l = e.input.slice(t, n), i) for (r = 0, o = l.length; r < o; r += 1)9 === (a = l.charCodeAt(r)) || 32 <= a && a <= 1114111 || ce(e, "expected valid JSON character"); else W.test(l) && ce(e, "the stream contains non-printable characters"); e.result += l; } } function fe(e, t, i, r) { var o, a, l, c; for (n.isObject(i) || ce(e, "cannot merge mappings; the provided source object is unacceptable"), l = 0, c = (o = Object.keys(i)).length; l < c; l += 1)a = o[l], P.call(t, a) || (t[a] = i[a], r[a] = !0); } function de(e, t, n, i, r, o, a, l, c) { var s, u; if (Array.isArray(r)) for (s = 0, u = (r = Array.prototype.slice.call(r)).length; s < u; s += 1)Array.isArray(r[s]) && ce(e, "nested arrays are not supported inside keys"), "object" == typeof r && "[object Object]" === Z(r[s]) && (r[s] = "[object Object]"); if ("object" == typeof r && "[object Object]" === Z(r) && (r = "[object Object]"), r = String(r), null === t && (t = {}), "tag:yaml.org,2002:merge" === i) if (Array.isArray(o)) for (s = 0, u = o.length; s < u; s += 1)fe(e, t, o[s], n); else fe(e, t, o, n); else e.json || P.call(n, r) || !P.call(t, r) || (e.line = a || e.line, e.lineStart = l || e.lineStart, e.position = c || e.position, ce(e, "duplicated mapping key")), "__proto__" === r ? Object.defineProperty(t, r, { configurable: !0, enumerable: !0, writable: !0, value: o }) : t[r] = o, delete n[r]; return t } function he(e) { var t; 10 === (t = e.input.charCodeAt(e.position)) ? e.position++ : 13 === t ? (e.position++, 10 === e.input.charCodeAt(e.position) && e.position++) : ce(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1; } function ge(e, t, n) { for (var i = 0, r = e.input.charCodeAt(e.position); 0 !== r;) { for (; Q(r);)9 === r && -1 === e.firstTabInLine && (e.firstTabInLine = e.position), r = e.input.charCodeAt(++e.position); if (t && 35 === r) do { r = e.input.charCodeAt(++e.position); } while (10 !== r && 13 !== r && 0 !== r); if (!J(r)) break; for (he(e), r = e.input.charCodeAt(e.position), i++, e.lineIndent = 0; 32 === r;)e.lineIndent++, r = e.input.charCodeAt(++e.position); } return -1 !== n && 0 !== i && e.lineIndent < n && se(e, "deficient indentation"), i } function me(e) { var t, n = e.position; return !(45 !== (t = e.input.charCodeAt(n)) && 46 !== t || t !== e.input.charCodeAt(n + 1) || t !== e.input.charCodeAt(n + 2) || (n += 3, 0 !== (t = e.input.charCodeAt(n)) && !z(t))) } function ye(e, t) { 1 === t ? e.result += " " : t > 1 && (e.result += n.repeat("\n", t - 1)); } function be(e, t) { var n, i, r = e.tag, o = e.anchor, a = [], l = !1; if (-1 !== e.firstTabInLine) return !1; for (null !== e.anchor && (e.anchorMap[e.anchor] = a), i = e.input.charCodeAt(e.position); 0 !== i && (-1 !== e.firstTabInLine && (e.position = e.firstTabInLine, ce(e, "tab characters must not be used in indentation")), 45 === i) && z(e.input.charCodeAt(e.position + 1));)if (l = !0, e.position++, ge(e, !0, -1) && e.lineIndent <= t) a.push(null), i = e.input.charCodeAt(e.position); else if (n = e.line, we(e, t, 3, !1, !0), a.push(e.result), ge(e, !0, -1), i = e.input.charCodeAt(e.position), (e.line === n || e.lineIndent > t) && 0 !== i) ce(e, "bad indentation of a sequence entry"); else if (e.lineIndent < t) break; return !!l && (e.tag = r, e.anchor = o, e.kind = "sequence", e.result = a, !0) } function Ae(e) { var t, n, i, r, o = !1, a = !1; if (33 !== (r = e.input.charCodeAt(e.position))) return !1; if (null !== e.tag && ce(e, "duplication of a tag property"), 60 === (r = e.input.charCodeAt(++e.position)) ? (o = !0, r = e.input.charCodeAt(++e.position)) : 33 === r ? (a = !0, n = "!!", r = e.input.charCodeAt(++e.position)) : n = "!", t = e.position, o) { do { r = e.input.charCodeAt(++e.position); } while (0 !== r && 62 !== r); e.position < e.length ? (i = e.input.slice(t, e.position), r = e.input.charCodeAt(++e.position)) : ce(e, "unexpected end of the stream within a verbatim tag"); } else { for (; 0 !== r && !z(r);)33 === r && (a ? ce(e, "tag suffix cannot contain exclamation marks") : (n = e.input.slice(t - 1, e.position + 1), G.test(n) || ce(e, "named tag handle cannot contain such characters"), a = !0, t = e.position + 1)), r = e.input.charCodeAt(++e.position); i = e.input.slice(t, e.position), $.test(i) && ce(e, "tag suffix cannot contain flow indicator characters"); } i && !V.test(i) && ce(e, "tag name cannot contain such characters: " + i); try { i = decodeURIComponent(i); } catch (t) { ce(e, "tag name is malformed: " + i); } return o ? e.tag = i : P.call(e.tagMap, n) ? e.tag = e.tagMap[n] + i : "!" === n ? e.tag = "!" + i : "!!" === n ? e.tag = "tag:yaml.org,2002:" + i : ce(e, 'undeclared tag handle "' + n + '"'), !0 } function ve(e) { var t, n; if (38 !== (n = e.input.charCodeAt(e.position))) return !1; for (null !== e.anchor && ce(e, "duplication of an anchor property"), n = e.input.charCodeAt(++e.position), t = e.position; 0 !== n && !z(n) && !X(n);)n = e.input.charCodeAt(++e.position); return e.position === t && ce(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0 } function we(e, t, i, r, o) { var a, l, c, s, u, p, f, d, h, g = 1, m = !1, y = !1; if (null !== e.listener && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, a = l = c = 4 === i || 3 === i, r && ge(e, !0, -1) && (m = !0, e.lineIndent > t ? g = 1 : e.lineIndent === t ? g = 0 : e.lineIndent < t && (g = -1)), 1 === g) for (; Ae(e) || ve(e);)ge(e, !0, -1) ? (m = !0, c = a, e.lineIndent > t ? g = 1 : e.lineIndent === t ? g = 0 : e.lineIndent < t && (g = -1)) : c = !1; if (c && (c = m || o), 1 !== g && 4 !== i || (d = 1 === i || 2 === i ? t : t + 1, h = e.position - e.lineStart, 1 === g ? c && (be(e, h) || function (e, t, n) { var i, r, o, a, l, c, s, u = e.tag, p = e.anchor, f = {}, d = Object.create(null), h = null, g = null, m = null, y = !1, b = !1; if (-1 !== e.firstTabInLine) return !1; for (null !== e.anchor && (e.anchorMap[e.anchor] = f), s = e.input.charCodeAt(e.position); 0 !== s;) { if (y || -1 === e.firstTabInLine || (e.position = e.firstTabInLine, ce(e, "tab characters must not be used in indentation")), i = e.input.charCodeAt(e.position + 1), o = e.line, 63 !== s && 58 !== s || !z(i)) { if (a = e.line, l = e.lineStart, c = e.position, !we(e, n, 2, !1, !0)) break; if (e.line === o) { for (s = e.input.charCodeAt(e.position); Q(s);)s = e.input.charCodeAt(++e.position); if (58 === s) z(s = e.input.charCodeAt(++e.position)) || ce(e, "a whitespace character is expected after the key-value separator within a block mapping"), y && (de(e, f, d, h, g, null, a, l, c), h = g = m = null), b = !0, y = !1, r = !1, h = e.tag, g = e.result; else { if (!b) return e.tag = u, e.anchor = p, !0; ce(e, "can not read an implicit mapping pair; a colon is missed"); } } else { if (!b) return e.tag = u, e.anchor = p, !0; ce(e, "can not read a block mapping entry; a multiline key may not be an implicit key"); } } else 63 === s ? (y && (de(e, f, d, h, g, null, a, l, c), h = g = m = null), b = !0, y = !0, r = !0) : y ? (y = !1, r = !0) : ce(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, s = i; if ((e.line === o || e.lineIndent > t) && (y && (a = e.line, l = e.lineStart, c = e.position), we(e, t, 4, !0, r) && (y ? g = e.result : m = e.result), y || (de(e, f, d, h, g, m, a, l, c), h = g = m = null), ge(e, !0, -1), s = e.input.charCodeAt(e.position)), (e.line === o || e.lineIndent > t) && 0 !== s) ce(e, "bad indentation of a mapping entry"); else if (e.lineIndent < t) break } return y && de(e, f, d, h, g, null, a, l, c), b && (e.tag = u, e.anchor = p, e.kind = "mapping", e.result = f), b }(e, h, d)) || function (e, t) { var n, i, r, o, a, l, c, s, u, p, f, d, h = !0, g = e.tag, m = e.anchor, y = Object.create(null); if (91 === (d = e.input.charCodeAt(e.position))) a = 93, s = !1, o = []; else { if (123 !== d) return !1; a = 125, s = !0, o = {}; } for (null !== e.anchor && (e.anchorMap[e.anchor] = o), d = e.input.charCodeAt(++e.position); 0 !== d;) { if (ge(e, !0, t), (d = e.input.charCodeAt(e.position)) === a) return e.position++, e.tag = g, e.anchor = m, e.kind = s ? "mapping" : "sequence", e.result = o, !0; h ? 44 === d && ce(e, "expected the node content, but found ','") : ce(e, "missed comma between flow collection entries"), f = null, l = c = !1, 63 === d && z(e.input.charCodeAt(e.position + 1)) && (l = c = !0, e.position++, ge(e, !0, t)), n = e.line, i = e.lineStart, r = e.position, we(e, t, 1, !1, !0), p = e.tag, u = e.result, ge(e, !0, t), d = e.input.charCodeAt(e.position), !c && e.line !== n || 58 !== d || (l = !0, d = e.input.charCodeAt(++e.position), ge(e, !0, t), we(e, t, 1, !1, !0), f = e.result), s ? de(e, o, y, p, u, f, n, i, r) : l ? o.push(de(e, null, y, p, u, f, n, i, r)) : o.push(u), ge(e, !0, t), 44 === (d = e.input.charCodeAt(e.position)) ? (h = !0, d = e.input.charCodeAt(++e.position)) : h = !1; } ce(e, "unexpected end of the stream within a flow collection"); }(e, d) ? y = !0 : (l && function (e, t) { var i, r, o, a, l, c = 1, s = !1, u = !1, p = t, f = 0, d = !1; if (124 === (a = e.input.charCodeAt(e.position))) r = !1; else { if (62 !== a) return !1; r = !0; } for (e.kind = "scalar", e.result = ""; 0 !== a;)if (43 === (a = e.input.charCodeAt(++e.position)) || 45 === a) 1 === c ? c = 43 === a ? 3 : 2 : ce(e, "repeat of a chomping mode identifier"); else { if (!((o = 48 <= (l = a) && l <= 57 ? l - 48 : -1) >= 0)) break; 0 === o ? ce(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : u ? ce(e, "repeat of an indentation width identifier") : (p = t + o - 1, u = !0); } if (Q(a)) { do { a = e.input.charCodeAt(++e.position); } while (Q(a)); if (35 === a) do { a = e.input.charCodeAt(++e.position); } while (!J(a) && 0 !== a) } for (; 0 !== a;) { for (he(e), e.lineIndent = 0, a = e.input.charCodeAt(e.position); (!u || e.lineIndent < p) && 32 === a;)e.lineIndent++, a = e.input.charCodeAt(++e.position); if (!u && e.lineIndent > p && (p = e.lineIndent), J(a)) f++; else { if (e.lineIndent < p) { 3 === c ? e.result += n.repeat("\n", s ? 1 + f : f) : 1 === c && s && (e.result += "\n"); break } for (r ? Q(a) ? (d = !0, e.result += n.repeat("\n", s ? 1 + f : f)) : d ? (d = !1, e.result += n.repeat("\n", f + 1)) : 0 === f ? s && (e.result += " ") : e.result += n.repeat("\n", f) : e.result += n.repeat("\n", s ? 1 + f : f), s = !0, u = !0, f = 0, i = e.position; !J(a) && 0 !== a;)a = e.input.charCodeAt(++e.position); pe(e, i, e.position, !1); } } return !0 }(e, d) || function (e, t) { var n, i, r; if (39 !== (n = e.input.charCodeAt(e.position))) return !1; for (e.kind = "scalar", e.result = "", e.position++, i = r = e.position; 0 !== (n = e.input.charCodeAt(e.position));)if (39 === n) { if (pe(e, i, e.position, !0), 39 !== (n = e.input.charCodeAt(++e.position))) return !0; i = e.position, e.position++, r = e.position; } else J(n) ? (pe(e, i, r, !0), ye(e, ge(e, !1, t)), i = r = e.position) : e.position === e.lineStart && me(e) ? ce(e, "unexpected end of the document within a single quoted scalar") : (e.position++, r = e.position); ce(e, "unexpected end of the stream within a single quoted scalar"); }(e, d) || function (e, t) { var n, i, r, o, a, l, c; if (34 !== (l = e.input.charCodeAt(e.position))) return !1; for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; 0 !== (l = e.input.charCodeAt(e.position));) { if (34 === l) return pe(e, n, e.position, !0), e.position++, !0; if (92 === l) { if (pe(e, n, e.position, !0), J(l = e.input.charCodeAt(++e.position))) ge(e, !1, t); else if (l < 256 && ie[l]) e.result += re[l], e.position++; else if ((a = 120 === (c = l) ? 2 : 117 === c ? 4 : 85 === c ? 8 : 0) > 0) { for (r = a, o = 0; r > 0; r--)(a = ee(l = e.input.charCodeAt(++e.position))) >= 0 ? o = (o << 4) + a : ce(e, "expected hexadecimal character"); e.result += ne(o), e.position++; } else ce(e, "unknown escape sequence"); n = i = e.position; } else J(l) ? (pe(e, n, i, !0), ye(e, ge(e, !1, t)), n = i = e.position) : e.position === e.lineStart && me(e) ? ce(e, "unexpected end of the document within a double quoted scalar") : (e.position++, i = e.position); } ce(e, "unexpected end of the stream within a double quoted scalar"); }(e, d) ? y = !0 : !function (e) { var t, n, i; if (42 !== (i = e.input.charCodeAt(e.position))) return !1; for (i = e.input.charCodeAt(++e.position), t = e.position; 0 !== i && !z(i) && !X(i);)i = e.input.charCodeAt(++e.position); return e.position === t && ce(e, "name of an alias node must contain at least one character"), n = e.input.slice(t, e.position), P.call(e.anchorMap, n) || ce(e, 'unidentified alias "' + n + '"'), e.result = e.anchorMap[n], ge(e, !0, -1), !0 }(e) ? function (e, t, n) { var i, r, o, a, l, c, s, u, p = e.kind, f = e.result; if (z(u = e.input.charCodeAt(e.position)) || X(u) || 35 === u || 38 === u || 42 === u || 33 === u || 124 === u || 62 === u || 39 === u || 34 === u || 37 === u || 64 === u || 96 === u) return !1; if ((63 === u || 45 === u) && (z(i = e.input.charCodeAt(e.position + 1)) || n && X(i))) return !1; for (e.kind = "scalar", e.result = "", r = o = e.position, a = !1; 0 !== u;) { if (58 === u) { if (z(i = e.input.charCodeAt(e.position + 1)) || n && X(i)) break } else if (35 === u) { if (z(e.input.charCodeAt(e.position - 1))) break } else { if (e.position === e.lineStart && me(e) || n && X(u)) break; if (J(u)) { if (l = e.line, c = e.lineStart, s = e.lineIndent, ge(e, !1, -1), e.lineIndent >= t) { a = !0, u = e.input.charCodeAt(e.position); continue } e.position = o, e.line = l, e.lineStart = c, e.lineIndent = s; break } } a && (pe(e, r, o, !1), ye(e, e.line - l), r = o = e.position, a = !1), Q(u) || (o = e.position + 1), u = e.input.charCodeAt(++e.position); } return pe(e, r, o, !1), !!e.result || (e.kind = p, e.result = f, !1) }(e, d, 1 === i) && (y = !0, null === e.tag && (e.tag = "?")) : (y = !0, null === e.tag && null === e.anchor || ce(e, "alias node should not have any properties")), null !== e.anchor && (e.anchorMap[e.anchor] = e.result)) : 0 === g && (y = c && be(e, h))), null === e.tag) null !== e.anchor && (e.anchorMap[e.anchor] = e.result); else if ("?" === e.tag) { for (null !== e.result && "scalar" !== e.kind && ce(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), s = 0, u = e.implicitTypes.length; s < u; s += 1)if ((f = e.implicitTypes[s]).resolve(e.result)) { e.result = f.construct(e.result), e.tag = f.tag, null !== e.anchor && (e.anchorMap[e.anchor] = e.result); break } } else if ("!" !== e.tag) { if (P.call(e.typeMap[e.kind || "fallback"], e.tag)) f = e.typeMap[e.kind || "fallback"][e.tag]; else for (f = null, s = 0, u = (p = e.typeMap.multi[e.kind || "fallback"]).length; s < u; s += 1)if (e.tag.slice(0, p[s].tag.length) === p[s].tag) { f = p[s]; break } f || ce(e, "unknown tag !<" + e.tag + ">"), null !== e.result && f.kind !== e.kind && ce(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + f.kind + '", not "' + e.kind + '"'), f.resolve(e.result, e.tag) ? (e.result = f.construct(e.result, e.tag), null !== e.anchor && (e.anchorMap[e.anchor] = e.result)) : ce(e, "cannot resolve a node with !<" + e.tag + "> explicit tag"); } return null !== e.listener && e.listener("close", e), null !== e.tag || null !== e.anchor || y } function ke(e) { var t, n, i, r, o = e.position, a = !1; for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = Object.create(null), e.anchorMap = Object.create(null); 0 !== (r = e.input.charCodeAt(e.position)) && (ge(e, !0, -1), r = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || 37 !== r));) { for (a = !0, r = e.input.charCodeAt(++e.position), t = e.position; 0 !== r && !z(r);)r = e.input.charCodeAt(++e.position); for (i = [], (n = e.input.slice(t, e.position)).length < 1 && ce(e, "directive name must not be less than one character in length"); 0 !== r;) { for (; Q(r);)r = e.input.charCodeAt(++e.position); if (35 === r) { do { r = e.input.charCodeAt(++e.position); } while (0 !== r && !J(r)); break } if (J(r)) break; for (t = e.position; 0 !== r && !z(r);)r = e.input.charCodeAt(++e.position); i.push(e.input.slice(t, e.position)); } 0 !== r && he(e), P.call(ue, n) ? ue[n](e, n, i) : se(e, 'unknown document directive "' + n + '"'); } ge(e, !0, -1), 0 === e.lineIndent && 45 === e.input.charCodeAt(e.position) && 45 === e.input.charCodeAt(e.position + 1) && 45 === e.input.charCodeAt(e.position + 2) ? (e.position += 3, ge(e, !0, -1)) : a && ce(e, "directives end mark is expected"), we(e, e.lineIndent - 1, 4, !1, !0), ge(e, !0, -1), e.checkLineBreaks && H.test(e.input.slice(o, e.position)) && se(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && me(e) ? 46 === e.input.charCodeAt(e.position) && (e.position += 3, ge(e, !0, -1)) : e.position < e.length - 1 && ce(e, "end of the stream or a document separator is expected"); } function Ce(e, t) { t = t || {}, 0 !== (e = String(e)).length && (10 !== e.charCodeAt(e.length - 1) && 13 !== e.charCodeAt(e.length - 1) && (e += "\n"), 65279 === e.charCodeAt(0) && (e = e.slice(1))); var n = new ae(e, t), i = e.indexOf("\0"); for (-1 !== i && (n.position = i, ce(n, "null byte is not allowed in input")), n.input += "\0"; 32 === n.input.charCodeAt(n.position);)n.lineIndent += 1, n.position += 1; for (; n.position < n.length - 1;)ke(n); return n.documents } var xe = { loadAll: function (e, t, n) { null !== t && "object" == typeof t && void 0 === n && (n = t, t = null); var i = Ce(e, n); if ("function" != typeof t) return i; for (var r = 0, o = i.length; r < o; r += 1)t(i[r]); }, load: function (e, t) { var n = Ce(e, t); if (0 !== n.length) { if (1 === n.length) return n[0]; throw new o("expected a single document in the stream, but found more") } } }, Ie = Object.prototype.toString, Se = Object.prototype.hasOwnProperty, Oe = 65279, je = { 0: "\\0", 7: "\\a", 8: "\\b", 9: "\\t", 10: "\\n", 11: "\\v", 12: "\\f", 13: "\\r", 27: "\\e", 34: '\\"', 92: "\\\\", 133: "\\N", 160: "\\_", 8232: "\\L", 8233: "\\P" }, Te = ["y", "Y", "yes", "Yes", "YES", "on", "On", "ON", "n", "N", "no", "No", "NO", "off", "Off", "OFF"], Ne = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/; function Fe(e) { var t, i, r; if (t = e.toString(16).toUpperCase(), e <= 255) i = "x", r = 2; else if (e <= 65535) i = "u", r = 4; else { if (!(e <= 4294967295)) throw new o("code point within a string may not be greater than 0xFFFFFFFF"); i = "U", r = 8; } return "\\" + i + n.repeat("0", r - t.length) + t } function Ee(e) { this.schema = e.schema || K, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = n.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = function (e, t) { var n, i, r, o, a, l, c; if (null === t) return {}; for (n = {}, r = 0, o = (i = Object.keys(t)).length; r < o; r += 1)a = i[r], l = String(t[a]), "!!" === a.slice(0, 2) && (a = "tag:yaml.org,2002:" + a.slice(2)), (c = e.compiledTypeMap.fallback[a]) && Se.call(c.styleAliases, l) && (l = c.styleAliases[l]), n[a] = l; return n }(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = '"' === e.quotingType ? 2 : 1, this.forceQuotes = e.forceQuotes || !1, this.replacer = "function" == typeof e.replacer ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null; } function Me(e, t) { for (var i, r = n.repeat(" ", t), o = 0, a = -1, l = "", c = e.length; o < c;)-1 === (a = e.indexOf("\n", o)) ? (i = e.slice(o), o = c) : (i = e.slice(o, a + 1), o = a + 1), i.length && "\n" !== i && (l += r), l += i; return l } function Le(e, t) { return "\n" + n.repeat(" ", e.indent * t) } function _e(e) { return 32 === e || 9 === e } function De(e) { return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && 8232 !== e && 8233 !== e || 57344 <= e && e <= 65533 && e !== Oe || 65536 <= e && e <= 1114111 } function Ue(e) { return De(e) && e !== Oe && 13 !== e && 10 !== e } function qe(e, t, n) { var i = Ue(e), r = i && !_e(e); return (n ? i : i && 44 !== e && 91 !== e && 93 !== e && 123 !== e && 125 !== e) && 35 !== e && !(58 === t && !r) || Ue(t) && !_e(t) && 35 === e || 58 === t && r } function Ye(e, t) { var n, i = e.charCodeAt(t); return i >= 55296 && i <= 56319 && t + 1 < e.length && (n = e.charCodeAt(t + 1)) >= 56320 && n <= 57343 ? 1024 * (i - 55296) + n - 56320 + 65536 : i } function Re(e) { return /^\n* /.test(e) } function Be(e, t, n, i, r, o, a, l) { var c, s, u = 0, p = null, f = !1, d = !1, h = -1 !== i, g = -1, m = De(s = Ye(e, 0)) && s !== Oe && !_e(s) && 45 !== s && 63 !== s && 58 !== s && 44 !== s && 91 !== s && 93 !== s && 123 !== s && 125 !== s && 35 !== s && 38 !== s && 42 !== s && 33 !== s && 124 !== s && 61 !== s && 62 !== s && 39 !== s && 34 !== s && 37 !== s && 64 !== s && 96 !== s && function (e) { return !_e(e) && 58 !== e }(Ye(e, e.length - 1)); if (t || a) for (c = 0; c < e.length; u >= 65536 ? c += 2 : c++) { if (!De(u = Ye(e, c))) return 5; m = m && qe(u, p, l), p = u; } else { for (c = 0; c < e.length; u >= 65536 ? c += 2 : c++) { if (10 === (u = Ye(e, c))) f = !0, h && (d = d || c - g - 1 > i && " " !== e[g + 1], g = c); else if (!De(u)) return 5; m = m && qe(u, p, l), p = u; } d = d || h && c - g - 1 > i && " " !== e[g + 1]; } return f || d ? n > 9 && Re(e) ? 5 : a ? 2 === o ? 5 : 2 : d ? 4 : 3 : !m || a || r(e) ? 2 === o ? 5 : 2 : 1 } function Ke(e, t, n, i, r) { e.dump = function () { if (0 === t.length) return 2 === e.quotingType ? '""' : "''"; if (!e.noCompatMode && (-1 !== Te.indexOf(t) || Ne.test(t))) return 2 === e.quotingType ? '"' + t + '"' : "'" + t + "'"; var a = e.indent * Math.max(1, n), l = -1 === e.lineWidth ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - a), c = i || e.flowLevel > -1 && n >= e.flowLevel; switch (Be(t, c, e.indent, l, (function (t) { return function (e, t) { var n, i; for (n = 0, i = e.implicitTypes.length; n < i; n += 1)if (e.implicitTypes[n].resolve(t)) return !0; return !1 }(e, t) }), e.quotingType, e.forceQuotes && !i, r)) { case 1: return t; case 2: return "'" + t.replace(/'/g, "''") + "'"; case 3: return "|" + Pe(t, e.indent) + We(Me(t, a)); case 4: return ">" + Pe(t, e.indent) + We(Me(function (e, t) { var n, i, r = /(\n+)([^\n]*)/g, o = (l = e.indexOf("\n"), l = -1 !== l ? l : e.length, r.lastIndex = l, He(e.slice(0, l), t)), a = "\n" === e[0] || " " === e[0]; var l; for (; i = r.exec(e);) { var c = i[1], s = i[2]; n = " " === s[0], o += c + (a || n || "" === s ? "" : "\n") + He(s, t), a = n; } return o }(t, l), a)); case 5: return '"' + function (e) { for (var t, n = "", i = 0, r = 0; r < e.length; i >= 65536 ? r += 2 : r++)i = Ye(e, r), !(t = je[i]) && De(i) ? (n += e[r], i >= 65536 && (n += e[r + 1])) : n += t || Fe(i); return n }(t) + '"'; default: throw new o("impossible error: invalid scalar style") } }(); } function Pe(e, t) { var n = Re(e) ? String(t) : "", i = "\n" === e[e.length - 1]; return n + (i && ("\n" === e[e.length - 2] || "\n" === e) ? "+" : i ? "" : "-") + "\n" } function We(e) { return "\n" === e[e.length - 1] ? e.slice(0, -1) : e } function He(e, t) { if ("" === e || " " === e[0]) return e; for (var n, i, r = / [^ ]/g, o = 0, a = 0, l = 0, c = ""; n = r.exec(e);)(l = n.index) - o > t && (i = a > o ? a : l, c += "\n" + e.slice(o, i), o = i + 1), a = l; return c += "\n", e.length - o > t && a > o ? c += e.slice(o, a) + "\n" + e.slice(a + 1) : c += e.slice(o), c.slice(1) } function $e(e, t, n, i) { var r, o, a, l = "", c = e.tag; for (r = 0, o = n.length; r < o; r += 1)a = n[r], e.replacer && (a = e.replacer.call(n, String(r), a)), (Ve(e, t + 1, a, !0, !0, !1, !0) || void 0 === a && Ve(e, t + 1, null, !0, !0, !1, !0)) && (i && "" === l || (l += Le(e, t)), e.dump && 10 === e.dump.charCodeAt(0) ? l += "-" : l += "- ", l += e.dump); e.tag = c, e.dump = l || "[]"; } function Ge(e, t, n) { var i, r, a, l, c, s; for (a = 0, l = (r = n ? e.explicitTypes : e.implicitTypes).length; a < l; a += 1)if (((c = r[a]).instanceOf || c.predicate) && (!c.instanceOf || "object" == typeof t && t instanceof c.instanceOf) && (!c.predicate || c.predicate(t))) { if (n ? c.multi && c.representName ? e.tag = c.representName(t) : e.tag = c.tag : e.tag = "?", c.represent) { if (s = e.styleMap[c.tag] || c.defaultStyle, "[object Function]" === Ie.call(c.represent)) i = c.represent(t, s); else { if (!Se.call(c.represent, s)) throw new o("!<" + c.tag + '> tag resolver accepts not "' + s + '" style'); i = c.represent[s](t, s); } e.dump = i; } return !0 } return !1 } function Ve(e, t, n, i, r, a, l) { e.tag = null, e.dump = n, Ge(e, n, !1) || Ge(e, n, !0); var c, s = Ie.call(e.dump), u = i; i && (i = e.flowLevel < 0 || e.flowLevel > t); var p, f, d = "[object Object]" === s || "[object Array]" === s; if (d && (f = -1 !== (p = e.duplicates.indexOf(n))), (null !== e.tag && "?" !== e.tag || f || 2 !== e.indent && t > 0) && (r = !1), f && e.usedDuplicates[p]) e.dump = "*ref_" + p; else { if (d && f && !e.usedDuplicates[p] && (e.usedDuplicates[p] = !0), "[object Object]" === s) i && 0 !== Object.keys(e.dump).length ? (!function (e, t, n, i) { var r, a, l, c, s, u, p = "", f = e.tag, d = Object.keys(n); if (!0 === e.sortKeys) d.sort(); else if ("function" == typeof e.sortKeys) d.sort(e.sortKeys); else if (e.sortKeys) throw new o("sortKeys must be a boolean or a function"); for (r = 0, a = d.length; r < a; r += 1)u = "", i && "" === p || (u += Le(e, t)), c = n[l = d[r]], e.replacer && (c = e.replacer.call(n, l, c)), Ve(e, t + 1, l, !0, !0, !0) && ((s = null !== e.tag && "?" !== e.tag || e.dump && e.dump.length > 1024) && (e.dump && 10 === e.dump.charCodeAt(0) ? u += "?" : u += "? "), u += e.dump, s && (u += Le(e, t)), Ve(e, t + 1, c, !0, s) && (e.dump && 10 === e.dump.charCodeAt(0) ? u += ":" : u += ": ", p += u += e.dump)); e.tag = f, e.dump = p || "{}"; }(e, t, e.dump, r), f && (e.dump = "&ref_" + p + e.dump)) : (!function (e, t, n) { var i, r, o, a, l, c = "", s = e.tag, u = Object.keys(n); for (i = 0, r = u.length; i < r; i += 1)l = "", "" !== c && (l += ", "), e.condenseFlow && (l += '"'), a = n[o = u[i]], e.replacer && (a = e.replacer.call(n, o, a)), Ve(e, t, o, !1, !1) && (e.dump.length > 1024 && (l += "? "), l += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), Ve(e, t, a, !1, !1) && (c += l += e.dump)); e.tag = s, e.dump = "{" + c + "}"; }(e, t, e.dump), f && (e.dump = "&ref_" + p + " " + e.dump)); else if ("[object Array]" === s) i && 0 !== e.dump.length ? (e.noArrayIndent && !l && t > 0 ? $e(e, t - 1, e.dump, r) : $e(e, t, e.dump, r), f && (e.dump = "&ref_" + p + e.dump)) : (!function (e, t, n) { var i, r, o, a = "", l = e.tag; for (i = 0, r = n.length; i < r; i += 1)o = n[i], e.replacer && (o = e.replacer.call(n, String(i), o)), (Ve(e, t, o, !1, !1) || void 0 === o && Ve(e, t, null, !1, !1)) && ("" !== a && (a += "," + (e.condenseFlow ? "" : " ")), a += e.dump); e.tag = l, e.dump = "[" + a + "]"; }(e, t, e.dump), f && (e.dump = "&ref_" + p + " " + e.dump)); else { if ("[object String]" !== s) { if ("[object Undefined]" === s) return !1; if (e.skipInvalid) return !1; throw new o("unacceptable kind of an object to dump " + s) } "?" !== e.tag && Ke(e, e.dump, t, a, u); } null !== e.tag && "?" !== e.tag && (c = encodeURI("!" === e.tag[0] ? e.tag.slice(1) : e.tag).replace(/!/g, "%21"), c = "!" === e.tag[0] ? "!" + c : "tag:yaml.org,2002:" === c.slice(0, 18) ? "!!" + c.slice(18) : "!<" + c + ">", e.dump = c + " " + e.dump); } return !0 } function Ze(e, t) { var n, i, r = [], o = []; for (Je(e, r, o), n = 0, i = o.length; n < i; n += 1)t.duplicates.push(r[o[n]]); t.usedDuplicates = new Array(i); } function Je(e, t, n) { var i, r, o; if (null !== e && "object" == typeof e) if (-1 !== (r = t.indexOf(e))) -1 === n.indexOf(r) && n.push(r); else if (t.push(e), Array.isArray(e)) for (r = 0, o = e.length; r < o; r += 1)Je(e[r], t, n); else for (r = 0, o = (i = Object.keys(e)).length; r < o; r += 1)Je(e[i[r]], t, n); } function Qe(e, t) { return function () { throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.") } } var ze = p, Xe = h, et = b, tt = O, nt = j, it = K, rt = xe.load, ot = xe.loadAll, at = { dump: function (e, t) { var n = new Ee(t = t || {}); n.noRefs || Ze(e, n); var i = e; return n.replacer && (i = n.replacer.call({ "": i }, "", i)), Ve(n, 0, i, !0, !0) ? n.dump + "\n" : "" } }.dump, lt = o, ct = { binary: L, float: S, map: y, null: A, pairs: Y, set: B, timestamp: F, bool: v, int: C, merge: E, omap: U, seq: m, str: g }, st = Qe("safeLoad", "load"), ut = Qe("safeLoadAll", "loadAll"), pt = Qe("safeDump", "dump"), ft = { Type: ze, Schema: Xe, FAILSAFE_SCHEMA: et, JSON_SCHEMA: tt, CORE_SCHEMA: nt, DEFAULT_SCHEMA: it, load: rt, loadAll: ot, dump: at, YAMLException: lt, types: ct, safeLoad: st, safeLoadAll: ut, safeDump: pt }; e.CORE_SCHEMA = nt, e.DEFAULT_SCHEMA = it, e.FAILSAFE_SCHEMA = et, e.JSON_SCHEMA = tt, e.Schema = Xe, e.Type = ze, e.YAMLException = lt, e.default = ft, e.dump = at, e.load = rt, e.loadAll = ot, e.safeDump = pt, e.safeLoad = st, e.safeLoadAll = ut, e.types = ct, Object.defineProperty(e, "__esModule", { value: !0 }); }));

  		// Initialize plugin when either DOM is ready or Alpine is ready
  		async function initializeCollectionsPlugin() {
  		    // Initialize empty collections store
  		    const initialStore = {
  		        all: [], // Global content array for cross-collection access
  		        _initialized: false
  		    };
  		    Alpine.store('collections', initialStore);

  		    // Cache for loaded collections with persistence
  		    const collectionCache = new Map();
  		    const loadingPromises = new Map();
  		    const CACHE_PREFIX = 'indux_collection_';
  		    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  		    // Track initialization state
  		    let isInitializing = false;
  		    let initializationComplete = false;

  		    // Load from persistent cache
  		    function loadFromCache(key) {
  		        try {
  		            const cached = localStorage.getItem(CACHE_PREFIX + key);
  		            if (cached) {
  		                const { data, timestamp } = JSON.parse(cached);
  		                if (Date.now() - timestamp < CACHE_DURATION) {
  		                    return data;
  		                }
  		            }
  		        } catch (error) {
  		            console.warn('[Indux] Cache read failed:', error);
  		        }
  		        return null;
  		    }

  		    // Save to persistent cache
  		    function saveToCache(key, data) {
  		        try {
  		            localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({
  		                data,
  		                timestamp: Date.now()
  		            }));
  		        } catch (error) {
  		            console.warn('[Indux] Cache write failed:', error);
  		        }
  		    }

  		    // Load manifest if not already loaded
  		    async function ensureManifest() {
  		        if (window.manifest) return window.manifest;

  		        try {
  		            const response = await fetch('/manifest.json');
  		            window.manifest = await response.json();
  		            return window.manifest;
  		        } catch (error) {
  		            console.error('[Indux] Failed to load manifest:', error);
  		            return null;
  		        }
  		    }

  		    // Load collection data
  		    async function loadCollection(collectionName, locale = 'en') {
  		        const cacheKey = `${collectionName}:${locale}`;

  		        // Check memory cache first
  		        if (collectionCache.has(cacheKey)) {
  		            const cachedData = collectionCache.get(cacheKey);
  		            if (!isInitializing) {
  		                updateStore(collectionName, cachedData);
  		            }
  		            return cachedData;
  		        }

  		        // Check persistent cache
  		        const cachedData = loadFromCache(cacheKey);
  		        if (cachedData) {
  		            collectionCache.set(cacheKey, cachedData);
  		            if (!isInitializing) {
  		                updateStore(collectionName, cachedData);
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
  		                if (!manifest?.collections) {
  		                    return null;
  		                }

  		                const collection = manifest.collections[collectionName];
  		                if (!collection) {
  		                    console.warn(`[Indux] Collection "${collectionName}" not found in manifest`);
  		                    return null;
  		                }

  		                // Handle both string paths and localized objects
  		                let source;
  		                if (typeof collection === 'string') {
  		                    // Direct string path for non-localized collections
  		                    source = collection;
  		                } else if (collection[locale]) {
  		                    // Localized collection with locale-specific path
  		                    source = collection[locale];
  		                } else {
  		                    console.warn(`[Indux] No source found for collection "${collectionName}" in locale "${locale}"`);
  		                    return null;
  		                }

  		                const response = await fetch(source);
  		                const contentType = response.headers.get('content-type');
  		                let data;

  		                // Handle different content types
  		                if (contentType?.includes('application/json')) {
  		                    data = await response.json();
  		                } else if (contentType?.includes('text/yaml') || source.endsWith('.yaml') || source.endsWith('.yml')) {
  		                    const text = await response.text();
  		                    data = jsyaml.load(text);
  		                } else {
  		                    console.warn(`[Indux] Unsupported content type for "${source}": ${contentType}`);
  		                    return null;
  		                }

  		                // Enhance data with metadata
  		                let enhancedData;
  		                if (Array.isArray(data)) {
  		                    enhancedData = data.map(item => ({
  		                        ...item,
  		                        contentType: collectionName,
  		                        _loadedFrom: source,
  		                        _locale: locale
  		                    }));
  		                } else if (typeof data === 'object') {
  		                    enhancedData = {
  		                        ...data,
  		                        contentType: collectionName,
  		                        _loadedFrom: source,
  		                        _locale: locale
  		                    };
  		                }

  		                // Update caches
  		                collectionCache.set(cacheKey, enhancedData);
  		                saveToCache(cacheKey, enhancedData);

  		                // Update store only if not initializing
  		                if (!isInitializing) {
  		                    updateStore(collectionName, enhancedData);
  		                }

  		                return enhancedData;
  		            } catch (error) {
  		                console.error(`[Indux] Failed to load collection "${collectionName}":`, error);
  		                return null;
  		            } finally {
  		                loadingPromises.delete(cacheKey);
  		            }
  		        })();

  		        loadingPromises.set(cacheKey, loadPromise);
  		        return loadPromise;
  		    }

  		    // Update store with new data
  		    function updateStore(collectionName, data) {
  		        if (isInitializing) return;

  		        const store = Alpine.store('collections');
  		        const all = store.all.filter(item => item.contentType !== collectionName);

  		        if (Array.isArray(data)) {
  		            all.push(...data);
  		        } else {
  		            all.push(data);
  		        }

  		        Alpine.store('collections', {
  		            ...store,
  		            [collectionName]: data,
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

  		                // Handle toPrimitive for text content
  		                if (key === Symbol.toPrimitive) {
  		                    return function () { return ''; };
  		                }

  		                // Handle numeric keys for array access
  		                if (typeof key === 'string' && !isNaN(Number(key))) {
  		                    return createLoadingProxy();
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

  		                // Handle route-aware access
  		                if (key === 'route' && typeof window !== 'undefined' && window.location) {
  		                    return function (matchPath) {
  		                        // Check if router is available
  		                        if (!window.InduxRoutingNavigation) {
  		                            console.warn('[Indux] Router not available for route-aware collection access');
  		                            return createLoadingProxy();
  		                        }

  		                        return createRouteAwareProxy(target, matchPath);
  		                    };
  		                }

  		                // Return the actual value, not a proxy
  		                const value = target[key];
  		                if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
  		                    return value;
  		                }

  		                // For objects and arrays, return a proxy
  		                if (value && typeof value === 'object') {
  		                    if (Array.isArray(value)) {
  		                        return new Proxy(value, {
  		                            get(target, nestedKey) {
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
  		                                return createLoadingProxy();
  		                            }
  		                        });
  		                    }
  		                    return new Proxy(value, {
  		                        get(target, nestedKey) {
  		                            // Handle special keys
  		                            if (nestedKey === Symbol.iterator || nestedKey === 'then' || nestedKey === 'catch' || nestedKey === 'finally') {
  		                                return undefined;
  		                            }

  		                            // Handle toPrimitive for text content
  		                            if (nestedKey === Symbol.toPrimitive) {
  		                                return function () {
  		                                    return target[nestedKey] || '';
  		                                };
  		                            }

  		                            // Handle route-aware access
  		                            if (nestedKey === 'route' && typeof window !== 'undefined' && window.location) {
  		                                return function (matchPath) {
  		                                    // Check if router is available
  		                                    if (!window.InduxRoutingNavigation) {
  		                                        console.warn('[Indux] Router not available for route-aware collection access');
  		                                        return createLoadingProxy();
  		                                    }

  		                                    return createRouteAwareProxy(target, matchPath);
  		                                };
  		                            }

  		                            return target[nestedKey];
  		                        }
  		                    });
  		                }

  		                return value;
  		            }
  		        });
  		    }

  		    // Find item by route matching
  		    function findItemByRoute(data, matchPath, currentRoute) {
  		        if (!data || !currentRoute) return null;

  		        // Normalize current route
  		        const normalizedRoute = currentRoute.replace(/^\/+|\/+$/g, '') || '/';
  		        const routeSegments = normalizedRoute.split('/').filter(segment => segment.length > 0);

  		        // Helper function to recursively search for the match property
  		        function findMatch(obj) {
  		            if (Array.isArray(obj)) {
  		                // Handle arrays - search each item
  		                for (let i = 0; i < obj.length; i++) {
  		                    const result = findMatch(obj[i]);
  		                    if (result) return result;
  		                }
  		                return null;
  		            } else if (obj && typeof obj === 'object') {
  		                // Handle objects - check if this object has the match property
  		                if (obj[matchPath]) {
  		                    const matchValue = obj[matchPath];
  		                    // Check if the match value appears anywhere in the route segments
  		                    if (routeSegments.includes(matchValue)) {
  		                        return obj;
  		                    }
  		                }

  		                // Recursively search all properties
  		                for (const key in obj) {
  		                    if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
  		                        const result = findMatch(obj[key]);
  		                        if (result) return result;
  		                    }
  		                }
  		            }

  		            return null;
  		        }

  		        return findMatch(data);
  		    }

  		    // Create route-aware proxy
  		    function createRouteAwareProxy(data, matchPath) {
  		        // Create a reactive Alpine component that automatically updates on route changes
  		        const reactiveProxy = Alpine.reactive({
  		            _data: data,
  		            _matchPath: matchPath,
  		            _currentRoute: window.location.pathname,
  		            _matchedItem: null,

  		            // Computed property that updates automatically
  		            get matchedItem() {
  		                this._currentRoute = window.location.pathname;
  		                this._matchedItem = findItemByRoute(this._data, this._matchPath, this._currentRoute);
  		                return this._matchedItem;
  		            }
  		        });

  		        // Set up route change listeners to trigger reactivity
  		        const routeChangeHandler = () => {
  		            reactiveProxy._currentRoute = window.location.pathname;
  		        };

  		        window.addEventListener('indux:route-change', routeChangeHandler);
  		        window.addEventListener('popstate', routeChangeHandler);

  		        // Return a proxy that delegates to the reactive component
  		        return new Proxy({}, {
  		            get(target, key) {
  		                // Handle special keys
  		                if (key === Symbol.iterator || key === 'then' || key === 'catch' || key === 'finally') {
  		                    return undefined;
  		                }

  		                // Handle toPrimitive for text content
  		                if (key === Symbol.toPrimitive) {
  		                    return function () {
  		                        const matchedItem = reactiveProxy.matchedItem;
  		                        return matchedItem ? (matchedItem[key] || '') : '';
  		                    };
  		                }

  		                // Get the current matched item (reactive)
  		                const matchedItem = reactiveProxy.matchedItem;

  		                if (!matchedItem) {
  		                    return createLoadingProxy();
  		                }

  		                // Return the actual value, not a proxy
  		                const value = matchedItem[key];
  		                if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
  		                    return value;
  		                }

  		                // For objects and arrays, return a proxy
  		                if (value && typeof value === 'object') {
  		                    if (Array.isArray(value)) {
  		                        return new Proxy(value, {
  		                            get(target, nestedKey) {
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
  		                                return createLoadingProxy();
  		                            }
  		                        });
  		                    }
  		                    return new Proxy(value, {
  		                        get(target, nestedKey) {
  		                            // Handle special keys
  		                            if (nestedKey === Symbol.iterator || nestedKey === 'then' || nestedKey === 'catch' || nestedKey === 'finally') {
  		                                return undefined;
  		                            }

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

  		                return value;
  		            }
  		        });
  		    }

  		    // Add $x magic method first
  		    Alpine.magic('x', () => {
  		        const pendingLoads = new Map();
  		        const store = Alpine.store('collections');

  		        // Listen for locale changes
  		        window.addEventListener('localechange', async (event) => {
  		            event.detail.locale;

  		            // Clear existing collections and cache
  		            Alpine.store('collections');
  		            collectionCache.clear();
  		            Alpine.store('collections', {
  		                all: [],
  		                _initialized: true
  		            });

  		            // Collections will be reloaded on-demand when accessed
  		        });

  		        return new Proxy({}, {
  		            get(target, prop) {
  		                // Handle special keys
  		                if (prop === Symbol.iterator || prop === 'then' || prop === 'catch' || prop === 'finally') {
  		                    return undefined;
  		                }

  		                // Get current value from store
  		                const value = store[prop];
  		                const currentLocale = Alpine.store('locale')?.current || 'en';

  		                // If not in store, try to load it
  		                if (!value && !pendingLoads.has(prop)) {
  		                    // Start loading
  		                    const loadPromise = loadCollection(prop, currentLocale);
  		                    pendingLoads.set(prop, loadPromise);
  		                    return createLoadingProxy();
  		                }

  		                // If we have a value, return a reactive proxy
  		                if (value) {
  		                    return new Proxy(value, {
  		                        get(target, key) {
  		                            // Handle special keys
  		                            if (key === Symbol.iterator || key === 'then' || key === 'catch' || key === 'finally') {
  		                                return undefined;
  		                            }

  		                            // Handle toPrimitive for text content
  		                            if (key === Symbol.toPrimitive) {
  		                                return function () { return ''; };
  		                            }

  		                            // Handle route-aware access
  		                            if (key === 'route' && typeof window !== 'undefined' && window.location) {
  		                                return function (matchPath) {
  		                                    // Check if router is available
  		                                    if (!window.InduxRoutingNavigation) {
  		                                        console.warn('[Indux] Router not available for route-aware collection access');
  		                                        return createLoadingProxy();
  		                                    }

  		                                    return createRouteAwareProxy(target, matchPath);
  		                                };
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
  		                            }

  		                            // Handle nested objects
  		                            const nestedValue = target[key];
  		                            if (nestedValue) {
  		                                if (Array.isArray(nestedValue)) {
  		                                    return new Proxy(nestedValue, {
  		                                        get(target, nestedKey) {
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

  		                                            // Handle route-aware access
  		                                            if (nestedKey === 'route' && typeof window !== 'undefined' && window.location) {
  		                                                return function (matchPath) {
  		                                                    // Check if router is available
  		                                                    if (!window.InduxRoutingNavigation) {
  		                                                        console.warn('[Indux] Router not available for route-aware collection access');
  		                                                        return createLoadingProxy();
  		                                                    }

  		                                                    return createRouteAwareProxy(target, matchPath);
  		                                                };
  		                                            }

  		                                            return createLoadingProxy();
  		                                        }
  		                                    });
  		                                }
  		                                return new Proxy(nestedValue, {
  		                                    get(target, nestedKey) {
  		                                        // Handle special keys
  		                                        if (nestedKey === Symbol.iterator || nestedKey === 'then' || nestedKey === 'catch' || nestedKey === 'finally') {
  		                                            return undefined;
  		                                        }

  		                                        // Handle toPrimitive for text content
  		                                        if (nestedKey === Symbol.toPrimitive) {
  		                                            return function () {
  		                                                return target[nestedKey] || '';
  		                                            };
  		                                        }

  		                                        // Handle route-aware access
  		                                        if (nestedKey === 'route' && typeof window !== 'undefined' && window.location) {
  		                                            return function (matchPath) {
  		                                                // Check if router is available
  		                                                if (!window.InduxRoutingNavigation) {
  		                                                    console.warn('[Indux] Router not available for route-aware collection access');
  		                                                    return createLoadingProxy();
  		                                                }

  		                                                return createRouteAwareProxy(target, matchPath);
  		                                            };
  		                                        }

  		                                        return target[nestedKey];
  		                                    }
  		                                });
  		                            }
  		                            return createLoadingProxy();
  		                        }
  		                    });
  		                }

  		                return createLoadingProxy();
  		            }
  		        });
  		    });

  		    // Initialize collections after magic method is registered
  		    if (isInitializing || initializationComplete) return;
  		    isInitializing = true;

  		    try {
  		        // Initialize store without loading all collections
  		        Alpine.store('collections', {
  		            all: [],
  		            _initialized: true
  		        });

  		        // Collections will be loaded on-demand when accessed via $x
  		    } finally {
  		        isInitializing = false;
  		        initializationComplete = true;
  		    }
  		}

  		// Handle both DOMContentLoaded and alpine:init
  		if (document.readyState === 'loading') {
  		    document.addEventListener('DOMContentLoaded', () => {
  		        if (window.Alpine) initializeCollectionsPlugin();
  		    });
  		}

  		document.addEventListener('alpine:init', initializeCollectionsPlugin); 
  	} (indux_collections$1, indux_collections$1.exports));
  	return indux_collections$1.exports;
  }

  requireIndux_collections();

  /*! Indux Dropdowns 1.0.0 - MIT License */

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

      // Check if a menu element is nested within another menu
      const isNestedMenu = (menu) => {
          let parent = menu.parentElement;
          while (parent) {
              if (parent.tagName === 'MENU' && parent.hasAttribute('popover')) {
                  return true;
              }
              parent = parent.parentElement;
          }
          return false;
      };

      // Ensure Alpine.js context exists
      ensureAlpineContext();

      // Register dropdown directive
      registerDirective('dropdown', (el, { modifiers, expression }, { effect }) => {
          let menu;

          if (modifiers.includes('hover')) {
              let hoverTimeout;
              let autoCloseTimeout;

              const handleShowPopover = () => {
                  if (menu) {
                      clearTimeout(hoverTimeout);
                      clearTimeout(autoCloseTimeout);
                      menu.showPopover();
                  }
              };

              const handleHidePopover = () => {
                  hoverTimeout = setTimeout(() => {
                      if (menu && !menu.matches(':hover')) {
                          menu.hidePopover();
                      }
                  }, 150);
              };

              // Global mouse tracking for auto-close
              const handleGlobalMouseMove = (e) => {
                  if (!menu?.matches(':popover-open')) return;

                  const isOverButton = el.contains(e.target) || el === e.target;
                  const isOverMenu = menu.contains(e.target) || menu === e.target;

                  if (!isOverButton && !isOverMenu) {
                      clearTimeout(autoCloseTimeout);
                      autoCloseTimeout = setTimeout(() => {
                          menu?.hidePopover();
                      }, 1000);
                  } else {
                      clearTimeout(autoCloseTimeout);
                  }
              };

              document.addEventListener('mousemove', handleGlobalMouseMove);
              el.addEventListener('mouseenter', handleShowPopover);
              el.addEventListener('mouseleave', handleHidePopover);
          }

          effect(() => {

              // Defer processing to ensure Alpine is fully ready
              setTimeout(() => {

                  if (!window.Alpine) {
                      console.warn('[Indux] Alpine not available for dropdown processing');
                      return;
                  }

                  // Generate a unique anchor code for positioning
                  const anchorCode = Math.random().toString(36).substr(2, 9);

                  // Check if expression refers to a template ID
                  if (expression && document.getElementById(expression)?.tagName === 'TEMPLATE') {
                      // Clone template content and generate unique ID
                      const template = document.getElementById(expression);
                      menu = template.content.cloneNode(true).firstElementChild;
                      const dropdownId = `dropdown-${anchorCode}`;
                      menu.setAttribute('id', dropdownId);
                      document.body.appendChild(menu);
                      el.setAttribute('popovertarget', dropdownId);

                      // Initialize Alpine on the cloned menu
                      Alpine.initTree(menu);
                  } else {
                      // Original behavior for static dropdowns
                      const dropdownId = expression || `dropdown-${anchorCode}`;
                      menu = document.getElementById(dropdownId);
                      if (!menu) {
                          console.warn(`[Indux] Dropdown menu with id "${dropdownId}" not found`);
                          return;
                      }
                      el.setAttribute('popovertarget', dropdownId);
                  }

                  // Set up popover
                  menu.setAttribute('popover', '');

                  // Set up anchor positioning
                  const anchorName = `--dropdown-${anchorCode}`;
                  el.style.setProperty('anchor-name', anchorName);
                  menu.style.setProperty('position-anchor', anchorName);

                  // Define positioning maps
                  const cornerPositions = {
                      'bottom.left': { area: 'bottom left', margin: 'var(--spacing-popover-offset)' },
                      'bottom.right': { area: 'bottom right', margin: 'var(--spacing-popover-offset)' },
                      'top.left': { area: 'top left', margin: 'var(--spacing-popover-offset)' },
                      'top.right': { area: 'top right', margin: 'var(--spacing-popover-offset)' }
                  };

                  const alignmentPositions = {
                      'bottom.start': { area: 'block-end span-inline-end', margin: 'var(--spacing-popover-offset) 0' },
                      'bottom.end': { area: 'block-end span-inline-start', margin: 'var(--spacing-popover-offset) 0' },
                      'top.start': { area: 'block-start span-inline-end', margin: 'var(--spacing-popover-offset) 0' },
                      'top.end': { area: 'block-start span-inline-start', margin: 'var(--spacing-popover-offset) 0' },
                      'left.start': { area: 'inline-start span-block-end', margin: '0 var(--spacing-popover-offset)' },
                      'left.end': { area: 'inline-start span-block-start', margin: '0 var(--spacing-popover-offset)' },
                      'right.start': { area: 'inline-end span-block-end', margin: '0 var(--spacing-popover-offset)' },
                      'right.end': { area: 'inline-end span-block-start', margin: '0 var(--spacing-popover-offset)' }
                  };

                  const singleDirections = {
                      'bottom': { area: 'block-end', margin: 'var(--spacing-popover-offset) 0' },
                      'top': { area: 'block-start', margin: 'var(--spacing-popover-offset) 0' },
                      'left': { area: 'inline-start', margin: '0 var(--spacing-popover-offset)' },
                      'right': { area: 'inline-end', margin: '0 var(--spacing-popover-offset)' }
                  };

                  // Find primary direction
                  const direction = ['bottom', 'top', 'left', 'right'].find(dir => modifiers.includes(dir));
                  if (!direction) {
                      // Default positioning - right start for nested menus, bottom middle for top-level
                      if (isNestedMenu(menu)) {
                          const position = alignmentPositions['right.start'];
                          menu.style.setProperty('position-area', position.area);
                          menu.style.setProperty('margin', position.margin);
                      } else {
                          menu.style.setProperty('position-area', 'block-end span-inline-end');
                          menu.style.setProperty('margin', 'var(--spacing-popover-offset) 0');
                      }
                      return;
                  }

                  // Check for corner positioning
                  const corner = ['left', 'right'].find(side =>
                      side !== direction && modifiers.includes(side)
                  );
                  if (corner) {
                      const position = cornerPositions[`${direction}.${corner}`];
                      menu.style.setProperty('position-area', position.area);
                      menu.style.setProperty('margin', position.margin);
                      return;
                  }

                  // Check for alignment
                  const alignment = ['start', 'end'].find(align => modifiers.includes(align));
                  if (alignment) {
                      const position = alignmentPositions[`${direction}.${alignment}`];
                      menu.style.setProperty('position-area', position.area);
                      menu.style.setProperty('margin', position.margin);
                      return;
                  }

                  // Single direction
                  const position = singleDirections[direction];
                  menu.style.setProperty('position-area', position.area);
                  menu.style.setProperty('margin', position.margin);

                  // Add keyboard navigation handling
                  menu.addEventListener('keydown', (e) => {
                      if (e.key === 'Tab') {
                          // Get all focusable elements
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
                      }

                      // Close on Escape
                      if (e.key === 'Escape') {
                          menu.hidePopover();
                          el.focus();
                      }
                  });

                  // Add hover functionality
                  if (modifiers.includes('hover')) {
                      let hoverTimeout;

                      menu.addEventListener('mouseenter', () => {
                          clearTimeout(hoverTimeout);
                      });

                      menu.addEventListener('mouseleave', () => {
                          hoverTimeout = setTimeout(() => {
                              menu.hidePopover();
                          }, 150);
                      });
                  }

                  // Update hover menu handling
                  if (modifiers.includes('hover')) {
                      menu.addEventListener('mouseenter', () => {
                          clearTimeout(autoCloseTimeout);
                      });

                      menu.addEventListener('mouseleave', () => {
                          // Start tracking for auto-close immediately when leaving menu
                          const event = new MouseEvent('mousemove', {
                              clientX: window.event?.clientX ?? 0,
                              clientY: window.event?.clientY ?? 0
                          });
                          document.dispatchEvent(event);
                      });
                  }
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

  var indux_icons = {};

  /*! Iconify 3.1.1 - MIT License */

  var hasRequiredIndux_icons;

  function requireIndux_icons () {
  	if (hasRequiredIndux_icons) return indux_icons;
  	hasRequiredIndux_icons = 1;
  	(function (exports) {
  		var Iconify = function (t) { const e = Object.freeze({ left: 0, top: 0, width: 16, height: 16 }), n = Object.freeze({ rotate: 0, vFlip: !1, hFlip: !1 }), o = Object.freeze({ ...e, ...n }), r = Object.freeze({ ...o, body: "", hidden: !1 }); function i(t, e) { const o = function (t, e) { const n = {}; !t.hFlip != !e.hFlip && (n.hFlip = !0), !t.vFlip != !e.vFlip && (n.vFlip = !0); const o = ((t.rotate || 0) + (e.rotate || 0)) % 4; return o && (n.rotate = o), n }(t, e); for (const i in r) i in n ? i in t && !(i in o) && (o[i] = n[i]) : i in e ? o[i] = e[i] : i in t && (o[i] = t[i]); return o } function c(t, e, n) { const o = t.icons, r = t.aliases || Object.create(null); let c = {}; function s(t) { c = i(o[t] || r[t], c); } return s(e), n.forEach(s), i(t, c) } function s(t, e) { const n = []; if ("object" != typeof t || "object" != typeof t.icons) return n; t.not_found instanceof Array && t.not_found.forEach((t => { e(t, null), n.push(t); })); const o = function (t, e) { const n = t.icons, o = t.aliases || Object.create(null), r = Object.create(null); return (Object.keys(n).concat(Object.keys(o))).forEach((function t(e) { if (n[e]) return r[e] = []; if (!(e in r)) { r[e] = null; const n = o[e] && o[e].parent, i = n && t(n); i && (r[e] = [n].concat(i)); } return r[e] })), r }(t); for (const r in o) { const i = o[r]; i && (e(r, c(t, r, i)), n.push(r)); } return n } const a = /^[a-z0-9]+(-[a-z0-9]+)*$/, u = (t, e, n, o = "") => { const r = t.split(":"); if ("@" === t.slice(0, 1)) { if (r.length < 2 || r.length > 3) return null; o = r.shift().slice(1); } if (r.length > 3 || !r.length) return null; if (r.length > 1) { const t = r.pop(), n = r.pop(), i = { provider: r.length > 0 ? r[0] : o, prefix: n, name: t }; return e && !f(i) ? null : i } const i = r[0], c = i.split("-"); if (c.length > 1) { const t = { provider: o, prefix: c.shift(), name: c.join("-") }; return e && !f(t) ? null : t } if (n && "" === o) { const t = { provider: o, prefix: "", name: i }; return e && !f(t, n) ? null : t } return null }, f = (t, e) => !!t && !("" !== t.provider && !t.provider.match(a) || !(e && "" === t.prefix || t.prefix.match(a)) || !t.name.match(a)), l = { provider: "", aliases: {}, not_found: {}, ...e }; function d(t, e) { for (const n in e) if (n in t && typeof t[n] != typeof e[n]) return !1; return !0 } function p(t) { if ("object" != typeof t || null === t) return null; const e = t; if ("string" != typeof e.prefix || !t.icons || "object" != typeof t.icons) return null; if (!d(t, l)) return null; const n = e.icons; for (const t in n) { const e = n[t]; if (!t.match(a) || "string" != typeof e.body || !d(e, r)) return null } const o = e.aliases || Object.create(null); for (const t in o) { const e = o[t], i = e.parent; if (!t.match(a) || "string" != typeof i || !n[i] && !o[i] || !d(e, r)) return null } return e } const h = Object.create(null); function g(t, e) { const n = h[t] || (h[t] = Object.create(null)); return n[e] || (n[e] = function (t, e) { return { provider: t, prefix: e, icons: Object.create(null), missing: new Set } }(t, e)) } function m(t, e) { return p(e) ? s(e, ((e, n) => { n ? t.icons[e] = n : t.missing.add(e); })) : [] } function y(t, e) { let n = []; return ("string" == typeof t ? [t] : Object.keys(h)).forEach((t => { ("string" == typeof t && "string" == typeof e ? [e] : Object.keys(h[t] || {})).forEach((e => { const o = g(t, e); n = n.concat(Object.keys(o.icons).map((n => ("" !== t ? "@" + t + ":" : "") + e + ":" + n))); })); })), n } let b = !1; function v(t) { const e = "string" == typeof t ? u(t, !0, b) : t; if (e) { const t = g(e.provider, e.prefix), n = e.name; return t.icons[n] || (t.missing.has(n) ? null : void 0) } } function x(t, e) { const n = u(t, !0, b); if (!n) return !1; return function (t, e, n) { try { if ("string" == typeof n.body) return t.icons[e] = { ...n }, !0 } catch (t) { } return !1 }(g(n.provider, n.prefix), n.name, e) } function w(t, e) { if ("object" != typeof t) return !1; if ("string" != typeof e && (e = t.provider || ""), b) ; const n = t.prefix; if (!f({ provider: e, prefix: n, name: "a" })) return !1; return !!m(g(e, n), t) } function S(t) { return !!v(t) } function j(t) { const e = v(t); return e ? { ...o, ...e } : null } const E = Object.freeze({ width: null, height: null }), I = Object.freeze({ ...E, ...n }), O = /(-?[0-9.]*[0-9]+[0-9.]*)/g, k = /^-?[0-9.]*[0-9]+[0-9.]*$/g; function C(t, e, n) { if (1 === e) return t; if (n = n || 100, "number" == typeof t) return Math.ceil(t * e * n) / n; if ("string" != typeof t) return t; const o = t.split(O); if (null === o || !o.length) return t; const r = []; let i = o.shift(), c = k.test(i); for (; ;) { if (c) { const t = parseFloat(i); isNaN(t) ? r.push(i) : r.push(Math.ceil(t * e * n) / n); } else r.push(i); if (i = o.shift(), void 0 === i) return r.join(""); c = !c; } } const M = t => "unset" === t || "undefined" === t || "none" === t; function T(t, e) { const n = { ...o, ...t }, r = { ...I, ...e }, i = { left: n.left, top: n.top, width: n.width, height: n.height }; let c = n.body;[n, r].forEach((t => { const e = [], n = t.hFlip, o = t.vFlip; let r, s = t.rotate; switch (n ? o ? s += 2 : (e.push("translate(" + (i.width + i.left).toString() + " " + (0 - i.top).toString() + ")"), e.push("scale(-1 1)"), i.top = i.left = 0) : o && (e.push("translate(" + (0 - i.left).toString() + " " + (i.height + i.top).toString() + ")"), e.push("scale(1 -1)"), i.top = i.left = 0), s < 0 && (s -= 4 * Math.floor(s / 4)), s %= 4, s) { case 1: r = i.height / 2 + i.top, e.unshift("rotate(90 " + r.toString() + " " + r.toString() + ")"); break; case 2: e.unshift("rotate(180 " + (i.width / 2 + i.left).toString() + " " + (i.height / 2 + i.top).toString() + ")"); break; case 3: r = i.width / 2 + i.left, e.unshift("rotate(-90 " + r.toString() + " " + r.toString() + ")"); }s % 2 == 1 && (i.left !== i.top && (r = i.left, i.left = i.top, i.top = r), i.width !== i.height && (r = i.width, i.width = i.height, i.height = r)), e.length && (c = '<g transform="' + e.join(" ") + '">' + c + "</g>"); })); const s = r.width, a = r.height, u = i.width, f = i.height; let l, d; null === s ? (d = null === a ? "1em" : "auto" === a ? f : a, l = C(d, u / f)) : (l = "auto" === s ? u : s, d = null === a ? C(l, f / u) : "auto" === a ? f : a); const p = {}, h = (t, e) => { M(e) || (p[t] = e.toString()); }; return h("width", l), h("height", d), p.viewBox = i.left.toString() + " " + i.top.toString() + " " + u.toString() + " " + f.toString(), { attributes: p, body: c } } const L = /\sid="(\S+)"/g, A = "IconifyId" + Date.now().toString(16) + (16777216 * Math.random() | 0).toString(16); let F = 0; function P(t, e = A) { const n = []; let o; for (; o = L.exec(t);)n.push(o[1]); if (!n.length) return t; const r = "suffix" + (16777216 * Math.random() | Date.now()).toString(16); return n.forEach((n => { const o = "function" == typeof e ? e(n) : e + (F++).toString(), i = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); t = t.replace(new RegExp('([#;"])(' + i + ')([")]|\\.[a-z])', "g"), "$1" + o + r + "$3"); })), t = t.replace(new RegExp(r, "g"), "") } const N = { local: !0, session: !0 }, z = { local: new Set, session: new Set }; let _ = !1; const D = "iconify2", R = "iconify", $ = R + "-count", q = R + "-version", H = 36e5, U = 168; function V(t, e) { try { return t.getItem(e) } catch (t) { } } function Q(t, e, n) { try { return t.setItem(e, n), !0 } catch (t) { } } function G(t, e) { try { t.removeItem(e); } catch (t) { } } function J(t, e) { return Q(t, $, e.toString()) } function B(t) { return parseInt(V(t, $)) || 0 } let K = "undefined" == typeof window ? {} : window; function W(t) { const e = t + "Storage"; try { if (K && K[e] && "number" == typeof K[e].length) return K[e] } catch (t) { } N[t] = !1; } function X(t, e) { const n = W(t); if (!n) return; const o = V(n, q); if (o !== D) { if (o) { const t = B(n); for (let e = 0; e < t; e++)G(n, R + e.toString()); } return Q(n, q, D), void J(n, 0) } const r = Math.floor(Date.now() / H) - U, i = t => { const o = R + t.toString(), i = V(n, o); if ("string" == typeof i) { try { const n = JSON.parse(i); if ("object" == typeof n && "number" == typeof n.cached && n.cached > r && "string" == typeof n.provider && "object" == typeof n.data && "string" == typeof n.data.prefix && e(n, t)) return !0 } catch (t) { } G(n, o); } }; let c = B(n); for (let e = c - 1; e >= 0; e--)i(e) || (e === c - 1 ? (c--, J(n, c)) : z[t].add(e)); } function Y() { if (!_) { _ = !0; for (const t in N) X(t, (t => { const e = t.data, n = g(t.provider, e.prefix); if (!m(n, e).length) return !1; const o = e.lastModified || -1; return n.lastModifiedCached = n.lastModifiedCached ? Math.min(n.lastModifiedCached, o) : o, !0 })); } } function Z(t, e) { switch (t) { case "local": case "session": N[t] = e; break; case "all": for (const t in N) N[t] = e; } } const tt = Object.create(null); function et(t, e) { tt[t] = e; } function nt(t) { return tt[t] || tt[""] } function ot(t) { let e; if ("string" == typeof t.resources) e = [t.resources]; else if (e = t.resources, !(e instanceof Array && e.length)) return null; return { resources: e, path: t.path || "/", maxURL: t.maxURL || 500, rotate: t.rotate || 750, timeout: t.timeout || 5e3, random: !0 === t.random, index: t.index || 0, dataAfterTimeout: !1 !== t.dataAfterTimeout } } const rt = Object.create(null), it = ["https://api.simplesvg.com", "https://api.unisvg.com"], ct = []; for (; it.length > 0;)1 === it.length || Math.random() > .5 ? ct.push(it.shift()) : ct.push(it.pop()); function st(t, e) { const n = ot(e); return null !== n && (rt[t] = n, !0) } function at(t) { return rt[t] } rt[""] = ot({ resources: ["https://api.iconify.design"].concat(ct) }); let ut = (() => { let t; try { if (t = fetch, "function" == typeof t) return t } catch (t) { } })(); const ft = { prepare: (t, e, n) => { const o = [], r = function (t, e) { const n = at(t); if (!n) return 0; let o; if (n.maxURL) { let t = 0; n.resources.forEach((e => { const n = e; t = Math.max(t, n.length); })); const r = e + ".json?icons="; o = n.maxURL - t - n.path.length - r.length; } else o = 0; return o }(t, e), i = "icons"; let c = { type: i, provider: t, prefix: e, icons: [] }, s = 0; return n.forEach(((n, a) => { s += n.length + 1, s >= r && a > 0 && (o.push(c), c = { type: i, provider: t, prefix: e, icons: [] }, s = n.length), c.icons.push(n); })), o.push(c), o }, send: (t, e, n) => { if (!ut) return void n("abort", 424); let o = function (t) { if ("string" == typeof t) { const e = at(t); if (e) return e.path } return "/" }(e.provider); switch (e.type) { case "icons": { const t = e.prefix, n = e.icons.join(","); o += t + ".json?" + new URLSearchParams({ icons: n }).toString(); break } case "custom": { const t = e.uri; o += "/" === t.slice(0, 1) ? t.slice(1) : t; break } default: return void n("abort", 400) }let r = 503; ut(t + o).then((t => { const e = t.status; if (200 === e) return r = 501, t.json(); setTimeout((() => { n(function (t) { return 404 === t }(e) ? "abort" : "next", e); })); })).then((t => { "object" == typeof t && null !== t ? setTimeout((() => { n("success", t); })) : setTimeout((() => { 404 === t ? n("abort", t) : n("next", r); })); })).catch((() => { n("next", r); })); } }; function lt(t, e) { t.forEach((t => { const n = t.loaderCallbacks; n && (t.loaderCallbacks = n.filter((t => t.id !== e))); })); } let dt = 0; var pt = { resources: [], index: 0, timeout: 2e3, rotate: 750, random: !1, dataAfterTimeout: !1 }; function ht(t, e, n, o) { const r = t.resources.length, i = t.random ? Math.floor(Math.random() * r) : t.index; let c; if (t.random) { let e = t.resources.slice(0); for (c = []; e.length > 1;) { const t = Math.floor(Math.random() * e.length); c.push(e[t]), e = e.slice(0, t).concat(e.slice(t + 1)); } c = c.concat(e); } else c = t.resources.slice(i).concat(t.resources.slice(0, i)); const s = Date.now(); let a, u = "pending", f = 0, l = null, d = [], p = []; function h() { l && (clearTimeout(l), l = null); } function g() { "pending" === u && (u = "aborted"), h(), d.forEach((t => { "pending" === t.status && (t.status = "aborted"); })), d = []; } function m(t, e) { e && (p = []), "function" == typeof t && p.push(t); } function y() { u = "failed", p.forEach((t => { t(void 0, a); })); } function b() { d.forEach((t => { "pending" === t.status && (t.status = "aborted"); })), d = []; } function v() { if ("pending" !== u) return; h(); const o = c.shift(); if (void 0 === o) return d.length ? void (l = setTimeout((() => { h(), "pending" === u && (b(), y()); }), t.timeout)) : void y(); const r = { status: "pending", resource: o, callback: (e, n) => { !function (e, n, o) { const r = "success" !== n; switch (d = d.filter((t => t !== e)), u) { case "pending": break; case "failed": if (r || !t.dataAfterTimeout) return; break; default: return }if ("abort" === n) return a = o, void y(); if (r) return a = o, void (d.length || (c.length ? v() : y())); if (h(), b(), !t.random) { const n = t.resources.indexOf(e.resource); -1 !== n && n !== t.index && (t.index = n); } u = "completed", p.forEach((t => { t(o); })); }(r, e, n); } }; d.push(r), f++, l = setTimeout(v, t.rotate), n(o, e, r.callback); } return "function" == typeof o && p.push(o), setTimeout(v), function () { return { startTime: s, payload: e, status: u, queriesSent: f, queriesPending: d.length, subscribe: m, abort: g } } } function gt(t) { const e = { ...pt, ...t }; let n = []; function o() { n = n.filter((t => "pending" === t().status)); } const r = { query: function (t, r, i) { const c = ht(e, t, r, ((t, e) => { o(), i && i(t, e); })); return n.push(c), c }, find: function (t) { return n.find((e => t(e))) || null }, setIndex: t => { e.index = t; }, getIndex: () => e.index, cleanup: o }; return r } function mt() { } const yt = Object.create(null); function bt(t, e, n) { let o, r; if ("string" == typeof t) { const e = nt(t); if (!e) return n(void 0, 424), mt; r = e.send; const i = function (t) { if (!yt[t]) { const e = at(t); if (!e) return; const n = { config: e, redundancy: gt(e) }; yt[t] = n; } return yt[t] }(t); i && (o = i.redundancy); } else { const e = ot(t); if (e) { o = gt(e); const n = nt(t.resources ? t.resources[0] : ""); n && (r = n.send); } } return o && r ? o.query(e, r, n)().abort : (n(void 0, 424), mt) } function vt(t, e) { function n(n) { let o; if (!N[n] || !(o = W(n))) return; const r = z[n]; let i; if (r.size) r.delete(i = Array.from(r).shift()); else if (i = B(o), !J(o, i + 1)) return; const c = { cached: Math.floor(Date.now() / H), provider: t.provider, data: e }; return Q(o, R + i.toString(), JSON.stringify(c)) } _ || Y(), e.lastModified && !function (t, e) { const n = t.lastModifiedCached; if (n && n >= e) return n === e; if (t.lastModifiedCached = e, n) for (const n in N) X(n, (n => { const o = n.data; return n.provider !== t.provider || o.prefix !== t.prefix || o.lastModified === e })); return !0 }(t, e.lastModified) || Object.keys(e.icons).length && (e.not_found && delete (e = Object.assign({}, e)).not_found, n("local") || n("session")); } function xt() { } function wt(t) { t.iconsLoaderFlag || (t.iconsLoaderFlag = !0, setTimeout((() => { t.iconsLoaderFlag = !1, function (t) { t.pendingCallbacksFlag || (t.pendingCallbacksFlag = !0, setTimeout((() => { t.pendingCallbacksFlag = !1; const e = t.loaderCallbacks ? t.loaderCallbacks.slice(0) : []; if (!e.length) return; let n = !1; const o = t.provider, r = t.prefix; e.forEach((e => { const i = e.icons, c = i.pending.length; i.pending = i.pending.filter((e => { if (e.prefix !== r) return !0; const c = e.name; if (t.icons[c]) i.loaded.push({ provider: o, prefix: r, name: c }); else { if (!t.missing.has(c)) return n = !0, !0; i.missing.push({ provider: o, prefix: r, name: c }); } return !1 })), i.pending.length !== c && (n || lt([t], e.id), e.callback(i.loaded.slice(0), i.missing.slice(0), i.pending.slice(0), e.abort)); })); }))); }(t); }))); } const St = t => { const e = g(t.provider, t.prefix).pendingIcons; return !(!e || !e.has(t.name)) }, jt = (t, e) => { const o = function (t) { const e = { loaded: [], missing: [], pending: [] }, n = Object.create(null); t.sort(((t, e) => t.provider !== e.provider ? t.provider.localeCompare(e.provider) : t.prefix !== e.prefix ? t.prefix.localeCompare(e.prefix) : t.name.localeCompare(e.name))); let o = { provider: "", prefix: "", name: "" }; return t.forEach((t => { if (o.name === t.name && o.prefix === t.prefix && o.provider === t.provider) return; o = t; const r = t.provider, i = t.prefix, c = t.name, s = n[r] || (n[r] = Object.create(null)), a = s[i] || (s[i] = g(r, i)); let u; u = c in a.icons ? e.loaded : "" === i || a.missing.has(c) ? e.missing : e.pending; const f = { provider: r, prefix: i, name: c }; u.push(f); })), e }(function (t, e = !0, n = !1) { const o = []; return t.forEach((t => { const r = "string" == typeof t ? u(t, e, n) : t; r && o.push(r); })), o }(t, !0, (b))); if (!o.pending.length) { let t = !0; return e && setTimeout((() => { t && e(o.loaded, o.missing, o.pending, xt); })), () => { t = !1; } } const r = Object.create(null), i = []; let c, s; return o.pending.forEach((t => { const { provider: e, prefix: n } = t; if (n === s && e === c) return; c = e, s = n, i.push(g(e, n)); const o = r[e] || (r[e] = Object.create(null)); o[n] || (o[n] = []); })), o.pending.forEach((t => { const { provider: e, prefix: n, name: o } = t, i = g(e, n), c = i.pendingIcons || (i.pendingIcons = new Set); c.has(o) || (c.add(o), r[e][n].push(o)); })), i.forEach((t => { const { provider: e, prefix: n } = t; r[e][n].length && function (t, e) { t.iconsToLoad ? t.iconsToLoad = t.iconsToLoad.concat(e).sort() : t.iconsToLoad = e, t.iconsQueueFlag || (t.iconsQueueFlag = !0, setTimeout((() => { t.iconsQueueFlag = !1; const { provider: e, prefix: n } = t, o = t.iconsToLoad; let r; delete t.iconsToLoad, o && (r = nt(e)) && r.prepare(e, n, o).forEach((n => { bt(e, n, (e => { if ("object" != typeof e) n.icons.forEach((e => { t.missing.add(e); })); else try { const n = m(t, e); if (!n.length) return; const o = t.pendingIcons; o && n.forEach((t => { o.delete(t); })), vt(t, e); } catch (t) { console.error(t); } wt(t); })); })); }))); }(t, r[e][n]); })), e ? function (t, e, n) { const o = dt++, r = lt.bind(null, n, o); if (!e.pending.length) return r; const i = { id: o, icons: e, callback: t, abort: r }; return n.forEach((t => { (t.loaderCallbacks || (t.loaderCallbacks = [])).push(i); })), r }(e, o, i) : xt }, Et = t => new Promise(((e, n) => { const r = "string" == typeof t ? u(t, !0) : t; r ? jt([r || t], (i => { if (i.length && r) { const t = v(r); if (t) return void e({ ...o, ...t }) } n(t); })) : n(t); })); function It(t, e) { const n = { ...t }; for (const t in e) { const o = e[t], r = typeof o; t in E ? (null === o || o && ("string" === r || "number" === r)) && (n[t] = o) : r === typeof n[t] && (n[t] = "rotate" === t ? o % 4 : o); } return n } const Ot = { ...I, inline: !1 }, kt = "iconify", Ct = "iconify-inline", Mt = "iconifyData" + Date.now(); let Tt = []; function Lt(t) { for (let e = 0; e < Tt.length; e++) { const n = Tt[e]; if (("function" == typeof n.node ? n.node() : n.node) === t) return n } } function At(t, e = !1) { let n = Lt(t); return n ? (n.temporary && (n.temporary = e), n) : (n = { node: t, temporary: e }, Tt.push(n), n) } function Ft() { return Tt } let Pt = null; const Nt = { childList: !0, subtree: !0, attributes: !0 }; function zt(t) { if (!t.observer) return; const e = t.observer; e.pendingScan || (e.pendingScan = setTimeout((() => { delete e.pendingScan, Pt && Pt(t); }))); } function _t(t, e) { if (!t.observer) return; const n = t.observer; if (!n.pendingScan) for (let o = 0; o < e.length; o++) { const r = e[o]; if (r.addedNodes && r.addedNodes.length > 0 || "attributes" === r.type && void 0 !== r.target[Mt]) return void (n.paused || zt(t)) } } function Dt(t, e) { t.observer.instance.observe(e, Nt); } function Rt(t) { let e = t.observer; if (e && e.instance) return; const n = "function" == typeof t.node ? t.node() : t.node; n && window && (e || (e = { paused: 0 }, t.observer = e), e.instance = new window.MutationObserver(_t.bind(null, t)), Dt(t, n), e.paused || zt(t)); } function $t() { Ft().forEach(Rt); } function qt(t) { if (!t.observer) return; const e = t.observer; e.pendingScan && (clearTimeout(e.pendingScan), delete e.pendingScan), e.instance && (e.instance.disconnect(), delete e.instance); } function Ht(t) { const e = null !== Pt; Pt !== t && (Pt = t, e && Ft().forEach(qt)), e ? $t() : function (t) { const e = document; e.readyState && "loading" !== e.readyState ? t() : e.addEventListener("DOMContentLoaded", t); }($t); } function Ut(t) { (t ? [t] : Ft()).forEach((t => { if (!t.observer) return void (t.observer = { paused: 1 }); const e = t.observer; if (e.paused++, e.paused > 1 || !e.instance) return; e.instance.disconnect(); })); } function Vt(t) { if (t) { const e = Lt(t); e && Ut(e); } else Ut(); } function Qt(t) { (t ? [t] : Ft()).forEach((t => { if (!t.observer) return void Rt(t); const e = t.observer; if (e.paused && (e.paused--, !e.paused)) { const n = "function" == typeof t.node ? t.node() : t.node; if (!n) return; e.instance ? Dt(t, n) : Rt(t); } })); } function Gt(t) { if (t) { const e = Lt(t); e && Qt(e); } else Qt(); } function Jt(t, e = !1) { const n = At(t, e); return Rt(n), n } function Bt(t) { const e = Lt(t); e && (qt(e), function (t) { Tt = Tt.filter((e => t !== e && t !== ("function" == typeof e.node ? e.node() : e.node))); }(t)); } const Kt = /[\s,]+/; const Wt = ["width", "height"], Xt = ["inline", "hFlip", "vFlip"]; function Yt(t) { const e = t.getAttribute("data-icon"), n = "string" == typeof e && u(e, !0); if (!n) return null; const o = { ...Ot, inline: t.classList && t.classList.contains(Ct) }; Wt.forEach((e => { const n = t.getAttribute("data-" + e); n && (o[e] = n); })); const r = t.getAttribute("data-rotate"); "string" == typeof r && (o.rotate = function (t, e = 0) { const n = t.replace(/^-?[0-9.]*/, ""); function o(t) { for (; t < 0;)t += 4; return t % 4 } if ("" === n) { const e = parseInt(t); return isNaN(e) ? 0 : o(e) } if (n !== t) { let e = 0; switch (n) { case "%": e = 25; break; case "deg": e = 90; }if (e) { let r = parseFloat(t.slice(0, t.length - n.length)); return isNaN(r) ? 0 : (r /= e, r % 1 == 0 ? o(r) : 0) } } return e }(r)); const i = t.getAttribute("data-flip"); "string" == typeof i && function (t, e) { e.split(Kt).forEach((e => { switch (e.trim()) { case "horizontal": t.hFlip = !0; break; case "vertical": t.vFlip = !0; } })); }(o, i), Xt.forEach((e => { const n = "data-" + e, r = function (t, e) { return t === e || "true" === t || "" !== t && "false" !== t && null }(t.getAttribute(n), n); "boolean" == typeof r && (o[e] = r); })); const c = t.getAttribute("data-mode"); return { name: e, icon: n, customisations: o, mode: c } } const Zt = "svg." + kt + ", i." + kt + ", span." + kt + ", i." + Ct + ", span." + Ct; function te(t, e) { let n = -1 === t.indexOf("xlink:") ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"'; for (const t in e) n += " " + t + '="' + e[t] + '"'; return '<svg xmlns="http://www.w3.org/2000/svg"' + n + ">" + t + "</svg>" } let ee; function ne(t) { return void 0 === ee && function () { try { ee = window.trustedTypes.createPolicy("iconify", { createHTML: t => t }); } catch (t) { ee = null; } }(), ee ? ee.createHTML(t) : t } function oe(t) { const e = new Set(["iconify"]); return ["provider", "prefix"].forEach((n => { t[n] && e.add("iconify--" + t[n]); })), e } function re(t, e, n, o) { const r = t.classList; if (o) { const t = o.classList; Array.from(t).forEach((t => { r.add(t); })); } const i = []; return e.forEach((t => { r.contains(t) ? n.has(t) && i.push(t) : (r.add(t), i.push(t)); })), n.forEach((t => { e.has(t) || r.remove(t); })), i } function ie(t, e, n) { const o = t.style; (n || []).forEach((t => { o.removeProperty(t); })); const r = []; for (const t in e) o.getPropertyValue(t) || (r.push(t), o.setProperty(t, e[t])); return r } function ce(t, e, n) { let o; try { o = document.createElement("span"); } catch (e) { return t } const r = e.customisations, i = T(n, r), c = t[Mt], s = te(P(i.body), { "aria-hidden": "true", role: "img", ...i.attributes }); o.innerHTML = ne(s); const a = o.childNodes[0], u = t.attributes; for (let t = 0; t < u.length; t++) { const e = u.item(t), n = e.name; "class" === n || a.hasAttribute(n) || a.setAttribute(n, e.value); } const f = re(a, oe(e.icon), new Set(c && c.addedClasses), t), l = ie(a, r.inline ? { "vertical-align": "-0.125em" } : {}, c && c.addedStyles), d = { ...e, status: "loaded", addedClasses: f, addedStyles: l }; return a[Mt] = d, t.parentNode && t.parentNode.replaceChild(a, t), a } const se = { display: "inline-block" }, ae = { "background-color": "currentColor" }, ue = { "background-color": "transparent" }, fe = { image: "var(--svg)", repeat: "no-repeat", size: "100% 100%" }, le = { "-webkit-mask": ae, mask: ae, background: ue }; for (const t in le) { const e = le[t]; for (const n in fe) e[t + "-" + n] = fe[n]; } function de(t) { return t + (t.match(/^[-0-9.]+$/) ? "px" : "") } let pe = !1; function he() { pe || (pe = !0, setTimeout((() => { pe && (pe = !1, ge()); }))); } function ge(t, e = !1) { const n = Object.create(null); function r(t, e) { const { provider: o, prefix: r, name: i } = t, c = g(o, r), s = c.icons[i]; if (s) return { status: "loaded", icon: s }; if (c.missing.has(i)) return { status: "missing" }; if (e && !St(t)) { const t = n[o] || (n[o] = Object.create(null)); (t[r] || (t[r] = new Set)).add(i); } return { status: "loading" } } (t ? [t] : Ft()).forEach((t => { const n = "function" == typeof t.node ? t.node() : t.node; if (!n || !n.querySelectorAll) return; let i = !1, c = !1; function s(e, n, r) { if (c || (c = !0, Ut(t)), "SVG" !== e.tagName.toUpperCase()) { const t = n.mode, i = "mask" === t || "bg" !== t && ("style" === t ? -1 !== r.body.indexOf("currentColor") : null); if ("boolean" == typeof i) return void function (t, e, n, o) { const r = e.customisations, i = T(n, r), c = i.attributes, s = t[Mt], a = te(i.body, { ...c, width: n.width + "", height: n.height + "" }), u = re(t, oe(e.icon), new Set(s && s.addedClasses)), f = { "--svg": 'url("' + (l = a, "data:image/svg+xml," + function (t) { return t.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ") }(l) + '")'), width: de(c.width), height: de(c.height), ...se, ...o ? ae : ue }; var l; r.inline && (f["vertical-align"] = "-0.125em"); const d = ie(t, f, s && s.addedStyles), p = { ...e, status: "loaded", addedClasses: u, addedStyles: d }; t[Mt] = p; }(e, n, { ...o, ...r }, i) } ce(e, n, r); } ((function (t) { const e = []; return t.querySelectorAll(Zt).forEach((t => { const n = t[Mt] || "svg" !== t.tagName.toLowerCase() ? Yt(t) : null; n && e.push({ node: t, props: n }); })), e }))(n).forEach((({ node: t, props: e }) => { const n = t[Mt]; if (!n) { const { status: n, icon: o } = r(e.icon, !0); return o ? void s(t, e, o) : (i = i || "loading" === n, void (t[Mt] = { ...e, status: n })) } let o; if (function (t, e) { if (t.name !== e.name || t.mode !== e.mode) return !0; const n = t.customisations, o = e.customisations; for (const t in Ot) if (n[t] !== o[t]) return !0; return !1 }(n, e)) { if (o = r(e.icon, n.name !== e.name), !o.icon) return i = i || "loading" === o.status, void Object.assign(n, { ...e, status: o.status }) } else { if ("loading" !== n.status) return; if (o = r(e.icon, !1), !o.icon) return void (n.status = o.status) } s(t, e, o.icon); })), t.temporary && !i ? Bt(n) : e && i ? Jt(n, !0) : c && t.observer && Qt(t); })); for (const t in n) { const e = n[t]; for (const n in e) { const o = e[n]; jt(Array.from(o).map((e => ({ provider: t, prefix: n, name: e }))), he); } } } function me(t, e, n = !1) { const o = v(t); if (!o) return null; const r = u(t), i = It(Ot, e || {}), c = ce(document.createElement("span"), { name: t, icon: r, customisations: i }, o); return n ? c.outerHTML : c } function ye() { return "3.1.1" } function be(t, e) { return me(t, e, !1) } function ve(t, e) { return me(t, e, !0) } function xe(t, e) { const n = v(t); if (!n) return null; return T(n, It(Ot, e || {})) } function we(t) { t ? function (t) { const e = Lt(t); e ? ge(e) : ge({ node: t, temporary: !0 }, !0); }(t) : ge(); } if ("undefined" != typeof document && "undefined" != typeof window) { !function () { if (document.documentElement) return At(document.documentElement); Tt.push({ node: () => document.documentElement }); }(); const t = window; if (void 0 !== t.IconifyPreload) { const e = t.IconifyPreload, n = "Invalid IconifyPreload syntax."; "object" == typeof e && null !== e && (e instanceof Array ? e : [e]).forEach((t => { try { ("object" != typeof t || null === t || t instanceof Array || "object" != typeof t.icons || "string" != typeof t.prefix || !w(t)) && console.error(n); } catch (t) { console.error(n); } })); } setTimeout((() => { Ht(ge), ge(); })); } function Se(t, e) { Z(t, !1 !== e); } function je(t) { Z(t, !0); } if (et("", ft), "undefined" != typeof document && "undefined" != typeof window) { Y(); const t = window; if (void 0 !== t.IconifyProviders) { const e = t.IconifyProviders; if ("object" == typeof e && null !== e) for (const t in e) { const n = "IconifyProviders[" + t + "] is invalid."; try { const o = e[t]; if ("object" != typeof o || !o || void 0 === o.resources) continue; st(t, o) || console.error(n); } catch (t) { console.error(n); } } } } const Ee = { getAPIConfig: at, setAPIModule: et, sendAPIQuery: bt, setFetch: function (t) { ut = t; }, getFetch: function () { return ut }, listAPIProviders: function () { return Object.keys(rt) } }, Ie = { _api: Ee, addAPIProvider: st, loadIcons: jt, loadIcon: Et, iconExists: S, getIcon: j, listIcons: y, addIcon: x, addCollection: w, replaceIDs: P, calculateSize: C, buildIcon: T, getVersion: ye, renderSVG: be, renderHTML: ve, renderIcon: xe, scan: we, observe: Jt, stopObserving: Bt, pauseObserver: Vt, resumeObserver: Gt, enableCache: Se, disableCache: je }; return t._api = Ee, t.addAPIProvider = st, t.addCollection = w, t.addIcon = x, t.buildIcon = T, t.calculateSize = C, t.default = Ie, t.disableCache = je, t.enableCache = Se, t.getIcon = j, t.getVersion = ye, t.iconExists = S, t.listIcons = y, t.loadIcon = Et, t.loadIcons = jt, t.observe = Jt, t.pauseObserver = Vt, t.renderHTML = ve, t.renderIcon = xe, t.renderSVG = be, t.replaceIDs = P, t.resumeObserver = Gt, t.scan = we, t.stopObserving = Bt, Object.defineProperty(t, "__esModule", { value: !0 }), t }({}); try { for (var key in exports.__esModule = !0, exports.default = Iconify, Iconify) exports[key] = Iconify[key]; } catch (t) { } try { void 0 === self.Iconify && (self.Iconify = Iconify); } catch (t) { }

  		/*! Indux Icons 1.0.0 - MIT License */

  		// Initialize plugin when either DOM is ready or Alpine is ready
  		function initializeIconPlugin() {
  		    // Register icon directive
  		    Alpine.directive('icon', (el, { expression }, { effect, evaluateLater }) => {
  		        const iconValue = expression;
  		        if (!iconValue) return

  		        // Check if it's a raw icon name
  		        const isRawIconName = !iconValue.includes("'") &&
  		            !iconValue.includes('"') &&
  		            !iconValue.includes('$') &&
  		            !iconValue.includes('?') &&
  		            !iconValue.includes('.');

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

  /*! Indux Localization 1.0.0 - MIT License */

  function initializeLocalizationPlugin() {
      // Initialize empty localization store
      Alpine.store('locale', {
          current: 'en',
          available: [],
          direction: 'ltr',
          _initialized: false
      });

      // Get available locales from manifest
      async function getAvailableLocales() {
          try {
              const response = await fetch('/manifest.json');
              const manifest = await response.json();

              // Get unique locales from collections
              const locales = new Set(['en']); // Always include 'en' as fallback
              if (manifest.collections) {
                  Object.values(manifest.collections).forEach(collection => {
                      if (typeof collection === 'object') {
                          Object.keys(collection).forEach(key => {
                              if (key.length === 2) { // Assume 2-letter codes are locales
                                  locales.add(key);
                              }
                          });
                      }
                  });
              }

              return Array.from(locales);
          } catch (error) {
              console.error('[Indux] Error loading manifest:', error);
              return ['en']; // Fallback to just 'en'
          }
      }

      // Detect initial locale
      function detectInitialLocale(availableLocales) {
          // 1. Check HTML lang attribute
          const htmlLang = document.documentElement.lang;
          if (htmlLang && availableLocales.includes(htmlLang)) {
              return htmlLang;
          }

          // 2. Check URL path
          const pathParts = window.location.pathname.split('/').filter(Boolean);
          if (pathParts[0] && availableLocales.includes(pathParts[0])) {
              return pathParts[0];
          }

          // 3. Check localStorage
          const storedLang = localStorage.getItem('lang');
          if (storedLang && availableLocales.includes(storedLang)) {
              return storedLang;
          }

          // 4. Check browser language
          const browserLang = navigator.language.split('-')[0];
          if (availableLocales.includes(browserLang)) {
              return browserLang;
          }

          // Default to first available locale
          return availableLocales[0];
      }

      // Update locale
      async function setLocale(newLang) {
          const store = Alpine.store('locale');
          if (!store.available.includes(newLang) || newLang === store.current) return;

          try {
              // Update store
              store.current = newLang;
              store._initialized = true;

              // Update HTML
              document.documentElement.lang = newLang;

              // Update localStorage
              localStorage.setItem('lang', newLang);

              // Update URL if needed
              const currentUrl = new URL(window.location.href);
              const pathParts = currentUrl.pathname.split('/').filter(Boolean);

              if (pathParts[0] && store.available.includes(pathParts[0])) {
                  // Replace language in path
                  pathParts[0] = newLang;
                  currentUrl.pathname = '/' + pathParts.join('/');
                  window.history.replaceState({}, '', currentUrl);
              }

              // Trigger locale change event
              window.dispatchEvent(new CustomEvent('localechange', {
                  detail: { locale: newLang }
              }));

          } catch (error) {
              console.error('[Indux] Error setting locale:', error);
              // Restore previous state
              store.current = localStorage.getItem('lang') || store.available[0];
              document.documentElement.lang = store.current;
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
                          setLocale(store.available[nextIndex]);
                      };
                  }
                  return undefined;
              }
          });
      });

      // Initialize with manifest data
      (async () => {
          const availableLocales = await getAvailableLocales();
          const store = Alpine.store('locale');
          store.available = availableLocales;

          const initialLocale = detectInitialLocale(availableLocales);
          setLocale(initialLocale);
      })();
  }

  // Handle both DOMContentLoaded and alpine:init
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
          if (window.Alpine) initializeLocalizationPlugin();
      });
  }

  document.addEventListener('alpine:init', initializeLocalizationPlugin);

  /*! Indux Resizer 1.0.0 - MIT License */

  function initializeResizablePlugin() {

      Alpine.directive('resizable', (el, { modifiers, expression }, { evaluate }) => {
          // Helper to parse value and unit from CSS dimension
          const parseDimension = (value) => {
              if (typeof value === 'number') return { value, unit: 'px' };
              const match = String(value).match(/^([\d.]+)(.*)$/);
              return match ? { value: parseFloat(match[1]), unit: match[2] || 'px' } : { value: 0, unit: 'px' };
          };

          // Helper to convert any unit to pixels
          const convertToPixels = (value, unit) => {
              if (unit === 'px') return value;

              // Create temporary element for conversion
              const temp = document.createElement('div');
              temp.style.visibility = 'hidden';
              temp.style.position = 'absolute';
              temp.style.width = `${value}${unit}`;
              document.body.appendChild(temp);

              const pixels = temp.getBoundingClientRect().width;
              document.body.removeChild(temp);

              return pixels;
          };

          // Helper to convert pixels back to original unit
          const convertFromPixels = (pixels, unit) => {
              if (unit === 'px') return pixels;

              // Create temporary element for conversion
              const temp = document.createElement('div');
              temp.style.visibility = 'hidden';
              temp.style.position = 'absolute';
              temp.style.width = '100px';  // Use 100px as reference
              document.body.appendChild(temp);

              const reference = temp.getBoundingClientRect().width;
              document.body.removeChild(temp);

              // Convert based on unit type
              switch (unit) {
                  case '%':
                      return (pixels / el.parentElement.getBoundingClientRect().width) * 100;
                  case 'rem':
                      const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
                      return pixels / remSize;
                  case 'em':
                      const emSize = parseFloat(getComputedStyle(el).fontSize);
                      return pixels / emSize;
                  default:
                      return (pixels * 100) / reference;
              }
          };

          // Parse options from expression or use defaults
          const options = expression ? evaluate(expression) : {};
          const {
              minWidth = 200,
              maxWidth = Infinity,
              snapDistance = 50,
              snapPoints = [],
              snapCloseWidth = 200,
              toggle = null,
              handles = ['e'],
              saveWidth = null,
              affectedSelector = null
          } = options;

          // Parse constraints with units
          const constraints = {
              min: parseDimension(minWidth),
              max: parseDimension(maxWidth),
              close: parseDimension(snapCloseWidth)
          };

          // Parse snap points with units
          const parsedSnapPoints = snapPoints.map(point => parseDimension(point));

          // Load saved width if storage key provided
          if (saveWidth) {
              const savedWidth = localStorage.getItem(`resizable-${saveWidth}`);
              if (savedWidth) {
                  // Preserve the original unit if saved
                  const [value, unit] = savedWidth.split('|');
                  el.style.width = `${value}${unit || 'px'}`;
              }
          }

          // Handle mapping for cursor styles
          const handleMap = {
              n: { cursor: 'ns-resize', edge: 'top' },
              s: { cursor: 'ns-resize', edge: 'bottom' },
              e: { cursor: 'ew-resize', edge: 'right' },
              w: { cursor: 'ew-resize', edge: 'left' },
              nw: { cursor: 'nw-resize', edges: ['top', 'left'] },
              ne: { cursor: 'ne-resize', edges: ['top', 'right'] },
              sw: { cursor: 'sw-resize', edges: ['bottom', 'left'] },
              se: { cursor: 'se-resize', edges: ['bottom', 'right'] }
          };

          // Create resize handles
          handles.forEach(handlePos => {
              const handle = document.createElement('div');
              const handleInner = document.createElement('div');
              const handleInfo = handleMap[handlePos];

              handle.className = `resize-handle resize-handle-${handlePos}`;
              handleInner.className = 'resize-handle-inner';

              handle.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                cursor: ${handleInfo.cursor};
                z-index: 100;
            `;

              // Position the handle
              if (handlePos.includes('n')) handle.style.top = '-5px';
              if (handlePos.includes('s')) handle.style.bottom = '-5px';
              if (handlePos.includes('e')) handle.style.right = '-5px';
              if (handlePos.includes('w')) handle.style.left = '-5px';

              // Extend handle size for edges
              if (handlePos.length === 1) {
                  if (handlePos === 'n' || handlePos === 's') {
                      handle.style.width = 'calc(100% + 10px)';
                      handle.style.left = '-5px';
                  } else {
                      handle.style.height = 'calc(100% + 10px)';
                      handle.style.top = '-5px';
                  }
              }

              handle.appendChild(handleInner);

              let startX, startY, startWidth, startHeight;
              let currentSnap = null;

              // Convert constraints to pixels for calculations
              const pixelConstraints = {
                  min: convertToPixels(constraints.min.value, constraints.min.unit),
                  max: constraints.max.value === Infinity ? Infinity :
                      convertToPixels(constraints.max.value, constraints.max.unit),
                  close: convertToPixels(constraints.close.value, constraints.close.unit)
              };

              // Convert snap points to pixels
              const pixelSnapPoints = parsedSnapPoints.map(point => ({
                  value: convertToPixels(point.value, point.unit),
                  unit: point.unit
              }));

              const resize = (e) => {
                  e.preventDefault();

                  if (e.buttons === 0) {
                      stopResize();
                      return;
                  }

                  const deltaX = e.pageX - startX;
                  const deltaY = e.pageY - startY;

                  // Get affected element if specified
                  const affectedEl = affectedSelector ?
                      el.parentElement.querySelector(affectedSelector) : null;

                  // Calculate new dimensions
                  let newWidth = startWidth;
                  let newHeight = startHeight;

                  // Handle horizontal resizing
                  if (handlePos.includes('e')) {
                      newWidth = startWidth + deltaX;
                      if (affectedEl) {
                          const affectedWidth = affectedEl.getBoundingClientRect().width;
                          const affectedMinWidth = parseInt(getComputedStyle(affectedEl).minWidth) || 0;
                          if (affectedWidth - deltaX < affectedMinWidth) {
                              return;
                          }
                      }
                  } else if (handlePos.includes('w')) {
                      newWidth = startWidth - deltaX;
                      if (affectedEl) {
                          const affectedWidth = affectedEl.getBoundingClientRect().width;
                          const affectedMinWidth = parseInt(getComputedStyle(affectedEl).minWidth) || 0;
                          if (affectedWidth + deltaX < affectedMinWidth) {
                              return;
                          }
                      }
                  }

                  // Handle vertical resizing
                  if (handlePos.includes('s')) {
                      newHeight = startHeight + deltaY;
                  } else if (handlePos.includes('n')) {
                      newHeight = startHeight - deltaY;
                  }

                  const snapDistancePixels = convertToPixels(parseDimension(snapDistance).value,
                      parseDimension(snapDistance).unit);
                  const pullDistance = 50;
                  const closeThreshold = pixelConstraints.close - pullDistance;

                  // Handle snap-close before applying other constraints
                  if (newWidth < closeThreshold) {
                      el.classList.add('resizable-closing', 'resizable-closed');
                      currentSnap = 'closing';
                      if (toggle) {
                          evaluate(`${toggle} = false`);
                      }
                      return; // Exit early to prevent further width calculations
                  }

                  // Apply constraints only if we're not closing
                  newWidth = Math.min(Math.max(newWidth, pixelConstraints.min),
                      pixelConstraints.max === Infinity ? newWidth : pixelConstraints.max);

                  // Handle normal snap points
                  if (Math.abs(newWidth - pixelConstraints.min) < snapDistancePixels) {
                      newWidth = pixelConstraints.min;
                      currentSnap = 'min';
                  } else {
                      for (const point of pixelSnapPoints) {
                          if (Math.abs(newWidth - point.value) < snapDistancePixels) {
                              newWidth = point.value;
                              currentSnap = `${convertFromPixels(newWidth, point.unit)}${point.unit}`;
                              break;
                          }
                      }
                  }

                  // Convert back to original unit for display
                  const displayWidth = convertFromPixels(newWidth, constraints.min.unit);
                  el.style.width = `${displayWidth}${constraints.min.unit}`;
                  el.style.height = `${newHeight}px`;
                  el.classList.remove('resizable-closing', 'resizable-closed');
                  if (toggle) {
                      evaluate(`${toggle} = true`);
                  }

                  if (currentSnap !== 'closing' && saveWidth) {
                      localStorage.setItem(`resizable-${saveWidth}`,
                          `${displayWidth}|${constraints.min.unit}`);
                  }

                  // Dispatch resize event
                  el.dispatchEvent(new CustomEvent('resize', {
                      detail: {
                          width: convertFromPixels(newWidth, constraints.min.unit),
                          height: newHeight,
                          unit: constraints.min.unit,
                          snap: currentSnap,
                          closing: currentSnap === 'closing'
                      }
                  }));
              };

              // Create an overlay element (do this once when directive initializes)
              const overlay = document.createElement('div');
              overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                z-index: 9999;
                display: none;
                cursor: ew-resize;
            `;
              document.body.appendChild(overlay);

              const startResize = (e) => {
                  if (e.button !== 0) return;
                  e.preventDefault();
                  e.stopPropagation();

                  document.body.style.userSelect = 'none';
                  document.body.style.webkitUserSelect = 'none';

                  // Show the overlay
                  overlay.style.display = 'block';

                  startX = e.pageX;
                  startY = e.pageY;
                  startWidth = el.getBoundingClientRect().width;
                  startHeight = el.getBoundingClientRect().height;

                  document.addEventListener('mousemove', resize, { passive: false });
                  document.addEventListener('mouseup', stopResize);
              };

              const stopResize = (e) => {
                  if (e) {
                      e.preventDefault();
                      e.stopPropagation();
                  }

                  document.body.style.userSelect = '';
                  document.body.style.webkitUserSelect = '';

                  // Hide the overlay
                  overlay.style.display = 'none';

                  document.removeEventListener('mousemove', resize);
                  document.removeEventListener('mouseup', stopResize);

                  if (toggle) {
                      evaluate(`${toggle} = ${!el.classList.contains('resizable-closed')}`);
                  }

                  currentSnap = null;
              };

              handle.addEventListener('mousedown', startResize);
              el.appendChild(handle);
          });

          // Ensure proper positioning context
          if (getComputedStyle(el).position === 'static') {
              el.style.position = 'relative';
          }
      });
  }

  // Handle both DOMContentLoaded and alpine:init
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
          if (window.Alpine) initializeResizablePlugin();
      });
  }

  document.addEventListener('alpine:init', initializeResizablePlugin);

  /*! Indux Router 1.0.0 - MIT License */




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
          const normalizedPath = path.replace(/^\/+|\/+$/g, '') || '/';

          // Handle wildcards
          if (condition.includes('*')) {
              if (condition === '*') return true;
              const wildcardPattern = condition.replace('*', '');
              const normalizedPattern = wildcardPattern.replace(/^\/+|\/+$/g, '');
              return normalizedPath.startsWith(normalizedPattern + '/');
          }

          // Handle exact paths (starting with /)
          if (condition.startsWith('/')) {
              if (condition === '/') {
                  return normalizedPath === '/' || normalizedPath === '';
              }
              const routePath = condition.replace(/^\//, '');
              return normalizedPath === routePath || normalizedPath.startsWith(routePath + '/');
          }

          // Handle substring matching (default behavior)
          return normalizedPath.includes(condition);
      }
  };



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


  // Current route state
  let currentRoute = '/';
  let isInternalNavigation = false;

  // Handle route changes
  async function handleRouteChange() {
      const newRoute = window.location.pathname;
      if (newRoute === currentRoute) return;

      currentRoute = newRoute;

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
          if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

          // Check if it's a relative link
          try {
              const url = new URL(href, window.location.origin);
              if (url.origin !== window.location.origin) return; // External link
          } catch (e) {
              // Invalid URL, treat as relative
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


  // Process visibility for all elements with x-route
  function processRouteVisibility(normalizedPath) {

      const routeElements = document.querySelectorAll('[x-route]');

      routeElements.forEach(element => {
          const routeCondition = element.getAttribute('x-route');
          if (!routeCondition) return;

          // Parse route conditions
          const conditions = routeCondition.split(',').map(cond => cond.trim());
          const positiveConditions = conditions.filter(cond => !cond.startsWith('!'));
          const negativeConditions = conditions
              .filter(cond => cond.startsWith('!'))
              .map(cond => cond.slice(1));

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
          } else {
              element.setAttribute('hidden', '');
          }
      });
  }

  // Initialize visibility management
  function initializeVisibility() {
      // Process initial visibility
      const currentPath = window.location.pathname;
      const normalizedPath = currentPath === '/' ? '/' : currentPath.replace(/^\/|\/$/g, '');
      processRouteVisibility(normalizedPath);

      // Listen for route changes
      window.addEventListener('indux:route-change', (event) => {
          processRouteVisibility(event.detail.normalizedPath);
      });
  }

  // Run immediately if DOM is ready, otherwise wait
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeVisibility);
  } else {
      initializeVisibility();
  }

  // Export visibility interface
  window.InduxRoutingVisibility = {
      initialize: initializeVisibility,
      processRouteVisibility
  }; 


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

  /*! Indux Themes 1.0.0 - MIT License */

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

  /*! Indux Toasts 1.0.0 - MIT License */

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
          toast.setAttribute('class', type ? `toast-${type}` : 'toast');

          // Create content with optional icon
          const contentHtml = `
            ${icon ? '<span class="toast-icon"></span>' : ''}
            <div class="toast-content">${message}</div>
            ${dismissible || fixed ? '<button class="toast-dismiss-button" aria-label="Dismiss">&times;</button>' : ''}
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
              type: modifiers.includes('success') ? 'success' :
                  modifiers.includes('error') ? 'error' : '',
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
              // Check if expression contains any dynamic parts (+, `, or ${)
              if (expression.includes('+') || expression.includes('`') || expression.includes('${')) {
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

          // Add methods to the toast function
          toast.success = (message, options = {}) => {
              showToast(message, { ...options, type: 'success' });
          };

          toast.error = (message, options = {}) => {
              showToast(message, { ...options, type: 'error' });
          };

          // Add dismiss variants
          toast.dismiss = (message, options = {}) => {
              showToast(message, { ...options, type: '', dismissible: true });
          };

          toast.success.dismiss = (message, options = {}) => {
              showToast(message, { ...options, type: 'success', dismissible: true });
          };

          toast.error.dismiss = (message, options = {}) => {
              showToast(message, { ...options, type: 'error', dismissible: true });
          };

          // Add fixed variants
          toast.fixed = (message, options = {}) => {
              showToast(message, { ...options, type: '', fixed: true });
          };

          toast.success.fixed = (message, options = {}) => {
              showToast(message, { ...options, type: 'success', fixed: true });
          };

          toast.error.fixed = (message, options = {}) => {
              showToast(message, { ...options, type: 'error', fixed: true });
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

  /*! Indux Tooltips 1.0.0 - MIT License */

  const TOOLTIP_HOVER_DELAY = 500; // 500ms delay for hover tooltips

  function initializeTooltipPlugin() {

      Alpine.directive('tooltip', (el, { modifiers, expression }, { effect, evaluateLater }) => {

          let getTooltipContent;

          // If it starts with $x, handle content loading
          if (expression.startsWith('$x.')) {
              const path = expression.substring(3); // Remove '$x.'
              const [contentType, ...pathParts] = path.split('.');

              // Create evaluator that uses the content manager's path parsing
              getTooltipContent = evaluateLater(`
                (() => {
                    const store = $store.app;
                    if (!store.x['${contentType}']) return '';
                    
                    let current = store.x['${contentType}'];
                    ${pathParts.map(part => `
                        if (!current['${part}']) return '';
                        current = current['${part}'];
                    `).join('')}
                    return current || '';
                })()
            `);

              // Ensure content is loaded before showing tooltip
              effect(() => {
                  const store = Alpine.store('app');
                  if (!store.x[contentType]) {
                      store.contentManager.loadContentFile(store, contentType)
                          .then(content => {
                              if (content) {
                                  store.x[contentType] = content;
                                  Alpine.store('x', { ...store.x });
                              }
                          });
                  }
              });
          } else {
              // Check if expression contains any dynamic parts (+, `, or ${)
              if (expression.includes('+') || expression.includes('`') || expression.includes('${')) {
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

              // Store the original popovertarget if it exists
              const originalTarget = el.getAttribute('popovertarget');

              // Create the tooltip element
              const tooltip = document.createElement('div');
              tooltip.setAttribute('popover', '');
              tooltip.setAttribute('id', tooltipId);
              tooltip.setAttribute('class', 'tooltip');

              // Store the original anchor name if it exists
              const originalAnchorName = el.style.getPropertyValue('anchor-name');
              const tooltipAnchor = `--tooltip-${tooltipCode}`;

              // Set tooltip content
              getTooltipContent(content => {
                  tooltip.innerHTML = content || '';
              });

              // Handle positioning modifiers
              const positions = modifiers.filter(mod => ['top', 'bottom', 'left', 'right'].includes(mod));
              if (positions.length > 0) {
                  tooltip.style.setProperty('position-area', positions.join(' '));
              }

              // Add the tooltip to the document
              document.body.appendChild(tooltip);

              // State variables for managing tooltip behavior
              let showTimeout;
              let isMouseDown = false;

              el.addEventListener('mouseenter', () => {
                  if (!isMouseDown) {
                      showTimeout = setTimeout(() => {
                          if (!isMouseDown && !tooltip.matches(':popover-open')) {
                              // Store original anchor name and set tooltip anchor
                              if (originalAnchorName) {
                                  el._originalAnchorName = originalAnchorName;
                              }
                              el.style.setProperty('anchor-name', tooltipAnchor);
                              tooltip.style.setProperty('position-anchor', tooltipAnchor);

                              el.setAttribute('popovertarget', tooltipId);
                              tooltip.showPopover();
                          }
                      }, TOOLTIP_HOVER_DELAY);
                  }
              });

              el.addEventListener('mouseleave', () => {
                  clearTimeout(showTimeout);
                  if (tooltip.matches(':popover-open')) {
                      tooltip.hidePopover();
                      // Restore original anchor name and target
                      if (el._originalAnchorName) {
                          el.style.setProperty('anchor-name', el._originalAnchorName);
                      }
                      if (originalTarget) {
                          el.setAttribute('popovertarget', originalTarget);
                      }
                  }
              });

              el.addEventListener('mousedown', () => {
                  isMouseDown = true;
                  clearTimeout(showTimeout);
                  if (tooltip.matches(':popover-open')) {
                      tooltip.hidePopover();
                  }
                  // Restore original anchor name and target
                  if (el._originalAnchorName) {
                      el.style.setProperty('anchor-name', el._originalAnchorName);
                  }
                  if (originalTarget) {
                      el.setAttribute('popovertarget', originalTarget);
                  }
              });

              el.addEventListener('mouseup', () => {
                  isMouseDown = false;
              });

              // Cleanup click handling
              el.addEventListener('click', (e) => {
                  clearTimeout(showTimeout);
                  if (tooltip.matches(':popover-open')) {
                      tooltip.hidePopover();
                  }
                  // Ensure original anchor name and target are restored
                  if (el._originalAnchorName) {
                      el.style.setProperty('anchor-name', el._originalAnchorName);
                  }
                  if (originalTarget) {
                      el.setAttribute('popovertarget', originalTarget);
                  }
              });
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

  /*! Indux URL Queries 1.0.0 - MIT License */

  function initializeUrlQueriesPlugin() {
      // Initialize empty queries store
      Alpine.store('queries', {
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
          Alpine.store('queries', {
              current: currentParams,
              _initialized: true
          });

          // Dispatch event
          document.dispatchEvent(new CustomEvent('query-updated', {
              detail: { updates, action }
          }));

          return currentParams;
      }

      // Add $query magic method
      Alpine.magic('query', () => {
          const store = Alpine.store('queries');

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
                          if (key === 'value') return value;
                          if (key === 'set') return (newValue) => {
                              console.debug(`[Indux] Setting ${prop} to:`, newValue);
                              clearTimeout(updateTimeouts.get(prop));
                              const timeout = setTimeout(() => {
                                  updateURL({ [prop]: newValue }, 'set');
                              }, DEBOUNCE_DELAY);
                              updateTimeouts.set(prop, timeout);
                          };
                          if (key === 'add') return (newValue) => {
                              console.debug(`[Indux] Adding to ${prop}:`, newValue);
                              clearTimeout(updateTimeouts.get(prop));
                              const timeout = setTimeout(() => {
                                  updateURL({ [prop]: newValue }, 'add');
                              }, DEBOUNCE_DELAY);
                              updateTimeouts.set(prop, timeout);
                          };
                          if (key === 'remove') return (value) => {
                              console.debug(`[Indux] Removing from ${prop}:`, value);
                              clearTimeout(updateTimeouts.get(prop));
                              const timeout = setTimeout(() => {
                                  updateURL({ [prop]: value }, 'remove');
                              }, DEBOUNCE_DELAY);
                              updateTimeouts.set(prop, timeout);
                          };
                          if (key === 'clear') return () => {
                              console.debug(`[Indux] Clearing ${prop}`);
                              clearTimeout(updateTimeouts.get(prop));
                              const timeout = setTimeout(() => {
                                  updateURL({ [prop]: null }, 'set');
                              }, DEBOUNCE_DELAY);
                              updateTimeouts.set(prop, timeout);
                          };
                          return undefined;
                      }
                  });
              }
          });
      });

      // Initialize with current URL parameters
      const initialParams = parseQueryString(window.location.search);
      Alpine.store('queries', {
          current: initialParams,
          _initialized: true
      });

      // Listen for popstate events
      window.addEventListener('popstate', () => {
          const params = parseQueryString(window.location.search);
          console.debug('[Indux] Popstate params:', params);
          Alpine.store('queries', {
              current: params,
              _initialized: true
          });
      });
  }

  // Handle both DOMContentLoaded and alpine:init
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
          if (window.Alpine) initializeUrlQueriesPlugin();
      });
  }

  document.addEventListener('alpine:init', initializeUrlQueriesPlugin);

  var temp_plugin = {};

  var hasRequiredTemp_plugin;

  function requireTemp_plugin () {
  	if (hasRequiredTemp_plugin) return temp_plugin;
  	hasRequiredTemp_plugin = 1;
  	/*! Indux Markdown 1.0.0 - MIT License */
  	const marked = self.marked;

  	// Initialize plugin when either DOM is ready or Alpine is ready
  	function initializeMarkdownPlugin() {
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

  	    // Register markdown directive
  	    Alpine.directive('markdown', (el, { expression, modifiers }, { effect, evaluateLater }) => {
  	        // Store original markdown content
  	        let markdownSource = '';
  	        let isUpdating = false;

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

  	                const html = marked.parse(markdownSource);

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
  	        const getMarkdownContent = evaluateLater(expression);

  	        effect(() => {
  	            getMarkdownContent(async (pathOrContent) => {
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
  	                        const response = await fetch(pathOrContent);
  	                        if (response.ok) {
  	                            markdownContent = await response.text();
  	                        } else {
  	                            console.warn(`[Indux] Failed to fetch markdown file: ${pathOrContent}`);
  	                            markdownContent = `# Error Loading Content\n\nCould not load: ${pathOrContent}`;
  	                        }
  	                    } catch (error) {
  	                        console.error(`[Indux] Error fetching markdown file: ${pathOrContent}`, error);
  	                        markdownContent = `# Error Loading Content\n\nCould not load: ${pathOrContent}\n\nError: ${error.message}`;
  	                    }
  	                }

  	                const html = marked.parse(markdownContent);
  	                el.innerHTML = html;

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
  	}

  	// Handle both DOMContentLoaded and alpine:init
  	if (document.readyState === 'loading') {
  	    document.addEventListener('DOMContentLoaded', () => {
  	        if (window.Alpine) initializeMarkdownPlugin();
  	    });
  	}

  	document.addEventListener('alpine:init', initializeMarkdownPlugin);
  	return temp_plugin;
  }

  requireTemp_plugin();

  (() => {
      var nt = !1, it = !1, W = [], ot = -1; function Ut(e) { Rn(e); } function Rn(e) { W.includes(e) || W.push(e), Mn(); } function Wt(e) { let t = W.indexOf(e); t !== -1 && t > ot && W.splice(t, 1); } function Mn() { !it && !nt && (nt = !0, queueMicrotask(Nn)); } function Nn() { nt = !1, it = !0; for (let e = 0; e < W.length; e++)W[e](), ot = e; W.length = 0, ot = -1, it = !1; } var T, N, $, at, st = !0; function Gt(e) { st = !1, e(), st = !0; } function Jt(e) { T = e.reactive, $ = e.release, N = t => e.effect(t, { scheduler: r => { st ? Ut(r) : r(); } }), at = e.raw; } function ct(e) { N = e; } function Yt(e) { let t = () => { }; return [n => { let i = N(n); return e._x_effects || (e._x_effects = new Set, e._x_runEffects = () => { e._x_effects.forEach(o => o()); }), e._x_effects.add(i), t = () => { i !== void 0 && (e._x_effects.delete(i), $(i)); }, i }, () => { t(); }] } function ve(e, t) { let r = !0, n, i = N(() => { let o = e(); JSON.stringify(o), r ? n = o : queueMicrotask(() => { t(o, n), n = o; }), r = !1; }); return () => $(i) } var Xt = [], Zt = [], Qt = []; function er(e) { Qt.push(e); } function te(e, t) { typeof t == "function" ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t)) : (t = e, Zt.push(t)); } function Ae(e) { Xt.push(e); } function Oe(e, t, r) { e._x_attributeCleanups || (e._x_attributeCleanups = {}), e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []), e._x_attributeCleanups[t].push(r); } function lt(e, t) { e._x_attributeCleanups && Object.entries(e._x_attributeCleanups).forEach(([r, n]) => { (t === void 0 || t.includes(r)) && (n.forEach(i => i()), delete e._x_attributeCleanups[r]); }); } function tr(e) { for (e._x_effects?.forEach(Wt); e._x_cleanups?.length;)e._x_cleanups.pop()(); } var ut = new MutationObserver(mt), ft = !1; function ue() { ut.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }), ft = !0; } function dt() { kn(), ut.disconnect(), ft = !1; } var le = []; function kn() { let e = ut.takeRecords(); le.push(() => e.length > 0 && mt(e)); let t = le.length; queueMicrotask(() => { if (le.length === t) for (; le.length > 0;)le.shift()(); }); } function m(e) { if (!ft) return e(); dt(); let t = e(); return ue(), t } var pt = !1, Se = []; function rr() { pt = !0; } function nr() { pt = !1, mt(Se), Se = []; } function mt(e) { if (pt) { Se = Se.concat(e); return } let t = [], r = new Set, n = new Map, i = new Map; for (let o = 0; o < e.length; o++)if (!e[o].target._x_ignoreMutationObserver && (e[o].type === "childList" && (e[o].removedNodes.forEach(s => { s.nodeType === 1 && s._x_marker && r.add(s); }), e[o].addedNodes.forEach(s => { if (s.nodeType === 1) { if (r.has(s)) { r.delete(s); return } s._x_marker || t.push(s); } })), e[o].type === "attributes")) { let s = e[o].target, a = e[o].attributeName, c = e[o].oldValue, l = () => { n.has(s) || n.set(s, []), n.get(s).push({ name: a, value: s.getAttribute(a) }); }, u = () => { i.has(s) || i.set(s, []), i.get(s).push(a); }; s.hasAttribute(a) && c === null ? l() : s.hasAttribute(a) ? (u(), l()) : u(); } i.forEach((o, s) => { lt(s, o); }), n.forEach((o, s) => { Xt.forEach(a => a(s, o)); }); for (let o of r) t.some(s => s.contains(o)) || Zt.forEach(s => s(o)); for (let o of t) o.isConnected && Qt.forEach(s => s(o)); t = null, r = null, n = null, i = null; } function Ce(e) { return z(B(e)) } function k(e, t, r) { return e._x_dataStack = [t, ...B(r || e)], () => { e._x_dataStack = e._x_dataStack.filter(n => n !== t); } } function B(e) { return e._x_dataStack ? e._x_dataStack : typeof ShadowRoot == "function" && e instanceof ShadowRoot ? B(e.host) : e.parentNode ? B(e.parentNode) : [] } function z(e) { return new Proxy({ objects: e }, Dn) } var Dn = { ownKeys({ objects: e }) { return Array.from(new Set(e.flatMap(t => Object.keys(t)))) }, has({ objects: e }, t) { return t == Symbol.unscopables ? !1 : e.some(r => Object.prototype.hasOwnProperty.call(r, t) || Reflect.has(r, t)) }, get({ objects: e }, t, r) { return t == "toJSON" ? Pn : Reflect.get(e.find(n => Reflect.has(n, t)) || {}, t, r) }, set({ objects: e }, t, r, n) { let i = e.find(s => Object.prototype.hasOwnProperty.call(s, t)) || e[e.length - 1], o = Object.getOwnPropertyDescriptor(i, t); return o?.set && o?.get ? o.set.call(n, r) || !0 : Reflect.set(i, t, r) } }; function Pn() { return Reflect.ownKeys(this).reduce((t, r) => (t[r] = Reflect.get(this, r), t), {}) } function Te(e) { let t = n => typeof n == "object" && !Array.isArray(n) && n !== null, r = (n, i = "") => { Object.entries(Object.getOwnPropertyDescriptors(n)).forEach(([o, { value: s, enumerable: a }]) => { if (a === !1 || s === void 0 || typeof s == "object" && s !== null && s.__v_skip) return; let c = i === "" ? o : `${i}.${o}`; typeof s == "object" && s !== null && s._x_interceptor ? n[o] = s.initialize(e, c, o) : t(s) && s !== n && !(s instanceof Element) && r(s, c); }); }; return r(e) } function Re(e, t = () => { }) { let r = { initialValue: void 0, _x_interceptor: !0, initialize(n, i, o) { return e(this.initialValue, () => In(n, i), s => ht(n, i, s), i, o) } }; return t(r), n => { if (typeof n == "object" && n !== null && n._x_interceptor) { let i = r.initialize.bind(r); r.initialize = (o, s, a) => { let c = n.initialize(o, s, a); return r.initialValue = c, i(o, s, a) }; } else r.initialValue = n; return r } } function In(e, t) { return t.split(".").reduce((r, n) => r[n], e) } function ht(e, t, r) { if (typeof t == "string" && (t = t.split(".")), t.length === 1) e[t[0]] = r; else { if (t.length === 0) throw error; return e[t[0]] || (e[t[0]] = {}), ht(e[t[0]], t.slice(1), r) } } var ir = {}; function y(e, t) { ir[e] = t; } function fe(e, t) { let r = Ln(t); return Object.entries(ir).forEach(([n, i]) => { Object.defineProperty(e, `$${n}`, { get() { return i(t, r) }, enumerable: !1 }); }), e } function Ln(e) { let [t, r] = _t(e), n = { interceptor: Re, ...t }; return te(e, r), n } function or(e, t, r, ...n) { try { return r(...n) } catch (i) { re(i, e, t); } } function re(e, t, r = void 0) {
          e = Object.assign(e ?? { message: "No error message given." }, { el: t, expression: r }), console.warn(`Alpine Expression Error: ${e.message}

${r ? 'Expression: "' + r + `"

`: ""}`, t), setTimeout(() => { throw e }, 0);
      } var Me = !0; function ke(e) { let t = Me; Me = !1; let r = e(); return Me = t, r } function R(e, t, r = {}) { let n; return x(e, t)(i => n = i, r), n } function x(...e) { return sr(...e) } var sr = xt; function ar(e) { sr = e; } function xt(e, t) { let r = {}; fe(r, e); let n = [r, ...B(e)], i = typeof t == "function" ? $n(n, t) : Fn(n, t, e); return or.bind(null, e, t, i) } function $n(e, t) { return (r = () => { }, { scope: n = {}, params: i = [] } = {}) => { let o = t.apply(z([n, ...e]), i); Ne(r, o); } } var gt = {}; function jn(e, t) { if (gt[e]) return gt[e]; let r = Object.getPrototypeOf(async function () { }).constructor, n = /^[\n\s]*if.*\(.*\)/.test(e.trim()) || /^(let|const)\s/.test(e.trim()) ? `(async()=>{ ${e} })()` : e, o = (() => { try { let s = new r(["__self", "scope"], `with (scope) { __self.result = ${n} }; __self.finished = true; return __self.result;`); return Object.defineProperty(s, "name", { value: `[Alpine] ${e}` }), s } catch (s) { return re(s, t, e), Promise.resolve() } })(); return gt[e] = o, o } function Fn(e, t, r) { let n = jn(t, r); return (i = () => { }, { scope: o = {}, params: s = [] } = {}) => { n.result = void 0, n.finished = !1; let a = z([o, ...e]); if (typeof n == "function") { let c = n(n, a).catch(l => re(l, r, t)); n.finished ? (Ne(i, n.result, a, s, r), n.result = void 0) : c.then(l => { Ne(i, l, a, s, r); }).catch(l => re(l, r, t)).finally(() => n.result = void 0); } } } function Ne(e, t, r, n, i) { if (Me && typeof t == "function") { let o = t.apply(r, n); o instanceof Promise ? o.then(s => Ne(e, s, r, n)).catch(s => re(s, i, t)) : e(o); } else typeof t == "object" && t instanceof Promise ? t.then(o => e(o)) : e(t); } var wt = "x-"; function C(e = "") { return wt + e } function cr(e) { wt = e; } var De = {}; function d(e, t) { return De[e] = t, { before(r) { if (!De[r]) { console.warn(String.raw`Cannot find directive \`${r}\`. \`${e}\` will use the default order of execution`); return } let n = G.indexOf(r); G.splice(n >= 0 ? n : G.indexOf("DEFAULT"), 0, e); } } } function lr(e) { return Object.keys(De).includes(e) } function pe(e, t, r) { if (t = Array.from(t), e._x_virtualDirectives) { let o = Object.entries(e._x_virtualDirectives).map(([a, c]) => ({ name: a, value: c })), s = Et(o); o = o.map(a => s.find(c => c.name === a.name) ? { name: `x-bind:${a.name}`, value: `"${a.value}"` } : a), t = t.concat(o); } let n = {}; return t.map(dr((o, s) => n[o] = s)).filter(mr).map(zn(n, r)).sort(Kn).map(o => Bn(e, o)) } function Et(e) { return Array.from(e).map(dr()).filter(t => !mr(t)) } var yt = !1, de = new Map, ur = Symbol(); function fr(e) { yt = !0; let t = Symbol(); ur = t, de.set(t, []); let r = () => { for (; de.get(t).length;)de.get(t).shift()(); de.delete(t); }, n = () => { yt = !1, r(); }; e(r), n(); } function _t(e) { let t = [], r = a => t.push(a), [n, i] = Yt(e); return t.push(i), [{ Alpine: K, effect: n, cleanup: r, evaluateLater: x.bind(x, e), evaluate: R.bind(R, e) }, () => t.forEach(a => a())] } function Bn(e, t) { let r = () => { }, n = De[t.type] || r, [i, o] = _t(e); Oe(e, t.original, o); let s = () => { e._x_ignore || e._x_ignoreSelf || (n.inline && n.inline(e, t, i), n = n.bind(n, e, t, i), yt ? de.get(ur).push(n) : n()); }; return s.runCleanups = o, s } var Pe = (e, t) => ({ name: r, value: n }) => (r.startsWith(e) && (r = r.replace(e, t)), { name: r, value: n }), Ie = e => e; function dr(e = () => { }) { return ({ name: t, value: r }) => { let { name: n, value: i } = pr.reduce((o, s) => s(o), { name: t, value: r }); return n !== t && e(n, t), { name: n, value: i } } } var pr = []; function ne(e) { pr.push(e); } function mr({ name: e }) { return hr().test(e) } var hr = () => new RegExp(`^${wt}([^:^.]+)\\b`); function zn(e, t) { return ({ name: r, value: n }) => { let i = r.match(hr()), o = r.match(/:([a-zA-Z0-9\-_:]+)/), s = r.match(/\.[^.\]]+(?=[^\]]*$)/g) || [], a = t || e[r] || r; return { type: i ? i[1] : null, value: o ? o[1] : null, modifiers: s.map(c => c.replace(".", "")), expression: n, original: a } } } var bt = "DEFAULT", G = ["ignore", "ref", "data", "id", "anchor", "bind", "init", "for", "model", "modelable", "transition", "show", "if", bt, "teleport"]; function Kn(e, t) { let r = G.indexOf(e.type) === -1 ? bt : e.type, n = G.indexOf(t.type) === -1 ? bt : t.type; return G.indexOf(r) - G.indexOf(n) } function J(e, t, r = {}) { e.dispatchEvent(new CustomEvent(t, { detail: r, bubbles: !0, composed: !0, cancelable: !0 })); } function D(e, t) { if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) { Array.from(e.children).forEach(i => D(i, t)); return } let r = !1; if (t(e, () => r = !0), r) return; let n = e.firstElementChild; for (; n;)D(n, t), n = n.nextElementSibling; } function E(e, ...t) { console.warn(`Alpine Warning: ${e}`, ...t); } var _r = !1; function gr() { _r && E("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."), _r = !0, document.body || E("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), J(document, "alpine:init"), J(document, "alpine:initializing"), ue(), er(t => S(t, D)), te(t => P(t)), Ae((t, r) => { pe(t, r).forEach(n => n()); }); let e = t => !Y(t.parentElement, !0); Array.from(document.querySelectorAll(br().join(","))).filter(e).forEach(t => { S(t); }), J(document, "alpine:initialized"), setTimeout(() => { Vn(); }); } var vt = [], xr = []; function yr() { return vt.map(e => e()) } function br() { return vt.concat(xr).map(e => e()) } function Le(e) { vt.push(e); } function $e(e) { xr.push(e); } function Y(e, t = !1) { return j(e, r => { if ((t ? br() : yr()).some(i => r.matches(i))) return !0 }) } function j(e, t) { if (e) { if (t(e)) return e; if (e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement) return j(e.parentElement, t) } } function wr(e) { return yr().some(t => e.matches(t)) } var Er = []; function vr(e) { Er.push(e); } var Hn = 1; function S(e, t = D, r = () => { }) { j(e, n => n._x_ignore) || fr(() => { t(e, (n, i) => { n._x_marker || (r(n, i), Er.forEach(o => o(n, i)), pe(n, n.attributes).forEach(o => o()), n._x_ignore || (n._x_marker = Hn++), n._x_ignore && i()); }); }); } function P(e, t = D) { t(e, r => { tr(r), lt(r), delete r._x_marker; }); } function Vn() { [["ui", "dialog", ["[x-dialog], [x-popover]"]], ["anchor", "anchor", ["[x-anchor]"]], ["sort", "sort", ["[x-sort]"]]].forEach(([t, r, n]) => { lr(r) || n.some(i => { if (document.querySelector(i)) return E(`found "${i}", but missing ${t} plugin`), !0 }); }); } var St = [], At = !1; function ie(e = () => { }) { return queueMicrotask(() => { At || setTimeout(() => { je(); }); }), new Promise(t => { St.push(() => { e(), t(); }); }) } function je() { for (At = !1; St.length;)St.shift()(); } function Sr() { At = !0; } function me(e, t) { return Array.isArray(t) ? Ar(e, t.join(" ")) : typeof t == "object" && t !== null ? qn(e, t) : typeof t == "function" ? me(e, t()) : Ar(e, t) } function Ar(e, t) { let n = o => o.split(" ").filter(s => !e.classList.contains(s)).filter(Boolean), i = o => (e.classList.add(...o), () => { e.classList.remove(...o); }); return t = t === !0 ? t = "" : t || "", i(n(t)) } function qn(e, t) { let r = a => a.split(" ").filter(Boolean), n = Object.entries(t).flatMap(([a, c]) => c ? r(a) : !1).filter(Boolean), i = Object.entries(t).flatMap(([a, c]) => c ? !1 : r(a)).filter(Boolean), o = [], s = []; return i.forEach(a => { e.classList.contains(a) && (e.classList.remove(a), s.push(a)); }), n.forEach(a => { e.classList.contains(a) || (e.classList.add(a), o.push(a)); }), () => { s.forEach(a => e.classList.add(a)), o.forEach(a => e.classList.remove(a)); } } function X(e, t) { return typeof t == "object" && t !== null ? Un(e, t) : Wn(e, t) } function Un(e, t) { let r = {}; return Object.entries(t).forEach(([n, i]) => { r[n] = e.style[n], n.startsWith("--") || (n = Gn(n)), e.style.setProperty(n, i); }), setTimeout(() => { e.style.length === 0 && e.removeAttribute("style"); }), () => { X(e, r); } } function Wn(e, t) { let r = e.getAttribute("style", t); return e.setAttribute("style", t), () => { e.setAttribute("style", r || ""); } } function Gn(e) { return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase() } function he(e, t = () => { }) { let r = !1; return function () { r ? t.apply(this, arguments) : (r = !0, e.apply(this, arguments)); } } d("transition", (e, { value: t, modifiers: r, expression: n }, { evaluate: i }) => { typeof n == "function" && (n = i(n)), n !== !1 && (!n || typeof n == "boolean" ? Yn(e, r, t) : Jn(e, n, t)); }); function Jn(e, t, r) { Or(e, me, ""), { enter: i => { e._x_transition.enter.during = i; }, "enter-start": i => { e._x_transition.enter.start = i; }, "enter-end": i => { e._x_transition.enter.end = i; }, leave: i => { e._x_transition.leave.during = i; }, "leave-start": i => { e._x_transition.leave.start = i; }, "leave-end": i => { e._x_transition.leave.end = i; } }[r](t); } function Yn(e, t, r) { Or(e, X); let n = !t.includes("in") && !t.includes("out") && !r, i = n || t.includes("in") || ["enter"].includes(r), o = n || t.includes("out") || ["leave"].includes(r); t.includes("in") && !n && (t = t.filter((g, b) => b < t.indexOf("out"))), t.includes("out") && !n && (t = t.filter((g, b) => b > t.indexOf("out"))); let s = !t.includes("opacity") && !t.includes("scale"), a = s || t.includes("opacity"), c = s || t.includes("scale"), l = a ? 0 : 1, u = c ? _e(t, "scale", 95) / 100 : 1, p = _e(t, "delay", 0) / 1e3, h = _e(t, "origin", "center"), w = "opacity, transform", F = _e(t, "duration", 150) / 1e3, Ee = _e(t, "duration", 75) / 1e3, f = "cubic-bezier(0.4, 0.0, 0.2, 1)"; i && (e._x_transition.enter.during = { transformOrigin: h, transitionDelay: `${p}s`, transitionProperty: w, transitionDuration: `${F}s`, transitionTimingFunction: f }, e._x_transition.enter.start = { opacity: l, transform: `scale(${u})` }, e._x_transition.enter.end = { opacity: 1, transform: "scale(1)" }), o && (e._x_transition.leave.during = { transformOrigin: h, transitionDelay: `${p}s`, transitionProperty: w, transitionDuration: `${Ee}s`, transitionTimingFunction: f }, e._x_transition.leave.start = { opacity: 1, transform: "scale(1)" }, e._x_transition.leave.end = { opacity: l, transform: `scale(${u})` }); } function Or(e, t, r = {}) { e._x_transition || (e._x_transition = { enter: { during: r, start: r, end: r }, leave: { during: r, start: r, end: r }, in(n = () => { }, i = () => { }) { Fe(e, t, { during: this.enter.during, start: this.enter.start, end: this.enter.end }, n, i); }, out(n = () => { }, i = () => { }) { Fe(e, t, { during: this.leave.during, start: this.leave.start, end: this.leave.end }, n, i); } }); } window.Element.prototype._x_toggleAndCascadeWithTransitions = function (e, t, r, n) { let i = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout, o = () => i(r); if (t) { e._x_transition && (e._x_transition.enter || e._x_transition.leave) ? e._x_transition.enter && (Object.entries(e._x_transition.enter.during).length || Object.entries(e._x_transition.enter.start).length || Object.entries(e._x_transition.enter.end).length) ? e._x_transition.in(r) : o() : e._x_transition ? e._x_transition.in(r) : o(); return } e._x_hidePromise = e._x_transition ? new Promise((s, a) => { e._x_transition.out(() => { }, () => s(n)), e._x_transitioning && e._x_transitioning.beforeCancel(() => a({ isFromCancelledTransition: !0 })); }) : Promise.resolve(n), queueMicrotask(() => { let s = Cr(e); s ? (s._x_hideChildren || (s._x_hideChildren = []), s._x_hideChildren.push(e)) : i(() => { let a = c => { let l = Promise.all([c._x_hidePromise, ...(c._x_hideChildren || []).map(a)]).then(([u]) => u?.()); return delete c._x_hidePromise, delete c._x_hideChildren, l }; a(e).catch(c => { if (!c.isFromCancelledTransition) throw c }); }); }); }; function Cr(e) { let t = e.parentNode; if (t) return t._x_hidePromise ? t : Cr(t) } function Fe(e, t, { during: r, start: n, end: i } = {}, o = () => { }, s = () => { }) { if (e._x_transitioning && e._x_transitioning.cancel(), Object.keys(r).length === 0 && Object.keys(n).length === 0 && Object.keys(i).length === 0) { o(), s(); return } let a, c, l; Xn(e, { start() { a = t(e, n); }, during() { c = t(e, r); }, before: o, end() { a(), l = t(e, i); }, after: s, cleanup() { c(), l(); } }); } function Xn(e, t) { let r, n, i, o = he(() => { m(() => { r = !0, n || t.before(), i || (t.end(), je()), t.after(), e.isConnected && t.cleanup(), delete e._x_transitioning; }); }); e._x_transitioning = { beforeCancels: [], beforeCancel(s) { this.beforeCancels.push(s); }, cancel: he(function () { for (; this.beforeCancels.length;)this.beforeCancels.shift()(); o(); }), finish: o }, m(() => { t.start(), t.during(); }), Sr(), requestAnimationFrame(() => { if (r) return; let s = Number(getComputedStyle(e).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3, a = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3; s === 0 && (s = Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3), m(() => { t.before(); }), n = !0, requestAnimationFrame(() => { r || (m(() => { t.end(); }), je(), setTimeout(e._x_transitioning.finish, s + a), i = !0); }); }); } function _e(e, t, r) { if (e.indexOf(t) === -1) return r; let n = e[e.indexOf(t) + 1]; if (!n || t === "scale" && isNaN(n)) return r; if (t === "duration" || t === "delay") { let i = n.match(/([0-9]+)ms/); if (i) return i[1] } return t === "origin" && ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2]) ? [n, e[e.indexOf(t) + 2]].join(" ") : n } var I = !1; function A(e, t = () => { }) { return (...r) => I ? t(...r) : e(...r) } function Tr(e) { return (...t) => I && e(...t) } var Rr = []; function H(e) { Rr.push(e); } function Mr(e, t) { Rr.forEach(r => r(e, t)), I = !0, kr(() => { S(t, (r, n) => { n(r, () => { }); }); }), I = !1; } var Be = !1; function Nr(e, t) { t._x_dataStack || (t._x_dataStack = e._x_dataStack), I = !0, Be = !0, kr(() => { Zn(t); }), I = !1, Be = !1; } function Zn(e) { let t = !1; S(e, (n, i) => { D(n, (o, s) => { if (t && wr(o)) return s(); t = !0, i(o, s); }); }); } function kr(e) { let t = N; ct((r, n) => { let i = t(r); return $(i), () => { } }), e(), ct(t); } function ge(e, t, r, n = []) { switch (e._x_bindings || (e._x_bindings = T({})), e._x_bindings[t] = r, t = n.includes("camel") ? si(t) : t, t) { case "value": Qn(e, r); break; case "style": ti(e, r); break; case "class": ei(e, r); break; case "selected": case "checked": ri(e, t, r); break; default: Pr(e, t, r); break } } function Qn(e, t) { if (Ot(e)) e.attributes.value === void 0 && (e.value = t), window.fromModel && (typeof t == "boolean" ? e.checked = xe(e.value) === t : e.checked = Dr(e.value, t)); else if (ze(e)) Number.isInteger(t) ? e.value = t : !Array.isArray(t) && typeof t != "boolean" && ![null, void 0].includes(t) ? e.value = String(t) : Array.isArray(t) ? e.checked = t.some(r => Dr(r, e.value)) : e.checked = !!t; else if (e.tagName === "SELECT") oi(e, t); else { if (e.value === t) return; e.value = t === void 0 ? "" : t; } } function ei(e, t) { e._x_undoAddedClasses && e._x_undoAddedClasses(), e._x_undoAddedClasses = me(e, t); } function ti(e, t) { e._x_undoAddedStyles && e._x_undoAddedStyles(), e._x_undoAddedStyles = X(e, t); } function ri(e, t, r) { Pr(e, t, r), ii(e, t, r); } function Pr(e, t, r) { [null, void 0, !1].includes(r) && ci(t) ? e.removeAttribute(t) : (Ir(t) && (r = t), ni(e, t, r)); } function ni(e, t, r) { e.getAttribute(t) != r && e.setAttribute(t, r); } function ii(e, t, r) { e[t] !== r && (e[t] = r); } function oi(e, t) { let r = [].concat(t).map(n => n + ""); Array.from(e.options).forEach(n => { n.selected = r.includes(n.value); }); } function si(e) { return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase()) } function Dr(e, t) { return e == t } function xe(e) { return [1, "1", "true", "on", "yes", !0].includes(e) ? !0 : [0, "0", "false", "off", "no", !1].includes(e) ? !1 : e ? Boolean(e) : null } var ai = new Set(["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "defer", "disabled", "formnovalidate", "inert", "ismap", "itemscope", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "selected", "shadowrootclonable", "shadowrootdelegatesfocus", "shadowrootserializable"]); function Ir(e) { return ai.has(e) } function ci(e) { return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(e) } function Lr(e, t, r) { return e._x_bindings && e._x_bindings[t] !== void 0 ? e._x_bindings[t] : jr(e, t, r) } function $r(e, t, r, n = !0) { if (e._x_bindings && e._x_bindings[t] !== void 0) return e._x_bindings[t]; if (e._x_inlineBindings && e._x_inlineBindings[t] !== void 0) { let i = e._x_inlineBindings[t]; return i.extract = n, ke(() => R(e, i.expression)) } return jr(e, t, r) } function jr(e, t, r) { let n = e.getAttribute(t); return n === null ? typeof r == "function" ? r() : r : n === "" ? !0 : Ir(t) ? !![t, "true"].includes(n) : n } function ze(e) { return e.type === "checkbox" || e.localName === "ui-checkbox" || e.localName === "ui-switch" } function Ot(e) { return e.type === "radio" || e.localName === "ui-radio" } function Ke(e, t) { var r; return function () { var n = this, i = arguments, o = function () { r = null, e.apply(n, i); }; clearTimeout(r), r = setTimeout(o, t); } } function He(e, t) { let r; return function () { let n = this, i = arguments; r || (e.apply(n, i), r = !0, setTimeout(() => r = !1, t)); } } function Ve({ get: e, set: t }, { get: r, set: n }) { let i = !0, o, a = N(() => { let c = e(), l = r(); if (i) n(Ct(c)), i = !1; else { let u = JSON.stringify(c), p = JSON.stringify(l); u !== o ? n(Ct(c)) : u !== p && t(Ct(l)); } o = JSON.stringify(e()), JSON.stringify(r()); }); return () => { $(a); } } function Ct(e) { return typeof e == "object" ? JSON.parse(JSON.stringify(e)) : e } function Fr(e) { (Array.isArray(e) ? e : [e]).forEach(r => r(K)); } var Z = {}, Br = !1; function zr(e, t) { if (Br || (Z = T(Z), Br = !0), t === void 0) return Z[e]; Z[e] = t, Te(Z[e]), typeof t == "object" && t !== null && t.hasOwnProperty("init") && typeof t.init == "function" && Z[e].init(); } function Kr() { return Z } var Hr = {}; function Vr(e, t) { let r = typeof t != "function" ? () => t : t; return e instanceof Element ? Tt(e, r()) : (Hr[e] = r, () => { }) } function qr(e) { return Object.entries(Hr).forEach(([t, r]) => { Object.defineProperty(e, t, { get() { return (...n) => r(...n) } }); }), e } function Tt(e, t, r) { let n = []; for (; n.length;)n.pop()(); let i = Object.entries(t).map(([s, a]) => ({ name: s, value: a })), o = Et(i); return i = i.map(s => o.find(a => a.name === s.name) ? { name: `x-bind:${s.name}`, value: `"${s.value}"` } : s), pe(e, i, r).map(s => { n.push(s.runCleanups), s(); }), () => { for (; n.length;)n.pop()(); } } var Ur = {}; function Wr(e, t) { Ur[e] = t; } function Gr(e, t) { return Object.entries(Ur).forEach(([r, n]) => { Object.defineProperty(e, r, { get() { return (...i) => n.bind(t)(...i) }, enumerable: !1 }); }), e } var li = { get reactive() { return T }, get release() { return $ }, get effect() { return N }, get raw() { return at }, version: "3.14.9", flushAndStopDeferringMutations: nr, dontAutoEvaluateFunctions: ke, disableEffectScheduling: Gt, startObservingMutations: ue, stopObservingMutations: dt, setReactivityEngine: Jt, onAttributeRemoved: Oe, onAttributesAdded: Ae, closestDataStack: B, skipDuringClone: A, onlyDuringClone: Tr, addRootSelector: Le, addInitSelector: $e, interceptClone: H, addScopeToNode: k, deferMutations: rr, mapAttributes: ne, evaluateLater: x, interceptInit: vr, setEvaluator: ar, mergeProxies: z, extractProp: $r, findClosest: j, onElRemoved: te, closestRoot: Y, destroyTree: P, interceptor: Re, transition: Fe, setStyles: X, mutateDom: m, directive: d, entangle: Ve, throttle: He, debounce: Ke, evaluate: R, initTree: S, nextTick: ie, prefixed: C, prefix: cr, plugin: Fr, magic: y, store: zr, start: gr, clone: Nr, cloneNode: Mr, bound: Lr, $data: Ce, watch: ve, walk: D, data: Wr, bind: Vr }, K = li; function Rt(e, t) { let r = Object.create(null), n = e.split(","); for (let i = 0; i < n.length; i++)r[n[i]] = !0; return i => !!r[i] } var ui = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly"; Rt(ui + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected"); var Jr = Object.freeze({}); var fi = Object.prototype.hasOwnProperty, ye = (e, t) => fi.call(e, t), V = Array.isArray, oe = e => Yr(e) === "[object Map]"; var di = e => typeof e == "string", qe = e => typeof e == "symbol", be = e => e !== null && typeof e == "object"; var pi = Object.prototype.toString, Yr = e => pi.call(e), Mt = e => Yr(e).slice(8, -1); var Ue = e => di(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e; var We = e => { let t = Object.create(null); return r => t[r] || (t[r] = e(r)) }, Nt = We(e => e.charAt(0).toUpperCase() + e.slice(1)), kt = (e, t) => e !== t && (e === e || t === t); var Dt = new WeakMap, we = [], L, Q = Symbol("iterate"), Pt = Symbol("Map key iterate"); function _i(e) { return e && e._isEffect === !0 } function rn(e, t = Jr) { _i(e) && (e = e.raw); let r = xi(e, t); return t.lazy || r(), r } function nn(e) { e.active && (on(e), e.options.onStop && e.options.onStop(), e.active = !1); } var gi = 0; function xi(e, t) { let r = function () { if (!r.active) return e(); if (!we.includes(r)) { on(r); try { return bi(), we.push(r), L = r, e() } finally { we.pop(), sn(), L = we[we.length - 1]; } } }; return r.id = gi++, r.allowRecurse = !!t.allowRecurse, r._isEffect = !0, r.active = !0, r.raw = e, r.deps = [], r.options = t, r } function on(e) { let { deps: t } = e; if (t.length) { for (let r = 0; r < t.length; r++)t[r].delete(e); t.length = 0; } } var se = !0, Lt = []; function yi() { Lt.push(se), se = !1; } function bi() { Lt.push(se), se = !0; } function sn() { let e = Lt.pop(); se = e === void 0 ? !0 : e; } function M(e, t, r) { if (!se || L === void 0) return; let n = Dt.get(e); n || Dt.set(e, n = new Map); let i = n.get(r); i || n.set(r, i = new Set), i.has(L) || (i.add(L), L.deps.push(i), L.options.onTrack && L.options.onTrack({ effect: L, target: e, type: t, key: r })); } function U(e, t, r, n, i, o) { let s = Dt.get(e); if (!s) return; let a = new Set, c = u => { u && u.forEach(p => { (p !== L || p.allowRecurse) && a.add(p); }); }; if (t === "clear") s.forEach(c); else if (r === "length" && V(e)) s.forEach((u, p) => { (p === "length" || p >= n) && c(u); }); else switch (r !== void 0 && c(s.get(r)), t) { case "add": V(e) ? Ue(r) && c(s.get("length")) : (c(s.get(Q)), oe(e) && c(s.get(Pt))); break; case "delete": V(e) || (c(s.get(Q)), oe(e) && c(s.get(Pt))); break; case "set": oe(e) && c(s.get(Q)); break }let l = u => { u.options.onTrigger && u.options.onTrigger({ effect: u, target: e, key: r, type: t, newValue: n, oldValue: i, oldTarget: o }), u.options.scheduler ? u.options.scheduler(u) : u(); }; a.forEach(l); } var wi = Rt("__proto__,__v_isRef,__isVue"), an = new Set(Object.getOwnPropertyNames(Symbol).map(e => Symbol[e]).filter(qe)), Ei = cn(); var vi = cn(!0); var Xr = Si(); function Si() { let e = {}; return ["includes", "indexOf", "lastIndexOf"].forEach(t => { e[t] = function (...r) { let n = _(this); for (let o = 0, s = this.length; o < s; o++)M(n, "get", o + ""); let i = n[t](...r); return i === -1 || i === !1 ? n[t](...r.map(_)) : i }; }), ["push", "pop", "shift", "unshift", "splice"].forEach(t => { e[t] = function (...r) { yi(); let n = _(this)[t].apply(this, r); return sn(), n }; }), e } function cn(e = !1, t = !1) { return function (n, i, o) { if (i === "__v_isReactive") return !e; if (i === "__v_isReadonly") return e; if (i === "__v_raw" && o === (e ? t ? Bi : dn : t ? Fi : fn).get(n)) return n; let s = V(n); if (!e && s && ye(Xr, i)) return Reflect.get(Xr, i, o); let a = Reflect.get(n, i, o); return (qe(i) ? an.has(i) : wi(i)) || (e || M(n, "get", i), t) ? a : It(a) ? !s || !Ue(i) ? a.value : a : be(a) ? e ? pn(a) : et(a) : a } } var Ai = Oi(); function Oi(e = !1) { return function (r, n, i, o) { let s = r[n]; if (!e && (i = _(i), s = _(s), !V(r) && It(s) && !It(i))) return s.value = i, !0; let a = V(r) && Ue(n) ? Number(n) < r.length : ye(r, n), c = Reflect.set(r, n, i, o); return r === _(o) && (a ? kt(i, s) && U(r, "set", n, i, s) : U(r, "add", n, i)), c } } function Ci(e, t) { let r = ye(e, t), n = e[t], i = Reflect.deleteProperty(e, t); return i && r && U(e, "delete", t, void 0, n), i } function Ti(e, t) { let r = Reflect.has(e, t); return (!qe(t) || !an.has(t)) && M(e, "has", t), r } function Ri(e) { return M(e, "iterate", V(e) ? "length" : Q), Reflect.ownKeys(e) } var Mi = { get: Ei, set: Ai, deleteProperty: Ci, has: Ti, ownKeys: Ri }, Ni = { get: vi, set(e, t) { return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0 }, deleteProperty(e, t) { return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0 } }; var $t = e => be(e) ? et(e) : e, jt = e => be(e) ? pn(e) : e, Ft = e => e, Qe = e => Reflect.getPrototypeOf(e); function Ge(e, t, r = !1, n = !1) { e = e.__v_raw; let i = _(e), o = _(t); t !== o && !r && M(i, "get", t), !r && M(i, "get", o); let { has: s } = Qe(i), a = n ? Ft : r ? jt : $t; if (s.call(i, t)) return a(e.get(t)); if (s.call(i, o)) return a(e.get(o)); e !== i && e.get(t); } function Je(e, t = !1) { let r = this.__v_raw, n = _(r), i = _(e); return e !== i && !t && M(n, "has", e), !t && M(n, "has", i), e === i ? r.has(e) : r.has(e) || r.has(i) } function Ye(e, t = !1) { return e = e.__v_raw, !t && M(_(e), "iterate", Q), Reflect.get(e, "size", e) } function Zr(e) { e = _(e); let t = _(this); return Qe(t).has.call(t, e) || (t.add(e), U(t, "add", e, e)), this } function Qr(e, t) { t = _(t); let r = _(this), { has: n, get: i } = Qe(r), o = n.call(r, e); o ? un(r, n, e) : (e = _(e), o = n.call(r, e)); let s = i.call(r, e); return r.set(e, t), o ? kt(t, s) && U(r, "set", e, t, s) : U(r, "add", e, t), this } function en(e) { let t = _(this), { has: r, get: n } = Qe(t), i = r.call(t, e); i ? un(t, r, e) : (e = _(e), i = r.call(t, e)); let o = n ? n.call(t, e) : void 0, s = t.delete(e); return i && U(t, "delete", e, void 0, o), s } function tn() { let e = _(this), t = e.size !== 0, r = oe(e) ? new Map(e) : new Set(e), n = e.clear(); return t && U(e, "clear", void 0, void 0, r), n } function Xe(e, t) { return function (n, i) { let o = this, s = o.__v_raw, a = _(s), c = t ? Ft : e ? jt : $t; return !e && M(a, "iterate", Q), s.forEach((l, u) => n.call(i, c(l), c(u), o)) } } function Ze(e, t, r) { return function (...n) { let i = this.__v_raw, o = _(i), s = oe(o), a = e === "entries" || e === Symbol.iterator && s, c = e === "keys" && s, l = i[e](...n), u = r ? Ft : t ? jt : $t; return !t && M(o, "iterate", c ? Pt : Q), { next() { let { value: p, done: h } = l.next(); return h ? { value: p, done: h } : { value: a ? [u(p[0]), u(p[1])] : u(p), done: h } }, [Symbol.iterator]() { return this } } } } function q(e) { return function (...t) { { let r = t[0] ? `on key "${t[0]}" ` : ""; console.warn(`${Nt(e)} operation ${r}failed: target is readonly.`, _(this)); } return e === "delete" ? !1 : this } } function ki() { let e = { get(o) { return Ge(this, o) }, get size() { return Ye(this) }, has: Je, add: Zr, set: Qr, delete: en, clear: tn, forEach: Xe(!1, !1) }, t = { get(o) { return Ge(this, o, !1, !0) }, get size() { return Ye(this) }, has: Je, add: Zr, set: Qr, delete: en, clear: tn, forEach: Xe(!1, !0) }, r = { get(o) { return Ge(this, o, !0) }, get size() { return Ye(this, !0) }, has(o) { return Je.call(this, o, !0) }, add: q("add"), set: q("set"), delete: q("delete"), clear: q("clear"), forEach: Xe(!0, !1) }, n = { get(o) { return Ge(this, o, !0, !0) }, get size() { return Ye(this, !0) }, has(o) { return Je.call(this, o, !0) }, add: q("add"), set: q("set"), delete: q("delete"), clear: q("clear"), forEach: Xe(!0, !0) }; return ["keys", "values", "entries", Symbol.iterator].forEach(o => { e[o] = Ze(o, !1, !1), r[o] = Ze(o, !0, !1), t[o] = Ze(o, !1, !0), n[o] = Ze(o, !0, !0); }), [e, r, t, n] } var [Di, Pi, Ii, Li] = ki(); function ln(e, t) { let r = e ? Pi : Di; return (n, i, o) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? n : Reflect.get(ye(r, i) && i in n ? r : n, i, o) } var $i = { get: ln(!1) }; var ji = { get: ln(!0) }; function un(e, t, r) { let n = _(r); if (n !== r && t.call(e, n)) { let i = Mt(e); console.warn(`Reactive ${i} contains both the raw and reactive versions of the same object${i === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`); } } var fn = new WeakMap, Fi = new WeakMap, dn = new WeakMap, Bi = new WeakMap; function zi(e) { switch (e) { case "Object": case "Array": return 1; case "Map": case "Set": case "WeakMap": case "WeakSet": return 2; default: return 0 } } function Ki(e) { return e.__v_skip || !Object.isExtensible(e) ? 0 : zi(Mt(e)) } function et(e) { return e && e.__v_isReadonly ? e : mn(e, !1, Mi, $i, fn) } function pn(e) { return mn(e, !0, Ni, ji, dn) } function mn(e, t, r, n, i) { if (!be(e)) return console.warn(`value cannot be made reactive: ${String(e)}`), e; if (e.__v_raw && !(t && e.__v_isReactive)) return e; let o = i.get(e); if (o) return o; let s = Ki(e); if (s === 0) return e; let a = new Proxy(e, s === 2 ? n : r); return i.set(e, a), a } function _(e) { return e && _(e.__v_raw) || e } function It(e) { return Boolean(e && e.__v_isRef === !0) } y("nextTick", () => ie); y("dispatch", e => J.bind(J, e)); y("watch", (e, { evaluateLater: t, cleanup: r }) => (n, i) => { let o = t(n), a = ve(() => { let c; return o(l => c = l), c }, i); r(a); }); y("store", Kr); y("data", e => Ce(e)); y("root", e => Y(e)); y("refs", e => (e._x_refs_proxy || (e._x_refs_proxy = z(Hi(e))), e._x_refs_proxy)); function Hi(e) { let t = []; return j(e, r => { r._x_refs && t.push(r._x_refs); }), t } var Bt = {}; function zt(e) { return Bt[e] || (Bt[e] = 0), ++Bt[e] } function hn(e, t) { return j(e, r => { if (r._x_ids && r._x_ids[t]) return !0 }) } function _n(e, t) { e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = zt(t)); } y("id", (e, { cleanup: t }) => (r, n = null) => { let i = `${r}${n ? `-${n}` : ""}`; return Vi(e, i, t, () => { let o = hn(e, r), s = o ? o._x_ids[r] : zt(r); return n ? `${r}-${s}-${n}` : `${r}-${s}` }) }); H((e, t) => { e._x_id && (t._x_id = e._x_id); }); function Vi(e, t, r, n) { if (e._x_id || (e._x_id = {}), e._x_id[t]) return e._x_id[t]; let i = n(); return e._x_id[t] = i, r(() => { delete e._x_id[t]; }), i } y("el", e => e); gn("Focus", "focus", "focus"); gn("Persist", "persist", "persist"); function gn(e, t, r) { y(t, n => E(`You can't use [$${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${r}`, n)); } d("modelable", (e, { expression: t }, { effect: r, evaluateLater: n, cleanup: i }) => { let o = n(t), s = () => { let u; return o(p => u = p), u }, a = n(`${t} = __placeholder`), c = u => a(() => { }, { scope: { __placeholder: u } }), l = s(); c(l), queueMicrotask(() => { if (!e._x_model) return; e._x_removeModelListeners.default(); let u = e._x_model.get, p = e._x_model.set, h = Ve({ get() { return u() }, set(w) { p(w); } }, { get() { return s() }, set(w) { c(w); } }); i(h); }); }); d("teleport", (e, { modifiers: t, expression: r }, { cleanup: n }) => { e.tagName.toLowerCase() !== "template" && E("x-teleport can only be used on a <template> tag", e); let i = xn(r), o = e.content.cloneNode(!0).firstElementChild; e._x_teleport = o, o._x_teleportBack = e, e.setAttribute("data-teleport-template", !0), o.setAttribute("data-teleport-target", !0), e._x_forwardEvents && e._x_forwardEvents.forEach(a => { o.addEventListener(a, c => { c.stopPropagation(), e.dispatchEvent(new c.constructor(c.type, c)); }); }), k(o, {}, e); let s = (a, c, l) => { l.includes("prepend") ? c.parentNode.insertBefore(a, c) : l.includes("append") ? c.parentNode.insertBefore(a, c.nextSibling) : c.appendChild(a); }; m(() => { s(o, i, t), A(() => { S(o); })(); }), e._x_teleportPutBack = () => { let a = xn(r); m(() => { s(e._x_teleport, a, t); }); }, n(() => m(() => { o.remove(), P(o); })); }); var qi = document.createElement("div"); function xn(e) { let t = A(() => document.querySelector(e), () => qi)(); return t || E(`Cannot find x-teleport element for selector: "${e}"`), t } var yn = () => { }; yn.inline = (e, { modifiers: t }, { cleanup: r }) => { t.includes("self") ? e._x_ignoreSelf = !0 : e._x_ignore = !0, r(() => { t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore; }); }; d("ignore", yn); d("effect", A((e, { expression: t }, { effect: r }) => { r(x(e, t)); })); function ae(e, t, r, n) { let i = e, o = c => n(c), s = {}, a = (c, l) => u => l(c, u); if (r.includes("dot") && (t = Ui(t)), r.includes("camel") && (t = Wi(t)), r.includes("passive") && (s.passive = !0), r.includes("capture") && (s.capture = !0), r.includes("window") && (i = window), r.includes("document") && (i = document), r.includes("debounce")) { let c = r[r.indexOf("debounce") + 1] || "invalid-wait", l = tt(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250; o = Ke(o, l); } if (r.includes("throttle")) { let c = r[r.indexOf("throttle") + 1] || "invalid-wait", l = tt(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250; o = He(o, l); } return r.includes("prevent") && (o = a(o, (c, l) => { l.preventDefault(), c(l); })), r.includes("stop") && (o = a(o, (c, l) => { l.stopPropagation(), c(l); })), r.includes("once") && (o = a(o, (c, l) => { c(l), i.removeEventListener(t, o, s); })), (r.includes("away") || r.includes("outside")) && (i = document, o = a(o, (c, l) => { e.contains(l.target) || l.target.isConnected !== !1 && (e.offsetWidth < 1 && e.offsetHeight < 1 || e._x_isShown !== !1 && c(l)); })), r.includes("self") && (o = a(o, (c, l) => { l.target === e && c(l); })), (Ji(t) || wn(t)) && (o = a(o, (c, l) => { Yi(l, r) || c(l); })), i.addEventListener(t, o, s), () => { i.removeEventListener(t, o, s); } } function Ui(e) { return e.replace(/-/g, ".") } function Wi(e) { return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase()) } function tt(e) { return !Array.isArray(e) && !isNaN(e) } function Gi(e) { return [" ", "_"].includes(e) ? e : e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase() } function Ji(e) { return ["keydown", "keyup"].includes(e) } function wn(e) { return ["contextmenu", "click", "mouse"].some(t => e.includes(t)) } function Yi(e, t) { let r = t.filter(o => !["window", "document", "prevent", "stop", "once", "capture", "self", "away", "outside", "passive"].includes(o)); if (r.includes("debounce")) { let o = r.indexOf("debounce"); r.splice(o, tt((r[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1); } if (r.includes("throttle")) { let o = r.indexOf("throttle"); r.splice(o, tt((r[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1); } if (r.length === 0 || r.length === 1 && bn(e.key).includes(r[0])) return !1; let i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter(o => r.includes(o)); return r = r.filter(o => !i.includes(o)), !(i.length > 0 && i.filter(s => ((s === "cmd" || s === "super") && (s = "meta"), e[`${s}Key`])).length === i.length && (wn(e.type) || bn(e.key).includes(r[0]))) } function bn(e) { if (!e) return []; e = Gi(e); let t = { ctrl: "control", slash: "/", space: " ", spacebar: " ", cmd: "meta", esc: "escape", up: "arrow-up", down: "arrow-down", left: "arrow-left", right: "arrow-right", period: ".", comma: ",", equal: "=", minus: "-", underscore: "_" }; return t[e] = e, Object.keys(t).map(r => { if (t[r] === e) return r }).filter(r => r) } d("model", (e, { modifiers: t, expression: r }, { effect: n, cleanup: i }) => { let o = e; t.includes("parent") && (o = e.parentNode); let s = x(o, r), a; typeof r == "string" ? a = x(o, `${r} = __placeholder`) : typeof r == "function" && typeof r() == "string" ? a = x(o, `${r()} = __placeholder`) : a = () => { }; let c = () => { let h; return s(w => h = w), En(h) ? h.get() : h }, l = h => { let w; s(F => w = F), En(w) ? w.set(h) : a(() => { }, { scope: { __placeholder: h } }); }; typeof r == "string" && e.type === "radio" && m(() => { e.hasAttribute("name") || e.setAttribute("name", r); }); var u = e.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(e.type) || t.includes("lazy") ? "change" : "input"; let p = I ? () => { } : ae(e, u, t, h => { l(Kt(e, t, h, c())); }); if (t.includes("fill") && ([void 0, null, ""].includes(c()) || ze(e) && Array.isArray(c()) || e.tagName.toLowerCase() === "select" && e.multiple) && l(Kt(e, t, { target: e }, c())), e._x_removeModelListeners || (e._x_removeModelListeners = {}), e._x_removeModelListeners.default = p, i(() => e._x_removeModelListeners.default()), e.form) { let h = ae(e.form, "reset", [], w => { ie(() => e._x_model && e._x_model.set(Kt(e, t, { target: e }, c()))); }); i(() => h()); } e._x_model = { get() { return c() }, set(h) { l(h); } }, e._x_forceModelUpdate = h => { h === void 0 && typeof r == "string" && r.match(/\./) && (h = ""), window.fromModel = !0, m(() => ge(e, "value", h)), delete window.fromModel; }, n(() => { let h = c(); t.includes("unintrusive") && document.activeElement.isSameNode(e) || e._x_forceModelUpdate(h); }); }); function Kt(e, t, r, n) { return m(() => { if (r instanceof CustomEvent && r.detail !== void 0) return r.detail !== null && r.detail !== void 0 ? r.detail : r.target.value; if (ze(e)) if (Array.isArray(n)) { let i = null; return t.includes("number") ? i = Ht(r.target.value) : t.includes("boolean") ? i = xe(r.target.value) : i = r.target.value, r.target.checked ? n.includes(i) ? n : n.concat([i]) : n.filter(o => !Xi(o, i)) } else return r.target.checked; else { if (e.tagName.toLowerCase() === "select" && e.multiple) return t.includes("number") ? Array.from(r.target.selectedOptions).map(i => { let o = i.value || i.text; return Ht(o) }) : t.includes("boolean") ? Array.from(r.target.selectedOptions).map(i => { let o = i.value || i.text; return xe(o) }) : Array.from(r.target.selectedOptions).map(i => i.value || i.text); { let i; return Ot(e) ? r.target.checked ? i = r.target.value : i = n : i = r.target.value, t.includes("number") ? Ht(i) : t.includes("boolean") ? xe(i) : t.includes("trim") ? i.trim() : i } } }) } function Ht(e) { let t = e ? parseFloat(e) : null; return Zi(t) ? t : e } function Xi(e, t) { return e == t } function Zi(e) { return !Array.isArray(e) && !isNaN(e) } function En(e) { return e !== null && typeof e == "object" && typeof e.get == "function" && typeof e.set == "function" } d("cloak", e => queueMicrotask(() => m(() => e.removeAttribute(C("cloak"))))); $e(() => `[${C("init")}]`); d("init", A((e, { expression: t }, { evaluate: r }) => typeof t == "string" ? !!t.trim() && r(t, {}, !1) : r(t, {}, !1))); d("text", (e, { expression: t }, { effect: r, evaluateLater: n }) => { let i = n(t); r(() => { i(o => { m(() => { e.textContent = o; }); }); }); }); d("html", (e, { expression: t }, { effect: r, evaluateLater: n }) => { let i = n(t); r(() => { i(o => { m(() => { e.innerHTML = o, e._x_ignoreSelf = !0, S(e), delete e._x_ignoreSelf; }); }); }); }); ne(Pe(":", Ie(C("bind:")))); var vn = (e, { value: t, modifiers: r, expression: n, original: i }, { effect: o, cleanup: s }) => { if (!t) { let c = {}; qr(c), x(e, n)(u => { Tt(e, u, i); }, { scope: c }); return } if (t === "key") return Qi(e, n); if (e._x_inlineBindings && e._x_inlineBindings[t] && e._x_inlineBindings[t].extract) return; let a = x(e, n); o(() => a(c => { c === void 0 && typeof n == "string" && n.match(/\./) && (c = ""), m(() => ge(e, t, c, r)); })), s(() => { e._x_undoAddedClasses && e._x_undoAddedClasses(), e._x_undoAddedStyles && e._x_undoAddedStyles(); }); }; vn.inline = (e, { value: t, modifiers: r, expression: n }) => { t && (e._x_inlineBindings || (e._x_inlineBindings = {}), e._x_inlineBindings[t] = { expression: n, extract: !1 }); }; d("bind", vn); function Qi(e, t) { e._x_keyExpression = t; } Le(() => `[${C("data")}]`); d("data", (e, { expression: t }, { cleanup: r }) => { if (eo(e)) return; t = t === "" ? "{}" : t; let n = {}; fe(n, e); let i = {}; Gr(i, n); let o = R(e, t, { scope: i }); (o === void 0 || o === !0) && (o = {}), fe(o, e); let s = T(o); Te(s); let a = k(e, s); s.init && R(e, s.init), r(() => { s.destroy && R(e, s.destroy), a(); }); }); H((e, t) => { e._x_dataStack && (t._x_dataStack = e._x_dataStack, t.setAttribute("data-has-alpine-state", !0)); }); function eo(e) { return I ? Be ? !0 : e.hasAttribute("data-has-alpine-state") : !1 } d("show", (e, { modifiers: t, expression: r }, { effect: n }) => { let i = x(e, r); e._x_doHide || (e._x_doHide = () => { m(() => { e.style.setProperty("display", "none", t.includes("important") ? "important" : void 0); }); }), e._x_doShow || (e._x_doShow = () => { m(() => { e.style.length === 1 && e.style.display === "none" ? e.removeAttribute("style") : e.style.removeProperty("display"); }); }); let o = () => { e._x_doHide(), e._x_isShown = !1; }, s = () => { e._x_doShow(), e._x_isShown = !0; }, a = () => setTimeout(s), c = he(p => p ? s() : o(), p => { typeof e._x_toggleAndCascadeWithTransitions == "function" ? e._x_toggleAndCascadeWithTransitions(e, p, s, o) : p ? a() : o(); }), l, u = !0; n(() => i(p => { !u && p === l || (t.includes("immediate") && (p ? a() : o()), c(p), l = p, u = !1); })); }); d("for", (e, { expression: t }, { effect: r, cleanup: n }) => { let i = ro(t), o = x(e, i.items), s = x(e, e._x_keyExpression || "index"); e._x_prevKeys = [], e._x_lookup = {}, r(() => to(e, i, o, s)), n(() => { Object.values(e._x_lookup).forEach(a => m(() => { P(a), a.remove(); })), delete e._x_prevKeys, delete e._x_lookup; }); }); function to(e, t, r, n) { let i = s => typeof s == "object" && !Array.isArray(s), o = e; r(s => { no(s) && s >= 0 && (s = Array.from(Array(s).keys(), f => f + 1)), s === void 0 && (s = []); let a = e._x_lookup, c = e._x_prevKeys, l = [], u = []; if (i(s)) s = Object.entries(s).map(([f, g]) => { let b = Sn(t, g, f, s); n(v => { u.includes(v) && E("Duplicate key on x-for", e), u.push(v); }, { scope: { index: f, ...b } }), l.push(b); }); else for (let f = 0; f < s.length; f++) { let g = Sn(t, s[f], f, s); n(b => { u.includes(b) && E("Duplicate key on x-for", e), u.push(b); }, { scope: { index: f, ...g } }), l.push(g); } let p = [], h = [], w = [], F = []; for (let f = 0; f < c.length; f++) { let g = c[f]; u.indexOf(g) === -1 && w.push(g); } c = c.filter(f => !w.includes(f)); let Ee = "template"; for (let f = 0; f < u.length; f++) { let g = u[f], b = c.indexOf(g); if (b === -1) c.splice(f, 0, g), p.push([Ee, f]); else if (b !== f) { let v = c.splice(f, 1)[0], O = c.splice(b - 1, 1)[0]; c.splice(f, 0, O), c.splice(b, 0, v), h.push([v, O]); } else F.push(g); Ee = g; } for (let f = 0; f < w.length; f++) { let g = w[f]; g in a && (m(() => { P(a[g]), a[g].remove(); }), delete a[g]); } for (let f = 0; f < h.length; f++) { let [g, b] = h[f], v = a[g], O = a[b], ee = document.createElement("div"); m(() => { O || E('x-for ":key" is undefined or invalid', o, b, a), O.after(ee), v.after(O), O._x_currentIfEl && O.after(O._x_currentIfEl), ee.before(v), v._x_currentIfEl && v.after(v._x_currentIfEl), ee.remove(); }), O._x_refreshXForScope(l[u.indexOf(b)]); } for (let f = 0; f < p.length; f++) { let [g, b] = p[f], v = g === "template" ? o : a[g]; v._x_currentIfEl && (v = v._x_currentIfEl); let O = l[b], ee = u[b], ce = document.importNode(o.content, !0).firstElementChild, qt = T(O); k(ce, qt, o), ce._x_refreshXForScope = On => { Object.entries(On).forEach(([Cn, Tn]) => { qt[Cn] = Tn; }); }, m(() => { v.after(ce), A(() => S(ce))(); }), typeof ee == "object" && E("x-for key cannot be an object, it must be a string or an integer", o), a[ee] = ce; } for (let f = 0; f < F.length; f++)a[F[f]]._x_refreshXForScope(l[u.indexOf(F[f])]); o._x_prevKeys = u; }); } function ro(e) { let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, r = /^\s*\(|\)\s*$/g, n = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, i = e.match(n); if (!i) return; let o = {}; o.items = i[2].trim(); let s = i[1].replace(r, "").trim(), a = s.match(t); return a ? (o.item = s.replace(t, "").trim(), o.index = a[1].trim(), a[2] && (o.collection = a[2].trim())) : o.item = s, o } function Sn(e, t, r, n) { let i = {}; return /^\[.*\]$/.test(e.item) && Array.isArray(t) ? e.item.replace("[", "").replace("]", "").split(",").map(s => s.trim()).forEach((s, a) => { i[s] = t[a]; }) : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object" ? e.item.replace("{", "").replace("}", "").split(",").map(s => s.trim()).forEach(s => { i[s] = t[s]; }) : i[e.item] = t, e.index && (i[e.index] = r), e.collection && (i[e.collection] = n), i } function no(e) { return !Array.isArray(e) && !isNaN(e) } function An() { } An.inline = (e, { expression: t }, { cleanup: r }) => { let n = Y(e); n._x_refs || (n._x_refs = {}), n._x_refs[t] = e, r(() => delete n._x_refs[t]); }; d("ref", An); d("if", (e, { expression: t }, { effect: r, cleanup: n }) => { e.tagName.toLowerCase() !== "template" && E("x-if can only be used on a <template> tag", e); let i = x(e, t), o = () => { if (e._x_currentIfEl) return e._x_currentIfEl; let a = e.content.cloneNode(!0).firstElementChild; return k(a, {}, e), m(() => { e.after(a), A(() => S(a))(); }), e._x_currentIfEl = a, e._x_undoIf = () => { m(() => { P(a), a.remove(); }), delete e._x_currentIfEl; }, a }, s = () => { e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf); }; r(() => i(a => { a ? o() : s(); })), n(() => e._x_undoIf && e._x_undoIf()); }); d("id", (e, { expression: t }, { evaluate: r }) => { r(t).forEach(i => _n(e, i)); }); H((e, t) => { e._x_ids && (t._x_ids = e._x_ids); }); ne(Pe("@", Ie(C("on:")))); d("on", A((e, { value: t, modifiers: r, expression: n }, { cleanup: i }) => { let o = n ? x(e, n) : () => { }; e.tagName.toLowerCase() === "template" && (e._x_forwardEvents || (e._x_forwardEvents = []), e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t)); let s = ae(e, t, r, a => { o(() => { }, { scope: { $event: a }, params: [a] }); }); i(() => s()); })); rt("Collapse", "collapse", "collapse"); rt("Intersect", "intersect", "intersect"); rt("Focus", "trap", "focus"); rt("Mask", "mask", "mask"); function rt(e, t, r) { d(t, n => E(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${r}`, n)); } K.setEvaluator(xt); K.setReactivityEngine({ reactive: et, effect: rn, release: nn, raw: _ }); var Vt = K; window.Alpine = Vt; queueMicrotask(() => { Vt.start(); });
  })();

})();
