import {
  createInstituteModel,
  getInstitutesModel,
  getInstituteByIdModel,
  updateInstituteModel,
  deleteInstituteModel,
} from "../models/instituteModel.js";

// CREATE (same logic)
export const createInstitute = async (req, res) => {
  try {
    const { tenant_id, name, code, type, subtype, city, state } = req.body;

    if (!tenant_id) {
      return res.status(400).json({
        success: false,
        message: "tenant_id is required",
      });
    }

    const result = await createInstituteModel(
      tenant_id,
      name,
      code,
      type,
      subtype,
      city,
      state,
    );

    res.status(201).json({
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

// GET ALL
export const getInstitutes = async (req, res) => {
  try {
    const result = await getInstitutesModel();

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
export const getInstituteById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await getInstituteByIdModel(id);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Institute not found",
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
export const updateInstitute = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenant_id, name, code, type, subtype } = req.body;

    const result = await updateInstituteModel(
      id,
      tenant_id,
      name,
      code,
      type,
      subtype,
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Institute not found",
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
export const deleteInstitute = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteInstituteModel(id);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Institute not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Institute deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
