import { useState } from "react";
import { FiTrash2, FiCheck } from "react-icons/fi";
import image from "../assets/test_img.jpg";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

function WishlistPageOld() {
  const [cartItems, setCartItems] = useState([]);

  const wishlistItems = [
    {
      id: 1,
      name: "Fresh Apples",
      description: "Crisp, juicy, and naturally sweet.",
      price: 3.5,
      image,
    },
    {
      id: 2,
      name: "Organic Bread",
      description: "Whole grain, freshly baked.",
      price: 2.2,
      image,
    },
  ];

  const handleAddToCart = (id) => {
    if (!cartItems.includes(id)) {
      setCartItems((prev) => [...prev, id]);
    }
  };

  return (
    <>
      <Navbar />
      <div className="healthy__container mx-auto py-15">
        <h1 className="text-2xl font-bold mb-6 text-green-700">Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <p className="text-gray-500">Your wishlist is empty.</p>
        ) : (
          <div className="space-y-4">
            {wishlistItems.map((item) => {
              const isAdded = cartItems.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 border-b pb-4"
                >
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-24 h-auto rounded-md object-contain"
                  />

                  {/* Details */}
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <p className="text-green-700 font-bold mt-1">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Mobile: Add + Delete (Full Width) */}
                    <div className="flex gap-3 mt-3 sm:hidden">
                      <button
                        onClick={() => handleAddToCart(item.id)}
                        disabled={isAdded}
                        className={`flex-1 px-4 py-2 rounded transition flex items-center justify-center gap-2 text-sm font-medium ${
                          isAdded
                            ? "bg-green-100 text-green-700 border border-green-600"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <FiCheck size={18} /> Added
                          </>
                        ) : (
                          "Add to Cart"
                        )}
                      </button>
                      <button
                        className="px-4 py-2 rounded bg-red-100 text-red-500 hover:bg-red-200 transition flex items-center justify-center"
                        title="Remove from wishlist"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>

                    {/* Desktop: Add to Cart button */}
                    <div className="hidden sm:block mt-3">
                      <button
                        onClick={() => handleAddToCart(item.id)}
                        disabled={isAdded}
                        className={`px-4 py-2 rounded transition flex items-center justify-center gap-2 text-sm font-medium ${
                          isAdded
                            ? "bg-green-100 text-green-700 border border-green-600"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <FiCheck size={18} /> Added
                          </>
                        ) : (
                          "Add to Cart"
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Desktop: Delete on far right */}
                  <button
                    className="hidden sm:flex text-red-500 hover:text-red-700 transition self-start"
                    title="Remove from wishlist"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default WishlistPageOld;
