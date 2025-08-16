import NavActionButton from "../NavActionButton/NavActionButton";
import { FaRegUser, FaHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { FiMenu, FiX } from "react-icons/fi";

function MobileNav({
  isOpen,
  setIsOpen,
  setMobileCartOpen,
  setMobileWishlistOpen,
}) {
  return (
    <div className="flex align-baseline lg:hidden items-center gap-3">
      <NavActionButton
        title={null}
        subTitle={null}
        icon={<FaRegUser className="text-button text-2xl pb-1" />}
      />
      {/* Mobile Wishlist */}
      <div className="relative">
        <button
          onClick={() => setMobileWishlistOpen((prev) => !prev)}
          className="relative"
        >
          <FaHeart className="text-button text-2xl mr-2" />
          <span className="absolute bottom-[80%] left-[60%] bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            5
          </span>
        </button>
      </div>

      {/* Mobile Cart */}
      <div className="relative">
        <button
          onClick={() => setMobileCartOpen((prev) => !prev)}
          className="relative"
        >
          <IoCartOutline className="text-button text-2xl mr-2" />
          <span className="absolute bottom-[80%] left-[60%] bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            2
          </span>
        </button>
      </div>

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
