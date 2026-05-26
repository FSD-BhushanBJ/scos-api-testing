import pool from "../config/db.js";

// CREATE
export const createInstituteModel = async (
  tenant_id,
  name,
  code,
  type,
  subtype,
  city,
  state
) => {
  return await pool.query(
    `INSERT INTO public.institutes 
   (tenant_id, name, code, type, subtype, city, state)
   VALUES ($1, $2, $3, $4, $5, $6, $7)
   RETURNING *`,
    [tenant_id, name, code, type, subtype, city, state],
  );
};

// GET ALL
export const getInstitutesModel = async () => {
  return await pool.query(`SELECT * FROM public.institutes ORDER BY id DESC`);
};

// GET BY ID
export const getInstituteByIdModel = async (id) => {
  return await pool.query(`SELECT * FROM public.institutes WHERE id = $1`, [
    id,
  ]);
};

// UPDATE
export const updateInstituteModel = async (
  id,
  tenant_id,
  name,
  code,
  type,
  subtype,
) => {
  return await pool.query(
    `UPDATE public.institutes
     SET tenant_id = $1,
         name = $2,
         code = $3,
         type = $4,
         subtype = $5
     WHERE id = $6
     RETURNING *`,
    [tenant_id, name, code, type, subtype, id],
  );
};

// DELETE
export const deleteInstituteModel = async (id) => {
  return await pool.query(
    `DELETE FROM public.institutes
     WHERE id = $1
     RETURNING *`,
    [id],
  );
};
