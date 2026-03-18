import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const slabs = await sql`SELECT * FROM slabs ORDER BY created_at DESC`;
    return res.status(200).json(slabs);
  }
  if (req.method === 'POST') {
    const { id, stock_number, color_name, width, height, thickness, material, job, notes, photo, flagged, created_at } = req.body;
    await sql`INSERT INTO slabs (id, stock_number, color_name, width, height, thickness, material, job, notes, photo, flagged, created_at) VALUES (${id}, ${stock_number}, ${color_name}, ${width}, ${height}, ${thickness}, ${material}, ${job}, ${notes}, ${photo}, ${flagged}, ${created_at})`;
    return res.status(200).json({ success: true });
  }
  if (req.method === 'PUT') {
    const { id, stock_number, color_name, width, height, thickness, material, job, notes, photo, flagged, created_at } = req.body;
    await sql`UPDATE slabs SET stock_number=${stock_number}, color_name=${color_name}, width=${width}, height=${height}, thickness=${thickness}, material=${material}, job=${job}, notes=${notes}, photo=${photo}, flagged=${flagged}, created_at=${created_at} WHERE id=${id}`;
    return res.status(200).json({ success: true });
  }
  if (req.method === 'DELETE') {
    const { id } = req.body;
    await sql`DELETE FROM slabs WHERE id=${id}`;
    return res.status(200).json({ success: true });
  }
}
