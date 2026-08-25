const TAIPEI_TIME_ZONE = "Asia/Taipei";
const DAY_MS = 24 * 60 * 60 * 1000;

type DateParts = {
  year: number;
  month: number;
  day: number;
};

const taipeiDateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TAIPEI_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const taipeiTimeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TAIPEI_TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function pad2(value: number) {
  return String(value).padStart(2, "0");
}

function partsMap(parts: Intl.DateTimeFormatPart[]) {
  return Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );
}

export function getTaipeiDateParts(date = new Date()): DateParts {
  const parts = partsMap(taipeiDateFormatter.formatToParts(date));
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
  };
}

export function getTaipeiDateString(date = new Date(), separator = "/") {
  const { year, month, day } = getTaipeiDateParts(date);
  return [year, pad2(month), pad2(day)].join(separator);
}

export function formatTaipeiTimestamp(date = new Date()) {
  const { year, month, day } = getTaipeiDateParts(date);
  const timeParts = partsMap(taipeiTimeFormatter.formatToParts(date));
  return `${year}.${pad2(month)}.${pad2(day)} ${timeParts.hour}:${timeParts.minute}`;
}

export function parseDateString(value: string): DateParts {
  const match = /^(\d{4})[/-](\d{2})[/-](\d{2})$/.exec(value);
  if (!match) {
    throw new Error(`Invalid date string: ${value}`);
  }

  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
  };
}

export function inclusiveDays(start: string, end: string) {
  const startDate = parseDateString(start);
  const endDate = parseDateString(end);
  const startUtc = Date.UTC(startDate.year, startDate.month - 1, startDate.day);
  const endUtc = Date.UTC(endDate.year, endDate.month - 1, endDate.day);

  return Math.floor((endUtc - startUtc) / DAY_MS) + 1;
}
