import {
  FaLeaf,
  FaShippingFast,
  FaTags,
  FaStar,
  FaStore,
  FaBan,
} from "react-icons/fa";

export default function WhyUs() {
  const points = [
    {
      title: "Fresh & Natural Products",
      description:
        "We provide only 100% natural, healthy, and eco-friendly products.",
      icon: <FaLeaf className="w-12 h-12 text-green-500" />,
    },
    {
      title: "Fast & Free Shipping",
      description:
        "Enjoy quick delivery with free shipping on your first 3 orders.",
      icon: <FaShippingFast className="w-12 h-12 text-blue-500" />,
    },
    {
      title: "Affordable Prices",
      description: "Premium quality at prices that won't hurt your wallet.",
      icon: <FaTags className="w-12 h-12 text-yellow-500" />,
    },
    {
      title: "Trusted by Customers",
      description:
        "Thousands of happy customers trust us for their daily needs.",
      icon: <FaStar className="w-12 h-12 text-purple-500" />,
    },
    {
      title: "Support Local Products",
      description:
        "We prioritize local suppliers to strengthen our communities.",
      icon: <FaStore className="w-12 h-12 text-pink-500" />,
    },
    {
      title: "Boycott Zionist Products",
      description: "We stand for justice by boycotting Zionist goods.",
      icon: <FaBan className="w-12 h-12 text-red-500" />,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#f8faf5] to-[#e8f5e9] dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-14">
          Why <span className="text-green-600">HealthyHive?</span>
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((point, idx) => (
            <div
              key={idx}
              className="group relative p-8 rounded-3xl shadow-lg bg-white dark:bg-gray-900 
                         hover:shadow-2xl hover:scale-105 transition duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex justify-center mb-6">{point.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {point.title}
              </h3>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                {point.description}
              </p>

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
