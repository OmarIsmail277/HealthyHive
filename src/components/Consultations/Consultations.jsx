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
    "mt-1 w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:border-green-500 transition";

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-6xl flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 bg-green-50 flex items-center justify-center p-8">
          <img
            src="/images/Consultations/doctors.svg"
            alt="Doctor Illustration"
            className="w-3/4 md:w-full max-w-sm transition-transform duration-500 hover:scale-105"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 p-8 space-y-6"
          noValidate
        >
          <h2 className="text-3xl font-bold text-green-700 text-center">
            Book Your Appointment
          </h2>

          <div>
            <label className="block font-medium text-gray-700">Full Name</label>
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
            <p
              className="text-red-600 mt-1 text-sm min-h-[1.25rem]"
              aria-live="assertive"
            >
              {errors.fullName || "\u00A0"}
            </p>
          </div>

          <div>
            <label className="block font-medium text-gray-700">
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
            <p
              className="text-red-600 mt-1 text-sm min-h-[1.25rem]"
              aria-live="assertive"
            >
              {errors.phone || "\u00A0"}
            </p>
          </div>

          <div>
            <label className="block font-medium text-gray-700">Email</label>
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
            <p
              className="text-red-600 mt-1 text-sm min-h-[1.25rem]"
              aria-live="assertive"
            >
              {errors.email || "\u00A0"}
            </p>
          </div>

          <div>
            <span className="block font-medium text-gray-700 mb-2">
              Type of Service
            </span>
            <div className="flex gap-4">
              {["Consultation", "Follow Up"].map((type) => (
                <label
                  key={type}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition ${
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
            <p
              className="text-red-600 mt-1 text-sm min-h-[1.25rem]"
              aria-live="assertive"
            >
              {errors.serviceType || "\u00A0"}
            </p>
          </div>

          <div>
            <label className="block font-medium text-gray-700">Description</label>
            <textarea
              rows="4"
              placeholder="Describe your condition..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className={`${inputBaseClasses} resize-none ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            ></textarea>
            <p
              className="text-red-600 mt-1 text-sm min-h-[1.25rem]"
              aria-live="assertive"
            >
              {errors.description || "\u00A0"}
            </p>
          </div>

          <div>
            <span className="block font-medium text-gray-700 mb-2">
              Preferred Contact Method
            </span>
            <div className="flex gap-4">
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
                    className={`p-4 rounded-full border transition ${
                      formData.preferredContact === option.label
                        ? "bg-green-100 border-green-500 scale-110"
                        : "hover:bg-green-50"
                    }`}
                  >
                    <Icon
                      size={24}
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
            <p
              className="text-red-600 mt-1 text-sm min-h-[1.25rem]"
              aria-live="assertive"
            >
              {errors.preferredContact || "\u00A0"}
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-button text-white py-3 rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
