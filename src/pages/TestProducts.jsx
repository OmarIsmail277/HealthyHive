// import { useEffect } from "react";
import { useAllProducts } from "../hooks/useProducts";
import Spinner from "../components/Spinner/Spinner";

import ProductCard from "../components/ProductCard";

function TestProducts() {
  //   useEffect(function () {
  //     getProducts().then((data) => console.log(data));
  //   }, []);

  // ReactQuery will do that work, instead of doing it manually

  const { isPending, data: products } = useAllProducts();

  if (isPending) return <Spinner />;

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}

export default TestProducts;
