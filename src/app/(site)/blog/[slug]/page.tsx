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
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />

      <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-ink">
        <ArrowLeft size={14} /> All writing
      </Link>

      <header className="mt-8 animate-fade-up">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full eyebrow rounded-full border border-gold/40 px-3 py-1">{post.category}</span>
          <time dateTime={post.created_at} className="hand text-lg">{formattedDate}</time>
          <span className="text-sm font-bold text-muted">{readingTime} min read</span>
        </div>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">{post.title}</h1>
      </header>

      <hr className="hr-gold my-10" />

      <article className="prose-custom mx-auto max-w-2xl animate-fade-up animation-delay-200" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />

      {/* After the post */}
      <div className="mx-auto mt-14 grid max-w-2xl gap-4 sm:grid-cols-2">
        <Link href="/projects" className="card card-accent card-lift grid content-start gap-2 p-5 no-underline" style={{ ["--c" as string]: "var(--color-mint)" }}>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-paper-2/15 text-mint"><FolderOpen size={18} /></span>
          <p className="m-0 font-display text-lg font-semibold tracking-tight">Enjoyed this?</p>
          <p className="m-0 text-[15px] text-muted">See what I&apos;ve been building.</p>
          <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-gold">Stuff I made <ArrowRight size={14} /></span>
        </Link>
        <Link href="/contact" className="card card-accent card-lift grid content-start gap-2 p-5 no-underline" style={{ ["--c" as string]: "var(--color-coral)" }}>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-coral/15 text-coral"><Mail size={18} /></span>
          <p className="m-0 font-display text-lg font-semibold tracking-tight">Want to argue about it?</p>
          <p className="m-0 text-[15px] text-muted">I am always up for a good conversation.</p>
          <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-gold">Say hi <ArrowRight size={14} /></span>
        </Link>
      </div>

      <hr className="hr-gold my-10" />

      <Link href="/blog" className="btn btn-outline"><ArrowLeft size={16} /> All writing</Link>
    </div>
  );
}
