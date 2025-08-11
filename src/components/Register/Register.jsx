import { useForm } from "react-hook-form";
import { FaGoogle, FaFacebook, FaLeaf } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";

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

  return (
    <div className={styles.leafBackground}>
      <div className="w-full max-w-3xl mx-auto bg-[rgba(235, 233, 233, 0.7)] backdrop-blur-md rounded-lg shadow-lg p-8">
        <div className="flex justify-center items-center mb-4">
          <FaLeaf className="text-4xl text-primary mr-2 " />
          <h1 className="text-3xl text-button ">HealthyHive</h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
        >
          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 mt-1 text-sm min-h-[1.25rem]">
              {errors.username?.message}
            </p>
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 mt-1 text-sm min-h-[1.25rem]">
              {errors.email?.message}
            </p>
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 mt-1 text-sm min-h-[1.25rem]">
              {errors.password?.message}
            </p>
          </div>

          <div>
            <label className="block mb-1 font-medium">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 mt-1 text-sm min-h-[1.25rem]">
              {errors.confirmPassword?.message}
            </p>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-lg py-3 text-lg hover:bg-blue-600 transition"
            >
              Register
            </button>
          </div>

          <div className="md:col-span-2 flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <div className="md:col-span-2">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
            >
              <FaGoogle size={20} />
              Sign Up with Google
            </button>
          </div>

          <div className="md:col-span-2">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition"
            >
              <FaFacebook size={20} />
              Sign Up with Facebook
            </button>
          </div>

          <div className="md:col-span-2 text-center text-base text-gray-700 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-xl hover:!underline font-medium">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
