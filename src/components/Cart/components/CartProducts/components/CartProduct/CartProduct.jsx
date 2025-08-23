import { useDispatch } from "react-redux";
import test from "../../../../../../assets/test_img.jpg";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../../../../../../store/cartSlice";

function CartProduct({ product }) {
    const dispatch = useDispatch();

    return (
        <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 relative">
            {/* Remove Button - Positioned for both mobile and desktop */}
            <button 
                onClick={() => dispatch(removeFromCart(product?.id))}
                className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                aria-label="Remove item"
            >
                <FaTrash className="text-sm" />
            </button>

            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 pt-1">
                {/* Product Image & Name */}
                <div className="flex items-center lg:w-[45%]">
                    <div className="w-20 h-20 lg:w-28 lg:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                        <img 
                            src={product?.imageURL || test} 
                            alt={product?.Name} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="ml-4 lg:ml-6 flex-1">
                        <h3 className="font-semibold text-gray-900 text-base lg:text-lg mb-1 line-clamp-2">
                            {product?.Name}
                        </h3>
                        <p className="text-green-600 font-medium text-base lg:hidden">
                            {product?.price} LE
                        </p>
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6 items-center">
                    {/* Price - Desktop */}
                    <div className="hidden lg:flex flex-col items-center">
                        <span className="text-gray-500 text-sm mb-1">Price</span>
                        <p className="font-semibold text-gray-900 text-xl">
                            {product?.price} LE
                        </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="col-span-2 sm:col-span-1 flex flex-col items-center">
                        <span className="text-gray-500 text-sm mb-2 lg:mb-3">Quantity</span>
                        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1 lg:px-4 lg:py-2">
                            <button 
                                onClick={() => dispatch(decreaseQuantity(product?.id))}
                                className="w-7 h-7 lg:w-8 lg:h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors"
                            >
                                <FaMinus className="text-xs" />
                            </button>
                            
                            <span className="font-bold text-gray-900 min-w-[1.5rem] lg:min-w-[2rem] text-center">
                                {product?.quantity}
                            </span>
                            
                            <button 
                                onClick={() => dispatch(increaseQuantity(product?.id))}
                                className="w-7 h-7 lg:w-8 lg:h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors"
                            >
                                <FaPlus className="text-xs" />
                            </button>
                        </div>
                    </div>

                    {/* Subtotal */}
                    <div className="col-span-2 sm:col-span-1 flex flex-col items-center">
                        <span className="text-gray-500 text-sm mb-1">Subtotal</span>
                        <p className="font-bold text-green-700 text-lg lg:text-xl">
                            {product?.price * product?.quantity} LE
                        </p>
                    </div>
                </div>
            </div>

            {/* Mobile Price Display */}
            <div className="lg:hidden mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-gray-600">Item Total:</span>
                <span className="font-semibold text-green-700">{product?.price * product?.quantity} LE</span>
            </div>
        </div>
    );
}

export default CartProduct;