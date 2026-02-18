import { useEffect, useState, useCallback } from "react";
import {
  CalendarDays,
  Users,
  Pencil,
  Trash2,
  Plus,
  LogOut,
  RefreshCw,
  MapPin,
  Clock,
} from "lucide-react";
import { API_URL, apiFetch } from "../../../lib/api";
import type { ApiEvent } from "../../../lib/events";
import { getEventId, getEventImageUrl, formatDateTime } from "../../../lib/events";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

// ─── Types ────────────────────────────────────────────────────────────────────

type Stats = {
  events: number;
  users: number;
};

type Modal =
  | { type: "add" }
  | { type: "edit"; event: ApiEvent }
  | { type: "delete"; event: ApiEvent }
  | null;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function clearAdminCookie() {
  document.cookie = "admin=; path=/; max-age=0";
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [stats, setStats] = useState<Stats>({ events: 0, users: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState<Modal>(null);

  // ── Fetch events ────────────────────────────────────────────────────────────
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await apiFetch(`${API_URL}/api/events`, { method: "GET" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load events");
      const list: ApiEvent[] = Array.isArray(data) ? data : data.events ?? [];
      setEvents(list);
      setStats((prev) => ({ ...prev, events: list.length }));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load events");
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Fetch user count ─────────────────────────────────────────────────────────
  const fetchUserCount = useCallback(async () => {
    try {
      const res = await apiFetch(`${API_URL}/api/users`, { method: "GET" });
      if (!res.ok) return;
      const data = await res.json();
      const count = Array.isArray(data)
        ? data.length
        : data.count ?? data.total ?? data.users?.length ?? 0;
      setStats((prev) => ({ ...prev, users: count }));
    } catch {
      // silently ignore – users endpoint may not exist yet
    }
  }, []);

  useEffect(() => {
    fetchEvents();
    fetchUserCount();
  }, [fetchEvents, fetchUserCount]);

  const handleLogout = () => {
    clearAdminCookie();
    window.location.href = "/login";
  };

  const handleRefresh = () => {
    fetchEvents();
    fetchUserCount();
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* ── Top Navbar ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600">
                <span className="text-white font-bold text-xs">TN</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-none">TÉCHNOVA</p>
                <p className="text-[10px] text-slate-400 leading-none mt-0.5">Admin Dashboard</p>
              </div>
            </div>

            {/* Stat Pills */}
            <div className="hidden sm:flex items-center gap-3">
              <StatPill
                icon={<CalendarDays className="w-4 h-4 text-indigo-400" />}
                label="Events"
                value={stats.events}
              />
              <StatPill
                icon={<Users className="w-4 h-4 text-emerald-400" />}
                label="Users"
                value={stats.users}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                title="Refresh"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Stats ───────────────────────────────────────────────────── */}
      <div className="sm:hidden flex gap-3 px-4 pt-4">
        <StatPill
          icon={<CalendarDays className="w-4 h-4 text-indigo-400" />}
          label="Events"
          value={stats.events}
          full
        />
        <StatPill
          icon={<Users className="w-4 h-4 text-emerald-400" />}
          label="Users"
          value={stats.users}
          full
        />
      </div>

      {/* ── Main Content ───────────────────────────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">All Events</h1>
            <p className="text-slate-400 text-sm mt-0.5">
              Manage, edit, and delete events for TechNova 2026
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/40 px-4 py-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-20 rounded-xl bg-slate-800/50 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && events.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <CalendarDays className="w-12 h-12 text-slate-700 mb-4" />
            <p className="text-slate-400 text-lg font-medium">No events yet</p>
            <p className="text-slate-600 text-sm mt-1">
              Click "Add Event" below to create your first event.
            </p>
          </div>
        )}

        {/* Events Table */}
        {!loading && !error && events.length > 0 && (
          <div className="rounded-2xl border border-slate-800 overflow-hidden">
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-800">
                <thead className="bg-slate-900">
                  <tr>
                    {["Image", "Title", "Department", "Team Size", "Date", "Venue", "Actions"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                  {events.map((event) => {
                    const id = getEventId(event);
                    const { date } = formatDateTime(event.date);
                    const imgUrl = getEventImageUrl(event.imagePath);
                    return (
                      <tr
                        key={String(id)}
                        className="hover:bg-slate-800/40 transition-colors group"
                      >
                        {/* Image */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="w-16 h-10 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0">
                            {imgUrl ? (
                              <img
                                src={imgUrl}
                                alt={event.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-600">
                                <CalendarDays className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                        </td>
                        {/* Title */}
                        <td className="px-4 py-3">
                          <p className="text-sm font-semibold text-white">{event.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5 max-w-xs truncate">
                            {event.description}
                          </p>
                        </td>
                        {/* Department */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                            {event.department}
                          </span>
                        </td>
                        {/* Team Size */}
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-300">
                          {event.minTeamSize} – {event.maxTeamSize ?? event.maxTeaSize}
                        </td>
                        {/* Date */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-1 text-xs text-slate-400">
                            <Clock className="w-3 h-3" />
                            {date || "—"}
                          </div>
                        </td>
                        {/* Venue */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-1 text-xs text-slate-400">
                            <MapPin className="w-3 h-3" />
                            {event.venue || "—"}
                          </div>
                        </td>
                        {/* Actions */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setModal({ type: "edit", event })}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700 hover:border-indigo-500 transition-all"
                            >
                              <Pencil className="w-3 h-3" />
                              Edit
                            </button>
                            <button
                              onClick={() => setModal({ type: "delete", event })}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white border border-slate-700 hover:border-red-500 transition-all"
                            >
                              <Trash2 className="w-3 h-3" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-slate-800">
              {events.map((event) => {
                const id = getEventId(event);
                const { date } = formatDateTime(event.date);
                const imgUrl = getEventImageUrl(event.imagePath);
                return (
                  <div key={String(id)} className="p-4 bg-slate-900/40">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0">
                        {imgUrl ? (
                          <img src={imgUrl} alt={event.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-600">
                            <CalendarDays className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{event.title}</p>
                        <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                          {event.department}
                        </span>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{date || "—"}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.venue || "—"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => setModal({ type: "edit", event })}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700 hover:border-indigo-500 transition-all"
                      >
                        <Pencil className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => setModal({ type: "delete", event })}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white border border-slate-700 hover:border-red-500 transition-all"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Add Event Button ─────────────────────────────────────────────── */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setModal({ type: "add" })}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Event
          </button>
        </div>
      </main>

      {/* ── Modals ─────────────────────────────────────────────────────────── */}
      {modal?.type === "add" && (
        <AddEventModal
          onClose={() => setModal(null)}
          onSuccess={fetchEvents}
        />
      )}
      {modal?.type === "edit" && (
        <EditEventModal
          event={modal.event}
          onClose={() => setModal(null)}
          onSuccess={fetchEvents}
        />
      )}
      {modal?.type === "delete" && (
        <DeleteConfirmDialog
          eventId={getEventId(modal.event)}
          eventTitle={modal.event.title}
          onClose={() => setModal(null)}
          onSuccess={fetchEvents}
        />
      )}
    </div>
  );
}

// ─── Stat Pill ────────────────────────────────────────────────────────────────

function StatPill({
  icon,
  label,
  value,
  full,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  full?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/70 border border-slate-700/60 ${
        full ? "flex-1" : ""
      }`}
    >
      {icon}
      <div>
        <p className="text-[10px] text-slate-500 leading-none">{label}</p>
        <p className="text-sm font-bold text-white leading-tight mt-0.5">{value}</p>
      </div>
    </div>
  );
}
