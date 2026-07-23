import type { JourneyItem } from "@/types";

// ============================================================
// 個人經歷時間軸 — My Journey 區塊
// 首頁只顯示 summary；經本人確認可公開的完整內容放在 story。
// 未確認的年份、成果、私人背景與工程機密不得加入此公開資料。
// ============================================================

export const journey: JourneyItem[] = [
  {
    id: "early-exploration",
    period: "早期",
    category: "成長",
    title: "求學與早期探索",
    summary:
      "在樂樂棒球校隊裡，我學著承擔，也把累積的經驗傳給下一批人。",
    story: [
      {
        heading: "大華國小｜第一次學著承擔",
        paragraphs: [
          "國小時的我，已經展現出喜歡帶頭的一面，也帶著一點玩世不恭。",
          "加入樂樂棒球校隊後，我擔任投手，和隊伍一起拿到高雄市第二名。畢業時，我把累積的經驗與責任傳承給學弟妹。",
        ],
        images: [
          {
            src: "/images/DaHua/230814.jpg",
            alt: "大華國小樂樂棒球練習中的揮棒畫面",
            width: 960,
            height: 720,
          },
          {
            src: "/images/DaHua/130228.jpg",
            alt: "樂樂棒球比賽場上的守備隊形",
            width: 800,
            height: 600,
          },
        ],
      },
    ],
    placeholder: false,
  },
  {
    id: "origin-of-lfx",
    period: "國中",
    category: "數位",
    title: "LFX 的誕生",
    summary:
      "從遊戲代號到 YouTube 頻道，LFX 開始成為代表我的名字。",
    previewImage: {
      src: "/images/GUNRUSH/logoLFX.jpg",
      alt: "LFX 早期 Logo",
      width: 720,
      height: 720,
    },
    story: [
      {
        heading: "文山國中｜從遊戲代號開始",
        paragraphs: [
          "國中時，我開始接觸電腦與遊戲。第一款真正投入的遊戲是《即刻槍戰》，也因為當時在遊戲中的表現，取了 LFX 這個名稱。",
          "同一段時間，我建立了 YouTube 頻道。LFX 不再只是一個遊戲代號，而是逐漸成為代表我的名字。",
        ],
        images: [
          {
            src: "/images/GUNRUSH/LFX46.jpg",
            alt: "《即刻槍戰》中 LFX 等級 46 的角色紀錄",
            width: 381,
            height: 540,
          },
          {
            src: "/images/GUNRUSH/LFX47.jpg",
            alt: "《即刻槍戰》中 LFX 的角色與武器裝備紀錄",
            width: 937,
            height: 662,
          },
          {
            src: "/images/GUNRUSH/0721.png",
            alt: "《即刻槍戰》角色手持殛光雷鳴的紀錄",
            width: 1024,
            height: 1536,
            caption: "永遠的愛弓 殛光雷鳴",
            layout: "standalone",
          },
        ],
      },
    ],
    placeholder: false,
  },
  {
    id: "architecture-meets-computing",
    period: "高工",
    category: "建築",
    title: "建築與電腦的交會",
    summary:
      "空間邏輯讓我走進建築，電腦硬體則讓我開始想像兩者結合的工作。",
    previewImage: {
      src: "/images/CCVS/IMAG0407.jpg",
      alt: "中正高工畢業照",
      width: 468,
      height: 835,
      caption: "中正高工畢業照",
    },
    story: [
      {
        heading: "中正高工建築科｜從空間能力出發",
        paragraphs: [
          "國中適性測驗中，我的空間邏輯與概念能力特別突出，因此選擇進入中正高工建築科。",
          "在這裡，我開始接觸工程力學、測量學、製圖與工程概論，逐步建立對建築與工程的基本認識。",
          "這些照片，是我當砌磚選手時親手完成的作品。",
        ],
        images: [
          {
            src: "/images/CCVS/CCVS01.jpg",
            alt: "中正高工砌磚選手時完成的作品一",
            width: 937,
            height: 530,
            layout: "grid",
          },
          {
            src: "/images/CCVS/CCVS02.jpg",
            alt: "中正高工砌磚選手時完成的作品二",
            width: 937,
            height: 530,
            layout: "grid",
          },
          {
            src: "/images/CCVS/CCVS03.jpg",
            alt: "中正高工砌磚選手時完成的作品三",
            width: 937,
            height: 530,
            layout: "grid",
          },
          {
            src: "/images/CCVS/CCVS04.jpg",
            alt: "中正高工砌磚選手時完成的作品四",
            width: 937,
            height: 530,
            layout: "grid",
          },
        ],
      },
      {
        heading: "電腦硬體｜另一條線開始靠近",
        paragraphs: [
          "暑假期間，我到叔叔家學習電腦硬體。建築與電腦原本是兩個不同的興趣，也從這時開始出現交會。",
          "我第一次萌生了未來從事「建築與電腦結合」工作的想法，只是當時還不知道這條路會有什麼名字。",
        ],
        images: [
          {
            src: "/images/CCVS/IMAG0741.jpg",
            alt: "2018 年接觸電腦硬體時的紀錄",
            width: 472,
            height: 835,
            caption: "2018/07/06",
          },
          {
            src: "/images/CCVS/IMG_0446.jpg",
            alt: "2020 年在電腦維修中心的紀錄",
            width: 626,
            height: 835,
            caption: "2020/02/11",
          },
          {
            src: "/images/CCVS/IMG_2431.jpg",
            alt: "2021 年在電腦維修中心的紀錄",
            width: 626,
            height: 835,
            caption: "2021/08/02",
          },
        ],
      },
    ],
    placeholder: false,
  },
  {
    id: "first-encounter-with-bim",
    period: "大學",
    category: "BIM",
    title: "第一次接觸 BIM",
    summary:
      "一門電腦繪圖課，讓高中時模糊的想法第一次有了具體名稱。",
    previewImage: {
      src: "/images/CYUT/IMG_0198.jpg",
      alt: "朝陽科技大學時期的生活紀錄",
      width: 626,
      height: 835,
    },
    story: [
      {
        heading: "朝陽科技大學｜離開南部",
        paragraphs: [
          "因為父親希望我離開南部，我選擇了朝陽科技大學。大一加入排球隊，大一下則參加勞作教育小組長實習。",
          "新的環境讓生活有了不同節奏，也讓我開始在課業之外摸索自己真正想走的方向。",
        ],
        images: [
          {
            src: "/images/CYUT/IMG_0773.JPG",
            alt: "朝陽科技大學勞作夥伴們聚餐",
            width: 937,
            height: 702,
            caption: "勞作夥伴們聚餐｜2020/05/13",
          },
          {
            src: "/images/CYUT/IMG_0578.MOV.jpg",
            alt: "朝陽科技大學排球隊練習影片畫面",
            width: 470,
            height: 835,
            caption: "排球隊練習影片畫面｜我是舉球員",
          },
        ],
      },
      {
        heading: "檔車與打工｜為喜歡的事累積",
        paragraphs: [
          "大二開始，我認真接觸檔車。為了存錢，曾到加油站、口罩工廠與五金工廠打工。",
          "那段時間一邊讀書、一邊工作，也慢慢理解喜歡一件事，往往需要自己付出時間與選擇。",
        ],
        images: [
          {
            alt: "白色 Honda CBR150R 圖片待補",
            placeholder: "那時候最想擁有的，是一台白色 CBR150R。",
            width: 1440,
            height: 763,
            caption: "白色 CBR150R｜授權圖片待補",
          },
          {
            src: "/images/CYUT/IMG_2129.jpg",
            alt: "大學時期的工廠打工紀錄",
            width: 937,
            height: 703,
            caption: "打工紀錄",
          },
        ],
      },
      {
        heading: "BIM｜那個方向終於有了名字",
        paragraphs: [
          "大二的電腦繪圖學期成績獲得滿分，班導因此和我談到研究所，也第一次向我介紹 BIM。",
          "直到那一刻，高中時「建築與電腦結合」的想法，終於有了一個具體的名稱。",
        ],
      },
    ],
    placeholder: false,
  },
  {
    id: "from-internship-to-site",
    period: "轉學 · 職場",
    category: "職涯",
    title: "從實習走入工地",
    summary:
      "轉學後重新接上 BIM，從實習走進第一個大型工地現場，也更確定自己想發展的方向。",
    story: [
      {
        heading: "屏東科技大學｜重新接上 BIM",
        paragraphs: [
          "大三時，我轉學到屏東科技大學。朋友多在南部，加上國立學校能減輕家庭負擔，讓我選擇回到南部繼續求學。",
          "大四時，我接觸到屏科的 BIM 老師，也因緣際會進入繽紛科技有限公司實習。原本以為轉學後可能不再接觸 BIM，最後卻重新接上了這條路。",
        ],
      },
      {
        heading: "桃園福清營造｜貼近大型工地",
        paragraphs: [
          "畢業後，經由屏科 BIM 老師介紹，我以工讀身分進入桃園福清營造，參與十多棟社會住宅專案。主要工作是到現場對照 BIM 模型查驗，並製作查驗紀錄。",
          "這份工作在 BIM 建模與技術上的成長有限，卻讓我真正貼近大型工地現場，理解模型與現場之間的距離。",
        ],
      },
      {
        heading: "把陌生空間整理成自己的小窩",
        paragraphs: [
          "公司提供住宿與午、晚餐。剛入住時，住宿空間原本有些雜亂，我慢慢把它整理成自己的小窩。",
          "那不只是整理房間，也是第一次在新的工作環境裡，替自己建立一個能夠生活的空間。",
        ],
      },
      {
        heading: "離開｜重新選擇想走的方向",
        paragraphs: [
          "工作約半年後，公司希望我轉為正式員工。因為實際工作內容與自己想發展的 BIM 方向不一致，我最後選擇離開。",
          "這次選擇沒有否定那段經歷，而是讓我更清楚，下一步想累積的是什麼。",
        ],
      },
    ],
    placeholder: false,
  },
  {
    id: "building-bim-experience",
    period: "工程現場",
    category: "BIM",
    title: "真正開始累積 BIM 專業",
    summary:
      "進入義力營造後，我開始把圖面、Dynamo、模型與施工動畫串成能被溝通的工程語言。",
    story: [
      {
        heading: "國一甲大型備標案｜讓橋從線條中長出來",
        paragraphs: [
          "進入義力營造後，第一個接觸的是規模約 160 億元的國一甲大型備標案。我開始接觸圖面識讀、備標流程、輪廓建置、PG Line 描繪與 Dynamo 架設。",
          "透過 Dynamo 生成橋梁模型，再使用 Fuzor 將自己建立的模型製作成施工動畫。我開始理解，模型不只是靜態成果，也能呈現施工過程並溝通工程邏輯。",
          "「第一次真正把圖面、程式與模型串在一起，讓一座橋從線條中長出來。」",
        ],
      },
      {
        heading: "桃園機場第三跑道 R3｜持續參與",
        paragraphs: [
          "完成國一甲備標後，我開始參與桃園機場第三跑道 R3，每月參加 BIM 會議。",
          "工作包含 BIM 施工模擬與衝突檢討，目前仍持續參與。公開內容只保留工作方向，不包含工程機密、圖面、精確衝突內容或未公開資料。",
        ],
      },
      {
        heading: "布袋商港聯絡道備標｜兩週的高壓挑戰",
        paragraphs: [
          "這是一件規模約 13 億元、必須在兩週內完成的備標案。時間接近過年，工作壓力很大。",
          "它也是一次高壓而完整的備標經驗，讓我在有限時間裡重新理解取捨、順序與完成度。",
        ],
      },
    ],
    placeholder: false,
  },
  {
    id: "working-method-today",
    period: "現在",
    category: "方法",
    title: "現在形成的工作方法",
    summary:
      "我仍在累積專業，但已經開始知道，該如何運用自己的能力前進。",
    story: [
      {
        heading: "先找線索，再解決問題",
        paragraphs: [
          "遇到問題時，我會先主動尋找資訊、整理線索並嘗試解決；如果無法獨立完成，也會在適當的時候尋求支援。",
          "重點不是把所有事情都攬在自己身上，而是讓問題持續往能夠被處理的方向前進。",
        ],
      },
      {
        heading: "把有限時間留給真正重要的事",
        paragraphs: [
          "我會先規劃整體架構，再拆解複雜問題，判斷每件事的輕重緩急。",
          "我追求的不是單純做得更多，而是在最短時間內，把能力集中在真正重要的事情上，產出最大效益與最有價值的成果。",
        ],
      },
      {
        heading: "仍在累積，也更知道怎麼前進",
        paragraphs: [
          "「我仍在累積專業，但已經開始知道，該如何運用自己的能力前進。」",
        ],
      },
    ],
    placeholder: false,
  },
];
