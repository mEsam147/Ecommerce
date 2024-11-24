import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { checkOut, checkOutSuccess } from "../controller/order.controller.js";

const router = express.Router();
router.post("/checkOut", protectedRoute, checkOut);
router.post("/checkout-Success", protectedRoute, checkOutSuccess);

export default router;
