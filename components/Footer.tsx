import { profile } from "@/data/profile";
import { BrandMeaning } from "@/components/BrandMeaning";
import { ViewCounter } from "@/components/ViewCounter";

export function Footer() {
  const { brand } = profile;
  return (
    <footer className="border-t border-ink-600/70">
      <div className="container-x flex flex-col items-start justify-between gap-4 py-10 sm:flex-row sm:items-end">
        <div>
          <p className="text-base font-semibold tracking-wide text-steel-200">
            <span className="font-mono">LFX</span> 辭海
          </p>
          <BrandMeaning className="mt-1.5 block font-mono text-[11px] tracking-label text-steel-500" />
        </div>
        <div className="flex flex-col gap-1.5 sm:items-end sm:text-right">
          <p className="font-mono text-xs tracking-wide text-steel-500">
            {brand.tagline}
          </p>
          <ViewCounter />
        </div>
      </div>
    </footer>
  );
}
