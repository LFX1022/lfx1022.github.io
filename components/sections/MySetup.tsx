"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, MonitorSmartphone } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { computerJournal, setups } from "@/data/setups";
import type { Setup } from "@/types";
import { InteractiveSetupCard } from "@/components/sections/InteractiveSetupCard";

export function MySetup() {
  return (
    <section id="setup" className="scroll-mt-28 border-t border-ink-600/60 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="06 / My Setup"
          title="我的電腦"
          description="不只是硬體規格，而是我的電腦、用途、名稱與故事。（規格陸續補上）"
        />

        <div className="mt-14 space-y-8">
          {setups.map((setup, i) => (
            <Reveal key={setup.name} delay={(i % 2) * 90}>
              {setup.memories?.length ? (
                <InteractiveSetupCard setup={setup} />
              ) : (
                <SetupCard setup={setup} />
              )}
            </Reveal>
          ))}
        </div>

        <Reveal>
          <section
            className="mt-16 border-t border-ink-600/70 pt-10"
            aria-labelledby="computer-journal-title"
          >
            <div className="flex items-center gap-3">
              <h3
                id="computer-journal-title"
                className="text-2xl font-semibold text-steel-100"
              >
                {computerJournal.title}
              </h3>
              <span className="rounded-sm border border-ink-600 px-2 py-1 font-mono text-[10px] tracking-label text-steel-500">
                {String(computerJournal.entries.length).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {computerJournal.entries.map((entry, index) => (
                <figure
                  key={entry.image}
                  className={`group flex h-full flex-col overflow-hidden rounded-sm border border-ink-600/80 bg-ink-900/45 ${
                    entry.wide ? "lg:col-span-2" : ""
                  }`}
                >
                  <div
                    className="relative overflow-hidden bg-ink-900 sm:h-[420px] lg:h-[clamp(420px,42vw,520px)]"
                    style={{ aspectRatio: entry.aspect }}
                  >
                    <Image
                      src={entry.image}
                      alt={entry.alt}
                      fill
                      sizes={
                        entry.wide
                          ? "(min-width: 1024px) 66vw, (min-width: 640px) 50vw, 100vw"
                          : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      }
                      className="object-cover transition duration-500 group-hover:scale-[1.025]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coal-950/35 via-transparent to-white/5 ring-1 ring-inset ring-white/5"
                      aria-hidden
                    />
                    <span className="absolute left-3 top-3 border border-merlot-400/50 bg-coal-950/70 px-2 py-1 font-mono text-[10px] tracking-label text-merlot-300 backdrop-blur-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <figcaption className="flex min-h-14 flex-1 items-center border-t border-ink-600/70 p-4 text-sm leading-6 text-steel-300">
                    {entry.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        </Reveal>
      </div>
    </section>
  );
}

function SetupCard({ setup }: { setup: Setup }) {
  const [open, setOpen] = useState(false);
  const detailsId = `setup-details-${setup.name}`;
  const originPending = !setup.nameOrigin || setup.nameOrigin.includes("待補");
  const memoryPending = !setup.impression || setup.impression.includes("待補");

  return (
    <article className="overflow-hidden rounded-lg border border-ink-600 bg-ink-800/40">
      {/* 主機照片皆採直式構圖：桌面版固定 3:4 照片欄，手機版上圖下文 */}
      <div className="grid items-start md:grid-cols-[300px_minmax(0,1fr)] lg:grid-cols-[340px_minmax(0,1fr)]">
        {/* 直式圖片區 */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-900 md:aspect-[3/4]">
          {setup.image ? (
            <>
              <Image
                src={setup.image}
                alt={`${setup.name}－${setup.role}`}
                fill
                priority={setup.role === "台中主力機"}
                sizes="(min-width: 1024px) 340px, (min-width: 768px) 300px, 100vw"
                className="object-cover object-center"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coal-900/25 via-transparent to-white/5 ring-1 ring-inset ring-white/10"
                aria-hidden
              />
            </>
          ) : (
            <div className="blueprint-grid absolute inset-0 flex items-center justify-center opacity-70">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ink-900/10 to-ink-950/70" />
              <MonitorSmartphone
                className="relative h-16 w-16 text-steel-500/40"
                strokeWidth={1}
              />
            </div>
          )}
        </div>

        {/* 內容區 */}
        <div className="flex min-w-0 flex-col p-6 sm:p-8 lg:p-10">
          <div className="flex items-baseline gap-3">
            <h3 className="text-2xl font-semibold text-steel-100">{setup.name}</h3>
            <span className="rounded-sm border border-merlot-400/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-label text-merlot-300">
              {setup.role}
            </span>
          </div>

          {/* 主要用途 */}
          <ul className="mt-4 flex flex-wrap gap-2">
            {setup.uses.map((use) => (
              <li
                key={use}
                className="rounded-sm border border-ink-600 px-2.5 py-1 text-xs text-steel-300"
              >
                {use}
              </li>
            ))}
          </ul>

          {/* 精簡重點規格 */}
          <dl className="mt-5 space-y-1.5">
            {setup.highlights.map((highlight) => {
              const [label, value] = highlight.split(" · ");

              return (
                <dd
                  key={highlight}
                  className="grid grid-cols-[4px_3.5rem_minmax(0,1fr)] items-baseline gap-x-3 text-sm text-steel-200"
                >
                  <span className="h-1 w-1 rounded-full bg-merlot-500" aria-hidden />
                  <span className="text-center font-mono text-sm font-semibold tracking-[0.12em] text-steel-200">
                    {label}
                  </span>
                  <span>{value ?? label}</span>
                </dd>
              );
            })}
          </dl>

          {/* 展開完整規格 */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={detailsId}
            className="mt-6 inline-flex items-center gap-1.5 self-start font-mono text-xs uppercase tracking-label text-merlot-300 transition-colors hover:text-merlot-400"
          >
            {open ? "收起完整規格" : "完整規格"}
            <ChevronDown
              size={14}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>

          <div
            id={detailsId}
            aria-hidden={!open}
            className={`relative mt-5 overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${
              open
                ? "max-h-[2400px] border-t border-ink-600 pt-5 opacity-100"
                : "max-h-[155px] pt-4 opacity-40 [mask-image:linear-gradient(to_bottom,black_0%,rgba(0,0,0,0.58)_42%,transparent_100%)]"
            }`}
          >
            <div
              className={`transition-[filter,opacity] duration-500 ease-out ${
                open
                  ? "blur-0 opacity-100"
                  : "select-none px-3 blur-[5px] opacity-50"
              }`}
            >
              <dl className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {setup.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between gap-3 border-b border-ink-600/60 pb-2">
                    <dt className="font-mono text-[11px] uppercase tracking-label text-steel-500">
                      {spec.label}
                    </dt>
                    <dd
                      className={`text-right text-sm ${
                        spec.placeholder ? "italic text-steel-500" : "text-steel-200"
                      }`}
                    >
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-label text-merlot-300">
                    名稱由來
                  </p>
                  <p
                    className={`mt-2 whitespace-pre-line text-sm leading-7 ${
                      originPending ? "italic text-steel-500" : "text-steel-300"
                    }`}
                  >
                    {setup.nameOrigin ?? "名稱由來待補"}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-label text-merlot-300">
                    主機回憶
                  </p>
                  <p
                    className={`mt-2 whitespace-pre-line text-sm leading-7 ${
                      memoryPending ? "italic text-steel-500" : "text-steel-300"
                    }`}
                  >
                    {setup.impression ?? "主機回憶待補"}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {setup.memories && setup.memories.length > 0 && (
        <section
          className="border-t border-ink-600/70 px-6 py-8 sm:px-8 lg:px-10"
          aria-label={`${setup.name}誕生片段`}
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-label text-merlot-300">
                Build Log
              </p>
              <h4 className="mt-1 text-xl font-semibold text-steel-100">誕生片段</h4>
            </div>
            <p className="text-xs tracking-wide text-steel-500">從升級計畫到完整重組</p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {setup.memories.map((memory, index) => (
              <figure
                key={memory.image}
                className="group overflow-hidden rounded-sm border border-ink-600/80 bg-ink-900/45"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-ink-900">
                  <Image
                    src={memory.image}
                    alt={`${setup.name}誕生片段：${memory.title}`}
                    fill
                    sizes="(min-width: 1024px) 340px, (min-width: 640px) 30vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.025]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coal-950/55 via-transparent to-white/5 ring-1 ring-inset ring-white/5"
                    aria-hidden
                  />
                  <span className="absolute left-3 top-3 border border-merlot-400/50 bg-coal-950/70 px-2 py-1 font-mono text-[10px] tracking-label text-merlot-300 backdrop-blur-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <figcaption className="min-h-[112px] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium text-steel-100">{memory.title}</p>
                    {memory.date && (
                      <time
                        dateTime={memory.date.replaceAll("/", "-")}
                        className="shrink-0 font-mono text-[10px] tracking-label text-merlot-300"
                      >
                        {memory.date}
                      </time>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-steel-400">{memory.description}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          {setup.finale && (
            <div className="mt-10">
              <div className="flex flex-col items-center" aria-hidden>
                <span className="h-10 w-px bg-gradient-to-b from-ink-600 to-merlot-400/80" />
                <span className="h-3 w-3 rotate-45 border border-merlot-300/80 bg-ink-900 shadow-[0_0_14px_rgba(196,154,87,0.35)]" />
                <span className="mt-3 border border-merlot-400/50 bg-coal-950/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-label text-merlot-300">
                  {setup.finale.label}
                </span>
                <span className="h-8 w-px bg-gradient-to-b from-merlot-400/80 to-ink-600" />
              </div>

              <figure className="overflow-hidden rounded-sm border border-ink-600/80 bg-ink-900/55">
                <div className="grid md:grid-cols-[minmax(300px,360px)_minmax(0,1fr)]">
                  <div className="relative aspect-[9/16] w-full overflow-hidden">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      poster={setup.finale.poster}
                      aria-label={setup.finale.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    >
                      <source src={setup.finale.video} type="video/mp4" />
                      你的瀏覽器不支援影片播放。
                    </video>
                  </div>

                  <figcaption className="flex flex-col justify-center border-t border-ink-600/70 p-6 sm:p-8 md:border-l md:border-t-0 lg:p-12">
                    <p className="font-mono text-[10px] uppercase tracking-label text-merlot-300">
                      Final Sequence
                    </p>
                    <h5 className="mt-3 text-2xl font-semibold text-steel-100">
                      {setup.finale.title}
                    </h5>
                    <p className="mt-4 max-w-lg text-sm leading-7 text-steel-400">
                      {setup.finale.description}
                    </p>
                  </figcaption>
                </div>
              </figure>
            </div>
          )}
        </section>
      )}
    </article>
  );
}
