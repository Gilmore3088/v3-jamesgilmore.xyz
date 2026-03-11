# feat: Site Improvements v2

## Overview

Comprehensive improvement plan for jamesgilmore.xyz covering SEO, accessibility, error handling, code cleanup, analytics, contact form enhancements, and content strategy. Builds on completed P0 (Supabase connection) and about page rewrite.

**Status**: P0 complete. All public pages fetch from Supabase. About page rewritten. Admin header overlap fixed. Old repos archived.

---

## P1 -- SEO & Discoverability

### 1a. Root Layout Metadata

**File:** `src/app/layout.tsx`

- [ ] Add `metadataBase: new URL("https://jamesgilmore.xyz")`
- [ ] Add `title.template: "%s | James Gilmore"` pattern
- [ ] Add `openGraph` with title, description, image, type, locale, siteName
- [ ] Add `twitter` card configuration (summary_large_image)
- [ ] Add `robots` configuration (index, follow, block admin/api)
- [ ] Simplify child page titles to use template (e.g., `title: "Projects"` instead of `"Projects | James Gilmore"`)
- [ ] Create a static `/public/og-image.png` (1200x630, dark bg with gold accent, name + title)

### 1b. Sitemap and Robots

- [ ] Create `src/app/sitemap.ts` -- static routes + dynamic blog slugs from Supabase (use `createStaticClient`)
- [ ] Create `src/app/robots.ts` -- allow all, disallow `/admin/*` and `/api/*`, point to sitemap

### 1c. Structured Data (JSON-LD)

- [ ] `Person` + `WebSite` schema on homepage (`src/app/(site)/page.tsx`)
- [ ] `Article` schema on blog detail page (`src/app/(site)/blog/[slug]/page.tsx`)
- [ ] Use `.replace(/</g, "\\u003c")` XSS prevention per Next.js docs

### 1d. Blog Detail OG Enhancement

**File:** `src/app/(site)/blog/[slug]/page.tsx`

- [ ] Add `openGraph.type: "article"`, `publishedTime`, `authors` to `generateMetadata`

### 1e. Cleanup Stale Assets

- [ ] Remove `public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`

---

## P2 -- Accessibility

### 2a. Contrast Ratio

**File:** `src/app/globals.css`

- [ ] Change `--color-text-muted` from `#5A5A5A` to `#808080` (5.3:1 ratio against `#0C0C0C`, safely passes WCAG AA)

### 2b. Reduced Motion

**File:** `src/app/globals.css`

- [ ] Add `@media (prefers-reduced-motion: reduce)` rule:
  - Set `.animate-fade-up { animation: none; opacity: 1; transform: none; }`

### 2c. Skip Navigation

**File:** `src/app/(site)/layout.tsx`

- [ ] Add visually hidden "Skip to main content" link before Navigation component
- [ ] Add `id="main-content"` to `<main>` element

### 2d. Focus Indicators

**File:** `src/app/globals.css`

- [ ] Add global `:focus-visible { outline: 2px solid var(--color-gold); outline-offset: 2px; }`

### 2e. Contact Form Accessibility

**File:** `src/app/(site)/contact/page.tsx`

- [ ] Add persistent `aria-live="polite"` container (always in DOM, content changes)
- [ ] Add `aria-invalid` on invalid fields
- [ ] Add `aria-describedby` linking inputs to their error messages (use `id` on error `<p>` elements)

---

## P3 -- Error Handling, Loading States & Revalidation

### 3a. Error Boundaries

- [ ] Create `src/app/not-found.tsx` -- root-level custom 404 (styled, "Go Home" link)
- [ ] Create `src/app/(site)/not-found.tsx` -- public site 404 (inherits nav/footer)
- [ ] Create `src/app/(site)/error.tsx` -- client component with "Try Again" button
- [ ] Create `src/app/(site)/loading.tsx` -- skeleton loader (pulse animation, uses theme tokens)

### 3b. On-Demand Revalidation

**Files:** `src/app/admin/blog/actions.ts`, `src/app/admin/projects/actions.ts`

- [ ] Add `revalidatePath("/blog")`, `revalidatePath("/")` after blog create/update/delete
- [ ] Add `revalidatePath("/projects")`, `revalidatePath("/")` after project create/update/delete
- [ ] Convert blog create/edit from client-side Supabase calls to server actions (enables revalidatePath)

