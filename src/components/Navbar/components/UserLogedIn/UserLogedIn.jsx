import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { ImUserCheck } from "react-icons/im";
import { useLogout } from "../../../../hooks/useUser";

function UserLogedIn({
  userName = "User Name",
  userEmail = "user@example.com",
  userImage = null,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef(null);
  const { logout, isPending } = useLogout();

  const menuItems = [
    { label: "Profile", to: "/profile" },
    { label: "Wishlist", to: "/wishlist" },
    { label: "Log out", onClick: logout },
  ];

  const handleMouseEnter = () => {
    clearTimeout(timerRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <div
      className="hidden lg:block relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center gap-2 p-1 rounded-full  transition-colors">
        {userImage ? (
          <img
            src={userImage}
            alt={`userName-${userName}`}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <ImUserCheck className="text-primary text-xl" />
        )}
      </button>

      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-lg shadow-lg overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <span className="block text-sm font-medium text-gray-900">
              {userName}
            </span>
            <span className="block text-sm text-gray-500 truncate">
              {userEmail}
            </span>
          </div>
          <ul className="py-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-secondary transition-colors"
                    disabled={isPending}
                  >
                    {item.label}
                  </button>
                ) : (
                  <NavLink
                    to={item.to}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary transition-colors"
                  >
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
