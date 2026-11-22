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
  /** A real screenshot in /public. `null` renders the text-only layout. */
  image: { src: string; alt: string; caption: string } | null;
  problem: string[];
  why: string[];
  today: string[];
  /** Optional long-form sections for a future case study. */
  caseStudy: { heading: string; body: string[] }[];
};

export type Photo = {
  /** File in /public/photos */
  src: string;
  alt: string;
  /** Short, true, and specific. Leave out what you don't know. */
  caption: string;
  orientation: "landscape" | "portrait" | "square";
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
    /** Three wide photos shown right under the opening. Use `src` values from `photos`. */
    band: string[];
    /** What's going on right now. Update this whenever; it's the most alive part of the page. */
    latelyLabel: string;
    lately: { label: string; text: string }[];
    traitsLabel: string;
    traitsTitle: string;
    traits: { title: string; body: string }[];
    questionsLabel: string;
    questionsTitle: string;
    questions: { question: string; body: string; href: string; cta: string }[];
    placesLabel: string;
    placesTitle: string;
    placesNote: string;
    projectsLabel: string;
    projectsTitle: string;
    projectsNote: string;
  };
  /** Every photo on the site. Home shows a selection; About shows the rest. */
  photos: Photo[];
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
    /** Portrait used on Home. `null` hides it and the layout adjusts. */
    photo: { src: string; alt: string; caption: string } | null;
    /** Wide photo at the top of About. A `src` from `photos`. */
    heroPhoto: string;
    doLabel: string;
    /** Short "I ..." lines. Keep them true and small. */
    iDo: string[];
    /** Career in chapters, oldest first. Shown compact on About. */
    path: { period: string; title: string; detail: string }[];
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
    headline: "Curious by default. I learn by building, and I build to make things work better.",
    intro:
      "I'm James. I live in Seattle with my wife, I kayak whenever the water lets me, and we travel whenever the points allow. Most of my working life goes to solving problems for banks: making sense of their data and building tools that make the work easier. This is the personal site. The person comes first here, and the work comes second.",
    aboutCta: "More about me",
    contactCta: "Say hello",
    band: ["kayak-sunset", "patagonia-camp", "shanghai"],
    latelyLabel: "Lately",
    lately: [
      {
        label: "At work",
        text: "Building the processes and partnerships behind the client success team at Velocity, a CSI company: data pipelines, the internal workflows that keep clients moving, and the outside partners who help.",
      },
      {
        label: "On the water",
        text: "Kayaking as much as the water allows, at home and wherever we travel.",
      },
      {
        label: "On the move",
        text: "Traveling with my wife, and churning credit cards to pay for it. The points game is a puzzle I enjoy more than I should.",
      },
    ],
    traitsLabel: "What I'm like",
    traitsTitle: "Three things that are true of me.",
    traits: [
      {
        title: "I'm curious.",
        body: "I want to know how things actually work, and I'll keep pulling the thread until I do. Most of what I've learned started as a question I couldn't let go of.",
      },
      {
        title: "I learn by building.",
        body: "Reading about something gets me halfway. Making a small, working version gets me the rest of the way, and usually shows me what the real question was.",
      },
      {
        title: "I'm there to improve the outcome.",
        body: "Whatever the problem, the goal is the same: leave the people involved with something that works better than it did before, and that they can trust.",
      },
    ],
    questionsLabel: "Questions I'm chasing",
    questionsTitle: "A few things I keep turning over.",
    questions: [
      {
        question: "How can AI improve a real workflow without making it harder to trust?",
        body: "Most demos skip the hard part, which is the person who has to review the result. I'm trying to build things a compliance officer can actually check.",
        href: "/projects/ai-banking-institute",
        cta: "What that turned into",
      },
      {
        question: "Why is public information so hard to actually use?",
        body: "Bank fees are published by law and still nearly impossible to compare. Fee Insight is my attempt to fix one corner of that.",
        href: "/projects/fee-insight",
        cta: "What that turned into",
      },
      {
        question: "Where should we go next, and how do we get there on points?",
        body: "A trip is a problem worth over-planning. I keep a spreadsheet for the route and another for the credit cards, and the best days are always the ones that ignore both.",
        href: "/about",
        cta: "Where we've been",
      },
    ],
    placesLabel: "Places",
    placesTitle: "Out in the world.",
    placesNote: "A few from the road. More on the About page.",
    projectsLabel: "Work, briefly",
    projectsTitle: "Two things I'm building.",
    projectsNote: "The work gets its own pages. The short version is here.",
  },

  photos: [
    { src: "kayak-sunset", alt: "James paddling a kayak toward the setting sun, mountains along the shore.", caption: "On the water, sunset", orientation: "square" },
    { src: "kayak-whale", alt: "A humpback whale surfacing beside a tandem kayak, with James and his wife watching from the boat.", caption: "A whale, closer than planned", orientation: "square" },
    { src: "rafting", alt: "James and three friends mid-rapid in a yellow raft, paddles up, everyone grinning.", caption: "Whitewater, with friends", orientation: "landscape" },
    { src: "venice-us", alt: "James and his wife in front of a terracotta building on a Venice canal.", caption: "Venice, with my wife", orientation: "portrait" },
    { src: "venice-canal", alt: "Boats on the Grand Canal in Venice on a clear afternoon.", caption: "Venice, the Grand Canal", orientation: "landscape" },
    { src: "great-wall-us", alt: "James and his wife sitting on the Great Wall of China with the wall winding over the hills behind them.", caption: "The Great Wall", orientation: "portrait" },
    { src: "great-wall", alt: "A rough, unrestored stretch of the Great Wall climbing a ridge.", caption: "The Great Wall, the quiet stretch", orientation: "square" },
    { src: "shanghai", alt: "The Shanghai skyline lit up at night across the river, with the moon above.", caption: "Shanghai", orientation: "landscape" },
    { src: "patagonia-camp", alt: "Rows of yellow tents below jagged granite peaks in Patagonia.", caption: "Patagonia, camp night", orientation: "landscape" },
    { src: "patagonia-bridge", alt: "A narrow suspension bridge leading across a ravine toward a glacier in fog.", caption: "Patagonia, the bridge to the glacier", orientation: "landscape" },
    { src: "atacama", alt: "James and his wife at a salt lagoon in the Atacama Desert, flamingos in the water behind them.", caption: "Atacama Desert", orientation: "portrait" },
    { src: "santiago", alt: "James and his wife in a park in Santiago with the city skyline behind.", caption: "Santiago", orientation: "portrait" },
    { src: "boat-bow", alt: "James sitting alone on the blue bow of a boat, looking out at islands on the horizon.", caption: "Island hopping", orientation: "portrait" },
    { src: "fishing-boat", alt: "A small blue and white fishing boat anchored off a sandy beach.", caption: "A beach, a boat", orientation: "landscape" },
    { src: "rainier-window", alt: "Mount Rainier above the Cascades, seen past an airplane wing.", caption: "Mount Rainier from the window seat", orientation: "portrait" },
    { src: "mountain-pass", alt: "A forested valley and a mountain highway in the Cascades.", caption: "The Cascades", orientation: "portrait" },
    { src: "puget-sound-ferry", alt: "A Washington State ferry crossing Puget Sound at sunset, framed by trees.", caption: "Puget Sound, a ferry at sunset", orientation: "portrait" },
    { src: "world-cup-seattle", alt: "James and his wife in the stands at a 2026 World Cup match in Seattle.", caption: "World Cup 2026, Seattle", orientation: "landscape" },
    { src: "chicago-bridge", alt: "James and his wife on the Michigan Avenue bridge in Chicago.", caption: "Chicago", orientation: "landscape" },
    { src: "chicago-lakefront", alt: "The Chicago lakefront trail with the skyline ahead.", caption: "Chicago, the lakefront trail", orientation: "portrait" },
    { src: "garden", alt: "Arugula growing in a raised garden bed.", caption: "The garden, arugula winning", orientation: "portrait" },
  ],

  projects: [
    {
      slug: "fee-insight",
      name: "Fee Insight",
      kicker: "Published bank fees, read from the source and easy to compare.",
      summary:
        "A public index of what U.S. banks and credit unions charge, read from each institution's own fee schedule, plus a workspace for the teams who need to compare them.",
      status: "Live",
      url: "https://feeinsight.com",
      image: {
        src: "/projects/fee-insight.png",
        alt: "The Fee Insight home page, with the Bank Fee Index showing the U.S. median monthly maintenance fee against one institution's.",
        caption: "feeinsight.com, November 2026",
      },
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
      image: {
        src: "/projects/ai-banking-institute.png",
        alt: "The AI Banking Institute home page, asking whether a team is ready to use AI safely, next to a practice exercise from the Foundation course.",
        caption: "aibankinginstitute.com, November 2026",
      },
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
    lede: "Seattle, by way of Florida. Sports, then consulting, then banking technology, then building my own tools. The pattern took me a while to notice.",
    paragraphs: [
      "My first real job was in collegiate athletics, on the external operations side at the University of Central Florida. I helped build a student section brand called The Knightmare, worked on ticket sales, and built dashboards to track how the department was doing.",
      "From there I spent a few years consulting for university and professional sports business units: sponsorship valuations, negotiations, RFPs, and dashboards for executives who needed an answer by Friday. It was my first lesson in a pattern I keep seeing. The data usually exists. What's missing is someone willing to make it legible.",
      "Banking technology came next. I've spent the years since working with banks and credit unions on software implementations, analytics, and client work, and automating the parts of that work that used to be done by hand. The scale is different from athletics. The problem is the same.",
      "Along the way I picked up an MBA in entrepreneurship, which is a formal way of saying I can't stop starting things. Lately those things have been Fee Insight and The AI Banking Institute, both of which started as questions I couldn't find a good answer to.",
      "I'm optimistic about AI and allergic to demos. The interesting question isn't whether a model can do something impressive. It's whether a person inside a bank can use it on a real task and show their work afterward. That's the bar I try to build to.",
    ],
    lifeLine:
      "I live in Seattle. When I'm not at a desk I'm usually in a kayak, on a long run, or planning the next trip in more detail than it needs.",
    photo: { src: "/photos/venice-us.jpg", alt: "James Gilmore and his wife in Venice", caption: "Venice, with my wife" },
    heroPhoto: "great-wall-us",
    doLabel: "Things I do",
    iDo: [
      "I kayak, as often as I can.",
      "I run long distances.",
      "I plan trips in more detail than they need, and I churn credit cards to pay for them.",
      "I read history.",
      "I grow things, with mixed results.",
      "I watch a lot of sports, and I used to work in them.",
      "I show up to Toastmasters.",
      "I build small tools for problems that annoy me.",
    ],
    path: [
      {
        period: "2011–2016",
        title: "Collegiate athletics",
        detail: "Ticket sales, then external operations at UCF Athletics. Helped build The Knightmare student section and the department's KPI dashboards.",
      },
      {
        period: "2016–2018",
        title: "Sports business consulting",
        detail: "Sponsorship valuations, negotiations, RFPs, and executive dashboards for university and professional sports.",
      },
      {
        period: "2018–2021",
        title: "Independent consulting",
        detail: "Strategy, software training, and negotiation support for university and athletics business units.",
      },
      {
        period: "2019–present",
        title: "Banking technology",
        detail: "Software implementations, analytics, and automation for banks and credit unions. Now building the processes, data pipelines, and partnerships behind the client success team at Velocity, a CSI company.",
      },
      {
        period: "Now",
        title: "Independent builder",
        detail: "Fee Insight and The AI Banking Institute, built on my own time.",
      },
    ],
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
