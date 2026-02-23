import { useEffect, useState, useMemo } from "react";
import { API_URL, apiFetch } from "../../../lib/api";
import type { ApiEvent } from "../../../lib/events";
import { getEventId } from "../../../lib/events";
import { EventCard } from "./EventCard";
import { FieldDescription, FieldGroup } from "../field";
import { Card, CardDescription, CardHeader, CardTitle } from "../card";
import { BackButton } from "../BackButton";

// ─── Types ────────────────────────────────────────────────────────────────────
type ViewMode = "date" | "department";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function sortByDate(events: ApiEvent[]): ApiEvent[] {
  return [...events].sort(
    (a, b) => new Date(a.date ?? 0).getTime() - new Date(b.date ?? 0).getTime()
  );
}

function groupByDepartment(events: ApiEvent[]): Record<string, ApiEvent[]> {
  return events.reduce<Record<string, ApiEvent[]>>((acc, ev) => {
    const dept = ev.department || "Other";
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(ev);
    return acc;
  }, {});
}

function formatEventDate(dateStr: string | undefined): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function EventsPage() {
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("date");

  useEffect(() => {
    apiFetch(`${API_URL}/api/events`, { method: "GET" })
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.events || [];
        setEvents(list);
      })
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Failed to load events")
      )
      .finally(() => setLoading(false));
  }, []);

  const sortedByDate = useMemo(() => sortByDate(events), [events]);
  const groupedByDept = useMemo(() => groupByDepartment(events), [events]);

  return (
    <div className="relative min-h-svh px-3 py-14 sm:px-6 sm:py-20 md:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">

        <div className="mb-2">
          <BackButton fallbackPath="/" />
        </div>

        {/* ── Page header ─────────────────────────────────────────────────── */}
        <Card className="mb-6 border-slate-700/50 bg-slate-800/40 sm:mb-8">
          <CardHeader className="px-4 py-5 text-center sm:px-6 sm:py-6">
            <CardTitle
              className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl"
              style={{ fontFamily: "Eagle Lake" }}
            >
              All Events
            </CardTitle>
            <CardDescription className="mt-1 text-sm text-slate-400 sm:text-base">
              Explore all events and find the perfect one to participate in.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* ── View mode toggle ────────────────────────────────────────────── */}
        {!loading && !error && events.length > 0 && (
          <div className="mb-6 flex w-full items-center gap-2 sm:mb-8 sm:justify-center sm:gap-3">
            <button
              onClick={() => setViewMode("date")}
              className={`flex-1 sm:flex-none rounded-xl px-4 py-2.5 text-xs font-semibold transition-all sm:px-6 sm:text-sm ${viewMode === "date"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                : "border border-slate-700 bg-slate-800/60 text-slate-400 hover:bg-slate-700 hover:text-white"
                }`}
            >
              📅 <span className="hidden xs:inline">Sort by </span>Date &amp; Time
            </button>
            <button
              onClick={() => setViewMode("department")}
              className={`flex-1 sm:flex-none rounded-xl px-4 py-2.5 text-xs font-semibold transition-all sm:px-6 sm:text-sm ${viewMode === "department"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                : "border border-slate-700 bg-slate-800/60 text-slate-400 hover:bg-slate-700 hover:text-white"
                }`}
            >
              🏛 By Department
            </button>
          </div>
        )}

        <FieldGroup>
          {/* Loading skeletons */}
          {loading && (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 min-[480px]:grid-cols-2 xl:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 animate-pulse rounded-2xl bg-slate-700/40 sm:h-96" />
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Empty */}
          {!loading && !error && events.length === 0 && (
            <FieldDescription className="py-16 text-center text-slate-400">
              No events available at the moment.
            </FieldDescription>
          )}

          {/* ── Date sort view ──────────────────────────────────────────── */}
          {!loading && !error && events.length > 0 && viewMode === "date" && (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 min-[480px]:grid-cols-2 xl:grid-cols-3">
              {sortedByDate.map((event) => (
                <EventCard
                  key={String(getEventId(event))}
                  event={event}
                  variant="compact"
                />
              ))}
            </div>
          )}

          {/* ── Department view ──────────────────────────────────────────── */}
          {!loading && !error && events.length > 0 && viewMode === "department" && (
            <div className="space-y-10 sm:space-y-14">
              {Object.entries(groupedByDept)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([dept, deptEvents]) => (
                  <section key={dept}>
                    {/* Department heading */}
                    <div className="mb-4 flex flex-wrap items-center gap-2 sm:mb-5 sm:gap-4">
                      <h2 className="text-base font-bold text-white tracking-tight sm:text-xl">
                        {dept}
                      </h2>
                      <span className="rounded-full border border-indigo-500/25 bg-indigo-500/15 px-2 py-0.5 text-[11px] font-medium text-indigo-300 sm:px-2.5 sm:text-xs">
                        {deptEvents.length} event{deptEvents.length !== 1 ? "s" : ""}
                      </span>
                      {/* Date badge moves to new line on small screens */}
                      {deptEvents[0]?.date && (
                        <span className="text-[11px] text-slate-500 sm:text-xs">
                          From {formatEventDate(
                            [...deptEvents].sort(
                              (a, b) =>
                                new Date(a.date ?? 0).getTime() -
                                new Date(b.date ?? 0).getTime()
                            )[0].date
                          )}
                        </span>
                      )}
                      <div className="hidden flex-1 border-t border-slate-700/60 sm:block" />
                    </div>
                    <div className="grid gap-4 sm:gap-6 grid-cols-1 min-[480px]:grid-cols-2 xl:grid-cols-3">
                      {sortByDate(deptEvents).map((event) => (
                        <EventCard
                          key={String(getEventId(event))}
                          event={event}
                          variant="compact"
                        />
                      ))}
                    </div>
                  </section>
                ))}
            </div>
          )}
        </FieldGroup>
      </div>
    </div>
  );
}
