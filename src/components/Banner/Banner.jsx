import React from "react";
import { FaTruck, FaGift, FaStar } from "react-icons/fa";

const FlashyBanner = () => {
  return (
    <div className="w-full overflow-hidden relative bg-gradient-to-r from-green-100 via-emerald-200 to-green-100 border-b border-green-300 shadow-md">
      <div className="flex justify-center">
        <BannerContent />
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        .animate-bounce {
          animation: bounce 1.5s infinite;
        }
        @keyframes wave {
          0% {
            transform: rotate(0deg) translateY(0px);
          }
          10% {
            transform: rotate(6deg) translateY(-1px);
          }
          20% {
            transform: rotate(-6deg) translateY(1px);
          }
          30% {
            transform: rotate(5deg) translateY(-1px);
          }
          40% {
            transform: rotate(-5deg) translateY(1px);
          }
          50% {
            transform: rotate(4deg) translateY(-1px);
          }
          60% {
            transform: rotate(-4deg) translateY(1px);
          }
          70% {
            transform: rotate(3deg) translateY(-1px);
          }
          80% {
            transform: rotate(-3deg) translateY(1px);
          }
          90% {
            transform: rotate(2deg) translateY(-1px);
          }
          100% {
            transform: rotate(0deg) translateY(0px);
          }
        }
        .animate-wave {
          display: inline-block;
          animation: wave 3s infinite ease-in-out;
          transform-origin: left center;
        }

        /* Glow effect */
        .flag-glow {
          filter: drop-shadow(0 0 6px rgba(34, 197, 94, 0.8))
            drop-shadow(0 0 12px rgba(34, 197, 94, 0.5));
          border-radius: 4px;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-float {
          display: inline-block;
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const BannerContent = () => (
  <div className="flex items-center space-x-8 px-8 py-3">
    {/* Free shipping */}
    <div className="flex items-center space-x-3">
      <FaTruck className="text-green-700 text-xl animate-bounce" />
      <span className="text-gray-900 font-semibold text-sm sm:text-base">
        FREE SHIPPING on your first 3 orders 🚚
      </span>
    </div>

    {/* Palestinian & Egyptian local products */}
    <div className="flex items-center space-x-3">
      <img
        src="/public/images/palestine-flag.png"
        alt="Palestine"
        className="w-12 h-10"
      />
      <span className="text-gray-900 font-bold text-sm sm:text-base tracking-wide">
        Free Palestine! <span className="animate-float">🕊️</span>
        <span className="animate-float">✊</span> 🍉 We only offer 100% Egyptian
        & local products
      </span>
      <img
        src="/public/images/egypt-flag.png"
        alt="Egypt"
        className="w-12 h-10"
      />
    </div>

    {/* Discount code */}
    <div className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-1 rounded-full shadow-md">
      <span className="text-xs sm:text-sm font-medium">Use code:</span>
      <span className="font-extrabold">WELCOME3</span>
      <FaGift className="text-white text-sm animate-bounce" />
      <FaStar className="text-yellow-300 text-xs animate-pulse" />
    </div>
  </div>
);

export default FlashyBanner;
