import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getCategoryProducts,
  getNewArrival,
  getRelatedProducts,
  toggleIsFeature,
  peopleAlsoBought,
  reviews,
  getSingleProduct,
  searchProduct,
  pageNation,
  getProductsByPrice,
} from "../controller/product.controller.js";
import { isAdmin, protectedRoute } from "../middleware/auth.middleware.js";
import upload from "../helper/multer.js";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/category/:category", getCategoryProducts);
router.get("/newArrival", getNewArrival);
router.get("/price", getProductsByPrice);

router.get("/pagination", pageNation);
router.get("/recommended", peopleAlsoBought);
router.get("/:id", getSingleProduct);
router.get("/:category/:currentId", getRelatedProducts);
router.get("/search/:query", searchProduct);

router.post(
  "/",
  upload.array("images", 5),
  protectedRoute,
  isAdmin,
  createProduct
);

router.post("/:id", protectedRoute, isAdmin, toggleIsFeature);

router.put("/review/:id", protectedRoute, reviews);

router.delete("/:id", protectedRoute, isAdmin, deleteProduct);

export default router;
