import Link from "next/link";
import type { Project } from "@/types";
import type { Accent } from "@/content/profile";
import { ACCENT_VAR } from "@/components/sticker";

const ACCENTS: Accent[] = ["mustard", "teal", "coral", "lilac", "mint"];
const STATUS: Record<string, string> = { in_progress: "Building", archived: "Retired" };

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const { title, slug, description, technologies, status, category } = project;
  const accent = ACCENTS[index % ACCENTS.length];
  const statusLabel = STATUS[status];

  return (
    <Link href={`/projects/${slug}`} className="card card-accent card-lift group grid min-w-0 content-start gap-2.5 p-6 no-underline" style={{ ["--c" as string]: ACCENT_VAR[accent] }}>
      <div className="flex flex-wrap items-center gap-3">
        <span className="eyebrow">{category ?? "Project"}</span>
        {statusLabel && <span className="sticker">{statusLabel}</span>}
      </div>
      <h3 className="m-0 font-display text-xl font-semibold leading-tight tracking-tight transition-colors group-hover:text-gold">{title}</h3>
      <p className="m-0 line-clamp-3 text-[15px] leading-relaxed text-muted">{description}</p>
      {technologies?.length > 0 && <p className="m-0 mt-1 text-xs text-muted/80">{technologies.join(" · ")}</p>}
    </Link>
  );
}
