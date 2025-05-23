import { NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../../lib/db";
import { Event } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await openDB();

  const {
    category,
    date,
    page = "1",
    limit = "10",
    sort = "date",
    order = "asc",
  } = req.query;

  let query = "SELECT * FROM events";
  const conditions: string[] = [];
  const params: string[] = [];

  if (category) {
    conditions.push("category = ?");
    params.push(category as string);
  }
  if (date) {
    conditions.push("date = ?");
    params.push(date as string);
  }
  if (conditions.length) query += " WHERE " + conditions.join(" AND ");

  query += ` ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`;
  params.push(limit as string);
  params.push(((+page - 1) * +limit).toString());

  const events: Event[] = await db.all(query, params);
  res.json(events);
}
