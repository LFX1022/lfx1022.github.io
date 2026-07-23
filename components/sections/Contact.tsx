import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { socialLinks } from "@/data/social";

/**
 * Contact 做成深炭灰「量體」色塊（呼應照片裡的電視櫃 / 深門片），
 * 深底配淺字，並以暖金 LED 細線收邊，形成與上方水泥灰區塊的色塊對比。
 */
export function Contact() {
  return (
    <section id="contact" className="scroll-mt-28 pb-24 pt-16 sm:pb-32 sm:pt-24">
      <div className="container-x">
        <div className="surface-coal relative overflow-hidden rounded-xl border border-coal-700 p-8 sm:p-12">
          {/* 上緣暖金 LED 燈帶 */}
          <div className="led-line pointer-events-none absolute inset-x-0 top-0" aria-hidden />

          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            {/* 標題（深底淺字版） */}
            <Reveal className="max-w-md">
              <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-label text-merlot-500">
                <span className="h-px w-6 bg-merlot-500" aria-hidden />
                07 / Contact
              </p>
              <h2 className="text-gold-glow mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                聯絡方式
              </h2>
              <p className="mt-4 text-base leading-relaxed text-chalk-300">
                想聊聊工作、重機、科技，或任何合作，都歡迎找我。（連結陸續設定）
              </p>
            </Reveal>

            <Reveal>
              <ul className="divide-y divide-coal-700 overflow-hidden rounded-md border border-coal-700 bg-coal-800/60">
                {socialLinks.map((link) => {
                  const isSet = Boolean(link.href);
                  const inner = (
                    <>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-coal-600 bg-coal-900 text-chalk-300 transition-colors group-hover:border-merlot-500 group-hover:text-merlot-500">
                        <Icon name={link.icon} className="h-5 w-5" />
                      </span>
                      <span className="flex-1">
                        <span className="block font-mono text-[10px] uppercase tracking-label text-chalk-400">
                          {link.label}
                        </span>
                        <span
                          className={`block text-sm ${
                            isSet ? "text-chalk-200" : "italic text-chalk-400/70"
                          }`}
                        >
                          {isSet ? link.handle ?? link.href : "尚未設定"}
                        </span>
                      </span>
                      {isSet ? (
                        <ArrowUpRight
                          size={16}
                          className="text-chalk-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-chalk-100"
                        />
                      ) : null}
                    </>
                  );

                  return (
                    <li key={link.label}>
                      {isSet ? (
                        <a
                          href={link.href as string}
                          target={link.href!.startsWith("http") ? "_blank" : undefined}
                          rel={
                            link.href!.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-coal-700/70"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div
                          aria-disabled="true"
                          className="group flex cursor-default items-center gap-4 px-5 py-4 opacity-70"
                        >
                          {inner}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
