import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import dotenv from "dotenv";
dotenv.config();
import {
  createCoupon,
  createStripeCoupon,
  stripe,
} from "../helper/stripe.helper.js";
export const checkOut = async (req, res) => {
  const { couponCode, products } = req.body;
  try {
    if (!Array.isArray(products) || products.length === 0)
      return res.status(400).json({ message: "No products selected" });

    let totalAmount = 0;

    const lineItems = products.map((product) => {
      const total = Math.round(product.price * 100);
      totalAmount += total * product.quantity;

      return {
        price_data: {
          currency: "USD",
          product_data: {
            name: product.name,
            images: [product.images[0]],
          },
          unit_amount: totalAmount,
        },
        quantity: product.quantity,
      };
    });

    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });
      if (coupon) {
        totalAmount = Math.round(
          (totalAmount * (100 - coupon.discountPercentAge)) / 100
        );
        await coupon.save();
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",

      success_url: `${process.env.LOCAL_HOST}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${process.env.LOCAL_HOST}/purchase-cancel`,

      discounts: coupon
        ? [{ coupon: await createStripeCoupon(coupon.discountPercentAge) }]
        : [],

      metadata: {
        userId: req.user._id.toString(),
        coupon: couponCode,
        products: JSON.stringify(
          products.map((product) => {
            return {
              id: product._id,
              name: product.name,
              price: product.price,
              quantity: product.quantity,
              image: product.images[0],
            };
          })
        ),
      },
    });
    if (totalAmount >= 200) {
      await createCoupon(req.user._id);
    }
    res.json({ sessionId: session.id, totalAmount: totalAmount / 100 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const checkOutSuccess = async (req, res) => {
  const { sessionId } = req.body;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      if (session.metadata.coupon) {
        await Coupon.findOneAndUpdate(
          {
            userId: req.user._id,
            code: session.metadata.coupon,
          },
          {
            $set: {
              isActive: false,
            },
          }
        );
      }

      // create new order
      const products = JSON.parse(session.metadata.products);

      const newOrder = new Order({
        userId: req.user._id,
        products: products.map((product) => {
          return {
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            image: product.image,
          };
        }),
        totalAmount: session.amount_total / 100,
        sessionId: session.id,
      });
      await newOrder.save();
      res.json({ message: "Purchase Successful", orderId: newOrder._id });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
