import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaLeaf,
  FaSeedling,
  FaAppleAlt,
  FaLemon,
  FaCarrot,
  FaPepperHot,
  FaBreadSlice,
  FaPizzaSlice,
  FaHamburger,
  FaHotdog,
  FaDrumstickBite,
  FaFish,
  FaEgg,
  FaCheese,
  FaCookie,
  FaCookieBite,
  FaIceCream,
  FaCoffee,
  FaBeer,
  FaCocktail,
  FaWineGlassAlt,
  FaGlassWhiskey,
  FaMugHot,
  FaBlender,
  FaMortarPestle,
  FaSoap,
  FaShower,
  FaBath,
  FaSpa,
  FaUtensilSpoon
} from "react-icons/fa";

function ServicesHome() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      id: 1,
      title: "Calorie Calculator",
      description:
        "Discover your ideal daily calorie needs and macronutrient breakdown. Track, adjust, and stay on top of your health effortlessly!",
      icon: "🔥",
      color: "#10B981",
      path: "/services/calorie-calculator"
    },
    {
      id: 2,
      title: "Medical Consultation",
      description:
        "Book a personalized consultation with certified medical experts to get tailored guidance for your health and wellness.",
      icon: "🩺",
      color: "#10B981",
      path: "/services/consultations"
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden py-12 px-4 flex flex-col items-center">

      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-green-800 text-center mb-6 drop-shadow-lg relative inline-block">
        <span className="relative z-10 animate-fadeInUp">Choose Your Service</span>
        <span className="absolute -bottom-1 left-0 w-full h-2 bg-yellow-300 opacity-80 rounded-full transform rotate-1"></span>
      </h1>

      {/* Subtitle */}
      <p className="text-center text-gray-700 text-lg max-w-2xl mb-12 animate-fadeInUp delay-200">
        Explore our interactive tools and expert consultations to achieve your health goals. 
        Click any service below to start your journey toward a healthier, happier you!
      </p>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 w-full max-w-4xl justify-center justify-items-center">
        {services.map((service) => (
          <div
            key={service.id}
            className={`relative bg-white/20 backdrop-blur-lg rounded-2xl p-8 flex flex-col items-center text-center shadow-xl border border-white/20 cursor-pointer transition-transform duration-300 hover:scale-[1.05] hover:shadow-2xl hover:-translate-y-2`}
            onMouseEnter={() => setHoveredCard(service.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate(service.path)}
          >
            {/* Hover Glow */}
            {hoveredCard === service.id && (
              <span className="absolute inset-0 rounded-2xl bg-green-200/20 blur-xl animate-pulse z-0"></span>
            )}

            {/* Icon */}
            <div
              className={`relative w-20 h-20 rounded-full flex items-center justify-center mb-6 text-3xl text-white shadow-lg transform transition-transform duration-300 ${
                hoveredCard === service.id ? "animate-pulse" : ""
              }`}
              style={{ backgroundColor: service.color, zIndex: 10 }}
            >
              {service.icon}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-semibold text-green-900 mb-3 tracking-tight transition-colors duration-300">
              {service.title}
            </h3>

            {/* Description */}
            <p className={`text-gray-700 mb-6 text-sm transition-all duration-300 ${
              hoveredCard === service.id ? "text-gray-900 font-medium" : ""
            }`}>
              {service.description}
            </p>

            {/* Button */}
            <button
              className="mt-auto w-full py-2 rounded-lg font-semibold text-white shadow-md hover:scale-[1.05] transition-transform duration-300 hover:shadow-lg"
              style={{ backgroundColor: service.color }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(service.path);
              }}
            >
              {hoveredCard === service.id ? "Let's Go!" : "Get Started"}
            </button>
          </div>
        ))}
      </div>

      {/* Extra Catchy Footer */}
      <p className="mt-12 text-center text-gray-600 max-w-3xl text-sm animate-fadeInUp delay-400">
        Each service is crafted to provide actionable insights and personalized guidance. 
        Step into a healthier lifestyle today and take control of your wellness journey!
      </p>

      <style>
        {`
          .backdrop-blur-lg {
            animation: fadeInUp 0.8s ease forwards;
          }

          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease forwards;
          }

          .delay-200 {
            animation-delay: 0.2s;
          }

          .delay-400 {
            animation-delay: 0.4s;
          }
        `}
      </style>
    </div>
  );
}

export default ServicesHome;
