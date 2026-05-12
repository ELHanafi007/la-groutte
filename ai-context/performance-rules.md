# Performance Rules — Lagroutte Project

> Mandatory performance standards. The site must feel instant.

---

## 1. Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 95+ |
| LCP (Largest Contentful Paint) | < 2.5s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| TTFB (Time to First Byte) | < 600ms |
| Total bundle size (JS) | < 200KB gzipped |

---

## 2. Image Optimization

- Always use `next/image` component
- Use WebP/AVIF formats (auto via Next.js)
- Set explicit `width` and `height`
- Use `priority` for above-the-fold images
- Use `loading="lazy"` for below-the-fold
- Provide responsive `sizes` attribute
- Max image dimensions: 2x display size

---

## 3. Code Splitting

- Server Components by default (zero client JS)
- Dynamic imports for heavy client components:
  ```tsx
  const HeavyComponent = dynamic(() => import("./Heavy"), { ssr: false });
  ```
- Split by route (automatic with App Router)
- Never import entire icon libraries

---

## 4. Font Loading

- Use `next/font/google` for zero layout shift
- Preload only used weights/styles
- Set `display: "swap"` for fast text rendering
- Maximum 2 font families

```tsx
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  weight: ["600", "700", "800"],
  display: "swap",
});
```

---

## 5. CSS Optimization

- Use TailwindCSS (tree-shaken in production)
- No unused CSS
- Avoid complex CSS selectors
- Minimize CSS-in-JS runtime overhead

---

## 6. Third-Party Scripts

- Load analytics asynchronously
- Use `next/script` with `strategy="lazyOnload"`
- Never block rendering with third-party scripts
- Audit all third-party dependencies

---

## 7. Caching

- Static pages: ISR or full static generation
- Assets: immutable caching headers
- API responses: appropriate cache headers

---

## 8. Animation Performance

- Only animate `transform` and `opacity`
- Use `will-change` sparingly and remove after animation
- Prefer CSS transitions over JS animations for simple effects
- Use `requestAnimationFrame` for custom animations
