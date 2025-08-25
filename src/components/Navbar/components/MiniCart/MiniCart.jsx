import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../../store/cartSlice";
import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";
import QuantitySelector from "../../../../Shared/components/QuantitySelector";
import { useState } from "react";

function MiniCart({ onClose }) {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.cart);

  // state to track which item is hovered
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="h-full flex flex-col rounded-lg shadow-sm shadow-green-100 bg-white relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <button onClick={onClose} className="lg:hidden">
          <FiX size={20} />
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-3 space-y-4 overflow-y-auto overflow-x-hidden flex-1 max-h-[220px] custom-scrollbar">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b border-gray-300 pb-3 last:border-none"
            >
              <img
                src={item.imageURL}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />

              <div className="flex-1 min-w-0">
                {/* Title with tooltip */}
                <div className="relative group inline-block">
                  <h3 className="font-semibold text-sm truncate whitespace-nowrap max-w-[140px]">
                    {item.Name}
                  </h3>

                  {/* Tooltip centered under the title */}
                  <span
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-1
                       hidden group-hover:block bg-emerald-50 text-black z-50
                       text-xs rounded-sm px-3 py-1 whitespace-normal w-max max-w-[220px]
                           shadow-md"
                  >
                    {item.Name}
                  </span>
                </div>

                <p className="text-[9px] pb-0.5 text-gray-500">
                  LE {item.price.toFixed(2)} each
                </p>

                {/* Quantity Controls */}
                <QuantitySelector productId={item.id} variant="circle" />
              </div>

              {/* Price + Delete button */}
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm whitespace-nowrap">
                  LE {(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-2xl text-red-500 hover:underline"
                >
                  <TiDelete />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tooltip centered inside MiniCart */}
      {hoveredItem && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-24 bg-emerald-100 text-black z-50 text-xs rounded px-3 py-1 whitespace-normal w-max max-w-[300px] shadow-md">
          {hoveredItem}
        </div>
      )}

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="flex justify-between font-semibold mb-3">
          <span>Total</span>
          <span>LE {totalPrice.toFixed(2)}</span>
        </div>
        <Link to="/checkout">
          <button className="w-full bg-secondary hover:bg-primary text-white py-2 rounded-lg transition">
            Review and checkout
          </button>
        </Link>
      </div>
    </div>
  );
}

export default MiniCart;
