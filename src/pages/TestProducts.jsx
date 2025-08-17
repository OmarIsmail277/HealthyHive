// import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/apiProducts";
import Spinner from "../components/Spinner/Spinner";

import ProductCard from "../components/ProductCard";

function TestProducts() {
  //   useEffect(function () {
  //     getProducts().then((data) => console.log(data));
  //   }, []);

  // ReactQuery will do that work, instead of doing it manually

  const { isLoading, data: products } = useQuery({
    queryKey: ["product"],
    queryFn: getProducts,
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}

export default TestProducts;
