import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaTruckFast, FaHouse } from "react-icons/fa6";

function CartCheckout() {
  const { totalPrice } = useSelector((state) => state.cart);
  const [shippingMethod, setShippingMethod] = useState("pickup");

  const deliveryCost = shippingMethod === "delivery" ? 20 : 0;

  const handleShippingChange = (value) => {
    setShippingMethod(value);
  };

  return (
    <div className="2xl:w-[28%] w-full border border-green-100 bg-white rounded-xl shadow-md p-6 h-fit">
      <h4 className="text-green-800 font-bold text-xl mb-6">Cart Totals</h4>

      {/* Subtotal */}
      <div className="flex justify-between border-b border-gray-200 pb-3 mb-4">
        <h6 className="text-gray-600 font-medium">Subtotal</h6>
        <p className="font-semibold text-gray-800">
          {totalPrice > 0 ? `${totalPrice} LE` : `0 LE`}
        </p>
      </div>

      {/* Shipping */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h6 className="text-gray-600 font-medium mb-3">Shipping</h6>
        <div className="space-y-3">
          {/* Store Pickup */}
          <label
            className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${
              shippingMethod === "pickup"
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-green-300"
            }`}
          >
            <input
              type="radio"
              name="shipping"
              value="pickup"
              checked={shippingMethod === "pickup"}
              onChange={(e) => handleShippingChange(e.target.value)}
            />
            <FaHouse className="text-xl text-green-600" />
            <div>
              <p className="font-medium text-gray-800">Free Store Pickup</p>
              <p className="text-sm text-gray-500">
                Pick up from our store at no cost
              </p>
            </div>
          </label>

          {/* Home Delivery */}
          <label
            className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${
              shippingMethod === "delivery"
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-green-300"
            }`}
          >
            <input
              type="radio"
              name="shipping"
              value="delivery"
              checked={shippingMethod === "delivery"}
              onChange={(e) => handleShippingChange(e.target.value)}
            />
            <FaTruckFast className="text-xl text-green-600" />
            <div>
              <p className="font-medium text-gray-800">Home Delivery</p>
              <p className="text-sm text-gray-500">
                Delivered to your doorstep (20 LE)
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center">
        <h6 className="text-gray-600 font-medium">Total</h6>
        <p className="font-bold text-green-700">
          {totalPrice + deliveryCost > 0
            ? `${totalPrice + deliveryCost} LE`
            : `0 LE`}
        </p>
      </div>

      {/* Checkout button */}
      <button className="w-full text-center bg-green-600 text-white py-3 rounded-lg mt-5 hover:bg-green-700 transition font-medium">
        Proceed to Checkout
      </button>
    </div>
  );
}

export default CartCheckout;
