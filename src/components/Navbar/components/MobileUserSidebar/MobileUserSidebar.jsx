import { useState } from "react";
import { FiX, FiUser, FiHeart, FiLogOut, FiShoppingCart } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useLogout } from "../../../../hooks/useUser";

function MobileUserSidebar({ userName = "User Name", userEmail }) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, isPending } = useLogout();

  const menuItems = [
    { label: "Profile", to: "/profile", icon: <FiUser /> },
    { label: "My Cart", to: "/cart", icon: <FiShoppingCart /> },
    { label: "My Wishlist", to: "/wishlist", icon: <FiHeart /> },
    { label: "Log out", onClick: logout, icon: <FiLogOut /> },
  ];

  // Generate initials (first + last name)
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  };

  return (
    <div className="lg:hidden">
      {/* User Icon (opens sidebar) */}
      <button onClick={() => setIsOpen(true)} className="text-2xl text-primary">
        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-xs sm:text-sm md:text-base">
          {getInitials(userName)}
        </div>
      </button>

      {/* Sidebar + Overlay */}
      <>
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-500 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header with close button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <h2 className="text-lg font-semibold text-gray-800">
              User Account
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-red-500 text-2xl"
            >
              <FiX />
            </button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-gray-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-semibold">
                {getInitials(userName)}
              </div>
              <span className="block text-sm text-gray-500 truncate">
                {userEmail}
              </span>
              <div>
                {/* User name has different style (slightly bigger) */}
                <p className="text-base font-medium text-gray-900">
                  {userName}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Links */}
          <ul className="p-4 space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-secondary"
                    disabled={isPending}
                  >
                    <span className="text-lg text-red-600">{item.icon}</span>
                    {item.label}
                  </button>
                ) : (
                  <NavLink
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-secondary"
                  >
                    <span className="text-lg text-primary">{item.icon}</span>
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </>
    </div>
  );
}

export default MobileUserSidebar;
