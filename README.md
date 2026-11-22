# jamesgilmore.xyz

Personal website for James Gilmore. Next.js 16, TypeScript, Tailwind 4. Fully static, no database.

## Editing the site

Everything the site says lives in one file:

- `src/content/site.ts` — name, description, navigation, public links, email, the home page copy,
  both projects, the About story, the Contact page, and the footer line.

Rules the pages follow:

- `email: null` hides the email entry on Contact. Set it to a real address to show it.
- A project's `url: null` hides every "visit the site" link for that project.
- A project's `image` is a real screenshot in `public/projects/`. Set it to `null` for a text-only entry.
- Photos live in `public/photos/` and are listed in `photos` with a true caption. Home shows `home.band` plus six more; About shows them all.
- `projects[].caseStudy` is an empty array until there is a real write-up. Add
  `{ heading, body: [paragraphs] }` entries and they render on the project page.
- `about.photo` is `null` by default. Set `{ src, alt, caption }` to show a portrait; the layout adjusts.

Adding a project means adding one object to `projects`. Its page, sitemap entry, and card appear automatically.

## Running locally

```bash
pnpm install
pnpm dev
```

## Checks

```bash
pnpm check   # lint + typecheck + production build
```

## Layout

- `src/app/(site)/` — the public pages: home, about, projects, projects/[slug], contact
- `src/components/` — navigation, footer, project card, small shared pieces
- `src/app/globals.css` — design tokens (paper, ink, evergreen) and the handful of custom classes
- `src/app/opengraph-image.tsx` — the sharing card, generated from the content file

`design-explorations/` and `plans/` are history from earlier passes and are not part of the app.
