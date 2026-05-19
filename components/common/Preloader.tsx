"use client";

import React, { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";

export default function Preloader() {
  const { t } = useI18n();
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Already loaded
    if (document.readyState === "complete") {
      setShow(false);
      return;
    }
    // Wait for page fully loaded
    const onLoad = () => setShow(false);

    window.addEventListener("load", onLoad);
    // Safety timeout in case load stalls
    const t = setTimeout(() => setShow(false), 6000);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(t);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] grid place-items-center bg-black transition-opacity duration-500">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-white" />
        <p className="text-white/80 text-sm">{t.preloader.loading}</p>
      </div>
    </div>
  );
}