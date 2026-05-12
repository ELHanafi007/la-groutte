# Responsive Rules — Lagroutte Project

> Mobile-first responsive design standards.

---

## 1. Breakpoint System

| Token | Width | Target |
|-------|-------|--------|
| `sm` | 640px | Large phones (landscape) |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small desktops / tablets landscape |
| `xl` | 1280px | Standard desktops |
| `2xl` | 1536px | Large desktops |

### Content Width
- Max content width: `1280px`
- Horizontal padding: `16px` (mobile), `24px` (tablet+), `32px` (desktop)

---

## 2. Mobile-First Approach

- Write base styles for mobile (375px)
- Layer on complexity for larger screens
- TailwindCSS: base classes = mobile, then `md:`, `lg:`, etc.

```tsx
// ✅ Mobile-first
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// ❌ Desktop-first (WRONG)
<div className="grid grid-cols-3 sm:grid-cols-1">
```

---

## 3. Typography Scaling

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| h1 (Hero) | 32–36px | 44–48px | 56–64px |
| h2 (Section) | 24–28px | 32–36px | 40–44px |
| h3 (Card) | 20–22px | 22–24px | 24–28px |
| Body | 15–16px | 16px | 16–18px |
| Small | 13px | 14px | 14px |

Use `clamp()` for fluid typography:
```css
font-size: clamp(2rem, 5vw, 3.5rem);
```

---

## 4. Layout Adaptations

### Navigation
- **Mobile:** Hamburger menu → full-screen overlay or slide-in sheet
- **Desktop:** Horizontal nav bar

### Grids
- **Mobile:** Single column (stack everything)
- **Tablet:** 2 columns
- **Desktop:** 3–4 columns

### Hero Sections
- **Mobile:** Stacked (image below or as background, text above)
- **Desktop:** Side-by-side or full-width with overlay

### Cards
- **Mobile:** Full width, stacked
- **Desktop:** Grid with consistent heights

---

## 5. Touch Targets

- Minimum touch target: `44px × 44px`
- Spacing between targets: minimum `8px`
- No hover-only interactions on mobile
- Use `@media (hover: hover)` for hover-specific styles

---

## 6. Images

- Use responsive `sizes` attribute:
  ```tsx
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  ```
- Serve appropriate image sizes per breakpoint
- Consider art direction with `<picture>` when needed

---

## 7. Spacing Adaptation

- Section padding: `48px 16px` (mobile) → `96px 32px` (desktop)
- Card padding: `16px` (mobile) → `24px` (desktop)
- Gap between items: `16px` (mobile) → `24px` (desktop)

---

## 8. Testing Requirements

Test every page at these widths:
- 375px (iPhone SE)
- 390px (iPhone 14)
- 768px (iPad)
- 1024px (iPad landscape)
- 1280px (Laptop)
- 1440px (Desktop)
- 1920px (Full HD)

---

## 9. Anti-Patterns

- ❌ Horizontal scroll on mobile
- ❌ Text too small to read without zooming
- ❌ Buttons too small to tap
- ❌ Fixed-width elements that overflow
- ❌ Desktop-only layouts shown on mobile
- ❌ Hidden content that should be accessible on mobile
