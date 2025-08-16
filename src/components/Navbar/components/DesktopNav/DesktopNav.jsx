import { NavLink } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

function DesktopNav({ navLinks, hoverIndex, setHoverIndex }) {
  return (
    <div className="hidden lg:flex relative">
      <div className="container mx-auto flex justify-center space-x-2 sm:space-x-4 md:space-x-6 py-1 md:py-1.5 z-30 bg-white pb-3">
        {navLinks.map((item) => (
          <div
            key={`desktop-${item.path}`}
            className="group relative"
            onMouseEnter={() => setHoverIndex(item.path)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <NavLink
              to={item.path}
              className="flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2 md:px-3 py-0.5 md:py-1 font-medium text-green-700 hover:text-green-900 cursor-pointer text-xs sm:text-sm md:text-base"
            >
              {item.label}
              <FiChevronDown
                className={`transition-transform duration-300 ${
                  hoverIndex === item.path ? "rotate-180" : ""
                }`}
              />
            </NavLink>

            <div
              className="absolute left-0 w-full h-3 bg-transparent"
              style={{ top: "100%" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DesktopNav;
