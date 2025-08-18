import React, { useState } from "react";
import { 
  FaCheck, 
  FaTimes, 
  FaUser, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaStar,
  FaCreditCard,
  FaPaypal
} from "react-icons/fa";

const SubscriptionForm = ({ user, onSubmit, onCancel }) => {
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [duration, setDuration] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const plans = {
    basic: {
      name: "Basic",
      price: 9.99,
      features: [
        "1 medical consultation per month",
        "Standard customer support",
      ],
      color: "blue",
      icon: <FaUser className="text-blue-500" />
    },
    premium: {
      name: "Premium",
      price: 19.99,
      features: [
        "3 medical consultations per month",
        "Priority customer support",
        "Free delievry"
      ],
      color: "purple",
      icon: <FaStar className="text-purple-500" />
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const subscriptionData = {
        userId: user?.id || "guest",
        plan: selectedPlan === "basic" ? "Basic" : "Premium",
        status: "pending",
        paymentMethod,
        monthlyPrice: plans[selectedPlan].price,
        duration: parseInt(duration, 10),
        totalPrice: (plans[selectedPlan].price * parseInt(duration, 10)).toFixed(2),
        userDetails: {
          name: user?.name || "",
          email: user?.email || ""
        }
      };
      
      await onSubmit(subscriptionData);
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="healthy__container flex justify-center py-12">

 
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-3xl w-full ">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <FaMoneyBillWave className="text-green-500" /> Subscription Plans
        </h2>
        <p className="text-gray-600">Choose the plan that fits your health goals</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Basic Plan Card */}
{/* Basic Plan Card */}
<div 
  className={`border-2 rounded-xl p-5 cursor-pointer transition-all flex flex-col h-full ${
    selectedPlan === "basic" 
      ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50" 
      : "border-gray-200 hover:border-blue-300"
  }`}
  onClick={() => setSelectedPlan("basic")}
>
  {/* Card Header */}
  <div className="flex justify-between items-start mb-4">
    <div className="flex items-center gap-3">
      <div className="bg-blue-100 p-2 rounded-full">
        {plans.basic.icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Basic Plan</h3>
        <p className="text-sm text-gray-500">Essential health services</p>
      </div>
    </div>
    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
      Popular
    </div>
  </div>

  {/* Price */}
  <div className="mb-4">
    <span className="text-3xl font-bold text-gray-900">LE 24.99</span>
    <span className="text-gray-500">/month</span>
  </div>

  {/* Features (flex-grow allows this section to expand) */}
  <ul className="space-y-2 mb-4 flex-grow">
    {plans.basic.features.map((feature, index) => (
      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
        <FaCheck className="text-green-500 mt-0.5 flex-shrink-0" /> 
        <span>{feature}</span>
      </li>
    ))}
  </ul>

  {/* Button (pushed to bottom with mt-auto) */}
  <div className="mt-auto">
    <button 
      className={`w-full px-4 py-2 rounded-lg ${
        selectedPlan === "basic" 
          ? "bg-blue-600 text-white hover:bg-blue-700" 
          : "bg-white border border-blue-500 text-blue-600 hover:bg-blue-50"
      } transition flex items-center justify-center gap-2`}
      type="button"
    >
      {selectedPlan === "basic" ? "Selected" : "Select Plan"}
    </button>
  </div>
</div>

        {/* Premium Plan Card */}
        <div 
          className={`border-2 rounded-xl p-5 cursor-pointer transition-all ${
            selectedPlan === "premium" 
              ? "border-purple-500 ring-2 ring-purple-200 bg-purple-50" 
              : "border-gray-200 hover:border-purple-300"
          }`}
          onClick={() => setSelectedPlan("premium")}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-full">
                {plans.premium.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Premium Plan</h3>
                <p className="text-sm text-gray-500">Detailed health services</p>
              </div>
            </div>
            <div className="bg-purple-100 text-purple-800 px-3 py-1  rounded-full text-sm font-medium">
              Hottest
            </div>
          </div>
          <div className="mb-4">
            <span className="text-3xl font-bold text-gray-900">LE 49.99</span>
            <span className="text-gray-500">/month</span>
          </div>
          <ul className="space-y-2 mb-6">
            {plans.premium.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <FaCheck className="text-green-500 mt-0.5 flex-shrink-0" /> 
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <button 
            className={`w-full px-4 py-2 rounded-lg ${
              selectedPlan === "premium" 
                ? "bg-purple-600 text-white hover:bg-purple-700" 
                : "bg-white border border-purple-500 text-purple-600 hover:bg-purple-50"
            } transition flex items-center justify-center gap-2`}
            type="button"
          >
            {selectedPlan === "premium" ? "Selected" : "Select Plan"}
          </button>
        </div>
      </div>

      {/* Subscription Form */}
      <form onSubmit={handleSubmit}>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FaUser className="text-gray-500" /> User Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <div className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-100 text-gray-700">
                {user?.name || "Guest User"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-100 text-gray-700">
                {user?.email || "guest@example.com"}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FaCalendarAlt className="text-gray-500" /> Subscription Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Selected Plan</label>
              <div className={`w-full px-3 py-2 rounded-lg border border-gray-200 bg-${plans[selectedPlan].color}-50 text-${plans[selectedPlan].color}-800 font-medium capitalize`}>
                {plans[selectedPlan].name}
              </div>
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <select
                id="duration"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="1">1 month</option>
                <option value="3">3 months (5% discount)</option>
                <option value="6">6 months (10% discount)</option>
                <option value="12">12 months (15% discount)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FaMoneyBillWave className="text-gray-500" /> Payment Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "credit_card" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_card"
                    checked={paymentMethod === "credit_card"}
                    onChange={() => setPaymentMethod("credit_card")}
                    className="text-green-600 focus:ring-green-500"
                  />
                  <div className="flex items-center gap-2">
                    <FaCreditCard className="text-gray-700" />
                    <span>Credit Card</span>
                  </div>
                </label>
                <label className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "paypal" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={() => setPaymentMethod("paypal")}
                    className="text-green-600 focus:ring-green-500"
                  />
                  <div className="flex items-center gap-2">
                    <FaPaypal className="text-blue-500" />
                    <span>PayPal</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Plan:</span>
              <span className="font-medium">{plans[selectedPlan].name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="font-medium">{duration} month{duration !== "1" ? "s" : ""}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Price:</span>
              <span className="font-medium">LE{plans[selectedPlan].price.toFixed(2)}</span>
            </div>
            {duration !== "1" && (
              <div className="flex justify-between text-green-600">
                <span>Discount:</span>
                <span>
                  {duration === "3" ? "5%" : duration === "6" ? "10%" : "15%"}
                </span>
              </div>
            )}
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>
                LE{(
                  plans[selectedPlan].price * 
                  parseInt(duration, 10) * 
                  (duration === "3" ? 0.95 : duration === "6" ? 0.9 : duration === "12" ? 0.85 : 1)
                ).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition flex items-center gap-2"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Processing..."
            ) : (
              <>
                <FaStar /> Subscribe Now
              </>
            )}
          </button>
        </div>
      </form>
    </div>
       </div>
  );
};

export default SubscriptionForm;