import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import RecommendedCard from "../components/RecommendedProducts/RecommendedCard/RecommendedCard";
import Filter from "../components/Filter/Filter";
import AdviceFetch from "../components/FetchAdvice/AdviceFetch";
import SubIcon from "../components/SubIcon/SubIcon";
import Spinner from "../components/Spinner/Spinner";
import { useSearchParams } from "react-router";
import { useAllProducts } from "../hooks/useProducts";

function ProudctsPage() {
  const [showFilter, setShowFilter] = useState(true);

  const { isPending, data: products } = useAllProducts();

  const [searchParams] = useSearchParams();

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

  if (isPending) return <Spinner />;
  let filteredProducts = products;

  // 1. Main category
  if (filters.category) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.mainCategory.toLowerCase() === filters.category.toLowerCase()
    );
  }

  // 2. Subcategory
  if (filters.subcategory) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.subCategory.toLowerCase() === filters.subcategory.toLowerCase()
    );
  }

  // 3. Price range
  filteredProducts = filteredProducts.filter(
    (product) => product.price <= filters.priceRange
  );

  // 4. Star rating
  if (filters.starRating > 0) {
    filteredProducts = filteredProducts.filter(
      (product) => Math.floor(product.rating) >= filters.starRating
    );
  }

  // 5. In stock
  if (filters.inStock) {
    filteredProducts = filteredProducts.filter(
      (product) => product.stockStatus
    );
  }

  // 6. On sale
  if (filters.onSale) {
    filteredProducts = filteredProducts.filter(
      (product) => product.discount > 0
    );
  }

  // 7. Sorting
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
        <div className="md:hidden flex justify-end p-4">
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
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

        <div className="healthy__container flex flex-col md:flex-row md:gap-8 py-4 md:py-6">
          {/* Filter - always visible on desktop, toggleable on mobile */}
          <div
            className={`${
              showFilter ? "block" : "hidden"
            } md:block w-full md:w-72 shrink-0`}
          >
            <div className="">
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
                      { value: "pastries", label: "Pasteies" },
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
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 md:mt-7 mt-10">
            <div className="flex justify-between">
              <h1 className="text-xl font-semibold text-gray-800 mb-6">
                Results found: {filteredProducts.length}
              </h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 [@media(min-width:1800px)]:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
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
      <SubIcon />
    </>
  );
}

export default ProudctsPage;
