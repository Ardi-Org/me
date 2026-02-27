import { getServerSession } from "next-auth";
// import mysql from "mysql2/promise";

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "testdb",
// });

export async function GET() {
  const session = await getServerSession();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  // const [rows] = await pool.query(`
  //     SELECT DATE(created_at) AS day, COUNT(*) AS total
  //     FROM articles
  //     GROUP BY day
  //     ORDER BY day DESC
  //     LIMIT 30
  //   `);

  // return Response.json(rows);
  // return true;
}
