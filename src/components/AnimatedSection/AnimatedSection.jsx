import { motion } from "framer-motion";

export default function AnimatedSection({ children, type = "fadeUp" }) {
  const variants = {
    fadeUp: {
      initial: { opacity: 0, y: 50 },
      whileInView: { opacity: 1, y: 0 },
    },
    fadeDown: {
      initial: { opacity: 0, y: -50 },
      whileInView: { opacity: 1, y: 0 },
    },
    fadeLeft: {
      initial: { opacity: 0, x: -50 },
      whileInView: { opacity: 1, x: 0 },
    },
    fadeRight: {
      initial: { opacity: 0, x: 50 },
      whileInView: { opacity: 1, x: 0 },
    },
    zoomIn: {
      initial: { opacity: 0, scale: 0.8 },
      whileInView: { opacity: 1, scale: 1 },
    },
  };

  return (
    <motion.div
      initial={variants[type].initial}
      whileInView={variants[type].whileInView}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
