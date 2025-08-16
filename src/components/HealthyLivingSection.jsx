import RecipeSlider from './Recipes/components/RecipesSlider/RecipesSlider';
import HealthInsights from './HealthyArticles/HealthyInsights';

const HealthyLivingSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-emerald-900 mb-3">
            Healthy Living Hub
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-emerald-700 max-w-3xl mx-auto">
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