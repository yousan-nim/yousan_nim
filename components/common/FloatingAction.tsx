import React from "react";
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
  return (
    <div
      role="navigation"
      aria-label="Quick contact"
      className="fixed right-6 bottom-24 z-40 flex flex-col items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] p-2 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
    >
      {/* subtle accent glow matching the site theme */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_60%)]"
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
          className="group relative flex h-11 w-11 items-center justify-center rounded-full text-white/70 transition-all duration-200 hover:bg-white/10 hover:text-white"
        >
          <Icon className="text-lg transition-transform duration-200 group-hover:scale-110" />
          {/* tooltip on the left */}
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md border border-white/10 bg-black/90 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
};

export default FloatingAction;
