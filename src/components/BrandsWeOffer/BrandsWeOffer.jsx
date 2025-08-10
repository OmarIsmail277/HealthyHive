import React from 'react'
import BrandsCard from './componenets/BrandsCard/BrandsCard'

function BrandsWeOffer() {
  const brands = [
    {
      brand: "Asdekaa",
      image: "/images/BrandsWeOffer/asdekaa.png",
      // path: "/bakeries"
    },
    {
      brand: "Dina Farms",
      image: "/images/BrandsWeOffer/dinafarms.png",
      // path: "/bakeries"
    },
    {
      brand: "Divol",
      image: "/images/BrandsWeOffer/divol.png",
      // path: "/bakeries"
    },
    {
      brand: "Domty",
      image: "/images/BrandsWeOffer/domty.png",
      // path: "/bakeries"
    },
    {
      brand: "EgyptFood",
      image: "/images/BrandsWeOffer/egyptfood.png",
      // path: "/bakeries"
    },
    {
      brand: "Greencola",
      image: "/images/BrandsWeOffer/greencola.png",
      // path: "/bakeries"
    },
    {
      brand: "HajArafa",
      image: "/images/BrandsWeOffer/hajarafa.png",
      // path: "/bakeries"
    },
    {
      brand: "Marolina",
      image: "/images/BrandsWeOffer/marolina.png",
      // path: "/bakeries"
    },
    {
      brand: "Naturesta",
      image: "/images/BrandsWeOffer/naturesta.png",
      // path: "/bakeries"
    },
    {
      brand: "Rhodes",
      image: "/images/BrandsWeOffer/rhodes.png",
      // path: "/bakeries"
    },

  ];
  return (
    <div className="BrandsWeOffer flex flex-col items-center justify-center p-4 w-4/5 m-auto bg-[#f8faf4] rounded-lg shadow-lg my-10 gap-4">
      <h2 className='text-2xl text-deepGreen font-bold'>Brands We Offer</h2>
      <div className="cards flex flex-wrap justify-center lg:justify-center items-center gap-4">
        {brands.map((item, index) => (
          <BrandsCard key={index}
            brand={item.brand}
            image={item.image}
          // path={item.path}
          />
        ))}

      </div>
    </div>
  )
}

export default BrandsWeOffer