import { useState, useEffect, useRef } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import RecipeCard from '../RecipeCard/RecipeCard'

function RecipesSlider() {

    const [recommendedRecipes, setRecommendedRecipes] = useState([]);
    const scrollRef = useRef(null);


    useEffect(() => {
        async function loadFeatured() {
            const keywords = ["sweet potato", "carrot", "zucchini", "tomato",
                 "broccoli","spinach", "apple",
                "blueberry", "mango", "strawberry",
                "lentil",  "garlic"];
            let results = [];

            for (const keyword of keywords) {
                const res = await fetch(
                    `https://forkify-api.herokuapp.com/api/v2/recipes?search=${keyword}`
                );
                const data = await res.json();

                if (data?.data?.recipes && data?.data?.recipes.length > 0) {
                    results.push(data.data.recipes[0]);
                }
            }

            setRecommendedRecipes(results);
        }
        loadFeatured();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            handleScroll("right");
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleScroll = (direction) => {
        const container = scrollRef.current;
        if (!container) return;

        const scrollAmount = direction === "left" ? -466 : 466;
        container.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
        });

        const { scrollLeft, scrollWidth, clientWidth } = container;
        if (direction === "right" && scrollLeft + clientWidth >= scrollWidth - 466) {
            container.scrollTo({ left: 0, behavior: "smooth" });
        }
    };



    const getRecipeDetails = async (id) => {
        const res = await fetch(
            `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );
        const data = await res.json();
        console.log("Recipe details:", data.data.recipe);
    };


    return (
        <div className="healthy__container py-8 relative">
            <h2 className="subTitle ">
                Recommended Recipes
            </h2>

            <button
                onClick={() => handleScroll("left")}
                className="absolute left-[-1.5%] top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10" >
                <FaAngleLeft size={20} />
            </button>
            <div className="overflow-hidden hide-scrollbar pb-4" ref={scrollRef}>

                <div className="flex gap-4 w-max">
                    {recommendedRecipes.length > 0 ? (recommendedRecipes.map((recipe) => (
                        <div className='w-[450px] '>
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                onClick={() => getRecipeDetails(recipe.id)} />
                        </div>
                    ))) : ""}
                </div>
            </div>
            <button
                onClick={() => handleScroll("right")}
                className="absolute right-[-1.5%] top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10">
                <FaAngleRight size={20} />
            </button>
        </div>
    )
}

export default RecipesSlider