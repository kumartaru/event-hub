import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

export async function openDB(): Promise<Database> {
  return open({
    filename: process.env.DATABASE_URL || './events.sqlite',
    driver: sqlite3.Database,
  });
}
