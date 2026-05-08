import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StoreProvider, useStore } from "@/context/StoreContext";

import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Card from "./pages/Card";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerProducts from "./pages/seller/SellerProducts";
import SellerCategories from "./pages/seller/SellerCategories";
import SellerOrders from "./pages/seller/SellerOrders";
import SellerCustomers from "./pages/seller/SellerCustomers";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/* ================= PROTECTED ROUTE ================= */
function SellerRoute({ children }) {
  const { userRole, isLoaded } = useStore();

  if (!isLoaded) return null; // tunggu state dari localStorage

  if (userRole !== "seller") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <BrowserRouter>
          <Routes>
            {/* ================= CUSTOMER ================= */}
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/card" element={<Card />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />

            {/* ================= SELLER (PROTECTED) ================= */}
            <Route
              path="/seller"
              element={
                <SellerRoute>
                  <SellerDashboard />
                </SellerRoute>
              }
            />
            <Route
              path="/seller/products"
              element={
                <SellerRoute>
                  <SellerProducts />
                </SellerRoute>
              }
            />
            <Route
              path="/seller/categories"
              element={
                <SellerRoute>
                  <SellerCategories />
                </SellerRoute>
              }
            />
            <Route
              path="/seller/orders"
              element={
                <SellerRoute>
                  <SellerOrders />
                </SellerRoute>
              }
            />
            <Route
              path="/seller/customers"
              element={
                <SellerRoute>
                  <SellerCustomers />
                </SellerRoute>
              }
            />

            {/* ================= NOT FOUND ================= */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </QueryClientProvider>
  );
}
