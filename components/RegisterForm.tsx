import { useState } from "react";

export default function EventForm({ eventId }: { eventId: number }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/events/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_id: eventId, user_email: email }),
    });
    const data = await res.json();
    setMessage(data.message || data.error);
  }

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="border w-full p-2 rounded-md"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Register
      </button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </form>
  );
}
