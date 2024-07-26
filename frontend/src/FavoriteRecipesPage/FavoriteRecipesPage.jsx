import './FavoriteRecipesPage.css'
import RecipeCard from '../RecipeCard/RecipeCard'
import React, { useEffect, useState } from "react";
import missingImage from "../assets/placeholder_img.jpeg";
import { Link } from "react-router-dom";
import { CiHome } from "react-icons/ci";
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

    const handlePickedRecipe = (recipe) => {
        setPickedRecipe(recipe);
        setModalOpen(true);
        };

    const handleCloseModal = () => {
        setModalOpen(false);
        setPickedRecipe(null);
        };


        return (
            <div className="page-container">
            <div className="content-wrap">
                <header className='favoritePageHeader'>
                    <div className='favoritePageTitle'>
                    <Link to="/HomePage" className="home-icon" >
                        <CiHome />
                    </Link>
                    MealMaster
                    </div>
                    <div className='profile'><span><Profile/></span></div>
                </header>
                {modalOpen && pickedRecipe &&
                    <FavoritesModal
                    pickedRecipe={pickedRecipe}
                    closeModal={handleCloseModal}
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
