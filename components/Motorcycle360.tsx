"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type React from "react";
import {
  ChevronsLeft,
  ChevronsRight,
  MousePointer2,
  MoveHorizontal,
} from "lucide-react";

export interface Motorcycle360Frame {
  src: string;
}

interface Motorcycle360Props {
  frames: Motorcycle360Frame[];
  alt: string;
  backgroundImage?: string;
  crop?: boolean;
  cleanFrameArtifacts?: boolean;
  imageScale?: number;
  imageOffsetY?: string;
  focusCrop?: boolean;
}

export function Motorcycle360({
  frames,
  alt,
  backgroundImage,
  crop = false,
  cleanFrameArtifacts = false,
  imageScale = crop ? 1.13 : 1,
  imageOffsetY = crop ? "-2%" : "0%",
  focusCrop = false,
}: Motorcycle360Props) {
  const [frame, setFrame] = useState(0);
  const [displayFrame, setDisplayFrame] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [inView, setInView] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [demoing, setDemoing] = useState(false);
  const lastX = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const demoStarted = useRef(false);
  const decodedFrames = useRef(new Set<string>());
  const decodingFrames = useRef(new Set<string>());
  const frameCount = frames.length;
  const currentFrame = frames[frame];
  const allFramesReady = loaded >= frameCount;
  const ready = loaded > 0;
  const demoReady = loaded >= Math.min(8, frameCount);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
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

  useEffect(() => {
    if (!inView || frameCount === 0) return;

    let cancelled = false;
    let nextIndex = 0;
    let activeLoads = 0;
    const timers = new Set<number>();
    const maxConcurrentLoads = 2;

    const scheduleLoad = (delay = 80) => {
      if (cancelled) return;
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        loadNextFrames();
      }, delay);
      timers.add(timer);
    };

    const finishLoad = (src: string) => {
      activeLoads = Math.max(0, activeLoads - 1);
      decodingFrames.current.delete(src);
      if (!cancelled) markFrameDecoded(src);
      scheduleLoad();
    };

    function loadNextFrames() {
      if (cancelled) return;

      while (activeLoads < maxConcurrentLoads && nextIndex < frameCount) {
        const src = frames[nextIndex]?.src;
        nextIndex += 1;
        if (!src || decodedFrames.current.has(src) || decodingFrames.current.has(src)) {
          continue;
        }

        activeLoads += 1;
        decodingFrames.current.add(src);
        const image = new Image();
        image.decoding = "async";
        image.onload = () => {
          if (typeof image.decode !== "function") {
            finishLoad(src);
            return;
          }
          void image.decode().catch(() => undefined).then(() => finishLoad(src));
        };
        image.onerror = () => finishLoad(src);
        image.src = src;
      }
    }

    loadNextFrames();

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    };
  }, [frameCount, frames, inView]);

  useEffect(() => {
    if (currentFrame && decodedFrames.current.has(currentFrame.src)) {
      setDisplayFrame(frame);
    }
  }, [currentFrame, frame, loaded]);

  const moveFrame = useCallback((steps: number) => {
    setFrame((current) => (current + steps + frameCount) % frameCount);
  }, [frameCount]);

  const rotate = (steps: number) => {
    if (!ready || frameCount === 0) return;
    setHasInteracted(true);
    moveFrame(steps);
  };

  useEffect(() => {
    if (!demoReady || !inView || demoStarted.current || frameCount < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    demoStarted.current = true;
    const demoSteps = [1, 1, 1, -1, -1, -1];
    let stepIndex = 0;
    let intervalId: number | undefined;

    const timeoutId = window.setTimeout(() => {
      setDemoing(true);
      intervalId = window.setInterval(() => {
        moveFrame(demoSteps[stepIndex]);
        stepIndex += 1;
        if (stepIndex >= demoSteps.length && intervalId !== undefined) {
          window.clearInterval(intervalId);
          setDemoing(false);
        }
      }, 155);
    }, 650);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
      setDemoing(false);
    };
  }, [demoReady, inView, frameCount, moveFrame]);

  const progress = frameCount > 1 ? (frame / (frameCount - 1)) * 100 : 0;
  const showHint = ready && !hasInteracted;

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!ready) return;
    lastX.current = event.clientX;
    draggingRef.current = true;
    setDragging(true);
    setHasInteracted(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || lastX.current === null) return;
    const distance = event.clientX - lastX.current;
    const stepSize = event.pointerType === "touch" ? 8 : 12;
    const steps = Math.trunc(distance / stepSize);
    if (steps === 0) return;
    rotate(-steps);
    event.preventDefault();
    lastX.current += steps * stepSize;
  };

  const endDrag = () => {
    lastX.current = null;
    draggingRef.current = false;
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
      className={`relative isolate select-none bg-transparent outline-none ring-1 ring-[#d8b879]/30 shadow-[0_0_16px_rgba(216,184,121,0.20),0_0_42px_rgba(196,154,87,0.10)] transition-shadow focus-visible:ring-merlot-300/70 ${
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
      onPointerLeave={(event) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) endDrag();
      }}
      style={{ touchAction: "pan-y", overscrollBehavior: "contain", WebkitUserSelect: "none" }}
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
        className={`relative aspect-[16/11] overflow-hidden ${focusCrop ? "bg-transparent" : "bg-[#e4e4e4]"}`}
        style={
          !focusCrop && backgroundImage
            ? {
                backgroundImage: `url("${backgroundImage}")`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }
            : undefined
        }
      >
        <div
          className={
            focusCrop
              ? "absolute left-1/2 top-1/2 h-[64%] w-[68%] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-white"
              : "absolute inset-0 overflow-hidden"
          }
        >
          {frames.map(({ src }, index) => {
            const shouldRender =
              decodedFrames.current.has(src) || index === displayFrame || index === frame;
            if (!shouldRender) return null;

            const isVisible = index === displayFrame;
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt={isVisible ? `${alt}，角度 ${displayFrame + 1}／${frameCount}` : ""}
                aria-hidden={!isVisible}
                draggable={false}
                loading={inView ? "eager" : "lazy"}
                decoding="async"
                ref={(image) => prepareFrame(image, src)}
                onLoad={(event) => prepareFrame(event.currentTarget, src)}
                className={`absolute inset-0 h-full w-full select-none object-contain ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  imageRendering: "auto",
                  objectPosition: "center center",
                  transform: `translate3d(0, ${imageOffsetY}, 0) scale(${imageScale})`,
                  transformOrigin: "center center",
                  willChange: "opacity",
                }}
              />
            );
          })}
        </div>

        {cleanFrameArtifacts && !focusCrop ? (
          <>
            <span className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[16%] bg-[#e4e4e4]" aria-hidden />
            <span className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[16%] bg-[#e4e4e4]" aria-hidden />
            <span className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[12%] bg-[#e4e4e4]" aria-hidden />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[8%] bg-[#e4e4e4]" aria-hidden />
          </>
        ) : null}

        <div
          className={`pointer-events-none absolute left-1/2 top-4 z-30 flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-2 rounded-full border border-black/10 bg-white/90 px-3 py-2 text-black shadow-[0_12px_32px_rgba(0,0,0,0.16)] backdrop-blur-md transition-all duration-500 ${
            showHint ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          } ${demoing ? "scale-[1.03]" : "scale-100"}`}
          aria-hidden
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white">
            <MousePointer2 size={16} strokeWidth={1.8} />
          </span>
          <span className="whitespace-nowrap text-sm font-medium tracking-wide">
            拖曳旋轉 360°
          </span>
          <MoveHorizontal
            size={18}
            strokeWidth={1.8}
            className="shrink-0 text-merlot-600"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/35 to-transparent px-4 pb-10 pt-3 font-mono text-[10px] uppercase tracking-label text-white/85">
        <span>Drag / Swipe 360°</span>
        <span>{allFramesReady ? "360° Ready" : `Loading ${loaded}/${frameCount}`}</span>
      </div>

      <div className="absolute inset-x-0 bottom-3 flex flex-col items-center gap-2">
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label={`向左旋轉 ${alt}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/65 text-black/70 shadow-sm backdrop-blur-sm transition hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-merlot-500/70"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              rotate(-1);
            }}
          >
            <ChevronsLeft size={18} strokeWidth={1.7} />
          </button>
          <span className="min-w-20 rounded-full border border-white/25 bg-black/45 px-3 py-2 text-center font-mono text-[10px] tracking-label text-white/90 backdrop-blur-sm">
            {String(frame + 1).padStart(2, "0")} / {frameCount}
          </span>
          <button
            type="button"
            aria-label={`向右旋轉 ${alt}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/65 text-black/70 shadow-sm backdrop-blur-sm transition hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-merlot-500/70"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              rotate(1);
            }}
          >
            <ChevronsRight size={18} strokeWidth={1.7} />
          </button>
        </div>
        <div
          className="pointer-events-none relative h-px w-40 overflow-hidden rounded-full bg-black/15"
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
