import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import ProjectCard from "@/components/project-card";
import BlogCard from "@/components/blog-card";
import SectionHeading from "@/components/section-heading";
import { getFeaturedProjects, getLatestPosts } from "@/lib/data";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIAL, jsonLd } from "@/lib/site";

export const revalidate = 60;

const METRICS = [
  { value: "60+", label: "Financial institutions served" },
  { value: "$2M", label: "Cross-sold in a single year" },
  { value: "20+", label: "Hours saved every month through automation" },
  { value: "227%", label: "Peak revenue growth negotiated" },
] as const;

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      url: SITE_URL,
      image: `${SITE_URL}/profile.jpg`,
      jobTitle: "Client Services Manager",
      description: SITE_DESCRIPTION,
      worksFor: { "@type": "Organization", name: "Velocity Solutions" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Seattle",
        addressRegion: "WA",
        addressCountry: "US",
      },
      sameAs: [SOCIAL.github, SOCIAL.linkedin],
      knowsAbout: [
        "Data analysis",
        "Automation",
        "Financial technology",
        "Python",
        "Product strategy",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en-US",
    },
  ],
};

export default async function HomePage() {
  const projects = await getFeaturedProjects();
  const posts = await getLatestPosts(3);

  return (
    <div className="noise-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(STRUCTURED_DATA) }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="py-24 sm:py-32">
          <div className="flex flex-col-reverse items-start gap-12 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-text-muted">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
                </span>
                Open to interesting problems
              </p>

              <h1 className="animate-fade-up animation-delay-100 mt-6 font-display text-5xl font-semibold tracking-tight text-gold-gradient sm:text-6xl lg:text-7xl">
                James Gilmore
              </h1>

              <p className="animate-fade-up animation-delay-200 mt-5 text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
                Builder &amp; Systems Thinker
              </p>

              <p className="animate-fade-up animation-delay-300 mt-6 text-lg leading-relaxed text-text-secondary">
                {SITE_DESCRIPTION}
              </p>

              <p className="animate-fade-up animation-delay-300 mt-4 flex items-center gap-2 text-sm text-text-muted">
                <MapPin size={14} className="text-gold" aria-hidden="true" />
                Seattle, WA
              </p>

              <div className="animate-fade-up animation-delay-400 mt-10 flex flex-wrap gap-4">
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

        {/* Metrics bar */}
        <section
          aria-label="Career highlights"
          className="animate-fade-up animation-delay-400 rounded-lg border border-border"
        >
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-border sm:grid-cols-4">
            {METRICS.map((metric) => (
              <div key={metric.label} className="bg-surface px-6 py-7 sm:py-8">
                <dd className="font-display text-3xl font-semibold text-gold-gradient sm:text-4xl">
                  {metric.value}
                </dd>
                <dt className="mt-2 text-xs leading-relaxed text-text-muted sm:text-sm">
                  {metric.label}
                </dt>
              </div>
            ))}
          </dl>
        </section>

        <div className="py-10" />

        <hr className="hr-gold opacity-30" />

        {/* Featured Projects */}
        <section className="py-20">
          <div className="animate-fade-up">
            <SectionHeading
              title="Featured Projects"
              subtitle="Selected work in data, content, and engineering."
            />
          </div>
          {projects.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {projects.map((project, i) => (
                <div
                  key={project.id}
                  className={`animate-fade-up animation-delay-${Math.min(i + 1, 6) * 100}`}
                >
                  <ProjectCard project={project} variant="featured" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text-muted">Featured projects coming soon.</p>
          )}
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
        <section className="py-20">
          <div className="animate-fade-up">
            <SectionHeading
              title="Latest Posts"
              subtitle="Reflections on growth, travel, and building things."
            />
          </div>
          {posts.length > 0 ? (
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
          ) : (
            <p className="text-text-muted">No posts yet. Check back soon.</p>
          )}
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

        <hr className="hr-gold opacity-30" />

        {/* Closing CTA */}
        <section className="py-24 pb-32">
          <div className="animate-fade-up relative overflow-hidden rounded-lg border border-border bg-surface px-8 py-14 sm:px-14 sm:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
            />
            <div className="relative max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
                Work With Me
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-text-primary sm:text-4xl">
                Looking for a data analyst who automates the tedious stuff?
              </h2>
              <p className="mt-4 font-display text-2xl italic text-gold">
                Let&apos;s talk.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-gold-light"
                >
                  Get in Touch
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/resume"
                  className="inline-flex items-center gap-2 rounded-lg border border-gold/40 px-6 py-3 text-sm font-semibold text-gold transition-colors hover:border-gold hover:bg-gold/5"
                >
                  View Resume
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
