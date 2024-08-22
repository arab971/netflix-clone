import express from "express";
import {
  searchmovie,
  searchperson,
  searchtv,
  getsearchhistory,
  deletesearchhistory
} from "../controllers/search.controller.js";
const router = express.Router();
router.get("/person/:query", searchperson);
router.get("/tv/:query", searchtv);
router.get("/movie/:query", searchmovie);
router.get("/history",getsearchhistory )
router.get("/deletehistory/:id",deletesearchhistory )
export default router;
