// ============================================================
// 全站共用型別定義
// 修改資料時請對照這裡的欄位，確保 data/ 內容型別正確
// ============================================================

/** 品牌支柱：Leader / Freedom / X */
export interface BrandPillar {
  key: string;
  description: string;
}

/** LFX 辭海 品牌核心設定（集中管理，供 Navbar/Hero/About/Footer 讀取） */
export interface Brand {
  /** 品牌正式名稱：LFX 辭海 */
  name: string;
  /** 英文輔助名稱：LFX Archive */
  englishName: string;
  /** 品牌核心：Leader · Freedom · X */
  meaning: string;
  /** 三個支柱與說明 */
  pillars: BrandPillar[];
  /** X 的解釋 */
  xMeaning: string;
  /** 中文品牌句 */
  statementZh: string;
  /** 英文品牌句 */
  statementEn: string;
  /** 簡短英文標語 */
  tagline: string;
  /** About 內「關於 LFX」段落（每個元素一段） */
  aboutZh: string[];
  /** About 內英文輔助小字 */
  aboutEn: string;
  /** 個性與展望區塊開頭的品牌銜接句 */
  personalityIntro: string;
}

/** 個人基本資料（Hero 與 About Me 使用） */
export interface Profile {
  nameZh: string;
  nameEn: string;
  /** 品牌核心設定 */
  brand: Brand;
  /** Hero 主文案（每個元素為一行） */
  heroLines: string[];
  /** Hero 副文案 */
  heroSub: string[];
  /** Hero 下方的個人小標籤 */
  quickFacts: { label: string; value: string }[];
  /** About Me 各欄位（骨架階段多為 placeholder，之後再補） */
  about: AboutField[];
}

/** About Me 的單一欄位 */
export interface AboutField {
  /** 欄位標題，例如「成長與求學背景」 */
  label: string;
  /** 內容；未填時放 placeholder 文字並把 placeholder 設為 true */
  content: string;
  placeholder?: boolean;
}

interface JourneyImageBase {
  alt: string;
  width: number;
  height: number;
  caption?: string;
  layout?: "inline" | "grid" | "standalone";
  mediaType?: "image" | "video";
}

/** 個人經歷故事中可公開顯示的照片 */
export interface JourneyPhoto extends JourneyImageBase {
  src: string;
  placeholder?: never;
}

/** 尚無可公開授權圖片時保留的文字版位 */
export interface JourneyImagePlaceholder extends JourneyImageBase {
  src?: never;
  placeholder: string;
}

export type JourneyImage = JourneyPhoto | JourneyImagePlaceholder;

/** 個人經歷完整故事中的一個段落 */
export interface JourneyStorySection {
  /** 段落標題 */
  heading: string;
  /** 段落內文；每個元素為一段 */
  paragraphs: string[];
  /** 可選圖片清單，放在 public/images/ 下 */
  images?: JourneyImage[];
}

/** 個人經歷時間軸項目（My Journey 使用） */
export interface JourneyItem {
  /** 穩定識別碼，使用英文 kebab-case */
  id: string;
  /** 年份或階段；未確認精確年份時使用階段字樣 */
  period: string;
  /** 分類，例如「成長」「建築」「BIM」「方法」 */
  category: string;
  /** 首頁短標題 */
  title: string;
  /** 首頁第一層摘要 */
  summary: string;
  /** 首頁時間軸直接顯示的照片 */
  previewImage?: JourneyPhoto;
  /** 第二層完整故事 */
  story: JourneyStorySection[];
  /** 可選主圖路徑，放在 public/images/ 下 */
  image?: string;
  /** 是否為待補內容 */
  placeholder?: boolean;
}

/** 個性與展望的單一項目（Personality & Outlook 使用） */
export interface TraitItem {
  title: string;
  description: string;
  placeholder?: boolean;
}

/** 個性與展望的分組 */
export interface PersonalityGroup {
  /** 分組標題：我的個性 / 未來展望 */
  heading: string;
  /** 分組英文小標 */
  headingEn: string;
  icon: IconName;
  items: TraitItem[];
}

/** 生活與興趣項目（Life & Interests 使用） */
export interface InterestItem {
  title: string;
  description: string;
  icon: IconName;
  /** 是否為重點興趣（視覺上稍微突出，例如重機） */
  featured?: boolean;
}

/** 電腦設備規格欄位（My Setup 使用） */
export interface SpecField {
  /** 欄位名稱，例如 CPU、GPU、主機板… */
  label: string;
  /** 值；未確認時填「詳細配備待補」並把 placeholder 設為 true */
  value: string;
  placeholder?: boolean;
}

