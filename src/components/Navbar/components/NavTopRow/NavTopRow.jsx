import { Link } from "react-router-dom";
import { FaLeaf, FaRegUser } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import NavActionButton from "../NavActionButton/NavActionButton";
import { useState } from "react";
import MiniCart from "../../../MiniCart/MiniCart";

function NavTopRow({ isOpen, setIsOpen }) {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [hideTimeout, setHideTimeout] = useState(null);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);

  return (
    <div className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 sm:gap-2">
          <FaLeaf className="text-lg sm:text-xl lg:text-2xl text-button" />
          <span className="font-bold text-base sm:text-lg lg:text-xl">
            HealthyHive
          </span>
        </Link>

        {/* Search bar - desktop */}
        <div className="hidden lg:flex justify-center flex-1 mx-2 md:mx-4 lg:mx-6">
          <input
            type="text"
            placeholder="Search healthy products..."
            className="w-[65%] border border-gray-300 rounded-l-md px-2 py-1 md:px-3 lg:px-4 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
          />
          <button className="bg-button text-white px-2 md:px-3 lg:px-4 rounded-r-md hover:bg-green-700 text-sm md:text-base cursor-pointer">
            Search
          </button>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center space-x-3 xl:space-x-6">
          <button className="bg-green-100 text-button px-2 py-1 lg:px-4 rounded-md hover:bg-green-200 text-sm lg:text-base cursor-pointer">
            Subscribe
          </button>

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
              className={`absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg z-50
                         transform transition-all duration-500 ease-in-out
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
            icon={<FaRegUser className="text-button text-lg lg:text-2xl" />}
          />
        </div>

        {/* Mobile + Mid Screens */}
        <div className="flex lg:hidden items-center gap-3">
          <NavActionButton
            title={null}
            subTitle={null}
            icon={<FaRegUser className="text-button text-2xl pb-1" />}
          />

          {/* Mobile Cart Click Toggle */}
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

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-gray-700"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile MiniCart */}
      <div className="lg:hidden fixed inset-0 z-40 pointer-events-none">
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ease-in-out 
      ${mobileCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0"}`}
          onClick={() => setMobileCartOpen(false)}
        ></div>

        {/* Cart Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-80 bg-white shadow-lg z-50
      transform transition-transform duration-500 ease-in-out
      ${
        mobileCartOpen
          ? "translate-x-0 pointer-events-auto"
          : "translate-x-full"
      }`}
        >
          <MiniCart onClose={() => setMobileCartOpen(false)} />
        </div>
      </div>
    </div>
  );
}

export default NavTopRow;
