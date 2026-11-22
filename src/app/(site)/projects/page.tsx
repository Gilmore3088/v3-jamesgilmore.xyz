import type { Metadata } from "next";
import Link from "next/link";
import Arrow from "@/components/arrow";
import Container from "@/components/container";
import PageHead from "@/components/page-head";
import ProjectImage from "@/components/project-image";
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
    <>
      <PageHead label="What I'm building" title={projectsPage.title} lede={projectsPage.lede} />
      <Container>
        <ol className="m-0 grid list-none gap-16 p-0 lg:gap-24">
          {projects.map((project, i) => (
            <li key={project.slug} className="grid gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="min-w-0 lg:col-span-7">
                <ProjectImage project={project} sizes="(min-width: 1024px) 58vw, 100vw" priority={i === 0} />
              </div>
              <div className="min-w-0 lg:col-span-5">
                <p className="label m-0">{project.status}</p>
                <h2 className="title m-0 mt-3 text-[2.2rem] sm:text-[2.6rem]">
                  <Link href={`/projects/${project.slug}`} className="no-underline hover:text-accent">
                    {project.name}
                  </Link>
                </h2>
                <p className="deck m-0 mt-3 text-[1.25rem] text-ink-soft">{project.kicker}</p>
                <div className="mt-6 grid gap-6">
                  <div>
                    <h3 className="m-0 text-[1rem] font-semibold text-muted">The problem</h3>
                    <p className="body-text m-0 mt-2 text-[1.08rem] text-ink-soft">{project.problem[0]}</p>
                  </div>
                  <div>
                    <h3 className="m-0 text-[1rem] font-semibold text-muted">Why I care</h3>
                    <p className="body-text m-0 mt-2 text-[1.08rem] text-ink-soft">{project.why[0]}</p>
                  </div>
                </div>
                <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
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
            </li>
          ))}
        </ol>
      </Container>
    </>
  );
}
