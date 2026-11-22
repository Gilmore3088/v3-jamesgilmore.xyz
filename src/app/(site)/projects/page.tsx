import type { Metadata } from "next";
import Link from "next/link";
import Arrow from "@/components/arrow";
import Container from "@/components/container";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: site.projectsPage.lede,
  alternates: { canonical: "/projects" },
  openGraph: { title: `Projects · ${site.name}`, description: site.projectsPage.lede, url: "/projects" },
};

export default function ProjectsPage() {
  const { projectsPage, projects } = site;

  return (
    <Container>
      <header className="rise grid gap-8 pb-12 pt-10 sm:pt-16 lg:grid-cols-12 lg:gap-8 lg:pb-16 lg:pt-20">
        <div className="min-w-0 lg:col-span-5">
          <p className="label m-0">What I&apos;m building</p>
          <h1 className="display m-0 mt-5 text-[3.5rem] sm:text-7xl lg:text-[6rem]">{projectsPage.title}</h1>
        </div>
        <p className="deck m-0 max-w-[40ch] text-[1.35rem] leading-[1.4] text-ink lg:col-span-6 lg:col-start-7 lg:mt-3 sm:text-[1.6rem]">
          {projectsPage.lede}
        </p>
      </header>

      <ol className="m-0 list-none p-0">
        {projects.map((project, i) => (
          <li key={project.slug} className="grid gap-10 border-t-2 border-ink py-10 lg:grid-cols-12 lg:gap-8 lg:py-14">
            <div className="min-w-0 lg:col-span-5">
              <div className="flex items-end justify-between gap-4 lg:block">
                <span className="numeral block text-[4.5rem] sm:text-[5.5rem]" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="label pb-1 lg:hidden">{project.status}</span>
              </div>
              <h2 className="m-0 mt-6 serif text-[2.6rem] leading-[1] tracking-[-0.02em] sm:text-[3.25rem]">
                <Link href={`/projects/${project.slug}`} className="no-underline hover:text-evergreen">
                  {project.name}
                </Link>
              </h2>
              <p className="m-0 mt-4 max-w-[30ch] serif-text text-[1.3rem] italic leading-snug text-ink-soft">{project.kicker}</p>
              <dl className="m-0 mt-6 hidden text-sm lg:block">
                <dt className="label">Status</dt>
                <dd className="m-0 mt-1 serif-text text-base">{project.status}</dd>
              </dl>
              <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
                <Link href={`/projects/${project.slug}`} className="arrow-link">
                  Read on <Arrow />
                </Link>
                {project.url && (
                  <a href={project.url} className="arrow-link" target="_blank" rel="noopener noreferrer">
                    Visit the site <Arrow className="-rotate-45" />
                  </a>
                )}
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-line lg:col-span-7 lg:col-start-6">
              <div className="min-w-0 sm:pr-7">
                <h3 className="label m-0">The problem</h3>
                {project.problem.map((para) => (
                  <p key={para} className="m-0 mt-3 serif-text text-[1.08rem] leading-[1.55] text-ink-soft">
                    {para}
                  </p>
                ))}
              </div>
              <div className="min-w-0 sm:pl-7">
                <h3 className="label m-0">Why I care</h3>
                {project.why.map((para) => (
                  <p key={para} className="m-0 mt-3 serif-text text-[1.08rem] leading-[1.55] text-ink-soft">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
      <div className="double-rule" aria-hidden="true" />
    </Container>
  );
}
