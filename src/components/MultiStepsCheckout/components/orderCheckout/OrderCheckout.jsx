import test from '../../../../assets/test_img.jpg'

function OrderCheckout({onNext}) {

  const products = [
    { name: "Headsets", price: 129, quantity: 2 },
    { name: "Headsets", price: 129, quantity: 2 }
  ];

  const subtotal = products.reduce((acc, product) => acc + (product.price * product.quantity), 0)

  return (
    <div>
      <h2 className='text-center text-xl font-bold mb-6'>Your Order</h2>
      <div className='shadow-md rounded-lg overflow-hidden'>
        <div className='flex justify-between items-center py-4 pl-7 pr-5 bg-gray-100'>
          <h4>Product</h4>
          <h4>Total</h4>
        </div>
        <div>
          {products.map((product, index) => (
            <div key={index} className='flex justify-between items-center py-4 px-4 border-b border-gray-200'>
              <div className='flex items-center gap-4'>
                <figure className='w-[15%] rounded-lg overflow-hidden'>
                  <img src={test} alt={product.name} className='w-full h-auto object-contain' />
                </figure>
                <p>{`${product.name} x ${product.quantity}`}</p>
              </div>
              <h6>{product.price * product.quantity}&nbsp;LE</h6>
            </div>
          ))}
        </div>
        <div className='flex justify-between items-center py-4 pl-7 pr-4 bg-gray-100'>
          <h4 className='font-semibold'>SubTotal</h4>
          <h4 className='font-semibold'>{subtotal}&nbsp;LE</h4>
        </div>
      </div>
      <button className="w-full mt-4 bg-button text-white rounded-lg py-3 text-lg hover:bg-button-hover transition" onClick={onNext}>
          Next <span className="ml-2">&rarr;</span>
        </button>
    </div>
  )
}

export default OrderCheckout