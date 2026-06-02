"use client";

import React from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiThreedotjs,
  SiNodedotjs,
  SiExpress,
  SiGo,
  SiBun,
  SiSpringboot,
  SiPython,
  SiFlask,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiElasticsearch,
  SiDocker,
  SiKubernetes,
  SiVultr,
  SiGithubactions,
  SiPytorch,
  SiOpenai,
  SiGit,
  SiFigma,
  SiPostman,
  SiJira,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { TbBrandVscode } from "react-icons/tb";

const STEP_CIRCLE = [
  "bg-white ring-white/20 text-black",
  "bg-gray-300 ring-gray-300/20 text-black",
  "bg-gray-400 ring-gray-400/20 text-black",
  "bg-gray-500 ring-gray-500/20 text-white",
  "bg-gray-700 ring-gray-200/20 text-white",
];

const FOCUS_ICONS = ["⚡", "📉", "🎬"];

type Tech = { name: string; Icon?: IconType; color?: string };

const TECH_META: { icon: string; accent: string; techs: Tech[] }[] = [
  {
    icon: "⚛️",
    accent: "#38BDF8",
    techs: [
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "React Native", Icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Three.js", Icon: SiThreedotjs, color: "#FFFFFF" },
    ],
  },
  {
    icon: "🚂",
    accent: "#34D399",
    techs: [
      { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express", Icon: SiExpress, color: "#FFFFFF" },
      { name: "Go", Icon: SiGo, color: "#00ADD8" },
      { name: "Bun", Icon: SiBun, color: "#FBF0DF" },
      { name: "Spring Boot", Icon: SiSpringboot, color: "#6DB33F" },
      { name: "Python", Icon: SiPython, color: "#3776AB" },
      { name: "Flask", Icon: SiFlask, color: "#FFFFFF" },
    ],
  },
  {
    icon: "🗄️",
    accent: "#FBBF24",
    techs: [
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
      { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
      { name: "Elasticsearch", Icon: SiElasticsearch, color: "#005571" },
    ],
  },
  {
    icon: "☁️",
    accent: "#60A5FA",
    techs: [
      { name: "Docker", Icon: SiDocker, color: "#2496ED" },
      { name: "Kubernetes", Icon: SiKubernetes, color: "#326CE5" },
      { name: "AWS", Icon: FaAws, color: "#FF9900" },
      { name: "Vultr", Icon: SiVultr, color: "#007BFC" },
      { name: "GitHub Actions", Icon: SiGithubactions, color: "#2088FF" },
    ],
  },
  {
    icon: "🤖",
    accent: "#F472B6",
    techs: [
      { name: "PyTorch", Icon: SiPytorch, color: "#EE4C2C" },
      { name: "OpenAI", Icon: SiOpenai, color: "#FFFFFF" },
      { name: "RAG" },
      { name: "Computer Vision" },
      { name: "ASR" },
    ],
  },
  {
    icon: "🛠️",
    accent: "#FB923C",
    techs: [
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "VS Code", Icon: TbBrandVscode, color: "#007ACC" },
      { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
      { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
      { name: "Jira", Icon: SiJira, color: "#0052CC" },
    ],
  },
];

const STATS = [
  { value: "5+", key: "statYears" as const },
  { value: "10+", key: "statProjects" as const },
  { value: "2", key: "statResearch" as const },
  { value: "5+", key: "statCloud" as const },
];

const AboutMe = () => {
  const { t } = useI18n();
  const a = t.about;


  // py-20 md:py-28 bg-white/5 min-h-screen

  return (
    <section id="about" className="py-20">
      <div className="max-w-[90%] md:w-[80%] xl:max-w-screen-2xl mx-auto">
        <h1 className="text-white font-semibold uppercase text-[clamp(32px,6vw,56px)] text-start mb-8">
          {a.title}
        </h1>

        {/* Main Story */}
        <div className="grid lg:grid-cols-2 gap-4 mb-12">
          {/* Left: Personal Journey */}
          <div className="space-y-6 rounded-lg border border-white/10 bg-white/2 backdrop-blur p-5">
            <div className="prose prose-invert max-w-none">
              <p className="text-white text-[clamp(16px,2.5vw,20px)] leading-relaxed indent-8">
                {a.p1}
              </p>
              <p className="text-white text-[clamp(16px,2.5vw,20px)] leading-relaxed indent-8">
                {a.p2pre}
                <span className="text-white font-semibold">
                  {a.p2highlight}
                </span>
                {a.p2post}
              </p>
              <p className="text-white text-[clamp(16px,2.5vw,20px)] leading-relaxed indent-8">
                {a.p3pre}
                {a.p3mid}
                <span className="text-gray-300">{a.p3highlight}</span>
                {a.p3post}
              </p>
            </div>
          </div>

          {/* Right: Key Stats */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s) => (
              <div
                key={s.key}
                className="rounded-lg border border-white/10 bg-white/2 backdrop-blur p-5 text-center flex flex-col justify-center"
              >
                <div className="text-[clamp(32px,5vw,48px)] font-bold text-gray-100/98 mb-1">
                  {s.value}
                </div>
                <div className="text-white text-[clamp(12px,2vw,16px)] uppercase tracking-wide">
                  {a[s.key]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Software Development Lifecycle */}
        <div className="mb-12">
          <h2 className="text-white font-semibold text-[clamp(24px,4vw,36px)] mb-8 text-center">
            {a.processTitle}
          </h2>
          <p className="hidden md:block text-white/70 text-center text-[clamp(14px,2.5vw,18px)] mb-12 max-w-3xl mx-auto">
            {a.processSubtitle}
          </p>
          <p className="md:hidden text-white/70 text-center text-[clamp(12px,3.5vw,16px)] mb-8 mx-auto">
            {a.processSubtitleMobile}
          </p>

          <div className="relative max-w-5xl mx-auto">
            {/* Center vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/50 via-white/30 to-transparent -translate-x-1/2 hidden md:block"></div>

            <div className="space-y-12">
              {a.steps.map((step, i) => {
                const isLeft = i % 2 === 1;
                return (
                  <div
                    key={i}
                    className="relative grid md:grid-cols-2 grid-cols-1 gap-16 items-center"
                  >
                    {isLeft ? null : <div className="hidden md:block"></div>}
                    <div
                      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full ring-6 z-10 hidden md:flex items-center justify-center text-base font-bold ${STEP_CIRCLE[i]}`}
                    >
                      {i + 1}
                    </div>
                    <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent backdrop-blur p-6">
                      <div className="md:hidden text-white/60 text-xs font-medium tracking-wide uppercase mb-2">
                        {a.step} {i + 1}
                      </div>
                      <div
                        className={`text-white font-semibold text-[clamp(18px,3vw,22px)] mb-2 ${
                          isLeft ? "md:text-right" : ""
                        }`}
                      >
                        {step.title}
                      </div>
                      <div
                        className={`text-white/70 text-[clamp(14px,2.2vw,18px)] leading-relaxed mb-3 hidden md:block ${
                          isLeft ? "md:text-right" : ""
                        }`}
                      >
                        {step.desc}
                      </div>
                      <div className="text-white/60 text-sm md:hidden mb-3">
                        {step.descMobile}
                      </div>
                      <div
                        className={`flex flex-wrap gap-2 ${
                          isLeft ? "md:justify-end" : ""
                        }`}
                      >
                        {step.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1 rounded bg-white/5 text-white/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {isLeft ? <div className="hidden md:block"></div> : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Current Focus Areas */}
        <div className="mb-12">
          <h2 className="text-white font-semibold text-[clamp(24px,4vw,36px)] mb-8 text-center">
            {a.focusTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {a.focus.map((f, i) => (
              <div
                key={i}
                className="rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-6 hover:border-white/30 transition"
              >
                <div className="text-3xl mb-3">{FOCUS_ICONS[i]}</div>
                <h3 className="text-white font-semibold text-[clamp(18px,3vw,22px)] mb-3">
                  {f.title}
                </h3>
                <p className="text-white/70 text-[clamp(14px,2.2vw,16px)] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Expertise */}
        <div>
          <h2 className="text-white font-semibold text-[clamp(24px,4vw,36px)] mb-4 text-center">
            {a.techTitle}
          </h2>
          <p className="text-white/80 mb-12 text-[clamp(14px,2.5vw,18px)] leading-relaxed text-center max-w-3xl mx-auto">
            {a.techSubtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full mx-auto">
            {TECH_META.map((card, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 transition-all duration-300 hover:border-white/40 hover:-translate-y-1"
              >
                {/* white corner glow */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-40 transition-opacity duration-500 group-hover:opacity-80"
                  style={{
                    background:
                      "radial-gradient(circle at top right, rgba(255,255,255,0.18), transparent 55%)",
                  }}
                />
                {/* top accent line */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-50 transition-opacity duration-300 group-hover:opacity-90"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)",
                  }}
                />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ring-1 ring-inset transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.08)",
                        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.25)",
                      }}
                    >
                      {card.icon}
                    </div>
                    <h3 className="font-bold text-[clamp(18px,3vw,22px)] text-white">
                      {a.techCards[i]}
                    </h3>
                  </div>
                  <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                    {card.techs.map((tech) =>
                      tech.Icon ? (
                        <div
                          key={tech.name}
                          style={{ ["--brand" as string]: tech.color }}
                          className="group/item relative flex aspect-square items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--brand)] hover:bg-white/[0.08] hover:shadow-[0_0_24px_-6px_var(--brand)]"
                        >
                          <tech.Icon
                            className="text-3xl md:text-4xl transition-transform duration-200 group-hover/item:scale-110"
                            style={{ color: tech.color }}
                            aria-label={tech.name}
                          />
                          <span className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-black/90 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover/item:opacity-100">
                            {tech.name}
                          </span>
                        </div>
                      ) : (
                        <div
                          key={tech.name}
                          className="col-span-2 flex aspect-[2/1] items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.04] px-2 text-center text-[clamp(12px,2vw,14px)] font-semibold text-white/70 transition-colors hover:border-white/30 hover:text-white"
                        >
                          {tech.name}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-white/50 mt-10 text-center text-[clamp(12px,2vw,14px)] font-medium italic">
            {a.techFooter}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
