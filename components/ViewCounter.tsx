"use client";

import { useEffect, useState } from "react";

// GoatCounter 的總瀏覽數 JSON 端點（需在 GoatCounter 後台開啟 visitor counter）
const COUNTER_URL = "https://lfx1022.goatcounter.com/counter/TOTAL.json";

/** 頁尾顯示網站總瀏覽次數（資料來源：GoatCounter） */
export function ViewCounter() {
  const [count, setCount] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(COUNTER_URL)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (alive && data?.count) setCount(String(data.count));
      })
      .catch(() => {
        /* 端點未開或離線時，維持顯示破折號 */
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <p className="font-mono text-xs tracking-wide text-steel-500">
      <span aria-hidden>👁</span> Views {count ?? "—"}
    </p>
  );
}