### 3c. Consistent Error Handling

- [ ] Standardize all server actions to return `{ success: boolean; error?: string }` pattern
- [ ] Remove `throw new Error()` from `deleteBlogPost` and contacts actions
- [ ] Add error logging to `data.ts` fetch functions (log Supabase errors, still return empty arrays)

---

## P4 -- Code Cleanup & Admin Gaps

### 4a. Deduplicate Code

- [ ] Remove local `slugify` from `src/app/admin/blog/new/page.tsx` and `src/app/admin/blog/[slug]/edit/page.tsx` -- import `generateSlug` from `@/lib/utils`
- [ ] Remove inline `ProjectCard` from `src/app/(site)/projects/page.tsx` -- use shared `@/components/project-card`
- [ ] Remove duplicate `BlogPost` interface from `src/app/admin/blog/[slug]/edit/page.tsx` -- import from `@/types`
- [ ] Remove duplicate `Project` interface from `src/app/admin/projects/[id]/edit/page.tsx` -- import from `@/types`

### 4b. Dead Code Removal

- [ ] Remove `truncateText` from `src/lib/utils.ts` (unused)
- [ ] Remove `cn` from `src/lib/utils.ts` (unused)
- [ ] Uninstall `slugify` npm package (never imported)
- [ ] Uninstall `dompurify` and `@types/dompurify` packages (keep `isomorphic-dompurify` which is the one actually used)

### 4c. Admin Project Form Gaps

**Files:** `src/app/admin/projects/new/page.tsx`, `src/app/admin/projects/[id]/edit/page.tsx`

- [ ] Add `is_friend_project` toggle (boolean checkbox/switch)
- [ ] Add `featured` toggle (boolean checkbox/switch)
- [ ] Update `Project` interface in `src/types/index.ts` to include `is_friend_project: boolean` and `featured: boolean`

### 4d. Admin Delete Confirmations

- [ ] Create `src/components/confirm-dialog.tsx` using native `<dialog>` element
- [ ] Add confirmation before delete on blog, projects, and contacts admin pages

---

## P5 -- Analytics & Monitoring

- [ ] Install `@vercel/analytics` and `@vercel/speed-insights`
- [ ] Add `<Analytics />` and `<SpeedInsights />` to root layout (`src/app/layout.tsx`)
- [ ] Register `jamesgilmore.xyz` with Google Search Console (manual step)
- [ ] Submit sitemap to Search Console (manual step)

---

## P6 -- Contact Form Enhancement

### 6a. Resend Email Notifications

**File:** `src/app/api/contact/route.ts`

- [ ] Import Resend and send notification email after successful Supabase insert
- [ ] Wrap email send in try/catch -- submission succeeds even if email fails (best-effort)
- [ ] Send to `JLGilmore2@gmail.com` with name, email, and message content
- [ ] Set `RESEND_API_KEY` env var in Vercel and `.env.local`
- [ ] Verify domain with Resend (for `noreply@jamesgilmore.xyz` sender)

### 6b. Honeypot Spam Prevention

**Files:** `src/app/(site)/contact/page.tsx`, `src/app/api/contact/route.ts`