/** 主機誕生或使用過程中的一個照片片段 */
export interface SetupMemory {
  image: string;
  title: string;
  description: string;
  date?: string;
  hotspot?: {
    /** Position on the main setup image, expressed as a percentage. */
    x: number;
    y: number;
    width?: number;
    height?: number;
    /** Optional freeform outline using SVG polygon points in image percentages. */
    polygon?: string;
    label: string;
    specLabel?: string;
    scope?: "component" | "system";
  };
}

/** 主機組裝流程最後的影片節點 */
export interface SetupFinale {
  video: string;
  poster: string;
  label: string;
  title: string;
  description: string;
}

/** 一台電腦設備（My Setup 使用） */
export interface Setup {
  /** 電腦名稱，例如「泰勒斯」 */
  name: string;
  /** 定位，例如「台中主力機」 */
  role: string;
  /** 主要用途清單 */
  uses: string[];
  /** 精簡重點規格（已確認的幾項，卡片正面顯示） */
  highlights: string[];
  /** 完整規格欄位（可展開區塊） */
  specs: SpecField[];
  /** 名稱由來（可選，未填放 placeholder） */
  nameOrigin?: string;
  /** 使用感受（可選） */
  impression?: string;
  /** 主機故事的照片片段（可選，依時間順序顯示） */
  memories?: SetupMemory[];
  /** 主機組裝流程的收尾影片（可選） */
  finale?: SetupFinale;
  /** 圖片路徑，放在 public/images/ 下（可選） */
  image?: string;
}

/** 目前在做的事：單一分類（What I Do 使用） */
export interface WhatIDoCategory {
  title: string;
  titleEn: string;
  icon: IconName;
  /** 該分類下的重點項目 */
  items: string[];
}

/** 卡片內的單一媒體（影片 / GIF / 圖片皆可，依副檔名自動判斷） */
export interface StoryMedia {
  /** 檔案路徑，放在 public/images/ 下。.mp4/.webm/.mov 當影片，.gif 保留動畫，其餘當圖片 */
  src: string;
  /** 可選：顯示在該媒體上的說明文字 */
  caption?: string;
}

/** 作品與紀錄卡片可展開的獨立圖鑑內容 */
export interface StoryArchive {
  /** 公開靜態 HTML 路徑，展開後才載入 */
  src: string;
  /** 卡片按鈕文字 */
  label: string;
  /** 展開面板上方的英文分類 */
  eyebrow: string;
  /** iframe 的可存取標題 */
  frameTitle: string;
  /** 主站入口使用的縮圖 */
  previewImage?: {
    src: string;
    alt: string;
  };
}

/** 作品與紀錄卡片（Selected Works & Stories 使用） */
export interface Story {
  index: string;
  title: string;
  /** 類型：工程 / 自動化 / 重機 / 硬體 / 影像 / 創作 / 生活 */
  type:
    | "engineering"
    | "automation"
    | "motorcycle"
    | "hardware"
    | "video"
    | "creation"
    | "life"
    | "archive";
  /** 分類顯示文字 */
  category: string;
  description: string;
  tags: string[];
  /** 多媒體清單：依序顯示多段動畫 / 圖片（優先於 video / image） */
  media?: StoryMedia[];
  /** 影片路徑，放在 public/images/ 下（可選；單一媒體用） */
  video?: string;
  /** 圖片路徑，放在 public/images/ 下（可選；單一媒體用） */
  /** 可選的第二層圖鑑；主站只顯示入口，展開後才載入完整內容 */
  archive?: StoryArchive;
  image?: string;
}

/** 社群 / 聯絡連結（Contact 使用） */
export interface SocialLink {
  label: string;
  icon: IconName;
  /** 連結網址或 mailto:；尚未設定時填 null，介面會顯示「尚未設定」且不可點擊 */
  href: string | null;
  /** 顯示用的帳號 / 說明文字；尚未設定時可留空 */
  handle?: string;
}

/**
 * 允許使用的 Lucide 圖示名稱。
 * 若要新增圖示，先在此加入名稱，再到 components/Icon.tsx 補上對應。
 */
export type IconName =
  | "MapPin"
  | "GraduationCap"
  | "Route"
  | "Target"
  | "Compass"
  | "Sparkles"
  | "UserRound"
  | "Bike"
  | "Video"
  | "Cpu"
  | "HardDrive"
  | "Coffee"
  | "Dumbbell"
  | "PenTool"
  | "Wand2"
  | "Boxes"
  | "Workflow"
  | "MonitorSmartphone"
  | "Mail"
  | "Github"
  | "Instagram"
  | "Youtube"
  | "Linkedin"
  | "MessageCircle"
  | "ChevronLeft"
  | "ChevronRight";
