import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import History from "../pages/History";
import WishlistPage from "../pages/WishlistPage";

const Login = lazy(() => import("../pages/LoginPage"));
const Register = lazy(() => import("../pages/RegisterPage"));
const Services = lazy(() => import("../pages/ServicesPage"));
const ProductsList = lazy(() => import("../pages/ProductsPage"));
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
const Recipes = lazy(() => import("../components/Recipes/Recipes"))

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/services" element={<Services />} />
      <Route path="/products" element={<ProductsList />} />
      <Route path="/products/:category" element={<ProductCategory />} />
      <Route
        path="/services/calorie-calculator"
        element={<CalorieCalculator />}
      />
      <Route path="/services/consultations" element={<Consultations />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/search/:query" element={<SearchResults />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/history" element={<History />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/wishlistPage" element={<WishlistPage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
