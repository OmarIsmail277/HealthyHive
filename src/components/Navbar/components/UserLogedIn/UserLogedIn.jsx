import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { ImUserCheck } from "react-icons/im";
import { FiUser, FiShoppingCart, FiHeart, FiLogOut } from "react-icons/fi";
import { useLogout } from "../../../../features/authentication/useLogout";

function UserLogedIn({ userName = "User Name", userEmail }) {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef(null);
  const { logout, isPending } = useLogout();

  const menuItems = [
    { label: "Profile", to: "/profile", icon: <FiUser /> },
    { label: "My Cart", to: "/cart", icon: <FiShoppingCart /> },
    { label: "My Wishlist", to: "/wishlist", icon: <FiHeart /> },
    { label: "Log out", onClick: logout, icon: <FiLogOut /> },
  ];

  const handleMouseEnter = () => {
    clearTimeout(timerRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  // Generate initials (first and last name letters)
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  };

  return (
    <div
      className="hidden lg:block relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* User initials button */}
      <button className="flex items-center gap-2 p-1 rounded-full transition-colors overflow-hidden">
        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
          {getInitials(userName)}
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute -right-10 mt-4 max-w-[200px] w-56 bg-white rounded-lg shadow-[0_8px_20px_rgba(0,0,0,0.25)] overflow-hidden z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <span className="block text-sm font-medium text-gray-900">
              {userName}
            </span>
            <span className="block text-[10px] text-gray-500 truncate">
              {userEmail}
            </span>
          </div>

          {/* Menu */}
          <ul className="py-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-secondary transition-colors"
                    disabled={isPending}
                  >
                    <span className="text-lg text-primary">{item.icon}</span>
                    {item.label}
                  </button>
                ) : (
                  <NavLink
                    to={item.to}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-secondary transition-colors"
                  >
                    <span className="text-lg text-primary">{item.icon}</span>
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserLogedIn;
