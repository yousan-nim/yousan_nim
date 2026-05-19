"use client";

import { blogPosts } from "@/data/blogs";
import { useRouter, useSearchParams } from "next/navigation";

const readerId = "blog-reader";

const createSectionId = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const groupedPosts = blogPosts.reduce<Record<string, typeof blogPosts>>(
  (acc, post) => {
    acc[post.category] ??= [];
    acc[post.category].push(post);
    return acc;
  },
  {}
);

export default function BlogWorkspace() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedSlug = searchParams.get("post");
  const selectedPost =
    blogPosts.find((post) => post.slug === selectedSlug) ?? blogPosts[0];
  const sectionLinks = selectedPost.sections.map((section) => ({
    id: createSectionId(section.heading),
    label: section.heading,
  }));

  const selectPost = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("post", slug);

    router.replace(`/blogs?${params.toString()}`, { scroll: false });

    if (window.innerWidth < 1280) {
      requestAnimationFrame(() => {
        document.getElementById(readerId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  };

  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-28 md:px-6 md:pb-28 md:pt-32">
      <div aria-hidden className="absolute inset-0 -z-20 bg-[#090b10]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.16),transparent_26%),radial-gradient(circle_at_82%_10%,rgba(56,189,248,0.12),transparent_22%),linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_28%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,white,transparent_85%)]"
      />

      <div className="relative mx-auto max-w-[1720px]">
        <div className="rounded-[34px] border border-white/10 bg-white/[0.03] px-6 py-7 shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl md:px-8 md:py-8">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.4fr)_320px] xl:items-end">
            <div>
              <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-medium uppercase tracking-[0.28em] text-white/60">
                Journal
              </span>
              <h1 className="mt-5 max-w-4xl text-[clamp(36px,6vw,72px)] font-black uppercase leading-[0.92] text-white">
                Notes on building products that last
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 md:text-base md:leading-8">
                A cleaner reading workspace for frontend systems, shipping AI
                products, and the engineering decisions behind durable software.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-black/25 p-4">
                <div className="text-[11px] uppercase tracking-[0.24em] text-white/40">
                  Posts
                </div>
                <div className="mt-2 text-3xl font-black text-white">
                  {blogPosts.length}
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/25 p-4">
                <div className="text-[11px] uppercase tracking-[0.24em] text-white/40">
                  Categories
                </div>
                <div className="mt-2 text-3xl font-black text-white">
                  {Object.keys(groupedPosts).length}
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/25 p-4 col-span-2 md:col-span-1 xl:col-span-2">
                <div className="text-[11px] uppercase tracking-[0.24em] text-white/40">
                  Reading now
                </div>
                <div className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/85">
                  {selectedPost.readTime}
                </div>
                <div className="mt-2 text-sm leading-6 text-white/55">
                  {selectedPost.category}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)] 2xl:grid-cols-[320px_minmax(0,1fr)_250px]">
          <aside className="self-start">
            <div className="overflow-hidden rounded-[30px] border border-white/10 bg-black/30 shadow-[0_20px_60px_rgba(0,0,0,0.26)] backdrop-blur-xl xl:sticky xl:top-24">
              <div className="border-b border-white/10 px-5 py-5">
                <div className="text-xs font-medium uppercase tracking-[0.26em] text-white/45">
                  Library
                </div>
                <p className="mt-2 text-sm leading-6 text-white/62">
                  Select a post from the left rail. The reader stays centered
                  and the article outline updates automatically.
                </p>
              </div>

              <div className="max-h-[calc(100vh-9.5rem)] overflow-y-auto p-3">
                <div className="space-y-7">
                  {Object.entries(groupedPosts).map(([group, posts]) => (
                    <div key={group}>
                      <div className="px-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/38">
                        {group}
                      </div>
                      <div className="mt-3 space-y-2">
                        {posts.map((post, index) => {
                          const active = post.slug === selectedPost.slug;

                          return (
                            <button
                              key={post.slug}
                              type="button"
                              onClick={() => selectPost(post.slug)}
                              className={[
                                "w-full rounded-[26px] border px-4 py-4 text-left transition",
                                active
                                  ? "border-cyan-400/25 bg-gradient-to-br from-white/[0.12] to-cyan-400/[0.08] shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
                                  : "border-white/8 bg-white/[0.03] hover:border-white/18 hover:bg-white/[0.06]",
                              ].join(" ")}
                            >
                              <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.22em] text-white/42">
                                <span>{String(index + 1).padStart(2, "0")}</span>
                                <span>{post.readTime}</span>
                              </div>

                              <h2 className="mt-3 text-base font-semibold leading-6 text-white">
                                {post.title}
                              </h2>

                              <p className="mt-2 text-sm leading-6 text-white/58">
                                {post.excerpt}
                              </p>

                              <div className="mt-4 flex items-center justify-between gap-3 text-xs text-white/35">
                                <span>{post.date}</span>
                                <span className="rounded-full border border-white/10 px-2 py-1 uppercase tracking-[0.18em]">
                                  {post.category}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <article
            id={readerId}
            className="min-w-0 rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl md:p-8 xl:p-9"
          >
            <div className="border-b border-white/10 pb-8">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-white/42">
                <span>{selectedPost.category}</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span>{selectedPost.date}</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span>{selectedPost.readTime}</span>
              </div>

              <h2 className="mt-5 max-w-4xl text-[clamp(32px,5vw,60px)] font-black leading-[0.94] text-white">
                {selectedPost.title}
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 md:text-[17px]">
                {selectedPost.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {selectedPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white/62"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 overflow-x-auto">
                <div className="flex min-w-max gap-3">
                  {sectionLinks.map((sectionLink, index) => (
                    <a
                      key={sectionLink.id}
                      href={`#${sectionLink.id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/65 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                    >
                      <span className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{sectionLink.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-10 py-8">
              {selectedPost.sections.map((section, index) => (
                <section
                  key={section.heading}
                  id={createSectionId(section.heading)}
                  className="scroll-mt-28 grid gap-5 xl:grid-cols-[68px_minmax(0,1fr)]"
                >
                  <div className="flex xl:justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/25 text-sm font-semibold text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                      {section.heading}
                    </h3>

                    <div className="mt-5 space-y-5">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="max-w-3xl text-[15px] leading-8 text-white/72 md:text-base"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {section.bullets?.length ? (
                      <div className="mt-7 rounded-[28px] border border-white/10 bg-black/20 p-5">
                        <div className="text-xs font-medium uppercase tracking-[0.24em] text-white/42">
                          Notes
                        </div>
                        <ul className="mt-4 space-y-3">
                          {section.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex gap-3 text-sm leading-7 text-white/66 md:text-[15px]"
                            >
                              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </section>
              ))}
            </div>

            <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-5 md:p-6">
              <div className="text-xs font-medium uppercase tracking-[0.26em] text-white/42">
                Key takeaway
              </div>
              <p className="mt-4 max-w-3xl text-base leading-8 text-white/82">
                {selectedPost.takeaway}
              </p>
            </div>
          </article>

          <aside className="hidden self-start 2xl:block">
            <div className="space-y-4 2xl:sticky 2xl:top-24">
              <div className="rounded-[28px] border border-white/10 bg-black/25 p-5 backdrop-blur-xl">
                <div className="text-xs font-medium uppercase tracking-[0.24em] text-white/42">
                  On this post
                </div>
                <div className="mt-4 space-y-2">
                  {sectionLinks.map((sectionLink, index) => (
                    <a
                      key={sectionLink.id}
                      href={`#${sectionLink.id}`}
                      className="flex rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-3 text-sm text-white/62 transition hover:border-white/18 hover:text-white"
                    >
                      <span className="mr-3 text-[11px] uppercase tracking-[0.18em] text-white/32">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{sectionLink.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-black/25 p-5 backdrop-blur-xl">
                <div className="text-xs font-medium uppercase tracking-[0.24em] text-white/42">
                  Article info
                </div>
                <div className="mt-4 space-y-4 text-sm text-white/62">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/32">
                      Category
                    </div>
                    <div className="mt-1 text-white/80">{selectedPost.category}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/32">
                      Published
                    </div>
                    <div className="mt-1 text-white/80">{selectedPost.date}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/32">
                      Reading time
                    </div>
                    <div className="mt-1 text-white/80">{selectedPost.readTime}</div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
