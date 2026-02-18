import { useEffect, useState } from "react";
import { API_URL, apiFetch } from "../../../lib/api";
import type { ApiEvent } from "../../../lib/events";
import { EventCard } from "./EventCard";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { FieldDescription, FieldGroup } from "../field";

export default function EventsPage() {
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      setError("");
      try {
        const response = await apiFetch(`${API_URL}/api/events`, {
          method: "GET",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load events");
        }

        const list = Array.isArray(data) ? data : data.events || [];
        setEvents(list);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="relative min-h-svh px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Card className="mb-12 border-slate-700/50 bg-slate-800/40">
          <CardHeader className="text-center">
            <CardTitle
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
              style={{ fontFamily: "Eagle Lake" }}
            >
              All Events
            </CardTitle>
            <CardDescription className="text-slate-400">
              Explore all events and find the perfect one to participate in.
            </CardDescription>
          </CardHeader>
        </Card>

        <FieldGroup>
          {loading && (
            <FieldDescription className="py-12 text-center text-slate-400">
              Loading events...
            </FieldDescription>
          )}

          {!loading && error && (
            <div className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-red-400">
              {error}
            </div>
          )}

          {!loading && !error && events.length === 0 && (
            <FieldDescription className="py-12 text-center text-slate-400">
              No events available at the moment.
            </FieldDescription>
          )}

          {!loading && !error && events.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {events.map((event) => (
                <EventCard
                  key={String(event.id ?? event._id ?? event.title)}
                  event={event}
                  variant="compact"
                />
              ))}
            </div>
          )}
        </FieldGroup>
      </div>
    </div>
  );
}
