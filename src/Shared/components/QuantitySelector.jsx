import { IoRemove, IoAdd } from "react-icons/io5";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../../store/cartSlice";

function QuantitySelector({
  productId,
  variant = "circle",
  min = 1,
  max = 99,
  stockQuantity,
  className = "",
}) {
  const dispatch = useDispatch();
  const quantity = useSelector(
    (state) => state.cart.items.find((i) => i.id === productId)?.quantity || 1
  );

  const handleDecrease = () => {
    if (quantity > min) dispatch(decreaseQuantity(productId));
  };

  const handleIncrease = () => {
    if (quantity < max) dispatch(increaseQuantity(productId));
  };

  if (variant === "box") {
    return (
      <div
        className={`flex flex-col min-[485px]:flex-row items-center gap-4 ${className}`}
      >
        <span className="font-bold">Quantity:</span>

        {/* Box style controls */}
        <div className="flex items-center border border-secondary rounded-xl overflow-hidden">
          <button
            onClick={handleDecrease}
            disabled={quantity <= min}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <BiMinus size={18} />
          </button>
          <span className="px-6 py-2 font-semibold">{quantity}</span>
          <button
            onClick={handleIncrease}
            disabled={quantity >= max}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <BiPlus size={18} />
          </button>
        </div>

        {/* Stock message */}
        {stockQuantity !== undefined && (
          <p>
            Only{" "}
            <span className="font-semibold text-primary">
              {stockQuantity} items
            </span>{" "}
            Left!
          </p>
        )}
      </div>
    );
  }

  // Default = Circle style
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={handleDecrease}
        disabled={quantity <= min}
        className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 
                   disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
      >
        <IoRemove size={14} />
      </button>
      <span className="text-sm font-medium">{quantity}</span>
      <button
        onClick={handleIncrease}
        disabled={quantity >= max}
        className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 
                   disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
      >
        <IoAdd size={14} />
      </button>
    </div>
  );
}

export default QuantitySelector;
