import React from 'react'
import { useForm } from "react-hook-form";

function PaymentCheckout() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch 
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    const paymentMethod = watch("paymentMethod", "creditCard");

    return (
        <div>
            <h2 className='text-center text-xl font-bold mb-6'>Payment Method</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="">

                <div className="border border-gray-200 rounded-lg p-4 mb-3">
                    <label className="flex items-center space-x-2 mb-3">
                        <input type="radio" name="paymentMethod" value="creditCard" {...register("paymentMethod")} defaultChecked />
                        <span className="font-medium">Credit Card</span>
                    </label>

                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number
                        </label>
                        <input
                            type="text"
                            placeholder="**** **** **** ****"
                            {...register("cardNumber", {
                                required: paymentMethod === "creditCard" ? "Card number is required" : false,
                                pattern: paymentMethod === "creditCard" ? {
                                    value: /^\d{16}$/,
                                    message: "Card number must be 16 digits",
                                }: undefined,
                            })}
                            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 ${errors.cardNumber ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.cardNumber && (
                            <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Expiration Date
                            </label>
                            <input
                                type="text"
                                placeholder="MM / YY"
                                {...register("expiry", {
                                    required: paymentMethod === "creditCard" ? "Expiration date is required" : false,
                                    pattern: paymentMethod === "creditCard" ? {
                                        value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                                        message: "Format must be MM/YY",
                                    } : undefined,
                                })}
                                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 ${errors.expiry ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.expiry && (
                                <p className="text-red-500 text-sm">{errors.expiry.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                CVV
                            </label>
                            <input
                                type="password"
                                placeholder="***"
                                {...register("cvv", {
                                    required: paymentMethod === "creditCard" ?"CVV is required" : false,
                                    pattern: paymentMethod === "creditCard" ?{
                                        value: /^\d{3}$/,
                                        message: "CVV must be 3 digits",
                                    } : undefined,
                                })}
                                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 ${errors.cvv ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.cvv && (
                                <p className="text-red-500 text-sm">{errors.cvv.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 mb-3">
                    <label className="flex items-center space-x-2">
                        <input type="radio" name="paymentMethod" value="paypal" {...register("paymentMethod")} />
                        <span className="font-medium">PayPal</span>
                    </label>
                </div>


                <div className="border border-gray-300 rounded-lg p-4">
                    <label className="flex items-center space-x-2">
                        <input type="radio" name="paymentMethod" value="googlePay" {...register("paymentMethod")}/>
                        <span className="font-medium">Google Pay</span>
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full mt-4 bg-button text-white rounded-lg py-3 text-lg hover:bg-button-hover transition"
                >
                    Submit Payment
                </button>
            </form>
        </div>
    )
}

export default PaymentCheckout