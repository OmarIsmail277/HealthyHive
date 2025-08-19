import { useEffect, useRef } from "react";
import "./RecommendedProducts.css";
import RecommendedCard from "./RecommendedCard/RecommendedCard";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";

function RecommendedProducts() {
  const { isLoading, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  const startAutoScroll = () => {
    stopAutoScroll(); // prevent multiple intervals
    intervalRef.current = setInterval(() => {
      handleScroll("right");
    }, 2000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleScroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = direction === "left" ? -386 : 386;
    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });

    const { scrollLeft, scrollWidth, clientWidth } = container;
    if (
      direction === "right" &&
      scrollLeft + clientWidth >= scrollWidth - 386
    ) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="recommended-wrapper healthy__container section-padding relative">
      <h2 className="subTitle">Recommended</h2>
      <div className="overflow-x-auto hide-scrollbar p-2" ref={scrollRef}>
        <div className="flex justify-between shrink gap-4 w-max">
          {products?.map((product) => (
            <RecommendedCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecommendedProducts;
