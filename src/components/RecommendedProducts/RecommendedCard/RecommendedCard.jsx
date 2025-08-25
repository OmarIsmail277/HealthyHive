import { FaHeart, FaSnowflake, FaHourglassHalf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlistItem } from "../../../store/wishlistSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import AddToCartButton from "../../../Shared/components/AddToCartButton";

function RecommendedCard({ product }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/product/${product.id}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<i key={i} className="fas fa-star text-yellow-400"></i>);
      } else if (rating >= i - 0.5) {
        stars.push(
          <i key={i} className="fas fa-star-half-alt text-yellow-400"></i>
        );
      } else {
        stars.push(<i key={i} className="far fa-star text-yellow-400"></i>);
      }
    }
    return stars;
  };

  // choose icon + label depending on subCategory
  const renderSubCategoryIcon = () => {
    if (product.subCategory?.toLowerCase() === "frozen") {
      return (
        <div className="flex items-center gap-1 bg-blue-100 text-blue-600 px-2 py-1 rounded-lg">
          <FaSnowflake className="text-xl" />
          <span className="text-sm font-medium">Frozen</span>
        </div>
      );
    }
    if (product.subCategory?.toLowerCase() === "preorder") {
      return (
        <div className="flex items-center gap-1 bg-orange-100 text-orange-600 px-2 py-1 rounded-lg">
          <FaHourglassHalf className="text-xl" />
          <span className="text-sm font-medium">Preorder</span>
        </div>
      );
    }
    return null;
  };

  // Calculate discount percentage
  const discountPercentage =
    product.discount > 0
      ? Math.round((product.discount / product.price) * 100)
      : null;

  return (
    <div
      className="flex flex-col justify-between relative border border-[#64a30d78] h-full w-full p-5 rounded-xl shadow-md bg-white cursor-pointer"
      onClick={handleNavigate}
    >
      {/* Price Tag + SubCategory Icon */}
      <div className="flex items-center gap-2 absolute top-4 left-4 z-10">
        {discountPercentage && (
          <div className="bg-emerald-400 rounded-sm px-3 py-1 text-white font-semibold">
            {discountPercentage}%
          </div>
        )}
        {renderSubCategoryIcon()}
      </div>

      {/* Wishlist Icon */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(toggleWishlistItem(product));
        }}
        className="absolute top-4 right-4 text-3xl cursor-pointer z-20"
      >
        <FaHeart
          className={`transition-colors duration-300 ${
            isInWishlist
              ? "text-primary hover:text-secondary"
              : "text-gray-400 hover:text-emerald-300"
          }`}
        />
      </button>

      {/* Image with Flip Animation */}
      <figure className="text-center perspective">
        <div className="relative w-full h-48 transition-transform duration-500 hover:scale-105">
          <img
            className="absolute inset-0 w-full h-full object-contain backface-hidden"
            src={product.imageURL}
            alt="Front"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-green-100 backface-hidden [transform:rotateY(180deg)] rounded-lg">
            <p className="text-gray-700 font-semibold">More Details</p>
          </div>
        </div>
      </figure>

      {/* Rating */}
      <div className="flex items-center gap-2 mt-3">
        <div className="flex">{renderStars(product.rating)}</div>
        <p className="text-gray-600 text-sm font-medium">{product.rating}</p>
      </div>

      {/* Title */}
      <p className="text-gray-900 text-base font-semibold mt-2 leading-snug line-clamp-2">
        {product.Name}
      </p>

      {/* Price */}
      <div className="flex items-center gap-3 mt-3">
        <p className="text-green-600 font-bold text-xl pb-2 sm:pb-0">
          {product.price - product.discount} LE
        </p>
        {product.discount > 0 && (
          <p className="text-gray-400 font-semibold text-lg line-through">
            {product.price} LE
          </p>
        )}
      </div>

      {/* Add to Cart Button */}
      <AddToCartButton product={product} variant="outlined" />
    </div>
  );
}

export default RecommendedCard;
