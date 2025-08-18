import { useState } from "react";
import {
  FaStar,
  FaChevronDown,
  FaChevronUp,
  FaTimes
} from "react-icons/fa";

const categories = [
  { label: "Food", subs: ["Fruits", "Vegetables", "Healthy Meals"] },
  { label: "Drinks", subs: ["Smoothies", "Teas", "Juice"] },
  { label: "Personal Care", subs: ["Shampoo", "Shower Gel", "Hand Wash"] },
  { label: "Bakery", subs: ["Bread", "Gluten-Free", "Pastries"] },
  { label: "Meals", subs: ["Breakfast", "Lunch", "Dinner"] },
];

export default function FilterSidebar({ onFilterChange }) {
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [subcategoryOpen, setSubcategoryOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [priceRange, setPriceRange] = useState(50);
  const [starRating, setStarRating] = useState(0);
  const [inStock, setInStock] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [sortBy, setSortBy] = useState("");

  const triggerChange = (changes) => {
    if (onFilterChange) {
      onFilterChange({
        category: selectedCategory,
        subcategory: selectedSubcategory,
        priceRange,
        starRating,
        inStock,
        onSale,
        sortBy,
        ...changes,
      });
    }
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setSelectedSubcategory("");
    triggerChange({ category: cat, subcategory: "" });
  };

  const handleSubcategoryChange = (subcat) => {
    setSelectedSubcategory(subcat);
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
    ? categories.find((c) => c.label === selectedCategory)?.subs || []
    : [];

  return (
    <div className="md:mt-20 px-2 md:px-0">
      <div className="transition-all duration-300 ease-in-out rounded-2xl shadow-xl overflow-hidden flex flex-col md:w-64">
        {/* Header - only close button on mobile */}
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <h2 className="text-xl">Filters</h2>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 space-y-6 overflow-y-auto bg-white">
          {/* Mobile horizontal layout container */}
          <div className="md:hidden flex flex-wrap gap-4 mb-6">
            {/* Category dropdown */}
            <div className="flex-1 min-w-[150px]">
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="flex justify-between items-center w-full text-emerald-700 font-semibold text-sm px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition"
              >
                <span>Category</span>
                {categoryOpen ? (
                  <FaChevronUp className="text-emerald-600" />
                ) : (
                  <FaChevronDown className="text-emerald-600" />
                )}
              </button>
              {categoryOpen && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {categories.map(({ label }) => (
                    <button
                      key={label}
                      onClick={() => handleCategoryChange(label)}
                      className={`text-left px-3 py-1.5 rounded-lg border transition text-sm ${
                        selectedCategory === label
                          ? "bg-emerald-100 border-emerald-500 font-semibold"
                          : "border-transparent hover:bg-emerald-50"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Subcategory dropdown */}
            {selectedCategory && (
              <div className="flex-1 min-w-[150px]">
                <button
                  onClick={() => setSubcategoryOpen(!subcategoryOpen)}
                  className="flex justify-between items-center w-full text-emerald-700 font-semibold text-sm px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition"
                >
                  <span>Subcategory</span>
                  {subcategoryOpen ? (
                    <FaChevronUp className="text-emerald-600" />
                  ) : (
                    <FaChevronDown className="text-emerald-600" />
                  )}
                </button>
                {subcategoryOpen && (
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {subcategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => handleSubcategoryChange(sub)}
                        className={`text-left px-3 py-1.5 rounded-lg border transition text-sm ${
                          selectedSubcategory === sub
                            ? "bg-emerald-100 border-emerald-500 font-semibold"
                            : "border-transparent hover:bg-emerald-50"
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop vertical layout */}
          <div className="hidden md:block space-y-6">
            {/* Category */}
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
                  {categories.map(({ label }) => (
                    <li key={label}>
                      <button
                        onClick={() => handleCategoryChange(label)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg border transition ${
                          selectedCategory === label
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
                    <li key={sub}>
                      <button
                        onClick={() => handleSubcategoryChange(sub)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg border transition ${
                          selectedSubcategory === sub
                            ? "bg-emerald-100 border-emerald-500 font-semibold"
                            : "border-transparent hover:bg-emerald-50"
                        }`}
                      >
                        {sub}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          {/* Common sections (same for mobile and desktop) */}
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
          </section>
        </div>
      </div>
    </div>
  );
}
