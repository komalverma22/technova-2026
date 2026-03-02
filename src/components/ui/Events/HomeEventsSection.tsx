import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { API_URL, apiFetch } from "../../../lib/api";
import type { ApiEvent } from "../../../lib/events";
import { EventCard } from "./EventCard";
import { Button } from "../button";

const FALLBACK_LIMIT = 6;
const FEATURED_DEPT = "Centralized Events";

export function HomeEventsSection() {
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFeatured, setIsFeatured] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiFetch(`${API_URL}/api/events`, {
          method: "GET",
        });
        const data = await response.json();
        const list: ApiEvent[] = Array.isArray(data) ? data : data.events || [];

        // Prefer "Centralized Events" department
        const centralized = list.filter(
          (e) => (e.department ?? "").trim().toLowerCase() === FEATURED_DEPT.toLowerCase()
        );

        if (centralized.length > 0) {
          setEvents(centralized);
          setIsFeatured(true);
        } else {
          // Fallback: any 6 events
          setEvents(list.slice(0, FALLBACK_LIMIT));
          setIsFeatured(false);
        }
      } catch {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);


  if (loading) {
    return (
      <section id="events" className="relative w-full px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2
            className="mb-12 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
            style={{ fontFamily: "Eagle Lake" }}
          >
            FEATURED EVENTS
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-80 animate-pulse rounded-xl bg-slate-700/50"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0) return null;

  return (
    <section id="events" className="relative w-full px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
       <h2
  className="mb-4 text-center font-bold tracking-tight text-white text-[1.75rem] md:text-4xl lg:text-5xl xl:text-6xl"
  style={{ fontFamily: "Eagle Lake" }}
>
  

          {isFeatured ? "CENTRALIZED EVENTS" : "FEATURED EVENTS"}
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-slate-400">
          {isFeatured
            ? "Flagship events open to all participants — register and be part of the main stage at TechNova\u2019 26."
            : "Explore the highlights of Technova\u2019 26. From hackathons to workshops, there\u2019 s something for everyone."}
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.map((event) => (
            <EventCard key={String(event.id ?? event._id ?? event.title)} event={event} variant="compact" />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link to="/events">
            <Button
              variant="white"
              size="lg"
              className="gap-2 px-8 py-6 text-base"
            >
              View All Events
              <ArrowRight className="size-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
