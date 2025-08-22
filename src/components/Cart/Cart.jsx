import CartProducts from "../Cart/components/CartProducts/CartProducts";
import CartCheckout from "../Cart/components/CartCheckout/CartCheckout";

function Cart() {
  return (
    <>
      <div className="2xl:flex 2xl:gap-8 my-8">
        <CartProducts />
        <CartCheckout />
      </div>
    </>
  );
}

export default Cart;
