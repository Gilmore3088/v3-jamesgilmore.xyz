import type { Metadata } from "next";
import { Download } from "lucide-react";
import SectionHeading from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Resume | James Gilmore",
  description:
    "Professional resume for James Gilmore - data analyst and engineer specializing in Python, automation, and data pipelines.",
};

const SKILLS_GRID = [
  "Python",
  "pandas",
  "SQL",
  "Excel / VBA",
  "Jupyter Notebooks",
  "Flask",
  "Data Visualization",
  "Automation",
  "PostgreSQL",
  "Git",
  "Data Pipelines",
  "Reporting",
];

const EXPERIENCE = [
  {
    role: "Data Analyst / Engineer",
    company: "Company Name",
    period: "Present",
    highlights: [
      "Built and maintained automated analysis pipelines using Python and Jupyter Notebooks, achieving 80-90% automation.",
      "Developed data visualization and reporting tools for executive stakeholders at financial institutions.",
      "Presented analysis and strategic recommendations to CEOs and board members across the country.",
      "Reduced manual analysis time by more than half through custom automation tooling.",
    ],
  },
];

const LEADERSHIP = [
  {
    role: "Club President",
    organization: "Toastmasters International",
    period: "Current",
    description:
      "Leading a local Toastmasters club, facilitating meetings, mentoring members, and developing public speaking skills. Regularly presenting to executives and boards at financial institutions nationwide.",
  },
];

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <SectionHeading title="Resume" />

      {/* Download Button */}
      <div className="mb-12 text-center">
        <a
          href="/resume.pdf"
          className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-gold-light"
        >
          <Download size={16} />
          Download Resume
        </a>
      </div>

      {/* Professional Summary */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gold">Professional Summary</h2>
        <div className="mt-2 h-0.5 w-12 bg-gold" />
        <p className="mt-4 text-text-secondary leading-relaxed">
          Data analyst and engineer with expertise in Python, automation, and
          data pipeline development. Experienced in building tools that
          transform raw data into actionable insights for executive
          stakeholders. Strong communicator with a track record of presenting
          to C-suite executives and board members at financial institutions.
        </p>
      </section>

      {/* Work Experience */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gold">Work Experience</h2>
        <div className="mt-2 h-0.5 w-12 bg-gold" />

        <div className="mt-6 space-y-8">
          {EXPERIENCE.map((job) => (
            <div
              key={job.role}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-text-primary">
                  {job.role}
                </h3>
                <span className="text-sm text-text-muted">{job.period}</span>
              </div>
              <p className="mt-1 text-sm text-gold">{job.company}</p>
              <ul className="mt-4 space-y-2">
                {job.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 text-sm text-text-secondary leading-relaxed"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gold">Skills</h2>
        <div className="mt-2 h-0.5 w-12 bg-gold" />

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {SKILLS_GRID.map((skill) => (
            <div
              key={skill}
              className="rounded-lg border border-border bg-surface px-4 py-3 text-center text-sm font-medium text-text-primary transition-colors hover:border-gold/60"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gold">Leadership</h2>
        <div className="mt-2 h-0.5 w-12 bg-gold" />

        <div className="mt-6 space-y-6">
          {LEADERSHIP.map((item) => (
            <div
              key={item.role}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-text-primary">
                  {item.role}
                </h3>
                <span className="text-sm text-text-muted">{item.period}</span>
              </div>
              <p className="mt-1 text-sm text-gold">{item.organization}</p>
              <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gold">Education</h2>
        <div className="mt-2 h-0.5 w-12 bg-gold" />

        <div className="mt-6 rounded-lg border border-border bg-surface p-6">
          <h3 className="text-lg font-semibold text-text-primary">
            Degree Program
          </h3>
          <p className="mt-1 text-sm text-gold">University Name</p>
          <p className="mt-1 text-sm text-text-muted">Graduation Year</p>
        </div>
      </section>
    </div>
  );
}
