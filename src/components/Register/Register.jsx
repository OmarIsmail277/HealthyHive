import { useForm } from "react-hook-form";
import {
  FaGoogle,
  FaFacebook,
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
  FaCocktail,
  FaMugHot,
  FaBlender,
  FaMortarPestle,
  FaSoap,
  FaShower,
  FaBath,
  FaSpa,
  FaUtensilSpoon,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSignup } from "../../features/authentication/useSignup";

export default function Register() {
  const { signup, isPending } = useSignup();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const onSubmit = ({ username, email, password }) => {
    signup(
      { username, email, password },
      {
        onSettled: reset,
      }
    );
  };

  const icons = [
    FaLeaf,
    FaSeedling,
    FaSpa,
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
    FaMortarPestle,
    FaUtensilSpoon,
    FaCoffee,
    FaMugHot,
    FaCocktail,
    FaBlender,
    FaSoap,
    FaShower,
    FaBath,
  ];

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-white-50 to-emerald-100 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#d1fae5_0%,_transparent_70%)] opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_#bbf7d0_0%,_transparent_70%)] opacity-50" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] bg-[length:20px_20px]" />

        {[...Array(60)].map((_, i) => {
          const Icon = icons[i % icons.length];
          const top = `${Math.random() * 100}%`;
          const left = `${Math.random() * 100}%`;
          const size = `${12 + Math.random() * 40}px`;
          const opacity = 0.1 + Math.random() * 0.3;
          const floatDuration = `${16 + Math.random() * 22}s`;
          const spinDuration = `${10 + Math.random() * 30}s`;
          const floatDelay = `${Math.random() * 10}s`;
          const spinDelay = `${Math.random() * 10}s`;

          return (
            <span
              key={i}
              className="absolute icon-float"
              style={{
                top,
                left,
                "--float-duration": floatDuration,
                "--float-delay": floatDelay,
              }}
            >
              <Icon
                className="icon-spin text-green-700"
                style={{
                  fontSize: size,
                  opacity,
                  "--spin-duration": spinDuration,
                  "--spin-delay": spinDelay,
                }}
              />
            </span>
          );
        })}
      </div>

      <div className="relative z-10 flex flex-col md:flex-row min-h-screen w-full">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <h1 className="text-5xl md:text-6xl font-bold text-green-700 mb-4 drop-shadow-lg">
              <span className="relative inline-block">
                <span className="relative z-10">HealthyHive</span>
                <span className="absolute -bottom-1 left-0 w-full h-2 bg-yellow-300 opacity-70 rounded-full transform rotate-1"></span>
              </span>
            </h1>
            <p className="hidden md:block text-lg text-green-800 opacity-90 mb-8">
              Join our community of health enthusiasts and discover a world of
              wellness
            </p>
            <div className=" flex justify-center">
              <div className="grid grid-cols-3 gap-3 max-w-xs">
                {[
                  FaLeaf,
                  FaAppleAlt,
                  FaCarrot,
                  FaSeedling,
                  FaSpa,
                  FaMortarPestle,
                ].map((Icon, i) => (
                  <div
                    key={i}
                    className="bg-white/50 p-3 rounded-lg shadow-sm backdrop-blur-sm"
                  >
                    <Icon className="text-green-600 text-xl mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Half - Sign Up Form */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white/50 backdrop-blur-lg shadow-xl rounded-xl p-8 border border-white/30">
            <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
              Create Your Account
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-y-4 text-sm"
            >
              <div>
                <label className="block font-medium text-gray-800 text-xs mb-1">
                  Username
                </label>
                <input
                  type="text"
                  disabled={isPending}
                  {...register("username", {
                    required: "Username is required",
                  })}
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/70 ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <p className="text-red-600 text-xs min-h-[1rem] mt-1">
                  {errors.username?.message}
                </p>
              </div>

              <div>
                <label className="block font-medium text-gray-800 text-xs mb-1">
                  Email
                </label>
                <input
                  type="email"
                  disabled={isPending}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/70 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <p className="text-red-600 text-xs min-h-[1rem] mt-1">
                  {errors.email?.message}
                </p>
              </div>

              <div>
                <label className="block font-medium text-gray-800 text-xs mb-1">
                  Password
                </label>
                <input
                  type="password"
                  disabled={isPending}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/70 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <p className="text-red-600 text-xs min-h-[1rem] mt-1">
                  {errors.password?.message}
                </p>
              </div>

              <div>
                <label className="block font-medium text-gray-800 text-xs mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  disabled={isPending}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/70 ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <p className="text-red-600 text-xs min-h-[1rem] mt-1">
                  {errors.confirmPassword?.message}
                </p>
              </div>

              <div className="mt-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-green-600 text-white py-2.5 rounded-lg shadow-md hover:bg-green-700 transform hover:scale-[1.01] transition-all duration-200 font-medium"
                >
                  Get Started
                </button>
              </div>

              <div className="flex items-center my-3">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="px-3 text-gray-500 text-xs">
                  or continue with
                </span>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition text-xs font-medium"
                  >
                    <FaGoogle className="text-red-500" size={14} />
                    Google
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition text-xs font-medium"
                  >
                    <FaFacebook className="text-blue-600" size={14} />
                    Facebook
                  </button>
                </div>
              </div>

              <div className="text-center text-xs text-gray-700 mt-4">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-green-700 font-medium hover:!underline transition"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes floatY {
            0%   { transform: translateY(0); }
            50%  { transform: translateY(-14px); }
            100% { transform: translateY(0); }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          .icon-float {
            animation: floatY var(--float-duration, 20s) ease-in-out infinite;
            animation-delay: var(--float-delay, 0s);
          }
          .icon-spin {
            display: inline-block;
            animation: spin var(--spin-duration, 34s) linear infinite;
            animation-delay: var(--spin-delay, 0s);
            transform-origin: center;
          }
        `}
      </style>
    </div>
  );
}
