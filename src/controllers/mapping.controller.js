import {
  createMappingModel,
  getMappingsModel,
  getMappingByIdModel,
  updateMappingModel,
  deleteMappingModel
} from "../models/mappingModel.js";

// CREATE
export const createMapping = async (req, res) => {
  try {
    const { tenant_id, user_id, institute_id, role_id } = req.body;

    if (!tenant_id || !user_id || !institute_id || !role_id) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const result = await createMappingModel(
      tenant_id,
      user_id,
      institute_id,
      role_id
    );

    res.status(201).json({
      success: true,
      message: "Mapping created successfully",
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
export const getMappings = async (req, res) => {
  try {
    const result = await getMappingsModel();

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
export const getMappingById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await getMappingByIdModel(id);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Mapping not found",
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
export const updateMapping = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenant_id, user_id, institute_id, role_id } = req.body;

    if (!tenant_id || !user_id || !institute_id || !role_id) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const result = await updateMappingModel(
      id,
      tenant_id,
      user_id,
      institute_id,
      role_id
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Mapping not found",
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
export const deleteMapping = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteMappingModel(id);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Mapping not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Mapping deleted successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};