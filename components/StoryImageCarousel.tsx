"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { StoryGallery } from "@/types";

export function StoryImageCarousel({ gallery }: { gallery: StoryGallery }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slides = gallery.slides;
  const count = slides.length;
  const intervalMs = gallery.autoPlayMs ?? 3600;

  const canNavigate = count > 1;
  const activeSlide = slides[index];
  const label = useMemo(
    () => `${gallery.title}，第 ${index + 1} 張，共 ${count} 張`,
    [count, gallery.title, index],
  );

  useEffect(() => {
    if (!canNavigate || isPaused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [canNavigate, count, intervalMs, isPaused]);

  const goTo = (nextIndex: number) => {
    if (!canNavigate) return;
    setIndex((nextIndex + count) % count);
  };

  if (count === 0) return null;

  return (
    <section
      className="border-t border-ink-700 bg-ink-950"
      aria-roledescription="carousel"
      aria-label={gallery.title}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-between gap-4 border-b border-ink-700 px-4 py-3">
        <h4 className="font-mono text-xs uppercase tracking-label text-steel-200">
          {gallery.title}
        </h4>
        <span className="font-mono text-[10px] tracking-wide text-steel-500">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
      </div>

      <div className="relative aspect-video overflow-hidden bg-ink-900" aria-live="polite" aria-label={label}>
        <div
          className="flex h-full transition-transform duration-700 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.src} className="relative h-full min-w-full overflow-hidden">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(min-width: 768px) 66vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {activeSlide.caption ? (
          <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/85 to-transparent px-4 pb-3 pt-8 font-mono text-xs leading-snug text-steel-100">
            {activeSlide.caption}
          </span>
        ) : null}

        {canNavigate ? (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="上一張隔音牆模擬照片"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-sm border border-white/20 bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-merlot-400"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="下一張隔音牆模擬照片"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-sm border border-white/20 bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-merlot-400"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>

      {canNavigate ? (
        <div className="flex items-center justify-center gap-2 px-4 py-3">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(slideIndex)}
              aria-label={`切換到第 ${slideIndex + 1} 張隔音牆模擬照片`}
              aria-current={slideIndex === index}
              className={`h-1.5 rounded-full transition-all ${
                slideIndex === index ? "w-7 bg-merlot-500" : "w-1.5 bg-steel-400/45 hover:bg-steel-200"
              }`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}