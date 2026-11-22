import Link from "next/link";
import Arrow from "@/components/arrow";
import type { Project } from "@/content/site";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link href={`/projects/${project.slug}`} className="card group grid min-w-0 content-start gap-5 border-t border-ink pt-5">
      <div className="flex items-end justify-between gap-4">
        <span className="numeral text-[3.25rem] sm:text-[3.75rem]" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <span className="label pb-1">{project.status}</span>
      </div>
      <div>
        <h3 className="card-title m-0 serif text-[2rem] leading-[1.02] tracking-[-0.02em] sm:text-[2.35rem]">{project.name}</h3>
        <p className="m-0 mt-3 serif-text text-[1.15rem] italic leading-snug text-ink-soft">{project.kicker}</p>
      </div>
      <p className="m-0 max-w-[46ch] text-[0.95rem] leading-relaxed text-muted">{project.summary}</p>
      <span className="arrow-link mt-1">
        Read on <Arrow />
      </span>
    </Link>
  );
}
