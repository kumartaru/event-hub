import useSWR from "swr";
import StatsList from "../../components/EventList";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminDashboard() {
  const { data: popular = [] } = useSWR("/api/admin/popular-events", fetcher);
  const { data: stats = [] } = useSWR("/api/admin/daily-stats", fetcher);

  return (
    <div className="p-6 space-y-8">
      <StatsList data={popular} label="Popular Events" />
      <StatsList data={stats} label="Daily Stats" />
    </div>
  );
}
