import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { JournalCarousel } from "@/components/JournalCarousel";
import { Carousel } from "@/components/Carousel";
import { Motorcycle360 } from "@/components/Motorcycle360";
import { Daytona660ThreeModel } from "@/components/Daytona660ThreeModel";
import { DreamGarageGallery } from "@/components/DreamGarageGallery";
import { MemoryGallery } from "@/components/MemoryGallery";
import { interestMemories, interests } from "@/data/interests";
import {
  daytonaGallery,
  daytona660360Frames,
  dreamGarage,
  gsxr150Gallery,
  merlotJournal,
  poolGallery,
  r3Gallery,
  r3Journal,
  tofuJournal,
} from "@/data/motorcycles";

export function LifeInterests() {
  return (
    <section id="life" className="scroll-mt-28 border-t border-ink-600/60 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="05 / Life & Interests"
          title="生活與興趣"
          description="工作以外的我。"
        />

        {/* 興趣分類卡片；重機為重點，視覺上稍微突出 */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {interests.map((interest, i) => (
            <Reveal
              key={interest.title}
              delay={(i % 4) * 60}
              className={interest.featured ? "sm:col-span-2 lg:col-span-2" : ""}
            >
              <article
                className={`group flex h-full flex-col rounded-md border p-6 transition-colors ${
                  interest.featured
                    ? "border-merlot-400/50 bg-ink-800/60 hover:border-merlot-400"
                    : "border-ink-600 bg-ink-800/40 hover:border-steel-600"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon name={interest.icon} className="h-6 w-6 text-merlot-300" />
                  {interest.featured ? (
                    <span className="rounded-sm border border-merlot-400/50 px-1.5 py-0.5 font-mono text-[10px] tracking-label text-merlot-300">
                      重點
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-4 text-base font-semibold text-steel-100">
                  {interest.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-400">
                  {interest.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 border-t border-ink-600/60 pt-12">
          {interestMemories.map((memory) => (
            <Reveal key={memory.src}>
              <article className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
                <MemoryGallery slides={memory.slides ?? [memory]} />

                <div className="border-l border-ink-600/70 pl-5 lg:pl-7">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    {"date" in memory && memory.date ? (
                      <time
                        dateTime={memory.date.replaceAll("/", "-")}
                        className="font-mono text-[10px] text-merlot-300"
                      >
                        {memory.date}
                      </time>
                    ) : null}
                    <span className="font-mono text-[10px] text-steel-500">
                      {memory.eyebrow}
                    </span>
                  </div>
                  <h3 className="text-gold-glow mt-4 text-xl font-semibold leading-relaxed sm:text-2xl">
                    {memory.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-7 text-steel-300/90">
                    {memory.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* 重機重點：車庫全寬相簿 */}
      <div id="garage" className="mt-20 scroll-mt-28 border-t border-ink-600/60 pt-16">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">
              <span className="h-px w-6 bg-merlot-500" aria-hidden />
              Garage · 我的車庫
            </p>
            <h2 className="text-gold-glow mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              車庫
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-steel-400">
              現役、歷代與夢想中的車 —— 一台一台記錄下來。
            </p>
          </Reveal>
        </div>

        <div className="container-x mt-14">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <p className="eyebrow">
                <span className="h-px w-6 bg-merlot-500" aria-hidden />
                歷代車庫 · Garage Archive
              </p>
              <span className="font-mono text-[10px] text-steel-500/70">
                2021/05/12 - 2024/12/21
              </span>
            </div>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-2">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="garage-model-name">
                  2018 Suzuki GSX-R150
                </h3>
                <span className="font-mono text-[11px] text-steel-500/65">
                  2021/05/12 - 2023/04/28 · 717 天
                </span>
              </div>
              <p className="garage-vehicle-name">
                小Pool車
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal className="mt-6">
          <Carousel slides={poolGallery} />
        </Reveal>

        <div className="container-x mt-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="garage-model-name">
                  2016 Yamaha YZF-R3
                </h3>
                <span className="font-mono text-[11px] text-steel-500/65">
                  2023/03/05 - 2024/12/21 · 658 天
                </span>
              </div>
              <p className="garage-vehicle-name">
                RyuGa
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal className="mt-6">
          <Carousel slides={r3Gallery} />
        </Reveal>

        {/* RyuGa の生活手帖：換頁瀏覽 */}
        <div className="container-x mt-16">
          <Reveal>
            <p className="eyebrow">
              <span className="h-px w-6 bg-merlot-500" aria-hidden />
              RyuGa · Life Journal
            </p>
            <h3 className="garage-model-name mt-4">
              RyuGa の生活手帖
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-steel-400">
              改裝、騎乘與最後道別的記錄。
            </p>
          </Reveal>
        </div>

        <div className="container-x mt-8">
          <Reveal>
            <JournalCarousel items={r3Journal} />
          </Reveal>
        </div>

        <div className="container-x mt-24 border-t border-ink-600/60 pt-14">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <p className="eyebrow">
                <span className="h-px w-6 bg-merlot-500" aria-hidden />
                現役車庫 · Current Garage
              </p>
              <span className="font-mono text-[10px] text-steel-500/70">
                2024/05/30 - 至今
              </span>
            </div>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-2">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="garage-model-name">
                  2020 Suzuki GSX-R150
                </h3>
                <span className="font-mono text-[11px] text-steel-500/65">
                  2024/05/30 - 至今 · 788 天
                </span>
              </div>
              <p className="garage-vehicle-name">
                小豆腐
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal className="mt-6">
          <Carousel slides={gsxr150Gallery} />
        </Reveal>

        {/* 小豆腐 生活手帖 大標 */}
        <div className="container-x mt-16">
          <Reveal>
            <p className="eyebrow">
              <span className="h-px w-6 bg-merlot-500" aria-hidden />
              小豆腐 · Life Journal
            </p>
            <h3 className="garage-model-name mt-4">
              小豆腐 の生活手帖
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-steel-400">
              日常とカスタムの記録。
            </p>
          </Reveal>
        </div>

        {/* 小豆腐 の生活手帖：換頁瀏覽 */}
        <div className="container-x mt-8">
          <Reveal>
            <JournalCarousel items={tofuJournal} />
          </Reveal>
        </div>

        <div className="container-x mt-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="garage-model-name">
                  2024 Triumph Daytona 660
                </h3>
                <span className="font-mono text-[11px] text-steel-500/65">
                  2025/01/10 - 至今 · 563 天
                </span>
              </div>
              <p className="garage-vehicle-name">
                Merlot
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal className="mt-6">
          <Carousel slides={daytonaGallery} />
        </Reveal>

        <div id="daytona-360" className="container-x mt-16 scroll-mt-28">
          <Reveal>
            <p className="eyebrow">
              <span className="h-px w-6 bg-merlot-500" aria-hidden />
              Interactive View · Realtime 3D
            </p>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
              <h3 className="garage-model-name">Merlot 3D</h3>
              <span className="font-mono text-[10px] uppercase tracking-label text-steel-500/70">
                Orbit · Zoom · Fullscreen
              </span>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-steel-400">
              依多角度圖面建立的程序化模型；拖曳旋轉、滾輪縮放，自由查看車身結構。
            </p>
          </Reveal>

          <Reveal className="mt-8">
            <Motorcycle360
              frames={daytona660360Frames}
              alt="Triumph Daytona 660 實拍 360 度展示"
              crop
            />

            <div className="mt-12 border-t border-ink-600/60 pt-10">
              <p className="eyebrow">
                <span className="h-px w-6 bg-merlot-500" aria-hidden />
                Procedural 3D Model
              </p>
              <h3 className="garage-model-name mt-4">Daytona 660 3D</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-steel-400">
                以 Daytona 660 車身資料建立的可旋轉程序模型，作為實拍 360 之外的立體參考。
              </p>
              <div className="mt-8">
                <Daytona660ThreeModel />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Merlot 生活札記 大標 */}
        <div className="container-x mt-16">
          <Reveal>
            <p className="eyebrow">
              <span className="h-px w-6 bg-merlot-500" aria-hidden />
              Merlot · Life Journal
            </p>
            <h3 className="garage-model-name mt-4">
              Merlot の生活手帖
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-steel-400">
              ツーリング、試乗レビュー、日常の映像記録。
            </p>
          </Reveal>
        </div>

        {/* Merlot の生活手帖：換頁瀏覽（一次一則，依日期排序） */}
        <div className="container-x mt-8">
          <Reveal>
            <JournalCarousel items={merlotJournal} />
          </Reveal>
        </div>

        <div className="container-x mt-24 border-t border-ink-600/60 pt-14">
          <Reveal>
            <p className="eyebrow">
              <span className="h-px w-6 bg-merlot-500" aria-hidden />
              夢想車庫 · Dream Garage
            </p>
          </Reveal>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {dreamGarage.map((motorcycle, index) => (
              <Reveal key={motorcycle.model} delay={index * 80}>
                <article>
                  <h3 className="garage-model-name">{motorcycle.model}</h3>
                  <div className="mt-6">
                    {motorcycle.frames && motorcycle.imageAlt ? (
                      <Motorcycle360
                        frames={motorcycle.frames}
                        alt={motorcycle.imageAlt}
                        backgroundImage={motorcycle.viewerBackground}
                      />
                    ) : motorcycle.gallery ? (
                      <DreamGarageGallery
                        slides={motorcycle.gallery}
                        initialIndex={motorcycle.initialIndex}
                      />
                    ) : (
                      <div className="blueprint-grid flex aspect-[4/3] items-center justify-center border border-ink-600/30 bg-ink-900/35 [mask-image:radial-gradient(ellipse_96%_92%_at_center,black_64%,transparent_100%)] sm:aspect-[16/11]">
                        <p className="font-mono text-xs uppercase tracking-label text-steel-500">
                          圖片待補 · Image Pending
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
