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
            {/* Vertical line: left rail on mobile, centered on md+ */}
            <div className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/50 via-white/30 to-transparent left-2 md:left-1/2 md:-translate-x-1/2"></div>

            <div className="space-y-8 md:space-y-12">
              {e.items.map((item, i) => {
                const isLeft = i % 2 === 1;
                return (
                  <div
                    key={i}
                    className="relative grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 md:items-center"
                  >
                    {/* spacer for the empty side on md+ */}
                    {!isLeft && <div className="hidden md:block" />}

                    {/* timeline dot */}
                    <div
                      className={`absolute top-2 md:top-1/2 left-2 md:left-1/2 -translate-x-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full ring-4 z-10 ${POINT_COLOR[i]}`}
                    ></div>

                    <div
                      className={`pl-8 md:pl-0 ${
                        isLeft ? "md:text-right" : "md:text-left"
                      }`}
                    >
                      <div className="text-white/50 text-[clamp(13px,2vw,16px)] mb-1">
                        {item.period}
                      </div>
                      <div
                        className={`inline-block max-w-full break-words text-white font-semibold text-[clamp(16px,3vw,24px)] mb-2 rounded-2xl border border-white/10 px-3 ${
                          isLeft ? "md:ml-auto" : ""
                        }`}
                      >
                        {item.role}
                      </div>
                      <div className="text-white font-semibold text-[clamp(15px,3vw,18px)] mb-2">
                        {item.company}
                      </div>
                      <div className="text-white/70 text-[clamp(14px,2.2vw,18px)] leading-relaxed">
                        {item.desc}
                      </div>
                    </div>

                    {isLeft && <div className="hidden md:block" />}
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
