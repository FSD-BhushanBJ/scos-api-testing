import pool from "../config/db.js";

// CREATE
export const createRoleModel = async (name, code, description) => {
  return await pool.query(
    `INSERT INTO public.roles (name, code, description)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, code, description]
  );
};

// GET ALL
export const getRolesModel = async () => {
  return await pool.query(
    `SELECT * FROM public.roles ORDER BY id DESC`
  );
};

// GET BY ID
export const getRoleByIdModel = async (id) => {
  return await pool.query(
    `SELECT * FROM public.roles WHERE id = $1`,
    [id]
  );
};

// UPDATE
export const updateRoleModel = async (id, name, code, description) => {
  return await pool.query(
    `UPDATE public.roles
     SET name = $1,
         code = $2,
         description = $3
     WHERE id = $4
     RETURNING *`,
    [name, code, description, id]
  );
};

// DELETE
export const deleteRoleModel = async (id) => {
  return await pool.query(
    `DELETE FROM public.roles
     WHERE id = $1
     RETURNING *`,
    [id]
  );
};