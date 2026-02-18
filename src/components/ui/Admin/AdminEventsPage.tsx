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
import { API_URL, apiFetch } from "../../../lib/api";

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

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
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

  const handleUpdate = (eventId: string) => {
    // TODO: Wire to actual update flow (modal / page)
    console.log("Update event", eventId);
  };

  const handleDelete = (eventId: string) => {
    // TODO: Wire to actual delete API when available
    console.log("Delete event", eventId);
  };

  const handleAddEvent = () => {
    // TODO: Wire to add event form
    console.log("Add new event");
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-5xl flex-col gap-6 relative">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Manage Events</CardTitle>
            <CardDescription>
              View, update, or delete events from the list below.
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

              {!loading && !error && events.length === 0 && (
                <FieldDescription>
                  No events found. Use the Add Event button below to create one.
                </FieldDescription>
              )}

              {!loading && !error && events.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Image
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Team Size
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {events.map((event) => {
                        const eventId = event.id || event._id || event.title;

                        return (
                          <tr key={eventId}>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {event.imagePath && (
                                <img
                                  src={event.imagePath}
                                  alt={event.title}
                                  className="h-12 w-20 rounded-md object-cover"
                                />
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-slate-900">
                              {event.title}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-700">
                              {event.department}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-700">
                              {event.minTeamSize} - {event.maxTeaSize}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-700">
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    handleUpdate(String(eventId))
                                  }
                                >
                                  Update
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() =>
                                    handleDelete(String(eventId))
                                  }
                                >
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </FieldGroup>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-6">
          <Button
            variant="white"
            size="lg"
            onClick={handleAddEvent}
          >
            Add Event
          </Button>
        </div>
      </div>
    </div>
  );
}

