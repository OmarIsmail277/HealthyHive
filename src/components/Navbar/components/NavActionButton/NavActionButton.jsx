import { NavLink } from "react-router-dom";

function NavActionButton({ title, subTitle, icon, to }) {
  return (
    <NavLink to={to} className="flex items-center sm:gap-3">
      <div className="flex items-center justify-center w-10 h-10 rounded-full border-0 lg:border lg:border-emerald-500">
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
