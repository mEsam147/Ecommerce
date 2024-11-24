import jwt from "jsonwebtoken";
import { generateTokens, setCookies } from "../helper/auth.helper.js";
import { storeRefreshInRedis } from "../helper/storeRefresh.js";
import User from "../models/user.model.js";
import { redis } from "../config/redis.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password)
      return res.status(400).json({ message: "Please fill in all fields" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        message: "User already exists",
      });
    const user = await User.create({
      name,
      email,
      password,
    });
    const { accessToken, refreshToken } = await generateTokens(user._id);
    storeRefreshInRedis(refreshToken);

    setCookies(res, accessToken, refreshToken);

    res.status(200).json({
      ...user._doc,
      password: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Please fill in all fields" });
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: "Wrong Email or Password" });

    const { accessToken, refreshToken } = await generateTokens(user._id);
    storeRefreshInRedis(refreshToken);
    setCookies(res, accessToken, refreshToken);

    res.status(200).json({
      ...user._doc,
      password: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ message: "No refresh token provided" });

    await redis.del("refreshToken", refreshToken);

    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.json({ message: "logout Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const myProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user)
      return res.status(403).json({
        message: "You are not authenticated",
      });
    res.json({
      ...user._doc,
      password: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
      return res.status(401).json({ message: "No refresh token provided" });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const storedToken = await redis.get("refresh_token");
    if (storedToken !== refreshToken)
      return res.status(403).json({ message: "Invalid refresh token" });

    const accessToken = jwt.sign(
      decoded.userId,
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "15m",
      }
    );
    res.cookie("accessToken", accessToken);
    res.json({ message: "Token refreshed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
