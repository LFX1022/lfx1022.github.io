"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, MousePointer2 } from "lucide-react";
import type { Setup, SetupMemory } from "@/types";

type Connector = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

const satellitePositions = [
  "left-[6%] top-[5%]",
  "right-[6%] top-[5%]",
  "left-0 top-[39%]",
  "right-0 top-[39%]",
  "bottom-[4%] left-[8%]",
  "bottom-[4%] right-[8%]",
];

export function InteractiveSetupCard({ setup }: { setup: Setup }) {
  const [lockedIndex, setLockedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [specsOpen, setSpecsOpen] = useState(false);
  const [connector, setConnector] = useState<Connector | null>(null);
  const [baseConnectors, setBaseConnectors] = useState<Array<Connector & { index: number }>>([]);
  const orbitRef = useRef<HTMLDivElement>(null);
  const planetImageRef = useRef<HTMLDivElement>(null);
  const satelliteRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const memories = setup.memories ?? [];
  const activeIndex = hoveredIndex ?? lockedIndex;
  const activeMemory = activeIndex === null ? null : memories[activeIndex];
  const activeHotspot = activeMemory?.hotspot;
  const activeSpec = activeHotspot?.specLabel
    ? setup.specs.find((spec) => spec.label === activeHotspot.specLabel)
    : undefined;

  const preview = (index: number | null) => setHoveredIndex(index);
  const lock = (index: number) =>
    setLockedIndex((current) => (current === index ? null : index));

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLockedIndex(null);
        setHoveredIndex(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const updateConnector = () => {
      const orbit = orbitRef.current;
      const planetImage = planetImageRef.current;
      if (!orbit || !planetImage) return;

      const orbitRect = orbit.getBoundingClientRect();
      const imageRect = planetImage.getBoundingClientRect();
      const nextConnectors = memories.flatMap((memory, index) => {
        const satellite = satelliteRefs.current[index];
        if (!satellite) return [];
        const hotspot = memory.hotspot ?? { x: 50, y: 50 };
        const cardRect = satellite.getBoundingClientRect();
        const endX = imageRect.left - orbitRect.left + imageRect.width * (hotspot.x / 100);
        const endY = imageRect.top - orbitRect.top + imageRect.height * (hotspot.y / 100);
        const cardCenterX = cardRect.left - orbitRect.left + cardRect.width / 2;
        const cardIsLeft = cardCenterX < endX;
        return [{
          index,
          startX: (cardIsLeft ? cardRect.right : cardRect.left) - orbitRect.left,
          startY: cardRect.top - orbitRect.top + cardRect.height / 2,
          endX,
          endY,
        }];
      });

      setBaseConnectors(nextConnectors);
      setConnector(activeIndex === null ? null : nextConnectors.find((item) => item.index === activeIndex) ?? null);
    };

    updateConnector();
    const frame = window.requestAnimationFrame(updateConnector);
    const settleTimer = window.setTimeout(updateConnector, 420);
    const observer = new ResizeObserver(updateConnector);
    if (orbitRef.current) observer.observe(orbitRef.current);
    window.addEventListener("resize", updateConnector);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      observer.disconnect();
      window.removeEventListener("resize", updateConnector);
    };
  }, [activeIndex, activeHotspot, memories]);

  return (
    <article className="relative py-5 sm:py-8" aria-labelledby={`setup-${setup.name}`}>
      <header className="mb-4 flex flex-wrap items-end justify-between gap-4 px-1">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-label text-merlot-300">
            Interactive Build Archive
          </p>
          <h3 id={`setup-${setup.name}`} className="mt-2 text-3xl font-semibold text-steel-100">
            {setup.name}
          </h3>
        </div>
        <p className="flex items-center gap-2 text-xs tracking-wide text-steel-500">
          <MousePointer2 size={14} aria-hidden />
          指向圖片展開片段，點擊可固定
        </p>
      </header>

      <div ref={orbitRef} className="relative mx-auto hidden h-[760px] max-w-[1080px] lg:block">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(196,154,87,0.08)_0%,rgba(196,154,87,0.025)_42%,transparent_70%)]" aria-hidden />

        {baseConnectors.length > 0 && (
          <svg className="pointer-events-none absolute inset-0 z-[12] h-full w-full overflow-visible" aria-hidden>
            <defs>
              <linearGradient id={`orbit-connector-${activeIndex}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#c49a57" stopOpacity="0.25" />
                <stop offset="0.72" stopColor="#c49a57" stopOpacity="0.95" />
                <stop offset="1" stopColor="#f2dfb4" />
              </linearGradient>
            </defs>
            {baseConnectors.map((item) => (
              <path
                key={item.index}
                d={`M ${item.startX} ${item.startY} C ${(item.startX + item.endX) / 2} ${item.startY}, ${(item.startX + item.endX) / 2} ${item.endY}, ${item.endX} ${item.endY}`}
                fill="none"
                stroke={activeIndex === item.index ? "#c49a57" : "#8f887d"}
                strokeOpacity={activeIndex === null ? "0.26" : activeIndex === item.index ? "0.3" : "0.06"}
                strokeWidth={activeIndex === item.index ? "1.2" : "1"}
                strokeDasharray="6 6"
              />
            ))}
            {connector && activeIndex !== null && (
              <>
                <path
                  d={`M ${connector.startX} ${connector.startY} C ${(connector.startX + connector.endX) / 2} ${connector.startY}, ${(connector.startX + connector.endX) / 2} ${connector.endY}, ${connector.endX} ${connector.endY}`}
                  fill="none"
                  stroke={`url(#orbit-connector-${activeIndex})`}
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                  className="animate-pulse"
                />
                <circle cx={connector.startX} cy={connector.startY} r="3" fill="#c49a57" />
              </>
            )}
          </svg>
        )}

        <div className="absolute left-1/2 top-1/2 z-10 w-[360px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-merlot-300/45 bg-coal-950/90 shadow-[0_0_65px_rgba(0,0,0,0.58)]">
            <div
              ref={planetImageRef}
              className="relative aspect-[3/4] w-full overflow-hidden bg-ink-950"
            >
              {setup.image && (
                <Image
                  src={setup.image}
                  alt={`${setup.name} 主機核心`}
                  fill
                  priority
                  sizes="360px"
                  className={`object-cover object-center transition-transform duration-700 ${activeMemory ? "scale-[1.04]" : "scale-100"}`}
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coal-950/65 via-transparent to-white/5 ring-1 ring-inset ring-white/10" aria-hidden />
              {activeHotspot && <Hotspot x={activeHotspot.x} y={activeHotspot.y} width={activeHotspot.width} height={activeHotspot.height} polygon={activeHotspot.polygon} label={activeHotspot.label} />}
            </div>

          <div className="relative z-20 border-t border-ink-600/80 px-6 py-5 text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="rounded-full border border-merlot-300/45 px-2.5 py-1 font-mono text-[9px] uppercase tracking-label text-merlot-300">
                {setup.role}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-steel-500">Central Core</span>
            </div>
            <p className="mt-2 text-xl font-semibold text-steel-100">{setup.name}</p>
            {activeMemory ? (
              <div className="mt-3 border-t border-ink-600/70 pt-3">
                <p className="font-mono text-[9px] uppercase tracking-label text-merlot-300">{activeHotspot?.label}</p>
                {activeSpec && <p className="mt-1 text-xs leading-5 text-steel-300">{activeSpec.value}</p>}
              </div>
            ) : (
              <div className="mt-3 space-y-1 border-t border-ink-600/60 pt-3 text-left">
                {setup.highlights.map((highlight) => (
                  <p key={highlight} className="truncate text-xs leading-5 text-steel-400">{highlight}</p>
                ))}
              </div>
            )}
          </div>
        </div>

        {memories.map((memory, index) => (
          <SatelliteCard
            key={memory.image}
            memory={memory}
            index={index}
            activeIndex={activeIndex}
            locked={lockedIndex === index}
            position={satellitePositions[index] ?? ""}
            cardRef={(node) => {
              satelliteRefs.current[index] = node;
            }}
            onEnter={() => preview(index)}
            onLeave={() => preview(null)}
            onClick={() => lock(index)}
          />
        ))}
      </div>

      <div className="lg:hidden">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[340px] overflow-hidden rounded-2xl border border-merlot-300/55 bg-ink-950 shadow-2xl">
            {setup.image && (
              <Image src={setup.image} alt={`${setup.name} 主機核心`} fill priority sizes="340px" className="object-cover object-center" />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coal-950/65 via-transparent to-white/5" aria-hidden />
            {activeHotspot && <Hotspot x={activeHotspot.x} y={activeHotspot.y} width={activeHotspot.width} height={activeHotspot.height} polygon={activeHotspot.polygon} label={activeHotspot.label} />}
        </div>
        <div className="relative z-10 mx-auto -mt-6 w-[270px] rounded-xl border border-ink-600 bg-coal-950/90 p-4 text-center">
          <p className="text-xl font-semibold text-steel-100">{setup.name}</p>
          <p className="mt-1 text-xs text-merlot-300">{activeHotspot?.label ?? setup.role}</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {memories.map((memory, index) => (
            <MobileMemoryCard
              key={memory.image}
              memory={memory}
              index={index}
              activeIndex={activeIndex}
              locked={lockedIndex === index}
              onEnter={() => preview(index)}
              onLeave={() => preview(null)}
              onClick={() => lock(index)}
            />
          ))}
        </div>
      </div>

      <section className="mx-auto mt-10 max-w-3xl border-y border-ink-600/70 py-6" aria-label={`${setup.name} 規格`}>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {setup.highlights.map((highlight) => (
            <span key={highlight} className="rounded-full border border-ink-600 bg-ink-900/55 px-3 py-1.5 text-xs text-steel-300">
              {highlight}
            </span>
          ))}
        </div>
        <div className={`grid overflow-hidden transition-[max-height,opacity,margin] duration-500 sm:grid-cols-2 ${specsOpen ? "mt-6 max-h-[1200px] gap-3 opacity-100" : "max-h-0 opacity-0"}`}>
          {setup.specs.map((spec) => {
            const highlighted = activeHotspot?.specLabel === spec.label;
            return (
              <div key={spec.label} className={`rounded-lg border p-3 ${highlighted ? "border-merlot-300/65 bg-merlot-400/10" : "border-ink-600/60 bg-ink-900/35"}`}>
                <p className="font-mono text-[9px] uppercase tracking-label text-steel-500">{spec.label}</p>
                <p className={`mt-1 break-words text-sm leading-6 ${highlighted ? "text-merlot-100" : "text-steel-300"}`}>{spec.value}</p>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setSpecsOpen((value) => !value)}
          aria-expanded={specsOpen}
          className="mx-auto mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-label text-merlot-300 transition-colors hover:text-merlot-200"
        >
          {specsOpen ? "收起完整規格" : "查看完整規格"}
          <ChevronDown size={14} className={`transition-transform ${specsOpen ? "rotate-180" : ""}`} />
        </button>
      </section>

      {setup.finale && (
        <section className="mt-12" aria-label={`${setup.name} 第一次亮機`}>
          <div className="flex flex-col items-center" aria-hidden>
            <span className="h-12 w-px bg-gradient-to-b from-ink-600 to-merlot-300" />
            <span className="h-3 w-3 rotate-45 border border-merlot-300 bg-ink-900 shadow-[0_0_18px_rgba(196,154,87,0.5)]" />
            <span className="mt-3 rounded-full border border-merlot-300/50 bg-coal-950/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-label text-merlot-300">{setup.finale.label}</span>
            <span className="h-8 w-px bg-gradient-to-b from-merlot-300 to-transparent" />
          </div>
          <figure className="mx-auto grid max-w-4xl overflow-hidden rounded-2xl border border-ink-600/80 bg-ink-900/55 shadow-2xl shadow-coal-950/30 md:grid-cols-[minmax(260px,340px)_minmax(0,1fr)]">
            <div className="relative aspect-[9/16] overflow-hidden bg-ink-950">
              <video autoPlay loop muted playsInline preload="metadata" poster={setup.finale.poster} aria-label={setup.finale.title} className="absolute inset-0 h-full w-full object-cover">
                <source src={setup.finale.video} type="video/mp4" />
                你的瀏覽器目前不支援影片播放。
              </video>
            </div>
            <figcaption className="flex flex-col justify-center border-t border-ink-600/70 p-7 md:border-l md:border-t-0 lg:p-12">
              <p className="font-mono text-[10px] uppercase tracking-label text-merlot-300">Final Sequence</p>
              <h4 className="mt-3 text-2xl font-semibold text-steel-100">{setup.finale.title}</h4>
              <p className="mt-4 max-w-lg text-sm leading-7 text-steel-400">{setup.finale.description}</p>
            </figcaption>
          </figure>
        </section>
      )}
    </article>
  );
}

function Hotspot({ x, y, width = 22, height = 12, polygon, label }: { x: number; y: number; width?: number; height?: number; polygon?: string; label: string }) {
  if (polygon) {
    return (
      <div className="pointer-events-none absolute inset-0 z-20" aria-hidden>
        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <filter id="gold-outline-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="1.1" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <polygon
            points={polygon}
            fill="rgba(196,154,87,0.07)"
            stroke="#e6c784"
            strokeWidth="0.48"
            vectorEffect="non-scaling-stroke"
            filter="url(#gold-outline-glow)"
            strokeLinejoin="round"
          />
          <polygon
            points={polygon}
            fill="none"
            stroke="rgba(255,238,190,0.9)"
            strokeWidth="0.16"
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className="absolute w-max max-w-[180px] -translate-x-1/2 rounded-full border border-merlot-300/70 bg-coal-950/90 px-3 py-1.5 text-center font-mono text-[9px] uppercase tracking-[0.12em] text-merlot-100 shadow-[0_0_14px_rgba(196,154,87,0.35)] backdrop-blur-md"
          style={{ left: `${x}%`, top: `${y + height / 2 + 2}%` }}
        >
          {label}
        </span>
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-merlot-200/90 bg-merlot-300/[0.04] shadow-[0_0_10px_rgba(196,154,87,0.9),0_0_28px_rgba(196,154,87,0.45),inset_0_0_18px_rgba(196,154,87,0.16)]"
      style={{ left: `${x}%`, top: `${y}%`, width: `${width}%`, height: `${height}%` }}
      aria-hidden
    >
      <span className="absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-merlot-100" />
      <span className="absolute -right-px -top-px h-3 w-3 border-r-2 border-t-2 border-merlot-100" />
      <span className="absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-merlot-100" />
      <span className="absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-merlot-100" />
      <span className="absolute left-1/2 top-full mt-2 w-max max-w-[180px] -translate-x-1/2 rounded-full border border-merlot-300/70 bg-coal-950/90 px-3 py-1.5 text-center font-mono text-[9px] uppercase tracking-[0.12em] text-merlot-100 shadow-[0_0_14px_rgba(196,154,87,0.35)] backdrop-blur-md">{label}</span>
    </div>
  );
}

function SatelliteCard({ memory, index, activeIndex, locked, position, cardRef, onEnter, onLeave, onClick }: {
  memory: SetupMemory;
  index: number;
  activeIndex: number | null;
  locked: boolean;
  position: string;
  cardRef: (node: HTMLButtonElement | null) => void;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const active = activeIndex === index;
  const receding = activeIndex !== null && !active;
  return (
    <button
      ref={cardRef}
      type="button"
      aria-pressed={locked}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={onClick}
      className={`group absolute z-20 w-[190px] overflow-hidden rounded-2xl border bg-ink-900/80 text-left shadow-2xl shadow-coal-950/30 backdrop-blur-md transition-[transform,filter,opacity,border-color] duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-merlot-300 ${position} ${active ? "z-30 scale-[1.18] border-merlot-300/80" : receding ? "scale-[0.86] border-ink-600/40 opacity-25 blur-[2px]" : "border-ink-600/80 hover:border-merlot-300/60"}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-950">
        <Image src={memory.image} alt={memory.title} fill sizes="225px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coal-950/75 via-transparent to-white/5" aria-hidden />
        <span className="absolute left-3 top-3 border border-merlot-300/40 bg-coal-950/75 px-2 py-1 font-mono text-[9px] tracking-label text-merlot-200 backdrop-blur-sm">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="p-3.5">
        <p className="text-sm font-medium text-steel-100">{memory.title}</p>
        <p className={`overflow-hidden text-xs leading-5 text-steel-400 transition-[max-height,opacity,margin] duration-500 ${active ? "mt-2 max-h-24 opacity-100" : "max-h-0 opacity-0"}`}>{memory.description}</p>
      </div>
    </button>
  );
}

function MobileMemoryCard({ memory, index, activeIndex, locked, onEnter, onLeave, onClick }: {
  memory: SetupMemory;
  index: number;
  activeIndex: number | null;
  locked: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const active = activeIndex === index;
  const receding = activeIndex !== null && !active;
  return (
    <button type="button" aria-pressed={locked} onMouseEnter={onEnter} onMouseLeave={onLeave} onFocus={onEnter} onBlur={onLeave} onClick={onClick} className={`overflow-hidden rounded-xl border bg-ink-900/70 text-left transition-all duration-500 ${active ? "border-merlot-300/70 sm:scale-[1.03]" : receding ? "scale-[0.96] border-ink-600/50 opacity-40" : "border-ink-600/80"}`}>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={memory.image} alt={memory.title} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
        <span className="absolute left-3 top-3 bg-coal-950/75 px-2 py-1 font-mono text-[9px] text-merlot-200">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="p-4">
        <p className="text-sm font-medium text-steel-100">{memory.title}</p>
        <p className={`overflow-hidden text-xs leading-5 text-steel-400 transition-all duration-500 ${active ? "mt-2 max-h-24 opacity-100" : "max-h-0 opacity-0"}`}>{memory.description}</p>
      </div>
    </button>
  );
}
