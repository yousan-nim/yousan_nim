"use client";

import { BLOG_SECTIONS, blogPosts, type CodeExample } from "@/data/blogs";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const PATTERN_GROUP_CATEGORY = "Design Patterns";
const PATTERN_GROUP_LABEL = "Pattern Designs";

const CodeLangContext = createContext<{
  lang: string | null;
  setLang: (lang: string) => void;
}>({ lang: null, setLang: () => {} });

const readerId = "blog-reader";

// VS Code "Dark+" inspired palette
const SYNTAX = {
  comment: "#6A9955",
  string: "#CE9178",
  number: "#B5CEA8",
  keyword: "#569CD6",
  func: "#DCDCAA",
  type: "#4EC9B0",
  plain: "#D4D4D4",
};

const KEYWORDS = new Set([
  // shared control flow / declarations across Go, Java, TypeScript
  "abstract", "as", "async", "await", "break", "case", "catch", "chan",
  "class", "const", "continue", "default", "defer", "else", "enum",
  "export", "extends", "final", "finally", "for", "from", "func",
  "function", "go", "goto", "if", "implements", "import", "in", "instanceof",
  "interface", "let", "map", "new", "of", "package", "private", "protected",
  "public", "range", "readonly", "return", "select", "static", "struct",
  "super", "switch", "this", "throw", "throws", "try", "type", "typeof",
  "var", "void", "while", "yield",
  // common primitive / value keywords
  "bool", "boolean", "byte", "double", "error", "false", "float", "int",
  "long", "nil", "null", "number", "rune", "string", "true", "undefined",
]);

