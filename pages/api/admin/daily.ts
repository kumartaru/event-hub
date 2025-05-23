import { NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await openDB();
  const stats = await db.all(`
    SELECT DATE(timestamp) as date, COUNT(*) as registrations
    FROM registrations
    GROUP BY DATE(timestamp)
    ORDER BY date DESC
  `);
  res.json(stats);
}
