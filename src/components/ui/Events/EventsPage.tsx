import { useEffect, useState, useMemo } from "react";
import { API_URL, apiFetch } from "../../../lib/api";
import type { ApiEvent } from "../../../lib/events";
import { getEventId, formatEventDate } from "../../../lib/events";
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

// ─── Component ────────────────────────────────────────────────────────────────
export default function EventsPage() {
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("date");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("");

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

  // ── All unique departments (always from full list for stable chip set) ────
  const departments = useMemo(() =>
    [...new Set(events.map((ev) => ev.department || "Other"))].sort(),
    [events]
  );

  // ── Filtered list (drives all derived views) ──────────────────────────────
  const filteredEvents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return events.filter((ev) => {
      const matchesDept = !selectedDept || (ev.department || "Other") === selectedDept;
      const matchesQuery = !q || [ev.title, ev.department, ev.venue, ev.description]
        .some((field) => field?.toLowerCase().includes(q));
      return matchesDept && matchesQuery;
    });
  }, [events, searchQuery, selectedDept]);

  const sortedByDate = useMemo(() => sortByDate(filteredEvents), [filteredEvents]);
  const groupedByDept = useMemo(() => groupByDepartment(filteredEvents), [filteredEvents]);

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

        {/* ── Search bar ───────────────────────────────────────────────────── */}
        {!loading && !error && events.length > 0 && (
          <div className="mb-5 sm:mb-6">
            <div className="relative">
              {/* Magnifier icon */}
              <svg
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
              </svg>
              <input
                type="search"
                id="events-search"
                placeholder="Search by name, department, venue…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/60 py-2.5 pl-10 pr-10 text-sm text-white placeholder-slate-500 backdrop-blur-sm outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 hover:border-slate-600"
              />
              {/* Clear (×) button */}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            {/* Live result count */}
            {(searchQuery.trim() || selectedDept) && (
              <p className="mt-2 text-xs text-slate-500 pl-1">
                {filteredEvents.length === 0
                  ? "No events match your filters."
                  : `${filteredEvents.length} event${filteredEvents.length !== 1 ? "s" : ""} found`}
              </p>
            )}
          </div>
        )}

        {/* ── Department filter dropdown ────────────────────────────────────── */}
        {!loading && !error && departments.length > 1 && (
          <div className="mb-5 sm:mb-6">
            <div className="relative w-full sm:max-w-xs">
              {/* Filter icon */}
              <svg
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
                fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M11 12h2" />
              </svg>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className={`w-full appearance-none rounded-xl border py-2.5 pl-10 pr-8 text-sm backdrop-blur-sm outline-none transition cursor-pointer
                  ${selectedDept
                    ? "border-indigo-500 bg-indigo-600/20 text-white focus:ring-1 focus:ring-indigo-500/50"
                    : "border-slate-700 bg-slate-800/60 text-slate-300 hover:border-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
                  }`}
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {/* Chevron */}
              <svg
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
                fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
              </svg>
            </div>
          </div>
        )}

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

          {/* Empty — no events exist at all */}
          {!loading && !error && events.length === 0 && (
            <FieldDescription className="py-16 text-center text-slate-400">
              No events available at the moment.
            </FieldDescription>
          )}

          {/* Empty — filters returned nothing */}
          {!loading && !error && events.length > 0 && filteredEvents.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <svg
                className="h-10 w-10 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
              </svg>
              <p className="text-base font-medium text-slate-400">
                No events match
                {searchQuery && <> <span className="text-white">"{searchQuery}"</span></>}
                {selectedDept && searchQuery && <span className="text-slate-500"> in </span>}
                {selectedDept && <span className="text-white">{selectedDept}</span>}
              </p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedDept(""); }}
                className="mt-1 text-sm text-indigo-400 hover:text-indigo-300 transition underline underline-offset-2"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* ── Date sort view ──────────────────────────────────────────── */}
          {!loading && !error && filteredEvents.length > 0 && viewMode === "date" && (
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
          {!loading && !error && filteredEvents.length > 0 && viewMode === "department" && (
            <div className="space-y-10 sm:space-y-14">
              {Object.entries(groupedByDept)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([dept, deptEvents]) => (
                  <section key={dept}>
                    <div className="mb-4 flex flex-wrap items-center gap-2 sm:mb-5 sm:gap-4">
                      <h2 className="text-base font-bold text-white tracking-tight sm:text-xl">
                        {dept}
                      </h2>
                      <span className="rounded-full border border-indigo-500/25 bg-indigo-500/15 px-2 py-0.5 text-[11px] font-medium text-indigo-300 sm:px-2.5 sm:text-xs">
                        {deptEvents.length} event{deptEvents.length !== 1 ? "s" : ""}
                      </span>
                      {deptEvents[0]?.date && (
                        <span className="text-[11px] text-slate-500 sm:text-xs">
                          From{" "}
                          {formatEventDate(
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
