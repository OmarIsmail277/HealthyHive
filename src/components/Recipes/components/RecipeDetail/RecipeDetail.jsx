import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );
        const data = await res.json();
        setRecipe(data.data.recipe);
        console.log(data.data.recipe)
      } catch (err) {
        console.error("Error fetching recipe:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-red-600">
          Recipe not found 😢
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">

        <div className="relative">
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="w-full h-80 object-cover"
          />
          <h1 className="absolute bottom-4 left-4 text-3xl font-bold text-white drop-shadow-lg">
            {recipe.title}
          </h1>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-700 font-medium">
              👨‍🍳Publisher: {" "}
              <span className="text-green-600 font-semibold">
                {recipe.publisher}
              </span>
            </p>
            <a
              href={recipe.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 !text-white px-5 py-2 rounded-lg font-medium transition">
              View Full Recipe
            </a>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 p-4 rounded-lg text-center shadow-sm">
              <p className="text-lg font-semibold text-green-700">
                {recipe.cooking_time} min
              </p>
              <p className="text-sm text-gray-600">⏱️Cooking Time</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center shadow-sm">
              <p className="text-lg font-semibold text-green-700">
                {recipe.servings}
              </p>
              <p className="text-sm text-gray-600">🍽️Servings</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🥕Ingredients
          </h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ing, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-gray-700"
              >
                <span className="text-green-500">✔</span>
                {ing.quantity ? `${ing.quantity} ${ing.unit}` : ""} {ing.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;

