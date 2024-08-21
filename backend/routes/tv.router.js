import express from "express";
const router = express.Router();

import {
  getTrendingTv,
  getTvTrailer,
  getTvDetails,
  getSimilarTv,
  getTvCategory,
} from "../controllers/tv.controller.js";

router.get("/trending", getTrendingTv);
router.get("/:id/trailers", getTvTrailer);
router.get("/:id/details", getTvDetails);
router.get("/:id/similar", getSimilarTv);
router.get("/:category", getTvCategory);

export default router;
