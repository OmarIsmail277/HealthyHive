import React, { useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import SubIcon from '../components/SubIcon/SubIcon';
import AdviceFetch from '../components/FetchAdvice/AdviceFetch';
import { FaHeart, FaUsers, FaSeedling, FaMedal, FaGlobe } from "react-icons/fa";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import logo from '/images/green-logo.svg'; 

function AboutUs() {
  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [ref2, inView2] = useInView();
  const [ref3, inView3] = useInView();

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  useEffect(() => {
    if (inView2) controls.start('visible');
  }, [controls, inView2]);

  useEffect(() => {
    if (inView3) controls.start('visible');
  }, [controls, inView3]);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar/>
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1453&q=80')] bg-cover bg-center opacity-30"></div>
        </div>
        
        <motion.div 
          className="text-center z-10 px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
<motion.div
  animate={{ rotate: [0, 10, 0] }}
  transition={{ duration: 5, repeat: Infinity }}
  className="relative flex justify-center items-center mb-10"
>
  {/* Lighter Glowing Aura */}
  <div className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-green-200 via-green-300 to-white blur-3xl opacity-90 animate-pulse"></div>

  {/* Logo */}
  <img
    src={logo}
    alt="HealthyHive Logo"
    className="relative z-10 h-56 w-56 object-contain drop-shadow-[0_0_35px_rgba(200,255,200,0.9)]"
  />
</motion.div>


          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-300">
            Our Story
          </h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Returning to our <span className="text-green-400 font-bold">natural fitrah</span> through wholesome nutrition
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-green-400 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-green-400 rounded-full mt-2"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            ></motion.div>
          </div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/10 to-transparent opacity-50"></div>
        
        <motion.div 
          className="max-w-6xl mx-auto relative z-10"
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
            variants={fadeIn}
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Mission</span>
          </motion.h2>
          
          <motion.div 
            className="bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-green-400/20 shadow-2xl shadow-green-400/10"
            variants={fadeIn}
          >
            <motion.p 
              className="text-xl md:text-2xl leading-relaxed text-center text-gray-200"
              variants={fadeIn}
            >
              In a world where convenience often overshadows health, we founded <span className="text-green-400 font-semibold">HealthyHive</span> with a singular vision: to create a one-stop gateway that reconnects people with the nourishing, natural foods that Allah designed for our bodies. We believe that returning to our <span className="text-yellow-300">fitrah</span>—our innate predisposition toward purity and wellness—is the key to preventing disease, enhancing vitality, and living a life of gratitude for the perfect creation we've been blessed with.
            </motion.p>
            
            <motion.p 
              className="text-xl md:text-2xl leading-relaxed text-center mt-8 text-gray-200"
              variants={fadeIn}
            >
              Our platform is more than just a marketplace—it's a movement toward conscious consumption, educated choices, and holistic well-being. We're here to make healthy living accessible, enjoyable, and deeply rewarding for everyone seeking to honor their body as the <span className="text-green-400">amanah</span> (trust) that it is.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gray-900/50">
        <motion.div 
          className="max-w-6xl mx-auto"
          ref={ref2}
          variants={staggerContainer}
          initial="hidden"
          animate={inView2 ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
            variants={fadeIn}
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Values</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value 1 */}
            <motion.div 
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-green-400/20 hover:border-green-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-green-400/10"
              variants={fadeIn}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="text-4xl text-green-400 mb-4"
                animate={pulseAnimation}
              >
                <FaSeedling />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-3">Natural Purity</h3>
              <p className="text-gray-300">We champion organic, non-GMO foods in their most natural state, free from harmful additives and processing.</p>
            </motion.div>
            
            {/* Value 2 */}
            <motion.div 
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-green-400/20 hover:border-green-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-green-400/10"
              variants={fadeIn}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="text-4xl text-green-400 mb-4"
                animate={pulseAnimation}
              >
                <FaHeart />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-3">Compassionate Care</h3>
              <p className="text-gray-300">We treat every customer with the respect and care they deserve, understanding that health is a personal journey.</p>
            </motion.div>
            
            {/* Value 3 */}
            <motion.div 
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-green-400/20 hover:border-green-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-green-400/10"
              variants={fadeIn}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="text-4xl text-green-400 mb-4"
                animate={pulseAnimation}
              >
                <FaMedal />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-3">Excellence</h3>
              <p className="text-gray-300">We continuously strive for the highest quality in our products, services, and educational resources.</p>
            </motion.div>
            
            {/* Value 4 */}
            <motion.div 
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-green-400/20 hover:border-green-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-green-400/10"
              variants={fadeIn}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="text-4xl text-green-400 mb-4"
                animate={pulseAnimation}
              >
                <FaUsers />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-3">Community</h3>
              <p className="text-gray-300">We build supportive networks that empower individuals and families to make positive health changes together.</p>
            </motion.div>
            
            {/* Value 5 */}
            <motion.div 
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-green-400/20 hover:border-green-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-green-400/10"
              variants={fadeIn}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="text-4xl text-green-400 mb-4"
                animate={pulseAnimation}
              >
                <FaGlobe />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-3">Sustainability</h3>
              <p className="text-gray-300">We prioritize eco-friendly practices that honor the Earth and preserve resources for future generations.</p>
            </motion.div>
            
            {/* Value 6 */}
            <motion.div 
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-green-400/20 hover:border-green-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-green-400/10"
              variants={fadeIn}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="text-4xl text-green-400 mb-4"
                animate={pulseAnimation}
              >
                <img 
                  src={logo} 
                  alt="Education" 
                  className="h-10 w-10 object-contain mx-auto" 
                />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-3">Education</h3>
              <p className="text-gray-300">We provide knowledge and resources to help people make informed decisions about their health and nutrition.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute w-64 h-64 rounded-full bg-green-400 -top-32 -left-32"></div>
          <div className="absolute w-64 h-64 rounded-full bg-yellow-300 -bottom-32 -right-32"></div>
        </div>
        
        <motion.div 
          className="max-w-4xl mx-auto text-center relative z-10"
          ref={ref3}
          variants={fadeIn}
          initial="hidden"
          animate={inView3 ? "visible" : "hidden"}
        >
          <div className="flex justify-center mb-8">
            <img 
              src={logo} 
              alt="HealthyHive Logo" 
              className="h-16 w-16 object-contain" 
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Movement</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 mb-10">
            Together, we can reclaim our health, honor our bodies, and live vibrantly as Allah intended.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button className="bg-gradient-to-r from-primary to-accent text-white font-bold py-4 px-8 rounded-full text-lg shadow-2xl shadow-green-400/30 hover:shadow-green-400/50 transition-all duration-300">
              Explore Our Products
            </button>
          </motion.div>
        </motion.div>
      </section>
      <Footer/>
      <AdviceFetch/>
      <SubIcon/>
    </div>
  )
}

export default AboutUs