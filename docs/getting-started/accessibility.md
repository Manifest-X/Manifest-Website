# Accessibility
Built-in accessibility features and ARIA support in Indux.

---

## Overview

Indux provides built-in accessibility features through its normalizer and base styles. These ensure your applications are accessible by default while maintaining flexibility for custom implementations.

All code snippets in these docs are intended to be semantically correct for screen readers and SEO crawlers.

---

## Built-in Features

- **Focus States**: Visible focus indicators for keyboard navigation
- **Form Elements**: Accessible form controls with proper labeling support
- **Semantic HTML**: Base styles preserve semantic meaning of HTML elements
- **Text Scaling**: Font sizes and line heights optimized for readability
- **Reduced Motion**: Support for `prefers-reduced-motion` media query

---

## ARIA Support

The normalizer includes base styles for common ARIA attributes:

```css
[aria-hidden="true"] {
    display: none;
}

[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.5;
}
```

---

## Accessibility Checklist

While Indux provides accessibility foundations, always test your applications. Here are some key areas to consider:

- Keyboard navigation (tab, enter, space, arrow keys)
- Focus indicators are visible
- Color contrast ratios (WCAG 2.1 AA)
- Screen readers are usable (VoiceOver, NVDA, JAWS)
- Form controls have proper labels
- Text remains readable when zoomed to 200%
- Reduced motion preferences
- Heading hierarchy and document outline
- Interactive elements have sufficient touch targets
- Different input methods (mouse, keyboard, touch)