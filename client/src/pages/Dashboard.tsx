import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChartNoAxesColumn, CirclePlus, ShoppingBasket } from "lucide-react";
import CreateProduct from "../components/admin/CreateProduct";
import Products from "../components/admin/Products";
import Analytics from "../components/admin/Analytics";

const Dashboard: React.FC = () => {
  const [type, setType] = useState<string>("create");
  return (
    <div className="container mt-10 mx-auto ">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-secondary text-lg md:text-3xl text-center font-bold"
      >
        Admin Dashboard
      </motion.h1>

      <div className="mt-6 flex items-center justify-center gap-x-3 px-4 md:px-0">
        <button
          className={`btn md:btn-sm btn-xs ${
            type === "create" ? "btn-success" : ""
          } rounded-sm font-semibold text-primary flex items-center gap-x-2 capitalize `}
          onClick={() => setType("create")}
        >
          <CirclePlus />
          create product
        </button>
        <button
          className={`btn md:btn-sm btn-xs  ${
            type === "products" ? "btn-success" : ""
          } rounded-sm font-semibold text-primary flex items-center gap-x-2 capitalize `}
          onClick={() => setType("products")}
        >
          <ShoppingBasket />
          products
        </button>
        <button
          className={`btn md:btn-sm btn-xs   ${
            type === "analytics" ? "btn-success" : ""
          } rounded-sm font-semibold text-primary flex items-center gap-x-2 capitalize `}
          onClick={() => setType("analytics")}
        >
          <ChartNoAxesColumn />
          analytics
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6"
      >
        {type === "create" && <CreateProduct />}
        {type === "products" && <Products />}
        {type === "analytics" && <Analytics />}
      </motion.div>
    </div>
  );
};

export default Dashboard;
