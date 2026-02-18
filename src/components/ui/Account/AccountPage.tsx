import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { Button } from "../button";
import { FieldDescription, FieldGroup } from "../field";
import { API_URL, apiFetch, getAuthToken } from "../../../lib/api";

type Event = {
  id: string;
  name: string;
  date: string;
  location?: string;
  description?: string;
};

export default function AccountPage() {
  const [events, setEvents] = useState<Event[]>([]);
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
    // console.log("THE AUTH TOKEN IS:",getAuthToken());

    const fetchEvents = async () => {
      try {
        const response = await apiFetch(
          `${API_URL}/api/registrations/myEvents`,
          {
            method: "GET",
            headers: {
              Authorization: ` ${getAuthToken()}`,
              "Content-Type": "application/json",
            },
          },
        );

        const data = await response.json();
        // console.log("THE DATA IS:", data[0]);

        if (!response.ok) {
          throw new Error(data.message || "Failed to load events");
        }

        setEvents(data || []);
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

              {!loading && !error && events.length === 0 && (
                <FieldDescription>
                  You have not registered for any events yet.
                </FieldDescription>
              )}

              {!loading && !error && events.length > 0 && (
                <div className="space-y-4">
                  {events.map((event) => (
                    <Card key={event.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{event.name}</CardTitle>
                        <CardDescription>
                          {event.date}
                          {event.location ? ` • ${event.location}` : ""}
                        </CardDescription>
                      </CardHeader>
                      {event.description && (
                        <CardContent>
                          <p className="text-sm text-slate-700">
                            {event.description}
                          </p>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
