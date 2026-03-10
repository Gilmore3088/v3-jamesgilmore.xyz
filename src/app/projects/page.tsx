import type { Metadata } from "next";
import ProjectCard from "@/components/project-card";
import SectionHeading from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Projects | James Gilmore",
  description:
    "A collection of projects built by James Gilmore, including data tools, automation platforms, and web applications.",
};

const MY_PROJECTS = [
  {
    title: "GutenBites.com",
    description:
      "A podcast platform delivering concise summaries of classic literature and historical works in 7-15 minute audio experiences.",
    technologies: ["Podcasting", "Content", "Audio"],
    project_url: "https://gutenbites.com/",
    github_url: null,
  },
  {
    title: "JamesGilmore.xyz",
    description:
      "My personal portfolio website, built with Python and Flask.",
    technologies: ["Python", "Flask", "Bootstrap", "PostgreSQL"],
    project_url: "https://www.JamesGilmore.xyz",
    github_url: null,
  },
];

const FRIENDS_PROJECTS = [
  {
    title: "FormulaBot.com",
    description:
      "The single platform to connect, analyze, visualize, clean, transform and enrich your data - powered by AI.",
    technologies: ["AI", "Data Analysis", "Automation"],
    project_url: "https://www.formulabot.com/",
    github_url: null,
  },
  {
    title: "MRAP Investments",
    description: "Orlando real estate investors.",
    technologies: ["Real Estate", "Investment"],
    project_url: "https://www.instagram.com/mrapinvestments",
    github_url: null,
  },
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <SectionHeading
        title="My Projects"
        subtitle="Things I've built."
      />
      <div className="grid gap-6 sm:grid-cols-2">
        {MY_PROJECTS.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>

      <div className="mt-20">
        <SectionHeading
          title="Friends' Projects"
          subtitle="Work by people I admire."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {FRIENDS_PROJECTS.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}
