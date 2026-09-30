import type { Accent } from "@/content/profile";

/** Accent as a CSS variable, for `--c` on cards. */
export const ACCENT_VAR: Record<Accent, string> = {
  coral: "var(--color-coral)",
  teal: "var(--color-teal)",
  mustard: "var(--color-mustard)",
  lilac: "var(--color-lilac)",
  mint: "var(--color-mint)",
};

/** Accent as a text color class. */
export const ACCENT_TEXT: Record<Accent, string> = {
  coral: "text-coral",
  teal: "text-teal",
  mustard: "text-mustard",
  lilac: "text-lilac",
  mint: "text-mint",
};

/** Accent as a faint tinted background plus text color, for icon plates. */
export const ACCENT_BG: Record<Accent, string> = {
  coral: "bg-coral/15 text-coral",
  teal: "bg-teal/15 text-teal",
  mustard: "bg-mustard/15 text-mustard",
  lilac: "bg-lilac/15 text-lilac",
  mint: "bg-mint/15 text-mint",
};

export default function Sticker({ children, className = "" }: { children: React.ReactNode; accent?: Accent; className?: string }) {
  return <span className={`sticker ${className}`}>{children}</span>;
}
