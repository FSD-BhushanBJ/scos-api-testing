import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

console.log("DB CONFIG:", {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,

  options: "-c search_path=public"
});

export const connectDB = async () => {
  try {
    const res = await pool.query("SELECT current_database()");
    console.log("Database:", res.rows[0]);

    const tables = await pool.query(`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname='public'
    `);

    console.log("TABLES:", tables.rows);

  } catch (err) {
    console.error("DB ERROR:", err);
    process.exit(1);
  }
};

export default pool;