import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useCheckoutLogin } from "../../../../features/authentication/useCheckoutLogin";
import SpinnerMini from "../../../Spinner/SpinnerMini";

function LoginCheckout({ onNext }) {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { login, isPending } = useCheckoutLogin();

    const onSubmit = (data) => {
        console.log(data);
        const { email, password } = data;

        if (!email || !password) return;

        login(
            { email, password },
            {
                onSuccess: () => {
                    onNext(); // proceed to next step only after successful login
                },
                onSettled: () => {
                    // 👇 clears the form inputs after login attempt (success or error)
                    reset({ email: "", password: "" });
                },
            }
        );
    };

    return (
        <div>
            <h2 className="text-center text-xl font-bold mb-6">Log in to your account</h2>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        disabled={isPending}
                        placeholder="Enter your email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Invalid email format",
                            },
                        })}
                        className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 ${errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 ${errors.password ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-blue-500 text-white rounded-lg py-3 text-lg hover:bg-blue-600 transition">
                    {isPending ? (
                        <div className="flex items-center justify-center gap-2">
                            Logging in...
                            <SpinnerMini />
                        </div>
                    ) : (
                        "Log In"
                    )}
                </button>
            </form>

            <p className="text-center text-m text-gray-700 mt-6">
                Not a user?{" "}
                <Link
                    to="/register"
                    className="text-xl hover:!underline font-medium">
                    Register here
                </Link>
            </p>
        </div>
    )
}

export default LoginCheckout