- [ ] Add hidden honeypot field (visually hidden via CSS, `aria-hidden="true"`, `tabIndex={-1}`)
- [ ] Server returns fake 201 success if honeypot is filled (don't tip off bots)
- [ ] Add honeypot check to Zod schema validation

---

## P7 -- Content & Conversion

### 7a. Homepage Metrics Bar

**File:** `src/app/(site)/page.tsx`

- [ ] Add stats section between hero and featured projects:
  - `60+` Financial Institutions Served
  - `$2M` Cross-Sold in 2023
  - `20+` Hours/Month Saved via Automation
  - `130-227%` Revenue Growth Achieved
- [ ] Style as a horizontal bar with gold accent numbers

### 7b. Closing CTA Section

**File:** `src/app/(site)/page.tsx`

- [ ] Add after Latest Posts section:
  - Heading: "Looking for a data analyst who automates the tedious stuff?"
  - Subtext: "Let's talk."
  - Button: "Get in Touch" linking to `/contact`

### 7c. Blog Post End CTAs

**File:** `src/app/(site)/blog/[slug]/page.tsx`

- [ ] Add after article content, before the bottom hr:
  - "Enjoyed this? Check out my projects" link to `/projects`
  - "Want to work together? Get in touch" link to `/contact`

---

## P8 -- Technical Debt

### 8a. Middleware Deprecation

**File:** `src/middleware.ts`

- [ ] Rename exported `middleware` function to `proxy` (Next.js 16 convention)
- [ ] Keep `config.matcher` as-is

### 8b. Admin Responsive Sidebar

**File:** `src/app/admin/layout.tsx`

- [ ] Convert to client component for toggle state
- [ ] Hide sidebar behind hamburger on mobile (`lg:` breakpoint)
- [ ] Add backdrop overlay when sidebar open on mobile
- [ ] Keep fixed sidebar on desktop

### 8c. Contact Page Metadata

**File:** `src/app/(site)/contact/page.tsx`

- [ ] Split into server component wrapper (exports metadata) + client `ContactForm` component
- [ ] Currently a `"use client"` page so cannot export `metadata`

---

## Implementation Order

| Phase | Items | Impact |
|-------|-------|--------|
| **Phase 1** | P2a-b (contrast + reduced motion), P5 (analytics) | Quick wins, 30 min |
| **Phase 2** | P1 (SEO: metadata, sitemap, robots, JSON-LD) | High SEO impact, 1-2 hrs |
| **Phase 3** | P3a (error/404/loading pages) | UX safety net, 30 min |
| **Phase 4** | P4a-b (dedup + dead code), P4c (admin toggles) | Code quality, 1 hr |
| **Phase 5** | P6 (Resend + honeypot) | Contact form completeness, 1 hr |
| **Phase 6** | P3b-c (revalidation + error handling consistency) | Reliability, 1-2 hrs |
| **Phase 7** | P7 (metrics bar, CTAs) | Conversion, 1 hr |
| **Phase 8** | P8 (middleware rename, responsive admin, contact metadata) | Polish, 1-2 hrs |

---

## Assumptions (from SpecFlow analysis)

1. Blog create/edit will be converted from client-side Supabase to server actions (enables revalidatePath)
2. Resend email failures do NOT block contact submission (best-effort)
3. Only remove `dompurify` + `@types/dompurify`; keep `isomorphic-dompurify`
4. Server actions standardize on `{ success, error }` return pattern (not throwing)
5. Static OG image for now; dynamic per-post OG images deferred
6. `prefers-reduced-motion` disables fadeUp animation only; CSS transitions remain
7. Supabase RLS is configured (if not, becomes P0 blocker)

---

## References

### Internal
- `src/app/layout.tsx:17-20` -- minimal root metadata
- `src/app/globals.css:13` -- `--color-text-muted: #5A5A5A` (accessibility target)
- `src/lib/data.ts` -- all data fetching, ignores Supabase errors
- `src/lib/utils.ts:8,17,29` -- `generateSlug`, `truncateText` (dead), `cn` (dead)
- `src/app/admin/blog/new/page.tsx:8` -- duplicate `slugify`
- `src/app/admin/blog/[slug]/edit/page.tsx:18` -- duplicate `slugify`
- `src/app/(site)/projects/page.tsx:22` -- duplicate `ProjectCard`
- `src/types/index.ts` -- missing `is_friend_project`, `featured` on Project
- `src/app/admin/blog/actions.ts:27` -- throws errors (inconsistent)
- `src/app/admin/projects/actions.ts:18` -- returns errors (inconsistent)

### External
- [Next.js Metadata API](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld)
- [Next.js Sitemap Convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [WCAG 2.2 Contrast Requirements](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [Vercel Analytics Quickstart](https://vercel.com/docs/analytics/quickstart)
- [Vercel Speed Insights](https://vercel.com/docs/speed-insights/quickstart)

### Previous Work
- `plans/feat-portfolio-improvements.md` -- original plan (P0 complete)
- Commit `925ff5e` -- About page rewrite + closing line
- Commit `36f051c` -- P0 Supabase connection + admin layout fix
