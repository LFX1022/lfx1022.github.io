import { getTaipeiDateString, inclusiveDays } from "@/lib/taipei-date";

export type OwnershipDateRange = {
  start: string;
  end?: string;
};

const CURRENT_LABEL = "至今";
const DAY_LABEL = "天";

export function formatOwnershipRange(record: OwnershipDateRange) {
  return `${record.start} - ${record.end ?? CURRENT_LABEL}`;
}

export function formatOwnershipPeriod(record: OwnershipDateRange, now = new Date()) {
  const endDate = record.end ?? getTaipeiDateString(now);
  const days = inclusiveDays(record.start, endDate);

  return `${formatOwnershipRange(record)} · ${days} ${DAY_LABEL}`;
}
