import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) throw new Error("Access denied. No token provided.");

    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role === "admin") {
      next();
    } else {
      res.status(400).json("Access denied. You are not an admin.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
