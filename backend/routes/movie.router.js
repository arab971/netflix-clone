import express from "express";
const movierouter = express.Router();
import {
  getMovieDetails,
  getMoviesCategory,
  getSimilarMovies,
  getTrendingMovie,
  getTrendingTrailer,
} from "../controllers/movie.controller.js";
movierouter.get("/trending", getTrendingMovie);
movierouter.get("/:id/trailers", getTrendingTrailer);
movierouter.get("/:id/details", getMovieDetails);
movierouter.get("/:id/similar", getSimilarMovies);
movierouter.get("/:category", getMoviesCategory);

export default movierouter;
