import { useState, useEffect } from "react";
import { FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useSearchParams } from "react-router";

export default function FilterSidebar({
  onFilterChange,
  filterField,
  options,
}) {
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [subcategoryOpen, setSubcategoryOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  // local states
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("mainCategory") || ""
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    searchParams.get("subCategory") || ""
  );
  const [priceRange, setPriceRange] = useState(1000);
  const [starRating, setStarRating] = useState(0);
  const [inStock, setInStock] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [sortBy, setSortBy] = useState("");

  // keep state in sync with URL on refresh
  useEffect(() => {
    setSelectedCategory(searchParams.get("mainCategory") || "");
    setSelectedSubcategory(searchParams.get("subCategory") || "");
  }, [searchParams]);

  // --- CORE FIX: always include category + subcategory when sending filters
  const triggerChange = (changes = {}) => {
    if (onFilterChange) {
      onFilterChange({
        category: searchParams.get("mainCategory") || selectedCategory,
        subcategory: searchParams.get("subCategory") || selectedSubcategory,
        priceRange,
        starRating,
        inStock,
        onSale,
        sortBy,
        ...changes,
      });
    }
  };

  const handleReset = () => {
    setSelectedCategory("");
    setSelectedSubcategory("");
    setPriceRange(1000);
    setStarRating(0);
    setInStock(false);
    setOnSale(false);
    setSortBy("");

    searchParams.delete("mainCategory");
    searchParams.delete("subCategory");
    setSearchParams(searchParams);

    triggerChange({
      category: "",
      subcategory: "",
      priceRange: 1000,
      starRating: 0,
      inStock: false,
      onSale: false,
      sortBy: "",
    });
  };

  function handleClick(value) {
    searchParams.set(filterField, value);
    searchParams.delete("subCategory");
    setSearchParams(searchParams);
  }

  const handleCategoryChange = (catValue) => {
    setSelectedCategory(catValue);
    setSelectedSubcategory("");
    searchParams.set("mainCategory", catValue);
    searchParams.delete("subCategory");
    setSearchParams(searchParams);

    triggerChange({ category: catValue, subcategory: "" });
  };

  const handleSubcategoryChange = (subcat) => {
    setSelectedSubcategory(subcat);
    searchParams.set("subCategory", subcat);
    setSearchParams(searchParams);

    triggerChange({ subcategory: subcat });
  };

  const handlePriceChange = (e) => {
    const val = Number(e.target.value);
    setPriceRange(val);
    triggerChange({ priceRange: val });
  };

  const handleStarChange = (stars) => {
    const newRating = stars === starRating ? 0 : stars;
    setStarRating(newRating);
    triggerChange({ starRating: newRating });
  };

  const subcategories = selectedCategory
    ? options.find((option) => option.value === selectedCategory)?.subs || []
    : [];

  return (
    <>
      <div className="md:mt-20 px-2 md:px-0">
        <div className="transition-all duration-300 ease-in-out rounded-2xl shadow-xl overflow-hidden flex flex-col md:w-64">
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <h2 className="text-xl">Filters</h2>
          </div>

          {/* Content */}
          <div className="flex-1 p-5 space-y-6 overflow-y-auto bg-white">
            {/* Category (desktop shown only) */}
            <section>
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="flex justify-between items-center w-full text-emerald-700 font-semibold text-base px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition"
              >
                <span>Category</span>
                {categoryOpen ? (
                  <FaChevronUp className="text-emerald-600" />
                ) : (
                  <FaChevronDown className="text-emerald-600" />
                )}
              </button>
              {categoryOpen && (
                <ul className="mt-2 space-y-1">
                  {options.map((option) => (
                    <li key={option.value}>
                      <button
                        onClick={() => {
                          handleCategoryChange(option.value);
                          handleClick(option.value);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg border transition ${
                          selectedCategory === option.value
                            ? "bg-emerald-100 border-emerald-500 font-semibold"
                            : "border-transparent hover:bg-emerald-50"
                        }`}
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Subcategory */}
            <section>
              <button
                onClick={() => setSubcategoryOpen(!subcategoryOpen)}
                disabled={!selectedCategory}
                className={`flex justify-between items-center w-full text-emerald-700 font-semibold text-base px-3 py-2 rounded-lg bg-emerald-50 transition ${
                  !selectedCategory
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-emerald-100"
                }`}
              >
                <span>Subcategory</span>
                {subcategoryOpen ? (
                  <FaChevronUp className="text-emerald-600" />
                ) : (
                  <FaChevronDown className="text-emerald-600" />
                )}
              </button>
              {subcategoryOpen && selectedCategory && (
                <ul className="mt-2 space-y-1">
                  {subcategories.map((sub) => (
                    <li key={sub.value || sub.label}>
                      <button
                        onClick={() =>
                          handleSubcategoryChange(sub.value || sub.label)
                        }
                        className={`w-full text-left px-3 py-1.5 rounded-lg border transition ${
                          selectedSubcategory === (sub.value || sub.label)
                            ? "bg-emerald-100 border-emerald-500 font-semibold"
                            : "border-transparent hover:bg-emerald-50"
                        }`}
                      >
                        {sub.label || sub}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Price Range */}
            <section>
              <label className="block font-semibold text-emerald-700 mb-2 text-base">
                {`Price Range: LE${priceRange}`}
              </label>
              <input
                type="range"
                min="5"
                max="1000"
                step="5"
                value={priceRange}
                onChange={handlePriceChange}
                className="w-full h-2 bg-emerald-200 rounded-lg accent-emerald-500 cursor-pointer"
              />
            </section>

            {/* Stars */}
            <section>
              <span className="block font-semibold text-emerald-700 mb-2 text-base">
                Star Rating
              </span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleStarChange(star)}
                    className={`transition transform hover:scale-110 ${
                      starRating >= star ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    <FaStar size={22} />
                  </button>
                ))}
              </div>
            </section>

            {/* Checkboxes */}
            <div className="grid grid-cols-2 gap-4">
              <section>
                <label className="flex items-center gap-2 font-semibold text-emerald-700 text-base">
                  <input
                    type="checkbox"
                    className="accent-emerald-500"
                    checked={inStock}
                    onChange={(e) => {
                      setInStock(e.target.checked);
                      triggerChange({ inStock: e.target.checked });
                    }}
                  />
                  In Stock
                </label>
              </section>

              <section>
                <label className="flex items-center gap-2 font-semibold text-emerald-700 text-base">
                  <input
                    type="checkbox"
                    className="accent-emerald-500"
                    checked={onSale}
                    onChange={(e) => {
                      setOnSale(e.target.checked);
                      triggerChange({ onSale: e.target.checked });
                    }}
                  />
                  On Sale
                </label>
              </section>
            </div>

            {/* Sort */}
            <section>
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex justify-between items-center w-full text-emerald-700 font-semibold text-base px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition"
              >
                <span>Sort By</span>
                {sortOpen ? (
                  <FaChevronUp className="text-emerald-600" />
                ) : (
                  <FaChevronDown className="text-emerald-600" />
                )}
              </button>
              {sortOpen && (
                <ul className="mt-2 space-y-1">
                  {[
                    { key: "priceLowHigh", label: "Price: Low to High" },
                    { key: "priceHighLow", label: "Price: High to Low" },
                    { key: "ratingHighLow", label: "Rating: High to Low" },
                  ].map(({ key, label }) => (
                    <li key={key}>
                      <button
                        onClick={() => {
                          setSortBy(key);
                          triggerChange({ sortBy: key });
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg border transition ${
                          sortBy === key
                            ? "bg-emerald-100 border-emerald-500 font-semibold"
                            : "border-transparent hover:bg-emerald-50"
                        }`}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {/* Reset */}
              <section className="pt-4">
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition"
                >
                  Reset Filters
                </button>
              </section>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
