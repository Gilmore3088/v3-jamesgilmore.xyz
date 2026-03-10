import type { Metadata } from "next";
import { Download } from "lucide-react";
import SectionHeading from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Resume | James Gilmore",
  description:
    "Professional resume for James Gilmore - Client Services Manager specializing in data analysis, automation, and financial institution consulting.",
};

const EXPERIENCE = [
  {
    role: "Client Services Manager",
    company: "Velocity Solutions",
    location: "Remote",
    period: "June 2019 - Present",
    highlights: [
      "Managed 60 financial institution clients with book value above $6M. Help clients throughout their entire journey post-sale through renewal; software implementation, consulting, training, support, and analysis.",
      "Led automation initiatives across multiple products using Python and no-code tools, streamlining processes and enhancing efficiency.",
      "Built multiple Jupyter Notebooks to automate monthly analysis, saving 20+ hours per month and enabling improved product reporting.",
      "Successfully cross-sold $2M in 2023 through identifying and executing coordinated strategies with sales and consulting teams.",
      "Led 50+ software implementations for both on-premises and hosted solutions; working with C-suite, tech resources, operations and others.",
      "Provided valuable regulatory and compliance guidance to client executives, helping them navigate industry requirements and mitigate risks.",
      "Member of and actively contributed to product improvement committee, shaping future enhancements to meet client needs effectively.",
    ],
  },
  {
    role: "Independent Consultant",
    company: "Independent / EduPaas",
    location: null,
    period: "May 2018 - June 2021",
    highlights: [
      "Established EduPaas, a consulting firm specializing in providing strategic and tactical guidance, software training, negotiation support, and more to university and athletics business units.",
    ],
  },
  {
    role: "Manager, University Business",
    company: "Navigate Research",
    location: null,
    period: "May 2016 - May 2018",
    highlights: [
      "Successfully managed and contributed to 25+ university and professional sports consulting projects as a consultant.",
      "Coordinated with procurement co-ops, including E&I Co-Op, to develop comprehensive campus-wide RFPs and sourcing strategies.",
      "Conducted thorough research and performed sponsorship valuations to support data-driven decision-making.",
      "Provided expert negotiation assistance, leading to significant revenue growth ranging from 130% to an impressive 227% in multiple agreements.",
      "Generated actionable C-suite insights through the utilization of Tableau and Excel dashboards for enhanced data visualization and analysis.",
    ],
  },
  {
    role: "Director of Sales",
    company: "UCF Athletics",
    location: null,
    period: "Aug 2015 - May 2016",
    highlights: [
      "Managed and motivated a sales team of ten, driving increased revenue across multiple sports.",
      "Achieved a significant 47% increase in men's basketball single game sales and a remarkable 118% growth in new baseball revenue.",
      "Implemented data collection and data mining processes to drive improved decision-making and sales strategies.",
    ],
  },
  {
    role: "Assistant Director of External Operations",
    company: "UCF Athletics",
    location: null,
    period: "May 2011 - Aug 2015",
    highlights: [
      "Built a student section brand - The Knightmare.",
      "Developed a $50k/yr new revenue stream from student guest tickets.",
      "Designed department-wide KPI dashboards and data tracking tools.",
    ],
  },
];

const SKILLS = {
  "Data Analysis": ["Python (Jupyter, Pandas, Numpy)", "Excel", "Tableau", "SQL"],
  CRM: ["Dynamics", "Salesforce"],
  Tools: [
    "Loop",
    "GitHub",
    "Jupyter Notebook",
    "Notion",
    "Airtable",
    "Glide",
    "WorkFront",
  ],
};

const COMMUNITY = [
  {
    organization: "Toastmasters - 832",
    roles: ["President (2023 - 24)", "Treasurer (2024 - present)"],
  },
  {
    organization: "UCF Seattle Alumni",
    roles: ["Chair (2021 - Present)"],
  },
];

const EDUCATION = [
  {
    degree: "MBA",
    focus: "Entrepreneurship",
    school: "University of Central Florida",
  },
  {
    degree: "BS",
    focus: "Business",
    school: "University of Central Florida",
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
          download="James_Gilmore_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-gold-light"
        >
          <Download size={16} />
          Download Resume
        </a>
      </div>

      {/* Professional Experience */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gold">Professional Experience</h2>
        <div className="mt-2 h-0.5 w-12 bg-gold" />

        <div className="mt-6 space-y-8">
          {EXPERIENCE.map((job) => (
            <div
              key={`${job.role}-${job.company}`}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-text-primary">
                  {job.role}
                </h3>
                <span className="text-sm text-text-muted">{job.period}</span>
              </div>
              <p className="mt-1 text-sm text-gold">
                {job.company}
                {job.location ? ` | ${job.location}` : ""}
              </p>
              <ul className="mt-4 space-y-2">
                {job.highlights.map((highlight, i) => (
                  <li
                    key={i}
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

        <div className="mt-6 space-y-6">
          {Object.entries(SKILLS).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-text-primary mb-3">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text-secondary transition-colors hover:border-gold/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gold">Education</h2>
        <div className="mt-2 h-0.5 w-12 bg-gold" />

        <div className="mt-6 space-y-4">
          {EDUCATION.map((edu) => (
            <div
              key={edu.degree}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <h3 className="text-lg font-semibold text-text-primary">
                {edu.degree}, <span className="italic">{edu.focus}</span>
              </h3>
              <p className="mt-1 text-sm text-gold">{edu.school}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Community */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gold">Community</h2>
        <div className="mt-2 h-0.5 w-12 bg-gold" />

        <div className="mt-6 space-y-4">
          {COMMUNITY.map((item) => (
            <div
              key={item.organization}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <h3 className="text-lg font-semibold text-text-primary">
                {item.organization}
              </h3>
              <div className="mt-2 space-y-1">
                {item.roles.map((role) => (
                  <p key={role} className="text-sm text-text-secondary">
                    {role}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
