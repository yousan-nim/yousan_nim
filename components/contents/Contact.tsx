"use client";

import React from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";

const Contact = () => {
  const { t } = useI18n();
  const c = t.contact;
  const EMAIL = "pongchanok.nt@gmail.com";
  const LINKEDIN = "https://www.linkedin.com/in/yousan-nim/";
  const GITHUB = "https://github.com/yousan-nim";
  const WEBSITE = "https://yousan-nim.com/";
  const LINKEDIN_DISPLAY = "linkedin.com/in/yousan-nim";
  const GITHUB_DISPLAY = "github.com/yousan-nim";
  const WEBSITE_DISPLAY = "yousan-nim.com";
  const CV_REQUEST_MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
    "Requesting CV — Pongchanok Nuamteam"
  )}&body=${encodeURIComponent(
    "Hi Pongchanok,\n\nI'd like to request your latest CV. A bit about me and the role:\n\n— \n\nThanks!"
  )}`;

  return (
    <div className="">
      <h2 className="text-white font-semibold uppercase text-[clamp(32px,6vw,56px)] mb-4 text-center">
        {c.title}
      </h2>

      {/* Subtitle */}
      <p className="hidden md:block text-white/70 text-center text-[clamp(14px,2.5vw,18px)] mb-10 max-w-2xl mx-auto">
        {c.subtitle}
      </p>
      <p className="md:hidden text-white/70 text-center text-[clamp(12px,3.5vw,16px)] mb-8">
        {c.subtitleMobile}
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
        <a
          href={`mailto:${EMAIL}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-white text-black px-5 py-3 font-semibold hover:bg-white/90 transition"
        >
          <span>{c.emailMe}</span>
          <span aria-hidden>✉️</span>
        </a>
        <a
          href={CV_REQUEST_MAILTO}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 text-white px-5 py-3 font-semibold hover:border-white/40 transition"
          title="Send an email to request the latest CV"
        >
          <span>Request CV via Email</span>
          <span aria-hidden>📄</span>
        </a>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        <a
          href={`mailto:${EMAIL}`}
          className="rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-5 hover:border-white/30 transition group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="text-2xl">✉️</div>
            <div className="text-white font-semibold text-[clamp(16px,3vw,18px)]">
              {c.email}
            </div>
          </div>
          <div className="text-white/70 text-[clamp(12px,2.5vw,14px)] truncate">
            {EMAIL}
          </div>
        </a>

        <a
          href={LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-5 hover:border-white/30 transition group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="text-2xl">🔗</div>
            <div className="text-white font-semibold text-[clamp(16px,3vw,18px)]">
              {c.linkedin}
            </div>
          </div>
          <div className="text-white/70 text-[clamp(12px,2.5vw,14px)] truncate">
            {LINKEDIN_DISPLAY}
          </div>
        </a>

        <a
          href={GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-5 hover:border-white/30 transition group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="text-2xl">🐙</div>
            <div className="text-white font-semibold text-[clamp(16px,3vw,18px)]">
              {c.github}
            </div>
          </div>
          <div className="text-white/70 text-[clamp(12px,2.5vw,14px)] truncate">
            {GITHUB_DISPLAY}
          </div>
        </a>

        <a
          href={WEBSITE}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-5 hover:border-white/30 transition group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="text-2xl">🌐</div>
            <div className="text-white font-semibold text-[clamp(16px,3vw,18px)]">
              Website
            </div>
          </div>
          <div className="text-white/70 text-[clamp(12px,2.5vw,14px)] truncate">
            {WEBSITE_DISPLAY}
          </div>
        </a>
      </div>

      {/* Note */}
      <p className="text-white/50 mt-8 text-center text-[clamp(12px,2vw,14px)]">
        {c.note}
      </p>
    </div>
  );
};

export default Contact;
