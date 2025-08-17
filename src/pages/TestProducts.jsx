import { useEffect } from "react";
import { getProducts } from "../services/apiProducts";

function TestProducts() {
  useEffect(function () {
    getProducts().then((data) => console.log(data));
  }, []);

  return <div></div>;
}

export default TestProducts;
