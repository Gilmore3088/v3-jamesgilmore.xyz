import Link from "next/link";
import Arrow from "@/components/arrow";
import Container from "@/components/container";
import Mosaic from "@/components/mosaic";
import { getPhoto } from "@/components/photo";
import WorldMap from "@/components/world-map";
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />

      {/* Opening: a short blurb, then the map draws the route and the world fills in */}
      <Container>
        <section className="pt-24 sm:pt-28">
          <div className="rise grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="min-w-0 lg:col-span-7">
              <p className="label m-0">
                {site.name} · {home.eyebrow}
              </p>
              <h1 className="display m-0 mt-3 max-w-[16ch] text-[2.4rem] xs:text-[2.7rem] sm:text-[3.2rem] lg:text-[3.6rem]">
                <Emphasis text={home.headline} />
              </h1>
            </div>
            <div className="min-w-0 lg:col-span-5">
              <p className="deck m-0 max-w-[40ch] text-[1.1rem] text-ink-soft sm:text-[1.2rem]">{home.intro}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
                <Link href="/about" className="arrow-link">
                  {home.aboutCta} <Arrow />
                </Link>
                <Link href="/contact" className="arrow-link">
                  {home.contactCta} <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Container>
      <section aria-label="Where I have lived and been" className="mt-8 lg:mt-10">
        <WorldMap intro layout="hero" />
        <Container>
          <p className="m-0 mt-3 text-[0.95rem] text-muted">{home.mapHint}</p>
        </Container>
      </section>

      {/* Lately */}
      <Container>
        <section aria-labelledby="lately-heading" className="mt-16 lg:mt-24">
          <h2 id="lately-heading" className="label m-0">
            {home.latelyLabel}
          </h2>
          <dl className="m-0 mt-5 grid gap-3 sm:grid-cols-3">
            {home.lately.map((item) => (
              <div key={item.label} className="panel min-w-0 p-6">
                <dt className="text-[1.3rem] font-bold leading-tight">{item.label}</dt>
                <dd className="body-text m-0 mt-3 text-[1.05rem] text-ink-soft">{item.text}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Container>

      {/* Mosaic */}
      <Container>
        <section aria-labelledby="places-heading" className="mt-24 lg:mt-32">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
            <div>
              <p className="label m-0">{home.placesLabel}</p>
              <h2 id="places-heading" className="title m-0 mt-3 text-[2.4rem] sm:text-[3rem]">
                {home.placesTitle}
              </h2>
            </div>
            <p className="body-text m-0 max-w-[40ch] text-[1.05rem] text-muted">{home.placesNote}</p>
          </div>
          <div className="mt-8">
            <Mosaic photos={band} />
          </div>
          <p className="mt-8">
            <Link href="/places" className="arrow-link">
              All the places, by trip <Arrow />
            </Link>
          </p>
        </section>
      </Container>

      {/* Questions */}
      <Container>
        <section aria-labelledby="questions-heading" className="mt-24 grid gap-10 lg:mt-32 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 lg:col-span-4">
            <p className="label m-0">{home.questionsLabel}</p>
            <h2 id="questions-heading" className="title m-0 mt-4 max-w-[16ch] text-[2.4rem] sm:text-[3rem]">
              {home.questionsTitle}
            </h2>
          </div>
          <ol className="m-0 grid list-none gap-3 p-0 lg:col-span-8">
            {home.questions.map((q) => (
              <li key={q.question} className="panel p-6 sm:p-8">
                <h3 className="title m-0 max-w-[26ch] text-[1.6rem] sm:text-[1.9rem]">{q.question}</h3>
                <p className="body-text m-0 mt-3 max-w-[58ch] text-[1.1rem] text-ink-soft">{q.body}</p>
                <p className="m-0 mt-5">
                  <Link href={q.href} className="arrow-link">
                    {q.cta} <Arrow />
                  </Link>
                </p>
              </li>
            ))}
          </ol>
        </section>
      </Container>

      {/* Work, briefly */}
      <Container>
        <section aria-labelledby="work-heading" className="mt-24 grid gap-10 lg:mt-32 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 lg:col-span-4">
            <p className="label m-0">{home.projectsLabel}</p>
            <h2 id="work-heading" className="title m-0 mt-4 max-w-[16ch] text-[2.4rem] sm:text-[3rem]">
              {home.projectsTitle}
            </h2>
            <p className="body-text m-0 mt-4 max-w-[34ch] text-[1.05rem] text-muted">{home.projectsNote}</p>
            <p className="mt-6">
              <Link href="/projects" className="arrow-link">
                All projects <Arrow />
              </Link>
            </p>
          </div>
          <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:col-span-8">
            {projects.slice(0, 2).map((project) => (
              <li key={project.slug} className="min-w-0">
                <Link href={`/projects/${project.slug}`} className="card panel block h-full p-6 sm:p-7">
                  <h3 className="card-title title m-0 text-[1.6rem]">{project.name}</h3>
                  <p className="m-0 mt-2 text-[1.1rem] font-medium leading-snug text-ink-soft">{project.kicker}</p>
                  <p className="body-text m-0 mt-3 text-[1rem] text-muted">{project.summary}</p>
                  <span className="arrow-link mt-5">
                    Read more <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
