/**
 * Everything the site says lives here: copy, links, projects, metadata.
 * Edit this file and nothing else needs to change.
 *
 * Rules the pages follow:
 * - A link, email, or project URL left as `null` or omitted is simply not rendered.
 * - `projects[].caseStudy` is empty until there is something real to say.
 */

export type Link = {
  label: string;
  href: string;
  /** Short display text, e.g. a handle. Falls back to the href. */
  handle?: string;
};

export type Project = {
  /** URL segment: /projects/<slug> */
  slug: string;
  name: string;
  /** One line under the name. */
  kicker: string;
  /** Two or three sentences for cards and list pages. */
  summary: string;
  /** Label shown in the project meta, e.g. "Live", "In progress". */
  status: string;
  /** Public site. Omit or set null until it exists. */
  url: string | null;
  problem: string[];
  why: string[];
  today: string[];
  /** Optional long-form sections for a future case study. */
  caseStudy: { heading: string; body: string[] }[];
};

export type SiteContent = {
  name: string;
  url: string;
  location: string;
  role: string;
  /** Default <title> and sharing title. */
  title: string;
  /** Default meta description. */
  description: string;
  nav: Link[];
  /** Public profiles. Rendered on Contact and in the footer. */
  links: Link[];
  /** Set to a real address to show it on the Contact page. `null` hides it. */
  email: string | null;
  home: {
    eyebrow: string;
    /** Optional: wrap one phrase in *asterisks* to set it in italic. Plain by default. */
    headline: string;
    intro: string;
    aboutCta: string;
    contactCta: string;
    projectsLabel: string;
    projectsTitle: string;
    approachLabel: string;
    approachTitle: string;
    principles: { title: string; body: string }[];
  };
  projects: Project[];
  projectsPage: {
    title: string;
    lede: string;
    caseStudyNote: string;
  };
  about: {
    title: string;
    lede: string;
    paragraphs: string[];
    /** The one line about place and life outside work. */
    lifeLine: string;
    /** Optional portrait. `null` hides it and the layout adjusts. */
    photo: { src: string; alt: string; caption: string } | null;
  };
  contact: {
    title: string;
    lede: string;
    body: string;
    linksLabel: string;
    emailLabel: string;
    formNote: string;
  };
  footer: {
    line: string;
  };
};

