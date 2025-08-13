import { FiX } from "react-icons/fi";
import { IoAdd, IoRemove } from "react-icons/io5";
import image from "../../assets/test_img.jpg";
import { useState } from "react";

function MiniCart({ onClose }) {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Fresh Apples", price: 3.5, qty: 2, image: image },
    { id: 2, name: "Organic Bread", price: 2.2, qty: 1, image: image },
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <button onClick={onClose} className="lg:hidden">
          <FiX size={20} />
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4 space-y-4 overflow-y-auto flex-1">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border-b pb-3 last:border-none"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{item.name}</h3>
              <p className="text-xs text-gray-500">
                ${item.price.toFixed(2)} each
              </p>
              {/* Quantity Controls */}
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full"
                >
                  <IoRemove size={14} />
                </button>
                <span className="text-sm font-medium">{item.qty}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full"
                >
                  <IoAdd size={14} />
                </button>
              </div>
            </div>
            <span className="font-semibold text-sm">
              ${(item.price * item.qty).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="flex justify-between font-semibold mb-3">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition">
          Review and checkout
        </button>
      </div>
    </div>
  );
}

export default MiniCart;
