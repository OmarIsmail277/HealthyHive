import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import History from "../pages/History";
import WishlistPage from "../pages/WishlistPage";
import TestProducts from "../pages/TestProducts";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../components/MainLayout";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import TrackingPage from "../pages/TrackingPage";

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
const Recipes = lazy(() =>
  import("../components/Recipes/components/RecipesList/RecipesList")
);
const RecipeDetail = lazy(() => import("../pages/RecipeDetailPage"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));
const Wishlist = lazy(() => import("../pages/WishlistPage"));
const Subscription = lazy(() => import("../pages/Subscription"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const Cart = lazy(() => import("../pages/CartPage"));

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
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:category" element={<ProductCategory />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route
              path="/services/calorie-calculator"
              element={<CalorieCalculator />}
            />
            <Route path="/services/consultations" element={<Consultations />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<History />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipeDetail/:id" element={<RecipeDetail />} />
            <Route path="/test" element={<TestProducts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/tracking" element={<TrackingPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
