"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DreamGarageSlide {
  src: string;
  alt: string;
  width: number;
  height: number;
  fit?: "cover" | "contain";
  type?: "spin" | "detail";
}

export function DreamGarageGallery({
  slides,
  initialIndex = 0,
}: {
  slides: DreamGarageSlide[];
  initialIndex?: number;
}) {
  const [index, setIndex] = useState(() =>
    Math.min(Math.max(initialIndex, 0), slides.length - 1)
  );
  const startX = useRef<number | null>(null);

  const go = (step: number) => {
    setIndex((current) => Math.min(Math.max(current + step, 0), slides.length - 1));
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button")) return;
    startX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const distance = event.clientX - startX.current;
    if (Math.abs(distance) > 40) go(distance < 0 ? 1 : -1);
    startX.current = null;
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    }
  };

  return (
    <div
      className="relative isolate select-none bg-black outline-none ring-1 ring-[#d8b879]/30 shadow-[0_0_16px_rgba(216,184,121,0.20),0_0_42px_rgba(196,154,87,0.10)] focus-visible:ring-merlot-300/70"
      role="region"
      aria-roledescription="carousel"
      aria-label="Ducati Panigale V2 夢想車庫相簿"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        startX.current = null;
      }}
      style={{ touchAction: "pan-y" }}
    >
      <span
        className="pointer-events-none absolute -inset-x-8 -inset-y-5 -z-10 opacity-80 blur-xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(216, 184, 121, 0.18) 0%, rgba(196, 154, 87, 0.08) 48%, transparent 74%)",
        }}
        aria-hidden
      />
      <span
        className="pointer-events-none absolute -inset-x-5 -top-px z-20 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(196, 154, 87, 0.28) 14%, rgba(226, 198, 139, 0.92) 50%, rgba(196, 154, 87, 0.28) 86%, transparent 100%)",
          boxShadow: "0 0 14px 1px rgba(216, 184, 121, 0.38)",
        }}
        aria-hidden
      />
      <span
        className="pointer-events-none absolute -inset-x-3 -bottom-px z-20 h-px opacity-65"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(196, 154, 87, 0.18) 16%, rgba(216, 184, 121, 0.72) 50%, rgba(196, 154, 87, 0.18) 84%, transparent 100%)",
          boxShadow: "0 0 12px rgba(216, 184, 121, 0.26)",
        }}
        aria-hidden
      />

      <div className="relative aspect-[16/11] overflow-hidden bg-coal-900">
        {slides.map((slide, slideIndex) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            width={slide.width}
            height={slide.height}
            draggable={false}
            className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
              slide.fit === "contain" ? "object-contain" : "object-cover"
            } ${
              slideIndex === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          />
        ))}

        <div
          className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent px-4 pb-12 pt-3 font-mono text-[10px] uppercase tracking-label text-white/85"
          aria-hidden
        >
          <span>{slides[index].type === "spin" ? "7 Angle View" : "Detail View"}</span>
          <span>
            {slides[index].type === "spin"
              ? `Angle ${String(index + 1).padStart(2, "0")} / 07`
              : `Detail ${String(index - 6).padStart(2, "0")} / 02`}
          </span>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/65 to-transparent"
          aria-hidden
        />

        <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              go(-1);
            }}
            disabled={index === 0}
            aria-label="上一張 Panigale V2 照片"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65 disabled:cursor-default disabled:opacity-30"
          >
            <ChevronLeft size={17} />
          </button>

          <div className="flex min-w-20 items-center justify-center gap-1.5 rounded-full border border-white/25 bg-black/45 px-3 py-2 backdrop-blur-sm">
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.src}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setIndex(slideIndex);
                }}
                aria-label={`顯示第 ${slideIndex + 1} 張 Panigale V2 照片`}
                aria-current={slideIndex === index}
                className={`h-1.5 rounded-full transition-all ${
                  slideIndex === index
                    ? "w-5 bg-merlot-500"
                    : "w-1.5 bg-white/55 hover:bg-white/85"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              go(1);
            }}
            disabled={index === slides.length - 1}
            aria-label="下一張 Panigale V2 照片"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65 disabled:cursor-default disabled:opacity-30"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
