import { useDispatch } from "react-redux";
import test from "../../../../../../assets/test_img.jpg";
import { FaPlus, FaMinus } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { increaseQuantity, decreaseQuantity, removeFromCart} from "../../../../../../store/cartSlice";

function CartProduct({ product }) {

    const dispatch = useDispatch();

    return (
        <div>
            <div className="lg:flex lg:justify-between lg:items-center mt-4 lg:mt-2 border-b-1 border-gray-400 pb-3 mb-4 relative lg:static">
                <div className="flex items-center lg:w-[45%]">
                    <figure className="lg:w-[25%] w-[50%] lg:ml-[70px] ml-0">
                        <img src={product?.imageURL || test} alt={product?.Name} />
                    </figure>
                    <p className="font-semibold lg:text-base text-md">{product?.Name}</p>
                </div>

                <div className="flex flex-col sm:flex-row lg:w-[54%] items-center sm:justify-between sm:items-start lg:items-center mt-3 sm:mt-0">
                    {/* Price */}
                    <div className="flex justify-between sm:flex-col sm:items-center sm:w-[20%] w-[95%]">
                        <label className="text-gray-500 lg:hidden sm:mb-4">Price :</label>
                        <p className="flex justify-center font-semibold ml-1 lg:text-[22px] ">
                            {product?.price} LE
                        </p>
                    </div>

                    {/* Quantity */}
                    <div className="sm:w-[30%] sm:flex justify-center sm:mr-[50px] w-[100%] border-b-1 mb-2 border-gray-300 sm:border-none">
                        <div className="flex justify-between items-center sm:flex-col w-full">
                            <label className="text-gray-500 lg:hidden ml-1 sm:ml-0 sm:mb-1 lg:mb-0">
                                Quantity :
                            </label>
                            <div className="bg-gray-200 lg:w-[80%] sm:w-[70%] md:w-[55%] w-[27%] lg:py-2.5 py-1 my-2 flex justify-center items-center gap-5.5 lg:gap-7 rounded-4xl">

                                <button>
                                    <FaMinus className="cursor-pointer font-bold text-xs sm:text-base"
                                        onClick={() => dispatch(decreaseQuantity(product?.id))}/>
                                </button>
                                <p className="sm:w-5 text-center sm:scale-130 font-bold">
                                    {product?.quantity}
                                </p>
                                <button>
                                    <FaPlus className="cursor-pointer font-bold text-xs sm:text-base"
                                        onClick={() => dispatch(increaseQuantity(product?.id))}/>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Subtotal */}
                    <div className="flex justify-between sm:w-[20%] w-[95%] sm:flex-col sm:text-center">
                        <label className="text-gray-500 lg:hidden sm:mb-4">Total :</label>
                        <p className="sm:w-[100%] font-bold md:mr-[20px] lg:ml-3 text-primary lg:flex lg:justify-start lg:text-[22px]">
                            {product?.price * product?.quantity} LE
                        </p>
                    </div>

                    {/* Remove */}
                    <GiCancel
                        className="lg:text-3xl md:text-xl cursor-pointer text-red-600 absolute top-2 right-2 md:top-5 md:right-5 lg:static"
                        onClick={() => dispatch(removeFromCart(product?.id))}
                    />
                </div>
            </div>
        </div>
    )
}

export default CartProduct