import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import RecommendedCard from "../components/RecommendedProducts/RecommendedCard/RecommendedCard";
import Filter from "../components/Filter/Filter";
import AdviceFetch from "../components/FetchAdvice/AdviceFetch";

function SearchResultsPage() {
  const [showFilter, setShowFilter] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [resultsCount, setResultsCount] = useState(0);
  const { query } = useParams();
  const location = useLocation();

  // Mock products - in a real app you would fetch these based on the search query
  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: Math.random() * 50 + 10,
    originalPrice: Math.random() > 0.5 ? Math.random() * 80 + 20 : null,
    image: "/images/bakeries.jpg",
  }));

  useEffect(() => {
    // Extract search query from URL
    const searchParam = query || new URLSearchParams(location.search).get("q") || "";
    setSearchQuery(searchParam);
    setResultsCount(products.length); // In real app, this would come from API response
  }, [query, location.search, products.length]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Mobile filter toggle button */}
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg shadow hover:bg-emerald-600 transition"
          >
            {showFilter ? (
              <>
                <span>Hide Filters</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </>
            ) : (
              <>
                <span>Show Filters</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>
        </div>

        <div className="healthy__container flex flex-col md:flex-row py-4 md:py-6 px-4 md:px-0">
          {/* Filter - always visible on desktop, toggleable on mobile */}
          <div className={`${showFilter ? 'block' : 'hidden'} md:block w-full md:w-72 shrink-0`}>
            <div className="">
              <Filter />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-xl font-semibold text-gray-800">
                Results found: {resultsCount}
              </h1>
              {searchQuery && (
                <p className="text-gray-600">
                  Searching for: <span className="font-medium text-emerald-600">"{searchQuery}"</span>
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <div key={product.id} className="flex justify-center">
                  <RecommendedCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AdviceFetch />
    </>
  );
}

export default SearchResultsPage;