const TOKEN_RE =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(`(?:\\[\s\S]|[^`\\])*`|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(\b\d[\d_]*(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)(?=\s*\()|([A-Za-z_$][\w$]*)/g;

function highlightCode(code: string) {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(code))) {
    if (m.index > last) nodes.push(code.slice(last, m.index));
    const [full, comment, str, num, fn, word] = m;
    let color: string | undefined;
    if (comment !== undefined) color = SYNTAX.comment;
    else if (str !== undefined) color = SYNTAX.string;
    else if (num !== undefined) color = SYNTAX.number;
    else if (fn !== undefined) color = KEYWORDS.has(fn) ? SYNTAX.keyword : SYNTAX.func;
    else if (word !== undefined)
      color = KEYWORDS.has(word)
        ? SYNTAX.keyword
        : /^[A-Z]/.test(word)
          ? SYNTAX.type
          : undefined;

    if (color) nodes.push(<span key={key++} style={{ color }}>{full}</span>);
    else nodes.push(full);
    last = m.index + full.length;
  }
  if (last < code.length) nodes.push(code.slice(last));
  return nodes;
}

function CodeTabs({ examples }: { examples: CodeExample[] }) {
  const { lang, setLang } = useContext(CodeLangContext);
  const current =
    examples.find((example) => example.language === lang) ?? examples[0];

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-1 border-b border-white/10 px-3 pt-2">
        {examples.map((example) => {
          const isActive = example.language === current.language;
          return (
            <button
              key={example.language}
              type="button"
              onClick={() => setLang(example.language)}
              className={[
                "relative rounded-t-md px-3 py-2 text-xs font-medium transition",
                isActive
                  ? "text-white after:absolute after:inset-x-2 after:-bottom-px after:h-0.5 after:rounded-full after:bg-cyan-300"
                  : "text-white/45 hover:text-white/75",
              ].join(" ")}
            >
              {example.language}
            </button>
          );
        })}
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-[13px] leading-6">
        <code className="font-mono" style={{ color: SYNTAX.plain }}>
          {highlightCode(current.code)}
        </code>
      </pre>
    </div>
  );
}

const createSectionId = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const groupedPosts = BLOG_SECTIONS.map((section) => ({
  section,
  posts: blogPosts.filter((post) => post.section === section),
})).filter((group) => group.posts.length > 0);

export default function BlogWorkspace() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [codeLang, setCodeLang] = useState<string | null>(null);
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    const slug = searchParams.get("post");
    const initialPost =
      blogPosts.find((post) => post.slug === slug) ?? blogPosts[0];
    if (initialPost.category === PATTERN_GROUP_CATEGORY) {
      initial.add(PATTERN_GROUP_LABEL);
    }
    return initial;
  });

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const selectedSlug = searchParams.get("post");
  const selectedPost =
    blogPosts.find((post) => post.slug === selectedSlug) ?? blogPosts[0];
  const sectionLinks = selectedPost.sections.map((section) => ({
    id: createSectionId(section.heading),
    label: section.heading,
  }));

  useEffect(() => {
    if (selectedPost.category === PATTERN_GROUP_CATEGORY) {
      setOpenGroups((prev) => {
        if (prev.has(PATTERN_GROUP_LABEL)) return prev;
        const next = new Set(prev);
        next.add(PATTERN_GROUP_LABEL);
        return next;
      });
    }
  }, [selectedPost.category]);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  const selectPost = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("post", slug);
    router.replace(`/blogs?${params.toString()}`, { scroll: false });
    setMobileNavOpen(false);

    if (window.innerWidth < 1024) {
      requestAnimationFrame(() => {
        document.getElementById(readerId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  };

  return (
    <CodeLangContext.Provider value={{ lang: codeLang, setLang: setCodeLang }}>
    <section className="relative min-h-screen overflow-hidden px-4 pb-24 pt-24 md:px-6 md:pt-28">
      {/* Reading backdrop — no video on blogs: a calm dark base with soft,
          fixed theme glows (purple / cyan / indigo) that stay put while reading. */}
      <div aria-hidden className="fixed inset-0 -z-20 bg-[#0a0a0b]" />
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-purple-600/20 blur-[130px]" />
        <div className="absolute top-[8%] right-[-10%] h-[26rem] w-[26rem] rounded-full bg-cyan-500/[0.14] blur-[140px]" />
        <div className="absolute bottom-[-15%] left-1/4 h-96 w-96 rounded-full bg-indigo-500/[0.16] blur-[150px]" />
        {/* subtle vignette keeps the reading column in focus */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_55%,rgba(0,0,0,0.55))]" />
      </div>

      <div className="relative mx-auto max-w-screen-2xl">
        {/* Mobile nav toggle */}
        <button
          type="button"
          onClick={() => setMobileNavOpen((v) => !v)}
          className="mb-4 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
          Browse articles
        </button>

        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)] 2xl:grid-cols-[280px_minmax(0,1fr)_240px]">
          {/* Left sidebar */}
          <aside className={mobileNavOpen ? "block" : "hidden lg:block"}>
            <nav className="space-y-8 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-2">
              {groupedPosts.map(({ section, posts }) => {
                const groupPosts = posts.filter(
                  (p) => p.category === PATTERN_GROUP_CATEGORY,
                );
                const regularPosts = posts.filter(
                  (p) => p.category !== PATTERN_GROUP_CATEGORY,
                );
                const groupOpen = openGroups.has(PATTERN_GROUP_LABEL);
                const groupHasActive = groupPosts.some(
                  (p) => p.slug === selectedPost.slug,
                );

                const renderPostButton = (post: (typeof posts)[number]) => {
                  const active = post.slug === selectedPost.slug;
                  return (
                    <li key={post.slug}>
                      <button
                        type="button"
                        onClick={() => selectPost(post.slug)}
                        className={[
                          "-ml-px block w-full border-l-2 px-4 py-1.5 text-left text-sm leading-6 transition",
                          active
                            ? "border-purple-400 font-medium text-white"
                            : "border-transparent text-white/55 hover:border-white/30 hover:text-white",
                        ].join(" ")}
                      >
                        {post.title}
                      </button>
                    </li>
                  );
                };

                return (
                  <div key={section}>
                    <div className="px-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
                      {section}
                    </div>
                    <ul className="mt-3 space-y-1 border-l border-white/10">
                      {regularPosts.map(renderPostButton)}

                      {groupPosts.length > 0 && (
                        <li>
                          <button
                            type="button"
                            onClick={() => toggleGroup(PATTERN_GROUP_LABEL)}
                            aria-expanded={groupOpen}
                            className={[
                              "-ml-px flex w-full items-center gap-2 border-l-2 px-4 py-1.5 text-left text-sm leading-6 transition",
                              groupHasActive && !groupOpen
                                ? "border-purple-400/60 font-medium text-white"
                                : "border-transparent text-white/55 hover:border-white/30 hover:text-white",
                            ].join(" ")}
                          >
                            <svg
                              viewBox="0 0 20 20"
                              className={[
                                "h-3 w-3 shrink-0 transition-transform duration-200",
                                groupOpen ? "rotate-90" : "",
                              ].join(" ")}
                              fill="currentColor"
                              aria-hidden
                            >
                              <path d="M7 5l6 5-6 5V5z" />
                            </svg>
                            <span>{PATTERN_GROUP_LABEL}</span>
                            <span className="ml-auto text-[10px] text-white/35">
                              {groupPosts.length}
                            </span>
                          </button>

                          {groupOpen && (
                            <ul className="ml-3 mt-1 space-y-1 border-l border-white/10">
                              {groupPosts.map(renderPostButton)}
                            </ul>
                          )}
                        </li>
                      )}
                    </ul>
                  </div>
                );
              })}
            </nav>
          </aside>

          {/* Main content */}
          <main id={readerId} className="min-w-0 scroll-mt-24 rounded-2xl border border-white/10 bg-black/75 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md lg:p-8">
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-purple-300/80">
              <span>{selectedPost.section}</span>
              <span className="h-1 w-1 rounded-full bg-white/25" />
              <span className="text-white/40">{selectedPost.category}</span>
            </div>

            <h1 className="mt-4 truncate text-[clamp(24px,3.4vw,48px)] font-black leading-[1.05] tracking-tight text-white">
              {selectedPost.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-white/40">
              <span>{selectedPost.date}</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>{selectedPost.readTime}</span>
            </div>

            <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 md:text-[17px]">
              {selectedPost.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {selectedPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Section tabs (docs-style) */}
            <div className="mt-8 flex flex-nowrap gap-x-6 overflow-x-auto border-b border-white/10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {sectionLinks.map((link, i) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className={[
                    "relative -mb-px shrink-0 whitespace-nowrap pb-3 text-sm transition",
                    i === 0
                      ? "font-medium text-white after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-full after:bg-purple-400"
                      : "text-white/50 hover:text-white/80",
                  ].join(" ")}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Numbered article body */}
            <div className="mt-10 space-y-12">
              {selectedPost.sections.map((section, index) => (
                <section
                  key={section.heading}
                  id={createSectionId(section.heading)}
                  className="scroll-mt-24 grid gap-5 md:grid-cols-[44px_minmax(0,1fr)]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[12px] font-semibold text-white/55">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <h2 className="text-2xl font-bold tracking-tight text-white md:text-[28px]">
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="max-w-3xl text-[15px] leading-8 text-white/70 md:text-base"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {section.bullets?.length ? (
                      <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
                        <div className="text-xs font-medium uppercase tracking-[0.22em] text-white/40">
                          Notes
                        </div>
                        <ul className="mt-4 space-y-3">
                          {section.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex gap-3 text-sm leading-7 text-white/65 md:text-[15px]"
                            >
                              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {section.code?.length ? (
                      <CodeTabs examples={section.code} />
                    ) : null}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-br from-purple-400/[0.1] to-white/[0.03] p-6">
              <div className="text-xs font-medium uppercase tracking-[0.24em] text-purple-200/70">
                Key takeaway
              </div>
              <p className="mt-4 max-w-3xl text-base leading-8 text-white/85">
                {selectedPost.takeaway}
              </p>
            </div>
          </main>

          {/* Right rail: on this page */}
          <aside className="hidden self-start 2xl:block">
            <div className="sticky top-24">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
                On this page
              </div>
              <ul className="mt-4 space-y-2 border-l border-white/10">
                {sectionLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => scrollToSection(e, link.id)}
                      className="-ml-px block border-l-2 border-transparent px-4 py-1 text-sm leading-6 text-white/55 transition hover:border-white/30 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
    </CodeLangContext.Provider>
  );
}
