# Accessibility Rules — Lagroutte Project

> WCAG 2.1 AA compliance is mandatory. No exceptions.

---

## 1. Targets

- **WCAG Level:** 2.1 AA minimum
- **Lighthouse Accessibility:** 95+
- **Keyboard navigable:** 100% of interactive elements
- **Screen reader compatible:** Full semantic structure

---

## 2. Semantic HTML

- Use landmark elements: `<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>`
- Use heading hierarchy correctly (h1 → h2 → h3, no skipping)
- Use `<button>` for actions, `<a>` for navigation
- Use `<ul>/<ol>` for lists
- Use `<form>` with proper `<label>` elements

---

## 3. Keyboard Navigation

- All interactive elements must be focusable
- Tab order must be logical (follow DOM order)
- Focus must be visible (custom focus ring styles)
- Escape key closes modals/overlays
- Arrow keys for menu/dropdown navigation
- No keyboard traps

### Focus Style
```css
:focus-visible {
  outline: 2px solid hsl(220, 60%, 50%);
  outline-offset: 2px;
  border-radius: 4px;
}
```

---

## 4. Color & Contrast

- Text contrast: minimum 4.5:1 (body), 3:1 (large text)
- Never convey information through color alone
- Ensure interactive states are distinguishable without color
- Test with color blindness simulators

---

## 5. Images & Media

- All images: descriptive `alt` text
- Decorative images: `alt=""`
- Videos: captions/subtitles
- No auto-playing video with sound

---

## 6. Forms

- Every input has a visible `<label>`
- Error messages are descriptive and associated with fields
- Required fields marked with `aria-required="true"`
- Use `aria-describedby` for help text
- Form validation errors announced to screen readers

---

## 7. ARIA Usage

- Use native HTML elements first (ARIA is a last resort)
- Required ARIA for custom components:
  - Modals: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
  - Navigation: `aria-label` on `<nav>` elements
  - Toggles: `aria-expanded`, `aria-controls`
  - Loading: `aria-busy="true"`, `aria-live="polite"`

---

## 8. Motion

- Respect `prefers-reduced-motion`
- No flashing content (< 3 flashes per second)
- Provide pause controls for auto-advancing content

---

## 9. Testing Checklist

- [ ] Navigate entire site with keyboard only
- [ ] Test with screen reader (VoiceOver)
- [ ] Verify color contrast ratios
- [ ] Check focus visibility on all elements
- [ ] Validate heading hierarchy
- [ ] Test with zoom at 200%
- [ ] Run Lighthouse accessibility audit
