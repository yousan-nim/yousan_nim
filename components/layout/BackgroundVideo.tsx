"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

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
  const [aboutVisible, setAboutVisible] = useState(false);
  const [scrollDarkness, setScrollDarkness] = useState(0);

  useEffect(() => {
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
  }, []);

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
  }, [src]);

  // Dispatch a "bg-ready" event when the video can play through
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => {
      window.dispatchEvent(new Event("bg-ready"));
    };

    video.addEventListener("canplaythrough", onReady, { once: true });
    return () => video.removeEventListener("canplaythrough", onReady);
  }, [src]);

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
          "w-full h-full object-cover opacity-70 will-change-[object-position]"
        }
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Progressive darkness overlay based on scroll */}
      <div
        className="absolute inset-0 pointer-events-none bg-black transition-opacity duration-300"
        style={{ opacity: scrollDarkness }}
      />
    </div>
  );
}
