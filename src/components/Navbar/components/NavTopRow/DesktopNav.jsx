import NavActionButton from "../NavActionButton/NavActionButton";
import { FaRegUser, FaHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import MiniCart from "../MiniCart/MiniCart";
import MiniWishlist from "../MiniWishlist/MiniWishlist";

function DesktopNav({
  hoverIndex,
  setHoverIndex,
  hideTimeout,
  setHideTimeout,
}) {
  return (
    <div className="hidden lg:flex items-center space-x-3 xl:space-x-6">
      {/* <button className="bg-green-100 text-button px-2 py-1 lg:px-4 rounded-md hover:bg-green-200 text-sm lg:text-base cursor-pointer">
        Subscribe
      </button> */}

      {/* Wishlist Hover */}
      <div
        className="relative inline-block"
        onMouseEnter={() => {
          if (hideTimeout) clearTimeout(hideTimeout);
          setHoverIndex("wishlist");
        }}
        onMouseLeave={() => {
          const timeout = setTimeout(() => setHoverIndex(null), 150);
          setHideTimeout(timeout);
        }}
      >
        <NavActionButton
          title={<span className="text-sm lg:text-base">Wishlist</span>}
          subTitle={<span className="text-xs lg:text-sm">Your Favorites</span>}
          icon={
            <div className="relative">
              <FaHeart className="text-button text-lg lg:text-2xl" />
              <span className="absolute bottom-[90%] left-[60%] bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                5
              </span>
            </div>
          }
        />
        <div
          className={`absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg z-50 transform transition-all duration-500 ease-in-out
            ${
              hoverIndex === "wishlist"
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
        >
          <MiniWishlist onClose={() => setHoverIndex(null)} />
        </div>
      </div>

      {/* Cart Hover */}
      <div
        className="relative inline-block"
        onMouseEnter={() => {
          if (hideTimeout) clearTimeout(hideTimeout);
          setHoverIndex("cart");
        }}
        onMouseLeave={() => {
          const timeout = setTimeout(() => setHoverIndex(null), 150);
          setHideTimeout(timeout);
        }}
      >
        <NavActionButton
          title={<span className="text-sm lg:text-base">$0.00</span>}
          subTitle={<span className="text-xs lg:text-sm">Cart Total</span>}
          icon={
            <div className="relative">
              <IoCartOutline className="text-button text-xl lg:text-3xl" />
              <span className="absolute bottom-[90%] left-[60%] bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                3
              </span>
            </div>
          }
        />
        <div
          className={`absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg z-50 transform transition-all duration-500 ease-in-out
            ${
              hoverIndex === "cart"
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
        >
          <MiniCart onClose={() => setHoverIndex(null)} />
        </div>
      </div>

      <NavActionButton
        title={<span className="text-sm lg:text-base">Sign In</span>}
        subTitle={<span className="text-xs lg:text-sm">Account</span>}
        to="/login"
        icon={<FaRegUser className="text-button text-lg lg:text-2xl" />}
      />
    </div>
  );
}

export default DesktopNav;
