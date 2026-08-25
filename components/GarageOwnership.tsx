"use client";

import { useEffect, useState } from "react";
import {
  formatOwnershipPeriod,
  formatOwnershipRange,
  type OwnershipDateRange,
} from "@/lib/ownership";

type GarageOwnershipProps = {
  record: OwnershipDateRange;
  className?: string;
  showDays?: boolean;
};

function useTaipeiClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const update = () => setNow(new Date());
    update();

    const interval = window.setInterval(update, 60 * 1000);
    return () => window.clearInterval(interval);
  }, []);

  return now;
}

export function GarageOwnership({
  record,
  className,
  showDays = true,
}: GarageOwnershipProps) {
  const now = useTaipeiClock();
  const text = showDays
    ? formatOwnershipPeriod(record, now)
    : formatOwnershipRange(record);

  return (
    <span suppressHydrationWarning className={className}>
      {text}
    </span>
  );
}
