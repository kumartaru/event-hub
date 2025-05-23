import { NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../../lib/db";
import { Event } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await openDB();
  const { id } = req.query;
  const event: Event | undefined = await db.get(
    "SELECT * FROM events WHERE id = ?",
    [id]
  );
  if (!event) return res.status(404).json({ error: "Event not found" });
  res.json(event);
}
