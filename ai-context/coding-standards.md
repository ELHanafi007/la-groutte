# Coding Standards — Lagroutte Project

> Mandatory code quality rules for all TypeScript/React code.

---

## 1. TypeScript Standards

- **Strict mode** enabled in `tsconfig.json`
- No `any` types — use `unknown` + type guards if needed
- Export interfaces for all component props
- Use `const` assertions for static data
- Prefer union types over enums

```tsx
// ✅ Good
interface ButtonProps {
  variant: "primary" | "secondary" | "ghost";
  size: "sm" | "md" | "lg";
  children: React.ReactNode;
}

// ❌ Bad
interface ButtonProps {
  variant: any;
  size: string;
  children: any;
}
```

---

## 2. React Patterns

- **Server Components first** — only add `"use client"` when required
- **Named exports** for components (no default exports)
- **Destructure props** in function signature
- **Early returns** for guard clauses
- **Composition** over configuration

```tsx
// ✅ Good
export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  if (!title) return null;
  // ...
}

// ❌ Bad
export default function ServiceCard(props: any) {
  // ...
}
```

---

## 3. File Organization

- One component per file
- Co-locate tests next to components
- Group by feature, not by type
- Use barrel exports (`index.ts`) sparingly

---

## 4. Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `HeroSection.tsx` |
| Hooks | camelCase with `use` | `useScroll.ts` |
| Utils | camelCase | `formatDate.ts` |
| Types/Interfaces | PascalCase | `ServiceItem` |
| Constants | UPPER_SNAKE_CASE | `MAX_ITEMS` |
| Files (non-component) | kebab-case | `site-config.ts` |

---

## 5. Import Order

1. React/Next.js imports
2. Third-party libraries
3. Internal aliases (`@/components`, `@/lib`, etc.)
4. Relative imports
5. Type imports (with `type` keyword)

---

## 6. CSS/Styling Rules

- Use TailwindCSS utility classes
- Extract repeated patterns to components (not CSS classes)
- Use `cn()` utility from `@/lib/utils` for conditional classes
- Never use inline `style` props unless dynamically computed
- Keep class strings readable (one logical group per line for long strings)

```tsx
// ✅ Good
<div className={cn(
  "flex items-center gap-4 rounded-xl p-6",
  "bg-white border border-gray-100",
  "transition-all duration-300 hover:shadow-lg",
  isActive && "ring-2 ring-primary"
)} />
```

---

## 7. Error Handling

- Use error boundaries for critical sections
- Provide meaningful fallback UI
- Log errors appropriately
- Never swallow errors silently

---

## 8. Performance Patterns

- Memoize expensive computations with `useMemo`
- Memoize callbacks with `useCallback` (only when passed to optimized children)
- Use `React.lazy` / `dynamic()` for code splitting
- Avoid unnecessary re-renders

---

## 9. Comments & Documentation

- Comment the "why", not the "what"
- Use JSDoc for exported functions/components
- Keep comments current with code changes
- Remove TODO comments before production
