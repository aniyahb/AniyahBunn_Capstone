import './RecipeCard.css'
import React, { useState } from "react";
import { useEffect } from 'react';


const RecipeCard = ({ id, image, title, cuisines, recipeId, isAuthenticated, onAuthError , handlePickedRecipe, setModalOpen  }) => {
    const [isFav, setIsFav] = useState(false);
    const key = id
    const token = localStorage.getItem('token');

    const handleClick = () => {
        handlePickedRecipe(key);
        setModalOpen(true);
    };

    const checkFavoriteStatus = async () => {
        if (!isAuthenticated || !token) return;
        try {
            const response = await fetch(`http://localhost:2500/check-favorite/${recipeId}`, {
                headers: {
                'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('Failed to check favorite status');
            const data = await response.json();
            setIsFav(!!data.isFavorite);
            } catch (error) {
            console.error('Error checking favorite status:', error);
            }
        };

        useEffect(() => {
            checkFavoriteStatus();
        }, [isAuthenticated, token, id]);

        const handleAddFavorite = async (e) => {
            e.stopPropagation();
            if (!isAuthenticated) {
                onAuthError("Please log in to add favorites");
                return;
                }
                try {
                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                };
                if (isFav) {
                    const response = await fetch(`http://localhost:2500/remove-favorite/${recipeId}`, {
                        method: 'DELETE',
                        headers,
                        credentials: 'include'
                    });
                    if (response.ok) {
                        console.log(`Recipe with ID ${id} was removed from favorites.`);
                        setIsFav(false);
                    } else {
                    throw new Error('Failed to remove favorite');
                    }
                } else {
                    const response = await fetch("http://localhost:2500/add-favorite", {
                        method: 'POST',
                        headers,
                        body: JSON.stringify({ recipeId: recipeId }),
                        credentials: 'include'
                    });
                    if (response.ok) {
                        console.log(`Adding recipe with ID ${recipeId} to favorites`);
                        setIsFav(true);
                    } else {
                        throw new Error('Failed to add favorite');
                    }
                }
                } catch (error) {
                    console.error('Error updating favorite:', error);
                    onAuthError("Failed to update favorite status");
                }
            };

        return (
            <div className="recipeCard" onClick={handleClick}>
                <div className='recipeContent'>
                <section>
                    <img className ="image" src= {image} />
                    <h2 className = "recipeName" > {title}</h2>
                    <div className='underName'>

                    <div className="cuisines">
                        {cuisines && cuisines.length > 0? cuisines[0] : 'No Cuisine'}</div>
                    <div className= "favRecipe">
                    <a className="favoriteIcon" onClick={handleAddFavorite}>
                    <i className={isFav ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                    </a>
                    </div>
                    </div>
                </section>
                </div>
            </div>
        )
    }
export default RecipeCard;
