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
import AdviceFetch from "../components/FetchAdvice/AdviceFetch";
import WhyUs from "../components/WhyUs/WhyUs";
import FloatingSubscription from "../components/SubIcon/SubIcon";

function HomePage() {
  return (
    <>
      <Navbar />
      <Carousel />
      <ServiceAds />
      <ProductCategories />
      <Featured />
      {/* Deals Section */}
      <RecommendedProducts
        title={
          <h2 className="text-3xl md:text-4xl text-center font-bold text-gray-800">
            💎 Exclusive Deals <span className="text-primary">You Can't Miss</span>
          </h2>
        }
        filterFn={(product) => product.discount > 0}
      />
      <HealthyLivingSection />
      <AdviceFetch />
      <BrandsWeOffer />
      <WhyUs />
      <Footer />
      <FloatingSubscription />

    </>
  );
}

export default HomePage;
