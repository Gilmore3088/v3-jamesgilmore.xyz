import type { Accent } from "@/content/profile";

const BG: Record<Accent, string> = {
  coral: "bg-coral text-white",
  teal: "bg-teal text-white",
  mustard: "bg-mustard text-ink",
  lilac: "bg-lilac text-ink",
  mint: "bg-mint text-ink",
};

export const ACCENT_VAR: Record<Accent, string> = {
  coral: "var(--color-coral)",
  teal: "var(--color-teal)",
  mustard: "var(--color-mustard)",
  lilac: "var(--color-lilac)",
  mint: "var(--color-mint)",
};

export const ACCENT_BG = BG;

export default function Sticker({
  children,
  accent = "mustard",
  className = "",
}: {
  children: React.ReactNode;
  accent?: Accent;
  className?: string;
}) {
  return <span className={`sticker ${BG[accent]} ${className}`}>{children}</span>;
}
