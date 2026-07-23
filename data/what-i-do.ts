import type { WhatIDoCategory } from "@/types";

// ============================================================
// 目前在做的事 — What I Do 區塊
// 精簡成三個分類，不做成大量技能履歷、不堆專業術語。
// ============================================================

export const whatIDo: WhatIDoCategory[] = [
  {
    title: "BIM 與工程",
    titleEn: "BIM & Engineering",
    icon: "Boxes",
    items: ["Revit 建模", "工程圖說判讀", "模型整合與衝突檢討"],
  },
  {
    title: "自動化與 AI 工具",
    titleEn: "Automation & AI",
    icon: "Workflow",
    items: ["Dynamo", "工作流程優化", "AI 輔助資料整理與內容製作"],
  },
  {
    title: "影像與內容",
    titleEn: "Media & Content",
    icon: "Video",
    items: ["影片剪輯", "視覺整理", "個人內容創作"],
  },
];
