"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";

const HeaderCoolWord = () => {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const heroEl = heroRef.current;
    const bottomEl = bottomRef.current;
    if (!sectionEl || !heroEl || !bottomEl) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ticking = false;

    const update = () => {
      if (!sectionEl || !heroEl || !bottomEl) return;
      const scrollY = window.scrollY || window.pageYOffset;
      const sectionTop = sectionEl.offsetTop;
      const rel = scrollY - sectionTop;
      const y1 = rel * 0.15; // foreground text moves slower
      const y2 = rel * -0.08; // bottom block moves subtly opposite
      heroEl.style.transform = `translate3d(0, ${y1}px, 0)`;
      bottomEl.style.transform = `translate3d(0, ${y2}px, 0)`;
      ticking = false;
    };

    const onScroll = () => {
      if (prefersReduced) return;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    const onResize = () => {
      update();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      id="home"
      aria-label="Hero"
      ref={sectionRef}
      className="relative min-h-[100svh] lg:min-h-screen"
    >
      <div className="relative w-[95%] md:w-[80%] xl:max-w-screen-2xl mx-auto h-full">
        <div
          className="absolute left-0 top-[24%] z-10 flex w-full justify-center will-change-transform transform-gpu sm:top-[18%] xl:justify-start"
          aria-labelledby="hero-title"
          ref={heroRef}
        >
          <div className="cq mx-0 max-w-full md:w-[min(92vw,720px)] h-full">
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.32em] text-emerald-300/85 xl:text-left">
              Full-Stack Developer • AI Engineer
            </p>
            <h1
              id="hero-title"
              className="antialiased font-extrabold uppercase tracking-tight text-white m-auto"
            >
              <span
                className="
          block w-full text-center xl:text-left
          text-[clamp(24px,5vw,56px)] leading-[0.95]
          text-transparent bg-clip-text
          bg-gradient-to-r from-white/20 via-white to-white/20
          drop-shadow-[0_1px_0_rgba(255,255,255,0.2)]
        "
              >
                {t.hero.line1}
              </span>

              <span
                className="
          block w-full text-center xl:text-left
          text-[clamp(40px,10vw,120px)] leading-[0.8]
          lg:text-[clamp(40px,10vw,100px)]
          text-transparent bg-clip-text
          bg-gradient-to-br from-white/30 via-white to-white/20
          drop-shadow-[0_1px_0_rgba(255,255,255,0.2)] 
        "
              >
                {t.hero.line2}
              </span>
            </h1>

            <p
              className="
        w-full m-auto lg:w-full mt-4 xl:mt-6
        max-w-[58ch]
        text-slate-100/88 font-medium
        text-[clamp(14px,2.5vw,18px)] leading-7
        text-center xl:text-left lg:ml-0
      "
            >
              {t.hero.tagline}
            </p>
          </div>
        </div>
      </div>

      <div
        className="
    absolute inset-x-0 bottom-12 sm:bottom-16 md:bottom-20
    w-[min(95%,800px)] mx-auto
    lg:w-[min(90%,1000px)] xl:w-[min(85%,1200px)]
    text-center
    px-4 will-change-transform transform-gpu
  "
        ref={bottomRef}
      >
        <p
          className="
            rounded-xl
            text-[clamp(30px,6vw,52px)] leading-[0.9]
            uppercase font-black
            text-transparent bg-clip-text
            bg-gradient-to-br from-white/30 via-white to-white/20 
            drop-shadow-[0_1px_0_rgba(255,255,255,0.25)]
          "
        >
          Yousan Nim
        </p>

        <p
          className="
      mt-3 md:mt-4
      text-[clamp(15px,3.5vw,20px)] leading-relaxed
      font-medium text-slate-200/80
    "
        >
          {t.hero.role}
        </p>

        <div
          className="
      mt-5 md:mt-6 flex flex-wrap items-center justify-center gap-2 md:gap-3
    "
        >
          <a
            href="#contact"
            className="
        inline-flex min-h-11 items-center justify-center rounded-full
        border border-emerald-400/30 bg-emerald-400/16 px-5 py-2.5
        text-sm font-semibold text-white
        hover:border-emerald-300/50 hover:bg-emerald-400/24 transition-all duration-200
      "
          >
            {t.hero.contact}
          </a>

          <a
            href="#projects"
            className="
        inline-flex min-h-11 items-center justify-center rounded-full
        border border-white/14 bg-white/6 px-5 py-2.5
        text-sm font-medium text-slate-200
        hover:border-white/30 hover:bg-white/10 transition-all duration-200
      "
          >
            {t.hero.projects}
          </a>

          <Link
            href="/blogs"
            className="
        inline-flex min-h-11 items-center justify-center rounded-full
        border border-transparent px-4 py-2.5
        text-sm font-medium text-slate-300
        hover:text-white transition-all duration-200
      "
          >
            {t.nav.blogs}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeaderCoolWord;
