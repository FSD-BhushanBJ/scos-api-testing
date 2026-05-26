import pool from "../config/db.js";

export const query = async (text, params) => {
  try {
    return await pool.query(text, params);
  } catch (error) {
    console.error("DB Error:", error);
    throw error;
  }
};