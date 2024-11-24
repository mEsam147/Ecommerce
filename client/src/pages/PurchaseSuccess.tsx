import { ArrowBigRightDash, Handshake } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import { useCartStore } from "../store/useCartStore";
import axios from "../utils/Axios";

const PurchaseSuccess: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { clearCartItems } = useCartStore();

  const sessionId = new URLSearchParams(window.location.search).get(
    "session_id"
  );
  useEffect(() => {
    const handleSuccess = async () => {
      try {
        setLoading(false);
        await axios.post("/payment/checkout-Success", {
          sessionId,
        });
        clearCartItems();
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    handleSuccess();
  }, [clearCartItems]);

  if (loading) {
    return (
      <div className="flex items-center justify-center my-24">
        processing...
      </div>
    );
  }

  return (
    <div className=" my-16 max-w-xl mx-auto flex items-center justify-center">
      <Confetti
        width={innerWidth}
        height={innerHeight}
        gravity={0.1}
        recycle={false}
        numberOfPieces={800}
        style={{ zIndex: 99 }}
      />
      <div className="ring-1 ring-gray-500/10 shadow-lg text-center p-6 w-full ">
        <div className="flex flex-col gap-y-4 justify-center  ">
          <img src="./success.svg" className=" h-20  w-full mx-auto " alt="" />
          <h1 className="text-3xl text-center uppercase text-secondary">
            Purchase Successful
          </h1>
          <p className="text-xs md:text-sm text-primary">
            Thank you for your purchase. Your order will be shipped soon.
          </p>
        </div>
        <div className="my-4 bg-base-200 flex flex-col gap-y-5 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-secondary">Order Number</span>
            <span className="text-sm text-secondary">#fg9883</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-secondary">Extended delivery</span>
            <span className="text-sm text-secondary">3-4 days</span>
          </div>
        </div>
        <div className=" mt-5 flex flex-col gap-y-5 justify-center items-center">
          <button className="btn btn-success text-primary btn-wide font-bold ">
            <Handshake />
            Thanks for trusting us{" "}
          </button>

          <Link to={"/"} className="btn btn-wide ">
            Continue Shipping
            <ArrowBigRightDash />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccess;
