import { NavLink } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

function MobileMenu({
  isOpen,
  navLinks,
  mobileDropdownIndex,
  setMobileDropdownIndex,
}) {
  return (
    <div
      className={`w-[90%] mx-auto lg:hidden overflow-hidden transition-all duration-500 ease-in-out 
      ${
        isOpen
          ? "max-h-screen opacity-100 translate-y-0"
          : "max-h-0 opacity-0 -translate-y-2"
      }`}
    >
      <div className="px-3 py-3 border-t border-gray-200">
        {/* Search mobile */}
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search for healthy products..."
            className="w-full border border-gray-300 rounded-l-md px-2 py-1 sm:px-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
          />
          <button className="bg-primary text-white px-2 sm:px-3 rounded-r-md hover:bg-secondary text-sm sm:text-base">
            Search
          </button>
        </div>

        {/* Category links mobile */}
        <div className="border-t border-gray-200 pt-2">
          {navLinks.map((item) => {
            const isOpenDropdown = mobileDropdownIndex === item.path;

            return (
              <div key={`mobile-${item.path}`} className="mb-2">
                <button
                  className="flex justify-between items-center w-full text-left px-2 py-2 text-green-700 font-medium"
                  onClick={() =>
                    setMobileDropdownIndex(isOpenDropdown ? null : item.path)
                  }
                >
                  {item.label}
                  <FiChevronDown
                    className={`transition-transform duration-300 ${
                      isOpenDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Smooth accordion animation for sublinks */}
                <div
                  className={`pl-4 overflow-hidden transition-all duration-500 ease-in-out
                  ${
                    isOpenDropdown
                      ? "max-h-40 opacity-100 translate-y-0"
                      : "max-h-0 opacity-0 -translate-y-1"
                  }`}
                >
                  {item.subLinks.map((sub) => (
                    <NavLink
                      key={`mobile-sub-${sub.path}`}
                      to={sub.path}
                      className="block px-2 py-1 text-gray-600 hover:bg-green-100 rounded-md transition-colors duration-300"
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
