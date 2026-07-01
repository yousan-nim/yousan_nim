"use client";

import Link from "next/link";
import React from "react";
import {
  FiActivity,
  FiArrowRight,
  FiBookOpen,
  FiCpu,
  FiSearch,
} from "react-icons/fi";
import { useI18n } from "@/lib/i18n/I18nProvider";

const EMAIL = "pongchanok.nt@gmail.com";

const REQUEST_WALKTHROUGH_MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Project walkthrough request — Yousan Nim"
)}&body=${encodeURIComponent(
  "Hi Yousan,\n\nI'd like a walkthrough of one of your recent projects. Here is the product area and context:\n\n- Project of interest:\n- Team / company:\n- What I'd like to learn:\n\nThanks!"
)}`;

const FEATURED_PROJECTS = [
  {
    title: "Smart Building IoT Platform",
    eyebrow: "B2B · IoT · Operations",
    summary:
      "Led architecture and delivery for a monitoring and automation platform used by enterprise building operators.",
    metrics: ["API latency ~8s → ~2s", "-33% backend load", "3 live B2B clients"],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Docker", "IoT"],
    Icon: FiActivity,
  },
  {
    title: "Influencer Discovery Platform",
    eyebrow: "Creator Economy · Search",
    summary:
      "Built a campaign discovery workspace for KOL/KOC teams with scalable search, filtering, and operations workflows.",
    metrics: [
      "Led a 3-engineer delivery",
      "Google Cloud deployment",
      "Next.js + Elysia + PostgreSQL",
    ],
    stack: ["Next.js", "Elysia", "PostgreSQL", "Google Cloud"],
    Icon: FiSearch,
  },
  {
    title: "Holographic AI Human",
    eyebrow: "AI Experience · RAG",
    summary:
      "Designed an 86-inch public-facing assistant that combines OpenAI responses with grounded retrieval for exhibition visitors.",
    metrics: [
      "Public launch at FHT 2025",
      "RAG-grounded answers",
      "Holovue installation",
    ],
    stack: ["OpenAI", "RAG", "Python", "Realtime UX"],
    Icon: FiCpu,
  },
] as const;

const Projects = () => {
  const { t } = useI18n();
  const p = t.projects;

  return (
    <>
      <h2 className="mb-4 text-center text-[clamp(32px,6vw,56px)] font-semibold uppercase text-white">
        {p.title}
      </h2>
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[clamp(15px,2.2vw,18px)] leading-8 text-slate-300/80">
          {p.intro}
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid gap-6">
          {FEATURED_PROJECTS.map((project) => (
            <article
              key={project.title}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/80 to-transparent"
              />
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-200/78">
                    <project.Icon className="text-sm" aria-hidden />
                    {project.eyebrow}
                  </div>
                  <h3 className="text-[clamp(22px,3vw,30px)] font-bold tracking-tight text-white">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-[15px] leading-8 text-slate-300/82 md:text-base">
                    {project.summary}
                  </p>
                </div>

                <a
                  href={REQUEST_WALKTHROUGH_MAILTO}
                  className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full border border-emerald-400/25 bg-emerald-400/16 px-4 py-2 text-sm font-semibold text-white transition hover:border-emerald-300/50 hover:bg-emerald-400/24"
                >
                  {p.walkthrough}
                  <FiArrowRight aria-hidden />
                </a>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-[1.35fr_1fr]">
                <div className="grid gap-3 sm:grid-cols-3">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric}
                      className="rounded-2xl border border-white/10 bg-black/24 p-4 text-sm font-medium text-white/88"
                    >
                      {metric}
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/24 p-4">
                  <div className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
                    Stack
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-slate-200/80"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="rounded-3xl border border-white/10 bg-slate-950/76 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200/72">
            {p.featuredLabel}
          </div>
          <h3 className="mt-4 text-2xl font-bold tracking-tight text-white">
            Delivery over decoration
          </h3>
          <p className="mt-4 text-[15px] leading-8 text-slate-300/80">
            {p.ndaNote}
          </p>

          <div className="mt-8 space-y-3">
            <a
              href={REQUEST_WALKTHROUGH_MAILTO}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/16 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-emerald-300/50 hover:bg-emerald-400/24"
            >
              {p.walkthrough}
              <FiArrowRight aria-hidden />
            </a>
            <Link
              href="/blogs"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/14 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-white/30 hover:bg-white/10"
            >
              {p.readBlogs}
              <FiBookOpen aria-hidden />
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Projects;
