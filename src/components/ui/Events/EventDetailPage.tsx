import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Users, FileText, Clock } from "lucide-react";
import { API_URL, apiFetch } from "../../../lib/api";
import { getAuthToken } from "../../../lib/api";
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

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<ApiEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div className="relative min-h-svh">
      <div className="mx-auto max-w-4xl px-4 py-12 pb-32 sm:px-6 md:py-16">
        <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/40">
          <div className="relative aspect-[21/9] w-full overflow-hidden sm:aspect-[3/1]">
            <img
              src={imageUrl || "/technova-img1.JPG"}
              alt={event.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
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
                  <CardContent>
                    <p className="whitespace-pre-wrap text-slate-300">
                      {event.rules}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {error && (
              <div className="mt-6 rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-red-400">
                {error}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <Link to="/events" className="text-slate-400 hover:text-white">
            ← Back to All Events
          </Link>
        </div>
      </div>

      {/* Register button - center bottom absolute */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center px-4 py-4">
        <Button
          variant="white"
          size="lg"
          onClick={handleRegisterClick}
          className="min-w-[200px] px-8 py-6 text-lg shadow-xl"
        >
          Register for this Event
        </Button>
      </div>
    </div>
  );
}
