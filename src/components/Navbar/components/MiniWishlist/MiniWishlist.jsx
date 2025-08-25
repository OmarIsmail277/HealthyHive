import { FiX, FiCheck, FiTrash2 } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../../../store/wishlistSlice";
import { addToCart } from "../../../../store/cartSlice";
import { Link } from "react-router-dom";

function MiniWishlist({ onClose }) {
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
    <div className="h-full flex flex-col rounded-lg shadow-sm shadow-green-100 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <h2 className="text-lg font-bold">Your Wishlist</h2>
        <button onClick={onClose} className="lg:hidden">
          <FiX size={20} />
        </button>
      </div>

      {/* Wishlist Items */}
      <div className="p-3 space-y-4 overflow-y-auto flex-1 max-h-[220px] custom-scrollbar">
        {wishlistItems.length === 0 ? (
          <p className="text-gray-500 text-center">Your wishlist is empty.</p>
        ) : (
          wishlistItems.map((item, index) => {
            // Check if this wishlist item is already in cart
            const isAdded = cartItems.some(
              (cartItem) => cartItem.id === item.id
            );

            return (
              <div key={item.id}>
                {/* Product Info */}
                <div className="flex items-center gap-4 pb-3">
                  <img
                    src={item.imageURL}
                    alt={item.Name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm pb-1">{item.Name}</h3>
                    <p className="text-xs text-gray-500 pb-1 line-clamp-2">
                      {item.description}
                    </p>
                    <p className="text-sm text-gray-700 font-medium pb-1">
                      LE {item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-3 mt-4">
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={isAdded}
                    className={` px-4 py-2 rounded-lg transition flex items-center justify-center gap-2 text-sm font-medium ${
                      isAdded
                        ? "bg-green-100 text-green-700 border border-green-600"
                        : "bg-primary text-white hover:bg-secondary"
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

                {/* Divider */}
                {index !== wishlistItems.length - 1 && (
                  <hr className="border-gray-300 mt-4" />
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-300">
        <Link to="/wishlist">
          <button className="w-full bg-primary hover:bg-secondary text-white py-2 text-sm font-medium transition mb-3 rounded-sm">
            Go to Wishlist
          </button>
        </Link>
      </div>
    </div>
  );
}

export default MiniWishlist;
