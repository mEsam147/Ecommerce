import { BadgePlus } from "lucide-react";
import React from "react";
import { Product } from "../utils/ProductInterFace";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

interface props {
  item: Product;
}
const ProductCard: React.FC<props> = ({ item }) => {
  const { addToCart } = useCartStore();

  return (
    <div className=" shadow shadow-gray-500/10 group rounded-lg  ">
      <Link to={`/productDetails/${item._id}`}>
        <img
          src={item.images[0] || "/default-image.jpg"}
          alt={item.name}
          className="w-full h-[180px] object-cover rounded-lg group-hover:scale-105 transition-all duration-300 cursor-pointer"
          loading="lazy"
          decoding="async"
        />
      </Link>
      <div className="py-8 px-2 space-y-3">
        <h2 className="text-md whitespace-wrap font-bold text-primary">
          {item.name.slice(0, 30)}
        </h2>
        <div className="flex items-center justify-between ">
          <h3 className="text-neutral font-semibold">
            ${item.price.toFixed(2)}
          </h3>
        </div>
        <button
          className="btn btn-sm mt-4 flex items-center gap-x-2 hover:btn-primary text-primary"
          onClick={() => addToCart(item?._id)}
        >
          <BadgePlus />
          add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
