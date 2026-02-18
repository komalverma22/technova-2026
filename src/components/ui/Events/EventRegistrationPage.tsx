import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Users, Plus } from "lucide-react";
import { API_URL, apiFetch, getAuthToken } from "../../../lib/api";
import type { ApiEvent } from "../../../lib/events";
import { getEventImageUrl, formatDateTime } from "../../../lib/events";
import { Button } from "../button";
import { Input } from "../input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { Field, FieldGroup, FieldLabel } from "../field";

type TeamMember = {
  name: string;
  mobileNumber: string;
  email: string;
};

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
  const [members, setMembers] = useState<TeamMember[]>(() =>
    Array.from({ length: minTeam }, () => ({
      name: "",
      mobileNumber: "",
      email: "",
    }))
  );

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

        if (!response.ok) {
          throw new Error(data.message || "Failed to load event");
        }

        setEvent(data);
        const evt = data as ApiEvent;
        const min = evt.minTeamSize ?? 1;
        setMembers(
          Array.from({ length: min }, () => ({
            name: "",
            mobileNumber: "",
            email: "",
          }))
        );
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
    if (canAddMember) {
      setMembers([...members, { name: "", mobileNumber: "", email: "" }]);
    }
  };

  const updateMember = (index: number, field: keyof TeamMember, value: string) => {
    const next = [...members];
    next[index] = { ...next[index], [field]: value };
    setMembers(next);
  };

  const removeMember = (index: number) => {
    if (canRemoveMember) {
      setMembers(members.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    const invalid = members.some(
      (m) => !m.name.trim() || !m.mobileNumber.trim() || !m.email.trim()
    );
    if (invalid) {
      setError("All member fields (name, mobile, email) are required.");
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
        teamMembers: { name: string; mobileNumber: string; email: string }[];
      } = {
        teamMembers: members.map((m) => ({
          name: m.name.trim(),
          mobileNumber: m.mobileNumber.trim(),
          email: m.email.trim(),
        })),
      };
      if (!isSolo) payload.teamName = teamName.trim();

      const response = await apiFetch(
        `${API_URL}/api/registrations/register/${id}`,
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

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

  const imageUrl = getEventImageUrl(event.imagePath);
  const { date, time } = formatDateTime(event.date);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 pb-24 sm:px-6 md:py-16">
      <Link
        to={`/events/${id}`}
        className="mb-6 inline-block text-slate-400 hover:text-white"
      >
        ← Back to Event
      </Link>

      {success ? (
        <Card className="border-green-500/30 bg-green-500/5">
          <CardHeader>
            <CardTitle className="text-xl text-green-400">
              Registration Successful!
            </CardTitle>
            <CardDescription className="text-slate-400">
              You have successfully registered for {event.title}. Check your
              email for confirmation.
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
          {/* Event details - top */}
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
                    {date}
                    {time && ` • ${time}`}
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

          {/* Registration form */}
          <Card className="border-slate-700/50 bg-slate-800/40">
            <CardHeader>
              <CardTitle className="text-xl text-white">
                Registration Form
              </CardTitle>
              <CardDescription className="text-slate-400">
                Fill in the details below to register for this event.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <FieldGroup>
                  {error && (
                    <div className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-red-400">
                      {error}
                    </div>
                  )}

                  {/* Team name - only if not solo */}
                  {!isSolo && (
                    <Field>
                      <FieldLabel htmlFor="teamName">Team Name</FieldLabel>
                      <Input
                        id="teamName"
                        type="text"
                        placeholder="Enter your team name"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        required
                        className="border-slate-600 bg-slate-900/50 text-white"
                      />
                    </Field>
                  )}

                  {/* Team members */}
                  {members.map((member, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-slate-700/50 bg-slate-900/30 p-4"
                    >
                      <p className="mb-4 text-sm font-medium text-slate-300">
                        Member {index + 1}
                      </p>
                      <div className="space-y-4">
                        <Field>
                          <FieldLabel htmlFor={`name-${index}`}>Name</FieldLabel>
                          <Input
                            id={`name-${index}`}
                            type="text"
                            placeholder="Full name"
                            value={member.name}
                            onChange={(e) =>
                              updateMember(index, "name", e.target.value)
                            }
                            required
                            className="border-slate-600 bg-slate-900/50 text-white"
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor={`mobile-${index}`}>
                            Mobile Number
                          </FieldLabel>
                          <Input
                            id={`mobile-${index}`}
                            type="tel"
                            placeholder="10-digit mobile number"
                            value={member.mobileNumber}
                            onChange={(e) =>
                              updateMember(index, "mobileNumber", e.target.value)
                            }
                            required
                            className="border-slate-600 bg-slate-900/50 text-white"
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor={`email-${index}`}>
                            Email
                          </FieldLabel>
                          <Input
                            id={`email-${index}`}
                            type="email"
                            placeholder="email@example.com"
                            value={member.email}
                            onChange={(e) =>
                              updateMember(index, "email", e.target.value)
                            }
                            required
                            className="border-slate-600 bg-slate-900/50 text-white"
                          />
                        </Field>
                        {canRemoveMember && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeMember(index)}
                            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                          >
                            Remove member
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Add member button - until max (hidden when fixed team size) */}
                  {canAddMember && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addMember}
                      className="gap-2 border-slate-600"
                    >
                      <Plus className="size-4" />
                      Add team member ({members.length}/{maxTeam})
                    </Button>
                  )}

                  <Button
                    type="submit"
                    variant="white"
                    disabled={submitting}
                    className="w-full py-6"
                  >
                    {submitting ? "Submitting..." : "Submit Registration"}
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
