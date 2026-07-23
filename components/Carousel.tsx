"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface Slide {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * 全寬、無邊框的大圖左右滑動相簿（底片式）。
 * - 固定高度，每張照片保留原比例、寬度自動（不裁切）。
 * - 照片一張接一張填滿畫面，不留中間空白；旁邊會露出上一張/下一張。
 * - 支援左右箭頭、底部頁點、觸控滑動、滑鼠拖曳。
 */
export function Carousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [tick, setTick] = useState(0); // 圖片載入後觸發重新計算位移

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const startX = useRef<number | null>(null);
  const n = slides.length;

  const go = (d: number) => setIndex((p) => Math.min(Math.max(p + d, 0), n - 1));

  // 計算位移：讓目前照片置中，但夾在頭尾之間，確保左右不留空白（底片填滿）
  useLayoutEffect(() => {
    const compute = () => {
      const c = containerRef.current;
      const t = trackRef.current;
      const it = itemRefs.current[index];
      if (!c || !t || !it) return;
      const desired = c.clientWidth / 2 - (it.offsetLeft + it.offsetWidth / 2);
      const minOff = Math.min(0, c.clientWidth - t.scrollWidth);
      setOffset(Math.max(minOff, Math.min(0, desired)));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [index, n, tick]);

  const onStart = (x: number) => {
    startX.current = x;
  };
  const onEnd = (x: number) => {
    if (startX.current === null) return;
    const dx = x - startX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    startX.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none overflow-hidden bg-ink-900"
      onTouchStart={(e) => onStart(e.touches[0].clientX)}
      onTouchEnd={(e) => onEnd(e.changedTouches[0].clientX)}
      onMouseDown={(e) => onStart(e.clientX)}
      onMouseUp={(e) => onEnd(e.clientX)}
      role="region"
      aria-roledescription="carousel"
      aria-label="重機相簿"
    >
      {/* 底片軌道：固定高度、照片一張接一張 */}
      <div
        ref={trackRef}
        className="flex h-[68vh] max-h-[780px] min-h-[420px] items-center transition-transform duration-500 ease-out sm:h-[74vh]"
        style={{ transform: `translateX(${offset}px)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="relative h-full shrink-0"
            style={{ aspectRatio: `${slide.width} / ${slide.height}` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.src}
              alt={slide.alt}
              width={slide.width}
              height={slide.height}
              draggable={false}
              loading="lazy"
              decoding="async"
              onLoad={() => setTick((t) => t + 1)}
              onError={(event) => {
                const image = event.currentTarget;
                if (image.dataset.retried === "true") return;
                image.dataset.retried = "true";
                image.src = `${slide.src}?retry=${Date.now()}`;
              }}
              className={`h-full w-full object-contain transition-opacity duration-500 ${
                i === index ? "opacity-100" : "opacity-40"
              }`}
            />
          </div>
        ))}
      </div>

      {/* 底部漸層，讓頁點清楚 */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent"
        aria-hidden
      />

      {/* 左右箭頭 */}
      <button
        type="button"
        onClick={() => go(-1)}
        disabled={index === 0}
        aria-label="上一張"
        className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 disabled:cursor-default disabled:opacity-30"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        disabled={index === n - 1}
        aria-label="下一張"
        className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 disabled:cursor-default disabled:opacity-30"
      >
        <ChevronRight size={20} />
      </button>

      {/* 頁點 */}
      <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`第 ${i + 1} 張`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-merlot-500" : "w-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
