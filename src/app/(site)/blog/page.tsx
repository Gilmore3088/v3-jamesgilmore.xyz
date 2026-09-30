import type { Metadata } from "next";
import BlogCard from "@/components/blog-card";
import { getAllPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Writing",
  description: "Occasional writing by James Gilmore on building things, growth, travel, and the systems that shape our world.",
  alternates: { canonical: "/blog" },
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <header className="animate-fade-up">
        <p className="eyebrow m-0">Journal</p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-gold-gradient sm:text-6xl">Writing</h1>
        <p className="mt-5 max-w-xl text-lg text-muted">Reflections on growth, travel, and building things. Some are essays. Some are just a thought I wanted to keep.</p>
      </header>

      <section className="py-12">
        {posts.length > 0 ? (
          <div className="border-t-2 border-ink">
            {posts.map((post) => <BlogCard key={post.slug} {...post} />)}
          </div>
        ) : (
          <p className="hand text-2xl">Nothing here yet. The first one is coming.</p>
        )}
      </section>
    </div>
  );
}
