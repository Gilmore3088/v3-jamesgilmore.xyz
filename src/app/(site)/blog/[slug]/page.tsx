import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight, FolderOpen, Mail } from "lucide-react";
import { getPostBySlug, getAllSlugs } from "@/lib/data";
import { renderMarkdown, estimateReadingTime } from "@/lib/markdown";
import { SITE_NAME, SITE_URL, jsonLd } from "@/lib/site";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const description = post.excerpt ?? post.content.slice(0, 160).trim();
  const url = `${SITE_URL}/blog/${slug}`;

  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description,
      publishedTime: post.created_at,
      modifiedTime: post.updated_at ?? post.created_at,
      authors: [SITE_NAME],
      section: post.category,
      tags: post.tags ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const sanitizedHtml = await renderMarkdown(post.content);
  const formattedDate = format(new Date(post.created_at), "MMMM d, yyyy");
  const readingTime = estimateReadingTime(post.content);
  const url = `${SITE_URL}/blog/${slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt ?? undefined,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.created_at,
    dateModified: post.updated_at ?? post.created_at,
    articleSection: post.category,
    keywords: Array.isArray(post.tags) ? post.tags.join(", ") : undefined,
    wordCount: post.content.split(/\s+/).length,
    inLanguage: "en-US",
    author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: SITE_NAME },
  };

  return (
    <div className="noise-bg min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Back link */}
        <div className="animate-fade-up">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-text-muted hover:text-gold transition-colors duration-300"
          >
            <ArrowLeft size={12} />
            Back to Journal
          </Link>
        </div>

        {/* Article header */}
        <header className="mt-12 animate-fade-up animation-delay-100">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold border border-gold/30 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <time
              dateTime={post.created_at}
              className="text-[10px] uppercase tracking-[0.2em] text-text-muted"
            >
              {formattedDate}
            </time>
            <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
              {readingTime} min read
            </span>
          </div>

          <h1 className="mt-6 font-display text-3xl sm:text-4xl lg:text-5xl text-gold-gradient leading-tight">
            {post.title}
          </h1>
        </header>

        {/* Gold rule before content */}
        <div className="animate-fade-up animation-delay-200">
          <hr className="hr-gold mt-10 mb-12" />
        </div>

        {/* Article content */}
        <div className="flex justify-center animate-fade-up animation-delay-300">
          <article
            className="prose-custom max-w-2xl w-full"
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          />
        </div>

        {/* Post-article CTAs */}
        <div className="mx-auto mt-16 grid max-w-2xl gap-4 sm:grid-cols-2 animate-fade-up animation-delay-400">
          <Link
            href="/projects"
            className="group flex flex-col rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:border-gold/40 hover:gold-glow"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-light text-gold transition-colors group-hover:border-gold/40">
              <FolderOpen size={16} />
            </span>
            <span className="mt-4 text-sm font-semibold text-text-primary transition-colors group-hover:text-gold">
              Enjoyed this?
            </span>
            <span className="mt-1 text-sm text-text-secondary">
              See what I have been building.
            </span>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.15em] text-gold">
              View projects <ArrowRight size={12} />
            </span>
          </Link>
          <Link
            href="/contact"
            className="group flex flex-col rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:border-gold/40 hover:gold-glow"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-light text-gold transition-colors group-hover:border-gold/40">
              <Mail size={16} />
            </span>
            <span className="mt-4 text-sm font-semibold text-text-primary transition-colors group-hover:text-gold">
              Want to work together?
            </span>
            <span className="mt-1 text-sm text-text-secondary">
              I am always up for a good problem.
            </span>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.15em] text-gold">
              Get in touch <ArrowRight size={12} />
            </span>
          </Link>
        </div>

        {/* Gold rule after content */}
        <div className="animate-fade-up animation-delay-400">
          <hr className="hr-gold mt-12 mb-10" />
        </div>

        {/* Footer navigation */}
        <div className="animate-fade-up animation-delay-500">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-text-muted hover:text-gold transition-colors duration-300"
          >
            <ArrowLeft size={12} />
            All articles
          </Link>
        </div>
      </div>
    </div>
  );
}
