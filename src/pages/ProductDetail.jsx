import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import RecommendedProducts from "../components/RecommendedProducts/RecommendedProducts";
import ProductDetails from "../components/Detail/ProductDetails";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useProductById } from "../hooks/useProducts";
import Spinner from "../components/Spinner/Spinner";
import AdviceFetch from "../components/FetchAdvice/AdviceFetch";
import SubIcon from "../components/SubIcon/SubIcon";

function ProductDetail() {
  const { id } = useParams();

  const { data: product, isPending } = useProductById(id);

  if (isPending) return <Spinner />;

  return (
    <div className="bg-gray-50">
      <Navbar />
      {/* <DetailCard /> */}
      <ProductDetails product={product} />
      {/* Related Section */}
      <RecommendedProducts
        title={
          <h2 className="text-3xl md:text-4xl text-center font-bold text-gray-800">
            Related <span className="text-primary">Products</span>
          </h2>
        }
        filterFn={(p) =>
          p.subCategory === product?.subCategory && p.id !== product?.id
        }
      />
      <Footer />
      <AdviceFetch />
      <SubIcon />
    </div>
  );
}

export default ProductDetail;
