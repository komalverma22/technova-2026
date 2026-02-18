import { useEffect, useState } from "react";

import { Button } from "../button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { FieldDescription, FieldGroup } from "../field";
import { API_URL } from "../../../lib/api";

type Event = {
  id?: string;
  _id?: string;
  imagePath: string;
  title: string;
  department: string;
  minTeamSize: number;
  maxTeaSize: number;
  description: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      setError("");
      setSuccessMessage("");
      try {
        const response = await fetch(
          `${API_URL}/api/events`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        console.log(data);
        

        if (!response.ok) {
          throw new Error(data.message || "Failed to load events");
        }

        const eventsData = Array.isArray(data) ? data : data.events || [];
        setEvents(eventsData);
      } catch (err: any) {
        setError(err.message || "Failed to load events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleRegister = async (eventId: string) => {
    setError("");
    setSuccessMessage("");

    const hasToken = document.cookie
      .split("; ")
      .some((cookie) => cookie.startsWith("token="));

    if (!hasToken) {
      setError("Please log in before registering for an event.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/registratons/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ eventId }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccessMessage("Successfully registered for the event.");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-5xl flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">All Events</CardTitle>
            <CardDescription>
              Explore all events and register to participate.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              {loading && (
                <FieldDescription>Loading events...</FieldDescription>
              )}

              {!loading && error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {!loading && !error && successMessage && (
                <div className="bg-green-500/10 border border-green-500 text-green-700 px-4 py-3 rounded">
                  {successMessage}
                </div>
              )}

              {!loading && !error && events.length === 0 && (
                <FieldDescription>
                  No events available at the moment.
                </FieldDescription>
              )}

              {!loading && !error && events.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2">
                  {events.map((event) => {
                    const eventId = event.id || event._id || event.title;

                    return (
                      <Card key={eventId}>
                        <CardHeader>
                          {event.imagePath && (
                            <div className="mb-3 overflow-hidden rounded-lg">
                              <img
                                src={API_URL+ "/"+event.imagePath}
                                alt={event.title}
                                className="h-48 w-full object-cover"
                              />
                            </div>
                          )}
                          <CardTitle className="text-lg">
                            {event.title}
                          </CardTitle>
                          <CardDescription>
                            {event.department} • Team size:{" "}
                            {event.minTeamSize} - {event.maxTeaSize}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                          <p className="text-sm text-slate-700">
                            {event.description}
                          </p>
                          <Button
                            variant="white"
                            className="w-full"
                            onClick={() => handleRegister(String(eventId))}
                          >
                            Register
                          </Button>
                        </CardContent>
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

