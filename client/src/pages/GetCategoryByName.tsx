import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Product } from "../utils/ProductInterFace";
import axios from "../utils/Axios";
import ProductCard from "../components/ProductCard";
const GetCategoryByName: React.FC = () => {
  const [categories, setCategories] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { name } = useParams();
  useEffect(() => {
    const getProductsByCategory = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/product/category/${name}`);
        setCategories(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getProductsByCategory();
  }, [name]);

  if (loading) {
    return null;
  }

  if (categories.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-[54vh]  flex items-center justify-center text-center"
      >
        <h1 className="text-center  text-2xl font-bold uppercase text-primary  ">
          Oops! No Items Found in This Category 🙁
        </h1>
      </motion.div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto mt-16">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center font-bold text-primary uppercase text-3xl"
      >
        {name}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-10 sm:px-6"
      >
        {categories?.map((item) => {
          return <ProductCard key={item._id} item={item} />;
        })}
      </motion.div>
    </div>
  );
};

export default GetCategoryByName;
