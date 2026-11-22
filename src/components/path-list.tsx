import { site } from "@/content/site";

/** Career chapters as cards. */
export default function PathList({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={`m-0 grid list-none gap-3 p-0 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-3 lg:grid-cols-5"}`}>
      {site.about.path.map((step) => (
        <li key={step.period + step.title} className="panel min-w-0 p-5">
          <p className="label m-0 text-sm">{step.period}</p>
          <p className="m-0 mt-2 text-[1.15rem] font-bold leading-tight">{step.title}</p>
          {!compact && <p className="m-0 mt-2 text-[0.95rem] leading-relaxed text-muted">{step.detail}</p>}
        </li>
      ))}
    </ol>
  );
}
