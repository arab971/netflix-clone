import express from "express";
import { SignUp,Login,LogOut, authCheck } from "../controllers/controllers.js";
import ProtectionRoutes from "../middleware/protectRoutes.js";
const router = express.Router();
router.post("/signup",SignUp)
router.post("/login",Login)
router.post("/logout",LogOut)
router.get("/authcheck", ProtectionRoutes ,authCheck)
export default router
