import type { Metadata } from "next";
import { DaytonaArchive } from "@/components/DaytonaArchive";

export const metadata: Metadata = {
  title: "Triumph Daytona 仿賽年代圖鑑｜1991—2026",
  description:
    "從 Daytona 750 / 1000、T595、955i、TT600、675、Moto2 765 到 Daytona 660 的查證式年代圖鑑。",
};

export default function Home() {
  return <DaytonaArchive />;
}
