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
        className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold tracking-wide text-white hover:bg-white/20 transition"
      >
        {LOCALE_SHORT[locale]}
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-20 overflow-hidden rounded-md border border-white/15 bg-[#0f1115] shadow-lg z-50"
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
                  "block w-full px-4 py-2 text-left text-sm font-semibold tracking-wide transition",
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
