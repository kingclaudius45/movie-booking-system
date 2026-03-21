import express from "express";
import { getUserProfile, loginUser, registerUser } from "../controllers/authController"
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

export default router;