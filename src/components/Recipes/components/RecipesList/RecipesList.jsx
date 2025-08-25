import { Link } from "react-router-dom";
import RecipeCard from "../RecipeCard/RecipeCard";
import healthyRecipes from "../RecipesData/RecipesData";

function RecipesList() {
  return (
    <div className="min-h-screen">
      <div className="healthy__container p-6 mx-auto max-w-7xl">
        <h1 className="text-4xl font-extrabold text-primary mb-6 text-center">
          🍽 Recipes
        </h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-14">
          {healthyRecipes.recipes.map((recipe) => (
            <Link to={`/recipeDetail/${recipe.id}`} key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecipesList;
