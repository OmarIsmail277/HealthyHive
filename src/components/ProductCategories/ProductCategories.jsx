import { useQuery } from "@tanstack/react-query";
import CategoriesCard from "./components/CategoriesCard/CategoriesCard";
import { getProducts } from "../../services/apiProducts";

function ProductCategories() {
  const categories = [
    { category: "Bakeries", image: "/images/Categories/bakeries.jpg", path: "/products?mainCategory=bakery" },
    {
      category: "Shampoo",
      image: "/images/Categories/shampoo.jpg",
      path: "/products?mainCategory=personal+care&subCategory=shampoo",
    },
    { category: "Herbs", image: "/images/Categories/herbs.jpg", path: "/products?mainCategory=drinks&subCategory=herbs" },
    { category: "Dairy", image: "/images/Categories/dairy.jpg", path: "/products?mainCategory=food&subCategory=dairy" },
    { category: "Meals", image: "/images/Categories/meals.jpg", path: "/products?mainCategory=meals" },
  ];

  return (
    <div className=" py-12">
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
                gap-4 sm:gap-6 lg:gap-8 justify-items-between"
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
