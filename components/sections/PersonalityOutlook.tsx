import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { personality } from "@/data/personality";
import { profile } from "@/data/profile";

export function PersonalityOutlook() {
  return (
    <section id="personality" className="scroll-mt-28 border-t border-ink-600/60 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="04 / Personality & Outlook"
          title="個性與展望"
          description="我是個什麼樣的人，以及我想往哪裡去。（內容陸續補上）"
        />

        {/* 品牌銜接句 */}
        <Reveal className="mt-6">
          <p className="max-w-2xl border-l-2 border-merlot-500/60 pl-4 text-sm leading-relaxed text-steel-400">
            {profile.brand.personalityIntro}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-12 lg:grid-cols-2">
          {personality.map((group, gi) => (
            <Reveal key={group.heading} delay={gi * 90}>
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-ink-600 bg-ink-900 text-merlot-300">
                    <Icon name={group.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-steel-100">
                      {group.heading}
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-label text-steel-500">
                      {group.headingEn}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item.title}
                      className="rounded-md border border-ink-600 bg-ink-800/40 p-4"
                    >
                      <h4 className="text-sm font-semibold text-steel-200">
                        {item.title}
                      </h4>
                      <p
                        className={`mt-1 text-sm leading-relaxed ${
                          item.placeholder ? "italic text-steel-500" : "text-steel-400"
                        }`}
                      >
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
