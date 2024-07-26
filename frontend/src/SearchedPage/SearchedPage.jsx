import React from "react";
import { useEffect, useState } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import missingImage from "../assets/placeholder_img.jpeg"
import SearchedModal from "../SearchedModal/SearchedModal";
import Profile from "../Profile/Profile";
import { Link } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import './SearchedPage.css'
import LoadingScreen from "../Loading/Loading";
import Footer from "../Footer/Footer";
import { CiHeart } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

function SearchedPage(props){
    const [searchedRecipes, setSearchedRecipes] = useState ([])
    const [pickedRecipe, setPickedRecipe] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [pickedIngredients, setPickedIngredients] = useState ([])
    const [pickedInstructions, setPickedInstructions] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuthStatus = () => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    };

    useEffect(() => {
        const getSearched= async (input) => {

            setIsLoading(true)
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${input}&apiKey=${import.meta.env.VITE_API_KEY}&number=100`) ;
                if (!response.ok) {
                    throw new Error('Failed to search recipes');
                }
                const data = await response.json();
                setSearchedRecipes(data.results);
                const allRecipes = JSON.parse(localStorage.getItem('allRecipes')) || [];
                const newRecipes = data.results.filter(recipe => !allRecipes.some(r => r.id === recipe.id));
                localStorage.setItem('allRecipes', JSON.stringify([...allRecipes, ...newRecipes]));
            } catch (error) {
                console.error('Error fetching searched recipes:', error.message);
            } finally{
                setIsLoading(false)
            }
            checkAuthStatus();
        };
        getSearched(props.query);
    }, [props.query]);

    const handlePickedRecipe = (id) => {
        const recipe = searchedRecipes.find(recipe => recipe.id === id);
        setPickedRecipe(recipe);
        getIngredientsById(recipe.id)
        getInstructionsById(recipe.id)
        setModalOpen(!modalOpen)
        setModalOpen(true);

        const allRecipes = JSON.parse(localStorage.getItem('allRecipes')) || [];
    if (!allRecipes.some(r => r.id === recipe.id)) {
        localStorage.setItem('allRecipes', JSON.stringify([...allRecipes, recipe]));
    }

    };

    const handleCloseModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleOpenModal = (recipe) => {
        setPickedRecipe(recipe)
    }

    const getIngredientsById = async (id) =>{
        try {
            setIsLoading(true)
            const ingredients = await fetch(`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${import.meta.env.VITE_API_KEY}`) ;
            if (!ingredients.ok) {
                throw new Error('Failed to fetch ingredients');
            }
            const data = await ingredients.json();
            setPickedIngredients(data);
        }catch (error){
            console.error('Error fetching ingredients:', error.message);
        }finally{
            setIsLoading(false)
        }
    }

    const getInstructionsById = async (id) => {
        try {
            setIsLoading(true)
            const instructions = await fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${import.meta.env.VITE_API_KEY}`) ;
            if (!instructions.ok) {
                throw new Error('Failed to fetch instructions');
            }
            const data = await instructions.json();
            setPickedInstructions(data);
        }catch (error){
            console.error('Error fetching instructions:', error.message);
    }finally{
        setIsLoading(false)
    }
}
const handleFavoritesClick = () => {
    navigate('/favorites');
}
const handleAuthError = (message) => {
    console.log(message);
};

    return(
        <div className="page-container">
        <div className="content-wrap">
            <header className='searchPageHeader'>
                <div className='searchPageTitle'>
                    MealMaster
                    <Link to="/HomePage" className="home-icon" >
                        <CiHome />
                    </Link>
                </div>
                <div className='toFavorites' onClick={handleFavoritesClick}>
                <CiHeart size={17} />
            </div>
                <div className='profile'><span><Profile/></span></div>
            </header>

            {isLoading && <LoadingScreen />}
            {modalOpen && pickedRecipe &&
                <SearchedModal
                    showModal={() => handleOpenModal(pickedRecipe)}
                    pickedRecipe={pickedRecipe}
                    closeModal={handleCloseModal}
                    ingredients={pickedIngredients}
                    instructions={pickedInstructions}
                />
            }
            <div className="recipe-list">
                {searchedRecipes.map((recipe,index) => (
                    <RecipeCard
                        key={`${recipe.id}-${index}`}
                        recipeId={recipe.id}
                        id={recipe.spoonacularId}
                        setPickedRecipe={setPickedRecipe}
                        title={recipe.title}
                        image={recipe.image || missingImage}
                        cuisines={recipe.cuisines}
                        handlePickedRecipe={() => handlePickedRecipe(recipe.id)}
                        setModalOpen={setModalOpen}
                        pickedIngredients={pickedIngredients}
                        pickedInstructions={pickedInstructions}
                        isAuthenticated={isAuthenticated}
                        onAuthError={handleAuthError}
                    />
                ))}
            </div>
        </div>
        <Footer />
    </div>
    )
}
export default SearchedPage;
