import type { InterestItem, InterestMemory } from "@/types";

// ============================================================
// 生活與興趣 — Life & Interests 區塊
// 骨架階段：簡短介紹即可，不放大量文字。
// featured: true 的項目（重機）在視覺上稍微突出。
// ============================================================

export const interests: InterestItem[] = [
  {
    title: "重型機車",
    icon: "Bike",
    description: "工作之外最喜歡的事。研究車、也享受在路上的時間。",
    featured: true,
  },
  {
    title: "影片剪輯",
    icon: "Video",
    description: "把片段整理成有節奏的故事。",
  },
  {
    title: "科技產品",
    icon: "Cpu",
    description: "喜歡研究新的科技產品與工具。",
  },
  {
    title: "電腦硬體",
    icon: "HardDrive",
    description: "從規格到組裝都會一頭栽進去研究。",
  },
  {
    title: "咖啡廳",
    icon: "Coffee",
    description: "找一間有感覺的咖啡廳待著、充電。",
  },
  {
    title: "健身與運動",
    icon: "Dumbbell",
    description: "維持狀態，也是轉換心情的方式。",
  },
  {
    title: "視覺設計",
    icon: "PenTool",
    description: "喜歡把資訊與畫面整理得清楚好看。",
  },
  {
    title: "AI 工具",
    icon: "Wand2",
    description: "把 AI 帶進日常與工作流程裡嘗試。",
  },
];

export const interestMemories: InterestMemory[] = [
  {
    src: "/images/CCVS/IMAG0839.jpg",
    alt: "2018 年和家人去沖繩時看見清澈海水的照片",
    width: 1524,
    height: 861,
    eyebrow: "Travel Memory · 沖繩",
    title: "沖繩",
    description: "跟家人在沖繩看見很清澈的海，那時覺得世界很開闊。",
    date: "2018/07/25",
  },
  {
    src: "/images/CCVS/IMAG0014.jpg",
    alt: "高中時期的生活照片",
    width: 1279,
    height: 959,
    eyebrow: "High School Memory · 高中",
    title: "高中",
    description: "高中日常的一張留影，單純、青澀，也很像那段時間的自己。",
    date: "2018/11/13",
  },
  {
    src: "/images/CCVS/IMAG0309.jpg",
    alt: "高中時在學校組無名異端鋼彈",
    width: 1524,
    height: 854,
    eyebrow: "Model Kit Memory · 高中",
    title: "學校裡的鋼彈",
    description: "在學校組無名異端鋼彈，課本之外也有自己的小宇宙。",
    date: "2019/05/13",
  },
  {
    src: "/images/CCVS/IMAG0363.jpg",
    alt: "高中時和職業選手 Gear 的合照",
    width: 4000,
    height: 2240,
    eyebrow: "Esports Memory · 高中",
    title: "Gear 合照",
    description: "高中在活動現場遇到 Gear，像是把螢幕裡的熱血帶到眼前。",
    date: "2019/05/25",
  },
  {
    src: "/images/CYUT/IMAG0693.jpg",
    alt: "大學時候的朝陽科技大學宿舍書桌",
    width: 1524,
    height: 854,
    eyebrow: "Dorm Memory · 大學",
    title: "朝陽宿舍",
    description: "剛到朝陽宿舍，把房間與書桌整理好，也開始練習獨立生活。",
    date: "2019/09/08",
    slides: [
      {
        src: "/images/CYUT/IMAG0693.jpg",
        alt: "大學時候的朝陽科技大學宿舍書桌",
        width: 1524,
        height: 854,
      },
      {
        src: "/images/CYUT/IMAG0694.jpg",
        alt: "大學時候的朝陽科技大學宿舍床位與書桌",
        width: 1524,
        height: 854,
      },
    ],
  },
  {
    src: "/images/CYUT/IMG_0175.jpg",
    alt: "大學時候拿到排球隊背號 19 球衣",
    width: 719,
    height: 959,
    eyebrow: "Volleyball Memory · 大學",
    title: "排球隊球衣",
    description: "終於拿到背號 19 的球衣，那一刻真的有加入隊伍的感覺。",
    date: "2019/12/11",
  },
  {
    src: "/images/CYUT/IMG_0759.jpg",
    alt: "和家人去吃冒煙的喬時的穿搭照片",
    width: 719,
    height: 959,
    eyebrow: "Family Memory · 大學",
    title: "冒煙的喬",
    description: "跟家人吃飯的一天，穿得很有自信，也留下了喜歡的樣子。",
    date: "2020/05/10",
  },
  {
    src: "/images/CYUT/IMG_1692.jpg",
    alt: "迎接 2021 的跨年回憶",
    width: 719,
    height: 959,
    eyebrow: "New Year Memory · 大學",
    title: "2021 跨年",
    description: "迎接 2021 的瞬間，帶著期待把自己推進下一段生活。",
    date: "2021/01/01",
  },
];
