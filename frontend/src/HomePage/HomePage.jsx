import './HomePage.css'
import SearchBar from '../SearchBar/SearchBar'
import Profile from '../Profile/Profile'
import RecipeList from '../RecipeList/RecipeList'

function HomePage() {
return(
    <div className='homepageBody'>
    <header className='homePageHeader'>
        <div className='homePageTitle'>MealMaster</div>
        <div className='searchBar'><SearchBar/></div>
        <div className='profile'><span><Profile/></span></div>
    </header>
    <div className='recipeList'><RecipeList/></div> </div>
    )
}
export default HomePage;
