import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ImUserCheck } from "react-icons/im";
import { FiChevronDown } from "react-icons/fi";

function UserDropdown({ isLoggedIn, onMobile = false }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Wishlist", to: "/wishlist" },
    { label: "Settings", to: "/settings" },
    { label: "Sign out", to: "/logout" },
  ];

  if (!isLoggedIn) return null;

  if (onMobile) {
    return (
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 text-gray-700"
        >
          <ImUserCheck className="text-green-600 text-xl" />
        </button>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="absolute top-16 right-4 bg-white rounded-lg shadow-lg w-64 animate-slideDown"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-3 border-b border-gray-100">
                <span className="block text-sm font-medium text-gray-900">
                  User Name
                </span>
                <span className="block text-sm text-gray-500 truncate">
                  user@example.com
                </span>
              </div>
              <ul className="py-1">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.to}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="hidden lg:block relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 p-1 rounded-full hover:bg-green-100 transition-colors"
      >
        <ImUserCheck className="text-green-600 text-xl" />
        <FiChevronDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden animate-slideDown">
          <div className="px-4 py-3 border-b border-gray-100">
            <span className="block text-sm font-medium text-gray-900">
              User Name
            </span>
            <span className="block text-sm text-gray-500 truncate">
              user@example.com
            </span>
          </div>
          <ul className="py-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.to}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
