"use client";

import React from "react";
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
    <section id="experience" className="py-20 min-h-screen">
      <div className="w-[95%] md:w-[80%] xl:max-w-screen-2xl mx-auto">
        <h1 className="text-white font-semibold uppercase text-[clamp(32px,6vw,56px)] text-start lg:text-center mb-8">
          {e.title}
        </h1>

        {/* Career Timeline */}
        <div className="mb-12">
          <h2 className="text-white font-semibold text-[clamp(24px,4vw,36px)] mb-8 text-center">
            {e.subtitle}
          </h2>
          <div className="relative max-w-5xl mx-auto">
            {/* Center vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/50 via-white/30 to-transparent -translate-x-1/2"></div>

            <div className="space-y-12">
              {e.items.map((item, i) => {
                const isLeft = i % 2 === 1;
                return (
                  <div
                    key={i}
                    className="relative grid grid-cols-2 gap-8 items-center"
                  >
                    {!isLeft && <div></div>}
                    <div
                      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full ring-4 z-10 ${POINT_COLOR[i]}`}
                    ></div>
                    <div className={isLeft ? "text-right" : "text-left"}>
                      <div className="text-white/50 text-[clamp(13px,2vw,16px)] mb-1">
                        {item.period}
                      </div>
                      <div className="text-white font-semibold lg:text-[clamp(18px,3vw,24px)] mb-2 rounded-2xl border border-white/10 px-3">
                        {item.role}
                      </div>
                      <div className="text-white font-semibold lg:text-[clamp(18px,3vw,18px)] mb-2">
                        {item.company}
                      </div>
                      <div className="text-white/70 text-[clamp(14px,2.2vw,18px)] leading-relaxed">
                        {item.desc}
                      </div>
                    </div>
                    {isLeft && <div></div>}
                  </div>
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
