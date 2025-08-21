import { useSelector } from "react-redux";
import CartProduct from "./components/CartProduct/CartProduct";

function CartProducts() {

  // get the product from Redux cart
  const { items } = useSelector((state) => state.cart);

  if (!items || items.length === 0) return <h2 className="2xl:w-3/4 w-full text-center 2xl:pt-45 py-20">Cart is Empty</h2>;

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

      {items.map((item) =>(
        <CartProduct key ={item.id}  product={item} />
      ))
      }

    </div>
  );
}

export default CartProducts;
