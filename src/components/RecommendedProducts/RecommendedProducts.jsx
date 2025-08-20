import { useEffect, useRef } from "react";
import "./RecommendedProducts.css";
import RecommendedCard from "./RecommendedCard/RecommendedCard";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"


function RecommendedProducts({ filterFn, title }) {
  const { isLoading, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const filterProducts = products?.filter(filterFn);
  // console.log(discountedProducts);


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
      <div className="text-center">
        {title}
        <div className="flex justify-center mt-4">
          <div className="w-16 h-1 bg-primary rounded-full"></div>
        </div>
      </div>
      <div className="overflow-x-auto hide-scrollbar py-12" ref={scrollRef} onMouseEnter={stopAutoScroll} onMouseLeave={startAutoScroll}>
        <button onClick={() => handleScroll("left")}
          className="hidden md:block absolute  top-1/2 -translate-y-1/2 -translate-x-12 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow z-10">
          <FaAngleLeft size={20} />
        </button>
        <div className="flex justify-between shrink gap-4 w-max">
          {filterProducts?.map((product) => (
            <RecommendedCard product={product} key={product.id} />
          ))}
        </div>
        <button onClick={() => handleScroll("right")}
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow">
          <FaAngleRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default RecommendedProducts;
