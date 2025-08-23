
function RecipeCard({ recipe }) {
  return (
    <div
      className="cursor-pointer group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-md border border-gray-200">
      <div className="relative">
        <img
          src={recipe.image_url || recipe.image}
          alt={recipe.title}
          className="w-full h-54 object-cover group-hover:brightness-90 transition-all duration-300"
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </div>

      <div className="p-4 flex flex-col justify-between">
        <div className="">
          <h2 className="font-bold text-lg text-gray-900 line-clamp-2">
            {recipe.title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">👨‍🍳 {recipe.publisher}</p>
        </div>
        <p className="text-sm text-green-600 font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          Click for details →
        </p>
      </div>
    </div>
  );
}

export default RecipeCard;

