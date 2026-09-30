import type { Accent } from "@/content/profile";
import { ACCENT_VAR, ACCENT_TEXT } from "@/components/sticker";

export interface CurrentlyItem {
  label: string;
  text: string;
  accent: Accent;
}

export default function Currently({ items }: { items: readonly CurrentlyItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="card card-accent min-w-0 p-5" style={{ ["--c" as string]: ACCENT_VAR[item.accent] }}>
          <p className={`m-0 font-display text-xl italic ${ACCENT_TEXT[item.accent]}`}>{item.label}</p>
          <p className="m-0 mt-2 text-[15px] leading-relaxed text-ink">{item.text}</p>
        </div>
      ))}
    </div>
  );
}
