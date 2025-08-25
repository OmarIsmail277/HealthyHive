import { useEffect, useRef } from "react";
import "./RecommendedProducts.css";
import RecommendedCard from "./RecommendedCard/RecommendedCard";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useAllProducts } from "../../hooks/useProducts";

function RecommendedProducts({ filterFn, title }) {
  const { isPending, data: products } = useAllProducts();

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
      <div
        className="sm:w-[90%] sm:m-auto  overflow-x-auto hide-scrollbar py-12"
        ref={scrollRef}
        onMouseEnter={stopAutoScroll}
        onMouseLeave={startAutoScroll}
      >
        <button
          onClick={() => handleScroll("left")}
          className="hidden md:flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow z-10"
        >
          <FaAngleLeft size={20} />
        </button>
        <div className="flex justify-between  shrink gap-4 w-max px-2">
          {filterProducts?.map((product) => (
            <div
            key={product.id}
            className="w-[300px] sm:w-[370px]">

              <RecommendedCard product={product}  />
            </div>
          ))}
        </div>
        <button
          onClick={() => handleScroll("right")}
          className="hidden md:flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow"
        >
          <FaAngleRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default RecommendedProducts;
