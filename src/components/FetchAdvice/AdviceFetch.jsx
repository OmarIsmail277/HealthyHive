import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLightbulb,
  FaSmile,
  FaStar,
  FaHeart,
  FaLeaf,
  FaFire,
} from "react-icons/fa";
import "./AdviceFetch.css";

function AdviceFetch() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState(<FaLightbulb />);

  const icons = [
    <FaLightbulb />,
    <FaSmile />,
    <FaStar />,
    <FaHeart />,
    <FaLeaf />,
    <FaFire />,
  ];

  async function getAdvice() {
    try {
      setLoading(true);
      const res = await fetch("https://api.adviceslip.com/advice");
      const data = await res.json();
      setAdvice(data.slip.advice);

      // set random icon
      setIcon(icons[Math.floor(Math.random() * icons.length)]);

      setCount((c) => c + 1);
    } catch (error) {
      console.error("Failed to fetch advice:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      className="card healthy__container !mx-auto shadow-xl rounded-2xl p-6 bg-gradient-to-r from-green-100 to-green-50 flex flex-col items-center justify-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="title text-2xl font-bold text-green-700 flex items-center gap-2">
        💡 A Tip On The Go!
      </h2>

      <AnimatePresence mode="wait">
        {advice && (
          <motion.div
            key={advice}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mt-4"
          >
            <span className="text-green-600 text-3xl animate-pulse">
              {icon}
            </span>
            <p className="text-lg font-medium text-gray-700">{advice}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn mt-6 px-6 py-2 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition"
        onClick={getAdvice}
        disabled={loading}
      >
        {loading
          ? "✨ Loading..."
          : count === 0
          ? "Grab your first Advice!"
          : "Get Another One 🚀"}
      </motion.button>

      <p className="counter mt-4 text-gray-600">
        You have read <strong className="text-green-700">{count}</strong> pieces
        of advice
      </p>
    </motion.div>
  );
}

export default AdviceFetch;
