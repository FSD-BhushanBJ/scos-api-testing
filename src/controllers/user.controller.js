import bcrypt from "bcrypt";
import {
  createUserModel,
  getUsersModel,
  getUserByIdModel,
  updateUserModel,
  deleteUserModel
} from "../models/userModel.js";

// CREATE (your same logic)
export const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, mobile, password } = req.body;

    if (!first_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "First name, email and password are required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const full_name = `${first_name || ""} ${last_name || ""}`.trim();

    const result = await createUserModel(
      first_name,
      last_name,
      full_name,
      email,
      mobile,
      hashedPassword
    );

    const user = result.rows[0];
    delete user.password_hash;

    res.json({
      success: true,
      message: "User created successfully",
      data: user,
    });

  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// GET ALL
export const getUsers = async (req, res) => {
  try {
    const result = await getUsersModel();

    res.status(200).json({
      success: true,
      data: result.rows,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// GET BY ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await getUserByIdModel(id);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// UPDATE
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, mobile, password } = req.body;

    const full_name = `${first_name || ""} ${last_name || ""}`.trim();

    let hashedPassword = null;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const result = await updateUserModel(
      id,
      first_name,
      last_name,
      full_name,
      email,
      mobile,
      hashedPassword
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });

  } catch (error) {
    console.log("ERROR CODE:", error.code);

    console.log("FULL ERROR:", error);

    if (error.code === "23505") {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// DELETE
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteUserModel(id);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};