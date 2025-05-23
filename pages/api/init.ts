import { NextApiRequest, NextApiResponse } from "next";
import { initDB } from "../../lib/initDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await initDB();
  res.status(200).json({ message: "Database initialized" });
}
