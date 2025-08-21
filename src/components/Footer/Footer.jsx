import {
  FaFacebook,
  FaPhone,
  FaSquareXTwitter,
  FaLocationDot,
  FaHeart,
  FaLeaf,
} from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa"; // instead of fa6

import { FiInstagram } from "react-icons/fi";
import { Link } from "react-router-dom";
import footerimg from "/images/Footer.jpg";


function Footer() {
  return (
    <footer
      className="relative w-full text-white bg-gray-900 bg-cover bg-center  overflow-hidden"
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${footerimg})` }}
    >
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>

      <div className="relative z-10 w-11/12 max-w-7xl mx-auto py-14 px-4 flex flex-col gap-12 lg:flex-row lg:justify-between">
        {/* About & Contact */}
        <div className="flex flex-col gap-10 lg:w-2/5">
          <div className="space-y-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1 sm:gap-2">
              <FaLeaf className="text-lg sm:text-xl lg:text-2xl text-button" />
              <span className="font-bold text-base sm:text-lg lg:text-3xl">
                HealthyHive
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-300 hover:text-gray-100 transition-colors duration-300 group">
              We are dedicated to providing the best health and wellness
              resources. Fuel your energy with a full range of healthy and yummy
              superfoods, rich in high nutritional values — for athletes,
              children, and anyone seeking a natural, healthy lifestyle.
            </p>
            <div className="flex gap-2 mt-2">
              <span className="bg-primary/10 text-primary text-s px-3 py-1 rounded-full">Organic</span>
              <span className="bg-primary/10 text-primary text-s px-3 py-1 rounded-full">Non-GMO</span>
              <span className="bg-primary/10 text-primary text-s px-3 py-1 rounded-full">Eco-Friendly</span>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold border-b-2 border-primary inline-block pb-1">
              Contact Us
            </h2>
            <div className="space-y-3">
              <p className="flex items-center gap-3 text-gray-300 hover:text-gray-100 transition-colors duration-300 group">
                <FaLocationDot className="text-xl text-primary group-hover:scale-110 transition-transform" />
                <span>Alexandria, Egypt</span>
              </p>
              <p className="flex items-center gap-3 text-gray-300 hover:text-gray-100 transition-colors duration-300 group">
                <FaPhone className="text-xl text-primary group-hover:scale-110 transition-transform" />
                <span>17002</span>
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter & Social */}
        <div className="flex flex-col gap-10 lg:w-2/5">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold border-b-2 border-primary inline-block pb-1">
              Newsletter
            </h2>
            <form className="flex flex-col gap-3 w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow p-3 rounded-lg bg-white/90 text-black outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                required
              />
              <button
                type="submit"
                className="bg-primary px-5 py-3 rounded-lg text-white font-semibold hover:bg-detail-btn-green transition-all duration-300 shadow-md hover:shadow-primary/30"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold border-b-2 border-primary inline-block pb-1">
              Stay Connected
            </h2>
            <div className="flex gap-5 text-3xl">
              <Link
                to="https://www.facebook.com/"
                className="text-gray-400 hover:text-[#1877F2] hover:scale-110 transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebook />
              </Link>
              <Link
                to="https://www.instagram.com/"
                className="text-gray-400 hover:text-[#E1306C] hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <FiInstagram />
              </Link>
              <Link
                to="https://twitter.com/"
                className="text-gray-400 hover:text-[#1DA1F2] hover:scale-110 transition-all duration-300"
                aria-label="Twitter"
              >
                <FaSquareXTwitter />
              </Link>

              <Link
                to="/faq"
                className="text-gray-400 hover:text-primary hover:scale-110 transition-all duration-300"
                aria-label="FAQ"
              >
                <FaQuestionCircle />
              </Link>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="text-lg font-bold text-primary"
              >
                About Us
              </Link>
            </div>

            <p className="text-xs text-white pt-2">
              Follow us for daily wellness inspiration
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="relative z-10 bg-black/80 py-5 text-center text-white text-sm ">
        <div className="w-11/12 max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6">
          <span>© {new Date().getFullYear()} HealthyHive. All rights reserved.</span>
          <span className="hidden sm:inline">|</span>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
