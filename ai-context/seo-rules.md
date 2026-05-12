# SEO Rules — Lagroutte Project

> Mandatory SEO standards for every page and component.

---

## 1. Page-Level SEO

Every page must include:
- Unique `<title>` tag (50–60 characters)
- Unique `<meta name="description">` (150–160 characters)
- Canonical URL
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter Card tags

### Next.js Implementation
```tsx
export const metadata: Metadata = {
  title: "Page Title | Brand Name",
  description: "Compelling description under 160 chars",
  openGraph: {
    title: "Page Title | Brand Name",
    description: "Description",
    url: "https://domain.com/page",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};
```

---

## 2. Heading Structure

- One `<h1>` per page — describes the primary content
- Logical heading hierarchy: h1 → h2 → h3 (never skip levels)
- Headings must be descriptive and keyword-relevant
- Never use headings for styling purposes only

---

## 3. Semantic HTML

- Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Use `<ul>`, `<ol>` for lists
- Use `<figure>` + `<figcaption>` for images with captions
- Use `<address>` for contact information
- Use `<time>` for dates

---

## 4. Images

- All images must have descriptive `alt` text
- Use `next/image` for automatic optimization
- Set `priority` on above-the-fold hero images
- Provide `width` and `height` to prevent layout shift

---

## 5. Links

- Use descriptive link text (never "click here")
- External links: `rel="noopener noreferrer"` + `target="_blank"`
- Internal links: use Next.js `<Link>` component

---

## 6. Performance SEO

- Ensure fast page loads (affects ranking)
- Minimize CLS (Cumulative Layout Shift)
- Optimize LCP (Largest Contentful Paint)
- No render-blocking resources

---

## 7. Structured Data

Add JSON-LD where appropriate:
- Organization schema on homepage
- BreadcrumbList for navigation
- LocalBusiness if applicable

---

## 8. Technical SEO

- Generate `sitemap.xml` via Next.js
- Generate `robots.txt`
- Ensure all pages are indexable
- Use clean URL structure (no query params for pages)
