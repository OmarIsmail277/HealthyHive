import { FaRegUser } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import TotalCartItems from "../TotalCartItems/TotalCartItems";
import TotalWishlistItems from "../TotalWishlistItems/TotalWishlistItems";

function MobileNav({
  isOpen,
  setIsOpen,
  setMobileCartOpen,
  setMobileWishlistOpen,
}) {
  return (
    <div className="flex items-center gap-x-5 pt-2 lg:hidden">
      {/* Mobile Wishlist */}
      <button
        onClick={() => setMobileWishlistOpen((prev) => !prev)}
        className="relative"
      >
        <TotalWishlistItems />
      </button>
      {/* Mobile Cart */}
      <button
        onClick={() => setMobileCartOpen((prev) => !prev)}
        className="relative"
      >
        <TotalCartItems />
      </button>
      {/* User */}
      <button className="text-2xl text-primary">
        <FaRegUser />
      </button>
      {/* Mobile Menu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-2xl text-gray-700"
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>
    </div>
  );
}

export default MobileNav;
