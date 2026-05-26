import {
  createRoleModel,
  getRolesModel,
  getRoleByIdModel,
  updateRoleModel,
  deleteRoleModel
} from "../models/roleModel.js";

// CREATE 
export const createRole = async (req, res) => {
  try {
    const { name, code, description } = req.body;

    const result = await createRoleModel(name, code, description);

    res.status(201).json({
      success: true,
      message: "Role created successfully",
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

// GET ALL
export const getRoles = async (req, res) => {
  try {
    const result = await getRolesModel();

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
export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await getRoleByIdModel(id);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
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
export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, description } = req.body;

    const result = await updateRoleModel(
      id,
      name,
      code,
      description
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
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

// DELETE
export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteRoleModel(id);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Role deleted successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};