import { ArrowBigRightDash } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

const PurchaseCancel:React.FC = () => {
  return (
    <div className=" my-16 max-w-xl mx-auto flex items-center justify-center">
      <div className="ring-1 ring-gray-500/10 shadow-lg text-center p-6 w-full ">
        <div className="flex flex-col gap-y-4 justify-center  ">
          <img
            src="./cancel-icon.svg"
            className=" h-20  w-full mx-auto "
            alt=""
          />
          <h1 className="text-3xl text-center uppercase text-secondary">
            Purchase Cancelled
          </h1>
          <p className="text-xs md:text-sm text-primary">
            Your Order has been cancelled.no Charges have been made
          </p>
        </div>
        <div className="my-4 bg-base-200 flex flex-col gap-y-5 rounded-lg p-4">
          <p className="text-xs text-center text-secondary">
            If you have already made a payment, please rest assured that a full
            refund will be processed within the next [X] business days. You will
            receive a confirmation email once the refund has been initiated.
          </p>
        </div>
        <div className=" mt-5 flex flex-col gap-y-5 justify-center items-center">
          <Link to={"/"} className="btn btn-wide ">
            Continue Shipping
            <ArrowBigRightDash />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PurchaseCancel
