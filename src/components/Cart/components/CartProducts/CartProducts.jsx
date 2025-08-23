import { useSelector } from "react-redux";
import CartProduct from "./components/CartProduct/CartProduct";

function CartProducts() {

  // get the product from Redux cart
  const { items } = useSelector((state) => state.cart);

  if (!items || items.length === 0) return <h2 className="2xl:w-3/4 w-full text-center 2xl:pt-45 py-20">Cart is Empty</h2>;

  return (
    <div className="2xl:w-[73%] w-full">
      {items.map((item) =>(
        <CartProduct key ={item.id}  product={item} />
      ))
      }

    </div>
  );
}

export default CartProducts;
