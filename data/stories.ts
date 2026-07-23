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
    title: "工程模型與施工動畫",
    type: "engineering",
    category: "施工動畫",
    description: "Revit 建模與施工動畫的紀錄。內容待補。",
    tags: ["Revit", "施工動畫"],
    // 依序顯示：002 在前、001 在後（左右並排）
    media: [
      { src: "/images/BIM/002.mp4", caption: "國一甲支撐先進工法" },
      { src: "/images/BIM/001.mp4", caption: "布袋商港聯外道路新闢工程 懸臂工法" },
    ],
  },
  {
    index: "02",
    title: "Dynamo 與 AI 工作流程",
    type: "automation",
    category: "自動化 · AI",
    description: "用 Dynamo 與 AI 工具優化工作流程的紀錄。內容待補。",
    tags: ["Dynamo", "AI"],
    image: "",
  },
  {
    index: "03",
    title: "重機騎乘與保養紀錄",
    type: "motorcycle",
    category: "重機 · 生活",
    description: "騎乘、路線與保養的紀錄。內容待補。",
    tags: ["Daytona 660", "紀錄"],
    image: "",
  },
  {
    index: "04",
    title: "電腦設備與內容創作",
    type: "hardware",
    category: "硬體 · 創作",
    description: "電腦設備與影像 / 內容創作的紀錄。內容待補。",
    tags: ["硬體", "創作"],
    image: "",
  },
];
