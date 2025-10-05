import { style } from "@/style";
import React from "react";

const Experience = () => {
  return (
    <div className={``}>
      <h1 className="text-white font-semibold uppercase text-[clamp(32px,6vw,56px)] text-start lg:text-center mb-8">
        Experience
      </h1>

      {/* Career Timeline */}
      <div className="mb-12">
        <h2 className="text-white font-semibold text-[clamp(24px,4vw,36px)] mb-8 text-center">
          Career Journey
        </h2>
        <div className="relative max-w-5xl mx-auto">
          {/* Center vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/50 via-white/30 to-transparent -translate-x-1/2"></div>

          <div className="space-y-12">
            {/* Timeline Item 1 - Right */}
            <div className="relative grid grid-cols-2 gap-8 items-center">
              {/* Left Empty */}
              <div></div>
              {/* Center Point */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white ring-4 ring-white/20 z-10"></div>
              {/* Right Content */}
              <div className="text-left">
                <div className="text-white/50 text-[clamp(13px,2vw,16px)] mb-1">
                  2024 - Present
                </div>
                <div className="text-white font-semibold lg:text-[clamp(18px,3vw,24px)] mb-2 rounded-2xl border border-white/10 px-3">
                  Full-Stack Developer
                </div>
                <div className="text-white font-semibold lg:text-[clamp(18px,3vw,18px)] mb-2">
                  @ CREaiVE.ai
                </div>
                <div className="text-white/70 text-[clamp(14px,2.2vw,18px)] leading-relaxed">
                  Building CMS platforms, AI chatbots with holographic displays,
                  and e-commerce solutions. Pioneering AI Human avatar
                  technology.
                </div>
              </div>
            </div>

            {/* Timeline Item 2 - Left */}
            <div className="relative grid grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="text-right">
                <div className="text-white/50 text-[clamp(13px,2vw,16px)] mb-1">
                  2021 - 2024
                </div>
                <div className="text-white font-semibold lg:text-[clamp(18px,3vw,24px)] mb-2 rounded-2xl border border-white/10 px-3">
                  AI Researcher & Teaching Assistant
                </div>
                <div className="text-white font-semibold lg:text-[clamp(18px,3vw,18px)] mb-2">
                  @ KMUTT
                </div>
                <div className="text-white/70 text-[clamp(14px,2.2vw,18px)] leading-relaxed">
                  Developed computer vision for PPE detection (Panasonic) and
                  speech recognition systems for medical rehabilitation (NSTDA).
                </div>
              </div>
              {/* Center Point */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gray-300 ring-4 ring-gray-300/20 z-10"></div>
              {/* Right Empty */}
              <div></div>
            </div>

            {/* Timeline Item 3 - Right */}
            <div className="relative grid grid-cols-2 gap-8 items-center">
              {/* Left Empty */}
              <div></div>
              {/* Center Point */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gray-400 ring-4 ring-gray-400/20 z-10"></div>
              {/* Right Content */}
              <div className="text-left">
                <div className="text-white/50 text-[clamp(13px,2vw,16px)] mb-1 ">
                  2019 - 2020
                </div>
                <div className="text-white font-semibold lg:text-[clamp(18px,3vw,24px)] mb-2 rounded-2xl border border-white/10 px-3">
                  Electrical Engineering Intern
                </div>
                <div className="text-white font-semibold lg:text-[clamp(18px,3vw,18px)] mb-2">
                  @ Seagate Technology Thailand ,Ltd
                </div>
                <div className="text-white/70 text-[clamp(14px,2.2vw,18px)] leading-relaxed">
                  Built full-stack inventory management system managing 300+
                  warehouse products with React, Node.js, and SQL.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
