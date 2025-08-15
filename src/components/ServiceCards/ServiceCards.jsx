import { FaHeartbeat, FaAppleAlt, FaLeaf, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ServiceAds() {
  return (
    <div className="healthy__container px-4 py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary font-semibold px-4 py-1 rounded-full text-sm mb-3 animate-pulse">
            Premium Wellness Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Transform Your <span className="text-primary">Health Journey</span>
          </h2>
          <div className="flex justify-center mt-4">
            <div className="w-16 h-1 bg-primary rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Medical Consultations Card */}
          <div className="group relative flex bg-gradient-to-br from-emerald-600 to-emerald-500 text-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-green-300/30 transition-all duration-500 hover:-translate-y-2">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse-slow"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/5 rounded-full animate-pulse-slower"></div>
            </div>

            <div className="flex flex-col justify-center p-8 flex-1 z-10">
              <div className="flex items-center gap-2 mb-3">
                <FaLeaf className="text-white/80 animate-bounce-slow" />
                <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
                  New Service
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Expert Medical Consultations
              </h2>
              <p className="mt-3 text-white/90 leading-relaxed">
                Connect with board-certified doctors 24/7. Get personalized
                treatment plans, health monitoring, and continuous care.
              </p>
              <Link to="/services/consultations">
                <button className="mt-6 flex items-center gap-2 group-hover:gap-3 w-fit bg-white text-green-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-white/95 transition-all duration-300 hover:shadow-xl">
                  Discover More
                  <FaArrowRight className="transition-all duration-300 group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
            <div className="hidden md:flex items-center justify-center bg-white/20 p-6 w-1/3 backdrop-blur-sm border-l border-white/10">
              <FaHeartbeat className="text-white text-7xl opacity-90 group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>

          {/* Nutrition Tracker Card */}
          <div className="group relative flex bg-gradient-to-br from-emerald-600 to-emerald-500 text-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-emerald-300/30 transition-all duration-500 hover:-translate-y-2">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-white/10 rounded-full animate-pulse-slow"></div>
              <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-white/5 rounded-full animate-pulse-slower"></div>
            </div>

            <div className="flex flex-col justify-center p-8 flex-1 z-10">
              <div className="flex items-center gap-2 mb-3">
                <FaLeaf className="text-white/80 animate-bounce-slow delay-100" />
                <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
                  New Feature
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Calorie Calculator
              </h2>
              <p className="mt-3 text-white/90 leading-relaxed">
                Calculate your daily calorie needs and find out instantly if
                your BMI falls within the healthy range — helping you stay on
                track with your fitness and nutrition goals.
              </p>
              <Link to="/services/calorie-calculator">
                <button className="mt-6 flex items-center gap-2 group-hover:gap-3 w-fit bg-white text-emerald-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-white/95 transition-all duration-300 hover:shadow-xl">
                  Explore Now
                  <FaArrowRight className="transition-all duration-300 group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
            <div className="hidden md:flex items-center justify-center bg-white/20 p-6 w-1/3 backdrop-blur-sm border-l border-white/10">
              <FaAppleAlt className="text-white text-7xl opacity-90 group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>
        </div>

        {/* Decorative Footer */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-4 text-gray-400">
            <div className="w-8 h-1 bg-primary rounded-full"></div>
            <FaLeaf className="text-primary animate-spin-slow" />
            <div className="w-8 h-1 bg-primary rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.2;
            transform: scale(1.05);
          }
        }
        @keyframes pulse-slower {
          0%,
          100% {
            opacity: 0.05;
            transform: scale(1);
          }
          50% {
            opacity: 0.1;
            transform: scale(1.03);
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 8s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </div>
  );
}
