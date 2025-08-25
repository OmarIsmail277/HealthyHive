import NavActionButton from "../NavActionButton/NavActionButton";
import { FaRegUser } from "react-icons/fa";
import MiniCart from "../MiniCart/MiniCart";
import MiniWishlist from "../MiniWishlist/MiniWishlist";
import { useSelector } from "react-redux";
import { useUser } from "../../../../hooks/useUser";
import TotalCartItems from "../TotalCartItems/TotalCartItems";
import TotalWishlistItems from "../TotalWishlistItems/TotalWishlistItems";
import UserLogedIn from "../UserLogedIn/UserLogedIn";
import { getUserCart } from "../../../../selectors";

function DesktopNav({
  hoverIndex,
  setHoverIndex,
  hideTimeout,
  setHideTimeout,
}) {
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const { user, isPending, isAuthenticated } = useUser();
  console.log("user from desktop nav", user);


  const cart = getUserCart(user);
  console.log("-> test ->", cart);

  if (isPending) return null;

  return (
    <div className="hidden lg:flex items-center space-x-3 xl:space-x-6">
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
          to="/wishlist"
          icon={
            <TotalWishlistItems className="text-primary text-lg lg:text-2xl" />
          }
        />
        <div
          className={`absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg z-50 
    transform transition-all duration-300 ease-out
    ${hoverIndex === "wishlist"
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
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
          title={
            <span className="text-sm lg:text-base min-w-[90px] text-left block">
              LE {totalPrice.toFixed(2)}
            </span>
          }
          subTitle={<span className="text-xs lg:text-sm">Cart Total</span>}
          to="/cart"
          icon={<TotalCartItems className="text-primary text-lg lg:text-2xl" />}
        />
        <div
          className={`absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg z-50
    transform transition-all duration-300 ease-out
    ${hoverIndex === "cart"
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
            }`}
        >
          <MiniCart onClose={() => setHoverIndex(null)} />
        </div>
      </div>

      {isAuthenticated ? (
        <div className="flex items-center justify-center w-10 h-10 rounded-full border-0 lg:border lg:border-emerald-500">
          <UserLogedIn
            userName={
              user?.user_metadata?.username || user?.user_metadata?.full_name
            }
            userEmail={user?.email}
          />
        </div>
      ) : (
        <NavActionButton
          title={<span className="text-sm lg:text-base">Sign In</span>}
          subTitle={<span className="text-xs lg:text-sm">Account</span>}
          to="/login"
          icon={<FaRegUser className="text-primary text-lg lg:text-2xl" />}
        />
      )}
    </div>
  );
}

export default DesktopNav;
