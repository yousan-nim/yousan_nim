"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Props = {
  defaultSrc: string;
  aboutSrc?: string; // optional alternative src when #about is visible
  className?: string;
};

/**
 * Static "space nebula" gradient used as a fallback when the heavy background
 * video should not load (mobile, reduced-motion, or Save-Data). Keeps the
 * cosmic-glass mood without shipping a 25MB asset to phones.
 */
function NebulaFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(120% 80% at 15% 10%, rgba(168,85,247,0.22), transparent 55%)," +
          "radial-gradient(120% 90% at 85% 20%, rgba(34,211,238,0.18), transparent 55%)," +
          "radial-gradient(140% 120% at 50% 110%, rgba(99,102,241,0.20), transparent 60%)," +
          "#0b0b12",
      }}
    />
  );
}

/**
 * BackgroundVideo
 * - Loads the video only on capable devices (desktop, motion allowed, no Save-Data)
 * - Falls back to a lightweight CSS nebula otherwise
 * - Darkens progressively as the user scrolls
 */
export default function BackgroundVideo({ defaultSrc, aboutSrc, className }: Props) {
  const pathname = usePathname();
  // Reading-focused pages (blogs) supply their own calm background — no video.
  const disabled = pathname?.startsWith("/blogs") ?? false;
  const [aboutVisible, setAboutVisible] = useState(false);
  const [scrollDarkness, setScrollDarkness] = useState(0);
  // null = undecided (SSR / first paint), true/false after capability check
  const [useVideo, setUseVideo] = useState<boolean | null>(null);

  // Decide whether to load the heavy video (client-only capability check).
  // Show it everywhere — including mobile — and only opt OUT on genuine user
  // signals: reduced-motion, Data Saver, or a very slow (2g) connection.
  useEffect(() => {
    if (disabled) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // @ts-expect-error - Network Information API is not in TS lib
    const conn = navigator.connection;
    const saveData = Boolean(conn?.saveData);
    const slowNetwork = conn?.effectiveType
      ? /^(slow-2g|2g)$/.test(conn.effectiveType)
      : false;

    setUseVideo(!prefersReduced && !saveData && !slowNetwork);
  }, [disabled]);

  useEffect(() => {
    if (disabled) return;
    const target = document.getElementById("about");
    if (!target) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setAboutVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    io.observe(target);
    return () => io.disconnect();
  }, [disabled]);

  // Decide which src to play
  const src = useMemo(() => {
    if (aboutVisible && aboutSrc && aboutSrc !== defaultSrc) return aboutSrc;
    return defaultSrc;
  }, [aboutVisible, aboutSrc, defaultSrc]);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Scroll → pan the video + progressive darkness
  useEffect(() => {
    if (disabled) return;
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const doc = document.documentElement;
        const scrollMax = Math.max(1, doc.scrollHeight - window.innerHeight);
        const y = window.scrollY;
        const progress = Math.min(1, Math.max(0, y / scrollMax));

        const el = videoRef.current;
        if (el) el.style.objectPosition = `${progress * 90}% center`;

        setScrollDarkness(progress * 0.3);
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [src, useVideo, disabled]);

  // Signal readiness so the Preloader can hide even without a video
  useEffect(() => {
    if (useVideo === false) {
      window.dispatchEvent(new Event("bg-ready"));
      return;
    }
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => window.dispatchEvent(new Event("bg-ready"));
    video.addEventListener("canplaythrough", onReady, { once: true });
    return () => video.removeEventListener("canplaythrough", onReady);
  }, [src, useVideo, disabled]);

  if (disabled) return null;

  return (
    <div className={"fixed inset-0 -z-10"} aria-hidden>
      {/* Nebula is always the base layer: instant paint while the video streams,
          and the graceful fallback when the video is skipped. */}
      <NebulaFallback />

      {useVideo && (
        <video
          ref={videoRef}
          key={src}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={
            className ||
            "absolute inset-0 w-full h-full object-cover opacity-70 will-change-[object-position]"
          }
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Progressive darkness overlay based on scroll */}
      <div
        className="absolute inset-0 pointer-events-none bg-black transition-opacity duration-300"
        style={{ opacity: scrollDarkness }}
      />
    </div>
  );
}
