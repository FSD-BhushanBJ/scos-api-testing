import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

import {
  findUserByEmailModel,
  getUserMappingModel,
  getRolesByUserAndInstituteModel,
} from "../models/authModel.js";

import { MESSAGES } from "../constants/messages.js";

import {
  errorResponse,
  successResponse,
} from "../responses/responseHandler.js";

import pool from "../config/db.js";


// ───────────────── LOGIN ─────────────────
export const loginUser = async (req, res) => {
  console.log("LOGIN HIT");
  console.log(req.body);

  try {
    console.log("STEP 1: Request received");

    const { email, password } = req.body;

    console.log("STEP 2 EMAIL:", email);

    // Find user
    const userResult =
      await findUserByEmailModel(email);

    console.log(
      "STEP 3 USER FOUND:",
      userResult.rows.length
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const user = userResult.rows[0];

    console.log(
      "STEP 4 USER ID:",
      user.id
    );

    // compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    console.log(
      "STEP 5 PASSWORD MATCH:",
      isMatch
    );

    if (!isMatch) {
      return errorResponse(
        res,
        MESSAGES.INVALID_CREDENTIALS
      );
    }

    // institute + role mapping
    const mappingResult =
      await getUserMappingModel(user.id);

    console.log(
      "STEP 6 MAPPINGS:",
      mappingResult.rows
    );

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    console.log("STEP 7 TOKEN CREATED");

    return successResponse(res, {
      token,
      message: "Login success",

      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
      },

      // IMPORTANT
      institutes: mappingResult.rows,
    });

  } catch (error) {
    console.log(
      "LOGIN ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ───────────────── REGISTER ─────────────────
export const registerUser = async (req, res) => {
  try {

    const {
      first_name,
      last_name,
      email,
      mobile,
      password
    } = req.body;

    if (
      !first_name ||
      !last_name ||
      !email ||
      !mobile ||
      !password
    ) {
      return res.status(400).json({
        success:false,
        message:"All fields required"
      });
    }

    const full_name =
      `${first_name} ${last_name}`;

    const hashedPassword =
      await bcrypt.hash(password,10);

    const result = await pool.query(
      `
      INSERT INTO users
      (
        first_name,
        last_name,
        full_name,
        email,
        mobile,
        password_hash
      )

      VALUES
      ($1,$2,$3,$4,$5,$6)

      RETURNING id,email
      `,
      [
        first_name,
        last_name,
        full_name,
        email,
        mobile,
        hashedPassword
      ]
    );

    return successResponse(
      res,
      result.rows[0]
    );

  } catch(error){

    console.log(
      "REGISTER ERROR:",
      error
    );

    return errorResponse(
      res,
      "Registration failed"
    );
  }
};


// ───────────────── SELECT INSTITUTE ─────────────────
export const selectInstitute = async (
  req,
  res
) => {

  try {

    const { institute_id } =
      req.body;

    const user_id =
      req.user.id;

    if (!institute_id) {
      return res.status(400).json({
        success:false,
        message:"Institute required"
      });
    }

    const rolesResult =
      await getRolesByUserAndInstituteModel(
        user_id,
        institute_id
      );

    if(
      rolesResult.rows.length===0
    ){
      return errorResponse(
        res,
        MESSAGES.NO_ROLE
      );
    }

    const roles =
      rolesResult.rows;

    const flow =
      roles.length===1
      ? "dashboard"
      : "role_selection";

    return successResponse(
      res,
      {
        flow,
        institute_id,
        roles
      }
    );

  } catch(error){

    console.log(
      "SELECT ERROR:",
      error
    );

    return errorResponse(
      res,
      "Server error"
    );
  }
};