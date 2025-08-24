import { toast } from "react-hot-toast";
import React, { useState, useEffect } from "react";
import {
  FaCheck,
  FaUser,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaStar,
  FaCreditCard,
} from "react-icons/fa";
import { getCurrentUser, updateUserMetadata } from "../../services/apiAuth";
import { useQueryClient } from "@tanstack/react-query";

const SubscriptionForm = () => {
  const [user, setUser] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState("");
  const [duration, setDuration] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const plans = {
    basic: {
      name: "Basic",
      price: 24.99,
      features: [
        "1 medical consultation per month",
        "Standard customer support",
      ],
      consultations: 1,
      color: "blue",
      icon: <FaUser className="text-blue-500" />,
    },
    premium: {
      name: "Premium",
      price: 49.99,
      features: [
        "3 medical consultations per month",
        "Priority customer support",
        "Free delivery",
      ],
      consultations: 3,
      color: "purple",
      icon: <FaStar className="text-purple-500" />,
    },
  };

  // Fetch current user & saved cards
  useEffect(() => {
    async function fetchUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      // Use the correct path to cards
      const savedCards = currentUser?.user_metadata?.paymentMethods || [];
      setCards(savedCards);

      if (savedCards.length > 0) setSelectedCard(savedCards[0].id);
    }
    fetchUser();
  }, []);

  // Handle subscription submission

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user) return toast.error("User not logged in");
  if (!selectedCard) return toast.error("Please select a payment card");

  setIsSubmitting(true);

  try {
    const subscriptionData = {
      subscription: {
        isSubscribed: true,
        subscriptionType: selectedPlan,
        consultations: plans[selectedPlan].consultations,
        cardUsed: selectedCard,
      },
    };

    await updateUserMetadata(subscriptionData);
    queryClient.invalidateQueries(["user"]);

    toast.success(`Subscribed successfully to ${plans[selectedPlan].name} plan!`);

    // Delay navigation so the toast can be seen
    setTimeout(() => {
      window.location.href = "/profile";
    }, 1000);

  } catch (error) {
    console.error("Subscription error:", error);
    toast.error("Error while subscribing. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  const isAlreadySubscribed =
    user && user.user_metadata?.subscription?.isSubscribed === true;

  return (
    <div className="healthy__container flex justify-center py-12">
      <div className="bg-white rounded-xl shadow-sm p-6 max-w-3xl w-full">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FaMoneyBillWave className="text-green-500" /> Subscription Plans
          </h2>
          <p className="text-gray-600">
            Choose the plan that fits your health goals
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Basic Plan */}
          <div
            className={`border-2 rounded-xl p-5 cursor-pointer transition-all flex flex-col h-full ${
              selectedPlan === "basic"
                ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50"
                : "border-gray-200 hover:border-blue-300"
            }`}
            onClick={() => setSelectedPlan("basic")}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  {plans.basic.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Basic Plan
                  </h3>
                  <p className="text-sm text-gray-500">
                    Essential health services
                  </p>
                </div>
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Popular
              </div>
            </div>
            <div className="mb-4">
              <span className="text-3xl font-bold text-gray-900">LE 24.99</span>
              <span className="text-gray-500">/month</span>
            </div>
            <ul className="space-y-2 mb-4 flex-grow">
              {plans.basic.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <FaCheck className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
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

          {/* Premium Plan */}
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
                  <h3 className="text-lg font-semibold text-gray-900">
                    Premium Plan
                  </h3>
                  <p className="text-sm text-gray-500">
                    Detailed health services
                  </p>
                </div>
              </div>
              <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                Hottest
              </div>
            </div>
            <div className="mb-4">
              <span className="text-3xl font-bold text-gray-900">LE 49.99</span>
              <span className="text-gray-500">/month</span>
            </div>
            <ul className="space-y-2 mb-6">
              {plans.premium.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
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
          {/* User Info */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FaUser className="text-gray-500" /> User Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <div className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-100 text-gray-700">
                  {user?.user_metadata?.firstName
                    ? `${user.user_metadata.firstName} ${user.user_metadata.lastName}`
                    : "Guest User"}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-100 text-gray-700">
                  {user?.email || "guest@example.com"}
                </div>
              </div>
            </div>
          </div>

          {/* Duration & Selected Plan */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FaCalendarAlt className="text-gray-500" /> Subscription Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Selected Plan
                </label>
                <div
                  className={`w-full px-3 py-2 rounded-lg border border-gray-200 bg-${plans[selectedPlan].color}-50 text-${plans[selectedPlan].color}-800 font-medium capitalize`}
                >
                  {plans[selectedPlan].name}
                </div>
              </div>
              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
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

          {/* Payment Info */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FaCreditCard className="text-gray-500" /> Payment Method
            </h3>
            {cards.length === 0 ? (
              <p className="text-gray-500">
                No saved cards. Please add one in your profile.
              </p>
            ) : (
              <select
                className="w-full px-3 py-2 rounded-lg border border-gray-200"
                value={selectedCard}
                onChange={(e) => setSelectedCard(e.target.value)}
              >
                {cards.map((card) => (
                  <option key={card.id} value={card.id}>
                    {card.type} {card.number}{" "}
                    {card.isDefault ? "(Default)" : ""}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Order Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Plan:</span>
                <span className="font-medium">{plans[selectedPlan].name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">
                  {duration} month{duration !== "1" ? "s" : ""}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Price:</span>
                <span className="font-medium">
                  LE{plans[selectedPlan].price.toFixed(2)}
                </span>
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
                  LE
                  {(
                    plans[selectedPlan].price *
                    parseInt(duration, 10) *
                    (duration === "3"
                      ? 0.95
                      : duration === "6"
                      ? 0.9
                      : duration === "12"
                      ? 0.85
                      : 1)
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition 
      ${
        isAlreadySubscribed || isSubmitting
          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
          : "bg-green-600 text-white hover:bg-green-700"
      }`}
              disabled={isAlreadySubscribed || isSubmitting}
            >
              {isAlreadySubscribed ? (
                "You're already subscribed"
              ) : isSubmitting ? (
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
