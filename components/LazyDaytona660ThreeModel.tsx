"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Daytona660ThreeModel = dynamic(
  () =>
    import("@/components/Daytona660ThreeModel").then(
      (module) => module.Daytona660ThreeModel,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="blueprint-grid flex aspect-[4/3] w-full items-center justify-center border border-[#d8b879]/30 bg-[#0b0c0e] font-mono text-[10px] uppercase tracking-label text-steel-500 sm:aspect-video">
        Loading 3D Model
      </div>
    ),
  },
);

export function LazyDaytona660ThreeModel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || shouldLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "700px" },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={rootRef}>
      {shouldLoad ? (
        <Daytona660ThreeModel />
      ) : (
        <div className="blueprint-grid flex aspect-[4/3] w-full items-center justify-center border border-[#d8b879]/30 bg-[#0b0c0e] font-mono text-[10px] uppercase tracking-label text-steel-500 sm:aspect-video">
          3D Model Standby
        </div>
      )}
    </div>
  );
}