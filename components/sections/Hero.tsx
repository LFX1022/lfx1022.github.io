import { ArrowDown } from "lucide-react";
import { profile } from "@/data/profile";
import { BrandMeaning } from "@/components/BrandMeaning";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      {/* 微水泥牆的柔和層次 */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/30 via-transparent to-ink-950"
        aria-hidden
      />
      {/* 暖金 LED 燈帶：像照片牆上那道間接光，橫貫上緣 */}
      <div
        className="led-line pointer-events-none absolute left-0 right-0 top-28 z-[1]"
        aria-hidden
      />
      {/* LFX 字標浮水印：放在右側，壓低透明度並柔化邊緣，不干擾左側文字 */}
      <div
        className="pointer-events-none absolute right-[2%] top-[58%] hidden aspect-square h-[76vh] max-h-[860px] -translate-y-1/2 bg-center bg-no-repeat lg:block"
        style={{
          backgroundImage: "url(/images/logo-faded.png)",
          backgroundSize: "contain",
          opacity: 0.55,
        }}
        aria-hidden
      />

      <div className="container-x relative z-10 py-24">
        <div className="max-w-3xl animate-fade-up">
          {/* 品牌小字：Leader · Freedom · X（X 以重點色強調） */}
          <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-label">
            <span className="h-px w-8 bg-merlot-500" aria-hidden />
            <BrandMeaning className="text-steel-400" />
          </p>

          {/* 以個人介紹為主的主文案 */}
          <h1 className="text-gold-glow mt-6 text-4xl font-semibold leading-[1.2] tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.2]">
            {profile.heroLines.map((line, i) => (
              <span key={i} className={i === 0 ? "block" : "mt-1 block"}>
                {line}
              </span>
            ))}
          </h1>

          {/* 說明（較大） + 補充（較小） */}
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-steel-300">
            {profile.heroSub[0]}
          </p>
          {profile.heroSub[1] ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-400">
              {profile.heroSub[1]}
            </p>
          ) : null}

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-sm bg-merlot px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-merlot-600"
            >
              認識我
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-sm border border-ink-600 px-6 py-3 text-sm font-medium text-steel-300 transition-colors hover:border-steel-500 hover:text-steel-100"
            >
              聯絡我
            </a>
          </div>

          {/* 品牌句（次要文字，較下方） */}
          <p className="mt-10 max-w-xl border-l-2 border-merlot-500/60 pl-4 text-sm leading-relaxed text-steel-400">
            {profile.brand.statementZh}
          </p>

          {/* 個人資料條 */}
          <dl className="mt-12 grid max-w-lg grid-cols-2 gap-x-8 gap-y-4 border-t border-ink-600 pt-8 sm:grid-cols-3">
            {profile.quickFacts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-[10px] uppercase tracking-label text-steel-500">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm text-steel-200">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-label text-steel-500 transition-colors hover:text-steel-300 sm:flex"
      >
        Scroll
        <ArrowDown size={14} className="animate-bounce" />
      </a>
    </section>
  );
}
