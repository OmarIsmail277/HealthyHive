import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLightbulb, FaSmile, FaStar, FaHeart, FaLeaf, FaFire } from "react-icons/fa";
import "./AdviceFetch.css";

function AdviceFetch() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showAdvice, setShowAdvice] = useState(false);
  const [currentAdvice, setCurrentAdvice] = useState("");
  const [currentIcon, setCurrentIcon] = useState(<FaLightbulb />);

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
      setCurrentAdvice(data.slip.advice);
      setCurrentIcon(icons[Math.floor(Math.random() * icons.length)]);
      setShowAdvice(true);
      setCount((c) => c + 1);

      // Auto-hide after 8 seconds
      setTimeout(() => {
        setShowAdvice(false);
      }, 8000);
    } catch (error) {
      console.error("Failed to fetch advice:", error);
      setCurrentAdvice("Failed to fetch advice. Please try again.");
      setCurrentIcon(<FaLightbulb />);
      setShowAdvice(true);
    } finally {
      setLoading(false);
    }
  }

  // Hide/show button when scrolling
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Floating Advice Button */}
      <motion.div
        className="floating-advice-button"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0.5,
          y: isVisible ? 0 : 10,
          scale: isVisible ? 1 : 0.95
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={getAdvice}
      >
        <motion.div 
          className="icon-container"
          animate={{
            rotate: loading ? 360 : 0,
            scale: loading ? 1.2 : 1
          }}
          transition={{ 
            rotate: { 
              repeat: loading ? Infinity : 0,
              duration: 1,
              ease: "linear"
            }
          }}
        >
          {loading ? (
            <FaLightbulb className="text-yellow-500" />
          ) : (
            <FaLightbulb className="text-green-600" />
          )}
        </motion.div>
        
        {isVisible && (
          <motion.div 
            className="counter-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            {count}
          </motion.div>
        )}
      </motion.div>

      {/* Custom Toast Notification */}
      <AnimatePresence>
        {showAdvice && (
          <motion.div
            className="custom-toast"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-3 p-4">
              <span className="text-2xl text-yellow-500 mt-1">
                {currentIcon}
              </span>
              <span>{currentAdvice}</span>
              <button 
                className="ml-4 text-gray-500 hover:text-gray-700"
                onClick={() => setShowAdvice(false)}
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AdviceFetch;