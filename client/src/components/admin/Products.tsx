import { motion } from "framer-motion";
import { useProductStore } from "../../store/useProductStore";
import { Star, Trash } from "lucide-react";

const Products: React.FC = () => {
  const { products, loading, deleteProduct, isFeatured } = useProductStore();
  // console.log(products);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {products.length === 0 && (
        <div className="text-center  text-secondary font-bold text-2xl ">
          No Products Found
        </div>
      )}

      {products.length > 0 && !loading && (
        <div className="overflow-x-auto max-w-3xl mx-auto bg-secondary/5 rounded-lg">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-base-200 uppercase text-xs text-primary">
                <th>product</th>
                <th>price</th>
                <th>category</th>
                <th>featured</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {products?.map((product) => {
                return (
                  <tr className="text-secondary text-xs " key={product._id}>
                    <th>
                      <img
                        src={product?.images[0]}
                        className="w-12 h-12 rounded-full object-cover"
                        alt=""
                      />
                    </th>
                    <td>${product?.price}</td>
                    <td>{product?.category}</td>
                    <td
                      className="cursor-pointer "
                      onClick={() => isFeatured(product._id)}
                    >
                      {product?.isFeatured ? (
                        <Star className="text-orange-500" fill="yellow" />
                      ) : (
                        <Star className="hover:text-orange-200" />
                      )}
                    </td>
                    <td onClick={() => deleteProduct(product?._id)}>
                      <Trash className="text-red-600 cursor-pointer hover:text-red-400" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default Products;
