import express from "express";
import authRoutes from "./routes/route.js";
import movieRoutes from "./routes/movie.router.js";
import { connectDB } from "./database/db.js";
import tvRoutes from "./routes/tv.router.js";
import { protection  } from "./middleware/protectRoutes.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import env from "dotenv";
const app = express();

env.config();
app.use(cookieParser());

const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protection, movieRoutes);
app.use("/api/v1/tv", protection, tvRoutes);

app.listen(port, (req, res) => {
  console.log(`http://localhost:${port}`);
  connectDB();
});
