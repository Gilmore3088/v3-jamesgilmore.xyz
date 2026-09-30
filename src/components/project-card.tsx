import Link from "next/link";
import type { Project } from "@/types";
import type { Accent } from "@/content/profile";
import { ACCENT_BG, ACCENT_VAR } from "@/components/sticker";

const ACCENTS: Accent[] = ["mint", "coral", "lilac", "mustard", "teal"];

const STATUS: Record<string, string> = {
  in_progress: "Building",
  archived: "Retired",
};

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const { title, slug, description, technologies, status, category } = project;
  const accent = ACCENTS[index % ACCENTS.length];
  const statusLabel = STATUS[status];

  return (
    <Link
      href={`/projects/${slug}`}
      className="card card-lift grid min-w-0 content-start gap-2.5 p-5 no-underline"
      style={{ ["--c" as string]: ACCENT_VAR[accent] }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2.5 py-1 font-display text-[11px] font-extrabold uppercase tracking-wider ${ACCENT_BG[accent]}`}>
          {category ?? "Project"}
        </span>
        {statusLabel && (
          <span className="rounded-full border-2 border-ink px-2.5 py-0.5 font-display text-[11px] font-extrabold uppercase tracking-wider">
            {statusLabel}
          </span>
        )}
      </div>

      <h3 className="font-display text-xl font-extrabold leading-tight tracking-tight">
        {title}
      </h3>

      <p className="m-0 line-clamp-3 text-[15px] leading-relaxed text-muted">
        {description}
      </p>

      {technologies && technologies.length > 0 && (
        <p className="m-0 mt-1 text-xs font-bold text-muted">
          {technologies.join(" · ")}
        </p>
      )}
    </Link>
  );
}
