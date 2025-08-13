import { useForm } from "react-hook-form";

function BillingCheckout({onNext}) {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div>
            <h2 className="text-center text-xl font-bold mb-6">Billing Information</h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        {...register("name", {
                            required: "Name is required",
                            pattern: {
                                value: /^[A-Za-z\s]+$/,
                                message: "Name can only contain letters and spaces",
                            },
                        })}
                        className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 ${errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                    </label>
                    <input
                        type="number"
                        placeholder= "Number..." 
                        {...register("number", {
                            required: "Number is required",
                            pattern: {
                                value: /^\d{11}$/,
                                message: "Phone number must be exactly 11 digits with numbers only",
                            },
                        })}
                        className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 ${errors.password ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.number && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                    </label>
                    <input
                        type="text"
                        placeholder= "Address..." 
                        {...register("address", {
                            required: "Address is required",
                            pattern: {
                                value: /^[a-zA-Z0-9\s,.-]+$/,
                                message: "Address can only contain letters, numbers, spaces, commas, periods, and hyphens",
                            },
                        })}
                        className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 ${errors.password ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.address && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    onClick={onNext}
                    className="w-full mt-2 bg-button text-white rounded-lg py-3 text-lg hover:bg-button-hover transition">
                    Next <span className="ml-2">&rarr;</span>
                </button>
            </form>
        </div>
    )
}

export default BillingCheckout