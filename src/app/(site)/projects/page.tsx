import type { Metadata } from "next";
import { getMyProjects, getFriendsProjects } from "@/lib/data";
import ProjectCard from "@/components/project-card";
import SectionHeading from "@/components/section-heading";
import type { Project } from "@/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Stuff I made",
  description: "Projects by James Gilmore: automation, data tools, and a few things that exist purely because they were fun to make.",
  alternates: { canonical: "/projects" },
};

function FriendsProjectCard({ project }: { project: Project }) {
  const { title, description, technologies, project_url, github_url } = project;
  return (
    <div className="card grid min-w-0 content-start gap-2 p-6">
      <h3 className="m-0 font-display text-xl font-semibold leading-tight tracking-tight">{title}</h3>
      <p className="m-0 text-[15px] leading-relaxed text-muted">{description}</p>
      {technologies?.length > 0 && <p className="m-0 text-xs font-bold text-muted">{technologies.join(" · ")}</p>}
      <div className="mt-1 flex gap-4 text-sm font-semibold">
        {project_url && <a href={project_url} target="_blank" rel="noopener noreferrer" className="text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold">Visit</a>}
        {github_url && <a href={github_url} target="_blank" rel="noopener noreferrer" className="text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold">Source</a>}
      </div>
    </div>
  );
}

export default async function ProjectsPage() {
  const [mine, friends] = await Promise.all([getMyProjects(), getFriendsProjects()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <header className="animate-fade-up max-w-3xl">
        <p className="eyebrow m-0">Expeditions</p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-gold-gradient sm:text-6xl">Stuff I&apos;ve made</h1>
        <p className="mt-5 text-lg text-muted">Systems, tools, and explorations. Each one started with &ldquo;what if this existed?&rdquo; and got far enough to be worth writing down.</p>
      </header>

      <section className="py-12">
        {mine.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mine.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
          </div>
        ) : (
          <p className="text-muted">Projects coming soon.</p>
        )}
      </section>

      {friends.length > 0 && (
        <section className="py-6">
          <SectionHeading title="Friends' projects" note="work by people I admire" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {friends.map((project) => <FriendsProjectCard key={project.id} project={project} />)}
          </div>
        </section>
      )}
    </div>
  );
}
