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
import cors from "cors";
const app = express();
app.use(cors());
env.config();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3000;


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", movieRoutes); //put protection route hare if this will create problem for us
app.use("/api/v1/tv", tvRoutes);
app.use("/api/v1/search",  searchRoutes);

app.listen(port, (req, res) => {
  console.log(`http://localhost:${port}`);
  connectDB();
});
