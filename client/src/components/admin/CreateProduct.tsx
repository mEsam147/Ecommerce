import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { categories } from "../../helper/Categories";
import { CirclePlus, Upload } from "lucide-react";
import { Product } from "../../utils/ProductInterFace";
import { useProductStore } from "../../store/useProductStore";

const CreateProduct: React.FC = () => {
  const product: Product = {
    _id: "",
    name: "",
    description: "",
    price: 0,
    category: "",
    images: [],
  };
  const [productData, setProductData] = useState(product);

  const handleChange = (
    e: React.FormEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement; // Type assertion
    const { value, name } = target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      if (fileArray.length > 0) {
        setProductData((prevProduct) => ({
          ...prevProduct,
          images: [...prevProduct.images, ...fileArray],
        }));
      }
    }
  };

  const imageRef = useRef<HTMLInputElement>(null);

  const { createProduct, loading } = useProductStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProduct(productData);
    setProductData({
      _id: "",
      name: "",
      description: "",
      price: 0,
      category: "",
      images: [],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-xl px-3 sm:px-6   mx-auto bg-secondary/15 py-10 rounded-md "
    >
      <h1 className="text-secondary text-xl font-bold">Create New Product</h1>

      <form onSubmit={handleSubmit}>
        <div className="mt-4 flex flex-col  gap-y-1">
          <label className="text-primary text-sm sm:text-md">
            Product Name
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            name="name"
            value={productData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4 flex flex-col  gap-y-1">
          <label className="text-primary text-sm sm:text-md">Description</label>
          <textarea
            className="textarea textarea-bordered w-full "
            name="description"
            value={productData.description}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4 flex flex-col  gap-y-1">
          <label className="text-primary text-sm sm:text-md">Price</label>
          <input
            type="text"
            className="input input-bordered w-full "
            name="price"
            value={productData.price}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4 flex flex-col  gap-y-1">
          <label className="text-primary text-sm sm:text-md">Category</label>
          <select
            className="select select-bordered w-full"
            name="category"
            value={productData.category}
            onChange={handleChange}
          >
            {categories?.map((cat) => {
              return <option key={cat.id}>{cat.name}</option>;
            })}
          </select>
        </div>
        <div className="mt-4">
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs input-sm"
            name="images"
            hidden
            multiple
            onChange={handleImageChange}
            ref={imageRef}
          />
          <span
            className="btn btn-sm md:btn"
            onClick={() => {
              if (imageRef.current) {
                imageRef.current.click();
              }
            }}
          >
            <Upload />
            upload Image
          </span>
          {productData.images.length > 0 && (
            <div className="inline ml-4 text-secondary text-sm">
              {productData.images.length} uploaded Successfully
            </div>
          )}
        </div>
        <button
          type="submit"
          className="mt-4 flex items-center justify-center btn btn-secondary w-full text-primary font-semibold"
          disabled={loading}
        >
          {loading ? (
            "Creating..."
          ) : (
            <>
              <CirclePlus />
              Create product
            </>
          )}
        </button>{" "}
      </form>
    </motion.div>
  );
};

export default CreateProduct;
