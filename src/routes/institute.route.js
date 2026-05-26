import express from "express";
import {
  createInstitute,
  getInstitutes,
  getInstituteById,
  updateInstitute,
  deleteInstitute
} from "../controllers/institute.controller.js";

const router = express.Router();

router.post("/", createInstitute);
router.post("/create", createInstitute);
router.get("/all", getInstitutes);
router.get("/:id", getInstituteById);
router.put("/:id", updateInstitute);
router.delete("/:id", deleteInstitute);

export default router;