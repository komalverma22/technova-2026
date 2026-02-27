import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Users, FileText, Clock, Share2, Check, Phone } from "lucide-react";
import { API_URL, apiFetch } from "../../../lib/api";
import { getAuthToken } from "../../../lib/api";
import type { ApiEvent } from "../../../lib/events";
import { getEventImageUrl, formatDateTime } from "../../../lib/events";
import { useEventMeta } from "../../../lib/useEventMeta";
import { getEventCoordinators } from "../../../lib/eventCoordinators";
import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { BackButton } from "../BackButton";

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<ApiEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Dynamic OG / Twitter meta tags + page title for social sharing
  useEventMeta(event);

  useEffect(() => {
    if (!id) {
      setError("Event not found");
      setLoading(false);
      return;
    }

    const fetchEvent = async () => {
      setError("");
      try {
        const response = await apiFetch(`${API_URL}/api/events/${id}`, {
          method: "GET",
        });
        const data = await response.json();
        // console.log(data);


        if (!response.ok) {
          throw new Error(data.message || "Failed to load event");
        }

        setEvent(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const [copied, setCopied] = useState(false);

  const handleShareClick = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: event?.title ? `${event.title} — TechNova'26` : "TechNova'26 Event",
      text: event?.description?.slice(0, 120) ?? "Check out this event at TechNova'26!",
      url: shareUrl,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch { /* user dismissed */ }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRegisterClick = () => {
    const hasToken = getAuthToken();
    if (!hasToken) {
      window.location.href = `/login?redirect=/events/${id}/register`;
      return;
    }
    window.location.href = `/events/${id}/register`;
  };

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center px-4 py-24">
        <p className="text-lg text-slate-400">Loading event...</p>
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

  const maxTeam = event.maxTeamSize ?? (event as { maxTeaSize?: number }).maxTeaSize ?? event.minTeamSize;
  const imageUrl = getEventImageUrl(event.imagePath);
  const eventCoordinators = getEventCoordinators(event.title);

  return (
    <div className="relative min-h-svh">
      <div className="mx-auto max-w-4xl px-4 py-12 pb-48 sm:px-6 md:py-16">
        <div className="mb-4">
          <BackButton fallbackPath="/events" />
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/40">

          {/* Event poster – A4 portrait, full visible, no crop */}
          <div className="relative w-full overflow-hidden bg-slate-900 flex items-center justify-center">
            <img
              src={imageUrl || "/technova-img1.JPG"}
              alt={event.title}
              className="w-full object-contain"
              style={{ maxHeight: "60vh" }}
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <span className="mb-2 inline-block rounded bg-white/20 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                {event.department}
              </span>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {event.title}
              </h1>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="mb-8 flex flex-wrap gap-6 text-slate-400">
              <span className="flex items-center gap-2">
                <Calendar className="size-5 text-slate-500" />
                {formatDateTime(event.date).date}
              </span>
              {formatDateTime(event.date).time && (
                <span className="flex items-center gap-2">
                  <Clock className="size-5 text-slate-500" />
                  {formatDateTime(event.date).time}
                </span>
              )}
              {event.venue && (
                <span className="flex items-center gap-2">
                  <MapPin className="size-5 text-slate-500" />
                  {event.venue}
                </span>
              )}
              <span className="flex items-center gap-2">
                <Users className="size-5 text-slate-500" />
                Team size: {event.minTeamSize}–{maxTeam}
              </span>
            </div>

            <div className="space-y-6">
              <Card className="border-slate-700/50 bg-slate-800/30">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap text-slate-300">
                    {event.description}
                  </p>
                </CardContent>
              </Card>

              {event.rules && (
                <Card className="border-slate-700/50 bg-slate-800/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl text-white">
                      <FileText className="size-5" />
                      Rules
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="whitespace-pre-wrap text-slate-300">
                      {event.rules}
                    </p>
                    {/* Rulebook reference */}
                    <div className="flex items-start gap-3 rounded-lg border border-indigo-500/30 bg-indigo-500/5 px-4 py-3">
                      <FileText className="mt-0.5 size-4 shrink-0 text-indigo-400" />
                      <p className="text-sm text-indigo-300/90">
                        For complete rules &amp; regulations, please refer to the{" "}
                        <a
                          href="/brochure-technova_compressed.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-indigo-300 underline underline-offset-2 hover:text-indigo-100 transition-colors"
                        >
                          official TechNova&apos;26 Rulebook
                        </a>
                        . Participants are expected to read and abide by all guidelines before registering.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Event Coordinators Card */}
              {eventCoordinators && (() => {
                // Build a flat list of student contacts only
                const rows: { role: string; name: string; phone: string }[] = [];

                if (eventCoordinators.studentCoordinator) {
                  rows.push({
                    role: "Student Coordinator",
                    name: eventCoordinators.studentCoordinator.name,
                    phone: eventCoordinators.studentCoordinator.phone,
                  });
                }
                if (eventCoordinators.studentCoCoordinator) {
                  rows.push({
                    role: "Student Co-Coordinator",
                    name: eventCoordinators.studentCoCoordinator.name,
                    phone: eventCoordinators.studentCoCoordinator.phone,
                  });
                }

                if (rows.length === 0) return null;

                return (
                  <Card className="border-emerald-500/30 bg-emerald-500/5">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl text-emerald-400">
                        <Phone className="size-5" />
                        Event Coordinators
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-emerald-600/50 bg-emerald-900/40">
                              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-emerald-300">Role</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-emerald-300">Name</th>
                              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-emerald-300">Phone</th>
                              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-widest text-emerald-300">Call</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-emerald-700/30">
                            {rows.map((row, idx) => (
                              <tr key={idx} className="transition-colors duration-200 hover:bg-emerald-900/30">
                                <td className="px-4 py-3 text-emerald-300/70 text-xs font-medium whitespace-nowrap">{row.role}</td>
                                <td className="px-4 py-3 text-slate-100 font-medium whitespace-nowrap">{row.name}</td>
                                <td className="px-4 py-3 text-slate-300 font-mono text-sm whitespace-nowrap">
                                  {row.phone || <span className="text-slate-500 text-xs italic">—</span>}
                                </td>
                                <td className="px-4 py-3 text-center">
                                  {row.phone ? (
                                    <a
                                      href={`tel:${row.phone.replace(/\s/g, "")}`}
                                      className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:border-emerald-400/70 hover:bg-emerald-400/20 hover:text-emerald-200 transition-all duration-200"
                                      title={`Call ${row.name}`}
                                    >
                                      <Phone className="h-3.5 w-3.5" />
                                    </a>
                                  ) : (
                                    <span className="text-slate-600 text-xs">—</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                );
              })()}
            </div>

            {error && (
              <div className="mt-6 rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-red-400">
                {error}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-4 flex-wrap">
          <button
            onClick={handleShareClick}
            className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800/60 px-4 py-2 text-sm text-slate-300 hover:border-slate-400 hover:text-white transition-all"
          >
            {copied ? <Check className="size-4 text-green-400" /> : <Share2 className="size-4" />}
            {copied ? "Link copied!" : "Share event"}
          </button>
        </div>
      </div>

      {/* Register button – fixed bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center gap-3 px-4 py-3 bg-slate-950/80 backdrop-blur-sm border-t border-slate-800/60">
        <button
          onClick={handleShareClick}
          className="flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-900/80 backdrop-blur-sm px-4 py-3 text-sm font-semibold text-slate-200 hover:border-slate-400 hover:text-white transition-all shadow-xl shrink-0"
        >
          {copied ? <Check className="size-4 text-green-400" /> : <Share2 className="size-4" />}
          <span className="hidden xs:inline">{copied ? "Copied!" : "Share"}</span>
        </button>
        <Button
          variant="white"
          size="lg"
          onClick={handleRegisterClick}
          className="flex-1 sm:flex-none sm:min-w-[200px] py-3 text-base shadow-xl"
        >
          Register for this Event
        </Button>
      </div>
    </div>
  );
}
