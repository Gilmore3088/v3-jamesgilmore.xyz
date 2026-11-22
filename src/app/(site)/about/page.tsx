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
  const [first, second, ...rest] = about.paragraphs;

  return (
    <Container>
      <header className="rise grid gap-8 pb-12 pt-10 sm:pt-16 lg:grid-cols-12 lg:gap-8 lg:pb-16 lg:pt-20">
        <div className="min-w-0 lg:col-span-10">
          <p className="label m-0">About</p>
          <h1 className="display m-0 mt-5 max-w-[16ch] text-[2.75rem] xs:text-[3.2rem] sm:text-[4.2rem] lg:text-[5.4rem]">{about.title}</h1>
        </div>
        <p className="deck m-0 max-w-[40ch] text-[1.35rem] leading-[1.4] text-ink lg:col-span-6 lg:col-start-7 sm:text-[1.6rem]">{about.lede}</p>
      </header>

      <div className="grid gap-12 border-t-2 border-ink pt-9 lg:grid-cols-12 lg:gap-8 lg:pt-11">
        <aside className="min-w-0 lg:col-span-4">
          {about.photo && (
            <figure className="m-0 max-w-[17rem] lg:max-w-none">
              <Image
                src={about.photo.src}
                alt={about.photo.alt}
                width={400}
                height={400}
                sizes="(min-width: 1024px) 24rem, 17rem"
                className="block aspect-square h-auto w-full max-w-full object-cover"
                priority
              />
              <figcaption className="mt-3 serif-text text-sm italic text-muted">{about.photo.caption}</figcaption>
            </figure>
          )}
          <div className={about.photo ? "mt-10" : ""}>
            <p className="label m-0">{about.asideLabel}</p>
            <ul className="m-0 mt-3 list-none p-0 serif-text text-[1.05rem] leading-snug text-ink-soft">
              {about.aside.map((item) => (
                <li key={item} className="border-t border-line py-3 first:border-t-0 first:pt-0">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="min-w-0 max-w-[40rem] lg:col-span-7 lg:col-start-6">
          <p className="dropcap m-0 serif-text text-[1.22rem] leading-[1.6] text-ink-soft">{first}</p>
          {second && <p className="m-0 mt-6 serif-text text-[1.22rem] leading-[1.6] text-ink-soft">{second}</p>}

          <blockquote className="pullquote my-10 lg:-ml-10 lg:mr-6">{about.pullQuote}</blockquote>

          {rest.map((para) => (
            <p key={para} className="m-0 mt-6 first:mt-0 serif-text text-[1.22rem] leading-[1.6] text-ink-soft">
              {para}
            </p>
          ))}

          <p className="mt-10 border-t border-line pt-6 serif-text text-[1.22rem] italic leading-[1.6] text-ink">{about.lifeLine}</p>

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
