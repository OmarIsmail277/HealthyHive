import React from "react";
import BrandsCard from "./componenets/BrandsCard/BrandsCard";

function BrandsWeOffer() {
  const brands = [
    {
      brand: "Asdekaa",
      image: "/images/BrandsWeOffer/asdekaa.png",
    },
    {
      brand: "Dina Farms",
      image: "/images/BrandsWeOffer/dinafarms.png",
    },
    {
      brand: "Divol",
      image: "/images/BrandsWeOffer/divol.png",
    },
    {
      brand: "Domty",
      image: "/images/BrandsWeOffer/domty.png",
    },
    {
      brand: "EgyptFood",
      image: "/images/BrandsWeOffer/egyptfood.png",
    },
    {
      brand: "Greencola",
      image: "/images/BrandsWeOffer/greencola.png",
    },
    {
      brand: "HajArafa",
      image: "/images/BrandsWeOffer/hajarafa.png",
    },
    {
      brand: "Marolina",
      image: "/images/BrandsWeOffer/marolina.png",
    },
    {
      brand: "Naturesta",
      image: "/images/BrandsWeOffer/naturesta.png",
    },
    {
      brand: "Corona",
      image: "/images/BrandsWeOffer/corona.svg",
    },
    {
      brand: "Lychee",
      image: "/images/BrandsWeOffer/lychee.png",
    },
    {
      brand: "Raw African",
      image: "/images/BrandsWeOffer/raw.webp",
    },
    {
      brand: "Evolve Nutrition Zero",
      image: "/images/BrandsWeOffer/zero.jpg",
    },
    {
      brand: "Juhayna",
      image: "/images/BrandsWeOffer/juhayna.png",
    },
  ];
  return (
    <div className='pt-15 bg-[#f8faf4] '>
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl text-center font-bold text-gray-800">
          Brands <span className="text-primary">We Offer</span>
        </h2>
        <div className="flex justify-center mt-4">
          <div className="w-16 h-1 bg-primary rounded-full"></div>
        </div>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Explore below a list of our trusted healthy brands and product
          providers
        </p>
      </div>
      <div className="BrandsWeOffer w-full flex flex-col items-center justify-center p-6  m-auto rounded-2xl shadow-lg  gap-4">
        {/* <h2 className='text-2xl text-deepGreen font-bold'>Brands We Offer</h2> */}
        <div className="cards flex flex-wrap justify-center lg:justify-center items-center gap-4 p-6">
          {brands.map((item, index) => (
            <BrandsCard key={index} brand={item.brand} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BrandsWeOffer;
