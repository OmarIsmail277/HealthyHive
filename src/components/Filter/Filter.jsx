import { useState } from "react";
import { FaStar, FaChevronDown, FaChevronUp, FaFilter, FaTimes } from "react-icons/fa";

const categories = [
  { label: "Food", subs: ["Fruits", "Vegetables", "Healthy Meals"] },
  { label: "Drinks", subs: ["Smoothies", "Teas", "Juice"] },
  { label: "Personal Care", subs: ["Shampoo", "Shower Gel", "Hand Wash"] },
  { label: "Bakery", subs: ["Bread", "Gluten-Free", "Pastries"] },
  { label: "Meals", subs: ["Breakfast", "Lunch", "Dinner"] },
];

export default function FilterSidebar({ onFilterChange }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [subcategoryOpen, setSubcategoryOpen] = useState(true);
  const [sortOpen, setSortOpen] = useState(true);
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
    <div
      className="flex"
      style={{ transform: "scale(0.9)", transformOrigin: "top left" }}
    >
      <div
        className={` transition-all duration-300 overflow-hidden`}
        style={{
          width: sidebarOpen ? "14rem" : "4rem",
        }}
      >
        <div className="flex justify-between items-center p-2">
          {sidebarOpen ? (
            <>
              <h2 className="text-xl font-bold text-green-700">Filter</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <FaTimes size={20} />
              </button>
            </>
          ) : (
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-full flex justify-center items-center p-2 transition"
            >
              <FaFilter size={32} className="text-button" /> 
            </button>
          )}
        </div>

        <div
          className={`transition-all duration-300 ${
            sidebarOpen ? "opacity-100 p-4" : "opacity-0 p-0 pointer-events-none"
          }`}
        >
          {sidebarOpen && (
            <div className="flex flex-col gap-4">
              <section>
                <button
                  onClick={() => setCategoryOpen((v) => !v)}
                  className="flex justify-between items-center w-full text-green-700 font-semibold text-sm rounded-lg px-3 py-2 bg-green-50 shadow-sm hover:bg-green-100 transition"
                >
                  <span>Category</span>
                  {categoryOpen ? (
                    <FaChevronUp className="text-green-600" size={16} />
                  ) : (
                    <FaChevronDown className="text-green-600" size={16} />
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
                              ? "bg-green-100 border-green-500 font-semibold"
                              : "border-transparent hover:bg-green-50"
                          }`}
                        >
                          {label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section>
                <button
                  onClick={() => setSubcategoryOpen((v) => !v)}
                  disabled={!selectedCategory}
                  className={`flex justify-between items-center w-full text-green-700 font-semibold text-sm rounded-lg px-3 py-2 bg-green-50 shadow-sm transition ${
                    !selectedCategory
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-green-100"
                  }`}
                >
                  <span>Subcategory</span>
                  {subcategoryOpen ? (
                    <FaChevronUp className="text-green-600" size={16} />
                  ) : (
                    <FaChevronDown className="text-green-600" size={16} />
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
                              ? "bg-green-100 border-green-500 font-semibold"
                              : "border-transparent hover:bg-green-50"
                          }`}
                        >
                          {sub}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section>
                <label className="block font-semibold text-green-700 mb-1 text-sm">
                  Price Range: LE{priceRange}
                </label>
                <input
                  type="range"
                  min="5"
                  max="1000"
                  step="5"
                  value={priceRange}
                  onChange={handlePriceChange}
                  className="w-full h-1.5 bg-green-200 rounded-lg accent-green-500 cursor-pointer"
                />
              </section>

              <section>
                <span className="block font-semibold text-green-700 mb-1 text-sm">
                  Star Rating
                </span>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleStarChange(star)}
                      className={`transition transform hover:scale-105 ${
                        starRating >= star
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      <FaStar size={20} />
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <label className="flex items-center gap-1.5 font-semibold text-green-700 text-sm">
                  <input
                    type="checkbox"
                    className="accent-green-500"
                    checked={inStock}
                    onChange={(e) => {
                      setInStock(e.target.checked);
                      triggerChange({ inStock: e.target.checked });
                    }}
                  />
                  In Stock Only
                </label>
              </section>

              <section>
                <label className="flex items-center gap-1.5 font-semibold text-green-700 text-sm">
                  <input
                    type="checkbox"
                    className="accent-green-500"
                    checked={onSale}
                    onChange={(e) => {
                      setOnSale(e.target.checked);
                      triggerChange({ onSale: e.target.checked });
                    }}
                  />
                  On Sale
                </label>
              </section>

              <section>
                <button
                  onClick={() => setSortOpen((v) => !v)}
                  className="flex justify-between items-center w-full text-green-700 font-semibold text-sm rounded-lg px-3 py-2 bg-green-50 shadow-sm hover:bg-green-100 transition"
                >
                  <span>Sort By</span>
                  {sortOpen ? (
                    <FaChevronUp className="text-green-600" size={16} />
                  ) : (
                    <FaChevronDown className="text-green-600" size={16} />
                  )}
                </button>
                {sortOpen && (
                  <ul className="mt-2 space-y-1">
                    <li>
                      <button
                        onClick={() => {
                          setSortBy("priceLowHigh");
                          triggerChange({ sortBy: "priceLowHigh" });
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg border transition ${
                          sortBy === "priceLowHigh"
                            ? "bg-green-100 border-green-500 font-semibold"
                            : "border-transparent hover:bg-green-50"
                        }`}
                      >
                        Price: Low to High
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setSortBy("priceHighLow");
                          triggerChange({ sortBy: "priceHighLow" });
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg border transition ${
                          sortBy === "priceHighLow"
                            ? "bg-green-100 border-green-500 font-semibold"
                            : "border-transparent hover:bg-green-50"
                        }`}
                      >
                        Price: High to Low
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setSortBy("ratingHighLow");
                          triggerChange({ sortBy: "ratingHighLow" });
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg border transition ${
                          sortBy === "ratingHighLow"
                            ? "bg-green-100 border-green-500 font-semibold"
                            : "border-transparent hover:bg-green-50"
                        }`}
                      >
                        Rating: High to Low
                      </button>
                    </li>
                  </ul>
                )}
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
