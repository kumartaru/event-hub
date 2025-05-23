import Link from "next/link";
import { Event } from "../types";

export default function EventCard({ event }: { event: Event }) {
  return (
    <Link
      href={`/events/${event.id}`}
      className="border rounded-xl p-4 hover:bg-gray-50"
    >
      <h2 className="text-xl font-semibold">{event.title}</h2>
      <p className="text-sm text-gray-600">
        {event.date} • {event.category}
      </p>
      <p className="text-sm mt-1">{event.description.slice(0, 100)}...</p>
    </Link>
  );
}
