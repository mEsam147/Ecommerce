import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getCoupon, verifyCoupon } from "../controller/coupon.controller.js";

const router = express.Router();
router.get("/", protectedRoute, getCoupon);
router.post("/verify", protectedRoute, verifyCoupon);

export default router;
