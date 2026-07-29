"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n/I18nProvider";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

type NavLabelKey =
  | "about"
  | "experience"
  | "education"
  | "projects"
  | "blogs"
  | "contact";

type NavItem = {
  labelKey?: NavLabelKey;
  label?: string;
  href: string;
  kind: "section" | "page";
  id?: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: "about", labelKey: "about", href: "/#about", kind: "section" },
  {
    id: "experience",
    labelKey: "experience",
    href: "/#experience",
    kind: "section",
  },
  {
    id: "education",
    labelKey: "education",
    href: "/#education",
    kind: "section",
  },
  { id: "projects", labelKey: "projects", href: "/#projects", kind: "section" },
  { id: "contact", labelKey: "contact", href: "/#contact", kind: "section" },
  { labelKey: "blogs", href: "/blogs", kind: "page" },
  { label: "Your Energy", href: "/yourEnergy", kind: "page" },
];

const BLOGS_ITEM = NAV_ITEMS.find((item) => item.labelKey === "blogs")!;
const ENERGY_ITEM = NAV_ITEMS.find((item) => item.href === "/yourEnergy")!;
const PRIMARY_ITEMS = NAV_ITEMS.filter(
  (item) => item.labelKey !== "blogs" && item.href !== "/yourEnergy"
);

export default function Navbar() {
  const { t } = useI18n();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isEnergy = pathname === "/yourEnergy";
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    if (!isHome) {
      setOpen(false);
      return;
    }

    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
    setOpen(false);
  };

  const isActive = (item: NavItem) => {
    if (item.kind === "page") {
      return pathname === item.href || pathname.startsWith(`${item.href}/`);
    }

    return isHome && item.id === active;
  };

  useEffect(() => {
    if (!isHome) {
      setActive("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((en) => en.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.01, 0.25, 0.5, 0.75, 1],
      }
    );

    NAV_ITEMS.filter(
      (item): item is NavItem & { kind: "section"; id: string } =>
        item.kind === "section" && typeof item.id === "string"
    ).forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

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
  }, [isHome]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const renderNavLink = (item: NavItem, mobile = false) => {
    const activeItem = isActive(item);
    const baseClasses = mobile
      ? "block rounded-md px-4 py-3 text-base"
      : "rounded-md px-3 py-2 md:text-sm lg:text-base 2xl:text-lg transition uppercase";
    const stateClasses = isEnergy
      ? activeItem
        ? "bg-rose-100 text-rose-950"
        : "text-rose-800 hover:bg-rose-100 hover:text-rose-950"
      : activeItem
        ? "bg-white/10 text-white"
        : "text-slate-300 hover:bg-white/10 hover:text-white";

    return (
      <Link
        key={`${item.kind}-${item.id ?? item.href}`}
        href={
          isHome && item.kind === "section" && item.id
            ? `#${item.id}`
            : item.href
        }
        onClick={(e) => {
          if (item.kind === "section" && item.id) {
            handleSectionClick(e, item.id);
            return;
          }

          setOpen(false);
        }}
        className={[baseClasses, stateClasses].join(" ")}
      >
        {item.labelKey ? t.nav[item.labelKey] : item.label}
      </Link>
    );
  };

  return (
    <header className="absolute top-0 lg:top-2 inset-x-0 z-40 flex justify-center">
      <div className="mt-2 w-[95%] md:w-[98%] xl:max-w-screen rounded-xl ">
        <div className="mx-auto flex h-14 items-center justify-between 
          max-w-[1200px] lg:max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-screen-2xl min-[1920px]:max-w-[1920px] min-[2560px]:max-w-[2200px]
          ">
          {/* Logo / Name */}
          <Link href="/" className="shrink-0">
            <span
              className={[
                "text-start text-sm font-semibold tracking-wide md:text-base lg:text-lg 2xl:text-xl",
                isEnergy ? "text-rose-950" : "text-white",
              ].join(" ")}
            >
              YOUSAN NIM
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-2 lg:gap-3 2xl:gap-4">
            {PRIMARY_ITEMS.map((item) => renderNavLink(item))}
            <span
              aria-hidden
              className={[
                "mx-1 h-5 w-px",
                isEnergy ? "bg-rose-300" : "bg-white/25",
              ].join(" ")}
            />
            {renderNavLink(BLOGS_ITEM)}
            {renderNavLink(ENERGY_ITEM)}
          </nav>
          <div className="hidden lg:flex items-center gap-3">
            {!isEnergy && <LanguageSwitcher />}
            <a
              href="/cv/Pongchanok_Nuamteam_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "rounded-md border px-4 py-2 text-sm transition",
                isEnergy
                  ? "border-rose-300 bg-white/60 text-rose-900 hover:bg-white"
                  : "border-white/30 bg-white/20 text-white hover:bg-white/30",
              ].join(" ")}
            >
              {t.nav.resume}
            </a>
          </div>

          {/* Mobile language switcher */}
          {!isEnergy && (
            <div className="mr-2 lg:hidden">
              <LanguageSwitcher />
            </div>
          )}

          {/* Mobile toggle */}
          <button
            className={[
              "rounded-md border p-2 lg:hidden",
              isEnergy
                ? "border-rose-300 bg-white/50 text-rose-900 hover:bg-white"
                : "border-white/10 text-slate-200 hover:bg-white/10",
            ].join(" ")}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
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
          <div
            className={[
              "space-y-1 border-t p-2",
              isEnergy
                ? "border-rose-200 bg-rose-50"
                : "border-white/10 bg-[#0f1115]",
            ].join(" ")}
          >
            {NAV_ITEMS.map((item) => renderNavLink(item, true))}
          </div>
        </div>
      </div>
    </header>
  );
}
