import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Users, Plus } from "lucide-react";
import { API_URL, apiFetch, getAuthToken } from "../../../lib/api";
import type { ApiEvent } from "../../../lib/events";
import { getEventImageUrl, formatDateTime } from "../../../lib/events";
import { Button } from "../button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { Field, FieldGroup, FieldLabel } from "../field";
import { cn } from "../utils/cn";
import { BackButton } from "../BackButton";

// ── Types ─────────────────────────────────────────────────────────────────────
type TeamMember = {
  name: string;
  mobileNumber: string;
  email: string;
  rollNo: string;
  college: string;
  branch: string;
  semester: string;
};

const EMPTY_MEMBER: TeamMember = {
  name: "",
  mobileNumber: "",
  email: "",
  rollNo: "",
  college: "",
  branch: "",
  semester: "",
};

// ── Tiny styled input ─────────────────────────────────────────────────────────
function RegInput({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  inputMode,
  required,
}: {
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  required?: boolean;
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      inputMode={inputMode}
      required={required}
      className={cn(
        "w-full rounded-lg border border-slate-600/60 bg-slate-900/50 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none transition",
        "focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 hover:border-slate-500"
      )}
    />
  );
}

// ── Deadline check ───────────────────────────────────────────────────────────
function isAfterDeadlineIST(): boolean {
  // Target: 11 March 2026, 10:59 AM IST (UTC+05:30)
  // UTC equivalent: 11 March 2026, 05:29:00

  const targetUTC = Date.UTC(2026, 2, 12, 2, 30, 0);

  return Date.now() >= targetUTC;
}
// ── Main page ─────────────────────────────────────────────────────────────────
export default function EventRegistrationPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<ApiEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const minTeam = event?.minTeamSize ?? 1;
  const maxTeam =
    event?.maxTeamSize ??
    (event as { maxTeaSize?: number })?.maxTeaSize ??
    minTeam;
  const isSolo = minTeam === 1 && maxTeam === 1;
  const fixedTeamSize = minTeam === maxTeam;

  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState<TeamMember[]>([{ ...EMPTY_MEMBER }]);

  useEffect(() => {
    if (!id) {
      setError("Event not found");
      setLoading(false);
      return;
    }

    const hasToken = getAuthToken();
    if (!hasToken) {
      window.location.href = `/login?redirect=/events/${id}/register`;
      return;
    }

    const fetchEvent = async () => {
      setError("");
      try {
        const response = await apiFetch(`${API_URL}/api/events/${id}`, {
          method: "GET",
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to load event");

        setEvent(data);
        const evt = data as ApiEvent;
        const min = evt.minTeamSize ?? 1;
        setMembers(Array.from({ length: min }, () => ({ ...EMPTY_MEMBER })));
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const canAddMember = !fixedTeamSize && members.length < maxTeam;
  const canRemoveMember = !fixedTeamSize && members.length > minTeam;

  const addMember = () => {
    if (canAddMember) setMembers([...members, { ...EMPTY_MEMBER }]);
  };

  const updateMember = (index: number, field: keyof TeamMember, value: string) => {
    const next = [...members];
    next[index] = { ...next[index], [field]: value };
    setMembers(next);
  };

  const removeMember = (index: number) => {
    if (canRemoveMember) setMembers(members.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    // Validate all members have every required field
    const missing = members.some(
      (m) =>
        !m.name.trim() ||
        !m.mobileNumber.trim() ||
        !m.email.trim() ||
        !m.rollNo.trim() ||
        !m.college.trim() ||
        !m.branch.trim() ||
        !m.semester.trim()
    );
    if (missing) {
      setError("All fields for every member are required.");
      return;
    }

    // Validate mobile numbers
    const badMobile = members.find((m) => !/^[6-9]\d{9}$/.test(m.mobileNumber));
    if (badMobile) {
      setError(`Invalid mobile number for ${badMobile.name || "a member"} — enter a valid 10-digit number.`);
      return;
    }

    // Validate semester range
    const badSem = members.find((m) => {
      const s = Number(m.semester);
      return !Number.isInteger(s) || s < 1 || s > 10;
    });
    if (badSem) {
      setError(`Invalid semester for ${badSem.name || "a member"} — must be 1 to 10.`);
      return;
    }

    if (!isSolo && !teamName.trim()) {
      setError("Team name is required.");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const payload: {
        teamName?: string;
        teamMembers: object[];
      } = {
        teamMembers: members.map((m) => ({
          name: m.name.trim(),
          mobileNumber: m.mobileNumber.trim(),
          email: m.email.trim(),
          rollNo: m.rollNo.trim(),
          college: m.college.trim(),
          branch: m.branch.trim(),
          semester: Number(m.semester),
        })),
      };
      if (!isSolo) payload.teamName = teamName.trim();

      const response = await apiFetch(
        `${API_URL}/api/registrations/register/${id}`,
        { method: "POST", body: JSON.stringify(payload) }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Loading / error states ─────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center px-4 py-24">
        <p className="text-lg text-slate-400">Loading...</p>
      </div>
    );
  }

  if (error && !event) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 px-4 py-24">
        <p className="text-center text-lg text-red-400">{error}</p>
        <Link to="/events">
          <Button variant="white">Back to All Events</Button>
        </Link>
      </div>
    );
  }

  if (!event) return null;

  // ── Deadline gate ──────────────────────────────────────────────────────────
  if (isAfterDeadlineIST()) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 pb-24 sm:px-6 md:py-16">
        <div className="mb-4">
          <BackButton fallbackPath={`/events/${id}`} />
        </div>
        <Card className="border-red-500/30 bg-red-500/5">
          <CardHeader>
            <CardTitle className="text-xl text-red-400">
              🔒 Registration Closed
            </CardTitle>
            <CardDescription className="text-slate-400">
              The registration deadline for <strong>{event.title}</strong> has
              passed (10 March 2026, 11:59 PM IST). No further registrations
              are being accepted.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to={`/events/${id}`}>
              <Button variant="white">Back to Event</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const imageUrl = getEventImageUrl(event.imagePath);
  const { date, time } = formatDateTime(event.date);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 pb-24 sm:px-6 md:py-16">
      <div className="mb-4">
        <BackButton fallbackPath={`/events/${id}`} />
      </div>

      {success ? (
        <Card className="border-green-500/30 bg-green-500/5">
          <CardHeader>
            <CardTitle className="text-xl text-green-400">
              ✓ Registration Successful!
            </CardTitle>
            <CardDescription className="text-slate-400">
              You have successfully registered for <strong>{event.title}</strong>.
              Check your email for confirmation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/account">
              <Button variant="white">View My Registrations</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* ── Event info card ── */}
          <Card className="mb-8 overflow-hidden border-slate-700/50 bg-slate-800/40">
            <div className="relative h-40 overflow-hidden">
              <img
                src={imageUrl || "/technova-img1.JPG"}
                alt={event.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <span className="rounded bg-white/20 px-2 py-0.5 text-xs font-medium">
                  {event.department}
                </span>
                <h1 className="mt-2 text-2xl font-bold tracking-tight">
                  {event.title}
                </h1>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-300">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-4" />
                    {date}{time && ` • ${time}`}
                  </span>
                  {event.venue && (
                    <span className="flex items-center gap-1">
                      <MapPin className="size-4" />
                      {event.venue}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Users className="size-4" />
                    Team: {minTeam}–{maxTeam}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* ── Registration form ── */}
          <Card className="border-slate-700/50 bg-slate-800/40">
            <CardHeader>
              <CardTitle className="text-xl text-white">Registration Form</CardTitle>
              <CardDescription className="text-slate-400">
                Fill in the details for each team member. All fields are compulsory.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} noValidate>
                <FieldGroup>
                  {/* Error banner */}
                  {error && (
                    <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                      {error}
                    </div>
                  )}

                  {/* Team name */}
                  {!isSolo && (
                    <Field>
                      <FieldLabel htmlFor="teamName">Team Name</FieldLabel>
                      <RegInput
                        id="teamName"
                        placeholder="Enter your team name"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        required
                      />
                    </Field>
                  )}

                  {/* Members */}
                  {members.map((member, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-slate-700/50 bg-slate-900/30 p-4 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-200">
                          {isSolo ? "Your Details" : `Member ${index + 1}`}
                        </p>
                        {canRemoveMember && (
                          <button
                            type="button"
                            onClick={() => removeMember(index)}
                            className="text-xs text-red-400 hover:text-red-300 transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      {/* Row 1: Roll No + Full Name */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor={`rollNo-${index}`} className="text-xs font-medium text-slate-400">
                            Roll No. <span className="text-red-400">*</span>
                          </label>
                          <RegInput
                            id={`rollNo-${index}`}
                            placeholder="e.g. 24001001901"
                            value={member.rollNo}
                            onChange={(e) => updateMember(index, "rollNo", e.target.value)}
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor={`name-${index}`} className="text-xs font-medium text-slate-400">
                            Full Name <span className="text-red-400">*</span>
                          </label>
                          <RegInput
                            id={`name-${index}`}
                            placeholder="Full name"
                            value={member.name}
                            onChange={(e) => updateMember(index, "name", e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      {/* Row 2: Email + Mobile */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor={`email-${index}`} className="text-xs font-medium text-slate-400">
                            Email <span className="text-red-400">*</span>
                          </label>
                          <RegInput
                            id={`email-${index}`}
                            type="email"
                            placeholder="email@example.com"
                            value={member.email}
                            onChange={(e) => updateMember(index, "email", e.target.value)}
                            inputMode="email"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor={`mobile-${index}`} className="text-xs font-medium text-slate-400">
                            Mobile Number <span className="text-red-400">*</span>
                          </label>
                          <RegInput
                            id={`mobile-${index}`}
                            type="tel"
                            placeholder="10-digit number"
                            value={member.mobileNumber}
                            onChange={(e) => updateMember(index, "mobileNumber", e.target.value)}
                            inputMode="numeric"
                            required
                          />
                        </div>
                      </div>

                      {/* Row 3: College (full width) */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor={`college-${index}`} className="text-xs font-medium text-slate-400">
                          College/University Name <span className="text-red-400">*</span>
                        </label>
                        <RegInput
                          id={`college-${index}`}
                          placeholder="DCRUST, Murthal"
                          value={member.college}
                          onChange={(e) => updateMember(index, "college", e.target.value)}
                          required
                        />
                      </div>

                      {/* Row 4: Branch + Semester */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor={`branch-${index}`} className="text-xs font-medium text-slate-400">
                            Branch <span className="text-red-400">*</span>
                          </label>
                          <RegInput
                            id={`branch-${index}`}
                            placeholder="Computer Science"
                            value={member.branch}
                            onChange={(e) => updateMember(index, "branch", e.target.value)}
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor={`semester-${index}`} className="text-xs font-medium text-slate-400">
                            Semester <span className="text-red-400">*</span>
                          </label>
                          <RegInput
                            id={`semester-${index}`}
                            type="number"
                            placeholder="1 – 10"
                            value={member.semester}
                            onChange={(e) => updateMember(index, "semester", e.target.value)}
                            inputMode="numeric"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add member */}
                  {canAddMember && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addMember}
                      className="gap-2 border-slate-600 text-slate-300"
                    >
                      <Plus className="size-4" />
                      Add team member ({members.length}/{maxTeam})
                    </Button>
                  )}

                  <Button
                    type="submit"
                    variant="white"
                    disabled={submitting}
                    className="w-full py-6 text-base font-semibold"
                  >
                    {submitting ? "Submitting…" : "Submit Registration"}
                  </Button>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
