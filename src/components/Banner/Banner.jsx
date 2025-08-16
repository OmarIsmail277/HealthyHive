import React from "react";
import { FaTruck, FaGift, FaStar } from "react-icons/fa";

const FlashyBanner = () => {
  return (
    <div className="w-full overflow-hidden relative bg-gradient-to-r from-white via-amber-50 to-white border-b border-amber-200 shadow-sm">
      {/* Animated sparkle background */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-amber-300 rounded-full animate-sparkle"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0
            }}
          />
        ))}
      </div>

      {/* Gold shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/30 to-transparent animate-shine" />

      {/* Marquee text */}
      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          <BannerContent />
          <BannerContent />
          <BannerContent />
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(100%) skewX(-15deg);
          }
        }
        .animate-shine {
          animation: shine 5s ease-in-out infinite;
        }

        @keyframes sparkle {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
      `}</style>
    </div>
  );
};

const BannerContent = () => (
  <div className="flex items-center space-x-8 px-8 py-3">
    <div className="flex items-center space-x-4">
      <FaTruck className="text-amber-600 text-xl animate-bounce" />
      <span className="text-gray-800 font-bold text-sm sm:text-base tracking-wide uppercase">
        FREE DELIVERY for your first 3 orders!
      </span>
      <FaGift className="text-amber-600 text-xl animate-bounce" />
    </div>
    
    <div className="flex items-center space-x-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-4 py-1 rounded-full shadow-md">
      <span className="text-xs sm:text-sm font-medium">
        Use code: 
      </span>
      <span className="font-extrabold">
        WELCOME3
      </span>
      <FaStar className="text-white text-xs animate-pulse" />
    </div>
  </div>
);

export default FlashyBanner;