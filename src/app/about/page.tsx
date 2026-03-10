import type { Metadata } from "next";
import SectionHeading from "@/components/section-heading";

export const metadata: Metadata = {
  title: "About | James Gilmore",
  description:
    "Data analyst and engineer building automation tools, analysis platforms, and data pipelines with Python.",
};

const SKILLS = [
  { name: "Python", level: "Advanced" },
  { name: "pandas", level: "Advanced" },
  { name: "SQL", level: "Advanced" },
  { name: "Excel / VBA", level: "Advanced" },
  { name: "Data Visualization", level: "Advanced" },
  { name: "Automation", level: "Advanced" },
  { name: "Jupyter Notebooks", level: "Advanced" },
  { name: "Flask", level: "Intermediate" },
  { name: "PostgreSQL", level: "Intermediate" },
  { name: "Git", level: "Intermediate" },
];

const INTERESTS = [
  "Travel",
  "Hiking",
  "Toastmasters",
  "Building Things",
  "Public Speaking",
  "Reading",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <SectionHeading
        title="About"
        subtitle="A bit about who I am and what I do."
      />

      {/* Bio */}
      <section className="space-y-5 text-text-secondary leading-relaxed">
        <p>
          I am a data analyst and engineer based in the Seattle area. My work
          focuses on building automation tools, analysis platforms, and data
          pipelines that help organizations make better decisions with their
          data. I spend most of my time working with Python, turning complex
          datasets into clean, actionable insights.
        </p>
        <p>
          Over the years, I have developed a deep appreciation for the power
          of automation. What used to take days of manual effort can often be
          reduced to a streamlined, repeatable process. That efficiency is
          what drives me -- finding ways to do more with less, and freeing up
          time for the work that actually matters: analysis, strategy, and
          communication.
        </p>
        <p>
          Outside of work, I am the president of my local Toastmasters club,
          where I have grown significantly as a communicator and leader. Public
          speaking was once a challenge for me, but it has become one of the
          skills I am most proud of developing. I regularly present to
          executives and board members at financial institutions across the
          country.
        </p>
        <p>
          I am also an avid traveler. I have explored Chile and hiked the O
          Circuit in Torres del Paine, Patagonia -- an experience that
          reinforced my belief in the power of connection and stepping outside
          your comfort zone. Whether it is a multi-day trek through the
          mountains or a conversation with a stranger at a campsite, I believe
          some of the best growth happens when you put yourself out there.
        </p>
      </section>

      {/* Skills */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-text-primary">Skills</h2>
        <div className="mt-2 h-0.5 w-12 bg-gold" />

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {SKILLS.map((skill) => (
            <div
              key={skill.name}
              className="rounded-lg border border-border bg-surface p-4 text-center transition-colors hover:border-gold/60"
            >
              <p className="text-sm font-semibold text-text-primary">
                {skill.name}
              </p>
              <p className="mt-1 text-xs text-text-muted">{skill.level}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interests */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-text-primary">Interests</h2>
        <div className="mt-2 h-0.5 w-12 bg-gold" />

        <div className="mt-8 flex flex-wrap gap-3">
          {INTERESTS.map((interest) => (
            <span
              key={interest}
              className="rounded-full bg-gold/10 px-4 py-2 text-sm font-medium text-gold"
            >
              {interest}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
