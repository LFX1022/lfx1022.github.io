"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/Icon";
import type { StoryArchive } from "@/types";

interface RecordArchivePreviewProps {
  archive: StoryArchive;
  index: string;
  title: string;
}

export function RecordArchivePreview({
  archive,
  index,
  title,
}: RecordArchivePreviewProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <>
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-900">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="blueprint-grid group/archive absolute inset-0 flex flex-col items-center justify-center overflow-hidden p-6 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-merlot-300"
          aria-haspopup="dialog"
        >
          {archive.previewImage ? (
            <Image
              src={archive.previewImage.src}
              alt={archive.previewImage.alt}
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover object-center opacity-80 transition duration-700 group-hover/archive:scale-[1.04] group-hover/archive:opacity-95"
            />
          ) : null}
          <span
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/10"
            aria-hidden
          />
          {archive.previewImage ? null : (
            <Icon
              name="Sparkles"
              className="relative h-12 w-12 text-merlot-300/75 transition-transform duration-500 group-hover/archive:scale-110"
              strokeWidth={1}
            />
          )}
          <span className="relative mt-5 font-mono text-[10px] uppercase tracking-label text-merlot-300">
            Interest Archive
          </span>
          <strong className="relative mt-2 text-2xl font-semibold text-steel-100">
            53 Heroes
          </strong>
          <span className="relative mt-5 rounded-sm border border-steel-500/60 bg-ink-950/65 px-4 py-2 font-mono text-xs tracking-wide text-steel-200 transition-colors group-hover/archive:border-merlot-300 group-hover/archive:text-white">
            {archive.label} ↗
          </span>
          <span className="absolute bottom-3 right-4 font-mono text-5xl font-semibold text-steel-500/15">
            {index}
          </span>
        </button>
      </div>

      {open && typeof document !== "undefined"
        ? createPortal(
            <div className="fixed inset-0 z-[120] flex justify-center" role="presentation">
              <button
                type="button"
                aria-label="關閉圖鑑"
                onClick={() => setOpen(false)}
                className="absolute inset-0 bg-ink-950/85 backdrop-blur-sm"
              />
              <section
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className="relative z-10 flex h-full w-full flex-col border-x border-ink-600 bg-ink-950 shadow-2xl md:w-[min(88vw,92rem)]"
              >
                <header className="flex min-h-20 items-center justify-between gap-5 border-b border-ink-600 px-5 py-4 sm:px-8">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-label text-merlot-300">
                      {archive.eyebrow}
                    </p>
                    <h2 className="mt-1 text-lg font-semibold text-steel-100 sm:text-xl">
                      {title}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    autoFocus
                    className="shrink-0 rounded-sm border border-ink-600 px-4 py-2 font-mono text-xs tracking-wide text-steel-300 transition-colors hover:border-merlot-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-merlot-300"
                  >
                    關閉 ×
                  </button>
                </header>
                <iframe
                  src={archive.src}
                  title={archive.frameTitle}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
                  className="min-h-0 flex-1 bg-[#07101d]"
                />
              </section>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
