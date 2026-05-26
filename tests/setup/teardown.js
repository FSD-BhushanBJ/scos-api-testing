import pool from "../../src/config/db.js";

export default async function () {

  console.log(
    "Closing database connection..."
  );

  await pool.end();

}