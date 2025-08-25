import { lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import History from "../pages/History";
import WishlistPage from "../pages/WishlistPage";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../components/MainLayout";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import TrackingPage from "../pages/TrackingPage";
import AuthCallback from "../pages/AuthCallback";
import { userRepository } from "../repositories/userRepository";
const Login = lazy(() => import("../pages/LoginPage"));
const Register = lazy(() => import("../pages/RegisterPage"));
const Services = lazy(() => import("../pages/ServicesPage"));
const ProductsPage = lazy(() => import("../pages/ProductsPage"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const ProductCategory = lazy(() => import("../pages/ProductsCategoryPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const SearchResults = lazy(() => import("../pages/SearchResultsPage"));
const Profile = lazy(() => import("../pages/Profile"));
const Faq = lazy(() => import("../pages/Faq"));
const CalorieCalculator = lazy(() => import("../pages/Calculator"));
const NotFound = lazy(() => import("../pages/NotFoundPage"));
const Checkout = lazy(() => import("../pages/CheckoutPage"));
const Consultations = lazy(() => import("../pages/ConsultationsPage"));
const Recipes = lazy(() => import("../pages/RecipesPage"));
const RecipeDetail = lazy(() => import("../pages/RecipeDetailPage"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));
const Wishlist = lazy(() => import("../pages/WishlistPage"));
const Subscription = lazy(() => import("../pages/Subscription"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const Cart = lazy(() => import("../pages/CartPage"));

// AdminRoute Component (Integrated Here)
function AdminRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const allowedEmail = "camilis880@namestal.com"; // <-- Change to your admin email

  useEffect(() => {
    async function fetchUser() {
      const currentUser = await userRepository.getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    }
    fetchUser();
  }, []);

  if (loading) return null; // or show a spinner while loading

  if (!user || user?.user_metadata?.email !== allowedEmail) {
    return <Navigate to="*" replace />; // redirect to NotFound
  }

  return children;
}

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/" element={<HomePage />} />

          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:category" element={<ProductCategory />} />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/services/calorie-calculator"
            element={<CalorieCalculator />}
          />
          <Route path="/services/consultations" element={<Consultations />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="/history" element={<History />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipeDetail/:id" element={<RecipeDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/tracking" element={<TrackingPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
