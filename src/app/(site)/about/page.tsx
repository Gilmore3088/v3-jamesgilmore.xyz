import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Arrow from "@/components/arrow";
import Container from "@/components/container";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: site.about.lede,
  alternates: { canonical: "/about" },
  openGraph: { title: `About · ${site.name}`, description: site.about.lede, url: "/about" },
};

export default function AboutPage() {
  const { about } = site;

  return (
    <Container>
      <header className="rise grid gap-6 pb-12 pt-12 sm:pt-20 lg:grid-cols-12 lg:gap-8 lg:pb-16">
        <div className="min-w-0 lg:col-span-10">
          <p className="label m-0">About</p>
          <h1 className="display m-0 mt-4 max-w-[18ch] text-[2.6rem] xs:text-[3rem] sm:text-[3.8rem] lg:text-[4.5rem]">{about.title}</h1>
        </div>
        <p className="deck m-0 max-w-[40ch] text-[1.3rem] leading-[1.45] text-ink-soft lg:col-span-7 lg:col-start-6 sm:text-[1.5rem]">{about.lede}</p>
      </header>

      <div className="grid gap-12 border-t border-ink pt-9 lg:grid-cols-12 lg:gap-8 lg:pt-10">
        {about.photo && (
          <figure className="m-0 min-w-0 max-w-[16rem] lg:col-span-4 lg:max-w-[20rem]">
            <Image
              src={about.photo.src}
              alt={about.photo.alt}
              width={400}
              height={400}
              sizes="(min-width: 1024px) 20rem, 16rem"
              className="block aspect-square h-auto w-full max-w-full object-cover"
              priority
            />
            <figcaption className="label mt-3">{about.photo.caption}</figcaption>
          </figure>
        )}

        <div className={`min-w-0 max-w-[40rem] ${about.photo ? "lg:col-span-7 lg:col-start-6" : "lg:col-span-8 lg:col-start-5"}`}>
          {about.paragraphs.map((para, i) => (
            <p key={para} className={`m-0 serif-text text-[1.15rem] leading-[1.6] text-ink-soft ${i === 0 ? "" : "mt-6"}`}>
              {para}
            </p>
          ))}
          <p className="mt-10 border-t border-line pt-6 serif-text text-[1.15rem] leading-[1.6] text-ink">{about.lifeLine}</p>

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
    </Container>
  );
}
