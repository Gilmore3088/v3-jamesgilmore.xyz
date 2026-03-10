import type { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { getAllPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog | James Gilmore",
  description:
    "Reflections on growth, travel, data, and building things by James Gilmore.",
};

export const revalidate = 60;

const ANIMATION_DELAYS = [
  "animation-delay-100",
  "animation-delay-200",
  "animation-delay-300",
  "animation-delay-400",
] as const;

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [featuredPost, ...remainingPosts] = posts;

  if (!featuredPost) {
    return (
      <div className="noise-bg min-h-screen">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <header className="mb-16 animate-fade-up">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold mb-4">
              Journal
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-gold-gradient leading-tight">
              Blog
            </h1>
            <p className="mt-4 max-w-xl text-text-secondary text-lg leading-relaxed">
              No posts yet. Check back soon.
            </p>
            <hr className="hr-gold mt-8 max-w-[120px]" />
          </header>
        </div>
      </div>
    );
  }

  return (
    <div className="noise-bg min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Editorial header */}
        <header className="mb-16 animate-fade-up">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold mb-4">
            Journal
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-gold-gradient leading-tight">
            Blog
          </h1>
          <p className="mt-4 max-w-xl text-text-secondary text-lg leading-relaxed">
            Reflections on growth, travel, and building things.
          </p>
          <hr className="hr-gold mt-8 max-w-[120px]" />
        </header>

        {/* Featured / latest post - hero card */}
        <Link
          href={`/blog/${featuredPost.slug}`}
          className="group block animate-fade-up animation-delay-100"
        >
          <article className="relative rounded-lg border border-border bg-surface p-8 sm:p-12 transition-all duration-500 hover:gold-glow hover:border-gold/20">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold border border-gold/30 px-3 py-1 rounded-full">
                  {featuredPost.category}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
                  Latest
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-text-primary leading-snug group-hover:text-gold-gradient transition-colors duration-300">
                {featuredPost.title}
              </h2>

              <p className="text-text-secondary leading-relaxed max-w-2xl text-base sm:text-lg">
                {featuredPost.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <time
                  dateTime={featuredPost.created_at}
                  className="text-xs uppercase tracking-[0.2em] text-text-muted"
                >
                  {format(
                    new Date(featuredPost.created_at),
                    "MMMM d, yyyy"
                  )}
                </time>
                <span className="text-xs uppercase tracking-[0.2em] text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Read article
                </span>
              </div>
            </div>
          </article>
        </Link>

        {/* Remaining posts grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {remainingPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`group block animate-fade-up ${ANIMATION_DELAYS[index + 1] ?? "animation-delay-200"}`}
            >
              <article className="relative h-full rounded-lg border border-border bg-surface p-6 sm:p-8 transition-all duration-500 hover:gold-glow hover:border-gold/20 flex flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold border border-gold/30 px-3 py-1 rounded-full self-start">
                  {post.category}
                </span>

                <h3 className="mt-5 font-display text-xl sm:text-2xl text-text-primary leading-snug group-hover:text-gold-gradient transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="mt-3 text-sm text-text-secondary leading-relaxed flex-1">
                  {post.excerpt}
                </p>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <time
                    dateTime={post.created_at}
                    className="text-[10px] uppercase tracking-[0.2em] text-text-muted"
                  >
                    {format(new Date(post.created_at), "MMMM d, yyyy")}
                  </time>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Read
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
