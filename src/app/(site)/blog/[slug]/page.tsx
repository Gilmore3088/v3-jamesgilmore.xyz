import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug, getAllSlugs } from "@/lib/data";
import { renderMarkdown, estimateReadingTime } from "@/lib/markdown";

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
    return { title: "Post Not Found | James Gilmore" };
  }

  return {
    title: `${post.title} | James Gilmore`,
    description: post.excerpt ?? post.content.slice(0, 160).trim(),
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

  return (
    <div className="noise-bg min-h-screen">
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
