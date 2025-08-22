import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlistItem } from "../../../store/wishlistSlice";
import { toggleCartItem } from "../../../store/cartSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteProduct } from "../../../services/apiProducts";
import AddToCartButton from "../../../Shared/components/AddToCartButton";


function RecommendedCard({ product }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate(`/product/${product.id}`);
  };


  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<i key={i} className="fas fa-star text-yellow-400"></i>);
      } else if (rating >= i - 0.5) {
        stars.push(
          <i key={i} className="fas fa-star-half-alt text-yellow-400"></i>
        );
      } else {
        stars.push(<i key={i} className="far fa-star text-yellow-400"></i>);
      }
    }
    return stars;
  };

  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product successfully deleted!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },

    onError: (err) => toast.error(err.message),
  });

  return (
    <div className="flex flex-col justify-between relative border border-[#64a30d78] w-[370px] p-5 rounded-xl shadow-md bg-white cursor-pointer" onClick={handleNavigate}>
      {/* Price Tag */}
      <div className="bg-primary absolute top-4 left-4 rounded-xl px-3 py-1 text-white font-semibold z-10">
        {product.discount} LE
      </div>

      {/* Wishlist Icon */}

      <button
        onClick={(e) => {
          e.stopPropagation()
          dispatch(toggleWishlistItem(product))
        }}
        className="absolute top-4 right-4 text-3xl cursor-pointer z-20"
      >
        <FaHeart
          className={`transition-colors duration-300 ${isInWishlist
            ? "text-primary hover:text-secondary"
            : "text-gray-400 hover:text-emerald-300"
            }`}
        />
      </button>

      {/* Image with Flip Animation */}
      <figure className="text-center perspective">
        <div className="relative w-full h-48 transition-transform duration-700 transform-style-preserve-3d hover:[transform:rotateY(180deg)]">
          <img
            className="absolute inset-0 w-full h-full object-contain backface-hidden"
            src={product.imageURL}
            alt="Front"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-green-100 backface-hidden [transform:rotateY(180deg)] rounded-lg">
            <p className="text-gray-700 font-semibold">More Details</p>
          </div>
        </div>
      </figure>

      {/* Rating */}
      <div className="flex items-center gap-2 mt-3">
        <div className="flex">{renderStars(product.rating)}</div>
        <p className="text-gray-600 text-sm font-medium">{product.rating}</p>
      </div>

      {/* Title */}
      <p className="text-gray-900 text-base font-semibold mt-2 leading-snug line-clamp-2">
        {product.Name}
      </p>

      {/* Price */}
      <div className="flex items-center gap-3 mt-3">
        <p className="text-green-600 font-bold text-xl">{product.price - product.discount} LE</p>
        {product.discount > 0 &&
          <p className="text-gray-400 font-semibold text-lg line-through">
            {product.price} LE
          </p>}
      </div>

      {/* Add to Cart Button */}
      <AddToCartButton product={product} variant="outlined" />
    </div>
  );
}

export default RecommendedCard;
