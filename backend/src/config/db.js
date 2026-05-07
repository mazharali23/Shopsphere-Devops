import pg from "pg";
import { env } from "./env.js";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 10
});

export async function dbHealthcheck() {
  const res = await pool.query("SELECT 1 as ok");
  return res.rows?.[0]?.ok === 1;
}

