import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import movieRoutes from "./routes/movieRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Movie Booking API Running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

export default app; 