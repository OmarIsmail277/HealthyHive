import {
  FaLeaf,
  FaShippingFast,
  FaTags,
  FaStar,
  FaStore,
  FaBan,
  FaHandsHelping,
  FaSmile,
  FaFlag,
} from "react-icons/fa";

export default function WhyUs() {
  const points = [
    {
      title: "One-Stop Healthy Gateway",
      description:
        "Everything you need for a cleaner, healthier lifestyle — all in one trusted place.",
      icon: <FaLeaf className="w-12 h-12 text-primary" />,
    },
    {
      title: "Pure & Natural Choices",
      description:
        "No additives, no toxins — only wholesome, natural food and care products.",
      icon: <FaSmile className="w-12 h-12 text-orange-500" />,
    },
    {
      title: "Support Egyptian Products",
      description:
        "We proudly prioritize Egyptian suppliers to strengthen local communities and economy.",
      icon: <FaFlag className="w-12 h-12 text-red-600" />,
    },
    {
      title: "Fast & Affordable Delivery",
      description:
        "Quick delivery across Egypt with low shipping fees and first 3 orders free.",
      icon: <FaShippingFast className="w-12 h-12 text-blue-500" />,
    },
    {
      title: "Affordable Quality",
      description:
        "High-quality products at fair prices — healthy living made accessible.",
      icon: <FaTags className="w-12 h-12 text-yellow-500" />,
    },
    {
      title: "Trusted by Customers",
      description:
        "Thousands of customers trust Healthy Hive for their daily essentials.",
      icon: <FaStar className="w-12 h-12 text-purple-500" />,
    },
    {
      title: "Friendly Human Support",
      description:
        "Our caring support team listens, understands, and truly helps you.",
      icon: <FaHandsHelping className="w-12 h-12 text-teal-500" />,
    },
    {
      title: "Boycott Zionist Products",
      description:
        "We stand for justice by offering alternatives and boycotting Zionist goods.",
      icon: <FaBan className="w-12 h-12 text-red-500" />,
    },
    {
      title: "Healthy Living is Joyful",
      description:
        "We believe a healthy lifestyle isn’t just worth it — it’s enjoyable and fulfilling.",
      icon: <FaStore className="w-12 h-12 text-pink-500" />,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#f8faf5] to-[#e8f5e9] ">
      <div className="healthy__container mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 pb-5 ">
          Why <span className="text-primary">HealthyHive?</span>
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((point, idx) => (
            <div
              key={idx}
              className="group relative p-8 rounded-3xl shadow-lg bg-white
                         hover:shadow-2xl hover:scale-105 transition duration-300 border border-gray-100"
            >
              <div className="flex justify-center mb-6">{point.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 ">
                {point.title}
              </h3>
              <p className="mt-3 text-gray-600 ">{point.description}</p>

              {/* subtle glow on hover */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
                              transition duration-500 bg-gradient-to-br from-green-200/20 to-green-400/10 blur-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
