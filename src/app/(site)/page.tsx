import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/project-card";
import BlogCard from "@/components/blog-card";
import SectionHeading from "@/components/section-heading";
import { getFeaturedProjects, getLatestPosts } from "@/lib/data";

export const revalidate = 60;

export default async function HomePage() {
  const projects = await getFeaturedProjects();
  const posts = await getLatestPosts(3);

  return (
    <div className="noise-bg">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="py-24 sm:py-32">
          <div className="flex flex-col-reverse items-start gap-12 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <h1 className="animate-fade-up font-display text-5xl font-semibold tracking-tight text-gold-gradient sm:text-6xl lg:text-7xl">
                James Gilmore
              </h1>

              <p className="animate-fade-up animation-delay-100 mt-5 text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
                Builder &amp; Systems Thinker
              </p>

              <p className="animate-fade-up animation-delay-200 mt-6 text-lg leading-relaxed text-text-secondary">
                Building systems, exploring ideas, and taking advantage of the most creative technological moment in history.
              </p>

              <div className="animate-fade-up animation-delay-300 mt-10 flex flex-wrap gap-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-gold-light"
                >
                  View Projects
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-lg border border-gold/40 px-6 py-3 text-sm font-semibold text-gold transition-colors hover:border-gold hover:bg-gold/5"
                >
                  Read Blog
                </Link>
              </div>
            </div>

            <div className="animate-fade-up animation-delay-200 shrink-0">
              <div className="w-[250px] overflow-hidden rounded-2xl ring-2 ring-gold/50 ring-offset-2 ring-offset-background">
                <Image
                  src="/profile.jpg"
                  alt="James Gilmore"
                  width={400}
                  height={400}
                  className="block w-full h-auto"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>
        </section>

        <hr className="hr-gold opacity-30" />

        {/* Featured Projects */}
        <section className="py-20">
          <div className="animate-fade-up">
            <SectionHeading
              title="Featured Projects"
              subtitle="Selected work in data, content, and engineering."
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project, i) => (
              <div
                key={project.id}
                className={`animate-fade-up animation-delay-${(i + 1) * 100}`}
              >
                <ProjectCard project={project} variant="featured" />
              </div>
            ))}
          </div>
          <div className="animate-fade-up animation-delay-300 mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-gold-light"
            >
              View all projects
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        <hr className="hr-gold opacity-30" />

        {/* Latest Posts */}
        <section className="py-20 pb-28">
          <div className="animate-fade-up">
            <SectionHeading
              title="Latest Posts"
              subtitle="Reflections on growth, travel, and building things."
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <div
                key={post.slug}
                className={`animate-fade-up animation-delay-${(i + 1) * 100}`}
              >
                <BlogCard {...post} />
              </div>
            ))}
          </div>
          <div className="animate-fade-up animation-delay-400 mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-gold-light"
            >
              Read all posts
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
