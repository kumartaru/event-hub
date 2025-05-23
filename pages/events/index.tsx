import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Event } from "../../types";
import EventCard from "../../components/EventCard";
import Pagination from "../../components/Pagination";

interface EventsPageProps {
  events: Event[];
  page: number;
  hasNext: boolean;
}

export default function EventsPage({ events, page, hasNext }: EventsPageProps) {
  const router = useRouter();
  const { category, date } = router.query;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Upcoming Events</h1>
      <form method="get" className="flex flex-wrap gap-4">
        <input
          name="category"
          placeholder="Category"
          defaultValue={category as string}
          className="border p-2 rounded"
        />
        <input
          name="date"
          type="date"
          defaultValue={date as string}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Filter
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      <Pagination page={page} hasNext={hasNext} query={router.query} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = Number(query.page || "1");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events?${new URLSearchParams({
      ...query,
      page: String(page),
      limit: "9",
    })}`
  );
  const events = await res.json();
  return {
    props: {
      events,
      page,
      hasNext: events.length === 9,
    },
  };
};
