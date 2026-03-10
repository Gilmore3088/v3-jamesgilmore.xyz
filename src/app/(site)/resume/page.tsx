import type { Metadata } from "next";
import { Download } from "lucide-react";

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
  "Data Analysis": [
    "Python (Jupyter, Pandas, Numpy)",
    "Excel",
    "Tableau",
    "SQL",
  ],
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
    <div className="noise-bg">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        {/* Page Header */}
        <div className="animate-fade-up">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
            Professional Background
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-gold-gradient sm:text-5xl">
            Resume
          </h1>
          <hr className="hr-gold opacity-30 mt-6" />
        </div>

        {/* Download Button */}
        <div className="mt-10 animate-fade-up animation-delay-100">
          <a
            href="/resume.pdf"
            download="James_Gilmore_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-lg bg-gold px-7 py-3.5 text-sm font-semibold text-background transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_30px_-5px_rgb(197_165_114/0.3)]"
          >
            <Download size={16} />
            Download Resume
          </a>
        </div>

        {/* Professional Experience - Timeline Layout */}
        <section className="mt-20 animate-fade-up animation-delay-200">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
            Career Path
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-text-primary">
            Professional Experience
          </h2>
          <hr className="hr-gold opacity-30 mt-6" />

          <div className="mt-12 relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border hidden sm:block" />

            <div className="space-y-10">
              {EXPERIENCE.map((job) => (
                <div
                  key={`${job.role}-${job.company}`}
                  className="relative sm:pl-10"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 hidden sm:flex h-[15px] w-[15px] items-center justify-center">
                    <div className="h-[9px] w-[9px] rounded-full border-2 border-gold bg-background" />
                  </div>

                  <div className="rounded-lg border border-border bg-surface p-7 transition-all duration-300 hover:border-gold/30 hover:gold-glow">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="font-display text-xl font-semibold text-text-primary">
                          {job.role}
                        </h3>
                        <p className="mt-1 text-sm text-gold">
                          {job.company}
                          {job.location ? ` -- ${job.location}` : ""}
                        </p>
                      </div>
                      <span className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-text-muted sm:mt-1 whitespace-nowrap">
                        {job.period}
                      </span>
                    </div>

                    <ul className="mt-5 space-y-3">
                      {job.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-sm text-text-secondary leading-relaxed"
                        >
                          <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-gold/60" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mt-24 animate-fade-up animation-delay-300">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
            Technical Proficiency
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-text-primary">
            Skills
          </h2>
          <hr className="hr-gold opacity-30 mt-6" />

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {Object.entries(SKILLS).map(([category, items]) => (
              <div
                key={category}
                className="rounded-lg border border-border bg-surface p-6"
              >
                <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-gold">
                  {category}
                </h3>
                <hr className="hr-gold opacity-20 mt-3 mb-4" />
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded border border-border bg-surface-light px-3 py-1.5 text-sm text-text-secondary transition-colors duration-300 hover:border-gold/40 hover:text-text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Community - Side by Side */}
        <div className="mt-24 grid gap-10 lg:grid-cols-2">
          {/* Education */}
          <section className="animate-fade-up animation-delay-400">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
              Academic Background
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-text-primary">
              Education
            </h2>
            <hr className="hr-gold opacity-30 mt-6" />

            <div className="mt-10 space-y-4">
              {EDUCATION.map((edu) => (
                <div
                  key={edu.degree}
                  className="rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:border-gold/30 hover:gold-glow"
                >
                  <h3 className="font-display text-lg font-semibold text-text-primary">
                    {edu.degree},{" "}
                    <span className="italic text-text-secondary">
                      {edu.focus}
                    </span>
                  </h3>
                  <p className="mt-2 text-sm text-gold">{edu.school}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Community */}
          <section className="animate-fade-up animation-delay-500">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
              Leadership &amp; Service
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-text-primary">
              Community
            </h2>
            <hr className="hr-gold opacity-30 mt-6" />

            <div className="mt-10 space-y-4">
              {COMMUNITY.map((item) => (
                <div
                  key={item.organization}
                  className="rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:border-gold/30 hover:gold-glow"
                >
                  <h3 className="font-display text-lg font-semibold text-text-primary">
                    {item.organization}
                  </h3>
                  <hr className="hr-gold opacity-15 my-3" />
                  <div className="space-y-1.5">
                    {item.roles.map((role) => (
                      <p
                        key={role}
                        className="text-sm text-text-secondary"
                      >
                        {role}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
