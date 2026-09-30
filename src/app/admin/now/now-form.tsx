"use client";

import { useState, useTransition } from "react";
import { saveNowItems } from "./actions";

const ACCENTS = ["coral", "teal", "mustard", "lilac", "mint"] as const;

interface Item {
  id?: string;
  label: string;
  text: string;
  accent: string;
  display_order: number;
}

export default function NowForm({ items }: { items: Item[] }) {
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setMessage(null);
    startTransition(async () => {
      const result = await saveNowItems(fd);
      setMessage(result?.error ?? "Saved. The home page updates within a minute.");
    });
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-5">
      <input type="hidden" name="count" value={items.length} />
      {items.map((item, i) => (
        <fieldset key={item.id ?? i} className="grid gap-3 rounded-2xl border-2 border-ink bg-paper p-4">
          <legend className="px-1 text-sm font-extrabold">Box {i + 1}</legend>
          {item.id && <input type="hidden" name={`id_${i}`} value={item.id} />}
          <div className="grid gap-3 sm:grid-cols-[1fr_1fr]">
            <label className="grid gap-1 text-sm font-bold">
              Label
              <input id={`label_${i}`} name={`label_${i}`} defaultValue={item.label} maxLength={60} className="rounded-lg border-2 border-ink px-3 py-2 font-normal" />
            </label>
            <label className="grid gap-1 text-sm font-bold">
              Color
              <select id={`accent_${i}`} name={`accent_${i}`} defaultValue={item.accent} className="rounded-lg border-2 border-ink px-3 py-2 font-normal">
                {ACCENTS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </label>
          </div>
          <label className="grid gap-1 text-sm font-bold">
            Text
            <textarea id={`text_${i}`} name={`text_${i}`} defaultValue={item.text} rows={2} maxLength={240} className="rounded-lg border-2 border-ink px-3 py-2 font-normal" />
          </label>
        </fieldset>
      ))}
      <div className="flex items-center gap-4">
        <button type="submit" disabled={pending} className="btn btn-coral disabled:opacity-60">{pending ? "Saving..." : "Save"}</button>
        {message && <p role="status" className="m-0 text-sm font-bold">{message}</p>}
      </div>
    </form>
  );
}
