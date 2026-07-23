# LFX 辭海 · LFX Archive

個人品牌網站 — 單頁式首頁，以「介紹我這個人」為核心。
使用 Next.js 14（App Router）、TypeScript、Tailwind CSS、Lucide Icons。
內容與畫面元件分離，所有個人資料集中在 `data/` 資料夾，方便修改。

---

## 啟動方式

```bash
npm install      # 安裝套件（第一次或換電腦時執行）
npm run dev      # 啟動開發伺服器
```

啟動後打開瀏覽器前往 **http://localhost:3000**。

其他指令：`npm run build`（產生正式版）、`npm run start`（正式版模式，需先 build）。

---

## 首頁區塊順序

1. **Hero** — 以個人介紹為主
2. **About Me** — 我的背景與故事
3. **My Journey** — 個人經歷時間軸
4. **Values** — 我重視的事情與做事方式
5. **Life & Interests** — 重機、影片、科技、電腦硬體與生活興趣
6. **What I Do** — 目前的 BIM / Revit / Dynamo / AI 工具應用（精簡）
7. **Selected Works & Stories** — 少量工程作品、重機紀錄與個人創作
8. **Contact** — 聯絡方式

---

## 專案結構

```
app/
  layout.tsx             # HTML 外框、網站標題、字型變數
  page.tsx               # 首頁：依序組合八個區塊
  globals.css            # 全站樣式、色彩變數、字型設定
components/
  Navbar.tsx / Footer.tsx / SectionHeading.tsx / Reveal.tsx / Icon.tsx
  sections/
    Hero.tsx             # 1. 個人介紹
    AboutMe.tsx          # 2. 關於我
    MyJourney.tsx        # 3. 歷程時間軸
    Values.tsx           # 4. 我重視的事
    LifeInterests.tsx    # 5. 生活與興趣（含重機清單）
    WhatIDo.tsx          # 6. 我在做的事
    SelectedWorks.tsx    # 7. 作品與故事
    Contact.tsx          # 8. 聯絡方式
data/                    # ★ 內容資料，改文字改這裡
  profile.ts             # Hero 文案、個人小標籤、About Me 段落
  journey.ts             # 個人經歷時間軸
  values.ts              # 我重視的事情
  interests.ts           # 生活興趣卡片
  motorcycles.ts         # 重機（擁有 / 夢想車款）
  whatido.ts             # 目前工作內容（精簡）
  works.ts               # 精選作品與故事
  social.ts              # 聯絡方式與社群連結
types/index.ts           # 所有資料的型別定義
public/images/           # ★ 圖片放這裡
```

---

## 要修改內容時，改哪個檔案？

### 文字

- **Hero 文案、個人小標籤（來自 / 現居 / 興趣）、About Me** → `data/profile.ts`
- **經歷時間軸** → `data/journey.ts`（標「待補」的項目把 `detail` 換成實際內容，並把 `placeholder: true` 拿掉）
- **我重視的事** → `data/values.ts`
- **生活興趣卡片** → `data/interests.ts`
- **重機車款（擁有 / 夢想）** → `data/motorcycles.ts`
- **工作內容（What I Do）** → `data/whatido.ts`
- **作品與故事** → `data/works.ts`
- **社群 / 聯絡連結** → `data/social.ts`（目前為 Placeholder，`href` 與 `handle` 換成你的帳號）
- **瀏覽器分頁標題與描述** → `app/layout.tsx` 的 `metadata`
- **上方導覽列項目** → `components/Navbar.tsx` 的 `navLinks`

### 圖片

1. 把圖片放進 `public/images/`（例如 `public/images/daytona.jpg`）。
2. 到對應 data 檔把該筆的 `image` 欄位填成 `"/images/daytona.jpg"`。
   - 作品圖 → `data/works.ts`；重機圖 → `data/motorcycles.ts`
3. `image` 留空字串 `""` 時會自動顯示佔位圖樣式。

### 配色

- 色彩集中在 `tailwind.config.ts`：`ink`（黑 / 深灰）、`steel`（金屬灰）、`merlot`（酒紅重點色）。

---

## 備註

- 目前為個人導向的第一版：單頁首頁，未加入多頁、文章系統、作品內頁或資料庫。
- `journey.ts` 與 `works.ts` 內標示「在此補充…」的項目為刻意保留的 Placeholder，內容確定後再替換。
- 動畫為輕量的捲動進場效果（`Reveal.tsx`），並尊重「減少動態」系統設定。
- 字型使用系統字型堆疊，無需在建置時下載外部字型。
