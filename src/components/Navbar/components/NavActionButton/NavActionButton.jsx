import { NavLink } from "react-router-dom";

function NavActionButton({ title, subTitle, icon }) {
  return (
    <NavLink
      to="/account"
      className="flex items-center hover:opacity-80 sm:gap-3"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full border-0 lg:border lg:border-green-300">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-semibold">{title}</span>
        <span className="text-gray-500 text-sm">{subTitle}</span>
      </div>
    </NavLink>
  );
}

export default NavActionButton;
