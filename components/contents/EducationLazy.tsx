"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";

const DynamicEducation = dynamic(() => import("./Education"), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse">
      <div className="h-8 w-40 bg-white/10 rounded mb-6 mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4 md:gap-6 max-w-screen-2xl mx-auto">
        <div className="md:col-span-6 md:col-start-8 md:row-start-1 h-28 rounded-xl bg-white/5" />
        <div className="md:col-span-6 md:col-start-6 md:row-start-2 h-28 rounded-xl bg-white/5" />
        <div className="md:col-span-3 md:col-start-4 md:row-start-3 h-24 rounded-xl bg-white/5" />
        <div className="md:col-span-3 md:col-start-1 md:row-start-1 h-20 rounded-xl bg-white/5" />
        <div className="md:col-span-2 md:col-start-4 md:row-start-1 h-20 rounded-xl bg-white/5" />
        <div className="md:col-span-1 md:col-start-6 md:row-start-1 h-20 rounded-xl bg-white/5" />
        <div className="md:col-span-1 md:col-start-7 md:row-start-1 h-20 rounded-xl bg-white/5" />
      </div>
    </div>
  ),
});

const EducationLazy: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>{isVisible ? <DynamicEducation /> : null}</div>;
};

export default EducationLazy;
