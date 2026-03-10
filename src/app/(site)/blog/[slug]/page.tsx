import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import { ArrowLeft } from "lucide-react";

interface BlogPost {
  title: string;
  slug: string;
  content: string;
  category: string;
  created_at: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    title: "Building a Path Forward: My First Blog",
    slug: "building-a-path-forward",
    category: "Welcome",
    created_at: "2024-10-18",
    content: `Welcome to my blog. Sometimes these posts will be short, more of a stream of consciousness. Other times they'll be longer, well-thought-out reflections on life, my interests, and the process of growth. This blog is an opportunity for me to capture my thoughts, reflect on my experiences, and identify areas where I can improve. I also hope to use this space to share ideas, connect with others, and maybe even inspire someone along the way.

I've noticed that in today's world, the ability to build and create is easier than ever before. Technology is rapidly evolving, and it's creating more opportunities than I ever imagined. Tools like Replit, OpenAI, and Claude, along with automation platforms like Make and Zapier, are not only adding complexity but also expanding what's possible. Every week, it feels like the risk of not building grows, simply because the possibilities are endless.

The thought of building something - whether it's a project, an idea, or even this website - is both exciting and a little daunting. But I'm hopeful. With discipline and a strong desire to grow, I believe this blog and my journey will evolve alongside me. It's my hope that as I write and create, this space will become a sort of incubator for my ideas, a place where I can explore new concepts, connect with like-minded people, and learn from myself (mistakes aplenty), and of course others.

Through this process, I will stumble across weaknesses or areas where I can improve. Maybe if I'm lucky opportunities that I hadn't seen before. That's part of the journey. Self-awareness, growth, and adaptation are crucial in navigating life's challenges, and I'm committed to that. I'm optimistic that through consistent effort and a desire to learn, this site will reflect my evolution as a person.

Ultimately, I'm driven by the desire to connect. To learn from others, to share what I've learned, and maybe even to inspire someone who's on a similar path. That's the beauty of building - it's not just about the final product; it's about the journey. The world is full of possibilities, and there's a path out there for each of us. I'm excited to be on mine, and I'm inviting you to come along.

So, here's to the start of something new. Whether you're here for the tech talk, the personal reflections, or just out of curiosity, I hope you'll find something meaningful. This is the beginning, and I'm excited to see where it takes me - and hopefully, us.

Thanks for reading, and welcome to my journey.`,
  },
  {
    title: "Christmas - the gift of travel",
    slug: "christmas-the-gift-of-travel",
    category: "Travel",
    created_at: "2024-12-25",
    content: `**Traveling for the Holidays: Pros, Cons, and Why It's for Me**

The holidays often evoke images of family gatherings, cozy evenings by the fire, and shopping sprees for the perfect gifts. For me, though, the holidays have become something else entirely - an opportunity to explore the world, create lasting memories, and reflect on my relationship with the season.

## Pros of Traveling for the Holidays

**Exploring New Cultures**

This year, I'm spending the holidays in Chile. Experiencing how another culture celebrates this time of year is eye-opening and enriching. From unique traditions to new cuisines, it's a way to expand my worldview in a way no gift could ever match.

**Escaping the Seattle Cold**

Let's face it - Seattle winters are no joke. Traveling to a warmer climate isn't just a physical escape; it's a mental reset. Sunshine has a way of lifting your spirits and setting a different tone for the holiday season.

**Memories Over Material Things**

Travel may not always be the cheaper option, but the experiences and memories far outweigh the temporary joy of buying more stuff. Years from now, I'll remember hiking in Patagonia or eating empanadas by the ocean - not the gadgets I didn't buy.

## Cons of Traveling for the Holidays

**Missing Family**

One of the hardest parts of being away is not sharing those little holiday moments with family. The laughter, the traditions, even the chaos - it's something I'll always miss, no matter where I am.

**Travel Stress**

Ah, the joys of airline snafus and miscommunications. Traveling over the holidays isn't always smooth sailing, and the stress can sometimes overshadow the adventure.

**The Holiday Disconnect**

When you're far from home, it can feel like you're missing out on the collective energy of the holidays - decorations, festive music, or just that warm sense of togetherness.

## Why It's For Me

The holidays have always been a complicated time for me. Growing up, my parents divorced when I was 13. From then on, my dad would give me money to buy gifts for my mom, and my mom would do the same for my dad. As a kid, I found it odd - and honestly, frustrating - that I didn't have my own money to buy them gifts.

Later, I watched my dad - an incredibly giving person - spend what little money he had on gifts for everyone. As I got older, I realized how exhausting and financially taxing it must have been for him, and I told myself I didn't want that to be my experience.

Over time, I've swung to the opposite extreme. Living far from home, I've prioritized experiences over traditional holiday expectations. Instead of spending the season shopping and wrapping, I've chosen to use this time to travel, reflect, and create memories that feel more meaningful to me.

## Closing Thoughts

Traveling for the holidays isn't for everyone, and it doesn't have to be a permanent choice. But for me, it's a way to reconnect with myself and the world, even if it means stepping away from family traditions. As much as I miss the familiar warmth of home, I've found joy in the unfamiliar - new places, new people, and new perspectives.

The holidays are what we make of them. Whether that means gathering with loved ones or venturing into the unknown, the most important thing is to create a season that feels right for you.

Would you consider traveling for the holidays, or is home where your heart is?`,
  },
  {
    title: "We all start as strangers",
    slug: "we-all-start-as-strangers",
    category: "Connections",
    created_at: "2025-01-06",
    content: `In many respects, we grow up being told to avoid strangers. Hilariously, I once went to a pro basketball game and sat next to a young girl and her father. I said hello, and the girl immediately yelled, "Stranger danger!" As kids, this might be the safe thing to do. But as adults... is it? The easy answer to avoid awkward moments: no.

But when does a stranger stop being a stranger?

As we age, it seems increasingly challenging to meet new people. Maybe it's because of our routines, our obligations, or a lack of opportunities for connection. Whatever the reason, forming new friendships often feels like a daunting task.

Recently, I hiked the O Circuit in Torres del Paine, nestled in Chilean Patagonia. We started as a group of three: my wife, a friend, and me. On the first day, we passed a woman hiking alone. A stranger. Casual pleasantries were exchanged - "How beautiful is this?" or "What a nice spot to relax." And then we continued on our way.

At our first campsite, we set up, kept to ourselves, and rested. I overheard three Dutch hikers chatting and assumed they were long-time friends. But I later learned that two of them had met the third just six hours earlier.

On Day 2, we left early, exchanging polite "hellos" or "holas" with other hikers. Yet, they were still strangers. Two women passed us on the trail, strangers too - until we discovered they lived less than 30 minutes from us back home. Maybe not strangers anymore?

That evening, we reached the next campsite and headed straight to the bar for well-earned burgers and beers. Another hiker, a Dutch man, approached our table and asked if he could join us. He introduced himself, and we chatted about the hike, his travels, and our lives. Just like that, he was no longer a stranger - because he was willing to start the conversation.

We noticed a group of six Venezuelans, a man from Turkey, and several hikers from Canada and the U.S. At first, they were all strangers. But with a comment here, an introduction there, and shared meals, the invisible walls separating us began to crumble.

By the time we reached our third campsite - a small, isolated spot with few amenities - those walls were gone. Conversations turned into laughter, shared stories, and camaraderie.

The Dutch hikers now had names, careers, and travel plans. The Venezuelans? One was a runner; another was hiking with his older brother. One had German heritage, and they all spoke English from attending the same school. The solo hiker we passed on Day 1 turned out to be from a city I'd lived in for ten years, just minutes from one of my former neighborhoods. And those two women from the trail? Engineers - one lived near us, and the other had a sister who'd just moved to our city.

The fog of unfamiliarity gave way to a web of connection.

The next day was grueling - rain-soaked and arduous. It was the epitome of "Type 2 fun." I cursed a lot. Some of those former strangers passed me, cheering us on. A few paused at the top of the pass to take celebratory shots - a moment they later called a true bonding experience.

My friend joked that we had "trauma-bonded," and he wasn't wrong. At the next campsite, soaking wet and exhausted, those once-strangers bought us beers, helped us locate the showers, and shared their pizza. I didn't care that the beer was $7 - I bought rounds for everyone I could find. So did others.

At some point, we stopped being strangers.

The trek continued for everyone except our original group of three. That morning, we lingered with the group as if we'd been lifelong friends, hugging, exchanging contact information, and saying bittersweet goodbyes. Later, we learned they missed us too.

Over the next few days, we met more strangers - some fleeting, others sharing meals and stories about the hike.

On our last day, waiting for the bus, we heard a commotion. The group we'd parted with just days earlier had arrived at the welcome center. The Venezuelans, the Americans, the Dutch, the Canadians, the Italian - we were together again. Hugs were exchanged. Stories were shared. These people no longer felt like strangers. They felt like friends.

That evening, at dinner, there were even more hugs, laughter, beers, and plans to meet again. More connections, more friendships.

In just eight days, 31 strangers became friends.

As adults, we shouldn't be afraid to introduce ourselves, to share, to help, to endure a little awkwardness or discomfort. The risk is worth the reward.

We all start as strangers, but the journey is so much better as friends.`,
  },
  {
    title: "Setbacks as Stepping Stones",
    slug: "setbacks-as-stepping-stones",
    category: "Failure",
    created_at: "2025-08-19",
    content: `We often think of setbacks as obstacles or roadblocks that slow us down or even push us backward. But if we look closely, setbacks can actually be stepping stones, giving us the push we need to grow stronger, sharper, and more resilient.

I've experienced this many times in my own life. One of the most recent examples comes from my work with Jupyter Notebooks. For almost three years, I had been refining an automated analysis process. It wasn't perfect, but it was working - albeit about 60-70% automated, which required manual intervention sprinkled throughout. Then, a seemingly minor change in Jupyter broke part of my workflow. Suddenly, what I thought was stable needed a complete rethink.

At first, it was frustrating. But instead of letting it defeat me, I used it as motivation to start fresh. I rebuilt the entire workflow from the ground up. It took long nights, weekends, and a lot of persistence, but the end result was better than anything I had before.

Now my process is 80-90% automated, more consistent, more uniform, and far cleaner. What used to take me days now takes far less. Within two months I was producing nearly twice the output. And the pride I feel in what I've built is greater than ever. Even better, I can share it with my co-workers and provide more value to clients, spending less time building analysis and more time consulting.

But setbacks don't just happen in the technical world, they also shape our personal growth. Almost seven years ago, I went through a final-round interview for a role I really wanted. The day couldn't have gone worse: two delayed flights, getting rerouted to a new airport, getting rained on, arriving home at 2 a.m. - oh yeah, and then completely bombing the interview. The feedback stung: I lacked executive presence.

At the time, I took it as a failure. I wallowed in bed the entire next day. But in hindsight, it was a turning point. I still have that feedback saved as a reminder. And it's driven me forward. Today, I'm the president of my Toastmasters Club. I regularly present to CEOs of financial institutions across the country. I speak at board meetings with confidence which I think my coworkers and former managers would say is something I didn't have in my late twenties. That one bad interview didn't define me, but it sparked a journey that has fundamentally changed who I am as a communicator.

The lesson is simple: setbacks hurt in the moment, but if you lean into them, they can fuel growth that lasts years. A broken workflow can push you to build something better. A failed interview can ignite a fire that makes you stronger than you ever imagined. The journey is never done, but every stumble can be turned into a stepping stone. It is up to you to choose to use it that way.`,
  },
];

