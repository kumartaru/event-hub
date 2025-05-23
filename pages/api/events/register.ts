import { NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../../lib/db";
import { Registration } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { event_id, user_email } = req.body;
  if (!event_id || !user_email)
    return res.status(400).json({ error: "Missing fields" });

  const db = await openDB();
  await db.run(
    'INSERT INTO registrations (event_id, user_email, timestamp) VALUES (?, ?, datetime("now"))',
    [event_id, user_email]
  );
  res.status(201).json({ message: "Registered" });
}
