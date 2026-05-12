# CLAUDE.md — Lagroutte Project AI Context

> Master reference file. Read ALL files in /ai-context before any generation.

---

## Project Identity

**Lagroutte** — A premium, conversion-focused corporate website.

**Stack:** Next.js 15 (App Router) + TypeScript + TailwindCSS + Framer Motion + shadcn/ui

**Quality Target:** Awwwards-level. Premium agency output.

---

## Mandatory Pre-Generation Checklist

Before generating ANY code, you MUST:

1. ✅ Read `ui-ux-rules.md` — spacing, typography, interactions
2. ✅ Read `branding-direction.md` — colors, tone, identity
3. ✅ Read `component-system.md` — reusable component patterns
4. ✅ Read `frontend-architecture.md` — project structure, conventions
5. ✅ Read `animation-rules.md` — Framer Motion standards
6. ✅ Read `coding-standards.md` — TypeScript/React patterns
7. ✅ Read `responsive-rules.md` — mobile-first breakpoints
8. ✅ Read `performance-rules.md` — optimization targets
9. ✅ Read `seo-rules.md` — metadata, semantic HTML
10. ✅ Read `accessibility-rules.md` — WCAG compliance
11. ✅ Read `project-goals.md` — purpose and success metrics

---

## Quick Reference

### Color Palette
- Primary: `hsl(220, 60%, 20%)` (deep navy)
- Accent: `hsl(38, 70%, 55%)` (warm gold)
- Background: `hsl(40, 10%, 97%)` (off-white)
- Text: `hsl(220, 20%, 12%)` (near-black)

### Typography
- Headlines: Plus Jakarta Sans (700-800)
- Body: Inter (400-500)
- Min body size: 16px

### Spacing
- 8px grid system
- Section padding: 80-128px vertical (desktop)
- Content max-width: 1280px

### Animation
- Reveal: fadeUp (0.6s, ease-out)
- Hover: 200-300ms transitions
- Always `viewport={{ once: true }}`
- Respect `prefers-reduced-motion`

---

## Architecture Rules

1. **Server Components** by default
2. **One component per file** with typed props
3. **Mobile-first** responsive design
4. **Composition** over configuration
5. **`cn()` utility** for conditional classes
6. **`next/image`** for all images
7. **`next/font`** for fonts (no layout shift)
8. **Semantic HTML** everywhere

---

## Component Locations

```
src/components/
├── ui/          → shadcn primitives
├── layout/      → Navbar, Footer, Container, PageWrapper
├── sections/    → HeroSection, CTASection, etc.
├── cards/       → ServiceCard, ProjectCard, etc.
└── shared/      → SectionHeading, Logo, Badge, etc.
```

---

## Quality Gates

Before any page is complete:
- [ ] Passes Lighthouse 95+ (Performance, Accessibility)
- [ ] Mobile responsive (375px → 1920px)
- [ ] Hover/focus states on all interactive elements
- [ ] Consistent spacing (8px grid)
- [ ] Semantic heading hierarchy
- [ ] SEO metadata configured
- [ ] Smooth animations (Framer Motion)
- [ ] Visually premium — not generic

---

## Conflict Resolution

If a new generation conflicts with these standards:
→ **Established system consistency wins.**
→ Discuss with the user before breaking any rule.
