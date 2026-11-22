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
      <header className="rise grid gap-6 pb-12 pt-12 sm:pt-20 lg:grid-cols-12 lg:gap-8 lg:pb-16">
        <div className="min-w-0 lg:col-span-5">
          <p className="label m-0">What I&apos;m building</p>
          <h1 className="display m-0 mt-4 text-[3rem] sm:text-6xl lg:text-[4.5rem]">{projectsPage.title}</h1>
        </div>
        <p className="deck m-0 max-w-[40ch] text-[1.3rem] leading-[1.45] text-ink-soft lg:col-span-7 lg:col-start-6 lg:mt-2 sm:text-[1.5rem]">
          {projectsPage.lede}
        </p>
      </header>

      <ol className="m-0 list-none p-0">
        {projects.map((project) => (
          <li key={project.slug} className="grid gap-8 border-t border-ink py-10 lg:grid-cols-12 lg:gap-8 lg:py-14">
            <div className="min-w-0 lg:col-span-4">
              <p className="label m-0">{project.status}</p>
              <h2 className="m-0 mt-3 serif text-[2.2rem] leading-[1.05] tracking-[-0.015em] sm:text-[2.6rem]">
                <Link href={`/projects/${project.slug}`} className="no-underline hover:text-evergreen">
                  {project.name}
                </Link>
              </h2>
              <p className="m-0 mt-3 max-w-[30ch] serif-text text-[1.15rem] leading-snug text-ink-soft">{project.kicker}</p>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                <Link href={`/projects/${project.slug}`} className="arrow-link">
                  Read more <Arrow />
                </Link>
                {project.url && (
                  <a href={project.url} className="arrow-link" target="_blank" rel="noopener noreferrer">
                    Visit the site <Arrow className="-rotate-45" />
                  </a>
                )}
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
              <div className="min-w-0">
                <h3 className="label m-0">The problem</h3>
                {project.problem.map((para) => (
                  <p key={para} className="m-0 mt-3 serif-text text-[1.05rem] leading-[1.55] text-ink-soft">
                    {para}
                  </p>
                ))}
              </div>
              <div className="min-w-0">
                <h3 className="label m-0">Why I care</h3>
                {project.why.map((para) => (
                  <p key={para} className="m-0 mt-3 serif-text text-[1.05rem] leading-[1.55] text-ink-soft">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Container>
  );
}
