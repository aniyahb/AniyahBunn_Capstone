import React from "react";
import './SearchedModal.css';
import missingImage from "../assets/placeholder_img.jpeg";


const SearchedModal = (props) => {
    const { pickedRecipe, closeModal, ingredients, instructions} = props;
    console.log(ingredients)

    return(
        <div className="modal-overlay" >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="close-button" onClick={closeModal}> X </button>
            <h1 className="recipeTitle">{pickedRecipe?.title} </h1>
            <img className ="recipeImage" src={pickedRecipe?.image || missingImage}/>
            <div className="recipeDetails">
                <h3 className="Ingredients"> Ingredients: </h3>
                {/* <ul>
                    {ingredients.ingredients && ingredients.ingredients.map((name, index) => (
                        <li key={index}>{name.original}</li>
                    ))}
                </ul> */}
                <ul>
            {ingredients.map((ingredient, index) => (
                <li key={index}>
                    {ingredient.name}
                </li>
            ))}
        </ul>
                <h3 className="Instructions">Instructions:{instructions}</h3>
            </div>
        </div>
    </div>

    )
}
export default SearchedModal;
