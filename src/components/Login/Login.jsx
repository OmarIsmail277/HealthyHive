import { useForm } from "react-hook-form";
import { FaGoogle, FaFacebook, FaLeaf } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.leafBackground}>
      <div className="w-full max-w-md sm:max-w-lg md:max-w-md lg:max-w-lg bg-[rgba(255, 255, 255, 0.7)] backdrop-blur-md rounded-lg shadow-lg p-6 sm:p-8 md:p-10">
        <div className="flex justify-center items-center mb-4">
          <FaLeaf className="text-4xl text-primary mr-2 " />
          <h1 className="text-3xl text-button ">HealthyHive</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 mt-2 text-sm min-h-[1.25rem]">
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
            <p className="text-red-500 mt-2 text-sm min-h-[1.25rem]">
              {errors.password?.message}
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-lg py-3 text-lg hover:bg-blue-600 transition"
          >
            Login
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
          >
            <FaGoogle size={20} />
            Login with Google
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition"
          >
            <FaFacebook size={20} />
            Login with Facebook
          </button>

          <p className="text-center text-m text-gray-700 mt-6">
            Not a user?{" "}
            <Link
              to="/register"
              className="text-xl hover:!underline
 font-medium"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
