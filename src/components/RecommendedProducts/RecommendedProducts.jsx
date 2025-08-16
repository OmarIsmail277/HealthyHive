import { useEffect, useRef } from 'react';
import './RecommendedProducts.css'
import RecommendedCard from "./RecommendedCard/RecommendedCard";

function RecommendedProducts() {

  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      handleScroll("right");
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleScroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = direction === "left" ? -386 : 386;
    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });

    const { scrollLeft, scrollWidth, clientWidth } = container;
    if (direction === "right" && scrollLeft + clientWidth >= scrollWidth - 386) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="recommended-wrapper healthy__container section-padding relative">
      <h2 className="subTitle">Recommended</h2>
      <div className="overflow-x-auto hide-scrollbar p-2" ref={scrollRef}>
        <div className="flex justify-between shrink gap-4 w-max" >
          <RecommendedCard />
          <RecommendedCard />
          <RecommendedCard />
          <RecommendedCard />
          <RecommendedCard />
          <RecommendedCard />
          <RecommendedCard />
        </div>
      </div>
    </div>
  );
}

export default RecommendedProducts;
