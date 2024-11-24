import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../utils/Axios";

const Coupon: React.FC = () => {
  const [couponInput, setCouponInput] = useState<string>("");

  const {
    getMyCoupon,
    subTotal,
    total,
    coupon,
    isCouponApplied,
    cart,
    verifyCoupon,
    removeCoupon,
  } = useCartStore();
  useEffect(() => {
    getMyCoupon();
  }, [getMyCoupon]);

  const saved = subTotal - total;
  const formatTotal = total.toFixed(2);
  const formatSubTotal = subTotal.toFixed(2);
  const formatSaved = saved.toFixed(2);
  const stripePromise = loadStripe(
    "pk_test_51PxAl802Dkx4MnRYDlc21KqejcG2sSVusbX3mg16iBXk8F54eIHLmkZv5GjKe2hpCNS0OVXuhg7hArB9IiQObkne00crZn6PQZ"
  );

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      const res = await axios.post("/payment/checkout", {
        products: cart,
        couponCode: coupon ? coupon.code : null,
      });
      const sessionId = res.data.sessionId;
      console.log(sessionId);

      const result = await stripe?.redirectToCheckout({
        sessionId: sessionId,
      });
      if (result) {
        if (result.error) {
          console.log(result.error.message);
        } else {
          console.log("Payment successful!");
        }
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (coupon) {
      setCouponInput(coupon.code);
    }
  }, [couponInput , coupon]);

  const handleApplyCoupon = () => {
    if (!couponInput) return;
    if (coupon) {
      verifyCoupon(coupon?.code);
    }
  };

  const handleRemoveCoupon = () => {
    if (!coupon) return;
    removeCoupon();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-2  flex-col gap-y-4 px-6 md:px-0"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-red-300/10 rounded-md mt-2 py-3 shadow-md"
      >
        <h1 className="text-secondary text-xl uppercase px-2 font-bold py-3 ">
          Order Summary
        </h1>

        <div className="flex items-center justify-between border-b border-gray-600/20 px-3  py-3">
          <p className=" font-bold text-secondary capitalize">Original Price</p>
          <p className="font-bold text-primary">${formatSubTotal}</p>
        </div>
        {isCouponApplied && coupon && (
          <>
            <div className="flex items-center justify-between border-b border-gray-600/20 p-2">
              <p className=" font-bold text-sm text-secondary capitalize">
                Saving
              </p>
              <p className=" font-bold text-sm text-secondary capitalize">
                - ${formatSaved}
              </p>
            </div>
            <div className="flex items-center  justify-between border-b border-gray-600/20 p-2">
              <p className=" font-bold text-sm text-secondary capitalize">
                Coupon ({coupon.code}){" "}
              </p>
              <p className=" font-bold text-sm text-secondary capitalize">
                - ${coupon.discountPercentAge}%
              </p>
            </div>
          </>
        )}

        <div className="flex items-center justify-between p-2 my-4">
          <p className="text-lg font-bold text-secondary">Total</p>
          <p className="text-lg font-bold text-primary">$ {formatTotal}</p>
        </div>
        <div className="flex justify-center pb-3">
          <button
            className=" btn btn-success btn-wide text-primary"
            onClick={handleCheckout}
          >
            Process to Checkout
          </button>
        </div>
        <p className="flex items-center gap-x-3 text-primary text-lg justify-center">
          or{" "}
          <Link
            to={"/"}
            className="text-secondary text-xs underline flex items-center gap-x-3 btn  btn-link hover:text-primary"
          >
            Continue Shopping
            <MoveRight size={14} />
          </Link>
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-red-300/10 rounded-md mt-2 py-3 shadow-md"
      >
        <h1 className="text-lg text-primary font-bold  px-2">
          Do you have a voucher or gift card?
        </h1>
        <div className="flex flex-col gap-y-3 justify-center mx-auto w-full px-2 py-3">
          <input
            type="text"
            className="input input-bordered w-full  "
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
          />
          <button
            className="btn w-full btn-success  text-primary"
            onClick={handleApplyCoupon}
          >
            Apply Code
          </button>
        </div>
        {coupon && isCouponApplied && (
          <div className="my-1 px-3 py-3 border-b border-gray-500/10">
            <p className="text-primary font-bold">Applied Coupon</p>
            <span className="text-secondary text-xs">
              {coupon.code} - {coupon.discountPercentAge}% off
            </span>
          </div>
        )}
        {coupon && (
          <>
            <h1 className="text-md font-bold px-3 ">Your Available Coupon:</h1>
            <div className="flex items-center gap-x-3 text-secondary text-sm px-3 my-3">
              <p>{coupon?.code}</p>-<p>{coupon.discountPercentAge}% off</p>
            </div>

            {coupon && isCouponApplied && (
              <div className="flex justify-center py-3">
                <button
                  className="btn btn-wide  btn-error text-white"
                  onClick={handleRemoveCoupon}
                >
                  Remove Coupon
                </button>
              </div>
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Coupon;
