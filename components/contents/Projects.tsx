"use client";

import React from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";

const EMAIL = "pongchanok.nt@gmail.com";

const NOTIFY_MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Notify me when Projects launch — Pongchanok Nuamteam"
)}&body=${encodeURIComponent(
  "Hi Pongchanok,\n\nPlease let me know when your projects showcase is live.\n\nThanks!"
)}`;

const Projects = () => {
  const { t } = useI18n();
  const p = t.projects;

  return (
    <>
      <h2 className="text-white font-semibold uppercase text-[clamp(32px,6vw,56px)] mb-8 text-center">
        {p.title}
      </h2>

      <div className="mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-8 md:p-12 text-center shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          {/* ambient glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute -top-24 -left-16 h-56 w-56 rounded-full bg-purple-500/15 blur-3xl" />
            <div className="absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />
          </div>

          {/* animated badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
            </span>
            {p.comingSoonBadge}
          </span>

          <h3 className="mt-6 text-[clamp(24px,4vw,40px)] font-black leading-tight tracking-tight text-white">
            {p.comingSoonTitle}
          </h3>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/65 md:text-base md:leading-8">
            {p.comingSoonBody}
          </p>

          {/* skeleton placeholder strip */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-16 rounded-xl border border-white/8 bg-white/[0.03] animate-pulse"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={NOTIFY_MAILTO}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              <span>{p.notifyMe}</span>
              <span aria-hidden>✉️</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            >
              <span>{t.nav.contact}</span>
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
