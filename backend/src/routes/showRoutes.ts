import express from "express";
import {
  createShow,
  getShowsByMovie,
} from "../controllers/showController";

import { protect } from "../middleware/authMiddleware";
import { adminOnly } from "../middleware/adminMiddleware";

const router = express.Router();

router.post("/", protect, adminOnly, createShow);
router.get("/:movieId", getShowsByMovie);

export default router;