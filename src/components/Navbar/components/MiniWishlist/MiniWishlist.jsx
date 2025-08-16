import { FiX } from "react-icons/fi";
import image from "../../../../assets/test_img.jpg";

function MiniWishlist({ onClose }) {
  const wishlistItems = [
    {
      id: 1,
      name: "Fresh Apples",
      description: "Optimum Nutrition Gold Standard",
      price: 4500,
      image,
    },
    {
      id: 2,
      name: "Organic Bread",
      description: "Optimum Nutrition Gold Standard",
      price: 5000,
      image,
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-bold">Your Wishlist</h2>
        <button onClick={onClose} className="lg:hidden">
          <FiX size={20} />
        </button>
      </div>

      {/* Wishlist Items */}
      <div className="p-4 space-y-4 overflow-y-auto flex-1">
        {wishlistItems.map((item, index) => (
          <div key={item.id}>
            {/* Product Info */}
            <div className="flex items-center gap-4 pb-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{item.name}</h3>
                <p className="text-xs text-gray-500">{item.description}</p>
                <p className="text-xs text-gray-700 font-medium">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full bg-white text-button border border-green-600 py-2 text-sm font-medium rounded-sm transition-colors duration-300 hover:bg-green-600 hover:text-white">
              Add to Cart
            </button>

            {/* Divider */}
            {index !== wishlistItems.length - 1 && (
              <hr className="border-gray-600 mt-4" />
            )}
          </div>
        ))}
      </div>

      {/* Footer - Go to Wishlist Button */}
      <div className="p-4 border-t">
        <button className="w-full bg-button hover:bg-green-500 text-white py-2 text-sm font-medium transition mb-3 rounded-sm">
          Go to Wishlist
        </button>
      </div>
    </div>
  );
}

export default MiniWishlist;
