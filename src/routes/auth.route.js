import express from "express";
import { loginUser, selectInstitute, registerUser } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";


const router = express.Router();

// Public — no token needed
router.post("/login", loginUser);
router.post("/register", registerUser); 

// Protected — requires Bearer JWT
router.post("/select-institute", protect, selectInstitute);

export default router;