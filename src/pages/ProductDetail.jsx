import React from 'react'
import DetailCard from "../components/Detail/DetailCard"
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import RecommendedProducts from '../components/RecommendedProducts/RecommendedProducts'
import ProductDetails from '../components/Detail/ProductDetails'

function ProductDetail() {
  return (
    <div className='bg-gray-50'>
      <Navbar />
      {/* <DetailCard /> */}
      <ProductDetails/>
      <RecommendedProducts/>
      <Footer />
    </div>

  )
}

export default ProductDetail