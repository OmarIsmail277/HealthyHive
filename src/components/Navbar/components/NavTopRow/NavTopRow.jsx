import { Link } from "react-router-dom";
import { FaLeaf, FaRegUser } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import NavActionButton from "../NavActionButton/NavActionButton";

function NavTopRow({ isOpen, setIsOpen }) {
  return (
    <div className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 sm:gap-2">
          <FaLeaf className="text-lg sm:text-xl lg:text-2xl text-primary" />
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
          <button className="bg-primary text-white px-2 md:px-3 lg:px-4 rounded-r-md hover:bg-green-700 text-sm md:text-base cursor-pointer">
            Search
          </button>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center space-x-3 xl:space-x-6">
          <button className="bg-green-100 text-green-700 px-2 py-1 lg:px-4 rounded-md hover:bg-green-200 text-sm lg:text-base cursor-pointer">
            Subscribe
          </button>
          <NavActionButton
            title={<span className="text-sm lg:text-base">Sign In</span>}
            subTitle={<span className="text-xs lg:text-sm">Account</span>}
            icon={<FaRegUser className="text-green-700 text-lg lg:text-2xl" />}
          />
          <NavActionButton
            title={<span className="text-sm lg:text-base">$0.00</span>}
            subTitle={<span className="text-xs lg:text-sm">Cart Total</span>}
            icon={
              <IoCartOutline className="text-green-700 text-xl lg:text-3xl" />
            }
          />
        </div>

        {/* Login + Cart icons + Burger for < lg screens */}
        <div className="flex lg:hidden items-center gap-3">
          <NavActionButton
            title={null}
            subTitle={null}
            icon={<FaRegUser className="text-green-700 text-xl" />}
          />
          <NavActionButton
            title={null}
            subTitle={null}
            icon={<IoCartOutline className="text-green-700 text-2xl" />}
          />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-gray-700"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavTopRow;
