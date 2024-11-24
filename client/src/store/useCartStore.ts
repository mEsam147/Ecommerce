import { create } from "zustand";
import axios from "../utils/Axios";
import { Product } from "../utils/ProductInterFace";
import { toast } from "sonner";

interface Coupon {
  code: string;
  discountPercentAge: number;
}
interface Cart {
  cart: Product[];

  coupon: null | Coupon;
  loading: boolean;
  total: number;
  subTotal: number;
  isCouponApplied: boolean;
  addToCart: (id: string) => void;
  getCartItems: () => void;
  deleteCartItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCartItems: () => void;
  calculateTotal: () => void;
  getMyCoupon: () => void;
  verifyCoupon: (code: string) => void;
  removeCoupon: () => void;
}

export const useCartStore = create<Cart>((set, get) => ({
  cart: [],
  coupon: null,
  loading: false,
  total: 0,
  subTotal: 0,
  isCouponApplied: false,

  addToCart: async (id: string) => {
    try {
      set((prevState) => {
        const existingItem = prevState.cart.find((item) => item._id === id);
        if (existingItem) {
          return {
            cart: prevState.cart.map((item) =>
              item._id === id
                ? { ...existingItem, quantity: existingItem.quantity + 1 }
                : item
            ),
          };
        } else {
          return {
            cart: [...prevState.cart, { _id: id, quantity: 1 } as Product],
          };
        }
      });
      await axios.post(`/cart/${id}`);
    } catch (error) {
      throw error;
    }
  },
  getCartItems: async () => {
    try {
      set({ loading: true });
      const res = await axios.get("/cart");
      set({ cart: res.data, loading: false });
      get().calculateTotal();
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  deleteCartItem: async (id: string) => {
    try {
      set((prevState) => ({
        cart: prevState.cart.filter((item) => item._id !== id),
      }));
      get().calculateTotal();
      await axios.delete(`/cart/${id}`);
    } catch (error) {
      throw error;
    }
  },
  updateQuantity: async (id: string, quantity: number) => {
    try {
      if (quantity < 1) {
        set((prevState) => ({
          cart: prevState.cart.filter((item) => item._id !== id),
        }));
      }
      await axios.put(`/cart/${id}`, { quantity });
      set((prevState) => ({
        cart: prevState.cart.map((item) =>
          item._id === id ? { ...item, quantity } : item
        ),
      }));
      get().calculateTotal();
    } catch (error) {
      throw error;
    }
  },
  clearCartItems: async () => {
    try {
      set({ loading: true });
      await axios.delete("/cart");
      set({
        cart: [],
        loading: false,
      });
      get().calculateTotal();
    } catch (error) {
      set({ loading: false });
      console.log(error);
      throw error;
    }
  },

  calculateTotal: async () => {
    try {
      const { cart, coupon } = get();

      const subTotal = cart.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      );
      let total = subTotal;
      if (coupon) {
        const discount = total * (coupon.discountPercentAge / 100);
        total = subTotal - discount;
      }
      set({ subTotal, total });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getMyCoupon: async () => {
    try {
      const res = await axios.get("/coupon");  
      set({ coupon: res.data });
      get().calculateTotal();
    } catch (error) {
      throw error;
    }
  },

  verifyCoupon: async (code: string) => {
    try {
      if (!code) {
        toast.error("Please enter a coupon code.");
        return;
      }
      const res = await axios.post("/coupon/verify", { code: code });
      set({ isCouponApplied: true, coupon: res.data });
      console.log(res);
      get().calculateTotal();
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  },

  removeCoupon: async () => {
    try {
      set({ coupon: null, isCouponApplied: false });
      get().calculateTotal();
    } catch (error) {
      throw error;
    }
  },
}));
