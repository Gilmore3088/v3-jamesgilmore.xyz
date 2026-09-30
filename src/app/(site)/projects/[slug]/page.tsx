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
    return { title: "Project Not Found" };
  }

  const description = project.description?.slice(0, 160).trim()
    ?? "A project by James Gilmore";

  return {
    title: project.title,
    description,
    alternates: { canonical: `/projects/${slug}` },
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

const STATUS_LABELS: Record<string, { label: string }> = {
  completed: { label: "Shipped" },
  in_progress: { label: "Building" },
  archived: { label: "Retired" },
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
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-ink">
        <ArrowLeft size={14} /> All the stuff
      </Link>

      <header className="mt-8 animate-fade-up">
        <div className="flex flex-wrap items-center gap-2">
          {project.category && <span className="rounded-full eyebrow rounded-full border border-gold/40 px-3 py-1">{project.category}</span>}
          <span className="sticker">{statusInfo.label}</span>
          <time dateTime={project.created_at} className="hand text-lg">{formattedDate}</time>
          {hasCaseStudy && <span className="text-sm font-bold text-muted">{readingTime} min read</span>}
        </div>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{project.title}</h1>
        {project.description && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{project.description}</p>}
      </header>

      <div className="mt-6 flex flex-wrap items-center gap-3 animate-fade-up animation-delay-100">
        {project.technologies?.map((tech) => (
          <span key={tech} className="rounded-full border border-line bg-paper px-3 py-1 text-sm text-muted">{tech}</span>
        ))}
        {project.project_url && (
          <Link href={project.project_url} target="_blank" rel="noopener noreferrer" className="btn !py-2 !px-4 text-sm"><ExternalLink size={14} /> Visit</Link>
        )}
        {project.github_url && (
          <Link href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline !py-2 !px-4 text-sm"><Github size={14} /> Source</Link>
        )}
      </div>

      <hr className="hr-gold my-10" />

      {hasCaseStudy ? (
        <article className="prose-custom mx-auto max-w-2xl animate-fade-up animation-delay-200" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
      ) : (
        <p className="hand py-8 text-center text-2xl">The full story is still being written.</p>
      )}

      <hr className="hr-gold my-10" />

      <Link href="/projects" className="btn btn-outline"><ArrowLeft size={16} /> All the stuff</Link>
    </div>
  );
}
