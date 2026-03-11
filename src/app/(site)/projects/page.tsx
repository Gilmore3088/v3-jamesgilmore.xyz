import type { Metadata } from "next";
import { getMyProjects, getFriendsProjects } from "@/lib/data";
import ProjectCard from "@/components/project-card";
import type { Project } from "@/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects | James Gilmore",
  description:
    "A collection of projects built by James Gilmore, including data tools, automation platforms, and web applications.",
};

function FriendsProjectCard({ project }: { project: Project }) {
  const { title, description, technologies, project_url, github_url } = project;

  return (
    <div className="group rounded-lg border border-border bg-surface p-8 transition-all duration-300 hover:border-gold/30 hover:gold-glow">
      <h3 className="font-display text-xl font-semibold text-text-primary transition-colors duration-300 group-hover:text-gold">
        {title}
      </h3>

      <p className="mt-3 text-sm text-text-secondary leading-relaxed">
        {description}
      </p>

      {technologies && technologies.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-3 py-1 text-xs font-medium text-text-muted transition-colors duration-300 group-hover:border-gold/20 group-hover:text-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center gap-5">
        {project_url && (
          <a
            href={project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.15em] text-text-muted transition-colors duration-300 hover:text-gold"
          >
            Visit
          </a>
        )}
        {github_url && (
          <a
            href={github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.15em] text-text-muted transition-colors duration-300 hover:text-gold"
          >
            Source
          </a>
        )}
      </div>
    </div>
  );
}

export default async function ProjectsPage() {
  const myProjects = await getMyProjects();
  const friendsProjects = await getFriendsProjects();

  return (
    <div className="noise-bg">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        {/* Page Header */}
        <div className="animate-fade-up">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
            Selected Work
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-gold-gradient sm:text-5xl">
            My Projects
          </h1>
          <p className="mt-4 max-w-xl text-text-secondary">
            Systems, tools, and explorations. Each project tells a story about the problem it solves and the thinking behind it.
          </p>
          <hr className="hr-gold opacity-30 mt-6" />
        </div>

        {/* My Projects */}
        {myProjects.length > 0 ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 animate-fade-up animation-delay-100">
            {myProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                variant="listing"
              />
            ))}
          </div>
        ) : (
          <div className="mt-14 animate-fade-up animation-delay-100">
            <p className="text-text-muted">Projects coming soon.</p>
          </div>
        )}

        {/* Section Divider */}
        {friendsProjects.length > 0 && (
          <>
            <div className="my-24 flex items-center gap-6">
              <hr className="hr-gold opacity-20 flex-1" />
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-text-muted whitespace-nowrap">
                From the Network
              </span>
              <hr className="hr-gold opacity-20 flex-1" />
            </div>

            {/* Friends' Projects */}
            <div className="animate-fade-up animation-delay-200">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
                Peers &amp; Collaborators
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-text-primary">
                Friends&apos; Projects
              </h2>
              <p className="mt-4 text-text-secondary">
                Work by people I admire.
              </p>
              <hr className="hr-gold opacity-30 mt-6" />
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 animate-fade-up animation-delay-300">
              {friendsProjects.map((project) => (
                <FriendsProjectCard key={project.id} project={project} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
