"use client";

import React, { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { LOCALES, type Locale } from "@/lib/i18n/dictionaries";

const LOCALE_SHORT: Record<Locale, string> = {
  en: "EN",
  th: "TH",
  zh: "ZH",
  ja: "JA",
};

export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className="min-h-11 rounded-full border border-white/15 bg-slate-950/70 px-3.5 py-2 text-sm font-semibold tracking-wide text-white transition hover:border-emerald-400/50 hover:bg-white/12"
      >
        {LOCALE_SHORT[locale]}
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-20 overflow-hidden rounded-2xl border border-white/15 bg-slate-950/95 shadow-lg"
        >
          {LOCALES.map((l: Locale) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <button
                type="button"
                onClick={() => {
                  setLocale(l);
                  setOpen(false);
                }}
                className={[
                  "block min-h-11 w-full px-4 py-2 text-left text-sm font-semibold tracking-wide transition",
                  l === locale
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                {LOCALE_SHORT[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
