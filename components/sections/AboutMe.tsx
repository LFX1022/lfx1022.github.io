"use client";

import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { aboutSection, profile } from "@/data/profile";

export function AboutMe() {
  const [storyOpen, setStoryOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!storyOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setStoryOpen(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [storyOpen]);

  return (
    <>
      <section
        id="about"
        aria-labelledby="about-title"
        className="relative scroll-mt-28 overflow-hidden border-t border-ink-600/60 py-24 sm:py-32"
      >
        <div
          aria-hidden
          className="blueprint-grid pointer-events-none absolute inset-0 opacity-[0.055]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-20 h-[34rem] w-[34rem] rounded-full bg-merlot-700/10 blur-[120px]"
        />

        <div className="container-x relative">
          <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7 lg:pt-8">
              <p className="eyebrow">
                <span className="h-px w-8 bg-merlot-500" aria-hidden />
                {aboutSection.eyebrow}
              </p>

              <h2
                id="about-title"
                className="mt-7 text-4xl font-semibold leading-[1.12] tracking-[-0.035em] text-chalk-100 sm:text-5xl lg:text-6xl xl:text-[4.35rem]"
              >
                {aboutSection.title.map((line, index) => (
                  <span
                    key={line}
                    className={index === 1 ? "block text-gold-glow" : "block"}
                  >
                    {line}
                  </span>
                ))}
              </h2>

              <div className="mt-8 max-w-xl space-y-2 text-base leading-8 text-steel-300 sm:text-lg">
                {aboutSection.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-12 grid border-y border-ink-500/70 sm:grid-cols-2">
                {aboutSection.keywords.map((keyword, index) => (
                  <div
                    key={keyword.label}
                    className={`group py-5 sm:px-5 ${
                      index % 2 === 1 ? "sm:border-l sm:border-ink-500/70" : ""
                    } ${
                      index > 1
                        ? "border-t border-ink-500/70"
                        : index === 1
                          ? "border-t border-ink-500/70 sm:border-t-0"
                          : ""
                    }`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[10px] tracking-label text-merlot-400">
                        {keyword.index}
                      </span>
                      <p className="text-lg font-medium tracking-wide text-steel-100 transition-colors group-hover:text-gold-300">
                        {keyword.label}
                      </p>
                    </div>
                    <p className="mt-2 pl-8 text-sm leading-6 text-steel-500">
                      {keyword.note}
                    </p>
                  </div>
                ))}
              </div>

              <button
                ref={triggerRef}
                type="button"
                aria-haspopup="dialog"
                aria-expanded={storyOpen}
                onClick={() => setStoryOpen(true)}
                className="group mt-10 inline-flex items-center gap-4 border-b border-merlot-400/70 pb-2 text-sm font-medium tracking-wide text-steel-100 transition-colors hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-merlot-400 focus-visible:ring-offset-4 focus-visible:ring-offset-ink-950"
              >
                {aboutSection.cta}
                <ArrowUpRight
                  size={17}
                  aria-hidden
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>
            </Reveal>

            <Reveal className="lg:col-span-5" delay={100}>
              <figure className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative aspect-[3/4] overflow-hidden border border-steel-500/30 bg-ink-900 shadow-[0_28px_80px_rgba(0,0,0,0.36)]">
                  <Image
                    src={aboutSection.image.src}
                    alt={aboutSection.image.alt}
                    fill
                    sizes="(min-width: 1024px) 38vw, (min-width: 640px) 448px, calc(100vw - 48px)"
                    className="object-cover object-center saturate-[0.9]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/10"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-4 border border-chalk-100/15"
                  />
                  <figcaption className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
                    <span className="max-w-[14rem] font-mono text-[10px] uppercase leading-5 tracking-label text-chalk-200/85">
                      {aboutSection.image.label}
                    </span>
                    <span className="h-12 w-px bg-gold-300/70" aria-hidden />
                  </figcaption>
                </div>

                <blockquote className="relative mt-7 max-w-[22rem] border-l border-gold-400/70 pl-5 text-pretty text-lg font-medium leading-8 text-steel-100 sm:pl-6 sm:text-2xl sm:leading-9">
                  {aboutSection.quote}
                </blockquote>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {storyOpen ? (
        <div className="fixed inset-0 z-[100]">
          <button
            type="button"
            aria-label="關閉完整故事"
            onClick={() => setStoryOpen(false)}
            className="about-drawer-backdrop absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
          />

          <aside
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-story-title"
            className="about-drawer-panel absolute inset-y-0 right-0 flex w-full flex-col overflow-hidden border-l border-steel-500/30 bg-ink-950 shadow-[-30px_0_90px_rgba(0,0,0,0.48)] sm:w-[min(88vw,52rem)]"
          >
            <header className="flex shrink-0 items-center justify-between border-b border-ink-500/70 bg-ink-950/95 px-6 py-5 sm:px-10">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-label text-merlot-400">
                  ABOUT LFX / FULL STORY
                </p>
                <h2
                  id="about-story-title"
                  className="mt-1 text-xl font-semibold text-steel-100"
                >
                  關於我，也關於這座辭海
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setStoryOpen(false)}
                aria-label="關閉完整故事"
                className="grid h-11 w-11 place-items-center border border-ink-500 text-steel-300 transition-colors hover:border-merlot-400 hover:text-chalk-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-merlot-400"
              >
                <X size={20} aria-hidden />
              </button>
            </header>

            <div className="overscroll-contain overflow-y-auto px-6 pb-16 pt-10 sm:px-10 sm:pt-14">
              <p className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-chalk-100 sm:text-4xl">
                先認識這個人，
                <span className="text-gold-glow block">再認識他的工作與世界。</span>
              </p>

              <div className="mt-12 border-t border-ink-500/70">
                {profile.about.map((field) => (
                  <section
                    key={field.label}
                    className="grid gap-4 border-b border-ink-500/70 py-8 sm:grid-cols-[12rem_1fr] sm:gap-8 sm:py-10"
                  >
                    <h3 className="font-mono text-xs uppercase leading-6 tracking-label text-merlot-300">
                      {field.label}
                    </h3>
                    <p className="text-base leading-8 text-steel-300 sm:text-lg">
                      {field.content}
                    </p>
                  </section>
                ))}
              </div>

              <blockquote className="mt-14 border-l-2 border-gold-400/80 pl-5 text-pretty text-lg font-medium leading-8 text-steel-100 sm:mt-16 sm:pl-7 sm:text-xl sm:leading-9">
                「{aboutSection.storyClosing}」
              </blockquote>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
