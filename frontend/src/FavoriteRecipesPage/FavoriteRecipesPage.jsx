import './FavoriteRecipesPage.css'
import RecipeCard from '../RecipeCard/RecipeCard'
import React, { useEffect, useState } from "react";




const FavoriteRecipesPage = () => {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);

    useEffect(() => {
        fetchFavoriteRecipes();
    }, []);

    const fetchFavoriteRecipes = async () => {
        try {
        const response = await fetch('http://localhost:2500/favorite-recipes', {
            credentials: 'include'
        });
        const data = await response.json();
        setFavoriteRecipes(data);
        } catch (error) {
        console.error('Error fetching favorite recipes:', error);
        }
    };

    return (
        <div className="favorite-recipes-page">
        <h1>My Favorite Recipes</h1>
        <div className="recipe-list">
            {favoriteRecipes.map(recipe => (
            <RecipeCard
                key={recipe.id}
                id={recipe.id}
                setPickedRecipe={setPickedRecipe}
                title={recipe.title}
                image={recipe.image || missingImage}
                cuisines={recipe.cuisines}

            />
            ))}
        </div>
        </div>
    );
    };

export default FavoriteRecipesPage;