function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: "Post Not Found | James Gilmore" };
  }

  return {
    title: `${post.title} | James Gilmore`,
    description: post.content.slice(0, 160).trim(),
  };
}

function estimateReadingTime(content: string): number {
  const WORDS_PER_MINUTE = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const rawHtml = await marked(post.content);
  const sanitizedHtml = DOMPurify.sanitize(rawHtml);
  const formattedDate = format(new Date(post.created_at), "MMMM d, yyyy");
  const readingTime = estimateReadingTime(post.content);

  return (
    <div className="noise-bg min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Back link */}
        <div className="animate-fade-up">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-text-muted hover:text-gold transition-colors duration-300"
          >
            <ArrowLeft size={12} />
            Back to Journal
          </Link>
        </div>

        {/* Article header */}
        <header className="mt-12 animate-fade-up animation-delay-100">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold border border-gold/30 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <time
              dateTime={post.created_at}
              className="text-[10px] uppercase tracking-[0.2em] text-text-muted"
            >
              {formattedDate}
            </time>
            <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
              {readingTime} min read
            </span>
          </div>

          <h1 className="mt-6 font-display text-3xl sm:text-4xl lg:text-5xl text-gold-gradient leading-tight">
            {post.title}
          </h1>
        </header>

        {/* Gold rule before content */}
        <div className="animate-fade-up animation-delay-200">
          <hr className="hr-gold mt-10 mb-12" />
        </div>

        {/* Article content */}
        <div className="flex justify-center animate-fade-up animation-delay-300">
          <article
            className="prose-custom max-w-2xl w-full"
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          />
        </div>

        {/* Gold rule after content */}
        <div className="animate-fade-up animation-delay-400">
          <hr className="hr-gold mt-12 mb-10" />
        </div>

        {/* Footer navigation */}
        <div className="animate-fade-up animation-delay-500">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-text-muted hover:text-gold transition-colors duration-300"
          >
            <ArrowLeft size={12} />
            All articles
          </Link>
        </div>
      </div>
    </div>
  );
}
