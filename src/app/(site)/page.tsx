import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/project-card";
import BlogCard from "@/components/blog-card";
import SectionHeading from "@/components/section-heading";
import Sticker, { ACCENT_BG, ACCENT_VAR } from "@/components/sticker";
import Currently from "@/components/currently";
import FactIcon from "@/components/fact-icon";
import { getFeaturedProjects, getLatestPosts, getNowItems } from "@/lib/data";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIAL, jsonLd } from "@/lib/site";
import { profile, type Accent } from "@/content/profile";

export const revalidate = 60;

const STICKER_ACCENTS: Accent[] = ["coral", "teal", "mustard"];
const STICKER_POSITIONS = [
  "-top-3 -left-6 -rotate-6",
  "top-[40%] -right-5 rotate-6",
  "bottom-[4.5rem] -left-5 -rotate-3",
];

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

export default async function HomePage() {
  const [projects, posts, nowItems] = await Promise.all([
    getFeaturedProjects(),
    getLatestPosts(3),
    getNowItems(),
  ]);
  const currently = nowItems ?? profile.currently;
  const tape = [...profile.tape, ...profile.tape];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(STRUCTURED_DATA) }} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <header className="grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)] lg:gap-12">
          <div className="animate-fade-up">
            <p className="hand m-0 inline-block -rotate-2 text-2xl text-coral">{profile.eyebrow}</p>
            <h1 className="mt-2 font-display text-4xl font-extrabold leading-[.98] tracking-tight text-balance sm:text-5xl lg:text-6xl xl:text-[4.5rem]">
              {profile.headline.before}
              <span className="hl">{profile.headline.highlight}</span>
              {profile.headline.after}
            </h1>
            <p className="mt-6 max-w-[42ch] text-lg leading-relaxed sm:text-xl">{profile.lede}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/projects" className="btn">Stuff I&apos;ve made <ArrowRight size={16} /></Link>
              <Link href="/contact" className="btn btn-outline">Say hi</Link>
            </div>
          </div>

          <figure className="animate-fade-up animation-delay-200 relative m-0 w-[min(100%,320px)] justify-self-start rotate-3 bg-paper p-3.5 pb-14 shadow-[0_20px_40px_-20px_rgba(28,26,31,.45)] transition-transform duration-300 hover:rotate-0 lg:w-[min(100%,340px)] lg:justify-self-center">
            <Image
              src="/profile.jpg"
              alt="James Gilmore"
              width={400}
              height={400}
              className="block aspect-square h-auto w-full object-cover"
              priority
              unoptimized
            />
            <figcaption className="hand absolute inset-x-0 bottom-3 text-center text-2xl">{profile.photoCaption}</figcaption>
            {profile.photoStickers.map((label, i) => (
              <Sticker key={label} accent={STICKER_ACCENTS[i % STICKER_ACCENTS.length]} className={`absolute ${STICKER_POSITIONS[i % STICKER_POSITIONS.length]}`}>
                {label}
              </Sticker>
            ))}
          </figure>
        </header>
      </div>

      {/* Tape */}
      <div className="overflow-hidden py-2" aria-hidden="true">
        <div className="-rotate-1 scale-[1.02] overflow-hidden whitespace-nowrap bg-ink py-3 font-display text-base font-semibold text-bg">
          <div className="tape-track">
            {tape.map((word, i) => (
              <span key={i} className="mx-6 after:ml-12 after:text-mustard after:content-['✦']">{word}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* The short version */}
        <section className="py-12">
          <SectionHeading title="The short version" note="(the long one is on the About page)" />
          <div className="grid gap-4 sm:grid-cols-2">
            {profile.facts.map((fact) => (
              <div key={fact.title} className="card grid min-w-0 grid-cols-[auto_1fr] items-start gap-4 p-5" style={{ ["--c" as string]: ACCENT_VAR[fact.accent] }}>
                <span className={`grid h-11 w-11 place-items-center rounded-xl text-ink ${ACCENT_BG[fact.accent]}`}>
                  <FactIcon name={fact.icon} />
                </span>
                <div>
                  <p className="m-0 font-display text-lg font-extrabold leading-tight tracking-tight">{fact.title}</p>
                  <p className="m-0 mt-1 text-[15px] leading-relaxed text-muted">{fact.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Currently */}
        <section className="py-12">
          <SectionHeading title="Currently" note="updated whenever I remember" />
          <Currently items={currently} />
        </section>

        {/* Stuff I've made */}
        <section className="py-12">
          <SectionHeading title="Stuff I've made" note="some useful, some just fun" />
          {projects.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-muted">Nothing featured yet. Check the projects page.</p>
          )}
          <p className="mt-6">
            <Link href="/projects" className="btn btn-outline">All the stuff <ArrowRight size={16} /></Link>
          </p>
        </section>

        {/* Things I believe */}
        <section className="py-12">
          <div className="grid gap-8 rounded-3xl bg-ink p-7 text-bg sm:p-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="m-0 font-display text-3xl font-extrabold leading-none tracking-tight sm:text-4xl">Things I believe</h2>
              <p className="hand m-0 mt-2 text-2xl text-mustard">{profile.beliefsNote}</p>
            </div>
            <ol className="m-0 grid list-none gap-4 p-0">
              {profile.beliefs.map((line, i) => (
                <li key={line} className="grid grid-cols-[2.4rem_1fr] items-baseline gap-2 font-display text-lg font-semibold leading-snug sm:text-xl">
                  <span className="hand text-2xl text-coral">{String(i + 1).padStart(2, "0")}</span>
                  {line}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Ask me about */}
        <section className="py-12">
          <SectionHeading title="Ask me about" note="I will not be brief" />
          <div className="flex flex-wrap gap-2.5">
            {profile.askMeAbout.map((topic) => (
              <span key={topic} className="rounded-full border-2 border-ink bg-paper px-4 py-2 text-[15px] font-bold transition-transform hover:-rotate-2 hover:scale-105 hover:bg-mustard">
                {topic}
              </span>
            ))}
          </div>
        </section>

        {/* Writing */}
        <section className="py-12">
          <SectionHeading title="Writing" note="occasionally" />
          {posts.length > 0 ? (
            <div className="border-t-2 border-ink">
              {posts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
          ) : (
            <p className="text-muted">No posts yet. Soon.</p>
          )}
          <p className="mt-6">
            <Link href="/blog" className="btn btn-outline">All writing <ArrowRight size={16} /></Link>
          </p>
        </section>

        {/* Say hi */}
        <section className="py-14 text-center sm:py-20">
          <p className="hand m-0 inline-block -rotate-3 text-2xl text-teal">{profile.hello.hand}</p>
          <h2 className="mt-1 font-display text-4xl font-extrabold leading-none tracking-tight sm:text-6xl">{profile.hello.title}</h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-lg text-muted">{profile.hello.text}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn">Send a note</Link>
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline">LinkedIn</a>
            <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">GitHub</a>
          </div>
        </section>
      </div>
    </>
  );
}
