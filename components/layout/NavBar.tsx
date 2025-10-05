"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type Item = {
  id: string; // section id on the page
  label: string; // text shown in nav
};

const NAV_ITEMS: Item[] = [
  { id: "about", label: "About Me" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  // { id: "vocation", label: "Vocation" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  // Smooth scroll (works for anchors and Link href="#id")
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
    setOpen(false);
  };

  // Active section highlighting using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // pick the most visible entry
        const visible = entries
          .filter((en) => en.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },

      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.01, 0.25, 0.5, 0.75, 1] }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });


    // Fallback: if scrolled to the bottom, ensure 'contact' is active
    const onScrollBottom = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) setActive("contact");
    };
    window.addEventListener("scroll", onScrollBottom, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScrollBottom);
    };
  }, []);

  return (
    <header className="absolute top-0 lg:top-2 left-0 z-40 w-screen flex justify-center">
      <div className="mt-2 w-[95%] md:w-[98%] xl:max-w-screen rounded-xl ">
        <div className="mx-auto flex h-14 items-center justify-between pr-2 pl-4 lg:px-4 max-w-[1200px] lg:max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] min-[1920px]:max-w-[1920px] min-[2560px]:max-w-[2200px]">
          {/* Logo / Name */}
          <Link href="/" className="shrink-0">
            <span className="font-semibold tracking-wide text-sm md:text-base lg:text-lg 2xl:text-xl text-white text-start">
              YOUSAN NIM
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex gap-2 lg:gap-3 2xl:gap-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={[
                  "rounded-md px-3 py-2 md:text-sm lg:text-base 2xl:text-lg transition uppercase",
                  active === item.id
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden lg:block">
            <button className="ml-4 rounded-md border border-white/30 bg-white/20 px-4 py-2 text-sm text-white hover:bg-white/30 transition">
              Sign In
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="rounded-md p-2 text-slate-200 hover:bg-white/10 lg:hidden border-[1px] border-white/10"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
              {open ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          id="mobile-nav"
          className={[
            "lg:hidden transition-[max-height] duration-200 overflow-hidden",
            open ? "max-h-96" : "max-h-0",
          ].join(" ")}
        >
          <div className="space-y-1 border-t border-white/10 bg-[#0f1115] p-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={[
                  "block rounded-md px-4 py-3 text-base",
                  active === item.id
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 border-t border-white/10 pt-2">
              {/* <button className="w-full rounded-md border border-white/30 bg-white/20 px-4 py-2 text-sm text-white hover:bg-white/30 transition">
                Sign In
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
