import { formatTaipeiTimestamp } from "@/lib/taipei-date";

export const siteMeta = {
  get lastEdited() {
    return formatTaipeiTimestamp();
  },
};
