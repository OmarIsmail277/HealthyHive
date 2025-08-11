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
    <div className="product-categories w-4/5 mx-auto py-10">
      <h2 className="subTitle">
        Product Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
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