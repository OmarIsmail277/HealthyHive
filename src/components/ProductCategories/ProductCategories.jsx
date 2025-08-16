import CategoriesCard from "./components/CategoriesCard/CategoriesCard";

function ProductCategories() {
  const categories = [
    { category: "Bakeries", image: "/images/bakeries.jpg", path: "/bakeries" },
    { category: "Chocolates", image: "/images/chocolates.jpg", path: "/chocolates" },
    { category: "Honey", image: "/images/honey.jpg", path: "/honey" },
    { category: "Snacks", image: "/images/snacks.jpg", path: "/snacks" },
    { category: "Meals", image: "/images/meals.jpg", path: "/meals" },
  ];

  return (
<div className="healthy__container py-12 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] 
                gap-4 sm:gap-6 lg:gap-8 justify-items-center">
  {categories.map((item, index) => (
    <CategoriesCard
      key={index}
      category={item.category}
      image={item.image}
      path={item.path}
    />
  ))}
</div>

  );
}

export default ProductCategories;
