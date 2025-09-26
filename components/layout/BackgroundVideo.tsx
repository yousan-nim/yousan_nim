"use client";

import React, { useEffect, useMemo, useState } from "react";

type Props = {
  defaultSrc: string;
  aboutSrc?: string; // optional alternative src when #about is visible
  className?: string;
};

/**
 * BackgroundVideo
 * - Watches the visibility of the #about section
 * - When visible, it either switches to aboutSrc (if provided) or applies a color overlay effect
 */
export default function BackgroundVideo({ defaultSrc, aboutSrc, className }: Props) {
  const [aboutVisible, setAboutVisible] = useState(false);

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

  return (
    <div className={"fixed inset-0 -z-10"} aria-hidden>
      <video
        key={src} // forces reload when src changes
        autoPlay
        loop
        muted
        playsInline
        className={
          className ||
          "w-full h-full object-cover object-left opacity-90 transition-[filter] duration-500"
        }
        // Subtle filter shift when About is visible (if src doesn't change)
        style={{
          filter: aboutVisible && (!aboutSrc || aboutSrc === defaultSrc) ? "hue-rotate(15deg) brightness(0.95)" : "none",
        }}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Color overlay for extra contrast when About is visible (only when src not swapped) */}
      {aboutVisible && (!aboutSrc || aboutSrc === defaultSrc) && (
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-fuchsia-500/10 via-transparent to-transparent" />
      )}
    </div>
  );
}
