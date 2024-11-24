import express from "express";
import {
  login,
  logout,
  myProfile,
  refreshToken,
  register,
} from "../controller/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/me", protectedRoute, myProfile);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refreshToken", refreshToken);

export default router;
