-- Seed blog posts

INSERT INTO blogs (title, slug, content, category, tags, excerpt, created_at, updated_at)
VALUES
(
  'Building a Path Forward: My First Blog',
  'building-a-path-forward',
  E'Welcome to my corner of the internet. This is the beginning of something I have been meaning to do for a long time -- writing, sharing, and building in public.\n\nFor years I have been heads-down working on projects, solving problems, and learning new things. But I rarely took the time to reflect on the journey itself. That changes now.\n\nThis blog is not about perfection. It is about progress. It is about documenting the messy, nonlinear path of building a career in technology, entrepreneurship, and life in general.\n\nI believe that growth happens when you put yourself out there. When you share what you know, what you are learning, and even what you do not know yet. There is power in vulnerability and honesty.\n\nSo here I am, building a path forward -- one post at a time. I will write about technology, the projects I am working on, the lessons I have learned, and the things that inspire me to keep going.\n\nIf you are reading this, thank you for being here at the start. Let us build something together.',
  'Welcome',
  ARRAY['Welcome', 'Building', 'Growing', 'Learning'],
  'Welcome to my corner of the internet. This is the beginning of something I have been meaning to do for a long time -- writing, sharing, and building in public.',
  '2024-10-18T04:21:35Z',
  '2024-10-18T04:21:35Z'
),
(
  'Christmas - the gift of travel',
  'christmas-the-gift-of-travel',
  E'Christmas has always been about traditions -- the tree, the food, the family gathered around. But as I have gotten older, I have started to see it differently. The best gift is not something wrapped in paper. It is the gift of experience. The gift of travel.\n\nThis year, instead of exchanging things, we exchanged moments. New places, new foods, new memories that will last far longer than any gadget or sweater ever could.\n\nThere is something about being somewhere unfamiliar during the holidays that makes everything feel more vivid. The lights look brighter. The conversations go deeper. You are fully present because nothing is routine.\n\nTravel during Christmas taught me that home is not just a place. It is a feeling you carry with you. You can find warmth in a small cafe in a city you have never been to, or in a conversation with a stranger who becomes a friend.\n\nIf you have the chance, give yourself the gift of travel. It does not have to be far or expensive. Just somewhere different. Somewhere that pulls you out of the ordinary and reminds you how big and beautiful the world really is.\n\nMerry Christmas to everyone out there, wherever you are.',
  'Travel',
  ARRAY['Holidays', 'Travel'],
  'Christmas has always been about traditions -- the tree, the food, the family gathered around. But as I have gotten older, I have started to see it differently. The best gift is not something wrapped.',
  '2024-12-25T13:18:55Z',
  '2024-12-25T13:18:55Z'
),
(
  'We all start as strangers',
  'we-all-start-as-strangers',
  E'Think about the people closest to you right now. Your best friend. Your partner. Your mentor. Your favorite coworker. At some point, every single one of them was a complete stranger.\n\nWe tend to forget that. We take our relationships for granted as if they were always there. But the truth is, every meaningful connection in your life started with a moment of uncertainty -- a first hello, a shared laugh, an awkward introduction.\n\nI have been thinking about this a lot lately. How many incredible people are out there that I have not met yet? How many future friendships, partnerships, and life-changing conversations are just one introduction away?\n\nThe barrier is almost always the same: hesitation. We hesitate to reach out. We hesitate to be vulnerable. We hesitate to put ourselves in situations where we might feel uncomfortable.\n\nBut every great relationship requires someone to go first. Someone has to say hello. Someone has to send the message. Someone has to show up.\n\nSo here is my challenge to you, and to myself: treat every stranger as a potential friend. Be open. Be curious. Be willing to start the conversation.\n\nBecause we all start as strangers. And that is exactly where the best stories begin.',
  'Connections',
  ARRAY['Connections'],
  'Think about the people closest to you right now. Your best friend. Your partner. Your mentor. Your favorite coworker. At some point, every single one of them was a complete stranger.',
  '2025-01-06T15:46:34Z',
  '2025-01-06T15:46:34Z'
),
(
  'Setbacks as Stepping Stones',
  'setbacks-as-stepping-stones',
  E'Nobody talks about the failures. Not really. We share the wins, the milestones, the polished version of our story. But behind every success is a trail of setbacks that made it possible.\n\nI have had my share. Projects that fell apart. Ideas that did not work. Moments where I questioned whether I was on the right path at all. And if I am being honest, those moments hurt. They are supposed to.\n\nBut here is what I have learned: setbacks are not the opposite of progress. They are part of it. Every failure carries a lesson, and every lesson makes you sharper, more resilient, and more prepared for what comes next.\n\nThe key is what you do after the setback. Do you sit in it? Or do you use it? Do you let it define you? Or do you let it refine you?\n\nI choose to see setbacks as stepping stones. Each one brings me closer to where I need to be, even when it does not feel that way in the moment.\n\nIf you are going through something hard right now, know that it is not the end of your story. It is a chapter that is building toward something better. Keep going. Keep building. Keep showing up.\n\nThe setbacks are not stopping you. They are shaping you.',
  'Failure',
  ARRAY['Failure', 'Growth', 'Resilience'],
  'Nobody talks about the failures. Not really. We share the wins, the milestones, the polished version of our story. But behind every success is a trail of setbacks that made it possible.',
  '2025-08-19T04:26:08Z',
  '2025-08-19T04:26:08Z'
);

-- Seed projects

INSERT INTO projects (title, description, category, technologies, github_url, project_url, image_url, display_order)
VALUES
(
  'FormulaBot.com',
  'An AI-powered data analysis platform that helps users generate formulas, analyze spreadsheets, and work with data more efficiently using artificial intelligence.',
  'AI / Data',
  ARRAY['AI', 'Data Analysis', 'SaaS'],
  NULL,
  'https://www.formulabot.com/',
  NULL,
  1
),
(
  'MRAP Investments',
  'A real estate investment company focused on the Orlando, Florida market, specializing in property acquisition and management.',
  'Real Estate',
  ARRAY['Real Estate', 'Investment'],
  NULL,
  'https://www.instagram.com/mrapinvestments',
  NULL,
  2
),
(
  'JamesGilmore.xyz',
  'Personal portfolio website showcasing projects, blog posts, and professional experience. Built with modern web technologies and a focus on clean design.',
  'Web Development',
  ARRAY['Python', 'Flask', 'Bootstrap', 'PostgreSQL'],
  NULL,
  'https://www.JamesGilmore.xyz',
  NULL,
  3
),
(
  'GutenBites.com',
  'A platform dedicated to classic literature in podcast form, making timeless books accessible through audio content for modern listeners.',
  'Media / Content',
  ARRAY['Podcast', 'Literature', 'Content Platform'],
  NULL,
  'https://gutenbites.com/',
  NULL,
  4
);
