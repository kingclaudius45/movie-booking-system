import express from "express";
import { bookSeats } from "../controllers/bookingController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, bookSeats);

export default router;