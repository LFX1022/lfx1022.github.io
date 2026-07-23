import type { Profile } from "@/types";

// ============================================================
// 個人資料 — Hero 與 About Me 區塊
// 品牌文字集中在 brand 物件，Navbar / Hero / About / Footer 皆從這裡讀取。
// About 只使用已確認適合公開的內容；私人背景不得直接寫入此檔。
// ============================================================

export const profile: Profile = {
  nameZh: "LFX 辭海",
  nameEn: "LFX Archive",

  // ---- LFX 辭海 品牌核心（正式文字，請勿改寫成企業口號）----
  brand: {
    name: "LFX 辭海",
    englishName: "LFX Archive",
    meaning: "Leader · Freedom · X",
    pillars: [
      {
        key: "Leader",
        description: "主導自己的方向、做出自己的選擇，不只是跟隨既定道路。",
      },
      {
        key: "Freedom",
        description:
          "對自由的崇尚，重視獨立思考、選擇與表達，不讓自己被單一框架、身分或既定道路限制。",
      },
      {
        key: "X",
        description: "探索、經歷、表達、不同領域的交會，以及尚未被定義的未來。",
      },
    ],
    xMeaning: "探索、經歷、表達，以及尚未被定義的未來。",
    statementZh: "主導自己的方向，崇尚思想與選擇的自由，持續探索尚未定義的可能。",
    statementEn: "LFX — Leader, Freedom, and the Unknown X.",
    tagline: "Leader, Freedom, and the Unknown X.",
    aboutZh: [
      "LFX 代表 Leader、Freedom 與 X。Leader 是主導自己的方向，並為自己的選擇負責；Freedom 是對自由的崇尚，重視獨立思考、選擇與表達，不讓自己被單一框架定義；而 X 則代表探索、經歷、表達，以及尚未被定義的未來。",
      "LFX 辭海，是我用來持續累積個人經歷、工作、興趣、作品與生活紀錄的地方。",
    ],
    aboutEn: "LFX — Leader, Freedom, and the Unknown X.",
    personalityIntro:
      "Leader、Freedom 與 X，也代表我如何理解自己的選擇、方向與未來。",
  },

  // ---- Hero 文案 ----
  heroLines: ["嗨，我是 LFX。"],
  heroSub: [
    "一個喜歡研究工程、設計、科技與重機的人。",
    "這裡記錄我的經歷、工作、興趣、設備，以及一路累積下來的故事。",
  ],

  // Hero 下方的個人小標籤
  quickFacts: [
    { label: "來自", value: "高雄" },
    { label: "現居", value: "台中" },
    { label: "興趣", value: "重機 · 影像 · 科技" },
  ],

  // About 第二層閱讀內容
  about: [
    {
      label: "01 / 我是誰",
      content:
        "我是 LFX，一名從事 BIM 工程應用的工作者，也是一個持續用工程、科技與生活經驗理解世界的人。這個網站先介紹我這個人，再談工作、興趣與作品。",
      placeholder: false,
    },
    {
      label: "02 / 我如何思考與做事",
      content:
        "我習慣先理解結構、邏輯與真正原因，再開始動手。面對複雜或混亂的資訊，我會拆解關係、重新整理，讓它變成清楚而且可以執行的方法；也願意重新檢視既有做法，尋找更有效率的路徑。",
      placeholder: false,
    },
    {
      label: "03 / 工作與 BIM",
      content:
        "BIM 是我工作的核心工具之一。我透過 Revit、Dynamo 與工程資訊整理，把圖說、模型和問題之間的關係說清楚。專業是生活的一部分，但不會成為定義我的唯一標籤。",
      placeholder: false,
    },
    {
      label: "04 / 工作之外的重機、電腦與影像",
      content:
        "重機讓我感受機械、設計與選擇；電腦是工作、遊戲和創作的工具；影像則把稍縱即逝的過程留下來。這些興趣不是彼此分開的清單，而是我建立生活與表達自己的不同方式。",
      placeholder: false,
    },
    {
      label: "05 / 為什麼建立 LFX 辭海",
      content:
        "我想把一路累積的工作、興趣、作品、選擇與想法留下一個清楚的位置。",
      placeholder: false,
    },
  ],
};

export const aboutSection = {
  eyebrow: "ABOUT LFX",
  title: ["我用自己的方式，", "理解世界，也建立生活。"],
  intro: [
    "我是 LFX，一名從事 BIM 工程應用的工作者。",
    "工作之外，我透過重機、電腦與影像創作，記錄自己如何思考、選擇與持續前進。",
  ],
  keywords: [
    { index: "01", label: "Freedom", note: "為自己的方向做選擇" },
    { index: "02", label: "Efficiency", note: "把複雜變成可執行" },
    { index: "03", label: "Structure", note: "先理解結構與真正原因" },
    { index: "04", label: "Challenge", note: "重新檢視既有方法" },
  ],
  quote: "源於初心之助人，即為至善之正義。",
  storyClosing: "這裡不是成就的陳列，而是一座由我親手建立、收藏人生軌跡的博物館。",
  image: {
    src: "/images/motorcycles/daytona660/66008093.jpeg",
    alt: "LFX 的重機生活影像",
    label: "LIFE IN MOTION / LFX ARCHIVE",
  },
  cta: "閱讀完整故事",
} as const;
