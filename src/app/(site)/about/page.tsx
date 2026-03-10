import type { Metadata } from "next";
import {
  Zap,
  BarChart3,
  Landmark,
  Lightbulb,
  Route,
  Globe,
  Brain,
  Pencil,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About | James Gilmore",
  description:
    "Data analyst and engineer building automation tools, analysis platforms, and data pipelines with Python.",
};

const THEMES = [
  {
    label: "Automation",
    description:
      "If something is done manually more than a few times, it should probably be automated.",
    icon: Zap,
  },
  {
    label: "Data to Action",
    description:
      "Numbers by themselves don't matter. The goal is turning information into decisions.",
    icon: BarChart3,
  },
  {
    label: "Financial Systems",
    description:
      "Deeply interested in how money, incentives, and financial systems shape behavior.",
    icon: Landmark,
  },
  {
    label: "Idea Exploration",
    description:
      "Some ideas turn into real products. Others remain experiments. The process of exploring them is where the fun is.",
    icon: Lightbulb,
  },
];

const OUTSIDE_WORK = [
  { label: "Running long distances", icon: Route },
  { label: "Strategy, history, and economic systems", icon: Brain },
  { label: "Planning travel and future adventures", icon: Globe },
  { label: "Sketching out the next idea", icon: Pencil },
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

        {/* Intro */}
        <div className="mt-16 animate-fade-up animation-delay-100">
          <div className="space-y-6 text-text-secondary leading-relaxed text-lg max-w-3xl">
            <p className="text-text-primary text-2xl font-display leading-snug">
              Hi -- I&apos;m James.
            </p>
            <p>I spend most of my time thinking about systems.</p>
            <div className="pl-6 border-l-2 border-gold/40 space-y-1 text-text-primary">
              <p>Systems for money.</p>
              <p>Systems for data.</p>
              <p>Systems for ideas.</p>
              <p>
                Systems for building things that didn&apos;t exist yesterday.
              </p>
            </div>
          </div>
        </div>

        {/* Professional */}
        <div className="mt-16 animate-fade-up animation-delay-200">
          <div className="space-y-6 text-text-secondary leading-relaxed max-w-3xl">
            <p>
              Professionally, I work in financial technology helping banks
              understand and grow their customer base through data, analytics,
              and product strategy. My work sits at the intersection of finance,
              data, and technology -- turning large, messy datasets into insight
              and action.
            </p>
            <p>But the real thing that drives me is building.</p>
            <p>
              I&apos;m endlessly curious about ideas -- especially the moment
              when an idea stops being abstract and becomes something real.
            </p>
          </div>
        </div>

        {/* The Shift */}
        <section className="mt-20 animate-fade-up animation-delay-300">
          <div className="rounded-lg border border-border bg-surface p-8 sm:p-10 max-w-3xl">
            <div className="space-y-5 text-text-secondary leading-relaxed">
              <p>
                For most of history, turning an idea into software required deep
                technical expertise. Today, that barrier is collapsing.
              </p>
              <p>
                With modern AI tools, creative people can move much closer to
                being technical builders. The distance between &ldquo;What if
                someone made this?&rdquo; and actually making it has never been
                shorter.
              </p>
              <p className="text-text-primary font-medium">
                The biggest constraint now isn&apos;t access to technology.
              </p>
              <div className="pl-6 border-l-2 border-gold/40 space-y-1 text-gold">
                <p>It&apos;s imagination.</p>
                <p>And the willingness to try.</p>
              </div>
              <p>That shift fascinates me.</p>
              <p>
                For the first time, millions of people can look at a problem, ask
                &ldquo;What about this idea?&rdquo;, and then actually build it.
              </p>
              <p className="text-gold font-display text-lg italic">
                What a time to be alive.
              </p>
              <p>That possibility fuels me every day.</p>
            </div>
          </div>
        </section>

        {/* What I Spend Time On */}
        <section className="mt-24 animate-fade-up animation-delay-300">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
            Focus Areas
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-text-primary">
            What I Spend Time On
          </h2>
          <hr className="hr-gold opacity-30 mt-6" />

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {THEMES.map((theme) => (
              <div
                key={theme.label}
                className="group rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:border-gold/40 hover:gold-glow"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-light text-gold transition-colors duration-300 group-hover:border-gold/40 shrink-0">
                    <theme.icon size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-text-primary group-hover:text-gold transition-colors duration-300">
                      {theme.label}
                    </p>
                    <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">
                      {theme.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Outside of Work */}
        <section className="mt-24 animate-fade-up animation-delay-400">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
            Beyond the Code
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-text-primary">
            Outside of Work
          </h2>
          <hr className="hr-gold opacity-30 mt-6" />

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {OUTSIDE_WORK.map((item) => (
              <div
                key={item.label}
                className="group flex items-center gap-4 rounded-lg border border-border bg-surface p-5 transition-all duration-300 hover:border-gold/40 hover:gold-glow"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-light text-gold transition-colors duration-300 group-hover:border-gold/40 shrink-0">
                  <item.icon size={18} />
                </span>
                <p className="text-sm font-medium text-text-primary">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Why This Site Exists */}
        <section className="mt-24 animate-fade-up animation-delay-500">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
            The Purpose
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-text-primary">
            Why This Site Exists
          </h2>
          <hr className="hr-gold opacity-30 mt-6" />

          <div className="mt-10 space-y-5 text-text-secondary leading-relaxed max-w-3xl">
            <p>
              This site is simply a home for things I care about -- ideas,
              projects, experiments, and thoughts about the systems that shape
              our world.
            </p>
            <div className="pl-6 border-l-2 border-gold/40 space-y-1 text-text-primary">
              <p>Some things will turn into meaningful tools.</p>
              <p>Some will become businesses.</p>
              <p>Some will remain interesting attempts.</p>
            </div>
            <p>But they all start the same way:</p>
            <p className="text-gold font-display text-xl italic">
              A question. What if this existed?
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
