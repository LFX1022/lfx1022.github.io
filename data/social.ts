import type { SocialLink } from "@/types";

// ============================================================
// 聯絡方式與社群連結 — Contact 區塊
// 尚未設定的連結請保持 href: null → 介面會顯示「尚未設定」且不可點擊。
// 已設定的會變成可點擊超連結（http 連結會開新分頁，mailto 會開郵件）。
// ============================================================

export const socialLinks: SocialLink[] = [
  {
    label: "Email",
    icon: "Mail",
    href: "mailto:QAZ891022319@gmail.com",
    handle: "QAZ891022319@gmail.com",
  },
  {
    label: "Instagram",
    icon: "Instagram",
    href: "https://www.instagram.com/lfx1022/",
    handle: "@lfx1022",
  },
  {
    label: "YouTube",
    icon: "Youtube",
    href: "https://www.youtube.com/@theLFX3357",
    handle: "the LFX",
  },
  {
    label: "LINE",
    icon: "MessageCircle",
    href: "https://line.me/ti/p/MXBfzUj3J-",
    handle: "李璁璁",
  },
];
