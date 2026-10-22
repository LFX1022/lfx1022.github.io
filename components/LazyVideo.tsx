"use client";

import { useEffect, useRef, useState } from "react";
import type { StoryMedia } from "@/types";

/** 影片捲到視窗附近才掛載 src，避免一開頁就同時下載所有 story 的影片 */
export function LazyVideo({
  item,
  title,
  controls = false,
}: {
  item: StoryMedia;
  title: string;
  controls?: boolean;
}) {
  const { src, poster, fit } = item;
  const fitClass = fit === "contain" ? "object-contain" : "object-cover";
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 bg-ink-900">
      {inView ? (
        <video
          className={`h-full w-full ${fitClass}`}
          src={src}
          poster={poster}
          aria-label={title}
          controls={controls}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      ) : poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" aria-hidden className={`h-full w-full ${fitClass}`} loading="lazy" />
      ) : null}
    </div>
  );
}
