"use client";

import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { journey } from "@/data/journey";
import type { JourneyImage, JourneyItem } from "@/types";

function JourneyMedia({ image, sizes }: { image: JourneyImage; sizes: string }) {
  const mediaSrc = image.src;
  const isVideo =
    typeof mediaSrc === "string" &&
    (image.mediaType === "video" || /\.(mp4|webm|mov)$/i.test(mediaSrc));

  return (
    <div className="overflow-hidden border border-steel-500/30">
      {isVideo ? (
        <video
          className="block h-auto w-full"
          src={mediaSrc}
          aria-label={image.alt}
          autoPlay
          controls
          loop
          muted
          playsInline
          preload="metadata"
        />
      ) : mediaSrc ? (
        <Image
          src={mediaSrc}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          className="block h-auto w-full"
        />
      ) : (
        <div
          role="img"
          aria-label={image.alt}
          className="blueprint-grid flex w-full items-center justify-center bg-ink-900/55 px-6 text-center"
          style={{ aspectRatio: `${image.width} / ${image.height}` }}
        >
          <p className="max-w-lg text-base leading-8 text-steel-200 sm:text-lg">
            {image.placeholder ?? image.alt}
          </p>
        </div>
      )}
    </div>
  );
}

function JourneyGallery({ images }: { images: JourneyImage[] }) {
  const inlineImages = images.filter(
    (image) => image.layout !== "grid" && image.layout !== "standalone"
  );
  const gridImages = images.filter((image) => image.layout === "grid");
  const standaloneImages = images.filter(
    (image) => image.layout === "standalone"
  );

  return (
    <div className="mt-8 space-y-8">
      {inlineImages.length ? (
        <div className="grid items-start gap-3 sm:flex">
          {inlineImages.map((image) => (
            <figure
              key={image.src ?? image.alt}
              className="min-w-0 self-start"
              style={{
                flexBasis: 0,
                flexGrow: image.width / image.height,
              }}
            >
              <JourneyMedia
                image={image}
                sizes="(min-width: 640px) 20rem, calc(100vw - 40px)"
              />
              {image.caption ? (
                <figcaption className="mt-3 text-center text-sm tracking-wide text-steel-400">
                  {image.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      ) : null}

      {gridImages.length ? (
        <div className="grid items-start gap-3 sm:grid-cols-2">
          {gridImages.map((image) => (
            <figure key={image.src ?? image.alt} className="min-w-0">
              <JourneyMedia
                image={image}
                sizes="(min-width: 640px) 24rem, calc(100vw - 40px)"
              />
              {image.caption ? (
                <figcaption className="mt-3 text-center text-sm tracking-wide text-steel-400">
                  {image.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      ) : null}

      {standaloneImages.map((image) => (
        <figure key={image.src ?? image.alt} className="mx-auto w-full max-w-md">
          <JourneyMedia
            image={image}
            sizes="(min-width: 640px) 28rem, calc(100vw - 40px)"
          />
          {image.caption ? (
            <figcaption className="mt-4 text-center text-sm tracking-wide text-gold-300 sm:text-base">
              {image.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}

export function MyJourney() {
  const [selectedJourney, setSelectedJourney] = useState<JourneyItem | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selectedJourney) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedJourney(null);
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
  }, [selectedJourney]);

  const openStory = (
    item: JourneyItem,
    trigger: HTMLButtonElement
  ) => {
    triggerRef.current = trigger;
    setSelectedJourney(item);
  };

  return (
    <>
      <section
        id="journey"
        aria-labelledby="journey-title"
        className="relative scroll-mt-28 overflow-hidden border-t border-ink-600/60 py-24 sm:py-32"
      >
        <div
          aria-hidden
          className="blueprint-grid pointer-events-none absolute inset-0 opacity-[0.035]"
        />

        <div className="container-x relative">
          <SectionHeading
            eyebrow="02 / My Journey"
            title="我的經歷"
            description="從求學、第一次接觸 BIM，到現在逐漸形成的工作方法。"
          />

          <ol className="mt-14 max-w-6xl sm:mt-16">
            {journey.map((item, i) => {
              const isSelected = selectedJourney?.id === item.id;

              return (
                <Reveal key={item.id} delay={(i % 3) * 70}>
                  <li className="relative grid grid-cols-[auto_1fr] gap-x-5 pb-10 last:pb-0 sm:gap-x-7 sm:pb-12">
                    <div className="relative flex flex-col items-center">
                      <span
                        className={`mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 transition-colors ${
                          isSelected
                            ? "border-gold-300 bg-gold-400/40"
                            : item.placeholder
                              ? "border-steel-600 bg-ink-900"
                              : "border-merlot-400 bg-merlot/40"
                        }`}
                        aria-hidden
                      />
                      {i < journey.length - 1 ? (
                        <span
                          className="mt-1 w-px flex-1 bg-ink-600"
                          aria-hidden
                        />
                      ) : null}
                    </div>

                    <button
                      type="button"
                      aria-haspopup="dialog"
                      aria-expanded={isSelected}
                      aria-controls="journey-story-panel"
                      onClick={(event) => openStory(item, event.currentTarget)}
                      className="group -mt-1 min-w-0 border-b border-ink-600/70 pb-9 text-left transition-colors last:border-b-0 hover:border-merlot-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-merlot-400 focus-visible:ring-offset-4 focus-visible:ring-offset-ink-950 sm:pb-10"
                    >
                      <span
                        className={`grid min-w-0 gap-x-10 ${
                          item.previewImage
                            ? "lg:grid-cols-[minmax(0,1fr)_15rem]"
                            : ""
                        }`}
                      >
                        <span className="min-w-0">
                          <span className="inline-flex rounded-sm border border-ink-600 px-1.5 py-0.5 font-mono text-[10px] tracking-wide text-steel-500 transition-colors group-hover:border-steel-500 group-hover:text-steel-400">
                            {item.category}
                          </span>

                          <span className="journey-period-gold mt-4 block w-fit text-3xl font-semibold leading-none tracking-[-0.03em] sm:text-4xl lg:text-[2.85rem]">
                            {item.period}
                          </span>

                          <span className="mt-4 block text-xl font-semibold text-steel-100 sm:text-2xl">
                            {item.title}
                          </span>

                          <span
                            className={`mt-3 block max-w-2xl text-sm leading-7 sm:text-base ${
                              item.placeholder
                                ? "italic text-steel-500"
                                : "text-steel-400"
                            }`}
                          >
                            {item.summary}
                          </span>
                        </span>

                        {item.previewImage ? (
                          <span className="mt-6 block w-full max-w-[15rem] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:justify-self-end">
                            <span className="flex w-full justify-center">
                              <Image
                                src={item.previewImage.src}
                                alt={item.previewImage.alt}
                                width={item.previewImage.width}
                                height={item.previewImage.height}
                                sizes="(min-width: 1024px) 15rem, 13rem"
                                className="block h-auto max-h-[20rem] w-auto max-w-full border border-steel-500/30 object-contain shadow-[0_18px_50px_rgba(0,0,0,0.24)] transition duration-500 group-hover:scale-[1.015]"
                              />
                            </span>
                            {item.previewImage.caption ? (
                              <span className="mt-2 block text-center font-mono text-[10px] tracking-wide text-steel-500">
                                {item.previewImage.caption}
                              </span>
                            ) : null}
                          </span>
                        ) : null}

                        <span
                          className={`mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-label text-steel-500 transition-colors group-hover:text-merlot-300 ${
                            item.previewImage
                              ? "lg:col-start-1 lg:row-start-2"
                              : ""
                          }`}
                        >
                          閱讀這段經歷
                          <ArrowUpRight
                            size={14}
                            aria-hidden
                            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </span>
                      </span>
                    </button>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {selectedJourney ? (
        <div className="fixed inset-0 z-[100]">
          <button
            type="button"
            aria-label={`關閉「${selectedJourney.title}」完整故事`}
            onClick={() => setSelectedJourney(null)}
            className="about-drawer-backdrop absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
          />

          <aside
            id="journey-story-panel"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="journey-story-title"
            className="about-drawer-panel absolute inset-y-0 right-0 flex w-full flex-col overflow-hidden border-l border-steel-500/30 bg-ink-950 shadow-[-30px_0_90px_rgba(0,0,0,0.48)] sm:w-[min(92vw,56rem)]"
          >
            <header className="flex shrink-0 items-center justify-between gap-5 border-b border-ink-500/70 bg-ink-950/95 px-5 py-4 sm:px-10 sm:py-5">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-label text-merlot-400">
                  MY JOURNEY / {selectedJourney.category}
                </p>
                <h2
                  id="journey-story-title"
                  className="mt-1 truncate text-lg font-semibold text-steel-100 sm:text-xl"
                >
                  {selectedJourney.title}
                </h2>
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={() => setSelectedJourney(null)}
                aria-label={`關閉「${selectedJourney.title}」完整故事`}
                className="grid h-11 w-11 shrink-0 place-items-center border border-ink-500 text-steel-300 transition-colors hover:border-merlot-400 hover:text-chalk-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-merlot-400"
              >
                <X size={20} aria-hidden />
              </button>
            </header>

            <div className="overscroll-contain overflow-y-auto px-5 pb-16 pt-9 sm:px-10 sm:pb-20 sm:pt-12">
              {selectedJourney.image ? (
                <div className="relative mb-10 aspect-[16/9] overflow-hidden border border-steel-500/30 bg-ink-900">
                  <Image
                    src={selectedJourney.image}
                    alt={`${selectedJourney.title}代表影像`}
                    fill
                    sizes="(min-width: 640px) 52rem, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : null}

              <div className="border-l-2 border-gold-400/75 pl-5 sm:pl-7">
                <p className="font-mono text-[10px] uppercase tracking-label text-merlot-300">
                  {selectedJourney.period} / {selectedJourney.category}
                </p>
                <p className="mt-4 max-w-2xl text-xl font-medium leading-9 text-chalk-100 sm:text-2xl sm:leading-10">
                  {selectedJourney.summary}
                </p>
              </div>

              <div className="mt-12 border-t border-ink-500/70 sm:mt-14">
                {selectedJourney.story.map((section, index) => (
                  <section
                    key={`${selectedJourney.id}-${section.heading}`}
                    className="border-b border-ink-500/70 py-9 sm:py-11"
                  >
                    <div className="grid gap-5 sm:grid-cols-[6rem_1fr] sm:gap-8">
                      <p className="font-mono text-[10px] uppercase tracking-label text-merlot-400">
                        {String(index + 1).padStart(2, "0")}
                      </p>

                      <div className="min-w-0">
                        <h3 className="text-xl font-semibold leading-8 text-steel-100 sm:text-2xl">
                          {section.heading}
                        </h3>

                        <div className="mt-5 space-y-4 text-base leading-8 text-steel-300 sm:text-lg sm:leading-9">
                          {section.paragraphs.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>

                        {section.images?.length ? (
                          <JourneyGallery images={section.images} />
                        ) : null}
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
