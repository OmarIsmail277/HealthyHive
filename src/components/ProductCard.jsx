import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../services/apiProducts";
import toast from "react-hot-toast";

function ProductCard({ product }) {
  const { id, Name, imageURL } = product;
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
    <div className="flex items-center w-80 h-28 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-md">
      {/* Image */}
      <img
        src={imageURL}
        alt={Name}
        className="w-28 h-full object-cover border-r border-gray-200"
      />

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <p className="text-base font-semibold text-gray-800 line-clamp-1">
          {Name}
        </p>

        <button
          disabled={isDeleting}
          onClick={() => mutate(id)}
          className={`mt-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200
            ${
              isDeleting
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
