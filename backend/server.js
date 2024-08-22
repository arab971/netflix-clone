import express from "express";
import authRoutes from "./routes/route.js";
import movieRoutes from "./routes/movie.router.js";
import { connectDB } from "./database/db.js";
import searchRoutes from "./routes/search.route.js";
import protectionRoutes from "./middleware/protectRoutes.js";
import tvRoutes from "./routes/tv.router.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import env from "dotenv";
const app = express();

env.config();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie",protectionRoutes, movieRoutes);
app.use("/api/v1/tv", protectionRoutes, tvRoutes);
app.use("/api/v1/search", protectionRoutes, searchRoutes);

app.listen(port, (req, res) => {
  console.log(`http://localhost:${port}`);
  connectDB();
});
