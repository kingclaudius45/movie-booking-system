import mongoose, { Document, Schema } from "mongoose";

export interface IMovie extends Document {
  title: string;
  description: string;
  duration: number;
  language: string;
  genre: string;
  releaseDate: Date;
  posterUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const movieSchema = new Schema<IMovie>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    posterUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model<IMovie>("Movie", movieSchema);

export default Movie;