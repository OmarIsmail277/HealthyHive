import React, { useState, useEffect } from "react";
import { FaTruck, FaGift } from "react-icons/fa";

const FlashyBanner = () => {
  const [index, setIndex] = useState(0);
  const slides = [
    {
      id: 1,
      content: (
        <div className="flex items-center space-x-3 h-full">
          <img
            src="/images/palestine-flag.png"
            alt="Palestine"
            className="w-10 h-8 sm:w-12 sm:h-10 animate-wave flag-glow"
          />
          <span className="text-gray-900 font-bold text-sm sm:text-base tracking-wide leading-tight">
            Free Palestine! <span className="animate-float">🕊</span>
            <span className="animate-float">✊</span> 🍉
          </span>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="flex items-center gap-3 h-full">
          <span className="text-gray-900 font-semibold text-sm sm:text-base flex items-center gap-3 leading-tight">
            <img
              src="/images/egypt-flag.png"
              className="w-10 h-8 sm:w-12 sm:h-10 animate-wave flag-glow"
            />
            <span>We only offer 100% Egyptian & local products</span>
          </span>
        </div>
      ),
    },
    {
      id: 3,
      content: (
        <div className="flex items-center justify-center flex-wrap gap-x-1.5 gap-y-0 px-1 h-full">
          <FaTruck className="text-emerald-600 text-sm sm:text-base animate-bounce" />
          <span className="text-xs sm:text-sm font-medium text-gray-800 whitespace-nowrap leading-tight">
            FREE SHIPPING
          </span>
          <span className="text-xs sm:text-sm font-medium text-gray-800 whitespace-nowrap leading-tight">
            on FIRST 3 orders!
          </span>
          <span className="text-xs sm:text-sm font-medium text-gray-800 whitespace-nowrap leading-tight">
            Use code:
          </span>
          <div className="flex gap-x-1.5">
            <span className="relative font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600 text-shadow px-1 animate-pulse-flashy text-sm sm:text-base leading-tight">
              WELCOME3
              <span className="absolute inset-0 bg-white opacity-30 animate-sweep rounded-md"></span>
            </span>
            <FaGift className="text-emerald-600 text-sm sm:text-base animate-bounce" />
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="w-full overflow-hidden relative bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50 border-b border-amber-200 shadow-md py-1.5 flex justify-center items-center h-12">
      <div className="transition-all duration-700 ease-in-out h-full flex items-center">
        {slides[index].content}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes bounce {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce {
          animation: bounce 1.5s infinite;
        }
        @keyframes wave {
          0% { transform: rotate(0deg) translateY(0px); }
          10% { transform: rotate(6deg) translateY(-1px); }
          20% { transform: rotate(-6deg) translateY(1px); }
          30% { transform: rotate(5deg) translateY(-1px); }
          40% { transform: rotate(-5deg) translateY(1px); }
          50% { transform: rotate(4deg) translateY(-1px); }
          60% { transform: rotate(-4deg) translateY(1px); }
          70% { transform: rotate(3deg) translateY(-1px); }
          80% { transform: rotate(-3deg) translateY(1px); }
          90% { transform: rotate(2deg) translateY(-1px); }
          100% { transform: rotate(0deg) translateY(0px); }
        }
        .animate-wave {
          display: inline-block;
          animation: wave 3s infinite ease-in-out;
          transform-origin: left center;
        }
        .flag-glow {
          filter: drop-shadow(0 0 6px rgba(34, 197, 94, 0.8))
                  drop-shadow(0 0 12px rgba(34, 197, 94, 0.5));
          border-radius: 4px;
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-float {
          display: inline-block;
          animation: float 2s ease-in-out infinite;
        }
        .text-shadow {
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        @keyframes pulse-flashy {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.9; }
        }
        .animate-pulse-flashy {
          animation: pulse-flashy 1.2s infinite;
        }
        @keyframes sweep {
          0% { transform: translateX(-120%) skewX(-15deg); }
          100% { transform: translateX(120%) skewX(-15deg); }
        }
        .animate-sweep {
          animation: sweep 2s linear infinite;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          background-size: 200% 100%;
          mix-blend-mode: screen;
          transform: skewX(-15deg);
        }
      `}</style>
    </div>
  );
};

export default FlashyBanner;
