"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { BrandMeaning } from "@/components/BrandMeaning";

// 導覽連結（中英雙語）。若之後新增區塊，於此加入一組即可
const navLinks = [
  { label: "About", zh: "關於", href: "#about" },
  { label: "Journey", zh: "經歷", href: "#journey" },
  { label: "Life", zh: "生活", href: "#life" },
  { label: "Garage", zh: "車庫", href: "#garage" },
  { label: "Setup", zh: "電腦", href: "#setup" },
  { label: "Work", zh: "工作", href: "#work" },
  { label: "Stories", zh: "紀錄", href: "#stories" },
  { label: "Contact", zh: "聯絡", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-ink-600/80 bg-ink-950/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="container-x flex h-28 items-end justify-between pb-7">
        <a href="#top" className="group flex items-center gap-3">
          <span className="text-lg font-semibold tracking-wide text-steel-100">
            <span className="font-mono">LFX</span> 辭海
          </span>
          <span className="hidden h-4 w-px bg-merlot-500 lg:block" aria-hidden />
          {/* 桌面版才顯示品牌核心，手機版只留品牌名稱避免跑版 */}
          <BrandMeaning className="hidden font-mono text-[11px] tracking-label text-steel-500 transition-colors group-hover:text-steel-300 lg:inline" />
        </a>

        {/* 桌面版導覽（中英雙語） */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group flex flex-col items-center leading-none"
              >
                <span className="font-mono text-[13px] uppercase tracking-label text-steel-300 transition-colors group-hover:text-steel-100">
                  {link.label}
                </span>
                <span className="mt-1.5 text-[11px] tracking-[0.25em] text-steel-500 transition-colors group-hover:text-merlot-300">
                  {link.zh}
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* 手機版選單按鈕 */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-steel-300 md:hidden"
          aria-label={open ? "關閉選單" : "開啟選單"}
          aria-expanded={open}
        >
          {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </nav>

      {/* 手機版展開選單 */}
      {open ? (
        <div className="border-t border-ink-600 bg-ink-950/95 backdrop-blur-md md:hidden">
          <ul className="container-x flex flex-col py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-3 py-3"
                >
                  <span className="font-mono text-base uppercase tracking-label text-steel-300 transition-colors group-hover:text-steel-100">
                    {link.label}
                  </span>
                  <span className="text-sm tracking-wider text-steel-500 transition-colors group-hover:text-merlot-300">
                    {link.zh}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <span className="sr-only">{profile.nameEn}</span>
    </header>
  );
}
