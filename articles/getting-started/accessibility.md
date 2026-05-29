# Accessibility
Allow your project to support all audiences.

---

## Overview

Manifest is accessible by default. Its reset stylesheet, semantic element styles, and interactive plugins all align with <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank">WCAG 2.1 Level AA</a>. Keyboard navigation, focus management, ARIA attributes, and live-region announcements are handled automatically.

All code snippets in these docs are intended to be semantically correct for screen readers and SEO crawlers.

---

## Built-in Support

- **Focus states** provide visible focus indicators for keyboard navigation.
- **Form elements** are accessible controls with proper labeling support.
- **Semantic HTML styles** preserve the semantic meaning of HTML elements.
- **Text scaling** uses font sizes and line heights optimized for readability.
- **Reduced motion** includes support for the `prefers-reduced-motion` media query.
- **ARIA styles** are provided for common ARIA attributes.

### Elements

Manifest's advanced elements, including those supported by plugin scripts, implement the relevant <a href="https://www.w3.org/WAI/ARIA/apg/patterns/" target="_blank">WAI-ARIA Authoring Practices</a> patterns. No setup is required beyond using them:

| Element | Accessibility |
|---|---|
| [Accordions](/docs/elements/accordions) | Native `<details>` / `<summary>` — focusable, Enter / Space to toggle, `aria-expanded` implicit |
| [Color Pickers](/docs/elements/color-pickers) | Keyboard-navigable swatches and inputs with labeled controls |
| [Dialogs](/docs/elements/dialogs) | Native `<dialog>` / popover API — focus trap, Escape to close, return focus on close, `role="dialog"` and `aria-modal` implicit |
| [Dropdowns](/docs/elements/dropdowns) | `aria-haspopup="menu"`, reactive `aria-expanded`, `aria-controls`, `role="menu"` / `"menuitem"`, arrow navigation, Escape to close with focus return to trigger, roving `tabindex` |
| [Forms](/docs/elements/forms) | Native HTML5 validation, error states, and semantic labeling |
| [Sidebars](/docs/elements/sidebars) | Native popover dismissal with Escape |
| [Tabs](/docs/elements/tabs) | `role="tablist"` / `"tab"` / `"tabpanel"`, reactive `aria-selected`, `aria-controls`, `aria-labelledby`, roving `tabindex`, Left / Right / Up / Down / Home / End arrow navigation |
| [Toasts](/docs/elements/toasts) | `role="status"` + `aria-live="polite"` for confirmations; `role="alert"` for negative / destructive types |
| [Tooltips](/docs/elements/tooltips) | `role="tooltip"`, `aria-describedby` linking the trigger to the tooltip content, fires on hover **and** keyboard focus (WCAG 2.1 SC 1.4.13) |

---

## Motion

Manifest's CSS animations and the View Transitions API respect `prefers-reduced-motion` automatically. Users with reduced-motion enabled see instant navigation instead of crossfade, and component animations resolve immediately rather than easing.

---

## WCAG 2.1 Coverage

Manifest's defaults align with WCAG 2.1 Level AA criteria:

| Criterion | Covered by |
|---|---|
| 1.4.4 — Resize Text | Text-scaling reset styles |
| 1.4.13 — Content on Hover or Focus | Tooltips fire on focus, not hover-only |
| 2.1.1 — Keyboard | Tabs, dropdowns, dialogs, accordions are fully keyboard-operable |
| 2.3.3 — Animation from Interactions | `prefers-reduced-motion` honored across reset CSS and view transitions |
| 2.4.7 — Focus Visible | Focus indicators on all interactive elements |
| 4.1.2 — Name, Role, Value | ARIA roles wired on tabs, menus, tooltips, dialogs, toasts |
| 4.1.3 — Status Messages | Toasts route through `role="status"` / `role="alert"` per type |

Authors retain responsibility for content-level criteria like heading hierarchy, image alt text, link discernibility, custom theme contrast ratios, and form label association.

---

## Automated Testing

Run Manifest's project linter to catch accessibility violations alongside other regressions:

```bash copy
npx mnfst-test
```

The runtime pass injects <a href="https://github.com/dequelabs/axe-core" target="_blank">axe-core</a> against a headless render of your project and reports each failure with severity, the offending element, and (for color-contrast issues) the theme CSS variable driving the bad color. See [testing](/docs/publishing/testing) for full details.

---

## Manual Checklist

Automated tools catch about a third of accessibility issues. Always test your applications against the rest:

- [ ] Keyboard navigation (Tab, Enter, Space, arrow keys)
- [ ] Focus indicators visible throughout
- [ ] Color contrast ratios pass at WCAG 2.1 AA
- [ ] Screen readers usable (VoiceOver, NVDA, JAWS)
- [ ] Form controls have proper labels
- [ ] Text remains readable when zoomed to 200%
- [ ] Reduced-motion preferences honored in custom CSS
- [ ] Heading hierarchy and document outline coherent
- [ ] Interactive elements have sufficient touch targets (44×44 px)
- [ ] Different input methods (mouse, keyboard, touch, voice)
