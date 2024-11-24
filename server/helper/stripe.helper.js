import Stripe from "stripe";
import dotenv from "dotenv";
import Coupon from "../models/coupon.model.js";

dotenv.config();
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createStripeCoupon = async (discountPercentAge) => {
  try {
    const coupon = await stripe.coupons.create({
      percent_off: discountPercentAge,
      duration: "once",
    });
    return coupon.id;
  } catch (error) {
    console.log(error);
  }
};

export const createCoupon = async (userId) => {
  try {
    const newCoupon = new Coupon({
      code: "gift" + Math.random().toString(36).substring(0, 8).toUpperCase(),
      expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      discountPercentAge: 10,
      userId: userId,
    });
    await newCoupon.save();
  } catch (error) {
    console.log(error);
  }
};
