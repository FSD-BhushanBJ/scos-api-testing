import {
  createTenantModel,
  getTenantsModel,
  getTenantByIdModel,
  updateTenantModel,
  deleteTenantModel
} from "../models/tenantModel.js";

// CREATE 
export const createTenant = async (req, res) => {
  try {
    const { name, code } = req.body;

    const result = await createTenantModel(name, code);

    res.status(201).json({
      success: true,
      message: "Tenant created successfully",
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
export const getTenants = async (req, res) => {
  try {
    const result = await getTenantsModel();

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
export const getTenantById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await getTenantByIdModel(id);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found",
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
export const updateTenant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code } = req.body;

    const result = await updateTenantModel(id, name, code);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found",
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
export const deleteTenant = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteTenantModel(id);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tenant deleted successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};