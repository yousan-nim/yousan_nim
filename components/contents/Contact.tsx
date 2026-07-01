"use client";

import React from "react";
import { FiFileText, FiGlobe, FiMail } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
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
    "Requesting CV — Yousan Nim"
  )}&body=${encodeURIComponent(
    "Hi Yousan,\n\nI'd like to request your latest CV. A bit about me and the role:\n\n— \n\nThanks!"
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
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-black transition hover:bg-white/90 sm:w-auto"
        >
          <FiMail aria-hidden />
          <span>{c.emailMe}</span>
        </a>
        <a
          href={CV_REQUEST_MAILTO}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 font-semibold text-white transition hover:border-white/40 sm:w-auto"
          title="Send an email to request the latest CV"
        >
          <FiFileText aria-hidden />
          <span>{c.downloadResume}</span>
        </a>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        <a
          href={`mailto:${EMAIL}`}
          className="rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-5 hover:border-white/30 transition group"
        >
          <div className="flex items-center gap-3 mb-2">
            <FiMail aria-hidden className="text-xl text-emerald-200" />
            <div className="text-white font-semibold text-[clamp(16px,3vw,18px)]">
              {c.email}
            </div>
          </div>
          <div className="break-all text-[clamp(12px,2.5vw,14px)] text-white/70">
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
            <FaLinkedinIn aria-hidden className="text-lg text-emerald-200" />
            <div className="text-white font-semibold text-[clamp(16px,3vw,18px)]">
              {c.linkedin}
            </div>
          </div>
          <div className="break-all text-[clamp(12px,2.5vw,14px)] text-white/70">
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
            <FaGithub aria-hidden className="text-lg text-emerald-200" />
            <div className="text-white font-semibold text-[clamp(16px,3vw,18px)]">
              {c.github}
            </div>
          </div>
          <div className="break-all text-[clamp(12px,2.5vw,14px)] text-white/70">
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
            <FiGlobe aria-hidden className="text-xl text-emerald-200" />
            <div className="text-white font-semibold text-[clamp(16px,3vw,18px)]">
              Website
            </div>
          </div>
          <div className="break-all text-[clamp(12px,2.5vw,14px)] text-white/70">
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
