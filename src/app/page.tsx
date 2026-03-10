import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/project-card";
import BlogCard from "@/components/blog-card";
import SectionHeading from "@/components/section-heading";

const FEATURED_PROJECTS = [
  {
    title: "GutenBites.com",
    description:
      "A podcast platform delivering concise summaries of classic literature and historical works in 7-15 minute audio experiences.",
    technologies: ["Podcasting", "Content", "Audio"],
    project_url: "https://gutenbites.com/",
    github_url: null,
  },
  {
    title: "JamesGilmore.xyz",
    description:
      "My personal portfolio website, built with Python and Flask.",
    technologies: ["Python", "Flask", "Bootstrap", "PostgreSQL"],
    project_url: "https://www.JamesGilmore.xyz",
    github_url: null,
  },
];

const LATEST_POSTS = [
  {
    title: "Setbacks as Stepping Stones",
    slug: "setbacks-as-stepping-stones",
    excerpt:
      "We often think of setbacks as obstacles or roadblocks that slow us down. But if we look closely, setbacks can actually be stepping stones.",
    category: "Failure",
    created_at: "2025-08-19",
  },
  {
    title: "We all start as strangers",
    slug: "we-all-start-as-strangers",
    excerpt:
      "In many respects, we grow up being told to avoid strangers. But when does a stranger stop being a stranger?",
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
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="py-20 sm:py-28">
        <div className="flex flex-col-reverse items-start gap-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
              James Gilmore
            </h1>
            <p className="mt-4 text-xl text-gold sm:text-2xl">
              Building data tools and automation with Python
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              Data analyst and engineer focused on building automation tools,
              analysis platforms, and data pipelines. I enjoy turning complex
              data challenges into clean, efficient solutions.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-gold-light"
              >
                View Projects
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-gold hover:text-gold"
              >
                Read Blog
              </Link>
            </div>
          </div>

          <Image
            src="/profile.jpg"
            alt="James Gilmore"
            width={200}
            height={200}
            className="rounded-full border-2 border-border object-cover"
            priority
          />
        </div>
      </section>

      {/* Featured Projects */}
      <section className="pb-20">
        <SectionHeading
          title="Featured Projects"
          subtitle="Projects I've built."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {FEATURED_PROJECTS.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light transition-colors"
          >
            View all projects
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="pb-24">
        <SectionHeading
          title="Latest Posts"
          subtitle="Reflections on growth, travel, and building things."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LATEST_POSTS.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light transition-colors"
          >
            Read all posts
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
