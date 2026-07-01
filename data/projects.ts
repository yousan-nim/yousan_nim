// Real projects, aligned with the Experience timeline in the i18n dictionary
// (the authoritative, most up-to-date source). Descriptions are kept in English
// (proper nouns + industry terms); localizable UI labels live in the i18n dict.

export type ProjectCategory = "all" | "web" | "ai" | "fullstack" | "research";

export type Project = {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, "all">;
  /** Short human label for the category chip */
  categoryLabel: string;
  period: string;
  summary: string;
  /** Tech names — those matching the ICON map in Projects.tsx get a brand icon */
  tech: string[];
  /** Optional standout line */
  highlight?: string;
  /** Optional accent used for the card glow */
  accent?: "purple" | "cyan" | "emerald" | "amber";
  /** Most work is client/confidential — no public repo */
  confidential?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: "smart-building-iot",
    title: "Smart Building IoT Platform (Zyta)",
    category: "fullstack",
    categoryLabel: "Full-stack · IoT",
    period: "2026 – Present",
    summary:
      "Architected a Smart Building IoT platform now serving 3 B2B clients. Hardened it with JWT guards and rate limiting while cutting API latency from ~8s to ~2s and backend load by ~33%.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
    highlight: "~75% faster APIs · led a 3-engineer team end-to-end",
    accent: "purple",
    confidential: true,
  },
  {
    id: "ble-healthcare-app",
    title: "Multi-vendor BLE Healthcare App",
    category: "fullstack",
    categoryLabel: "Mobile · Health",
    period: "2026",
    summary:
      "Cross-platform BLE healthcare app integrating multiple device vendors, shipped to both Google Play and the App Store.",
    tech: ["React Native", "TypeScript"],
    highlight: "Live on Google Play & App Store",
    accent: "emerald",
    confidential: true,
  },
  {
    id: "discovery-influencer",
    title: "Discovery Influencer Platform",
    category: "web",
    categoryLabel: "Web · Platform",
    period: "2025 – 2026",
    summary:
      "Led a 3-engineer team building a platform for large-scale KOL/KOC campaigns, deployed on Google Cloud with a modern Bun/Elysia + PostgreSQL backend.",
    tech: ["Next.js", "Elysia", "PostgreSQL", "Google Cloud"],
    accent: "cyan",
    confidential: true,
  },
  {
    id: "fht-2025",
    title: "Food & Hospitality Thailand 2025",
    category: "ai",
    categoryLabel: "AI · Holographic",
    period: "Aug 2025 – Sep 2025",
    summary:
      'Built an 86" AI Human on a Holovue holographic display, integrating OpenAI LLM with a custom RAG pipeline for accurate, real-time answers about the event.',
    tech: ["Next.js", "Express", "MongoDB", "OpenAI", "Vultr"],
    highlight: "AI + holographic assistant deployed live at the expo",
    accent: "cyan",
    confidential: true,
  },
  {
    id: "really-cool-airlines",
    title: "Really Cool Airlines Chatbot",
    category: "ai",
    categoryLabel: "AI · Avatar",
    period: "Dec 2024 – Jan 2025",
    summary:
      "A realistic AI avatar chatbot answering flight and service inquiries, running across mobile and Holovue holographic displays for immersive customer interaction.",
    tech: ["Next.js", "Tailwind", "MongoDB", "Vultr"],
    highlight: "Pioneered AI human avatars in the airline industry",
    accent: "purple",
    confidential: true,
  },
  {
    id: "creaive-cms",
    title: "CREaiVE.ai — CMS Platform",
    category: "web",
    categoryLabel: "Web · CMS",
    period: "Jul 2024 – Oct 2025",
    summary:
      "Led a CMS-driven platform from the ground up to showcase products and case studies for high-profile clients, with secure auth, content upload, and automated CI/CD.",
    tech: ["Next.js", "Tailwind", "MongoDB", "AWS", "GitHub Actions"],
    accent: "purple",
    confidential: true,
  },
  {
    id: "cosmetics-ecommerce",
    title: "Cosmetics E-Commerce Platform",
    category: "fullstack",
    categoryLabel: "Full-stack · Fintech",
    period: "2025",
    summary:
      "Fintech-aligned marketplace for beauty merchants built with a repository-service backend and containerized delivery pipeline (Docker, Kubernetes, GitLab CI/CD).",
    tech: ["Next.js", "Express", "Docker", "Kubernetes"],
    accent: "emerald",
    confidential: true,
  },
  {
    id: "ipps",
    title: "IPPS — Payment Solutions Website",
    category: "web",
    categoryLabel: "Web · Fintech",
    period: "2024",
    summary:
      "Corporate marketing site for a Bank of Thailand–licensed payment provider, covering treasury, virtual accounts, invoice QR and B2B payment products with SEO-optimized UX.",
    tech: ["React", "Tailwind", "Firebase"],
    accent: "amber",
    confidential: true,
  },
  {
    id: "ppe-detection",
    title: "PPE Detection (Computer Vision)",
    category: "research",
    categoryLabel: "Research · Vision",
    period: "2021 – 2024",
    summary:
      "Computer-vision system with Panasonic Singapore that detects workers without protective equipment on construction sites to improve safety compliance.",
    tech: ["Python", "PyTorch"],
    accent: "purple",
    confidential: true,
  },
  {
    id: "tele-rehab-asr",
    title: "Tele-Rehabilitation ASR",
    category: "research",
    categoryLabel: "Research · Speech",
    period: "2021 – 2024",
    summary:
      "Assistive communication system with NSTDA using Wav2Vec2-based ASR to support individuals with laryngeal damage in everyday speech interaction.",
    tech: ["Python", "PyTorch"],
    accent: "cyan",
    confidential: true,
  },
];
