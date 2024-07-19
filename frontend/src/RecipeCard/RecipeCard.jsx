import './RecipeCard.css'
import React, { useState } from "react";
import { useEffect } from 'react';


const RecipeCard = (props) => {
const [isFav, setIsFav] = useState(false);

const key = props.id
const handleClick = () => {
    props.handlePickedRecipe(key);
    props.setModalOpen(true);
};



const userId = props.userId;

useEffect(() => {
    if (userId) {
        checkFavoriteStatus();
        }
    }, [userId]);

const checkFavoriteStatus = async () => {
        try {
        const response = await fetch(`http://localhost:2500/check-favorite/${key}?userId=${userId}`, {
            credentials: 'include'
        });
        const data = await response.json();
        setIsFav(data.isFav);
        } catch (error) {
        console.error('Error checking favorite status:', error);
        }
    };

const handleAddFavorite = async (e) => {
        e.stopPropagation();
        if (!userId) {
            console.log("Cannot Favorite this recipe, please log in to add favorites");
            return;
        }
        try {
            if (isFav) {
                await fetch(`http://localhost:2500/remove-favorite/${key}`, {
                method: 'DELETE',
                credentials: 'include'
                });
                console.log(`Recipe with ID ${key} was removed from favorites.`);
            } else {

                await fetch("http://localhost:2500/add-favorite", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recipeId: key, userId: userId }),
                credentials: 'include'
                });
                console.log(`Adding recipe with ID ${key} to favorites`);
            }
            setIsFav(!isFav);
            } catch (error) {
            console.error('Error updating favorite:', error);
            }
        };

    return (
        <div className="recipeCard" onClick={handleClick}>
            <div className='recipeContent'>
            <section>
                <img className ="image" src= {props.image} />
                <h2 className = "recipeName" > {props.title}</h2>
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
