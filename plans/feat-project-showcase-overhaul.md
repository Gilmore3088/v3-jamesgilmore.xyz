# feat: Overhaul Project Showcase

## Overview

Transform the projects section from a flat card listing into a rich, story-driven showcase with individual detail pages, visual media, filtering, and proper SEO. The core insight: in 2026, anyone can ship an app -- the differentiation is in the *thinking*, not the code. Every project should answer "why did you build this, what tradeoffs did you navigate, and what did you learn?"

## Problem Statement

The current projects section has significant gaps compared to the blog section:

- **No detail pages** -- projects are cards on a flat list with only external links. No way to deep-link, share, or tell the story behind a build.
- **No visual media** -- `image_url` exists in the type but is never rendered or editable in admin.
- **No case study content** -- `description` is capped at 2000 chars. No room for architecture decisions, outcomes, or reflections.
- **No slug field** -- only UUIDs, so clean URLs aren't possible.
- **No status tracking** -- no way to mark projects as shipped, in-progress, or experimental.
- **No filtering** -- `category` exists in data but isn't shown to visitors.
- **No SEO** -- no per-project metadata, no sitemap entries, no JSON-LD, no OG images.
- **Duplicate ProjectCard** -- one in `components/project-card.tsx`, another inline in `projects/page.tsx`.
- **Missing sitemap.ts** -- `robots.ts` references it but it doesn't exist.

## Proposed Solution

### Phase 1: Data Model + Admin (Foundation)

Add fields to the `projects` table and update admin forms.

#### Database Migration

`supabase/migrations/004_project_showcase_fields.sql`:

```sql
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS content TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'completed'
    CHECK (status IN ('draft', 'in_progress', 'completed', 'archived')),
  ADD COLUMN IF NOT EXISTS thumbnail_url TEXT,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Generate slugs from existing titles
UPDATE projects SET slug = LOWER(REGEXP_REPLACE(REGEXP_REPLACE(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'))
WHERE slug IS NULL;

ALTER TABLE projects ALTER COLUMN slug SET NOT NULL;

-- Add trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

#### Updated Type

`src/types/index.ts`:

```typescript
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string | null;        // markdown case study
  category: string | null;
  technologies: string[];
  github_url: string | null;
  project_url: string | null;
  image_url: string | null;
  thumbnail_url: string | null;  // card thumbnail
  display_order: number;
  is_friend_project: boolean;
  featured: boolean;
  status: "draft" | "in_progress" | "completed" | "archived";
  created_at: string;
  updated_at: string;
}
```

#### Updated Admin Forms

Files to modify:
- `src/app/admin/projects/actions.ts` -- add slug generation, new fields to Zod schema and insert/update
- `src/app/admin/projects/new/page.tsx` -- add content textarea, status dropdown, thumbnail URL field
- `src/app/admin/projects/[id]/edit/page.tsx` -- same new fields

Admin form additions:
- **Content** -- large textarea for markdown case study (same as blog content field)
- **Status** -- `<select>` dropdown: Draft, In Progress, Completed, Archived
- **Thumbnail URL** -- text input for now (Supabase Storage upload is Phase 3)
- **Slug** -- auto-generated from title, editable

#### Updated Data Layer

`src/lib/data.ts` -- add:

```typescript
export async function getProjectBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("is_friend_project", false)
    .not("status", "eq", "draft")
    .single();
  return data as Project | null;
}

export async function getAllProjectSlugs() {
  const supabase = createStaticClient();
  const { data } = await supabase
    .from("projects")
    .select("slug")
    .eq("is_friend_project", false)
    .not("status", "eq", "draft");
  return data ?? [];
}
```

Update existing `getMyProjects()` and `getFeaturedProjects()` to filter out `draft` status.

### Phase 2: Project Detail Pages + SEO

#### Detail Page

`src/app/(site)/projects/[slug]/page.tsx`:

- Follow the exact pattern from `blog/[slug]/page.tsx`
- `params` is a `Promise` in Next.js 16 -- must `await params`
- `generateStaticParams` using `getAllProjectSlugs()` with `createStaticClient()`
- `generateMetadata` for dynamic title, description, OG tags
- `revalidate = 60` for ISR
- Render markdown `content` using shared markdown utility (extract from blog)
- Show: title, status badge, category, description, content (case study), technologies, links, dates

Page sections:
1. Breadcrumb: Projects / Project Title
2. Hero: title, category label, status badge, description
3. Tech stack pills
4. Links row (Live Site, Source Code)
5. Case study content (rendered markdown)
6. "Back to Projects" / next/prev project navigation

#### Shared Markdown Utility

Extract from `blog/[slug]/page.tsx` into `src/lib/markdown.ts`:

```typescript
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [...]; // existing allowlist
const ALLOWED_ATTR = [...];

