import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "LFX 辭海｜Leader · Freedom · X",
  description:
    "LFX 辭海是一個記錄個人經歷、BIM 工程、AI 工具、電腦硬體、重型機車、影像創作與生活探索的個人網站。",
  openGraph: {
    title: "LFX 辭海｜Leader · Freedom · X",
    description: profile.brand.statementZh,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body>
        {children}
        {/* GoatCounter 瀏覽統計（無 cookie、注重隱私） */}
        <Script
          data-goatcounter="https://lfx1022.goatcounter.com/count"
          src="https://gc.zencdn.net/count.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
