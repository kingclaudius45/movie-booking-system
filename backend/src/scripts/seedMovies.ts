import axios from "axios";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Movie from "../models/Movie";
import Show from "../models/Show";

dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const fetchMovies = async (retries = 3): Promise<any[]> => {
  try {
    console.log("Fetching TMDB movies...");

    const response = await axios.get(
      `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`,
      {
        timeout: 10000,
      }
    );

    return response.data.results;

  } catch (error) {
    console.log("❌ Error fetching movies. Retries left:", retries);

    if (retries > 0) {
      return fetchMovies(retries - 1);
    }

    throw error;
  }
};

const generateRandomShowTimes = (count: number) => {
  const times: Date[] = [];

  for (let i = 0; i < count; i++) {
    const now = new Date();

    const hour = Math.floor(Math.random() * (23 - 10 + 1)) + 10;
    const minute = Math.random() > 0.5 ? 0 : 30;

    const showTime = new Date(now);
    showTime.setHours(hour, minute, 0, 0);

    times.push(showTime);
  }

  return times;
};

const seedMovies = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected");

    // Clear old data
    await Movie.deleteMany();
    await Show.deleteMany();

    console.log("Old data cleared");

    // Fetch movies
    const movies = await fetchMovies();

    const insertedMovies = [];

    for (const movie of movies) {
      const newMovie = await Movie.create({
        title: movie.title,
        description: movie.overview,
        duration: 120,
        language: movie.original_language,
        genre: "General",
        releaseDate: movie.release_date,
        posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });

      insertedMovies.push(newMovie);
    }

    console.log("Movies inserted 🎬");

    // 🔥 CREATE RANDOM SHOWS
    for (const movie of insertedMovies) {
      const numberOfShows = Math.floor(Math.random() * 3) + 3; // 3–5 shows

      const showTimes = generateRandomShowTimes(numberOfShows);

      for (const time of showTimes) {
        await Show.create({
          movie: movie._id,
          showTime: time,
          totalSeats: 50,
          bookedSeats: [],
          lockedSeats: [],
        });
      }
    }

    console.log("Random shows created 🎭");

    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedMovies();