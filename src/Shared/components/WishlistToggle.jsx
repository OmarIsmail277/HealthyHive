import { useMemo } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlistItem } from "../../store/wishlistSlice";

function WishlistToggle({
  product,
  className = "",
  size = "text-2xl",
  ariaLabel = "Toggle wishlist",
}) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.wishlist.items);

  // Efficient check so we don’t recompute on unrelated renders
  const isInWishlist = useMemo(
    () => items?.some((i) => i.id === product?.id),
    [items, product?.id]
  );

  const handleToggle = (e) => {
    e.stopPropagation?.();
    // guard against bad props
    if (!product?.id) return;
    dispatch(toggleWishlistItem(product));
  };

  return (
    <button
      onClick={handleToggle}
      aria-pressed={!!isInWishlist}
      aria-label={ariaLabel}
      className={`cursor-pointer z-20 ${className}`}
      type="button"
    >
      <FaHeart
        className={`transition-colors duration-300 ${size} ${
          isInWishlist
            ? "text-primary hover:text-secondary"
            : "text-gray-400 hover:text-emerald-300"
        }`}
      />
    </button>
  );
}

export default WishlistToggle;
