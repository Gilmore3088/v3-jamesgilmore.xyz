import type { Metadata } from "next";
import { Download } from "lucide-react";
import SectionHeading from "@/components/section-heading";

const ACCENTS = ["var(--color-mustard)", "var(--color-mint)", "var(--color-lilac)", "var(--color-coral)", "var(--color-teal)"];

export const metadata: Metadata = {
  title: "Resume",
  alternates: { canonical: "/resume" },
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
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <header className="animate-fade-up flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="hand m-0 inline-block -rotate-2 text-2xl text-coral">the official version</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold leading-[.98] tracking-tight sm:text-6xl">Resume</h1>
          <p className="mt-4 max-w-xl text-lg text-muted">Fifteen years of turning data, sales, and stubborn processes into things that work.</p>
        </div>
        <a href="/resume.pdf" download="James_Gilmore_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-coral">
          <Download size={16} /> Download the PDF
        </a>
      </header>

      {/* Experience */}
      <section className="py-12">
        <SectionHeading title="Where I've worked" />
        <div className="grid gap-5">
          {EXPERIENCE.map((job, i) => (
            <article key={`${job.role}-${job.company}`} className="card p-6 sm:p-7" style={{ ["--c" as string]: ACCENTS[i % ACCENTS.length] }}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="m-0 font-display text-2xl font-extrabold leading-tight tracking-tight">{job.role}</h3>
                  <p className="m-0 mt-1 font-bold">{job.company}{job.location ? ` · ${job.location}` : ""}</p>
                </div>
                <span className="hand text-xl text-coral">{job.period}</span>
              </div>
              <ul className="m-0 mt-4 grid list-none gap-2 p-0">
                {job.highlights.map((h, j) => (
                  <li key={j} className="grid grid-cols-[auto_1fr] gap-3 text-[15px] leading-relaxed text-muted">
                    <span className="mt-2.5 h-2 w-2 rounded-full bg-ink" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="py-6">
        <SectionHeading title="Tools I reach for" />
        <div className="grid gap-4 sm:grid-cols-3">
          {Object.entries(SKILLS).map(([category, items], i) => (
            <div key={category} className={`rounded-2xl border-2 border-ink p-5 ${["bg-mint", "bg-lilac", "bg-mustard"][i % 3]}`}>
              <p className="hand m-0 text-2xl">{category}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span key={skill} className="rounded-full border-2 border-ink bg-paper px-3 py-1 text-sm font-bold">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education + community */}
      <div className="grid gap-10 py-12 lg:grid-cols-2">
        <section>
          <SectionHeading title="School" />
          <div className="grid gap-4">
            {EDUCATION.map((edu) => (
              <div key={edu.degree} className="card p-5" style={{ ["--c" as string]: "var(--color-teal)" }}>
                <p className="m-0 font-display text-xl font-extrabold tracking-tight">{edu.degree}, <span className="font-semibold text-muted">{edu.focus}</span></p>
                <p className="m-0 mt-1 font-bold">{edu.school}</p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <SectionHeading title="Community" />
          <div className="grid gap-4">
            {COMMUNITY.map((item) => (
              <div key={item.organization} className="card p-5" style={{ ["--c" as string]: "var(--color-coral)" }}>
                <p className="m-0 font-display text-xl font-extrabold tracking-tight">{item.organization}</p>
                <p className="m-0 mt-1 text-[15px] text-muted">{item.roles.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
