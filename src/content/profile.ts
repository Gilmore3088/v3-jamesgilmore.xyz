/**
 * Everything on the site that is "James talking" lives here.
 * Edit freely. No other file needs to change when you reword something.
 *
 * Colors you can use for cards and boxes: "coral" | "teal" | "mustard" | "lilac" | "mint"
 */

export type Accent = "coral" | "teal" | "mustard" | "lilac" | "mint";

export const profile = {
  /* ---------- home hero ---------- */
  eyebrow: "hey, that's me →",
  headline: {
    before: "I'm James. I run far, plan trips like heists, and ",
    highlight: "build stuff",
    after: " that didn't exist yesterday.",
  },
  lede:
    "Seattle-based. Fintech by day, where I make bank data behave. Every other hour goes to the next idea, the next run, or the next trip spreadsheet.",
  photoCaption: "Venice. Zero regrets.",
  photoStickers: ["Seattle, WA", "Long runs", "UCF alum"],
  coordinates: "47.6062° N · 122.3321° W",

  /* ---------- the scrolling tape under the hero ---------- */
  tape: [
    "Runner",
    "Trip planner",
    "Toastmaster",
    "Fintech nerd",
    "Idea hoarder",
    "History reader",
    "Builder of things",
  ],

  /* ---------- "the short version" ---------- */
  facts: [
    {
      title: "I run long distances.",
      text: "The kind where you pack snacks and think about your life choices around mile 18.",
      accent: "coral" as Accent,
      icon: "run",
    },
    {
      title: "I built a student section brand called The Knightmare.",
      text: "UCF Athletics, years ago. It is still the loudest thing I have ever made.",
      accent: "mustard" as Accent,
      icon: "star",
    },
    {
      title: "I plan trips in spreadsheets.",
      text: "Color-coded. With a \"detours\" column, because the best parts are never on the plan.",
      accent: "teal" as Accent,
      icon: "calendar",
    },
    {
      title: "I help 60+ banks grow.",
      text: "Data, analytics, product strategy. If a task gets done by hand three times, I automate it.",
      accent: "lilac" as Accent,
      icon: "trend",
    },
    {
      title: "I ran a Toastmasters club as president.",
      text: "Now I'm the treasurer, which is a lot quieter and involves more spreadsheets.",
      accent: "mint" as Accent,
      icon: "mic",
    },
    {
      title: "I have an MBA in entrepreneurship.",
      text: "A formal way of saying I cannot stop starting things. Some become products. Some stay experiments.",
      accent: "mustard" as Accent,
      icon: "bulb",
    },
  ],

  /* ---------- "currently" defaults (the admin panel overrides these) ---------- */
  currently: [
    { label: "Training for", text: "The next long one. Distance first, speed never.", accent: "coral" as Accent },
    { label: "Building", text: "Notebooks that turn a 20-hour reporting cycle into a coffee break.", accent: "mint" as Accent },
    { label: "Reading", text: "Something about how incentives quietly run the world.", accent: "lilac" as Accent },
    { label: "Plotting", text: "The next trip. The spreadsheet already has nine tabs.", accent: "mustard" as Accent },
  ],

  /* ---------- "things I believe" ---------- */
  beliefs: [
    "If you do it by hand three times, automate it.",
    "Numbers by themselves don't matter. Decisions do.",
    "The barrier to building is gone. The only constraint left is imagination and the nerve to try.",
    "Every good trip needs a plan and a reason to abandon it.",
    "What a time to be alive.",
  ],
  beliefsNote: "strongly, but open to arguments over coffee",

  /* ---------- "ask me about" ---------- */
  askMeAbout: [
    "Marathon fueling",
    "Three-week trips in a spreadsheet",
    "Venice",
    "The Knightmare",
    "Rolling out software to 50 banks",
    "Jupyter notebooks",
    "Negotiating sponsorship deals",
    "Toastmasters",
    "Why history explains everything",
    "Seattle running routes",
  ],

  /* ---------- sign-off ---------- */
  hello: {
    hand: "go on, say something",
    title: "Send me a note.",
    text: "Trip ideas, running routes, half-baked business plans, or a bank that needs its data to behave. All welcome.",
  },
  footerLine: "Made with too much coffee and a spreadsheet",
} as const;
