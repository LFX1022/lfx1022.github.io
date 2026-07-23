import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { whatIDo } from "@/data/what-i-do";

export function WhatIDo() {
  return (
    <section id="work" className="scroll-mt-28 border-t border-ink-600/60 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="07 / What I Do"
          title="目前在做的事"
          description="工作的部分，分成三塊簡單講。"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {whatIDo.map((cat, i) => (
            <Reveal key={cat.title} delay={(i % 3) * 80}>
              <article className="group flex h-full flex-col rounded-md border border-ink-600 bg-ink-800/40 p-6 transition-colors hover:border-merlot-400">
                <Icon name={cat.icon} className="h-6 w-6 text-merlot-300" />
                <h3 className="mt-4 text-base font-semibold text-steel-100">
                  {cat.title}
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-label text-steel-500">
                  {cat.titleEn}
                </p>
                <ul className="mt-4 space-y-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-steel-400"
                    >
                      <span className="h-1 w-1 rounded-full bg-merlot-500" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
