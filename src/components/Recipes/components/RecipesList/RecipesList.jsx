import { useState, useEffect } from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';

function RecipesList() {
  const [recipes, setRecipes] = useState({});
  const [query, setQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Default keywords to simulate "all recipes"
  const Keywords = [
    "garlic",
    "lentil",
    "carrot",
    "zucchini",
    "tomato",
    "spinach",
    "apple",
    "mango",
    "strawberry",
    "broccoli",

  ];

  // On first load: fetch recipes for all default keywords
  useEffect(() => {
    async function loadAllRecipes() {
      let groupedResults = {};

      for (const keyword of Keywords) {
        const res = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes?search=${keyword}`
        );
        const data = await res.json();

        // Limit to 25 recipes per group
        if (data?.data?.recipes?.length) {
          groupedResults[keyword] = data.data.recipes.slice(0, 25);
        }
      }

      setRecipes(groupedResults);
    }
    loadAllRecipes();
  }, []);

  // Search recipes and display under "Search results"
  const searchRecipes = async () => {
    if (!query) return;
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`
    );
    const data = await res.json();
    setRecipes({ 'Search results': data.data.recipes.slice(0, 25) || [] });
    setSelectedRecipe(null);
  };

  // Get recipe details
  const getRecipeDetails = async (id) => {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json();
    setSelectedRecipe(data?.data?.recipe);
  };

  return (
    <div>
      <div className="healthy__container p-6 mx-auto">
        <h1 className="text-3xl font-bold text-button mb-4">🍽 Recipe Finder</h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Search recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-2 flex-grow rounded"
          />
          <button
            onClick={searchRecipes}
            className="bg-button text-white px-4 py-2 rounded hover:bg-button-hover"
          >
            Search
          </button>
        </div>

        {Object.entries(recipes).map(([keyword, recipesList]) => (
          <div key={keyword} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 capitalize border-b border-gray-200">{keyword}</h2>
            <div className="flex flex-wrap gap-4">
              {recipesList.map((recipe) => (
                <div className="w-[284.7px]" key={recipe.id}>
                  <RecipeCard
                    recipe={recipe}
                    onClick={() => getRecipeDetails(recipe?.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Selected recipe details */}
        {selectedRecipe && (
          <div>
            <button
              onClick={() => setSelectedRecipe(null)}
              className="mb-4 bg-gray-200 px-3 py-1 rounded"
            >
              ← Back
            </button>

            <h2 className="text-2xl font-bold mb-2">{selectedRecipe.title}</h2>
            <img
              src={selectedRecipe.image_url}
              alt={selectedRecipe.title}
              className="w-full max-h-96 object-cover rounded mb-4"
            />
            <p className="text-gray-600 mb-4">
              By {selectedRecipe.publisher}
            </p>
            <p><strong>Servings:</strong> {selectedRecipe.servings}</p>
            <p><strong>Cooking Time:</strong> {selectedRecipe.cooking_time} mins</p>

            <h3 className="mt-4 font-semibold">Ingredients:</h3>
            <ul className="list-disc list-inside">
              {selectedRecipe.ingredients?.map((ing, i) => (
                <li key={i}>
                  {ing.quantity || ''} {ing.unit || ''} {ing.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipesList;
