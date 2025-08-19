import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBell,
  FaTimes,
  FaArrowRight,
  FaClinicMedical,
  FaTruck,
  FaTag,
} from "react-icons/fa";
import "./FloatingSubscription.css";

function FloatingSubscription() {
  const [isVisible, setIsVisible] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  // Hide button when scrolling down
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

  // Pulsing animation effect
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setIsPulsing((prev) => !prev);
    }, 2000);

    return () => clearInterval(pulseInterval);
  }, []);

  const handleSubscribeClick = () => {
    // Navigate to subscription page
    window.location.href = "/subscription";
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    setIsPulsing(false);
  };

  return (
    <>
      {/* Floating Subscription Button */}
      <motion.div
        className="floating-subscription-button"
        initial={{ opacity: 0, x: -50 }}
        animate={{
          opacity: isVisible ? 1 : 0.7,
          x: isVisible ? 0 : -20,
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleDetails}
      >
        <motion.div
          className="icon-container"
          animate={{
            rotate: showDetails ? 180 : 0,
            scale: isPulsing ? [1, 1.2, 1] : 1,
          }}
          transition={{
            rotate: { duration: 0.3 },
            scale: {
              duration: 1.5,
              repeat: isPulsing ? Infinity : 0,
              repeatType: "reverse",
            },
          }}
        >
          <FaBell className="bell-icon" />
        </motion.div>

        <motion.span
          className="notification-dot"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        />
      </motion.div>

      {/* Subscription Details Panel */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            className="subscription-panel"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, type: "spring", damping: 15 }}
          >
            <div className="panel-header">
              <div className="title-container">
                <h3>Premium Services</h3>
              </div>
              <motion.button
                className="close-btn"
                onClick={() => setShowDetails(false)}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes />
              </motion.button>
            </div>

            <div className="panel-content">
              <motion.div
                className="benefit-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="benefit-icon-container">
                  <FaClinicMedical className="benefit-icon" />
                </div>
                <div className="benefit-text">
                  <h4>Instant Consultations</h4>
                  <p>24/7 doctor access</p>
                </div>
              </motion.div>

              <motion.div
                className="benefit-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="benefit-icon-container">
                  <FaTruck className="benefit-icon" />
                </div>
                <div className="benefit-text">
                  <h4>Free Delivery</h4>
                  <p>Medications to your door</p>
                </div>
              </motion.div>
            </div>

            <motion.button
              className="subscribe-btn"
              onClick={handleSubscribeClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Subscribe Now <FaArrowRight />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default FloatingSubscription;
