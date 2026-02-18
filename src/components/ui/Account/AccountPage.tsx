import { useEffect, useState } from "react";
import { LogOut, Calendar, MapPin, Users, User, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { Button } from "../button";
import { FieldDescription, FieldGroup } from "../field";
import { API_URL, apiFetch } from "../../../lib/api";
import type { ApiEvent } from "../../../lib/events";
import { getEventId, getEventImageUrl, formatDateTime } from "../../../lib/events";

/** Team member from registration API (backend may use mobile or mobileNumber) */
type TeamMember = {
  name: string;
  mobileNumber?: string;
  mobile?: string;
  email: string;
};

/** Registration item: event + team name + members (API may nest event or flatten) */
type MyRegistration = {
  event?: ApiEvent;
  teamName?: string | null;
  teamMembers?: TeamMember[] | null;
  /** When API returns flat event with extra fields */
  id?: number;
  title?: string;
  description?: string;
  department?: string;
  minTeamSize?: number;
  maxTeamSize?: number;
  maxTeaSize?: number;
  date?: string;
  venue?: string;
  rules?: string;
  imagePath?: string;
  createdAt?: string;
};

function getEventFromRegistration(item: MyRegistration): ApiEvent | null {
  if (item.event && typeof item.event === "object") return item.event as ApiEvent;
  if (item.title != null) {
    return {
      id: item.id,
      title: item.title,
      description: item.description ?? "",
      department: item.department ?? "",
      minTeamSize: item.minTeamSize ?? 0,
      maxTeamSize: item.maxTeamSize ?? item.maxTeaSize ?? 0,
      date: item.date ?? "",
      venue: item.venue,
      rules: item.rules,
      imagePath: item.imagePath,
      createdAt: item.createdAt,
    } as ApiEvent;
  }
  return null;
}

export default function AccountPage() {
  const [registrations, setRegistrations] = useState<MyRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const hasToken = document.cookie
      .split("; ")
      .some((cookie) => cookie.startsWith("token="));

    if (!hasToken) {
      setError("You must be logged in to view your dashboard.");
      setLoading(false);
      return;
    }
    const fetchEvents = async () => {
      try {
        const response = await apiFetch(`${API_URL}/api/registrations/myEvents`, {
          method: "GET",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load events");
        }

        setRegistrations(Array.isArray(data) ? data : []);
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load events. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/";
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-3xl flex-col gap-6">
        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>Your Dashboard</CardTitle>
              <CardDescription>
                Events in which you have registered.
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2 shrink-0"
            >
              <LogOut className="size-4" />
              Log out
            </Button>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              {loading && (
                <FieldDescription>Loading your events...</FieldDescription>
              )}

              {!loading && error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {!loading && !error && registrations.length === 0 && (
                <FieldDescription>
                  You have not registered for any events yet.
                </FieldDescription>
              )}

              {!loading && !error && registrations.length > 0 && (
                <div className="space-y-4">
                  {registrations.map((item, index) => {
                    const event = getEventFromRegistration(item);
                    if (!event) return null;
                    const eventId = String(getEventId(event));
                    const maxTeam =
                      event.maxTeamSize ??
                      (event as { maxTeaSize?: number }).maxTeaSize ??
                      event.minTeamSize;
                    const imageUrl = getEventImageUrl(event.imagePath);
                    const { date, time } = formatDateTime(event.date);
                    const teamName = item.teamName ?? null;
                    const members: TeamMember[] = Array.isArray(item.teamMembers)
                      ? item.teamMembers
                      : [];
                    const key = eventId + (teamName ?? "") + index;
                    return (
                      <Card
                        key={key}
                        className="overflow-hidden border-slate-700/50 bg-slate-800/40"
                      >
                        <div className="flex flex-col sm:flex-row">
                          {imageUrl && (
                            <div className="relative h-40 w-full shrink-0 overflow-hidden sm:h-auto sm:w-48">
                              <img
                                src={imageUrl}
                                alt={event.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex flex-1 flex-col p-4 sm:p-5">
                            <CardHeader className="p-0 pb-2">
                              <CardTitle className="text-lg text-white">
                                {event.title}
                              </CardTitle>
                              {teamName && (
                                <p className="mt-1 text-sm font-medium text-slate-300">
                                  Team: {teamName}
                                </p>
                              )}
                              <CardDescription className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-slate-400">
                                <span className="flex items-center gap-1">
                                  <Calendar className="size-3.5" />
                                  {date}
                                  {time && ` • ${time}`}
                                </span>
                                {event.venue && (
                                  <span className="flex items-center gap-1">
                                    <MapPin className="size-3.5" />
                                    {event.venue}
                                  </span>
                                )}
                                <span className="flex items-center gap-1">
                                  <Users className="size-3.5" />
                                  {event.department} • Team size: {event.minTeamSize}–
                                  {maxTeam}
                                </span>
                              </CardDescription>
                            </CardHeader>
                            {members.length > 0 && (
                              <div className="mt-4 rounded-lg border border-slate-600/50 bg-slate-900/30 p-3">
                                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                  Registered members
                                </p>
                                <ul className="space-y-2">
                                  {members.map((member, i) => (
                                    <li
                                      key={i}
                                      className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-300"
                                    >
                                      <span className="flex items-center gap-1.5 font-medium text-white">
                                        <User className="size-3.5 shrink-0" />
                                        {member.name}
                                      </span>
                                      {member.email && (
                                        <span className="flex items-center gap-1 text-slate-400">
                                          <Mail className="size-3.5 shrink-0" />
                                          {member.email}
                                        </span>
                                      )}
                                      {(member.mobileNumber ?? member.mobile) && (
                                        <span className="flex items-center gap-1 text-slate-400">
                                          <Phone className="size-3.5 shrink-0" />
                                          {member.mobileNumber ?? member.mobile}
                                        </span>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            <CardContent className="p-0 pt-3">
                              <Link
                                to={`/events/${eventId}`}
                                className="inline-block text-sm font-medium text-white underline-offset-2 hover:underline"
                              >
                                View event details →
                              </Link>
                            </CardContent>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
