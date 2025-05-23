import { NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await openDB();
  const stats = await db.all(`
    SELECT e.title, COUNT(r.id) as registrations
    FROM registrations r
    JOIN events e ON e.id = r.event_id
    GROUP BY r.event_id
    ORDER BY registrations DESC
    LIMIT 5
  `);
  res.json(stats);
}
