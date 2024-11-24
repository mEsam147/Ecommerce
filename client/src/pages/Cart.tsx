import React from "react";
import { useCartStore } from "../store/useCartStore";
import { motion } from "framer-motion";
import { Loader, Minus, Plus, Trash } from "lucide-react";
import Coupon from "../components/Coupon";

const Cart: React.FC = () => {
  const { cart, loading, deleteCartItem, updateQuantity, clearCartItems } =
    useCartStore();

  return (
    <div className="flex max-w-7xl flex-col md:flex-row mx-auto  gap-3 mt-10 ">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow space-y-4  p-2"
      >
        {loading && (
          <div className="flex justify-center items-center my-24">
            <Loader className="animate-spin size-6" />
          </div>
        )}
        {!loading && cart.length === 0 && (
          <div className="text-center text-2xl font-bold text-primary uppercase min-h-[46vh] flex items-center justify-center">
            Oops! Your cart is Empty 🥹
          </div>
        )}
        {!loading &&
          cart?.map((item) => {
            return (
              <div
                className="bg-red-500/10 shadow-lg  md:p-6 p-3 px-0 flex items-center justify-between rounded-md"
                key={item?._id}
              >
                <div className="flex items-center gap-x-6 w-[60%]">
                  <img
                    src={
                      item?.images && item.images.length > 0
                        ? item.images[0]
                        : "default-image-url.jpg"
                    }
                    alt=""
                    className="md:w-[100px] md:h-[100px] w-[50px] h-[50px] rounded-md object-cover"
                  />
                  <div className="flex flex-col gap-y-1.5   justify-center items-center md:items-start md:justify-start ">
                    <h3 className="text-primary font-semibold">{item?.name}</h3>
                    <p className="text-sm text-secondary capitalize">
                      {item?.description?.slice(0, 70)}
                    </p>
                    <button
                      className="text-red-500 hover:text-red-300 text-md "
                      onClick={() => deleteCartItem(item?._id)}
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-x-3 w-1/2 text-center justify-center ">
                  <button
                    className="btn btn-xs text-primary px-1 text-sm"
                    onClick={() =>
                      updateQuantity(item?._id, item?.quantity + 1)
                    }
                  >
                    <Plus size={14} />
                  </button>
                  <p className="text-primary  text-sm">{item?.quantity}</p>
                  <button
                    className=" btn btn-xs text-primary px-1 text-sm"
                    onClick={() =>
                      updateQuantity(item?._id, item?.quantity - 1)
                    }
                  >
                    <Minus size={14} />
                  </button>
                </div>
                <div>
                  <p className="text-md font-bold text-secondary flex items-center  ">
                    ${item.price}
                  </p>
                </div>
              </div>
            );
          })}
        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 flex justify-end"
          >
            <button
              className="btn btn-error text-white btn-sm"
              onClick={clearCartItems}
              disabled={loading}
            >
              {loading ? (
                <Loader className="size-5 animate-spin" />
              ) : (
                "Clear Cart"
              )}
            </button>{" "}
          </motion.div>
        )}

        {cart.length > 0 && (
          <div className="my-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* <PeopleAlsoBought /> */}
            </motion.div>
          </div>
        )}
      </motion.div>

      {cart.length > 0 && <Coupon />}
    </div>
  );
};

export default Cart;
