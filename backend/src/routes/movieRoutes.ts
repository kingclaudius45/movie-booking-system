import express from "express";
import {
  createMovie,
  getMovies,
  getMovieById,
} from "../controllers/movieController";

import { protect } from "../middleware/authMiddleware";
import { adminOnly } from "../middleware/adminMiddleware";

const router = express.Router();

// Public routes
router.get("/", getMovies);
router.get("/:id", getMovieById);

// Protected route
router.post("/", protect, adminOnly, createMovie);

export default router;