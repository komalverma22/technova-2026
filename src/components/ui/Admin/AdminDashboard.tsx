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
  ClipboardList,
  Mail,
  UserCheck,
} from "lucide-react";
import { API_URL, apiFetch } from "../../../lib/api";
import type { ApiEvent } from "../../../lib/events";
import { getEventId, getEventImageUrl, formatDateTime } from "../../../lib/events";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "events" | "users" | "registrations";

type Stats = { events: number; users: number; registrations: number };

type Modal =
  | { type: "add" }
  | { type: "edit"; event: ApiEvent }
  | { type: "delete"; event: ApiEvent }
  | null;

type User = {
  id?: number | string;
  _id?: number | string;
  name?: string;
  email?: string;
  mobile?: string;
  mobileNumber?: string;
  rollNo?: string;
  branch?: string;
  college?: string;
  semester?: number | string;
  createdAt?: string;
};

type TeamMemberInfo = {
  name: string;
  email?: string;
  mobile?: string;
  mobileNumber?: string;
  rollNo?: string;
  college?: string;
  branch?: string;
  semester?: number | string;
};

type Registration = {
  id?: number | string;
  _id?: number | string;
  teamName?: string;
  event?: { title?: string; department?: string };
  // flat fields when event is not nested
  title?: string;
  department?: string;
  teamMember?: TeamMemberInfo[];
  // The account that registered (populated by backend)
  registrar?: { name?: string; email?: string; mobile?: string; mobileNumber?: string };
  user?: { name?: string; email?: string; mobile?: string; mobileNumber?: string };
  createdAt?: string;
};


// ─── Helpers ──────────────────────────────────────────────────────────────────

