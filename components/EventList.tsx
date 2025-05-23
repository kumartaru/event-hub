export default function StatsList({
  data,
  label,
}: {
  data: any[];
  label: string;
}) {
  return (
    <section>
      <h1 className="text-xl font-bold mb-2">{label}</h1>
      <ul className="list-disc list-inside">
        {data.map((item, idx) => (
          <li key={idx}>{Object.values(item).join(": ")}</li>
        ))}
      </ul>
    </section>
  );
}
