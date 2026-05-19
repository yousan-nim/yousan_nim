export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  sections: BlogSection[];
  takeaway: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "shipping-ai-products-without-fake-magic",
    title: "Shipping AI Products Without Fake Magic",
    category: "AI Product",
    date: "May 12, 2026",
    readTime: "7 min read",
    excerpt:
      "The fastest way to lose trust in an AI feature is to promise intelligence when the product still behaves like a demo.",
    tags: ["OpenAI", "UX", "RAG", "Product Strategy"],
    sections: [
      {
        heading: "Start with the workflow, not the model",
        paragraphs: [
          "Most AI features fail because the team starts by picking a model and only later asks what user problem it should solve.",
          "A stronger approach is to map the exact moment where a user is blocked, then decide whether AI should summarize, classify, generate, or retrieve the next useful step.",
        ],
        bullets: [
          "Define the user action that must become faster or clearer.",
          "Limit the first version to one obvious job.",
          "Measure whether the output reduces manual work.",
        ],
      },
      {
        heading: "Design for verification",
        paragraphs: [
          "Good AI UX does not pretend the answer is always correct. It gives users enough context to verify the response quickly.",
          "That means clear citations, visible source data, and interfaces that make editing the draft easier than rewriting it from scratch.",
        ],
      },
      {
        heading: "Production quality is mostly systems work",
        paragraphs: [
          "Once the demo is approved, the real effort starts: prompt versioning, fallback handling, latency budgets, logging, and safe retries.",
          "Teams that treat these concerns as core product work ship slower at first, but they avoid the expensive rewrite that usually follows a flashy prototype.",
        ],
      },
    ],
    takeaway:
      "Useful AI feels dependable before it feels impressive. The product should help users judge the answer, not just admire it.",
  },
  {
    slug: "why-portfolios-should-feel-fast",
    title: "Why Portfolios Should Feel Fast Before They Feel Fancy",
    category: "Frontend",
    date: "April 28, 2026",
    readTime: "5 min read",
    excerpt:
      "A portfolio is a product pitch. If it stutters, hides the message, or makes the reader work too hard, it undercuts the case immediately.",
    tags: ["Next.js", "Performance", "Motion", "Design"],
    sections: [
      {
        heading: "The first screen carries the argument",
        paragraphs: [
          "A visitor decides within seconds whether the site feels serious. Typography, spacing, and load behavior communicate more than a long introduction ever will.",
          "The hero should answer three things quickly: who you are, what you build, and why the work matters.",
        ],
      },
      {
        heading: "Motion needs a job",
        paragraphs: [
          "Animation is valuable when it guides attention or reinforces hierarchy. It becomes noise when it delays reading or competes with the actual message.",
          "Parallax, video, and layered backgrounds can work well, but only if the text remains stable and easy to parse.",
        ],
        bullets: [
          "Keep the content readable during motion.",
          "Prefer subtle depth over constant movement.",
          "Treat loading states as part of the brand impression.",
        ],
      },
      {
        heading: "Structured content beats decorative content",
        paragraphs: [
          "Case studies, measurable outcomes, and clearly grouped experience sections make the strongest portfolios easier to scan.",
          "When the content model is solid, the visual layer can become more expressive without losing clarity.",
        ],
      },
    ],
    takeaway:
      "A portfolio should look deliberate, but its main job is to make confidence easy for the reader.",
  },
  {
    slug: "from-research-prototype-to-production-stack",
    title: "From Research Prototype to Production Stack",
    category: "Engineering",
    date: "March 16, 2026",
    readTime: "8 min read",
    excerpt:
      "Research code proves an idea. Production code proves the idea can survive real users, real latency, and repeated change.",
    tags: ["Architecture", "Backend", "MLOps", "Delivery"],
    sections: [
      {
        heading: "Prototypes optimize for discovery",
        paragraphs: [
          "During research, speed matters more than elegance. You want fast experiments, rough instrumentation, and enough code to learn whether the idea has value.",
          "That style is correct for exploration, but it becomes expensive if it is promoted into production unchanged.",
        ],
      },
      {
        heading: "Production needs stronger boundaries",
        paragraphs: [
          "The first major shift is separating concerns: inference logic, business rules, storage, and user-facing APIs should not live in one tangled script.",
          "The second shift is operational: version inputs, monitor quality, and make rollback paths routine instead of exceptional.",
        ],
        bullets: [
          "Extract the data contract first.",
          "Add observability before scale exposes the weak points.",
          "Document assumptions that were previously kept in a notebook or in memory.",
        ],
      },
      {
        heading: "Do not over-romanticize the rewrite",
        paragraphs: [
          "A clean rewrite sounds attractive, but teams often lose momentum there. A staged migration usually preserves learning better.",
          "Keep the working prototype alive long enough to compare outputs while the production path becomes trustworthy.",
        ],
      },
    ],
    takeaway:
      "The goal is not to erase prototype code. It is to translate the learning into a system other engineers can maintain with confidence.",
  },
  {
    slug: "what-good-full-stack-decisions-look-like",
    title: "What Good Full-Stack Decisions Look Like",
    category: "Systems",
    date: "February 8, 2026",
    readTime: "6 min read",
    excerpt:
      "Full-stack work is less about touching every layer and more about making coherent tradeoffs between product speed, reliability, and maintainability.",
    tags: ["Full Stack", "Decision Making", "Scaling", "Teamwork"],
    sections: [
      {
        heading: "Choose complexity deliberately",
        paragraphs: [
          "The strongest technical decisions are often the ones that remove moving parts instead of adding them.",
          "A simple server action, a small schema, or a direct integration can be better architecture than a system that looks more advanced on paper.",
        ],
      },
      {
        heading: "Optimize the handoffs",
        paragraphs: [
          "Many product delays do not come from raw implementation difficulty. They come from weak handoffs between design, frontend, backend, and operations.",
          "A good full-stack engineer reduces those seams by making contracts explicit and feedback loops short.",
        ],
      },
      {
        heading: "Think in terms of change",
        paragraphs: [
          "The real question is rarely whether a feature works today. It is whether the team can update it next month without fear.",
          "Naming, boundaries, and predictable data flow are what make speed repeatable instead of accidental.",
        ],
      },
    ],
    takeaway:
      "Good full-stack work creates momentum for the next feature, not just a working demo for the current one.",
  },
];

export const getBlogPostBySlug = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);
