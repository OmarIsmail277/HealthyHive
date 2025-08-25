  import { useSelector } from "react-redux";

function OrderCheckout({onNext}) {

  const { items, shippingMethod } = useSelector((state) => state.cart);

  const subtotal = items.reduce((acc, product) => acc + (product.price * product.quantity), 0)

  const deliveryCost = shippingMethod === "delivery" ? 20 : 0;
  const total = subtotal + deliveryCost

  return (
    <div>
      <h2 className='text-center lg:text-xl text-md font-bold mb-6'>Your Order</h2>
      {items.length === 0 ? (
        <div>
          <p className="h-28 text-center w-full pt-10">There are no orders</p>
        </div>
      ) :( <div className='shadow-md rounded-lg overflow-hidden'>
        <div className='flex justify-between items-center py-4 pl-7 pr-5 bg-gray-100'>
          <h4 className="lg:text-base text-sm">Product</h4>
          <h4 className="lg:text-base text-sm">Total</h4>
        </div>
        <div>
          {items.map((product, index) => (
            <div key={index} className='flex justify-between items-center py-4 lg:px-4 px-2 border-b border-gray-200 gap-2'>
              <div className='flex items-center lg:gap-4 gap-2 w-[85%]'>
                <figure className='lg:w-[15%] w-[25%] rounded-lg overflow-hidden'>
                  <img src={product.imageURL} alt={product.Name} className='w-full h-auto object-contain' />
                </figure>
                <p className="text-xs lg:text-base ">{`${product.Name} x ${product.quantity}`}</p>
              </div>
              <h6 className="lg:text-base text-sm">{product.price * product.quantity}&nbsp;LE</h6>
            </div>
          ))}
        </div>

        <div className='flex justify-between items-center py-3 px-4 bg-gray-100'>
          <h4 className='font-semibold lg:text-base text-xs'>SubTotal</h4>
          <h4 className='font-semibold lg:text-base text-xs'>{subtotal}&nbsp;LE</h4>
        </div>

        <div className="flex justify-between items-center py-2 px-4 bg-gray-100">
          <h4 className="font-semibold lg:text-base text-xs">Shipping</h4>
          <h4 className="font-semibold lg:text-base text-xs">
            {deliveryCost > 0 ? `${deliveryCost} LE` : "Free"}
          </h4>
        </div>

        <div className='flex justify-between items-center py-3 px-4 bg-gray-100'>
          <h4 className='font-bold lg:text-base text-xs'>Total</h4>
          <h4 className='font-bold lg:text-base text-xs'>{total}&nbsp;LE</h4>
        </div>

      </div>
    )}
      <button className="w-full mt-4 bg-primary text-white rounded-lg lg:py-3 py-2  lg:text-lg text-sm hover:bg-secondary transition" onClick={onNext}>
          Next <span className="ml-2">&rarr;</span>
        </button>
    </div>
  )
}

export default OrderCheckout