export const site: SiteContent = {
  name: "James Gilmore",
  url: "https://jamesgilmore.xyz",
  location: "Seattle, Washington",
  role: "Banking technology consultant and independent builder",
  title: "James Gilmore",
  description:
    "I help banks make sense of complex data, and I build tools that make the work easier. Seattle-based banking technology consultant and independent builder behind Fee Insight and The AI Banking Institute.",

  nav: [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],

  links: [
    { label: "GitHub", href: "https://github.com/Gilmore3088", handle: "github.com/Gilmore3088" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/JamesLGilmore", handle: "linkedin.com/in/JamesLGilmore" },
  ],
  email: null,

  home: {
    eyebrow: "Seattle, Washington",
    headline: "I help banks make sense of complex data, and I build tools that make the work easier.",
    intro:
      "I work in banking technology: analytics, client implementations, and the kind of automation that gives people their afternoons back. On my own time I build tools I wish already existed, and I think a lot about how AI can improve real workflows without making them harder to trust.",
    aboutCta: "More about me",
    contactCta: "Get in touch",
    projectsLabel: "Projects",
    projectsTitle: "Two things I'm building.",
    approachLabel: "Approach",
    approachTitle: "How I work.",
    principles: [
      {
        title: "Start from the workflow.",
        body: "A tool is only useful if it fits how people already work. I would rather fix one real task well than demo ten.",
      },
      {
        title: "Make it checkable.",
        body: "In banking, trust comes from showing your sources. If a reviewer can't trace a number back to where it came from, it isn't finished.",
      },
      {
        title: "Build the smaller thing.",
        body: "Most of what I'm proud of started as a narrow fix for a problem I kept running into. Scope can grow later, if it earns it.",
      },
    ],
  },

  projects: [
    {
      slug: "fee-insight",
      name: "Fee Insight",
      kicker: "Published bank fees, read from the source and easy to compare.",
      summary:
        "A public index of what U.S. banks and credit unions charge, read from each institution's own fee schedule, plus a workspace for the teams who need to compare them.",
      status: "Live",
      url: "https://feeinsight.com",
      problem: [
        "Fee information is public in theory and scattered in practice. Every institution publishes a schedule, but they live in PDFs and account disclosures that use different names for the same thing.",
        "Finding out what one bank charges, let alone how that compares to the bank down the street, takes far more effort than it should. That gap hurts the institutions trying to set fair prices as much as it hurts the people paying them.",
      ],
      why: [
        "I spent years helping banks look at their own numbers and kept running into the same problem: the fee data existed, but nobody had made it legible.",
        "Fee Insight is my attempt to do that carefully. Every fee is read from the institution's own schedule and traced to a saved copy of it. The index reports what is published without recommending a price, and it stays independent of the institutions it covers.",
      ],
      today: [
        "Fee Insight has two parts. The Bank Fee Index is public and free to explore, with links back to the source schedules.",
        "Hamilton is the workspace side. It brings fee comparisons together with financial performance, market conditions, and regulatory context for banking teams that need to decide what deserves a closer look.",
      ],
      caseStudy: [],
    },
    {
      slug: "ai-banking-institute",
      name: "The AI Banking Institute",
      kicker: "Practical AI training and governance for community banks and credit unions.",
      summary:
        "Education and governance resources that help community banks and credit unions turn AI interest into work a reviewer can check.",
      status: "Live",
      url: "https://www.aibankinginstitute.com",
      problem: [
        "AI arrived at smaller institutions before most of them had a plan for it. At banking conferences AI was everywhere, but many community bank and credit union teams still had no practical answer for which use cases to start with, what controls to put around them, or who owns the result.",
        "Generic demos don't help a compliance officer sign off on anything. What these teams need is a way to start small and leave a record someone can review.",
      ],
      why: [
        "I believe the people who know a workflow best are the right people to improve it. In a regulated industry, the output also has to be something a manager, a risk officer, or an examiner can inspect.",
        "The Institute is built around that idea: pick one real banking task, set the boundaries, and leave behind an artifact someone can review. Every claim cites its source, and the curriculum is organized around the public guidance banks already work under.",
      ],
      today: [
        "The Institute offers a free readiness assessment, a self-paced foundation course, and plain-language guides on topics like AI acceptable-use policies and vendor due diligence.",
        "It publishes its methodology and the sources it teaches from, and it is careful about what it does not claim. No regulator endorses it, and the site says so plainly.",
      ],
      caseStudy: [],
    },
  ],

  projectsPage: {
    title: "Projects",
    lede: "Two things I'm building. Both started as questions I couldn't find a good answer to, and both are about making banking information easier to find, compare, and trust.",
    caseStudyNote: "A longer write-up is on the way. For now, the project's own site is the best place to see it.",
  },

  about: {
    title: "I got into banking by way of a football stadium.",
    lede: "The short version: sports, then consulting, then banking technology, then building my own tools. The pattern took me a while to notice.",
    paragraphs: [
      "My first real job was in collegiate athletics, on the external operations side at the University of Central Florida. I helped build a student section brand called The Knightmare, worked on ticket sales, and built dashboards to track how the department was doing.",
      "From there I spent a few years consulting for university and professional sports business units: sponsorship valuations, negotiations, RFPs, and dashboards for executives who needed an answer by Friday. It was my first lesson in a pattern I keep seeing. The data usually exists. What's missing is someone willing to make it legible.",
      "Banking technology came next. I've spent the years since working with banks and credit unions on software implementations, analytics, and client work, and automating the parts of that work that used to be done by hand. The scale is different from athletics. The problem is the same.",
      "Along the way I picked up an MBA in entrepreneurship, which is a formal way of saying I can't stop starting things. Lately those things have been Fee Insight and The AI Banking Institute, both of which started as questions I couldn't find a good answer to.",
      "I'm optimistic about AI and allergic to demos. The interesting question isn't whether a model can do something impressive. It's whether a person inside a bank can use it on a real task and show their work afterward. That's the bar I try to build to.",
    ],
    lifeLine:
      "I live in Seattle. When I'm not at a desk I'm usually on a long run, somewhere outdoors, or planning the next trip in more detail than it needs.",
    // The only photo in the repo is a travel snapshot with another person in it.
    // Example: { src: "/profile.jpg", alt: "James Gilmore", caption: "Venice" }
    photo: null,
  },

  contact: {
    title: "Say hello.",
    lede: "If you work in banking technology, think about data for a living, or are building something useful, I'd like to hear from you.",
    body: "I'm not selling anything here and I'm not looking for a job. I just like talking with people who care about the same problems. The best way to reach me is through one of the links below.",
    linksLabel: "Find me",
    emailLabel: "Email",
    formNote: "There's no contact form on purpose. A short message through any of these gets read.",
  },

  footer: {
    line: "Seattle, Washington",
  },
};

export function getProject(slug: string): Project | undefined {
  return site.projects.find((p) => p.slug === slug);
}
