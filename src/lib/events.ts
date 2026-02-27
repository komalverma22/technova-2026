import { API_URL } from "./api";

export type Event = {
  id?: number;
  title: string;
  description: string;
  department: string;
  minTeamSize: number;
  maxTeamSize: number;
  date: string;
  venue: string;
  rules: string;
  imagePath?: string;
  createdAt?: string;
};

/** API may return id or _id depending on serialization */
export type ApiEvent = Event & { _id?: string | number; maxTeaSize?: number };

/** Resolves event ID whether from id or _id */
export function getEventId(event: ApiEvent): string | number {
  return event.id ?? event._id ?? 0;
}

// ─── Display timezone ────────────────────────────────────────────────────────
/**
 * All event times are stored in UTC by the backend (Prisma / Neon).
 * We display them in IST (Asia/Kolkata = UTC+05:30).
 */
export const DISPLAY_TZ = "Asia/Kolkata" as const;

/** @deprecated Use DISPLAY_TZ. Kept for any legacy imports. */
export const IST_TZ = DISPLAY_TZ;

// ─── Internal helpers ─────────────────────────────────────────────────────────

/**
 * Parse a raw datetime string from the backend **as UTC**, returning a `Date`.
 *
 * ## Why this matters — the +05:30 double-offset bug
 *
 * Prisma serialises `DateTime` fields in several ways depending on the driver
 * and whether the value was created via raw SQL or the Prisma client:
 *
 *   • `"2026-03-13T02:55:00.000Z"`  — ISO-8601, explicit UTC (safe by default)
 *   • `"2026-03-13T08:25:00"`       — ISO-8601, **no TZ suffix**
 *   • `"2026-03-13 08:25:00"`       — SQL-style, **no TZ suffix**
 *   • `"2026-03-13"`               — date-only (midnight UTC intended)
 *
 * `new Date("2026-03-13T08:25:00")` is specified by ECMA-262 to be parsed as
 * **local time** when no TZ designator is present.  On an Indian machine the
 * browser's local timezone is already IST (+05:30), so the timestamp is
 * silently advanced by 5h30m.  When `Intl.DateTimeFormat` with
 * `timeZone: "Asia/Kolkata"` then converts it *again*, the displayed time is
 * 5h30m ahead of what was stored — the classic double-offset bug.
 *
 * This function normalises **all four formats** to an explicit UTC `Date` by
 * appending a `Z` whenever no timezone designator is detected, ensuring exactly
 * one UTC→IST conversion happens (inside `Intl.DateTimeFormat`).
 *
 * @param raw - Any datetime string the API may return, or null/undefined.
 * @returns A `Date` in UTC, or `null` if the input is falsy/unparseable.
 */
export function parseUtcDate(raw: string | undefined | null): Date | null {
  if (!raw) return null;

  let s = raw.trim();

  /**
   * Detect whether the string already carries an explicit timezone.
   * Covers:
   *   Z / z                     – UTC literal
   *   +05:30  /  -05:30         – ISO offset with colon
   *   +0530   /  -0530          – ISO offset without colon (RFC 2822 style)
   */
  const hasTZ = /[zZ]$|[+-]\d{2}:?\d{2}$/.test(s);

  if (!hasTZ) {
    // Normalise SQL-style space separator → T, then force UTC with Z.
    // "2026-03-13 08:25:00"     → "2026-03-13T08:25:00Z"
    // "2026-03-13T08:25:00"     → "2026-03-13T08:25:00Z"
    // "2026-03-13T08:25:00.000" → "2026-03-13T08:25:00.000Z"
    // "2026-03-13"              → "2026-03-13Z"  (midnight UTC)
    s = s.replace(" ", "T") + "Z";
  }

  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

// Keep the private alias for internal use (no behaviour change)
const toDate = parseUtcDate;


// Re-use formatter instances (creating Intl.DateTimeFormat is expensive)
const dateFmtLong = new Intl.DateTimeFormat("en-IN", {
  timeZone: DISPLAY_TZ,
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const dateFmtShort = new Intl.DateTimeFormat("en-IN", {
  timeZone: DISPLAY_TZ,
  day: "numeric",
  month: "short",
  year: "numeric",
});

// 24-hour clock — output: "14:55"
const timeFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: DISPLAY_TZ,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Format an event datetime string for display **always in UTC**,
 * regardless of the user's browser timezone.
 *
 * @param dateStr - Raw UTC datetime string from the API (ISO-8601 or date-only).
 * @returns `{ date, time }` — date is the long weekday form
 *          ("Friday, 13 March 2026") and time is 24-hour UTC
 *          ("14:55 UTC"). Both are empty strings when input is falsy/invalid.
 *
 * @example
 * const { date, time } = formatDateTime("2026-03-13T14:55:00.000Z");
 * // date → "Friday, 13 March 2026"
 * // time → "14:55 UTC"
 */
export function formatDateTime(dateStr: string | undefined | null): {
  date: string;
  time: string;
} {
  const d = toDate(dateStr);
  if (!d) return { date: dateStr ?? "", time: "" };
  try {
    const date = dateFmtLong.format(d);
    const time = timeFmt.format(d) + " IST"; // e.g. "08:25 IST"
    return { date, time };
  } catch {
    return { date: String(dateStr), time: "" };
  }
}

/**
 * Short date-only formatter for event cards and list headers.
 * Always in UTC. Example output: "13 Mar 2026".
 *
 * @param dateStr - Raw UTC datetime string from the API.
 */
export function formatEventDate(dateStr: string | undefined | null): string {
  const d = toDate(dateStr);
  if (!d) return dateStr ?? "";
  try {
    return dateFmtShort.format(d);
  } catch {
    return String(dateStr);
  }
}

/** Resolves image URL - supports full URLs and relative paths */
export function getEventImageUrl(imagePath: string | undefined): string {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  const base = API_URL.startsWith("/") ? window.location.origin + API_URL : API_URL;
  return `${base}/${imagePath.replace(/^\//, "")}`;
}
