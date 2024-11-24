import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlignJustify, House, Lock, LogOut, ShoppingCart } from "lucide-react";
import { useUserStore } from "../store/useUserStore";
import { useCartStore } from "../store/useCartStore";

interface props {
  toggleTheme: () => void;
}

const Header: React.FC<props> = ({ toggleTheme }) => {
  const { user, logout } = useUserStore();
  const isAdmin: boolean = user?.role === "admin";
  const {cart} = useCartStore()
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="shadow-md py-3 "
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link
            to={"/"}
            className="text-primary font-semibold text-lg md:text-2xl hover:text-secondary "
          >
            Ecommerce
          </Link>
          <div className=" items-center gap-x-5 hidden md:flex">
            <Link
              to={"/"}
              className="text-sm md:text-md text-primary capitalize flex items-center
              md:font-semibold gap-x-1 hover:text-secondary relative"
            >
              <House className="md:text-lg text-sm relative " />
              Home
            </Link>

            {user && (
              <Link
                to={"/cart"}
                className="text-sm md:text-md text-primary capitalize flex items-center
              md:font-semibold gap-x-1 hover:text-secondary relative"
              >
                <ShoppingCart className="md:text-lg text-sm relative" />
                {cart.length > 0 && (
                  <span className="absolute -top-3 text-primary text-xs left-0 bg-secondary w-4 h-4 rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
                Cart
              </Link>
            )}

            {isAdmin && (
              <Link
                to={"/dashboard"}
                className="btn btn-xs md:btn-sm flex items-center bg-success text-primary font-semibold"
              >
                <Lock size={20} />
                Dashboard
              </Link>
            )}

            {!user ? (
              <Link
                to={"/login"}
                className="btn btn-xs md:btn-sm btn-info text-primary "
              >
                login
              </Link>
            ) : (
              <button
                className="btn btn-sm btn-danger text-primary flex items-center"
                onClick={() => logout()}
              >
                <LogOut />
                logout
              </button>
            )}

            <button onClick={toggleTheme}>
              <label className="flex cursor-pointer gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
                <input
                  type="checkbox"
                  value="synthwave"
                  className="toggle theme-controller"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </label>
            </button>
          </div>

          {/* small Devices */}
          <div className="md:hidden">
            <motion.div
              whileTap={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="ring-1 w-12 h-12 rounded-full cursor-pointer text-primary hover:text-secondary flex items-center justify-center ring-gray-500/20"
            >
              <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer-4" className="drawer">
                  <AlignJustify className="cursor-pointer" />
                </label>
              </div>
            </motion.div>

            <div className="drawer drawer-end relative z-30">
              <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
              />

              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80  flex items-center justify-start py-10 gap-y-10 ">
                  {/* Sidebar content here */}
                  <Link
                    to={"/"}
                    className=" text-lg text-primary capitalize text-center hover:underline font-semibold hover:text-secondary"
                  >
                    Home
                  </Link>
                  {user && (
                    <Link
                      to={"/cart"}
                      className=" text-lg text-primary capitalize text-center hover:underline font-semibold hover:text-secondary flex items-center gap-x-1 justify-center"
                    >
                      <ShoppingCart className="text-lg " />
                      Cart
                    </Link>
                  )}

                  {isAdmin && (
                    <Link
                      to={"/dashboard"}
                      className="btn btn-success btn-wide   flex items-center  text-primary font-semibold"
                    >
                      <Lock size={20} />
                      Dashboard
                    </Link>
                  )}

                  {!user ? (
                    <Link
                      to={"/login"}
                      className="btn btn-wide  btn-info text-primary text-lg "
                    >
                      login
                    </Link>
                  ) : (
                    <button
                      className="btn btn-wide btn-error  text-primary flex items-center text-lg "
                      onClick={() => logout()}
                    >
                      <LogOut />
                      logout
                    </button>
                  )}

                  <button onClick={toggleTheme}>
                    <input
                      type="checkbox"
                      value="synthwave"
                      className="toggle theme-controller col-span-2 col-start-1 row-start-1 border-sky-400 bg-amber-300 [--tglbg:theme(colors.sky.500)] checked:border-blue-800 checked:bg-blue-300 checked:[--tglbg:theme(colors.blue.900)]"
                    />
                  </button>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
