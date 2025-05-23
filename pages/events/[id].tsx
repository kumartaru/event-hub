import { GetServerSideProps } from "next";
import { Event } from "../../types";
import EventForm from "../../components/RegisterForm";

interface EventDetailProps {
  event: Event;
}

export default function EventDetail({ event }: EventDetailProps) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="text-sm text-gray-600 mb-4">
        {event.date} • {event.category}
      </p>
      <p className="mb-6">{event.description}</p>
      <EventForm eventId={event.id} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${params?.id}`
  );
  const event = await res.json();
  return { props: { event } };
};
