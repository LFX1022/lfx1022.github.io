# Triumph 凱旋仿賽車款年代圖鑑

以 Triumph Daytona 與中量級仿賽發展為主題的獨立圖鑑網站。內容分為主年代時間軸與限量／特殊版本，單純換色不另算一個世代。

## 本機執行

需要 Node.js 22.13 或更新版本。

```powershell
npm install
npm run dev
```

終端機會顯示預覽網址，通常是 `http://localhost:3000`。

正式建置與預覽：

```powershell
npm run build
npm run start
```

## 修改內容

- 車款年份、規格、定位與說明：`data/daytona.ts`
- 頁面結構與互動：`components/DaytonaArchive.tsx`
- 配色、版面與手機版樣式：`app/globals.css`
- 網站標題與 SEO：`app/layout.tsx`
- 車款照片：`public/images/models/`

新增車款時，先把圖片放入 `public/images/models/`，再於 `data/daytona.ts` 新增資料。每筆圖片資料應保留攝影者、授權與來源連結；未確認授權的照片不要直接放入公開網站。

## 編輯原則

- 以重大機械、平台或定位變更作為世代切分依據。
- 單純年度配色不拆成獨立世代。
- 年式更新可列入時間軸，但須明確標示不是全新世代。
- 年份與規格優先採用 Triumph 官方資料、官方媒體資料及車主手冊。

## 主要查證來源

- [Triumph Our Story](https://www.triumphmotorcycles.com/our-story)
- [Triumph Brand Timeline](https://www.triumphmotorcycles.com/our-story/brand-timeline)
- [Triumph Tyre Selection Chart](https://www.triumphmotorcycles.com/media-library/7b5bb1aeb714454ebb19829bc799622a.pdf?la=en-US)
- [Daytona Moto2 765 Limited Edition Media Kit](https://triumph-mediakits.com/en/news-articles/new-daytona-moto2%E2%84%A2-765-limited-edition.html)
- [2024 Daytona 660 Launch](https://www.triumphmotorcycles.com/for-the-ride/news/motorcycles/daytona-660-1-9-2024)
- [2026 Daytona 660 Update](https://www.triumphmotorcycles.com/for-the-ride/news/motorcycles/key-updates-to-daytona-660-2026-03-17)

照片授權與來源亦標示於網站各車款詳情中。
