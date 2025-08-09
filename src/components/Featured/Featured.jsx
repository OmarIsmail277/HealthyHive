export default function FeaturedProducts() {
  return (
    <>
      <h2 className="subTitle !mx-20">Featured Products</h2>
      <div className="flex flex-wrap gap-[1.5625rem] justify-center">
        <div className="md:w-[30%] lg:w-[30%] sm:w-[80%] h-[16.25rem] bg-white rounded-xl shadow-lg p-5 flex gap-5 hover:shadow-xl transition-shadow duration-300">
          <div className="flex-shrink-0 md:w-[22%] sm:w-[22%] h-full flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
            <img
              src="/images/balance_bar_png.png"
              alt="Balance Protein Bar"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Balance Protein Bar
              </h3>
              <p className="text-gray-600 text-sm overflow-hidden text-ellipsis line-clamp-3 leading-relaxed">
                BALANCE BAR YOGURT HONEY PEANUT NUTRITION BARS are a great
                tasting snack with 5g of protein per bar. Balance Bar Yogurt
                Honey Peanut bars are a nutritious treat anytime of day.
              </p>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
              <span className="text-green-600 font-bold text-lg">LE20.00</span>
              <button className="bg-button text-white px-4 py-2 rounded-lg md:w-[40%] hover:bg-green-700 transition-colors duration-200">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="md:w-[30%] sm:w-[80%] h-[16.25rem] bg-white rounded-xl shadow-lg p-5 flex gap-5 hover:shadow-xl transition-shadow duration-300">
          <div className="flex-shrink-0 md:w-[22%] sm:w-[22%]  h-full flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
            <img
              src="/images/vcola.png"
              alt="V-cola"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                V-COLA
              </h3>
              <p className="text-gray-600 text-sm overflow-hidden text-ellipsis line-clamp-3 leading-relaxed">
                Creamy, dairy-free milk alternative made from premium quality
                almonds for a healthy lifestyle.
              </p>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
              <span className="text-green-600 font-bold text-lg">LE15.00</span>
              <button className="bg-button text-white px-4 py-2 rounded-lg md:w-[40%] hover:bg-green-700 transition-colors duration-200">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="md:w-[30%] sm:w-[80%] h-[16.25rem] bg-white rounded-xl shadow-lg p-5 flex gap-5 hover:shadow-xl transition-shadow duration-300">
          <div className="flex-shrink-0 md:w-[22%] sm:w-[22%] h-full flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/350x180"
              alt="Herbal Shampoo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Herbal Shampoo
              </h3>
              <p className="text-gray-600 text-sm overflow-hidden text-ellipsis line-clamp-3 leading-relaxed">
                Gentle and nourishing shampoo infused with natural herbs to
                promote healthy hair growth.
              </p>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
              <span className="text-green-600 font-bold text-lg">LE50.00</span>
              <button className="bg-button text-white px-4 py-2 rounded-lg md:w-[40%] hover:bg-green-700 transition-colors duration-200 pointer-cursor">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
