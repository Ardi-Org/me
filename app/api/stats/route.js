import { getServerSession } from "next-auth";
import mysql from "mysql2/promise";

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
// });

export async function GET() {
  const session = await getServerSession();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const [rows] = await pool.query(`
      SELECT DATE(tgl_update) AS day, COUNT(tab_update) AS total
      FROM tt_userevent
      WHERE DATE(tgl_update) = CURDATE()
      AND (tab_update LIKE '%SIASN%' OR tab_update LIKE '%SAPK%')
      GROUP BY tab_update 
      ORDER BY tgl_update DESC
      LIMIT 30
    `);

  return Response.json(rows);
}
