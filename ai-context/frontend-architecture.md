# Frontend Architecture — Lagroutte Project

> Defines the scalable, production-ready architecture for the entire frontend.
> All code must follow this structure.

---

## 1. Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 15.x (App Router) | Framework, SSR, routing |
| TypeScript | 5.x | Type safety |
| TailwindCSS | 4.x | Utility-first styling |
| Framer Motion | 12.x | Animation library |
| shadcn/ui | latest | UI component primitives |
| Lucide React | latest | Icon system |

---

## 2. Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── (marketing)/            # Public marketing pages
│   │   ├── page.tsx            # Homepage
│   │   ├── about/
│   │   ├── services/
│   │   ├── portfolio/
│   │   ├── contact/
│   │   └── layout.tsx
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Global styles + Tailwind
│   └── not-found.tsx           # 404 page
├── components/
│   ├── ui/                     # shadcn/ui primitives (Button, Input, etc.)
│   ├── layout/                 # Navbar, Footer, PageWrapper
│   ├── sections/               # Reusable page sections (Hero, CTA, etc.)
│   ├── cards/                  # Card variants
│   └── shared/                 # Shared utilities (Logo, SectionHeading, etc.)
├── lib/
│   ├── utils.ts                # Utility functions (cn, formatters)
│   ├── constants.ts            # Site-wide constants
│   └── metadata.ts             # SEO metadata helpers
├── hooks/                      # Custom React hooks
│   ├── use-scroll.ts
│   ├── use-media-query.ts
│   └── use-intersection.ts
├── types/                      # TypeScript type definitions
│   └── index.ts
├── data/                       # Static data / content
│   ├── navigation.ts
│   ├── services.ts
│   └── testimonials.ts
└── assets/                     # Static assets (if not in /public)
```

---

## 3. Routing Strategy

- Use **Route Groups** `(marketing)` to organize public pages
- Each page has its own `page.tsx` and optional `layout.tsx`
- Dynamic routes use `[slug]` convention
- Loading states via `loading.tsx`
- Error boundaries via `error.tsx`

---

## 4. Component Architecture

### Hierarchy
```
Page → Layout → Sections → Components → UI Primitives
```

### Component Rules
1. **One component per file** — named export matching filename
2. **Props interface** — every component defines its props as a TypeScript interface
3. **Composition over configuration** — prefer children/slots over prop bloat
4. **Server Components by default** — only add `"use client"` when needed
5. **Co-locate styles** — use Tailwind classes directly, no external CSS files per component

### Naming Conventions
- Components: `PascalCase` (e.g., `HeroSection.tsx`)
- Hooks: `camelCase` with `use` prefix (e.g., `useScroll.ts`)
- Utils: `camelCase` (e.g., `formatDate.ts`)
- Types: `PascalCase` with descriptive names (e.g., `ServiceItem`)
- Constants: `UPPER_SNAKE_CASE` for values, `camelCase` for objects

---

## 5. State Management

- **No global state library** unless explicitly needed
- Use React `useState` / `useReducer` for local state
- Use URL search params for filterable/sortable state
- Use React Context sparingly — only for theme/locale

---

## 6. Data Flow

- **Static data** → `data/` directory as typed constants
- **Dynamic data** → Server Components with `fetch` or API routes
- **Forms** → Server Actions (Next.js) or API routes
- **Content** → Hardcoded in data files (no CMS unless specified)

---

## 7. Import Aliases

```json
{
  "@/*": ["./src/*"],
  "@/components/*": ["./src/components/*"],
  "@/lib/*": ["./src/lib/*"],
  "@/hooks/*": ["./src/hooks/*"],
  "@/types/*": ["./src/types/*"],
  "@/data/*": ["./src/data/*"]
}
```

---

## 8. Performance Architecture

- Default to **Server Components** for zero client JS
- Use `dynamic()` imports for heavy client components
- Images via `next/image` with proper `sizes` and `priority`
- Fonts via `next/font/google` for zero layout shift
- Minimize `"use client"` boundary surface area

---

## 9. Build & Deploy

- Target: Vercel (or static export if needed)
- Environment variables via `.env.local`
- No secrets in client-side code
- Use `next.config.ts` for configuration
