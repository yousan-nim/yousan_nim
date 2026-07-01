"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Props = {
  defaultSrc: string;
  aboutSrc?: string; // optional alternative src when #about is visible
  className?: string;
};

/**
 * BackgroundVideo
 * - Increases darkness as user scrolls down
 * - No color changes, just progressive darkening overlay
 */
export default function BackgroundVideo({ defaultSrc, aboutSrc, className }: Props) {
  const pathname = usePathname();
  const [aboutVisible, setAboutVisible] = useState(false);
  const [scrollDarkness, setScrollDarkness] = useState(0);
  const [shouldRenderVideo, setShouldRenderVideo] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setShouldRenderVideo(false);
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactViewport = window.matchMedia("(max-width: 1023px)");

    const sync = () => {
      setShouldRenderVideo(
        !reducedMotion.matches && !compactViewport.matches && pathname === "/"
      );
    };

    sync();
    reducedMotion.addEventListener("change", sync);
    compactViewport.addEventListener("change", sync);

    return () => {
      reducedMotion.removeEventListener("change", sync);
      compactViewport.removeEventListener("change", sync);
    };
  }, [pathname]);

  useEffect(() => {
    if (!shouldRenderVideo) return;
    const target = document.getElementById("about");
    if (!target) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setAboutVisible(entry.isIntersecting);
      },
      {
        root: null,
        // Trigger when section is around the middle of the viewport
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    io.observe(target);
    return () => io.disconnect();
  }, [shouldRenderVideo]);

  // Decide which src to play
  const src = useMemo(() => {
    if (aboutVisible && aboutSrc && aboutSrc !== defaultSrc) return aboutSrc;
    return defaultSrc;
  }, [aboutVisible, aboutSrc, defaultSrc]);

  // Ref for scroll-linked pan effect
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Scroll horizontally pans the video from left to right via object-position
  // Also updates darkness based on scroll progress
  useEffect(() => {
    if (!shouldRenderVideo) return;
    const el = videoRef.current;
    if (!el) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const doc = document.documentElement;
        const scrollMax = Math.max(1, doc.scrollHeight - window.innerHeight);
        const y = window.scrollY;
        const progress = Math.min(1, Math.max(0, y / scrollMax));
        // Move from ~10% (left) to ~90% (right)
        const pos = 0 + progress * 90;
        el.style.objectPosition = `${pos}% center`;

        // Update darkness: 0 at top, 0.6 at bottom (60% black overlay)
        setScrollDarkness(progress * 0.3);

        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldRenderVideo, src]);

  // Dispatch a "bg-ready" event when the video can play through
  useEffect(() => {
    if (!shouldRenderVideo) return;
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => {
      window.dispatchEvent(new Event("bg-ready"));
    };

    video.addEventListener("canplaythrough", onReady, { once: true });
    return () => video.removeEventListener("canplaythrough", onReady);
  }, [shouldRenderVideo, src]);

  if (!shouldRenderVideo) {
    return (
      <div className="fixed inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.14),transparent_28%),radial-gradient(circle_at_82%_10%,rgba(56,189,248,0.12),transparent_22%),linear-gradient(180deg,#08111f_0%,#020617_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.12),rgba(2,6,23,0.74))]" />
      </div>
    );
  }

  return (
    <div className={"fixed inset-0 -z-10"} aria-hidden>
      <video
        ref={videoRef}
        key={src} // forces reload when src changes
        autoPlay
        loop
        muted
        playsInline
        className={
          className ||
          "h-full w-full object-cover opacity-48 will-change-[object-position]"
        }
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Progressive darkness overlay based on scroll */}
      <div
        className="absolute inset-0 pointer-events-none bg-black transition-opacity duration-300"
        style={{ opacity: scrollDarkness }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.16),rgba(2,6,23,0.72))]" />
    </div>
  );
}
