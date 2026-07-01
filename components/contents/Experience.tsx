"use client";

import React from "react";
import { FiBriefcase } from "react-icons/fi";
import { useI18n } from "@/lib/i18n/I18nProvider";

const POINT_COLOR = [
  "bg-white ring-white/20",
  "bg-gray-300 ring-gray-300/20",
  "bg-gray-400 ring-gray-400/20",
  "bg-gray-500 ring-gray-500/20",
  "bg-gray-600 ring-gray-600/20",
];

const Experience = () => {
  const { t } = useI18n();
  const e = t.experience;

  return (
    <section id="experience" className="scroll-mt-24 py-20 min-h-screen">
      <div className="w-[95%] md:w-[80%] xl:max-w-screen-2xl mx-auto">
        <h2 className="mb-4 text-start text-[clamp(32px,6vw,56px)] font-semibold uppercase text-white lg:text-center">
          {e.title}
        </h2>

        {/* Career Timeline */}
        <div className="mb-12">
          <p className="mx-auto mb-8 max-w-2xl text-center text-[clamp(15px,2.5vw,18px)] text-slate-300/78">
            {e.subtitle}
          </p>
          <div className="relative max-w-5xl mx-auto">
            {/* Center vertical line */}
            <div className="absolute bottom-0 left-[18px] top-0 w-px bg-gradient-to-b from-white/50 via-white/30 to-transparent md:left-1/2 md:-translate-x-1/2"></div>

            <div className="space-y-6 md:space-y-12">
              {e.items.map((item, i) => {
                const isLeft = i % 2 === 1;
                return (
                  <article
                    key={i}
                    className="relative pl-12 md:grid md:grid-cols-2 md:gap-8 md:pl-0"
                  >
                    {!isLeft && <div className="hidden md:block" />}
                    <div
                      className={`absolute left-0 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full ring-4 md:left-1/2 md:-translate-x-1/2 ${POINT_COLOR[i]}`}
                    >
                      <FiBriefcase className="text-sm" />
                    </div>
                    <div
                      className={[
                        "rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl md:p-6",
                        isLeft ? "md:text-right" : "md:text-left",
                      ].join(" ")}
                    >
                      <div className="mb-2 text-[clamp(12px,2vw,14px)] font-medium uppercase tracking-[0.24em] text-slate-400">
                        {item.period}
                      </div>
                      <h3 className="mb-2 text-[clamp(20px,3vw,24px)] font-semibold text-white">
                        {item.role}
                      </h3>
                      <p className="mb-3 text-[clamp(15px,2.5vw,18px)] font-medium text-emerald-200/86">
                        {item.company}
                      </p>
                      <p className="text-[clamp(15px,2.2vw,17px)] leading-8 text-slate-300/82">
                        {item.desc}
                      </p>
                    </div>
                    {isLeft && <div className="hidden md:block" />}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
