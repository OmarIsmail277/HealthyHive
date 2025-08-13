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
import { Link } from "react-router-dom";

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const onSubmit = (data) => {
    console.log(data);
  };

  const icons = [
    FaLeaf, FaSeedling, FaSpa, FaAppleAlt, FaLemon, FaCarrot, FaPepperHot,
    FaBreadSlice, FaPizzaSlice, FaHamburger, FaHotdog, FaDrumstickBite,
    FaFish, FaEgg, FaCheese, FaCookie, FaCookieBite, FaIceCream,
    FaMortarPestle, FaUtensilSpoon, FaCoffee, FaMugHot, FaBeer,
    FaCocktail, FaWineGlassAlt, FaGlassWhiskey, FaBlender, FaSoap,
    FaShower, FaBath
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center p-3 overflow-hidden bg-green-50">
      {/* Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#d1fae5_0%,_transparent_70%)] opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_#bbf7d0_0%,_transparent_70%)] opacity-50" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] bg-[length:22px_22px]" />

        {[...Array(80)].map((_, i) => {
          const Icon = icons[i % icons.length];
          const top = `${Math.random() * 100}%`;
          const left = `${Math.random() * 100}%`;
          const size = `${14 + Math.random() * 52}px`;
          const opacity = 0.12 + Math.random() * 0.35;
          const floatDuration = `${18 + Math.random() * 26}s`;
          const spinDuration = `${24 + Math.random() * 36}s`;
          const floatDelay = `${Math.random() * 12}s`;
          const spinDelay = `${Math.random() * 12}s`;

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

      {/* Glassy Form */}
      <div className="relative z-10 w-full max-w-3xl bg-white/15 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-white/30">
        {/* Logo */}
        <div className="flex justify-center items-center mb-4">
          <FaLeaf className="text-3xl text-green-600 mr-2 drop-shadow-md" />
          <h1 className="text-2xl font-bold text-green-700 tracking-wide">
            HealthyHive
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm"
        >
          <div>
            <label className="block font-medium text-gray-800">Username</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              className={`mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-green-500 bg-white/30 backdrop-blur-sm ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            <p className="text-red-600 text-xs min-h-[1rem]">
              {errors.username?.message}
            </p>
          </div>

          <div>
            <label className="block font-medium text-gray-800">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className={`mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-green-500 bg-white/30 backdrop-blur-sm ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            <p className="text-red-600 text-xs min-h-[1rem]">
              {errors.email?.message}
            </p>
          </div>

          <div>
            <label className="block font-medium text-gray-800">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-green-500 bg-white/30 backdrop-blur-sm ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <p className="text-red-600 text-xs min-h-[1rem]">
              {errors.password?.message}
            </p>
          </div>

          <div>
            <label className="block font-medium text-gray-800">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className={`mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-green-500 bg-white/30 backdrop-blur-sm ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            <p className="text-red-600 text-xs min-h-[1rem]">
              {errors.confirmPassword?.message}
            </p>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg shadow-lg hover:bg-green-700 transform hover:scale-[1.02] transition"
            >
              Register
            </button>
          </div>

          <div className="md:col-span-2 flex items-center my-3">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-2 text-gray-500 text-xs">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <div className="md:col-span-2">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition text-sm"
            >
              <FaGoogle size={18} />
              Sign Up with Google
            </button>
          </div>

          <div className="md:col-span-2">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition text-sm"
            >
              <FaFacebook size={18} />
              Sign Up with Facebook
            </button>
          </div>

          <div className="md:col-span-2 text-center text-sm text-gray-700 mt-3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-700 font-medium hover:!underline transition"
            >
              Login here
            </Link>
          </div>
        </form>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes floatY {
            0%   { transform: translateY(0); }
            50%  { transform: translateY(-18px); }
            100% { transform: translateY(0); }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          .icon-float {
            animation: floatY var(--float-duration, 24s) ease-in-out infinite;
            animation-delay: var(--float-delay, 0s);
          }
          .icon-spin {
            display: inline-block;
            animation: spin var(--spin-duration, 40s) linear infinite;
            animation-delay: var(--spin-delay, 0s);
            transform-origin: center;
          }
        `}
      </style>
    </div>
  );
}
