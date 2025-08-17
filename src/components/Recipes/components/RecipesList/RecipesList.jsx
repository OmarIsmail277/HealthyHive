import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../RecipeCard/RecipeCard';

function RecipesList() {
  const [recipes, setRecipes] = useState({});
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const Keywords = [
    "chicken",
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

  useEffect(() => {
    async function loadAllRecipes() {
      setLoading(true);
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
      setLoading(false);
    }
    loadAllRecipes();
  }, []);

  const searchRecipes = async () => {
    if (!query) return;
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`
    );
    const data = await res.json();
    setRecipes({ 'Search results': data.data.recipes.slice(0, 25) || [] });
    setSelectedRecipe(null);
  };


  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen">
      <div className="healthy__container p-6 mx-auto max-w-7xl">
        <h1 className="text-4xl font-extrabold text-green-700 mb-6 text-center">
          🍽 Recipe Finder
        </h1>

        <div className="flex gap-2 mb-10 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-gray-300 p-3 flex-grow rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />
          <button
            onClick={searchRecipes}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Search
          </button>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        )}

        {!loading && Object.entries(recipes).map(([keyword, recipesList]) => (
          <div key={keyword} className="mb-14">
            <h2 className="text-2xl font-bold mb-6 capitalize border-b-2 border-green-400 inline-block pb-1 text-gray-800">
              {keyword}
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recipesList.map((recipe) => (
                <Link key={recipe.id} to={`/recipeDetail/${recipe.id}`}>
                  <RecipeCard recipe={recipe} />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipesList;

