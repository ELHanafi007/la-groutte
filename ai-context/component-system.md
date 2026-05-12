# Component System — Lagroutte Project

> Defines the reusable component ecosystem and composition rules.

---

## 1. Component Hierarchy

```
Page → Layout → Sections → Components → UI Primitives
```

---

## 2. Layout Components

| Component | File | Purpose |
|-----------|------|---------|
| `Navbar` | `components/layout/Navbar.tsx` | Site navigation, responsive |
| `Footer` | `components/layout/Footer.tsx` | Site footer with links |
| `PageWrapper` | `components/layout/PageWrapper.tsx` | Fade-in wrapper for pages |
| `Container` | `components/layout/Container.tsx` | Max-width content container |

---

## 3. Section Components

| Component | Purpose |
|-----------|---------|
| `HeroSection` | Full-width hero with headline, subtitle, CTA |
| `ServicesSection` | Grid/list of services offered |
| `PortfolioSection` | Project showcase grid |
| `TestimonialsSection` | Client testimonials carousel/grid |
| `CTASection` | Conversion-focused call-to-action |
| `FAQSection` | Accordion-style FAQ |
| `StatsSection` | Key metrics display |
| `ContactSection` | Contact form + info |

---

## 4. Shared Components

| Component | Purpose |
|-----------|---------|
| `SectionHeading` | Consistent section title + subtitle |
| `Logo` | Brand logo with variants |
| `Badge` | Tags, labels, status indicators |
| `AnimatedText` | Text with reveal animation |

---

## 5. Card Components

| Component | Purpose |
|-----------|---------|
| `ServiceCard` | Individual service display |
| `ProjectCard` | Portfolio project card |
| `TestimonialCard` | Client review card |
| `StatCard` | Single metric display |

---

## 6. UI Primitives (shadcn/ui)

Managed via shadcn CLI: `Button`, `Input`, `Textarea`, `Dialog`, `Sheet`, `Accordion`, `Separator`, `Badge`

---

## 7. Component Rules

1. **Props-first:** Every component has a typed interface
2. **Server-first:** Default to Server Components
3. **Composition:** Use children/slots over excessive props
4. **Self-contained:** Component handles its own spacing internally
5. **Consistent API:** Similar components share similar prop patterns
6. **Accessible:** Proper ARIA labels, keyboard navigation, focus management

### Example Pattern
```tsx
interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({ badge, title, subtitle, align = "center" }: SectionHeadingProps) {
  // implementation
}
```

---

## 8. File Naming

- Components: `PascalCase.tsx`
- One component per file
- Index files only for barrel exports
- Co-locate variants in same directory
