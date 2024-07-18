import React from "react";
import './Modal.css';
import missingImage from "../assets/placeholder_img.jpeg";
import RecipeList from "../RecipeList/RecipeList.jsx";

const Modal = (props) => {
    const { pickedRecipe, closeModal} = props;
    const splitInstructions = (instructions) => {
        if (!instructions) return [];
        return instructions.split(/(?<=[.!?])\s+/);
    };

    return(
        <div className="modal-overlay" >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="close-button" onClick={closeModal}> X </button>
            <h1 className="recipeTitle">{pickedRecipe?.title} </h1>
            <img className ="recipeImage" src={pickedRecipe?.image || missingImage}/>
            <div className="recipeDetails">
                <h3 className="Ingredients"> Ingredients: </h3>
                    <ul>
                        {pickedRecipe.extendedIngredients && pickedRecipe.extendedIngredients.map((ingredient, index) => (
                            <li key={index}>{ingredient.original}</li>
                        ))}
                    </ul>
                <h3 className="Instructions">Instructions:</h3>
                <ol>
            {splitInstructions(pickedRecipe?.instructions).map((sentence, index) => (
            <li key={index}>{sentence.trim()}</li>
            ))}
                </ol>

            </div>
        </div>
    </div>

    )
}
export default Modal;
