import { getProducts } from "../../services/apiProducts";
import { useQuery } from "@tanstack/react-query";
import AddToCartButton from "../../Shared/components/AddToCartButton";
import WishlistToggle from "../../Shared/components/WishlistToggle";
import { useNavigate } from "react-router-dom";

export default function Featuredproducts() {
  const navigate = useNavigate();

  const handleNavigate = (product) => {
    navigate(`/product/${product.id}`);
  };

  const { isPending, data: Products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isPending) return <p>Loading...</p>;

  const randomThree = Products?.sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <section className="healthy__container py-12">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl text-center font-bold text-gray-800">
          Featured <span className="text-primary">Healthy Products</span>
        </h2>
        <div className="flex justify-center mt-4">
          <div className="w-16 h-1 bg-primary rounded-full"></div>
        </div>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Discover our premium selection of nutritious and delicious options
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
        {randomThree.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden relative flex flex-col hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl hover:bg-white duration-300 cursor-pointer"
            onClick={() => handleNavigate(product)}
          >
            {/* Heart Icon */}
            <WishlistToggle
              product={product}
              className="absolute top-4 right-4 text-3xl cursor-pointer z-20"
            />
            {/* Image Section (Bigger now) */}
            <div className="relative h-72 sm:h-64 overflow-hidden flex-shrink-0">
              <img
                src={product.imageURL}
                alt={product.Name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* product Body */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                {/* Title */}
                <p className="text-gray-900 text-base font-semibold mt-2 leading-snug line-clamp-2">
                  {product.Name}
                </p>

                <div className="flex items-center bg-amber-100 px-2 py-1 rounded-full">
                  <span className="text-amber-700 text-sm font-bold">
                    {product.rating}
                  </span>
                  <svg
                    className="w-4 h-4 text-amber-500 ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>

              {/* Fixed height description (smaller now) */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
                {product.description}
              </p>

              {/* Price + Add to Cart */}
              <div className="mt-auto flex flex-col gap-3">
                {/* Price */}
                <div className="flex items-center gap-3 mt-3">
                  <p className="text-green-600 font-bold text-xl">
                    {product.price - product.discount} LE
                  </p>
                  {product.discount > 0 && (
                    <p className="text-gray-400 font-semibold text-lg line-through">
                      {product.price} LE
                    </p>
                  )}
                </div>

                {/* Add to Cart Button */}
                <AddToCartButton product={product} variant="primary" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
