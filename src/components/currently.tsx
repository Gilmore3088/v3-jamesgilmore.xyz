import type { Accent } from "@/content/profile";
import { ACCENT_BG } from "@/components/sticker";

export interface CurrentlyItem {
  label: string;
  text: string;
  accent: Accent;
}

export default function Currently({ items }: { items: readonly CurrentlyItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className={`min-w-0 rounded-2xl border-2 border-ink p-5 ${ACCENT_BG[item.accent]}`}
        >
          <p className="hand m-0 text-2xl leading-none">{item.label}</p>
          <p className="m-0 mt-2 font-medium leading-snug">{item.text}</p>
        </div>
      ))}
    </div>
  );
}
