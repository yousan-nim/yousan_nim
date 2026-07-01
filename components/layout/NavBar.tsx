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
  labelKey: NavLabelKey;
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
];

const BLOGS_ITEM = NAV_ITEMS.find((item) => item.labelKey === "blogs")!;
const PRIMARY_ITEMS = NAV_ITEMS.filter((item) => item.labelKey !== "blogs");
const CTA_TARGET = "contact";

export default function Navbar() {
  const { t } = useI18n();
  const pathname = usePathname();
  const isHome = pathname === "/";
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
    const stateClasses = activeItem
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
        aria-current={activeItem ? "page" : undefined}
        className={[baseClasses, stateClasses].join(" ")}
      >
        {t.nav[item.labelKey]}
      </Link>
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 py-3">
      <div className="w-full max-w-[1500px] rounded-full border border-white/10 bg-slate-950/68 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
        <div className="mx-auto flex min-h-16 items-center justify-between px-3 md:px-5">
          {/* Logo / Name */}
          <Link href="/" className="shrink-0 rounded-full px-2 py-1">
            <span className="text-sm font-semibold tracking-[0.22em] text-white md:text-base">
              YOUSAN NIM
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex lg:gap-2">
            {PRIMARY_ITEMS.map((item) => renderNavLink(item))}
            <span aria-hidden className="mx-1 h-5 w-px bg-white/20" />
            {renderNavLink(BLOGS_ITEM)}
          </nav>
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href={isHome ? `#${CTA_TARGET}` : `/#${CTA_TARGET}`}
              onClick={(e) => handleSectionClick(e, CTA_TARGET)}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-emerald-400/25 bg-emerald-400/16 px-4 py-2 text-sm font-semibold text-white transition hover:border-emerald-300/50 hover:bg-emerald-400/24"
            >
              {t.nav.signIn}
            </Link>
          </div>

          {/* Mobile language switcher */}
          <div className="mr-2 lg:hidden">
            <LanguageSwitcher />
          </div>

          {/* Mobile toggle */}
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-slate-200 transition hover:bg-white/10 lg:hidden"
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
            "overflow-hidden px-3 transition-[max-height,opacity] duration-200 lg:hidden",
            open ? "max-h-96" : "max-h-0",
          ].join(" ")}
        >
          <div className="mb-3 space-y-1 rounded-3xl border border-white/10 bg-slate-950/96 p-2 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
            {NAV_ITEMS.map((item) => renderNavLink(item, true))}
            <Link
              href={isHome ? `#${CTA_TARGET}` : `/#${CTA_TARGET}`}
              onClick={(e) => handleSectionClick(e, CTA_TARGET)}
              className="mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/16 px-4 py-3 text-sm font-semibold text-white transition hover:border-emerald-300/50 hover:bg-emerald-400/24"
            >
              {t.nav.signIn}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
