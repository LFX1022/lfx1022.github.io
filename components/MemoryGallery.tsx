"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { InterestMemoryImage } from "@/types";

export function MemoryGallery({ slides }: { slides: InterestMemoryImage[] }) {
  const [index, setIndex] = useState(0);
  const count = slides.length;
  const active = slides[index];

  const go = (delta: number) => {
    setIndex((current) => (current + delta + count) % count);
  };

  return (
    <figure className="relative overflow-hidden border border-steel-500/30 bg-ink-900 shadow-[0_26px_70px_rgba(0,0,0,0.28)]">
      <div
        className="relative w-full"
        style={{ aspectRatio: `${active.width} / ${active.height}` }}
      >
        {slides.map((slide, slideIndex) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="(min-width: 1024px) 58rem, calc(100vw - 48px)"
            className={`object-cover saturate-[0.94] transition-opacity duration-500 ${
              slideIndex === index ? "opacity-100" : "opacity-0"
            }`}
            priority={false}
          />
        ))}
      </div>

      <figcaption className="sr-only">{active.alt}</figcaption>

      {count > 1 ? (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="上一張生活照片"
            className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="下一張生活照片"
            className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setIndex(slideIndex)}
                aria-label={`顯示第 ${slideIndex + 1} 張生活照片`}
                aria-current={slideIndex === index}
                className={`h-1.5 rounded-full transition-all ${
                  slideIndex === index
                    ? "w-6 bg-merlot-500"
                    : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </figure>
  );
}
