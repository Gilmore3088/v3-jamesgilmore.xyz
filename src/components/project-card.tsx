import Link from "next/link";
import Arrow from "@/components/arrow";
import type { Project } from "@/content/site";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="card group grid min-w-0 content-start gap-4 border-t border-ink pt-5">
      <div>
        <h3 className="card-title m-0 serif text-[1.85rem] leading-[1.08] tracking-[-0.015em] sm:text-[2.1rem]">{project.name}</h3>
        <p className="m-0 mt-2 serif-text text-[1.1rem] leading-snug text-ink-soft">{project.kicker}</p>
      </div>
      <p className="m-0 max-w-[46ch] text-[0.95rem] leading-relaxed text-muted">{project.summary}</p>
      <span className="arrow-link mt-1">
        Read more <Arrow />
      </span>
    </Link>
  );
}
