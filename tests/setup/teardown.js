import pool from "../../src/config/db.js";

export default async function () {
  await pool.end();

}
