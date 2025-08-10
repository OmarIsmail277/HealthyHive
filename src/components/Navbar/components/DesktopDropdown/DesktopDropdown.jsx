import { NavLink } from "react-router-dom";

function DesktopDropdown({ hoverIndex, navLinks, setHoverIndex }) {
  if (!hoverIndex) return null;

  return (
    <div
      className="absolute left-0 w-full bg-white shadow-md border-t border-gray-200 z-20"
      onMouseEnter={() => setHoverIndex(hoverIndex)}
      onMouseLeave={() => setHoverIndex(null)}
    >
      <div className="container mx-auto  pt-2">
        <div className="flex flex-wrap justify-center gap-x-2 sm:gap-x-4 md:gap-x-6 py-2">
          {navLinks
            .find((item) => item.path === hoverIndex)
            ?.subLinks.map((sub) => (
              <NavLink
                key={`desktop-sub-${sub.path}`}
                to={sub.path}
                className="px-1 sm:px-2 md:px-3 py-0.5 md:py-1 text-gray-700 hover:bg-green-100 rounded-md text-xs sm:text-sm md:text-base"
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
