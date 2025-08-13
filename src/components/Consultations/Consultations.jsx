import { useState } from "react";
import { FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";

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

  const contactOptions = [
    { icon: FaWhatsapp, label: "WhatsApp" },
    { icon: FaEnvelope, label: "Email" },
    { icon: FaPhone, label: "Phone Call" },
  ];

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
    if (!formData.serviceType) newErrors.serviceType = "Please select a service";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.preferredContact)
      newErrors.preferredContact = "Please select a contact method";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        serviceType: "",
        description: "",
        preferredContact: "",
      });
      setErrors({});
    }
  };

  const inputBaseClasses =
    "mt-0.5 w-full px-2 py-1.5 border rounded-md shadow-sm focus:outline-none focus:border-green-500 transition text-sm";

  return (
    <div className="flex justify-center pt-12">
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
          <h2 className="text-3xl pb-2 font-bold text-green-700 text-center">
            Book Your Appointment
          </h2>

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
              }`}
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
              }`}
            />
            <p className="text-red-600 mt-0.5 text-xs min-h-[1rem]">
              {errors.phone || "\u00A0"}
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium text-gray-700 text-sm">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`${inputBaseClasses} ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
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
              }`}
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
                      setFormData({ ...formData, preferredContact: option.label })
                    }
                    aria-pressed={formData.preferredContact === option.label}
                    className={`p-2 rounded-full border transition ${
                      formData.preferredContact === option.label
                        ? "bg-green-100 border-green-500"
                        : "hover:bg-green-50"
                    }`}
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-button text-white py-1.5 rounded-md shadow-md hover:bg-green-700 transition-transform transform hover:scale-105 text-sm"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
