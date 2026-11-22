import Link from "next/link";
import Arrow from "@/components/arrow";
import Container from "@/components/container";
import PathList from "@/components/path-list";
import Portrait from "@/components/portrait";
import ProjectCard from "@/components/project-card";
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
        <section className="grid gap-10 pb-16 pt-10 sm:pt-16 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-20">
          <Portrait className="rise w-[7.5rem] sm:w-[9rem] lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:w-full" sizes="(min-width: 1024px) 18rem, 9rem" priority />
          <div className="rise min-w-0 lg:col-span-8 lg:row-start-1">
            <p className="label m-0">
              {site.name} <span aria-hidden="true" className="mx-2 text-line-strong">/</span> {home.eyebrow}
            </p>
            <h1 className="display m-0 mt-5 max-w-[16ch] text-[2.6rem] xs:text-[3rem] sm:text-[3.8rem] md:text-[4.4rem] lg:text-[5.2rem]">
              <Emphasis text={home.headline} />
            </h1>
          </div>
          <div className="rise rise-1 min-w-0 lg:col-span-7 lg:col-start-5 lg:row-start-2">
            <p className="deck m-0 text-[1.3rem] leading-[1.45] text-ink-soft sm:text-[1.5rem]">{home.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4">
              <Link href="/about" className="arrow-link">
                {home.aboutCta} <Arrow />
              </Link>
              <Link href="/contact" className="arrow-link">
                {home.contactCta} <Arrow />
              </Link>
            </div>
          </div>
        </section>
      </Container>

      {/* Background */}
      <Container>
        <section aria-labelledby="background-heading" className="grid gap-10 border-t border-ink pt-7 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 lg:col-span-4">
            <p className="label m-0">{home.backgroundLabel}</p>
            <h2 id="background-heading" className="display m-0 mt-4 max-w-[18ch] text-[1.9rem] sm:text-[2.3rem]">
              {home.backgroundTitle}
            </h2>
            <p className="mt-6">
              <Link href="/about" className="arrow-link">
                {home.aboutCta} <Arrow />
              </Link>
            </p>
          </div>
          <div className="min-w-0 lg:col-span-8">
            <PathList />
          </div>
        </section>
      </Container>

      {/* Projects */}
      <Container>
        <section id="projects" aria-labelledby="projects-heading" className="mt-24 grid gap-10 border-t border-ink pt-7 lg:mt-32 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 lg:col-span-4">
            <p className="label m-0">{home.projectsLabel}</p>
            <h2 id="projects-heading" className="display m-0 mt-4 max-w-[18ch] text-[1.9rem] sm:text-[2.3rem]">
              {home.projectsTitle}
            </h2>
            <p className="mt-6">
              <Link href="/projects" className="arrow-link">
                All projects <Arrow />
              </Link>
            </p>
          </div>
          <div className="grid gap-12 sm:grid-cols-2 sm:gap-8 lg:col-span-8">
            {projects.slice(0, 2).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </Container>

      {/* Approach */}
      <Container>
        <section aria-labelledby="approach-heading" className="mt-24 grid gap-10 border-t border-ink pt-7 lg:mt-32 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 lg:col-span-4">
            <p className="label m-0">{home.approachLabel}</p>
            <h2 id="approach-heading" className="display m-0 mt-4 max-w-[18ch] text-[1.9rem] sm:text-[2.3rem]">
              {home.approachTitle}
            </h2>
          </div>
          <ul className="m-0 grid list-none p-0 lg:col-span-8">
            {home.principles.map((p) => (
              <li key={p.title} className="grid gap-2 border-t border-line py-6 first:border-t-0 first:pt-0 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-8">
                <h3 className="m-0 serif text-[1.35rem] leading-tight tracking-[-0.01em]">{p.title}</h3>
                <p className="m-0 max-w-[54ch] serif-text text-[1.08rem] leading-[1.55] text-ink-soft">{p.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
