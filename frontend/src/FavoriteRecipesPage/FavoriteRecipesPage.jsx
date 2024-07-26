import React, { useEffect, useState } from "react";
import missingImage from "../assets/placeholder_img.jpeg";
import { Link } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import './FavoriteRecipesPage.css'
import RecipeCard from '../RecipeCard/RecipeCard'
import Profile from '../Profile/Profile';
import FavoritesModal from '../FavoritesModal/FavoritesModal';
import LoadingScreen from '../Loading/Loading';
import Footer from '../Footer/Footer';

const FavoriteRecipesPage = () => {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [pickedRecipe, setPickedRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [pickedIngredients, setPickedIngredients] = useState(null);
    const [pickedInstructions, setPickedInstructions] = useState(null);


    useEffect(() => {
        checkAuthStatus();
        fetchFavoriteRecipes();
    }, []);

    const checkAuthStatus = () => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    };

    const fetchFavoriteRecipes = async () => {
        try {
            setIsLoading(true )
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:2500/favorite-recipes', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch favorite recipes');
            }
            const favoriteIds = await response.json();
            const allRecipes = JSON.parse(localStorage.getItem('allRecipes') || '[]');
            const favorites = allRecipes.filter(recipe => favoriteIds.includes(recipe.id));
            setFavoriteRecipes(favorites);
        } catch (error) {
            console.error('Error fetching favorite recipes:', error);
        } finally{
            setIsLoading(false)
        }
    };

    const handleAuthError = (message) => {
        console.log(message);
    };

    const handlePickedRecipe = async(recipe) => {
        setPickedRecipe(recipe);
        setModalOpen(true);

        const ingredients = await getIngredientsById(recipe.id);
        const instructions = await getInstructionsById(recipe.id);
        setPickedIngredients(ingredients);
        setPickedInstructions(instructions);
        };

    const handleCloseModal = () => {
        setModalOpen(false);
        setPickedRecipe(null);
        };

    const updateFavorites = (removedRecipeId) => {
        setFavoriteRecipes(prevFavorites =>
        prevFavorites.filter(recipe => recipe.id !== removedRecipeId)
        );
        };


        const getIngredientsById = async (id) => {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${import.meta.env.VITE_API_KEY}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch ingredients');
                }
                return await response.json();
            } catch (error) {
                console.error('Error fetching ingredients:', error.message);
            }
        };

        const getInstructionsById = async (id) => {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${import.meta.env.VITE_API_KEY}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch instructions');
                }
                return await response.json();
            } catch (error) {
                console.error('Error fetching instructions:', error.message);
            }
        };

        return (
            <div className="page-container">
            <div className="content-wrap">
                <header className='favoritePageHeader'>
                    <div className='favoritePageTitle'>
                    MealMaster
                    <Link to="/HomePage" className="home-icon" >
                        <CiHome />
                    </Link>
                    </div>
                    <div className='profile'><span><Profile/></span></div>
                </header>
                {modalOpen && pickedRecipe &&
                    <FavoritesModal
                    pickedRecipe={pickedRecipe}
                    closeModal={handleCloseModal}
                    ingredients={pickedIngredients}
                    instructions={pickedInstructions}
                    />
                }
                <div className="favorite-recipes-page">
                    <div className='favs'>Favorite Recipes</div>
                    {isLoading && <LoadingScreen />}
                    <div className="fav-recipe-list">
                    {favoriteRecipes.map(recipe => (
                        <RecipeCard
                        key={recipe.id}
                        id={recipe.id}
                        recipeId={recipe.id}
                        title={recipe.title}
                        image={recipe.image || missingImage}
                        cuisines={recipe.cuisines}
                        handlePickedRecipe={() => handlePickedRecipe(recipe)}
                        isAuthenticated={isAuthenticated}
                        onAuthError={handleAuthError}
                        setModalOpen={setModalOpen}
                        updateFavorites={updateFavorites}
                        />
                    ))}
                    </div>
                </div>
                </div>
                <Footer />
            </div>
            );
    };

export default FavoriteRecipesPage;
