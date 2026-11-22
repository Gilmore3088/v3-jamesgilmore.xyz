import type { Metadata } from "next";
import Link from "next/link";
import Arrow from "@/components/arrow";
import Container from "@/components/container";
import PathList from "@/components/path-list";
import Photo, { getPhoto } from "@/components/photo";
import PhotoGrid from "@/components/photo-grid";
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
  const gallery = site.photos.filter((p) => p.src !== about.heroPhoto);

  return (
    <Container>
      <header className="rise grid gap-6 pb-10 pt-10 sm:pt-16 lg:grid-cols-12 lg:gap-8 lg:pb-12">
        <div className="min-w-0 lg:col-span-10">
          <p className="label m-0">About</p>
          <h1 className="display m-0 mt-4 max-w-[18ch] text-[2.7rem] xs:text-[3.1rem] sm:text-[3.9rem] lg:text-[4.9rem]">{about.title}</h1>
        </div>
        <p className="deck m-0 max-w-[44ch] text-[1.25rem] leading-[1.45] text-ink-soft lg:col-span-7 lg:col-start-6 sm:text-[1.4rem]">{about.lede}</p>
      </header>

      {hero && <Photo photo={hero} aspect="aspect-[4/5] sm:aspect-[16/9]" sizes="(min-width: 1280px) 80rem, 100vw" priority className="rise rise-1" />}

      <div className="mt-14 grid gap-12 pt-0 lg:mt-20 lg:grid-cols-12 lg:gap-8 lg:pt-10">
        <aside className="min-w-0 lg:col-span-4">
          <p className="label m-0">{about.doLabel}</p>
          <ul className="m-0 mt-3 list-none border-t border-line p-0">
            {about.iDo.map((line) => (
              <li key={line} className="border-b border-line py-3.5 serif text-[1.35rem] leading-snug text-ink">
                {line}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <p className="label m-0 mb-3">In chapters</p>
            <PathList compact />
          </div>
        </aside>

        <div className="min-w-0 max-w-[40rem] lg:col-span-7 lg:col-start-6">
          {about.paragraphs.map((para, i) => (
            <p key={para} className={`m-0 body-text text-[1.2rem] leading-[1.65] text-ink-soft ${i === 0 ? "" : "mt-6"}`}>
              {para}
            </p>
          ))}
          <p className="mt-10 border-t border-line pt-6 body-text text-[1.2rem] leading-[1.65] text-ink">{about.lifeLine}</p>

          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            <Link href="/projects" className="arrow-link">
              What I&apos;m building <Arrow />
            </Link>
            <Link href="/contact" className="arrow-link">
              Get in touch <Arrow />
            </Link>
          </div>
        </div>
      </div>

      <section aria-labelledby="places-heading" className="mt-20 pt-0 lg:mt-28">
        <p className="label m-0">Places</p>
        <h2 id="places-heading" className="display m-0 mt-4 text-[2.3rem] sm:text-[2.9rem]">
          Out in the world.
        </h2>
        <div className="mt-10">
          <PhotoGrid photos={gallery} />
        </div>
      </section>
    </Container>
  );
}
