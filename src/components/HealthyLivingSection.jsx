import RecipeSlider from './Recipes/components/RecipesSlider/RecipesSlider';
import HealthInsights from './HealthyArticles/HealthyInsights';

const HealthyLivingSection = () => {
  return (
    <section className=" bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl text-center font-bold text-gray-800">
          Healthy, <span className="text-primary">Everyday</span>
        </h2>
        <div className="flex justify-center mt-4">
          <div className="w-16 h-1 bg-primary rounded-full"></div>
        </div>
      </div>

           <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Discover delicious recipes and essential nutrition insights for a healthier lifestyle
        </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-10">
          <RecipeSlider />
          <HealthInsights />
        </div>
      </div>
    </section>
  );
};

export default HealthyLivingSection;