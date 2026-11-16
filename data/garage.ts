import type { OwnershipDateRange } from "@/lib/ownership";

export const garageOwnership = {
  archiveRange: {
    start: "2021/05/12",
    end: "2026/11/15",
  },
  pool: {
    start: "2021/05/12",
    end: "2023/04/28",
  },
  r3: {
    start: "2023/03/05",
    end: "2024/12/21",
  },
  tofu: {
    start: "2024/05/30",
  },
  merlot: {
    start: "2025/01/10",
    end: "2026/11/15",
  },
} satisfies Record<string, OwnershipDateRange>;
