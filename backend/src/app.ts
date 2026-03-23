import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import movieRoutes from "./routes/movieRoutes";
import showRoutes from './routes/showRoutes';
import bookingRoutes from "./routes/bookingRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Movie Booking API Running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

app.use("/api/shows", showRoutes);
app.use("/api/bookings", bookingRoutes);

export default app; 