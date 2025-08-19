import { FiX } from "react-icons/fi";
import { IoAdd, IoRemove } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../../../store/cartSlice";
import { TiDelete } from "react-icons/ti";

function MiniCart({ onClose }) {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.cart);

  return (
    <div className="h-full flex flex-col border rounded-lg shadow-lg bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b ">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <button onClick={onClose} className="lg:hidden">
          <FiX size={20} />
        </button>
      </div>

      {/* Cart Items (only 2 visible, rest scrollable) */}
      <div className="p-4 space-y-4 overflow-y-auto flex-1 max-h-[220px] custom-scrollbar">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b pb-3 last:border-none"
            >
              <img
                src={item.imageURL}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{item.Name}</h3>
                <p className="text-xs text-gray-500">
                  ${item.price.toFixed(2)} each
                </p>
                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full"
                  >
                    <IoRemove size={14} />
                  </button>
                  <span className="text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full"
                  >
                    <IoAdd size={14} />
                  </button>
                </div>
              </div>
              <div className="flex gap-2 items-end">
                <span className="font-semibold text-sm">
                  LE {(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-2xl text-red-500 hover:underline mt-1"
                >
                  <TiDelete />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="flex justify-between font-semibold mb-3">
          <span>Total</span>
          <span>LE {totalPrice.toFixed(2)}</span>
        </div>
        <button className="w-full bg-secondary hover:bg-primary text-white py-2 rounded-lg transition">
          Review and checkout
        </button>
      </div>
    </div>
  );
}

export default MiniCart;
