import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import supabase from "../../services/supabase";
import { useNavigate } from "react-router-dom";

export default function ServiceForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    serviceType: "",
    description: "",
    preferredContact: "",
  });

  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const contactOptions = [
    { icon: FaWhatsapp, label: "WhatsApp" },
    { icon: FaEnvelope, label: "Email" },
    { icon: FaPhone, label: "Phone Call" },
  ];

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (!user) {
        navigate("/login");
        return;
      }

      // Pre-fill user data
      setFormData((prev) => ({
        ...prev,
        email: user.email || "",
        fullName: `${user.user_metadata?.firstName || ""} ${
          user.user_metadata?.lastName || ""
        }`.trim(),
        phone: user.user_metadata?.phone || "",
      }));
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!/^\d{11}$/.test(formData.phone.trim())) {
      newErrors.phone = "Phone Number must be exactly 11 digits";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    ) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.serviceType)
      newErrors.serviceType = "Please select a service";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.preferredContact)
      newErrors.preferredContact = "Please select a contact method";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  setSubmitting(true);

  try {
    // Decrement consultation count
    const currentConsultations = user.user_metadata.subscription.consultations;
    const updatedConsultations = currentConsultations - 1;

    const { error } = await supabase.auth.updateUser({
      data: {
        subscription: {
          ...user.user_metadata.subscription,
          consultations: updatedConsultations,
        },
      },
    });

    if (error) throw error;

    // Update local user state
    setUser({
      ...user,
      user_metadata: {
        ...user.user_metadata,
        subscription: {
          ...user.user_metadata.subscription,
          consultations: updatedConsultations,
        },
      },
    });

    // Reset form (but keep user data)
    setFormData({
      fullName: `${user.user_metadata?.firstName || ""} ${
        user.user_metadata?.lastName || ""
      }`.trim(),
      phone: user.user_metadata?.phone || "",
      email: user.email || "",
      serviceType: "",
      description: "",
      preferredContact: "",
    });
    setErrors({});

    toast.success("Appointment booked successfully!");
  } catch (error) {
    console.error("Error updating consultation count:", error);
    toast.error("Failed to book appointment. Please try again.");
  } finally {
    setSubmitting(false);
  }
};


  const handleSubscribeClick = () => {
    navigate("/subscription");
  };

  const inputBaseClasses =
    "mt-0.5 w-full px-2 py-1.5 border rounded-md shadow-sm focus:outline-none focus:border-green-500 transition text-sm";

  // Check subscription status
  const isSubscribed = user?.user_metadata?.subscription?.isSubscribed;
  const consultationsLeft =
    user?.user_metadata?.subscription?.consultations || 0;
  const canBookConsultation = isSubscribed && consultationsLeft > 0;

  let buttonText = "Submit";
  let buttonDisabled = false;
  let isSubscribeButton = false;

  if (loading) {
    buttonText = "Loading...";
    buttonDisabled = true;
  } else if (!isSubscribed) {
    buttonText = "Subscribe First to Book";
    isSubscribeButton = true;
  } else if (consultationsLeft === 0) {
    buttonText = "No Consultations Left";
    buttonDisabled = true;
  } else if (submitting) {
    buttonText = "Booking...";
    buttonDisabled = true;
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center py-12">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center py-12">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-4xl flex flex-col md:flex-row items-stretch overflow-hidden">
          {/* Image Section - hidden on mobile, fills full height */}
          <div className="hidden md:flex md:w-1/2 bg-green-50 items-center justify-center">
            <img
              src="/images/Consultations/doctors.svg"
              alt="Doctor Illustration"
              className="w-2/3 md:w-full max-w-xs transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="w-full md:w-1/2 p-5 space-y-2"
            noValidate
          >
            <h2 className="text-3xl pb-2 font-bold text-green-700 text-center drop-shadow-lg">
              <span className="relative inline-block">
                <span className="relative z-10">Book Your Appointment</span>
                <span className="absolute -bottom-1 left-0 w-full h-2 bg-yellow-300 opacity-70 rounded-full transform rotate-1"></span>
              </span>
            </h2>

            {/* Consultations Counter */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-green-800 font-medium">
                  Consultations/Follow Ups Available:
                </span>
                <span
                  className={`text-lg font-bold ${
                    consultationsLeft > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {consultationsLeft}
                </span>
              </div>
              {!isSubscribed && (
                <p className="text-sm text-red-600 mt-1">
                  You need a subscription to book consultations.{" "}
                  <a
                    href="/subscription"
                    className="underline text-green-700 hover:text-green-900"
                  >
                    Subscribe now
                  </a>
                </p>
              )}
              {isSubscribed && consultationsLeft === 0 && (
                <p className="text-sm text-red-600 mt-1">
                  You've used all your consultations/follow ups for  this month.
                </p>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label className="block font-medium text-gray-700 text-sm">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className={`${inputBaseClasses} ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                } ${!canBookConsultation ? "bg-gray-100" : ""}`}
                disabled={!canBookConsultation}
              />
              <p className="text-red-600 mt-0.5 text-xs min-h-[1rem]">
                {errors.fullName || "\u00A0"}
              </p>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block font-medium text-gray-700 text-sm">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="e.g. 01012345678"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className={`${inputBaseClasses} ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } ${!canBookConsultation ? "bg-gray-100" : ""}`}
                disabled={!canBookConsultation}
              />
              <p className="text-red-600 mt-0.5 text-xs min-h-[1rem]">
                {errors.phone || "\u00A0"}
              </p>
            </div>

            {/* Email - Read-only */}
            <div>
              <label className="block font-medium text-gray-700 text-sm">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                className={`${inputBaseClasses} bg-gray-100`}
                readOnly
                disabled
              />
              <p className="text-red-600 mt-0.5 text-xs min-h-[1rem]">
                {errors.email || "\u00A0"}
              </p>
            </div>

            {/* Service Type */}
            <div>
              <span className="block font-medium text-gray-700 mb-0.5 text-sm">
                Type of Service
              </span>
              <div className="flex gap-2">
                {["Consultation", "Follow Up"].map((type) => (
                  <label
                    key={type}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-md border cursor-pointer transition text-sm ${
                      formData.serviceType === type
                        ? "bg-green-100 border-green-500"
                        : "hover:bg-green-50"
                    } ${
                      !canBookConsultation
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.serviceType === type}
                      onChange={() =>
                        setFormData({
                          ...formData,
                          serviceType:
                            formData.serviceType === type ? "" : type,
                        })
                      }
                      className="form-checkbox"
                      disabled={!canBookConsultation}
                    />
                    {type}
                  </label>
                ))}
              </div>
              <p className="text-red-600 mt-0.5 text-xs min-h-[1rem]">
                {errors.serviceType || "\u00A0"}
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium text-gray-700 text-sm">
                Description
              </label>
              <textarea
                rows="2"
                placeholder="Describe your condition..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className={`${inputBaseClasses} resize-none ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } ${!canBookConsultation ? "bg-gray-100" : ""}`}
                disabled={!canBookConsultation}
              ></textarea>
              <p className="text-red-600 mt-0.5 text-xs min-h-[1rem]">
                {errors.description || "\u00A0"}
              </p>
            </div>

            {/* Preferred Contact */}
            <div>
              <span className="block font-medium text-gray-700 mb-0.5 text-sm">
                Preferred Contact Method
              </span>
              <div className="flex gap-2">
                {contactOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      type="button"
                      key={option.label}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          preferredContact: option.label,
                        })
                      }
                      aria-pressed={formData.preferredContact === option.label}
                      className={`p-2 rounded-full border transition ${
                        formData.preferredContact === option.label
                          ? "bg-green-100 border-green-500"
                          : "hover:bg-green-50"
                      } ${
                        !canBookConsultation
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={!canBookConsultation}
                    >
                      <Icon
                        size={16}
                        className={
                          formData.preferredContact === option.label
                            ? "text-button"
                            : "text-gray-500"
                        }
                      />
                    </button>
                  );
                })}
              </div>
              <p className="text-red-600 mt-0.5 text-xs min-h-[1rem]">
                {errors.preferredContact || "\u00A0"}
              </p>
            </div>

            {/* Submit Button or Subscribe Button */}
            {isSubscribeButton ? (
              <button
                type="button"
                onClick={handleSubscribeClick}
                className="w-full bg-gray-300 text-gray-500 py-1.5 rounded-md shadow-md transition-all duration-300 hover:bg-green-600 hover:text-white"
                onMouseOver={(e) => {
                  e.target.textContent = "Subscribe Now";
                }}
                onMouseOut={(e) => {
                  e.target.textContent = "Subscribe First to Book";
                }}
              >
                Subscribe First to Book
              </button>
            ) : (
              <button
                type="submit"
                disabled={buttonDisabled}
                className={`w-full py-1.5 rounded-md shadow-md transition-transform text-sm ${
                  canBookConsultation && !submitting
                    ? "bg-button text-white hover:bg-green-700 hover:scale-105"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {buttonText}
              </button>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}