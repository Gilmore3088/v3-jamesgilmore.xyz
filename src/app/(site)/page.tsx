import Link from "next/link";
import Arrow from "@/components/arrow";
import Container from "@/components/container";
import Photo, { getPhoto } from "@/components/photo";
import PhotoGrid from "@/components/photo-grid";
import Portrait from "@/components/portrait";
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
  const band = home.band.map(getPhoto).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const shown = new Set([...home.band, site.about.heroPhoto, "venice-us"]);
  const places = site.photos.filter((p) => !shown.has(p.src)).slice(0, 6);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />

      {/* Opening */}
      <Container>
        <section className="grid gap-10 pb-14 pt-10 sm:pt-16 lg:grid-cols-12 lg:gap-8 lg:pb-16 lg:pt-20">
          <Portrait className="rise w-[8rem] sm:w-[10rem] lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:w-full" sizes="(min-width: 1024px) 24rem, 10rem" priority caption />
          <div className="rise min-w-0 lg:col-span-8 lg:row-start-1">
            <p className="label m-0">
              {site.name} <span aria-hidden="true" className="mx-2 text-line-strong">/</span> {home.eyebrow}
            </p>
            <h1 className="display m-0 mt-5 max-w-[16ch] text-[2.5rem] xs:text-[2.9rem] sm:text-[3.6rem] md:text-[4.1rem] lg:text-[4.6rem]">
              <Emphasis text={home.headline} />
            </h1>
          </div>
          <div className="rise rise-1 min-w-0 lg:col-span-7 lg:row-start-2">
            <p className="deck m-0 max-w-[52ch] text-[1.25rem] leading-[1.45] text-ink-soft sm:text-[1.4rem]">{home.intro}</p>
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

      {/* Photo band */}
      {band.length > 0 && (
        <Container>
          <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {band.map((p, i) => (
              <Photo key={p.src} photo={p} aspect="aspect-[4/5] sm:aspect-[4/3]" sizes="(min-width: 1280px) 26rem, 32vw" priority={i === 0} caption={false} />
            ))}
          </div>
        </Container>
      )}

      {/* Traits */}
      <Container>
        <section aria-labelledby="traits-heading" className="mt-20 grid gap-10 border-t border-ink pt-7 lg:mt-28 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 lg:col-span-4">
            <p className="label m-0">{home.traitsLabel}</p>
            <h2 id="traits-heading" className="display m-0 mt-4 max-w-[18ch] text-[1.9rem] sm:text-[2.3rem]">
              {home.traitsTitle}
            </h2>
          </div>
          <ul className="m-0 grid list-none gap-8 p-0 sm:grid-cols-3 sm:gap-6 lg:col-span-8">
            {home.traits.map((t) => (
              <li key={t.title} className="min-w-0 border-t border-line pt-4">
                <h3 className="m-0 serif text-[1.4rem] leading-tight tracking-[-0.01em]">{t.title}</h3>
                <p className="m-0 mt-3 serif-text text-[1.05rem] leading-[1.55] text-ink-soft">{t.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      {/* Questions */}
      <Container>
        <section aria-labelledby="questions-heading" className="mt-20 grid gap-10 border-t border-ink pt-7 lg:mt-28 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 lg:col-span-4">
            <p className="label m-0">{home.questionsLabel}</p>
            <h2 id="questions-heading" className="display m-0 mt-4 max-w-[18ch] text-[1.9rem] sm:text-[2.3rem]">
              {home.questionsTitle}
            </h2>
          </div>
          <ol className="m-0 grid list-none p-0 lg:col-span-8">
            {home.questions.map((q) => (
              <li key={q.question} className="grid gap-3 border-t border-line py-7 first:border-t-0 first:pt-0">
                <h3 className="m-0 max-w-[28ch] serif text-[1.5rem] leading-[1.2] tracking-[-0.01em] sm:text-[1.75rem]">{q.question}</h3>
                <p className="m-0 max-w-[58ch] serif-text text-[1.05rem] leading-[1.55] text-ink-soft">{q.body}</p>
                <p className="m-0 mt-1">
                  <Link href={q.href} className="arrow-link">
                    {q.cta} <Arrow />
                  </Link>
                </p>
              </li>
            ))}
          </ol>
        </section>
      </Container>

      {/* Places */}
      <Container>
        <section aria-labelledby="places-heading" className="mt-20 border-t border-ink pt-7 lg:mt-28">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="min-w-0 lg:col-span-4">
              <p className="label m-0">{home.placesLabel}</p>
              <h2 id="places-heading" className="display m-0 mt-4 text-[1.9rem] sm:text-[2.3rem]">
                {home.placesTitle}
              </h2>
            </div>
            <p className="m-0 max-w-[40ch] serif-text text-[1.05rem] leading-[1.55] text-muted lg:col-span-5 lg:col-start-5 lg:mt-1">{home.placesNote}</p>
          </div>
          <div className="mt-10">
            <PhotoGrid photos={places} />
          </div>
          <p className="mt-8">
            <Link href="/about" className="arrow-link">
              More places, and the story <Arrow />
            </Link>
          </p>
        </section>
      </Container>

      {/* Work, briefly */}
      <Container>
        <section aria-labelledby="work-heading" className="mt-20 grid gap-10 border-t border-ink pt-7 lg:mt-28 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 lg:col-span-4">
            <p className="label m-0">{home.projectsLabel}</p>
            <h2 id="work-heading" className="display m-0 mt-4 max-w-[18ch] text-[1.9rem] sm:text-[2.3rem]">
              {home.projectsTitle}
            </h2>
            <p className="m-0 mt-4 max-w-[34ch] text-[0.95rem] leading-relaxed text-muted">{home.projectsNote}</p>
            <p className="mt-6">
              <Link href="/projects" className="arrow-link">
                All projects <Arrow />
              </Link>
            </p>
          </div>
          <ul className="m-0 grid list-none gap-8 p-0 sm:grid-cols-2 lg:col-span-8">
            {projects.slice(0, 2).map((project) => (
              <li key={project.slug} className="min-w-0 border-t border-line pt-4">
                <h3 className="m-0 serif text-[1.5rem] leading-tight tracking-[-0.01em]">
                  <Link href={`/projects/${project.slug}`} className="no-underline hover:text-evergreen">
                    {project.name}
                  </Link>
                </h3>
                <p className="m-0 mt-2 serif-text text-[1.05rem] leading-snug text-ink-soft">{project.kicker}</p>
                <p className="m-0 mt-3 max-w-[44ch] text-[0.95rem] leading-relaxed text-muted">{project.summary}</p>
                <p className="mt-4">
                  <Link href={`/projects/${project.slug}`} className="arrow-link">
                    Read more <Arrow />
                  </Link>
                </p>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
