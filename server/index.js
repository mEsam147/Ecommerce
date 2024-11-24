import express from "express";
import dotenv from "dotenv";
import connectionToDb from "./config/dbConnection.js";

import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import cartRoute from "./routes/cart.route.js";
import couponRoute from "./routes/coupon.route.js";
import paymentRoute from "./routes/payment.route.js";
import analyticsRoute from "./routes/analytics.route.js";
import cors from "cors";
dotenv.config();
const app = express();

app.use(cookieParser());
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    optionsSuccessStatus: 200,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/coupon", couponRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/analytics", analyticsRoute);

app.listen(port, () => {
  connectionToDb();
  console.log(`server is running on port ${port}`);
});
