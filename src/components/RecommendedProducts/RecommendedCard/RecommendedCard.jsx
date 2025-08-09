import React from 'react'
import test from '../../../assets/test_img.jpg'

function RecommendedCard() {

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<i key={i} className="fas fa-star" style={{ color: "gold" }}></i>);
      } else if (rating >= i - 0.5) {
        stars.push(<i key={i} className="fas fa-star-half-alt" style={{ color: "gold" }}></i>);
      } else {
        stars.push(<i key={i} className="far fa-star" style={{ color: "gold" }}></i>);
      }
    }
    return stars;
  };


  return (
    <>
      <div className='border-1 border-[#64a30d78] 2xl:w-[24%] md:w-[48%] relative p-5 rounded-xl shadow-lg'>
        <div className='bg-primary w-[15%] absolute rounded-2xl text-center py-1 px-2 text-white font-semibold z-10'>19 LE</div>
        <figure className='text-center'><img className='w-fill transition-transform duration-500 hover:[transform:rotateY(180deg)]' src={test} alt="" /></figure>
        <div className='flex gap-2'>
          <div>{renderStars(4)}</div>
          <p className='text-recommended-rating'>4.4</p>
        </div>
        <p className='text-recommended-black text-base font-medium py-2'>Optimum Nutrition, Gold Standard
          100% Whey Protein Powder</p>
          <div className='flex items-center gap-2'>
            <p className='text-recommended-green font-semibold text-[22px]'>27.99 LE</p>
            <p className='text-recommended-price-gray font-semibold text-[18px] line-through'>34.19 LE</p>
          </div>
          <button className='text-center border-1 bg-transparent hover:bg-recommended-green hover:text-white hover:font-bold transition-all duration-200 w-full py-3 rounded-4xl mt-3 cursor-pointer'>Add To Cart</button>
      </div>
    </>
  )
}

export default RecommendedCard