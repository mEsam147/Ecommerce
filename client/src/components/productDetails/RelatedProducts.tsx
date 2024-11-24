import React, { useEffect, useState } from "react";
import { Product } from "../../utils/ProductInterFace";
import axios from "../../utils/Axios";
import { motion } from "framer-motion";
import ProductCard from "../ProductCard";
import { Loader } from "lucide-react";

interface Props {
  single: {
    product: Product;
    averageRating: number | any;
  };
}
const RelatedProducts: React.FC<Props> = (single) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getRelatedProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/product/${single.single?.product?.category}/${single.single?.product?._id}`
        );

        setLoading(false);
        setRelatedProducts(res.data);
      } catch (error) {
        setLoading(false);
        throw error;
      }
    };

    getRelatedProducts();
  }, [single]);

  if (loading) {
    return (
      <div className="my-24 flex items-center justify-center">
        <Loader className="size-5 animate-spin" />
      </div>
    );
  }

  return (
    <>
      {relatedProducts.length === 0 && (
        <div className="my-24 flex items-center justify-center text-lg md:text-2xl font-bold  uppercase text-primary">
          No related products found 🥲
        </div>
      )}
      {relatedProducts?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <h1 className="text-2xl uppercase font-bold text-primary text-left">
            Related Products
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-16 gap-y-7  sm:px-6">
              {relatedProducts?.map((item) => (
                <>
                  <ProductCard item={item} key={item._id} />
                </>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default RelatedProducts;
