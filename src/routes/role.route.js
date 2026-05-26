import express from "express";
import {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole
} from "../controllers/role.controller.js";

const router = express.Router();

router.post("/", createRole);
router.post("/create", createRole);
router.get("/all", getRoles);
router.get("/:id", getRoleById);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);

export default router;