import type { Metadata } from "next";
import BlogCard from "@/components/blog-card";
import SectionHeading from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Blog | James Gilmore",
  description:
    "Reflections on growth, travel, data, and building things by James Gilmore.",
};

const BLOG_POSTS = [
  {
    title: "Setbacks as Stepping Stones",
    slug: "setbacks-as-stepping-stones",
    excerpt:
      "We often think of setbacks as obstacles or roadblocks that slow us down. But if we look closely, setbacks can actually be stepping stones, giving us the push we need to grow stronger, sharper, and more resilient.",
    category: "Failure",
    created_at: "2025-08-19",
  },
  {
    title: "We all start as strangers",
    slug: "we-all-start-as-strangers",
    excerpt:
      "In many respects, we grow up being told to avoid strangers. But when does a stranger stop being a stranger? As we age, it seems increasingly challenging to meet new people.",
    category: "Connections",
    created_at: "2025-01-06",
  },
  {
    title: "Christmas - the gift of travel",
    slug: "christmas-the-gift-of-travel",
    excerpt:
      "The holidays have become an opportunity to explore the world, create lasting memories, and reflect on my relationship with the season.",
    category: "Travel",
    created_at: "2024-12-25",
  },
  {
    title: "Building a Path Forward: My First Blog",
    slug: "building-a-path-forward",
    excerpt:
      "Sometimes these posts will be short, more of a stream of consciousness. Other times they will be longer, well-thought-out reflections on life, my interests, and the process of growth.",
    category: "Welcome",
    created_at: "2024-10-18",
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <SectionHeading
        title="Blog"
        subtitle="Reflections on growth, travel, and building things."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {BLOG_POSTS.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
}
