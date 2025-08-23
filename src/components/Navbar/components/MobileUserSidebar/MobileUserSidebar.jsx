import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useLogout } from "../../../../features/authentication/useLogout";

function MobileUserSidebar({ userName, userEmail, userImage = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, isPending } = useLogout();

  const menuItems = [
    { label: "Profile", to: "/profile" },
    { label: "Wishlist", to: "/wishlist" },
    { label: "Log out", onClick: logout },
  ];

  return (
    <div className="lg:hidden">
      {/* User Icon */}
      <button onClick={() => setIsOpen(true)} className="text-2xl text-primary">
        <FaRegUser />
      </button>

      {/* Sidebar + Overlay */}
      <>
        {/* Overlay */}
        <div
          className={`fixed  z-40 transition-opacity duration-500 ${
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
          <div className="p-4 border-b border-gray-300">
            <div className="flex items-center gap-3">
              <img
                src={userImage}
                alt={`user ${userName}`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500">{userEmail}</p>
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
                    className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-green-100"
                    disabled={isPending}
                  >
                    {item.label}
                  </button>
                ) : (
                  <NavLink
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-green-100"
                  >
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
