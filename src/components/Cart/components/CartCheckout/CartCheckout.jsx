import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaTruckFast, FaHouse } from "react-icons/fa6";

function CartCheckout() {
  const { totalPrice } = useSelector((state) => state.cart);
  const [shippingMethod, setShippingMethod] = useState("pickup");

  // delivery price logic
  const deliveryCost = shippingMethod === "delivery" ? 20 : 0;

  const handleShippingChange = (value) => {
    setShippingMethod(value);
  };

  return (
    <div className="2xl:w-1/4 border border-gray-300 bg-white rounded-xl shadow-md p-4 h-[463px]">
      <h4 className="text-black font-bold mb-6">Cart totals</h4>

      {/* Subtotal */}
      <div className="flex justify-between border-b border-gray-300 pb-3 mb-4">
        <h6 className="text-gray-500 font-semibold">Subtotal</h6>
        <p className="font-semibold">{totalPrice > 0 ? `${totalPrice} LE` : `0 LE`}</p>
      </div>

      {/* Shipping */}
      <div className="border-b border-gray-300 pb-4 mb-4">
        <h6 className="text-gray-500 font-semibold mb-3">Shipping</h6>
        <div className="space-y-3">
          {/* Store Pickup */}
          <label
            className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition ${
              shippingMethod === "pickup"
                ? "border-primary bg-blue-50 shadow-sm"
                : "border-gray-200 hover:border-[#16a34a58]"
            }`}
          >
            <input
              type="radio"
              name="shipping"
              value="pickup"
              checked={shippingMethod === "pickup"}
              onChange={(e) => handleShippingChange(e.target.value)}/>
            <FaHouse className="text-2xl text-primary" />
            <div>
              <p className="font-medium">Free Store Pickup</p>
              <p className="text-sm text-gray-500">
                Pick up from our store at no cost
              </p>
            </div>
          </label>

          {/* Home Delivery */}
          <label
            className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition ${
              shippingMethod === "delivery"
                ? "border-primary bg-blue-50 shadow-sm"
                : "border-gray-200 hover:border-[#16a34a58]"
            }`}
          >
            <input
              type="radio"
              name="shipping"
              value="delivery"
              checked={shippingMethod === "delivery"}
              onChange={(e) => handleShippingChange(e.target.value)}
            />
            <FaTruckFast className="text-2xl text-primary" />
            <div>
              <p className="font-medium">Home Delivery</p>
              <p className="text-sm text-gray-500">
                Delivered to your doorstep (20 LE)
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between">
        <h6 className="text-gray-500 font-semibold">Total</h6>
        <p className="font-semibold">{totalPrice + deliveryCost > 0 ? `${totalPrice + deliveryCost} LE` : `0 LE` }</p>
      </div>

      {/* Checkout button */}
      
      <button className="w-full text-center bg-button text-white py-3 rounded-lg mt-5 hover:bg-button-hover transition">
        Proceed to checkout
      </button>
    </div>
  );
}

export default CartCheckout;
