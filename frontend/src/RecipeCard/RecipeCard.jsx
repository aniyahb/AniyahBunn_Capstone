import './RecipeCard.css'
import React, { useState } from "react";
import { useEffect } from 'react';


const RecipeCard = ({ id, image, title, isAuthenticated, onAuthError, handlePickedRecipe, setModalOpen }) => {
    const [isFav, setIsFav] = useState(false);
    const key = id
    const token = localStorage.getItem('token');

    const handleClick = () => {
        props.handlePickedRecipe(key);
        props.setModalOpen(true);
    };



    useEffect(() => {
        if (isAuthenticated) {
            checkFavoriteStatus();
        }
    }, [isAuthenticated, id]);

    const checkFavoriteStatus = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            onAuthError("No authentication token found");
            return;
        }
        try {
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
            const response = await fetch(`http://localhost:2500/check-favorite/${id}`, {
                headers,
                credentials: 'include'
            });

            if (response.status === 401 || response.status === 403) {
                onAuthError("Authentication failed");
                return;
            }
            const data = await response.json();
            setIsFav(data.isFavorite);
        } catch (error) {
            console.error('Error checking favorite status:', error);
        }
    };

    const handleAddFavorite = async (e) => {
        e.stopPropagation();
        const token = localStorage.getItem('token');
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
                await fetch(`http://localhost:2500/remove-favorite/${key}`, {
                    method: 'DELETE',
                    headers,
                    credentials: 'include'
                });
                console.log(`Recipe with ID ${key} was removed from favorites.`);
            } else {
                await fetch("http://localhost:2500/add-favorite", {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({ recipeId: key }),
                    credentials: 'include'
                });
                console.log(`Adding recipe with ID ${key} to favorites`);
            }
            setIsFav(!isFav);
        } catch (error) {
            console.error('Error updating favorite:', error);
        }
    };



    // const handleAddFavorite = async (e) => {
    //         e.stopPropagation();
    //         if (!userId) {
    //             console.log("Please log in to add favorites");
    //             return;
    //         }
    //         try {
    //             if (isFav) {
    //                 await fetch(`http://localhost:2500/remove-favorite/${key}`, {
    //                 method: 'DELETE',
    //                 credentials: 'include'
    //                 });
    //                 console.log(`Recipe with ID ${key} was removed from favorites.`);
    //             } else {

    //                 await fetch("http://localhost:2500/add-favorite", {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({ recipeId: key, userId: userId }),
    //                 credentials: 'include'
    //                 });
    //                 console.log(`Adding recipe with ID ${key} to favorites`);
    //             }
    //             setIsFav(!isFav);
    //             } catch (error) {
    //             console.error('Error updating favorite:', error);
    //             }
    //         };

        return (
            <div className="recipeCard" onClick={handleClick}>
                <div className='recipeContent'>
                <section>
                    <img className ="image" src= {image} />
                    <h2 className = "recipeName" > {title}</h2>
                    <div className='underName'>
                    <h3 className= "cuisine"> Cuisines:</h3>
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
