import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Login = lazy(() => import("../pages/LoginPage"));
const Register = lazy(() => import("../pages/RegisterPage"));
const Services = lazy(() => import("../pages/ServicesPage"));
const ProductsList = lazy(() => import("../pages/ProductsPage"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const ProductCategory = lazy(() => import("../pages/ProductsCategoryPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const SearchResults = lazy(() => import("../pages/SearchResultsPage"));
const Profile = lazy(() => import("../pages/Profile"));
const NotFound = lazy(() => import("../pages/NotFoundPage"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/services" element={<Services />} />
      <Route path="/products" element={<ProductsList />} />
      <Route path="/products/:category" element={<ProductCategory />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/search/:query" element={<SearchResults />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
