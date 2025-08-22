import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { FiCheck } from "react-icons/fi";

function AddToCartButton({
  product,
  onClick,
  children = "Add to Cart",
  variant = "primary",
  fullWidth = true,
  className = "",
  duration = 1500,
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleClick = async (e) => {
    e.stopPropagation();
    setLoading(true);

    try {
      if (onClick) {
        await onClick(e);
      } else if (product) {
        dispatch(addToCart(product));
      }

      // show success state
      setAdded(true);
      setTimeout(() => setAdded(false), duration);
    } finally {
      setLoading(false);
    }
  };

  const baseClasses =
    "py-2 px-4 rounded-4xl font-medium transition-all duration-200 focus:outline-none flex items-center justify-center";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary:
      "bg-white text-gray-700 border border-gray-400 hover:bg-secondary hover:text-white",
    custom:
      "flex-1 bg-secondary text-white py-4 rounded-2xl font-semibold shadow-md hover:bg-primary transition",
    outlined:
      "border border-green-600 text-green-600 hover:bg-primary hover:text-white rounded-full",
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`${baseClasses} ${variants[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className} ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      ) : added ? (
        <span className="flex items-center gap-1">
          <FiCheck className="text-lg" /> Added
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export default AddToCartButton;
