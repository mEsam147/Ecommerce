import Coupon from "../models/coupon.model.js";

export const getCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({
      userId: req.user._id,
      isActive: true,
    });
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    res.json(coupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyCoupon = async (req, res) => {
  const { code } = req.body;
  try {
    const coupon = await Coupon.findOne({
      code,
      userId: req.user._id,
      isActive: true,
    });

    if (!coupon) return res.status(400).json({ message: "Coupon Not Found" });

    if (coupon.expirationDate < new Date()) {
      coupon.isActive = false;
      await coupon.save(); // Correctly save the coupon instance
      return res.status(400).json({
        message: "Coupon Expired",
      });
    }

    // If the coupon is valid
    return res.json({
      message: "Coupon is Valid",
      code: coupon.code,
      discountPercentAge: coupon.discountPercentAge,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
