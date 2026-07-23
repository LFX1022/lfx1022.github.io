"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/Icon";

export interface JournalItem {
  src: string;
  caption: string;
  date: string;
  /** 顯示比例，例如 "3 / 4"（照片）、"9 / 16"（直式影片） */
  aspect: string;
}

const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

/**
 * Merlot の生活手帖 — Cover Flow 換頁瀏覽：
 * 中間一則聚焦，左右露出相鄰兩則並失焦（模糊 + 變暗 + 旋轉），
 * 換頁時有旋轉滑動動畫。點左右卡片或箭頭 / 圓點皆可切換。
 */
export function JournalCarousel({ items }: { items: JournalItem[] }) {
  const [index, setIndex] = useState(0);
  const count = items.length;
  const go = (delta: number) => setIndex((prev) => (prev + delta + count) % count);
  const active = items[index];

  // 依與中心的距離計算每張卡片的位移 / 縮放 / 旋轉 / 模糊
  const slideStyle = (offset: number, aspect: string): React.CSSProperties => {
    const base = "translate(-50%, -50%)";
    const abs = Math.abs(offset);
    if (offset === 0) {
      return {
        aspectRatio: aspect,
        transform: `${base} scale(1)`,
        opacity: 1,
        filter: "none",
        zIndex: 30,
      };
    }
    if (abs === 1) {
      const dir = offset < 0 ? -1 : 1;
      return {
        aspectRatio: aspect,
        transform: `${base} translateX(${dir * 300}px) scale(0.8) rotateY(${-dir * 26}deg)`,
        opacity: 0.45,
        filter: "blur(3px) brightness(0.7)",
        zIndex: 20,
      };
    }
    // 更遠的卡片：藏起來
    const dir = offset < 0 ? -1 : 1;
    return {
      aspectRatio: aspect,
      transform: `${base} translateX(${dir * 520}px) scale(0.6) rotateY(${-dir * 30}deg)`,
      opacity: 0,
      filter: "blur(6px)",
      zIndex: 10,
      pointerEvents: "none",
    };
  };

  return (
    <div>
      <div
        className="relative h-[62vh] max-h-[560px] min-h-[380px] w-full select-none"
        style={{ perspective: "1400px" }}
      >
        {items.map((item, i) => {
          // 循環位移：讓兩端也能露出相鄰的卡片
          let offset = i - index;
          if (offset > count / 2) offset -= count;
          if (offset < -count / 2) offset += count;
          const isActive = offset === 0;
          return (
            <div
              key={item.src}
              onClick={() => !isActive && setIndex(i)}
              className={`absolute left-1/2 top-1/2 h-[92%] overflow-hidden rounded-lg border border-ink-600 bg-ink-950 shadow-2xl transition-[transform,opacity,filter] duration-500 ease-out ${
                isActive ? "" : "cursor-pointer"
              }`}
              style={slideStyle(offset, item.aspect)}
              aria-hidden={!isActive}
            >
              {isVideo(item.src) ? (
                <video
                  key={`${item.src}-${isActive}`}
                  className="absolute inset-0 h-full w-full object-contain"
                  src={item.src}
                  aria-label={item.caption}
                  autoPlay={isActive}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  sizes="(min-width: 640px) 24rem, 90vw"
                  className="object-cover"
                />
              )}
            </div>
          );
        })}

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="上一則"
              className="absolute left-2 top-1/2 z-40 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-ink-600 bg-ink-950/80 text-steel-100 backdrop-blur-sm transition hover:border-merlot-400 hover:text-merlot-200 sm:left-6"
            >
              <Icon name="ChevronLeft" className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="下一則"
              className="absolute right-2 top-1/2 z-40 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-ink-600 bg-ink-950/80 text-steel-100 backdrop-blur-sm transition hover:border-merlot-400 hover:text-merlot-200 sm:right-6"
            >
              <Icon name="ChevronRight" className="h-5 w-5" strokeWidth={2} />
            </button>
          </>
        ) : null}
      </div>

      {/* 目前這則的日期 + 說明 */}
      <div className="mt-6 text-center">
        <span className="font-mono text-xs tracking-wide text-merlot-300">{active.date}</span>
        <p className="mt-1 text-sm leading-relaxed text-steel-300">{active.caption}</p>
      </div>

      {count > 1 ? (
        <div className="mt-4 flex items-center justify-center gap-2">
          {items.map((entry, dot) => (
            <button
              key={entry.src}
              type="button"
              onClick={() => setIndex(dot)}
              aria-label={`${entry.date}｜${entry.caption}`}
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
