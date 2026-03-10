import type { Metadata } from "next";

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
  { label: "Travel", icon: "M" },
  { label: "Hiking", icon: "H" },
  { label: "Toastmasters", icon: "T" },
  { label: "Building Things", icon: "B" },
  { label: "Public Speaking", icon: "P" },
  { label: "Reading", icon: "R" },
];

export default function AboutPage() {
  return (
    <div className="noise-bg">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        {/* Page Header */}
        <div className="animate-fade-up">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
            Get to Know Me
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-gold-gradient sm:text-5xl">
            About
          </h1>
          <hr className="hr-gold opacity-30 mt-6" />
        </div>

        {/* Two-Column Hero: Intro Left, Brief Right */}
        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          {/* Left Column - Brief Intro */}
          <div className="lg:col-span-2 animate-fade-up animation-delay-100">
            <div className="rounded-lg border border-border bg-surface p-8">
              <h2 className="font-display text-2xl font-semibold text-text-primary">
                James Gilmore
              </h2>
              <p className="mt-2 text-sm text-gold">
                Data Analyst &amp; Engineer
              </p>
              <p className="mt-1 text-xs text-text-muted">
                Seattle, WA
              </p>
              <hr className="hr-gold opacity-20 my-6" />
              <p className="text-sm text-text-secondary leading-relaxed">
                Building automation tools, analysis platforms, and data
                pipelines that help organizations make better decisions.
                Toastmasters president, traveler, and lifelong learner.
              </p>
            </div>
          </div>

          {/* Right Column - Full Bio */}
          <div className="lg:col-span-3 animate-fade-up animation-delay-200">
            <div className="space-y-5 text-text-secondary leading-relaxed">
              <p>
                I am a data analyst and engineer based in the Seattle area. My
                work focuses on building automation tools, analysis platforms,
                and data pipelines that help organizations make better
                decisions with their data. I spend most of my time working
                with Python, turning complex datasets into clean, actionable
                insights.
              </p>
              <p>
                Over the years, I have developed a deep appreciation for the
                power of automation. What used to take days of manual effort
                can often be reduced to a streamlined, repeatable process.
                That efficiency is what drives me -- finding ways to do more
                with less, and freeing up time for the work that actually
                matters: analysis, strategy, and communication.
              </p>
              <p>
                Outside of work, I am the president of my local Toastmasters
                club, where I have grown significantly as a communicator and
                leader. Public speaking was once a challenge for me, but it
                has become one of the skills I am most proud of developing. I
                regularly present to executives and board members at financial
                institutions across the country.
              </p>
              <p>
                I am also an avid traveler. I have explored Chile and hiked
                the O Circuit in Torres del Paine, Patagonia -- an experience
                that reinforced my belief in the power of connection and
                stepping outside your comfort zone. Whether it is a multi-day
                trek through the mountains or a conversation with a stranger
                at a campsite, I believe some of the best growth happens when
                you put yourself out there.
              </p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <section className="mt-24 animate-fade-up animation-delay-300">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
            Technical Proficiency
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-text-primary">
            Skills
          </h2>
          <hr className="hr-gold opacity-30 mt-6" />

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {SKILLS.map((skill) => (
              <div
                key={skill.name}
                className="group rounded-lg border border-border bg-surface p-5 text-center transition-all duration-300 hover:border-gold/40 hover:gold-glow"
              >
                <p className="text-sm font-semibold text-text-primary group-hover:text-gold transition-colors duration-300">
                  {skill.name}
                </p>
                <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
                  {skill.level}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Interests */}
        <section className="mt-24 animate-fade-up animation-delay-400">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
            Beyond the Code
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-text-primary">
            Interests
          </h2>
          <hr className="hr-gold opacity-30 mt-6" />

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {INTERESTS.map((interest) => (
              <div
                key={interest.label}
                className="group flex flex-col items-center gap-3 rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:border-gold/40 hover:gold-glow"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-light text-sm font-display font-bold text-gold transition-colors duration-300 group-hover:border-gold/40">
                  {interest.icon}
                </span>
                <p className="text-sm font-medium text-text-primary">
                  {interest.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
