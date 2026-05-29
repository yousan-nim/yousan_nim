"use client";

import React from "react";

import { FaSchool, FaUniversity } from "react-icons/fa";
import { useI18n } from "@/lib/i18n/I18nProvider";

const Education = () => {
  const { t } = useI18n();
  const items = t.education.items;
  return (
    <div>
      <h2 className="text-white font-semibold uppercase text-[clamp(32px,6vw,56px)] text-start lg:text-center mb-8">
        {t.education.title}
      </h2>

      {/* Mosaic layout: left-top (40%), center, right-bottom (40%) */}
      <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4 md:gap-6 max-w-screen-2xl mx-auto ">
        <div className="md:col-span-5 md:col-start-8 md:row-start-1 rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent backdrop-blur p-6">
          <div className="text-white font-semibold text-[clamp(18px,3vw,22px)] mb-2">
            {items[0].degree}
          </div>
          <div className="text-white/80 text-[clamp(14px,2.2vw,16px)] mb-2">
            {items[0].school}
          </div>
          <div className="text-white/60 text-[clamp(12px,2vw,14px)]">
            {items[0].years}
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-6 md:row-start-2 rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent backdrop-blur p-6">
          <div className="text-white font-semibold text-[clamp(18px,3vw,22px)] mb-2">
            {items[1].degree}
          </div>
          <div className="text-white/80 text-[clamp(14px,2.2vw,16px)] mb-2">
            {items[1].school}
          </div>
          <div className="text-white/60 text-[clamp(12px,2vw,14px)]">
            {items[1].years}
          </div>
        </div>

        <div className="md:col-span-3 md:col-start-4 md:row-start-3 rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent backdrop-blur p-6">
          <div className="text-white font-semibold text-[clamp(18px,3vw,22px)] mb-2">
            {items[2].degree}
          </div>
          <div className="text-white/80 text-[clamp(14px,2.2vw,16px)] mb-2">
            {items[2].school}
          </div>
          <div className="text-white/60 text-[clamp(12px,2vw,14px)]">
            {items[2].years}
          </div>
        </div>

        <div className="hidden md:block md:col-span-3 md:col-start-1 md:row-start-1 rounded-xl border border-white/10 bg-gradient-to-tl from-black/20 via-black/10 to-white/5 backdrop-blur p-6 group [perspective:1000px]"></div>
        <div className="hidden md:block md:col-span-2 md:col-start-4 md:row-start-1 rounded-xl border border-white/10 bg-gradient-to-tl from-black/20 via-black/10 to-white/5 backdrop-blur p-6"></div>
        <div className="hidden md:block md:col-span-1 md:col-start-6 md:row-start-1 rounded-xl border border-white/10 bg-gradient-to-tl from-black/20 via-black/10 to-white/5 backdrop-blur p-6"></div>
        <div className="hidden md:block md:col-span-1 md:col-start-7 md:row-start-1 rounded-xl group border border-white/10 bg-gradient-to-tl from-black/20 via-black/10 to-white/5 backdrop-blur p-6 [perspective:1000px]">
          <div className="relative h-full w-full transform-gpu transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] flex items-center justify-center">
            <div className="absolute inset-0 rounded-md [backface-visibility:hidden] flex items-center justify-center text-6xl text-white/80">
              <FaUniversity />
            </div>
            <div className="absolute inset-0 rounded-md [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center justify-center text-6xl text-white/80">
              <FaUniversity />
            </div>
          </div>
        </div>

        <div className="hidden md:block md:col-span-1 md:col-start-1 md:row-start-2 rounded-xl border border-white/10 bg-gradient-to-tl from-black/20 via-black/10 to-white/5 backdrop-blur p-6"></div>
        <div className="hidden md:block md:col-span-2 md:col-start-2 md:row-start-2 rounded-xl border border-white/10 bg-gradient-to-tl from-black/20 via-black/10 to-white/5 backdrop-blur p-6"></div>
        <div className="hidden md:block md:col-span-2 md:col-start-4 md:row-start-2 rounded-xl group border border-white/10 bg-gradient-to-tl from-black/20 via-black/10 to-white/5 backdrop-blur p-6 [perspective:1000px]">
          <div className="relative h-full w-full transform-gpu transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] flex items-center justify-center">
            <div className="absolute inset-0 rounded-md [backface-visibility:hidden] flex items-center justify-center text-6xl text-white/80">
              <FaUniversity />
            </div>
            <div className="absolute inset-0 rounded-md [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center justify-center text-6xl text-white/80">
              <FaUniversity />
            </div>
          </div>
        </div>
        <div className="hidden md:block md:col-span-1 md:col-start-12 md:row-start-2 rounded-xl border border-white/10 bg-gradient-to-tl from-black/20 via-black/10 to-white/5 backdrop-blur p-6"></div>

        <div className="hidden md:block md:col-span-3 md:col-start-1 md:row-start-3 rounded-xl group border border-white/10 bg-gradient-to-tl from-black/20 via-black/10 to-white/5 backdrop-blur p-6 [perspective:1000px]">
          <div className="relative h-full w-full transform-gpu transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] flex items-center justify-center">
            <div className="absolute inset-0 rounded-md b [backface-visibility:hidden] flex items-center justify-center text-6xl text-white/80">
              <FaSchool />
            </div>
            <div className="absolute inset-0 rounded-md [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center justify-center text-6xl text-white/80">
              <FaSchool />
            </div>
          </div>
        </div>
        <div className="hidden md:block md:col-span-1 md:col-start-7 md:row-start-3 rounded-xl border border-white/10 bg-gradient-to-tl from-black/20 via-black/10 to-white/5 backdrop-blur p-6"></div>
        <div className="hidden md:block md:col-span-2 md:col-start-8 md:row-start-3 rounded-xl border border-white/10 bg-gradient-to-tl from-black/20 via-black/10 to-white/5 backdrop-blur p-6"></div>
        <div className="hidden md:block md:col-span-3 md:col-start-10 md:row-start-3 rounded-xl border border-white/10 bg-gradient-to-tl from-black/20 via-black/10 to-white/5 backdrop-blur p-6"></div>

        <div className="hidden md:block md:col-span-2 md:col-start-1 md:row-start-4 rounded-xl border border-white/10 bg-gradient-to-tl from-black/20 via-black/10 to-white/5 backdrop-blur p-6"></div>
        <div className="hidden md:block md:col-span-4 md:col-start-3 md:row-start-4 rounded-xl border border-white/10 bg-gradient-to-tl from-black/20 via-black/10 to-white/5 backdrop-blur p-6"></div>
        <div className="hidden md:block md:col-span-3 md:col-start-7 md:row-start-4 rounded-xl border border-white/10 bg-gradient-to-tl from-black/20 via-black/10 to-white/5 backdrop-blur p-6"></div>
        <div className="hidden md:block md:col-span-2 md:col-start-10 md:row-start-4 rounded-xl border border-white/10 bg-gradient-to-tl from-black/20 via-black/10 to-white/5 backdrop-blur p-6"></div>
        <div className="hidden md:block md:col-span-1 md:col-start-12 md:row-start-4 rounded-xl border border-white/10 bg-gradient-to-tl from-black/60 via-black/50 to-white/5 backdrop-blur p-6"></div>
      </div>

      {/* Mobile timeline (compact) */}
      <div className="md:hidden mt-4 flex items-center justify-center gap-2 text-white/50 text-xs">
        <span>2017</span>
        <span className="inline-block h-px w-12 bg-white/20" />
        <span>2025</span>
      </div>
    </div>
  );
};

export default Education;
