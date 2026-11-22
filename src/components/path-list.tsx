import { site } from "@/content/site";

/** Career chapters as a quiet table: period, title, one line of detail. */
export default function PathList({ compact = false }: { compact?: boolean }) {
  return (
    <ol className="m-0 list-none border-t border-line p-0">
      {site.about.path.map((step) => (
        <li
          key={step.period + step.title}
          className={`grid gap-1 border-b border-line py-4 ${compact ? "" : "sm:grid-cols-[8rem_14rem_1fr] sm:gap-6 sm:py-5"}`}
        >
          <span className="label pt-0.5">{step.period}</span>
          <span className="serif text-[1.3rem] leading-snug text-ink">{step.title}</span>
          {!compact && <span className="text-[1.05rem] leading-relaxed text-muted">{step.detail}</span>}
        </li>
      ))}
    </ol>
  );
}
