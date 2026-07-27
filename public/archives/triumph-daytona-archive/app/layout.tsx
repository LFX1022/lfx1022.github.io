import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Triumph Daytona 仿賽年代圖鑑",
    template: "%s｜Triumph Daytona Archive",
  },
  description:
    "一份依照平台、引擎、底盤與歷史定位整理的 Triumph Daytona 年代圖鑑。",
  icons: {
    icon: "/archives/triumph-daytona-archive/favicon.svg",
    shortcut: "/archives/triumph-daytona-archive/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
