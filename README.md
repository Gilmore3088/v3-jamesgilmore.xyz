# jamesgilmore.xyz

Personal website for James Gilmore. Next.js 16, Tailwind 4, Supabase.

## Editing the words

Everything on the site that is "James talking" lives in one file:

- `src/content/profile.ts` — headline, photo caption, stickers, the scrolling tape,
  "the short version" cards, "things I believe", "ask me about", and the sign-off.

Change the text, save, and redeploy. Nothing else needs to change.

The four **Currently** boxes on the home page are editable without a deploy at
`/admin/now` once `supabase/migrations/005_now_items.sql` has been applied.
Projects and posts are managed in the admin panel as before.

## Running locally

```bash
pnpm install
pnpm dev
```

Put your Supabase URL and anon key in `.env.local` first (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).

## Design explorations

`design-explorations/` holds the static mockups used to choose this direction.
They are not part of the app.
