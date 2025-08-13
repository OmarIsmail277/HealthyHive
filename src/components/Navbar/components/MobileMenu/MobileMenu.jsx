import { NavLink } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

function MobileMenu({
  isOpen,
  navLinks,
  mobileDropdownIndex,
  setMobileDropdownIndex,
}) {
  if (!isOpen) return null;

  return (
    <div className="w-[90%] mx-auto lg:hidden overflow-hidden transition-all duration-300 ease-in-out max-h-screen opacity-100">
      <div className="px-3 py-3 border-t border-gray-200">
        {/* Search mobile */}
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search for healthy products..."
            className="w-full border border-gray-300 rounded-l-md px-2 py-1 sm:px-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
          />
          <button className="bg-button text-white px-2 sm:px-3 rounded-r-md hover:bg-primary text-sm sm:text-base">
            Search
          </button>
        </div>

        {/* Subscribe */}
        <button className="block w-full bg-green-100 text-green-700 px-4 py-2 rounded-md hover:bg-green-200 text-sm sm:text-base text-center mb-4 cursor-pointer">
          Subscribe
        </button>

        {/* Category links mobile */}
        <div className="border-t border-gray-200 pt-2">
          {navLinks.map((item) => (
            <div key={`mobile-${item.path}`} className="mb-2">
              <button
                className="flex justify-between items-center w-full text-left px-2 py-2 text-green-700 font-medium"
                onClick={() =>
                  setMobileDropdownIndex(
                    mobileDropdownIndex === item.path ? null : item.path
                  )
                }
              >
                {item.label}
                <FiChevronDown
                  className={`transition-transform duration-300 ${
                    mobileDropdownIndex === item.path ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileDropdownIndex === item.path && (
                <div className="pl-4">
                  {item.subLinks.map((sub) => (
                    <NavLink
                      key={`mobile-sub-${sub.path}`}
                      to={sub.path}
                      className="block px-2 py-1 text-gray-600 hover:bg-green-100 rounded-md"
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
