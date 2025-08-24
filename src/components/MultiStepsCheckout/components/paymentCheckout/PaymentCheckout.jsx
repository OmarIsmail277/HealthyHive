import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getUser } from "../../../../services/userService";

function PaymentCheckout({ onPaymentSubmit }) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            paymentMethod: "creditCard",
        },
    });

    const paymentMethod = watch("paymentMethod");

    const [savedCard, setSavedCard] = useState({ number: "", expiry: "", cvv: "" });

    // Fetch user payment data and prefill default card
    useEffect(() => {
        async function fetchPaymentData() {
            try {
                const user = await getUser();
                const defaultCard = user?.user_metadata?.paymentMethods?.find(pm => pm.isDefault);

                if (defaultCard) {
                    const maskedNumber = defaultCard.number.replace(/\d(?=\d{4})/g, "•");

                    const cardData = {
                        number: maskedNumber,
                        expiry: defaultCard.expiry || "",
                        cvv: defaultCard.cvc || "",
                    };

                    setSavedCard(cardData);

                    setValue("cardNumber", cardData.number);
                    setValue("expiry", cardData.expiry);
                    setValue("cvv", cardData.cvv);
                    setValue("paymentMethod", "creditCard");
                } else {
                    setValue("paymentMethod", "paypal");
                }
            } catch (error) {
                console.error("Failed to fetch payment methods:", error);
            }
        }

        fetchPaymentData();
    }, [setValue]);

    // Restore credit card data when switching back
    useEffect(() => {
        if (paymentMethod === "creditCard") {
            setValue("cardNumber", savedCard.number);
            setValue("expiry", savedCard.expiry);
            setValue("cvv", savedCard.cvv);
        } else {
            // Clear fields when switching to Cash on Delivery
            setValue("cardNumber", "");
            setValue("expiry", "");
            setValue("cvv", "");
        }
    }, [paymentMethod, savedCard, setValue]);

    const onSubmit = (data) => {
        console.log(data);
        if (onPaymentSubmit) onPaymentSubmit();
    };

    return (
        <div>
            <h2 className="text-center text-xl font-bold mb-6">Payment Method</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Credit Card Option */}
                <div className="border border-gray-200 rounded-lg p-4 mb-3">
                    <label className="flex items-center space-x-2 mb-3">
                        <input type="radio" value="creditCard" {...register("paymentMethod")} />
                        <span className="font-medium">Credit Card</span>
                    </label>

                    {paymentMethod === "creditCard" && (
                        <>
                            <div className="mb-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Card Number
                                </label>
                                <input
                                    type="text"
                                    placeholder="**** **** **** ****"
                                    {...register("cardNumber", {
                                        required: "Card number is required",
                                        validate: (value) => {
                                            const digitsOnly = value.replace(/\D/g, "");
                                            const isPrefilledMasked = value.includes("•");
                                            return digitsOnly.length === 16 || isPrefilledMasked || "Card number must be 16 digits";
                                        },
                                    })}
                                    className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 ${
                                        errors.cardNumber ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                                {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>}
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
                                            required: "Expiration date is required",
                                            pattern: {
                                                value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                                                message: "Format must be MM/YY",
                                            },
                                        })}
                                        className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 ${
                                            errors.expiry ? "border-red-500" : "border-gray-300"
                                        }`}
                                    />
                                    {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        CVV
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="***"
                                        {...register("cvv", {
                                            required: "CVV is required",
                                            pattern: {
                                                value: /^\d{3}$/,
                                                message: "CVV must be 3 digits",
                                            },
                                        })}
                                        className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 ${
                                            errors.cvv ? "border-red-500" : "border-gray-300"
                                        }`}
                                    />
                                    {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv.message}</p>}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Cash on Delivery Option */}
                <div className="border border-gray-200 rounded-lg p-4 mb-3">
                    <label className="flex items-center space-x-2">
                        <input type="radio" value="paypal" {...register("paymentMethod")} />
                        <span className="font-medium">Cash on Delivery</span>
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
    );
}

export default PaymentCheckout;
