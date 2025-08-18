import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaLeaf, FaRegLightbulb, FaSkullCrossbones, FaFireAlt, FaAppleAlt, FaFish, FaSeedling, FaWineBottle, FaCheese, FaEgg } from 'react-icons/fa';
import { GiHealthNormal, GiBrokenHeart, GiMeal, GiFruitBowl, GiMilkCarton } from 'react-icons/gi';

const HealthInsights = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentFact, setCurrentFact] = useState(0);

  const healthInsights = [
    {
      type: 'beneficial',
      title: 'Power of Leafy Greens',
      icon: <FaLeaf className="text-emerald-500" size={28} />,
      content: 'Kale and spinach are packed with vitamins A, C, K, and antioxidants that reduce inflammation and support eye health.',
      action: 'Try adding 2 cups to your daily diet',
      color: 'bg-emerald-50',
      border: 'border-emerald-200'
    },
    {
      type: 'harmful',
      title: 'The Sugar Trap',
      icon: <FaSkullCrossbones className="text-rose-500" size={28} />,
      content: 'Added sugars in processed foods contribute to obesity, diabetes, and heart disease. A single soda can contain 10+ teaspoons!',
      action: 'Limit to <25g added sugar daily',
      color: 'bg-rose-50',
      border: 'border-rose-200'
    },
    {
      type: 'beneficial',
      title: 'Omega-3 Rich Foods',
      icon: <GiHealthNormal className="text-blue-500" size={28} />,
      content: 'Fatty fish, walnuts, and flaxseeds improve brain function and reduce heart disease risk by lowering triglycerides.',
      action: 'Aim for 2-3 servings weekly',
      color: 'bg-blue-50',
      border: 'border-blue-200'
    },
    {
      type: 'beneficial',
      title: 'Whole Fruits Benefits',
      icon: <FaAppleAlt className="text-green-500" size={28} />,
      content: 'Eating whole fruits (not juice) provides fiber that slows sugar absorption and promotes gut health.',
      action: 'Have 2-3 servings of whole fruit daily',
      color: 'bg-green-50',
      border: 'border-green-200'
    },
    {
      type: 'harmful',
      title: 'Processed Meat Risks',
      icon: <GiBrokenHeart className="text-red-500" size={28} />,
      content: 'Regular consumption of processed meats like bacon and sausages is linked to increased cancer and heart disease risk.',
      action: 'Limit to occasional treats',
      color: 'bg-red-50',
      border: 'border-red-200'
    },
    {
      type: 'beneficial',
      title: 'Fermented Foods',
      icon: <GiMilkCarton className="text-purple-500" size={28} />,
      content: 'Yogurt, kefir, and kimchi contain probiotics that support gut microbiome and immune function.',
      action: 'Include 1 serving daily',
      color: 'bg-purple-50',
      border: 'border-purple-200'
    },
    {
      type: 'harmful',
      title: 'Trans Fats Danger',
      icon: <FaSkullCrossbones className="text-amber-500" size={28} />,
      content: 'Found in fried foods and baked goods, trans fats raise bad cholesterol while lowering good cholesterol.',
      action: 'Avoid partially hydrogenated oils',
      color: 'bg-amber-50',
      border: 'border-amber-200'
    },
    {
      type: 'beneficial',
      title: 'Colorful Vegetables',
      icon: <FaSeedling className="text-lime-500" size={28} />,
      content: 'Different colored vegetables provide unique phytonutrients that protect against various diseases.',
      action: 'Eat a rainbow of vegetables daily',
      color: 'bg-lime-50',
      border: 'border-lime-200'
    }
  ];

  const funFacts = [
    "Almonds are actually seeds, not true nuts.",
    "Broccoli contains more protein per calorie than steak.",
    "Carrots were originally purple, not orange.",
    "Garlic can help boost the immune system and fight colds.",
  ];

  // Rotate tips every 7 seconds
  useEffect(() => {
    const tipTimer = setInterval(() => {
      setIsFlipped(true);
      setTimeout(() => {
        setCurrentTip((prev) => (prev + 1) % healthInsights.length);
        setIsFlipped(false);
      }, 300);
    }, 7000);
    return () => clearInterval(tipTimer);
  }, []);

  // Rotate facts every 5 seconds
  useEffect(() => {
    const factTimer = setInterval(() => {
      setCurrentFact(Math.floor(Math.random() * funFacts.length));
    }, 5000);
    return () => clearInterval(factTimer);
  }, []);

  const navigateTip = (direction) => {
    setIsFlipped(true);
    setTimeout(() => {
      setCurrentTip(prev => 
        direction === 'next' 
          ? (prev + 1) % healthInsights.length 
          : (prev - 1 + healthInsights.length) % healthInsights.length
      );
      setIsFlipped(false);
    }, 300);
  };

  const current = healthInsights[currentTip];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100 h-full">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-emerald-800 mb-2">
          Health Insights
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-emerald-500 mx-auto rounded-full"></div>
      </div>

      <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl shadow-inner overflow-hidden border border-emerald-100">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4">
          <div className="flex items-center space-x-3 justify-center">
            <h3 className="text-xl font-bold text-white">Nutrition Guide</h3>
          </div>
        </div>
        
        <div className="relative h-64 p-5">
          <div className={`absolute inset-0 p-5 transition-opacity duration-300 ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
            <div className={`flex flex-col h-full p-5 rounded-lg border ${current.border} ${current.color}`}>
              <div className="flex justify-between items-start">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  current.type === 'beneficial' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {current.type === 'beneficial' ? 'Superfood' : 'Warning'}
                </div>
                {current.icon}
              </div>
              
              <h4 className="text-lg font-bold mt-4 text-gray-800">{current.title}</h4>
              <p className="text-gray-600 mt-2 flex-grow">{current.content}</p>
              
              <div className="mt-4 p-3 bg-white rounded-md border border-gray-200 shadow-sm">
                <p className="text-sm font-medium text-gray-700">
                  <span className="font-bold">{current.action}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center p-4 border-t border-emerald-100 bg-white/50">
          <button 
            onClick={() => navigateTip('prev')}
            className="p-2 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
          >
            <FiChevronLeft className="text-xl" />
          </button>
          
          <div className="flex space-x-2">
            {healthInsights.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsFlipped(true);
                  setTimeout(() => {
                    setCurrentTip(index);
                    setIsFlipped(false);
                  }, 300);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentTip 
                    ? current.type === 'beneficial' 
                      ? 'bg-emerald-500' 
                      : 'bg-rose-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <button 
            onClick={() => navigateTip('next')}
            className="p-2 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
          >
            <FiChevronRight className="text-xl" />
          </button>
        </div>
      </div>
      
      <div className="mt-6 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-lg p-4 flex items-start transition-opacity duration-500">
        <div>
          <h4 className="font-bold text-amber-800">Did You Know?</h4>
          <p className="text-sm text-amber-700">
            {funFacts[currentFact]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthInsights;