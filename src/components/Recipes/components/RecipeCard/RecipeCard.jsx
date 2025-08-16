
function RecipeCard({ recipe, onClick }) {
  return (
    <div>
      <div
        className="min-w-[15%] h-[320px] border border-[#64a30d78] rounded-lg shadow hover:shadow-lg transition-all duration-200 cursor-pointer"
        onClick={onClick}>
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="w-full h-54 object-cover rounded-t-lg" />
        <div className="px-3 py-4">
          <h2 className="font-semibold text-[16px]">{recipe.title}</h2>
          <p className="text-gray-500 text-[14px] mt-2">By {recipe.publisher}</p>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard