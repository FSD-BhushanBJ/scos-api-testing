import pool from "../config/db.js";

// CREATE
export const createMappingModel = async (
  tenant_id,
  user_id,
  institute_id,
  role_id
) => {
  return await pool.query(
    `INSERT INTO public.user_institute_roles 
     (tenant_id, user_id, institute_id, role_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [tenant_id, user_id, institute_id, role_id]
  );
};

// GET ALL
export const getMappingsModel = async () => {
  return await pool.query(
    `SELECT * FROM public.user_institute_roles ORDER BY id DESC`
  );
};

// GET BY ID
export const getMappingByIdModel = async (id) => {
  return await pool.query(
    `SELECT * FROM public.user_institute_roles WHERE id = $1`,
    [id]
  );
};

// UPDATE
export const updateMappingModel = async (
  id,
  tenant_id,
  user_id,
  institute_id,
  role_id
) => {
  return await pool.query(
    `UPDATE public.user_institute_roles
     SET tenant_id = $1,
         user_id = $2,
         institute_id = $3,
         role_id = $4
     WHERE id = $5
     RETURNING *`,
    [tenant_id, user_id, institute_id, role_id, id]
  );
};

// DELETE
export const deleteMappingModel = async (id) => {
  return await pool.query(
    `DELETE FROM public.user_institute_roles
     WHERE id = $1
     RETURNING *`,
    [id]
  );
};