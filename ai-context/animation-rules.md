# Animation Rules — Lagroutte Project

> Defines all motion standards using Framer Motion.
> Animations must enhance perceived quality without degrading performance.

---

## 1. Animation Philosophy

- **Purposeful** — Every animation must serve a UX goal
- **Subtle** — Motion should feel natural, not theatrical
- **Performant** — Animate only `transform` and `opacity`
- **Consistent** — Use shared timing and easing across the project

---

## 2. Timing & Easing Standards

### Duration Scale
| Token | Duration | Usage |
|-------|----------|-------|
| `instant` | 100ms | Micro-feedback (button press) |
| `fast` | 200ms | Hover states, tooltips |
| `normal` | 300ms | Component transitions |
| `smooth` | 500ms | Section reveals, modals |
| `slow` | 700ms | Hero animations, page transitions |
| `cinematic` | 1000ms | Initial load sequences |

### Easing Curves
```typescript
export const easings = {
  // Default — smooth deceleration
  ease: [0.25, 0.1, 0.25, 1.0],
  // Entry — elements appearing
  easeOut: [0.0, 0.0, 0.2, 1.0],
  // Exit — elements leaving
  easeIn: [0.4, 0.0, 1.0, 1.0],
  // Emphasis — bouncy, premium feel
  spring: { type: "spring", stiffness: 300, damping: 30 },
  // Gentle spring for large elements
  gentleSpring: { type: "spring", stiffness: 150, damping: 25 },
} as const;
```

---

## 3. Reveal Animations

### Fade Up (Default Section Reveal)
```typescript
export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] },
};
```

### Fade In (Subtle)
```typescript
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};
```

### Slide In (Horizontal)
```typescript
export const slideInLeft = {
  initial: { opacity: 0, x: -32 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] },
};
```

### Stagger Children
```typescript
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};
```

---

## 4. Interaction Animations

### Button Hover
```typescript
whileHover={{ scale: 1.02, y: -1 }}
whileTap={{ scale: 0.98 }}
transition={{ duration: 0.2 }}
```

### Card Hover
```typescript
whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
```

### Link Underline Reveal
- Use `scaleX` from 0 to 1 on a pseudo-element
- `transformOrigin: "left"` for left-to-right reveal

---

## 5. Scroll-Triggered Animations

### Rules
- Use `whileInView` with `viewport={{ once: true, margin: "-80px" }}`
- Always set `once: true` to prevent re-triggering
- Use negative margin to trigger slightly before element enters viewport
- Stagger delay: `0.1s` between siblings, max `0.5s` total

### Implementation
```tsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
>
```

---

## 6. Page Transitions

- Wrap page content in `<motion.main>` with fade animation
- Duration: `300ms` fade in
- No complex page transitions unless explicitly requested

---

## 7. Loading & Skeleton States

- Pulse animation for skeleton loaders
- Smooth opacity transition when content loads
- Never show layout shift during loading

---

## 8. Reduced Motion

Always respect `prefers-reduced-motion`:
```typescript
const prefersReducedMotion = 
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
```

When reduced motion is preferred:
- Remove all transform animations
- Keep opacity fades (shorter duration)
- Disable scroll-triggered animations

---

## 9. Anti-Patterns (NEVER DO)

- ❌ Parallax scrolling (unless explicitly requested)
- ❌ Animations longer than 1s for UI elements
- ❌ Animating `width`, `height`, `top`, `left` (use `transform`)
- ❌ Animations that block user interaction
- ❌ Bouncy/elastic easing on serious corporate content
- ❌ Auto-playing carousels
- ❌ Infinite spinning loaders (use determinate progress)
- ❌ Animations that replay on every scroll
- ❌ More than 3 animated elements visible simultaneously
