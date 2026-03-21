import { Request, Response } from "express";
import Movie from "../models/Movie";

// CREATE MOVIE
export const createMovie = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      duration,
      language,
      genre,
      releaseDate,
      posterUrl,
    } = req.body;

    // Basic validation
    if (
      !title ||
      !description ||
      !duration ||
      !language ||
      !genre ||
      !releaseDate ||
      !posterUrl
    ) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
      return;
    }

    const movie = await Movie.create({
      title,
      description,
      duration,
      language,
      genre,
      releaseDate,
      posterUrl,
    });

    res.status(201).json({
      success: true,
      message: "Movie created successfully",
      data: movie,
    });
  } catch (error) {
    console.error("Create movie error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// GET ALL MOVIES
export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    console.error("Get movies error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//  GET SINGLE MOVIE
export const getMovieById = async (req: Request, res: Response) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      res.status(404).json({
        success: false,
        message: "Movie not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    console.error("Get movie error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};