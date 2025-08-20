import CategoriesCard from "./components/CategoriesCard/CategoriesCard";

function ProductCategories() {
  const categories = [
    { category: "Bakeries", image: "/images/bakeries.jpg", path: "/bakeries" },
    {
      category: "Chocolates",
      image: "/images/chocolates.jpg",
      path: "/chocolates",
    },
    { category: "Honey", image: "/images/honey.jpg", path: "/honey" },
    { category: "Snacks", image: "/images/snacks.jpg", path: "/snacks" },
    { category: "Meals", image: "/images/meals.jpg", path: "/meals" },
  ];

  return (
    <div className="py-12">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl text-center font-bold text-gray-800">
          Selected <span className="text-primary">Catageroies</span>
        </h2>
        <div className="flex justify-center mt-4">
          <div className="w-16 h-1 bg-primary rounded-full"></div>
        </div>
      </div>
      <div
        className="healthy__container py-12 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] 
                gap-4 sm:gap-6 lg:gap-8 justify-items-center"
      >
        {categories.map((item, index) => (
          <CategoriesCard
            key={index}
            category={item.category}
            image={item.image}
            path={item.path}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductCategories;
