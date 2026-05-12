# UI/UX Rules — Lagroutte Project

> This document defines the mandatory UI/UX standards for every page, section, and component.
> All generations must comply. No exceptions.

---

## 1. Design Philosophy

- **Premium over functional.** Every pixel must feel intentional.
- **Elegance over complexity.** Simplicity is the ultimate sophistication.
- **Breathing room over density.** Generous whitespace signals luxury.
- **Consistency over novelty.** The system must feel unified.

---

## 2. Typography Hierarchy

| Level | Usage | Weight | Tracking |
|-------|-------|--------|----------|
| Display (h1) | Hero headlines | 700–800 | -0.03em (tight) |
| Heading (h2) | Section titles | 600–700 | -0.02em |
| Subheading (h3) | Card titles, subsections | 600 | -0.01em |
| Body Large | Lead paragraphs | 400 | 0em |
| Body | General text | 400 | 0.01em |
| Body Small | Captions, metadata | 400 | 0.02em |
| Label | Buttons, tags, badges | 500–600 | 0.05em (wide) |

### Font Stack
- **Primary:** `"Inter", system-ui, sans-serif`
- **Display (optional):** `"Plus Jakarta Sans"` or `"Outfit"` for hero headlines
- **Monospace:** `"JetBrains Mono"` for code/data elements

### Rules
- Never use more than 2 font families per page
- Minimum body font size: `16px` (desktop), `15px` (mobile)
- Line height: `1.5–1.7` for body, `1.1–1.2` for display headings
- Maximum paragraph width: `65ch` for optimal readability

---

## 3. Spacing System

Use an 8px base grid. All spacing must be multiples of 4 or 8.

| Token | Value | Usage |
|-------|-------|-------|
| `space-xs` | 4px | Inline gaps, icon padding |
| `space-sm` | 8px | Tight component gaps |
| `space-md` | 16px | Default component padding |
| `space-lg` | 24px | Card padding, form spacing |
| `space-xl` | 32px | Section inner padding |
| `space-2xl` | 48px | Section gaps |
| `space-3xl` | 64px | Major section padding |
| `space-4xl` | 96px | Hero/section vertical rhythm |
| `space-5xl` | 128px | Full section breaks |

### Rules
- Section vertical padding: minimum `80px` desktop, `48px` mobile
- Content max-width: `1280px` with `24px` horizontal padding
- Card padding: minimum `24px`
- Never use arbitrary spacing values outside the system

---

## 4. Color Strategy

### Neutral Palette (Primary)
- Use HSL-based neutrals with subtle warm or cool undertones
- Avoid pure `#000` or `#fff` — use `hsl(0, 0%, 4%)` / `hsl(0, 0%, 98%)`

### Accent Colors
- Primary accent: defined in `branding-direction.md`
- Use accent sparingly — for CTAs, links, active states
- Never use more than 2 accent colors per page

### Rules
- Contrast ratio: minimum `4.5:1` for body text, `3:1` for large text
- Background colors must have sufficient depth for layered UIs
- Use opacity-based variants (`/10`, `/20`, `/80`) for subtle layering

---

## 5. Hover & Interactive States

Every interactive element must have:
1. **Default** — Clear resting state
2. **Hover** — Subtle lift, color shift, or glow (150–250ms transition)
3. **Active/Pressed** — Slightly darker or compressed
4. **Focus** — Visible ring for accessibility
5. **Disabled** — Reduced opacity (0.5), `cursor: not-allowed`

### Button Hover Patterns
- Primary: subtle brightness shift + `translateY(-1px)` + shadow increase
- Ghost/Outline: background fill with accent color at 10% opacity
- Links: underline reveal or color transition

### Card Hover Patterns
- Subtle `translateY(-4px)` lift
- Shadow depth increase
- Optional border-color transition

---

## 6. Layout Principles

- **Mobile-first** — Design for 375px, then scale up
- **Content hierarchy** — Most important content is immediately visible
- **Z-pattern / F-pattern** — Follow natural reading flow
- **Visual weight balance** — Distribute visual elements evenly
- **Consistent alignment** — Left-align text in LTR, center for heroes

### Grid System
- 12-column grid for desktop
- 6-column for tablet
- 4-column for mobile
- Column gap: `24px` desktop, `16px` mobile

---

## 7. CTA Design

- Primary CTA: filled, prominent, rounded corners (8–12px radius)
- Secondary CTA: outline or ghost variant
- Minimum touch target: `44px × 44px`
- Button padding: `12px 24px` minimum
- CTA must visually dominate the section it's in
- Use directional cues (arrows, icons) to guide action

---

## 8. Anti-Patterns (NEVER DO)

- ❌ Generic Bootstrap/template appearance
- ❌ Inconsistent border-radius across components
- ❌ Text directly on busy images without overlay
- ❌ More than 3 font sizes per section
- ❌ Cluttered layouts with no breathing room
- ❌ Centered body text (except short hero subtitles)
- ❌ Neon or overly saturated accent colors
- ❌ Shadows that look flat or unrealistic
- ❌ Misaligned elements between sections
- ❌ Different spacing systems within the same page

---

## 9. Visual Quality Checklist

Before any page is considered complete:

- [ ] Typography hierarchy is clear and consistent
- [ ] Spacing follows the 8px grid
- [ ] Colors meet contrast requirements
- [ ] All interactive elements have hover/focus states
- [ ] Layout adapts cleanly across breakpoints
- [ ] CTAs are prominent and well-designed
- [ ] No orphaned text or awkward line breaks
- [ ] Visual rhythm between sections is smooth
- [ ] Page feels premium, not generic
