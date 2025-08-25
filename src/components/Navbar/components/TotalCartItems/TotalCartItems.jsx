import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

function TotalCartItems({ className = "" }) {
  const totalCartItems = useSelector((state) => state.cart.totalCartItems);

  return (
    <div className={`relative ${className}`}>
      <IoCartOutline className="text-primary text-2xl lg:text-3xl" />
      {totalCartItems > 0 && (
        <span className="absolute -top-3.5 -right-2 bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px] leading-none">
          {totalCartItems}
        </span>
      )}
    </div>
  );
}

export default TotalCartItems;
