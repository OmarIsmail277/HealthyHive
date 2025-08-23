import { useDispatch, useSelector } from "react-redux";
import { FiTrash2, FiCheck } from "react-icons/fi";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { addToCart } from "../store/cartSlice";
import { removeFromWishlist } from "../store/wishlistSlice";

function WishlistPage() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = (item) => {
    const exists = cartItems.some((cartItem) => cartItem.id === item.id);
    if (!exists) {
      dispatch(addToCart(item));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <>
      <Navbar />
      <div className="healthy__container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-green-700">My Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
        ) : (
          <div className="space-y-6">
            {wishlistItems.map((item) => {
              const isAdded = cartItems.some(
                (cartItem) => cartItem.id === item.id
              );
              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-6 bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
                >
                  {/* Product Image */}
                  <img
                    src={item.imageURL}
                    alt={item.Name}
                    className="w-full sm:w-32 h-32 object-contain rounded-lg bg-gray-50 p-2"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between text-center sm:text-left">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {item.Name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <p className="text-green-700 font-bold text-xl mt-3">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Mobile: Add + Delete (Full Width) */}
                    <div className="flex gap-3 mt-4 sm:hidden">
                      <button
                        onClick={() => handleAddToCart(item)}
                        disabled={isAdded}
                        className={`flex-1 px-4 py-2 rounded-lg transition flex items-center justify-center gap-2 text-sm font-medium ${
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
                        onClick={() => handleRemove(item.id)}
                        className="px-4 py-2 rounded-lg bg-red-100 text-red-500 hover:bg-red-200 transition flex items-center justify-center"
                        title="Remove from wishlist"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Desktop: Actions */}
                  <div className="hidden sm:flex flex-col items-end justify-between">
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={isAdded}
                      className={`px-5 py-2 rounded-lg transition flex items-center justify-center gap-2 text-sm font-medium ${
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
                      onClick={() => handleRemove(item.id)}
                      className="mt-3 text-red-500 hover:text-red-700 transition flex items-center gap-1 text-sm font-medium"
                      title="Remove from wishlist"
                    >
                      <FiTrash2 size={18} /> Remove
                    </button>
                  </div>
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

export default WishlistPage;
