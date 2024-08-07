import React from 'react'
import missingImage from "../assets/placeholder_img.jpeg";

const FavoritesModal = ({ pickedRecipe, closeModal, ingredients, instructions  }) => {
    return(
        <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="close-button" onClick={closeModal}> X </button>
            <h1 className="recipeTitle">{pickedRecipe?.title}</h1>
            <img className="recipeImage" src={pickedRecipe?.image || missingImage} alt={pickedRecipe?.title}/>
            <div className="recipeDetails">
            <h3 className="Ingredients"> Ingredients: </h3>
            <ul>
                {pickedRecipe?.extendedIngredients?.map((ingredient, index) => (
                <li key={index}>{ingredient.original}</li>
            ))}
            </ul>

            <ul>
                {ingredients?.ingredients?.map((ingredient, index) => (
                <li key={index}>
                    {ingredient.amount.us.value} {ingredient.amount.us.unit} {ingredient.name}
                </li>
            ))}
            </ul>

            <h3 className="Instructions">Instructions:</h3>
            <ol>
                {pickedRecipe?.analyzedInstructions?.[0]?.steps?.map((step, stepIndex) => (
                <li key={stepIndex}>{step.step}</li>
                ))}
            </ol>

            <ol>
                {instructions?.[0]?.steps?.map((step, stepIndex) => (
                    <li key={stepIndex}>{step.step}</li>
                ))}
            </ol>

            </div>
        </div>
        </div>
    )
    }

export default FavoritesModal;
