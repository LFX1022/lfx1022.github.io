export type EngineFamily = "triple" | "four" | "mixed";

export type DaytonaModel = {
  id: string;
  year: string;
  eyebrow: string;
  name: string;
  capacity: string;
  engine: string;
  family: EngineFamily;
  position: string;
  summary: string;
  difference: string;
  significance: string;
  image: string;
  imageFit?: "cover" | "contain";
  imageAlt: string;
  imageCredit: string;
  imageLicense: string;
  imageSource: string;
  sourceLabel: string;
  sourceUrl: string;
  isUpdate?: boolean;
};

export const models: DaytonaModel[] = [
  {
    id: "daytona-750-1000",
    year: "1991—1992",
    eyebrow: "HINCKLEY REBIRTH",
    name: "Daytona 750 / 1000",
    capacity: "749 / 998 cc",
    engine: "水冷直列三缸 / 四缸",
    family: "mixed",
    position: "重生後的首批全整流罩運動車",
    summary:
      "John Bloor 時代的新 Triumph 以模組化平台重新站上世界舞台；同一套家族輪廓下，750 採三缸、1000 採四缸。",
    difference:
      "兩者不只是排氣量差異，也把『三缸個性』與『四缸性能』並列成早期 Hinckley Daytona 的兩條答案。",
    significance:
      "Daytona 名稱在現代 Triumph 正式復活，成為往後三十多年運動車系的起點。",
    image: "/images/models/daytona-750-1000.jpg",
    imageAlt: "Triumph 早期 Hinckley Daytona",
    imageCredit: "Triumph Motorcycles",
    imageLicense: "官方品牌歷史影像",
    imageSource: "https://www.triumphmotorcycles.com/our-story/brand-timeline",
    sourceLabel: "Triumph 原廠輪胎年式表",
    sourceUrl:
      "https://www.triumphmotorcycles.com/media-library/7b5bb1aeb714454ebb19829bc799622a.pdf?la=en-US",
  },
  {
    id: "daytona-900-1200",
    year: "1993—1996",
    eyebrow: "MODULAR MUSCLE",
    name: "Daytona 900 / 1200",
    capacity: "885 / 1,180 cc",
    engine: "水冷直列三缸 / 四缸",
    family: "mixed",
    position: "大排量高速運動旗艦",
    summary:
      "第二波 Daytona 把排氣量與高速巡航能力推高。900 延續三缸，1200 則以四缸成為早期 Hinckley 最強勢的 Daytona。",
    difference:
      "相較 750 / 1000，車系更成熟、後輪規格與底盤配置逐年更新，也形成 900 靈活、1200 壯闊的雙旗艦性格。",
    significance:
      "它們奠定九〇年代 Daytona 的厚實 GT-Sport 形象，亦成為 Super III 與後續特別版的基礎。",
    image: "/images/models/daytona-900-1200.jpg",
    imageAlt: "紅色 Triumph Daytona 1200",
    imageCredit: "Jim Perry / Wikimedia Commons",
    imageLicense: "CC BY 2.0",
    imageSource: "https://commons.wikimedia.org/wiki/File:Triumph_Daytona_1200.jpg",
    sourceLabel: "Triumph 原廠輪胎年式表",
    sourceUrl:
      "https://www.triumphmotorcycles.com/media-library/7b5bb1aeb714454ebb19829bc799622a.pdf?la=en-US",
  },
  {
    id: "super-iii",
    year: "1994—1996",
    eyebrow: "FACTORY HOT ROD",
    name: "Daytona Super III",
    capacity: "885 cc",
    engine: "水冷直列三缸",
    family: "triple",
    position: "Daytona 900 的高性能分支",
    summary:
      "以 Daytona 900 為基礎，加入與 Cosworth 合作開發的引擎部件、減重與更高階煞車，並以醒目的黃色建立專屬辨識。",
    difference:
      "不是單純換色：動力、制動與輕量化都有實質升級，是早期模組化世代最接近原廠性能特仕的版本。",
    significance:
      "Super III 預告了後來 675R 的思路——以標準 Daytona 為基礎，打造更銳利的賽道向分支。",
    image: "/images/models/daytona-super-iii.jpg",
    imageAlt: "黃色 Triumph Daytona Super III",
    imageCredit: "Geograph / Wikimedia Commons",
    imageLicense: "CC BY-SA 2.0",
    imageSource:
      "https://commons.wikimedia.org/wiki/File:Beaulieu_Motor_Museum,_Triumph_Daytona_Super_III_(1994)_motorbike_-_geograph.org.uk_-_8064827.jpg",
    sourceLabel: "National Motor Museum",
    sourceUrl:
      "https://nationalmotormuseum.org.uk/collections/vehicles/1994-triumph-daytona-super-iii-t310/",
  },
  {
    id: "t595",
    year: "1997—1998",
    eyebrow: "THE MODERN BREAK",
    name: "Daytona T595",
    capacity: "955 cc",
    engine: "水冷燃油噴射直列三缸",
    family: "triple",
    position: "現代化純種公升級跑車",
    summary:
      "全新窄幅車架、燃油噴射三缸與單搖臂，把 Daytona 從厚重的模組化年代帶進真正與同代超級跑車正面競爭的時代。",
    difference:
      "T595 不是 T300 家族的小改款，而是車架、引擎與比例的全面轉向；名稱中的 595 是專案代號，不是 595 cc。",
    significance:
      "Triumph 官方將它視為品牌現代史第一款全力聚焦性能的運動車。",
    image: "/images/models/daytona-t595.jpg",
    imageAlt: "Triumph Daytona T595",
    imageCredit: "James Willock / Wikimedia Commons",
    imageLicense: "CC BY-SA 2.0",
    imageSource: "https://commons.wikimedia.org/wiki/File:Triumph_Daytona_T595.jpg",
    sourceLabel: "Triumph：Our Story",
    sourceUrl: "https://www.triumphmotorcycles.com/our-story",
  },
  {
    id: "955i",
    year: "1999—2006",
    eyebrow: "TRIPLE SUPERBIKE",
    name: "Daytona 955i",
    capacity: "955 cc",
    engine: "水冷燃油噴射直列三缸",
    family: "triple",
    position: "T595 的成熟化與長期主力",
    summary:
      "為避免市場把 T595 誤認為排氣量，車名改為 955i。後期又歷經車架、車身與搖臂配置更新，成為跨越世紀的 Daytona 旗艦。",
    difference:
      "1999 年先完成命名整理；2001—2002 年式再出現明顯硬體分期，因此同為 955i，早期與後期外觀及底盤並不完全相同。",
    significance:
      "它維持 Triumph 在公升級跑車市場的能見度，也為更輕、更專注的 675 世代留下三缸血統。",
    image: "/images/models/daytona-955i.jpg",
    imageAlt: "Triumph Daytona 955i",
    imageCredit: "Scott Wright / Wikimedia Commons",
    imageLicense: "CC BY 2.0",
    imageSource: "https://commons.wikimedia.org/wiki/File:Triumph_daytona_955.jpg",
    sourceLabel: "Triumph 原廠輪胎年式表",
    sourceUrl:
      "https://www.triumphmotorcycles.com/media-library/7b5bb1aeb714454ebb19829bc799622a.pdf?la=en-US",
  },
  {
    id: "tt600",
    year: "2000—2003",
    eyebrow: "THE 600 CHALLENGE",
    name: "TT600",
    capacity: "599 cc",
    engine: "水冷燃油噴射直列四缸",
    family: "four",
    position: "正面挑戰 600 級仿賽市場",
    summary:
      "Triumph 以鋁合金車架、四缸與電子噴射切入競爭最激烈的 600 級距，技術野心明確，早期供油調校也成為後續改良重點。",
    difference:
      "這是 Daytona 600 的技術前身；比起 955i 的大排量三缸，TT600 選擇高轉四缸與更純粹的中量級超級運動定位。",
    significance:
      "它累積的底盤與噴射經驗，直接孕育 Daytona 600 / 650，也證明 Triumph 願意進入日本四缸主導的戰場。",
    image: "/images/models/tt600.jpg",
    imageAlt: "黃黑配色 Triumph TT600",
    imageCredit: "Reg Mckenna / Wikimedia Commons",
    imageLicense: "CC BY 2.0",
    imageSource: "https://commons.wikimedia.org/wiki/File:Triumph_TT600.jpg",
    sourceLabel: "Triumph 原廠輪胎年式表",
    sourceUrl:
      "https://www.triumphmotorcycles.com/media-library/7b5bb1aeb714454ebb19829bc799622a.pdf?la=en-US",
  },
  {
    id: "daytona-600",
    year: "2002 發表 / 2003—2004",
    eyebrow: "RACE-BRED REVISION",
    name: "Daytona 600",
    capacity: "599 cc",
    engine: "水冷燃油噴射直列四缸",
    family: "four",
    position: "TT600 的全面賽道化進化",
    summary:
      "在 TT600 基礎上重整進氣、噴射、空力與底盤細節，並正式掛上 Daytona 名稱，企圖把實戰成績變成產品定位。",
    difference:
      "外觀看似延續，實際是針對供油反應、動力輸出與賽道競爭力的系統性修正。",
    significance:
      "Bruce Anstey 於 2003 年騎乘 Daytona 600 贏得 Junior TT，讓 Triumph 相隔 27 年重返曼島 TT 勝利。",
    image: "/images/models/daytona-600.jpg",
    imageAlt: "銀色 Triumph Daytona 600",
    imageCredit: "Robert Ennals / Wikimedia Commons",
    imageLicense: "CC BY 2.0",
    imageSource: "https://commons.wikimedia.org/wiki/File:Triumph_600_Daytona.jpg",
    sourceLabel: "Triumph 品牌時間軸",
    sourceUrl: "https://www.triumphmotorcycles.com/our-story/brand-timeline",
  },
  {
    id: "daytona-650",
    year: "2005",
    eyebrow: "THE FINAL FOUR",
    name: "Daytona 650",
    capacity: "646 cc",
    engine: "水冷燃油噴射直列四缸",
    family: "four",
    position: "更重視中段輸出的道路仿賽",
    summary:
      "把 Daytona 600 擴缸至 646 cc，以更飽滿的中段扭力改善道路實用性，仍保留全整流罩四缸仿賽架構。",
    difference:
      "它不是全新平台，而是 600 世代的最終成熟版；重點從極端級距規則轉向真實道路上的可用動力。",
    significance:
      "這是 Triumph 最後一款四缸 Daytona。下一年，品牌以三缸 675 徹底重寫中量級公式。",
    image: "/images/models/daytona-650.jpg",
    imageAlt: "Triumph Daytona 650",
    imageCredit: "Richard Bogle / Wikimedia Commons",
    imageLicense: "CC BY-SA 2.0",
    imageSource: "https://commons.wikimedia.org/wiki/File:Triumph_Daytona_650.jpg",
    sourceLabel: "Triumph 原廠輪胎年式表",
    sourceUrl:
      "https://www.triumphmotorcycles.com/media-library/7b5bb1aeb714454ebb19829bc799622a.pdf?la=en-US",
  },
  {
    id: "daytona-675-gen1",
    year: "2006—2012",
    eyebrow: "THE DEFINING TRIPLE",
    name: "Daytona 675",
    capacity: "675 cc",
    engine: "水冷直列三缸",
    family: "triple",
    position: "以三缸打破 600 級四缸慣例",
    summary:
      "小巧車身、三缸中段扭力與高轉延伸，讓 Daytona 675 不必複製日本四缸公式，也能成為 600 級超級運動車的標竿。",
    difference:
      "從 650 的四缸轉向全新 675 三缸平台；2009 年式再改善引擎、懸吊與細節，形成第一代中期進化。",
    significance:
      "它是現代 Triumph 最具代表性的仿賽，並在 TT、各國 Supersport 與 2014 Daytona 200 留下勝績。",
    image: "/images/models/daytona-675-2006.jpg",
    imageAlt: "第一代 Triumph Daytona 675",
    imageCredit: "StealthFX / Wikimedia Commons",
    imageLicense: "Public Domain",
    imageSource: "https://commons.wikimedia.org/wiki/File:Triumph_Daytona_675.jpg",
    sourceLabel: "Triumph：Our Story",
    sourceUrl: "https://www.triumphmotorcycles.com/our-story",
  },
  {
    id: "daytona-675-gen2",
    year: "2013—2017",
    eyebrow: "SECOND-GENERATION FOCUS",
    name: "Daytona 675 · Gen 2",
    capacity: "675 cc",
    engine: "水冷直列三缸",
    family: "triple",
    position: "更集中、更現代的第二代 675",
    summary:
      "2013 年式重新設計引擎、車架與車身，排氣由高位座下移至低位，重量分配與整車集中化更符合新世代賽道需求。",
    difference:
      "外觀、引擎與車架皆非普通小改；和 2006 初代並列時，這才是 675 車系真正的第二個完整世代。",
    significance:
      "它把 Daytona 675 推至成熟頂點，亦成為 675R 後期版本與 Moto2 765 精神上的直接前身。",
    image: "/images/models/daytona-675r.jpg",
    imageAlt: "2012 發表的 Triumph Daytona 675R 新世代",
    imageCredit: "Triumph Motorcycles",
    imageLicense: "官方品牌歷史影像",
    imageSource: "https://www.triumphmotorcycles.com/our-story/brand-timeline",
    sourceLabel: "Triumph 原廠輪胎年式表",
    sourceUrl:
      "https://www.triumphmotorcycles.com/media-library/7b5bb1aeb714454ebb19829bc799622a.pdf?la=en-US",
  },
  {
    id: "daytona-675r",
    year: "2011—2017",
    eyebrow: "R-SPEC BRANCH",
    name: "Daytona 675R",
    capacity: "675 cc",
    engine: "水冷直列三缸",
    family: "triple",
    position: "原廠高階賽道版",
    summary:
      "在標準 675 上加入 Öhlins 懸吊、Brembo 煞車與快排等硬體，R 不只是貼紙或換色，而是可被騎士直接感受到的性能層級。",
    difference:
      "2011 版本以第一代 675 為基礎；2013 後則跟隨第二代全面更新，因此 675R 本身也跨越兩個平台分期。",
    significance:
      "675R 建立 Triumph 後來高階 R / RS 版本的產品邏輯，也是 Daytona 系譜中最完整的量產賽道取向版本之一。",
    image: "/images/models/daytona-675r.jpg",
    imageAlt: "Triumph Daytona 675R",
    imageCredit: "Triumph Motorcycles",
    imageLicense: "官方品牌歷史影像",
    imageSource: "https://www.triumphmotorcycles.com/our-story/brand-timeline",
    sourceLabel: "Triumph 原廠輪胎年式表",
    sourceUrl:
      "https://www.triumphmotorcycles.com/media-library/7b5bb1aeb714454ebb19829bc799622a.pdf?la=en-US",
  },
  {
    id: "moto2-765",
    year: "2020",
    eyebrow: "MOTO2 CONNECTION",
    name: "Daytona Moto2 765 Limited Edition",
    capacity: "765 cc",
    engine: "水冷直列三缸",
    family: "triple",
    position: "道路合法的限量賽事旗艦",
    summary:
      "以 765 三缸、碳纖維車身與高階底盤，連結 Triumph 自 2019 年起擔任 Moto2 引擎供應商的賽事角色。",
    difference:
      "它不是標準量產 Daytona 的換色版，而是以 Moto2 合作為核心的限量獨立作品；2019 發表、2020 年式交付。",
    significance:
      "在 675 停產與 660 誕生之間，它守住 Daytona 的純種性能象徵，也把 765 賽事技術帶回公路。",
    image: "/images/models/daytona-moto2-765.jpg",
    imageFit: "contain",
    imageAlt: "Triumph Daytona Moto2 765 Limited Edition",
    imageCredit: "Triumph Motorcycles",
    imageLicense: "Triumph 官方媒體素材",
    imageSource:
      "https://triumph-mediakits.com/en/all-motorcycles/roadsters/2020-daytona-moto2%E2%84%A2-765-limited-edition.html",
    sourceLabel: "Triumph Media Kit",
    sourceUrl:
      "https://triumph-mediakits.com/en/news-articles/new-daytona-moto2%E2%84%A2-765-limited-edition.html",
  },
  {
    id: "daytona-660",
    year: "2024—現在",
    eyebrow: "THE ROAD-SPORT RETURN",
    name: "Daytona 660",
    capacity: "660 cc",
    engine: "水冷直列三缸",
    family: "triple",
    position: "兼顧日常與跑格的中量級道路運動車",
    summary:
      "Daytona 名稱回歸常規量產，以 660 三缸、較友善騎姿與完整整流罩，把焦點從純賽道秒數轉向可長期相處的公路性能。",
    difference:
      "它不是 675 的直接後繼：動力、騎姿與產品任務都更偏道路，卻保留三缸聲浪、線性加速與 Daytona 跑格。",
    significance:
      "它讓 Daytona 再次成為可廣泛接觸的量產車，也為品牌的現代 Supersport 定義開啟新方向。",
    image: "/images/models/daytona-660-merlot-garage-cover.jpeg",
    imageFit: "contain",
    imageAlt: "LFX Merlot Daytona 660 車庫封面圖",
    imageCredit: "LFX 辭海",
    imageLicense: "個人車庫封面照片",
    imageSource:
      "/images/motorcycles/daytona660/660250809.jpeg",
    sourceLabel: "Triumph 2024 發表資料",
    sourceUrl:
      "https://www.triumphmotorcycles.com/for-the-ride/news/motorcycles/daytona-660-1-9-2024",
  },
  {
    id: "daytona-660-my26",
    year: "MY 2026",
    eyebrow: "MODEL-YEAR UPDATE · NOT A NEW GENERATION",
    name: "Daytona 660 · 2026 Update",
    capacity: "660 cc",
    engine: "水冷直列三缸",
    family: "triple",
    position: "現行世代的裝備深化",
    summary:
      "2026 年式加入可調 Showa 前懸吊、標配 Triumph Shift Assist、Metzeler M9RR 輪胎與新造型細節。",
    difference:
      "這是配備與調校更新，不是全新車架或全新引擎世代；因此在圖鑑中標為年式更新，而不另算第 2 代。",
    significance:
      "它回應騎士對懸吊可調與快排的期待，也顯示 Daytona 660 正逐步補強運動性，而非改變道路跑車本質。",
    image: "/images/models/daytona-660-2026-silver.webp",
    imageFit: "contain",
    imageAlt: "2026 Triumph Daytona 660 Aluminium Silver 銀色全車",
    imageCredit: "Triumph Motorcycles",
    imageLicense: "Triumph 官方媒體素材",
    imageSource:
      "https://triumph-mediakits.com/en/all-motorcycles/roadsters/2026-daytona-660.html",
    sourceLabel: "Triumph 2026 年式更新",
    sourceUrl:
      "https://www.triumphmotorcycles.com/for-the-ride/news/motorcycles/key-updates-to-daytona-660-2026-03-17",
    isUpdate: true,
  },
];

