import CategoriesCard from "./components/CategoriesCard/CategoriesCard";

function ProductCategories() {
  const categories = [
    {
      category: "Bakeries",
      image: "/images/bakeries.jpg",
      path: "/bakeries",
    },
    {
      category: "Chocolates",
      image: "/images/chocolates.jpg",
      path: "/chocolates",
    },
    {
      category: "Honey",
      image: "/images/honey.jpg",
      path: "/honey",
    },
    {
      category: "Snacks",
      image: "/images/snacks.jpg",
      path: "/snacks",
    },
    {
      category: "Meals",
      image: "/images/meals.jpg",
      path: "/meals",
    },
  ];

  return (
    <div className="product-categories w-4/5 healthy__container section-padding">
      <h2 className="text-recommended-green text-2xl">Product Categories</h2>
      <div className="cards flex flex-wrap justify-center lg:justify-start items-center gap-4">
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
