# 重機素材歸檔

網站使用的照片、MP4 與影片封面放在 `public/images/motorcycles/`，依車輛分資料夾；內容、日期及路徑集中在 `data/motorcycles.ts`。

## 車輛與資料夾

| 主題 | 網站素材 | 本機來源 |
| --- | --- | --- |
| 小Pool車 | `public/images/motorcycles/POOL/` | `records/motorcycles/POOL/originals/` |
| RyuGa／R3 | `public/images/motorcycles/R3/` | `records/motorcycles/R3/originals/` |
| 小豆腐 | `public/images/motorcycles/gsxr150/` | `records/motorcycles/gsxr150/originals/` |
| Merlot／Daytona 660 | `public/images/motorcycles/daytona660/` | 有來源檔時依相同車輛分類保存 |

`originals/` 保存原始 MOV、較大照片與既有來源備份，已由 `.gitignore` 排除，供本機留存。網站透過 `public/` 載入素材。

## 本批照片版本對照

以下照片的生活手帖與相簿共用既有網頁版本；較大版本依原始照片編號歸檔。

| 網頁版本 | 較大版本 |
| --- | --- |
| `POOL/IMG_2274.jpg` | `POOL/originals/IMG_2274.jpg` |
| `POOL/IMG_2367.jpg` | `POOL/originals/IMG_2367.jpg` |
| `POOL/IMG_2720.jpg` | `POOL/originals/IMG_2720.jpg` |
| `POOL/IMG_4485.jpg` | `POOL/originals/IMG_4485.jpg` |
| `R3/IMG_6107.jpg` | `R3/originals/IMG_6107.jpg` |
| `R3/IMG_6367.JPG` | `R3/originals/IMG_6367.JPG` |

## 後續新增素材

1. 依車輛放入對應資料夾；同名檔先比對內容，保留需要的來源版本。
2. 網頁影片使用 MP4；封面與影片同名並加上 `-poster.jpg`，例如 `IMG_6110.mp4` 與 `IMG_6110-poster.jpg`。
3. 原始 MOV 放在該車輛的 `originals/`。
4. 更新 `data/motorcycles.ts`，確認照片比例、影片封面、日期與手帖順序。
5. 在本機預覽檢查；整批進版依 `AGENTS.md` 的流程執行。
