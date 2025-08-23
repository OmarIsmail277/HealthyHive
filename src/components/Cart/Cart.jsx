import CartProducts from "../Cart/components/CartProducts/CartProducts";
import CartCheckout from "../Cart/components/CartCheckout/CartCheckout";

function Cart() {
  return (
    <div className="healthy__container py-12">
      <div className="flex flex-col 2xl:flex-row gap-8">
        <CartProducts />
        <CartCheckout />
      </div>
    </div>
  );
}

export default Cart;
