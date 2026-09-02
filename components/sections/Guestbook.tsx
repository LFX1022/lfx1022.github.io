"use client";

import { ExternalLink, MessageSquare } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import type { GuestbookEntry } from "@/types";

interface GuestbookProps {
  entries: GuestbookEntry[];
}

const tallyFormUrl = "https://tally.so/r/aQMvbv";

export function Guestbook({ entries }: GuestbookProps) {
  return (
    <section id="guestbook" className="scroll-mt-28 py-16 sm:py-24">
      <div className="container-x">
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <Reveal className="max-w-md">
            <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-label text-merlot-500">
              <span className="h-px w-6 bg-merlot-500" aria-hidden />
              09 / Guestbook
            </p>
            <h2 className="text-gold-glow mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              訪客足跡
            </h2>
            <p className="mt-4 text-base leading-relaxed text-chalk-300">
              留一句話給 LFX。留言會經本人確認後公開。
            </p>
          </Reveal>

          <div className="hidden lg:block" aria-hidden />

          <Reveal className="max-w-md">
            <div className="rounded-lg border border-coal-700 bg-coal-900/85 p-5 shadow-2xl shadow-black/10">
              <div className="flex items-center gap-3 border-b border-coal-700 pb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-coal-800 text-merlot-500">
                  <MessageSquare size={20} strokeWidth={1.6} />
                </span>
                <div>
                  <p className="font-mono text-xs uppercase tracking-label text-steel-400">
                    Leave A Mark
                  </p>
                  <p className="mt-1 text-sm text-chalk-200">留下你的訪客足跡</p>
                </div>
              </div>

              <div className="mt-5 text-sm leading-relaxed text-steel-300">
                <p className="font-medium text-chalk-100">留言會經本人確認後公開。</p>
                <p className="mt-2 text-steel-400">
                  表單會在新分頁開啟；我會從 Tally 後台查看留言，再手動整理已公開內容。
                </p>
                <a
                  href={tallyFormUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-md border border-merlot-500/55 bg-merlot-500 px-4 font-mono text-xs uppercase tracking-label text-coal-900 transition-colors hover:bg-[#d6ad67] focus:outline-none focus:ring-2 focus:ring-merlot-500/60 focus:ring-offset-2 focus:ring-offset-coal-900"
                >
                  我要留言
                  <ExternalLink size={14} strokeWidth={1.8} />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:justify-self-end">
            <div className="min-h-[260px] w-full rounded-lg border border-coal-700 bg-coal-900/70 p-6 shadow-2xl shadow-black/10 sm:p-7 lg:max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-label text-steel-400">
                Approved Notes
              </p>
              <div className="mt-5 space-y-4">
                {entries.length > 0 ? (
                  entries.map((entry) => (
                    <article key={entry.id} className="rounded-md border border-coal-700 bg-coal-800/70 p-5">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-sm font-semibold text-chalk-100">{entry.name}</h3>
                        <time className="font-mono text-[11px] text-merlot-500">{entry.createdAt}</time>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-steel-300">{entry.message}</p>
                    </article>
                  ))
                ) : (
                  <div className="rounded-md border border-dashed border-coal-600 p-6 text-sm leading-relaxed text-steel-400">
                    目前還沒有公開留言。經本人確認後，留言會顯示在這個區塊。
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
