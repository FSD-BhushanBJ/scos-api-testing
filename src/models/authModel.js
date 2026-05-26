import { query } from "../db/query.js";
console.log("AUTH MODEL UPDATED");
// FIND USER BY EMAIL
export const findUserByEmailModel = async (email) => {
  console.log("AUTH MODEL RUNNING");

  const test = await query(`
      SELECT current_database(),
             current_schema()
  `);

  console.log(test.rows);

  const tables = await query(`
      SELECT schemaname,tablename
      FROM pg_tables
      WHERE tablename='users'
  `);

  console.log("FOUND TABLES:", tables.rows);

  return await query(
      `SELECT * FROM public.users WHERE email=$1`,
      [email]
  );
};

// GET USER MAPPING (JOIN)
export const getUserMappingModel = async (user_id) => {
  return await query(
    `SELECT
      i.id AS institute_id,
      i.name AS institute_name,
      i.city,
      i.state,
      i.type,
      i.subtype,
      r.id AS role_id,
      r.name AS role_name
     FROM public.user_institute_roles uir
     JOIN public.institutes i ON uir.institute_id = i.id
     JOIN public.roles r ON uir.role_id = r.id
     WHERE uir.user_id = $1`,
    [user_id]
  );
};

// GET ROLES FOR A USER IN A SPECIFIC INSTITUTE
export const getRolesByUserAndInstituteModel = async (user_id, institute_id) => {
  return await query(
    `SELECT
      r.id AS role_id,
      r.name AS role_name
     FROM public.user_institute_roles uir
     JOIN public.roles r ON uir.role_id = r.id
     WHERE uir.user_id = $1 AND uir.institute_id = $2`,
    [user_id, institute_id]
  );
};