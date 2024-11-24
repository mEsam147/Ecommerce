import { toast } from "sonner";
import axios from "../utils/Axios";
import { Product } from "./../utils/ProductInterFace";
import { create } from "zustand";

interface ProductStore {
  products: Product[];
  loading: boolean;
  createProduct: (productData: Product) => Promise<void>;
  getProducts: () => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  isFeatured: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  createProduct: async (productData: Product) => {
    set({ loading: true });
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", String(productData.price));
    formData.append("category", productData.category);
    productData.images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const res = await axios.post("/product", formData);
      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));
      toast.success("Product created successfully!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
      set({ loading: false });
      throw error;
    }
  },

  getProducts: async () => {
    try {
      const res = await axios.get("/product");
      set({ products: res.data, loading: false });
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      throw error;
    }
  },
  deleteProduct: async (id: string) => {
    try {
      set((prevState) => ({
        products: prevState.products.filter((product) => product._id !== id),
      }));
      const res = await axios.delete(`/product/${id}`);

      console.log(res);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },

  isFeatured: async (id: string) => {
    try {
      set((prevProducts) => ({
        products: prevProducts.products.map((item) =>
          item._id === id ? { ...item, isFeatured: !item.isFeatured } : item
        ),
      }));
      const res = await axios.post(`/product/${id}`);
      console.log(res);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },
}));
