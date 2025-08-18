import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import RecommendedCard from "../components/RecommendedProducts/RecommendedCard/RecommendedCard";
import Filter from "../components/Filter/Filter";
import AdviceFetch from "../components/FetchAdvice/AdviceFetch";

function SearchResultsPage() {
  const [showFilter, setShowFilter] = useState(true);

  // Mock search results
  const results = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    name: `Search Result ${i + 1}`,
    price: Math.random() * 50 + 10,
    originalPrice: Math.random() > 0.5 ? Math.random() * 80 + 20 : null,
    image: "/images/bakeries.jpg",
  }));

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
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 
                    1.414l-4 4a1 1 0 01-1.414 
                    0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            ) : (
              <>
                <span>Show Filters</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 
                    7.293 6.707a1 1 0 011.414-1.414l4 
                    4a1 1 0 010 1.414l-4 4a1 1 
                    0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            )}
          </button>
        </div>

        <div className="healthy__container flex flex-col md:flex-row py-4 md:py-6">
          {/* Filter - always visible on desktop, toggleable on mobile */}
          <div className={`${showFilter ? "block" : "hidden"} md:block w-full md:w-72 shrink-0`}>
            <div className="">
              <Filter />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-800 my-6">
              All Products
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {results.map((result) => (
                <div key={result.id} className="flex justify-center">
                  <RecommendedCard product={result} />
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