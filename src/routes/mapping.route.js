import express from "express";
import {
  createMapping,
  getMappings,
  getMappingById,
  updateMapping,
  deleteMapping
} from "../controllers/mapping.controller.js";

const router = express.Router();

router.post("/", createMapping);
router.get("/", getMappings);
router.post("/create", createMapping);
router.get("/all", getMappings);
router.get("/:id", getMappingById);
router.put("/:id", updateMapping);
router.delete("/:id", deleteMapping);

export default router;