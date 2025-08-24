import { useState, useEffect } from "react";
import { useParams, useLocation, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import RecommendedCard from "../components/RecommendedProducts/RecommendedCard/RecommendedCard";
import Filter from "../components/Filter/Filter";
import AdviceFetch from "../components/FetchAdvice/AdviceFetch";
import { getProducts } from "../services/apiProducts";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner/Spinner";
import SubIcon from "../components/SubIcon/SubIcon";

function SearchResultsPage() {
  const [showFilter, setShowFilter] = useState(false); // Start with filters hidden on mobile
  const [searchQuery, setSearchQuery] = useState("");
  const { query } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const { isLoading, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const [filters, setFilters] = useState({
    category: searchParams.get("mainCategory") || "",
    subcategory: searchParams.get("subCategory") || "",
    priceRange: 1000,
    starRating: 0,
    inStock: false,
    onSale: false,
    sortBy: "",
  });

  // callback from FilterSidebar
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  useEffect(() => {
    const mainCategory = searchParams.get("mainCategory") || "";
    const subCategory = searchParams.get("subCategory") || "";

    setFilters((prev) => ({
      ...prev,
      category: mainCategory,
      subcategory: subCategory,
    }));
  }, [searchParams]);

  useEffect(() => {
    // Extract search query from URL
    const searchParam =
      query || new URLSearchParams(location.search).get("q") || "";
    setSearchQuery(searchParam);
  }, [query, location.search]);

  if (isLoading) return <Spinner />;

  // First filter by search query
  let filteredProducts = products.filter(
    (product) =>
      product.Name.toLowerCase().includes(searchQuery.toLowerCase()) || // Changed from Name to name
      (product.description &&
        product.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      product.mainCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Then apply additional filters
  if (filters.category) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.mainCategory.toLowerCase() === filters.category.toLowerCase()
    );
  }

  if (filters.subcategory) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.subCategory.toLowerCase() === filters.subcategory.toLowerCase()
    );
  }

  // Price range
  filteredProducts = filteredProducts.filter(
    (product) => product.price <= filters.priceRange
  );

  // Star rating
  if (filters.starRating > 0) {
    filteredProducts = filteredProducts.filter(
      (product) => Math.floor(product.rating) >= filters.starRating
    );
  }

  // In stock
  if (filters.inStock) {
    filteredProducts = filteredProducts.filter(
      (product) => product.stockStatus
    );
  }

  // On sale
  if (filters.onSale) {
    filteredProducts = filteredProducts.filter(
      (product) => product.discount > 0
    );
  }

  // Sorting
  if (filters.sortBy === "priceLowHigh") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (filters.sortBy === "priceHighLow") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (filters.sortBy === "ratingHighLow") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.rating - a.rating
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Mobile filter toggle button */}
        <div className="md:hidden flex justify-end p-4 sticky top-0 bg-white z-10 shadow-sm">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg shadow hover:bg-emerald-600 transition"
          >
            {showFilter ? (
              <>
                <span>Hide Filters</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            ) : (
              <>
                <span>Show Filters</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            )}
          </button>
        </div>

        <div className="healthy__container flex flex-col md:flex-row py-4 md:py-6 px-4 md:px-0">
          {/* Filter sidebar - fixed position on mobile when open */}
          {showFilter && (
            <div
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
              onClick={() => setShowFilter(false)}
            ></div>
          )}
          <div
            className={`${
              showFilter
                ? "fixed top-0 left-0 h-full z-30 overflow-y-auto"
                : "hidden"
            } md:block md:relative md:z-0 w-full md:w-72 shrink-0 bg-gray-50`}
          >
            <div className="p-4 md:p-0">
              <Filter
                filterField="mainCategory"
                options={[
                  {
                    value: "food",
                    label: "Food",
                    subs: [
                      { value: "dairy", label: "Dairy" },
                      { value: "nuts spread", label: "Nuts Spread" },
                      { value: "sauces", label: "Sauces" },
                      { value: "snacks", label: "Snacks" },
                    ],
                  },
                  {
                    value: "drinks",
                    label: "Drinks",
                    subs: [
                      { value: "softDrinks", label: "Soft Drinks" },
                      { value: "herbs", label: "Herbs" },
                      { value: "juice", label: "Juice" },
                    ],
                  },
                  {
                    value: "personal care",
                    label: "Personal Care",
                    subs: [
                      { value: "shampoo", label: "Shampoo" },
                      { value: "shower gel", label: "Shower Gel" },
                      { value: "hand gel", label: "Hand Gel" },
                    ],
                  },
                  {
                    value: "bakery",
                    label: "Bakery",
                    subs: [
                      { value: "bread", label: "Bread" },
                      { value: "pastries", label: "Pastries" },
                      { value: "croissants", label: "Croissants" },
                    ],
                  },
                  {
                    value: "meals",
                    label: "Meals",
                    subs: [
                      { value: "frozen", label: "Frozen" },
                      { value: "preorder", label: "Pre-Order" },
                    ],
                  },
                ]}
                onFilterChange={handleFilterChange}
              />
              {/* Close button for mobile */}
              <button
                className="md:hidden w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={() => setShowFilter(false)}
              >
                Close Filters
              </button>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 md:mt-0 px-4 md:px-0">
            <div className="mb-6">
              <h1 className="text-xl font-semibold text-gray-800">
                Results found: {filteredProducts.length}
              </h1>
              {searchQuery && (
                <p className="text-gray-600">
                  Searching for:{" "}
                  <span className="font-medium text-emerald-600">
                    "{searchQuery}"
                  </span>
                </p>
              )}
            </div>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500 text-lg">
                  No products found matching your search criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="flex justify-center">
                    <RecommendedCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <AdviceFetch />
      <SubIcon />
    </>
  );
}

export default SearchResultsPage;
