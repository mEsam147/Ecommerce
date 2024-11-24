import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import { useUserStore } from "./store/useUserStore";
import { useProductStore } from "./store/useProductStore";
import { useCartStore } from "./store/useCartStore";
import Cart from "./pages/Cart";
import GetCategoryByName from "./pages/GetCategoryByName";
import PurchaseSuccess from "./pages/PurchaseSuccess";
import PurchaseCancel from "./pages/PurchaseCancel";
import ProductDetails from "./pages/ProductDetails";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "dark"
  );

  const toggleTheme = () => {
    setTheme((prevState) => (prevState === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const { getMe, user, loading } = useUserStore();
  const { getProducts } = useProductStore();
  const { getCartItems } = useCartStore();
  const isAdmin: boolean = user?.role === "admin";

  useEffect(() => {
    getMe();
  }, [getMe]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  if (loading) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Header toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to={"/"} />}
        />
        <Route path="/cart" element={user ? <Cart /> : <Navigate to={"/"} />} />
        <Route
          path="/dashboard"
          element={user && isAdmin ? <Dashboard /> : <Navigate to={"/"} />}
        />
        <Route path="/category/:name" element={<GetCategoryByName />} />

        <Route path="/purchase-success" element={<PurchaseSuccess />} />
        <Route path="/purchase-cancel" element={<PurchaseCancel />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
      </Routes>

      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
