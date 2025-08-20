import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

export default function NotFoundPage() {
  return (
    <div>
<Navbar/> 
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-[550px] text-button">
        <img
          src="/images/pages/not-found.svg"
          alt="Page not found"
          className="block mx-auto drop-shadow-lg w-full h-auto"
          />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mt-8">
        Oops! Page Not Found
      </h1>

      <p className="text-gray-600 text-center mt-3 max-w-lg leading-relaxed text-base md:text-lg">
        The page you’re looking for doesn’t exist, has been moved, or is
        temporarily unavailable.
      </p>

      <Link
        to="/"
        className="mt-8 w-full max-w-xs text-center bg-button py-3 rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105 no-underline"
        style={{ color: "#fff" }}
      >
        Return to Home Page
      </Link>
    </div>
    <Footer/>
        </div>
  );
}
