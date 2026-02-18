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
  Phone,
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
  createdAt?: string;
};

type Registration = {
  id?: number | string;
  _id?: number | string;
  teamName?: string;
  event?: { title?: string; department?: string };
  // flat fields when event is not nested
  title?: string;
  department?: string;
  teamMember?: { name: string; email?: string; mobile?: string; mobileNumber?: string }[];
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
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    tab === id
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {icon}
                  <span className="hidden sm:inline">{label}</span>
                  {count > 0 && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        tab === id
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
                            <img src={imgUrl} alt={event.title} className="w-full h-full object-cover" />
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
          {/* Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800">
              <thead className="bg-slate-900">
                <tr>
                  {["#", "Name", "Email", "Joined"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                {users.map((user, i) => {
                  const uid = user.id ?? user._id ?? i;
                  const { date } = formatDateTime(user.createdAt);
                  return (
                    <tr key={String(uid)} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3 text-sm text-slate-500">{i + 1}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 text-xs font-bold shrink-0">
                            {(user.name ?? "?")[0].toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-white">{user.name ?? "—"}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 text-sm text-slate-300">
                          <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          {user.email ?? "—"}
                        </div>
                      </td>
                      {/* <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 text-sm text-slate-300">
                          <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          {user.mobileNumber ?? user.mobile ?? "—"}
                        </div>
                      </td> */}
                      <td className="px-4 py-3 text-xs text-slate-400">{date || "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-slate-800">
            {users.map((user, i) => {
              const uid = user.id ?? user._id ?? i;
              return (
                <div key={String(uid)} className="p-4 bg-slate-900/40 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 text-sm font-bold shrink-0">
                    {(user.name ?? "?")[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white">{user.name ?? "—"}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email ?? "—"}</p>
                    {/* <p className="text-xs text-slate-500">{user.mobileNumber ?? user.mobile ?? ""}</p> */}
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

function RegistrationsTab({
  registrations,
  loading,
  error,
}: {
  registrations: Registration[];
  loading: boolean;
  error: string;
}) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">All Registrations</h1>
        <p className="text-slate-400 text-sm mt-0.5">
          Every event registration so far — {registrations.length} total
        </p>
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

      {!loading && !error && registrations.length > 0 && (
        <div className="rounded-2xl border border-slate-800 overflow-hidden">
          {/* Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800">
              <thead className="bg-slate-900">
                <tr>
                  {["#", "Event", "Department", "Team Name", "Members", "Registered On"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                {registrations.map((reg, i) => {
                  const rid = reg.id ?? reg._id ?? i;
                  const eventTitle = reg.event?.title ??reg.title ?? "—";
                  const dept = reg.event?.department ?? reg.department ?? "—";
                  const { date } = formatDateTime(reg.createdAt);
                  // console.log();
                  
                  const members = reg.teamMember ?? [];
                  return (
                    <tr key={String(rid)} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3 text-sm text-slate-500">{i + 1}</td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-semibold text-white">{eventTitle}</p>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                          {dept}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-300">
                        {reg.teamName  ?? <span className="text-slate-600 italic">Solo</span>}
                      </td>
                      <td className="px-4 py-3">
                        {members.length > 0 ? (
                          <div className="flex flex-col gap-0.5">
                            {members.map((m, mi) => (
                              <div key={mi} className="flex items-center gap-1.5 text-xs text-slate-300">
                                <UserCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                                <span className="font-medium">{m.name}</span>
                                {m.mobileNumber && <span className="text-slate-500">· {m.mobileNumber}</span>}
                                {m.mobileNumber && <span className="text-slate-500">· {m.mobileNumber}</span>}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-600">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-400">{date || "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-slate-800">
            {registrations.map((reg, i) => {
              const rid = reg.id ?? reg._id ?? i;
              const eventTitle = reg.event?.title ?? reg.title ?? "—";
              const dept = reg.event?.department ?? reg.department ?? "—";
              const { date } = formatDateTime(reg.createdAt);
              const members = reg.teamMember ?? [];
              return (
                <div key={String(rid)} className="p-4 bg-slate-900/40 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-white">{eventTitle}</p>
                      <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        {dept}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 shrink-0">{date || "—"}</span>
                  </div>
                  {reg.teamName && (
                    <p className="text-xs text-slate-400">Team: <span className="text-white font-medium">{reg.teamName}</span></p>
                  )}
                  {members.length > 0 && (
                    <div className="space-y-1">
                      {members.map((m, mi) => (
                        <div key={mi} className="flex items-center gap-1.5 text-xs text-slate-300">
                          <UserCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                          {m.name} {m.email && <span className="text-slate-500">· {m.email}</span>}
                        </div>
                      ))}
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
