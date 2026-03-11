import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types";

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  completed: {
    label: "Shipped",
    className: "border-gold/30 text-gold",
  },
  in_progress: {
    label: "Building",
    className: "border-gold/20 text-gold/70",
  },
  archived: {
    label: "Archived",
    className: "border-border text-text-muted",
  },
};

interface ProjectCardProps {
  project: Project;
  variant?: "featured" | "listing";
}

export default function ProjectCard({ project, variant = "listing" }: ProjectCardProps) {
  const { title, slug, description, technologies, project_url, github_url, status, category } = project;
  const isFeatured = variant === "featured";
  const statusInfo = STATUS_LABELS[status] ?? STATUS_LABELS.completed;

  return (
    <Link
      href={`/projects/${slug}`}
      className={`group block rounded-lg border border-border bg-surface p-8 transition-all duration-300 relative hover:border-gold/30 hover:gold-glow hover:-translate-y-[2px] ${
        isFeatured ? "pl-8" : ""
      }`}
    >
      {isFeatured && (
        <div className="absolute left-0 top-0 h-full w-[2px] rounded-l-lg bg-gold/60" />
      )}

      <div className="flex items-center gap-2 mb-3">
        {category && (
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
            {category}
          </span>
        )}
        {status && status !== "completed" && (
          <span className={`text-[10px] font-semibold uppercase tracking-[0.2em] border px-2 py-0.5 rounded-full ${statusInfo.className}`}>
            {statusInfo.label}
          </span>
        )}
      </div>

      <h3 className="font-display text-xl font-semibold text-text-primary transition-colors duration-300 group-hover:text-gold">
        {title}
      </h3>

      <p className="mt-3 text-sm text-text-secondary leading-relaxed line-clamp-3">
        {description}
      </p>

      {technologies && technologies.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-3 py-1 text-xs font-medium text-text-muted transition-colors duration-300 group-hover:border-gold/20 group-hover:text-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center gap-5">
        {project_url && (
          <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.15em] text-text-muted transition-colors duration-300 group-hover:text-gold">
            <ExternalLink size={13} />
            Visit
          </span>
        )}
        {github_url && (
          <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.15em] text-text-muted transition-colors duration-300 group-hover:text-gold">
            <Github size={13} />
            Source
          </span>
        )}
      </div>
    </Link>
  );
}
