"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  /** 延遲毫秒數，用來做輕微的錯落進場 */
  delay?: number;
  className?: string;
}

/**
 * 進場動畫容器：元素捲入視窗時做一次簡潔的淡入 + 上移。
 * 不使用額外套件，改用 IntersectionObserver，動畫低調且只觸發一次。
 *
 * 穩健性：
 * - 初始（SSR / 未 hydrate）以「可見」狀態輸出，確保沒有 JS 時內容不會被隱藏。
 * - hydrate 後才啟用隱藏 + 進場動畫；若瀏覽器不支援 IntersectionObserver 則直接顯示。
 * - 若使用者偏好減少動態，globals.css 會自動關閉動畫。
 */
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // armed = 已在 client 端啟用動畫；hydrate 前為 false，確保 SSR 內容可見
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    setArmed(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const hidden = armed && !visible;

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out motion-reduce:transition-none ${
        hidden ? "opacity-0 translate-y-5" : "opacity-100 translate-y-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
