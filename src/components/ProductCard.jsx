function ProductCard({ product }) {
  const { Name, imageURL } = product;

  return (
    <div className="flex items-center w-80 h-28 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer">
      <img src={imageURL} alt={Name} className="w-28 h-full object-cover" />
      <div className="p-4 flex-1">
        <p className="text-base font-semibold text-gray-800">{Name}</p>
      </div>
    </div>
  );
}

export default ProductCard;
