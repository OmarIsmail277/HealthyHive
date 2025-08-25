import { useDispatch, useSelector } from "react-redux";
import { FiTrash2, FiCheck } from "react-icons/fi";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { addToCart } from "../store/cartSlice";
import { removeFromWishlist } from "../store/wishlistSlice";
import { Link } from "react-router-dom";
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
      <div className="healthy__container mx-auto py-8 px-3 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-primary">
          My Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <p className="text-gray-500 text-base sm:text-lg">
            Your wishlist is empty.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8">
            {wishlistItems.map((item) => {
              const isAdded = cartItems.some(
                (cartItem) => cartItem.id === item.id
              );
              return (
                <div
                  key={item.id}
                  className="flex flex-col xl:flex-row gap-4 xl:gap-6 bg-white rounded-xl shadow-md p-4 sm:p-5 hover:shadow-lg transition h-full"
                >
                  {/* Product Image */}
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.imageURL}
                      alt={item.Name}
                      className="w-full xl:w-32 h-32 object-contain rounded-lg bg-gray-50 p-2"
                    />
                  </Link>

                  {/* Details + Actions */}
                  <div className="flex flex-col justify-between text-center xl:text-left flex-1">
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg text-gray-900">
                        {item.Name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <p className="text-primary font-bold text-lg sm:text-xl mt-2 sm:mt-3">
                      LE {item.price.toFixed(2)}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-3 mt-3 xl:mt-4 justify-center xl:justify-end">
                      {/* Add to Cart */}
                      <button
                        onClick={() => handleAddToCart(item)}
                        disabled={isAdded}
                        className={`w-1/2 xl:w-auto px-3 py-2 rounded-lg transition flex items-center justify-center gap-2 text-xs sm:text-sm font-medium ${
                          isAdded
                            ? "bg-green-100 text-green-700 border border-green-600"
                            : "bg-primary text-white hover:bg-secondary"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <FiCheck size={16} /> Added
                          </>
                        ) : (
                          "Add to Cart"
                        )}
                      </button>

                      {/* Remove */}
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="px-3 py-2 rounded-lg bg-red-100 text-red-500 hover:bg-red-200 transition flex items-center justify-center xl:px-4 xl:bg-transparent xl:text-red-500 xl:hover:text-red-700 xl:hover:bg-transparent"
                        title="Remove from wishlist"
                      >
                        <FiTrash2 size={18} className="xl:mr-1" />
                        <span className="hidden xl:inline">Remove</span>
                      </button>
                    </div>
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
