import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import {
  addToCart,
  clearCart,
  getAllCartItems,
  removeItem,
  updateQuantity,
} from "../controller/cart.controller.js";

const router = express.Router();

router.get("/", protectedRoute, getAllCartItems);
router.post("/:id", protectedRoute, addToCart);
router.put("/:id", protectedRoute, updateQuantity);
router.delete("/:id", protectedRoute, removeItem);
router.delete("/", protectedRoute, clearCart);

export default router;
