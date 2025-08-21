import { NavLink } from "react-router-dom";

function DesktopDropdown({ hoverIndex, navLinks, setHoverIndex }) {
  const isOpen = Boolean(hoverIndex);

  return (
    <div
      className={`absolute left-0 w-full bg-white shadow-md border-t border-gray-200
        transform transition-all duration-500 ease-out
        ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 shadow-lg"
            : "opacity-0 -translate-y-2 scale-95 shadow-sm pointer-events-none ease-in"
        }`}
      onMouseEnter={() => setHoverIndex(hoverIndex)}
      onMouseLeave={() => setHoverIndex(null)}
    >
      <div className="container mx-auto pt-2">
        <div className="flex flex-wrap justify-center gap-x-2 sm:gap-x-4 md:gap-x-6 py-2">
          {navLinks
            .find((item) => item.path === hoverIndex)
            ?.subLinks.map((sub) => (
              <NavLink
                key={`desktop-sub-${sub.path}`}
                to={sub.path}
                className="px-1 sm:px-2 md:px-3 py-0.5 md:py-1 text-gray-700 rounded-md text-xs sm:text-sm md:text-base
                  hover:bg-emerald-200 transition-colors duration-300 ease-in-out"
              >
                {sub.label}
              </NavLink>
            ))}
        </div>
      </div>
    </div>
  );
}

export default DesktopDropdown;
