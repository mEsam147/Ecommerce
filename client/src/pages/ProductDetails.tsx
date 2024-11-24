import React, { useEffect, useState } from "react";
import HeadingOfProduct from "../components/productDetails/HeadingOfProduct";
import RelatedProducts from "../components/productDetails/RelatedProducts";
import { useParams } from "react-router-dom";
import axios from "../utils/Axios";
import { Loader } from "lucide-react";
import { Product } from "../utils/ProductInterFace";

interface SingleProduct {
  product: Product; // The product object
  averageRating: number; // The average rating
}

const defaultProduct: SingleProduct = {
  product: {
    _id: "",
    name: "",
    description: "",
    price: 0,
    category: "",
    images: [],
    quantity: 0,
    isFeatured: false,
    reviews: [], // Ensure reviews array is included
  },
  averageRating: 0, // Default average rating
};

const ProductDetails: React.FC = () => {
  const [single, setSingle] = useState<SingleProduct>(defaultProduct);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/product/${id}`);

        setSingle(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getSingleProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[48vh]">
        <Loader className="animate-spin size-6" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl   mx-auto min-h-[90vh] mt-20">
      <HeadingOfProduct single={single} />

      <RelatedProducts single={single} />
    </div>
  );
};

export default ProductDetails;
