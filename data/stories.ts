import type { Story } from "@/types";

// ============================================================
// 作品與紀錄 — Selected Works & Stories 區塊
// 更廣義的內容：未來會混合工程、Dynamo、重機、硬體、影片、創作、生活。
// 每張卡片都有 type / category 分類，不要全部當成工程專案。
// image 留空字串會顯示對應類型的佔位樣式。
// ============================================================

export const stories: Story[] = [
  {
    index: "01",
    title: "國道一號甲線專案",
    type: "engineering",
    category: "施工動畫",
    description: "國道一號甲線專案的 Revit 建模與施工動畫紀錄。內容待補。",
    tags: ["Revit", "施工動畫", "國一甲"],
    media: [
      { src: "/images/BIM/國一甲_主線跨台15懸臂工法.mp4", caption: "國一甲 主線跨台 15 懸臂工法" },
      { src: "/images/BIM/國一甲_八支線場撐工法R.mp4", caption: "國一甲 八線場撐工法" },
      { src: "/images/BIM/國一甲_主線支撐先進工法 短片MK-05.mp4", caption: "國一甲 主線支撐先進工法" },
      { src: "/images/BIM/自動化節塊推進MK-04.mp4", caption: "國一甲 自動化節塊推進工法" },
    ],
  },
  {
    index: "02",
    title: "布袋商港新闢工程",
    type: "engineering",
    category: "施工動畫",
    description: "布袋商港新闢工程與相關施工動畫紀錄。內容待補。",
    tags: ["Revit", "施工動畫", "布袋商港"],
    media: [
      { src: "/images/BIM/001.mp4", caption: "布袋商港聯外道路新闢工程 懸臂工法" },
      { src: "/images/BIM/01.gif", caption: "布袋港外港填區圍堤工程" },
    ],
  },
  {
    index: "03",
    title: "Dynamo 與 AI 工作流程",
    type: "automation",
    category: "自動化 · AI",
    description: "用 Dynamo 與 AI 工具優化工作流程的紀錄。內容待補。",
    tags: ["Dynamo", "AI"],
    image: "",
  },
  {
    index: "04",
    title: "重機騎乘與保養紀錄",
    type: "motorcycle",
    category: "重機 · 生活",
    description: "騎乘、路線與保養的紀錄。內容待補。",
    tags: ["Daytona 660", "紀錄"],
    image: "",
  },
  {
    index: "05",
    title: "電腦設備與內容創作",
    type: "hardware",
    category: "硬體 · 創作",
    description: "電腦設備與影像 / 內容創作的紀錄。內容待補。",
    tags: ["硬體", "創作"],
    image: "",
  },
  {
    index: "06",
    title: "Triumph Daytona 仿賽年代圖鑑",
    type: "archive",
    category: "興趣圖鑑 · Triumph",
    description: "從 Hinckley Daytona、T595／955i、675、Moto2 765 到 Daytona 660，依平台、引擎與歷史定位整理車系演進。",
    tags: ["Triumph", "Daytona", "15 Nodes"],
    archive: {
      src: "/archives/triumph-daytona-archive/index.html",
      label: "展開圖鑑",
      eyebrow: "INTEREST ARCHIVE · TRIUMPH",
      frameTitle: "Triumph Daytona 仿賽年代圖鑑",
      previewTitle: "15 Nodes",
      previewImage: {
        src: "/archives/triumph-daytona-archive/images/models/daytona-official-archive.jpg",
        alt: "Triumph Daytona 675 官方歷史影像",
      },
    },
  },
  {
    index: "07",
    title: "Ducati 仿賽與道路跑車圖鑑",
    type: "archive",
    category: "興趣圖鑑 · Ducati",
    description: "整理 Ducati V2、V4 仿賽主線與 SuperSport 公路運動支線，避免把不同定位車款混在同一條接班線。",
    tags: ["Ducati", "V2 / V4", "52 Models"],
    archive: {
      src: "/archives/ducati/index.html",
      label: "展開圖鑑",
      eyebrow: "INTEREST ARCHIVE · DUCATI",
      frameTitle: "Ducati 仿賽與道路跑車年代圖鑑",
      previewTitle: "52 Models",
      previewImage: {
        src: "/images/motorcycles/panigale-v2/ducati-introduces-white-livery-for-the-panigale-v2.webp",
        alt: "Ducati Panigale V2 白色車款預覽",
      },
    },
  },
  {
    index: "08",
    title: "Ultraman 整合圖鑑",
    type: "archive",
    category: "興趣圖鑑 · Ultraman",
    description: "依年代整理 53 位 Ultraman 角色的個人興趣圖鑑。主站只保留入口，完整內容在展開後閱讀。",
    tags: ["Ultraman", "53 Heroes", "興趣紀錄"],
    archive: {
      src: "/archives/ultraman/index.html",
      label: "展開更多",
      eyebrow: "INTEREST ARCHIVE · ULTRAMAN",
      frameTitle: "Ultraman 53 位英雄年代圖鑑",
      previewTitle: "53 Heroes",
      previewImage: {
        src: "/images/archives/ultraman-first-pattern.png",
        alt: "初代超人力霸王胸前紅銀紋路與彩色計時器",
      },
    },
  },
];
