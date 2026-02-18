import { API_URL } from "./api";

export type Event = {
  id?: number;
  title: string;
  description: string;
  department: string;
  minTeamSize: number;
  maxTeamSize: number;
  date: string;
  venue?: string;
  rules?: string;
  imagePath?: string;
  createdAt?: string;
};

/** API may return id or _id depending on serialization */
export type ApiEvent = Event & { _id?: string | number; maxTeaSize?: number };

/** Resolves event ID whether from id or _id */
export function getEventId(event: ApiEvent): string | number {
  return event.id ?? event._id ?? 0;
}

/** Formats date and time for display */
export function formatDateTime(dateStr: string | undefined) {
  if (!dateStr) return { date: "", time: "" };
  try {
    const d = new Date(dateStr);
    const date = d.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const time = d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return { date, time };
  } catch {
    return { date: dateStr, time: "" };
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