export async function renderMarkdown(content: string): Promise<string> {
  const rawHtml = await marked(content);
  return DOMPurify.sanitize(rawHtml, { ALLOWED_TAGS, ALLOWED_ATTR });
}
```

Update `blog/[slug]/page.tsx` to import from this shared utility.

#### Loading Skeleton

`src/app/(site)/projects/[slug]/loading.tsx` -- pulse animation matching site aesthetic.

#### OG Image Generation

`src/app/(site)/projects/[slug]/opengraph-image.tsx`:

- Dark background (#0C0C0C) with gold accent
- Project title in large text
- Category label in gold uppercase
- Description excerpt
- "jamesgilmore.xyz" watermark
- 1200x630 dimensions

#### Sitemap

`src/app/sitemap.ts`:

```typescript
import type { MetadataRoute } from "next";
import { getAllSlugs, getAllProjectSlugs } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogSlugs = await getAllSlugs();
  const projectSlugs = await getAllProjectSlugs();

  const staticPages = [
    { url: "https://jamesgilmore.xyz", priority: 1 },
    { url: "https://jamesgilmore.xyz/projects", priority: 0.9 },
    { url: "https://jamesgilmore.xyz/blog", priority: 0.8 },
    { url: "https://jamesgilmore.xyz/about", priority: 0.7 },
    { url: "https://jamesgilmore.xyz/contact", priority: 0.6 },
    { url: "https://jamesgilmore.xyz/resume", priority: 0.5 },
  ];

  const blogPages = blogSlugs.map((s) => ({
    url: `https://jamesgilmore.xyz/blog/${s.slug}`,
    priority: 0.7,
  }));

  const projectPages = projectSlugs.map((s) => ({
    url: `https://jamesgilmore.xyz/projects/${s.slug}`,
    priority: 0.8,
  }));

  return [...staticPages, ...projectPages, ...blogPages];
}
```

#### JSON-LD Structured Data

Add `CreativeWork` schema to each project detail page for SEO and AI search discoverability.

### Phase 3: Visual & UX Enhancements

#### Consolidated ProjectCard Component

Merge the two duplicate implementations into one `src/components/project-card.tsx` with a `variant` prop:

```typescript
interface ProjectCardProps {
  project: Project;
  variant?: "featured" | "listing";
}
```

- `featured` variant: left gold border, used on homepage
- `listing` variant: used on projects page
- Both render: thumbnail (if available), title, description, tech pills, status badge, links

#### Thumbnail on Cards

If `thumbnail_url` exists, render at top of card with `next/image` using `fill` + `aspect-video` container. Configure `remotePatterns` in `next.config.ts` for `*.supabase.co`.

#### Category Filtering on Projects Page

Client-side filtering with URL search params:

- Filter pills above the grid: All, Data Systems, Automation, Web Apps, etc.
- Active filter uses gold accent styling
- URL updates to `/projects?category=automation` for shareability
- Animated transitions on filter change

#### Status Badges

Visual treatment per status:
- **Completed** -- gold accent, full presentation
- **In Progress** -- muted gold, "Building" label
- **Experiment** -- subtle border, "Exploration" label
- **Archived** -- dimmed styling (or hidden from public)
- **Draft** -- admin-only, never shown publicly

#### Scroll Reveal Animations

Lightweight `ScrollReveal` component using Intersection Observer (no extra dependency). Staggered reveal on project cards.

### Phase 4: Future Enhancements (Deferred)

- Supabase Storage integration for image uploads in admin
- Image gallery support (separate `project_images` table)
- Video/demo embeds
- Delete confirmation dialog in admin
- Drag-and-drop reorder in admin
- "Related projects" section on detail pages
- Friend project attribution (`friend_name`, `friend_url` fields)

## Acceptance Criteria

### Phase 1 (Foundation)
- [x] Database migration adds `slug`, `content`, `status`, `thumbnail_url`, `updated_at` to projects table
- [x] `Project` type in `src/types/index.ts` includes all new fields
- [x] Admin create/edit forms include content textarea, status dropdown, thumbnail URL
- [x] Server actions validate new fields with Zod
- [x] Slugs auto-generated from title using existing `generateSlug` utility
- [x] Public queries filter out `draft` status projects

### Phase 2 (Detail Pages + SEO)
- [x] `/projects/[slug]` renders full project detail with case study content
- [x] `generateStaticParams` pre-renders existing project pages at build time
- [x] `generateMetadata` produces unique title, description, OG tags per project
- [x] `opengraph-image.tsx` generates branded social cards per project
- [x] `sitemap.ts` includes all project and blog URLs
- [x] Shared `src/lib/markdown.ts` used by both blog and project pages
- [x] Loading skeleton at `projects/[slug]/loading.tsx`
- [x] Blog `[slug]/page.tsx` refactored to use shared markdown utility
- [x] JSON-LD `CreativeWork` structured data on each project page

### Phase 3 (Visual & UX)
- [x] Single `ProjectCard` component with `variant` prop replaces both implementations
- [ ] Thumbnail images render on cards when available
- [x] `next.config.ts` allows Supabase Storage remote images
- [ ] Category filter pills on projects listing page with URL param state
- [x] Status badges displayed on cards and detail pages
- [ ] Scroll reveal animations on project cards
- [x] Empty state message when no projects match filter

## Files to Create

| File | Purpose |
|------|---------|
| `supabase/migrations/004_project_showcase_fields.sql` | Add slug, content, status, thumbnail_url, updated_at |
| `src/app/(site)/projects/[slug]/page.tsx` | Project detail page |
| `src/app/(site)/projects/[slug]/loading.tsx` | Loading skeleton |
| `src/app/(site)/projects/[slug]/opengraph-image.tsx` | Dynamic OG images |
| `src/app/sitemap.ts` | Dynamic sitemap for all pages |
| `src/lib/markdown.ts` | Shared markdown rendering utility |
| `src/components/scroll-reveal.tsx` | Intersection observer wrapper |

## Files to Modify

| File | Changes |
|------|---------|
| `src/types/index.ts` | Add slug, content, status, thumbnail_url, updated_at to Project |
| `src/lib/data.ts` | Add getProjectBySlug, getAllProjectSlugs; filter drafts from existing queries |
| `src/app/admin/projects/actions.ts` | Add new fields to Zod schema, slug generation |
| `src/app/admin/projects/new/page.tsx` | Add content, status, thumbnail fields |
| `src/app/admin/projects/[id]/edit/page.tsx` | Add content, status, thumbnail fields |
| `src/components/project-card.tsx` | Add variant prop, thumbnail support, status badge |
| `src/app/(site)/projects/page.tsx` | Use shared ProjectCard, add filtering, show categories |
| `src/app/(site)/page.tsx` | Use shared ProjectCard component |
| `src/app/(site)/blog/[slug]/page.tsx` | Refactor to use shared markdown utility |
| `next.config.ts` | Add remotePatterns for Supabase Storage |

## Technical Considerations

- **`params` is a Promise in Next.js 16** -- must `await params` before destructuring in page components and `generateMetadata`
- **Use `createStaticClient()`** in `generateStaticParams` and `sitemap.ts` to avoid cookies-outside-request-scope errors
- **OG image generation uses Satori** -- flexbox only, no CSS grid, limited styling
- **Supabase Storage `remotePatterns`** -- there is a [known Next.js issue](https://github.com/vercel/next.js/issues/88873) with some external domains returning 400 errors; a custom loader is the fallback
- **ISR with `revalidate = 60`** works identically to the blog pattern; `revalidatePath` in server actions triggers immediate rebuild

## References

### Internal
- Blog detail page pattern: `src/app/(site)/blog/[slug]/page.tsx`
- Blog server actions: `src/app/admin/blog/actions.ts`
- Data layer: `src/lib/data.ts`
- Slug generation: `src/lib/utils.ts:generateSlug`
- DOMPurify allowlist: `src/app/(site)/blog/[slug]/page.tsx`
- Design system: `src/app/globals.css`

### External
- [Next.js Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [Next.js generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js OG Image Generation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)
- [Next.js Sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
- [Schema.org CreativeWork](https://schema.org/CreativeWork)
