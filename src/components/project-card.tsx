import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types";

type ProjectCardProps = Pick<
  Project,
  "title" | "description" | "technologies" | "project_url" | "github_url"
>;

export default function ProjectCard({
  title,
  description,
  technologies,
  project_url,
  github_url,
}: ProjectCardProps) {
  return (
    <div className="group rounded-lg border border-border bg-surface p-6 pl-8 transition-all duration-300 relative hover:border-gold/40 hover:gold-glow">
      <div className="absolute left-0 top-0 h-full w-[2px] rounded-l-lg bg-gold/60" />

      <h3 className="font-display text-xl font-semibold text-text-primary transition-colors group-hover:text-gold">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>

      {technologies.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-3 py-1 text-xs font-medium text-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center gap-5">
        {project_url && (
          <Link
            href={project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-gold"
          >
            <ExternalLink size={14} />
            <span>Visit</span>
          </Link>
        )}
        {github_url && (
          <Link
            href={github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-gold"
          >
            <Github size={14} />
            <span>Source</span>
          </Link>
        )}
      </div>
    </div>
  );
}
