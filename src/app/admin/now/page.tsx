import { createClient } from "@/lib/supabase/server";
import { profile } from "@/content/profile";
import NowForm from "./now-form";

export const dynamic = "force-dynamic";

export default async function AdminNowPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("now_items")
    .select("id, label, text, accent, display_order")
    .order("display_order", { ascending: true });

  const items = data && data.length > 0
    ? data
    : profile.currently.map((c, i) => ({ id: undefined, label: c.label, text: c.text, accent: c.accent, display_order: i }));

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl font-extrabold tracking-tight">Currently</h1>
      <p className="mt-2 text-text-secondary">
        The four boxes on the home page. Keep the label short (two or three words) and the text to one sentence.
      </p>
      {error && (
        <p className="mt-4 rounded-xl border-2 border-coral bg-paper p-3 text-sm font-bold text-coral">
          The table is not set up yet. Apply <code>supabase/migrations/005_now_items.sql</code> and reload. Until then the site shows the defaults below.
        </p>
      )}
      <NowForm items={items} />
    </div>
  );
}
