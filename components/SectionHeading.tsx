import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  /** 區塊代號，例如 "02 / About" */
  eyebrow: string;
  /** 主標題 */
  title: string;
  /** 副說明（可選） */
  description?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <Reveal className="max-w-2xl">
      <p className="eyebrow">
        <span className="h-px w-6 bg-merlot-500" aria-hidden />
        {eyebrow}
      </p>
      <h2 className="text-gold-glow mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-steel-400">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
