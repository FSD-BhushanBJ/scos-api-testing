import express from "express";
import {
  createTenant,
  getTenants,
  getTenantById,
  updateTenant,
  deleteTenant
} from "../controllers/tenant.controller.js";

const router = express.Router();

router.post("/", createTenant);
router.post("/create", createTenant);
router.get("/all", getTenants);
router.get("/:id", getTenantById);
router.put("/:id", updateTenant);
router.delete("/:id", deleteTenant);

export default router;