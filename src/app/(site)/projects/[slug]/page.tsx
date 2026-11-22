import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Arrow from "@/components/arrow";
import Container from "@/components/container";
import ProjectImage from "@/components/project-image";
import { getProject, site } from "@/content/site";
import { jsonLd } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return site.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: `${project.name} · ${site.name}`, description: project.summary, url: `/projects/${project.slug}` },
  };
}

function Section({ label, paragraphs, muted = false, children }: { label: string; paragraphs: string[]; muted?: boolean; children?: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-line py-9 sm:grid-cols-[11rem_1fr] sm:gap-8 lg:py-11">
      <h2 className="label m-0 pt-2">{label}</h2>
      <div className="min-w-0">
        {paragraphs.map((para, i) => (
          <p key={para} className={`m-0 body-text text-[1.25rem] leading-[1.65] ${muted ? "text-muted" : "text-ink-soft"} ${i === 0 ? "" : "mt-5"}`}>
            {para}
          </p>
        ))}
        {children}
      </div>
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = site.projects.findIndex((p) => p.slug === project.slug);
  const next = site.projects[(index + 1) % site.projects.length];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.summary,
    url: project.url ?? `${site.url}/projects/${project.slug}`,
    creator: { "@type": "Person", "@id": `${site.url}/#person`, name: site.name, url: site.url },
  };

  return (
    <Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />

      <p className="pt-6">
        <Link href="/projects" className="arrow-link arrow-back">
          <Arrow className="rotate-180" /> All projects
        </Link>
      </p>

      <header className="rise grid gap-8 pb-10 pt-8 sm:pt-10 lg:grid-cols-12 lg:gap-8 lg:pb-12">
        <div className="min-w-0 lg:col-span-9">
          <p className="label m-0">Project</p>
          <h1 className="display m-0 mt-4 text-[2.8rem] sm:text-6xl lg:text-[4.5rem]">{project.name}</h1>
          <p className="deck m-0 mt-6 max-w-[36ch] text-[1.3rem] leading-[1.4] text-ink-soft sm:text-[1.7rem]">{project.kicker}</p>
        </div>
        <dl className="m-0 grid min-w-0 content-start gap-5 text-sm lg:col-span-3 lg:col-start-10 lg:mt-3">
          <div>
            <dt className="label">Status</dt>
            <dd className="m-0 mt-1 body-text text-base">{project.status}</dd>
          </div>
          {project.url && (
            <div>
              <dt className="label">Site</dt>
              <dd className="m-0 mt-1 body-text text-base">
                <a href={project.url} className="link break-all" target="_blank" rel="noopener noreferrer">
                  {project.url.replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              </dd>
            </div>
          )}
        </dl>
      </header>

      {project.image && (
        <div className="mb-14 lg:mb-20">
          <ProjectImage project={project} aspect="aspect-[16/10] sm:aspect-[2/1]" sizes="(min-width: 1280px) 80rem, 100vw" priority withCaption />
        </div>
      )}

      <div className="max-w-[54rem]">
        <Section label="The problem" paragraphs={project.problem} />
        <Section label="Why I care" paragraphs={project.why} />
        <Section label="Where it is today" paragraphs={project.today} />
        {project.caseStudy.length > 0 ? (
          project.caseStudy.map((s) => <Section key={s.heading} label={s.heading} paragraphs={s.body} />)
        ) : (
          <Section label="Notes" paragraphs={[site.projectsPage.caseStudyNote]} muted>
            {project.url && (
              <p className="mt-6">
                <a href={project.url} className="arrow-link" target="_blank" rel="noopener noreferrer">
                  Visit {project.name} <Arrow className="-rotate-45" />
                </a>
              </p>
            )}
          </Section>
        )}
      </div>

      {next && next.slug !== project.slug && (
        <nav aria-label="Next project" className="mt-20 pt-0">
          <p className="label m-0">Next project</p>
          <Link href={`/projects/${next.slug}`} className="card mt-3 inline-flex items-baseline gap-4 serif text-[1.8rem] leading-tight tracking-[-0.015em] no-underline sm:text-[2.2rem]">
            <span className="card-title">{next.name}</span> <Arrow className="text-evergreen" />
          </Link>
        </nav>
      )}
    </Container>
  );
}
