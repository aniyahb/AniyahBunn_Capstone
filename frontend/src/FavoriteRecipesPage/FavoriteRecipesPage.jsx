import './FavoriteRecipesPage.css'
import RecipeCard from '../RecipeCard/RecipeCard'
import React, { useEffect, useState } from "react";
import missingImage from "../assets/placeholder_img.jpeg";
import { Link } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import Profile from '../Profile/Profile';

const FavoriteRecipesPage = () => {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
        }
    };

    const handleAuthError = (message) => {
        console.log(message);
    };

    const handlePickedRecipe = (id) => {
        console.log(`Recipe picked: ${id}`);
    };

    return (
        <>

        <header className='favoritePageHeader'>
        <div className='favoritePageTitle'>
            <Link to="/HomePage" className="home-icon" >
                <CiHome />
            </Link>
            MealMaster</div>
        <div className='profile'><span><Profile/></span></div>
        </header>
        <div className="favorite-recipes-page">
            <h1>Favorite Recipes</h1>
            <div className="recipe-list">
                {favoriteRecipes.map(recipe => (
                    <RecipeCard
                        key={recipe.id}
                        id={recipe.id}
                        recipeId={recipe.id}
                        setPickedRecipe={handlePickedRecipe}
                        title={recipe.title}
                        image={recipe.image || missingImage}
                        cuisines={recipe.cuisines}
                        handlePickedRecipe={() => handlePickedRecipe(recipe.id)}
                        isAuthenticated={isAuthenticated}
                        onAuthError={handleAuthError}
                    />
                ))}
            </div>
        </div>
        </>

    );
};

export default FavoriteRecipesPage;
