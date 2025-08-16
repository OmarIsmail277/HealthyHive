import { useState } from "react";
import { FaHeart, FaPlus, FaCheck } from "react-icons/fa";

export default function FeaturedCards() {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  const cards = [
    {
      id: 1,
      title: "Fresh Organic Salad",
      description: "Crisp greens with seasonal vegetables and house dressing",
      price: "50.00",
      originalPrice: "65.00",
      image: "/images/snacks.jpg",
      rating: 4.8,
      isNew: true,
      isSale: true,
    },
    {
      id: 2,
      title: "Healthy Smoothie Bowl",
      description:
        "Blended tropical fruits topped with granola and honey fruits topped with granola",
      price: "35.00",
      originalPrice: "45.00",
      image: "/images/snacks.jpg",
      rating: 4.6,
      isNew: false,
      isSale: true,
    },
    {
      id: 3,
      title: "Artisan Whole Grain Bread",
      description:
        "Freshly baked with organic whole wheat and seeds fruits topped with granola",
      price: "20.00",
      image: "/images/snacks.jpg",
      rating: 4.9,
      isNew: true,
      isSale: false,
    },
  ];

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (id) => {
    if (!cart.includes(id)) {
      setCart((prev) => [...prev, id]);
    }
  };

  return (
    <section className="healthy__container py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-emerald-800 mb-3">
          Featured Healthy Products
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto rounded-full"></div>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Discover our premium selection of nutritious and delicious options
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-xl shadow-md overflow-hidden relative flex flex-col"
          >
            {/* Heart Icon */}
            <button
              onClick={() => toggleFavorite(card.id)}
              className="absolute top-4 right-4 text-3xl cursor-pointer z-20"
            >
              <FaHeart
                className={`transition-colors duration-300 ${
                  favorites.includes(card.id)
                    ? "text-red-500 hover:text-red-600"
                    : "text-gray-400 hover:text-red-400"
                }`}
              />
            </button>

            {/* Image Section (Bigger now) */}
            <div className="relative h-72 sm:h-64 overflow-hidden flex-shrink-0">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                {card.isNew && (
                  <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    NEW
                  </span>
                )}
                {card.isSale && (
                  <span className="bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    SALE
                  </span>
                )}
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-800">
                  {card.title}
                </h3>
                <div className="flex items-center bg-amber-100 px-2 py-1 rounded-full">
                  <span className="text-amber-700 text-sm font-bold">
                    {card.rating}
                  </span>
                  <svg
                    className="w-4 h-4 text-amber-500 ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>

              {/* Fixed height description (smaller now) */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
                {card.description}
              </p>

              {/* Price + Add to Cart */}
              <div className="mt-auto flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  {card.originalPrice && (
                    <span className="text-gray-400 text-sm line-through order-1 mx-2 sm:order-none">
                      LE{card.originalPrice}
                    </span>
                  )}
                  <span className="text-emerald-600 font-bold text-xl order-2">
                    LE{card.price}
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(card.id)}
                  disabled={cart.includes(card.id)}
                  className={`flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-300 ${
                    cart.includes(card.id)
                      ? "bg-emerald-100 text-emerald-600 cursor-not-allowed"
                      : "bg-emerald-500 hover:bg-emerald-600 text-white"
                  }`}
                >
                  {cart.includes(card.id) ? (
                    <FaCheck className="text-lg" />
                  ) : (
                    <>
                      <FaPlus className="mr-2 text-lg" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
