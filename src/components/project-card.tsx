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
    <div className="group rounded-lg border border-border bg-surface p-6 transition-colors hover:border-gold/60">
      <h3 className="text-lg font-semibold text-text-primary group-hover:text-gold transition-colors">
        {title}
      </h3>

      <p className="mt-2 text-sm text-text-secondary leading-relaxed">
        {description}
      </p>

      {technologies.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-surface-lighter px-3 py-1 text-xs font-medium text-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="mt-5 flex items-center gap-4">
        {project_url && (
          <Link
            href={project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-text-muted hover:text-gold transition-colors"
          >
            <ExternalLink size={14} />
            Live Demo
          </Link>
        )}
        {github_url && (
          <Link
            href={github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-text-muted hover:text-gold transition-colors"
          >
            <Github size={14} />
            Source
          </Link>
        )}
      </div>
    </div>
  );
}
