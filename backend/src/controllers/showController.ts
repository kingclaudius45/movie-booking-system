import { Request, Response } from "express";
import Show from "../models/Show";

// Create show (admin)
export const createShow = async (req: Request, res: Response) => {
  try {
    const { movieId, showTime } = req.body;

    const show = await Show.create({
      movie: movieId,
      showTime,
      totalSeats: 50,
      bookedSeats: [],
    });

    res.status(201).json({
      success: true,
      data: show,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating show",
    });
  }
};

// Get shows for movie
export const getShowsByMovie = async (req: Request, res: Response) => {
  try {
    const shows = await Show.find({ movie: req.params.movieId });

    res.json({
      success: true,
      data: shows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching shows",
    });
  }
};