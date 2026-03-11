# feat: Portfolio Site Improvements

## Overview

Comprehensive improvement plan for jamesgilmore.xyz covering the critical data disconnect, SEO, accessibility, performance, content strategy, and design polish. Organized by priority tiers.

---

## P0 -- Critical: Connect Public Pages to Supabase

**The admin CRUD panel exists but has zero effect on what visitors see.** All public pages use hardcoded data arrays. Blog posts created/edited/deleted in admin never appear on the site.

### Affected Files

- `src/app/(site)/page.tsx` -- 3 hardcoded arrays (FEATURED_PROJECTS, LATEST_POSTS)
- `src/app/(site)/blog/page.tsx` -- hardcoded BLOG_POSTS array
- `src/app/(site)/blog/[slug]/page.tsx` -- hardcoded BLOG_POSTS with full content
- `src/app/(site)/projects/page.tsx` -- hardcoded MY_PROJECTS and FRIENDS_PROJECTS

### Acceptance Criteria

- [ ] Homepage fetches featured projects and latest 3 blog posts from Supabase
- [ ] Blog listing fetches all posts from Supabase `blogs` table
- [ ] Blog detail fetches post by slug from Supabase
- [ ] Projects page fetches from Supabase `projects` table
- [ ] Add `is_friend_project` boolean column to projects table (migration)
- [ ] Add `featured` boolean column to projects table
- [ ] Pages use ISR with `revalidate: 60` for freshness
- [ ] `generateStaticParams` for blog slugs queries Supabase
- [ ] Remove all hardcoded data arrays

---

## P1 -- High: SEO and Discoverability

### 1a. Metadata and Open Graph

**File:** `src/app/layout.tsx`

- [ ] Add `metadataBase: new URL('https://jamesgilmore.xyz')`
- [ ] Add `openGraph` with title, description, image, type, locale
- [ ] Add `twitter` card configuration
- [ ] Add `robots` configuration
- [ ] Each page-level metadata should include OG tags

### 1b. Sitemap and Robots

- [ ] Create `src/app/sitemap.ts` -- include all static routes + dynamic blog slugs from Supabase
- [ ] Create `src/app/robots.ts` -- allow all, disallow `/admin/*` and `/api/*`, point to sitemap

### 1c. Structured Data (JSON-LD)

- [ ] `Person` schema in root layout (name, jobTitle, url, sameAs)
- [ ] `Article` schema on each blog post page
- [ ] `WebSite` schema with site name and URL

### 1d. Favicon and Icons

- [ ] Add `favicon.ico`, `icon.png`, `apple-touch-icon.png` to `src/app/`
- [ ] Remove unused starter SVGs from `public/` (file.svg, globe.svg, next.svg, vercel.svg, window.svg)

---

## P2 -- Medium: Accessibility Fixes

### 2a. Contrast Ratio

**File:** `src/app/globals.css`

- [ ] Change `--color-text-muted` from `#5A5A5A` to `#808080` (passes WCAG AA at 5.31:1)

### 2b. Reduced Motion

**File:** `src/app/globals.css`

- [ ] Add `@media (prefers-reduced-motion: reduce) { .animate-fade-up { animation: none; opacity: 1; } }`

### 2c. Skip Navigation

**File:** `src/app/(site)/layout.tsx`

- [ ] Add visually hidden "Skip to main content" link before Navigation component

### 2d. Focus Indicators

- [ ] Add `focus-visible:ring-2 focus-visible:ring-gold` to all interactive elements
- [ ] Ensure keyboard navigation works through all nav links and buttons

### 2e. Form Accessibility

**File:** `src/app/(site)/contact/page.tsx`

- [ ] Add `aria-live="polite"` to success/error message containers
- [ ] Add `aria-describedby` linking inputs to error messages

---

## P3 -- Medium: Reliability and UX

### 3a. Error Boundaries and Loading States

- [ ] Create `src/app/not-found.tsx` -- custom 404 page
- [ ] Create `src/app/error.tsx` -- custom error boundary
- [ ] Create `src/app/(site)/blog/loading.tsx` -- skeleton loader

### 3b. Admin Improvements

- [ ] Add delete confirmation dialogs in admin blog and projects pages
- [ ] Make admin sidebar responsive (collapsible on mobile)

### 3c. Email Notifications

- [ ] Wire up Resend for contact form submissions (package already installed)
- [ ] Send notification to JLGilmore2@gmail.com on new contact

### 3d. Code Cleanup

- [ ] Remove duplicate `slugify` functions -- use `generateSlug` from `src/lib/utils.ts`
- [ ] Remove duplicate `ProjectCard` in projects page -- use shared component
- [ ] Use shared `BlogCard` component on blog listing page
- [ ] Remove dead code from `src/lib/utils.ts` (`truncateText` if unused)

---

## P4 -- High Impact Content: Homepage Enhancements

### 4a. Metrics Bar

Add a compelling stats section to homepage between hero and projects:

```
60+ Financial Institutions Served
$2M Cross-Sold in 2023
20+ Hours/Month Saved via Automation
130-227% Revenue Growth Achieved
```

These numbers are already in the resume -- just surface them prominently.

### 4b. Closing CTA Section

Add after Latest Posts section:

> "Looking for a data analyst who automates the tedious stuff? Let's talk."
> [Get in Touch] button linking to /contact

### 4c. Blog Post End CTAs

Add after each blog post:
- "Enjoyed this? Check out my projects" link
- "Want to work together? Get in touch" link

---

## P5 -- Analytics and Monitoring

- [ ] Install `@vercel/analytics` and add `<Analytics />` to root layout
- [ ] Install `@vercel/speed-insights` and add `<SpeedInsights />` to root layout
- [ ] Register `jamesgilmore.xyz` with Google Search Console
- [ ] Submit sitemap to Search Console

---

## P6 -- Future Content Strategy

### Technical Blog Posts (write 2-3)

- "How I automated 20 hours of monthly reporting with Python and Jupyter"
- "Building a data pipeline for financial institution analysis"
- "From Excel VBA to pandas: a migration guide for analysts"

### Data Project Case Studies (add 3-5)

Each project detail page should include:
- Business problem
- Approach and tools used
- Key findings with visuals
- Quantified business impact

### Integrations

- [ ] Newsletter signup (Buttondown or ConvertKit) at bottom of blog posts
- [ ] RSS feed route (`src/app/feed.xml/route.ts`)
- [ ] Social sharing buttons on blog posts (LinkedIn, X, Copy Link)

---

## Implementation Order

| Phase | Items | Effort |
|-------|-------|--------|
| **Week 1** | P0 (Supabase connection), P2a-b (contrast + reduced motion) | High |
| **Week 2** | P1 (SEO: metadata, sitemap, robots, JSON-LD, favicon) | Medium |
| **Week 3** | P4 (homepage metrics bar, CTAs), P5 (analytics) | Medium |
| **Week 4** | P3 (error boundaries, admin fixes, email, code cleanup) | Medium |
| **Ongoing** | P6 (content strategy, blog posts, case studies) | Ongoing |
