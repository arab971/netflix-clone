import express from "express";
import { SignUp,Login,LogOut } from "../controllers/controllers.js";
const router = express.Router();
router.post("/signup",SignUp)
router.post("/login",Login)
router.post("/logout",LogOut)
export default router
