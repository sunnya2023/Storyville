import express from "express";
import {
  getMe,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/me", protectRoute, getMe); //로그인 여부 확인
router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;