export const specialEditions = [
  {
    year: "1994—1996",
    name: "Super III",
    kind: "機械升級",
    detail: "Cosworth 參與的引擎開發、減重與高階煞車；不是單純塗裝。",
    modelId: "super-iii",
  },
  {
    year: "1998",
    name: "Daytona 1200 SE",
    kind: "收尾特仕",
    detail: "以 1200 平台作為九〇年代大排量四缸 Daytona 的收尾，不另視為新世代。",
    modelId: "daytona-900-1200",
  },
  {
    year: "多個年式",
    name: "Daytona 675 SE",
    kind: "配色 / 配備",
    detail: "以特殊車色與細節建立收藏辨識；核心平台仍跟隨同年標準 675。",
    modelId: "daytona-675-gen1",
  },
  {
    year: "2011—2017",
    name: "Daytona 675R",
    kind: "機械升級",
    detail: "Öhlins、Brembo 與快排帶來實質性能差異，因此同時列入主時間軸。",
    modelId: "daytona-675r",
  },
  {
    year: "2020",
    name: "Moto2 765 Limited Edition",
    kind: "賽事限量",
    detail: "以 Moto2 合作與 765 三缸為核心的獨立限量作品，不是一般換色版。",
    modelId: "moto2-765",
  },
];

export const researchSources = [
  {
    label: "Triumph · Our Story",
    use: "Daytona 名稱起源、T595、675 與賽事脈絡",
    url: "https://www.triumphmotorcycles.com/our-story",
  },
  {
    label: "Triumph · Brand Timeline",
    use: "T595、Daytona 600、675 的官方年份節點",
    url: "https://www.triumphmotorcycles.com/our-story/brand-timeline",
  },
  {
    label: "Triumph · Tyre Chart",
    use: "1991 起主要車型與年式分期交叉核對",
    url: "https://www.triumphmotorcycles.com/media-library/7b5bb1aeb714454ebb19829bc799622a.pdf?la=en-US",
  },
  {
    label: "Triumph · Daytona 660 Launch",
    use: "2024 Daytona 660 首發定位與規格",
    url: "https://www.triumphmotorcycles.com/for-the-ride/news/motorcycles/daytona-660-1-9-2024",
  },
  {
    label: "Triumph · MY26 Update",
    use: "2026 年式懸吊、快排、輪胎與造型更新",
    url: "https://www.triumphmotorcycles.com/for-the-ride/news/motorcycles/key-updates-to-daytona-660-2026-03-17",
  },
  {
    label: "Triumph Media · Moto2 765",
    use: "2019 發表、2020 年式與限量定位",
    url: "https://triumph-mediakits.com/en/news-articles/new-daytona-moto2%E2%84%A2-765-limited-edition.html",
  },
];
