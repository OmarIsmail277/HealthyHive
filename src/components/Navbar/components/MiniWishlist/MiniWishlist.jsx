import { FiX } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlistItem } from "../../../../store/wishlistSlice";
import { addToCart } from "../../../../store/cartSlice";
import image from "../../../../assets/test_img.jpg";

function MiniWishlist({ onClose }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    // remove from wishlist after adding to cart
    dispatch(toggleWishlistItem({ id: item.id }));
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

      {/* Wishlist Items (limit height to 2 items) */}
      <div className="p-4 space-y-4 overflow-y-auto flex-1 max-h-[220px] custom-scrollbar">
        {wishlistItems.length === 0 ? (
          <p className="text-gray-500 text-center">Your wishlist is empty.</p>
        ) : (
          wishlistItems.map((item, index) => (
            <div key={item.id}>
              {/* Product Info */}
              <div className="flex items-center gap-4 pb-3">
                <img
                  src={item.imageURL}
                  alt={item.Name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{item.Name}</h3>
                  <p className="text-xs text-gray-500">{item.description}</p>
                  <p className="text-xs text-gray-700 font-medium">
                    LE {item.price.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(item)}
                className="w-full bg-white text-gray-700 border border-gray-400 py-2 text-sm font-medium rounded-sm transition-colors duration-300 hover:bg-secondary hover:text-white"
              >
                Add to Cart
              </button>

              {/* Divider */}
              {index !== wishlistItems.length - 1 && (
                <hr className="border-gray-300 mt-4" />
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer - Go to Wishlist Button */}
      <div className="p-4 border-t border-gray-300">
        <button className="w-full bg-primary hover:bg-secondary text-white py-2 text-sm font-medium transition mb-3 rounded-sm">
          Go to Wishlist
        </button>
      </div>
    </div>
  );
}

export default MiniWishlist;
