import { openDB } from "./db";

export async function initDB(): Promise<void> {
  const db = await openDB();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      date TEXT,
      category TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
    CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);

    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER,
      user_email TEXT,
      timestamp TEXT,
      FOREIGN KEY (event_id) REFERENCES events(id)
    );
    CREATE INDEX IF NOT EXISTS idx_registrations_event_id ON registrations(event_id);
    CREATE INDEX IF NOT EXISTS idx_registrations_timestamp ON registrations(timestamp);
  `);

  const count = await db.get("SELECT COUNT(*) as total FROM events");
  if (count.total === 0) {
    const now = new Date();
    const categories = ["Workshop", "Seminar", "Conference", "Meetup"];
    const sampleDescriptions = [
      "An engaging and interactive session.",
      "Expert insights into the latest trends.",
      "Hands-on experience and networking.",
      "Great opportunity to learn and connect.",
    ];

    for (let i = 1; i <= 30; i++) {
      const title = `Event ${i}: ${categories[i % categories.length]}`;
      const description = sampleDescriptions[i % sampleDescriptions.length];
      const date = new Date(now.getTime() + i * 86400000)
        .toISOString()
        .split("T")[0];
      const category = categories[i % categories.length];
      await db.run(
        "INSERT INTO events (title, description, date, category) VALUES (?, ?, ?, ?)",
        [title, description, date, category]
      );
    }
  }
}
