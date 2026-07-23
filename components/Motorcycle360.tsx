"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

export interface Motorcycle360Frame {
  src: string;
}

interface Motorcycle360Props {
  frames: Motorcycle360Frame[];
  alt: string;
  backgroundImage?: string;
}

export function Motorcycle360({
  frames,
  alt,
  backgroundImage,
}: Motorcycle360Props) {
  const [frame, setFrame] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [inView, setInView] = useState(false);
  const lastX = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const decodedFrames = useRef(new Set<string>());
  const decodingFrames = useRef(new Set<string>());
  const frameCount = frames.length;
  const ready = loaded >= frameCount;

  // 捲到附近才開始預載整組 360 幀，避免一進頁面就下載十幾 MB
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const markFrameDecoded = (src: string) => {
    if (decodedFrames.current.has(src)) return;
    decodedFrames.current.add(src);
    setLoaded(decodedFrames.current.size);
  };

  const prepareFrame = (image: HTMLImageElement | null, src: string) => {
    if (
      !image ||
      !image.complete ||
      image.naturalWidth === 0 ||
      decodedFrames.current.has(src) ||
      decodingFrames.current.has(src)
    ) {
      return;
    }

    decodingFrames.current.add(src);
    const finish = () => {
      decodingFrames.current.delete(src);
      markFrameDecoded(src);
    };

    if (typeof image.decode !== "function") {
      finish();
      return;
    }

    void image.decode().catch(() => undefined).then(finish);
  };

  const rotate = (steps: number) => {
    if (!ready) return;
    setFrame((current) => (current + steps + frameCount) % frameCount);
  };

  const progress = frameCount > 1 ? (frame / (frameCount - 1)) * 100 : 0;

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!ready) return;
    lastX.current = event.clientX;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || lastX.current === null) return;
    const distance = event.clientX - lastX.current;
    const steps = Math.trunc(distance / 12);
    if (steps === 0) return;
    rotate(-steps);
    lastX.current += steps * 12;
  };

  const endDrag = () => {
    lastX.current = null;
    setDragging(false);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      rotate(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      rotate(1);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`relative isolate bg-transparent outline-none ring-1 ring-[#d8b879]/30 shadow-[0_0_16px_rgba(216,184,121,0.20),0_0_42px_rgba(196,154,87,0.10)] transition-shadow focus-visible:ring-merlot-300/70 ${
        !ready ? "cursor-default" : dragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      role="region"
      aria-label={`${alt} 360 度旋轉展示`}
      aria-busy={!ready}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
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

      <div
        className="relative aspect-[16/11] overflow-hidden bg-[#e4e4e4]"
        style={
          backgroundImage
            ? {
                backgroundImage: `url("${backgroundImage}")`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }
            : undefined
        }
      >
        {(inView ? frames : frames.slice(0, 1)).map(({ src }, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt={index === frame ? `${alt}，角度 ${frame + 1}／${frameCount}` : ""}
            aria-hidden={index !== frame}
            draggable={false}
            loading="eager"
            decoding="async"
            ref={(image) => prepareFrame(image, src)}
            onLoad={(event) => prepareFrame(event.currentTarget, src)}
            className={`absolute inset-0 h-full w-full select-none object-contain ${
              index === frame ? "opacity-100" : "opacity-0"
            }`}
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse 98% 96% at 50% 48%, #000 62%, rgba(0, 0, 0, 0.96) 78%, transparent 100%)",
              maskImage:
                "radial-gradient(ellipse 98% 96% at 50% 48%, #000 62%, rgba(0, 0, 0, 0.96) 78%, transparent 100%)",
            }}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/35 to-transparent px-4 pb-10 pt-3 font-mono text-[10px] uppercase tracking-label text-white/85">
        <span>Drag to rotate</span>
        <span>{loaded < frameCount ? `Loading ${loaded}/${frameCount}` : "360° Ready"}</span>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-3 flex flex-col items-center gap-2">
        <div className="flex items-center justify-center gap-3">
          <ChevronsLeft
            size={19}
            strokeWidth={1.5}
            className="text-black/45 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]"
          />
          <span className="min-w-20 rounded-full border border-white/25 bg-black/45 px-3 py-2 text-center font-mono text-[10px] tracking-label text-white/90 backdrop-blur-sm">
            {String(frame + 1).padStart(2, "0")} / {frameCount}
          </span>
          <ChevronsRight
            size={19}
            strokeWidth={1.5}
            className="text-black/45 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]"
          />
        </div>
        <div
          className="relative h-px w-40 overflow-hidden rounded-full bg-black/15"
          aria-hidden
        >
          <span
            className="absolute inset-y-0 left-0 bg-merlot-500 shadow-[0_0_8px_rgba(216,184,121,0.75)] transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
