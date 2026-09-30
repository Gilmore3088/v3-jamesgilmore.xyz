import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/section-heading";
import FactIcon from "@/components/fact-icon";
import { ACCENT_BG, ACCENT_VAR } from "@/components/sticker";
import type { Accent } from "@/content/profile";

export const metadata: Metadata = {
  title: "About",
  description: "The long version: who James Gilmore is, what he spends his time on, and why this site exists.",
  alternates: { canonical: "/about" },
};

const THEMES: { label: string; text: string; accent: Accent; icon: string }[] = [
  { label: "Automation", text: "If something is done manually more than a few times, it should probably be automated.", accent: "mint", icon: "trend" },
  { label: "Data to action", text: "Numbers by themselves don't matter. The goal is turning information into decisions.", accent: "lilac", icon: "calendar" },
  { label: "Financial systems", text: "Deeply interested in how money, incentives, and financial systems shape behavior.", accent: "mustard", icon: "bulb" },
  { label: "Idea exploration", text: "Some ideas turn into real products. Others remain experiments. The exploring is where the fun is.", accent: "coral", icon: "star" },
];

const OUTSIDE = [
  "Running long distances",
  "Strategy, history, and economic systems",
  "Planning travel and future adventures",
  "Sketching out the next idea",
  "Toastmasters (past president, current treasurer)",
  "UCF Seattle Alumni chair",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      {/* Header */}
      <header className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div className="animate-fade-up">
          <p className="eyebrow m-0">The long version</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Hi, I&apos;m James. I spend most of my time <span className="hl">thinking about systems.</span>
          </h1>
          <div className="mt-6 grid gap-1 border-l-2 border-gold pl-5 text-lg font-medium">
            <p className="m-0">Systems for money.</p>
            <p className="m-0">Systems for data.</p>
            <p className="m-0">Systems for ideas.</p>
            <p className="m-0">Systems for building things that didn&apos;t exist yesterday.</p>
          </div>
        </div>
        <figure className="animate-fade-up animation-delay-200 m-0 frame w-[min(100%,260px)] ">
          <Image src="/profile.jpg" alt="James Gilmore" width={400} height={400} className="block aspect-square h-auto w-full object-cover" unoptimized />
          <figcaption className="hand mt-3 block text-lg">Seattle, most days</figcaption>
        </figure>
      </header>

      {/* Work */}
      <section className="py-12">
        <SectionHeading title="The day job" note="fintech, but the fun kind" />
        <div className="grid gap-6 text-lg leading-relaxed lg:grid-cols-2">
          <p className="m-0">
            Professionally, I work in financial technology helping banks understand and grow their customer base through data, analytics, and product strategy. My work sits at the intersection of finance, data, and technology: turning large, messy datasets into insight and action.
          </p>
          <p className="m-0">
            But the real thing that drives me is building. I&apos;m endlessly curious about ideas, especially the moment when an idea stops being abstract and becomes something real.
          </p>
        </div>
      </section>

      {/* The shift */}
      <section className="py-6">
        <div className="grid gap-8 card rounded-2xl border-gold/30 p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center">
          <div>
            <p className="eyebrow m-0">The thing that fascinates me</p>
            <h2 className="m-0 mt-1 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">The biggest constraint isn&apos;t access to technology anymore.</h2>
            <p className="mt-4 font-display text-2xl italic text-gold">It&apos;s imagination. And the willingness to try.</p>
          </div>
          <div className="grid gap-4 text-lg leading-relaxed text-muted">
            <p className="m-0">For most of history, turning an idea into software required deep technical expertise. Today, that barrier is collapsing. Creative people can move much closer to being technical builders.</p>
            <p className="m-0">For the first time, millions of people can look at a problem, ask &ldquo;what about this idea?&rdquo;, and then actually build it.</p>
            <p className="hand m-0 text-2xl">What a time to be alive.</p>
          </div>
        </div>
      </section>

      {/* Focus areas */}
      <section className="py-12">
        <SectionHeading title="What I spend time on" />
        <div className="grid gap-4 sm:grid-cols-2">
          {THEMES.map((t) => (
            <div key={t.label} className="card card-accent grid min-w-0 grid-cols-[auto_1fr] items-start gap-4 p-5" style={{ ["--c" as string]: ACCENT_VAR[t.accent] }}>
              <span className={`grid h-11 w-11 place-items-center rounded-full ${ACCENT_BG[t.accent]}`}><FactIcon name={t.icon} /></span>
              <div>
                <p className="m-0 font-display text-lg font-semibold tracking-tight">{t.label}</p>
                <p className="m-0 mt-1 text-[15px] leading-relaxed text-muted">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Outside of work */}
      <section className="py-12">
        <SectionHeading title="Outside of work" note="the actually interesting part" />
        <div className="flex flex-wrap gap-2.5">
          {OUTSIDE.map((item) => (
            <span key={item} className="rounded-full border border-line bg-paper px-4 py-2 text-sm text-ink transition-colors transition-transform hover:border-gold/60 hover:text-gold">{item}</span>
          ))}
        </div>
      </section>

      {/* Why this site */}
      <section className="py-12">
        <SectionHeading title="Why this site exists" />
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="text-lg leading-relaxed">
            <p className="m-0">This site is simply a home for things I care about: ideas, projects, experiments, and thoughts about the systems that shape our world.</p>
            <div className="mt-5 grid gap-1 border-l-2 border-gold pl-5 font-medium">
              <p className="m-0">Some things will turn into meaningful tools.</p>
              <p className="m-0">Some will become businesses.</p>
              <p className="m-0">Some will remain interesting attempts.</p>
            </div>
          </div>
          <div className="card card-accent p-6 sm:p-8" style={{ ["--c" as string]: "var(--color-gold)" }}>
            <p className="m-0 text-lg">But they all start the same way. A question:</p>
            <p className="hand m-0 mt-2 text-3xl leading-tight">What if this existed?</p>
            <p className="m-0 mt-4 font-display text-xl">Now I feel I have the answer... let&apos;s find out.</p>
            <Link href="/projects" className="btn mt-6">See what I&apos;ve built <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
