import { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';
import healthyRecipes from '../../components/RecipesData/RecipesData';
import { Link } from 'react-router-dom';

const RecipeSlider = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setRecipes(healthyRecipes.recipes.slice(4, 9));
  }, []);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [recipes.length]);

  const startAutoScroll = () => {
    stopAutoScroll();
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 5000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % recipes.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + recipes.length) % recipes.length);
  };


  if (recipes.length === 0) {
    return <div className="flex justify-center items-center h-[500px]">Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100 h-full">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-emerald-800 mb-2">
          Fresh & Healthy Recipes
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-emerald-500 mx-auto rounded-full"></div>
      </div>

      <div className="relative h-[350px]">
        {recipes.map((recipe, index) => {
          const distance = Math.abs(index - currentIndex);
          const isCurrent = index === currentIndex;
          const isNext = index === (currentIndex + 1) % recipes.length;
          const isPrev = index === (currentIndex - 1 + recipes.length) % recipes.length;

          let transform = '';
          if (isCurrent) transform = 'translateX(0) scale(1)';
          else if (isNext) transform = 'translateX(25%) scale(0.9)';
          else if (isPrev) transform = 'translateX(-25%) scale(0.9)';
          else transform = 'translateX(0) scale(0.8)';

          return (
            <div key={recipe.id}
              className={`absolute top-0 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out ${distance > 1 ? 'opacity-0' : 'opacity-100'}`}
              style={{ transform, zIndex: isCurrent ? 30 : 20 - distance }}
              onMouseEnter={stopAutoScroll}
              onMouseLeave={startAutoScroll}>

              <div
                className={`bg-white rounded-2xl shadow-md overflow-hidden w-72 ${isCurrent ? 'ring-2 ring-emerald-400' : ''}`}
                onClick={!isCurrent ? () => setCurrentIndex(index) : null}>
                <div className="relative h-48 bg-emerald-50 overflow-hidden">
                  {recipe.image_url ? (
                    <img
                      src={recipe.image_url}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-emerald-100 flex items-center justify-center">
                      <FaLeaf className="text-emerald-300 text-4xl" />
                    </div>
                  )}

                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-emerald-900 line-clamp-2 leading-tight mb-3">
                    {recipe.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                      {recipe.publisher}
                    </span>
                    <Link to={`/recipeDetail/${recipe.id}`} key={recipe.id}>
                      <a
                        rel="noopener noreferrer"
                        className="text-sm font-medium !text-white bg-button hover:bg-button-hover px-4 py-2 rounded-lg transition-colors">
                        View
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Link to={`/recipes`}>
        <div className="w-full flex justify-center">
          <button className="text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:bg-secondary  px-4 py-2 rounded-lg transition-colors">View All</button>
        </div>
      </Link>

      {/* navigation */}
      <div className="flex justify-center mt-8 space-x-6">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-emerald-50 text-emerald-600 shadow-sm hover:bg-emerald-100"
        >
          <FiChevronLeft className="text-xl" />
        </button>
        <div className="flex items-center space-x-2">
          {recipes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${index === currentIndex ? 'bg-emerald-500 w-6' : 'bg-emerald-200 w-3'}`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-emerald-50 text-emerald-600 shadow-sm hover:bg-emerald-100">
          <FiChevronRight className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default RecipeSlider;
