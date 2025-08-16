import { useState, useEffect } from "react";

function Carousel() {
  const slides = [
    {
      src: "/images/carousel/carousel1.jpg",
      title: "Delicious, Ready-to-Enjoy",
      description: "Freshly prepared meals for every craving.",
    },
    {
      src: "/images/carousel/carousel2.jpg",
      title: "Refresh Your Day",
      description:
        "From energizing coffee to soothing teas, sip your way to happiness.",
    },
    {
      src: "/images/carousel/carousel3.jpg",
      title: "Self-Care, Redefined",
      description: "Pamper yourself with premium personal care essentials.",
    },
    {
      src: "/images/carousel/carousel4.jpg",
      title: "Expert Advice, Anytime",
      description: "Get professional guidance tailored to your needs.",
    },
    {
      src: "/images/carousel/carousel5.jpg",
      title: "Freshly Baked Goodness",
      description:
        "From crusty breads to sweet pastries, baked daily to perfection.",
    },
    {
      src: "/images/carousel/carousel6.jpg",
      title: "Eat Well, Live Well",
      description:
        "Nutritious meals crafted for a balanced, healthy lifestyle.",
    },
  ];

  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => setCurrent(index);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <div className="relative  w-full section-margin">
      {/* Carousel wrapper */}
      <div className="relative h-[300px] md:h-[450px] lg:h-[600px] overflow-hidden rounded-b-sm">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`duration-700 ease-in-out ${
              index === current ? "block" : "hidden"
            }`}
          >
            {/* Image */}
            <img
              src={slide.src}
              alt={slide.title}
              className="absolute w-full h-full object-cover scale-110 animate-zoom-out -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
            {/* Text content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
              <h2 className="text-[20px] mb-1 sm:text-3xl md:text-5xl font-bold md:mb-3">
                {slide.title}
              </h2>
              <p className="max-w-[60%] text-[12px] sm:text-base md:text-lg lg:text-xl">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 6 10">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
        </span>
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 6 10">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </span>
      </button>

      {/* Bottom Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index ? "bg-white scale-125" : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
