"use client";

import React, { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { PROJECTS, type ProjectCategory } from "@/data/projects";
import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiMysql,
  SiExpress,
  SiDocker,
  SiKubernetes,
  SiFirebase,
  SiOpenai,
  SiPython,
  SiPytorch,
  SiNodedotjs,
  SiVultr,
  SiGithubactions,
  SiTypescript,
  SiPostgresql,
  SiGooglecloud,
} from "react-icons/si";
import { FaAws, FaLock, FaArrowRight } from "react-icons/fa";

const TECH_ICON: Record<string, { Icon: IconType; color: string }> = {
  "Next.js": { Icon: SiNextdotjs, color: "#FFFFFF" },
  React: { Icon: SiReact, color: "#61DAFB" },
  "React Native": { Icon: SiReact, color: "#61DAFB" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
  "Google Cloud": { Icon: SiGooglecloud, color: "#4285F4" },
  Tailwind: { Icon: SiTailwindcss, color: "#06B6D4" },
  MongoDB: { Icon: SiMongodb, color: "#47A248" },
  MySQL: { Icon: SiMysql, color: "#4479A1" },
  Express: { Icon: SiExpress, color: "#FFFFFF" },
  "Node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
  Docker: { Icon: SiDocker, color: "#2496ED" },
  Kubernetes: { Icon: SiKubernetes, color: "#326CE5" },
  Firebase: { Icon: SiFirebase, color: "#FFCA28" },
  OpenAI: { Icon: SiOpenai, color: "#FFFFFF" },
  Python: { Icon: SiPython, color: "#3776AB" },
  PyTorch: { Icon: SiPytorch, color: "#EE4C2C" },
  AWS: { Icon: FaAws, color: "#FF9900" },
  Vultr: { Icon: SiVultr, color: "#007BFC" },
  "GitHub Actions": { Icon: SiGithubactions, color: "#2088FF" },
};

const ACCENT_GLOW: Record<NonNullable<(typeof PROJECTS)[number]["accent"]>, string> = {
  purple: "bg-purple-500/20",
  cyan: "bg-cyan-500/20",
  emerald: "bg-emerald-500/20",
  amber: "bg-amber-500/20",
};

const FILTER_ORDER: ProjectCategory[] = [
  "all",
  "web",
  "ai",
  "fullstack",
  "research",
];

const Projects = () => {
  const { t } = useI18n();
  const p = t.projects;
  const [filter, setFilter] = useState<ProjectCategory>("all");

  const visible = useMemo(
    () =>
      filter === "all"
        ? PROJECTS
        : PROJECTS.filter((proj) => proj.category === filter),
    [filter]
  );

  return (
    <>
      <h2 className="text-white font-semibold uppercase text-[clamp(32px,6vw,56px)] mb-4 text-center">
        {p.title}
      </h2>
      <p className="text-white/70 text-center text-[clamp(14px,2.5vw,18px)] mb-8 max-w-2xl mx-auto">
        {p.subtitle}
      </p>

      {/* Filters */}
      <div
        role="tablist"
        aria-label={p.title}
        className="mb-10 flex flex-wrap items-center justify-center gap-2"
      >
        {FILTER_ORDER.map((key) => {
          const selected = filter === key;
          return (
            <button
              key={key}
              role="tab"
              aria-selected={selected}
              onClick={() => setFilter(key)}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                selected
                  ? "border-white/30 bg-white/15 text-white"
                  : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/25 hover:text-white"
              }`}
            >
              {p.filters[key]}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.map((proj) => (
          <article
            key={proj.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-6 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-white/30 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            {/* ambient accent glow */}
            <div
              aria-hidden
              className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-60 ${
                ACCENT_GLOW[proj.accent ?? "purple"]
              }`}
            />

            <div className="relative flex items-center justify-between gap-3">
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/75">
                {proj.categoryLabel}
              </span>
              {proj.confidential && (
                <span
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-white/45"
                  title={proj.summary}
                >
                  <FaLock aria-hidden className="text-[10px]" />
                  {p.confidential}
                </span>
              )}
            </div>

            <h3 className="relative mt-4 text-[clamp(18px,3vw,22px)] font-bold leading-tight text-white">
              {proj.title}
            </h3>
            <p className="relative mt-1 text-xs font-medium text-white/45">
              {proj.period}
            </p>

            <p className="relative mt-3 text-sm leading-6 text-white/70">
              {proj.summary}
            </p>

            {proj.highlight && (
              <p className="relative mt-3 text-sm font-medium text-cyan-300/90">
                ★ {proj.highlight}
              </p>
            )}

            {/* Tech stack */}
            <div className="relative mt-5 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
              {proj.tech.map((name) => {
                const meta = TECH_ICON[name];
                return (
                  <span
                    key={name}
                    className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-white/75"
                  >
                    {meta && (
                      <meta.Icon
                        aria-hidden
                        style={{ color: meta.color }}
                        className="text-sm"
                      />
                    )}
                    {name}
                  </span>
                );
              })}
            </div>
          </article>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <a
          href="#contact"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
        >
          <span>{p.cta}</span>
          <FaArrowRight aria-hidden className="text-xs" />
        </a>
      </div>
    </>
  );
};

export default Projects;
