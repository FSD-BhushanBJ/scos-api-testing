import pool from "../config/db.js";

// CREATE
export const createTenantModel = async (name, code) => {
  return await pool.query(
    `INSERT INTO public.tenants (name, code)
     VALUES ($1, $2)
     RETURNING *`,
    [name, code]
  );
};

// GET ALL
export const getTenantsModel = async () => {
  return await pool.query(
    `SELECT * FROM public.tenants ORDER BY id DESC`
  );
};

// GET BY ID
export const getTenantByIdModel = async (id) => {
  return await pool.query(
    `SELECT * FROM public.tenants WHERE id = $1`,
    [id]
  );
};

// UPDATE
export const updateTenantModel = async (id, name, code) => {
  return await pool.query(
    `UPDATE public.tenants
     SET name = $1,
         code = $2
     WHERE id = $3
     RETURNING *`,
    [name, code, id]
  );
};

// DELETE
export const deleteTenantModel = async (id) => {
  return await pool.query(
    `DELETE FROM public.tenants
     WHERE id = $1
     RETURNING *`,
    [id]
  );
};