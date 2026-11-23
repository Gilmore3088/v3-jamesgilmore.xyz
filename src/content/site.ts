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
  /** Which trip this belongs to; matches a `trips[].id`. */
  trip: string;
};

export type Trip = {
  id: string;
  name: string;
  /** Optional one-liner under the trip name. */
  note?: string;
  /** Year or range, if known. */
  when?: string;
  /** Map pins as [latitude, longitude]. A trip with none is listed but not pinned. */
  pins?: [number, number][];
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
    /** Text under the map once the route has drawn. */
    mapHint: string;
    /** Photos in the mosaic under the opening. `src` values from `photos`. */
    band: string[];
    /** What's going on right now. Update this whenever; it's the most alive part of the page. */
    latelyLabel: string;
    lately: { label: string; text: string }[];
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
  /** Every photo on the site. Home shows `home.band`; Places shows them all, grouped by trip. */
  photos: Photo[];
  /**
   * The route the home page draws first: where you've lived, in order.
   * Each stop is [latitude, longitude]; `note` shows when the dot is picked.
   */
  journey: { name: string; pin: [number, number]; note?: string }[];
  /** Trips in the order they appear on Places. */
  trips: Trip[];
  /** Places still on the list. Hollow pins on the map. */
  wishlist: { name: string; pins: [number, number][]; note?: string }[];
  /** Countries to shade on the map, by English name as Natural Earth spells them. */
  visitedCountries: string[];
  placesPage: { title: string; lede: string; mapNote: string; beenLabel: string; wishLabel: string; panelHint: string };
  projects: Project[];
  projectsPage: {
    title: string;
    lede: string;
    caseStudyNote: string;
    /** Smaller things. Rendered only when the list has entries. */
    experimentsLabel: string;
    experimentsNote: string;
    experiments: { name: string; summary: string; url?: string | null }[];
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
    /** Short "I ..." lines with a one-line note. Icons: water, plane, run, leaf, book, wrench, mic. */
    iDo: { text: string; note: string; icon: string }[];
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
    { label: "Places", href: "/places" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],

  links: [
    { label: "GitHub", href: "https://github.com/Gilmore3088", handle: "github.com/Gilmore3088" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/JamesLGilmore", handle: "linkedin.com/in/JamesLGilmore" },
  ],
  email: "JLGilmore2@gmail.com",

  home: {
    eyebrow: "Seattle, Washington",
    headline: "Curious, out on the water, usually planning the next trip.",
    intro:
      "I'm James. I live in Seattle with my wife, Nikoly. I kayak whenever the water lets me, and we travel whenever the points allow. Most of my working life goes to solving problems for banks: making sense of their data and building tools that make the work easier. This is the personal site. The person comes first here, and the work comes second.",
    aboutCta: "More about me",
    contactCta: "Say hello",
    mapHint: "Drag to move, scroll to zoom, pick a dot.",
    band: ["great-wall-us", "patagonia-camp", "kayak-whale", "shanghai", "atacama"],
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
        text: "Traveling with Nikoly, and churning credit cards to pay for it. The points game is a puzzle I enjoy more than I should.",
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
        href: "/places",
        cta: "Where we've been",
      },
    ],
    placesLabel: "Places",
    placesTitle: "Out in the world.",
    placesNote: "A few from the road. The rest are on the Places page, grouped by trip.",
    projectsLabel: "Work, briefly",
    projectsTitle: "Two things I'm building.",
    projectsNote: "The work gets its own pages. The short version is here.",
  },

  photos: [
    { src: "kayak-sunset", alt: "James paddling a kayak toward the setting sun off Maui, mountains along the shore.", caption: "Maui, sunset paddle", orientation: "square", trip: "maui" },
    { src: "kayak-whale", alt: "A humpback whale surfacing beside a tandem kayak off Maui, with James and Nikoly watching from the boat.", caption: "Maui, a whale closer than planned", orientation: "square", trip: "maui" },
    { src: "rafting", alt: "James and three friends mid-rapid in a yellow raft on the Nantahala River, paddles up, everyone grinning.", caption: "Nantahala River, with friends", orientation: "landscape", trip: "nantahala" },
    { src: "venice-us", alt: "James and Nikoly in front of a terracotta building on a Venice canal.", caption: "Venice, with Nikoly", orientation: "portrait", trip: "italy" },
    { src: "venice-canal", alt: "Boats on the Grand Canal in Venice on a clear afternoon.", caption: "Venice, the Grand Canal", orientation: "landscape", trip: "italy" },
    { src: "great-wall-us", alt: "James and Nikoly sitting on the Great Wall of China with the wall winding over the hills behind them.", caption: "The Great Wall", orientation: "portrait", trip: "china" },
    { src: "great-wall", alt: "A rough, unrestored stretch of the Great Wall climbing a ridge.", caption: "The Great Wall, the quiet stretch", orientation: "square", trip: "china" },
    { src: "shanghai", alt: "The Shanghai skyline lit up at night across the river, with the moon above.", caption: "Shanghai", orientation: "landscape", trip: "china" },
    { src: "patagonia-camp", alt: "Rows of yellow tents below jagged granite peaks in Patagonia.", caption: "Patagonia, camp night", orientation: "landscape", trip: "chile" },
    { src: "patagonia-bridge", alt: "A narrow suspension bridge leading across a ravine toward a glacier in fog.", caption: "Patagonia, the bridge to the glacier", orientation: "landscape", trip: "chile" },
    { src: "atacama", alt: "James and Nikoly at a salt lagoon in the Atacama Desert, flamingos in the water behind them.", caption: "Atacama Desert", orientation: "portrait", trip: "chile" },
    { src: "santiago", alt: "James and Nikoly in a park in Santiago with the city skyline behind.", caption: "Santiago", orientation: "portrait", trip: "chile" },
    { src: "boat-bow", alt: "James sitting alone on the blue bow of a boat off Coron in the Philippines, islands on the horizon.", caption: "Coron, Philippines", orientation: "portrait", trip: "philippines" },
    { src: "fishing-boat", alt: "A small blue and white fishing boat anchored off a beach on Ilhabela, Brazil.", caption: "Ilhabela, Brazil", orientation: "landscape", trip: "brazil" },
    { src: "rainier-window", alt: "Mount Rainier above the Cascades, seen past an airplane wing.", caption: "Mount Rainier from the window seat", orientation: "portrait", trip: "home" },
    { src: "mountain-pass", alt: "A forested valley and a mountain highway in the Cascades.", caption: "The Cascades", orientation: "portrait", trip: "home" },
    { src: "puget-sound-ferry", alt: "A Washington State ferry crossing Puget Sound at sunset, framed by trees.", caption: "Puget Sound, a ferry at sunset", orientation: "portrait", trip: "home" },
    { src: "world-cup-seattle", alt: "James and Nikoly in the stands at a 2026 World Cup match in Seattle.", caption: "World Cup 2026, Seattle", orientation: "landscape", trip: "home" },
    { src: "chicago-bridge", alt: "James and Nikoly on the Michigan Avenue bridge in Chicago.", caption: "Chicago", orientation: "landscape", trip: "chicago" },
    { src: "chicago-lakefront", alt: "The Chicago lakefront trail with the skyline ahead.", caption: "Chicago, the lakefront trail", orientation: "portrait", trip: "chicago" },
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
        "I spent years helping banks look at their own numbers, and fee comparisons were always the slow, manual part: someone opening twenty PDFs and retyping what they found.",
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
    lede: "Two things I'm building. Both are about making banking information easier to find, compare, and trust.",
    caseStudyNote: "A longer write-up is on the way. For now, the project's own site is the best place to see it.",
    experimentsLabel: "Smaller things",
    experimentsNote: "Tools and experiments that solved one problem and stopped there.",
    experiments: [],
  },

  trips: [
    { id: "home", name: "Seattle", note: "Home. The Sound and the Cascades.", pins: [[47.61, -122.33]] },
    { id: "maui", name: "Maui", pins: [[20.8, -156.33]] },
    { id: "chile", name: "Chile", note: "Patagonia, the Atacama, and Santiago in between.", pins: [[-51.0, -73.0], [-23.45, -68.1], [-33.45, -70.67]] },
    { id: "brazil", name: "Brazil", note: "Ilhabela, Florianópolis, and São Paulo.", pins: [[-23.78, -45.36], [-27.59, -48.55], [-23.55, -46.69]] },
    { id: "chicago", name: "Chicago", pins: [[41.88, -87.63]] },
    { id: "nantahala", name: "Nantahala River", note: "North Carolina.", pins: [[35.33, -83.6]] },
    { id: "italy", name: "Italy", note: "Rome in 2017, then Venice and Milan.", pins: [[45.44, 12.33], [41.9, 12.5], [45.47, 9.18]] },
    { id: "croatia", name: "Croatia", note: "Dubrovnik and Hvar.", when: "2017", pins: [[42.64, 18.11], [43.17, 16.43]] },
    { id: "spain", name: "Córdoba, Spain", when: "2018", pins: [[37.88, -4.78]] },
    { id: "portugal", name: "Lisbon", when: "2019", pins: [[38.71, -9.13]] },
    { id: "morocco", name: "Marrakech", when: "2023", pins: [[31.63, -7.99]] },
    { id: "northeast", name: "New York and Philadelphia", when: "2025", pins: [[40.76, -73.98], [39.97, -75.13]] },
    { id: "china", name: "China", note: "Beijing, the Great Wall at its quiet end, then Shanghai.", when: "2019", pins: [[40.67, 117.25], [31.23, 121.47]] },
    { id: "philippines", name: "Coron, Philippines", pins: [[11.99, 120.2]] },
  ],
  journey: [
    { name: "Orlando", pin: [28.54, -81.38], note: "Where it started. UCF, and the football stadium." },
    { name: "Chicago", pin: [41.88, -87.63], note: "Sports consulting years." },
    { name: "Orange County", pin: [33.72, -117.83] },
    { name: "Seattle", pin: [47.61, -122.33], note: "Home." },
  ],
  wishlist: [{ name: "Samarkand, Uzbekistan", pins: [[39.65, 66.98]], note: "The Registan. A dream, not a plan yet." }],
  visitedCountries: ["United States of America", "Chile", "China", "Italy", "Philippines", "Brazil", "Croatia", "Spain", "Portugal", "Morocco"],
  placesPage: {
    title: "Out in the world.",
    lede: "Trips with Nikoly, mostly, and a few from closer to home. Pick a pin to see the trip, or scroll. Click any photo to see it larger.",
    mapNote: "Pins jump to that trip's photos.",
    beenLabel: "Been",
    wishLabel: "Want to go",
    panelHint: "Pick a pin on the map.",
  },

  about: {
    title: "Seattle, by way of Florida and a football stadium.",
    lede: "Sports, then consulting, then banking technology, then building my own tools. The pattern took me a while to notice.",
    paragraphs: [
      "My first real job was in the athletics department at the University of Central Florida, on the side of the operation that sells tickets and fills the stadium. The student section had no identity, so a few of us built one and called it The Knightmare. I spent game days figuring out why some sections filled and others didn't, turned student guest tickets into a revenue line the department hadn't had before, and built the dashboards that told us, week by week, whether any of it was working.",
      "That was the lesson I kept relearning afterward: the numbers were always there. Somebody had to make them readable, and then somebody had to act on them.",
      "I took that into a few years of consulting for university and professional sports business units: sponsorship valuations, negotiations, RFPs, and dashboards for executives who needed an answer by Friday. Then banking technology, where I've spent the years since working with banks and credit unions on software implementations, analytics, and the automation that replaces work done by hand. The scale is different from athletics. The problem is the same.",
      "Along the way I picked up an MBA in entrepreneurship. The two things I've built on my own time, Fee Insight and The AI Banking Institute, each began as a problem I ran into at work and couldn't stop thinking about.",
      "On AI, I'm optimistic and allergic to demos. The interesting question isn't whether a model can do something impressive. It's whether a person inside a bank can use it on a real task and show their work afterward. That's the bar I try to build to.",
    ],
    lifeLine:
      "I live in Seattle with Nikoly. When I'm not at a desk I'm in a kayak, on a long run, or at the airport.",
    photo: { src: "/photos/venice-us.jpg", alt: "James and Nikoly in Venice", caption: "Venice, with Nikoly" },
    heroPhoto: "great-wall-us",
    doLabel: "Things I do",
    iDo: [
      { text: "Kayak, as often as I can", note: "Puget Sound at home. Maui when we're lucky.", icon: "water" },
      { text: "Travel on points", note: "Churning credit cards pays for most of it. The planning is half the fun.", icon: "plane" },
      { text: "Run long distances", note: "Distance first, speed never.", icon: "run" },
      { text: "Grow things", note: "Mixed results. The arugula is winning.", icon: "leaf" },
      { text: "Read history", note: "It explains more than it should.", icon: "book" },
      { text: "Show up to Toastmasters", note: "Past president, current treasurer.", icon: "mic" },
      { text: "Watch a lot of sports", note: "I used to work in them.", icon: "ball" },
      { text: "Build small tools", note: "For problems that annoy me. Two of them grew up.", icon: "wrench" },
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
        period: "2019–now",
        title: "Banking technology",
        detail: "Software implementations, analytics, and automation for banks and credit unions. Today: the processes, data pipelines, and partnerships behind the client success team at Velocity, a CSI company. The consulting overlapped with the first two years.",
      },
      {
        period: "On the side",
        title: "Fee Insight and The AI Banking Institute",
        detail: "Two tools built on my own time, both live.",
      },
    ],
  },

  contact: {
    title: "Say hello.",
    lede: "Banking technology, data, a trip you're planning, a kayak route, or something you're building. If it's interesting, I'd like to hear about it.",
    body: "I'm not selling anything here and I'm not looking for a job. I just like talking with people who are curious about the same things. The best way to reach me is through one of the links below.",
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
