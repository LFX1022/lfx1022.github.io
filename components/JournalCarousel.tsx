"use client";

import { useEffect, useState } from "react";
import NextImage from "next/image";
import { Icon } from "@/components/Icon";

export interface JournalItem {
  src: string;
  caption: string;
  date?: string;
  /** 顯示比例，例如 "3 / 4"（照片）、"9 / 16"（直式影片） */
  aspect: string;
}

const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

/**
 * 生活手帖輪播：三張式 Cover Flow。
 * 中間翻到左後方、右側進中間；左右只留淡化預覽，避免背景雜亂。
 */
export function JournalCarousel({ items }: { items: JournalItem[] }) {
  const [index, setIndex] = useState(0);
  const count = items.length;
  const active = items[index];

  const go = (delta: number) => {
    setIndex((prev) => (prev + delta + count) % count);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    [-1, 0, 1].forEach((delta) => {
      const item = items[(index + delta + count) % count];
      if (!item || isVideo(item.src)) return;

      const image = new window.Image();
      image.decoding = "async";
      image.src = item.src;
    });
  }, [count, index, items]);

  if (!active) return null;

  return (
    <div>
      <div
        className="relative h-[62vh] max-h-[560px] min-h-[380px] w-full select-none overflow-hidden"
        style={{ perspective: "1400px" }}
      >
        {items.map((item, i) => {
          let offset = i - index;
          if (offset > count / 2) offset -= count;
          if (offset < -count / 2) offset += count;
          if (Math.abs(offset) > 1) return null;

          const isActive = offset === 0;
          const dir = offset < 0 ? -1 : 1;
          const sideShift = "clamp(220px, 28vw, 355px)";
          const sideX = dir < 0 ? `calc(-50% - ${sideShift})` : `calc(-50% + ${sideShift})`;
          const transform = isActive
            ? "translate3d(-50%, -50%, 90px) scale(1) rotateY(0deg)"
            : `translate3d(${sideX}, -50%, -170px) scale(0.78) rotateY(${-dir * 30}deg)`;

          return (
            <div
              key={`${item.src}-${i}`}
              onClick={() => !isActive && setIndex(i)}
              className={`absolute left-1/2 top-1/2 h-[92%] overflow-hidden rounded-lg border border-ink-600 bg-ink-950 shadow-2xl transition-[transform,opacity] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] [backface-visibility:hidden] [transform-style:preserve-3d] [will-change:transform,opacity] ${
                isActive ? "" : "cursor-pointer"
              }`}
              style={{
                aspectRatio: item.aspect,
                transform,
                opacity: isActive ? 1 : 0.34,
                zIndex: isActive ? 40 : 20,
              }}
              aria-hidden={!isActive}
            >
              {isVideo(item.src) ? (
                <video
                  className="absolute inset-0 h-full w-full object-contain"
                  src={item.src}
                  aria-label={item.caption}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
              ) : (
                <NextImage
                  src={item.src}
                  alt={item.caption}
                  fill
                  priority={isActive}
                  sizes="(min-width: 640px) 24rem, 90vw"
                  unoptimized
                  className="object-cover"
                  draggable={false}
                />
              )}
              {!isActive ? <div className="absolute inset-0 bg-ink-950/55" aria-hidden /> : null}
            </div>
          );
        })}

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="上一則"
              className="absolute left-2 top-1/2 z-50 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-ink-600 bg-ink-950/80 text-steel-100 backdrop-blur-sm transition hover:border-merlot-400 hover:text-merlot-200 sm:left-6"
            >
              <Icon name="ChevronLeft" className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="下一則"
              className="absolute right-2 top-1/2 z-50 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-ink-600 bg-ink-950/80 text-steel-100 backdrop-blur-sm transition hover:border-merlot-400 hover:text-merlot-200 sm:right-6"
            >
              <Icon name="ChevronRight" className="h-5 w-5" strokeWidth={2} />
            </button>
          </>
        ) : null}
      </div>

      <div className="mt-6 text-center">
        {active.date ? (
          <span className="font-mono text-xs tracking-wide text-merlot-300">{active.date}</span>
        ) : null}
        <p className="mt-1 text-sm leading-relaxed text-steel-300">{active.caption}</p>
      </div>

      {count > 1 ? (
        <div className="mt-4 flex items-center justify-center gap-2">
          {items.map((entry, dot) => (
            <button
              key={`${entry.src}-${dot}`}
              type="button"
              onClick={() => setIndex(dot)}
              aria-label={[entry.date, entry.caption].filter(Boolean).join("｜")}
              aria-current={dot === index}
              className={
                dot === index
                  ? "h-2 w-6 rounded-full bg-merlot-300 transition-all"
                  : "h-2 w-2 rounded-full bg-steel-100/30 transition-all hover:bg-steel-100/60"
              }
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
