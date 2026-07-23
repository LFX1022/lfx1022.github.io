import { profile } from "@/data/profile";

/**
 * 品牌核心「Leader · Freedom · X」的一致呈現。
 * X 以重點色（金）強調。分隔點與字距讓三個詞清楚但不誇張。
 */
export function BrandMeaning({ className = "" }: { className?: string }) {
  const { pillars } = profile.brand;
  return (
    <span className={className}>
      {pillars.map((p, i) => (
        <span key={p.key}>
          {i > 0 ? <span className="text-steel-500"> · </span> : null}
          <span className={p.key === "X" ? "text-merlot-400" : undefined}>
            {p.key}
          </span>
        </span>
      ))}
    </span>
  );
}
