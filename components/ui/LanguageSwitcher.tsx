"use client";

import React, { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n/dictionaries";

export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className="flex items-center gap-1.5 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20 transition"
      >
        <span aria-hidden>🌐</span>
        <span>{LOCALE_LABELS[locale]}</span>
        <svg
          viewBox="0 0 20 20"
          className={`h-3.5 w-3.5 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="currentColor"
        >
          <path d="M5 7l5 6 5-6z" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-40 overflow-hidden rounded-md border border-white/15 bg-[#0f1115] shadow-lg z-50"
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
                  "block w-full px-4 py-2.5 text-left text-sm transition",
                  l === locale
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                {LOCALE_LABELS[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
