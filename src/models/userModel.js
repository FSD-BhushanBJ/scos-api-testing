import pool from "../config/db.js";

// CREATE
export const createUserModel = async (
  first_name,
  last_name,
  full_name,
  email,
  mobile,
  password_hash
) => {
  return await pool.query(
    `INSERT INTO public.users 
     (first_name, last_name, full_name, email, mobile, password_hash)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [first_name, last_name, full_name, email, mobile, password_hash]
  );
};

// GET ALL
export const getUsersModel = async () => {
  return await pool.query(
    `SELECT id, first_name, last_name, full_name, email, mobile 
     FROM public.users
     ORDER BY id DESC`
  );
};

// GET BY ID
export const getUserByIdModel = async (id) => {
  return await pool.query(
    `SELECT id, first_name, last_name, full_name, email, mobile 
     FROM public.users
     WHERE id = $1`,
    [id]
  );
};

// UPDATE (password optional)
export const updateUserModel = async (
  id,
  first_name,
  last_name,
  full_name,
  email,
  mobile,
  password_hash // can be null
) => {
  return await pool.query(
    `UPDATE public.users
     SET first_name = $1,
         last_name = $2,
         full_name = $3,
         email = $4,
         mobile = $5,
         password_hash = COALESCE($6, password_hash)
     WHERE id = $7
     RETURNING id, first_name, last_name, full_name, email, mobile`,
    [first_name, last_name, full_name, email, mobile, password_hash, id]
  );
};

// DELETE
export const deleteUserModel = async (id) => {
  return await pool.query(
    `DELETE FROM public.users
     WHERE id = $1
     RETURNING id`,
    [id]
  );
};