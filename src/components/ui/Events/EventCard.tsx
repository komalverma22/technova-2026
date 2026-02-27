import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import type { ApiEvent } from "../../../lib/events";
import { getEventId, getEventImageUrl, formatDateTime } from "../../../lib/events";
import { Button } from "../button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";

type EventCardProps = {
  event: ApiEvent;
  variant?: "compact" | "full";
};


export function EventCard({ event, variant = "compact" }: EventCardProps) {
  const id = String(getEventId(event));
  const maxTeam = event.maxTeamSize ?? (event as { maxTeaSize?: number }).maxTeaSize ?? event.minTeamSize;
  const imageUrl = getEventImageUrl(event.imagePath);

  if (variant === "compact") {
    return (
      <Card className="group overflow-hidden border-slate-700/50 bg-slate-800/40 backdrop-blur-sm transition-all hover:border-slate-500/60 hover:bg-slate-800/60">
        {/* A4 portrait ratio ≈ 1 : 1.414 */}
        <div className="relative w-full overflow-hidden bg-slate-900" style={{ aspectRatio: "1 / 1.414" }}>
          <img
            src={imageUrl || "/technova-img1.JPG"}
            alt={event.title}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-2 left-3 right-3 flex items-center gap-2 text-xs text-white/90">
            <span className="rounded bg-slate-900/80 px-2 py-0.5 font-medium">
              {event.department}
            </span>
            <span className="flex items-center gap-1">
              <Users className="size-3" />
              {event.minTeamSize}-{maxTeam}
            </span>
          </div>
        </div>
        <CardHeader className="space-y-1 pb-2">
          <CardTitle className="line-clamp-1 text-lg text-white">
            {event.title}
          </CardTitle>
          <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="size-3.5" />
              {formatDateTime(event.date).date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {formatDateTime(event.date).time}
            </span>
            {event.venue && (
              <span className="flex items-center gap-1 truncate">
                <MapPin className="size-3.5 shrink-0" />
                {event.venue}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="line-clamp-2 mb-4 text-sm text-slate-400">
            {event.description}
          </p>
          <Link to={`/events/${id}`}>
            <Button variant="white" className="w-full">
              View Event
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // Full / list variant
  return (
    <Card className="overflow-hidden border-slate-700/50 bg-slate-800/40 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row">
        {/* A4 portrait ratio in list mode: fixed width, auto height via aspect ratio */}
        <div
          className="relative shrink-0 overflow-hidden bg-slate-900 w-full sm:w-52"
          style={{ aspectRatio: "1 / 1.414" }}
        >
          <img
            src={imageUrl || "/technova-img1.JPG"}
            alt={event.title}
            className="h-full w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <CardHeader className="p-0 pb-2">
            <CardTitle className="text-lg text-white">{event.title}</CardTitle>
            <CardDescription className="flex flex-wrap gap-x-4 gap-y-1 text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="size-3.5" />
                {formatDateTime(event.date).date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" />
                {formatDateTime(event.date).time}
              </span>
              {event.venue && (
                <span className="flex items-center gap-1">
                  <MapPin className="size-3.5" />
                  {event.venue}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Users className="size-3.5" />
                {event.minTeamSize}-{maxTeam}
              </span>
            </CardDescription>
          </CardHeader>
          <p className="line-clamp-2 flex-1 text-sm text-slate-400">
            {event.description}
          </p>
          <Link to={`/events/${id}`} className="mt-4 self-start">
            <Button variant="white">View Event</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
