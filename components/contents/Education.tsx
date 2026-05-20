"use client";

import React from "react";
import { FaSchool, FaUniversity } from "react-icons/fa";
import { useI18n } from "@/lib/i18n/I18nProvider";

const ICONS = [FaUniversity, FaUniversity, FaSchool];

const Education = () => {
  const { t } = useI18n();
  const items = t.education.items;

  return (
    <div>
      <h2 className="text-white font-semibold uppercase text-[clamp(32px,6vw,56px)] text-start lg:text-center mb-8">
        {t.education.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {items.map((item, i) => {
          const Icon = ICONS[i] ?? FaUniversity;
          return (
            <div
              key={i}
              className="group rounded-xl border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-transparent backdrop-blur p-6 hover:border-white/30 transition-all duration-300"
            >
              <div className="text-4xl text-white/80 mb-4 transition-transform duration-500 group-hover:scale-110">
                <Icon />
              </div>
              <div className="text-white font-semibold text-[clamp(18px,3vw,22px)] mb-2">
                {item.degree}
              </div>
              <div className="text-white/80 text-[clamp(14px,2.2vw,16px)] mb-3">
                {item.school}
              </div>
              <div className="text-white/60 text-[clamp(12px,2vw,14px)]">
                {item.years}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Education;
