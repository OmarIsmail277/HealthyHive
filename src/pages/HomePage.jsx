import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Carousel from "../components/Carousel/Carousel";
import Featured from "../components/Featured/Featured";
import RecommendedProducts from "../components/RecommendedProducts/RecommendedProducts";
import FetchAdvice from "../components/FetchAdvice/AdviceFetch";
import BrandsWeOffer from "../components/BrandsWeOffer/BrandsWeOffer";
import ProductCategories from "../components/ProductCategories/ProductCategories";
import ServicesAds from "../components/ServiceCards/ServiceCards";
import Footer from "../components/Footer/Footer";
import ServiceAds from "../components/ServiceCards/ServiceCards";
import RecipesSlider from "../components/Recipes/components/RecipesSlider/RecipesSlider";
import HealthyLivingSection from "../components/HealthyLivingSection";
import WhyUs from "../components/WhyUs/WhyUs";

function HomePage() {
  return (
    <>
      <Navbar />
      <Carousel />
      <WhyUs />
      <ServiceAds />
      <ProductCategories />
      <Featured />
      <RecommendedProducts />
      <HealthyLivingSection />
      <BrandsWeOffer />
      <Footer />
    </>
  );
}

export default HomePage;
