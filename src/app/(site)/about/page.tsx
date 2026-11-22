import type { Metadata } from "next";
import Link from "next/link";
import Arrow from "@/components/arrow";
import Container from "@/components/container";
import DoList from "@/components/do-list";
import PathList from "@/components/path-list";
import PageHead from "@/components/page-head";
import Photo, { getPhoto } from "@/components/photo";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: site.about.lede,
  alternates: { canonical: "/about" },
  openGraph: { title: `About · ${site.name}`, description: site.about.lede, url: "/about" },
};

export default function AboutPage() {
  const { about } = site;
  const hero = getPhoto(about.heroPhoto);
  const pair = ["venice-us", "atacama"].map(getPhoto).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <PageHead label="About" title={about.title} />
      {hero && (
        <Container>
          <Photo photo={hero} aspect="aspect-[4/5] sm:aspect-[21/9]" sizes="(min-width: 1280px) 80rem, 100vw" priority caption={false} className="rise rise-1" />
        </Container>
      )}

      {/* Story */}
      <Container>
        <section className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 max-w-[40rem] lg:col-span-7">
            <p className="deck m-0 text-[1.35rem] text-ink sm:text-[1.5rem]">{about.lede}</p>
            {about.paragraphs.map((para) => (
              <p key={para} className="body-text m-0 mt-6 text-[1.2rem] text-ink-soft">
                {para}
              </p>
            ))}
            <p className="body-text m-0 mt-8 text-[1.2rem] font-medium text-ink">{about.lifeLine}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-5 lg:col-start-8">
            {pair.map((p, i) => (
              <Photo key={p.src} photo={p} aspect="aspect-[3/4]" sizes="(min-width: 1024px) 20vw, 45vw" className={i === 1 ? "mt-12" : ""} />
            ))}
          </div>
        </section>
      </Container>

      {/* Things I do */}
      <section aria-labelledby="do-heading" className="mt-24 bg-surface py-20 lg:mt-32 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 lg:col-span-4">
            <h2 id="do-heading" className="title m-0 text-[2.4rem] sm:text-[3rem]">
              {about.doLabel}
            </h2>
          </div>
          <div className="lg:col-span-8">
            <DoList />
          </div>
        </Container>
      </section>

      {/* Chapters */}
      <Container>
        <section aria-labelledby="chapters-heading" className="mt-24 lg:mt-32">
          <h2 id="chapters-heading" className="label m-0">
            In chapters
          </h2>
          <div className="mt-5">
            <PathList />
          </div>
        </section>
      </Container>

      <Container>
        <div className="mt-20 flex flex-wrap gap-x-8 gap-y-4 lg:mt-28">
          <Link href="/places" className="arrow-link">
            The places, by trip <Arrow />
          </Link>
          <Link href="/projects" className="arrow-link">
            What I&apos;m building <Arrow />
          </Link>
          <Link href="/contact" className="arrow-link">
            Get in touch <Arrow />
          </Link>
        </div>
      </Container>
    </>
  );
}
