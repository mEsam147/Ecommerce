import { create } from "zustand";
import axios from "../utils/Axios";
import { toast } from "sonner";

interface UserStore {
  user: any;
  loading: boolean;
  error: any;
  login: (formData: object) => void;
  signUp: (formData: object) => void;
  getMe: () => void;
  logout: () => void;
  refreshToken: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  error: null,
  login: async (formData: object) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post("/auth/login", formData);
      set({ user: res.data, loading: false });
      toast.success("Login Successfully");
    } catch (err: any) {
      set({ user: null, loading: false });
      toast.error(err.response.data.message);
      throw err;
    }
  },
  signUp: async (formData: object) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post("/auth/register", formData);
      toast.success("Sign Up Successfully");
      set({ user: res.data, loading: false });
    } catch (error: any) {
      toast.error(error.response.data.message);
      set({ loading: false, user: null, error: null });
      throw error;
    }
  },
  getMe: async () => {
    try {
      set({ loading: true });
      const res = await axios.get("/auth/me");
      set({ user: res.data, loading: false });
    } catch (error) {
      console.log(error);
      set({ user: null, loading: false });
      throw error;
    }
  },
  logout: async () => {
    await axios
      .post("/auth/logout")
      .then(() => {
        set({ user: null, loading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  refreshToken: async () => {
    try {
      const res = await axios.post("/auth/refreshToken");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },
}));

let refreshPromise:any = null;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        if (refreshPromise) {
          await refreshPromise;
          return axios(originalRequest);
        }
        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;
        return axios(originalRequest);
      } catch (error) {
        useUserStore.getState().logout();
        return Promise.reject(error);
      }
    } else if (error?.response?.status === 401) {
      useUserStore.getState().logout();
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);