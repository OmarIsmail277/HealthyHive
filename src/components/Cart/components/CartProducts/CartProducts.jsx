import test from "../../../../assets/test_img.jpg";
import { FaPlus, FaMinus } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../../../../store/cartSlice";

function CartProducts({ id, title, price, image }) {
  const dispatch = useDispatch();

  // get the product from Redux cart
  const item = useSelector((state) =>
    state.cart.items.find((product) => product.id === id)
  );

  if (!item) return <h2>Cart is Empty</h2>;

  return (
    <div className="2xl:w-3/4 w-full">
      <div className="lg:flex justify-between items-center hidden">
        <p className="text-[#6B7280] w-[20%] text-center font-medium">
          Product
        </p>
        <div className="flex w-[50%] justify-between">
          <div className="flex justify-between w-[50%] ">
            <p className="text-[#6B7280] font-medium">Price</p>
            <p className="text-[#6B7280] font-medium">Quantity</p>
          </div>
          <p className="text-[#6B7280] w-[70%] text-center font-medium pl-5.5">
            Subtotal
          </p>
        </div>
      </div>

      <div className="lg:flex lg:justify-between lg:items-center mt-4 lg:mt-2 border-b-1 border-gray-400 pb-3 mb-4 relative lg:static">
        <div className="flex items-center lg:w-[45%]">
          <figure className="lg:w-[25%] w-[50%]">
            <img src={image || test} alt={title} />
          </figure>
          <p className="font-semibold lg:text-base text-md">{title}</p>
        </div>

        <div className="flex flex-col sm:flex-row lg:w-[54%] items-center sm:justify-between sm:items-start lg:items-center mt-3 sm:mt-0">
          {/* Price */}
          <div className="flex justify-between sm:flex-col sm:items-center sm:w-[20%] w-[95%]">
            <label className="text-gray-500 lg:hidden sm:mb-4">Price :</label>
            <p className="flex justify-center font-semibold ml-1 lg:text-[22px] ">
              {price} LE
            </p>
          </div>

          {/* Quantity */}
          <div className="sm:w-[30%] sm:flex justify-center sm:mr-[50px] w-[100%] border-b-1 mb-2 border-gray-300 sm:border-none">
            <div className="flex justify-between items-center sm:flex-col w-full">
              <label className="text-gray-500 lg:hidden ml-1 sm:ml-0 sm:mb-1 lg:mb-0">
                Quantity :
              </label>
              <div className="bg-gray-200 lg:w-[95%] sm:w-[85%] md:w-[68%] w-[33%] lg:py-2.5 py-1 my-2 flex justify-center items-center gap-5.5 lg:gap-7 rounded-4xl">
                <FaMinus
                  className="cursor-pointer font-bold text-xs sm:text-base"
                  onClick={() => dispatch(decreaseQuantity(id))}
                />
                <p className="sm:w-5 text-center sm:scale-130 font-bold">
                  {item.quantity}
                </p>
                <FaPlus
                  className="cursor-pointer font-bold text-xs sm:text-base"
                  onClick={() => dispatch(increaseQuantity(id))}
                />
              </div>
            </div>
          </div>

          {/* Subtotal */}
          <div className="flex justify-between sm:w-[20%] w-[95%] sm:flex-col sm:text-center">
            <label className="text-gray-500 lg:hidden sm:mb-4">Total :</label>
            <p className="sm:w-[100%] font-bold md:mr-[20px] text-primary lg:flex lg:justify-start lg:text-[22px]">
              {price * item.quantity} LE
            </p>
          </div>

          {/* Remove */}
          <GiCancel
            className="lg:text-3xl md:text-xl cursor-pointer text-red-600 absolute top-2 right-2 md:top-5 md:right-5 lg:static"
            onClick={() => dispatch(removeItem(id))}
          />
        </div>
      </div>
    </div>
  );
}

export default CartProducts;
