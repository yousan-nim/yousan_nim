"use client";

import React from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";

const STEP_CIRCLE = [
  "bg-white ring-white/20 text-black",
  "bg-gray-300 ring-gray-300/20 text-black",
  "bg-gray-400 ring-gray-400/20 text-black",
  "bg-gray-500 ring-gray-500/20 text-white",
  "bg-gray-700 ring-gray-200/20 text-white",
];

const FOCUS_ICONS = ["⚡", "📉", "🎬"];

const TECH_META: { icon: string; techs: string[] }[] = [
  {
    icon: "⚛️",
    techs: ["React", "Next.js", "TypeScript", "Tailwind", "Three.js"],
  },
  {
    icon: "🚂",
    techs: ["Node.js", "Express", "Spring Boot", "Python", "Flask"],
  },
  { icon: "🗄️", techs: ["MongoDB", "PostgreSQL", "MySQL", "Elasticsearch"] },
  {
    icon: "☁️",
    techs: ["Docker", "Kubernetes", "AWS", "Vultr", "GitHub Actions"],
  },
  { icon: "🤖", techs: ["PyTorch", "OpenAI", "RAG", "Computer Vision", "ASR"] },
  { icon: "🛠️", techs: ["Git", "VS Code", "Figma", "Postman", "Jira"] },
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

  return (
    <section id="about" className="p-0 m-0">
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
                className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-transparent backdrop-blur p-6 hover:border-white/40 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="text-3xl">{card.icon}</div>
                    <h3 className="font-bold text-[clamp(18px,3vw,22px)] text-white">
                      {a.techCards[i]}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {card.techs.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white/90 text-[clamp(12px,2vw,14px)] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
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
