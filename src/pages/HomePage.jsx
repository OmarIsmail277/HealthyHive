import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Carousel from "../components/Carousel/Carousel";
import Featured from "../components/Featured/Featured";
import RecommendedProducts from "../components/RecommendedProducts/RecommendedProducts";
import FetchAdvice from "../components/FetchAdvice/AdviceFetch";
import BrandsWeOffer from "../components/BrandsWeOffer/BrandsWeOffer";
import ProductCategories from "../components/ProductCategories/ProductCategories";
import Footer from "../components/Footer/Footer";

function HomePage() {
  return (
    <>
      <Navbar />
      <Carousel />
      <ProductCategories />
      <Featured />
      <RecommendedProducts />
      <FetchAdvice />
      <BrandsWeOffer />
      <Footer />
    </>
  );
}

export default HomePage;
