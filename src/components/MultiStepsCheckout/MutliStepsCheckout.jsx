import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../store/cartSlice";
import BillingCheckout from "./components/billingCheckout/BillingCheckout";
import LoginCheckout from "./components/loginCheckout/LoginCheckout";
import NavCheckout from "./components/navCheckout/NavCheckout";
import OrderCheckout from "./components/orderCheckout/OrderCheckout";
import PaymentCheckout from "./components/paymentCheckout/PaymentCheckout";
import { useUser } from "../../hooks/useUser";
import Spinner from "../Spinner/Spinner";
import toast from "react-hot-toast";

function MutliStepsCheckout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items } = useSelector((state) => state.cart);

  const { user, isPending } = useUser();
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(user?.role ? [1] : []);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  // Skip login if user is logged in
  useEffect(() => {
    if (!isPending) {
      if (user?.role) {
        setStep(2); // skip login
        setCompletedSteps([1]); // login considered done
      } else {
        setStep(1);
        setCompletedSteps([]);
      }
    }
  }, [user, isPending]);

  const handleNext = () => {
    // If next step is Order or Payment and cart is empty, prevent
    if ((step === 3 || step === 4) && items.length === 0) {
      toast.error("Your cart is empty. Please add items before proceeding.");
      return;
    }

    setCompletedSteps((prev) => {
      const newSteps = [...prev];
      if (!newSteps.includes(step)) newSteps.push(step);
      return newSteps;
    });
    setStep((prev) => Math.min(prev + 1, 4));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStepChange = (newStep) => {
    // Prevent going back to login if user is logged in
    if (user?.role && newStep < 2) return;

    // Prevent jumping ahead beyond next allowed step
    const maxAllowedStep = Math.max(...completedSteps) + 1;
    if (newStep > maxAllowedStep) return;

    setStep(newStep);
  };

  const handleClosePopup = () => {
    setShowPaymentPopup(false);
    dispatch(clearCart());
    navigate("/");
  };

  // handle loading of login
  if (isPending || user === undefined) return <Spinner />;

  return (
    <div className="w-[80%] mx-auto my-0 py-12">
      <div className="lg:w-[50%] sm:w-[65%] md:w-[55%] w-[95%] bg-[#f8faf4] mx-auto my-0 shadow-lg rounded-xl py-4 px-8">
        <NavCheckout currentStep={step} onStepChange={handleStepChange} />

        {step === 1 && <LoginCheckout onNext={handleNext} />}
        {step === 2 && <BillingCheckout onNext={handleNext} />}
        {step === 3 && <OrderCheckout onNext={handleNext} />}
        {step === 4 && (
          <PaymentCheckout onPaymentSubmit={() => setShowPaymentPopup(true)} />
        )}
      </div>
      {showPaymentPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl p-8 w-[400px] text-center relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={handleClosePopup}
            >
              ✕
            </button>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4">
                ✓
              </div>
              <h2 className="text-xl font-bold mb-2">Payment Successful!</h2>
              <p className="text-gray-700 mb-4">
                Your order has been placed successfully.
              </p>
              <button
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                onClick={handleClosePopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MutliStepsCheckout;
