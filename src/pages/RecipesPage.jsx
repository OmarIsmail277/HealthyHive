import Navbar from '../components/Navbar/Navbar'
import RecipesList from '../components/Recipes/components/RecipesList/RecipesList'
import Footer from '../components/Footer/Footer'

function RecipesPage() {
  return (
    <div>
        <Navbar/>
        <RecipesList/>
        <Footer/>
    </div>
  )
}

export default RecipesPage