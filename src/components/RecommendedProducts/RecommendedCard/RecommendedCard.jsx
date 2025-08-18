import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import test from "../../../assets/test_img.jpg";

function RecommendedCard() {
  const [wishlist, setWishlist] = useState(false);

  const toggleWishlist = () => {
    setWishlist((prev) => !prev);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<i key={i} className="fas fa-star text-yellow-400"></i>);
      } else if (rating >= i - 0.5) {
        stars.push(<i key={i} className="fas fa-star-half-alt text-yellow-400"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star text-yellow-400"></i>);
      }
    }
    return stars;
  };

  return (
    <div className="relative border border-[#64a30d78] w-[370px]  p-5 rounded-xl shadow-md bg-white">
      {/* Price Tag */}
      <div className="bg-primary absolute top-4 left-4 rounded-xl px-3 py-1 text-white font-semibold z-10">
        19 LE
      </div>

      {/* Wishlist Icon - stays fixed, doesn’t flip */}
      <button
        onClick={toggleWishlist}
        className="absolute top-4 right-4 text-3xl cursor-pointer z-20"
      >
        <FaHeart
          className={`transition-colors duration-300 ${
            wishlist  ? "text-primary hover:text-secondary"
                    : "text-gray-400 hover:text-emerald-500"
          }`}
        />
      </button>

      {/* Image with Flip Animation */}
      <figure className="text-center perspective">
        <div className="relative w-full h-48 transition-transform duration-700 transform-style-preserve-3d hover:[transform:rotateY(180deg)]">
          <img
            className="absolute inset-0 w-full h-full object-contain backface-hidden"
            src={test}
            alt="Front"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-green-100 backface-hidden [transform:rotateY(180deg)] rounded-lg">
            <p className="text-gray-700 font-semibold">More Details</p>
          </div>
        </div>
      </figure>

      {/* Rating */}
      <div className="flex items-center gap-2 mt-3">
        <div className="flex">{renderStars(4)}</div>
        <p className="text-gray-600 text-sm font-medium">4.4</p>
      </div>

      {/* Title */}
      <p className="text-gray-900 text-base font-semibold mt-2 leading-snug line-clamp-2">
        Optimum Nutrition, Gold Standard 100% Whey Protein Powder
      </p>

      {/* Price */}
      <div className="flex items-center gap-3 mt-3">
        <p className="text-green-600 font-bold text-xl">27.99 LE</p>
        <p className="text-gray-400 font-semibold text-lg line-through">
          34.19 LE
        </p>
      </div>

      {/* Add to Cart */}
      <button className="w-full py-3 mt-4 rounded-full border border-green-600 text-green-600 font-medium transition-all duration-200 hover:bg-primary hover:text-white">
        Add To Cart
      </button>
    </div>
  );
}

export default RecommendedCard;
