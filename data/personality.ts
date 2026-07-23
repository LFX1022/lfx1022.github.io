import type { PersonalityGroup } from "@/types";

// ============================================================
// 個性與展望 — Personality & Outlook 區塊
// 骨架階段：只放 placeholder，內容由你之後親自填。
// 刻意不預設任何個性或展望文字，也不放企業價值觀式的制式內容。
// ============================================================

export const personality: PersonalityGroup[] = [
  {
    heading: "我的個性",
    headingEn: "Personality",
    icon: "UserRound",
    items: [
      { title: "個性內容待補", description: "在此補充你的個性特質。", placeholder: true },
      { title: "思考方式待補", description: "在此補充你的思考方式。", placeholder: true },
      { title: "做事風格待補", description: "在此補充你的做事風格。", placeholder: true },
    ],
  },
  {
    heading: "未來展望",
    headingEn: "Outlook",
    icon: "Compass",
    items: [
      { title: "短期方向待補", description: "在此補充短期想做的事。", placeholder: true },
      { title: "中期目標待補", description: "在此補充中期的目標。", placeholder: true },
      { title: "未來展望待補", description: "在此補充更長遠的展望。", placeholder: true },
    ],
  },
];
