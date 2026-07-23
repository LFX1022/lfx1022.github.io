import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 深微水泥灰牆 — ink 由深轉淺，數字越大越淺（頁面底色為深灰）
        // 參考照片那面較深、有厚度的微水泥牆
        ink: {
          950: "#3a3d3f", // 頁面主底：深微水泥灰
          900: "#424547",
          800: "#494c4e", // 卡片 / 面板（比底色亮一階）
          700: "#565a5c",
          600: "#646769", // 邊框 / 水泥接縫線
        },
        // 深炭灰量體（電視櫃 / 深門片色塊）
        coal: {
          900: "#2b2e2f",
          800: "#34383a",
          700: "#404446",
          600: "#4c5052",
        },
        // 深色區塊上的淺色文字（如天花白）
        chalk: {
          100: "#f2f2f0",
          200: "#e2e4e2",
          300: "#c7c9c8",
          400: "#a3a6a5",
        },
        // 文字：淺暖白（用於深水泥底），略帶暖調像被暖光打亮
        steel: {
          600: "#7f7c72", // 最淺，faint 標籤
          500: "#98958a",
          400: "#b4b1a6", // 次要說明文字
          300: "#d2cfc4", // 內文（暖白）
          200: "#e6e3da", // 強調內文
          100: "#f2f0ea", // 一般標題（暖白）
        },
        // 重點色：暖金光 / 黃銅（呼應參考圖的間接暖光），在亮水泥底上保持對比
        merlot: {
          DEFAULT: "#a97f45", // 按鈕 / 標籤底色（配白字）
          600: "#8a6535", // hover 更深
          500: "#c49a57", // 暖金線光 / 底線（亮金，在水泥底上跳出來）
          400: "#9c743e", // 前景重點（編號、邊框）
          300: "#8a6534", // eyebrow 小標與圖示（較深黃銅，確保可讀）
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        label: "0.22em",
      },
      backgroundImage: {
        // 極淡的接縫網格（僅用於佔位圖，微水泥牆本身以雲染質感為主）
        blueprint:
          "linear-gradient(to right, rgba(70,70,70,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(70,70,70,0.05) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "line-draw": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "line-draw": "line-draw 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
