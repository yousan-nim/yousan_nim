"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";

const EMAIL = "pongchanok.nt@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/yousan-nim/";
const GITHUB = "https://github.com/yousan-nim";

const LINKS = [
  {
    label: "GitHub",
    href: GITHUB,
    Icon: FaGithub,
    external: true,
  },
  {
    label: "LinkedIn",
    href: LINKEDIN,
    Icon: FaLinkedinIn,
    external: true,
  },
  {
    label: "Email",
    href: `mailto:${EMAIL}`,
    Icon: FaEnvelope,
    external: false,
  },
];

const FloatingAction = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/blogs")) return null;

  return (
    <div
      role="navigation"
      aria-label="Quick contact"
      className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-md md:inset-x-auto md:bottom-8 md:right-6 md:mx-0 md:max-w-none"
    >
      <div className="relative flex items-stretch justify-between gap-2 rounded-3xl border border-white/10 bg-slate-950/82 p-2 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl md:flex-col md:items-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-[radial-gradient(circle_at_top,rgba(52,211,153,0.18),transparent_58%)]"
        />
        {LINKS.map(({ label, href, Icon, external }) => (
          <a
            key={label}
            href={href}
            title={label}
            aria-label={label}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="group relative flex min-h-11 flex-1 items-center justify-center gap-2 rounded-2xl px-3 text-sm font-medium text-white/78 transition-all duration-200 hover:bg-white/10 hover:text-white md:h-11 md:w-11 md:flex-none md:rounded-full md:px-0"
          >
            <Icon className="text-base transition-transform duration-200 group-hover:scale-110" />
            <span className="md:hidden">{label}</span>
            <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md border border-white/10 bg-black/90 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 md:block">
              {label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FloatingAction;
