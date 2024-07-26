import './HomePage.css'
import SearchBar from '../SearchBar/SearchBar'
import Profile from '../Profile/Profile'
import RecipeList from '../RecipeList/RecipeList'
import { useNavigate } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";
import Footer from '../Footer/Footer';

function HomePage({ setSearch }) {
    const navigate = useNavigate();

    const handleFavoritesClick = () => {
        navigate('/favorites');
    }
return(

    <>
    <div className='homepageBody'>
    <header className='homePageHeader'>
        <div className='homePageTitle'>MealMaster</div>
        <div className='searchBar'><SearchBar setSearch={setSearch}/></div>
        <div className='userActions'>
            <div className='favorites' onClick={handleFavoritesClick}>
                <CiHeart size={17} />
            </div>
            <div className='profile'><span><Profile/></span></div>
        </div>
    </header>
    <div className='recipeList'><RecipeList/></div> </div>

    <div> <Footer /></div>
    </>
    )
}
export default HomePage;
