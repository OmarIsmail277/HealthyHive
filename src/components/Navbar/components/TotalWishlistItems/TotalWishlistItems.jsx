import { useSelector } from "react-redux";
import { FaRegHeart } from "react-icons/fa";

function TotalWishlistItems() {
  const totalItemsInWishlist = useSelector(
    (state) => state.wishlist.totalItemsInWishlist
  );

  return (
    <div className="relative">
      <FaRegHeart className="text-primary text-lg lg:text-2xl" />
      {totalItemsInWishlist > 0 && (
        <span className="absolute -top-3.5 -right-2 bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px] leading-none">
          {totalItemsInWishlist}
        </span>
      )}
    </div>
  );
}

export default TotalWishlistItems;
