import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/project-card";
import BlogCard from "@/components/blog-card";
import SectionHeading from "@/components/section-heading";
import Currently from "@/components/currently";
import FactIcon from "@/components/fact-icon";
import { ACCENT_BG } from "@/components/sticker";
import { getFeaturedProjects, getLatestPosts, getNowItems } from "@/lib/data";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIAL, jsonLd } from "@/lib/site";
import { profile } from "@/content/profile";

export const revalidate = 60;

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
      address: { "@type": "PostalAddress", addressLocality: "Seattle", addressRegion: "WA", addressCountry: "US" },
      sameAs: [SOCIAL.github, SOCIAL.linkedin],
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

function CompassRose() {
  return (
    <svg viewBox="0 0 120 120" width="120" height="120" aria-hidden="true" className="text-gold/40">
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />
      <path d="M60 8 L66 54 L60 60 L54 54 Z" fill="currentColor" />
      <path d="M60 112 L66 66 L60 60 L54 66 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <path d="M8 60 L54 54 L60 60 L54 66 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <path d="M112 60 L66 54 L60 60 L66 66 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <text x="60" y="6" textAnchor="middle" fontSize="7" fill="currentColor" fontFamily="serif">N</text>
    </svg>
  );
}

export default async function HomePage() {
  const [projects, posts, nowItems] = await Promise.all([getFeaturedProjects(), getLatestPosts(3), getNowItems()]);
  const currently = nowItems ?? profile.currently;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(STRUCTURED_DATA) }} />

      {/* Hero */}
      <div className="graticule">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <header className="relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)]">
            <div className="pointer-events-none absolute right-0 top-8 hidden lg:block"><CompassRose /></div>

            <div className="animate-fade-up">
              <p className="eyebrow m-0">{profile.coordinates} · Seattle</p>
              <p className="hand m-0 mt-5 text-2xl">{profile.eyebrow.replace(" →", "")}</p>
              <h1 className="mt-2 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                {profile.headline.before}
                <span className="hl">{profile.headline.highlight}</span>
                {profile.headline.after}
              </h1>
              <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted sm:text-xl">{profile.lede}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/projects" className="btn">Stuff I&apos;ve made <ArrowRight size={16} /></Link>
                <Link href="/contact" className="btn btn-outline">Say hi</Link>
              </div>
            </div>

            <figure className="animate-fade-up animation-delay-200 m-0 w-[min(100%,300px)] justify-self-start lg:w-[min(100%,340px)] lg:justify-self-center">
              <div className="frame">
                <Image src="/profile.jpg" alt="James Gilmore" width={400} height={400} className="block aspect-square h-auto w-full object-cover" priority unoptimized />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between gap-3">
                <span className="hand text-lg">{profile.photoCaption}</span>
                <span className="eyebrow">45.4408° N · 12.3155° E</span>
              </figcaption>
            </figure>
          </header>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* The short version */}
        <section className="py-14">
          <SectionHeading eyebrow="I · Field notes" title="The short version" note="the long one is on the About page" />
          <ol className="m-0 grid list-none gap-x-10 gap-y-2 p-0 lg:grid-cols-2">
            {profile.facts.map((fact, i) => (
              <li key={fact.title} className="grid grid-cols-[auto_1fr] items-start gap-5 border-b border-line py-5">
                <span className={`grid h-11 w-11 place-items-center rounded-full ${ACCENT_BG[fact.accent]}`}><FactIcon name={fact.icon} /></span>
                <div>
                  <p className="m-0 font-display text-lg font-semibold leading-snug tracking-tight">
                    <span className="hand mr-2 text-base">{String(i + 1).padStart(2, "0")}</span>{fact.title}
                  </p>
                  <p className="m-0 mt-1 text-[15px] leading-relaxed text-muted">{fact.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Currently */}
        <section className="py-14">
          <SectionHeading eyebrow="II · Present position" title="Currently" note="updated whenever I remember" />
          <Currently items={currently} />
        </section>

        {/* Projects */}
        <section className="py-14">
          <SectionHeading eyebrow="III · Expeditions" title="Stuff I've made" note="some useful, some just fun" />
          {projects.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
            </div>
          ) : (
            <p className="text-muted">Nothing featured yet. The full list is on the projects page.</p>
          )}
          <p className="mt-8"><Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-light">All projects <ArrowRight size={14} /></Link></p>
        </section>

        {/* Things I believe */}
        <section className="py-14">
          <div className="card grid gap-8 border-gold/30 p-8 sm:p-10 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:items-center">
            <div>
              <p className="eyebrow m-0">IV · Working principles</p>
              <h2 className="m-0 mt-2 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">Things I believe</h2>
              <p className="hand m-0 mt-2 text-xl">{profile.beliefsNote}</p>
            </div>
            <ol className="m-0 grid list-none gap-4 p-0">
              {profile.beliefs.map((line, i) => (
                <li key={line} className="grid grid-cols-[2.6rem_1fr] items-baseline gap-2 font-display text-lg leading-snug sm:text-xl">
                  <span className="hand text-base">{String(i + 1).padStart(2, "0")}</span>
                  {line}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Ask me about */}
        <section className="py-14">
          <SectionHeading eyebrow="V · Open conversations" title="Ask me about" note="I will not be brief" />
          <div className="flex flex-wrap gap-2.5">
            {profile.askMeAbout.map((topic) => (
              <span key={topic} className="rounded-full border border-line bg-paper px-4 py-2 text-sm text-ink transition-colors hover:border-gold/60 hover:text-gold">{topic}</span>
            ))}
          </div>
        </section>

        {/* Writing */}
        <section className="py-14">
          <SectionHeading eyebrow="VI · Journal" title="Writing" note="occasionally" />
          {posts.length > 0 ? (
            <div className="border-t border-line">{posts.map((post) => <BlogCard key={post.slug} {...post} />)}</div>
          ) : (
            <p className="text-muted">No posts yet. Soon.</p>
          )}
          <p className="mt-8"><Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-light">All writing <ArrowRight size={14} /></Link></p>
        </section>

        {/* Say hi */}
        <section className="py-16 text-center sm:py-24">
          <p className="hand m-0 text-2xl">{profile.hello.hand}</p>
          <h2 className="mt-2 font-display text-4xl font-semibold leading-tight tracking-tight text-gold-gradient sm:text-6xl">{profile.hello.title}</h2>
          <p className="mx-auto mt-5 max-w-[48ch] text-lg text-muted">{profile.hello.text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn">Send a note</Link>
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline">LinkedIn</a>
            <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">GitHub</a>
          </div>
        </section>
      </div>
    </>
  );
}
