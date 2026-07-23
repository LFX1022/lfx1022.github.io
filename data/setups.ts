import type { Setup } from "@/types";

// ============================================================
// 我的電腦 — My Setup 區塊
// 規格來源：使用者提供的配備清單（4070TIS.xlsx）。
// 尚未提供的欄位（散熱、周邊、名稱由來、使用感受）維持「待補」。
// 圖片放 public/images/ 下，於 image 欄位填路徑。
// ============================================================

const TBC = "待補"; // to-be-confirmed

export const setups: Setup[] = [
  {
    name: "泰勒斯",
    role: "台中主力機",
    uses: ["工作", "影片剪輯", "內容創作", "遊戲", "日常主要使用"],
    highlights: [
      "CPU · AMD Ryzen 7 7800X3D",
      "GPU · ROG STRIX RTX 4070 Ti SUPER 16G",
      "MB · ROG STRIX B650-A GAMING WIFI",
    ],
    specs: [
      { label: "CPU", value: "AMD Ryzen 7 7800X3D" },
      { label: "GPU", value: "ROG STRIX RTX 4070 Ti SUPER 16G" },
      { label: "主機板", value: "ROG STRIX B650-A GAMING WIFI" },
      { label: "RAM", value: "Kingston FURY Renegade DDR5 6400 32GB (16GB×2) RGB" },
      { label: "儲存裝置", value: "Kingston FURY Renegade G5 SSD 2TB" },
      { label: "電源供應器", value: "NZXT C850 Gold (ATX 3.1)" },
      {
        label: "散熱",
        value:
          "LIAN LI HydroShift II LCD-S 360N 水冷 · UNI FAN CL Wireless ARGB 120 · DarkFlash DM4 M.2 散熱",
      },
      { label: "機殼", value: "LIAN LI LANCOOL 217 Infinity" },
      { label: "螢幕", value: "Samsung Odyssey G5（2K / 165Hz）" },
      { label: "滑鼠", value: "ZOWIE U2-DW 4K" },
      {
        label: "鍵盤",
        value:
          "Razer Huntsman Mini 60% Optical Gaming Keyboard – Mercury White – Clicky Optical Switch",
      },
      {
        label: "耳機",
        value: "SteelSeries Arctis Nova 7 Wireless Dragon Edition",
      },
    ],
    nameOrigin:
      "泰勒斯的誕生，來自一次很剛好的入手機緣，也來自我對 ROG 硬體的喜歡。那張 RTX 4070 Ti SUPER 不只是效能核心，更像是整台主機的靈魂。\n\n所以這台主機不只是「我的電腦」。\n\n它是泰勒斯，也是我的夥伴。",
    impression:
      "泰勒斯最一開始，其實只是一次單純的升級計畫。\n\n原本只是想更換顯示卡與機殼，讓舊主機繼續陪我工作與創作。後來因為購入聯立水冷，卻發現無法安裝在原本的平台上，這次升級才慢慢變成一次完整重組。\n\n其中最有記憶點的，是那張 ROG Strix RTX 4070 Ti SUPER。買顯卡的那天，我和賣家一邊驗卡、一邊看著台灣打韓國的經典賽，贏的時候還跟賣家在路邊大呼小叫，超鬧的。那原本只是一次普通面交，卻因為當下的氣氛，變成了很難忘的一段回憶。\n\n也因為這些過程，泰勒斯對我來說不只是硬體規格，而是一台帶著故事誕生的主力機。",
    memories: [
      {
        image: "/images/COMPUTER/IMG_3966.jpg",
        hotspot: {
          x: 36,
          y: 50.5,
          width: 61,
          height: 25,
          label: "GPU / RTX 4070 Ti SUPER",
          specLabel: "GPU",
          scope: "component",
        },
        title: "顯卡到手",
        description: "把 ROG Strix RTX 4070 Ti SUPER 帶回來的那天。",
      },
      {
        image: "/images/COMPUTER/IMG_3971.jpg",
        hotspot: { x: 50, y: 46, width: 76, height: 58, label: "裸機測試階段", scope: "system" },
        title: "先裸測再說",
        description: "舊機殼塞不下，只好先直接裸測。",
      },
      {
        image: "/images/COMPUTER/IMG_3984.jpg",
        hotspot: { x: 50, y: 46, width: 76, height: 58, label: "完整組裝", scope: "system" },
        title: "一起把它搞定",
        description: "兩個弟弟幫我一起處理主機。",
      },
      {
        image: "/images/COMPUTER/IMG_3991.jpg",
        hotspot: {
          x: 38,
          y: 43,
          width: 20,
          height: 8,
          label: "SSD / M.2 裝甲下方",
          specLabel: "儲存裝置",
          scope: "component",
        },
        title: "AI 硬體漲價潮",
        description:
          "在 AI 硬體大漲時頭洗下去投資 SSD，沒想到現在漲得更多。",
      },
      {
        image: "/images/COMPUTER/IMG_4066.JPG",
        hotspot: {
          x: 49,
          y: 35,
          width: 12,
          height: 25,
          label: "RAM / DDR5",
          specLabel: "RAM",
          scope: "component",
        },
        title: "一起入手的記憶體",
        description: "也是在那個時候一起入場的記憶體。",
      },
      {
        image: "/images/COMPUTER/IMG_4093.JPG",
        hotspot: {
          x: 45,
          y: 42,
          width: 55,
          height: 48,
          label: "MB / B650-A",
          specLabel: "主機板",
          scope: "component",
        },
        title: "最後一塊拼圖",
        description: "本來是要 B850，但 B650-A 的銀白裝甲感真的好讚。",
      },
    ],
    finale: {
      video: "/images/COMPUTER/IMG_4147.mp4",
      poster: "/images/COMPUTER/IMG_4147-poster.jpg",
      label: "07 / Power On",
      title: "第一次亮機",
      description: "所有零件就位，泰勒斯正式亮相。",
    },
    image: "/images/COMPUTER/IMG_4571.JPG",
  },
  {
    name: "艾克斯",
    role: "高雄副機",
    uses: ["回高雄時使用", "備用工作", "遊戲", "日常娛樂"],
    highlights: [
      "CPU · Intel Core i7-9700",
      "GPU · ROG STRIX RX 6650 XT V2 OC 8GB",
      "MB · ROG STRIX Z390-F GAMING",
    ],
    specs: [
      { label: "CPU", value: "Intel Core i7-9700" },
      { label: "GPU", value: "ROG Strix Radeon RX 6650 XT V2 OC Edition 8GB GDDR6" },
      { label: "主機板", value: "ROG STRIX Z390-F GAMING" },
      { label: "RAM", value: "ADATA DDR4 2666 8G×4（32GB）" },
      { label: "儲存裝置", value: "Kingston SA400S37 480G + 240G" },
      { label: "電源供應器", value: "EVGA SuperNOVA 550 G2 80+ Gold" },
      { label: "散熱", value: TBC, placeholder: true },
      { label: "機殼", value: "Ainar 艾納爾 R11W 白色機殼" },
      { label: "螢幕", value: "ASUS TUF Gaming VG259Q5A" },
      {
        label: "滑鼠",
        value: "Logitech G PRO Wireless Gaming Mouse – League of Legends Edition",
      },
      {
        label: "鍵盤",
        value: "MONTECH MKey PRO 75% Tri-Mode Mechanical Keyboard",
      },
    ],
    nameOrigin: "名稱由來待補",
    impression: "主機回憶待補",
    image: "/images/COMPUTER/6650XT.JPG?v=20260720-095422",
  },
];

export const computerJournal = {
  title: "電腦の手帖",
  entries: [
    {
      image: "/images/COMPUTER/IMG_4462.JPG",
      alt: "電腦の手帖：桌面上的 ROG 顯示卡紀錄",
      caption: "兩位新夥伴的合照，請多指教嚕",
      aspect: "3 / 4",
      wide: false,
    },
    {
      image: "/images/COMPUTER/IMG_4094.JPG",
      alt: "電腦の手帖：兩張不同世代的主機板",
      caption: "主機板世代交替",
      aspect: "4 / 3",
      wide: true,
    },
  ],
};
