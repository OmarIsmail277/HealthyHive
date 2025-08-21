import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
import { useState } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import MiniCart from "../MiniCart/MiniCart";
import MiniWishlist from "../MiniWishlist/MiniWishlist";
import { useNavigate } from "react-router-dom";

function NavTopRow({ isOpen, setIsOpen }) {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [hideTimeout, setHideTimeout] = useState(null);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);
  const [mobileWishlistOpen, setMobileWishlistOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <div className="healthy__container py-2 sm:py-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 sm:gap-2">
          {/* <FaLeaf className="text-lg sm:text-xl lg:text-2xl text-primary" /> */}
          <img src="/images/logos/green-logo.svg" className="h-[80px] w-[80px] "/>
          <span className="font-bold text-base sm:text-lg lg:text-3xl">
            HealthyHive
          </span>
        </Link>

        {/* Search bar - desktop */}
        <form 
          className="hidden lg:flex justify-center flex-1 mx-2 md:mx-4 lg:mx-6"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Search healthy products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[65%] border border-gray-300 rounded-l-md px-2 py-1 md:px-3 lg:px-4 focus:outline-none focus:ring-[.5px] focus:ring-emerald-400 text-sm md:text-base"
          />
          <button 
            type="submit"
            className="bg-primary text-white px-2 md:px-3 lg:px-4 rounded-r-md hover:bg-secondary text-sm md:text-base cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Desktop nav */}
        <DesktopNav
          hoverIndex={hoverIndex}
          setHoverIndex={setHoverIndex}
          hideTimeout={hideTimeout}
          setHideTimeout={setHideTimeout}
        />

        {/* Mobile nav */}
        <MobileNav
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setMobileCartOpen={setMobileCartOpen}
          setMobileWishlistOpen={setMobileWishlistOpen}
        />
      </div>

      {/* Mobile MiniWishlist */}
      <div className="lg:hidden fixed inset-0 z-40 pointer-events-none">
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ease-in-out 
            ${
              mobileWishlistOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0"
            }`}
          onClick={() => setMobileWishlistOpen(false)}
        ></div>
        <div
          className={`absolute top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-500 ease-in-out
            ${
              mobileWishlistOpen
                ? "translate-x-0 pointer-events-auto"
                : "translate-x-full"
            }`}
        >
          <MiniWishlist onClose={() => setMobileWishlistOpen(false)} />
        </div>
      </div>

      {/* Mobile MiniCart */}
      <div className="lg:hidden fixed inset-0 z-40 pointer-events-none">
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ease-in-out 
            ${
              mobileCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
            }`}
          onClick={() => setMobileCartOpen(false)}
        ></div>
        <div
          className={`absolute top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-500 ease-in-out
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