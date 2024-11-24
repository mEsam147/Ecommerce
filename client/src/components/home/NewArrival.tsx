import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "../../utils/Axios";
import ProductCard from "../ProductCard";
import { Product } from "../../utils/ProductInterFace";

const NewArrival: React.FC = () => {
  const [newArrival, setNewArrival] = useState<Product[]>([]);

  useEffect(() => {
    const getArrivalproducts: () => Promise<void> = async () => {
      try {
        const res = await axios.get("/product/newArrival");
        setNewArrival(res.data);
      } catch (error) {
        throw error;
      }
    };
    getArrivalproducts();
  }, []);

  return (
    <div className="my-10 max-w-5xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "tween" }}
        className="text-left font-bold text-2xl text-primary uppercase"
      >
        New Arrival
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "tween" }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  sm:gap-4 gap-2 px-4 my-10"
      >
        {newArrival?.map((item) => {
          return <ProductCard key={item?._id} item={item} />;
        })}
      </motion.div>
    </div>
  );
};

export default NewArrival;
