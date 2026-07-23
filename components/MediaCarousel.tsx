"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import type { StoryMedia } from "@/types";

const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

/**
 * 大畫面 + 換頁輪播：一次顯示一段媒體，用左右箭頭或下方圓點切換。
 * 供 Selected Works 卡片在有多段媒體時使用（施工動畫、騎乘動態…）。
 */
export function MediaCarousel({ items, title }: { items: StoryMedia[]; title: string }) {
  const [index, setIndex] = useState(0);
  const count = items.length;
  const go = (delta: number) => setIndex((prev) => (prev + delta + count) % count);
  const item = items[index];

  return (
    <div className="group/carousel relative aspect-[16/10] overflow-hidden bg-ink-900">
      {isVideo(item.src) ? (
        <video
          key={item.src}
          className="h-full w-full object-cover"
          src={item.src}
          aria-label={`${title} — ${item.caption ?? index + 1}`}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <Image
          key={item.src}
          src={item.src}
          alt={`${title} — ${item.caption ?? index + 1}`}
          fill
          sizes="(min-width: 768px) 66vw, 100vw"
          unoptimized={/\.gif$/i.test(item.src)}
          className="object-cover"
        />
      )}

      {item.caption ? (
        <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/85 to-transparent px-4 pb-3 pt-8 font-mono text-xs leading-snug text-steel-100">
          {item.caption}
        </span>
      ) : null}

      {/* 左右換頁箭頭（只在多於一段時顯示） */}
      {count > 1 ? (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="上一段"
            className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-ink-950/60 text-steel-100 opacity-0 backdrop-blur-sm transition hover:bg-ink-950/80 focus-visible:opacity-100 group-hover/carousel:opacity-100"
          >
            <Icon name="ChevronLeft" className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="下一段"
            className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-ink-950/60 text-steel-100 opacity-0 backdrop-blur-sm transition hover:bg-ink-950/80 focus-visible:opacity-100 group-hover/carousel:opacity-100"
          >
            <Icon name="ChevronRight" className="h-5 w-5" strokeWidth={2} />
          </button>

          {/* 下方頁碼圓點 */}
          <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
            {items.map((mediaItem, dot) => (
              <button
                key={mediaItem.src}
                type="button"
                onClick={() => setIndex(dot)}
                aria-label={`第 ${dot + 1} 段`}
                aria-current={dot === index}
                className={
                  dot === index
                    ? "h-2 w-5 rounded-full bg-merlot-300 transition-all"
                    : "h-2 w-2 rounded-full bg-steel-100/40 transition-all hover:bg-steel-100/70"
                }
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
