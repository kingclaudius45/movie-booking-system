import express from "express";
import { bookSeats, getMyBookings } from "../controllers/bookingController";
import { protect } from "../middleware/authMiddleware";
import { lockSeats } from "../controllers/bookingController";


const router = express.Router();

router.post("/", protect, bookSeats);
router.get("/my", protect, getMyBookings);

router.post("/lock", protect, lockSeats);
router.post("/confirm", protect, bookSeats);

export default router;