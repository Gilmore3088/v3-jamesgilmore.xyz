import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/data";
import { renderMarkdown, estimateReadingTime } from "@/lib/markdown";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found | James Gilmore" };
  }

  const description = project.description?.slice(0, 160).trim()
    ?? "A project by James Gilmore";

  return {
    title: `${project.title} | James Gilmore`,
    description,
    openGraph: {
      title: project.title,
      description,
      type: "article",
      url: `https://jamesgilmore.xyz/projects/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
    },
  };
}

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

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const statusInfo = STATUS_LABELS[project.status] ?? STATUS_LABELS.completed;
  const formattedDate = format(new Date(project.created_at), "MMMM d, yyyy");
  const hasCaseStudy = project.content && project.content.trim().length > 0;

  let sanitizedHtml = "";
  let readingTime = 0;
  if (hasCaseStudy) {
    sanitizedHtml = await renderMarkdown(project.content!);
    readingTime = estimateReadingTime(project.content!);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    author: {
      "@type": "Person",
      name: "James Gilmore",
      url: "https://jamesgilmore.xyz",
    },
    dateCreated: project.created_at,
    dateModified: project.updated_at,
    url: `https://jamesgilmore.xyz/projects/${slug}`,
    ...(project.category && { genre: project.category }),
    ...(project.technologies?.length && { keywords: project.technologies.join(", ") }),
  };

  return (
    <div className="noise-bg min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Back link */}
        <div className="animate-fade-up">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-text-muted hover:text-gold transition-colors duration-300"
          >
            <ArrowLeft size={12} />
            Back to Projects
          </Link>
        </div>

        {/* Project header */}
        <header className="mt-12 animate-fade-up animation-delay-100">
          <div className="flex flex-wrap items-center gap-3">
            {project.category && (
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold border border-gold/30 px-3 py-1 rounded-full">
                {project.category}
              </span>
            )}
            <span className={`text-[10px] font-semibold uppercase tracking-[0.3em] border px-3 py-1 rounded-full ${statusInfo.className}`}>
              {statusInfo.label}
            </span>
            <time
              dateTime={project.created_at}
              className="text-[10px] uppercase tracking-[0.2em] text-text-muted"
            >
              {formattedDate}
            </time>
            {hasCaseStudy && (
              <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
                {readingTime} min read
              </span>
            )}
          </div>

          <h1 className="mt-6 font-display text-3xl sm:text-4xl lg:text-5xl text-gold-gradient leading-tight">
            {project.title}
          </h1>

          {project.description && (
            <p className="mt-4 text-lg leading-relaxed text-text-secondary max-w-2xl">
              {project.description}
            </p>
          )}
        </header>

        {/* Tech stack + links */}
        <div className="mt-8 animate-fade-up animation-delay-200">
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
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
            {project.project_url && (
              <Link
                href={project.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.15em] text-text-muted transition-colors hover:text-gold"
              >
                <ExternalLink size={13} />
                Visit Project
              </Link>
            )}
            {project.github_url && (
              <Link
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.15em] text-text-muted transition-colors hover:text-gold"
              >
                <Github size={13} />
                View Source
              </Link>
            )}
          </div>
        </div>

        {/* Gold rule */}
        <div className="animate-fade-up animation-delay-300">
          <hr className="hr-gold mt-10 mb-12" />
        </div>

        {/* Case study content */}
        {hasCaseStudy ? (
          <div className="flex justify-center animate-fade-up animation-delay-400">
            <article
              className="prose-custom max-w-2xl w-full"
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            />
          </div>
        ) : (
          <div className="animate-fade-up animation-delay-400 text-center py-12">
            <p className="text-text-muted">Case study coming soon.</p>
          </div>
        )}

        {/* Gold rule after content */}
        <div className="animate-fade-up animation-delay-500">
          <hr className="hr-gold mt-12 mb-10" />
        </div>

        {/* Footer navigation */}
        <div className="animate-fade-up animation-delay-600">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-text-muted hover:text-gold transition-colors duration-300"
          >
            <ArrowLeft size={12} />
            All projects
          </Link>
        </div>
      </div>
    </div>
  );
}
