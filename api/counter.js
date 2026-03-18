import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  const result = await sql`UPDATE counter SET value = value + 1 WHERE id = 1 RETURNING value`;
  return res.status(200).json({ value: result[0].value });
}