function clearAdminCookie() {
  document.cookie = "admin=; path=/; max-age=0";
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("events");
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [stats, setStats] = useState<Stats>({ events: 0, users: 0, registrations: 0 });
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingRegs, setLoadingRegs] = useState(false);
  const [errorEvents, setErrorEvents] = useState("");
  const [errorUsers, setErrorUsers] = useState("");
  const [errorRegs, setErrorRegs] = useState("");
  const [modal, setModal] = useState<Modal>(null);

  // ── Fetch events ─────────────────────────────────────────────────────────────
  const fetchEvents = useCallback(async () => {
    setLoadingEvents(true);
    setErrorEvents("");
    try {
      const res = await apiFetch(`${API_URL}/api/events`, { method: "GET" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load events");
      const list: ApiEvent[] = Array.isArray(data) ? data : data.events ?? [];
      setEvents(list);
      setStats((prev) => ({ ...prev, events: list.length }));
    } catch (err: unknown) {
      setErrorEvents(err instanceof Error ? err.message : "Failed to load events");
    } finally {
      setLoadingEvents(false);
    }
  }, []);

  // ── Fetch users ──────────────────────────────────────────────────────────────
  const fetchUsers = useCallback(async () => {
    setLoadingUsers(true);
    setErrorUsers("");
    try {
      const res = await apiFetch(`${API_URL}/allSignedUpUsers`, { method: "GET" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load users");
      const list: User[] = Array.isArray(data) ? data : data.users ?? [];
      setUsers(list);
      setStats((prev) => ({ ...prev, users: list.length }));
    } catch (err: unknown) {
      setErrorUsers(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  // ── Fetch registrations ──────────────────────────────────────────────────────
  const fetchRegistrations = useCallback(async () => {
    setLoadingRegs(true);
    setErrorRegs("");
    try {
      const res = await apiFetch(`${API_URL}/api/registrations/all`, { method: "GET" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load registrations");
      const list: Registration[] = Array.isArray(data) ? data : data.registrations ?? [];
      setRegistrations(list);
      setStats((prev) => ({ ...prev, registrations: list.length }));
    } catch (err: unknown) {
      setErrorRegs(err instanceof Error ? err.message : "Failed to load registrations");
    } finally {
      setLoadingRegs(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchEvents();
    fetchUsers();
    fetchRegistrations();
  }, [fetchEvents, fetchUsers, fetchRegistrations]);

  // Lazy-load tabs on first visit
  useEffect(() => {
    if (tab === "users" && users.length === 0 && !loadingUsers) fetchUsers();
    if (tab === "registrations" && registrations.length === 0 && !loadingRegs) fetchRegistrations();
  }, [tab]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRefresh = () => {
    if (tab === "events") fetchEvents();
    if (tab === "users") fetchUsers();
    if (tab === "registrations") fetchRegistrations();
  };

  const handleLogout = () => {
    clearAdminCookie();
    window.location.href = "/login";
  };

  // ── Nav tabs config ───────────────────────────────────────────────────────────
  const NAV_TABS: { id: Tab; label: string; icon: React.ReactNode; count: number }[] = [
    {
      id: "events",
      label: "Events",
      icon: <CalendarDays className="w-4 h-4" />,
      count: stats.events,
    },
    {
      id: "users",
      label: "Users",
      icon: <Users className="w-4 h-4" />,
      count: stats.users,
    },
    {
      id: "registrations",
      label: "Registrations",
      icon: <ClipboardList className="w-4 h-4" />,
      count: stats.registrations,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* ── Top Navbar ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600">
                <span className="text-white font-bold text-xs">TN</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-white leading-none">TÉCHNOVA</p>
                <p className="text-[10px] text-slate-400 leading-none mt-0.5">Admin Dashboard</p>
              </div>
            </div>

            {/* Tab Navigation */}
            <nav className="flex items-center gap-1">
              {NAV_TABS.map(({ id, label, icon, count }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                >
                  {icon}
                  <span className="hidden sm:inline">{label}</span>
                  {count > 0 && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${tab === id
                        ? "bg-white/20 text-white"
                        : "bg-slate-700 text-slate-300"
                        }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
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

      {/* ── Tab Content ────────────────────────────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {tab === "events" && (
          <EventsTab
            events={events}
            loading={loadingEvents}
            error={errorEvents}
            modal={modal}
            setModal={setModal}
            fetchEvents={fetchEvents}
          />
        )}
        {tab === "users" && (
          <UsersTab users={users} loading={loadingUsers} error={errorUsers} />
        )}
        {tab === "registrations" && (
          <RegistrationsTab
            registrations={registrations}
            loading={loadingRegs}
            error={errorRegs}
          />
        )}
      </main>

      {/* ── Modals ─────────────────────────────────────────────────────────── */}
      {modal?.type === "add" && (
        <AddEventModal onClose={() => setModal(null)} onSuccess={fetchEvents} />
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

// ─── Events Tab ───────────────────────────────────────────────────────────────

function EventsTab({
  events,
  loading,
  error,
  modal,
  setModal,
  fetchEvents,
}: {
  events: ApiEvent[];
  loading: boolean;
  error: string;
  modal: Modal;
  setModal: (m: Modal) => void;
  fetchEvents: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">All Events</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Manage, edit, and delete events for TechNova 2026
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/40 px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      {loading && <SkeletonRows />}

      {!loading && !error && events.length === 0 && (
        <EmptyState icon={<CalendarDays className="w-12 h-12 text-slate-700" />} label="No events yet" hint='Click "Add Event" below to create your first event.' />
      )}

      {!loading && !error && events.length > 0 && (
        <div className="rounded-2xl border border-slate-800 overflow-hidden">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800">
              <thead className="bg-slate-900">
                <tr>
                  {["Image", "Title", "Department", "Team Size", "Date", "Venue", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                {events.map((event) => {
                  const id = getEventId(event);
                  const { date } = formatDateTime(event.date);
                  const imgUrl = getEventImageUrl(event.imagePath);
                  return (
                    <tr key={String(id)} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="w-16 h-10 rounded-lg overflow-hidden bg-slate-800">
                          {imgUrl ? (
                            <img src={imgUrl} alt={event.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-600">
                              <CalendarDays className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-semibold text-white">{event.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5 max-w-xs truncate">{event.description}</p>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                          {event.department}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-300">
                        {event.minTeamSize} – {event.maxTeamSize ?? event.maxTeaSize}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="w-3 h-3" />{date || "—"}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <MapPin className="w-3 h-3" />{event.venue || "—"}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setModal({ type: "edit", event })}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700 hover:border-indigo-500 transition-all"
                          >
                            <Pencil className="w-3 h-3" /> Edit
                          </button>
                          <button
                            onClick={() => setModal({ type: "delete", event })}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white border border-slate-700 hover:border-red-500 transition-all"
                          >
                            <Trash2 className="w-3 h-3" /> Delete
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
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-800 shrink-0">
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
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700 transition-all"
                    >
                      <Pencil className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={() => setModal({ type: "delete", event })}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white border border-slate-700 transition-all"
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

      {/* Add Event button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setModal({ type: "add" })}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </div>
    </div>
  );
}

// ─── Users Tab ────────────────────────────────────────────────────────────────

function UsersTab({
  users,
  loading,
  error,
}: {
  users: User[];
  loading: boolean;
  error: string;
}) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Signed Up Users</h1>
        <p className="text-slate-400 text-sm mt-0.5">
          All registered users on TechNova 2026 — {users.length} total
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/40 px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      {loading && <SkeletonRows />}

      {!loading && !error && users.length === 0 && (
        <EmptyState icon={<Users className="w-12 h-12 text-slate-700" />} label="No users yet" hint="Users will appear here once they sign up." />
      )}

      {!loading && !error && users.length > 0 && (
        <div className="rounded-2xl border border-slate-800 overflow-hidden">
          {/* ── Desktop table ── */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800">
              <thead className="bg-slate-900">
                <tr>
                  {["#", "Name", "Roll No.", "Email", "Mobile", "Branch", "College", "Sem", "Joined"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                {users.map((user, i) => {
                  const uid = user.id ?? user._id ?? i;
                  const { date } = formatDateTime(user.createdAt);
                  const phone = user.mobileNumber ?? user.mobile;
                  return (
                    <tr key={String(uid)} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3 text-sm text-slate-500">{i + 1}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 text-xs font-bold shrink-0">
                            {(user.name ?? "?")[0].toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-white whitespace-nowrap">{user.name ?? "—"}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-300 whitespace-nowrap">{user.rollNo ?? "—"}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 text-sm text-slate-300">
                          <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          {user.email ?? "—"}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-300 whitespace-nowrap">{phone ?? "—"}</td>
                      <td className="px-4 py-3 text-sm text-slate-300 whitespace-nowrap">{user.branch ?? "—"}</td>
                      <td className="px-4 py-3 text-sm text-slate-300 max-w-[180px] truncate">{user.college ?? "—"}</td>
                      <td className="px-4 py-3 text-sm text-slate-300 text-center">{user.semester ?? "—"}</td>
                      <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{date || "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ── Mobile cards ── */}
          <div className="md:hidden divide-y divide-slate-800">
            {users.map((user, i) => {
              const uid = user.id ?? user._id ?? i;
              const phone = user.mobileNumber ?? user.mobile;
              const { date } = formatDateTime(user.createdAt);
              return (
                <div key={String(uid)} className="p-4 bg-slate-900/40 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 text-sm font-bold shrink-0">
                      {(user.name ?? "?")[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{user.name ?? "—"}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email ?? "—"}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 pl-1 text-xs">
                    {user.rollNo && (
                      <span className="text-slate-400">Roll No: <span className="text-slate-200">{user.rollNo}</span></span>
                    )}
                    {phone && (
                      <span className="text-slate-400">Mobile: <span className="text-slate-200">{phone}</span></span>
                    )}
                    {user.branch && (
                      <span className="text-slate-400">Branch: <span className="text-slate-200">{user.branch}</span></span>
                    )}
                    {user.semester != null && (
                      <span className="text-slate-400">Sem: <span className="text-slate-200">{user.semester}</span></span>
                    )}
                    {user.college && (
                      <span className="col-span-2 text-slate-400">College: <span className="text-slate-200">{user.college}</span></span>
                    )}
                    {date && (
                      <span className="col-span-2 text-slate-500">Joined: {date}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Registrations Tab ────────────────────────────────────────────────────────

type RegSortKey = "newest" | "oldest" | "event-asc" | "event-desc";

function sortRegistrations(regs: Registration[], key: RegSortKey): Registration[] {
  return [...regs].sort((a, b) => {
    if (key === "event-asc" || key === "event-desc") {
      const ta = (a.event?.title ?? a.title ?? "").toLowerCase();
      const tb = (b.event?.title ?? b.title ?? "").toLowerCase();
      return key === "event-asc" ? ta.localeCompare(tb) : tb.localeCompare(ta);
    }
    const da = new Date(a.createdAt ?? 0).getTime();
    const db = new Date(b.createdAt ?? 0).getTime();
    return key === "newest" ? db - da : da - db;
  });
}

function printRegistrations(registrations: Registration[], eventFilter: string) {
  const grouped: Record<string, Registration[]> = {};
  const sortedRegs = [...registrations].sort((a, b) =>
    (a.event?.title ?? a.title ?? "").toLowerCase().localeCompare(
      (b.event?.title ?? b.title ?? "").toLowerCase()
    )
  );
  for (const reg of sortedRegs) {
    const key = reg.event?.title ?? reg.title ?? "Unknown Event";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(reg);
  }

  const esc = (s: unknown) => String(s ?? "—").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const rows = Object.entries(grouped).map(([eventName, regs]) => {
    const memberRows = regs.flatMap((reg) => {
      const { date, time } = formatDateTime(reg.createdAt);
      const regDateTime = [date, time].filter(Boolean).join(" ");
      const members = reg.teamMember ?? [];
      const registrar = reg.registrar ?? reg.user;
      const registrarCell = registrar
        ? `<div><strong>${esc(registrar.name)}</strong></div><div>${esc(registrar.email)}</div><div>${esc(registrar.mobileNumber ?? registrar.mobile)}</div>`
        : "—";

      if (members.length === 0) {
        return `<tr>
          <td>${esc(eventName)}</td>
          <td>${esc(reg.teamName)}</td>
          <td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>
          <td>${esc(regDateTime)}</td>
          <td>${registrarCell}</td>
        </tr>`;
      }
      return members.map((m, mi) =>
        `<tr>
          ${mi === 0 ? `<td rowspan="${members.length}">${esc(eventName)}</td><td rowspan="${members.length}">${esc(reg.teamName)}</td>` : ""}
          <td>${esc(m.rollNo)}</td>
          <td>${esc(m.name)}</td>
          <td>${esc(m.email)}</td>
          <td>${esc(m.mobileNumber ?? m.mobile)}</td>
          <td>${esc(m.college)}</td>
          <td>${esc(m.branch)}</td>
          <td>${esc(m.semester)}</td>
          ${mi === 0 ? `<td rowspan="${members.length}">${esc(regDateTime)}</td><td rowspan="${members.length}">${registrarCell}</td>` : ""}
        </tr>`
      );
    });
    return memberRows.join("");
  });

  const filterLabel = eventFilter === "all" ? "All Events" : eventFilter;
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>TechNova 2026 – Registrations</title>
  <style>
    body { font-family: Arial, sans-serif; font-size: 11px; margin: 20px; color: #111; }
    h1 { font-size: 16px; margin-bottom: 4px; }
    p { margin: 0 0 14px; color: #555; font-size: 10px; }
    table { width: 100%; border-collapse: collapse; }
    th { background: #1e293b; color: #fff; text-align: left; padding: 7px 8px; font-size: 10px; text-transform: uppercase; letter-spacing: .04em; }
    td { padding: 6px 8px; border-bottom: 1px solid #e2e8f0; vertical-align: top; font-size: 11px; }
    tr:nth-child(even) td { background: #f8fafc; }
    .registrar { font-size: 10px; color: #475569; }
    @media print { button { display: none; } body { margin: 10px; } }
  </style>
</head>
<body>
  <h1>TechNova 2026 – Registrations: ${filterLabel}</h1>
  <p>Printed on ${new Date().toLocaleString("en-IN")} · ${registrations.length} registration(s)</p>
  <table>
    <thead>
      <tr>
        <th>Event</th><th>Team Name</th>
        <th>Roll No.</th><th>Member Name</th><th>Email</th><th>Mobile</th>
        <th>College</th><th>Branch</th><th>Sem</th>
        <th>Registered On</th><th>Registered By</th>
      </tr>
    </thead>
    <tbody>${rows.join("")}</tbody>
  </table>
  <script>window.onload = () => { window.print(); }<\/script>
</body>
</html>`;

  const win = window.open("", "_blank");
  if (win) { win.document.write(html); win.document.close(); }
}

function RegistrationsTab({
  registrations,
  loading,
  error,
}: {
  registrations: Registration[];
  loading: boolean;
  error: string;
}) {
  const [sortBy, setSortBy] = useState<RegSortKey>("newest");
  const [eventFilter, setEventFilter] = useState<string>("all");

  // Unique event names for filter dropdown
  const eventNames = Array.from(
    new Set(registrations.map((r) => r.event?.title ?? r.title ?? "Unknown Event"))
  ).sort((a, b) => a.localeCompare(b));

  // Apply filter, then sort
  const filtered = eventFilter === "all"
    ? registrations
    : registrations.filter((r) => (r.event?.title ?? r.title) === eventFilter);

  const sorted = sortRegistrations(filtered, sortBy);

  return (
    <div>
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-white sm:text-2xl">All Registrations</h1>
          <p className="mt-0.5 text-xs text-slate-400 sm:text-sm">
            {filtered.length} of {registrations.length} registration{registrations.length !== 1 ? "s" : ""}
            {eventFilter !== "all" && (
              <span className="ml-1 text-indigo-400 truncate"> · {eventFilter}</span>
            )}
          </p>
        </div>

        {!loading && !error && registrations.length > 0 && (
          /* On mobile: full-width column. On sm+: auto-width row */
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:flex-wrap">

            {/* Event filter */}
            <div className="flex items-center gap-2">
              <label htmlFor="reg-event" className="shrink-0 text-xs text-slate-400 sm:text-sm">
                Event:
              </label>
              <select
                id="reg-event"
                value={eventFilter}
                onChange={(e) => setEventFilter(e.target.value)}
                className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:w-auto sm:max-w-[200px] sm:text-sm"
              >
                <option value="all">All Events</option>
                {eventNames.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <label htmlFor="reg-sort" className="shrink-0 text-xs text-slate-400 sm:text-sm">
                Sort:
              </label>
              <select
                id="reg-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as RegSortKey)}
                className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:w-auto sm:text-sm"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="event-asc">Event A → Z</option>
                <option value="event-desc">Event Z → A</option>
              </select>
            </div>

            {/* Print */}
            <button
              onClick={() => printRegistrations(filtered, eventFilter)}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-indigo-500 sm:py-1.5 sm:text-sm"
            >
              🖨 Print
            </button>
          </div>
        )}
      </div>


      {error && (
        <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/40 px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      {loading && <SkeletonRows />}

      {!loading && !error && registrations.length === 0 && (
        <EmptyState icon={<ClipboardList className="w-12 h-12 text-slate-700" />} label="No registrations yet" hint="Registrations will appear here once participants sign up for events." />
      )}

      {!loading && !error && registrations.length > 0 && sorted.length === 0 && (
        <EmptyState icon={<ClipboardList className="w-12 h-12 text-slate-700" />} label="No registrations for this event" hint="Try selecting a different event from the filter." />
      )}

      {!loading && !error && sorted.length > 0 && (
        <div className="rounded-2xl border border-slate-800 overflow-hidden">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800">
              <thead className="bg-slate-900">
                <tr>
                  {["#", "Event", "Dept", "Team", "Members (Roll · Name · Email · Mobile · College · Branch · Sem)", "Registered By", "Date"].map((h) => (
                    <th key={h} className="px-3 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                {sorted.map((reg, i) => {
                  const rid = reg.id ?? reg._id ?? i;
                  const eventTitle = reg.event?.title ?? reg.title ?? "—";
                  const dept = reg.event?.department ?? reg.department ?? "—";
                  const { date, time } = formatDateTime(reg.createdAt);
                  const members = reg.teamMember ?? [];
                  const registrar = reg.registrar ?? reg.user;
                  return (
                    <tr key={String(rid)} className="hover:bg-slate-800/40 transition-colors align-top">
                      <td className="px-3 py-3 text-sm text-slate-500">{i + 1}</td>
                      <td className="px-3 py-3">
                        <p className="text-sm font-semibold text-white whitespace-nowrap">{eventTitle}</p>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">{dept}</span>
                      </td>
                      <td className="px-3 py-3 text-sm text-slate-300 whitespace-nowrap">
                        {reg.teamName ?? <span className="text-slate-600 italic text-xs">Solo</span>}
                      </td>
                      {/* Members */}
                      <td className="px-3 py-3">
                        {members.length > 0 ? (
                          <div className="flex flex-col gap-2">
                            {members.map((m, mi) => (
                              <div key={mi} className="text-xs space-y-0.5 border-b border-slate-800/60 pb-2 last:border-0 last:pb-0">
                                <div className="flex items-center gap-1.5">
                                  <UserCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                                  {m.rollNo && <span className="font-mono text-indigo-300">{m.rollNo}</span>}
                                  <span className="font-semibold text-white">{m.name}</span>
                                </div>
                                <div className="text-slate-400 pl-[18px]">{m.email ?? "—"}</div>
                                <div className="text-slate-400 pl-[18px]">{m.mobileNumber ?? m.mobile ?? "—"}</div>
                                <div className="text-slate-500 pl-[18px] text-[10px]">
                                  {[m.college, m.branch, m.semester ? `Sem ${m.semester}` : undefined].filter(Boolean).join(" · ") || "—"}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-600">—</span>
                        )}
                      </td>
                      {/* Registrar */}
                      <td className="px-3 py-3">
                        {registrar ? (
                          <div className="text-xs space-y-0.5">
                            <p className="font-semibold text-white">{registrar.name ?? "—"}</p>
                            <p className="text-slate-400">{registrar.email ?? "—"}</p>
                            <p className="text-slate-500">{registrar.mobileNumber ?? registrar.mobile ?? "—"}</p>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-600">—</span>
                        )}
                      </td>
                      {/* Date */}
                      <td className="px-3 py-3 whitespace-nowrap">
                        <p className="text-xs text-slate-300">{date || "—"}</p>
                        {time && <p className="text-[11px] text-slate-500">{time}</p>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-slate-800">
            {sorted.map((reg, i) => {
              const rid = reg.id ?? reg._id ?? i;
              const eventTitle = reg.event?.title ?? reg.title ?? "—";
              const dept = reg.event?.department ?? reg.department ?? "—";
              const { date, time } = formatDateTime(reg.createdAt);
              const members = reg.teamMember ?? [];
              const registrar = reg.registrar ?? reg.user;
              return (
                <div key={String(rid)} className="p-4 bg-slate-900/40 space-y-3">
                  {/* Event + date */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-white">{eventTitle}</p>
                      <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">{dept}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-slate-400">{date || "—"}</p>
                      {time && <p className="text-[11px] text-slate-500">{time}</p>}
                    </div>
                  </div>

                  {reg.teamName && (
                    <p className="text-xs text-slate-400">Team: <span className="text-white font-medium">{reg.teamName}</span></p>
                  )}

                  {/* Members */}
                  {members.length > 0 && (
                    <div className="space-y-2">
                      {members.map((m, mi) => (
                        <div key={mi} className="rounded-lg bg-slate-800/50 px-3 py-2 text-xs space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <UserCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                            {m.rollNo && <span className="font-mono text-indigo-300">{m.rollNo}</span>}
                            <span className="font-semibold text-white">{m.name}</span>
                          </div>
                          <p className="text-slate-400 pl-[18px]">{m.email ?? "—"}</p>
                          <p className="text-slate-400 pl-[18px]">{m.mobileNumber ?? m.mobile ?? "—"}</p>
                          <p className="text-slate-500 pl-[18px] text-[10px]">
                            {[m.college, m.branch, m.semester ? `Sem ${m.semester}` : undefined].filter(Boolean).join(" · ") || "—"}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Registrar */}
                  {registrar && (
                    <div className="rounded-lg border border-slate-700/40 bg-slate-800/30 px-3 py-2 text-xs">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1">Registered by</p>
                      <p className="font-semibold text-white">{registrar.name ?? "—"}</p>
                      <p className="text-slate-400">{registrar.email ?? "—"}</p>
                      <p className="text-slate-500">{registrar.mobileNumber ?? registrar.mobile ?? "—"}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}















// ─── Shared UI ────────────────────────────────────────────────────────────────

function SkeletonRows() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-16 rounded-xl bg-slate-800/50 animate-pulse" />
      ))}
    </div>
  );
}

function EmptyState({ icon, label, hint }: { icon: React.ReactNode; label: string; hint: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      {icon}
      <p className="text-slate-400 text-lg font-medium mt-4">{label}</p>
      <p className="text-slate-600 text-sm mt-1">{hint}</p>
    </div>
  );
}
