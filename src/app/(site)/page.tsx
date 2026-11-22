import Link from "next/link";
import Arrow from "@/components/arrow";
import Container from "@/components/container";
import ProjectCard from "@/components/project-card";
import SectionHead from "@/components/section-head";
import { site } from "@/content/site";
import { Emphasis, plain } from "@/lib/emphasis";
import { jsonLd } from "@/lib/site";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: site.url,
      jobTitle: site.role,
      description: plain(site.home.headline),
      address: { "@type": "PostalAddress", addressLocality: "Seattle", addressRegion: "WA", addressCountry: "US" },
      sameAs: site.links.map((l) => l.href),
      knowsAbout: ["Banking technology", "Data analytics", "Workflow automation", "AI governance for financial institutions"],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      publisher: { "@id": `${site.url}/#person` },
      inLanguage: "en-US",
    },
  ],
};

export default function HomePage() {
  const { home, projects } = site;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />

      {/* Opening */}
      <Container>
        <section className="pb-20 pt-10 sm:pt-16 lg:pb-32 lg:pt-24">
          <p className="rise label m-0 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span>{site.name}</span>
            <span aria-hidden="true" className="text-evergreen">·</span>
            <span>{home.eyebrow}</span>
          </p>

          <h1 className="rise display m-0 mt-6 max-w-[14ch] text-[2.75rem] xs:text-[3.15rem] sm:text-[4.1rem] md:text-[4.9rem] lg:text-[5.9rem] xl:text-[6.6rem]">
            <Emphasis text={home.headline} />
          </h1>

          <div className="rise rise-1 mt-12 grid gap-10 border-t border-line pt-8 lg:mt-16 lg:grid-cols-12 lg:gap-8 lg:pt-10">
            <dl className="m-0 grid min-w-0 content-start gap-x-6 gap-y-4 text-sm xs:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
              {home.meta.map((m) => (
                <div key={m.label} className="min-w-0">
                  <dt className="label">{m.label}</dt>
                  <dd className="m-0 mt-1 serif-text text-[1.05rem] leading-snug text-ink">{m.value}</dd>
                </div>
              ))}
            </dl>

            <div className="min-w-0 lg:col-span-7 lg:col-start-6">
              <p className="deck m-0 text-[1.35rem] leading-[1.4] text-ink sm:text-[1.6rem] lg:text-[1.75rem]">
                <span className="label mr-3 inline-block align-[0.2em] text-ink">{home.dateline} —</span>
                {home.intro}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-10 gap-y-4">
                <Link href="/about" className="arrow-link">
                  About me <Arrow />
                </Link>
                <Link href="/contact" className="arrow-link">
                  Get in touch <Arrow />
                </Link>
                <a href="#projects" className="arrow-link text-muted hover:text-ink">
                  {home.scrollCue}
                  <svg viewBox="0 0 16 16" width="0.9em" height="0.9em" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="self-center">
                    <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </Container>

      {/* Projects */}
      <Container>
        <section id="projects" aria-labelledby="projects-heading" className="grid gap-10 border-t-2 border-ink pt-7 lg:grid-cols-12 lg:gap-8 lg:pt-9">
          <div className="lg:col-span-4">
            <SectionHead numeral="I" label={home.projectsLabel} title={home.projectsTitle} id="projects-heading" />
            <p className="mt-7">
              <Link href="/projects" className="arrow-link">
                All projects <Arrow />
              </Link>
            </p>
          </div>
          <div className="grid gap-12 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-line lg:col-span-8">
            {projects.slice(0, 2).map((project, i) => (
              <div key={project.slug} className={`min-w-0 ${i === 0 ? "sm:pr-8" : "sm:pl-8"}`}>
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </div>
        </section>
      </Container>

      {/* How I think */}
      <Container>
        <section aria-labelledby="thinking-heading" className="mt-28 grid gap-10 border-t-2 border-ink pt-7 lg:mt-36 lg:grid-cols-12 lg:gap-8 lg:pt-9">
          <div className="lg:col-span-4">
            <SectionHead numeral="II" label={home.thinkingLabel} title={home.thinkingTitle} id="thinking-heading" />
          </div>
          <ol className="m-0 grid list-none p-0 lg:col-span-8">
            {home.principles.map((p, i) => (
              <li key={p.title} className="grid gap-4 border-t border-line py-8 first:border-t-0 first:pt-0 sm:grid-cols-[5.5rem_1fr] sm:gap-6">
                <span className="numeral text-[2.75rem] sm:text-[3.25rem]" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <h3 className="m-0 serif text-[1.65rem] leading-tight tracking-[-0.015em] sm:text-[1.9rem]">{p.title}</h3>
                  <p className="m-0 mt-3 max-w-[54ch] serif-text text-[1.12rem] leading-[1.55] text-ink-soft">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </Container>

      {/* About + Contact */}
      <Container>
        <section aria-label="Elsewhere on the site" className="mt-28 grid gap-12 border-t-2 border-ink pt-7 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-line lg:mt-36 lg:pt-9">
          <div className="min-w-0 sm:pr-10">
            <h2 className="label m-0 flex items-baseline gap-3">
              <span className="numeral text-[1.5rem] not-italic" aria-hidden="true">III</span>
              <span>{home.aboutTeaser.label}</span>
            </h2>
            <p className="deck m-0 mt-5 max-w-[26ch] text-[1.6rem] leading-[1.2] sm:text-[1.9rem]">{home.aboutTeaser.text}</p>
            <p className="mt-7">
              <Link href="/about" className="arrow-link">
                {home.aboutTeaser.cta} <Arrow />
              </Link>
            </p>
          </div>
          <div className="min-w-0 sm:pl-10">
            <h2 className="label m-0 flex items-baseline gap-3">
              <span className="numeral text-[1.5rem] not-italic" aria-hidden="true">IV</span>
              <span>{home.contactTeaser.label}</span>
            </h2>
            <p className="deck m-0 mt-5 max-w-[26ch] text-[1.6rem] leading-[1.2] sm:text-[1.9rem]">{home.contactTeaser.text}</p>
            <p className="mt-7">
              <Link href="/contact" className="arrow-link">
                {home.contactTeaser.cta} <Arrow />
              </Link>
            </p>
          </div>
        </section>
      </Container>
    </>
  );
}
