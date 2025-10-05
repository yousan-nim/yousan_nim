import React from "react";

type Action = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

type HeaderWhatImIProps = {
  title?: string;
  blurb?: string;
  highlights?: string[];
  actions?: Action[];
  className?: string;
  pin?: boolean; // when true, pin to bottom-left like original
};

export default function HeaderWhatImI({
  title = "Who Am I?",
  blurb = "Full‑stack Developer with expertise in Next.js, React, Tailwind, MongoDB, and cloud deployment (Vultr/AWS). Experienced in building scalable web applications, CMS platforms, and AI‑driven chatbots/avatars with OpenAI LLM integration and RAG pipelines. Skilled in CI/CD, Docker, and Kubernetes, delivering solutions from planning to deployment. Passionate about digital transformation, AI innovation, and collaborative teamwork to create impactful, user‑focused systems.",
  highlights = [
    "Next.js",
    "React",
    "Tailwind CSS",
    "MongoDB",
    "Vultr/AWS",
    "OpenAI + RAG",
    "CI/CD",
    "Docker",
    "Kubernetes",
  ],
  actions = [
    { label: "View Projects", href: "#projects", variant: "primary" },
    { label: "Contact Me", href: "#contact", variant: "secondary" },
  ],
  className = "",
  pin = true,
}: HeaderWhatImIProps) {
  const position = pin ? "absolute bottom-0 left-0" : "relative py-6 md:py-8";

  return (
    <section
      aria-labelledby="whoami-heading"
      // className={["relative z-10", position, className].join(" ")}
      className="absolute bottom-20 left-0"
    >
      <div className="relative overflow-hidden">
        {/* Ambient glassy gradient glows behind the card */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {/* <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-3xl" />
          <div className="absolute -bottom-20 left-24 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="absolute top-10 -right-20 h-56 w-56 rounded-full bg-purple-500/15 blur-3xl" /> */}

          <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 left-24 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute top-10 -right-20 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
        </div>

        <div className="rounded-xl border border-white/10 backdrop-blur shadow-lg p-8 max-w-2xl text-center mx-auto">
          <h2
            id="whoami-heading"
            className="text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4 text-white tracking-tight"
          >
            {title}
          </h2>

          <p className="text-white/80 text-[15px] sm:text-base leading-relaxed text-justify">
            {blurb}
          </p>

          {highlights?.length ? (
            <ul className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-2">
              {highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-full border border-white/10 bg-white/5 text-slate-200 text-xs sm:text-[13px] px-3 py-1"
                  aria-label={h}
                >
                  {h}
                </li>
              ))}
            </ul>
          ) : null}

          {actions?.length ? (
            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              {actions.map(({ label, href, variant = "primary" }) => (
                <a
                  key={label}
                  href={href}
                  className={[
                    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm transition border",
                    variant === "primary"
                      ? "bg-white/20 border-white/30 text-white hover:bg-white/30"
                      : "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10",
                  ].join(" ")}
                >
                  {label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
